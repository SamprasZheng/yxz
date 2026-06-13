---
type: concept
tags: [ai-agents, guardrails, cost, reliability, circuit-breaker, token-budget, loop-prevention, langchain, langgraph, agentic-safety]
---

# Agent Resource Circuit Breakers — Hard Spend Caps and Iteration Limits

**Agent resource circuit breakers** are mechanisms that forcibly terminate an autonomous agent's execution when a measurable resource threshold is crossed — either a cumulative token/cost budget or a maximum iteration count. They are the *last* line of defense against runaway loops. Unlike cost-aware routing (see [[concepts/tiered-inference]]), which selects a cheaper model *before* a call, circuit breakers act *during* execution: they watch a counter accumulate and pull the emergency stop when it hits a ceiling.

The pattern maps directly to Michael Nygard's **Circuit Breaker** (popularized in *Release It!*, 2007 and articulated by Martin Fowler at [martinfowler.com/bliki/CircuitBreaker.html](https://martinfowler.com/bliki/CircuitBreaker.html)). A breaker wraps a protected call, monitors failure or resource accumulation, and opens — stopping all further calls — when a threshold is crossed.

---

## 1. Why This Matters: The Runaway-Loop Failure Mode

An autonomous agent that cannot terminate itself is a financial and operational hazard. The canonical failure scenario:

> Four LangChain agents with no iteration cap entered a mutual-clarification loop. Two agents continuously requested clarifications from each other. The system had no shared termination state — neither agent could declare the conversation finished. The loop ran for 11 days. Total API spend: **$47,000**. Cost progression: $127 in week 1, $6,240 by week 3, $18,400 in week 4.

Source: Gabriel Anhaia, "The Agent That Spent $47K on Itself: An Autonomous-Loop Postmortem" (DEV Community, April 2025) — [dev.to/gabrielanhaia/the-agent-that-spent-47k](https://dev.to/gabrielanhaia/the-agent-that-spent-47k-on-itself-an-autonomous-loop-postmortem-3313).

The root causes were generic: no hard cap on model calls, no per-conversation USD budget, and no mechanism to detect repeated tool inputs. These are *not* exotic edge cases — they are the default state of any agent system built without explicit circuit breakers.

A compounding factor is context-window cost inflation. At step 20 of a debug loop, the agent is paying to re-send the same system prompt and accumulated history it sent at step 1 — effectively paying for every prior step again on every new step. At 50 steps the cost multiplier exceeds 30×; at 200 steps it exceeds 100×.

---

## 2. The Circuit Breaker Pattern: Three States

Nygard's pattern defines three states, directly mappable to agent loops:

| Circuit State | Microservice meaning | Agent-loop meaning |
|---|---|---|
| **Closed** | All calls pass through; monitoring active | Agent iterates normally; token counter increments |
| **Open** | All calls return error immediately; no call made | Budget or iteration ceiling hit; loop terminates; `raise BudgetExceededError` |
| **Half-Open** | Trial call allowed after timeout; resets on success | Human reviews pause; agent may resume with a fresh budget if operator restarts |

Netflix **Hystrix** was the canonical implementation for distributed systems (open-sourced by Netflix; placed in maintenance mode January 2022). Its threshold-plus-rolling-window model is the direct ancestor of per-call and per-session limits in modern agent frameworks.

---

## 3. Iteration Caps in Agent Frameworks

### LangChain `AgentExecutor`

`AgentExecutor` exposes two orthogonal iteration controls:

| Parameter | Type | Default | Behavior when hit |
|---|---|---|---|
| `max_iterations` | `int` | **15** | Loop stops; `early_stopping_method` governs final output |
| `max_execution_time` | `float \| None` | `None` (no wall-clock limit) | Loop stops after wall-clock seconds elapsed |

`early_stopping_method` accepts two values:
- `"force"` — returns a string indicating the agent stopped due to hitting a limit; no extra LLM call made.
- `"generate"` — calls the agent's LLM chain one final time to synthesize a best-effort answer from accumulated steps before stopping.

```python
from langchain.agents import AgentExecutor

executor = AgentExecutor(
    agent=agent,
    tools=tools,
    max_iterations=5,          # hard cap: never loop more than 5 times
    max_execution_time=30.0,   # wall-clock cap: stop after 30 seconds
    early_stopping_method="force",
)
```

Source: [LangChain API reference — AgentExecutor](https://reference.langchain.com/python/langchain-classic/agents/agent/AgentExecutor); [LangChain docs — max_iterations how-to](https://python.langchain.com/v0.1/docs/modules/agents/how_to/max_iterations/).

### LangGraph `recursion_limit`

LangGraph models agent loops as a **StateGraph** where nodes call each other cyclically. Each node activation counts as one step. The framework raises `GraphRecursionError` when the step count reaches `recursion_limit`.

| Parameter | Default | How to override |
|---|---|---|
| `recursion_limit` | **25** | Pass `{"recursion_limit": N}` in the config dict at invocation time |

```python
result = graph.invoke(
    {"input": "debug this bug"},
    {"recursion_limit": 10},   # never exceed 10 node activations
)
```

```
langgraph.errors.GraphRecursionError: Recursion limit of 25 reached
without hitting a stop condition. You can increase the limit by setting
the "recursion_limit" config key.
```

A `GraphRecursionError` is a hard stop — the graph process terminates and the exception propagates to the caller, which must decide whether to surface an error, resume, or escalate to a human.

Sources: [LangGraph GRAPH_RECURSION_LIMIT error doc](https://docs.langchain.com/oss/python/langgraph/errors/GRAPH_RECURSION_LIMIT); GitHub issue thread on default limit behaviour ([langchain-ai/langgraphjs#1524](https://github.com/langchain-ai/langgraphjs/issues/1524)).

---

## 4. Token and Spend Budget Accounting (Application Layer)

Provider-side limits enforce *organizational* spend ceilings per month. Application-layer budget accounting enforces *per-session* or *per-agent-run* ceilings — a finer granularity that catches runaway loops before they accumulate to provider-tier thresholds.

### Basic token accounting pattern

```python
class TokenBudget:
    def __init__(self, max_tokens: int):
        self.max_tokens = max_tokens
        self._used = 0

    def charge(self, usage):
        """Call after every API response; usage is the response.usage object."""
        self._used += usage.input_tokens + usage.output_tokens
        if self._used >= self.max_tokens:
            raise BudgetExceededError(
                f"Token budget {self.max_tokens} exhausted "
                f"(used {self._used}) — agent halted."
            )

    @property
    def remaining(self) -> int:
        return max(0, self.max_tokens - self._used)
```

The budget object is threaded through the agent's tool-call loop. Each time the orchestrator receives an API response it calls `budget.charge(response.usage)`. On breach the exception propagates out of the loop, stops all further calls, and surfaces to the operator.

USD cost can be substituted for raw token count by multiplying input and output tokens by the per-model per-million-token price and accumulating a `cost_usd` float.

### Input hashing to detect repeated tool calls

```python
from hashlib import sha256, json

_seen_calls: set[str] = set()

def check_duplicate_tool_call(tool_name: str, tool_input: dict) -> None:
    key = sha256(
        json.dumps({"tool": tool_name, "input": tool_input}, sort_keys=True).encode()
    ).hexdigest()
    if key in _seen_calls:
        raise LoopDetectedError(f"Duplicate tool call detected: {tool_name}")
    _seen_calls.add(key)
```

This is the mechanism that would have caught the $47K loop on iteration 3 — the same clarification request from agent A to agent B would hash identically on every cycle.

---

## 5. Provider-Side Spend Controls

Provider limits are a backstop, not a substitute for application-layer circuit breakers. They operate at organization or workspace granularity, not per-agent-run.

### Anthropic

Anthropic enforces two complementary limit types at the organization level (source: [platform.claude.com/docs/en/api/rate-limits](https://platform.claude.com/docs/en/api/rate-limits)):

| Control | Scope | Enforcement |
|---|---|---|
| **Spend limit** (tier-enforced) | Organization, monthly | Hard cap; API returns error when monthly ceiling is hit |
| **Customer-set spend limit** | Organization, monthly | Operator sets via Console → Settings → Limits; cannot exceed tier ceiling |
| **Workspace rate limits** | Per workspace, per minute | RPM / ITPM / OTPM configurable per workspace; protects one team from starving others |

Every API response includes `anthropic-ratelimit-tokens-remaining` and `anthropic-ratelimit-tokens-reset` headers so an application-layer budget loop can read remaining headroom without a separate API call.

Programmatic rate-limit introspection is available via the [Rate Limits API](https://platform.claude.com/docs/en/manage-claude/rate-limits-api) — an organization can poll its own limits and remaining capacity.

Tier spend limits (as of 2026):
- Tier 1: $500/month
- Tier 2: $500/month
- Tier 3: $1,000/month
- Tier 4: $200,000/month
- Monthly Invoicing: no cap

### OpenAI

OpenAI previously offered a hard monthly budget cap that suspended API access on breach. That capability was removed and replaced with a notification-only system: when spend hits the configured monthly threshold, an email alert fires but API calls continue. Source: [Grafient blog — OpenAI Removed Hard Budget Limits](https://grafient.ai/blog/openai-removed-hard-budget-limits).

Consequence: **OpenAI no longer enforces a provider-side hard stop on spend**. Application-layer circuit breakers are therefore mandatory for any OpenAI-backed agent system where runaway cost is a risk. Common mitigations:

- **OpenRouter as intermediary** — OpenRouter enforces hard daily and monthly cost limits that actually block requests when the ceiling is hit.
- **Application-layer token budget** — implement the `TokenBudget` pattern above, charged from the `usage` object in every completion response.
- **Project-scoped API keys** — separate keys per agent run, each with its own monthly project limit, preventing one runaway agent from burning the organization's shared key.

---

## 6. Implementation Checklist

A production agent system needs all four of these; any single one is not sufficient:

| Layer | Mechanism | What it catches |
|---|---|---|
| **Framework iteration cap** | `max_iterations` (LangChain) or `recursion_limit` (LangGraph) | Loops that increment step count but stay within a single session |
| **Wall-clock timeout** | `max_execution_time` (LangChain) or `asyncio.wait_for` wrapper | Hanging tool calls, network stalls that consume time without incrementing steps |
| **Token/cost budget** | Application-layer `TokenBudget` charged from response.usage | Cost explosions from deep context accumulation even at low iteration count |
| **Duplicate-call detector** | Input hashing of tool name + args | Semantic loops that re-invoke the same tool with identical inputs |

The combination mirrors the circuit breaker's three-state model: **Closed** (all four monitors running, agent iterates), **Open** (any monitor trips, agent halted, exception raised), **Half-Open** (operator restarts with fresh budget, optionally reduced cap).

---

## 7. Relationship to Adjacent Concepts

Circuit breakers are distinct from, but complementary to, tiered inference:

| Mechanism | When it acts | What it controls |
|---|---|---|
| [[concepts/tiered-inference]] | Before the API call (routing decision) | Which model is called; targets cost-per-call reduction |
| **Agent resource circuit breakers** (this page) | After N calls / after $X spent (loop monitor) | Whether any further call is made at all; targets total session spend |

The two are additive. Tiered inference reduces the cost of each call; circuit breakers bound the total number of calls. Used together they provide both per-call efficiency and per-session safety.

[[concepts/agentic-provenance]] records which model tier and how many iterations were used per agent run — the audit trail that makes post-hoc circuit-breaker review possible. A provenance record showing iteration count = 23 out of a max of 25 is an early-warning signal worth monitoring.

[[concepts/nemoclaw]] sandboxes agent execution in a way that naturally bounds tool-call blast radius, but does not enforce token or iteration limits at the framework layer — that gap is what this page addresses.

---

## Sources

- Martin Fowler, "CircuitBreaker" (bliki, March 2014): [martinfowler.com/bliki/CircuitBreaker.html](https://martinfowler.com/bliki/CircuitBreaker.html)
- Michael Nygard, *Release It! Design and Deploy Production-Ready Software* (Pragmatic Bookshelf, 2007 / 2nd ed. 2018) — origin of the Circuit Breaker pattern name
- Netflix Hystrix documentation (archived): [cloud.spring.io/spring-cloud-netflix/multi/multi__circuit_breaker_hystrix_clients.html](https://cloud.spring.io/spring-cloud-netflix/multi/multi__circuit_breaker_hystrix_clients.html)
- LangChain AgentExecutor API reference: [reference.langchain.com/python/langchain-classic/agents/agent/AgentExecutor](https://reference.langchain.com/python/langchain-classic/agents/agent/AgentExecutor)
- LangChain max_iterations how-to (v0.1): [python.langchain.com/v0.1/docs/modules/agents/how_to/max_iterations/](https://python.langchain.com/v0.1/docs/modules/agents/how_to/max_iterations/)
- LangGraph GRAPH_RECURSION_LIMIT error documentation: [docs.langchain.com/oss/python/langgraph/errors/GRAPH_RECURSION_LIMIT](https://docs.langchain.com/oss/python/langgraph/errors/GRAPH_RECURSION_LIMIT)
- Gabriel Anhaia, "The Agent That Spent $47K on Itself: An Autonomous-Loop Postmortem" (DEV Community, April 2025): [dev.to/gabrielanhaia/the-agent-that-spent-47k-on-itself-an-autonomous-loop-postmortem-3313](https://dev.to/gabrielanhaia/the-agent-that-spent-47k-on-itself-an-autonomous-loop-postmortem-3313)
- Anthropic API rate limits documentation: [platform.claude.com/docs/en/api/rate-limits](https://platform.claude.com/docs/en/api/rate-limits)
- Anthropic Rate Limits API (programmatic introspection): [platform.claude.com/docs/en/manage-claude/rate-limits-api](https://platform.claude.com/docs/en/manage-claude/rate-limits-api)
- OpenAI removed hard budget limits: [grafient.ai/blog/openai-removed-hard-budget-limits](https://grafient.ai/blog/openai-removed-hard-budget-limits)
