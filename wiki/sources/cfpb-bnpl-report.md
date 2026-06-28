---
type: source
tags: [us-equities, leading-indicator, trader-agent, consumer-credit, bnpl, fintech, delinquency]
title: "CFPB Buy Now, Pay Later Market Report (2025-12)"
author: "Consumer Financial Protection Bureau (CFPB)"
date: "2025-12-10"
ingested: "2026-06-01"
---

# CFPB BNPL 市場報告 / CFPB Buy Now, Pay Later Market Report

**Producer:** Consumer Financial Protection Bureau (CFPB)  
**Report landing page:** [consumerfinance.gov — The Buy Now, Pay Later Market](https://www.consumerfinance.gov/data-research/research-reports/the-buy-now-pay-later-market/)  
**December 2025 PDF (direct):** [files.consumerfinance.gov/f/documents/cfpb_bnpl-market-report_2025-12.pdf](https://files.consumerfinance.gov/f/documents/cfpb_bnpl-market-report_2025-12.pdf)  
**January 2025 companion report (unsecured debt):** [files.consumerfinance.gov/f/documents/cfpb_BNPL_Report_2025_01.pdf](https://files.consumerfinance.gov/f/documents/cfpb_BNPL_Report_2025_01.pdf)  
**March 2023 consumer-use survey:** [files.consumerfinance.gov/f/documents/cfpb_consumer-use-of-buy-now-pay-later_2023-03.pdf](https://files.consumerfinance.gov/f/documents/cfpb_consumer-use-of-buy-now-pay-later_2023-03.pdf)

## What It Is

The CFPB BNPL Market Report is a periodic examination of the US Buy Now, Pay Later industry, drawing on **supervisory data collected from six large BNPL providers**: Affirm, Afterpay, Klarna, PayPal, Sezzle, and Zip. It covers market volume, borrower financial profiles, late fee incidence, and charge-off rates. The December 2025 edition is the most comprehensive market-level BNPL dataset publicly available.

## Key Findings — December 2025 Report (2023 data, released 2025-12)

| Metric | Value | YoY trend |
|---|---|---|
| Total BNPL loans originated | 335.8 million | Rising |
| Total BNPL GMV | $45.2 billion | Rising |
| Average loan size | $135 (inflation-adjusted) | Declining (smaller tickets) |
| Users (unique borrowers) | 53.6 million | Rising |
| Average loans per user per lender | 6.3 | Rising |
| Average annual BNPL per user | $848 (inflation-adjusted) | Rising |
| Charge-off rate (% of loans) | 1.83% (down from 2.63% in 2022) | Improving |
| Charged-off dollars as % of GMV | 0.92% | Lowest in 5-year window |
| Loans assessed a late fee | 4.1% (down from 5.2% in 2022) | Improving |
| Late fee revenue as % of GMV | 0.18% | Improving |

## Borrower Financial Profile — Key Risk Signal

The CFPB's companion borrower-profile report highlights the **stacking and co-delinquency risk**:

- 18% of BNPL borrowers had at least one reported delinquency in another credit account, versus 7% of non-BNPL borrowers — more than **2.5× higher background delinquency rate**
- Credit card delinquency rate: 9% for BNPL borrowers vs 3% for non-borrowers
- Retail card delinquency rate: 8% vs 1%

This co-delinquency pattern is the analytical basis for treating BNPL delinquency as a **leading edge of consumer stress**: BNPL borrowers skew lower-income and subprime, and their delinquency often precedes conventional credit card 90-day delinquency by 1–2 quarters.

## Publication Cadence

CFPB BNPL market reports are **periodic, not regular quarterly releases**. Major editions to date:
- March 2023: consumer-use survey (Making Ends Meet)
- January 2025: unsecured debt companion
- December 2025: full market report (most recent as of 2026-06-01)

Practitioners supplement CFPB data with Affirm's quarterly earnings (SEC EDGAR 8-K) and Fitch Auto ABS index for real-time delinquency tracking.

## Relationship to Affirm Public Data

Affirm (AFRM) reports 30+ day delinquency rates in its quarterly shareholder letters (filed via SEC 8-K). As of Affirm FQ3'26 (calendar Q1 2026):
- 30+ day delinquency rate: **2.8%** (excluding Peloton/Pay in X), +29 bps YoY, +7 bps QoQ
- Allowance for credit losses as % of loans held for investment: **6.0%**
- Expected ultimate net charge-offs on recent monthly installment cohorts: ~**3.5% of cohort GMV**

Note: Affirm delinquency is structurally lower than bank-card delinquency because BNPL loans are short-duration (4–12 weeks for Pay in 4), reducing 90-day accumulation. The correct comparison is charge-off rate as % of GMV, not headline delinquency rate.

## Limitation / Caveat

The December 2025 CFPB report covers **2023 performance data** — roughly a 2-year publication lag. For real-time BNPL delinquency stress signals, practitioners rely on Affirm/PayPal/Klarna quarterly earnings filings, not the CFPB report. The CFPB report's value is its cross-lender market-wide view and the borrower co-delinquency profiling, which earnings calls do not provide.

## See Also

- [[concepts/bnpl-subprime-auto-credit-indicator]] — concept page: full interpretation framework
- [[sources/nyfed-household-debt-credit-2026]] — complementary aggregate auto-loan delinquency source
- [[concepts/manheim-used-vehicle-indicator]] — collateral value linkage
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent umbrella
