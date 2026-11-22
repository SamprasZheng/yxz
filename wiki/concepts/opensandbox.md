---
type: concept
tags: [ai-agents, sandbox, isolation, opensandbox, alibaba, aaif, interop, open-standard, china]
---

# OpenSandbox — The Sandbox-Layer Open Standard (Alibaba → AAIF)

**OpenSandbox** is a general-purpose sandbox platform for AI agents: a unified sandbox API with multi-language SDKs and Docker/Kubernetes runtimes for executing agent-generated code and tool calls in isolation. It is the **sandbox / isolation** sub-layer standard mapped in [[synthesis/agent-runtime-orchestration-six-region]], sitting alongside (and now standardizing the API surface over) runtimes like E2B, Modal, Daytona, and [[concepts/nemoclaw|NemoClaw]]/[[concepts/openshell-runtime|OpenShell]].

**Governance & lineage:** built by **Alibaba**, first released under **Apache-2.0 in 2026-03**; on **2026-10-22** Alibaba **contributed it to the [[concepts/mcp-aerospace-applications|Agentic AI Foundation (AAIF)]]** (Linux Foundation) as one of four projects added that day — alongside [[concepts/agent-skills-standard|Agent Skills]] (Anthropic), Open Responses (OpenAI), and OpenEnv (Hugging Face) — taking AAIF to **10 hosted projects** in its first year.

## Why it matters to this corpus

Two readings in the [[synthesis/agent-runtime-orchestration-six-region|runtime-layer synthesis]] move because of OpenSandbox:

1. **The sandbox sub-layer now has a neutral-foundation API standard.** Previously the sandbox was a competitive-product layer (E2B the European flagship, Daytona gone closed-source 2026-06, OpenAI's Sandbox Agents hosting several as swappable backends). A neutral AAIF-governed sandbox API makes the cage itself more portable/commoditized — reinforcing the "the sandbox is becoming a swappable backend" falsifier status.

2. **It is a partial counter-example to "China open-source = model-funnel."** The synthesis's governance model for China reads every Chinese open-source framework as a funnel coupled to the parent's model + cloud (Qwen-Agent↔Qwen, Coze↔Doubao, AgentScope↔Alibaba-cloud). OpenSandbox breaks that pattern: it is **general-purpose, model- and cloud-decoupled, Apache-2.0, and donated to a US-anchored neutral foundation** — a Chinese open-source project that is *not* a funnel for Alibaba's own model. This is logged as a **watch item**, not a refutation: one decoupled infrastructure contribution does not overturn the dominant funnel pattern, but it is the clearest 2026 instance of a Chinese giant contributing *neutral* agent infrastructure upstream.

## Six-region note

OpenSandbox is the **one non-US contribution** in the 2026-10-22 AAIF four-project cohort (the other three — Agent Skills, Open Responses, OpenEnv — are US-originated). That it is the *sandbox* layer, not the model layer, fits the broader corpus pattern: China leads on open *weights* ([[synthesis/open-weight-llm-agent-stack-six-region]]) but the runtime/infra layer stays mostly US-set — with OpenSandbox the notable exception where a Chinese project set (or co-set) a neutral infra standard.

## See also

- [[synthesis/agent-runtime-orchestration-six-region]] — the runtime-layer map; OpenSandbox is the sandbox-column standard
- [[concepts/agent-skills-standard]] — the skill-store standard added to AAIF in the same 2026-10-22 cohort
- [[concepts/nemoclaw]] · [[concepts/openshell-runtime]] — the owner's sandbox runtime (Landlock/seccomp/netns/L7 proxy); the concrete instance the OpenSandbox standard abstracts over
- [[concepts/mcp-aerospace-applications]] — the canonical AAIF-governance page (full project roster + membership)
