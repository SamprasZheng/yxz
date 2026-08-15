---
type: source
title: "SpaceX Starlink Gen1/Gen2 Semi-Annual Constellation Report (FCC, July 2026)"
author: "SpaceX (filing to the US FCC)"
date: "2026-07-01"
ingested: "2026-07-26"
tags: [conjunction, cdm, pc, starlink, spacex, collision-avoidance, ssa, primary-source]
---

# SpaceX Starlink Gen1/Gen2 Semi-Annual Constellation Report (FCC, July 2026)

SpaceX files a **semi-annual constellation status report** with the US FCC (a condition of its NGSO authorizations) disclosing operational conjunction and collision-avoidance statistics for the Starlink fleet. The July 2026 filing covers the **December 2025 – May 2026** reporting period and is the most concrete public data point on real-world maneuver tempo for the largest LEO constellation. Because it is a regulatory filing, it is a **primary source** — not a press estimate.

## Key disclosed figures

| Metric | Value | Notes |
|---|---|---|
| Autonomous-maneuver **Pc threshold** | **> 3×10⁻⁷** (≈ 1-in-3.3-million) | ~300× more conservative than the 1×10⁻⁴ industry-standard "red" trigger; see [[concepts/pc-probability-of-collision]] |
| Avoidance maneuvers, Dec 2025 – May 2026 | **207,152** | up ~60,000 from the prior half-year (**148,696**) |
| Rolling 12-month total (to May 2026) | **> 355,000** | > 3× the full-2024 figure |
| Approx. per-satellite rate | **~40 maneuvers/sat/yr** | across **>10,000** operational units (up from ~6,000 in 2024) — roughly one dodge per satellite per week |
| Projected annual maneuvers by 2027 | **~1,000,000** | third-party projection at current constellation-growth rate |
| **Controlled deorbits, Dec 2025 – May 2026** | **260 satellites** | disposal-reliability **>99%**; the vast majority re-enter within ~6 months of the deorbit command |
| Pc method | Alfano two-dimensional | the algorithm used to populate CDM Pc for the fleet |

## Why this corrects the prior wiki text

Earlier wiki pages stated that Starlink's maneuver threshold was "not publicly disclosed." That is now **stale**: SpaceX's semi-annual FCC reports state the autonomous trigger as **Pc > 3×10⁻⁷**. This is a rare disclosed, asset-specific threshold and a clean illustration of the [[concepts/pc-probability-of-collision|cost–loss reframing]] — a fleet with cheap, abundant, autonomous maneuvers can afford a threshold ~300× tighter than the default, because for Starlink the *cost(maneuver)* term is near-zero while *C_consequence* (a Kessler-triggering collision in a shell it must keep clean for its own constellation) is enormous.

## Why it matters here — the tempo anchor

These figures turn the conjunction cluster's "Kessler-densifying → more CDMs per satellite-year" **projection** into a **measured 2026 fact**: at ~40 maneuvers/sat/yr and >355k/yr fleet-wide (with a 1M/yr projection for 2027), the dense-regime, human-out-of-the-loop future the [[concepts/tca-time-of-closest-approach|TCA]] and [[concepts/screening-volume|screening-volume]] pages describe is already the operating reality for the largest operator. It also demonstrates the M2M/on-board-autonomy endpoint of the [[concepts/cdm-conjunction-data-message]] lineage.

## Caveats

- SpaceX's threshold and maneuver count are **self-reported** in the filing; there is no independent audit of the underlying Pc computations or covariance realism.
- A tighter threshold means **more** maneuvers, which itself degrades the predictability of the constellation's future positions — a second-order strain on everyone else's conjunction assessment (the "everyone maneuvering invalidates everyone's CDMs" effect, cf. the May-2024 G5 storm case in [[concepts/cdm-conjunction-data-message]]).
- The same filing pairs the dodge tempo with a **disposal** tempo (260 controlled deorbits, >99% reliability): the two are the same operational posture — an operator keeping the shells it depends on clean at both ends of the satellite lifecycle. Read against the [[sources/esa-space-environment-report-2026|ESA SER 2026]] Kessler view, one large operator's private discipline is the current de-facto substitute for an enforceable global disposal norm.

## See Also

- [[concepts/pc-probability-of-collision]] — threshold, method, cost–loss framing
- [[concepts/cdm-conjunction-data-message]] — the message this tempo is built on
- [[concepts/tca-time-of-closest-approach]] — the sub-daily-to-autonomous cadence trend
- [[concepts/screening-volume]] — the filter generating this candidate volume
- [[sources/esa-space-environment-report-2026]] — the density driving the tempo
- [[synthesis/space-situational-awareness-six-region]] — catalog-authority context
- [[synthesis/cdm-pc-decisioning]] — end-to-end triage workflow
