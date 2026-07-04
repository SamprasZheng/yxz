---
type: concept
tags: [space-weather, swpc, noaa, data-feeds, api, leo-operations, satellite-ops, kp-index, solar-wind, cdm, drag]
---

# SWPC Space Weather Feeds — Operational Guide for LEO Agents

NOAA SWPC publishes a no-credential, continuously updated REST data service at `services.swpc.noaa.gov`. All feeds listed below are public, require no API key, and can be polled at the cadences shown. This page covers the feeds an LEO satellite operations agent actually consumes: what to call, how often, and what operational decision each feed informs.

See [[sources/noaa-swpc-product-catalog]] for the complete verified URL catalog. See [[entities/noaa-swpc]] for agency context. See [[concepts/space-weather-operational-indices]] for index definitions and thresholds.

> **Layer-up note.** This page documents the **US (NOAA) node** of what is actually a pooled, multi-region system. Operators outside North America can mirror this pattern against their own regional center — NICT (Japan), KSWC (Korea), ESA SWESNET / UK Met Office MOSWOC (Europe), CMA/NSSC (China), or CWA-SWOO (Taiwan) — most of which expose comparable feeds and all of which share observation data through ISES. The reason a single SWPC feed is *good enough* for a global LEO operator is precisely that the underlying sensor ring and L1/L5 vantage are internationally shared. The six-region structure, the four ICAO global advisory centers, and the 100-year view are in [[synthesis/space-weather-forecasting-six-region]].

## Core Feed Table — Operator Relevance

| Feed Name | JSON URL | Update Cadence | Measures | Operational Decision |
|---|---|---|---|---|
| **NOAA Scales (live)** | `https://services.swpc.noaa.gov/products/noaa-scales.json` | Continuous (real-time) | Current G/S/R storm level (0–5 each) | Trigger: G≥2 → flag elevated drag; G≥3 → expect CDM Pc stale; S≥2 → SEU watch; R≥2 → comms blackout risk |
| **Alerts feed** | `https://services.swpc.noaa.gov/products/alerts.json` | Continuous | Full text of every watch, warning, alert issued | Primary event-driven trigger for agent workflows |
| **Planetary Kp (3-hour)** | `https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json` | 3-hour intervals; last 30 days | Kp integer 0–9, planetary geomagnetic disturbance | Kp≥5 → G1 → elevated drag; Kp≥7 → G3 → surface charging; Kp≥9 → G5 → extreme drag, conjunctions unreliable |
| **Kp 1-minute (estimated)** | `https://services.swpc.noaa.gov/json/planetary_k_index_1m.json` | 1-minute | Estimated Kp, last 6 hours | Early warning; use for intra-3-hour storm onset detection |
| **Kp 3-day forecast** | `https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json` | Updated with daily forecast | Predicted Kp for next 72 hours | Manoeuvre planning: defer non-critical burns if Kp forecast ≥6 in window |
| **Solar wind magnetometer 5-min** | `https://services.swpc.noaa.gov/products/solar-wind/mag-5-minute.json` | 5-minute (1-second native) | Bx, By, Bz, Bt in nT (DSCOVR L1) | Bz < −10 nT southward → storm imminent in ~30–60 min (L1→Earth transit) |
| **Solar wind plasma 5-min** | `https://services.swpc.noaa.gov/products/solar-wind/plasma-5-minute.json` | 5-minute (20-second native) | Solar wind speed (km/s), density (p/cm³), temperature (K) | Speed > 600 km/s + high density → elevated storm impact; high density → enhanced ring current injection |
| **GOES X-ray flux (6-hour)** | `https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json` | 1-minute | Short/long channel X-ray flux in W/m² | Flare class: M1 → R1, X1 → R3, X10 → R4; polar HF blackout and GPS positioning degradation |
| **GOES integral proton flux (1-day)** | `https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json` | 1-minute | ≥10 MeV proton flux in pfu | S1: 10 pfu; S2: 100 pfu; S3: 1000 pfu → SEU/SEL elevated; S5 → satellite mission risk |
| **GOES integral electron flux (1-day)** | `https://services.swpc.noaa.gov/json/goes/primary/integral-electrons-1-day.json` | 1-minute | ≥2 MeV electrons (relativistic) | Deep dielectric charging risk; >1000 pfu for multiple days → internal satellite anomalies |
| **Dst index (hourly)** | `https://services.swpc.noaa.gov/json/geospace/geospace_dst_1_hour.json` | Hourly | Dst (nT) ring current proxy | Dst < −50 nT → moderate storm; < −100 nT → intense; < −350 nT → extreme (May 2024 G5 reached −461 nT) |
| **ENLIL time series** | `https://services.swpc.noaa.gov/json/enlil_time_series.json` | Run-on-demand (CME) + daily 00Z | Solar wind density/velocity + CME arrival prediction at L1 | 1–4 day CME arrival warning; start drag pre-computation when CME flagged as Earth-directed |
| **45-day Ap/F10.7 forecast** | `https://services.swpc.noaa.gov/json/45-day-forecast.json` | Daily (days 1–7); weekly Sunday (days 8–45) | Predicted Ap and F10.7 | Mission planning: high F10.7 → elevated atmospheric drag baseline (orbit decay rate input) |
| **Observed F10.7** | `https://services.swpc.noaa.gov/json/f107_cm_flux.json` | Daily | F10.7 cm solar radio flux in sfu | Input to atmospheric drag models (NRLMSISE-00, JB2008); F10.7 > 200 sfu → ~30% orbit lifetime reduction |
| **OVATION aurora** | `https://services.swpc.noaa.gov/json/ovation_aurora_latest.json` | ~5-minute | Global auroral power and precipitation map | Ground-track passes through high-latitude aurora → elevated SEU rate; ground station HF comms affected |
| **DSCOVR mag 1-second** | `https://services.swpc.noaa.gov/json/dscovr/dscovr_mag_1s.json` | 1-second | DSCOVR magnetometer in nT (raw 1-second cadence) | Highest cadence Bz feed; use when tracking fast-moving CME arrival |
| **Solar ENLIL model files** | `https://nomads.ncep.noaa.gov/pub/data/nccf/com/wsa_enlil/prod/` | Run-on-demand + 00Z daily | Full WSA-Enlil gridded output, 48-hour window | CME trajectory and arrival time for conjunction de-risking window |

## Alert Types and Machine-Readable Keys

The `alerts.json` feed contains structured records with message types. Key types an operator agent should filter:

| Alert Type | G/S/R Scale | Operational Trigger |
|---|---|---|
| `GEOMAG_STORM_WATCH` | G1–G5 | Predicted; 1–3 day lead time |
| `GEOMAG_STORM_WARNING` | G1–G5 | High confidence; upstream solar wind observed |
| `GEOMAG_STORM_ALERT` | G1–G5 | In progress; magnetometers confirm |
| `PROTON_EVENT_WARNING` | S1–S5 | ≥10 MeV proton flux rising |
| `PROTON_EVENT_ALERT` | S1–S5 | Threshold crossed at GOES |
| `XRAY_FLUX_ALERT` | R1–R5 | Solar flare intensity; M1→R1, X20→R5 |
| `ELECTRON_FLUX_ALERT` | — | Relativistic electron threshold |

## Operational Decision Logic — Agent Integration Pattern

The recommended polling architecture for the Spacesharks Mission Desk agent (see [[synthesis/spacesharks-mission-desk-hackathon-plan]]):

```
Poll cycle: every 5 minutes
  1. GET noaa-scales.json → current_G, current_S, current_R
  2. GET plasma-5-minute.json → solar_wind_speed, bz
  3. If current_G >= 2 OR bz < -10 nT:
       GET alerts.json → parse storm watch/warning
       GET integral-protons-1-day.json → S-scale proton level
       FLAG: CDM Pc values potentially stale (CDM re-issuance lag ~6–24h during storm)
       FLAG: Defer non-critical manoeuvres until Kp forecast < 5
  4. Every hour:
       GET geospace_dst_1_hour.json → Dst trend
       GET planetary_k_index_1m.json → real-time storm progress
  5. Every day:
       GET f107_cm_flux.json → update drag baseline
       GET 45-day-forecast.json → update medium-term planning
       GET enlil_time_series.json → check for flagged Earth-directed CMEs
```

## May 2024 G5 Storm — Documented Operational Impact

The May 2024 Gannon storm (Dst nadir: −461 nT; peak Kp: 9) demonstrated the cascade:

1. **Atmospheric density spike**: 11–19% density increase by altitude (300–400 km); satellites at 400 km saw ~19% increase
2. **Drag multiplication**: 3–5× above baseline drag experienced by LEO satellites after storm commencement at 2024-05-11 02:00 UTC
3. **Bulk maneuvering**: ~50% of all active LEO satellites fired station-keeping thrusters simultaneously (SpaceX Starlink initiated automated manoeuvres)
4. **CDM degradation**: Conjunction assessment infrastructure was severely challenged; combination of unpredictable drag + bulk maneuvering made it "very difficult or impossible" to identify potential conjunctions during and immediately after the storm
5. **Satellite loss**: 12 Starlink satellites were lost to orbital decay pre-conditioned by elevated drag beginning ~25 April 2024, with the G5 storm delivering the final perturbation
6. **Key lesson**: When Kp ≥ 7, CDM Pc (probability of collision) values issued before storm onset should be treated as stale; operators should request or wait for updated CDMs before making manoeuvre decisions

> **Declining-phase update (2026-07-04).** May 2024 remains the SC25 *extreme* (G5) reference, but the storm cascade above recurs at G4 on a regular cadence through the **declining phase**: G4 on 2025-06-01/02, G4 on 2025-11-12 (behind an **X5.1** flare — the strongest of 2025), and a G4 alert on 2026-01-20. The polling logic below (§ Operational Decision Logic) is therefore a *standing* requirement, not a solar-max-only posture. Full chain + physics in [[concepts/solar-cycle-25-leo-radiation]].
>
> **L1 source update.** The `mag-5-minute` / `plasma-5-minute` / DSCOVR feeds now carry data from **NOAA SOLAR-1 (SWFO-L1)**, which reached L1 on 2026-01-23 and entered operational service **2026-06-10**, replacing the aging DSCOVR/ACE as the primary real-time solar-wind monitor; its coronagraph also delivers CME imagery to SWPC within ~30 minutes of capture. Feed URLs are unchanged. See [[entities/noaa-swpc]].

## Feed Selection by Operational Priority

| Priority | Feed | Why |
|---|---|---|
| P1 (always-on) | `noaa-scales.json` | Zero latency G/S/R level; single call tells you storm state |
| P1 (always-on) | `plasma-5-minute.json` | Bz is the ~45-minute leading indicator of storm onset |
| P2 (storm watch) | `alerts.json` | Machine-parseable storm watches; gives 1–3 day advance warning |
| P2 (storm watch) | `integral-protons-1-day.json` | SEU/SEL risk gate; S2+ triggers hardware-safe mode policy |
| P3 (daily) | `f107_cm_flux.json` | Drag model input; determines orbit lifetime predictions |
| P3 (daily) | `45-day-forecast.json` | Mission planning horizon; launch windows, LTDN planning |
| P4 (CME events) | `enlil_time_series.json` | 1–4 day CME warning for pre-staging drag corrections |

## Related Pages

- [[sources/noaa-swpc-product-catalog]] — full verified URL catalog
- [[entities/noaa-swpc]] — agency structure, ISES, 557th WW
- [[concepts/space-weather-operational-indices]] — Kp/ap/Ap/Dst/F10.7 definitions
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 physics, G5 storm transient radiation belts
- [[concepts/orbital-data-center]] — assets exposed to space weather risk
- [[concepts/cdm-conjunction-data-message]] — CDM staleness during geomagnetic storms
- [[concepts/notam]] — companion operational feed for launch windows and range clearance
- [[synthesis/space-weather-forecasting-six-region]] — six-region map of the national centers behind this feed; the pooled system this US node belongs to
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Truth Dataset fusion plan: SWPC + CDM + telemetry + NOTAM
