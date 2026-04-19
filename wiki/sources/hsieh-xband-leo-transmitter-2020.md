---
type: source
title: "A High Data Rate X-Band Transmitter for Low-Earth Orbit Satellites"
author: Shu-Chao Hsieh (謝書超)
date: 2020-10-01
ingested: 2026-04-19
tags: [rf, phased-array, xband, leo, transmitter, evm, calibration, nctu]
---

# A High Data Rate X-Band Transmitter for Low-Earth Orbit Satellites

**Author**: Shu-Chao Hsieh (謝書超)
**Advisors**: Wang Yu-Ju, Chen Bo-Hong (Institute of Electronics, National Chiao Tung University)
**Published**: Master's thesis, NCTU, October 2020

Same research group (RFVLSI Lab) as [[sources/thesis-aesa-modules-zheng-2021]] — this thesis's X-band transmitter is the up-converter subsystem of the XT-144 array.

---

## System Specifications

| Parameter | Specification |
|---|---|
| Band | X-band (~8.2 GHz) |
| Modulation | QPSK + 16APSK |
| Maximum data rate | 800 Mbps |
| Power consumption | ≤ 90 W |
| Architecture | Zero-IF (direct conversion) |
| Front-end output | 9-way distribution (for 9 front-end boards) |
| Redundancy | Switch to redundant system on main system failure |

---

## Architecture Comparison and Selection

Zero-IF selected after comparing four transmitter architectures. See [[concepts/zero-if-transmitter]].

| Architecture | Advantages | Disadvantages |
|---|---|---|
| Real IF | Mature; image rejection straightforward | Requires band-pass filter; image hard to separate at low IF |
| Complex IF | Improves image rejection ~−30 dB | I/Q asymmetry still present |
| Zero-IF | Lowest DAC sampling rate; fewer filter requirements | LO leakage + IQ imbalance (requires calibration) |
| Direct RF | Perfect digital domain IQ symmetry | Requires ultra-high-speed DAC |

---

## Hardware Components

Four-board architecture:
1. **FPGA board**: Generates baseband I/Q signals (modulation, SRRC filtering, noise shaping)
2. **Up-converter board**: Baseband → X-band RF, LO calibration circuit, 1 → 9 power splitting
3. **Front-end boards** (×9): Power amplification + phase control
4. **Motherboard**: Power distribution + FPGA control signal routing + redundancy switching

---

## EVM Calibration Procedure

See [[concepts/evm-calibration]] for the complete method:

### LO Leakage Calibration
- Problem: IQ offset before correction = −10 dB, severely contaminating the transmission band
- Method: Sweep DAC DC offset codes (IQ bias sweep), search for minimum LO leakage point
- Acceleration: **Ternary search algorithm** — for unimodal functions, eliminates 1/3 of search space per iteration, greatly reducing scan time

### IQ Imbalance Calibration
- Problem: I/Q gain difference $g$ + phase error $\phi$ causes constellation point distortion
- Method: Pre-distortion matrix calibration, coefficients $\alpha = \frac{1}{(1+g)\cos\phi}$, $\beta = -\tan\phi$
- Result: 16APSK constellation points visibly improved

---

## Low Symbol Rate Issue

- Symptom: QPSK at 12.5 Msps EVM rises to ~12%; error vector spectrum peaks at low-frequency end
- Root cause: DC block capacitor (0.1 μF) + transformer impedance ratio (2:1) causing low-frequency attenuation
- Fixes:
  1. Replace capacitor with larger value (0.1 μF → 1 μF), improves 1–2%
  2. Replace transformer with 1:1 (XFM1), operation down to 0.15 MHz, EVM improves 0.4–4.5%
  3. Baseband frequency shift technique: shift signal up 8 MHz (similar to Complex IF), avoiding poor low-frequency response region

---

## High Symbol Rate Issue

- Symptom: EVM variation among three mixer outputs highly disparate (3.41%–7.38%)
- Root cause: Bias copper trace too long → transmission line effect → $Z_{in}$ reduced at specific frequencies → baseband signal degraded
- Fix: Place bias resistor (500 Ω) close to mixer + supplemental AC ground capacitors; or add equalizer

---

## Spectral Emission Mask (SEM)

- 16APSK / QPSK at 200–100 Msps: pass SEM
- QPSK below 50 Msps: low-frequency noise exceeds mask limit
- Root cause: DAC quantization noise (6-bit) with insufficient SQNR at low oversampling ratio

$$\text{SQNR} = 1.76 + 6.02N + 20\log(\text{FSR}) + 10\log(F_{os}/F_s) \quad \text{(dB)}$$

- Solution A: Delta-sigma noise shaping (6-bit still insufficient, 7-bit barely passes)
- Solution B: Increase DAC bits → 10-bit DAC confirmed to pass SEM

---

## Future Works: Build-in Self-Test (BIST)

BIST becomes especially important as phased array scale increases (calibration cost proportional to number of array elements).

**Principle**:
- Normal mode: TX/RX separated; SPST switch cuts feedback path to protect LNA
- Calibration mode A: TX(N) → RX(N), obtain phase constants $k_1, k_2$
- Calibration mode B: TX(N) → RX(N-1), obtain $k_3, k_4$
- Phase difference calculation: $\phi_{21} = 2 \times \tan^{-1}(C)$, where $C = \frac{k_4 - k_2}{k_3 + k_1}$
- Scalable to N elements, obtaining all adjacent element phase differences

---

## Cross-References

- [[concepts/zero-if-transmitter]] — Detailed analysis of the architecture selected in this thesis
- [[concepts/evm-calibration]] — LO leakage + IQ imbalance calibration methods
- [[concepts/aesa]] — The AESA system in which this transmitter resides
- [[sources/thesis-aesa-modules-zheng-2021]] — Same RFVLSI Lab; XT-144 system overall (including this transmitter module)
- [[entities/tron-future-tech]] — XT-144 system vendor
- [[entities/nspo]] — LEO satellite application collaboration unit
