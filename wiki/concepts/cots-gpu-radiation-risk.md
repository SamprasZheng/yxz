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
- **TID (Total Ionizing Dose)**: no hardening; 4nm process has thin oxide layers, but thinner oxide layers actually have relatively better TID tolerance (counterintuitive)
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

## Related

- [[concepts/see-single-event-effects]] — SEU/SEL fundamental mechanisms
- [[concepts/tid-total-ionizing-dose]] — TID damage mechanism
- [[concepts/rha-radiation-hardening]] — RDM requirements and COTS upscreening
- [[concepts/orbital-data-center]] — overall ODC engineering challenge framework
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 peak multiplier effect on GPU on-orbit risk
- [[sources/space-radiation-tid-see-2025]]
