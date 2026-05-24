---
type: source
title: "ITU Radio Regulations Article 22 — EPFD Limits and Resolution 76 (Rev.WRC-23)"
author: "International Telecommunication Union"
date: "2023-11-17"
ingested: "2026-05-24"
tags: [itu, epfd, ngso, regulatory, spectrum, interference, mission-desk, firefly]
---

# ITU Radio Regulations Article 22 — EPFD and Resolution 76

## Source

ITU Radio Regulations Article 22 (current edition, as revised at WRC-23, Nov 2023)  
Resolution 76 (Rev.WRC-23): `itu.int/dms_pub/itu-r/oth/0C/0A/R0C0A0000110050PDFE.pdf`  
ITU EPFD Support site (validation software): `itu.int/epfdsupport/`  
ITU BR IFIC (API/CR publications): `itu.int/en/ITU-R/space/asreceived/Publication/AsReceived`  
ITU Space Network System (SNS): `itu.int/pub/R-SOFT-SNS` (subscription)  
WRS-24 EPFD training slides: `itu.int/en/ITU-R/seminars/wrs/Documents/2024/Space-Workshops/EPFD%20Part%20I%20Overview%20WRS-2024.pdf`

## Overview

**ITU Radio Regulations Article 22** establishes the spectrum-sharing framework between non-geostationary orbit (NGSO) and geostationary orbit (GSO) satellite systems in the Fixed-Satellite Service (FSS) and Broadcasting-Satellite Service (BSS). The key provision is **No. 22.2**: NGSO systems shall not cause unacceptable interference to, and shall not claim protection from, GSO networks.

The operative compliance mechanism is the **[[concepts/epfd-equivalent-power-flux-density|EPFD]]** (Equivalent Power Flux Density) limit framework.

## Article 22 EPFD Limit Tables

Article 22 contains a set of tables specifying the maximum EPFD that an NGSO system may produce at:
- **GSO earth stations** (EPFD↓, downlink): protects GSO FSS and BSS earth stations from NGSO satellite downlink interference
- **GSO space stations** (EPFD↑, uplink): protects GSO satellites from NGSO earth station uplink interference

Key tables (band-dependent; values are illustrative and should be verified against current RR text):

| Table | Direction | Frequency band | Limit |
|---|---|---|---|
| 22-1A | Downlink (EPFD↓) | 10.7–12.75 GHz (FSS/BSS Ku) | −160 to −175 dBW/m²/40 kHz (elevation-angle dependent) |
| 22-1E | Downlink (EPFD↓) | 17.7–19.7 GHz (Ka FSS) | −164 to −175 dBW/m²/MHz |
| 22-2 | Uplink (EPFD↑) | 27.5–30 GHz (Ka uplink) | −170 to −175 dBW/m²/MHz |

The limits are defined as cumulative distribution functions: the NGSO system must not exceed the limit for more than a specified percentage of time (typically 1% or 0.1% depending on the table).

## Resolution 76 (Rev.WRC-23)

**Resolution 76** supplements Article 22 by adding **aggregate EPFD limits** — recognising that when multiple NGSO systems share the same band, their combined EPFD may exceed what any single Article 22 limit was designed for. Key elements:

- **Annex 1, Tables 1A–1D**: Define aggregate limits for the combined downlink/uplink EPFD from all NGSO FSS systems simultaneously operating in a band
- **Coordination mechanism under Resolution 76**: NGSO operators must coordinate with each other to ensure the aggregate stays within the Tables 1A–1D limits. This is the NGSO/NGSO coordination layer (distinct from the NGSO/GSO layer handled by Article 22 itself).
- **"Qualified favorable" finding**: An NGSO system that submits EPFD compliance calculations to the ITU BR using the official EPFD validation software, and receives a finding of compliance, is deemed to have met its Article 22 and Resolution 76 obligations.

## ITU EPFD Validation Software

The ITU provides free EPFD validation software at `itu.int/epfdsupport/`. This tool:
- Runs time-domain simulations of an NGSO constellation against a globally-distributed set of reference GSO earth stations
- Computes the EPFD CDF for each reference GSO location
- Outputs a compliance report with pass/fail status against all applicable Article 22 tables
- Is the required tool for submitting official EPFD compliance evidence to the ITU BR

The software is publicly downloadable and can be run by any operator or researcher — it is a key component of an agent's "what I can do with public data" toolkit.

## ITU Space Network System (SNS)

The **SNS database** is the ITU BR's authoritative registry of satellite network filings — API, CR, and Notification records for all administrations worldwide. Access options:
- **ITU SpaceExplorer** (subscription product): full machine-readable SNS database; required for complete NGSO/GSO coordination status queries across all administrations
- **ITU BR IFIC** (free): published bi-weekly as PDFs; contains newly filed API/CR notices; accessible at `itu.int/en/ITU-R/space/asreceived/Publication/AsReceived` without subscription
- **SNS data dictionary**: `itu.int/en/ITU-R/software/Documents/spaceqry/sns_dbv7.pdf` — describes all SNS data fields; useful for understanding what data the SNS holds even without a subscription

## FCC Integration with ITU Article 22

The FCC's Part 25 rules (47 CFR § 25.146) directly codify Article 22 EPFD limits as a condition of NGSO FSS system grants. The FCC does not establish independent EPFD limits — it adopts the ITU standard by reference. NGSO operators licensed by the FCC must:
1. Demonstrate Article 22 EPFD compliance before or concurrent with licence grant
2. Maintain compliance as their constellation evolves (modification applications that change EIRP, altitude, or inclination must demonstrate continued EPFD compliance)
3. File updated ITU Notifications that reflect any granted modifications

## WRC-23 Changes (Rev. of Resolution 76)

At the World Radiocommunication Conference 2023, Resolution 76 was revised to:
- Update the aggregate EPFD limit tables to account for the significantly larger NGSO constellations now operating (Starlink, OneWeb, Kuiper)
- Clarify the coordination procedure between NGSO operators for aggregate compliance
- Adjust the reference antenna gain pattern assumptions used in EPFD calculations

## Related Pages
- [[concepts/epfd-equivalent-power-flux-density]]
- [[concepts/ngso-gso-coordination]]
- [[concepts/schedule-s]]
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[sources/fcc-part-25-2024]]
- [[concepts/leo-value-chain]]
- [[concepts/orbital-data-center]]
