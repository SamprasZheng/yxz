---
type: concept
tags: [leo, space, data-center, ai, edge-computing, energy, hybrid-cloud, defense]
---

# Orbital Data Center (ODC)

## Definition

An infrastructure model that deploys cloud computing, AI inference, or training compute to Low Earth Orbit (LEO) satellites. Core value proposition: compute nodes in orbit that are independent of ground infrastructure, leveraging free solar energy and radiative cooling outside Earth's atmosphere.

## Core Energy Advantages

| Advantage | Description |
|------|------|
| 24/7 solar power | No clouds, rain, or weather interference in orbit; solar power generation efficiency far exceeds ground installations |
| Radiative cooling | Dissipates heat directly to the cosmic microwave background; no traditional compressor-based cooling system required |
| Energy cost structure | Jeff Bezos's assessment: within decades, ODC construction costs will be lower than ground data centers |

Ground data-center electricity: **≈415 TWh in 2024** (~1.5% of global electricity), projected by the **IEA *Energy and AI* report (2025)** to roughly **double to ≈945 TWh by 2030** (~3% of global), growing ~15%/yr — more than four times the growth of all other electricity demand. The US (+240 TWh) and China (+175 TWh) drive ~80% of that growth; AI-accelerated servers alone grow ~30%/yr. This is the demand curve ODC proposes to bend.

> **Corrected** (2026-06-03): an earlier draft of this page cited "≈650 TWh by 2026" — an unsourced figure superseded here by the IEA base case (415 TWh 2024 → 945 TWh 2030). Source: [IEA, *Energy and AI* — Energy demand from AI (2025)](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai).

**Layer up (why it matters):** ODC is the convergence point of three of this wiki's other clusters — it consumes the [[concepts/aesa]]/[[concepts/hybrid-phased-array]] RF front-end and ISL optics ([[concepts/leo-value-chain]] midstream A), it is gated by [[concepts/rha-radiation-hardening]] / [[concepts/see-single-event-effects]] / [[concepts/cots-gpu-radiation-risk]] (the radiation cluster), and it is the structural opening for Taiwan's missing midstream-C ([[synthesis/leo-taiwan-odc-gap]]). It is also where the AI-compute build-out physically leaves Earth.

**Layer down (the binding mechanism):** the real constraint is not solar availability but **heat rejection**. A vacuum has no convection or conduction to ambient air; every watt of compute must leave as thermal radiation, which scales as σT⁴ off a finite radiator area. A ~1 kW H100 node already needs square metres of radiator; gigawatt-class ODC implies radiator structures larger than the solar arrays. This — not power — is the term that caps practical ODC density, and it is why all credible 2025–2026 designs (Starcloud, Suncatcher, ASCEND) lead with radiator and formation-flight geometry, not FLOPS.

## Three Core Elements

1. **Compute**: Commercial GPUs (e.g., NVIDIA H100) require radiation protection or space-hardened components; the tradeoff between commercial off-the-shelf (COTS) and space-hardened is the biggest engineering challenge. The primary radiation threat to COTS GPUs is [[concepts/see-single-event-effects]] (SEU flipping SRAM cache + SEL latchup burnout), requiring passage through the [[concepts/rha-radiation-hardening]] qualification process (RDM ≥ 1.5).
2. **Telecommunications**: Connects ground and other nodes via optical links (e.g., Kepler Communications optical relay network); ISL optical communications determines inter-node latency.
3. **Storage**: Low-latency on-orbit cache + bulk downlink to ground; hybrid space-ground DC architecture (see below) is the most commercially viable landing point.

## Key Milestones

| Date | Event |
|------|------|
| 2024 | Thales Alenia Space publishes results of EU/Horizon **ASCEND** feasibility study — concludes orbital data centres are technically feasible and economically viable, ROI in billions of € by 2050 (Europe) |
| 2025-05-14 | [[entities/ada-space]] + Zhejiang Lab launch **12 satellites** (Jiuquan) of the "Three-Body Computing Constellation" / Star-Compute Program — first dedicated orbital-compute constellation (China) |
| 2025-Q4 | Kepler Communications launches first tranche of optical data-relay satellites (9 + spare, SSO) |
| 2025-fall | [[entities/axiom-space]] deploys **AxDCU-1** aboard the ISS (Red Hat Device Edge) to validate ODC payload ops |
| 2025-11-02 | [[entities/starcloud]] **Starcloud-1** launched (SpaceX rideshare); 60 kg, single NVIDIA H100 — ~100× prior in-orbit GPU compute (US) |
| 2025-11-04 | Google announces **Project Suncatcher** ([[entities/google-suncatcher]]) with a published system-design pre-print; Planet to build two prototype sats for early-2027 launch; **HBM** flagged as the most TID-sensitive subsystem |
| 2025-12 | Starcloud-1 trains NanoGPT (Karpathy) on-orbit and runs a Gemini model in space — first LLM training + first frontier-model inference in orbit |
| 2026-01-11 | [[entities/axiom-space]] launches **ODC Node 1 & 2** to LEO on Kepler optical-relay satellites (2.5 Gbps optical, SDA Tranche-1 compatible) — first *operational* relay-networked ODC nodes |
| 2026-01-30 | **US** — [[entities/spacex-orbital-data-center]] files with the **FCC for up to 1,000,000 satellites** (500–2,000 km, 30°+SSO); ~100 GW/yr of compute per ~1M t/yr launched; FCC Space Bureau accepts for filing **2026-02-04 (DA-26-113)** — the largest ODC filing by satellite count, following SpaceX's xAI acquisition |
| 2026-03-30 | Starcloud raises **$170M Series A** at $1.1B (Benchmark + EQT) — fastest YC unicorn (17 months) |
| 2026-03 | **Japan** — Space Compass (NTT × SKY Perfect JSAT) orders its **first GEO optical data-relay satellite from Swissto12**; selected for **JAXA's Space Strategy Fund** + signs an **Airbus DS MOU** (optical comms + EO) in April 2026 — the relay/edge fabric moves from demo to procurement |
| 2026 GTC | Jensen Huang frames space computing as "the ultimate frontier" |
| 2026-06-05 | **China** — [[entities/ada-space]] signs a **strategic AI cooperation agreement with Tencent** (Tencent to use constellation compute) — first named hyperscale-tier customer for a flying compute constellation |
| 2026-07-03 | **Korea** — [[entities/hanwha-aerospace]] (Hanwha Group) commits **≈55 trillion won (~$36B) to space + AI by 2040**, *including an orbital AI data center* + 64 VLEO SAR sats by 2031 — Korea's shift from enabling-supplier toward a declared sovereign ODC operator |
| 2026-07-07 | **US** — **Orbital Compute Inc.** (a five-month-old startup, CEO Euwyn Poon) files with the **FCC for up to 100,000 satellites** totalling **10 GW** of compute (100 kW-class nodes, 500–850 km) — a fourth US ODC filer alongside SpaceX/Starcloud, evidence the ODC land-rush is now a multi-entrant FCC queue |
| 2026-10 (targeted) | [[entities/starcloud]] **Starcloud-2** (NVIDIA Blackwell B200 + AWS server blade, live commercial workloads; ~100× Starcloud-1 power; **largest radiator yet flown**); Starcloud FCC filing for ~88,000 satellites surfaces. [[entities/ada-space]] launches **2nd + 3rd satellite groups** (3rd ≈14 sats, ~3,000 kg to 525 km SSO, Q4 2026) |

## Application Scenarios

| Scenario | Description |
|------|------|
| Earth observation AI | Real-time on-orbit processing of satellite imagery (wildfire detection, agricultural monitoring, vessel identification), resolving the contradiction between large data volumes and bandwidth bottlenecks |
| LLM training | Executing large model training using cheap solar power compute |
| Edge cloud | Earth-independent backup cloud node |
| Defense / sovereign cloud | Geographically independent, difficult to destroy, global coverage; one of the earliest paying use cases |
| Hybrid space-ground DC | ODC performs inference/edge tasks + ground DC performs training/storage, integrated via high-speed downlink |

## Hybrid Space-Ground DC Architecture

The most realistic first commercial landing point for ODC. Model:
- **Space side**: ODC nodes perform inference, real-time edge computing, data preprocessing
- **Ground side**: Ground data centers perform training, storage-intensive tasks
- **Connection layer**: High-speed optical downlink + gateway stations

This architecture allows enterprises to incrementally adopt ODC without fully migrating from ground infrastructure, serving as the key bridging solution for commercial adoption.

## Major Players

| Player | Positioning |
|------|------|
| [[entities/starcloud]] | First mover in commercial GPU (H100→Blackwell) on-orbit validation; gigawatt-scale roadmap; ~88k-sat FCC filing |
| [[entities/spacex-orbital-data-center]] | Launch-integrated hyperscale bet; **1,000,000-sat** FCC filing (2026-01, accepted DA-26-113); xAI acquisition + reported Anthropic compute demand; no node flown yet |
| [[entities/axiom-space]] | AxDCU-1 (ISS, 2025) → operational ODC Node 1&2 (2026-01) on Kepler optical relay; national-security/sovereign-cloud customers |
| [[entities/ada-space]] | China's state-scaled 2,800-satellite Three-Body / Star-Compute constellation |
| [[entities/google-suncatcher]] | Hyperscaler entry; Trillium TPU + free-space-optics formation flight |
| Thales Alenia Space | EU **ASCEND** study lead — Europe's sustainability/sovereignty ODC blueprint |
| Space Compass (NTT × SKY Perfect JSAT) | Japan's GEO/LEO/HAPS "Space Integrated Computing Network"; first GEO optical-relay sat on order (Swissto12, 2026) |
| [[entities/hanwha-aerospace]] | Korea's ₩55T/~$36B (by 2040) space+AI plan incl. a space AI data center over a 64-sat VLEO SAR fleet |

## Six-Region Comparison (台美日韓中國歐洲)

ODC is no longer a single-country story. The corpus's signature six-region read (full version in [[synthesis/orbital-data-center-six-region]]):

| Region | Lead actor(s) | Posture | Status (2026-06) |
|---|---|---|---|
| **US** 🇺🇸 | [[entities/starcloud]], [[entities/axiom-space]], [[entities/google-suncatcher]], [[entities/spacex-orbital-data-center]], [[entities/nvidia]] | Commercial-first, VC-funded, hardware in orbit — **plus** a launch-integrated hyperscale bet (SpaceX 1M-sat filing) | **Leads** — only region with GPUs + LLM training actually flown; now also the largest paper filing |
| **China** 🇨🇳 | [[entities/ada-space]] + Zhejiang Lab | State-directed scale; dedicated compute constellation | **Leads on deployed scale** — 12 sats up, 2,800 planned |
| **Europe** 🇪🇺 | Thales Alenia Space (ASCEND), Airbus, ArianeGroup, DLR | Study-stage; net-zero + data-sovereignty framing | Strong study, no hardware yet; ROI targeted by 2050 |
| **Japan** 🇯🇵 | Space Compass (NTT × SKY Perfect JSAT) | Edge/relay network across GEO/LEO/HAPS, optical | Procuring the fabric — first GEO optical-relay sat ordered (Swissto12, 2026-03) + JAXA Space Strategy Fund |
| **Korea** 🇰🇷 | [[entities/hanwha-aerospace]] (Hanwha Aerospace/Systems), KARI | Bus + SAR + onboard AI-analytics → now **declared** sovereign ODC | Largest declared commitment (₩55T/~$36B by 2040, 2026-07-03) but no compute flown yet; Jeju Space Center 100 sats/yr |
| **Taiwan** 🇹🇼 | Win Semi / Ascend / Huatong (upstream only) | World-class components, **no midstream-C integrator** | Structural gap → opportunity ([[synthesis/leo-taiwan-odc-gap]]) |

## Historical Lineage and Long-Horizon Trajectory

**Lineage (down decades):** the idea is not new — solar-power-satellite concepts (Glaser, 1968), the ISS as a continuously-powered orbital platform (2000–), and onboard-processing Earth-observation payloads (2010s) are the antecedents. What changed in 2024–2025 is the collision of (a) AI's electricity wall, (b) cheap heavy-lift (Falcon 9 / Starship driving $/kg down an order of magnitude), and (c) COTS GPU/TPU surviving accelerator-simulated LEO radiation ([[concepts/cots-gpu-radiation-risk]]).

**Forward trajectory (labelled scenario / projection, not fact):**

| Horizon | Plausible structural state |
|---|---|
| ~2030 | Hybrid space-ground cloud is the commercial norm; ODC = inference/edge tier, ground = training/storage. 10s–100s of MW in orbit. |
| ~2040 | Gigawatt-class formation-flying compute clusters; in-space assembly + radiator structures larger than arrays; ISL optical mesh as default fabric. |
| ~2050 | If ASCEND-style economics hold, a meaningful share of *new* AI capex is launched, not grid-connected; orbital-slot + thermal-radiator real estate become the scarce inputs (the EPFD-style coordination of compute). |
| ~2100 | **Speculative:** Earth's surface reserved for latency-bound and human-facing compute; bulk training migrates to cislunar/solar-orbit power-rich nodes. Heat rejection, not energy, remains the civilisational ceiling on compute density. |

The constant across all horizons is the σT⁴ radiator limit — the one term that does not improve with Moore's-law-style scaling.

**Authoritative neutral anchor (2026-07):** [Bain & Company, *Orbital Data Centers: Beyond the Grid* (2026-07)](https://www.bain.com/insights/orbital-data-centers-beyond-the-grid/) — reported via [Bloomberg (2026-07-17)](https://www.bloomberg.com/news/articles/2026-07-17/orbital-data-centers-to-have-modest-share-of-total-compute-bain) — concludes ODC could hold a **"modest but strategically important"** share of global compute by ~2040, with **launch cost and cadence** the determinant and **scaling not before the early 2030s**. This keeps the wiki's read evidence-led and cuts against hype in both directions: it validates the ~2030 hybrid-cloud horizon above while cautioning that the ~2050/2100 rows remain scenario, not forecast — and it directly bears on the falsifier "ODC bends the demand curve fails if launched compute stays <1% of the IEA 945 TWh."

## Supply Chain Position

See mid-stream Segment C in [[concepts/leo-value-chain]]. Taiwan is currently almost absent from this segment, representing a structural gap — analysed in [[synthesis/leo-taiwan-odc-gap]] and placed in global context in [[synthesis/orbital-data-center-six-region]].

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]

## Related

- [[concepts/leo-value-chain]], [[concepts/cots-gpu-radiation-risk]], [[concepts/rha-radiation-hardening]], [[concepts/see-single-event-effects]]
- [[entities/starcloud]], [[entities/ada-space]], [[entities/google-suncatcher]], [[entities/axiom-space]], [[entities/spacex-orbital-data-center]], [[entities/hanwha-aerospace]], [[entities/nvidia]]
- [[synthesis/orbital-data-center-six-region]], [[synthesis/leo-taiwan-odc-gap]]
