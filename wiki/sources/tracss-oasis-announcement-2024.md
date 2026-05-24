---
type: source
title: "TraCSS Initial Capabilities Launch — Office of Space Commerce, NOAA/DoC"
author: "Office of Space Commerce (OSC), NOAA, US Department of Commerce"
date: "2024-09-30"
ingested: "2026-05-24"
tags: [conjunction, cdm, ssa, space-track, space-debris, mission-desk, firefly, tracss, us-government]
---

# TraCSS / OASIS — DoD to DoC Space Traffic Management Transition

The Traffic Coordination System for Space (TraCSS) is the US Department of Commerce's new space traffic management system, being built by the Office of Space Commerce (OSC) under NOAA to take over the civil Space Traffic Management (STM) mission from the US Department of Defense / 18 SDS. The initial capabilities were fielded in September 2024.

**Primary URL**: https://space.commerce.gov/traffic-coordination-system-for-space-tracss/  
**Initial Capabilities Announcement**: https://space.commerce.gov/commerce-departments-new-traffic-coordination-system-for-space-launches-initial-capabilities/

## Policy Background

- **Space Policy Directive-3** (2018): Directed DoC to assume the civil STM mission from DoD
- **US Space Priorities Framework**: Reinforced DoC/DoD transition framework
- DoD retains the **Space Domain Awareness (SDA)** mission for national-security objects; OSC takes the **civil/commercial coordination** mission

## TraCSS Architecture (Confirmed Components)

TraCSS has three main components:

| Component | Function |
|---|---|
| **TraCSS-OASIS** | Data repository — stores orbital data, CDMs, sensor data |
| **TraCSS-SKYLINE** | Application layer — SSA and Space Traffic Coordination (STC) services for operators |
| **TraCSS-HORIZON** | Modeling, simulation, and research environment; development and test environment |

## Implementation Timeline (Verified Milestones)

| Date | Milestone |
|---|---|
| March 5, 2024 | OSC received Authority to Proceed from DoC |
| March 2024 | System integrator contract awarded |
| August 2024 | Authority to Operate received from NOAA Office of the CIO |
| **September 2024** | **TraCSS 1.0 initial capabilities fielded** — CDMs distributed to beta users via Space-Track.org interface |
| November 2024 | Slingshot Aerospace awarded $13.3M contract to build TraCSS user interface (with COMSPOC, T&T) |
| February 2026 | OSC opened TraCSS waitlist for satellite operators |
| May 27, 2026 | University Spacecraft Operators Forum scheduled |
| 2026 (target) | TraCSS production release; user migration from space-track.org to TraCSS.gov |

## What TraCSS Changes for Operators

**Current state (as of May 2026)**: TraCSS CDMs are distributed via the **existing Space-Track.org interface** to beta users. The trajectory of the spacecraft stays the same — operators still register at space-track.org and pull CDMs via the same API. The underlying data begins to come from TraCSS rather than purely from 18 SDS.

**Future state (TraCSS.gov live)**: Operators migrate to the TraCSS.gov interface. The plan does not eliminate Space-Track.org immediately; OSC will "work with DoD to migrate satellite operators" over time.

## TraCSS CDM Specification

OSC published a dedicated CDM specification (TraCSS-Spec-001) that extends CCSDS 508.0-B-1:

| Version | Date | URL |
|---|---|---|
| Draft v1 (Spec 001) | April 2025 | https://space.commerce.gov/wp-content/uploads/2025/04/Conjunction-Data-Message-CDM-Specification-for-Traffic-Coordination-System-for-Space-Draft-TraCSS-Spec-001.pdf |
| v2.1 | July 2025 | https://space.commerce.gov/wp-content/uploads/2025/07/TraCSS-_CDM_Spec_Version_2.1.pdf |

Key additions vs. CCSDS 508.0-B-1:
- `OD_QUALITY` field: `GOOD` / `FAIR` / `POOR` / `UNKNOWN` for each object
- Operator identifiers and contact metadata
- Maneuver plan sharing fields
- Five output formats: KVN, XML, JSON (CCSDS-aligned), TraCSS-unique JSON, CSV

OSC also published a **Conjunction Assessment Verification Dataset** (March 2026) — a public test set for validating conjunction algorithms against known events.

## Commercial Data Pilot

OSC extended commercial data contracts (originally for TraCSS development pilot) in May 2024. Confirmed contractors receiving new orders: **LeoLabs**, **Slingshot Aerospace** (via [[entities/slingshot-aerospace|Slingshot's Beacon]]), Kayhan Space, COMSPOC, SpaceNav. These companies provide commercial sensor data and services to supplement OSC's own TraCSS data products.

## Public vs. Operator-Only Access

| Data Type | Access |
|---|---|
| CDMs for registered operators | Operator account (primary satellite registered) |
| CDM public subset (`cdm_public`) | All registered free accounts |
| Conjunction Assessment Verification Dataset (March 2026) | Fully public — no registration required |
| TraCSS.gov full interface | Beta waitlist (as of February 2026); full production 2026 target |

## Implications for the Firefly / NemoClaw Agent

- **Short term (2026)**: API flow is unchanged — agent uses space-track.org `/class/cdm_public` endpoint as now.
- **Medium term (TraCSS.gov live)**: Agent will need to update authentication endpoint and possibly API parameter names per TraCSS CDM Spec v2.1. The `OD_QUALITY` field in TraCSS CDMs will be directly usable as a covariance confidence filter.
- TraCSS represents an upgrade, not a disruption — the underlying CDM content is CCSDS-compatible throughout the transition.

## See Also

- [[entities/18-sds]] — the DoD organisation being partially replaced in civil STM
- [[entities/slingshot-aerospace]] — TraCSS UI contractor
- [[sources/space-track-cdm-api-2023]] — current interface being transitioned
- [[sources/ccsds-508-cdm-2013]] — CDM format that TraCSS extends
- [[synthesis/cdm-pc-decisioning]] — impact on the MVP retrieval recipe
