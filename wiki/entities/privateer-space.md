---
type: entity
tags: [ssa, satellite-operations, geospatial-ai, space-debris, competitive-intel]
---

# Privateer Space

Privateer is a Honolulu, Hawaii-based space data startup co-founded by Steve Wozniak (Apple co-founder), astrodynamicist **Moriba Jah**, and **Alex Fielding** (CEO). It launched aiming to make orbital space predictable and safe through data fusion and visualization (Wayfinder). In May 2024 it acquired Palo Alto-based geospatial AI firm **Orbital Insight** and raised a $56.5 million Series A.

> **Updated (2025-09):** Privateer has **largely exited the SSA/space-debris market.** Public trackers (Wikipedia, Factories-in-Space) report the **Wayfinder debris solution marked cancelled** as of September 2025, with the company pivoting to **terrestrial data analytics + a ride-share data-tasking marketplace ("Pono")**. This makes Privateer the corpus's canonical **cautionary tale**: a well-funded ($56.5M, Wozniak co-founder), high-profile pure-commercial SSA bet that did **not** find a sustainable standalone-commercial business and retreated — the empirical falsifier behind the "US commercial STM's customer-of-last-resort is the government" thesis in [[synthesis/commercial-space-traffic-management-six-region]].

## Founding and Leadership

- **CEO:** Alex Fielding
- **Co-founder:** Steve Wozniak (Apple co-founder, non-executive role)
- **Founded:** 2021
- **Headquarters:** Honolulu, Hawaii

## Funding

| Round | Amount | Date | Lead |
|---|---|---|---|
| Series A | $56.5M | April 2024 | Aero X Ventures |

Other Series A investors: Lux Capital, BOKA Group, Starburst Ventures, Cameron and Tyler Winklevoss.

## Products and Acquisitions

### Wayfinder

Open-access near real-time visualization of satellites and debris in Earth orbit. Processes disparate tracking data sources to create a comprehensive orbital picture. Free public visualization tool — not a revenue product.

### Orbital Insight Acquisition (April 2024)

Orbital Insight was a geospatial analytics firm previously backed by Sequoia and Google Ventures. Its **TerraScope** platform uses advanced AI and machine learning to process satellite imagery, cell phone location data, and other geospatial feeds. Post-acquisition, TerraScope is being integrated with Wayfinder to fuse orbital awareness with geospatial intelligence.

### Ride-sharing Spacecraft

⚠️ **Unconfirmed status**: Privateer has announced a ride-sharing spacecraft concept to reduce orbital clutter (described in Space.com coverage). No confirmed launch date or operational deployment as of 2026.

## Technical Approach

Privateer's AI capabilities post-acquisition center on:
- TerraScope's geospatial ML (object recognition in satellite imagery, mobility pattern analysis)
- SSA data fusion (Wayfinder data engine combining tracking catalogs)
- AI-enhanced data processing for "cross-domain intelligence from sea to space"

⚠️ **LLM or conversational AI integration not publicly documented.** Privateer's AI is geospatial ML and data fusion, not LLM-based reasoning or natural-language telemetry interfaces.

## Relevance to Spacesharks Mission Desk

Privateer's most relevant overlap with [[synthesis/spacesharks-mission-desk-hackathon-plan]] is the **orbital data fusion** angle — combining multiple data types into a unified picture. However:
- Privateer focuses on debris/collision risk visualization (SSA), not operator decision-making per satellite lifecycle
- The Orbital Insight acquisition adds geospatial intelligence (Earth observation analysis), not satellite health monitoring
- No evidence of the NOTAM/SWPC/CDM lifecycle fusion that defines the Spacesharks moat

The company's revenue model (custom solutions + self-serve subscriptions + data revenue share with satellite owners) is more analogous to a data platform than an ops assistant.

## Correction to Owner's Intel Briefing

The owner's brief stated Privateer "bought Saber Astronautics' Predict in 2024." This is INCORRECT:
- Privateer acquired **Orbital Insight** (geospatial analytics), NOT Saber Astronautics
- Saber Astronautics is an independent Australian space operations company (WINDU AI platform for SSA)
- No product called "Predict" was involved in any Privateer transaction

## Commercial-Market Position (six-region)

Privateer is the **negative data point** in the US commercial space-safety market: it occupied the Tier-1/Tier-2 boundary (free Crow's Nest CDM tool + Wayfinder visualization) but, unlike [[entities/slingshot-aerospace|Slingshot]] (TraCSS-anchored) and [[entities/kayhan-space|Kayhan]] (subscription + gov), never secured a government demand floor and exited. Its trajectory is the strongest evidence for the synthesis claim that this market is **government-anchored, not free-market** — and a contrast to Japan's [[entities/aiko-space|AIKO]]/Astroscale, which stayed agency-anchored and survived. Full market structure: [[synthesis/commercial-space-traffic-management-six-region]].

## See Also

- [[concepts/llm-satellite-operations-landscape]] — full competitive map
- [[concepts/conjunction-screening-providers]] — provider capability table (Wayfinder/Crow's Nest row)
- [[entities/slingshot-aerospace]] · [[entities/kayhan-space]] · [[entities/cognitive-space]] — fellow US commercial space-safety vendors
- [[entities/leolabs]] — commercial tracking provider (the Tier-1 layer Privateer leaned on)
- [[synthesis/commercial-space-traffic-management-six-region]] — six-region commercial STM market map (Privateer = the falsifier)
- [[synthesis/space-situational-awareness-six-region]] — national SSA infrastructure layer
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Spacesharks canonical plan
