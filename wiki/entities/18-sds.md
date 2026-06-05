---
type: entity
tags: [conjunction, cdm, ssa, space-track, space-debris, mission-desk, firefly, us-space-force]
---

# 18th Space Defense Squadron (18 SDS)

The 18th Space Defense Squadron (18 SDS) is the United States Space Force unit responsible for maintaining the public Space Surveillance Catalog, operating the space-track.org data-sharing portal, and generating Conjunction Data Messages (CDMs) for satellite operators worldwide. It is the primary upstream source for public CDMs ingested by the Spacesharks Mission Desk and the Firefly conjunction-risk agent.

## Organization

- **Service branch**: United States Space Force (USSF)
- **Location**: Vandenberg Space Force Base, California (primary); detachment at Peterson SFB
- **Parent command**: Space Operations Command (SpOC) / Space Delta 2
- **Redesignation**: 13 April 2022 — renamed from 18th Space Control Squadron to 18th Space Defense Squadron
- **Combined Space Operations Center (CSpOC)**: 18 SDS participates in the multinational CSpOC at Vandenberg, which coordinates space situational awareness with allied nations

## Mission Areas

1. **Space Surveillance Network (SSN) command and control**: tasks sensors (ground radar, telescope, space-based) against catalog maintenance and special tasking
2. **Resident Space Object (RSO) catalog maintenance**: maintains ~27,000+ tracked objects (2024–2026) including active payloads, rocket bodies, and debris ≥ ~10 cm in LEO
3. **Conjunction Assessment (CA)**: screens all tracked objects against all other tracked objects for predicted close approaches; generates CDMs within the [[concepts/screening-volume|screening volume]] filter
4. **Human Spaceflight Support**: provides conjunction assessment for ISS and crewed vehicles
5. **Reentry / breakup assessment**: predicts reentry windows and on-orbit fragmentation events
6. **SSA data sharing**: manages Space-Track.org, the primary free portal for operators and researchers; distributes CDMs to registered users (operators, governments, academia)

## Data Products

Primary CDM-relevant outputs via space-track.org:

| Product | Class | Controller | Access Level |
|---|---|---|---|
| CDM (operator-specific) | `cdm` | `expandedspacedata` | Operator account (satellite registered with 18 SDS) |
| CDM (public subset) | `cdm_public` | `basicspacedata` | All registered accounts |
| Two-Line Elements (TLEs) | `tle` / `tle_latest` | `basicspacedata` | All registered accounts |
| Special Perturbations (SP) vectors | `sp_data` | `expandedspacedata` | Operator account |

The `cdm_public` class exposes a subset of CDM fields without the sensitive secondary-object operator data. Full CDMs with both object state vectors and covariance go to registered operators of the **primary object** only.

## CDM Generation Process

18 SDS operators propagate catalog TLEs (or SP vectors for registered operators) forward 7 days and apply the [[concepts/screening-volume|standard screening volume]] (2 km R / 25 km IT / 25 km CT for LEO). Every secondary object entering the screening box generates a CDM. Pc is computed using the **Foster/Alfano 2-D method** applied to the combined positional covariance projected onto the encounter plane. CDMs are updated approximately every 8 hours for active events and pushed to Space-Track.org.

## Transition to TraCSS / OASIS

Under Space Policy Directive-3 (2018) and subsequent DoC/DoD agreements, the civil Space Traffic Management role is transitioning from DoD/18 SDS to the **Office of Space Commerce (OSC)** under NOAA/DoC via [[sources/tracss-oasis-announcement-2024|TraCSS]]:

- September 2024: TraCSS 1.0 initial capabilities fielded; OSC CDMs distributed via Space-Track.org interface
- February 2026: OSC opened TraCSS waitlist for operators
- Target: operators migrate to TraCSS.gov as interface matures; 18 SDS retains the military space domain awareness (SDA) mission

Post-transition, 18 SDS will continue generating CDMs for military/national security objects while OSC/TraCSS serves the civil/commercial operator community.

## International Context

The Space Surveillance Network is the most capable of six regional SSA systems and the only one whose catalog carries legal authority for collision-avoidance obligations. Its peers — Europe's federated [[synthesis/space-situational-awareness-six-region|EU SST Partnership]], China's sovereign CNSA + APSCO/APOSOS network, Japan's JAXA + military build-out, Korea's KASI OWL-Net, and Taiwan's consumer posture — are mapped, with governance models and the 100-year Kessler view, in [[synthesis/space-situational-awareness-six-region]].

## See Also

- [[sources/space-track-cdm-api-2023]] — API documentation for accessing 18 SDS CDMs
- [[synthesis/space-situational-awareness-six-region]] — the SSN among the six regional SSA programs
- [[entities/space-track-19sds]] — 18 SDS + 19 SDS combined operational structure
- [[sources/tracss-oasis-announcement-2024]] — DoD→DoC transition details
- [[concepts/screening-volume]] — the geometric filter 18 SDS applies to generate CDMs
- [[concepts/pc-probability-of-collision]] — Pc computed by 18 SDS and populated in CDMs
- [[synthesis/cdm-pc-decisioning]] — how Firefly agents consume 18 SDS CDM output
