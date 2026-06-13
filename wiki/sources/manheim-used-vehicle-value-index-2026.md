---
type: source
tags: [us-equities, leading-indicator, trader-agent, consumer-credit, autos, wholesale-prices, inflation]
title: "Manheim Used Vehicle Value Index — Methodology & Data Feed"
author: "Cox Automotive / Manheim Consulting"
date: "2026-01-08"
ingested: "2026-06-01"
---

# Manheim 二手車指數資料來源 / Manheim Used Vehicle Value Index — Data Feed

**Producer:** Cox Automotive (Manheim division), Atlanta GA  
**Landing page:** [site.manheim.com — Used Vehicle Value Index](https://site.manheim.com/en/services/consulting/used-vehicle-value-index.html)  
**Monthly insights hub:** [coxautoinc.com/insights/manheim-insights/](https://www.coxautoinc.com/insights/manheim-insights/)  
**2026 release calendar PDF:** [coxautoinc.com/wp-content/uploads/2025/12/2026-Manheim-Used-Vehicle-Value-Index-Release-Dates.pdf](https://www.coxautoinc.com/wp-content/uploads/2025/12/2026-Manheim-Used-Vehicle-Value-Index-Release-Dates.pdf)

## What It Is

The Manheim Used Vehicle Value Index (MUVVI, or UVVI) is the US industry benchmark for **wholesale used-vehicle prices**. It is derived from statistical analysis of Manheim's database of over 5 million annual used-vehicle transactions at Manheim auction lanes across North America.

The index baseline is **January 1997 = 100** (revised from original 1995 base for accuracy).

## Methodology

Three adjustments are applied to strip out compositional noise and produce a price-pure signal:

| Adjustment | What it removes |
|---|---|
| **Mix adjustment** | Changes in the vehicle-type mix being sold (e.g. more trucks in one month) |
| **Mileage adjustment** | Differences in accumulated mileage across the auction cohort |
| **Seasonal adjustment** | Normal intra-year price cycles (spring surge, late-year softness) |

The resulting index measures **pure price movement** independent of which vehicles are flowing through lanes. This is why MUVVI leads the CPI used-cars-and-trucks component: Manheim clears at wholesale roughly 60–90 days before retail re-titling, and the BLS CPI component follows used-retail with a further lag.

## Publication Cadence

- **Official monthly release:** 5th business day of each month, 9:00 AM ET. URL pattern: `coxautoinc.com/insights/[month]-[year]-muvvi/` or `coxautoinc.com/insights-hub/q[N]-[year]-muvvi/` for quarterly summaries.
- **Mid-month checkpoint:** Published roughly mid-month (around the 15th–18th). The mid-month number is explicitly **not** an official reading and should not be compared directly to the official index level; it is a directional checkpoint only.

## Most Recent Data Points (verified 2026-06-01)

| Period | MUVVI Level | YoY Change | Notes |
|---|---|---|---|
| March 2026 (Q1 close) | 215.3 | +6.2% | Highest since summer 2023; spring surge |
| Mid-April 2026 | 213.0 | +2.3% | First 15 days of April vs March: −1.1% |
| Mid-May 2026 | 213.1 | +3.8% | Conversion 61.3%; wholesale days supply 26 days |
| December 2025 | 205.5 | +0.4% | Full-year 2025 YoY = +0.4%, below 2.3% LT avg |

Additional Q1 2026 sub-metrics:
- **Retail days supply (March 2026):** below 40 days, lowest in 2026, down YoY — indicating tight new-to-used pipeline
- **Auction conversion rate (March 2026):** 68.2%, +4.6 pp above the 3-year March average; +5.5 pp vs February's revised 62.7%
- **EV wholesale volume (Q1 2026):** ~37,000 units — record Q1; over 100,000 used EVs sold retail (second-best quarter on record)

## Companion Sub-Metrics to Track

Beyond the headline index, the monthly release contains:

- **Retail days' supply** — inventory at franchised and independent dealers divided by daily sales rate; sub-40 days signals absorption pressure
- **Auction conversion rate** — share of cars offered at auction that actually sell; >65% is a hot market, <55% is soft
- **MMR (Manheim Market Report)** — the real-time per-vehicle wholesale pricing benchmark used by dealers (distinct from the aggregate index)

## CPI Lead Relationship

Manheim UVVI wholesale clearing → retail used-car pricing (60–90 day lag) → BLS CPI "Used cars and trucks" component (monthly, same lag structure). The CPI component has been the single largest swing factor in core CPI during 2021–2023. Monitoring MUVVI gives ~2-month forward visibility on core CPI upside or downside pressure.

## See Also

- [[concepts/manheim-used-vehicle-indicator]] — concept page: interpretation framework, bull/bear reads, representative tickers
- [[concepts/bnpl-subprime-auto-credit-indicator]] — related consumer-stress signal
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent umbrella
