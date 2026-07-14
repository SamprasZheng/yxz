---
type: concept
tags: [space, radiation, cots, gpu, leo, see, tid, ai, orbital-data-center]
---

# COTS GPU Radiation Risk in LEO

Modern AI GPUs (NVIDIA H100, Jetson AGX Orin, etc.) deployed to LEO as COTS components face two primary radiation threats: cumulative TID damage and SEE single event effects. This page consolidates 2025 known test data and engineering mitigation strategies.

## Risk Overview: Why GPUs Are Particularly Vulnerable

| Characteristic | Radiation Impact |
|---|---|
| **Advanced process node (4–7nm)** | Very low Qcrit, increased SEU cross section; more sensitive to TID threshold shift |
| **High-density SRAM cache** | L1/L2 cache is the most vulnerable SEU node |
| **HBM memory (HBM2e/HBM3)** | DRAM itself has no built-in ECC; relies on controller ECC |
| **No SEL protection (COTS)** | Does not include SEL guard rings; latchup under power causes destruction |
| **High power consumption (300–700W)** | Higher SEB risk from charged particle activation |

## NVIDIA H100 (HBM3) Radiation Characteristics

**ECC protection (software level)**:
- Architecture: SEC-DED (Single Error Correction, Double Error Detection)
- Coverage: HBM3 memory, L2 cache, L1 cache and register files, internal data paths
- Function: can detect and correct single-bit upsets (SEU) in real time

**Critical weaknesses (unprotected)**:
- **TID (Total Ionizing Dose)**: no hardening; the H100 is fabbed on **TSMC 4N** (a 5 nm-class node). Its thin gate oxide is actually relatively TID-*tolerant* — but that is only the gate-oxide half of the **two-oxide story**: the offsetting failure path is radiation-induced leakage in the shallow-trench-isolation (STI) oxide, which does not scale. See [[concepts/tid-total-ionizing-dose]] scaling section.
- **SEL (Single Event Latchup)**: no protection; COTS CMOS contains parasitic PNPN structures
- **SEGR (Gate Rupture)**: no protection

> **2025 analysis conclusion** (New Space Economy): H100's ECC is designed for ground-level low-intensity radiation and is insufficient to withstand hard SEE (SEL/SEGR) events under space radiation intensity. Without an external SEL detection cutoff mechanism, H100 is not suitable for direct exposure to the LEO radiation environment.

## Aitech S-A2300: NVIDIA Orin COTS AI Supercomputer (2025 Test Data)

**System architecture**:
- SoC: NVIDIA Jetson AGX Orin Industrial (12-core ARM + 2048 CUDA + 64 Tensor Core)
- Memory: 64 GB LPDDR5 ECC RAM
- AI performance: 248 TOPS

**TID test results** (MIL-STD-883 TM1019, May 6, 2025):

| Test Condition | Result |
|---|---|
| Radiation source | Co-60 γ-ray, 2815 rad/min (HDR) |
| Cumulative dose | 0 → 10 krad(Si) (increments of 5 krad) |
| Bare board (no shielding) result | Full functionality pass (NVMe, eMMC, Ethernet, UART/GPIO, FPGA, CPU/GPU stress test) |
| With aluminum shielding (200–300 mil, 5–7.5 mm) | Shielding halves TID → equivalent mission lifetime dose of 20 krad(Si), meeting typical LEO mission requirements |
| Device temperature | ~33°C (powered at 22V DC) |

**Gap**: S-A2300 test report **does not include SEE (SEU/SEL) test data**; TID-only qualification is insufficient to support high-reliability missions. Proton SEE testing has not been publicly disclosed.

## Starcloud Series: H100 On-Orbit (2025)

**Starcloud V1 (November 2025)**: World's first H100 GPU sent to LEO for orbital testing.

**Mitigation strategies (inferred, not publicly confirmed)**:
- External SEL detection circuit (monitors current; cuts power upon latchup detection)
- Hydrogen-rich material shielding (reduces secondary particle flux)
- Immersion cooling fluid (organic hydrogen compounds provide additional attenuation of cosmic ray secondary particles)
- Software-layer ECC + application-layer error retry mechanism
- Shorter mission duration (experimental deployment, not a 5-year commercial mission)

> **Data gap**: SpaceX / Starcloud has not publicly disclosed on-orbit SEU rate, actual TID dose, or number of SEL events. This is the most important unknown in LEO AI computing.

## Soft Error Rate (SER): Ground vs. High Altitude vs. LEO

| Environment | Cosmic ray neutron flux (relative) | SER multiplication factor (relative to ground) |
|---|---|---|
| Ground (sea level) | 1× | 1× |
| Mountain (~1.6 km, Boulder CO) | ~3× | ~3× |
| Aviation (10 km altitude) | 100–300× | 100–300× |
| LEO (550 km, mid-inclination) | GCR still present; Van Allen belts provide partial shielding | Hundreds to thousands of times (depending on inclination) |

> **Key note**: In LEO, the atmosphere no longer provides cosmic ray shielding, but Earth's magnetic field (magnetic rigidity cutoff) still offers protection inversely proportional to inclination angle — equatorial inclination (Starlink ~53°) has lower exposure than polar orbit (90°).

## Commercial Mitigation Path Comparison

| Method | Cost | TID Protection | SEU Protection | SEL Protection | Applicable Scenario |
|---|---|---|---|---|---|
| Pure COTS (no mitigation) | Lowest | ❌ | ❌ | ❌ | Short-term experimental missions |
| Aluminum shielding (200–300 mil) | Low | ✅ (partial) | ❌ | ❌ | LEO <3 years, non-critical applications |
| ECC + software retry | Low (software) | ❌ | ✅ (soft) | ❌ | Low-reliability AI inference |
| SEL detection power-cut circuit | Medium | ❌ | ❌ | ✅ | Prevents hard failure; essential |
| Complete system-level (shielding+ECC+SEL protection+scrubbing) | Medium-high | ✅ | ✅ | ✅ | 3–5 year LEO commercial missions |
| Rad-hard GPU (e.g., Aitech SP-A series) | High | ✅ | ✅ | ✅ | Government/military/deep space |

## Why COTS-Everything *Tightens* the Test Bottleneck (layer-up)

The NewSpace economics that put H100s and Orins in orbit ([[entities/starcloud]], [[concepts/orbital-data-center]]) shift the work from *"buy a qualified rad-hard part"* to *"upscreen a commercial lot"* ([[concepts/rha-radiation-hardening]]). Counter-intuitively this makes the **heavy-ion accelerator the binding constraint, not the fab**: every unqualified COTS lot now needs its own SEU/SEL cross-section curve, so beam-hour demand rises per program even as unit cost falls. This is why *who owns heavy-ion test capacity* is a strategic question, not a procurement detail — and why Taiwan's missing heavy-ion lane bites its AI-in-orbit ambitions specifically. Six-region map of who owns that capacity: [[synthesis/radiation-test-rad-hard-six-region]].

## Public Radiation-Evidence Ledger for Flown/Planned COTS AI Compute (向外抓取 — 數據查核)

What is actually *published* about the radiation survival of data-center-class COTS AI accelerators is thin and vendor-controlled. This ledger tracks the disclosed hard numbers as of 2026-07 — the honest state of the evidence, not marketing:

| Payload | Part | Radiation data disclosed | Source |
|---|---|---|---|
| **Starcloud-1** (LEO, launched 2025-11) | NVIDIA H100 (TSMC 4N) | Operated through launch + on-orbit; trained NanoGPT and ran Google Gemma / Gemini in orbit (first LLM *trained* in space, Dec 2025). Carries radiation shielding + ISS-heritage cooling. **No on-orbit SEU/SEL/TID rates released.** | [DCD](https://www.datacenterdynamics.com/en/news/starcloud-1-satellite-reaches-space-with-nvidia-h100-gpu-now-operating-in-orbit/) |
| **Project Suncatcher** (planned 2027) | Google Trillium TPU v6e | **Ground beam test (only quantified public data):** 67 MeV proton; **no TID-attributable hard failure to 15 krad(Si)/chip**; **HBM = most sensitive subsystem**, first irregularities at ~2 krad(Si) ≈ **3× the shielded 5-yr mission dose of 750 rad(Si)** | [Google Research](https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/) |
| **Aitech S-A2300** | Jetson AGX Orin Industrial | Co-60 TID to 10 krad(Si) bare / 20 krad w/ 5–7.5 mm Al; **no SEE data** (see section above) | Aitech (2025-05) |
| **Three-Body / Star-Compute** (China, 12 sats launched 2025-05-14) | Undisclosed (likely domestic; NVIDIA leading-node export-controlled) | Deployed at scale (5 POPS combined, 30 TB storage); **radiation approach not publicly disclosed** | [SpaceNews](https://spacenews.com/china-launches-first-of-2800-satellites-for-ai-space-computing-constellation/) |

**Reading:** the only *quantified beam* datum in public is Google's Trillium result, and it **confirms the wiki's standing thesis — HBM is the binding TID-sensitive subsystem**, degrading ~3× sooner than the logic. Starcloud's flight is an *existence proof, not a dataset*: no on-orbit error rates have been released, so the single most important number in LEO AI computing — the actual on-orbit SEU/SEL rate of a leading-node GPU — **remains unpublished** (the same data gap flagged in the Starcloud section above, now confirmed still-open one flight later). Next data points to watch: **Starcloud-2** (planned late 2026, NVIDIA Blackwell B200, ~100× power of Starcloud-1) and the Suncatcher on-orbit prototypes (early 2027).

## Historical Lineage: From Rad-Hard-Only to COTS-in-Orbit (拉長時間軸)

| Era | Doctrine | Driver |
|---|---|---|
| **1970s–2000s** | **Rad-hard-only** — fly only RHBD/RHBP parts (RAD750, RAD5545), 2–3 process nodes behind commercial, at 10–100× the price | Starfish-Prime-era total-loss experience ([[concepts/tid-total-ionizing-dose]] lineage); mil/gov single-satellite missions where failure = mission loss |
| **2000s–2010s** | **COTS-tolerant CubeSat era** — universities + NewSpace fly automotive/industrial COTS in LEO, accept higher part-failure, lean on redundancy | Launch-cost collapse; short missions; smallsat *statistics* make per-unit failure survivable |
| **2020–2024** | **COTS-for-payload-compute** — Snapdragon/edge-AI accelerators on smallsats for on-board inference (still not data-center class) | On-board autonomy + edge-inference demand |
| **2025–2026** | **Data-center-class COTS in orbit** — H100 (Starcloud-1, 2025-11), Trillium (Suncatcher), Orin (Aitech), B200 (Starcloud-2 planned) | ODC economics + terrestrial AI compute/power crunch; the "recompute is cheaper than rad-harden" bet |

The 60-year arc is a steady **relaxation of the rad-hard requirement** as mission economics shift from *"one satellite, cannot fail"* to *"a constellation, designed to tolerate failures."* COTS-in-orbit is not a radiation *solution* — it is a change in what counts as acceptable failure.

## Six-Region Radiation Strategy for Orbital AI Compute (台美日韓中國歐洲)

The ODC *player/capability* map lives on [[synthesis/orbital-data-center-six-region]]; the distinct, less-duplicated axis here is each region's **radiation-survival strategy** for its flown/planned AI-compute payloads:

| Region | Lead payload | Radiation strategy | Public evidence |
|---|---|---|---|
| **US** | [[entities/starcloud]] (H100→B200), [[entities/google-suncatcher]] (Trillium), [[entities/axiom-space]] (AxDCU) | **COTS + shielding + external SEL-cutoff + software ECC/retry** — "characterize-and-tolerate" | **Strongest** — only region publishing beam data (Google) *and* a flight existence proof (Starcloud) |
| **China** | [[entities/ada-space]] / Zhejiang Lab Three-Body (12 sats 2025 → 2,800 ~2035) | Deployed at the **largest scale**; parts likely domestic (leading NVIDIA silicon export-controlled); methodology closed | Scale-first; radiation approach **undisclosed** |
| **Europe** | Thales Alenia **ASCEND** (study, ROI-by-2050) | ESA rad-hard heritage → likely **qualified-parts/conservative** bias; net-zero-anchored | Study-stage; no flown AI-compute payload yet |
| **Japan** | NTT × SKY Perfect JSAT **Space Compass** (optical-relay edge fabric) | **Edge/relay** rather than in-orbit training → smaller radiation-exposure surface | Relay-first |
| **Korea** | Hanwha / KARI (bus, SAR, AI-analytics supply) | Supply-side + **AI-on-imagery at the edge** | Component/analytics |
| **Taiwan** | ❌ no sovereign ODC compute payload | Upstream-supply/midstream-absent; the **missing heavy-ion + rad-hard lane** ([[concepts/rha-radiation-hardening]]) specifically caps any domestic AI-in-orbit program | — |

The split maps onto two camps: **US "characterize-and-tolerate COTS"** vs **everyone-else "conservative-or-undisclosed,"** and it is the *US* camp generating the only public radiation-survival data — an openness asymmetry that mirrors the model-layer one on [[synthesis/open-weight-llm-agent-stack-six-region]] but **inverted** (here the US is the *open* discloser, China the closed one).

## 100-Year Structural View (labelled scenario, not fact)

COTS-in-orbit is fundamentally a bet that **recompute is cheaper than radiation-hardening** — that at constellation scale it is more economic to let parts upset/degrade and recover in software (ECC, retry, checkpoint-restart, redundant nodes) than to pay the 10–100× rad-hard premium and fly 2–3 nodes behind. Two forces decide the century:

- **If the bet holds:** the rad-hard-IC industry shrinks to a deep-space/mil niche while LEO compute runs on N−1-generation commercial silicon, and the binding constraints stay **HBM/back-end-memory TID** (the Trillium result) plus **heat rejection** (σT⁴, the ODC ceiling on [[synthesis/orbital-data-center-six-region]]) — *never* the logic node.
- **If it fails** (an un-mitigated [[concepts/see-single-event-effects|SEL]] destroys a flagship node, or a solar-particle-event dose spike overwhelms software recovery — see [[concepts/solar-cycle-25-leo-radiation]]): the pendulum swings back toward qualified parts, and Taiwan's absent heavy-ion/rad-hard lane becomes a **hard** gate rather than a soft one.

Either way the astrophysical forcing (GCR + trapped belts + solar cycle) is fixed for the century; only the **device-side economics** move. This is the applied-compute instance of the "qualification toll booth never closes" invariant ([[synthesis/radiation-test-rad-hard-six-region]]) — the toll is now paid in *software resilience budget* instead of *rad-hard silicon premium*, but it is never waived.

## Related

- [[concepts/see-single-event-effects]] — SEU/SEL fundamental mechanisms
- [[concepts/tid-total-ionizing-dose]] — TID damage mechanism
- [[concepts/rha-radiation-hardening]] — RDM requirements and COTS upscreening
- [[concepts/orbital-data-center]] — overall ODC engineering challenge framework
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 peak multiplier effect on GPU on-orbit risk
- [[synthesis/radiation-test-rad-hard-six-region]] — six-region heavy-ion test capacity + rad-hard supply; why COTS-upscreen raises beam demand
- [[synthesis/orbital-data-center-six-region]] — the ODC player/capability map; radiation-strategy companion to the six-region table above
- [[synthesis/open-weight-llm-agent-stack-six-region]] — the (inverted) openness-asymmetry analogue referenced in the six-region reading
- [[entities/starcloud]] — H100-in-orbit operator (Starcloud-1 flew Nov 2025; Starcloud-2/B200 next) whose COTS-everything model drives the bottleneck above
- [[entities/google-suncatcher]] — Trillium TPU 67 MeV-proton beam result: the only quantified public radiation datum in the ledger above
- [[entities/axiom-space]] — relay-networked-edge ODC node (US six-region column)
- [[entities/ada-space]] — China's state-scaled Three-Body/Star-Compute AI constellation (radiation approach undisclosed)
- [[sources/space-radiation-tid-see-2025]]
