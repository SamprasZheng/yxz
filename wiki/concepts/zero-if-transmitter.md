---
type: concept
tags: [rf, transmitter, architecture, zero-if, phased-array, xband, leo]
---

# Zero-IF Transmitter Architecture (Direct Conversion)

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

## Related Links

- [[concepts/evm-calibration]] — practical LO leakage + IQ imbalance correction
- [[concepts/aesa]] — Zero-IF transmitters are typically embedded in AESA systems
- [[concepts/dpd-digital-predistortion]] — PA nonlinearity compensation (another key correction in Zero-IF systems)
- [[sources/hsieh-xband-leo-transmitter-2020]] — actual Zero-IF X-band system measurement data
