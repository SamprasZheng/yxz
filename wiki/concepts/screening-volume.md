---
type: concept
tags: [conjunction, cdm, pc, ssa, space-debris, mission-desk, firefly, astrodynamics]
---

# Screening Volume

The screening volume is a geometric box (or sphere) centered on the primary object's predicted trajectory that serves as the first-pass filter to identify candidate conjunctions before performing the computationally expensive [[concepts/pc-probability-of-collision|Pc]] calculation. Any secondary object whose predicted trajectory passes through the screening volume within the look-ahead window generates a Conjunction Data Message (CDM).

## Standard Dimensions (18 SDS / Space-Track)

Per the Space-Track Spaceflight Safety Handbook for Satellite Operators (v1.7, April 2023), the default LEO screening volumes are defined in the UVW (Radial / In-track / Cross-track, also called RIC) frame:

| Regime | Propagation Window | Radial | In-track | Cross-track |
|---|---|---|---|---|
| Near Earth (P < 225 min, ~LEO/MEO) | 7 days | 2 km | 25 km | 25 km |
| Deep Space (P ≥ 225 min, ~GEO/HEO) | 7 days | 50 km | 100 km | 100 km |

A spherical screening sphere of radius 68 km captures the largest dimension of the rectangular volumes and is sometimes used for catalog-level pre-screening.

## Why the Dimensions Are Asymmetric

- **Radial (2 km)**: Positional uncertainty in the radial (altitude) direction is smallest because orbital mechanics tightly constrain this axis for tracked objects.
- **In-track (25 km)**: Largest uncertainty axis — timing errors in a TLE propagation grow quadratically over days; in-track uncertainty dominates the conjunction geometry for most LEO events.
- **Cross-track (25 km)**: Large to capture inclination-plane crossings and objects with poorly determined orbital planes.

## Relationship to Pc Calculation

The screening volume is a conservative safety net, not a risk quantification. It is deliberately oversized:

1. Secondary passes through screening volume → CDM generated with miss distance and (if covariance available) Pc.
2. Most CDMs have Pc far below any action threshold (< 1×10⁻⁷) — the screening volume catches thousands of events per week for a large constellation.
3. Only events with Pc ≥ 1×10⁻⁵ enter active monitoring; only those ≥ 1×10⁻⁴ require maneuver planning.

NASA CARA research (NTRS 20170007928) found that roughly 50% of CDM volume could be eliminated by moving the radial dimension toward the performance frontier, but operators prefer volume to false negatives.

## TraCSS / OASIS Screening

Under [[sources/tracss-oasis-announcement-2024|TraCSS]], the OSC published a CDM specification (TraCSS-Spec-001 v2.1, July 2025) that retains the same CCSDS screening volume framework but adds metadata about the screening methodology and operator-configurable thresholds for future TraCSS.gov interface.

## Agent Relevance

The Firefly conjunction agent does not run screening — that is done by 18 SDS or commercial SSA providers upstream. What the agent receives are CDMs that have already passed the screening volume filter. The agent's job is to:

1. Parse the CDM (which object pair, TCA, miss distance, Pc)
2. Evaluate Pc against thresholds (see [[concepts/pc-probability-of-collision]])
3. Assess covariance quality (see [[concepts/covariance-ellipsoid]])
4. Recommend action or dismiss

Understanding screening volume prevents the agent from confusing "a CDM was issued" (= entered the screening box) with "there is a high-risk conjunction" (= Pc ≥ 1×10⁻⁴).

## Historical Lineage

The all-on-all screening volume is an artefact of finite compute. In the **NORAD SPADOC / Project Space Track** era, conjunction assessment was done on-request for a handful of high-value assets — there was no catalog-wide screening. The geometric box filter emerged as the catalog grew (thousands of objects) and pairwise Pc on every pair became intractable: a cheap geometric pre-filter (the screening volume) reduces an O(N²) Pc problem to a tractable candidate set. The **2009 Iridium-Cosmos** collision drove the shift to **systematic, catalog-wide screening for all maneuverable operators**, and CCSDS 508 (2013) standardised the CDM that screening emits. The lineage is on-request (pre-2009) → catalog-wide box screening (2009+) → and now the proliferation-driven push toward tighter, **covariance-adaptive** volumes.

## Long-Horizon View (labelled scenario, not fact)

The screening volume is deliberately oversized *today* precisely because [[concepts/covariance-ellipsoid|covariance realism]] is poor — the box must be wide enough to catch a conjunction whose true geometry is uncertain. As covariance realism improves (denser radar/optical networks, faster cadence), the volume can shrink toward **per-object, covariance-scaled adaptive volumes** that admit far fewer false candidates. But this is a race against catalog density: ESA SER 2025 projects debris growth for 200+ years even at zero launch (see [[synthesis/space-situational-awareness-six-region]]). Scenario fork: either adaptive screening + better covariance keep the CDM-per-asset rate manageable, or rising density forces a fixed wide box to emit so many CDMs that triage must move fully autonomous and on-board. The invariant: **screening-volume size is the dial that trades false-alarm load against missed-collision risk, and its setpoint is governed by input quality, not by the box geometry itself.**

## Provider / Standard Convention (horizontal axis)

Strict 台美日韓中國歐洲 geography is **N/A** — the screening volume is a propagation-geometry choice, not national policy (the national-catalog axis lives in [[synthesis/space-situational-awareness-six-region]]). The meaningful horizontal axis is **convention by data source**: 18 SDS / Space-Track uses the standard 2 km × 25 km × 25 km (LEO) / 50 × 100 × 100 km (deep-space) RIC boxes documented above; commercial providers with better covariance ([[entities/leolabs|LeoLabs]]) can run **tighter** volumes (fewer false candidates per real risk) because their inputs are sharper; TraCSS (TraCSS-Spec-001 v2.1, 2025) retains the CCSDS box framework but adds operator-configurable thresholds. Tighter is not strictly better — it only works when covariance realism justifies it.

## Implementation Reality (code↔concept, 2026-06-20)

A real risk of conflation lives in the built code, and this page is the antidote. `agents/src/firefly/tools/space_track.py::cdm_30d_summary` filters `cdm_public` by an **altitude±50 km / inclination±5° orbital-shell band** over a 30-day TCA window — this is a coarse *shell-aggregation* filter for risk **summarisation**, and is **not** the operational 2 × 25 × 25 km RIC screening volume that 18 SDS applies upstream to *generate* CDMs. The two filters operate at different stages and scales: 18 SDS screening produces individual CDMs; Firefly's shell band counts how many of those already-screened CDMs fall near a candidate orbit. The `RiskAgent` (`agents/src/firefly/agents/risk.py`) consumes the count + max probability, not the per-event screening geometry. Stated here so the shell-band parameter is never mistaken for an operational screening-volume implementation (no code edited).

## See Also

- [[concepts/pc-probability-of-collision]] — downstream computation from screening
- [[concepts/tca-time-of-closest-approach]] — the epoch within the screening window
- [[concepts/hard-body-radius]] — object size that determines the Pc collision disk
- [[concepts/covariance-ellipsoid]] — covariance used after screening
- [[entities/18-sds]] — the organization that runs the operational screening
- [[entities/leolabs]] — commercial provider running tighter, sharper-covariance screening
- [[concepts/conjunction-screening-providers]] — provider comparison table
- [[synthesis/cdm-pc-decisioning]] — complete workflow from screening to maneuver decision
- [[synthesis/space-situational-awareness-six-region]] — catalog-density + 100-year Kessler context
