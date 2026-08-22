---
type: synthesis
tags: [ai-agents, agent-runtime, orchestration, sandbox, agent-memory, interop, mcp, a2a, six-region, hackathon, 100-year]
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
| **US 🇺🇸** | Dominant + plural: **LangChain 1.0 + LangGraph 1.0** (both GA 2025-10-22; LangGraph the most-*installed* framework at ~34.5M PyPI downloads/mo across ~400 production shops — Uber/LinkedIn/Klarna/Replit/Elastic), Microsoft Agent Framework (AutoGen ~59k★ + Semantic Kernel, merged 2025-10), CrewAI, OpenAI Agents SDK, Anthropic Claude Agent SDK, **[[concepts/hermes-agent-framework|Nous Hermes]] ~188k★ (fastest-growing 2026)**, LlamaIndex | Deepest: **[[concepts/nemoclaw|NVIDIA NemoClaw/OpenShell]]**, Modal (gVisor), Fly Machines, Cloudflare, Runloop; OpenAI **Sandbox Agents** (shipped 2026-04-15) hosts seven providers (Blaxel/Cloudflare/Daytona/E2B/Modal/Runloop/Vercel) | **Sets the standard.** Owns the framework *and* the sandbox-infra market | **Open-ecosystem dominance** |
| **China 🇨🇳** | Fast-follow, big-tech open-sourced + **model-coupled**: Alibaba **Qwen-Agent** (OSS 2026-03) + **AgentScope 2.0** (permission system, multi-tenancy) + QwenPaw, ByteDance **Coze Studio** (OSS 2025-07), **Dify** (LangGenius) | Folded into the frameworks (AgentScope permission/tool sandboxing); less standalone-sandbox market | Each giant open-sources a framework to funnel devs onto its own model + cloud | **Open-as-model-funnel** |
| **Europe 🇪🇺** | **Component-specialist, not full-stack**: Haystack/**deepset** (Berlin, RAG→agent orchestration), **Pydantic AI** (UK, type-safe), Mistral agents (France, model+agent) | **Owns the sandbox flagship: E2B** (Czech-founded, Firecracker microVMs ~150 ms boot; used by HuggingFace/Perplexity, "94% of Fortune 100"), Daytona (Croatian-founded, hardened-OCI 27–90 ms; **moved its production codebase closed-source June 2026** on security grounds — the OSS repo is now unmaintained) | Wins specific high-value *components*, not the whole stack | **Component-specialist** |
| **Japan 🇯🇵** | Thin framework layer; consumes US frameworks. Research node: Sakana AI (Tokyo, evolutionary/agent research); NEC/Fujitsu enterprise agents | Consumer | Research + enterprise-vertical, not standard-setting | **Consume-and-compose** |
| **Korea 🇰🇷** | Thin; model-coupled wrappers: Upstage (Solar + document agents), LG AI Research (EXAONE agents), Naver (HyperCLOVA X agents) | Consumer | Enterprise-vertical over sovereign models | **Consume-and-compose** |
| **Taiwan 🇹🇼** | **No sovereign framework or sandbox.** Builders *compose* US frameworks (Hermes/NemoClaw) over US/China models. The owner's [[synthesis/firefly-nemoclaw-reference-implementation|Firefly]] / [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]] = the de-facto Taiwan entry | Consumer of US sandbox (NemoClaw) | Upstream-strong / midstream-absent — the *same* pattern as every other layer | **Consume-and-compose** |

★ = approximate GitHub stars as of mid-2026, a proxy for framework mind-share, not quality.

## Three governance models (the reading)

1. **Open-ecosystem dominance (US).** The US does not have *a* framework; it has a Cambrian explosion of MIT/Apache frameworks plus a maturing standalone-sandbox market. Standard-setting emerges from ecosystem gravity (MCP, A2A) rather than a single vendor. NemoClaw is the security-forward instance; Hermes is the memory-forward instance; the interop standards are US-authored.
2. **Open-as-model-funnel (China).** Every Chinese giant open-sources a *framework coupled to its own model* — Qwen-Agent↔Qwen, Coze↔Doubao, AgentScope↔Alibaba-cloud — so the framework is a customer-acquisition channel for the model + cloud beneath it, not a neutral standard. This is the runtime-layer twin of the "open-as-funnel" pattern flagged for models in [[synthesis/open-weight-llm-agent-stack-six-region]].
3. **Component-specialist / consume-and-compose (Europe + Japan/Korea/Taiwan).** Europe declines the full-stack race and instead *owns* discrete high-value components — E2B for the sandbox, Pydantic for type-safety, Haystack for RAG-orchestration — a defensible-niche bet. Japan, Korea, and Taiwan mostly consume US frameworks and compose them over their own (or others') models; the owner's Firefly stack is the textbook Taiwan instance.

> **Reading note — the layer, not the region, is the story.** Unlike the model layer (where the open-weight frontier genuinely *moved* to China) or the SSA layer (where catalog authority is a sovereignty lever), the runtime layer in 2026 is **overwhelmingly US-authored**, with Europe holding one strong component (the sandbox) and China building model-coupled funnels. The interesting asymmetry is *vertical*, not horizontal: the model below is commoditizing while the runtime is consolidating US mind-share.

## The memory / skill-store sub-layer — the untreated third column

The six-region table above maps the framework and sandbox sub-layers; the **third row of the vocabulary table — memory / skill store — deserves its own read, because it is where the 100-year moat (see the long-horizon section below) actually sits.** In 2026 a distinct startup layer emerged *underneath* the frameworks to sell durable cross-session memory as a service — and it is even more US-concentrated than the framework layer:

| Vendor | Model | Region | 2026 traction |
|---|---|---|---|
| **Mem0** | LLM fact-extraction → vector store + entity-linking; add recall *without* replacing the runtime; managed or self-hosted | US | Largest agent-memory community; **$24.5M raised, ~186M API calls/quarter** |
| **Letta** (ex-MemGPT) | Memory as a *first-class agent component* — core-memory blocks always in-prompt + archival memory the agent tool-calls into | US | The "agent controls its own context window" architecture; best adopted in a new agent design |
| **Zep** | Temporal knowledge-graph memory | US | Enterprise-context / graph-recall niche |
| **[[concepts/hermes-agent-framework|Hermes]] built-in loop** | Memory + self-authored skills folded *into the framework* (`~/.hermes/skills/`, pluggable `memory.provider` backends: honcho/mem0/supermemory/…) | US (Nous) | Framework-native, not a standalone SaaS — the opposite integration choice from Mem0/Letta |

**The read:** where frameworks are plural and sandboxes have a European flagship, the memory layer is an almost purely **US-vendor market** (Mem0/Letta/Zep) with **no China/Europe/Japan/Korea/Taiwan standalone competitor at scale** — those regions consume it or, like Hermes, bundle it into the framework. Two integration philosophies compete: **memory-as-a-service** (Mem0/Zep bolt onto any runtime) vs **memory-as-framework-primitive** (Letta/Hermes make it inseparable from the agent loop). The second is the stickier moat — it is exactly the "the agent that remembers you is inseparable from the agent that acts for you" bet the 100-year view rests on. Industry framing that "**~65% of enterprise agent failures trace to context drift, not model capability**" is why this once-invisible sub-layer became a funded market in 2026.

## The interop axis — MCP + A2A (the fork's referee)

The 100-year fork (see the long-horizon section below) — *portable open runtime* vs *vendor-captured runtime* — is not decided by any framework; it is decided by whether the **two interoperability standards converge or fragment.** By 2026 both are **Linux-Foundation-governed, vendor-neutral projects**, and they are complementary rather than competing:

- **MCP (Model Context Protocol)** — *vertical*, agent↔tool/data ("USB-C for tool connectivity"). This is the standard [[concepts/nemoclaw|NemoClaw]]'s L7 egress policy and [[concepts/hermes-agent-framework|Hermes]]' `:8642` endpoint already speak; see [[concepts/mcp-aerospace-applications]] for the aerospace tool-server instance.
- **A2A (Agent2Agent)** — *horizontal*, agent↔agent across org boundaries ("HTTP for agent collaboration"). Announced by Google 2025-04-09, **donated to the Linux Foundation 2025-06-23**; at its one-year mark (2026-04-09) the project reported **150+ supporting organizations, deep integration across Google/Microsoft/AWS, and production deployments** in supply-chain, finance, insurance and IT-ops.

A production system runs **both**: A2A routes a task to the right specialist agent, MCP gives that agent its tools and context. **The 2026 evidence leans toward *convergence*, not fragmentation** — two neutral standards under one foundation, adopted by all three US hyperscalers — which weakens the "vendor-captured runtime" arm of the fork at the *protocol* level. The capture risk that remains is not the wire protocol but the **memory store** (above): you can carry an A2A/MCP-speaking agent between vendors, but not the accumulated per-user skill/memory unless *that* is portable too. So the fork's real battleground has narrowed from "will the protocols interoperate" (increasingly yes) to "will your agent's *memory* be portable" (unsettled).

## Historical lineage — two clocks converging

The runtime layer is the collision of two decades-old engineering lineages that only fused in 2025–26.

**Sandbox / isolation lineage** (the cage): `chroot` (1979) → FreeBSD **jails** (2000) → Solaris **Zones** (2004) → LXC / **Docker** (2013) → **gVisor** + **Firecracker** (both 2018; Firecracker built for AWS Lambda) → **agent-specific sandboxes** (2025–26: E2B, Modal, Daytona, [[concepts/nemoclaw|NemoClaw]]). The novelty in the last step is not the isolation primitive (those are 1979–2018 technology) but the **out-of-process credential + intent enforcement** ([[concepts/openshell-runtime|OpenShell]]'s L7 proxy) built for an agent that writes and runs its *own* code.

**Agent-loop lineage** (the brain): **ReAct** (2022, reason+act interleaving) → **AutoGPT / BabyAGI** (2023, the autonomous-loop viral moment) → **LangChain / AutoGen / CrewAI** (2023–24, the framework wars) → **self-improving, skill-authoring agents** (2025–26: [[concepts/hermes-agent-framework|Hermes]]' learning loop, contained sub-agents). The novelty here is **durable memory + self-written skills** — the agent that improves *between* sessions, not just within one.

These two clocks fuse in the 2026 hackathon stack: Hermes (agent-loop lineage) inside NemoClaw (sandbox lineage) is exactly one of each.

## Long-horizon (labelled scenario / projection, not fact)

- **~2030s** — Interop standards (MCP, A2A) win or fragment. **2026 evidence leans win:** both are Linux-Foundation-governed and A2A already spans 150+ orgs across all three US hyperscalers (see the interop-axis section above). If they keep winning, frameworks commoditize like web frameworks did and the *sandbox + memory* become the paid layer — which is precisely why the dedicated memory market (Mem0/Letta/Zep) capitalized in 2026. If they fragment, model vendors capture runtimes (China's funnel model spreads).
- **~2050s** — Hardware-attested confidential-compute agent enclaves become table stakes; "an agent you are *allowed to trust to act*" is a regulated capability, not a library import. The permission boundary NemoClaw prototypes becomes a compliance surface (echoing [[concepts/agentic-provenance]]).
- **~2100 (structural)** — **The 100-year invariant: the model commoditizes downward, but the orchestration + memory + permission layer is where lock-in and trust permanently accrete.** "The agent that *remembers you and is allowed to act on your behalf*" is stickier than "the model that answers you," because it holds two things a competitor cannot copy: the accumulated per-user skill/memory store, and the audited permission history. Whoever owns the runtime owns the relationship — the model is just the interchangeable engine. This is the agent-era restatement of the old "the OS, not the CPU, is the moat" lesson.

**The fork:** converge on an open, portable runtime standard (agents you can carry between vendors, like email) **vs** consolidate into a handful of vendor-captured runtimes (agents locked to whoever holds your memory store). 2026 has evidence for both, but the two halves have *split cleanly*: at the **protocol** level portability is winning (MCP/A2A converging under the Linux Foundation), while at the **memory-store** level capture is the live risk (China's model-coupled frameworks + proprietary per-user memory that no standard yet makes portable). The 100-year question has therefore sharpened from "will agents interoperate on the wire" (increasingly yes) to "will your agent's accumulated *memory and skills* be portable, or will they be the lock-in."

## Falsifier table

| Claim in this map | What would falsify it | Status (2026-08-22) |
|---|---|---|
| Runtime layer is US-authored-dominant | A non-US framework crosses into the global top-3 by production adoption (not stars) | **Holding** — top frameworks (LangGraph the most-*installed* at ~34.5M downloads/mo/~400 shops, MS Agent Framework, OpenAI/Claude SDKs, Hermes) all US; China's are large but model-coupled/domestic-first |
| The framework is a funnel, the memory is the moat | Frameworks stay differentiated and profitable while memory/skill stores commoditize | **Strengthening** — a *dedicated* US memory market (Mem0 $24.5M/~186M calls-per-qtr, Letta, Zep) capitalized *underneath* the frameworks in 2026, exactly where the moat thesis predicts; portability of the store, not the protocol, is now the open question |
| Europe = component-specialist (owns the sandbox) | A European full-stack framework reaches US-tier adoption, OR E2B loses the sandbox lead to a US incumbent | **Holding, but watch consolidation** — E2B still the sandbox reference; the peer Daytona went closed-source (June 2026) and OpenAI's Sandbox Agents now *hosts* E2B/Daytona/Modal as interchangeable providers, i.e. a US framework is commoditizing the European cage into a swappable backend |
| China = open-as-model-funnel | A Chinese framework achieves mass adoption *decoupled* from its parent's model/cloud | **Holding** — Qwen-Agent/Coze/AgentScope remain model- and cloud-coupled |
| Interop standards converge (not fragment) | MCP or A2A splinters into incompatible vendor forks, or a hyperscaler ships a proprietary rival | **Holding toward convergence** — both MCP + A2A are Linux-Foundation-governed; A2A passed 150+ orgs + Google/MS/AWS integration by 2026-04; no dominant proprietary rival has emerged |
| Model commoditizes, runtime consolidates (100-yr) | Model margins stay high while runtimes fragment into commodity | **Too early** — directional only; protocol-convergence now favors portability while proprietary *memory* stores pull toward capture |

## See also

- [[synthesis/open-weight-llm-agent-stack-six-region]] — the **model layer below** this runtime (who builds the weights it calls)
- [[synthesis/llm-satellite-operations-six-region]] — the **applied vertical above** it (satellite-ops agents built on a runtime)
- [[synthesis/firefly-nemoclaw-reference-implementation]] — the repo's own runtime instance (Nemotron dual-mode router inside NemoClaw); its Python runtime is now Nemotron end-to-end (re-verified 2026-08-06), with only the `nemo_workflow.yaml` declaration still lagging on Claude — a concrete worked example of this map's "the model is swappable, the runtime is the durable layer" thesis
- [[synthesis/spacesharks-trust-stack]] — the reliability architecture layered *on top of* a runtime (small-model ensemble, tiered inference, calibrated confidence, provenance)
- [[concepts/mcp-aerospace-applications]] — the aerospace instance of the MCP interop standard treated on the interop axis above (which tool servers a runtime is allowed to call)
- [[concepts/hermes-agent-framework]] · [[concepts/nemoclaw]] · [[concepts/openshell-runtime]] · [[concepts/openclaw]] · [[concepts/nemotron]] · [[concepts/nemoclaw-policy-presets]] · [[concepts/dgx-spark]]

## Sources (framework/vendor primary docs preferred; corroborated across ≥2 independently-named sources)

**Accessed 2026-07-18:**
- Hermes ~188k stars by June 2026, released 2026-02-25, NVIDIA reference runtime for Nemotron 3 Ultra — Dealroom, The Agent Report, DEV Community, GitHub NousResearch/hermes-agent
- Alibaba Qwen-Agent (OSS 2026-03) + AgentScope 2.0, ByteDance Coze Studio (OSS 2025-07), Dify — CNBC, GitHub QwenLM/Qwen-Agent, agentscope.io, Open Source For You
- Sandbox isolation tech (gVisor/Firecracker/microVM lineage) — Modal Blog, AgentMarketCap, Spheron, Medium/Earlperry

**Refreshed 2026-08-22 (this deepening pass):**
- LangChain 1.0 + LangGraph 1.0 both GA 2025-10-22; LangGraph most-installed (~34.5M PyPI downloads/mo, ~400 production companies incl. Uber/LinkedIn/Klarna/Replit/Elastic); `create_agent` runs on LangGraph runtime — langchain.com/blog/langchain-langgraph-1dot0, changelog.langchain.com, Wikipedia LangChain
- E2B (Firecracker ~150 ms), Modal (gVisor), Daytona (hardened-OCI 27–90 ms; production codebase **closed-sourced June 2026**), OpenAI Agents SDK **Sandbox Agents** shipped 2026-04-15 with 7 hosted providers (Blaxel/Cloudflare/Daytona/E2B/Modal/Runloop/Vercel) — AgentMarketCap, Spheron Blog, Northflank, Particula, Temps.sh
- A2A: Google announced 2025-04-09, donated to Linux Foundation 2025-06-23; 1-yr milestone 2026-04-09 = 150+ orgs, Google/MS/AWS integration, production use; MCP + A2A both LF-governed and complementary (MCP vertical agent↔tool, A2A horizontal agent↔agent) — Linux Foundation press, Google Open Source Blog, PRNewswire, Wikipedia Agent2Agent
- Agent-memory market: Mem0 ($24.5M raised, ~186M API calls/quarter, largest community), Letta (memory as first-class agent component, core+archival blocks), Zep (temporal knowledge-graph); ~65% of enterprise-agent failures attributed to context drift — Mem0.ai, DEV Community, Braintrust, Developers Digest, Value Add VC
