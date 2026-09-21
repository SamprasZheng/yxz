---
type: entity
tags: [edge-ai, ai-accelerator, in-memory-computing, onboard-autonomy, space-edge-compute, europe, netherlands, satellite-operations]
---

# Axelera AI

**Type:** Fabless edge-AI inference-accelerator semiconductor company
**Founded:** 2021
**Headquarters:** Eindhoven, Netherlands (AI Innovation Center, High Tech Campus)
**Product line:** Metis AIPU (gen-1) → Europa AIPU (gen-2, announced 2025-10)

Axelera AI is the Dutch edge-AI-inference chip company that, in 2026, became the **compute substrate under Europe's on-board-autonomy archetype** ([[synthesis/llm-satellite-operations-six-region]] §2). It is included in the wiki because on-board satellite autonomy — the European/Japanese ops-AI bet — is bounded not by model quality but by *radiation-hardened, power-constrained edge inference*, and Axelera is the region's flagship attempt to own that substrate rather than import NVIDIA Jetson.

## Why it belongs in the ops-AI cluster

The [[synthesis/llm-satellite-operations-six-region|six-region ops-AI map]] treats the model layer as commoditized and the *data-access asymmetry* as the moat. There is a second, physical constraint the map under-weighted: **where on-board autonomy runs**. The two flown 2025–26 milestones both rode commodity NVIDIA edge GPUs — [[sources/navi-orbital-vlm-earth-obs-2026|NAVI-Orbital]] on a Jetson Orin AGX, [[sources/astrea-orbital-thermal-autonomy-2025|ASTREA]] on flight-heritage hardware — and Taiwan's [[entities/liscotech|LiscoTech]] flew a Jetson Orin Nano GPGPU. Axelera is the **European sovereign alternative** to that Jetson dependence: a purpose-built inference AIPU, not a repurposed GPU.

## Technology — Metis AIPU

- **Architecture:** Digital In-Memory Computing (D-IMC) — the matrix-vector multiply runs *inside* the SRAM arrays where weights are stored, eliminating the memory-bandwidth bottleneck that caps GPU efficiency on small/medium models. Paired with RISC-V control cores (independent convergence with the RISC-V direction in [[concepts/polkavm]] and JAM — see [[concepts/jam]] — different domain, same ISA bet).
- **Performance (gen-1 Metis):** up to ~214 TOPS peak (INT8), ~15 TOPS/W energy efficiency — the metric that matters for a solar-and-radiator-power-budgeted spacecraft ([[concepts/orbital-data-center]]).
- **Gen-2 (Europa AIPU, announced 2025-10):** claims a new performance/power/affordability benchmark; targets computer-vision *and* generative-AI edge workloads (the shift toward on-board VLM/LLM inference of the kind [[sources/navi-orbital-vlm-earth-obs-2026|NAVI-Orbital]] proved).

## 2026 space-sector moves

| Date | Move | Significance |
|---|---|---|
| **2026-02** (announced ~02-09) | **AIKO × Axelera partnership** — Axelera silicon under [[entities/aiko-space|AIKO]]'s `orbital_OLIVER` on-board autonomy + `gifted_GENE` anomaly stack | Couples Europe's leading on-board-autonomy *software* ([[entities/aiko-space]]) to a European inference *chip* — a fully non-US on-board stack |
| **2026-02** | **$250M+ funding round** led by Innovation Industries; new investors incl. BlackRock | Capital scale to compete with NVIDIA at the edge; contrast [[entities/aiko-space|AIKO]]'s €6.5M — the chip layer, not the software layer, is where European capital is concentrating |
| **2026-03-05** | **Axelera × ESA partnership to standardize space-based inference** ("orbital edge AI") | Moves the substrate toward an *agency-anchored standard* — the same "agency as anchor customer" pattern as [[entities/aiko-space|AIKO]]/GENE; a European bid to set the on-board-inference reference platform |

## Six-region placement

- **🇪🇺 Europe:** Axelera is the region's on-board-inference-accelerator champion — the substrate under the **agency-anchored on-board autonomy** archetype ([[entities/aiko-space]], Thales [[sources/astrea-orbital-thermal-autonomy-2025|ASTREA]]).
- **🇺🇸 US:** the incumbent substrate is NVIDIA Jetson (Orin on [[sources/navi-orbital-vlm-earth-obs-2026|NAVI-Orbital]]); the US bet is data + defense integration, not a sovereign edge chip ([[synthesis/llm-satellite-operations-six-region]] §3).
- **🇨🇳 China:** Huawei Ascend is the sovereign substrate (the "Air Target Agent System" runs on it) — Axelera is Europe's structural analog to Ascend: *own the silicon so the autonomy stack is export-control-independent*.
- **🇹🇼 Taiwan / 🇯🇵 Japan / 🇰🇷 Korea:** consume NVIDIA/edge accelerators ([[entities/liscotech|LiscoTech]] Jetson Orin, Korea's TelePIX edge AI); no sovereign in-memory-compute inference chip.

## Long-horizon note (projection, not fact)

If on-board autonomy climbs from *detect* → *operate* → *maneuver* (the AIKO GENE → OLIVER → ASIMOV ladder in [[concepts/satellite-digital-twin]]), the binding constraint migrates from model access to **rad-tolerant TOPS-per-watt**. Whoever owns a space-qualified, low-power inference substrate owns a chokepoint analogous to the rad-hard-IC toll booth in [[synthesis/radiation-test-rad-hard-six-region]]. Open question: whether in-memory-compute AIPUs can be radiation-qualified (SEE/TID — [[concepts/see-single-event-effects]], [[concepts/tid-total-ionizing-dose]]) as readily as the GPUs they aim to displace; SRAM-resident weights are precisely the [[concepts/see-single-event-effects|SEU]]-sensitive structure, so this is an open engineering question, not a settled advantage.

## See also

- [[entities/aiko-space]] — the on-board-autonomy software partner (OLIVER / GENE / ASIMOV)
- [[concepts/satellite-digital-twin]] — where on-board vs ground autonomy lives (Axelera = the on-board substrate)
- [[entities/liscotech]] — Taiwan's flown Jetson-Orin GPGPU (the NVIDIA-substrate counterpoint)
- [[sources/navi-orbital-vlm-earth-obs-2026]] — first in-orbit VLM, on a Jetson Orin AGX (the substrate Axelera targets)
- [[synthesis/llm-satellite-operations-six-region]] — six-region ops-AI map; Axelera = Europe's on-board-inference substrate
- [[synthesis/radiation-test-rad-hard-six-region]] — the rad-qualification toll booth any space-bound edge chip must pass
