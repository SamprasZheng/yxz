---
type: concept
tags: [us-equities, leading-indicator, trader-agent, metals, copper, capex-cycle]
---

# LME 銅庫存 / 現貨溢價指標 / LME Copper Inventory & Spot Premium Indicator

**Cluster:** Real-economy capex — energy & metals
**Companion indicator:** [[concepts/offshore-drilling-dayrate-indicator]] (physical-tightness signal in energy)
**Data source:** [[sources/lme-copper-data-2026]] (LME official copper data)
**Trader-agent umbrella:** [[synthesis/ai-quant-trading-architecture-improvements]]

---

## 1. What It Is and Why It Leads

The **LME copper inventory / spot premium indicator** tracks the physical availability of copper at the London Metal Exchange — the world's largest market for non-ferrous metal futures and options — as a leading signal for industrial capex health. Copper earns the nickname "Dr. Copper" because its demand spans construction, power infrastructure, EVs, data-center build-out, and industrial equipment; a physical squeeze in copper often precedes broader capital spending acceleration.

The indicator has two co-moving components:

- **LME warehouse stocks (庫存):** Total tonnes of copper held in LME-approved warehouses, split between live warrants (immediately deliverable) and cancelled warrants (earmarked for physical removal).
- **Cash-3M spread / spot premium (現貨溢價 / 現貨升水):** The price difference between the LME Copper Cash price (immediate delivery) and the 3-month forward price. When cash exceeds 3M, the market is in **backwardation**; when 3M exceeds cash, it is in **contango**.

Together these two variables signal the state of real physical copper supply:
- Falling inventory + widening backwardation = genuine tightness in physical supply
- Rising inventory + deepening contango = surplus; consumers deferring spot purchases

---

## 2. What to Watch (Sub-Metrics)

### 2.1 LME Warehouse Stocks

| Sub-metric | Definition | Relevance |
|---|---|---|
| **Total on-warrant stocks (tonnes)** | Live warrants + cancelled warrants combined | Headline inventory level; widely reported |
| **Live warrants** | Metal available for immediate LME delivery | The true deliverable float for LME contracts |
| **Cancelled warrants (註銷倉單)** | Metal earmarked for physical removal; owner has instructed warehouse to release it | Most important leading signal within inventory data — see §2.2 |
| **Cancelled warrant % of total** | Cancelled / (Live + Cancelled) | When this ratio exceeds ~40–50%, pressure on deliverable float is acute |
| **Off-warrant stocks** | Metal physically in LME warehouses but not covered by a warrant (reported weekly) | Shows "shadow inventory" that could re-enter the warranted pool |

### 2.2 Cancelled Warrants (註銷倉單) — Key Concept

A **warrant** is the LME's title document for physical metal stored in an approved warehouse. The holder of a warrant owns that specific parcel of metal. A warrant is **cancelled** when the holder instructs the warehouse to make the metal ready for physical delivery or onward shipment. Once cancelled, the metal will leave LME storage within the load-out queue period.

**Why cancelled warrants lead:** A rising cancelled-warrant percentage means that live (deliverable) inventory is shrinking at a faster rate than total stocks suggest. In extreme cases (e.g., December 2025: 50,000 mt cancelled in a single day — the largest since 2013), the deliverable float can collapse below psychological thresholds (100,000 mt, then 50,000 mt) very rapidly, forcing backwardation to spike.

### 2.3 Cash-3M Spread (現貨對三月期價差)

**Backwardation (現貨升水):** Cash price > 3M price. Nearby prompt dates face physical scarcity; counterparties bidding up immediate delivery over future delivery. In a structural sense, this signals that consumers or traders need metal *now* and cannot defer.

**Contango (現貨折價):** Cash price < 3M price. The forward includes carrying costs (storage + financing). Normal state in a well-supplied market. The premium should approximate storage cost + cost of capital over 3 months.

**Important: LME spread is not a financial carry signal.** The LME cash-3M spread is determined by physical delivery obligations at specific prompt dates, not by financial arbitrageurs enforcing cost-of-carry. This means:
- LME can show contango in the 3-month spread while showing backwardation at specific nearby prompt dates simultaneously.
- A widening contango does not necessarily mean the market expects a surplus — it may reflect warehouse load-out queue dynamics, financing rates, or geographic delivery basis.
- Conversely, backwardation can emerge from warrant concentration and short covering even when global mine supply is adequate.

The spread should always be read in conjunction with the absolute stock level and the cancelled-warrant ratio, not in isolation.

### 2.4 COMEX and SHFE Cross-Checks

| Exchange | Ticker | Report | Cadence | Role |
|---|---|---|---|---|
| **LME (London)** | LME Copper | Official warehouse stocks | Daily | Global benchmark; main indicator |
| **COMEX (CME, New York)** | HG | CME warehouse stocks | Daily | US market; tariff arbitrage signal |
| **SHFE (Shanghai)** | Cu | SHFE warrant inventory | Weekly | China demand signal |

When COMEX stocks are rising while LME stocks fall, the divergence often reflects **cross-exchange arbitrage** (see §4 False Signals) rather than global supply tightness.

---

## 3. Update Cadence and Data Access

| Data Series | Cadence | Free Access |
|---|---|---|
| LME Official Price (Cash, 3M, closing) | Daily | Next-day delayed, free at [lme.com/metals/non-ferrous/lme-copper](https://www.lme.com/metals/non-ferrous/lme-copper) |
| LME Warehouse Stocks (live + cancelled warrants) | Daily | Next-day delayed, free at [lme.com/en/market-data/reports-and-data/warehouse-and-stocks-reports](https://www.lme.com/en/market-data/reports-and-data/warehouse-and-stocks-reports) |
| Cash-3M spread | Daily | Derived from official prices; also tracked at [metalradar.com](https://metalradar.com/price/copper/lme/select/cash-3-month-spread/trade-trend) |
| Off-warrant stocks | Weekly | lme.com warehouse reports |
| Real-time data | Intraday | Requires LMEsource / LMEselectMD subscription or a licensed data distributor |

The LME Cash and 3-month prompt date checker ([lme.com/en/market-data/reports-and-data/cash-and-3-month-prompt-date-checker](https://www.lme.com/en/market-data/reports-and-data/cash-and-3-month-prompt-date-checker)) is updated twice yearly (March and September) and confirms prompt date calendars.

For trader-agent use, the practical entry point is the next-day delayed data at lme.com or aggregators such as Westmetall ([westmetall.com/en/markdaten.php?action=table&field=LME_Cu_cash](https://www.westmetall.com/en/markdaten.php?action=table&field=LME_Cu_cash)).

---

## 4. Interpretation / Judgment Table

### Bullish (Real physical tightness → copper demand pull ahead)

| Signal | What it means |
|---|---|
| LME stocks **falling** + cash-3M **backwardation widening** | Genuine physical scarcity; consumers competing for immediate metal |
| Cancelled warrants **>40% of total** and rising | Deliverable float collapsing; near-term supply shock risk |
| Backwardation **extending into forward curve** (not just spot week) | Tightness priced as structural, not transient |
| SHFE + LME stocks **both falling** simultaneously | Broad global demand pull, not exchange-specific shuffle |
| Copper up; **equity proxies** (FCX, SCCO) leading the price | Smart money positioning ahead of demand confirmation |

### Bearish (Surplus or demand softening)

| Signal | What it means |
|---|---|
| LME stocks **rising** + cash-3M **contango deepening** | Surplus building; consumers comfortable deferring purchases |
| Cancelled warrants **falling** from high levels | Previous tightness resolving; metal re-entering deliverable pool |
| COMEX stocks **rising sharply** while LME falls | Geographic redistribution, not global tightness (see §4 False Signals) |
| Copper price falling with **rising SHFE inventory** | China demand weak; largest consumer pulling back |

### Current read (as of May–June 2026)

The copper market remains in **backwardation** extending into June 2026 futures. Specific data points:
- LME cash-3M backwardation: $21.75/mt (May 6, 2026), $19.17/mt (May 13, 2026) — narrowing from extreme highs
- Total LME on-warrant stocks: approximately 94,675–154,300 mt range (a multi-year low; early 2025 saw stocks down ~62% year-on-year)
- Cancelled warrants: ~46% of total inventory (May 2026), indicating continued deliverable squeeze
- SHFE inventory: ~34,861 mt (late May 2025)
- Market interpretation: Persistent tightness but partly driven by US tariff arbitrage flows (see §4 below)

---

## 5. False Signals: Cross-Market Warrant Shuffling

The most important false-signal risk in reading LME copper inventory is **cross-exchange arbitrage driven by geographic price dislocations** rather than genuine global demand.

### The 2025–2026 US Tariff Pull Mechanism

In February 2025, the US launched a Section 232 national security investigation into copper imports. Anticipation of potential tariffs on refined copper triggered a structural arbitrage:

1. COMEX copper (US-deliverable, CME, ticker HG) traded at a large premium over LME 3-month copper.
2. The COMEX-LME premium reached ~$950/tonne intraday in July 2025 and remained ~$390/tonne as of March 2026.
3. Traders and merchants physically shipped copper from global warehouses (LME in Rotterdam, Hamburg, etc.) into US warehouses to capitalize on the premium.
4. Result: **LME stocks fell sharply; COMEX stocks rose sharply.** The fall in LME stocks triggered backwardation and cancelled warrant spikes — but this reflected *geographic redistribution*, not *net global consumption* exceeding supply.

### How to Tell False from Real

| Check | Real Tightness | Arbitrage Shuffle |
|---|---|---|
| COMEX stocks | Falling (demand consuming all locations) | **Rising** while LME falls |
| SHFE stocks | Falling (China demand pulling) | Flat or falling independently of LME move |
| Physical premiums (Shanghai CME premium) | Rising in all regions | Rising only in COMEX premium; LME premiums flat |
| Cancelled warrants geography | Spread across LME locations globally | Concentrated at LME locations near US-bound shipping ports (Rotterdam, Hamburg) |
| Copper price action | Rising on global demand | Rising but COMEX premium > LME; spread unusually wide |

The rule of thumb: if the LME-COMEX spread (COMEX - LME 3M) is exceptionally wide (e.g., >$300/tonne above historical norm), be cautious about treating LME inventory drawdown as a pure demand signal. Cross-check against SHFE stocks and global premium structures.

---

## 6. Representative Sector Tickers (Illustrative Proxies)

These are sector proxies for the copper mining, processing, and industrial-electrification themes — not the owner's holdings:

| Ticker | Company | Role |
|---|---|---|
| **FCX** | Freeport-McMoRan | Largest US-listed copper producer; Grasberg (Indonesia) + Americas mines |
| **SCCO** | Southern Copper Corporation | Low-cost Latin America producer (Peru/Mexico); highest copper reserves |
| **TECK** | Teck Resources | Canadian diversified miner; QB2 copper mine ramp-up (Chile) |
| **BHP** | BHP Group | Global diversified miner; major copper exposure (Escondida, Chile) |
| **RIO** | Rio Tinto | Kennecott (Utah) + Oyu Tolgoi (Mongolia) copper; diversified |
| **ETN** | Eaton Corporation | Power management; electrical distribution; copper demand proxy via grid build-out |
| **PWR** | Quanta Services | Electrical contracting; grid + data-center infrastructure; copper demand proxy |

---

## 7. Canonical Data Sources with Verified URLs

| Source | What It Provides | URL | Cadence |
|---|---|---|---|
| LME Copper (official) | Cash price, stocks, warrants | [lme.com/metals/non-ferrous/lme-copper](https://www.lme.com/metals/non-ferrous/lme-copper) | Daily (next-day free) |
| LME Warehouse & Stocks | Cancelled/live warrants by location | [lme.com/en/market-data/reports-and-data/warehouse-and-stocks-reports](https://www.lme.com/en/market-data/reports-and-data/warehouse-and-stocks-reports) | Daily |
| LME Cash-3M Checker | Prompt date calendar | [lme.com/en/market-data/reports-and-data/cash-and-3-month-prompt-date-checker](https://www.lme.com/en/market-data/reports-and-data/cash-and-3-month-prompt-date-checker) | 2x/year |
| Westmetall | LME Cu cash + 3M time series | [westmetall.com/en/markdaten.php?action=table&field=LME_Cu_cash](https://www.westmetall.com/en/markdaten.php?action=table&field=LME_Cu_cash) | Daily |
| Metal Radar | LME cash-3M spread chart | [metalradar.com/price/copper/lme/select/cash-3-month-spread/trade-trend](https://metalradar.com/price/copper/lme/select/cash-3-month-spread/trade-trend) | Daily |
| SMM (上海有色) | Daily LME + SHFE copper summary | [news.metal.com](https://news.metal.com/) | Daily |
| CME Group | COMEX copper (HG) stocks + prices | [cmegroup.com](https://www.cmegroup.com/) | Daily |

## See Also

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[concepts/offshore-drilling-dayrate-indicator]] — companion real-economy capex signal (energy)
- [[sources/lme-copper-data-2026]] — LME copper official data source details
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent architecture this indicator feeds into
