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

> **The anchor is budget-contested but re-stabilising (fact-check 2026-08-25).** Because Beacon's demand floor *is* TraCSS, Slingshot is the most directly exposed vendor to the 2026 TraCSS funding fight: the FY2027 President's Budget Request cuts the Office of Space Commerce to ~$11M (≈80%), after Congress restored FY2026 to **$52.5M** and the Space Force publicly declined to reabsorb the civil STM mission. **The FY2027 cut is now failing the same way FY2026's did: the House Appropriations Committee's FY2027 CJS bill (approved 2026-05-13) restores OSC to ~$50M with report language supporting continued TraCSS work, and Senate appropriators likewise moved to retain the funding — a second-consecutive-year congressional override of the termination attempt, so Beacon's demand floor holds near-term.** The award structure further *insulates* Slingshot — the ~$8M is a four-year **build-plus-ops** tail, and a proposed **user-fee** TraCSS would convert operators into paying customers rather than removing them. Full budget mechanics + dates are canonical in [[synthesis/space-situational-awareness-six-region]] §3.1; the market-layer read (fragile-but-sticky anchor, demand *uncertainty* not collapse) is in [[synthesis/commercial-space-traffic-management-six-region]] §3.1.

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

The $25.2M US Space Force contract to build a "digital twin space simulator" is cited alongside the $13M NOAA TraCSS contract as Slingshot's largest government engagements — now itself eclipsed by the 2026 MENTAT award (below).

## MENTAT / Talos — AI Mission-Rehearsal & Strategy Agent (2026)

**Verified 2026-08-11.** In 2026 Slingshot moved decisively into the *agentic* ops-AI layer, rebranding its category as **"Space Operations Intelligence & Autonomy (SOIA)":**

- **$69.2M USSF OTTI award (2026-07-15)** — a ~4.5-year **SBIR Phase III** contract under the Space Force **Operational Test and Training Infrastructure (OTTI)** program to deliver AI-powered **mission rehearsal** and operational-training capability; **Slingshot's largest contract to date.** The program is named **MENTAT** (after the human strategists of *Dune*); its core agent **Talos** is billed as an "AI-powered operational training and strategy agent" on Slingshot's **Sense → Fuse → Decide → Act** framework, fusing the company's sensor network with other sources for mission planning and operational awareness.
- **$27M USSF award (2026-01-15)** — the earlier "AI-Driven Training Environment for Space Warfare" contract that MENTAT scales.

**Scope caveat (falsifier-relevant nuance):** Talos *wargames, rehearses, and strategizes* rather than flying a live spacecraft, and Slingshot has **not publicly confirmed an LLM core.** So MENTAT widens the US ops-AI deployment lead but does **not** by itself falsify the [[synthesis/llm-satellite-operations-six-region]] finding that a production *live-flight* LLM-reasoning copilot is still absent in the US market (see that page's falsifier table §5). It does make Slingshot the most explicitly *agent*-branded US vendor — ahead of [[entities/msbai|MSBAI]]'s live-SDA OrbitGuard on funding scale, though MSBAI's product runs against a live SDA tasking loop while Talos runs against a training/rehearsal loop.

Sources: [Business Wire — $69.2M OTTI (2026-07-15)](https://www.businesswire.com/news/home/20260715761196/en/Slingshot-Aerospace-Wins-$69.2-Million-U.S.-Space-Force-Contract-to-Advance-AI-Powered-Mission-Readiness-for-Space-Defense); [Via Satellite (2026-07-15)](https://www.satellitetoday.com/government-military/2026/07/15/slingshot-aerospace-wins-space-force-contract-to-expand-ai-mission-rehearsal/); [Business Wire — $27M AI training environment (2026-01-15)](https://www.businesswire.com/news/home/20260115783294/en/).

## Commercial-Market Position (six-region)

Slingshot is the canonical **US "government-anchored commercial market"** case: a genuine private product (Beacon, ~90% LEO share) whose demand floor is a government program (TraCSS). It sits in **Tier 2 (decide)** of the commercial space-safety stack — conjunction screening + fleet coordination — *not* Tier 1 tracking (its own SGSN optical net is secondary to ingested CDMs). Its non-US analogs are Europe's agency-pulled startups (Vyoma/Neuraspace/Okapi) and, in the **act** tier, Japan's Astroscale. Full market structure, the three market models, and the 100-year STM-commercialization question: [[synthesis/commercial-space-traffic-management-six-region]].

## See Also

- [[sources/tracss-oasis-announcement-2024]] — TraCSS programme Slingshot supports
- [[entities/18-sds]] — upstream CDM source Beacon ingests from
- [[entities/leolabs]] — complementary commercial tracking provider
- [[entities/kayhan-space]] · [[entities/privateer-space]] · [[entities/cognitive-space]] — fellow US commercial space-safety vendors
- [[concepts/conjunction-screening-providers]] — provider capability comparison table (Beacon row)
- [[synthesis/llm-satellite-operations-six-region]] — ops-AI six-region map; Slingshot MENTAT/Talos in the US "defense-funded vertical SDA copilot" column
- [[concepts/llm-satellite-operations-landscape]] — US-centric ops-AI competitive map (Slingshot row)
- [[synthesis/commercial-space-traffic-management-six-region]] — six-region commercial STM market map
- [[synthesis/space-situational-awareness-six-region]] — national SSA infrastructure (governmental layer)
- [[synthesis/cdm-pc-decisioning]] — where Slingshot Beacon fits in the operator workflow (Tier 2)
