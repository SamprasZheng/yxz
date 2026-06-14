---
type: synthesis
tags: [ai-agents, nemoclaw, openshell, nemotron, firefly, sandbox, hackathon, code-integration]
concepts: ["[[concepts/nemoclaw]]", "[[concepts/openshell-runtime]]", "[[concepts/nemotron]]", "[[concepts/nemoclaw-policy-presets]]", "[[concepts/dgx-spark]]"]
sources: ["[[sources/nvidia-agent-challenge-2026]]", "[[sources/nemoclaw-hermes-install-runbook-2026]]"]
---

# Firefly as a Reference Implementation of the NVIDIA Agent-Challenge Stack

**Question this answers:** the wiki's AI-agent-runtime concept pages ([[concepts/nemotron]], [[concepts/nemoclaw]], [[concepts/openshell-runtime]], [[concepts/nemoclaw-policy-presets]], [[concepts/dgx-spark]]) describe NVIDIA's GTC-Taipei agent stack *abstractly*. The repo's own `agents/` tree — the **Firefly orbital-data-center mission architect** — is a *concrete* implementation of that same stack. How do the concepts map onto the code, and where do they diverge?

This is the **向內消化 / concept↔code 整合** page for the AI-agent-runtime cluster: every claim below is grounded in a file in `agents/`, read directly (not the LLM's prior). Code is **never modified** by this routine — divergences are recorded for the owner.

## The stack, abstract → concrete

| Layer | Concept page (abstract) | Firefly file (concrete) | Match? |
|---|---|---|---|
| **Model** | [[concepts/nemotron]] — Nemotron family, `detailed thinking on/off` directive, NIM SKUs | `src/firefly/llm/nemotron.py` — OpenAI-compat client; `REASONING_ON/OFF_SYSTEM_PREFIX`; Super-49B + Nano-9B cloud SKUs | ✅ faithful |
| **Routing** | [[concepts/nemotron]] variant-selection (planner vs executor) | `src/firefly/llm/router.py` — `Role.PLANNER` (thinking ON, temp 0.15) / `Role.EXECUTOR` (thinking OFF, temp 0.3), **same** `nemotron-3-nano:4b` twice | ✅ faithful + sharper |
| **Sandbox runtime** | [[concepts/openshell-runtime]] — Landlock/seccomp/netns/credential-vault | `firefly-sandbox.yaml` `filesystem`/`process`/`network`/`inference` blocks | ✅ 1-to-1 |
| **Runtime distribution** | [[concepts/nemoclaw]] — 4 policy domains + intent injection | `firefly-sandbox.yaml` header: `openshell sandbox create … nemoclaw inference set … nemoclaw agent run` | ✅ faithful |
| **Egress policy** | [[concepts/nemoclaw-policy-presets]] — deny-default + per-service presets, recipe #5 model-switch | `firefly-sandbox.yaml` `network.default: deny` + 6 `reason:`-annotated hosts; `inference.rerouting` ollama↔nim | ✅ worked example |
| **On-prem host** | [[concepts/dgx-spark]] — GB10, on-prem NIM tier | `nemotron.py` transport #3 "ON-PREM NIM … e.g. on DGX Spark" (but default is transport #1, RTX 5070 Ollama) | ⚠️ aspirational tier |
| **Orchestration** | [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Nemotron-driven multi-agent | `nemo_workflow.yaml` orchestrator + agents `llm: claude-opus-4-7` | ⚠️ **divergence** (below) |

## What the code does *better* than the prose

The Firefly router is a cleaner statement of the [[concepts/nemotron]] "one model, two modes" thesis than the concept page makes:

- **Memory-bound design rationale.** `router.py` documents *why* it serves one 4 B model in two modes rather than two models: *"On 12 GB VRAM we can't hold two Nemotron checkpoints hot."* The dual-mode toggle isn't a stylistic choice — it's forced by the RTX 5070's VRAM, and it's *exactly* the Nemotron-family differentiator the hackathon showcases (`detailed thinking on/off` is a model-card directive, so the same `ollama pull`-able artifact gives both modes; Llama/Qwen/DeepSeek do not). This is a concrete, falsifiable engineering argument the concept page should cite — now cross-linked from [[concepts/nemotron]].
- **Transport-abstraction = recipe #5 in code.** `resolve_backend()` makes LOCAL Ollama / CLOUD NIM / ON-PREM NIM a single env-var swap (`NEMOTRON_BACKEND`, `NEMOTRON_BASE_URL`) behind one OpenAI-compatible surface — the runtime model-switching recipe ([[concepts/nemoclaw-policy-presets]] #5) realized at the client layer, complementing the gateway-layer swap in `firefly-sandbox.yaml`.
- **Graceful degradation.** `NEMOTRON_BACKEND=disabled` makes every call return an error so the orchestrator falls back to deterministic stubs — "demos never crash." A reliability primitive consistent with the [[synthesis/spacesharks-trust-stack|trust-stack]] abstention philosophy.

## Divergence flagged for the owner (no code changed)

**The workflow-of-record runs on Claude, not Nemotron.** `nemo_workflow.yaml` declares both the `orchestrator` and the one real agent (`orbit_designer`) as `llm: claude-opus-4-7`, with the inline comment *"MVP; v2 benchmarks Nemotron via NIM."* Meanwhile the Nemotron dual-mode stack (`router.py` + `nemotron.py`) is fully built but lives in a **parallel module not referenced by `nemo_workflow.yaml`**. So today:

- The **agent reasoning** path = Claude (via `ANTHROPIC_API_KEY`, per `README.md` quick-start).
- The **Nemotron path** = implemented, tested, sandbox-policy'd (`firefly-sandbox.yaml` defaults to `nemotron-3-nano:4b`), but **not wired into the orchestrator**.

This matters because the [[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge]] treats Nemotron as the **mandatory reasoning core** ([[concepts/nemotron]]). The MVP is honest about this ("v2 benchmarks Nemotron"), but **a submission graded today would not be running Nemotron in its orchestration loop.** The wiring gap — point `orchestrator.run` and `orbit_designer.run` at `LLMRouter` instead of a Claude client — is the single highest-leverage change to make the build hackathon-conformant. *Recorded for the owner; this routine does not edit code.*

> **Secondary note.** `firefly-sandbox.yaml` opens `inference.local` on ports `[443, 8443, 8642]`; `8642` is the NemoClaw OpenAI-compatible port ([[concepts/nemoclaw]], [[sources/nemoclaw-hermes-install-runbook-2026]]) — consistent. The cloud fallback (`integrate.api.nvidia.com:443`) and tool hosts (`www.space-track.org`, `ll.thespacedevs.com`, `services.swpc.noaa.gov`, `celestrak.org`) all match the [[concepts/conjunction-screening-providers|tool layer]] the OrbitDesignerAgent uses — the egress allowlist is tight and complete, no over-grant.

## Why this is durable (the compounding value)

A reader (or a future agent) asking *"is the owner's hackathon entry actually built on the stack the wiki documents?"* now gets a one-page, code-grounded answer instead of re-reading five concept pages and three source files. The reconciliation table is also a **conformance checklist**: each ✅ is a verified match, each ⚠️ is a tracked gap with a named fix. When the owner wires Nemotron into the orchestrator, this page's orchestration row flips ✅ and the divergence section resolves — a concrete, testable definition of "done."

## See also

- [[concepts/nemotron]] · [[concepts/nemoclaw]] · [[concepts/openshell-runtime]] · [[concepts/nemoclaw-policy-presets]] · [[concepts/dgx-spark]] — the abstract layer this page grounds
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — the hackathon scope/plan Firefly serves
- [[synthesis/spacesharks-trust-stack]] — the reliability architecture the degradation/abstention behavior implements
- [[synthesis/open-weight-llm-agent-stack-six-region]] — why a model-agnostic transport layer is strategically valuable (the model layer is the contested one)
- [[concepts/hermes-agent-framework]] — the alternative agent-loop profile (region-neutral runtime, same NemoClaw cage)
</content>
