---
type: concept
tags: [space, radiation, leo, solar-cycle, van-allen, environment]
---

# Solar Cycle 25 and LEO Radiation Environment (Solar Cycle 25 × LEO)

Solar activity cycles directly affect LEO satellite radiation exposure. Solar Cycle 25 (SC25) proved far stronger than predicted, creating a more severe radiation environment for on-orbit spacecraft. The **maximum-activity interval is now past** — a percentile-based classification of adjusted F10.7 flux places it at **Aug 2024 – Jan 2025** (>190 M-class + 19 X-class flares, multiple CMEs > 2000 km/s; [arXiv 2511.16788](https://arxiv.org/pdf/2511.16788)) — and as of mid-2026 the cycle is in its **declining phase**. Critically, the declining phase is *not* the low-risk part of the cycle: historically the **strongest** geomagnetic storms of a cycle often occur 1–3 years **after** solar maximum (e.g. the 2003 Halloween storms came ~3 yr after the SC23 max), and SC25's declining phase has already delivered a chain of G4 (Severe) storms through 2025–2026 (see "Declining Phase" below). The elevated-radiation LEO window therefore extends well beyond the 2024 max.

## SC25 Intensity Overview

| Parameter | Prediction (NOAA initial) | Actual Result |
|---|---|---|
| Maximum sunspot number | 95–130 | Exceeded upper bound in practice |
| Peak timing | ~early 2025 | Solar-max declared 2024-10-15; max-activity interval Aug 2024 – Jan 2025 |
| Intensity assessment | "Weak cycle" | Strongest in nearly 20 years |
| Yearly-mean sunspot number | 95–130 (max) | 2024 ≈ 150.6 → 2026 ≈ 85 *(projection, declining phase)* |

**Conclusion**: SC25 was stronger than predicted; the solar-max interval (Aug 2024 – Jan 2025) is now past, but the **declining phase (2025 →)** keeps 2025–2027 an elevated-radiation window for LEO because the cycle's severest storms cluster after max.

> **Update (verified 2026-06-08):** NASA, NOAA, and the Solar Cycle Prediction Panel jointly **declared the solar maximum period on 2024-10-15**, with a smoothed sunspot number ≈161 (the strongest in ~23 years); SC25 produced an **X9.0** flare on 2024-10-03. The *exact* peak month is only confirmable in retrospect after a sustained decline, but the maximum window is now official. ([NASA/NOAA joint announcement](https://science.nasa.gov/science-research/heliophysics/nasa-noaa-sun-reaches-maximum-phase-in-11-year-solar-cycle/))
>
> **Update (verified 2026-07-04):** SC25 is now unambiguously in its **declining phase** — 2025 was fully post-max and the fall continues through 2026 (yearly-mean SSN ≈ 150.6 in 2024 → a projected ≈ 85 in 2026). This does **not** lower extreme-event risk: the declining phase has produced a repeated G4 (Severe) storm cadence (2025-06, 2025-11, 2026-01 — see below). Long-lived coronal holes and post-max active regions make 2025–2027 a persistent high-drag / elevated-SEP window for LEO. ([Space.com: 2026 auroras](https://www.space.com/stargazing/auroras/will-2026-still-bring-strong-auroras-what-the-suns-recent-activity-tells-us); [STCE SC25 tracking](https://www.stce.be/content/sc25-tracking))

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

## Declining-Phase Severe Storms (2025–2026) — the risk did not end at max

Solar maximum is a *sunspot-number* peak, not a *hazard* peak. The largest geomagnetic storms of a cycle are historically drawn from the declining phase, when fast solar-wind streams from long-lived coronal holes combine with residual eruptive active regions. SC25's declining phase has borne this out with a repeated G4 (Severe) cadence — each one an operational drag/charging/CDM-degradation event for LEO, even though none reached the May-2024 G5 extreme:

| Date (UTC) | Peak | Driver | Notable impacts | Source |
|---|---|---|---|---|
| 2025-06-01 → 06-02 | **G4** | CME erupted 2025-05-30 | Aurora to mid-latitudes; G4 watch upgraded | NOAA SWPC |
| 2025-11-12 (0120 UTC) | **G4** | **X5.1** flare peaked 2025-11-11 1004 UTC (strongest flare of 2025); CMEs Nov 9–12 | Aurora as far south as Florida/Texas/Arizona/Mexico; HF radio blackouts across Africa & Europe (R3); ISS imagery of the storm | [Live Science](https://www.livescience.com/space/the-sun/strongest-solar-flare-of-2025-erupts-and-it-could-bring-auroras-to-half-the-us-on-wednesday); [NASA SVS](https://svs.gsfc.nasa.gov/31375/) |
| 2026-01-20 | **G4 (alert)** | CME impact | Severe-storm alert issued | NOAA SWPC |

**Operator takeaway:** treat the 2025–2027 declining phase as a *sustained* elevated-risk regime, not a wind-down. Each G4 above is a live instance of the operational cascade documented in [[concepts/swpc-space-weather-feeds]] (drag spike → bulk manoeuvring → CDM Pc staleness) — the same decision logic in [[concepts/space-weather-operational-indices]] applies, just at G4 rather than G5 severity. The persistence of ≥X-class flares (X5.1 in Nov 2025) 13 months after the declared max is the concrete evidence for keeping RDM elevated (§ below) through the full descent.

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

Satellites launched during the SC25 peak-and-descent window (2024 through the declining phase, ~2027) face higher TID doses than weak-cycle (SC24-era) models predict; design RDM should be increased from 1.5 to ≥2.0. The declining-phase G4 chain (2025–2026, above) confirms the elevated regime is not confined to the 2024 max month.

**2. SEP event probability is elevated**

Strong solar activity cycles significantly increase the rate of SPE (Solar Particle Event) occurrences, with a multiplicative effect on SEL (Single Event Latchup) trigger probability — especially for non-radiation-hardened COTS components.

**3. Atmospheric drag acceleration (indirect effect)**

Strong solar activity heats the upper atmosphere, increasing atmospheric drag on VLEO/low LEO (<400 km) satellites and shortening orbital lifetime. In February 2022, 40 of 49 Starlink satellites deorbited for this reason (even a mild G1 geomagnetic storm caused a 50% increase in atmospheric density).

## 拉長時間軸 — Solar Cycles and the 100-Year Hazard (labelled scenario, not fact)

SC25 is one realisation of a hazard on **fixed physical clocks**, which makes the long-horizon view unusually concrete:

- **~11-year Schwabe cycle** — the SC25 max (declared 2024-10-15) is followed by SC26, expected to rise toward a max around the mid-2030s; LEO operators face a *recurring* peak-radiation window roughly every decade, not a one-off.
- **~80–100-year Gleissberg envelope** — modulates how strong successive cycles are; multi-cycle planning cannot assume SC24-era (weak) baselines.
- **Carrington-class storms (1859)** — the canonical recurrence estimate is **~12% per decade** (Riley 2012), i.e. *near-certain within a 100-year mission-fleet horizon*; the planetary worst case against which grids, GNSS, and satellite fleets are stress-tested.
- **Miyake-class events** (cosmogenic-isotope superflares, e.g. 774 AD) — far rarer (millennial) but an order of magnitude beyond Carrington; the true civilisational tail risk.

**Implication for the corpus:** the radiation environment is a *permanent* design driver, not a transient SC25 anomaly — the same "physical invariant" logic as the σT⁴ heat-rejection ceiling ([[synthesis/orbital-data-center-six-region]]) and the GCR floor ([[synthesis/radiation-test-rad-hard-six-region]]). The forecasting side of this hazard (who watches the Sun, with what vantage) is mapped six-region in [[synthesis/space-weather-forecasting-six-region]]; the key permanent infrastructure is the shared **L1** solar-wind vantage — NOAA's **SWFO-L1 launched 2025-09-24, reached L1 2026-01-23, and entered operational service 2026-06-10 as SOLAR-1** (coronagraph CME imagery to SWPC within 30 min), replacing aging ACE/DSCOVR — and the coming **L5** side-view (ESA Vigil, launch 2031) — a cross-national architecture because no single nation sustains a 360° view of the Sun.

## Connections to Existing Concepts

- [[concepts/tid-total-ionizing-dose]] — SC25 peak drives mission lifetime TID doses beyond historical baselines; RDM must be recalculated
- [[concepts/see-single-event-effects]] — SPE events increase SEL/SEU rates, especially SEB threat to power MOSFETs
- [[concepts/rha-radiation-hardening]] — conservative mission planning should use higher RDM during SC25 peak
- [[concepts/orbital-data-center]] — COTS GPUs deployed to LEO during SC25 peak face elevated SEU/SEL risk
- [[sources/space-radiation-tid-see-2025]]

## Operational Feed Cross-Links

The physics documented above is monitored in real time via NOAA SWPC feeds. See:

- [[concepts/swpc-space-weather-feeds]] — JSON feed URLs and polling cadences for the indices below; includes the agent decision-logic pattern and the May 2024 documented CDM degradation
- [[concepts/space-weather-operational-indices]] — full definitions and operational thresholds for Kp, ap, Ap, Dst, F10.7, S-scale (proton), R-scale (X-ray); maps each index to a satellite operational decision
- [[entities/noaa-swpc]] — the agency publishing these feeds; ISES flagship center; relationship to USAF 557th Weather Wing
- [[synthesis/space-weather-forecasting-six-region]] — six-region map of the national forecast centers + L1/L5 vantage that monitor this hazard
- [[sources/noaa-swpc-product-catalog]] — verified JSON URL table including `planetary_k_index_1m.json`, `integral-protons-1-day.json`, `f107_cm_flux.json`, `enlil_time_series.json` and all GOES/DSCOVR feeds

Key connection: the transient radiation belts created by the May 2024 G5 storm are the same event documented in [[concepts/swpc-space-weather-feeds]] as the operational worst-case (Dst −461 nT; 3–5× drag; 12 Starlink satellites lost; CDM conjunction assessment degraded). The physics of the new proton belt (6.8–20 MeV, still present February 2025) is the damage-side story; the feeds page captures the real-time monitoring and response side.

## Data Sources

- NASA CIRBE / CIRBE-REPTile-2 observations (2025-02, JGR: Space Physics, Li et al.)
- CALET ISS instrument observations (2026, GRL, Ficklin et al.)
- ScienceDirect: High-latitude LEO radiation environment monitoring 2023-07 to 2024-07
- SC25 declining-phase / max-interval characterization (arXiv 2511.16788, 2025-11; percentile F10.7 classification of the maximum phase)
- NOAA/NASA solar-max declaration (2024-10-15) and SC25 progression tracking (NOAA SWPC Solar Cycle Progression; STCE SC25 tracking)
- 2025–2026 declining-phase G4 storm chain (NOAA SWPC alerts; Live Science / NASA SVS for the 2025-11 X5.1/G4 event)
