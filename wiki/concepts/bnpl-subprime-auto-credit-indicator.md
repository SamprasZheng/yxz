---
type: concept
tags: [us-equities, leading-indicator, trader-agent, consumer-credit, bnpl, autos, delinquency, subprime, fintech]
---

# BNPL / 次級車貸違約指標 / BNPL & Subprime Auto-Loan Delinquency — Leading Indicator

BNPL delinquency and subprime auto-loan delinquency form the **earliest consumer-stress leading edge** in the US consumer credit complex. Because BNPL borrowers and subprime auto borrowers are disproportionately lower-income and have less financial buffer, deterioration in these two segments **precedes** prime credit-card delinquency by approximately 1–3 quarters. They are the canary, not the crisis.

This concept page covers two related but distinct signals that are monitored together because they share the same borrower demographic and the same reporting infrastructure.

## Why These Lead

### BNPL Delinquency as a Leading Edge

BNPL (Buy Now, Pay Later) loans are structurally short-duration (typically 4–12 weeks for "Pay in 4" products, or 3–36 months for longer-term installment). Because the loan cycle is short, stress in a consumer cohort shows up quickly. BNPL borrowers disproportionately come from the bottom income quartiles: the CFPB found 18% of BNPL borrowers had at least one delinquency in another credit account vs 7% of non-BNPL borrowers — a 2.5× co-delinquency rate. This means BNPL delinquency is a **leading population-level signal** for the subprime and near-prime consumer.

### Subprime Auto-Loan ABS Delinquency as the Clearest Structural Signal

Subprime auto ABS pools are securitizations of auto loans made to borrowers with FICO scores typically below 620. Fitch Ratings publishes a monthly 60+ day delinquency index for these pools that is the most widely followed structural-credit barometer in the auto sector. Because subprime borrowers have no savings buffer, their delinquency responds fastest to income shocks, rate resets, or expense increases. The subprime auto ABS 60-day index has historically been 3–6 months **ahead of** prime-credit-card 90-day delinquency rates as a recession-onset signal.

The **critical asymmetry**: only ~15% of the $1.68 trillion in outstanding US auto loans are subprime/deep-subprime, so aggregate systemic impact is bounded — but the margin signal for auto lenders (ALLY, COF) is disproportionate.

## What to Watch — Sub-Metrics Defined

### 1. BNPL Charge-Off Rate (% of GMV)
- **What it is:** Loans written off as uncollectable, expressed as a percentage of gross merchandise value originated. The CFPB reports this annually; AFRM reports quarterly cohort charge-offs.
- **Key benchmark:** CFPB market-wide rate was 0.92% of GMV in 2023 (down from 1.83% of loan count). Affirm's recent monthly installment cohorts tracking ~3.5% ultimate net charge-offs as % of cohort GMV.
- **Trigger:** A sustained rise in AFRM quarterly 30+ day delinquency above 3.5% (current: 2.8%) would indicate cohort deterioration.

### 2. BNPL 30/60/90-Day Delinquency (Affirm as proxy)
- **What it is:** Share of outstanding BNPL loans that are 30+, 60+, or 90+ days past due. Affirm reports 30+ day rates (excluding Peloton and Pay in X products) in quarterly 8-K shareholder letters.
- **Current level (Affirm FQ3'26 = calendar Q1 2026):** 2.8% (30+ day), +29 bps YoY, +7 bps QoQ. Allowance for credit losses: 6.0% of loans held for investment.
- **Note:** BNPL delinquency rates are structurally lower than credit-card delinquency because Pay-in-4 products are so short-duration that 90-day delinquency is rare — use charge-off rate or allowance-to-loan ratio for cross-product comparisons.

### 3. Subprime Auto ABS 60+ Day Delinquency (Fitch Index)
- **What it is:** Fitch Ratings' monthly index of 60+ day delinquency rates across subprime auto securitization trusts. Published monthly, based on servicer remittance data.
- **Current level (January 2026, Fitch):** **6.90%** — a 32-year (385-month) record high as of January 1994 series start. February 2026: edged down to 6.80%. Full-year 2025: 6.18% (per S&P Global Ratings confirmation), up from 5.78% in 2024.
- **Prime ABS comparison:** Prime auto ABS 60+ day delinquency held at 0.42% in the same period — a 16× spread. The spread ran >10× throughout 2025.
- **Why this matters for lenders:** Loss severity = (1 − recovery rate). Recovery rate is directly linked to Manheim UVVI wholesale auction prices on repossessed vehicles (see [[concepts/manheim-used-vehicle-indicator]]). When MUVVI falls while delinquency rises, loss severity and loss frequency compound simultaneously.

### 4. NY Fed Auto Loan 90+ Day Delinquency Transition Rate (CCP)
- **What it is:** Quarterly NY Fed Consumer Credit Panel measure of the share of current auto loans that flow into 90+ days serious delinquency in the quarter.
- **Current level (Q1 2026):** 2.97% — roughly flat with 2.94% in Q1 2025. The 30+ day transition improved to 7.72% from 7.99% a year earlier, suggesting some stabilization at the broad-market level.
- **Distinction from Fitch:** NY Fed CCP is **all auto loans** (prime + subprime, bank + credit union + ABS). Fitch subprime ABS index is **securitized subprime only**. The subprime ABS index is far more volatile and indicative of marginal borrower stress.

### 5. CFPB BNPL Borrower Co-Delinquency Rate
- **What it is:** Share of BNPL borrowers who also have a delinquency in another credit product. Reported periodically by the CFPB across six large providers.
- **2023 reading:** 18% of BNPL borrowers vs 7% of non-BNPL borrowers. Retail card delinquency: 8% (BNPL) vs 1% (non-BNPL).
- **Interpretation:** Use as a structural baseline for understanding the demographic profile of BNPL stress. When macro conditions tighten, this co-delinquency pool is the first to crack.

## Update Cadence

| Source | Metric | Cadence | Feed |
|---|---|---|---|
| Fitch Ratings | Subprime auto ABS 60+ day delinquency | Monthly | Fitch Ratings website (subscription); summarized in Auto Remarketing, AutoFinanceNews |
| NY Fed HHDC / CCP | Auto 30+ and 90+ day transition rates | Quarterly (~6 weeks after quarter-end) | [[sources/nyfed-household-debt-credit-2026]] |
| CFPB | BNPL market-wide charge-off / late fees | Periodic (major reports every 1–2 years) | [[sources/cfpb-bnpl-report]] |
| Affirm (AFRM) | 30+ day delinquency, allowance ratio, cohort charge-offs | Quarterly (SEC 8-K shareholder letter) | SEC EDGAR — search AFRM 8-K filings |
| ALLY, COF, SYF | Net charge-off rate, 30-day delinquency % | Quarterly earnings | Investor relations / SEC 10-Q |

## Interpretation / Judgment Table

| Signal combination | What it means | Macro read | Equity read |
|---|---|---|---|
| Subprime ABS 60+ day rising, Affirm allowance rising, NY Fed 90+ day stable | Stress concentrated in lower-income / subprime borrowers; prime still clean | **Mixed:** selective consumer softening; labor market still holding prime tier | **Negative** AFRM (rising provision; forward charge-off guidance may disappoint); **negative** ALLY/COF (subprime auto NCO accelerating) |
| Both BNPL and subprime auto delinquency rising simultaneously + MUVVI falling | Consumer-credit deterioration + collateral value collapse; worst-case ABS scenario | **Recession-leading signal**; credit spreads widen → auto ABS spreads widen → ALLY/COF funding costs rise | **Bearish** across the board for auto credit ecosystem: ALLY, COF, SYF, AFRM, and wholesale proxies KMX/CVNA all face simultaneous headwinds |
| Subprime ABS 60+ day stabilizing or falling + MUVVI recovering | Stress was cyclical (post-pandemic normalization); recovery beginning | **Neutral to modestly positive** credit outlook | **Recovery signal** for ALLY net interest margin, AFRM loss reserve releases, KMX/CVNA volume normalization |
| Subprime 32-year record high (current situation: 6.9%), but prime holding | Bifurcated consumer — lower-income is stressed, prime is fine; systemic risk is bounded (~15% of auto loans subprime) | **Not a systemic crisis**, but a persistent drag on originators with subprime mix | Watch ALLY vs COF vs SYF subprime origination share; SYF (store cards, sub-prime) has different exposure than ALLY (dealer-origination, mixed) |
| BNPL delinquency rising + credit-card 90-day delinquency lagging | Classic leading-edge pattern: BNPL borrowers cracking first; credit card will follow in 1–3 quarters | **Early-cycle consumer stress warning** | Position ahead of forward guidance revisions from SYF (synchrony: store-card + BNPL partnership), COF consumer segment |

## Why Subprime Auto Delinquency Leads Prime Credit-Card Delinquency

Mechanistically: subprime borrowers have no savings buffer and limited credit availability, so they feel income shocks and rate increases immediately. Prime borrowers can tap revolving credit, savings, or HELOCs to service auto loans before defaulting. The usual lead time is 2–4 quarters. In the current cycle (2024–2026), subprime auto ABS 60-day delinquency reached its 32-year peak while prime credit-card serious delinquency remained contained — a textbook bifurcated-consumer pattern.

## The ALLY / COF / SYF / AFRM Credit-Cost Transmission

Rising auto delinquency and falling collateral values (Manheim) translate to lender credit costs via this pathway:

```
Subprime delinquency rises  →  servicer triggers repossession
Repossession → wholesale auction (Manheim lanes) → lower MUVVI → lower recovery
Net charge-off = (gross default volume) × (1 − recovery rate)
Higher NCO → higher provision expense → lower EPS → multiple compression
```

For ALLY (largest US auto lender): auto NCO ratio directly drives quarterly EPS variance. Market consensus models every 10 bps change in NCO as ~$0.06–0.10 per share EPS impact.

For AFRM: because BNPL loans are short-duration, the allowance-to-loan ratio is a leading indicator of coming charge-off waves. A rising allowance (currently 6.0% of loans) with rising delinquency (2.8%) signals forward earnings pressure.

## Representative Tickers (Illustrative Sector Proxies)

| Ticker | Role | Delinquency sensitivity |
|---|---|---|
| AFRM (Affirm) | Largest US BNPL lender | Direct: 30+ day delinquency + charge-off cohort performance is primary fundamental driver |
| ALLY (Ally Financial) | Largest US auto lender | High: subprime auto NCO is top earnings variable |
| COF (Capital One) | Bank with large subprime auto and card | High: both auto and card channels exposed |
| SYF (Synchrony) | Store-card / BNPL partnerships | High: near-prime/subprime mix; BNPL partnerships with retailers |
| KMX (CarMax) | Auto dealer + KMX Auto Finance | Indirect: KMX's captive lender (CAF) carries subprime mix; rising NCO compresses KMX Auto Finance profitability |
| CVNA (Carvana) | Auto retailer + ADESA wholesale | Indirect: CVNA securitizes loans it originates; rising ABS delinquency raises securitization costs and limits volume |

## Data Linkages

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[sources/cfpb-bnpl-report]] — CFPB December 2025 market report with charge-off and borrower-profile data
- [[sources/nyfed-household-debt-credit-2026]] — NY Fed HHDC Q1 2026: auto 30+/90+ day transition rates
- [[concepts/manheim-used-vehicle-indicator]] — collateral value signal; Manheim UVVI determines recovery rates on repossessed subprime auto ABS collateral — the two concepts are structurally linked
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent umbrella architecture
