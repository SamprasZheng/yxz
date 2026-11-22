---
type: concept
tags: [ai-agents, agent-skills, skill-store, agent-memory, anthropic, aaif, interop, open-standard, nvidia-agent-challenge-2026]
---

# Agent Skills — The Skill-Store Open Standard (Anthropic → AAIF)

**Agent Skills** is an open format for packaging reusable agent capabilities and domain expertise — a named, versioned bundle (instructions + optional scripts/resources) that any compatible agent runtime can load to acquire a new skill, without re-prompting or re-coding. It is the **skill half** of the "memory / skill store" sub-layer mapped in [[synthesis/agent-runtime-orchestration-six-region]].

**Governance:** originated by **Anthropic**; on **2026-10-22** Anthropic **donated the Agent Skills name, repository, and specification to the [[concepts/mcp-aerospace-applications|Agentic AI Foundation (AAIF)]]** (Linux Foundation) as one of four projects added that day (alongside Open Responses from OpenAI, OpenEnv from Hugging Face, and [[concepts/opensandbox|OpenSandbox]] from Alibaba), taking AAIF to **10 hosted projects** in its first year. Anthropic committed to keeping it **open, community-driven, and vendor-neutral**; using or contributing to the standard does **not** require AAIF membership.

## Why it matters to this corpus

The [[synthesis/agent-runtime-orchestration-six-region|runtime-layer synthesis]] argued that while the *interop protocols* ([[concepts/mcp-aerospace-applications|MCP]] + A2A) had converged under a neutral foundation, the **memory / skill store had no such neutral-foundation analog** — so capture risk concentrated there. Agent Skills **partially resolves that**: the *skill* portion (reusable, transferable capabilities) now has a vendor-neutral standard, mirroring what MCP did for tools and A2A did for inter-agent messaging. What remains un-standardized is the **per-user accumulated *memory*** half — cross-session recall (Mem0 / Letta / Zep as a service, or the [[concepts/hermes-agent-framework|Hermes]] learning loop as a framework primitive) — which is now the single most-captured layer in the stack.

This is the practical distinction the 100-year "portability vs capture" fork now turns on:

| Layer | Neutral-foundation standard? | 2026 status |
|---|---|---|
| Tool invocation | **Yes** — MCP (AAIF, 2025-12) | converged |
| Inter-agent messaging | **Yes** — A2A (AAIF, 2026-08-17) | converged |
| Sandbox / isolation | **Yes** — [[concepts/opensandbox|OpenSandbox]] (AAIF, 2026-10-22) | newly standardized |
| **Skills** (reusable capabilities) | **Yes** — **Agent Skills (AAIF, 2026-10-22)** | newly standardized |
| **Per-user memory** (cross-session recall) | **No** | the remaining capture surface |

## Relation to the owner's stack

[[concepts/hermes-agent-framework|Hermes]] already implements a skill store natively (`~/.hermes/skills/`, agent-authored skills that self-improve during use) — a *framework-primitive* instance of the same idea Agent Skills now standardizes as a *portable format*. For the [[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge]] entry, the relevance is that skills authored inside the Hermes/NemoClaw stack can, in principle, become portable artifacts under a neutral standard rather than Hermes-locked — reinforcing the [[synthesis/firefly-nemoclaw-reference-implementation|"the runtime is swappable, the accumulated store is the moat"]] reading.

## Six-region note

Agent Skills is a **US-originated (Anthropic) standard placed under a US-anchored neutral foundation** — consistent with the runtime layer's "US-authored-dominant" posture. Unlike the model layer (where the open-weight frontier moved to China), the skill-store standard is US-set; other regions consume or contribute to it (e.g. Alibaba's [[concepts/opensandbox|OpenSandbox]] joined the same AAIF cohort on the *sandbox* axis — the one Chinese contribution in that four-project batch).

## See also

- [[synthesis/agent-runtime-orchestration-six-region]] — the runtime-layer map; Agent Skills is the skill-store standard in the memory/skill column
- [[concepts/opensandbox]] — the sandbox-layer standard added to AAIF in the same 2026-10-22 cohort
- [[concepts/mcp-aerospace-applications]] — the canonical AAIF-governance page (MCP + the full project roster)
- [[concepts/hermes-agent-framework]] — the framework-native skill store that Agent Skills standardizes as a portable format
