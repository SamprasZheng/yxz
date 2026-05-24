---
type: source
title: "FCC Constellation Rulings — Starlink Gen2 (2022/2024), Kuiper (2020), AST SpaceMobile (2024)"
author: "Federal Communications Commission"
date: "2024-11-26"
ingested: "2026-05-24"
tags: [fcc, ibfs, regulatory, spectrum, ngso, starlink, kuiper, ast-spacemobile, processing-round, mission-desk]
---

# FCC Constellation Rulings 2020–2024

This source page collects the key FCC grant orders for the major NGSO constellations, which together establish the current regulatory landscape for Ku/Ka/V spectrum sharing and direct-to-device services. These rulings are the most directly relevant IBFS precedents for interference-coordination analysis by NemoClaw/Firefly agents.

## Starlink Gen2 — Partial Grant (December 2022)

**Docket**: FCC 22-91  
**Document**: `docs.fcc.gov/public/attachments/FCC-22-91A1.pdf`  
**Release date**: December 1, 2022  
**FCC IBFS announcement**: `fcc.gov/document/fcc-partially-grants-spacex-gen2-broadband-satellite-application`

The FCC granted SpaceX authority to construct, deploy, and operate up to **7,500 NGSO satellites** using Ku- and Ka-band frequencies as part of its second-generation Starlink LEO constellation (Gen2). This was a **partial grant** — the larger Gen2 constellation proposal (originally up to ~30,000 satellites) was deferred in part pending further review.

Key conditions attached to the grant:
- Milestone: deploy and operate 50% of the 7,500 satellites within 6 years of grant; remainder within 9 years
- EPFD compliance certification required
- Orbital debris mitigation plan approved
- Altitude constraints: Gen2 shells authorised at 340 km, 345 km, 360 km, 525 km, 530 km, and 535 km (specific RAAN/inclination combinations)

This grant was the outcome of the **2020 Ku/Ka-band NGSO [[concepts/processing-round|processing round]]**, which also included Kuiper and OneWeb modification applications.

## Starlink Gen2 V-Band / E-Band Partial Grant (November 2024)

**Docket / Document**: DA-24-1193  
**Document URL**: `docs.fcc.gov/public/attachments/DA-24-1193A1.pdf`  
**Release date**: November 26, 2024  
**FCC IBFS announcement**: `fcc.gov/document/partial-grant-spacex-gen2-application-allow-e-band-operations`

SpaceX filed Gen2 modification applications on December 6, 2022 (amended February 7, 2023 and September 23, 2024). The Space Bureau granted these in November 2024, authorising:
- V-band (37.5–42 GHz downlink / 47.2–51.4 GHz uplink) operations
- E-band operations at altitudes of **340–360 km**
- The grant resolved the deferred portions of FCC-22-91 regarding V/E-band spectrum

## Amazon Kuiper — Initial Part 25 Grant (July 2020)

**File Number**: SAT-LOA-20190704-00057  
**Document**: FCC 20-102 (`docs.fcc.gov/public/attachments/FCC-20-102A1.pdf`)  
**Release date**: July 30, 2020  
**FCC IBFS announcement**: `fcc.gov/document/fcc-authorizes-kuiper-satellite-constellation`

The FCC granted Amazon's Kuiper Systems LLC authority to deploy and operate a **3,236-satellite NGSO constellation** in Ka-band. Key parameters:
- Altitude shells: approximately 590 km (28.5° inclination, 784 satellites), 610 km (33° inclination, 1,296 satellites), 630 km (51.9° inclination, 1,156 satellites)
- Ku/Ka-band FSS service
- Milestone: 50% deployment within 6 years of grant; 100% within 9 years
- Later modified to 3,232 satellites (slight adjustment to orbital shell counts)

Kuiper's initial grant preceded the 2020 processing round; it was the product of an earlier NGSO processing window specifically for Ka-band systems.

### Kuiper Modification (March 2024)
**Document**: DA-24-224 (March 8, 2024)  
Kuiper filed SAT-MOD applications to revise orbital parameters (altitude, inclination adjustments). The Space Bureau granted-in-part, approved revised orbital shells, and maintained milestone conditions.

## OneWeb — Expedited Partial Grant (September 2022)

**Document**: DA-23-362 (filed under the same 2020 processing round)  
On September 16, 2022, the Satellite Division granted OneWeb's request for an **expedited partial grant** for its constellation modification, deferring certain aspects pending completion of the full processing round review.

OneWeb operates a 648-satellite constellation at approximately 1,200 km altitude, primarily Ku-band, with subsequent modifications expanding the planned constellation to ~6,372 satellites ("OneWeb Gen 2" proposals still in processing as of the ingest date).

## AST SpaceMobile — Direct-to-Device SCS Authorization (2024)

**FCC announcement**: `fcc.gov/document/fcc-authorizes-ast-provide-supplemental-coverage-space`  
**Amendment date**: March 11, 2024 (AST changed from market-access request to US-licence request)  
**Block 1 launch**: September 12, 2024 (five "Bluebird" satellites)  
**DA-24-756**: Space Bureau initial SCS authorization document

AST SpaceMobile received authorization to deploy a **248-satellite constellation** and provide **Supplemental Coverage from Space (SCS)** — direct-to-device cellular broadband using existing unmodified mobile handsets. Key details:
- Frequency bands: 698–716 MHz / 728–746 MHz (700 MHz LTE), 824–849 MHz / 869–894 MHz (cellular 850 MHz), S-band / UHF TT&C
- Partners: AT&T, Verizon, FirstNet (MSS terrestrial-component framework)
- The authorization represents the FCC's first operational direct-to-device LEO cellular network grant in the US
- Subject to additional approvals as the constellation scales (August 2025 grant extended Ka/V-band operations at 45.5–47 GHz for uplink)

This ruling is significant for spectrum coordination because it authorises a LEO satellite to provide services in **cellular bands** that were not traditionally associated with Part 25 satellite services, requiring coordination with terrestrial wireless licensees as well as other satellite operators.

## Interference-Attribution Implications

These four rulings together define the dominant NGSO operators in Ku/Ka and V-band spectrum over the US and globally. For the [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]] interference-attribution verb:
- Starlink Gen2 (7,500 sats + V-band expansion) and Kuiper (3,232 sats) represent the two largest co-frequency NGSO sources in Ku/Ka bands
- Their respective IBFS file numbers and call signs are the first lookup targets when a downlink anomaly is observed at a LEO orbital data center
- AST SpaceMobile's cellular-band operations add a new interference source type (L-band / UHF / 700 MHz) not previously present in the LEO FSS environment

## Related Pages
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[sources/fcc-ibfs-portal-2023]]
- [[sources/fcc-part-25-2024]]
- [[concepts/processing-round]]
- [[concepts/ngso-gso-coordination]]
- [[concepts/epfd-equivalent-power-flux-density]]
- [[concepts/schedule-s]]
- [[entities/starcloud]]
- [[concepts/orbital-data-center]]
