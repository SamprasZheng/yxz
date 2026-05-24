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

## See Also

- [[concepts/pc-probability-of-collision]] — downstream computation from screening
- [[concepts/tca-time-of-closest-approach]] — the epoch within the screening window
- [[concepts/hard-body-radius]] — object size that determines the Pc collision disk
- [[concepts/covariance-ellipsoid]] — covariance used after screening
- [[entities/18-sds]] — the organization that runs the operational screening
- [[synthesis/cdm-pc-decisioning]] — complete workflow from screening to maneuver decision
