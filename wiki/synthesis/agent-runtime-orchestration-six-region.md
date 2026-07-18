---
type: synthesis
tags: [ai-agents, agent-runtime, orchestration, sandbox, six-region, hackathon, 100-year]
sources:
  - "[[sources/nvidia-agent-challenge-2026]]"
  - "[[sources/nemoclaw-hermes-install-runbook-2026]]"
  - "[[sources/awesome-nemoclaw-voltagent-2026]]"
concepts:
  - "[[concepts/hermes-agent-framework]]"
  - "[[concepts/nemoclaw]]"
  - "[[concepts/openshell-runtime]]"
  - "[[concepts/openclaw]]"
  - "[[concepts/nemotron]]"
  - "[[concepts/nemoclaw-policy-presets]]"
---

# Agent Runtime & Orchestration Layer — Six-Region Map (台美日韓中國歐洲)

**Scope.** This is the **middle layer** of the agent stack: the *frameworks* that structure an agent's loop (plan → act → remember), the *sandboxes* that cage what it is allowed to do, and the *orchestration* that turns identical model calls into a reliable long-running agent. It sits **between** two layers the corpus already maps:

- **below** it — the foundation-model layer, mapped in [[synthesis/open-weight-llm-agent-stack-six-region]] (who builds the *weights* the runtime calls);
- **above** it — the applied vertical, mapped in [[synthesis/llm-satellite-operations-six-region]] (who builds the *satellite-ops* agents that run on a runtime).

The owner's own [[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge 2026]] stack lives entirely in this layer: a [[concepts/nemotron|Nemotron]] model (below) driven by the [[concepts/hermes-agent-framework|Hermes]] framework inside the [[concepts/nemoclaw|NemoClaw]]/[[concepts/openshell-runtime|OpenShell]] sandbox. So does the repo's [[synthesis/firefly-nemoclaw-reference-implementation|Firefly reference implementation]]. This synthesis is the canonical answer to **"who builds the agent runtime — the framework, the sandbox, the orchestration — by region, and why this layer, not the model, is where lock-in accretes."**

## The three sub-layers (vocabulary)

| Sub-layer | What it does | Canonical 2026 artifacts |
|---|---|---|
| **Framework / orchestration** | the agent loop: planning, tool calling, sub-agents, memory, skill creation | LangChain/LangGraph, Microsoft Agent Framework (ex-AutoGen), CrewAI, OpenAI Agents SDK, Anthropic Claude Agent SDK, [[concepts/hermes-agent-framework|Hermes Agent]], LlamaIndex, Pydantic AI, Alibaba Qwen-Agent/AgentScope, ByteDance Coze |
| **Sandbox / isolation** | the cage: filesystem, network, syscall, and inference-credential enforcement *outside* the agent process | [[concepts/nemoclaw|NemoClaw]]/[[concepts/openshell-runtime|OpenShell]] (Landlock+seccomp+netns+L7 proxy), E2B (Firecracker), Modal (gVisor), Daytona, Fly Machines |
| **Memory / skill store** | what makes an agent *stick*: durable memory + self-authored skills across sessions | Hermes learning loop + `~/.hermes/skills/`, mem0/honcho/supermemory backends, MCP-served tools |

The **model** is not in this table — that is the layer below. The distinction is the whole point: models are increasingly commodity and swappable ([[concepts/hermes-agent-framework|Hermes]] alone drives 25+ providers); the framework+sandbox+memory triad is where a builder actually gets locked in.

## Six-region map

| Region | Framework / orchestration | Sandbox / isolation | Posture | Governance model |
|---|---|---|---|---|
| **US 🇺🇸** | Dominant + plural: LangChain ~134k★ / LangGraph 1.0, Microsoft Agent Framework (AutoGen ~59k★ + Semantic Kernel, merged 2025-10), CrewAI, OpenAI Agents SDK, Anthropic Claude Agent SDK, **[[concepts/hermes-agent-framework|Nous Hermes]] ~188k★ (fastest-growing 2026)**, LlamaIndex | Deepest: **[[concepts/nemoclaw|NVIDIA NemoClaw/OpenShell]]**, Modal (gVisor), Fly Machines, Cloudflare; OpenAI SDK ships sandboxed exec (E2B/Modal/Cloudflare/Vercel) | **Sets the standard.** Owns the framework *and* the sandbox-infra market | **Open-ecosystem dominance** |
| **China 🇨🇳** | Fast-follow, big-tech open-sourced + **model-coupled**: Alibaba **Qwen-Agent** (OSS 2026-03) + **AgentScope 2.0** (permission system, multi-tenancy) + QwenPaw, ByteDance **Coze Studio** (OSS 2025-07), **Dify** (LangGenius) | Folded into the frameworks (AgentScope permission/tool sandboxing); less standalone-sandbox market | Each giant open-sources a framework to funnel devs onto its own model + cloud | **Open-as-model-funnel** |
| **Europe 🇪🇺** | **Component-specialist, not full-stack**: Haystack/**deepset** (Berlin, RAG→agent orchestration), **Pydantic AI** (UK, type-safe), Mistral agents (France, model+agent) | **Owns the sandbox flagship: E2B** (Czech-founded, Firecracker; used by HuggingFace/Perplexity, "94% of Fortune 100"), Daytona (Croatian-founded, $24M Series A 2026-02) | Wins specific high-value *components*, not the whole stack | **Component-specialist** |
| **Japan 🇯🇵** | Thin framework layer; consumes US frameworks. Research node: Sakana AI (Tokyo, evolutionary/agent research); NEC/Fujitsu enterprise agents | Consumer | Research + enterprise-vertical, not standard-setting | **Consume-and-compose** |
| **Korea 🇰🇷** | Thin; model-coupled wrappers: Upstage (Solar + document agents), LG AI Research (EXAONE agents), Naver (HyperCLOVA X agents) | Consumer | Enterprise-vertical over sovereign models | **Consume-and-compose** |
| **Taiwan 🇹🇼** | **No sovereign framework or sandbox.** Builders *compose* US frameworks (Hermes/NemoClaw) over US/China models. The owner's [[synthesis/firefly-nemoclaw-reference-implementation|Firefly]] / [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]] = the de-facto Taiwan entry | Consumer of US sandbox (NemoClaw) | Upstream-strong / midstream-absent — the *same* pattern as every other layer | **Consume-and-compose** |

★ = approximate GitHub stars as of mid-2026, a proxy for framework mind-share, not quality.

## Three governance models (the reading)

1. **Open-ecosystem dominance (US).** The US does not have *a* framework; it has a Cambrian explosion of MIT/Apache frameworks plus a maturing standalone-sandbox market. Standard-setting emerges from ecosystem gravity (MCP, A2A) rather than a single vendor. NemoClaw is the security-forward instance; Hermes is the memory-forward instance; the interop standards are US-authored.
2. **Open-as-model-funnel (China).** Every Chinese giant open-sources a *framework coupled to its own model* — Qwen-Agent↔Qwen, Coze↔Doubao, AgentScope↔Alibaba-cloud — so the framework is a customer-acquisition channel for the model + cloud beneath it, not a neutral standard. This is the runtime-layer twin of the "open-as-funnel" pattern flagged for models in [[synthesis/open-weight-llm-agent-stack-six-region]].
3. **Component-specialist / consume-and-compose (Europe + Japan/Korea/Taiwan).** Europe declines the full-stack race and instead *owns* discrete high-value components — E2B for the sandbox, Pydantic for type-safety, Haystack for RAG-orchestration — a defensible-niche bet. Japan, Korea, and Taiwan mostly consume US frameworks and compose them over their own (or others') models; the owner's Firefly stack is the textbook Taiwan instance.

> **Reading note — the layer, not the region, is the story.** Unlike the model layer (where the open-weight frontier genuinely *moved* to China) or the SSA layer (where catalog authority is a sovereignty lever), the runtime layer in 2026 is **overwhelmingly US-authored**, with Europe holding one strong component (the sandbox) and China building model-coupled funnels. The interesting asymmetry is *vertical*, not horizontal: the model below is commoditizing while the runtime is consolidating US mind-share.

## Historical lineage — two clocks converging

The runtime layer is the collision of two decades-old engineering lineages that only fused in 2025–26.

**Sandbox / isolation lineage** (the cage): `chroot` (1979) → FreeBSD **jails** (2000) → Solaris **Zones** (2004) → LXC / **Docker** (2013) → **gVisor** + **Firecracker** (both 2018; Firecracker built for AWS Lambda) → **agent-specific sandboxes** (2025–26: E2B, Modal, Daytona, [[concepts/nemoclaw|NemoClaw]]). The novelty in the last step is not the isolation primitive (those are 1979–2018 technology) but the **out-of-process credential + intent enforcement** ([[concepts/openshell-runtime|OpenShell]]'s L7 proxy) built for an agent that writes and runs its *own* code.

**Agent-loop lineage** (the brain): **ReAct** (2022, reason+act interleaving) → **AutoGPT / BabyAGI** (2023, the autonomous-loop viral moment) → **LangChain / AutoGen / CrewAI** (2023–24, the framework wars) → **self-improving, skill-authoring agents** (2025–26: [[concepts/hermes-agent-framework|Hermes]]' learning loop, contained sub-agents). The novelty here is **durable memory + self-written skills** — the agent that improves *between* sessions, not just within one.

These two clocks fuse in the 2026 hackathon stack: Hermes (agent-loop lineage) inside NemoClaw (sandbox lineage) is exactly one of each.

## Long-horizon (labelled scenario / projection, not fact)

- **~2030s** — Interop standards (MCP, A2A) win or fragment. If they win, frameworks commoditize like web frameworks did and the *sandbox + memory* become the paid layer. If they fragment, model vendors capture runtimes (China's funnel model spreads).
- **~2050s** — Hardware-attested confidential-compute agent enclaves become table stakes; "an agent you are *allowed to trust to act*" is a regulated capability, not a library import. The permission boundary NemoClaw prototypes becomes a compliance surface (echoing [[concepts/agentic-provenance]]).
- **~2100 (structural)** — **The 100-year invariant: the model commoditizes downward, but the orchestration + memory + permission layer is where lock-in and trust permanently accrete.** "The agent that *remembers you and is allowed to act on your behalf*" is stickier than "the model that answers you," because it holds two things a competitor cannot copy: the accumulated per-user skill/memory store, and the audited permission history. Whoever owns the runtime owns the relationship — the model is just the interchangeable engine. This is the agent-era restatement of the old "the OS, not the CPU, is the moat" lesson.

**The fork:** converge on an open, portable runtime standard (agents you can carry between vendors, like email) **vs** consolidate into a handful of vendor-captured runtimes (agents locked to whoever holds your memory store). 2026 has evidence for both — MCP/A2A pull toward portability; China's model-coupled frameworks and the stickiness of proprietary memory pull toward capture.

## Falsifier table

| Claim in this map | What would falsify it | Status (2026-07) |
|---|---|---|
| Runtime layer is US-authored-dominant | A non-US framework crosses into the global top-3 by production adoption (not stars) | **Holding** — top frameworks (LangChain, MS Agent Framework, OpenAI/Claude SDKs, Hermes) all US; China's are large but model-coupled/domestic-first |
| The framework is a funnel, the memory is the moat | Frameworks stay differentiated and profitable while memory/skill stores commoditize | **Open** — Hermes' ~188k-star surge is framework-led, but its *stickiness* claim rests on the memory loop; too early |
| Europe = component-specialist (owns the sandbox) | A European full-stack framework reaches US-tier adoption, OR E2B loses the sandbox lead to a US incumbent | **Holding** — E2B is the sandbox reference; no European full-stack framework at LangChain scale |
| China = open-as-model-funnel | A Chinese framework achieves mass adoption *decoupled* from its parent's model/cloud | **Holding** — Qwen-Agent/Coze/AgentScope remain model- and cloud-coupled |
| Model commoditizes, runtime consolidates (100-yr) | Model margins stay high while runtimes fragment into commodity | **Too early** — directional only; MCP/A2A vs vendor-capture unresolved |

## See also

- [[synthesis/open-weight-llm-agent-stack-six-region]] — the **model layer below** this runtime (who builds the weights it calls)
- [[synthesis/llm-satellite-operations-six-region]] — the **applied vertical above** it (satellite-ops agents built on a runtime)
- [[synthesis/firefly-nemoclaw-reference-implementation]] — the repo's own runtime instance (Hermes/Nemotron-router inside NemoClaw) and its Claude-vs-Nemotron divergence
- [[synthesis/spacesharks-trust-stack]] — the reliability architecture layered *on top of* a runtime (small-model ensemble, tiered inference, calibrated confidence, provenance)
- [[concepts/hermes-agent-framework]] · [[concepts/nemoclaw]] · [[concepts/openshell-runtime]] · [[concepts/openclaw]] · [[concepts/nemotron]] · [[concepts/nemoclaw-policy-presets]] · [[concepts/dgx-spark]]

## Sources (accessed 2026-07-18; corroborated across ≥2 independently-named sources, framework/vendor primary docs preferred)

- Hermes ~188k stars by June 2026, released 2026-02-25, NVIDIA reference runtime for Nemotron 3 Ultra — Dealroom, The Agent Report, DEV Community, GitHub NousResearch/hermes-agent
- LangChain ~134k / LangGraph 1.0 / AutoGen ~58.7k / Microsoft Agent Framework (AutoGen+Semantic Kernel merged 2025-10) — JetBrains Blog, Alice Labs, LangChain.com, GitHub
- Alibaba Qwen-Agent (OSS 2026-03) + AgentScope 2.0, ByteDance Coze Studio (OSS 2025-07), Dify — CNBC, GitHub QwenLM/Qwen-Agent, agentscope.io, Open Source For You
- Europe: Haystack/deepset (Berlin), Pydantic AI (UK), E2B (Czech, Firecracker), Daytona ($24M Series A 2026-02) — Vstorm, GitHub deepset-ai/haystack, e2b.dev, Northflank, Spheron
- Sandbox isolation tech (gVisor/Firecracker/microVM lineage) — Modal Blog, AgentMarketCap, Spheron, Medium/Earlperry
