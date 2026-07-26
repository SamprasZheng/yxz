---
type: source
title: "ESA Space Environment Report 2026 (10th edition)"
author: "ESA Space Debris Office (ESOC, Darmstadt)"
date: "2026-05-01"
ingested: "2026-07-26"
tags: [ssa, space-debris, conjunction, esa, kessler, primary-source]
---

# ESA Space Environment Report 2026 (10th edition)

The **tenth annual** ESA Space Environment Report, issued by ESA's Space Debris Office and released **2026-05-01**, is the authoritative open-data snapshot of the orbital debris environment. It supersedes the 2025 (9th) edition cited elsewhere in this wiki. Underlying population estimates come from ESA's **MASTER-8** debris model and the **DISCOS** database; tracked-object counts are drawn from the US 18/19 SDS catalog and ESA/EU-SST sensors.

## Key figures (2026 edition, as reported)

| Quantity | Value | Notes |
|---|---|---|
| Tracked objects > 10 cm | **> 43,000** | up from ~40,000 in the 2025 edition; catalog-resident |
| Active payloads | **~9,300** | LEO-dominated; mega-constellation-driven growth |
| Spent rocket bodies | **> 2,000** | large-mass abandoned upper stages |
| Estimated 1–10 cm fragments | **~1.2 million** | MASTER-8 statistical estimate; **largely untrackable** (below sensor floor) |
| Estimated < 1 cm fragments | **> 140 million** | MASTER-8; lethal kinetic energy, no catalog entry |
| Total mass in orbit | **> 15,000 tonnes** | most concentrated in LEO |
| LEO collision-risk change (2026) | **≈ +20%** | year-over-year, concentrated in the ~550 km band |

## Structural findings

- Even with **zero new launches**, the modelled debris population continues to grow for **200+ years** through collision-driven fragmentation — the Kessler-cascade signature. This is unchanged from prior editions and remains the central long-horizon invariant.
- The **1–10 cm "deadly-but-untrackable"** population (~1.2M objects) sits below the ~5–10 cm sensor floor: lethal on impact, absent from any catalog, and therefore invisible to the [[concepts/pc-probability-of-collision|Pc]] integral (no state, no covariance, no CDM).
- Debris and active satellites at the busy ~550 km shell are now the **same order of magnitude**, so the *background* conjunction rate per satellite-year is set by structural density, not by any single event.

## Why it matters here

This is the primary anchor for every "catalog density / Kessler / untrackable-gap" claim in the conjunction cluster. It quantifies *why* the [[concepts/screening-volume]] must stay oversized, why [[concepts/covariance-ellipsoid|covariance realism]] is the binding constraint, and why the per-asset CDM tempo (see [[sources/spacex-starlink-conjunction-semiannual-2026]]) is rising.

## See Also

- [[synthesis/space-situational-awareness-six-region]] — national-catalog capacity behind these numbers
- [[concepts/pc-probability-of-collision]] — the metric whose reliability the untrackable-gap bounds
- [[concepts/covariance-ellipsoid]] — realism as the 100-year constraint
- [[concepts/screening-volume]] — why the box stays wide as density rises
- [[sources/spacex-starlink-conjunction-semiannual-2026]] — the operator-side maneuver tempo these numbers drive
- [[synthesis/cdm-pc-decisioning]] — end-to-end triage workflow
