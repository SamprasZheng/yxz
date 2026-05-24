---
type: entity
tags: [satellite-operations, collision-avoidance, maneuver-planning, ssa, competitive-intel, space-traffic]
---

# Kayhan Space

Kayhan Space is a Boulder, Colorado-based space safety startup that provides autonomous collision avoidance, conjunction assessment, and maneuver planning software for satellite operators. Its flagship product is **Pathfinder** (now merged into the broader **Satcat** product suite).

## Founding and Leadership

- **CEO:** Siamak Hesar (co-founder)
- **CTO:** Araz Feyzi (co-founder)
- **Founded:** 2019
- **Headquarters:** Boulder, Colorado

## Funding

| Round | Amount | Date |
|---|---|---|
| Seed | $3.7M | December 2021 |
| Seed Extension | $7M | September 2023 |
| USSF STTR Phase 1 | $250K | September 2022 |
| **Total VC** | ~$10.7M | — |

The September 2023 seed extension was led by **Space Capital** and **Eve Atlas**.

## Products

### Pathfinder (now part of Satcat Suite)

SaaS platform for end-to-end conjunction risk assessment and collision avoidance maneuver planning:

- **Conjunction risk assessment**: Probability of collision (Pc) computation from Space-Track CDMs and commercial data sources
- **Optimized maneuver planning**: Generates safe impulsive, low-thrust, and differential drag maneuver options automatically when Pc thresholds are exceeded
- **Machine-to-machine coordination**: "Autonomously pre-coordinate maneuver responsibility and event mitigation status at the machine-to-machine level" — Pathfinder 3.0 capability
- **Multi-source orbit determination**: AI/ML-enhanced domain awareness combining multiple tracking data sources

### Satcat Suite (2025 unified platform)

Announced 2025, merges Pathfinder's conjunction capabilities with a unified space intelligence layer:

- AI/ML-enhanced domain awareness and orbit determination
- Sophisticated conjunction assessment and autonomous collision avoidance
- Satcat (space object catalog intelligence) + Pathfinder + Dynamics (proprietary orbital propagator)

### Eagle

Orbit simulation software for LEO, GEO, and interplanetary orbits.

### Gamut

Software to prevent debris collisions in launch trajectories and manage government launch approval submissions.

## Customers (Confirmed)

- **Capella Space** (SAR EO constellation)
- **Lynk Global** (direct-to-device satellite communications)
- **Globalstar** (established mobile satellite services)

## Government Contracts

- **USSF Orbital Prime** (2022): Partnership with Astroscale and University of Texas at Austin for autonomous rendezvous and proximity operations (project: Proxima)
- **USSF STTR Phase 1** (September 2022): $250K Small Business Technology Transfer award

## Technical Architecture

Pathfinder uses AI/ML-enhanced orbit determination that improves covariance realism — a known weakness of free Space-Track CDMs. The machine-to-machine coordination layer (Pathfinder 3.0) enables operators to share maneuver plans automatically when both sides use Pathfinder, without human operator-to-operator contact.

⚠️ **LLM or generative AI integration not publicly documented** — Kayhan's AI is described as ML-based orbit determination and constraint optimization, not LLM-based reasoning.

## Relevance to Spacesharks Mission Desk

Kayhan Space represents the **automated maneuver planning** dimension closest to [[synthesis/spacesharks-mission-desk-hackathon-plan]]'s collision-avoidance phase. The key contrast: Kayhan automates the Pc computation → maneuver recommendation loop for individual events; Spacesharks would fuse this signal with lifecycle context (satellite age, fuel budget, mission phase) and external signals (SWPC space weather, NOTAM launch windows) to recommend whether to maneuver at all given the broader operational picture.

## See Also

- [[concepts/llm-satellite-operations-landscape]] — full competitive map
- [[concepts/pc-probability-of-collision]] — the metric Kayhan optimizes
- [[concepts/cdm-conjunction-data-message]] — input data format
- [[entities/leolabs]] — complementary commercial tracking provider
- [[entities/slingshot-aerospace]] — Beacon CDM coordination platform
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Spacesharks canonical plan
