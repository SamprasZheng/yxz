---
slug: PA
title: "Phased Arrays — From Mechanical Scanning to AESA"
authors: ["sampras"]
tags: [rf,phasedarray]
description: From WWII radar to PESA and AESA — the mathematical principles behind electronic beam steering, and how phased arrays power 5G mmWave and satellite links.
image: /img/og/PA.png
---

### Background

Wireless scanning technology began in the late 19th century with fixed narrow beams formed by high-gain antennas. During World War II, radar emerged and allowed those antennas to rotate mechanically, achieving 360° coverage through physical beam sweeping.

To eliminate mechanical rotation, extend equipment lifespan, and improve multi-target tracking, PESA (Passive Electronically Scanned Array) technology was introduced in the 1960s. From the 1980s onward, the maturation of high-frequency semiconductor technology drove the development of various AESA (Active Electronically Scanned Array) architectures.

Although each successive generation is more complex than the last, system performance — detection range, resolution, tracking capability, and reliability — has improved dramatically with each iteration.

### How It Works

A phased array controls the direction of an electromagnetic beam by adjusting the phase of individual antenna elements. Unlike traditional mechanically steered antennas, phased arrays use electronic control to change beam direction almost instantaneously, dramatically improving system agility and reliability.

The core idea: an array of antenna elements each receives an independent phase shift. By choosing those phases carefully, the radiated field adds constructively in one target direction (constructive interference) and cancels in all others (destructive interference). The phase shift required for a given steering angle is:

$$
\Delta\Theta = \frac{2\pi d \sin\theta}{\lambda}
$$

where:
- $d$ — inter-element spacing
- $\lambda$ — wavelength
- $\theta$ — desired beam angle

This phase-control mechanism lets the system steer the beam dynamically without any physical antenna movement.

## Applications

### Military and Radar

Phased array technology was first deployed in military radar — modern ship-board radar, airborne early warning systems (e.g., the E-2D Advanced Hawkeye), and the Patriot missile defense system. Key advantages:

- **Multi-target tracking** — monitors many targets simultaneously, essential for air defense and fire-control systems.
- **Rapid beam steering** — beam direction changes in microseconds, far faster than any mechanical mechanism.
- **Interference rejection** — beam shape can be adapted to null out jamming sources.

### 5G and Wireless Communications

In 5G mmWave bands, phased arrays enable beamforming that concentrates energy exactly where it is needed, boosting spectral efficiency:

- **Massive MIMO base stations** — 5G NR Massive MIMO uses large antenna arrays to serve multiple users simultaneously on the same spectrum.
- **Satellite communications** — LEO constellation terminals rely on phased arrays for precise beam tracking as satellites move rapidly across the sky, maintaining link margin without any moving parts.

### Automotive Radar and Sensing

- **mmWave radar** — phased arrays in ADAS radar systems (76–81 GHz) provide fine angular resolution for object detection and lane-change assist with no blind spots.
- **Medical ultrasound** — phased array transducers electronically steer the acoustic beam for high-resolution cross-sectional imaging without repositioning the probe.
