---
type: concept
tags: [rf, phased-array, aesa, x-band, leo, beamforming]
---

# Hybrid Phased Array

## Definition

A hybrid phased array is an [[concepts/aesa|AESA]] architecture that combines **Digital Beamforming** with **Analog Phase Shifters**.
Each sub-array shares a single DAC / up-converter, with analog phase shifters providing independent phase shifting for each antenna element.

## Why It Matters (System Layer)

The hybrid array is the architecture that made phased arrays *economic outside defense budgets*. An all-digital array needs an ADC/DAC + full RF chain per element; a hybrid array amortises one data-converter chain across a whole sub-array (typically 4–64 elements), cutting converter count, power, and $/aperture by roughly the sub-array size — at the cost of the bandwidth/flexibility ceiling analysed below. That trade is precisely what turns a $100M defense radar block diagram into a sub-$1k LEO user terminal ([[concepts/leo-value-chain]]) and a 5G/6G massive-MIMO panel. It is therefore the reference architecture for the [[concepts/orbital-data-center|ODC]] inter-satellite-link and flat-panel SATCOM terminal that Taiwan's upstream RF supply chain feeds ([[synthesis/leo-taiwan-odc-gap]], [[entities/win-semiconductors]]). The mechanism sections below are *why it works and where it breaks*; the process/region sections are *why it is strategically contested*.

## Signal Path

```
DAC → Digital phase shift (DSP) → PLL (LO generation) → Mixer (up-conversion) → Secondary PA → Analog phase shifter → PGA → Antenna
```

## Comparison of Three Architectures

| Architecture | Power Consumption | Complexity | Flexibility |
|---|---|---|---|
| Passive phased array (PESA) | Low | Low | Low |
| Hybrid phased array | Medium | Medium | Medium-high |
| All-digital phased array | High | High | Highest |

Compared to all-digital: **lower power consumption, lower hardware complexity, higher power efficiency, longer lifespan**.
Compared to passive: **programmable gain, independent of passive feed losses**.

## Sub-Array Mechanism & The Bandwidth Ceiling (Mechanism Layer)

The hybrid array's defining limit follows directly from its topology. Digital beamforming steers *between* sub-arrays; analog phase shifters steer *within* each sub-array. Because analog phase shift is exact only at the design frequency, each $M$-element sub-array **beam-squints** across an instantaneous bandwidth $\Delta f$ by roughly

$$\Delta\theta_{\text{sub}} \approx -\tan\theta_0 \cdot \frac{\Delta f}{f_0}$$

and — unlike an all-digital array, which can apply per-element true-time-delay (TTD) in the digital domain — the hybrid array cannot fully correct this in the analog sub-array. The usable fractional bandwidth at scan angle $\theta_0$ scales as $\sim 1/(M\tan\theta_0)$: **bigger sub-arrays save converters but shrink the squint-free bandwidth and scan volume.** This is the single most important design tension of the architecture, and it is why wideband hybrid designs push TTD down to the *sub-array* boundary (a middle path between per-element TTD and pure phase shift). Grating-lobe spacing ($d \le \lambda/(1+|\sin\theta_0|)$) and beamwidth ($\propto \lambda/Nd$) inherit unchanged from the [[concepts/aesa|parent AESA phase-control math]]; the sub-array partition adds *quantisation lobes* from the coarse digital-weight granularity.

## Historical Lineage & Time Axis

- **1950s–1970s:** analog corporate/space-fed passive arrays (PESA) with ferrite phase shifters; one high-power source, no per-element control — the ancestor the hybrid array descends from by adding digital sub-array weighting.
- **1980s–2000s:** digital beamforming demonstrated but converter cost confines all-digital arrays to a few high-value defense/radio-astronomy apertures; hybrid partitioning emerges as the practical compromise.
- **2010s:** SiGe/CMOS multi-channel beamformer ICs (Anokiwave, ADI) make **commercial** hybrid flat-panel SATCOM and 5G mmWave massive-MIMO economic — the inflection that opened the LEO-terminal market.
- **2020s (now):** GaN-on-SiC front ends + silicon beamformers ship in volume; the reference LEO Ku/Ka user terminal and X-band downlink ([[sources/hsieh-xband-leo-transmitter-2020]]) are hybrid.
- **Forward (labeled projection, see below):** the converter-cost decline steadily *moves the digital/analog boundary down toward the element*, so "hybrid" is best read as a moving compromise, not a fixed category — a 2040s array with cheap per-element digital-RF is effectively all-digital at hybrid power budgets.

## Semiconductor Process Dimension (the real cost/SWAP lever)

The architecture choice above is downstream of a **process choice**. The hybrid array's economics are set by which semiconductor does the power amplification vs. the integrated beamforming:

| Function | Process options | Why | Region strength |
|---|---|---|---|
| Power amplifier (T/R front end) | **GaN-on-SiC** (high power density, efficiency), GaAs (mature, lower power), LDMOS (sub-6 GHz) | GaN gives the highest W/mm and thermal headroom — now the default for radar and high-EIRP SATCOM | US (Wolfspeed/Qorvo), Korea (RFHIC), Taiwan ([[entities/win-semiconductors]] GaAs/GaN MMIC), France (UMS/OMMIC) |
| Integrated beamformer IC (multi-channel phase/gain) | **SiGe BiCMOS**, advanced **CMOS** | Silicon integrates 4–8+ channels of phase shift + VGA cheaply → makes *commercial* flat-panel SATCOM economic | US (Analog Devices, Anokiwave), Renesas |
| Up-converter / DAC | CMOS SoC | Integration + power | Broad |

This is why the **same hybrid array** can be a $100M defense radar (GaN-heavy, all-digital) or a sub-$1k consumer SATCOM terminal (SiGe beamformer, hybrid): the process mix, not the block diagram, sets the price. Market context: the SATCOM beamforming-IC segment was sized ≈ USD 2.87–4.3B in 2025–26 (source estimates diverge; ~10–19% CAGR toward the mid-2030s), driven by LEO flat-panel volume. See [[synthesis/phased-array-rf-frontend-supply-chain]] for the full six-region map and dated citations.

**Six-region read (台美日韓中國歐洲), compact —** *full detail and citations in [[synthesis/phased-array-rf-frontend-supply-chain]]*: **US** leads the two IP chokepoints (SiGe/CMOS beamformer ICs — ADI/Anokiwave; GaN PA — Wolfspeed/Qorvo). **Europe** holds independent GaN foundry + design (UMS/OMMIC France, Infineon). **Japan** is device-strong (Sumitomo/Mitsubishi GaN/GaAs) feeding modules. **Korea** owns the GaN-on-SiC subsystem node (RFHIC). **China** is vertically integrated but sanction-isolated (CETC institutes; state-backed flat-panel + [[entities/ada-space|ODC]]). **Taiwan** is upstream-strong ([[entities/win-semiconductors]] GaAs/GaN MMIC) but historically midstream-absent at the *array integrator*, now partially countered by [[entities/tron-future-tech]]'s 1024-element Ka-band hybrid LEO terminal — the [[synthesis/leo-taiwan-odc-gap]] pattern at the array node.

## Forward Trajectory (scenario)

Near term (2026–2030): SiGe/CMOS beamformer channel counts and integration keep rising, pushing per-element cost down and enabling LEO user-terminal volume. Mid term (2030s): GaN-on-Si (cheaper substrate than GaN-on-SiC) and heterogeneous 3D integration (beamformer + PA + antenna in one module) collapse module size further. Long term: per-element digital-RF with on-die AI calibration moves the hybrid array toward all-digital at hybrid power budgets. **Label:** projection extrapolated from current process roadmaps, not a forecast.

## Typical LEO Satellite Specifications

X-band hybrid phased array transmitter (reference: publicly available iCASE 2020 data):

- Frequency: X-band (~8.2 GHz)
- Array size: 144 TX elements (12×12)
- EIRP: ~64 dBm (boresight)
- Scan angle: ±65° (>130° coverage)
- Power consumption: < 90W (TX average)
- Downlink rate: 800 Mbps (16-APSK), 400 Mbps (QPSK)
- CMOS PGA: P1dB = −8 dBm, IIP3 = 0.8 dBm @ 8.2 GHz

## Reliability Design Considerations (Space Scenarios)

- **Redundant architecture**: I/O, power, signal processing, and UC modules are all duplicated, eliminating single points of failure
- **Thermal management**: Copper-methanol heat pipes + honeycomb aluminum panels (suitable for low-temperature space environment)
- **LEO launch prerequisite**: Must pass radiation hardening tests (TID/SEE) + vibration testing

## Related Links

- [[sources/hybrid-xband-phased-array-icase-2020]] -> source stub for the public iCASE 2020 hybrid X-band reference
- [[sources/hsieh-xband-leo-transmitter-2020]] -> Zero-IF transmitter subsystem source
- [[sources/thesis-aesa-modules-zheng-2021]] -> XT-144 / AESA system source stub

- [[concepts/aesa]] — parent architecture concept
- [[concepts/dpd-digital-predistortion]] — PA nonlinearity compensation (required in hybrid architectures)
- [[concepts/tid-total-ionizing-dose]] — radiation reliability
- [[concepts/see-single-event-effects]] — single event effects
- [[concepts/leo-value-chain]] — where the RF front-end module sits in the LEO upstream
- [[entities/win-semiconductors]] — GaAs/GaN MMIC foundry supplying the PA layer
- [[synthesis/phased-array-rf-frontend-supply-chain]] — six-region beamformer/GaN supply-chain map
- [[synthesis/leo-taiwan-odc-gap]] — Taiwan upstream-strong / midstream-absent context

## Sources (accessed 2026-05-31)

- SATCOM beamformer-IC market sizing: [Phased Array Beamforming IC for SATCOM market report (Semiconductor Insight)](https://semiconductorinsight.com/report/phased-array-antenna-beamforming-ic-for-satcom-market/)
- GaN RF foundry landscape: [Mordor Intelligence GaN RF report](https://www.mordorintelligence.com/industry-reports/gan-rf-semiconductor-devices-market)
