---
type: source
tags: [ai-agents, guardrails, hitl, langgraph, langchain, orchestration]
title: "Making it easier to build human-in-the-loop agents with interrupt"
author: "LangChain Team"
date: "2025-01-01"
ingested: "2026-06-01"
---

# LangGraph: Human-in-the-Loop with `interrupt()` and `Command(resume=...)`

- **Blog post**: [langchain.com/blog/making-it-easier-to-build-human-in-the-loop-agents-with-interrupt](https://www.langchain.com/blog/making-it-easier-to-build-human-in-the-loop-agents-with-interrupt)
- **Reference docs**: [langchain-ai.github.io/langgraph](https://langchain-ai.github.io/langgraph/)
- **How-to (static breakpoints)**: [langchain-ai.github.io/langgraph/cloud/how-tos/human_in_the_loop_breakpoint/](https://langchain-ai.github.io/langgraph/cloud/how-tos/human_in_the_loop_breakpoint/)

## What `interrupt()` Solves

LangGraph previously offered `NodeInterrupt` and static breakpoints for human-in-the-loop control. These were adequate for development but lacked:

- Production-ready checkpointing (state lost if the process died during a pause)
- Resource efficiency (the graph held compute resources during a pause)
- Clean async resumption from a separate process or UI

`interrupt()` (introduced 2025) addresses all three by checkpointing graph state to a persistent store before pausing.

## The API

```python
from langgraph.types import interrupt, Command

# Within a graph node:
human_decision = interrupt("Approve this action? [y/n]")
# Execution pauses here; state is checkpointed; resources released.

# To resume (from any process, any time later):
graph.invoke(Command(resume="y"), thread_config)
```

Structured data can be passed to both `interrupt()` and `Command(resume=...)` — not just strings. This supports complex review workflows (e.g., returning a modified version of the proposed action, not just approve/reject).

## Persistence Requirement

LangGraph's checkpoint system persists graph state at every step ("reads from and then writes to a checkpoint of that graph state"). This means:

- Pauses can last seconds or months — resources are released; only storage is needed
- Resumption can happen on a different machine or process
- In production: use `AsyncPostgresSaver` or equivalent; `MemorySaver` is development-only

## Decision Types

Human review at an interrupt point can:

- **Approve** — pass `Command(resume="y")` or equivalent
- **Edit** — pass a modified version of the proposed action as the resume payload
- **Reject** — pass a rejection; the graph node handles it
- **Redirect** — pass instructions for a different approach

## Human Decision Taxonomy (HITL Workflow Patterns)

| Decision | Mechanism | Use case |
|---|---|---|
| Approve as-is | `Command(resume="approved")` | Standard HITL gate |
| Approve with edit | `Command(resume={"modified_cmd": "..."})` | Operator corrects the proposed command |
| Reject | `Command(resume="rejected")` | High-risk action declined |
| Escalate | Redirect to different node | Ambiguous case needs a human decision tree |

## Relationship to [[concepts/agent-execution-guardrails]]

`interrupt()` is the framework-native implementation of Layer 1 (HITL approval gates) in [[concepts/agent-execution-guardrails]]. The pattern maps directly to the wrapper-layer pause-and-confirm design: the gate lives in the graph node (execution wrapper), not in the model's prompt, so it cannot be bypassed by the agent's reasoning or a prompt injection.

The persistence requirement is important for production deployments: a HITL gate that is not checkpointed can be bypassed by process restart — making it a gate only in development. Production HITL requires a durable checkpoint store.
