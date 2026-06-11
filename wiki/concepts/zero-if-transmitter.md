---
type: concept
tags: [rf, transmitter, architecture, zero-if, phased-array, xband, leo]
---

# Zero-IF Transmitter Architecture (Direct Conversion)

## Why the architecture choice matters (system layer)

The transmitter-architecture decision is upstream of almost every cost, power, and integration constraint in a phased array. In an N-element [[concepts/aesa|AESA]] / [[concepts/hybrid-phased-array|hybrid array]], the up-conversion chain is replicated per element (or per sub-array), so a topology that shaves DAC sample rate, LO count, or filter count multiplies that saving by N. Zero-IF wins precisely because it needs **the lowest DAC sample rate and only a low-pass reconstruction filter** — which is why it became the dominant commercial transceiver topology once CMOS could integrate the quadrature modulator and LO on-die. The two pathologies it trades for that economy — LO leakage and IQ imbalance — are exactly the defects [[concepts/evm-calibration]] exists to null out, and they are *correctable in the digital domain*, which is what makes the trade acceptable. This architecture is therefore the physical-layer enabler that lets the LEO/SATCOM RF front-end ([[synthesis/phased-array-rf-frontend-supply-chain]], [[concepts/leo-value-chain]]) scale to thousands of elements at consumer-terminal price points.

## Definition

The Zero-IF (direct conversion) architecture directly up-converts the baseband I/Q signal to the RF frequency without an intermediate IF stage. The local oscillator (LO) frequency equals the target RF frequency, so the baseband signal sits at DC (zero frequency).

## Comparison of Four Transmitter Architectures

| Architecture | DAC Sample Rate | Filter Requirements | Primary Issues |
|---|---|---|---|
| Real IF | Medium | Dual bandpass filtering | Image frequency difficult to separate (when IF is low) |
| Complex IF | Medium | Single bandpass filter | I/Q asymmetry → −30 dB image |
| **Zero-IF** | **Lowest** | **Low-pass only (after DAC)** | **LO leakage + IQ imbalance** |
| Direct RF | Highest | Low-pass | Requires ultra-high-speed DAC |

The appeal of Zero-IF lies in its lowest DAC sample rate requirement, which directly reduces power consumption and cost for GHz-range RF systems.

## Core Challenges

### 1. LO Leakage (LO Feedthrough / LO Leakage)
- Cause: LO signal coupling to the output (DC offset + circuit leakage)
- Impact: Carrier interference at the RF center frequency; severe cases result in IQ Offset reaching −10 dB, overwhelming the modulated signal
- Correction: DAC DC bias code scan → see [[concepts/evm-calibration]]

### 2. IQ Imbalance
- Cause: Gain difference $g$ + modulator phase error $\phi$ between I/Q dual-path DACs (IF or LO path not perfectly 90°)
- Impact: Constellation point rotation/compression, increased EVM
- Correction: Pre-distortion matrix compensation → see [[concepts/evm-calibration]]

### 3. Low-Frequency Attenuation Issue
- Cause: DC-blocking capacitor + transformer after DAC exhibits increasing impedance at low frequencies, causing energy loss in low-symbol-rate signals
- Impact: EVM at low symbol rates (e.g., 12.5 Msps) significantly higher than at high symbol rates
- Correction strategies:
  - Increase DC block capacitor (0.1 μF → 1 μF)
  - Replace with transformer having better low-frequency response (1:1, down to 0.15 MHz)
  - Baseband frequency shift (similar to Complex IF): shift signal away from DC to avoid poor low-frequency response region

## DAC Quantization Noise and SEM

In a Zero-IF system where FPGA directly outputs digital baseband, DAC bit count determines the quantization noise floor and affects compliance with the Spectrum Emission Mask (SEM):

$$\text{SQNR} = 1.76 + 6.02N + 20\log(\text{FSR}) + 10\log(F_{os}/F_s) \quad \text{(dB)}$$

- $N$: DAC bits; $\text{FSR}$: operating full-scale ratio; $F_{os}/F_s$: oversampling ratio
- For a 6-bit DAC at 12.5 Msps QPSK (64× oversampling): SQNR ≈ 56 dB (calculation/measurement agreement)
- Delta-sigma noise shaping can improve in-band SQNR, but 6/7-bit is still insufficient; 10-bit is required for stable SEM compliance

## Typical Applications

- LEO satellite X-band downlink transmitter ([[sources/hsieh-xband-leo-transmitter-2020]])
- High-data-rate inter-satellite links (requiring 800 Mbps+ throughput)

## Historical lineage and forward trajectory (1920s → ~2100)

Architecture choice has swung between three poles — heterodyne, homodyne (zero-IF), and direct-RF — as the cheapest "good-enough" point moved with semiconductor capability.

| Era | Dominant TX topology | Driver |
|---|---|---|
| 1918–1980s | **Superheterodyne** (Armstrong, 1918) | Stable fixed-IF filtering; image rejection in discrete components; the homodyne/direct-conversion idea existed (Colebrook 1924) but DC offset + LO leakage made it impractical in discrete form |
| 1990s–2000s | **Zero-IF revival** | CMOS/SiGe integration put the quadrature modulator + LO on-die; pagers, then GSM/3G/4G handsets and SATCOM modems adopt it for the lowest BOM and power |
| ~2018→ | **Direct-RF sampling** begins to displace zero-IF in high-value nodes | RF-sampling data converters (e.g. AMD/Xilinx Zynq UltraScale+ RFSoC integrating 8–16 DACs at 14-bit / 6–10 GSPS) digitize at RF, eliminating the analog mixer/LO — and with it LO leakage and IQ imbalance — at the cost of much higher converter rate and power |
| **~2100 (scenario / projection, NOT fact)** | **Per-element direct-digital, then photonic/optically-clocked converters** | As converter power-per-GSPS falls, fully-digital beamforming per element becomes affordable across whole arrays; LO-leakage/IQ-imbalance calibration as a *discipline* fades where there is no analog mixer left to correct — calibration shifts to converter-linearity and clock-jitter management |

The structural read: **zero-IF is not "the future," it is the current cost optimum.** Where bandwidth, multi-band agility, or digital beamforming justify the power, RF-sampling already wins; where BOM and watts dominate (consumer terminals, dense LEO arrays), zero-IF persists. The long-horizon trajectory is *not* zero-IF forever — it is the slow migration of the analog/digital boundary toward the antenna.

## Zero-IF vs direct-RF sampling — the architecture inflection

| Axis | Zero-IF (direct conversion) | Direct-RF sampling |
|---|---|---|
| Mixer / LO | Required (quadrature modulator + LO) | **None** — converter runs at RF in higher Nyquist zones |
| LO leakage / IQ imbalance | Present; must be calibrated ([[concepts/evm-calibration]]) | **Structurally absent** (no analog quadrature path) |
| DAC sample rate | **Lowest** (baseband-rate) | Highest (multi-GSPS RF-rate) |
| Power / cost | **Lowest** per chain | Higher (converter + digital back-end power) |
| Multi-band / digital beamforming | Limited; retune LO | **Native** — multiple simultaneous beams anywhere in band |
| Where it wins | Consumer terminals, dense LEO element count | Defense AESA, wideband SATCOM, fully-digital arrays |

Reference: Analog Devices, *Radio Architecture Matters: A Review of RF Sampling vs. Zero-IF* ([analog.com](https://www.analog.com/en/resources/technical-articles/radio-architecture-matters.html)); AMD/Xilinx Zynq UltraScale+ RFSoC backgrounder (8–16 ADC at 12–14 bit / 2–5 GSPS, 8–16 DAC at 14 bit / 6–10 GSPS), accessed 2026-06-11.

## Six-region map — who supplies the transceiver / data-converter layer

This is the integrated-circuit tier *below* the beamformer-IC/PA front-end mapped in [[synthesis/phased-array-rf-frontend-supply-chain]]: the quadrature transceivers and RF-sampling data converters that the zero-IF (or direct-RF) chain is built around.

| Region | Position | Representative suppliers |
|---|---|---|
| **US** | **Leads** — both zero-IF transceivers and RF-sampling converters | Analog Devices (transceivers + RF-sampling ADC/DAC), AMD/Xilinx (RFSoC), Texas Instruments, Qorvo/Skyworks (front-end), Broadcom |
| **Japan** | Strong component/converter + module supply | Renesas (RF/data converters, ex-Intersil/IDT), Murata (modules), Sony (CMOS converters) |
| **Europe** | Mixed-signal + automotive/industrial RF | NXP (Netherlands), STMicroelectronics, Infineon (front-end/GaN) |
| **Korea** | Captive RFIC for handset/5G; merchant transceivers thin | Samsung (in-house RFIC), reliance on US/Japan merchant parts |
| **China** | Fast-rising merchant RF, transceiver gap narrowing under sanction pressure | Maxscend (卓胜微), Vanchip; converter tier still trails ADI/TI |
| **Taiwan** | **Upstream-strong, space-grade transceiver-absent** | MediaTek/Richwave (handset/Wi-Fi transceivers), [[entities/win-semiconductors|Win Semiconductors]] foundry for the PA tier — but no sovereign space-grade RF-sampling converter; same midstream-C gap as [[synthesis/leo-taiwan-odc-gap]] |

Taiwan's position is consistent across every RF layer: world-class foundry and module capacity, no domestic space-grade transceiver/converter IP. The defect-correction expertise captured on this page and [[concepts/evm-calibration]] is exactly the system-integration know-how that the midstream gap leaves on the table.

## Related Links

- [[concepts/evm-calibration]] — practical LO leakage + IQ imbalance correction
- [[concepts/aesa]] — Zero-IF transmitters are typically embedded in AESA systems
- [[concepts/hybrid-phased-array]] — per-element replication that multiplies any architecture saving by N
- [[concepts/dpd-digital-predistortion]] — PA nonlinearity compensation (another key correction in Zero-IF systems)
- [[synthesis/phased-array-rf-frontend-supply-chain]] — six-region map of the front-end tier above the transceiver
- [[concepts/leo-value-chain]] — where the transmitter sits in the LEO upstream RF segment
- [[synthesis/leo-taiwan-odc-gap]] — the midstream-C gap this architecture know-how could help close
- [[sources/hsieh-xband-leo-transmitter-2020]] — actual Zero-IF X-band system measurement data
