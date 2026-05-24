---
title: "Design Decisions for a LEO X-band Phased Array Transmitter"
description: "From architecture selection and signal chain design through EVM calibration, PA linearization, and radiation reliability — documenting the full design logic of a 144-element X-band AESA system from concept to measurement."
slug: leo-xband-phased-array-design
date: 2026-04-19
authors: [sampras]
tags: [rf, phased-array, leo, hardware]
image: /img/og/leo-phased-array.png
---

Designing a phased array transmitter for space is not just a matter of getting the RF circuitry right.

Architecture selection, signal chain calibration, PA linearization, thermal reliability, radiation hardening — every layer involves trade-offs, and every decision influences the next. This post is drawn from my work on the XT-144 system design and measurement during my time at the RFVLSI Lab at NCTU and at Tron Future Tech. The goal is to connect the logic behind each of those decisions.

<!-- truncate -->

## What Is XT-144

XT-144 is an X-band LEO satellite downlink transmitter system developed for the National Space Program Office (NSPO).

- **Array**: 144 TX elements (12×12) + 8 RX antennas
- **Band**: X-band (~8.2 GHz)
- **EIRP**: 64.30 dBm (broadside, single tone)
- **Scan angle**: ±65°, over 130°
- **Modulation**: 16-APSK 800 Mbps / QPSK 400 Mbps
- **Power consumption**: &lt;90 W (TX average)
- **Dimensions**: 41.7 × 43.2 × 27.7 cm

The design challenge of this system is that every specification constrains the others. Higher EIRP requires higher power; lower power requires architectural trade-offs; better EVM requires careful calibration; and getting it into space requires passing radiation hardening tests.

Below, in design order, is the reasoning behind each major decision.

---

## Decision 1: Hybrid Phased Array, Not All-Digital

The first question in phased array design: should every antenna element have its own dedicated DAC?

| Architecture | Per-element DAC | Power | Flexibility | Cost |
|---|---|---|---|---|
| Passive phased array (PESA) | None | Lowest | Low | Low |
| **Hybrid phased array** | **Shared per sub-array** | **Medium** | **Medium-high** | **Medium** |
| All-digital phased array | Yes | Highest | Maximum | High |

XT-144 chose the **hybrid architecture**: digital phase shift (DSP) handles coarse adjustment, analog phase shifters handle fine adjustment.

The signal path looks roughly like this:

```
DAC → Digital phase shift (DSP) → PLL (LO) → Mixer (upconvert) → Two-stage PA → Analog phase shifter → PGA → Antenna
```

The reasoning is straightforward: all-digital architecture consumes too much power. Giving 144 elements each their own ADC/DAC set is simply not practical in a space environment. The hybrid architecture trades some flexibility for manageable power consumption, reasonable system complexity, and longer operational life.

A satellite is an extremely cost-sensitive application — not just financially, but in terms of power and heat. Every watt has a price.

---

## Decision 2: Zero-IF Architecture for the Up-converter

The up-converter architecture choice determines the difficulty of every downstream problem. The four main architectures:

| Architecture | DAC Sample Rate | Filter Requirements | Main Issues |
|---|---|---|---|
| Real IF | Medium | Dual-path bandpass filtering | Image separation difficult when IF is not high enough |
| Complex IF | Medium | Single bandpass filter | I/Q asymmetry; image suppression limited to −30 dB |
| **Zero-IF (direct conversion)** | **Lowest** | **Lowpass only (after DAC)** | **LO leakage + IQ imbalance** |
| Direct RF | Highest | Lowpass | Requires ultra-high-speed DAC |

XT-144's up-converter chose **Zero-IF** (direct conversion).

There is only one attraction: **lowest DAC sample rate**. In a GHz RF system, reducing the DAC rate directly reduces power consumption and design complexity. The price is having to directly address LO leakage and IQ imbalance — the two classic pathologies of Zero-IF.

But both problems are correctable, while "the DAC must run at ultra-high speed" is a hardware constraint that is very hard to route around.

---

## Decision 3: EVM Calibration Requires Two Layers

Once the Zero-IF architecture is selected, the first measurement result is often disheartening — the constellation diagram is a mess.

The Keysight VSA89600 is the primary measurement tool for this system. It simultaneously displays six windows: constellation diagram, error vector time, spectrum, error table, error vector spectrum, and equalizer impulse response.

Diagnostic logic: look at the constellation diagram shape first, then examine the error vector spectrum for frequency-related issues.

### Layer 1: LO Leakage Calibration

Before calibration, the IQ Offset (VSA Error table column) is as high as **−10 dB** — the local oscillator leakage is nearly as strong as the signal, and the constellation diagram is completely overwhelmed by center-point interference.

The method is to sweep the DAC DC offset codes to find the point of minimum leakage. LO leakage as a function of offset code is a unimodal function, so **ternary search** is used instead of brute-force sweeping:

Split the search interval $[l, r]$ into thirds each time, take $m_1 = l + \frac{r-l}{3}$ and $m_2 = r - \frac{r-l}{3}$, compare $f(m_1)$ and $f(m_2)$, and discard 1/3 of the search space each iteration. This algorithm applies beyond LO leakage — any unimodal "find the optimum across a parameter combination" problem can use the same approach.

### Layer 2: IQ Imbalance Calibration

Once LO leakage is resolved, the constellation diagram is still distorted — a symptom of IQ gain mismatch $g$ and phase error $\phi$.

The distortion at the RF output can be described with a matrix:

$$\begin{bmatrix}I'\\Q'\end{bmatrix} = \begin{bmatrix}(1+g)\cos\phi & 0\\ (1+g)\sin\phi & 1\end{bmatrix}\begin{bmatrix}I\\Q\end{bmatrix}$$

The FPGA multiplies by the inverse matrix to compensate. When gain error is small, the correction simplifies to a single coefficient $\beta = -\tan\phi$.

After calibration, the measured system EVM: 16-APSK **6.898%**, QPSK **6.404%** — both within spec.

---

## Decision 4: PA Linearization via Neural Network DPD

There are 144 antenna elements, and each has a PA (power amplifier). PAs operate most efficiently near saturation, but that is also exactly where nonlinear behavior is most severe.

High-PAPR modulated signals (16-APSK, OFDM) fed into a PA produce:
- **Gain compression**: peaks get clipped, constellation points compress inward
- **Spectral regrowth**: energy leaks into adjacent bands

The solution is **DPD (Digital Predistortion)**: insert a predistorter before the PA so that the DPD + PA cascade is linear overall.

Comparison of three PA modeling methods:

| Method | Memory Effects | Performance | Training Speed |
|---|---|---|---|
| Memoryless polynomial | None | Moderate | Fastest (closed-form solution) |
| Memory polynomial | Yes | Good | Fast |
| **Neural network (NN)** | **Yes** | **Best** | **Slow (~15 minutes)** |

The NN DPD uses one hidden layer with 30 neurons, trained with Levenberg-Marquardt backpropagation, combined with **Indirect Learning** (first train a post-distorter, then use those coefficients as the pre-distorter).

Measured results:
- NMSE improvement over raw PA: **−26 dB**
- ACPR (out-of-band spectral regrowth) improvement: **−4 dB**

---

## Decision 5: Reliability Testing Must Be Scheduled from the Start

The final page of any LEO mission design document always has one sentence: "Must pass radiation hardening tests before being cleared for orbit."

XT-144 uses COTS (Commercial Off-The-Shelf) components rather than radiation-hardened space-grade parts. This was a cost decision, but the trade-off is having to build the test methodology yourself.

### TID (Total Ionizing Dose) Testing

Non-operational TID testing was performed at the INER (Institute of Nuclear Energy Research) cobalt-60 laboratory. Test subjects: Mixer and PLL.

Results: both ICs showed performance degradation after accumulated dose within acceptable limits, confirming neither would become a single-point failure in the system. Quantifying TID requires Faraday Cup beam current calibration, with SCPI-automated power supply + BenchVue controlling measurements, to avoid manual operation errors.

### SEE (Single Event Effects) Testing

SEE falls into two categories:
- **Soft errors** (recoverable): SEU (bit flips), SET (transient pulses), SEFI (functional interruptions)
- **Hard errors** (unrecoverable): SEL (latch-up), SEB (burnout), SEGR (gate rupture)

COTS components typically begin degrading noticeably above ~25 krad TID. A LEO mission accumulates roughly 1–5 krad per year (depending on altitude and shielding); a 5–10 year mission RDM (Radiation Design Margin) must be at least 1.5×.

### Thermal Testing

Three levels: Constant Temperature Test (CTT), Thermal Cycling Test (TCT), and Thermal Shock Test (TST).

XT-144's front-end module showed sharp performance degradation under **TST (thermal shock)** — the rate of temperature change, not absolute temperature, is the root cause. TCT results met NSPO mission requirements. The lesson: the orbital thermal environment cycles rapidly between sunlit and eclipse faces; designing for thermal shock cannot stop at TCT alone.

---

## Decision 6: BIST Must Be Planned from Day One

144 elements, each with a phase to calibrate. Without Build-in Self-Test (BIST), every calibration requires an external instrument to sweep through them one by one — that is completely impractical.

BIST principle: leverage the shared TX/RX architecture to establish a TX→RX feedback path in calibration mode.

Two feedback paths (Path A: TX(N)→RX(N), Path B: TX(N)→RX(N-1)) each yield phase constants $k_1, k_2, k_3, k_4$; the relative phase difference between adjacent elements is:

$$\phi_{21} = 2 \times \tan^{-1}\!\left(\frac{k_4 - k_2}{k_3 + k_1}\right)$$

This method scales incrementally to N elements, enabling automatic full-array phase calibration without any external measurement equipment.

Note: the feedback path power is much higher than the TX output. By design, insert an attenuator in the feedback path to protect the LNA, and confirm that the SPST switch properly isolates the feedback path during normal operation to prevent TX signals from damaging the receive chain.

---

## Key Takeaways

Looking back from architecture to measurement, the biggest lesson from this system is not any single technical detail — it is that **every decision must account for the next several steps**.

Choosing Zero-IF saved DAC sample rate but created LO leakage and IQ imbalance calibration work. Choosing hybrid architecture saved power but meant every PA needs DPD. Choosing COTS components saved cost, but the radiation testing workload is anything but small — in fact it is larger, because you have to build the test methodology from scratch.

The challenge of phased array system design is not that any single technology is too difficult. It is that every layer must be managed simultaneously, and the trade-offs between layers are not independent.

If you are designing a similar system, feel free to discuss in the comments — especially for LEO radiation testing and BIST architecture, where the boundary conditions vary considerably between systems and the details are often what matters most.
