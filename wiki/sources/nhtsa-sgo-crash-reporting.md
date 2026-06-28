---
type: source
tags: [us-equities, leading-indicator, autonomous-vehicles, regulation, nhtsa, safety]
title: "NHTSA Standing General Order on Crash Reporting (SGO 2021-01)"
author: "National Highway Traffic Safety Administration"
date: "2025-04-24"
ingested: "2026-06-01"
---

# NHTSA 自動駕駛系統事故申報常設命令 (NHTSA Standing General Order on Crash Reporting)

## Canonical URL

[nhtsa.gov/laws-regulations/standing-general-order-crash-reporting](https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting)

Data download (monthly CSV): same page, "SGO Crash Reporting" data section. Public data portal shorthand: **NHTSA.gov/SGOcrashReporting**.

Third Amendment document (April 2025): [nhtsa.gov/sites/nhtsa.gov/files/2025-04/third-amended-SGO-2021-01_2025.pdf](https://www.nhtsa.gov/sites/nhtsa.gov/files/2025-04/third-amended-SGO-2021-01_2025.pdf)

## Overview

NHTSA's Standing General Order 2021-01 (SGO 2021-01) requires identified manufacturers and operators to report to the agency certain crashes involving:

1. **Automated Driving Systems (ADS)** — SAE Level 3, 4, or 5 automation
2. **Level 2 Advanced Driver Assistance Systems (L2 ADAS)** — SAE Level 2 systems where the human remains the nominal driver but automation handles steering and speed simultaneously

This is a mandatory federal reporting requirement, not a voluntary disclosure. It provides NHTSA with real-world safety performance data for both ADS and L2 ADAS technologies across the US fleet.

## Reporting Triggers

### ADS Crashes (Level 3–5)

Must be reported if **all three conditions** are met:
1. Crash occurred on a publicly accessible road in the United States
2. ADS was engaged at **any time during the period from 30 seconds immediately prior to the crash through the conclusion of the crash**
3. Crash resulted in: any injury, a fatality, a vehicle tow-away, an airbag deployment, or property damage

Reporting deadline: **5 calendar days** after the entity has notice of the crash.

### L2 ADAS Crashes (Level 2)

Must be reported if **all three conditions** are met:
1. Crash occurred on a publicly accessible road in the United States
2. L2 ADAS was engaged at **any time during the 30 seconds immediately prior to the crash through the conclusion of the crash**
3. Crash resulted in: any individual transported to a hospital for medical treatment, a fatality, an airbag deployment, or the strike of a vulnerable road user (pedestrian, cyclist, etc.)

Reporting deadline: **5 calendar days**.

## Amendment History

| Version | Date | Key Change |
|---|---|---|
| Original SGO 2021-01 | June 2021 | Established ADS + L2 reporting requirements |
| First Amendment | August 2021 | Clarified scope, entity coverage |
| Second Amendment | 2022 | Expanded property damage threshold |
| Third Amendment | April 24, 2025 (effective June 16, 2025) | Streamlined to "sharpen focus on critical safety information"; removed duplicative requirements; only one reporting entity required per crash unless they have materially different information |

## Coverage

As of the Third Amendment (June 2025), named manufacturers and operators include all major AV and L2 ADAS companies including Waymo, Tesla, Cruise, Amazon (Zoox), GM, Ford, BMW, Mercedes, Volkswagen/Audi, Stellantis, Hyundai, and others.

The SGO covers approximately **50 entities** across both ADS and L2 categories.

## Public Data

NHTSA releases monthly CSV files containing all crash incident reports. Each CSV contains:
- Incident date, time, and location
- Manufacturer / operator name
- System type (ADS vs L2)
- System engagement status at crash
- Crash outcome (injury severity, airbag, VRU strike)
- Summary narrative

**Current data range**: June 16, 2025 – April 15, 2026 (as of latest public release); prior data available from June 2021.

Monthly updates are published approximately 2 weeks after the close of the reporting month.

## How This Feeds the Trader-Agent Signal

For the [[concepts/robotaxi-fsd-regulation-tracker]], NHTSA SGO data functions as a **risk-event monitor**. A cluster of ADS incidents for a specific manufacturer in a market can:
1. Trigger a NHTSA Special Order or investigation
2. Prompt CPUC permit review or suspension (Cruise October 2023 precedent)
3. Generate negative headlines that compress re-rating probability even if the incidents are below threshold

Conversely, a low and stable incident rate across expanding Waymo cities is evidence supporting continued re-rating.

## Relationship to Federal AV Policy

The Trump administration (2025) issued a new federal AV framework aimed at removing FMVSS regulatory barriers for non-standard vehicle designs (e.g., Zoox's purpose-built capsule without a steering wheel). The SGO reporting obligation was separately **not** relaxed — NHTSA proposed in March 2026 a formal rule to codify SGO reporting requirements into the Code of Federal Regulations (Federal Register, March 4, 2026, Docket NHTSA-2021-0070), which would make the obligation permanent and no longer reliant on the General Order mechanism.

## See Also

- [[concepts/robotaxi-fsd-regulation-tracker]] — Primary consumer of this source
- [[sources/ca-dmv-autonomous-vehicle-program]] — State-level vehicle permit authority; upstream of commercial deployment
