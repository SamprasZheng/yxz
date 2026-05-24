---
type: source
title: "NOAA SWPC Product and Data Catalog"
author: "NOAA SWPC"
date: "2026-05-24"
ingested: "2026-05-24"
tags: [space-weather, swpc, noaa, data-feeds, api, leo-operations]
---

# NOAA SWPC Product and Data Catalog

The NOAA Space Weather Prediction Center (SWPC) publishes its full data catalog through a no-credential REST service at `services.swpc.noaa.gov`. The catalog was verified against live directory listings on 2026-05-24; all files listed had that modification date, confirming continuous live updates. JSON was formally announced as a delivery format on 2018-12-03.

## Root Service Endpoints

| Base URL | Format | Notes |
|---|---|---|
| `https://services.swpc.noaa.gov/json/` | JSON | Primary machine-readable feed |
| `https://services.swpc.noaa.gov/products/` | JSON / directories | Alert, K-index, solar-wind products |
| `https://services.swpc.noaa.gov/text/` | Plain text | Forecast bulletins, advisory text |
| `https://services.swpc.noaa.gov/images/` | Images | Plots, animations |
| `ftp://ftp.swpc.noaa.gov/pub/warehouse/` | FTP | Long-term archive |

Long-term archive is also accessible via NOAA NCEI at `ncei.noaa.gov/products/space-weather/partners/swpc-products-and-data`.

## JSON Product Catalog — Root (`/json/`)

All files below were modified on 2026-05-24 (live).

| File | URL | Measures | Notes |
|---|---|---|---|
| `planetary_k_index_1m.json` | `https://services.swpc.noaa.gov/json/planetary_k_index_1m.json` | Estimated planetary Kp, 1-minute cadence, last 6 hours | Chart updates every minute |
| `boulder_k_index_1m.json` | `https://services.swpc.noaa.gov/json/boulder_k_index_1m.json` | Boulder station K-index, 1-minute cadence | Local mid-latitude reference station |
| `f107_cm_flux.json` | `https://services.swpc.noaa.gov/json/f107_cm_flux.json` | Observed F10.7 cm solar radio flux (sfu) | Daily |
| `predicted_f107cm_flux.json` | `https://services.swpc.noaa.gov/json/predicted_f107cm_flux.json` | Predicted F10.7 (27-day outlook basis) | Updated daily |
| `45-day-forecast.json` | `https://services.swpc.noaa.gov/json/45-day-forecast.json` | Ap and F10.7 forecast, days 1–45; days 1–7 updated daily at 00:00 UTC, days 8–45 updated weekly (Sunday) | USAF product |
| `predicted_fredericksburg_a_index.json` | `https://services.swpc.noaa.gov/json/predicted_fredericksburg_a_index.json` | Predicted Fredericksburg A-index (mid-latitude equivalent of Ap) | Daily |
| `predicted_monthly_sunspot_number.json` | `https://services.swpc.noaa.gov/json/predicted_monthly_sunspot_number.json` | Monthly sunspot number prediction | Monthly |
| `solar_regions.json` | `https://services.swpc.noaa.gov/json/solar_regions.json` | Active solar region list and positions | Updated daily |
| `solar_probabilities.json` | `https://services.swpc.noaa.gov/json/solar_probabilities.json` | Flare and proton event probabilities per active region | Updated daily |
| `solar-radio-flux.json` | `https://services.swpc.noaa.gov/json/solar-radio-flux.json` | 10.7 cm flux observations | Daily |
| `sunspot_report.json` | `https://services.swpc.noaa.gov/json/sunspot_report.json` | Daily sunspot count | Daily |
| `enlil_time_series.json` | `https://services.swpc.noaa.gov/json/enlil_time_series.json` | WSA-ENLIL CME arrival model time-series at Earth L1 | Run-on-demand for CME events; once-daily ambient run at 00Z; 1–4 day forecast horizon |
| `electron_fluence_forecast.json` | `https://services.swpc.noaa.gov/json/electron_fluence_forecast.json` | Relativistic electron fluence forecast | Daily |
| `ovation_aurora_latest.json` | `https://services.swpc.noaa.gov/json/ovation_aurora_latest.json` | OVATION aurora global power forecast | ~5-minute cadence |
| `edited_events.json` | `https://services.swpc.noaa.gov/json/edited_events.json` | Edited solar event list (flares, proton events, CMEs) | Updated continuously |
| `icao-space-weather-advisories.json` | `https://services.swpc.noaa.gov/json/icao-space-weather-advisories.json` | ICAO space weather advisories for aviation | Issued when conditions warrant |

### JSON Subdirectories

**DSCOVR real-time solar wind:**
- `https://services.swpc.noaa.gov/json/dscovr/dscovr_mag_1s.json` — DSCOVR magnetometer at 1-second cadence (58 KB live file)

**GOES satellite data** (`/json/goes/primary/` and `/json/goes/secondary/`):
All files updated at 1-minute cadence. Available time windows: `6-hour`, `1-day`, `3-day`, `7-day`.

| Product family | Example URL |
|---|---|
| X-ray flux | `https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json` |
| Integral proton flux | `https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json` |
| Integral electron flux | `https://services.swpc.noaa.gov/json/goes/primary/integral-electrons-1-day.json` |
| Differential protons | `https://services.swpc.noaa.gov/json/goes/primary/differential-protons-1-day.json` |
| Magnetometers | `https://services.swpc.noaa.gov/json/goes/primary/magnetometers-1-day.json` |
| SUVI flares | `https://services.swpc.noaa.gov/json/goes/primary/suvi-flares-latest.json` |

**Solar wind (DSCOVR/ACE) — products directory** (`/products/solar-wind/`):
Available time windows: `5-minute`, `2-hour`, `6-hour`, `1-day`, `3-day`, `7-day`. Highest resolution: 1-second magnetometer, 20-second plasma.

| Product | Base URL pattern |
|---|---|
| Magnetometer | `https://services.swpc.noaa.gov/products/solar-wind/mag-5-minute.json` |
| Plasma (speed/density/temp) | `https://services.swpc.noaa.gov/products/solar-wind/plasma-5-minute.json` |

Since 2016-07-27 DSCOVR is the primary operational spacecraft; ACE is the backup.

**Geospace:**
- `https://services.swpc.noaa.gov/json/geospace/geospace_dst_1_hour.json` — Dst index, hourly
- `https://services.swpc.noaa.gov/json/geospace/geospace_dst_7_day.json` — Dst index, 7-day

## Products Directory — Key Endpoints (`/products/`)

| File | URL | Cadence |
|---|---|---|
| `noaa-planetary-k-index.json` | `https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json` | 3-hour intervals; last 30 days |
| `noaa-planetary-k-index-forecast.json` | `https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json` | Updated with 3-day forecast |
| `alerts.json` | `https://services.swpc.noaa.gov/products/alerts.json` | Continuous; new entry on each watch/warning/alert issue |
| `noaa-scales.json` | `https://services.swpc.noaa.gov/products/noaa-scales.json` | Continuous; current G/S/R scale levels |
| `10cm-flux-30-day.json` | `https://services.swpc.noaa.gov/products/10cm-flux-30-day.json` | Daily; last 30 days |
| `kyoto-dst.json` | `https://services.swpc.noaa.gov/products/kyoto-dst.json` | Hourly; Dst from World Data Center Kyoto |

## Text Products (`/text/`)

Key operator-relevant text feeds:

| File | URL | Cadence |
|---|---|---|
| 3-day forecast | `https://services.swpc.noaa.gov/text/3-day-forecast.txt` | Daily |
| 27-day outlook | `https://services.swpc.noaa.gov/text/27-day-outlook.txt` | Weekly |
| 45-day forecast | `https://services.swpc.noaa.gov/text/45-day-forecast.txt` | Daily/Weekly (see above) |
| Geomagnetic forecast | `https://services.swpc.noaa.gov/text/3-day-geomag-forecast.txt` | Daily |
| Current SW indices | `https://services.swpc.noaa.gov/text/current-space-weather-indices.txt` | Continuous |
| Discussion | `https://services.swpc.noaa.gov/text/discussion.txt` | Daily (forecaster narrative) |
| WWV geophysical alert | `https://services.swpc.noaa.gov/text/wwv.txt` | Every 3 hours (18 UTC daily broadcast) |
| ACE magnetometer | `https://services.swpc.noaa.gov/text/ace-magnetometer.txt` | 5-minute |
| ACE solar wind plasma | `https://services.swpc.noaa.gov/text/ace-swepam.txt` | 5-minute |

## Alert Subscription System

Email subscriptions via `https://pss.swpc.noaa.gov/ProductSubscriptionService/`. Deliverable products include: X-ray flux alerts, geomagnetic storm watches/warnings/alerts, solar radiation storm warnings, proton flux alerts, electron flux alerts, 3-day forecasts, forecast discussions. Email is the only push delivery mechanism; machine-readable polling is via `alerts.json` and `noaa-scales.json`.

## ENLIL / CME Forecast Model Files

WSA-Enlil V3.0 model output files (48-hour forecast window, hourly resolution): `https://nomads.ncep.noaa.gov/pub/data/nccf/com/wsa_enlil/prod/`

The model runs once daily (00Z ambient run) and additionally on-demand when CMEs are detected. It provides 1–4 day advance warning of CME arrival time, intensity, and duration at Earth.

## Related Wiki Pages

- [[entities/noaa-swpc]] — agency entity and federal structure
- [[concepts/swpc-space-weather-feeds]] — operational feed summary and agent usage guide
- [[concepts/space-weather-operational-indices]] — Kp/ap/Ap/F10.7/Dst index definitions and thresholds
- [[concepts/solar-cycle-25-leo-radiation]] — physics/damage context for the storm events
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — usage of SWPC as environment signal in Phase 4 fusion
