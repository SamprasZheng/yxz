---
type: source
title: "FCC International Bureau Filing System (IBFS) — Portal Documentation"
author: "Federal Communications Commission"
date: "2023-04-11"
ingested: "2026-05-24"
tags: [fcc, ibfs, regulatory, spectrum, satellite, portal, mission-desk, firefly]
---

# FCC IBFS Portal — apps.fcc.gov/ibfsweb

## Source

Primary URL: `licensing.fcc.gov/myibfs/` (current portal, successor to `apps.fcc.gov/ibfsweb`; the older URL still redirects)  
Public mirror / RSS: `fcc.report/IBFS/`  
Open Data catalogue entry: `opendata.fcc.gov/International/International-Bureau-Filing-System-IBFS-/78n9-wprc`  
FCC general page: `fcc.gov/general/international-bureau-filing-system`  
Regulatory codification: 47 CFR Part 1 Subpart Y (International Communications Filing System)

## Overview

The International Bureau Filing System (IBFS) is the FCC's official database, application filing system, and processing platform for all international and satellite services. It was established by rule in 2004 (FR 2004-05-26, Docket 02-179) and is now administered by the [[sources/fcc-space-bureau-2023|Space Bureau]] (created April 2023) for satellite matters and the Office of International Affairs for non-satellite international services.

Effective April 2023, mandatory electronic filing became the default for all applications administered by the International Bureau / Space Bureau, codifying what had been a de facto standard. (FR 2021-10-01, 86 FR 54131.)

## Portal Mechanics

### Access and Authentication
- **Public search**: No authentication required for reading filed documents, checking status, and downloading exhibits
- **Filer access**: Requires an FCC Registration Number (FRN) and password from the Commission Registration System (CORES); log in at `licensing.fcc.gov/myibfs/`
- **Filing availability**: 24/7; filings time-stamped to the millisecond; date/time of filing determines processing order within a [[concepts/processing-round|processing round]]

### Filing Types and Codes
IBFS tracks the following satellite-relevant application types:

| Code prefix | Description | Rule part |
|---|---|---|
| SAT-LOA | Launch and Operate Application (new space station) | Part 25 |
| SAT-MOD | Modification of space station authorization | Part 25 |
| SAT-AMD | Amended application | Part 25 |
| SAT-STA | Special Temporary Authority | Part 25 |
| SAT-PPL | Pioneer Preference Licence petition | Part 25 |
| SAT-T/C | Transfer of control | Part 25 |
| SES-LIC | Earth Station Licence (new) | Part 25 |
| SES-MOD | Earth Station Modification | Part 25 |
| SES-REG | Earth Station Registration | Part 25 |
| ELS / 1903-EX | Experimental (Special Temporary Authority) | Part 5 |

Part 97 amateur space station licenses are handled separately in ULS (Universal Licensing System), not IBFS.

### Public Search Interface
The IBFS public interface supports search by:
- **File number** (e.g., `SAT-LOA-20190704-00057` = Kuiper initial grant application)
- **Call sign** (assigned post-grant, e.g., `S2984`)
- **Applicant / operator name**
- **Application type** (SAT, SES, ELS, etc.)
- **Status** (Pending / Granted / Dismissed / Withdrawn)
- **Date range**

Search results link to individual filing records, which expose the main form data, attached exhibits (including [[concepts/schedule-s|Schedule S]] PDF), and processing history.

### Key IBFS URL Patterns
- Satellite space station filing list: `fcc.report/IBFS/Filing-List/SAT`
- Earth station licence list: `fcc.report/IBFS/Filing-List/SES`
- Earth station licence sub-type: `fcc.report/IBFS/Filing-List/SES-LIC`
- Legacy direct report query (call sign / file number): `licensing.fcc.gov/cgi-bin/ws.exe/prod/ib/forms/reports/swr08b.hts`

## Bulk / Programmatic Data Access

The FCC maintains an official IBFS dataset on its Open Data portal at `opendata.fcc.gov`. Key properties:
- Dataset identifier: `78n9-wprc`
- Format: CSV / JSON via Socrata API
- Fields include: file number, call sign, applicant name, filing type, status, date filed, date granted
- **Limitation**: the Open Data export covers metadata/status fields; it does **not** include the full technical content of [[concepts/schedule-s|Schedule S]] exhibits (antenna patterns, EIRP tables, orbital parameters). Those are available only as PDF attachments on individual IBFS records.

For richer satellite-filing data, `fcc.report/IBFS/` provides:
- RSS feeds per filing type (e.g., SAT, SES) for new-filing notifications
- Individual filing pages linking directly to attached PDF exhibits
- Unofficial but practically complete mirror updated within ~24 hours of IBFS

The FCC's daily IBFS release schedule publishes new public notices and granted authorizations Monday–Friday; the `fcc.report` mirror typically reflects these within the same business day.

## What Agents Can Do with Public IBFS Data

Without any paid subscription, an agent can:
1. **Search by constellation name or call sign** to retrieve the Part 25 grant order and Schedule S exhibits
2. **Download orbital parameters** (altitude, inclination, sat count per plane) from Schedule S PDFs attached to SAT-LOA or SAT-MOD records
3. **Download frequency / EIRP declarations** to reconstruct the link-budget envelope for interference analysis
4. **Monitor RSS feeds** for new SAT-MOD / SAT-AMD filings that signal a neighbour operator modifying their constellation (relevant to the Mission Desk interference-attribution verb)
5. **Retrieve processing round public notices** to understand which applications are under concurrent review

What requires paid services (ITU SNS subscription or commercial spectrum-coordination databases):
- Full ITU API/CR/Notification history and machine-readable coordination status for non-US operators
- Geo-specific coordination upstream filings for non-US licensed operators
- ITU SpaceExplorer cross-network interference analysis tools

## Regulatory Codification

47 CFR Part 1 Subpart Y defines IBFS as the official filing system for international telecommunications services regulated by the FCC. 47 CFR § 1.773 defines mandatory electronic filing requirements.

## Related Pages
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[concepts/schedule-s]]
- [[sources/fcc-space-bureau-2023]]
- [[sources/fcc-part-25-2024]]
- [[concepts/ngso-gso-coordination]]
- [[concepts/processing-round]]
