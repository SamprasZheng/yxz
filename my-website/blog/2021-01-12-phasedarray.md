---
slug: PA
title: "Phased Arrays: From WWII Radar to LEO Satellites"
authors: ["sampras"]
tags: [rf,phasedarray]
description: The evolution of phased array technology from WWII radar through PESA and AESA — math fundamentals, beam steering, hybrid architecture trade-offs, and space reliability testing practices.
image: /img/og/PA.png
---

### Background

The development of wireless scanning technology began in the late 19th century, with fixed narrow beams produced by high-gain antennas. During World War II, the invention of radar enabled high-gain antennas to rotate mechanically, scanning the beam to achieve full 360° coverage.

To eliminate mechanical rotation, extend equipment lifespan, and improve multi-target tracking capability, PESA (Passive Electronically Scanned Array) technology was introduced in the 1960s. Starting from the 1980s, as high-frequency semiconductor technology matured, various AESA (Active Electronically Scanned Array) implementations followed.

While each new generation of wireless scanning technology is more complex than the last, system performance — detection range, resolution, tracking capability, and reliability — has improved dramatically with each generation.

<!-- truncate -->

### How It Works
A phased array is a technology that controls the direction of electromagnetic waves by adjusting the phase of individual antenna elements. Unlike conventional mechanically steered antennas, a phased array steers the beam electronically, enabling rapid beam repositioning and improving system agility and reliability.

The core concept is to form an antenna array from multiple elements and individually adjust the phase of each element so that electromagnetic waves interfere constructively in a desired direction and destructively in all others — achieving electronic beam scanning. The mathematical model is:

$$
\Delta\Theta = \frac{2\pi d \sin\theta}{\lambda}
$$

Where:
- $d$ is the element spacing
- $\lambda$ is the wavelength
- $\theta$ is the beam pointing angle

This phase adjustment mechanism allows the system to dynamically steer the beam by changing the phase of each element, without physically moving any antenna structure.

## Applications

### Military and Radar
Phased array technology was first applied in military radar systems, such as modern shipborne radars, airborne early-warning radars (e.g., the E-2D), and the Patriot missile defense system. Key advantages include:
- **Strong multi-target tracking**: Can simultaneously monitor multiple targets, suited for air defense and guidance systems.
- **Rapid beam steering**: Can instantaneously redirect the scan, improving response time.
- **Jamming resistance**: Beam shape can be adapted to reduce the impact of adversarial interference.

### 5G and Wireless Communications
In 5G mmWave communications, phased array technology enables beamforming, improving data throughput. Application scenarios include:
- **Base station antennas**: Used in 5G Massive MIMO to extend signal coverage and increase data rates.
- **Satellite communications**: In LEO (Low Earth Orbit) satellite systems, phased arrays enable precise beam control, improving link stability and spectral efficiency.

### Autonomous Vehicles and Radar Sensing
- **mmWave Radar**: Phased arrays are used in sensing systems for autonomous vehicles, enabling 360° surround detection for enhanced safety.
- **Medical imaging**: Ultrasound phased arrays are used in medical imaging, such as high-resolution ultrasound scans, improving diagnostic accuracy.

---

## Hybrid Architecture: Design Trade-offs for LEO Satellite Scenarios

In LEO satellite downlink design, the central challenge for phased arrays is achieving sufficient EIRP and modulation performance within tight power and mass budgets.

### All-Digital vs. Hybrid Architecture

| Architecture | Power | Complexity | Flexibility |
|---|---|---|---|
| Passive phased array (PESA) | Low | Low | Low |
| Hybrid phased array | Medium | Medium | Medium-high |
| All-digital phased array | High | High | Maximum |

The hybrid architecture (digital phase shift + analog phase shifters) is a pragmatic compromise for space-constrained power budgets. Signal path:

```
DAC → Digital phase shift → PLL (LO) → Mixer (upconvert) → Two-stage PA → Analog phase shifter → PGA → Antenna
```

Publicly available validation results for X-band LEO transmitters have demonstrated that hybrid architectures can achieve:
- EIRP >63 dBm (broadside) for a 144-element array
- ±65° scan angle coverage
- 800 Mbps 16-APSK downlink rate (EVM < 7%)
- TX average power consumption &lt;90W

### PA Linearization (DPD)

High-PAPR signals from high-order modulations (16-APSK, 256 QAM-OFDM) excite PA nonlinearities, causing out-of-band spectral regrowth that interferes with adjacent channels. The solution is to add a Digital Predistortion (DPD) block at the PA input.

Comparison of three modeling approaches:

| Method | NMSE Performance | Memory Effects | Training Speed |
|---|---|---|---|
| Memoryless polynomial | Moderate | Cannot model | Fast |
| Memory polynomial | Better | Supported | Fast |
| Neural network (NN + LM backprop) | Best | Supported | Slow (~15 min) |

Training uses Indirect Learning: first train a post-distorter, then use it in reverse as the pre-distorter.
Measured results: NN DPD improves NMSE over the raw PA by approximately **26 dB**, and ACPR by **4 dB**.

---

## Space Reliability: The COTS Qualification Chain

The design philosophy for LEO satellite payloads is to start from COTS (Commercial Off-The-Shelf) components and upgrade them to mission grade through rigorous testing. The core challenges are radiation effects and thermal cycling.

### Radiation Testing (TID + SEE)

**TID (Total Ionizing Dose)**: Charged particles passing through the MOSFET gate oxide cause hole trapping and threshold voltage drift.
Common facilities: INER cobalt-60 laboratory (Taiwan). Key RF components such as Mixers and PLLs are tested to evaluate whether performance degradation stays within acceptable limits.

**SEE (Single Event Effects)**:
- Soft errors (SEU/SEFI): Non-destructive; recoverable by power cycling
- Hard errors (SEL/SEB/SEGR): Potentially permanently destructive

High-LET proton beam testing (e.g., Chang Gung Hospital Lab 5) can verify SEL/SEU tolerance; sufficient LET to penetrate the IC package must be confirmed.

### Thermal Testing (CTT / TCT / TST)

Three levels of temperature testing, ordered by increasing rate of temperature change: CTT (constant temperature) < TCT (thermal cycling) < TST (thermal shock)

Key finding: **Front-end module performance degrades sharply under TST (thermal shock) conditions**, confirming that the rate of temperature change — not absolute temperature — is the root cause. TCT results typically meet LEO mission requirements.

Temperature compensation approach: mount a temperature sensor on the front-end module, read it via I2C, and perform software gain optimization (Gain Optimization Architecture).

---

## Summary

The evolution of phased arrays from WWII radar to today's LEO satellite communications follows a clear trajectory: the SWAP problem has been addressed by semiconductor advances; full digitization has made beamforming more flexible; and hybrid architectures have found a practical balance point under power-constrained conditions.

Putting COTS components into space is not a matter of "grab and go" — it requires a complete engineering chain involving radiation qualification, thermal validation, and system-level redundancy design. The maturity of this pathway will determine where Taiwanese RF hardware vendors can carve out their position in the LEO satellite payload market.
