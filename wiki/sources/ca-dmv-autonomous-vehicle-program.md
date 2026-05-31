---
type: source
tags: [us-equities, leading-indicator, autonomous-vehicles, regulation, california, dmv]
title: "California DMV Autonomous Vehicle Program"
author: "California Department of Motor Vehicles"
date: "2025-11-01"
ingested: "2026-06-01"
---

# California DMV 自動駕駛車輛計畫 (California DMV Autonomous Vehicle Program)

## Canonical URL

[dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/](https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/)

Permit-holders list: [dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/autonomous-vehicle-testing-permit-holders/](https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/autonomous-vehicle-testing-permit-holders/)

Regulations page: [dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/california-autonomous-vehicle-regulations/](https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/california-autonomous-vehicle-regulations/)

## Program Overview

The California DMV administers AV testing and deployment permits under California Vehicle Code. It is the upstream regulatory authority for vehicle authorization; a separate CPUC permit is required before any company can charge fares (paid passenger service). The two systems are sequential: DMV deployment permit is a prerequisite for applying for a CPUC deployment permit.

## Three-Tier Permit Ladder

| Tier | Permit Name | Description | Key Requirement |
|---|---|---|---|
| 1 | Testing with a Safety Driver | AV operates on public roads with a licensed human operator ready to take control; data collection and development only; no commercial passengers | No minimum mileage to begin; safety plan required |
| 2 | Driverless Testing Permit | AV operates on public roads without any occupant; no commercial passengers; no fares | 50,000 miles under Tier 1 permit (10,000 for low-speed vehicles); safety case submission |
| 3 | Autonomous Vehicle Deployment Permit | AV may carry passengers on public roads without a safety driver; commercial deployment authorized; prerequisite for CPUC paid-fare permit | Additional 50,000 miles under Tier 2 (10,000 for low-speed; 250,000 for heavy-duty trucks GVWR ≥10,001 lb) |

**Safety case requirement (2025 regulations)**: All applicants must submit a comprehensive safety case covering functional safety, safety of the intended function, AI safety, cybersecurity, and operational safety.

## 2025 Regulatory Update

New CA AV regulations (effective 2025) made two significant changes:
1. **Heavy-duty trucks authorized**: Removed the prohibition on AVs with GVWR ≥ 10,001 lb — opens CA market to autonomous freight. Heavy-duty trucks require 250,000 miles per authorization tier.
2. **Transit vehicles included**: AV transit operations now explicitly covered.

Source: [CA DMV news release](https://www.dmv.ca.gov/portal/news-and-media/new-autonomous-vehicle-regulations-strengthen-oversight-and-enforcement-authorize-trucks-and-transit/)

## Current Permit Counts (as of November 2025)

- Drivered testing permits: **30 companies**
- Driverless testing permits: **6 companies**
- Deployment permits: **3 companies**

The gap between 30 drivered-testing holders and 3 deployment permit holders reflects the mileage-accumulation and safety-case barrier at each rung.

## Relationship to CPUC Authority

The CA DMV deployment permit authorizes the vehicle to operate commercially. However, it **does not** authorize fare collection. A separate California Public Utilities Commission (CPUC) permit is required:

- **CPUC Drivered Deployment Permit**: paid passengers, safety driver present
- **CPUC Driverless Deployment Permit**: paid passengers, no in-vehicle operator; requires remote operator communication link

Waymo (San Francisco/San Mateo County) and Cruise (operations suspended) hold CPUC Driverless Deployment Permits. Waymo's permit survived a 2025 Court of Appeal challenge (City and County of San Francisco v. Public Utilities Commission, A169262).

CPUC program URL: [cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/autonomous-vehicle-programs](https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/autonomous-vehicle-programs)

## Monitoring Instructions

To track new permit issuances:
1. Check [permit-holders page](https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/autonomous-vehicle-testing-permit-holders/) for additions/removals.
2. Monitor [CA DMV news and media](https://www.dmv.ca.gov/portal/news-and-media/) for press releases on new regulation or significant permit grants.
3. Cross-check CPUC advice letters at [cpuc.ca.gov](https://www.cpuc.ca.gov) for paid-service permit additions.

## See Also

- [[concepts/robotaxi-fsd-regulation-tracker]] — Concept page consuming this source; three-gate re-rating framework
- [[sources/nhtsa-sgo-crash-reporting]] — NHTSA crash data source; complementary federal monitor
