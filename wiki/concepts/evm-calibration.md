---
type: concept
tags: [rf, transmitter, evm, calibration, lo-leakage, iq-imbalance, measurement]
---

# EVM Calibration Techniques (Error Vector Magnitude Calibration)

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

## Related Links

- [[concepts/zero-if-transmitter]] — primary source architecture for EVM issues
- [[concepts/aesa]] — system-level impact of EVM in phased array systems
- [[concepts/dpd-digital-predistortion]] — another class of EVM degradation caused by PA nonlinearity
- [[sources/hsieh-xband-leo-transmitter-2020]] — actual measurement data source (LO calibration: −10 dB → pass; 16APSK EVM: 8%)
