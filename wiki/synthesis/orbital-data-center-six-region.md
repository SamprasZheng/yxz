---
type: synthesis
tags: [leo, odc, space, ai, six-region, supply-chain, energy, taiwan, china, us, europe, japan, korea]
sources:
  - "[[sources/leo-space-datacenter-analysis-2025]]"
concepts:
  - "[[concepts/orbital-data-center]]"
  - "[[concepts/leo-value-chain]]"
  - "[[concepts/cots-gpu-radiation-risk]]"
---

# Orbital Data Centers — Six-Region Map (台美日韓中國歐洲) and the 100-Year Heat-Rejection Question

## Thesis

The orbital data center (ODC) went from slideware to flown hardware in a single year: between **2025-05** (China's first dedicated compute constellation) and **2026-01** (US commercial ODC nodes on optical relay), every major technology bloc declared a position. But the positions are **not the same kind of bet**. The US races on *capability per node* and private capital; China on *deployed scale* and state direction; Europe on *sustainability + data-sovereignty* economics; Japan on a *relay/edge network* across orbits; Korea on *bus + sensor + AI-analytics supply*; and Taiwan holds *world-class upstream components but no midstream-C integrator*. This page is the unifying six-region read; the Taiwan-specific argument lives in [[synthesis/leo-taiwan-odc-gap]], the component layer in [[synthesis/phased-array-rf-frontend-supply-chain]].

The single physical constant tying all six together — and bounding the 100-year view — is **heat rejection in vacuum (σT⁴)**, not energy.

## Why now: the demand curve ODC proposes to bend

Authoritative anchor — **IEA, *Energy and AI* (2025):** data-center electricity ≈**415 TWh in 2024** (~1.5% of global), projected to **≈945 TWh by 2030** (~3%), growing ~15%/yr; **US (+240 TWh) and China (+175 TWh) drive ~80%** of that growth; AI-accelerated servers grow ~30%/yr. ([IEA](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai))

ODC's pitch: 24/7 unobstructed solar (SSO panels up to ~8× as productive as on Earth, per Google) + radiative cooling with **no water** + heavy-lift driving $/kg down. The binding constraint is not power — it is dumping waste heat off a finite radiator as σT⁴, which is why every credible 2025–2026 design leads with radiator geometry and formation flight, not FLOPS. See [[concepts/orbital-data-center]].

## The six-region map

| Region | Lead actor(s) | Type of bet | Flown hardware? | 2026-06 standing |
|---|---|---|---|---|
| **US** 🇺🇸 | [[entities/starcloud]], Axiom Space, [[entities/google-suncatcher]], [[entities/nvidia]] | Commercial-first, VC-funded; capability per node | **Yes** — H100 + LLM training (Nov–Dec 2025); ODC nodes Jan 2026 | **Leads on capability** |
| **China** 🇨🇳 | [[entities/ada-space]] + Zhejiang Lab | State-directed; dedicated compute constellation at scale | **Yes** — 12 sats, May 2025; 2,800 planned | **Leads on deployed scale** |
| **Europe** 🇪🇺 | Thales Alenia Space (ASCEND), Airbus DS, ArianeGroup, DLR, Orange/HPE | Study-stage; net-zero + EU data sovereignty | No — feasibility only | Strongest *economic case*; ROI targeted by 2050 |
| **Japan** 🇯🇵 | Space Compass (NTT × SKY Perfect JSAT) | "Space Integrated Computing Network" across GEO/LEO/HAPS, optical | Demo-stage (Expo 2025 Osaka optical comms) | Relay/edge-network framing |
| **Korea** 🇰🇷 | Hanwha Aerospace/Systems, KARI | Bus + SAR + onboard AI-analytics supplier | Sat buses + SAR yes; no dedicated ODC | **Enabling layer**, not ODC operator |
| **Taiwan** 🇹🇼 | Win Semi / Ascend / Huatong (upstream) | World-class components; **no midstream-C integrator** | Components in others' sats; no ODC | **Structural gap → opportunity** |

### Per-region detail

- **US — capability, flown.** [[entities/starcloud]] (ex-Lumen Orbit, YC S24, $170M Series A Mar 2026) flew a single NVIDIA H100 on Starcloud-1 (2025-11-02), trained NanoGPT and ran Gemini in orbit (Dec 2025), and roadmaps gigawatt scale. Axiom Space validated AxDCU-1 on the ISS (fall 2025) then launched ODC Node 1 & 2 on Kepler optical-relay satellites (2026-01-11, 2.5 Gbps optical, SDA Tranche-1 compatible). [[entities/google-suncatcher]] adds the hyperscaler bet: Trillium TPUs, an 81-satellite ~1 km formation at SSO ~650 km, two Planet-built prototypes for early-2027 launch.
- **China — scale, state-directed.** [[entities/ada-space]] + Zhejiang Lab's Three-Body Computing Constellation / Star-Compute Program: 12 sats up (2025-05-14, ≈5 POPS combined, 30 TB storage, 100 Gbps ISL, up to 744 TOPS/sat), targeting **2,800 satellites → ≈1,000 POPS**. The only actor with a *dedicated* compute constellation already flying; orbital-slot pre-emption is strategic, not commercial.
- **Europe — economics, study-stage.** Thales Alenia Space (Thales 67% / Leonardo 33%) led the EU/Horizon **ASCEND** feasibility study (consortium incl. Airbus DS, ArianeGroup, DLR, Orange, CloudFerro, HPE Belgium, Carbone 4, VITO). Results: orbital DCs are technically feasible and economically viable, several-hundred-MW solar, ROI in billions of € by 2050 — framed explicitly around **net-zero and data sovereignty**, the EU's differentiators. No hardware yet.
- **Japan — network, demo-stage.** Space Compass (NTT × SKY Perfect JSAT JV) builds a "Space Integrated Computing Network" spanning GEO, LEO and HAPS, stitched by NTT high-capacity optical comms; onboard edge processing downlinks only high-value data; optical demo at Expo 2025 Osaka. The Japanese bet is the *fabric* (optical + multi-orbit edge), not a monolithic compute platform.
- **Korea — supply, enabling.** Hanwha Aerospace/Systems supplies buses, propulsion and SAR satellites with onboard AI analytics; the Jeju Space Center (completed Dec 2025) can build ~100 sats/yr; KARI is the national agency. Korea is positioned to *equip* ODC (platforms, sensors, analytics) rather than operate a dedicated orbital supercomputer — a midstream-A strength, mirroring its terrestrial fab/hardware profile.
- **Taiwan — components, absent at C.** World-class upstream (Win Semiconductors PA, Ascend Tech filters >50% GM, Huatong ~80% LEO-PCB share) but no midstream-C ODC integrator and no domestic heavy-ion/large-Co-60 radiation-test capability. Full argument and the three breakout paths (upstream extension / PCB board-integration / defense catalysis) in [[synthesis/leo-taiwan-odc-gap]].

## Cross-cutting structural reads

1. **Two different "leads."** "US leads" and "China leads" are both true and not contradictory: capability-per-node vs deployed-scale. The interesting 2026–2030 question is whether commercial capability (US) or state scale (China) compounds faster — a rerun of the LEO-broadband race one layer up the stack.
2. **Optical ISL is the contested chokepoint.** Suncatcher (formation optics), Axiom/Kepler (relay optics), Japan's Space Compass (optical fabric), and ADA Space (100 Gbps ISL) all converge on free-space optics as load-bearing. This is precisely [[concepts/leo-value-chain]] midstream-A where Taiwan rates ★★☆☆☆ — the gap is not compute, it is the optics that net compute together.
3. **Radiation is the silent gate.** COTS GPU/TPU survival in LEO ([[concepts/cots-gpu-radiation-risk]]; Trillium accelerator-tested, H100 flown) is the enabling result for every region — but single-event latchup over a full solar cycle ([[concepts/see-single-event-effects]], [[concepts/solar-cycle-25-leo-radiation]]) remains unproven at fleet-years. One H100 for weeks ≠ thousands of nodes for a decade.

## Long-horizon view (labelled scenario / projection, not fact)

| Horizon | Plausible structural state | Who is positioned |
|---|---|---|
| ~2030 | Hybrid space-ground cloud is normal: ODC = inference/edge, ground = training/storage; 10s–100s MW in orbit | US (commercial), China (scale) |
| ~2040 | Gigawatt-class formation-flying clusters; in-space assembly; radiator > array area; optical mesh default | whoever industrialised ISL optics + radiators |
| ~2050 | If ASCEND-style economics hold, a meaningful share of *new* AI capex is launched not grid-connected; orbital-slot + radiator real estate become the scarce inputs | Europe's economic case meets US/China hardware |
| ~2100 | **Speculative:** Earth surface reserved for latency-bound/human-facing compute; bulk training migrates to power-rich cislunar/solar orbits. **Heat rejection, not energy, is the civilisational ceiling on compute density.** | undetermined — a century is long enough for any region to lead |

The invariant across all four rows is σT⁴: every other term (launch cost, FLOPS/W, solar efficiency) improves with technology; radiator area per watt does not. A 100-year ODC thesis is, at bottom, a thermodynamics thesis.

## Falsifiers (what would break this read)

- **"US leads on capability" fails** if no Western ODC demonstrates *multi-node, multi-year* operation before ADA Space crosses ~100 satellites — scale would have beaten capability.
- **"Heat rejection is the ceiling" fails** if a deployed design rejects gigawatt-class heat without radiator area dominating mass/volume (e.g., a genuinely novel thermal cycle) — then energy economics, not thermodynamics, govern the 100-year view.
- **"Taiwan gap is an opportunity" fails** if midstream-C consolidates around vertically-integrated US/China primes before any Taiwan vendor moves up from components — the window in [[synthesis/leo-taiwan-odc-gap]] closes.
- **"ODC bends the demand curve" fails** if launched compute stays <1% of the IEA-projected 945 TWh through 2035 — then ODC is a sovereign/defense niche, not an energy story.

## Related pages

- [[concepts/orbital-data-center]], [[concepts/leo-value-chain]], [[concepts/cots-gpu-radiation-risk]], [[concepts/see-single-event-effects]], [[concepts/solar-cycle-25-leo-radiation]]
- [[entities/starcloud]], [[entities/ada-space]], [[entities/google-suncatcher]], [[entities/nvidia]], [[entities/win-semiconductors]], [[entities/ascend-tech]], [[entities/huatong-pcb]]
- [[synthesis/leo-taiwan-odc-gap]] — Taiwan-specific companion
- [[synthesis/phased-array-rf-frontend-supply-chain]] — component-layer six-region companion
- [[sources/leo-space-datacenter-analysis-2025]], [[sources/space-radiation-tid-see-2025]]
