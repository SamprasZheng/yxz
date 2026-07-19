---
type: concept
tags: [rf, transmitter, evm, calibration, lo-leakage, iq-imbalance, measurement]
---

# EVM Calibration Techniques (Error Vector Magnitude Calibration)

## Why EVM is the gate (system layer)

EVM is the single number that decides whether a transmitter *ships*. It is the acceptance threshold in the cellular and satellite standards, so every calibration on this page exists to move a measured constellation under a **spec-defined ceiling** — not to chase arbitrary perfection. The ceiling tightens as the modulation order rises, because each higher-order QAM packs constellation points closer and tolerates less error vector before symbols cross decision boundaries. That is the direct link from "how clean is my LO leakage / IQ imbalance / DPD calibration" to "how many bits/symbol — and therefore how much throughput — this radio is licensed to carry." For the LEO/SATCOM downlink in [[concepts/zero-if-transmitter]], the same logic sets the achievable data rate of the [[concepts/leo-value-chain|inter-satellite and downlink]] budget.

### Standardized EVM ceilings (the targets calibration must beat)

Authoritative limits, **3GPP TS 38.104 (5G NR base station)** — identical to the long-standing TS 36.104 (LTE) values; verified 2026-06-11:

| Modulation | Required EVM ceiling | Notes |
|---|---|---|
| QPSK | **17.5%** | most robust; coarse calibration sufficient |
| 16-QAM | **12.5%** | |
| 64-QAM | **8%** | |
| 256-QAM | **3.5%** | LO leakage / IQ imbalance now first-order |
| 1024-QAM | ~2% (not yet a ratified 3GPP BS limit; ~2% used in practice/proposals) | calibration-limited regime |

A typical engineering target of **1.5–2% EVM** (this page) therefore corresponds to "clean enough for 256-QAM with margin." Satellite waveforms (DVB-S2X high-order APSK; e.g. 16APSK on [[sources/hsieh-xband-leo-transmitter-2020]]) follow the same risk curve — higher-order constellations demand tighter EVM, which is why the 8% measured 16APSK result on that source counts as a pass for its order but would fail a 256-QAM link.

**Layer-down — why the ceiling costs power:** meeting the 3.5% 256-QAM ceiling forces the [[concepts/dpd-digital-predistortion|PA]] to run roughly **8–10 dB below its P1dB compression point** (output back-off) so residual nonlinearity stays under the error budget — directly trading transmit efficiency for constellation cleanliness. [[concepts/dpd-digital-predistortion|DPD]] exists precisely to recover part of that back-off (run the PA hotter at the same EVM), which is why the DPD/DFE tier is inseparable from the EVM gate. This is the ship/no-ship framing made quantitative: EVM ceiling → required back-off → PA efficiency → node DC/thermal budget.

## Definition

EVM (Error Vector Magnitude) measures the vector distance between the actual received constellation point and its ideal position, expressed as a percentage or in dB. It is the most fundamental quantitative metric for wireless transmitter signal quality.

$$\text{EVM}(\%) = \frac{|\vec{e}|_{\text{rms}}}{|A_{\text{ref}}|} \times 100$$

Typical requirements: within 1.5%–2% (depending on modulation order).

## Measurement Tools

**VSA (Vector Signal Analyzer)**: Keysight 89600 VSA software + Infiniium oscilloscope.
Oscilloscope advantages: higher bandwidth (can observe 200 Msps signals); disadvantage: dynamic range limited by ADC quantization noise (≥40 dB SFDR, sufficient for 1.5–2% EVM).

### Six Key VSA Measurement Windows

| Window | Purpose |
|---|---|
| **Constellation** | First-look diagnosis: rotation = phase error; compression = gain compression; scatter = phase noise |
| **Error vector time** | Symbol rate error diagnosis: incorrect symbol rate shows "V"-shaped curve |
| **Spectrum** | Band power, frequency offset confirmation |
| **Error table** | Summary of EVM%, Freq Err, IQ Offset, Quad Err, Gain Imb values |
| **Error vector spectrum** | Frequency-specific issue localization: peak at specific frequency = interference or response degradation at that frequency |
| **Equalizer impulse response** | Multipath/channel response equalizer coefficients |

## Common Constellation Diagram Anomaly Diagnosis

| Symptom | Cause |
|---|---|
| Overall rotation | Phase error (Quadrature error) |
| Unequal I/Q axis compression | I/Q gain asymmetry |
| Peak clipping | Gain compression |
| Ring scatter (phase direction) | Excessive phase noise |
| Low-frequency EVM peak | DC block / transformer poor low-frequency response |

---

## Calibration 1: LO Leakage Calibration

### Problem
In Zero-IF architectures, the LO signal directly couples to the RF output (caused by DAC DC bias), creating interference at the RF carrier frequency.
- Uncalibrated: IQ Offset = −10 dB (severe interference)

### Calibration Principle
LO leakage is a unimodal function of I/Q DAC DC bias codes. Goal: find the minimum leakage point.

### Ternary Search Algorithm
For a unimodal function on interval $[l, r]$, take $m_1 = l + (r-l)/3$ and $m_2 = r - (r-l)/3$ each iteration:
- $f(m_1) > f(m_2)$: discard $[l, m_1]$
- $f(m_1) < f(m_2)$: discard $[m_2, r]$
- Repeat until $|m_1 - m_2| < \xi$

Advantage: significantly fewer iterations compared to full scan (eliminates 1/3 of the search space each iteration).

---

## Calibration 2: IQ Imbalance Calibration

### Problem
Gain difference $g$ and phase error $\phi$ between I/Q dual paths cause constellation point distortion.

### Mathematical Model
The RF output can be written as:

$$I(1+g)\cos(\omega_{LO}t + \phi) - Q\sin(\omega_{LO}t)$$

After expansion, the relationship between distorted I'/Q' and original I/Q:

$$\begin{bmatrix}I'\\Q'\end{bmatrix} = \underbrace{\begin{bmatrix}(1+g)\cos\phi & 0\\ (1+g)\sin\phi & 1\end{bmatrix}}_{A}\begin{bmatrix}I\\Q\end{bmatrix}$$

### Pre-distortion Compensation
Multiply by $A^{-1}$ at baseband:

$$B = A^{-1} = \begin{bmatrix}\alpha & 0\\ -\tan\phi & 1\end{bmatrix}$$

where $\alpha = \frac{1}{(1+g)\cos\phi} \approx 1$ (when gain error is small), $\beta = -\tan\phi$ (phase error compensation coefficient).

---

## Low Symbol Rate EVM Degradation

**Root cause**: DC-blocking capacitor + transformer impedance increases at low frequencies, filtering out low-frequency baseband components.

**Correction strategies (ranked by effectiveness)**:
1. Replace with large DC block (0.1 μF → 1 μF): improves by ~1–2%
2. Replace with low-frequency transformer (1:1, XFM1, operating frequency down to 0.15 MHz): improves 0.4–4.5% (depending on symbol rate)
3. **Baseband frequency shift**: shift signal up by 8 MHz with corresponding LO frequency adjustment, avoiding the poor low-frequency response region → EVM reduced to 2–3%

| Method | QPSK 12.5 Msps EVM |
|---|---|
| Original (XFM2, 2:1) | 12.58% |
| Larger capacitor | ~11% |
| XFM1 (1:1) | 8.08% |
| 8 MHz frequency shift | ~2–3% |

---

## High Symbol Rate EVM Inconsistency

**Root cause**: Bias wire too long → transmission line impedance effect → mixer input $Z_{in}$ decreases at high frequency → baseband signal loss.
**Correction**: 500 Ω bias resistor placed close to mixer + AC ground capacitor; or digital equalizer compensation.

---

## Six-region map — who supplies the EVM test infrastructure

EVM calibration is gated by the measurement instrument (VSA / signal analyzer / RF source). The merchant test-and-measurement tier is narrow and globally concentrated; a region without it cannot independently *qualify* a high-order-QAM transmitter, regardless of who fabs the chip.

| Region | Position | Representative T&M suppliers |
|---|---|---|
| **US** | **Co-leads** the high-end VSA/oscilloscope tier | Keysight (89600 VSA, Infiniium — the toolchain on this page), Tektronix |
| **Europe** | **Co-leads** — arguably the reference for 5G/6G modulation analysis | Rohde & Schwarz (Germany) |
| **Japan** | Strong, especially production/field and modulation analysis | Anritsu, Advantest (ATE) |
| **China** | Rising domestic T&M under sanction pressure; high-end VSA still imported | RIGOL, Ceyear (中电科思仪) |
| **Korea** | T&M largely imported; strength is in volume RF production lines | (no merchant high-end VSA vendor) |
| **Taiwan** | T&M **imported**; strength is the device/foundry under test, not the analyzer | (relies on Keysight/R&S/Anritsu) |

This mirrors the converter-layer gap in [[concepts/zero-if-transmitter]] and the front-end map in [[synthesis/phased-array-rf-frontend-supply-chain]]: Taiwan and Korea fab and assemble RF at world scale but depend on US/Europe/Japan for the instruments that *certify* it. Calibration know-how (this page) is portable IP; the instrument is the chokepoint.

**Market anchor (verified 2026-07-19):** the merchant vector-signal-analysis market is ≈**$422.9M (2025)**, ~7.1% CAGR to 2033, and **Keysight + Rohde & Schwarz + Anritsu together hold >50%** of it (Keysight ~27% / R&S ~19% of the adjacent VNA volume). This narrow three-vendor concentration is *why* the instrument, not the calibration algorithm, is the least-substitutable link — and it is sub-layer C of the [[synthesis/rf-transmitter-acceptance-layer-six-region]] map.

## Historical note

EVM superseded older scalar quality metrics (carrier-to-noise, adjacent-channel power alone) as digital QAM/PSK modulation made the *vector* error — not just power — the binding constraint. The vector-error framing scales cleanly from early QPSK links to today's 256/1024-QAM and DVB-S2X APSK, which is why the same six VSA windows and the same LO-leakage/IQ-imbalance/DPD correction triad remain the working toolkit decades on; what changes is only how tight the ceiling has become as constellation order climbed.

## Related Links

- [[concepts/hybrid-phased-array]] -> where calibration error propagates into array-level beam quality
- [[concepts/rf-soc-debug-taxonomy]] -> OTP/MCN discipline for calibration tables in NPI debug

- [[concepts/zero-if-transmitter]] — primary source architecture for EVM issues
- [[concepts/aesa]] — system-level impact of EVM in phased array systems
- [[concepts/dpd-digital-predistortion]] — another class of EVM degradation caused by PA nonlinearity
- [[synthesis/rf-transmitter-acceptance-layer-six-region]] — EVM is the acceptance gate; the T&M tier is sub-layer C of this map
- [[synthesis/phased-array-rf-frontend-supply-chain]] — six-region front-end supply map (instrument tier complements the chip tier)
- [[concepts/leo-value-chain]] — EVM ceiling sets the achievable LEO downlink/ISL data rate
- [[sources/hsieh-xband-leo-transmitter-2020]] — actual measurement data source (LO calibration: −10 dB → pass; 16APSK EVM: 8%)
