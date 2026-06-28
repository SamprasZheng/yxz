---
type: concept
tags: [us-equities, market-structure, trader-agent, options, volatility, 0DTE, regime-signal]
---

# 0DTE 選擇權佔比指標 (Zero-DTE Options Share Indicator)

## What It Is and Why It Matters

**IMPORTANT: This is a market-structure / regime signal, NOT a fundamental or sector-demand signal.** It tells you nothing about whether equities are cheap or expensive, whether earnings will beat, or which sector has secular tailwinds. It tells you about **the intraday trading environment** — specifically, whether that environment is structurally prone to volatility amplification, false breakouts, and air-pocket selloffs.

Zero-DTE (0DTE) options are options contracts that expire on the same calendar day they are traded. For SPX (S&P 500 index options), Cboe enabled daily expirations for every trading day in 2022. The result: a structural explosion in same-day option flow that fundamentally changed the intraday hedging behavior of options dealers.

**Why it matters for the trader agent:** High 0DTE share means the market's intraday behavior is more volatile, less momentum-persistent, and more prone to sudden reversals than headline VIX would suggest. Understanding this regime changes how position sizing, stop placement, and circuit-breaker logic should be calibrated. This is a **circuit-breaker calibration input**, not a directional trade signal.

---

## Sub-Metrics Defined

### 1. SPX 0DTE Volume Share (SPX 0DTE 佔比)

**Definition:** The percentage of total SPX options contracts traded on a given day that are zero-days-to-expiry contracts.

**How to read it:** A rising share means an increasing fraction of the options market is structured to expire within hours. This compresses the time horizon over which dealers must hedge, amplifying intraday gamma dynamics.

**Verified data (2025):**
- Full-year 2025 average: **59% of SPX volume** (2.3 million contracts ADV)
- August 2025 record month: **62.4%** (2.4 million contracts/day ADV)
- Q4 2025 daily average: 2.6 million contracts (highest quarter on record)
- Source: [[sources/cboe-spx-0dte-volume-2025]]

**Historical context:** In 2016 (when Cboe first added Mon/Wed/Fri expirations) 0DTE was a negligible fraction of SPX flow. By 2022 it had reached ~40%. The 2022–2025 acceleration to 59% represents a structural step-change in market microstructure.

### 2. SPX 0DTE Put/Call Ratio

**Definition:** Ratio of 0DTE put contracts to call contracts on SPX. Skew toward puts signals defensive/hedging flow; skew toward calls signals speculative/directional upside bets. The *intraday* put/call on 0DTE is more informative than the multi-week put/call because it directly tracks same-session positioning.

**Where to find it:** Cboe publishes daily put/call ratios at [cboe.com/us/options/market_statistics/daily/](https://www.cboe.com/us/options/market_statistics/daily/). Filtering for SPX 0DTE requires options analytics platforms (SpotGamma, SqueezeMetrics, ORATS).

### 3. Dealer Net Gamma (GEX / Gamma Exposure)

**Definition:** The aggregate net gamma position of options market-makers (dealers) across all outstanding SPX options, measured in dollar terms. This is the most operationally important sub-metric.

**Long gamma vs short gamma (this is the crux):**

| Dealer State | What Dealers Do When Price Moves | Market Effect |
|---|---|---|
| **Long gamma (positive GEX)** | Sell the rally, buy the dip (countertrend hedging) | Volatility dampening; price "pinned" near large strike | 
| **Short gamma (negative GEX)** | Buy the rally, sell the dip (momentum hedging) | **Volatility amplification; trends accelerate; false breakouts more likely** |

When 0DTE share is high, gamma is concentrated in contracts expiring within hours. Dealers carry extremely high gamma-per-dollar relative to historic norms. A move of even 0.5% can generate a gamma flip — transitioning the market from long-gamma dampening to short-gamma amplification **within a single trading session**.

**Why 0DTE specifically amplifies this:** Gamma is inversely proportional to time to expiry. As an option approaches expiry, its gamma approaches infinity relative to its delta. A 0DTE at-the-money SPX option carries 10–50× the gamma of a 1-month at-the-money option with the same notional. When 59% of volume is 0DTE, the *effective gamma loading on dealers* is orders of magnitude higher than it was when 0DTE was 5% of flow.

**Where to find it:** SpotGamma ([spotgamma.com](https://spotgamma.com/gamma-exposure-gex/)), SqueezeMetrics GEX, Cboe internal data. GEX flip level (the price at which net dealer gamma crosses zero) acts as the key intraday pivot.

### 4. VIX (30-Day Implied Volatility of SPX)

**Definition:** The CBOE Volatility Index — the market's 30-day forward-implied volatility for SPX, derived from the weighted-average implied vol of options expiring in the next 30 days.

**What VIX does NOT capture:** Because VIX is derived from 30-day options, it **does not directly reflect 0DTE gamma pressure**. A low VIX (e.g., 13–15) combined with high 0DTE share can still mean extreme intraday volatility in individual sessions — the 30-day outlook looks calm while same-day gamma exposure is enormous.

**Reading VIX in this context:** VIX is a useful base context (high VIX = vol regime elevated broadly), but it must be read alongside VVIX and GEX to understand intraday conditions.

### 5. VVIX (Volatility of Volatility)

**Definition:** The volatility of VIX itself — essentially the implied volatility of VIX options. A high VVIX means the market expects VIX to swing significantly; a low VVIX means VIX is expected to be stable.

**In the 0DTE context:** High VVIX combined with high 0DTE share is the most dangerous regime for intraday trading. It means both: (a) dealers face extreme gamma from 0DTE flow, AND (b) the underlying volatility regime is itself highly unstable. This is when air-pocket selloffs (sudden 1–3% drops in 15 minutes) are most probable.

**VVIX > 100** has historically been a caution threshold; **VVIX > 120** correlates with tail-risk events.

**Where to find it:** Cboe publishes VVIX at [cboe.com/tradable_products/vix/vix_data/](https://www.cboe.com/tradable_products/vix/vix_data/).

### 6. SKEW Index (Tail Risk / "Black Swan" Pricing)

**Definition:** The CBOE SKEW Index measures the implied probability of a 2–3 standard deviation downside move in SPX over the next 30 days, derived from out-of-money put pricing. Higher SKEW = the market is paying more for tail protection.

**In the 0DTE context:** SKEW captures tail-risk pricing in longer-dated options. When SKEW is elevated AND 0DTE share is high, it signals that both the intraday amplification risk (0DTE share) AND the multi-week tail risk (SKEW) are elevated simultaneously — the most defensive configuration for the trader agent.

**SKEW baseline:** Typically ranges 100–160; values above 145–150 indicate elevated tail-protection demand.

---

## The Intraday Volatility Amplification Mechanism

Understanding *why* high 0DTE share amplifies intraday volatility is essential to using this indicator correctly.

**Step-by-step mechanism:**

1. A large number of retail and institutional traders buy 0DTE SPX calls or puts.
2. The dealer (market-maker) who sold those options is now exposed to gamma risk — the position's delta changes rapidly with price.
3. To remain delta-neutral, the dealer must hedge by buying or selling SPX futures/ETF continuously as price moves.
4. When the dealer is **short gamma** (net sold options): if SPX rises, dealer must buy futures to hedge → this buying pushes SPX higher → triggers more dealer buying → feedback loop (false breakout). If SPX falls, dealer must sell futures → pushes SPX lower → air pocket.
5. With 59% of SPX volume expiring same-day, the gamma load on dealers is historically unprecedented. Small intraday moves can trigger multi-billion-dollar dealer hedge flows within minutes.
6. The gamma flip point (where net GEX crosses zero) acts as the intraday pivot; once price crosses it, the hedging direction reverses and so can the trend.

**Net result:** In a high-0DTE regime, intraday price moves are **not purely driven by fundamental information**. A significant fraction of intraday movement is dealer-hedge-flow-driven. This means:

- Intraday breakouts from key levels are more likely to be **false breakouts** (gamma-driven overshoots)
- Reversals back through key levels can be sudden ("air pocket" selloffs or rips)
- End-of-day returns tend to mean-revert more than multi-day options would predict
- The relationship between morning price action and closing price is weaker than in pre-0DTE-era markets

---

## Reading VIX, VVIX, and SKEW Together

| VIX | VVIX | SKEW | 0DTE Share | Regime Assessment |
|---|---|---|---|---|
| Low (< 15) | Low (< 90) | Normal (< 135) | 55–62% | Complacent/low-vol; intraday gamma amplification present but muted by directional clarity |
| Low (< 15) | High (> 100) | Elevated (> 145) | 55–62% | **Deceptive calm**: headline vol is low but tail risk is being priced; 0DTE gamma could snap |
| Elevated (15–25) | High (> 100) | Elevated | 55–62% | Active vol regime; highest risk of intraday air pockets and false breakouts |
| Spike (> 25) | Very high (> 120) | Very high | 55–62% | Tail event in progress; 0DTE flow often crashes as participants flee same-day instruments |
| Post-spike normalization | Falling VVIX | SKEW collapsing | Recovering | Risk-off regime ending; 0DTE flow returns as confidence rebuilds |

---

## How This Changes Trader-Agent Behavior

This indicator does **not change the directional signal** (buy/sell/flat). It changes **how the position is sized and protected**:

1. **Position sizing:** When 0DTE share is at/above the 59% historical average AND GEX is negative AND VVIX > 100, the trader agent should apply a **regime discount** to position size — reducing notional exposure regardless of signal confidence. See [[concepts/volatility-targeting]] for the σ_target scaling formula.

2. **Circuit breakers:** Intraday stop-loss thresholds should be wider in high-0DTE regimes to avoid being stopped out by dealer-driven gamma overshoots, then tightened post-close when gamma resets. See [[synthesis/ai-quant-trading-architecture-improvements]] §1.3 for the circuit-breaker TODO.

3. **Entry timing:** Avoid entering at the open (9:30–10:00 ET) and the last hour (15:00–16:00 ET) in high-0DTE regimes — gamma pressure is highest at open (same-day options just printed) and at close (expiry forces mass dealer unwind).

4. **False-breakout filter:** A breakout above/below a key level in the first 90 minutes of trading has a higher-than-historical probability of reversing in a high-0DTE environment. Require confirmation (e.g., 30-minute close beyond the level) before treating it as a genuine breakout signal.

> **Summary instruction for the trader agent:** When SPX 0DTE share is above 55%, treat all intraday momentum signals as suspect unless confirmed by fundamental catalyst. Do not increase position size to chase an intraday move. Use the vol-targeting layer ([[concepts/volatility-targeting]]) to mechanically reduce notional in high-vol-amplification regimes.

---

## Representative Tickers

These are **sector proxies illustrating exposure** to 0DTE volume growth — not holdings, not recommendations.

**Beneficiaries of 0DTE volume growth (exchange/broker):**

| Ticker | Category | Connection |
|---|---|---|
| CBOE | Exchange operator | Transaction fees on every SPX 0DTE contract; direct revenue beneficiary of 0DTE volume growth |
| IBKR | Broker-dealer | High options-active client base; options commissions + PFOF equivalents |
| HOOD | Retail broker | Retail traders are ~53% of 0DTE volume; Robinhood's core demographic |

**Primary underlying:**

| Instrument | Role |
|---|---|
| SPX (S&P 500 Index) | The underlying for all SPX 0DTE options; the market being amplified |
| SPY (S&P 500 ETF) | Liquid ETF alternative; also has 0DTE options (though smaller volume than SPX) |

---

## Canonical Data Sources

1. **Cboe SPX 0DTE Volume Statistics** — [[sources/cboe-spx-0dte-volume-2025]] — Primary source; full-year 2025 confirmed 2.3M ADV / 59% SPX share
2. **Cboe Options Statistics (daily)** — [cboe.com/us/options/market_statistics/](https://www.cboe.com/us/options/market_statistics/) — Daily put/call ratios and volume breakdowns
3. **Cboe VVIX data** — [cboe.com/tradable_products/vix/vix_data/](https://www.cboe.com/tradable_products/vix/vix_data/)
4. **SpotGamma GEX** — [spotgamma.com](https://spotgamma.com/gamma-exposure-gex/) — Third-party dealer gamma exposure estimates

---

## Key Facts Verified (as of 2026-06-01)

- Full-year 2025 SPX 0DTE ADV: **2.3 million contracts** (CONFIRMED — Cboe IR press release Jan 6, 2026)
- Full-year 2025 0DTE share: **59% of SPX volume** (CONFIRMED — same press release)
- August 2025 record share: **62.4%** (CONFIRMED — Cboe Insights Sep 2, 2025)
- Total 2025 US options volume: 15.2 billion contracts, sixth consecutive record year

---

## See Also

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[concepts/volatility-targeting]] — Position sizing by σ_target/σ_i; the mechanism through which this indicator feeds into the trader agent's risk layer
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.3 circuit breakers (TODO-C: hard-stop at σ_target × 2) and §1.1 event-driven architecture where vol-regime signals route asynchronously
- [[concepts/event-driven-quant-architecture]] — The pub/sub pipeline that carries intraday regime signals (including GEX updates) to the position-sizing module
- [[concepts/cyber-insurance-attack-frequency-indicator]] — Sibling indicator in the same Risk cluster; fundamental/macro vs this market-structure signal
- [[sources/cboe-spx-0dte-volume-2025]] — Primary data source with verified statistics
