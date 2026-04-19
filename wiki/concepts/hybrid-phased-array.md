---
type: concept
tags: [rf, phased-array, aesa, x-band, leo, beamforming]
---

# Hybrid Phased Array

## Definition

A hybrid phased array is an AESA architecture that combines **Digital Beamforming** with **Analog Phase Shifters**.
Each sub-array shares a single DAC / up-converter, with analog phase shifters providing independent phase shifting for each antenna element.

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

- [[concepts/aesa]] — parent architecture concept
- [[concepts/dpd-digital-predistortion]] — PA nonlinearity compensation (required in hybrid architectures)
- [[concepts/tid-total-ionizing-dose]] — radiation reliability
- [[concepts/see-single-event-effects]] — single event effects
