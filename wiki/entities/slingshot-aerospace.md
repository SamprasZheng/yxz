---
type: entity
tags: [conjunction, cdm, ssa, space-debris, commercial-ssa, mission-desk, firefly, tracss, competitive-intel, anomaly-detection]
---

# Slingshot Aerospace

Slingshot Aerospace is a US commercial Space Situational Awareness and space safety company whose **Beacon** product provides conjunction data management and fleet-scale collision avoidance coordination. Slingshot is a key contractor in the DoC / NOAA **TraCSS** programme.

## Business

- Headquarters: El Segundo, California
- Founded: ~2017
- Key product: **Beacon** — space traffic coordination and CDM management platform

## Beacon — CDM Service

Beacon's confirmed capabilities (from product page, verified 2025):

1. **CDM Ingestion**: Ingests CDMs from Space-Track.org and other sources; applies customisable risk alerts and fleet-scale dashboards
2. **Fleet management**: Operators set risk thresholds; Beacon filters and surfaces actionable events against fleet ephemerides
3. **Secondary Coordination**: View secondary object ephemerides and maneuverability context; integrated chat for operator-to-operator coordination
4. **Automated Maneuver Sharing**: Share maneuver plans via API with structured messaging to the secondary operator
5. **Direct API integration**: Beacon exposes an API for programmatic CDM access and maneuver coordination

Beacon's starting point is Space-Track CDMs, not Slingshot's own sensor data — it is a **CDM aggregation and presentation layer**, not a raw tracking network.

## TraCSS Contract

Slingshot was awarded a **$13.3 million NOAA contract** (November 2024) to develop the user interface layer for TraCSS (Traffic Coordination System for Space). Collaborators on the contract include COMSPOC and T&T Consulting Services. Slingshot Beacon will serve as the framework for the TraCSS presentation layer at TraCSS.gov.

Commercial data pilot contracts (including Slingshot, LeoLabs, Kayhan Space, COMSPOC, SpaceNav) were extended by DoC in May 2024 to continue providing commercial SSA data to supplement TraCSS.

## Relevance to Firefly / NemoClaw Stack

Slingshot Beacon represents the coordination layer that an operator deploying the Firefly conjunction agent might use downstream — the agent scores Pc from raw CDMs; Beacon facilitates the follow-on human coordination step (notify secondary operator, share maneuver plan). The TraCSS contract suggests Slingshot APIs will become a standard interface for US civil-commercial operators when TraCSS.gov goes live.

⚠️ Slingshot Beacon pricing is not publicly disclosed — demo required.

## Founding and Funding

- **Founded:** 2017
- **CEO:** Melanie Stricklan (co-founder; formally named CEO February 2021)
- **Headquarters:** El Segundo, California
- **Total funding:** ~$110–120M across 12+ rounds (Tracxn/PitchBook diverge by ~$10M)
- **Series A2:** $40.85 million (December 2022) — oversubscribed; described as focused on expanding telescope network and orbital tracking

## Agatha — Satellite Behavior Anomaly AI (DARPA PRECOG Program)

Slingshot worked with DARPA under the **PRECOG program** (March 2023 start, results delivered to DARPA January 2024, publicly announced June 5, 2024) to build **Agatha**, an AI system for detecting anomalous satellite behavior at constellation scale.

Technical approach:

- **Inverse Reinforcement Learning (IRL)**: evaluates satellite behaviors to infer "policies and intentions" — not just individual maneuver outliers
- **Training data**: 60+ years of simulated constellation data; subsequently validated on real-world commercial constellation data
- **Data-agnostic**: No pre-specified cues required; ingests raw orbital data streams and identifies anomalies autonomously
- **Use cases**: Malfunctioning spacecraft detection; "wolf in sheep's clothing" adversarial satellite detection within large constellations

Agatha is positioned as a defense intelligence tool for distinguishing threatening from non-threatening anomalous behavior in orbit. It has been validated by "respective satellite operators" against operational commercial constellations.

The $25.2M US Space Force contract to build a "digital twin space simulator" is cited alongside the $13M NOAA TraCSS contract as Slingshot's largest government engagements.

## See Also

- [[sources/tracss-oasis-announcement-2024]] — TraCSS programme Slingshot supports
- [[entities/18-sds]] — upstream CDM source Beacon ingests from
- [[entities/leolabs]] — complementary commercial tracking provider
- [[synthesis/cdm-pc-decisioning]] — where Slingshot Beacon fits in the operator workflow
