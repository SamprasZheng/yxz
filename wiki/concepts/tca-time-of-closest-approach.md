---
type: concept
tags: [conjunction, cdm, pc, ssa, space-debris, mission-desk, firefly, astrodynamics]
---

# TCA — Time of Closest Approach

The Time of Closest Approach (TCA) is the epoch at which the predicted miss distance between two resident space objects reaches its minimum value along their forecast trajectories. It is the temporal anchor of every [[concepts/pc-probability-of-collision|Pc]] computation and the first field an operator reads on a CDM.

## Role in the CDM

TCA is the single mandatory epoch in a CCSDS 508.0-B-1 [[sources/ccsds-508-cdm-2013|Conjunction Data Message]]. All state vectors, covariance matrices, miss distance, and relative velocity reported in the CDM are evaluated at TCA.

In Space-Track `cdm_public`, the field is `TCA` (UTC ISO-8601 string). In CCSDS KVN format: `TCA = 2010-03-13T22:37:52.618`.

## Prediction Horizon and Reliability

18 SDS / Space-Track generates CDMs up to 7 days (168 h) in advance for near-Earth objects. The standard screening window is:

- **Propagation span**: current epoch + 7 days
- **Screening volume** (LEO, near-circular): 2 km radial × 25 km in-track × 25 km cross-track (per Space-Track Spaceflight Safety Handbook for Satellite Operators v1.7, 2023)

Positional uncertainty grows with propagation time — a TCA 6 days out carries a fundamentally less reliable covariance than one 12 hours out. Operators classify events by "time-to-TCA" as much as by Pc:

| Time to TCA | Action |
|---|---|
| > 72 h | Initial screening, monitoring only |
| 24–72 h | Enhanced monitoring, maneuver analysis begins if Pc > threshold |
| < 24 h | Decision window — execute or no-go |
| < 4 h | Emergency window — maneuver feasibility depends on thruster availability |

NASA CARA tracks Pc evolution as a function of time-to-TCA; a rising Pc trend is more concerning than a high but stable Pc.

## TCA Uncertainty

TCA itself carries an uncertainty — the predicted epoch of closest approach shifts with each new CDM update (typically issued every 8 hours for high-risk events). An evolving TCA indicates an improving or worsening orbital solution. The standard deviation in TCA epoch is not a CCSDS required field but appears in operator-supplemented CDMs from commercial providers (LeoLabs, COMSPOC).

## Multiple-Revolution Repeating Conjunctions

In low-altitude LEO (altitude < 400 km), drag differentials can cause two objects that nearly-collide in one revolution to encounter again within hours or days. These "repeating conjunction" events require multi-TCA Pc aggregation rather than single-event treatment. NASA CARA published dedicated methodology for this case (NTRS 20190028903).

## Relationship to Maneuver Timing

A collision avoidance maneuver (CAM) is most efficient when executed at a point that maximises the change in miss distance per unit of delta-V. This is typically ¼ to ½ orbit before TCA, not at TCA itself. The Firefly conjunction triage agent should therefore output both TCA and recommended maneuver epoch (TCA − N orbits, or delta-V calculation) as separate fields in the decision record.

## See Also

- [[concepts/pc-probability-of-collision]] — metric computed at TCA
- [[concepts/covariance-ellipsoid]] — uncertainty structure at TCA
- [[concepts/hard-body-radius]] — collision disk in encounter plane at TCA
- [[concepts/screening-volume]] — the box that captures candidates before TCA prediction
- [[synthesis/cdm-pc-decisioning]] — full CDM → TCA → Pc → maneuver workflow
- [[sources/ccsds-508-cdm-2013]] — CCSDS mandatory field definition
