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

Slingshot was awarded a **$13.3 million NOAA contract** (November 2024) to develop the user interface layer for TraCSS (Traffic Coordination System for Space). The award structure is **$5.3M to build the Presentation Layer (12 months) + ~$8M to operate/manage it over the first four years** — i.e. a build-plus-ops outsourcing, not a one-off. Collaborators include COMSPOC and T&T Consulting Services. Slingshot Beacon serves as the framework for the TraCSS presentation layer at TraCSS.gov. Per Slingshot, **Beacon is used by ~90% of LEO satellite operators** — the dominant fleet-coordination dashboard, which is exactly why DoC chose it as the civil front end.

Commercial data pilot contracts (including Slingshot, LeoLabs, Kayhan Space, COMSPOC, SpaceNav) were extended by DoC in May 2024 to continue providing commercial SSA data to supplement TraCSS; the OSC's **Commercial Conjunction Assessment Screening Services (CASS)** pilots (announced 2026) continue this outsourcing pattern. Slingshot was named to **Fast Company's World's Most Innovative Companies 2026**.

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

## Commercial-Market Position (six-region)

Slingshot is the canonical **US "government-anchored commercial market"** case: a genuine private product (Beacon, ~90% LEO share) whose demand floor is a government program (TraCSS). It sits in **Tier 2 (decide)** of the commercial space-safety stack — conjunction screening + fleet coordination — *not* Tier 1 tracking (its own SGSN optical net is secondary to ingested CDMs). Its non-US analogs are Europe's agency-pulled startups (Vyoma/Neuraspace/Okapi) and, in the **act** tier, Japan's Astroscale. Full market structure, the three market models, and the 100-year STM-commercialization question: [[synthesis/commercial-space-traffic-management-six-region]].

## See Also

- [[sources/tracss-oasis-announcement-2024]] — TraCSS programme Slingshot supports
- [[entities/18-sds]] — upstream CDM source Beacon ingests from
- [[entities/leolabs]] — complementary commercial tracking provider
- [[entities/kayhan-space]] · [[entities/privateer-space]] · [[entities/cognitive-space]] — fellow US commercial space-safety vendors
- [[concepts/conjunction-screening-providers]] — provider capability comparison table (Beacon row)
- [[synthesis/commercial-space-traffic-management-six-region]] — six-region commercial STM market map
- [[synthesis/space-situational-awareness-six-region]] — national SSA infrastructure (governmental layer)
- [[synthesis/cdm-pc-decisioning]] — where Slingshot Beacon fits in the operator workflow (Tier 2)
