---
type: concept
tags: [space, radiation, leo, solar-cycle, van-allen, environment]
---

# Solar Cycle 25 and LEO Radiation Environment (Solar Cycle 25 × LEO)

Solar activity cycles directly affect LEO satellite radiation exposure. Solar Cycle 25 (SC25) has proven far stronger than predicted, creating a more severe radiation environment for on-orbit spacecraft, with peak conditions occurring in 2024–2026.

## SC25 Intensity Overview

| Parameter | Prediction (NOAA initial) | Actual Result |
|---|---|---|
| Maximum sunspot number | 95–130 | Exceeded upper bound in practice |
| Peak timing | ~early 2025 | Late 2024 – early 2026 |
| Intensity assessment | "Weak cycle" | Strongest in nearly 20 years |

**Conclusion**: SC25 is stronger than predicted, making 2024–2026 one of the worst radiation environment windows for LEO satellites.

## May 2024 Extreme Geomagnetic Storm Event (G5 Level)

**Date**: May 10, 2024 (strongest geomagnetic storm in nearly 20 years)

**New findings from NASA CIRBE satellite** (published February 2025, JGR: Space Physics):

The extreme geomagnetic storm created two new transient radiation belts **between** the permanent Van Allen radiation belts:

| New Radiation Belt | Composition | L-shell Location | Energy Range | Duration |
|---|---|---|---|---|
| New electron belt | High-energy electrons | L ≈ 2.5–3.5 | 1.3–5 MeV | >3 months |
| New proton belt | High-energy protons | L ≈ 2.0 | 6.8–20 MeV | At least until February 2025 (still present) |

> **Note**: In the past, transient radiation belts typically dissipated within 4 weeks; the stability of this proton belt is anomalous and represents the first observation of such intensity in 20 years. The proton flux in the 6.8–15 MeV energy range exceeded background levels by **more than an order of magnitude**.

**Space hardware impacts**:
- GEO transfer orbit satellites traversing the radiation belts experience significantly increased TID accumulation
- Solar cells degrade faster due to proton radiation damage (protons are the primary damage source for solar cells)
- High-inclination LEO satellites (polar, SSO) pass through the South Atlantic Anomaly (SAA) at unchanged frequency, but background proton flux is elevated

## Direct Observations of SC25 Impact on LEO Dose Rate

**CALET instrument (ISS) observations** recorded multiple Solar Energetic Particle (SEP) events during SC25:

| Event | Date | Peak Absorbed Dose Rate |
|---|---|---|
| Solar energetic particle event | 2023-07-18 | Recorded |
| Solar energetic particle event | 2024-02-10 | Recorded |
| G5 extreme geomagnetic storm | 2024-05-11 | Recorded |
| Solar energetic particle event | **2024-07-08** | **~2200 μGy/h** (peak) |

> 2200 μGy/h conversion: approximately 220 mrad(Si)/h, or about **5.3 krad(Si)/day** — if sustained for one day, this is equivalent to 5–25% of the total lifetime dose of a typical LEO mission.

## SC25 Implications for LEO Satellite Design

**1. RDM (Radiation Design Margin) should be conservatively estimated**

Satellites launched during the SC25 peak period (2024–2026) face higher TID doses than historical models predict; design RDM should be increased from 1.5 to ≥2.0.

**2. SEP event probability is elevated**

Strong solar activity cycles significantly increase the rate of SPE (Solar Particle Event) occurrences, with a multiplicative effect on SEL (Single Event Latchup) trigger probability — especially for non-radiation-hardened COTS components.

**3. Atmospheric drag acceleration (indirect effect)**

Strong solar activity heats the upper atmosphere, increasing atmospheric drag on VLEO/low LEO (<400 km) satellites and shortening orbital lifetime. In February 2022, 40 of 49 Starlink satellites deorbited for this reason (even a mild G1 geomagnetic storm caused a 50% increase in atmospheric density).

## Connections to Existing Concepts

- [[concepts/tid-total-ionizing-dose]] — SC25 peak drives mission lifetime TID doses beyond historical baselines; RDM must be recalculated
- [[concepts/see-single-event-effects]] — SPE events increase SEL/SEU rates, especially SEB threat to power MOSFETs
- [[concepts/rha-radiation-hardening]] — conservative mission planning should use higher RDM during SC25 peak
- [[concepts/orbital-data-center]] — COTS GPUs deployed to LEO during SC25 peak face elevated SEU/SEL risk
- [[sources/space-radiation-tid-see-2025]]

## Data Sources

- NASA CIRBE / CIRBE-REPTile-2 observations (2025-02, JGR: Space Physics, Li et al.)
- CALET ISS instrument observations (2026, GRL, Ficklin et al.)
- ScienceDirect: High-latitude LEO radiation environment monitoring 2023-07 to 2024-07
