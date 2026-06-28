---
type: source
tags: [us-equities, leading-indicator, trader-agent, energy, offshore-drilling, data-feed]
title: "Baker Hughes North America & International Rotary Rig Count"
author: "Baker Hughes Company"
date: "1975-01-01"
ingested: "2026-06-01"
---

# Baker Hughes 鑽機數量報告 / Baker Hughes Rig Count

**Publisher:** Baker Hughes Company (BKR)
**Canonical URL:** [rigcount.bakerhughes.com](https://rigcount.bakerhughes.com/)
**North America page:** [rigcount.bakerhughes.com/na-rig-count/](https://rigcount.bakerhughes.com/na-rig-count/)
**International page:** [rigcount.bakerhughes.com/intl-rig-count](https://rigcount.bakerhughes.com/intl-rig-count)
**FAQs:** [rigcount.bakerhughes.com/rig-count-faqs](https://rigcount.bakerhughes.com/rig-count-faqs)

## What Is Counted

The Baker Hughes Rotary Rig Count tracks **active rotary drilling rigs** — units on location and actively drilling ("turning to the right"), from spud to total depth (TD). The count includes only rigs that are significant consumers of oilfield services and excludes cable tool rigs, very small truck-mounted rigs, and rigs operating without a permit. Rigs are classified by:

- **Commodity target:** oil-directed, gas-directed, miscellaneous (includes geothermal)
- **Location:** land, inland waters, **offshore**
- **Drilling method:** horizontal, vertical, directional (US only)

The US count covers the contiguous 48 states, Alaska, and offshore Gulf of Mexico.

## Release Cadence

| Report | Cadence | Release Time |
|---|---|---|
| **North America (US + Canada)** | Weekly | Noon Central Time, **Friday** |
| **International (Worldwide)** | Monthly | Last working day of the **first week of the month** (introduced February 2020) |

The international report was previously monthly on a different schedule; the current cadence has been in effect since February 2020.

## Data Download Formats

Baker Hughes provides Excel spreadsheet downloads containing historical rig count data by region, country, and rig type. These are available directly on the rig count website. The data is also distributed commercially through ICE Developer Portal and cmdtyView Excel.

## What Baker Hughes Does NOT Provide: Dayrates

The Baker Hughes Rig Count measures **active rig count only** — how many rigs are drilling. It does not publish:

- **Dayrates** (the contract price per day for a rig)
- **Utilization rates** (the fraction of available fleet that is contracted)
- **Contract backlog** (forward revenue under contract)

For dayrates and utilization, the authoritative sources are the **drillers' own Fleet Status Reports** (see [[concepts/offshore-drilling-dayrate-indicator]] §Data Sources) and commercial services such as Westwood Global Energy's RigLogix platform.

## Recent Data Point

- **April 2026 international rig count (monthly release, May 1, 2026):** 1,036 total international rigs (down 22 from March, down 51 year-on-year). Offshore count: **229 offshore rigs**, unchanged month-on-month. Land rigs: 807.
- **Worldwide average April 2026:** 1,715 total rigs (down 76 from March 2026).
- **US total (weekly, ~mid-May 2026):** approximately 543–551 active rigs.

## Interpreting the Offshore Split

The Baker Hughes offshore count (International report: 229 as of April 2026) tracks **all active offshore rigs including jackups and semisubmersibles**, not just ultra-deepwater drillships. To isolate the deepwater drillship signal relevant to offshore capex cycles, users must cross-reference with the fleet-status reports and RigLogix. Baker Hughes offshore numbers provide the macro directional read; the driller fleet-status reports provide dayrate and utilization precision.

## See Also

- [[concepts/offshore-drilling-dayrate-indicator]] — full indicator guide cross-referencing this source
- [[sources/lme-copper-data-2026]] — sibling real-economy capex indicator
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent umbrella architecture
