---
type: source
title: "47 CFR Part 25 — Satellite Communications"
author: "Federal Communications Commission"
date: "2024-01-01"
ingested: "2026-05-24"
tags: [fcc, ibfs, regulatory, spectrum, satellite, part-25, part-5, mission-desk, firefly]
---

# 47 CFR Part 25 — Satellite Communications Rules

## Source

Primary codification: `ecfr.gov/current/title-47/chapter-I/subchapter-B/part-25`  
Part 25 licensing process overview: `fcc.gov/part-25-space-station-licensing-process-and-timeline`  
Processing FAQ: `fcc.gov/space/faq-processing-space-station-applications`  
Part 5 experimental: `fcc.gov/space/part-5-experimental-licensing`  
Part 25 licence + market access checklist: `fcc.gov/part-25-space-station-license-and-market-access-checklist`  
Small satellite licensing: `fcc.gov/space/small-satellite-and-small-spacecraft-licensing-process`

## Overview

47 CFR Part 25 is the FCC rule governing the regulation of most non-federal commercial satellite activities in the United States. It is administered by the [[sources/fcc-space-bureau-2023|Space Bureau]] and covers:
- Space station licensing (GSO and NGSO)
- Earth station licensing (hub, gateway, consumer VSAT, mobile satellite)
- Technical standards for EIRP, PFD, EPFD, and interference protection
- Orbital debris mitigation requirements
- ITU coordination filing obligations
- Small satellite and small spacecraft licensing (added post-2018 streamlining)

## License Types under Part 25

### Standard Part 25 Space Station License
Application: FCC Form 312 Main Form + [[concepts/schedule-s|Schedule S]]  
Filing code: SAT-LOA (Launch and Operate Application)  
License term: **15 years**  
Processing timeline: 6–9 months for a "straightforward, uncontested" GSO application; longer for NGSO constellations subject to a [[concepts/processing-round|processing round]], where review may extend 12–24+ months

Required attachments:
- Schedule S (orbital / frequency / EIRP data)
- Orbital debris mitigation plan
- ITU network filing preparation materials (the FCC will use these to submit the API to the ITU BR)
- EPFD compliance analysis (for NGSO systems)

### Small Satellite License
For satellites with mass ≤ 180 kg in orbits below 600 km altitude (with exceptions), lifetime ≤ 10 years  
License term: **6 years** (shorter than standard)  
Reduced filing fees  
Expedited processing: typically 3–6 months  
Filing code: SAT-LOA with small satellite election on Form 312

### Small Spacecraft License
Broader than small satellite — includes non-propulsive CubeSats and similar  
Same 6-year term and reduced fee structure

### Earth Station Authorizations
- SES-LIC: New earth station license (gateway, hub, VSAT network)
- SES-MOD: Modification
- SES-REG: Registration under blanket license
- Applicants file FCC Form 312 Main Form + Schedule B (for FSS earth stations)

## Part 25 vs. Part 5 — When Each Applies

| Criterion | Part 25 | Part 5 (Experimental) |
|---|---|---|
| Purpose | Commercial operations, market trials at scale | Experimentation, product development, concept demos |
| Commercial service allowed | Yes | No (no fees, no payments for services) |
| License term | 15 years (standard) / 6 years (small sat) | 2–5 years |
| Processing timeline | 6–9 months+ | File 3–6 months before launch; no earlier than 12 months |
| Experiment duration | N/A | STA (≤6 months): Form 312; Longer: Form 442 |
| ITU filing required | Yes, with API submission | Yes (must file ITU coordination data and orbital debris plan before grant) |
| EPFD compliance | Required for NGSO in shared bands | Required if operating in Part 25 NGSO frequency bands |
| Fee structure | Standard Part 25 application fees | Lower experimental fees |
| Path to commercial | N/A — is the commercial path | Must re-apply under Part 25 for commercial service |

**Key decision rule**: if the satellite will provide any commercial service, charge any fee, or operate beyond 5 years, Part 25 is required. Part 5 is for bona-fide testing and demonstration only.

## Technical Standards (Key Provisions)

- **47 CFR § 25.208**: Power flux density limits (GSO / NGSO received PFD at Earth's surface)
- **47 CFR § 25.209**: Earth station antenna performance standards
- **47 CFR § 25.210**: Space station antenna performance and EIRP
- **47 CFR § 25.146**: NGSO FSS EPFD compliance — codifies ITU Article 22 EPFD limits into FCC rules; NGSO systems must demonstrate compliance before grant
- **47 CFR § 25.283**: End-of-life disposal requirements (deorbit within 5 years for LEO below 2,000 km; passivation; collision avoidance)

## Processing Timeline for NGSO Constellations

For a large NGSO constellation in shared Ku/Ka bands:
1. Application filed (SAT-LOA) → enters [[concepts/processing-round|processing round]] queue
2. Public notice issued (typically 30-day comment period)
3. Pleading cycle and technical review (months to years for contested cases)
4. Grant or partial grant order published in the Federal Register
5. ITU API submission by FCC Space Bureau (can precede grant to establish priority)
6. ITU coordination (API → CR → N): 12–36+ months for large NGSO systems
7. ITU Notification registered in Master Register

The Kuiper initial grant (Jul 2020) demonstrates a relatively swift NGSO grant; the SpaceX Gen2 saga (2022–2024 for partial grants) illustrates protracted processing rounds.

## 2024–2025 Modernisation Proposals

The FCC's *Space Modernization for the 21st Century* NPRM (FCC 24-97, Dec 2024) proposed:
- Replacing Schedule S with **Schedule O** (orbital) and **Schedule F** (frequency)
- Implementing **intake meetings** for new constellation applications to align expectations early
- **Expedited processing** for straightforward cases (target: < 6 months for uncontested GSO)
- Reforming milestone conditions to reduce constellation warehousing

These were proposals as of the ingest date; final rules had not been adopted.

## Related Pages
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[sources/fcc-ibfs-portal-2023]]
- [[sources/fcc-space-bureau-2023]]
- [[concepts/schedule-s]]
- [[concepts/processing-round]]
- [[concepts/ngso-gso-coordination]]
- [[concepts/epfd-equivalent-power-flux-density]]
