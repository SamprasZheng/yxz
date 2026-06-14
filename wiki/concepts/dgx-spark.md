---
type: concept
tags: [nvidia, ai, workstation, edge-ai, hackathon, hardware, agents]
---

# DGX Spark

DGX Spark is NVIDIA's **small-form-factor personal AI supercomputer** — a desktop appliance (≈150 × 150 × 50.5 mm) built around the **GB10 Grace Blackwell Superchip**, positioned as the on-prem / edge tier for long-running agents that need local inference without a datacenter. In this wiki it is the **local inference-host surface** for the [[concepts/nemotron]] model layer and the [[concepts/nemoclaw]]/[[concepts/openshell-runtime]] runtime: the box you point the sandbox's inference gateway at when you want a frontier-sized model served on-prem instead of via cloud NIM.

## Verified specifications (fact-checked 2026-06-14)

| Attribute | Value |
|---|---|
| SoC | **GB10 Grace Blackwell** — 20-core Arm CPU + Blackwell-gen GPU on one package |
| Unified memory | **128 GB LPDDR5X**, **273 GB/s** bandwidth (8 soldered packages) |
| AI throughput | **up to ~1 PFLOP** at **NVFP4** (4-bit) precision |
| Local model ceiling | LLMs **up to ~200 B parameters** served locally |
| Storage | 4 TB NVMe SSD |
| Fabric | integrated **ConnectX-7**, 200 G — two units cluster to run ~405 B-class models |
| Price | **$3,999** at launch → **$4,699** after the Feb 2026 increase |
| History | unveiled as **"Project DIGITS" (Jan 2025)** → shipped as **DGX Spark, late 2025** |

The key architectural bet is **unified memory**: 128 GB shared CPU↔GPU means a 70–120 B model fits without the PCIe-transfer tax of a discrete-GPU workstation — the trait that makes it a credible *continuous* agent host rather than a batch box. The NVFP4 4-bit format is what stretches a 273 GB/s memory bus to "200 B-parameter local."

## Why it matters for a long-running agent (layer up)

The [[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge 2026]] theme is *agents that run, persist, and perform* — not demos. A cloud-only agent burns metered tokens 24/7 and leaks every prompt to a third party; DGX Spark is the answer to **"where does an always-on agent's inference live when you want it private, flat-cost, and never rate-limited?"** It is the hardware end of the same argument [[concepts/openshell-runtime]] makes in software (keep the trust boundary local) and [[concepts/nemoclaw-policy-presets]] makes in policy (the "remote GPU assistant" recipe puts the sandbox on a box like this while the laptop holds only credentials).

## Reference implementation in this repo (向內消化 — code↔concept)

This wiki's [[synthesis/firefly-nemoclaw-reference-implementation|Firefly agent]] treats DGX Spark as an explicit, named deployment tier. `agents/src/firefly/llm/nemotron.py` documents three transports for the identical OpenAI-compatible code path:

1. **LOCAL (default)** — Ollama on a 12 GB **RTX 5070**, `nemotron-3-nano:4b` (Q4, ~2.8 GB). *This is the path the code actually defaults to* — the cheapest dev tier, below DGX Spark.
2. **CLOUD NIM (opt-in)** — `integrate.api.nvidia.com`, `NEMOTRON_BACKEND=nim`.
3. **ON-PREM NIM** — `NEMOTRON_BASE_URL` pointed at a self-hosted NIM container, *"e.g. on DGX Spark"* — same code, no app change.

> **Note for owner (no code change made):** DGX Spark is referenced as the *on-prem NIM* tier (transport #3) but the repo's working default is the RTX 5070 / Ollama tier (transport #1); the 128 GB DGX Spark would be the upgrade that lets the dual-mode router hold **two distinct** hot Nemotron SKUs (Super-49B planner + Nano-9B executor) instead of time-sharing one 4 B model — which is exactly the memory-bound trade-off `router.py` calls out ("On 12 GB VRAM we can't hold two Nemotron checkpoints hot"). DGX Spark resolves that constraint; the RTX 5070 forces the one-model-two-modes design.

## Lineage and horizon (拉長時間軸)

- **2016–2017:** DGX-1 / DGX Station — the original "AI supercomputer in a box," but rack/deskside-class and $50k+.
- **2014→:** Jetson line establishes NVIDIA's *embedded/edge* inference tier (Nano → Orin → Thor).
- **Jan 2025:** Project DIGITS announced at CES — a sub-$4k Grace-Blackwell desktop, collapsing the DGX-Station price point by an order of magnitude.
- **Late 2025:** ships as **DGX Spark**; **DGX Station** (bigger GB300 sibling) targets the workstation tier above it.
- **Forward (scenario, not fact):** the structural trend is **frontier-model inference migrating from datacenter → desk → edge** as quantization (FP4/FP2) and unified-memory bandwidth improve; the 100-year invariant is the same one bounding [[synthesis/orbital-data-center-six-region|orbital data centers]] — **compute is gated by memory bandwidth and heat (σT⁴), not FLOPs** — so the desktop ceiling rises with HBM/LPDDR generations and packaging, not with marketing TOPS.

## Six-region note (水平展開 — edge-AI hardware)

The personal/edge AI-appliance layer is **silicon-concentrated, not regionally pluralistic**:

| Region | Position at the edge-AI-appliance layer |
|---|---|
| **US** | Designs the SoC (NVIDIA GB10) + the appliance + the software stack — owns the layer. |
| **Taiwan** | **Builds it** — TSMC fabs the Blackwell/Grace dies; ODMs assemble Founders/partner editions. The upstream-strong / midstream-absent pattern (see [[synthesis/leo-taiwan-odc-gap]]) — Taiwan makes everyone's edge box but ships no sovereign-design rival appliance. |
| **China** | Sanction-walled from GB10; substitutes domestic accelerators (Huawei Ascend desktops, Moore Threads) — capable but software-ecosystem-isolated; mirrors the [[synthesis/open-weight-llm-agent-stack-six-region|model-layer]] and [[synthesis/radiation-test-rad-hard-six-region|rad-hard]] sovereign-by-sanction pattern. |
| **Japan / Korea** | Memory upstream (Samsung/SK hynix LPDDR5X/HBM, Micron-Japan); no rival desktop-supercomputer brand. |
| **Europe** | Consumer of the appliance; no edge-AI-silicon champion (the perennial EU compute-sovereignty gap). |

Net: like [[concepts/openshell-runtime]] (a *non*-regionalized layer), the edge-appliance layer is **US-design / Taiwan-build** with no six-way contest — recorded explicitly rather than left blank.

## Graph role

- Local execution companion to [[concepts/nemotron]]
- On-prem inference host for [[concepts/openshell-runtime]] / [[concepts/nemoclaw]]
- Hardware deployment surface for [[concepts/hermes-agent-framework]]
- Target hardware context for [[sources/nvidia-agent-challenge-2026]]
- Practical bridge between [[entities/nvidia]] developer programs and [[entities/sampras]]'s agent workflow

## Related

- [[entities/nvidia]]
- [[concepts/nemotron]]
- [[concepts/hermes-agent-framework]]
- [[concepts/nemoclaw]] / [[concepts/openshell-runtime]]
- [[synthesis/firefly-nemoclaw-reference-implementation]]
- [[synthesis/orbital-data-center-six-region]] — the bandwidth/heat compute-ceiling argument
- [[sources/nvidia-agent-challenge-2026]]
- [[entities/raymond-lo]]

## Sources

- NVIDIA, [*DGX Spark — Personal AI Supercomputer Powered by Blackwell*](https://www.nvidia.com/en-us/products/workstations/dgx-spark/).
- StorageReview, [*NVIDIA DGX Spark Review*](https://www.storagereview.com/review/nvidia-dgx-spark-review-the-ai-appliance-bringing-datacenter-capabilities-to-desktops).
- IntuitionLabs, [*NVIDIA DGX Spark Review: Pros, Cons & Performance Benchmarks*](https://intuitionlabs.ai/articles/nvidia-dgx-spark-review).
- AIToolDiscovery, [*NVIDIA DGX Spark: Specs, Price, and Who Should Buy It*](https://www.aitooldiscovery.com/ai-infra/nvidia-dgx-spark-explained).
</content>
