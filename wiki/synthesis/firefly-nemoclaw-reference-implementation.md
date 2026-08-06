---
type: synthesis
tags: [ai-agents, nemoclaw, openshell, nemotron, firefly, sandbox, hackathon, code-integration]
concepts: ["[[concepts/nemoclaw]]", "[[concepts/openshell-runtime]]", "[[concepts/nemotron]]", "[[concepts/nemoclaw-policy-presets]]", "[[concepts/dgx-spark]]"]
sources: ["[[sources/nvidia-agent-challenge-2026]]", "[[sources/nemoclaw-hermes-install-runbook-2026]]"]
---

# Firefly as a Reference Implementation of the NVIDIA Agent-Challenge Stack

**Question this answers:** the wiki's AI-agent-runtime concept pages ([[concepts/nemotron]], [[concepts/nemoclaw]], [[concepts/openshell-runtime]], [[concepts/nemoclaw-policy-presets]], [[concepts/dgx-spark]]) describe NVIDIA's GTC-Taipei agent stack *abstractly*. The repo's own `agents/` tree — the **Firefly orbital-data-center mission architect** — is a *concrete* implementation of that same stack. How do the concepts map onto the code, and where do they diverge?

This is the **向內消化 / concept↔code 整合** page for the AI-agent-runtime cluster: every claim below is grounded in a file in `agents/`, read directly (not the LLM's prior). Code is **never modified** by this routine — divergences are recorded for the owner.

> **Re-verified against the `agents/` tree on 2026-08-06** (code last changed at commit `7817a4d`, 2026-07-13). The headline finding of this pass: the orchestration divergence documented on 2026-06-14 has **inverted** — the Python runtime-of-record now runs Nemotron end-to-end, and the lone `claude-opus-4-7` declaration that remains is in `nemo_workflow.yaml`, which now *lags* the code rather than driving it (full detail in the divergence section below).

## The stack, abstract → concrete

| Layer | Concept page (abstract) | Firefly file (concrete) | Match? |
|---|---|---|---|
| **Model** | [[concepts/nemotron]] — Nemotron family, `detailed thinking on/off` directive, NIM SKUs | `src/firefly/llm/nemotron.py` — OpenAI-compat client; `REASONING_ON/OFF_SYSTEM_PREFIX`; Super-49B + Nano-9B cloud SKUs | ✅ faithful |
| **Routing** | [[concepts/nemotron]] variant-selection (planner vs executor) | `src/firefly/llm/router.py` — `Role.PLANNER` (thinking ON, temp 0.15) / `Role.EXECUTOR` (thinking OFF, temp 0.3), **same** `nemotron-3-nano:4b` twice | ✅ faithful + sharper |
| **Sandbox runtime** | [[concepts/openshell-runtime]] — Landlock/seccomp/netns/credential-vault | `firefly-sandbox.yaml` `filesystem`/`process`/`network`/`inference` blocks | ✅ 1-to-1 |
| **Runtime distribution** | [[concepts/nemoclaw]] — 4 policy domains + intent injection | `firefly-sandbox.yaml` header: `openshell sandbox create … nemoclaw inference set … nemoclaw agent run` | ✅ faithful |
| **Egress policy** | [[concepts/nemoclaw-policy-presets]] — deny-default + per-service presets, recipe #5 model-switch | `firefly-sandbox.yaml` `network.default: deny` + 6 `reason:`-annotated hosts; `inference.rerouting` ollama↔nim | ✅ worked example |
| **On-prem host** | [[concepts/dgx-spark]] — GB10, on-prem NIM tier | `nemotron.py` transport #3 "ON-PREM NIM … e.g. on DGX Spark" (but default is transport #1, RTX 5070 Ollama) | ⚠️ aspirational tier |
| **Orchestration** | [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Nemotron-driven multi-agent | `orchestrator.py` (the real `entrypoint`) builds `LLMRouter()` → Nemotron and injects it into every agent's `context["router"]`; `nemo_workflow.yaml` still *declares* `llm: claude-opus-4-7` | ✅ in code / ⚠️ **YAML lags** (below) |

## What the code does *better* than the prose

The Firefly router is a cleaner statement of the [[concepts/nemotron]] "one model, two modes" thesis than the concept page makes:

- **Memory-bound design rationale.** `router.py` documents *why* it serves one 4 B model in two modes rather than two models: *"On 12 GB VRAM we can't hold two Nemotron checkpoints hot."* The dual-mode toggle isn't a stylistic choice — it's forced by the RTX 5070's VRAM, and it's *exactly* the Nemotron-family differentiator the hackathon showcases (`detailed thinking on/off` is a model-card directive, so the same `ollama pull`-able artifact gives both modes; Llama/Qwen/DeepSeek do not). This is a concrete, falsifiable engineering argument the concept page should cite — now cross-linked from [[concepts/nemotron]].
- **Transport-abstraction = recipe #5 in code.** `resolve_backend()` makes LOCAL Ollama / CLOUD NIM / ON-PREM NIM a single env-var swap (`NEMOTRON_BACKEND`, `NEMOTRON_BASE_URL`) behind one OpenAI-compatible surface — the runtime model-switching recipe ([[concepts/nemoclaw-policy-presets]] #5) realized at the client layer, complementing the gateway-layer swap in `firefly-sandbox.yaml`.
- **Graceful degradation.** `NEMOTRON_BACKEND=disabled` makes every call return an error so the orchestrator falls back to deterministic stubs — "demos never crash." A reliability primitive consistent with the [[synthesis/spacesharks-trust-stack|trust-stack]] abstention philosophy.

## Divergence status — RESOLVED in code, now inverted to the YAML (re-verified 2026-08-06)

The 2026-06-14 version of this page flagged that "the workflow-of-record runs on Claude, not Nemotron." **Re-reading the `agents/` tree on 2026-08-06 shows the code has moved past that** — the divergence has inverted, and the prior page is now the thing that was stale. Two grounded facts:

**1. The Python runtime-of-record runs Nemotron end-to-end.** `orchestrator.py` — the actual `entrypoint: firefly.orchestrator:run` — instantiates `router = LLMRouter()` (→ `NemotronClient` → `resolve_backend()`, whose no-env-override default is **local Ollama `nemotron-3-nano:4b`**) and passes it in `context["router"]` to every agent. Then:
- `orbit_designer.run()` calls `router.planner()` → Nemotron with `detailed thinking on` (temp 0.15);
- the executor-tier agents call `router.chat(Role.EXECUTOR, …)` through `_tool_loop.py` → Nemotron with `detailed thinking off` (temp 0.3);
- the orchestrator's own docstring now declares *"Architecture (Nemotron dual-model split)."*

**Claude is no longer in the Python path at all** — `claude-opus-4-7` appears in *no* `.py` file. The only non-Nemotron path left is the deterministic `_fallback()` stub that fires when the router is unavailable (`NVIDIA_API_KEY` unset / transport error), preserving the "demos never crash" reliability primitive. So the hackathon-conformance worry the earlier page raised — *"a submission graded today would not be running Nemotron in its loop"* — **has closed at the code level.**

**2. The lone remaining Claude declaration is the YAML, and it is now the lagging artifact.** `nemo_workflow.yaml` still declares `orchestrator.llm` **and** `orbit_designer.llm` as `claude-opus-4-7` (lines 18, 37) with the comment *"MVP; v2 benchmarks Nemotron via NIM,"* and its own header calls it *"the architecture-of-record."* So the two sources of truth now **disagree**: the YAML says Claude; the Python — the real entrypoint — runs Nemotron. `firefly-sandbox.yaml` agrees with the Python (`default_provider: ollama-local`, `default_model: nemotron-3-nano:4b`, `description: "Nemotron-driven"`), leaving `nemo_workflow.yaml` as the sole outlier.

**Net for the owner:** the one-line cleanup that remains is **documentation-only** — update `nemo_workflow.yaml` lines 18 and 37 from `claude-opus-4-7` to the Nemotron SKU the Python already uses, so the "architecture-of-record" stops contradicting the runtime. This is the inverse of the 2026-06-14 recommendation (which asked to wire *code* to Nemotron); the code fix already happened. *Recorded for the owner; this routine does not edit code.*

> **Secondary code-internal inconsistency (new note, 2026-08-06).** `orbit_designer.py`'s docstring says *"Nemotron Super-49B reasoning … `nvidia/llama-3.3-nemotron-super-49b-v1.5`,"* but the **default** backend serves **`nemotron-3-nano:4b` on local Ollama for both tiers** — Super-49B is used only when `NEMOTRON_BACKEND=nim` (cloud) is set (`CLOUD_PLANNER_MODEL` in `nemotron.py`). So the docstring describes the *cloud* planner, not the *default* local one: a reader running the quick-start locally gets Nano-4B, not Super-49B. Minor, doc-only, recorded for the owner.

> **Egress-allowlist note (unchanged, still valid).** `firefly-sandbox.yaml` opens `inference.local` on ports `[443, 8443, 8642]`; `8642` is the NemoClaw OpenAI-compatible port ([[concepts/nemoclaw]], [[sources/nemoclaw-hermes-install-runbook-2026]]) — consistent. The cloud fallback (`integrate.api.nvidia.com:443`) and tool hosts (`www.space-track.org`, `ll.thespacedevs.com`, `services.swpc.noaa.gov`, `celestrak.org`) all match the [[concepts/conjunction-screening-providers|tool layer]] the OrbitDesignerAgent uses — the egress allowlist is tight and complete, no over-grant.

## Why this is durable (the compounding value)

A reader (or a future agent) asking *"is the owner's hackathon entry actually built on the stack the wiki documents?"* now gets a one-page, code-grounded answer instead of re-reading five concept pages and three source files. The reconciliation table is also a **conformance checklist**: each ✅ is a verified match, each ⚠️ is a tracked gap with a named fix. This pass is itself the proof the checklist works — between 2026-06-14 and 2026-08-06 the code silently moved the orchestration row from ⚠️ toward ✅ (agents now call Nemotron), and re-verifying against the tree is what caught it. The remaining ⚠️ is now a **pure documentation lag** (`nemo_workflow.yaml` still names Claude): "done" is reached when that YAML's two `llm:` lines match the Nemotron SKU the Python already runs — a concrete, testable, code-free fix.

## See also

- [[concepts/nemotron]] · [[concepts/nemoclaw]] · [[concepts/openshell-runtime]] · [[concepts/nemoclaw-policy-presets]] · [[concepts/dgx-spark]] — the abstract layer this page grounds
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — the hackathon scope/plan Firefly serves
- [[synthesis/spacesharks-trust-stack]] — the reliability architecture the degradation/abstention behavior implements
- [[synthesis/open-weight-llm-agent-stack-six-region]] — why a model-agnostic transport layer is strategically valuable (the model layer is the contested one)
- [[synthesis/agent-runtime-orchestration-six-region]] — the six-region map of the runtime/orchestration layer this Firefly stack instantiates; the "model commoditizes, the orchestration+memory+permission layer is where lock-in accretes" thesis is exactly why the router's transport-abstraction matters more than which SKU it points at
- [[concepts/hermes-agent-framework]] — the alternative agent-loop profile (region-neutral runtime, same NemoClaw cage)
