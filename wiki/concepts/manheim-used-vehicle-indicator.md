---
type: concept
tags: [us-equities, leading-indicator, trader-agent, consumer-credit, autos, wholesale-prices, inflation, core-cpi]
---

# Manheim 二手車指數 / Manheim Used Vehicle Value Index — Leading Indicator

The **Manheim Used Vehicle Value Index (MUVVI)** is the US wholesale used-vehicle benchmark published by Cox Automotive. It is a macro-financial leading indicator with two distinct signal channels: (1) a core **CPI inflation channel** that affects Fed policy expectations, and (2) a **consumer-credit channel** that reflects collateral values underpinning auto-loan securitizations. Understanding which channel dominates in a given period is the core analytical judgment call.

## Why It Leads the Consumer Cycle

Manheim clears at **wholesale auction** — roughly 60–90 days before a used vehicle reaches retail and triggers the BLS survey. The CPI "Used cars and trucks" component (a sub-component of core CPI) is compiled from retail transaction prices, which lag Manheim's wholesale clearing by that same window. As a result, MUVVI is a **genuine 2-month forward signal** for one of the most volatile items in core CPI, making it a tool of direct relevance to Fed-policy forecasting.

The secondary signal pathway: Manheim auction prices are the **recovery value** on repossessed vehicles feeding into subprime auto-ABS collateral pools. When prices fall while delinquencies rise, ABS loss severity increases simultaneously with loss frequency — a double-hit on credit costs for lenders. See [[concepts/bnpl-subprime-auto-credit-indicator]] for the delinquency side.

## What to Watch — Sub-Metrics Defined

### 1. Manheim UVVI (headline)
- **What it is:** Seasonally adjusted, mix-adjusted, mileage-adjusted index of wholesale used-vehicle prices. Baseline = January 1997 = 100.
- **Three adjustments:** (a) Mix — removes the effect of which vehicle types are flowing through lanes; (b) Mileage — strips out odometer variation; (c) Seasonality — removes normal spring surge / late-year softening.
- **Why adjustments matter:** Without them, the index would move whenever fleet composition shifts (e.g. more trucks = higher average price), obscuring true price pressure. The adjusted index is what matters for CPI forecasting.

### 2. Retail Days' Supply
- **What it is:** Total retail used-vehicle inventory divided by daily average sales rate. Typically 45–60 days is a balanced market; below 40 days is tight (upward price pressure); above 70 days is loose (dealer discounting begins).
- **Source:** Cox Automotive / Dealertrack inventory data, reported alongside MUVVI monthly release.
- **Relevance:** Low days' supply means dealers cannot find attractive vehicles to buy at auction → conversion rates rise → MUVVI bid support strengthens.

### 3. Auction Conversion Rate (Sales Efficiency Rate)
- **What it is:** Percentage of vehicles offered at Manheim auction lanes that actually transact (find a buyer at the floor price). A measure of wholesale demand intensity.
- **Typical range:** 55–70%. Above 65% = strong wholesale demand; below 55% = dealers are price-resisting, market is soft.
- **Interpretation signal:** Conversion rate diverging from MUVVI (e.g. MUVVI holding steady but conversion falling) is an early warning that the price level is unsustainable.

### 4. Mid-Month Checkpoint
- **What it is:** A directional, non-official reading published mid-month (~15th–18th). The MUVVI methodology note states it is explicitly **not** an official reading and **not** a flash estimate of the full-month number.
- **Practical use:** Provides a 2-week preview of whether the month is tracking toward a firming or softening full read. Useful for trimming position risk before a CPI print.

## Update Cadence & Data Feeds

| Release | Schedule | URL pattern |
|---|---|---|
| Official monthly MUVVI | 5th business day of month, 9:00 AM ET | `coxautoinc.com/insights/[month]-[year]-muvvi/` |
| Mid-month checkpoint | ~15th–18th of month | `coxautoinc.com/insights/manheim-used-vehicle-value-index-mid-[month]-[year]-trends/` |
| Quarterly summary | ~5th business day of first month of next quarter | `coxautoinc.com/insights-hub/q[N]-[year]-muvvi/` |
| 2026 release calendar | PDF from Cox Automotive | [2026 release dates PDF](https://www.coxautoinc.com/wp-content/uploads/2025/12/2026-Manheim-Used-Vehicle-Value-Index-Release-Dates.pdf) |

Full source documentation: [[sources/manheim-used-vehicle-value-index-2026]]

## Most Recent Readings (as of 2026-06-01)

| Period | MUVVI | YoY | Conversion Rate | Days Supply |
|---|---|---|---|---|
| March 2026 | 215.3 | +6.2% | 68.2% (4.6 pp above 3-yr avg) | <40 days (lowest 2026) |
| Mid-April 2026 | 213.0 | +2.3% | — | — |
| Mid-May 2026 | 213.1 | +3.8% | 61.3% | 26 days (wholesale) |
| December 2025 | 205.5 | +0.4% | — | — |

Cox Automotive's 2026 full-year forecast: +2% MUVVI by year-end, driven by normal seasonal depreciation offset by EV supply absorption.

## Interpretation / Judgment Table

| Signal combination | What it means | Macro read | Equity read |
|---|---|---|---|
| MUVVI rising, conversion rising, days supply tight | Genuine wholesale demand; retail used prices will follow → core CPI "used cars" component +1–2% in 2–3 months | **Hawkish Fed signal** — pushes back rate-cut expectations | **Positive** for CVNA (unit margins), KMX (gross-per-unit), AN/LAD (F&I); **neutral-to-negative** for ALLY/COF (higher repo collateral supports recovery rates, but affordability stress pressures origination) |
| MUVVI rising, but conversion falling | Price being held up by mix or macro narrative, not genuine demand — watch for reversal | **False dawn** for inflation; do not front-run core CPI revision | Cautious on CVNA/KMX — margin look good now but unit volumes softening |
| MUVVI falling, conversion falling | Wholesale demand evaporating; retail used prices follow lower → core CPI relief in 60–90 days | **Dovish Fed signal** — supports rate-cut thesis | **Negative** for CVNA/KMX/AN/LAD (margin compression); **mixed** for ALLY/COF (lower vehicle values → worse repo recovery, rising loss severity) |
| MUVVI falling + delinquencies rising (see [[concepts/bnpl-subprime-auto-credit-indicator]]) | Consumer-credit deterioration + collateral value collapse simultaneously | **Recession-leading signal**; Fed caught between inflation relief and credit stress | **Negative** for ALLY, COF, SYF (loss severity + frequency simultaneously rise); CVNA faces both demand weakness AND credit tightening headwinds |
| MUVVI rising + EV wholesale volumes surging | Used-EV supply is normalizing; ICE/EV price spread compressing | Sector rotation signal; monitor EV vs ICE MUVVI split | Watch TSLA certified pre-owned vs CVNA MUVVI segment split |

## The Dual Read — Core Inflation vs Credit Stress

This is the central analytical complexity of the Manheim indicator:

**Channel A — Inflation / Fed policy:** Rising MUVVI is bearish for bonds (higher inflation persistence) and bearish for rate-sensitive equities, but potentially bullish for dealers' unit economics (higher gross margin per unit sold). This is the 2021–2022 Manheim = CPI inflation story.

**Channel B — Consumer credit collateral:** Falling MUVVI into rising delinquency is the more dangerous scenario. When a subprime borrower defaults and the vehicle is repossessed and liquidated at a depressed auction price, the loss given default (LGD) on the auto ABS rises. If MUVVI falls 10%, ABS recovery rates deteriorate by a similar magnitude, amplifying losses even at stable default rates. The 2024–2025 environment of elevated subprime delinquency (Fitch 60+ day subprime ABS rate: 6.90% in January 2026, a 32-year high) running alongside moderating MUVVI is precisely this Channel B stress pattern.

## Representative Tickers (Illustrative Sector Proxies)

These are sector proxies for monitoring, not the owner's holdings:

| Ticker | Role | MUVVI sensitivity |
|---|---|---|
| CVNA (Carvana) | Online used-car retailer | High: unit economics (GPU) directly tied to wholesale-to-retail spread |
| KMX (CarMax) | Largest US used-car dealer | High: appraisal margins sensitive to wholesale values |
| AN (AutoNation) | Franchise dealer / used | Moderate: diversified new + used + F&I |
| LAD (Lithia Motors) | Franchise dealer / used | Moderate: similar to AN |
| GM, F | OEM — new-vehicle residuals | Indirect: MUVVI affects lease residuals and certified pre-owned volume |
| ALLY (Ally Financial) | Auto lender, largest US | High credit channel: vehicle values are primary collateral; watch loss severity |
| COF (Capital One) | Auto lender (subprime mix) | High credit channel: significant subprime auto origination |

## Data Linkages

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[sources/manheim-used-vehicle-value-index-2026]] — full methodology + current data
- [[concepts/bnpl-subprime-auto-credit-indicator]] — the delinquency side of the same consumer-stress picture; subprime auto-ABS collateral loss severity connects these two concepts directly
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent umbrella architecture
