---
type: entity
tags: [space-weather, noaa, government, federal-agency, swpc, ises, leo-operations]
---

# NOAA SWPC (Space Weather Prediction Center)

## Identity

The Space Weather Prediction Center is the United States' official source for civilian space weather alerts, watches, and warnings. It is co-located and jointly operated with the National Center for Atmospheric Research (NCAR) in **Boulder, Colorado**, and operates on a 24/7/365 basis.

## Federal Structure

```
NOAA (National Oceanic and Atmospheric Administration)
  └── NWS (National Weather Service)
        └── SWPC (Space Weather Prediction Center)
              ├── Boulder, CO — operational center
              └── pss.swpc.noaa.gov — product subscription portal
```

SWPC is a unit within the **National Weather Service (NWS)**, which itself reports to NOAA. NOAA is a line agency of the U.S. Department of Commerce.

Key customers: satellite operators, power utilities, airlines, GPS service providers, human spaceflight programs, and the U.S. Department of Defense.

## Mission

SWPC is mandated to:
- Monitor the Sun-Earth space environment in real time
- Issue alerts, watches, and warnings on the NOAA G/S/R 1–5 scales
- Deliver 3-day, 27-day, and 45-day geophysical forecasts
- Maintain the WSA-Enlil CME prediction model
- Archive space weather data as input to NOAA NCEI

## Military Counterpart — USAF 557th Weather Wing

The civilian/military division of space weather operations:

| Agency | Role |
|---|---|
| **NOAA SWPC** (Boulder, CO) | Civilian products, public alerts, international liaison, scientific modeling |
| **USAF 557th Weather Wing** (Offutt AFB, Bellevue, NE) | Mission-tailored space weather analyses for DoD; classified assets |

The 557th Weather Wing hosts the **Space Weather Flight, 2nd Weather Squadron, 2nd Weather Group**. Forecasters there consume NOAA satellite data (GOES, DSCOVR) and pass it to DoD services, making the Wing effectively a "satellite data broker for the Department of Defense" (Air & Space Forces Magazine). SWPC and the 557th WW maintain formal coordination to ensure product consistency between civilian and military operations.

## ISES — International Space Environment Service

SWPC is the **flagship Regional Warning Center (RWC)** of the **International Space Environment Services (ISES)**, an international consortium. ISES coordinates global space weather monitoring and data exchange among regional warning centers on every inhabited continent. SWPC's role: set global standards, lead product formats, and host the primary real-time feed infrastructure.

ISES member RWCs include centers operated by ESA, JAXA, IPS (Australia), and others. All share observation data that feeds SWPC's planetary indices (Kp is derived from 13 geomagnetic observatories spanning 44°–60° geomagnetic latitude globally).

## Six-Region Context — SWPC Is One Node of a Pooled System

SWPC is the world's *flagship* civilian center, but operational space-weather forecasting is the **most internationally pooled** of all the space domains (the inverse of the spectrum/SSA enclosure dynamics) — because the driver is a single shared Sun and no nation can see the whole magnetosphere or the Sun's far side from its own territory. The full six-region map (台美日韓中國歐洲), the three governance models, and the 100-year view live in [[synthesis/space-weather-forecasting-six-region]]. In brief:

- **ICAO aviation layer:** the entire planet is served by **four** global advisory centers on a rotating two-week On-Duty-Center schedule — **NOAA** (US, solo), **PECASUS** (Finland-led European consortium), **ACFJ** (Australia-Canada-France-Japan), and **CRC** (China-Russia). SWPC is the US bloc.
- **Europe:** ESA Space-Weather Service Network / SWESNET (coordinated from the SSCC at the Space Pole, Brussels; 5 Expert Service Centres) + UK Met Office **MOSWOC** (24/7 since 2014) — the federated bet.
- **China:** NSSC (CAS) + CMA National Center for Space Weather; the **Meridian Project** Phase II (national acceptance Mar 2025) is the world's largest ground-based monitoring network.
- **Japan:** **NICT** — continuous forecasts since 1949; ISES RWC since 1996.
- **Korea:** **KSWC** under the National Radio Research Agency (RRA), ISES RWC since end-2011.
- **Taiwan:** Central Weather Administration **Space-Weather Operation Office (SWOO)** + **FORMOSAT-7/COSMIC-2** GNSS radio-occultation — world-class ionospheric *sensing* that feeds both CWB/SWOO and NOAA SWPC, but no sovereign global-forecast authority (the recurring upstream-strong/midstream-absent Taiwan pattern; see [[synthesis/leo-taiwan-odc-gap]]).

## Data Infrastructure

SWPC's primary observational inputs:
- **DSCOVR** (Deep Space Climate Observatory) — L1 halo orbit; primary solar wind monitor since 2016-07-27; provides Bz, Bt, speed, density at 1-second resolution
- **ACE** (Advanced Composition Explorer) — L1; DSCOVR backup; also feeds ACE text products (`ace-magnetometer.txt`, `ace-swepam.txt`)
- **GOES-16/GOES-18** — Geostationary; X-ray flux (XRS), proton/electron flux (SEISS), magnetometers, solar imagery (SUVI, EXIS)
- **Ground magnetometer network** — 13 stations (44°–60° geomagnetic latitude) for Kp calculation

## Product Delivery

Three delivery channels:
1. **services.swpc.noaa.gov** — No-credential REST feeds (JSON and text); primary programmatic access
2. **pss.swpc.noaa.gov** — Product Subscription Service; email alerts within minutes of issue
3. **ftp.swpc.noaa.gov/pub/warehouse/** — FTP archive

See [[sources/noaa-swpc-product-catalog]] for the full JSON URL table.

## Operational History Notes

- **2018-12-03** — JSON data format announced as new delivery channel (previously FTP/text only)
- **2016-07-27** — DSCOVR became primary RTSW spacecraft (replaced ACE as primary)
- **2024-05-10** — May 2024 G5 superstorm (Gannon storm); Dst nadir −461 nT; largest storm in 20 years; 3–5× drag increase on LEO satellites; ~half of active LEO satellites fired thrusters simultaneously; 12 Starlink satellites lost to orbital decay pre-conditioning
- **2023-04-04** — WSA-Enlil V3.0 deployed; introduced run-on-demand CME model (retired fixed bi-hourly schedule)

## Related Wiki Pages

- [[sources/noaa-swpc-product-catalog]] — full JSON feed catalog with URLs and cadences
- [[concepts/swpc-space-weather-feeds]] — operational feed guide for agent integration
- [[concepts/space-weather-operational-indices]] — Kp/ap/Ap/Dst/F10.7 definitions and thresholds
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 physics and damage context
- [[concepts/orbital-data-center]] — affected LEO assets
- [[synthesis/space-weather-forecasting-six-region]] — six-region map of national forecast centers; SWPC as the flagship node of a pooled global system
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — SWPC as environment signal in Truth Dataset
