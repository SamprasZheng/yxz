---
type: concept
tags: [rf-hardware, space, radiation, cots, qualification, taiwan, leo, supply-chain]
---

# RHA — Radiation Hardness Assurance

A **systematic engineering process** that ensures space components maintain specification performance under mission radiation environments, encompassing requirements definition, component screening, test verification, and design margin management. For Taiwan's LEO supply chain, it represents an implicit qualification threshold for entering formal constellation supply chains.

## Radiation Design Margin (RDM)

The most critical safety metric in RHA:

```
RDM = Component failure dose / Mission expected cumulative dose
```

**Example**: Component fails at 100 krad(Si), mission expected dose is 60 krad(Si) → RDM = 1.67 (67% margin)

| Mission Type | Minimum RDM Requirement |
|---|---|
| General commercial LEO | 1.5 |
| Government/military LEO | 2.0 |
| Deep space exploration | 2.0–3.0 |

## Test Levels

| Level | Description |
|---|---|
| **Part Level** | Individual component TID / SEE characterization testing, establishing failure curves |
| **Board Level** | Accounts for component interaction effects and shielding |
| **System Level** | Simulates mission profile, verifies complete system performance |

## COTS Component Challenges and "Upscreening"

Commercial LEO constellations (Starlink, Kuiper, etc.) extensively use commercial off-the-shelf (COTS) components to reduce costs, but COTS has no radiation assurance → **upscreening** is required as an intermediate step:

**Upscreening process**:
1. Purchase commercial component lots
2. Perform TID / SEE testing (sampling)
3. Confirm whether the lot meets mission RDM requirements
4. Build component radiation database (lot traceability is important; different lots may vary)

**Challenges**:
- COTS manufacturers provide no radiation data; significant variation between lots
- Advanced process (<28nm) node behavior is complex; traditional test models do not apply
- Cost: complete TID + SEE testing per component can reach thousands to tens of thousands of USD

### Market context — why upscreening (not rad-hard-by-process) is winning the volume (fact-check, accessed 2026-07-23)

The upscreening-vs-buy-rad-hard tension is visible in the market split. The **radiation-hardened electronics market** is ≈**$1.77B (2025) → ~$2.30B (2030)** at a ~5.4% CAGR (MarketsandMarkets); the **space segment** is the largest end-use (~58% share, 2026) and the fastest-growing (~5.65% CAGR). On the manufacturing-technique axis, the RHBD/RHBP crossover is genuinely **contested across analysts** — one house has **RHBP still ahead at ~54.5% (2025)** (special-process robustness for the highest-reliability GEO/deep-space parts), another projects **RHBD taking ~52% (2026)** and the higher long-run CAGR. The direction is agreed even where the year is not: **RHBD (harden-by-layout on a standard commercial foundry) is the structurally rising share** because it rides Moore's-law nodes and the NewSpace cost curve, which is the same economic gradient that makes *upscreening COTS* the default for LEO constellations rather than buying a $10k/part RHBP device. Sources: [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/radiation-hardened-electronics-market-44047967.html), [Grand View Research](https://www.grandviewresearch.com/industry-analysis/radiation-hardened-electronics-market-report), [Fortune Business Insights](https://www.fortunebusinessinsights.com/radiation-hardened-electronics-market-110551). RHBD-vs-RHBP mechanism detail is on [[concepts/tid-total-ionizing-dose]].

## Emerging Alternative Test Source: 90Sr/90Y Electron Source

Traditional Co-60 facilities are scarce and expensive; **90Sr/90Y β electron sources** are being evaluated as an alternative TID test tool:

| Characteristic | Co-60 | 90Sr/90Y |
|---|---|---|
| Radiation type | γ (1.2–1.3 MeV) | β electrons (max 2.28 MeV) |
| Advantages | Uniform penetration, standard compliant | Directional irradiation; compact equipment; low cost |
| Special advantage | — | Particular applicability for <28nm FPGA testing |
| Standards status | Current MIL-STD standard | Under evaluation, not yet fully standardized |

## Implicit Threshold for Taiwan's LEO Supply Chain

> No matter how excellent the hardware design, without complete TID/SEE verification, entry into formal constellation supply chains is not possible.

**Current status (2026 update)**:

> ⚠️ **Correction**: Previous assessment of Taiwan's testing infrastructure as "nearly blank" has been revised. The actual situation has improved. See [[concepts/taiwan-radiation-test-ecosystem]] for details.

- Very few institutions globally have complete heavy-ion + Co-60 testing capabilities (LBNL, TRIUMF, GANIL, GSI, HIRFL, etc.)
- Since **2020**, Taiwan has established a "Space Radiation Testing Consortium" (led by NSPO/now [[entities/nspo|TASA]], with Chang Gung, NTHU, Academia Sinica), providing proton SEE + TID testing. **Mid-2026 update:** the alliance has grown to **~13 member institutions** and reports **500+ tests completed over 2020–2025** — it is an operating service, not a plan ([[concepts/taiwan-radiation-test-ecosystem]] for the dated fact-check).
- **September 2022**: NSPO × National Taiwan University Hospital Cancer Center MoU; superconducting cyclotron proton beam available for SEE testing from **2023 onwards** — now confirmed in routine service
- INER (Institute of Nuclear Energy Research) handles Co-60 TID testing
- **Still lacking**: heavy-ion SEE (LET > 10 MeV·cm²/mg) — Taiwan manufacturers still need to travel to LBNL/TRIUMF for this
- Companies already in the Starlink/Kuiper chain such as Win Semiconductors ([[entities/win-semiconductors]]) and Ascend Technology ([[entities/ascend-tech]]) must have completed some radiation qualification, but details are commercially confidential

## Practical Qualification Workflow (Engineer's Playbook)

From [[sources/radtest-playbook-sampras-2021]], a TI-style five-step ordering that an engineer follows before locking a radiation test plan:

1. **Mission profile first** — orbit, lifetime, shielding stack-up, reliability target. Without this, no test plan can be sized.
2. **TID screen** with system-level assumptions (orbit × duration × shielding). Use closed-form [[concepts/orbit-dose-budgeting]] for trade studies; graduate to SPENVIS/OMERE for signoff.
3. **SEE characterization** — extract LET threshold + saturation cross-section from heavy-ion accelerator data ([[concepts/see-single-event-effects]]). **Always run SEL before SEU** — a latch-up finding kills the part regardless of SEU performance.
4. **Design-level mitigation**:
   - ECC + scrubbing for SRAM/HBM (covers SEU)
   - Watchdog + recovery paths for FPGA configuration / state registers (covers SEFI)
   - Current-limiting + power switching for SEL risk
   - Redundancy / TMR for safety-critical functional blocks
5. **Re-run mission-level estimates with mitigation assumptions**, then lock the test plan and the RDM target.

The ordering matters: mitigation decisions feed back into RDM, which feeds back into which COTS lots are eligible for upscreening.

## Major Commercial Test Laboratories (Global)

| Institution | Location | Capability | Notes |
|---|---|---|---|
| **LBNL BASE** | Berkeley, USA | Proton + full heavy-ion range (to bismuth) | LET > 99 MeV·cm²/mg; pioneered in 1979 |
| **TRIUMF** | Vancouver, Canada | Proton + heavy-ion | Second largest in North America |
| **GANIL** | Caen, France | Heavy-ion | ESA's primary partner |
| **GSI/FAIR** | Darmstadt, Germany | Heavy-ion | Highest energy in Europe |
| **TRAD (Toulouse)** | France | Co-60 + Cf + Am + low-energy proton + pulsed laser | Founded 1994; subsidiary of 3D Plus/HEICO; clients include Airbus DS, Thales, ESA, NASA; OMERE software tool |
| **Zero-G Radiation Assurance** | USA | Co-60 TID + heavy-ion + proton SEE | >6000 COTS radiation database entries; leading commercial lab for SmallSat ecosystem; >20 years of NASA commercial program experience |
| **JPL Radiation Effects Group** | Pasadena, USA | Full range | NASA government use; accepts some commercial clients |
| **BNL NASA NSRL** | Brookhaven, USA | Heavy-ion (space simulation) | Dual-use for biological + electronics |

**Zero-G's COTS database** is one of the most important tools for commercial New Space: over 6000 radiation test records primarily for COTS and automotive-grade components, enabling pre-screening of components before formal testing and significantly reducing costs.

## Six-Region Test-Capacity + Rad-Hard Supply (台美日韓中國歐洲)

Heavy-ion SEE is the scarcest, most capital-intensive mode and therefore the true sovereignty bottleneck. A six-region read (full table + citations on [[synthesis/radiation-test-rad-hard-six-region]]):

| Region | Heavy-ion SEE | Rad-hard IC line |
|---|---|---|
| **US** | Leads — TAMU REF (~80k beam-hrs, He→Au 40 MeV/u), LBNL BASE, BNL NSRL | Leads — BAE RAD750/RAD5545, Microchip |
| **Japan** | Strong — HIMAC (p→Xe 800 MeV/u), TIARA, RIKEN | Yes — Renesas |
| **Europe** | Leads (ESA-coordinated ECIF) — GANIL, GSI, UCLouvain, RADEF/Jyväskylä (to 2027) | Yes — STMicro, Infineon, Teledyne e2v, 3D Plus |
| **China** | Sovereign — HIRFL (IMP-CAS, 2 SEE terminals), CIAE | Domestic-only (US export controls forced indigenization) |
| **Korea** | Emerging — RAON (commissioning); KOMAC is proton | Largely absent |
| **Taiwan** | ❌ Absent — travel to LBNL/TAMU/TRIUMF | ❌ Absent |

The US National Academies' own review calls the national heavy-ion test system *"working but increasingly fragile"* and notes 3D/in-package integration is pushing required ion energy *up* — the bottleneck tightens as NewSpace volume explodes ([Testing at the Speed of Light, NAP 24993, 2018](https://nap.nationalacademies.org/read/24993/chapter/5)).

## Connection to [[concepts/leo-value-chain]]

Radiation qualification is the **implicit admission ticket** for all upstream components entering mid-stream Segment A (satellite manufacturing). The interpretation of Taiwan's competitiveness map should incorporate this dimension:

| Segment | Taiwan Presence | Radiation Qualification Requirement |
|---|---|---|
| Upstream RF PA (Win Semiconductors) | ★★★★★ | Must pass TID; qualified (inferred) |
| Upstream filter (Ascend Tech) | ★★★★★ | Must pass TID + partial SEE; qualified (inferred) |
| Mid-stream A PCB (Huatong) | ★★★★★ | Substrate material TID requirements; qualification status unknown |
| **Taiwan testing infrastructure** | **★★☆☆☆** | **TID + proton SEE established; heavy-ion SEE still lacking** |

## Historical Lineage & 100-Year View (拉長時間軸)

RHA is often taught as a static checklist; it is better read as a **process that keeps re-inventing itself each time the failing structure moves**. The lineage (companion to the device-physics lineages on [[concepts/tid-total-ionizing-dose]] and [[concepts/see-single-event-effects]]):

| Era | Milestone | What it changed for *assurance* |
|---|---|---|
| **1962** | Starfish Prime destroys six satellites | Assurance is born as a *military* discipline — first proof the environment must be designed against |
| **1960s–80s** | Rad-hard-**by-process** era (SOI, hardened bulk); US *Radiation, Inc.* → Harris → Intersil lineage | Assurance = "buy a specially-fabbed part"; RHBP is the only answer |
| **1975→** | SEE named (Binder); heavy-ion ground test (LBNL 1979) | Assurance splits into TID *and* SEE tracks — RDM alone no longer covers single-particle destructive modes |
| **1990s–2000s** | ELDRS (1991) + RHBD layout libraries mature | Assurance adds a *dose-rate* dimension and a cheaper *by-design* path on commercial foundries |
| **2010s–20s** | **NewSpace COTS-upscreening** becomes the LEO default; Zero-G-style COTS databases | Assurance shifts from "qualify one part forever" to "screen *this lot*, trace it, re-screen next lot" — a statistical, per-lot discipline |
| **2024–26** | Solar Cycle 25 peak + COTS-in-space explosion ([[concepts/cots-gpu-radiation-risk]]) | Demand for RHA *services* surges while the US National Academies calls its own heavy-ion test base "fragile" — capacity, not physics, becomes the binding constraint |

**100-year structural view (labelled scenario, not fact):** the *physics* RHA insures against is astrophysically fixed (GCR + trapped belts + solar particle events never "close"), so **assurance is a permanent tax on anything flown, not a problem that gets solved**. What migrates is *where* the assurance effort concentrates: from special fabs (RHBP) → to layout libraries on commodity nodes (RHBD) → to **statistical lot-screening + designed-in software resilience** (upscreening + ECC/scrubbing/TMR) as parts get cheaper and more numerous than any test campaign can individually qualify. The long-run equilibrium is *system-level* assurance — you stop trying to make every atom immortal and instead architect a fleet that tolerates-and-recovers, exactly the SEE "resilience is designed in, not bolted on" conclusion ([[concepts/see-single-event-effects]] 100-year view). The test-capacity bottleneck — heavy-ion beam-hours — is the one part of this that money can relieve but physics cannot cheapen, which is why it stays the sovereignty lever mapped on [[synthesis/radiation-test-rad-hard-six-region]] (the "qualification toll booth never closes").

## Related

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/orbit-dose-budgeting]] — closed-form trade-study calculators used in step 2/3 of the workflow
- [[concepts/taiwan-radiation-test-ecosystem]] — detailed page on Taiwan's testing ecosystem
- [[sources/space-radiation-tid-see-2025]]
- [[sources/radtest-playbook-sampras-2021]] — engineer's playbook + inline orbit/SEE calculators
- [[synthesis/radiation-test-rad-hard-six-region]] — six-region test-infrastructure + rad-hard sovereignty map; 100-year "toll booth never closes" view
- [[concepts/leo-value-chain]]
- [[entities/win-semiconductors]]
- [[entities/ascend-tech]]
