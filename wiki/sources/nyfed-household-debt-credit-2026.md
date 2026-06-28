---
type: source
tags: [us-equities, leading-indicator, trader-agent, consumer-credit, autos, macro, delinquency]
title: "NY Fed Quarterly Report on Household Debt and Credit (HHDC) + Consumer Credit Panel"
author: "Federal Reserve Bank of New York, Center for Microeconomic Data"
date: "2026-05-12"
ingested: "2026-06-01"
---

# NY Fed 家庭債務與信用季報 / NY Fed Household Debt and Credit Report — Data Feed

**Producer:** Federal Reserve Bank of New York, Center for Microeconomic Data  
**Report landing page:** [newyorkfed.org/microeconomics/hhdc](https://www.newyorkfed.org/microeconomics/hhdc)  
**Background / methodology:** [newyorkfed.org/microeconomics/hhdc/background.html](https://www.newyorkfed.org/microeconomics/hhdc/background.html)  
**Release calendar:** [newyorkfed.org/microeconomics/calendar.html](https://www.newyorkfed.org/microeconomics/calendar.html)  
**Q1 2026 PDF:** [newyorkfed.org/medialibrary/interactives/householdcredit/data/pdf/HHDC_2026Q1](https://www.newyorkfed.org/medialibrary/interactives/householdcredit/data/pdf/HHDC_2026Q1)

## What It Is

The Quarterly Report on Household Debt and Credit is produced by the NY Fed's **Center for Microeconomic Data** and provides a nationally representative quarterly snapshot of US household borrowing and delinquency. It is derived from the **Consumer Credit Panel (CCP)** — a 5% anonymized random sample of Equifax credit files, covering ~40 million US individuals.

Asset classes tracked: mortgages, HELOCs, auto loans, student loans, credit cards, and other consumer debt.

## Key Data Series for Trader-Agent Monitoring

| Series | What it measures | Frequency |
|---|---|---|
| Auto loan 30+ day transition rate | Share of current auto loans flowing into early delinquency in the quarter | Quarterly |
| Auto loan 90+ day transition rate | Share flowing into serious delinquency | Quarterly |
| Credit card 90+ day transition rate | Leading consumer-stress barometer for prime borrowers | Quarterly |
| Auto loan balance outstanding | Total stock of auto credit; growth signals origination activity | Quarterly |
| Subprime share of originations | % of new auto loans to subprime borrowers; vintage risk signal | Quarterly |

## Publication Cadence

Releases follow a quarterly cadence approximately **6 weeks after quarter-end**:

| Data Quarter | Release Date (2026) |
|---|---|
| Q4 2025 | 2026-02-10 |
| Q1 2026 | 2026-05-12 |
| Q2 2026 | ~August 2026 (check calendar) |

Accompanied by press release at newyorkfed.org/newsevents/news/research and a background press call.

## Most Recent Data Points — Q1 2026 (released 2026-05-12)

| Metric | Q1 2026 | Q1 2025 | Direction |
|---|---|---|---|
| Total household debt | $18.8 trillion | — | Slight rise |
| Auto loan 30+ day delinquency transition | 7.72% | 7.99% | Improved YoY |
| Auto loan 90+ day serious delinquency transition | 2.97% | 2.94% | Roughly flat |
| Headline assessment | "Delinquency transition rates were mostly steady" | — | — |

Notes: The 7.72% auto 30+ day transition rate means ~7.7% of auto loans that were current at the start of Q1 moved into at least 30-days-past-due during the quarter. This is still elevated relative to 2018–2019 pre-pandemic norms (~5–6%), though it moderated from the 2024 peak.

## Consumer Credit Panel (CCP) — Methodology Note

The CCP draws from Equifax data and covers **all credit tiers** (prime through deep subprime). It is the cleanest nationally representative auto-credit dataset available publicly, though it has ~6-week publication lag. It complements the **Fitch subprime auto ABS index** (which covers only securitized subprime pools and publishes faster) by providing a broader population view.

## Interaction with Manheim Collateral Values

Rising subprime auto delinquency → repossession wave → wholesale auction supply increase → downward pressure on MUVVI → lower recovery rates on defaulted ABS collateral → ABS loss severities worsen → credit costs rise for ALLY, COF, SYF originators.

## See Also

- [[concepts/bnpl-subprime-auto-credit-indicator]] — concept page: full interpretation framework
- [[concepts/manheim-used-vehicle-indicator]] — collateral value linkage
- [[sources/cfpb-bnpl-report]] — CFPB BNPL market report (complementary consumer-stress source)
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent umbrella
