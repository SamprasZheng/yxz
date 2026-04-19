---
type: concept
tags: [rf, phased-array, radar, aesa, beamforming]
---

# AESA — Active Electronically Scanned Array

## Definition

AESA is a phased array radar/communications system in which each radiating element has its own independent T/R (transmit/receive) module.
Distinguished from PESA (Passive Electronically Scanned Array, which shares a single central transceiver) and mechanically scanned radar.

## Technology Evolution

| Generation | Technology | Era | Scanning Method |
|---|---|---|---|
| 1st | Fixed high-gain antenna | Late 19th century | None |
| 2nd | Mechanically scanned radar | WWII | Mechanical rotation, 360° |
| 3rd | PESA | 1960s | Electronic scanning, single central transceiver |
| 4th | AESA | 1980s+ | Electronic scanning, independent T/R module per element |
| Modern | All-digital AESA | 2010s+ | Digital beamforming, FPGA-controlled |

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

## Phase Control Mathematics

Phase difference between adjacent antenna elements:

$$\Delta\Theta = \frac{2\pi d \sin\theta}{\lambda}$$

where $d$ is the element spacing, $\lambda$ is the wavelength, and $\theta$ is the beam steering angle.

## Application Scenarios

- Military radar: shipborne, airborne early warning (E-2D), missile defense (PAC-3)
- Satellite communications: LEO downlink X-band transmission
- 5G mmWave: Massive MIMO beamforming
- Wind farm monitoring: small target (bird/drone) detection and tracking

## Related Links

- [[concepts/hybrid-phased-array]] — hybrid architecture details
- [[concepts/dpd-digital-predistortion]] — PA linearization (essential technology for AESA transmitters)
- [[concepts/tid-total-ionizing-dose]] — radiation reliability for space AESA
- [[concepts/see-single-event-effects]] — single event effects for space AESA
