---
type: source
title: "Cboe SPX 0DTE Volume Statistics — Full Year 2025 & Monthly Highs"
author: "Cboe Global Markets, Inc."
date: "2026-01-22"
ingested: "2026-06-01"
tags: [us-equities, market-structure, trader-agent, options, volatility, 0DTE]
---

# Cboe SPX 0DTE Volume Statistics — Full Year 2025 & Monthly Highs

## What This Source Is

Cboe Global Markets is the primary exchange for SPX (S&P 500 index) options and the canonical publisher of 0DTE (zero-days-to-expiry) volume data. Cboe's investor relations press releases and Insights blog are the authoritative primary sources for annual and monthly 0DTE statistics. The two key documents for 2025 annual data are:

1. **"State of the Options Industry: 2025"** (Cboe Insights, January 22, 2026)
   URL: [cboe.com/insights/posts/the-state-of-the-options-industry-2025/](https://www.cboe.com/insights/posts/the-state-of-the-options-industry-2025/)

2. **"Cboe Global Markets Reports Trading Volume for December and Full Year 2025"** (Cboe IR Press Release, January 6, 2026)
   URL: [ir.cboe.com/news/news-details/2026/Cboe-Global-Markets-Reports-Trading-Volume-for-December-and-Full-Year-2025/default.aspx](https://ir.cboe.com/news/news-details/2026/Cboe-Global-Markets-Reports-Trading-Volume-for-December-and-Full-Year-2025/default.aspx)
   (Also syndicated via PR Newswire: [prnewswire.com/news-releases/...302654309.html](https://www.prnewswire.com/news-releases/cboe-global-markets-reports-trading-volume-for-december-and-full-year-2025-302654309.html))

For the August 2025 monthly record:

3. **"SPX 0DTE Options Jump to Record 62% Share in August"** (Cboe Insights, September 2, 2025)
   URL: [cboe.com/insights/posts/spx-0-dte-options-jump-to-record-62-share-in-august/](https://www.cboe.com/insights/posts/spx-0-dte-options-jump-to-record-62-share-in-august/)

## Key Verified Statistics (2025)

### Full-Year 2025 (CONFIRMED from Cboe IR press release Jan 6, 2026 + Insights Jan 22, 2026)

| Metric | Value | Source |
|---|---|---|
| SPX 0DTE ADV | **2.3 million contracts** | Cboe IR full-year 2025 press release |
| SPX 0DTE share of SPX volume | **59% of total SPX volume** | Cboe IR full-year 2025 press release |
| Total SPX ADV | 3.9 million contracts | Cboe Insights "State of Options Industry 2025" |
| Total US listed options volume | 15.2 billion contracts | +26% above 2024 record |
| Overall US options ADV | 61 million contracts/day | Sixth consecutive record year |
| Q4 2025 SPX 0DTE daily average | 2.6 million contracts | Highest quarter on record |
| VIX options ADV | 858,000 contracts | Record in 2025 |

### August 2025 Monthly Record

| Metric | Value |
|---|---|
| SPX 0DTE daily average (August) | ~2.4 million contracts |
| SPX 0DTE share (August) | **62.4%** (record as of that month) |
| Retail share of 0DTE volume | ~53% (estimated) |
| Institutional share | ~47% (estimated) |

> **The owner-stated figure "SPX 0DTE ADV ~2.3M contracts, ~59% of SPX volume" for full-year 2025 is CONFIRMED verbatim from the Cboe IR press release dated January 6, 2026.**

## What These Numbers Represent

SPX 0DTE options are S&P 500 index options that expire on the same trading day they are purchased. Cboe made 0DTE SPX trading possible by adding Monday, Wednesday, and Friday expirations in 2016, then expanding to every trading day by 2022. The explosive growth in 0DTE volume (from ~5% of SPX volume in 2016 to 59% by 2025) is the most significant structural change in the US equity options market in the past decade.

The 59% share means: **more than half of all SPX options contracts traded on any given day expire within hours of purchase.** This creates a structural condition where intraday price moves must be hedged by options dealers at extremely compressed time horizons — the core mechanism behind the 0DTE volatility-amplification effect documented in [[concepts/zero-dte-options-share-indicator]].

## Update Cadence

- **Daily:** Cboe publishes end-of-day options statistics at [cboe.com/us/options/market_statistics/](https://www.cboe.com/us/options/market_statistics/)
- **Monthly:** Cboe posts a "State of the Options Industry: Month X" update approximately 3 weeks after month-end
- **Annual:** Published in January of the following year via IR press release and Insights "State of the Options Industry: Year" report

## See Also

- [[concepts/zero-dte-options-share-indicator]] — Full indicator framework: dealer gamma mechanism, VIX/VVIX/SKEW interplay, circuit-breaker implications
- [[concepts/volatility-targeting]] — How the 0DTE regime informs position-sizing rules in the trader agent
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.3 circuit breakers and §1.1 volatility-regime awareness
