---
type: concept
tags: [rf, phased-array, radar, aesa, beamforming, leo, satellite, rf-hardware, transmitter]
---

# AESA — Active Electronically Scanned Array

## Definition

AESA is a phased array radar/communications system in which each radiating element has its own independent T/R (transmit/receive) module.
Distinguished from PESA (Passive Electronically Scanned Array, which shares a single central transceiver) and mechanically scanned radar.

## Why It Matters (System Layer)

AESA is the *physical-layer enabler* of the LEO build-out documented in [[concepts/leo-value-chain]]: the steerable, no-moving-parts, software-defined aperture is what lets a flat-panel user terminal track a satellite crossing the sky in seconds, and what lets a satellite electronically point an [[concepts/orbital-data-center|ODC]] inter-satellite-link beam without reaction-wheel torque. The same architecture spans three markets that were historically separate — military radar, satellite communications, and 5G/6G mmWave — and the convergence of those volumes onto **shared semiconductor processes** (GaN PA + SiGe/CMOS beamformer ICs) is exactly the supply-chain story Taiwan plays into (see [[synthesis/phased-array-rf-frontend-supply-chain]] and [[entities/win-semiconductors]]). The mechanism layer below (phase math, T/R modules) is *why* it works; this layer is *why it is strategically contested*.

## Technology Evolution

| Generation | Technology | Era | Scanning Method |
|---|---|---|---|
| 1st | Fixed high-gain antenna | Late 19th century | None |
| 2nd | Mechanically scanned radar | WWII (Chain Home, 1938) | Mechanical rotation, 360° |
| 3rd | PESA | 1960s (e.g. MiG-31 Zaslon, 1981 service) | Electronic scanning, single central transceiver |
| 4th | AESA | First operational on a fighter: **J/APG-1, Mitsubishi F-2, maiden flight Oct 1995, in service 2000–2002** (Japan, ahead of the US F-22 AN/APG-77) | Electronic scanning, independent T/R module per element |
| Modern | All-digital AESA | 2010s+ (per-element ADC/DAC) | Digital beamforming, FPGA-controlled |

> The "first operational AESA fighter radar" milestone is a useful corrective to the common US-centric framing: **Japan's J/APG-1 reached series production in service before the F-22's AN/APG-77**. Verified against [J/APG-1 — Wikipedia](https://en.wikipedia.org/wiki/J/APG-1) and [Mitsubishi F-2 — Wikipedia](https://en.wikipedia.org/wiki/Mitsubishi_F-2) (accessed 2026-05-31).

## Historical Lineage & 100-Year Forward Trajectory

- **1900s–1930s:** spark-gap / fixed antennas → Chain Home network (UK, 1938) proves electromagnetic detection at national scale.
- **1940s–1950s:** mechanically scanned magnetron radar matures (WWII); analog phase-shift beam steering first demonstrated.
- **1960s–1980s:** PESA enters service (ferrite phase shifters, single high-power source); SWAP and reliability ceilings hit.
- **1990s–2010s:** AESA crosses from lab to fielded systems (J/APG-1 1995 → APG-77/APG-81 → naval SPY-6); GaAs then GaN MMIC T/R modules collapse cost-per-element.
- **2020s:** silicon (SiGe BiCMOS / CMOS) beamformer ICs make **commercial** flat-panel SATCOM and 5G mmWave economic; all-digital arrays appear.
- **Forward trajectory (scenario / projection, not fact):** 2030s — photonic / optical beamforming and RF-over-fibre distribution reduce loss in very large apertures; mass-produced reconfigurable-intelligent-surface (RIS) and metasurface arrays blur the antenna/array boundary. 2040s–2060s — per-element digital-RF SoCs with on-die AI calibration make the array a software product. ~2100 horizon — large sparse/distributed apertures synthesised across satellite swarms (the array *is* the constellation) become the dominant long-range sensing/comms primitive. **Label:** this 100-year arc is a structural projection extrapolated from the cost-per-element decline, not a forecast of specific programs.

## System-Level: Beam vs Element Trade

Beam-steering resolution and sidelobe control scale with element count $N$; array gain rises ~$10\log_{10}(N)$ dB while the dominant cost, power, and calibration burden also scale with $N$ — which is why [[sources/hsieh-xband-leo-transmitter-2020|BIST self-calibration]] and per-element [[concepts/dpd-digital-predistortion|DPD]] become mandatory as arrays grow. The semiconductor *process* choice (GaN for power-dense PA, SiGe/CMOS for integrated low-cost beamformers) is the single biggest lever on SWAP and $/element — see [[concepts/hybrid-phased-array]].

## Core Advantages (vs. PESA / Mechanical)

- **Multi-target tracking**: Independent phase control enables simultaneous tracking of multiple targets
- **No mechanical wear**: Eliminates mechanical lifetime limitations (SWAP breakthrough)
- **Software-defined**: Same hardware reconfigurable as radar/communications/electronic warfare
- **Beam agility**: Arbitrary direction and beam shape, with microsecond-level switching speed

## SWAP Considerations (Size, Weight and Power)

The historical bottleneck of AESA. Independent T/R modules per element result in higher volume, weight, and power consumption compared to PESA.
Modern high-integration semiconductors (SiGe BiCMOS, GaN MMIC, advanced CMOS) have dramatically reduced SWAP,
enabling AESA deployment in portable and space applications.

## Architecture Classification

### All-Digital AESA
Each element has its own ADC/DAC, with fully digital beamforming.
Advantages: maximum flexibility; Disadvantages: high power consumption and cost.

### Hybrid Phased Array
Combination of digital phase shifting and analog phase shifters. See [[concepts/hybrid-phased-array]].
Advantages: lower power consumption, lower complexity; suitable for power-constrained scenarios such as LEO satellites.

## Phase Control Mathematics (Mechanism Layer)

**Progressive phase.** Phase difference between adjacent antenna elements to steer the beam to angle $\theta_0$:

$$\Delta\Theta = \frac{2\pi d \sin\theta_0}{\lambda}$$

where $d$ is the element spacing, $\lambda$ is the wavelength, and $\theta_0$ is the beam steering angle.

**Array factor.** For $N$ equally-spaced, equally-weighted elements, the far-field array factor is

$$\mathrm{AF}(\theta) = \frac{\sin\!\left(\tfrac{N}{2}\psi\right)}{N\sin\!\left(\tfrac{1}{2}\psi\right)}, \qquad \psi = \frac{2\pi d}{\lambda}(\sin\theta - \sin\theta_0)$$

The main-lobe peak sits where $\psi = 0$ (i.e. $\theta = \theta_0$); the first nulls set the beamwidth. Half-power beamwidth for a broadside uniform array is $\approx 0.886\,\lambda/(Nd)$ rad — **beamwidth shrinks as $1/N$**, which is *why* element count is the primary design lever ([[concepts/hybrid-phased-array]] trades $N$ against power/cost).

**Grating-lobe condition — the hard spacing constraint.** Copies of the main lobe (grating lobes) appear whenever $\psi = \pm 2\pi m$. To keep them out of real space for a scan out to $\theta_0$:

$$\frac{d}{\lambda} \le \frac{1}{1 + |\sin\theta_0|}$$

Broadside ($\theta_0 = 0$) permits $d \le \lambda$; scanning to $\pm 60°$ tightens this to $d \le 0.54\lambda$ — this is the origin of the familiar **"element pitch ≈ λ/2"** rule, and it fixes element count (hence T/R-module count, hence cost and thermal load) for a given aperture. Missing this is a top-tier design bug in the [[concepts/rf-soc-debug-taxonomy|HW-layer]] taxonomy.

**Beam squint & true-time-delay.** A *phase* shifter produces the correct steering angle only at the design frequency; across an instantaneous bandwidth $\Delta f$ the beam "squints" by $\Delta\theta \approx -\tan\theta_0 \cdot (\Delta f/f_0)$. For wideband apertures (wideband SATCOM, radar) the fix is **true-time-delay (TTD)** at the sub-array level rather than pure phase shift — the same wideband pressure that pushes hybrid arrays toward per-sub-array TTD and all-digital beamforming. Element-level amplitude/phase errors (from PA nonlinearity, temperature, aging) raise sidelobes and degrade EVM, which is why per-element [[concepts/dpd-digital-predistortion|DPD]] and [[sources/hsieh-xband-leo-transmitter-2020|BIST self-calibration]] become mandatory as $N$ grows.

## Application Scenarios

- Military radar: shipborne, airborne early warning (E-2D), missile defense (PAC-3)
- Satellite communications: LEO downlink X-band transmission
- 5G mmWave: Massive MIMO beamforming
- Wind farm monitoring: small target (bird/drone) detection and tracking

## Six-Region Leadership (2025 snapshot)

Who leads vs lags across the AESA / phased-array stack. Component-level supply-chain detail (beamformer ICs, GaN PA foundries) is consolidated in [[synthesis/phased-array-rf-frontend-supply-chain]].

| Region | Defense AESA radar | Commercial SATCOM / 5G phased array | Underlying semiconductor role |
|---|---|---|---|
| **US** | Leads — APG-77/81, SPY-6, 80+ space AI/SDA programs; DoD raised GaN to MRL-10, >$3B radar funding 2024–25 | Leads beamformer ICs (Analog Devices, Anokiwave) and GaN (Wolfspeed/Qorvo) | Designs + much of GaN-on-SiC capacity |
| **Japan** | Early leader — **first operational AESA fighter (J/APG-1, 1995–2002)**; Mitsubishi Electric naval/air radar | Mid — strong components, smaller terminal market | GaAs/GaN device strength (Sumitomo, Mitsubishi) |
| **Korea** | Rising fast — KF-21 indigenous AESA (Hanwha/LIG Nex1), backed by RFHIC GaN | Mid — RFHIC GaN-on-SiC subsystems, MaxLinear DPD partnership (IMS 2024) | GaN-on-SiC subsystem leader (RFHIC; invested in SweGaN, Sweden) |
| **China** | Leads by volume — CETC all-digital active phased arrays (YLC-16), 100+ systems shown at World Radar Expo 2025; GaN-based KJ-500 AEW | Growing — state-backed flat-panel + ODC ([[entities/ada-space]]) | Vertically integrated GaN/GaAs (CETC institutes) |
| **Europe** | Leads in segments — Thales/Leonardo/Saab/Hensoldt AESA; ESA SATCOM | Mid — UMS/OMMIC (France) GaN foundries, terminal vendors | GaN foundry + design (UMS, OMMIC, Infineon) |
| **Taiwan** | No indigenous *fighter* AESA, but an emerging dual-use array integrator — [[entities/tron-future-tech]] builds in-house AESA counter-drone radar (T.Radar) deployed with Taiwan's military (T-Dome) | Emerging: [[entities/tron-future-tech]] T.SpaceRouter 1024-element Ka-band AESA LEO terminal; otherwise component supply | **Upstream foundry strength** — [[entities/win-semiconductors]] GaAs/GaN MMIC (+Viper RF, 1–150 GHz); [[entities/ascend-tech]] filters; the "strong upstream, absent midstream" pattern of [[synthesis/leo-taiwan-odc-gap]], now partially countered at the array-integrator node |

## Sources & Verification (accessed 2026-05-31; market re-checked 2026-07-10)

- AESA fighter history: [J/APG-1 — Wikipedia](https://en.wikipedia.org/wiki/J/APG-1); [Mitsubishi F-2 — Wikipedia](https://en.wikipedia.org/wiki/Mitsubishi_F-2)
- Beamforming/AF math (grating-lobe condition $d/\lambda \le 1/(1+|\sin\theta_0|)$, HPBW $\approx 0.886\lambda/Nd$, beam-squint $\approx -\tan\theta_0\,\Delta f/f_0$): standard array theory (Balanis, *Antenna Theory*; Mailloux, *Phased Array Antenna Handbook*) — textbook, not web-verified.
- SATCOM beamformer-IC market: **estimates diverge** by source — Semiconductor Insight put it ~USD 2.87B (2025)→7.94B (2034, ~10.6% CAGR, restated ~3.21B for 2026); SNS/Verified/DataIntelo reports span ~USD 4.3–6.9B (2025–26) with 11–19% CAGRs. Treat the *direction* (double-digit growth driven by LEO flat-panel volume) as robust and the *level* as uncertain — [Phased Array Beamforming IC for SATCOM (Semiconductor Insight)](https://semiconductorinsight.com/report/phased-array-antenna-beamforming-ic-for-satcom-market/); vendor products — [Anokiwave SATCOM](https://www.anokiwave.com/satcom/index.html), [Renesas phased-array beamformers](https://www.renesas.com/us/en/products/rf-products/phased-array-beamformers)
- GaN RF foundry landscape (top-5 ≈ 60% revenue; DoD GaN MRL-10; GaN IC cost ~2–3× silicon): [Mordor Intelligence GaN RF report](https://www.mordorintelligence.com/industry-reports/gan-rf-semiconductor-devices-market)

## Related Links

- [[concepts/zero-if-transmitter]] -> direct-conversion transmitter block inside X-band phased-array systems
- [[concepts/evm-calibration]] -> measurement/calibration layer for transmitter quality
- [[sources/hsieh-xband-leo-transmitter-2020]] -> X-band LEO transmitter source

- [[concepts/hybrid-phased-array]] — hybrid architecture details
- [[concepts/dpd-digital-predistortion]] — PA linearization (essential technology for AESA transmitters)
- [[concepts/tid-total-ionizing-dose]] — radiation reliability for space AESA
- [[concepts/see-single-event-effects]] — single event effects for space AESA
- [[concepts/leo-value-chain]] — where AESA apertures sit in the LEO upstream/midstream
- [[concepts/orbital-data-center]] — ISL beam-steering application of space AESA
- [[entities/win-semiconductors]] — Taiwan GaAs/GaN MMIC foundry feeding AESA T/R modules
- [[synthesis/phased-array-rf-frontend-supply-chain]] — six-region RF front-end supply-chain map
- [[synthesis/leo-taiwan-odc-gap]] — Taiwan "strong upstream, absent midstream" structural context
