---
type: concept
tags: [space-weather, swpc, noaa, kp-index, f10-7, dst, ap-index, leo-operations, satellite-ops, drag, seu, radiation]
---

# Space Weather Operational Indices

The indices below are the standard machine-readable signals that LEO satellite operators and agents consume from NOAA SWPC and partner agencies. Each entry covers: what it measures, how it is derived, the operational thresholds, and what satellite operational action it drives.

See [[concepts/swpc-space-weather-feeds]] for the JSON URLs that deliver these indices in real time. See [[entities/noaa-swpc]] for the agency that publishes them.

> **Why these "NOAA" indices are physically international.** Even the indices an operator pulls from a US feed are computed from a *globally pooled* sensor network — a concrete instance of the "you cannot nationalize the Sun" argument in [[synthesis/space-weather-forecasting-six-region]]. **Kp** is a weighted average of 13 geomagnetic observatories spanning 44°–60° latitude on multiple continents (the canonical product is curated by GFZ Potsdam, Germany). **Dst** is computed by the World Data Center in **Kyoto, Japan** from four equatorial stations (Honolulu / San Juan / Hermanus / Kakioka). **F10.7** is observed at **DRAO Penticton, Canada**. No single nation can produce these indices from its own territory — which is exactly why operational forecasting is the most internationally-pooled of the space domains in this corpus.

## Kp — Planetary K-index

**What it measures**: Disturbances in the horizontal component of Earth's magnetic field, as observed by a global network of 13 geomagnetic observatories between 44°–60° geomagnetic latitude. A dimensionless quasi-logarithmic integer from 0 (quiet) to 9 (extreme storm).

**Derivation**: Each station computes a local 3-hour K-index; the planetary Kp is a weighted average. Updated every 3 hours; a 1-minute estimated Kp is also published.

**NOAA G-Scale mapping**:

| Kp | G-Scale | Storm Category | Satellite Operations Impact |
|---|---|---|---|
| 0–4 | G0 | Quiet/Unsettled | Nominal; standard drag models valid |
| 5 | G1 | Minor | Weak power grid fluctuations; weak drag increase; aurora at 60° lat |
| 6 | G2 | Moderate | Satellite drag increases; surface charging begins; HF radio fades at high latitude; CDM Pc values still reliable |
| 7 | G3 | Strong | Surface charging on satellites; possible orientation control problems; CDM Pc values should be flagged as potentially stale; intermittent GPS errors |
| 8 | G4 | Severe | Satellite tracking problems; widespread GPS errors; significant surface charging; CDM re-issuance lag 6–24h |
| 9 | G5 | Extreme | Extensive surface charging; 3–5× drag at LEO; bulk maneuvering event (see May 2024); CDM conjunction assessment severely degraded; HF radio impossible 1–2 days |

**JSON feeds**:
- 3-hour: `https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json`
- 1-minute estimated: `https://services.swpc.noaa.gov/json/planetary_k_index_1m.json`
- 3-day forecast: `https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json`

**Operator rule of thumb**: When Kp ≥ 7, atmospheric drag models should be re-run with updated density inputs before computing manoeuvre burns. When Kp ≥ 8, pre-storm CDM Pc values are stale and should not be used for manoeuvre decision.

---

## ap and Ap — Linear Geomagnetic Activity Index

**What it measures**: The same geomagnetic storm content as Kp, but on a linear scale (compared to Kp's quasi-logarithmic). `ap` is the 3-hour equivalent and is computed from Kp by a lookup table (e.g., Kp=5 → ap=48, Kp=9 → ap=400). `Ap` is the daily average of all eight 3-hour ap values (range: 0–400 nT equivalent).

**Why operators prefer Ap over Kp**: Ap is arithmetic, making it directly usable in atmospheric drag models (NRLMSISE-00, JB2008). These density models take Ap as an input to compute thermospheric density and therefore drag force on LEO satellites.

**Operational thresholds**:
- Ap < 15: Quiet; nominal drag
- Ap 15–29: Active; slight drag increase
- Ap 30–49: Minor storm; noticeable drag, orbit lifetime shortening
- Ap 50–99: Moderate storm; drag models must be refreshed daily
- Ap ≥ 100: Severe/Extreme; real-time density updates required; CDM re-computation needed

**45-day forecast**: `https://services.swpc.noaa.gov/json/45-day-forecast.json` — daily Ap and F10.7 forecast; days 1–7 updated daily at 00:00 UTC, days 8–45 updated weekly (Sunday). Based on 27-day solar rotation persistence patterns.

---

## F10.7 — 10.7 cm Solar Radio Flux

**What it measures**: Solar microwave emission at 10.7 cm wavelength (2800 MHz), measured in **solar flux units (sfu)**, where 1 sfu = 10⁻²² W/m²/Hz. Observed at the Dominion Radio Astrophysical Observatory (DRAO) in Penticton, BC, Canada at 17:00 UTC daily.

**Derivation**: F10.7 is a proxy for solar EUV output (which cannot be directly measured from the ground), which drives thermospheric heating and expansion. High F10.7 → expanded upper atmosphere → higher drag at all LEO altitudes.

**Operational thresholds and drag impact**:

| F10.7 (sfu) | Solar Activity | Drag Impact (relative to quiet sun baseline) |
|---|---|---|
| 65–75 | Solar minimum | Baseline; lowest thermospheric density |
| 100–140 | Moderate activity | ~15–25% drag increase vs minimum |
| 150–200 | High activity | ~30–50% drag increase; orbit lifetime shortening |
| > 200 | Extreme (SC25 peaks) | > 50% drag increase; LEO RDM should be recalculated |

**SC25 context**: Solar Cycle 25 has consistently produced F10.7 values above 150 sfu during peak activity (2024–2026), meaning the drag baseline for current LEO constellation operators is significantly elevated compared to historical SC24 planning assumptions.

**JSON feeds**:
- Observed: `https://services.swpc.noaa.gov/json/f107_cm_flux.json`
- Predicted: `https://services.swpc.noaa.gov/json/predicted_f107cm_flux.json`
- 30-day: `https://services.swpc.noaa.gov/products/10cm-flux-30-day.json`

**Operator rule**: F10.7 is the primary long-period drag budget input. Use the 45-day forecast for launch window and station-keeping budget planning. Re-run orbit lifetime calculations whenever F10.7 changes > 20 sfu from the last computation.

---

## Dst — Disturbance Storm Time Index

**What it measures**: The average perturbation of the horizontal component of Earth's magnetic field at low-latitude ground stations, in nanoTesla (nT). Dst tracks the ring current injection during geomagnetic storms; a strongly negative Dst indicates a major storm.

**Derivation**: Computed from 4 equatorial magnetometer stations (Honolulu, San Juan, Hermanus, Kakioka) by the World Data Center in Kyoto, Japan. Published as hourly provisional values in near-real time.

**Operational thresholds**:

| Dst (nT) | Storm Classification | Satellite Impact |
|---|---|---|
| > −20 | Quiet | Nominal |
| −20 to −50 | Weak disturbance | Minor drag increase |
| −50 to −100 | Moderate storm | Significant drag; surface charging risk at GEO |
| −100 to −200 | Intense storm | LEO drag × 2–3; CDM Pc stale |
| −200 to −350 | Severe storm | Radiation belt injection; GPS errors; LEO drag × 3–5 |
| < −350 | Extreme | May 2024 G5 reached −461 nT; extreme drag, CDM useless |

**JSON feed**: `https://services.swpc.noaa.gov/json/geospace/geospace_dst_1_hour.json`

**Note**: Dst is published by Kyoto WDC with a ~1-hour latency for provisional values; final values take weeks. For real-time operational decisions, use Kp + solar wind Bz as faster proxies; use Dst for post-storm analysis and model validation.

---

## Bz — IMF Southward Component (Solar Wind)

**What it measures**: The z-component (northward/southward) of the Interplanetary Magnetic Field (IMF) in nanoTesla, measured at the L1 Lagrange point by DSCOVR (primary) or ACE (backup), approximately 1.5 million km sunward of Earth. Travel time from L1 to Earth's magnetosphere: 20–60 minutes depending on solar wind speed.

**Why it is the most critical leading indicator**: Storm onset requires sustained southward Bz (negative Bz) to allow reconnection between the IMF and Earth's dayside magnetosphere. A Kp=9 storm cannot develop without a sustained Bz < −15 nT.

**Operational thresholds**:

| Bz (nT) | Assessment | Action |
|---|---|---|
| > 0 (northward) | No storm coupling | No immediate threat |
| −5 to 0 | Weakly southward | Monitor |
| −10 to −5 | Moderately southward | Alert: storm onset possible in 30–60 min |
| −20 to −10 | Strongly southward | High probability of G2–G3 storm within 1 hour |
| < −20 | Extreme | G4–G5 storm highly likely; immediate drag pre-computation |

**JSON feed**: `https://services.swpc.noaa.gov/products/solar-wind/mag-5-minute.json` (also 1-second from `/json/dscovr/dscovr_mag_1s.json`)

**Operator rule**: Bz is the actionable 30–60 minute warning before Kp spike. An agent monitoring Bz < −10 nT can pre-stage CDM staleness flags and drag model refreshes before the ground magnetometer network even registers the storm.

---

## S-Scale — Solar Radiation Storm Index (≥10 MeV Proton Flux)

**What it measures**: Integral proton flux at ≥10 MeV, measured by GOES in proton flux units (pfu). Published on the NOAA S1–S5 scale.

| S-Scale | ≥10 MeV pfu | Satellite SEU/SEL Impact |
|---|---|---|
| S1 | 10 | Minor HF polar degradation; SEU rates elevated ~2× at polar LEO |
| S2 | 10² | Possible single-event upsets in satellites; radiation hazard for high-latitude aircraft crew |
| S3 | 10³ | Single-event upsets likely in satellites with COTS components; navigation errors probable; star trackers may glitch |
| S4 | 10⁴ | Memory errors probable; star tracker and GPS unreliable; EVA radiation hazard |
| S5 | 10⁵ | Satellites may be rendered useless; complete HF blackout; irreversible COTS component damage likely |

**JSON feed**: `https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json`

**Operator rule**: S2+ should trigger a hardware-safe mode check for any satellite carrying non-radiation-hardened COTS processing units (see [[concepts/cots-gpu-radiation-risk]]). S3+ should trigger a power-cycling of vulnerable subsystems before SEL occurs (see [[concepts/see-single-event-effects]]).

---

## R-Scale — Radio Blackout Index (X-ray Flux / Solar Flare)

**What it measures**: Solar X-ray flux class as measured by GOES, mapped to radio blackout severity.

| R-Scale | X-ray Class | HF/GPS Impact |
|---|---|---|
| R1 | M1 | Brief degradation of HF radio |
| R2 | M5 | Limited HF blackout, tens of minutes; navigation degraded |
| R3 | X1 | Wide-area HF blackout ~1 hour; GPS errors elevated |
| R4 | X10 | HF blackout, sunlit side, 1–2 hours; GPS positioning errors significant |
| R5 | X20 | Complete HF blackout for hours; extended GPS outage |

**JSON feed**: `https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json`

---

## Index Relationships and Agent Usage Summary

```
Operational timeline of a geomagnetic storm event:

T-48h to T-24h:  ENLIL CME model flags Earth-directed CME
                  → Pre-stage drag correction; alert operators

T-1h to T-30min: Bz drops < -10 nT (DSCOVR L1)
                  → Imminent storm warning; stage CDM staleness flags

T+0:              Kp spikes (3-hour index lags; 1-min estimate is faster)
                  → Flag CDM Pc values issued pre-storm as stale
                  → Re-run atmospheric density model with elevated F10.7 + Dst

T+3h to T+12h:   Dst reaches nadir; G-scale confirmed via noaa-scales.json
                  → Enforce manoeuvre deferral if Kp ≥ 7
                  → Monitor S-scale (proton flux) for SEU watch

T+12h to T+48h:  Recovery phase; Ap falling; drag models refreshed
                  → Request fresh CDMs from LeoLabs/18th SDS
                  → Update orbit lifetime predictions

Daily baseline:   F10.7 consumed once per day
45-day horizon:   45-day Ap/F10.7 forecast consumed weekly
```

## Related Pages

- [[concepts/swpc-space-weather-feeds]] — operational feed URLs and polling patterns
- [[sources/noaa-swpc-product-catalog]] — complete JSON URL table
- [[entities/noaa-swpc]] — agency structure
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 storm physics and radiation belt effects
- [[concepts/tid-total-ionizing-dose]] — proton-driven TID from S-scale events
- [[concepts/see-single-event-effects]] — SEU/SEL driven by S-scale proton flux
- [[concepts/orbital-data-center]] — ODC assets exposed to G/S/R scale events
- [[concepts/cdm-conjunction-data-message]] — CDM staleness during geomagnetic storms
- [[synthesis/space-weather-forecasting-six-region]] — the pooled multi-region system that computes and shares these indices
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — operational index fusion in Truth Dataset
