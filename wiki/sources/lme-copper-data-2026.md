---
type: source
tags: [us-equities, leading-indicator, trader-agent, metals, copper, data-feed]
title: "LME Copper Official Price, Warehouse Stocks, and Cash-3M Spread"
author: "London Metal Exchange (LME / HKEX)"
date: "1877-01-01"
ingested: "2026-06-01"
---

# LME 銅官方數據 / LME Copper Official Data

**Publisher:** London Metal Exchange (LME), a subsidiary of HKEX
**Canonical copper page:** [lme.com/metals/non-ferrous/lme-copper](https://www.lme.com/metals/non-ferrous/lme-copper)
**Market data hub:** [lme.com/en/market-data/reports-and-data](https://www.lme.com/en/market-data/reports-and-data)
**Warehouse & stocks reports:** [lme.com/en/market-data/reports-and-data/warehouse-and-stocks-reports](https://www.lme.com/en/market-data/reports-and-data/warehouse-and-stocks-reports)
**Cash and 3M prompt date checker:** [lme.com/en/market-data/reports-and-data/cash-and-3-month-prompt-date-checker](https://www.lme.com/en/market-data/reports-and-data/cash-and-3-month-prompt-date-checker)

## What This Source Provides

The LME is the world's largest market in options and futures contracts for base and other metals. For copper analysis, three data series are most relevant:

### 1. LME Official Prices (Including Cash Price)
The daily "Official" prices are the LME's reference benchmark, struck during the second ring of open-outcry trading at approximately 12:00–12:35 London time. The **LME Copper Cash (spot) price** is the price for immediate (two-business-day) delivery against an LME warehouse warrant.

### 2. LME Warehouse Stocks (Tonnes)
Published daily. Shows **total on-warrant inventory** of copper held in LME-approved warehouses globally, broken down by:
- **Live warrants:** metal currently available for delivery against an LME contract
- **Cancelled warrants:** metal that has been earmarked for physical removal from LME storage (the holder has instructed the warehouse to release the metal; it will leave storage within the load-out queue period)
- **Off-warrant stocks:** metal physically present in LME warehouses but not covered by an LME warrant (reported separately since 2017)

**Cancelled warrants** are a leading signal within the stocks data: a high and rising cancelled-warrant percentage means available deliverable inventory is shrinking faster than raw totals suggest.

### 3. Cash-3M Spread (現貨對三月期價差)
The difference between the LME Copper Cash price and the 3-month forward price:
- **Positive spread (cash > 3M) = Backwardation (現貨升水):** Near-term scarcity; physical buyers bidding up immediate delivery above future delivery.
- **Negative spread (cash < 3M) = Contango (現貨折價):** Normal storage premium; forward price includes carrying costs (storage + financing).

The LME cash-3M spread is a **physical market signal, not a financial carry calculation**. It reflects prompt-date tightness from real delivery obligations rather than theoretical cost-of-carry. This means LME copper can simultaneously show contango in the 3-month forward while exhibiting backwardation at specific nearby prompt dates — a situation structurally impossible in standard financial futures but routine in the LME prompt-date system.

## Update Cadence

| Data Series | Cadence |
|---|---|
| LME Official Price (Cash, 3M, etc.) | Daily (next-day free delay on lme.com) |
| Warehouse Stocks (live + cancelled warrants) | Daily |
| Cash-3M spread | Daily |
| Off-warrant stocks report | Weekly |

**Free access:** LME provides next-day-delayed official prices, warehouse stocks, and closing prices at no charge from lme.com from the start of each year. Real-time data requires LMEsource, LMEselectMD, or one of the 50+ licensed data distributors.

## COMEX and SHFE as Cross-Reference Signals

The LME is not the only copper warehouse system. Two other exchanges matter for interpreting the LME signal:

- **COMEX (CME Group, New York):** US copper futures. COMEX registered copper stocks are reported by CME Group. In 2025–2026, COMEX inventories surged to over 100,000 tonnes while LME stocks fell, driven by US import arbitrage ahead of potential Section 232 tariffs.
- **SHFE (Shanghai Futures Exchange):** China copper futures. SHFE warrant inventory is reported weekly in tonnes.

When the COMEX-LME price spread widens significantly (e.g., reached ~$950/tonne intraday in July 2025; ~$390/tonne in March 2026), it signals cross-exchange arbitrage flows rather than global physical tightness — metal is moving between exchanges, not necessarily being consumed. See [[concepts/lme-copper-inventory-indicator]] §False Signals.

## Recent Data Points

| Date | Metric | Value |
|---|---|---|
| May 28, 2025 | LME copper total stocks | 154,300 mt (down 7,850 mt on the day) |
| May 28, 2025 | Cancelled warrants | 71,175 mt (46.1% of total) |
| May 28, 2025 | SHFE warrant inventory | 34,861 mt |
| May 6, 2026 | LME cash-3M backwardation | $21.75/mt |
| May 13, 2026 | LME cash-3M backwardation | $19.17/mt |
| 2025 (peak) | LME stocks vs. 2024 | Down ~62% from 2024 levels |
| Early 2025 (single day) | Largest cancelled warrant event | 50,000 mt in one day (largest since 2013) |
| March 2026 | COMEX–LME premium | ~$390/tonne |

As of late May 2026, the LME copper market remains in **backwardation** (extending into June 2026 futures), though the spread has narrowed from extreme levels. Total LME stocks are approximately 94,000–154,000 mt (a multi-year low range), with cancelled warrants at roughly 46% of remaining inventory.

## See Also

- [[concepts/lme-copper-inventory-indicator]] — full indicator guide using this source
- [[sources/baker-hughes-rig-count-2026]] — sibling real-economy capex indicator
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent umbrella architecture
