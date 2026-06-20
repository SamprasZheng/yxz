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

## Historical Lineage

TCA as an operational concept is downstream of the short-term-encounter [[concepts/pc-probability-of-collision|Pc]] formulation: **Foster & Estes (NASA JSC, 1992)** derived the 2-D encounter-plane integral to protect the International Space Station, fixing the encounter plane *at the instant of closest approach* — i.e. TCA became the canonical evaluation epoch for every subsequent method (Chan 1997/2008, Patera 2001/2005, Alfano 2005, Akella & Alfriend 2000). The operational watershed was the **2009-02-10 Iridium-33 / Cosmos-2251** collision — the first accidental hypervelocity collision of two intact satellites — which moved Pc-vs-time-to-TCA from a research curiosity to a daily operational discipline and drove the US toward systematic CDM issuance. CCSDS standardised TCA as the single mandatory epoch in [[sources/ccsds-508-cdm-2013|508.0-B-1]] (2013). The lineage is thus 1992 (method) → 2009 (operationalisation) → 2013 (standardisation) → ~2024+ (sub-daily commercial cadence; see below).

## Long-Horizon View (labelled scenario, not fact)

The TCA *math* is invariant — closest approach is a kinematic fact independent of catalog size. What collapses on a 100-year horizon is the **operating tempo around TCA**. As the tracked catalog grows (ESA SER 2025: >40,000 tracked, ~54,000 >10 cm, debris growing 200+ years even at zero launch — see [[synthesis/space-situational-awareness-six-region]]), the number of screened conjunctions per asset rises super-linearly, the per-event human decision budget shrinks, and the 7-day → 8-hour → sub-hour update cadence trends toward **continuous, autonomous on-board CAM** where "time-to-TCA" is measured in minutes, not days. Scenario fork: either (a) on-board autonomy + inter-operator maneuver coordination (Kayhan/Slingshot-style M2M) make dense-regime TCA management tractable, or (b) a [[concepts/screening-volume|screening]]-volume + covariance-realism shortfall makes most TCAs un-actionable and forces altitude abandonment. The binding constraint is not the TCA computation but the *quality and latency* of the inputs ([[concepts/covariance-ellipsoid|covariance realism]]).

## Standards / Provider Convention (horizontal axis)

Strict 台美日韓中國歐洲 geography is largely **N/A** here — TCA is universal physics, and the *national-catalog* dimension is carried by [[synthesis/space-situational-awareness-six-region]]. The meaningful horizontal axis is **update cadence by data source**: 18 SDS / Space-Track issues CDMs on a nominal **8-hour** cycle out to a 7-day horizon; [[entities/leolabs|LeoLabs]] delivers CDMs in **< 5 min** with ~400% higher update frequency, so its TCA estimate converges faster and its TCA-uncertainty band shrinks earlier; ESA/EU SST and commercial COMSPOC supplement with operator-reported TCA-epoch standard deviations (not a CCSDS-required field). Higher cadence = an earlier, more stable maneuver-decision point for the same time-to-TCA.

## Implementation Reality (code↔concept, 2026-06-20)

The built Firefly code does **not** yet implement TCA-aware triage as this page prescribes. `agents/src/firefly/agents/risk.py` (the `RiskAgent`, wired into `orchestrator.py` as `debris_risk`) calls a single tool — `cdm_30d_summary` (`agents/src/firefly/tools/space_track.py`) — which returns a **30-day shell-level aggregate** (`cdm_count_30d` + `highest_pc`) for an altitude±50 km / inclination±5° band, *not* per-event TCA parsing, time-to-TCA tiering, or a recommended-maneuver-epoch field. The maneuver-timing output described above remains aspirational; flagged for the owner (no code edited).

## See Also

- [[concepts/pc-probability-of-collision]] — metric computed at TCA
- [[concepts/covariance-ellipsoid]] — uncertainty structure at TCA
- [[concepts/hard-body-radius]] — collision disk in encounter plane at TCA
- [[concepts/screening-volume]] — the box that captures candidates before TCA prediction
- [[concepts/conjunction-screening-providers]] — provider cadence comparison (drives TCA convergence)
- [[entities/leolabs]] — < 5 min CDM cadence provider
- [[synthesis/cdm-pc-decisioning]] — full CDM → TCA → Pc → maneuver workflow
- [[synthesis/space-situational-awareness-six-region]] — national-catalog + 100-year Kessler context
- [[sources/ccsds-508-cdm-2013]] — CCSDS mandatory field definition
