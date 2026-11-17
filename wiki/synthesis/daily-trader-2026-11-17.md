---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-11-17
---

# Daily Trader Evaluation — 2026-11-17

> **STATUS: STUB — data blocked.** This is the first run of the daily-trader evaluation agent. Two blockers prevented live price data from being fetched. See §Blockers below. All sections below that require price data are marked N/A and will populate on the next successful run.

## Blockers

### 1. No `agents/src/trader/` pipeline
The task references `agents/src/trader/cli.py`, `agents/src/trader/orchestrator.py`, and `agents/src/trader/tools/yfinance_client.py`. None of these exist in the repository yet — only the Firefly orbital-data-center pipeline (`agents/src/firefly/`) is present. The `uv run trader scan` command cannot be invoked.

**Mitigation attempted:** fallback to raw `yfinance` Python calls to produce a minimal data layer.

### 2. Yahoo Finance network proxy block (403)
All `yfinance` requests to `fc.yahoo.com` and `finance.yahoo.com` return:
```
CONNECT tunnel failed, response 403
```
The remote cloud execution environment's outbound proxy does not permit connections to Yahoo Finance. This is a known constraint of this environment.

**Mitigation attempted:** one retry with the same client — same result. No backoff is meaningful when it is a policy-level 403.

---

## 1. Watchlist (Bootstrap Run)

No prior `daily-trader-*.md` exists, so the watchlist is seeded from the **core set** defined in the task:

| # | Ticker | Seed Basis        |
|---|--------|-------------------|
| 1 | NVDA   | Core set          |
| 2 | AAPL   | Core set          |
| 3 | TSLA   | Core set          |
| 4 | MSFT   | Core set          |
| 5 | AMD    | Core set          |
| 6 | GOOGL  | Core set          |
| 7 | META   | Core set          |
| 8 | AMZN   | Core set          |

Cap of 15 tickers — 8 seeded, 7 slots available for exploration candidates on future runs.

---

## 2. Backtest of Prior Recommendations

**N/A — first run, no prior recommendations to backtest.**

| Ticker | Predicted Dir | Realized 1d % | Hit/Miss |
|--------|--------------|----------------|----------|
| —      | —            | —              | —        |

**Hit rate:** N/A  
**Mean realized return:** N/A

---

## 3. Today's Scan Results

**N/A — blocked by proxy 403 (all 8 tickers).**

| Ticker | Direction | Confidence | Sizing Sigma | Note         |
|--------|-----------|------------|--------------|--------------|
| NVDA   | —         | —          | —            | proxy_403    |
| AAPL   | —         | —          | —            | proxy_403    |
| TSLA   | —         | —          | —            | proxy_403    |
| MSFT   | —         | —          | —            | proxy_403    |
| AMD    | —         | —          | —            | proxy_403    |
| GOOGL  | —         | —          | —            | proxy_403    |
| META   | —         | —          | —            | proxy_403    |
| AMZN   | —         | —          | —            | proxy_403    |

Scan JSON: `agents/outputs/scan-2026-11-17.json`

---

## 4. Reranked Watchlist

**N/A — no scan data.**

| Tier   | Tickers |
|--------|---------|
| Tier-1 | — (top 5 by FOM) |
| Tier-2 | — (next 5)       |
| Drop   | —               |

---

## 5. Figure of Merit (FOM) Definition

The FOM formula to use once data is available:

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

Where each component is normalized to [0, 1]:
- `confidence`: model's directional conviction (0–1 from scan output)
- `normalized_sizing_sigma`: position sizing signal, normalized across the watchlist
- `recent_hit_rate`: fraction of prior calls correct (rolling last-5-day window); 0.5 for first run (neutral)
- `news_momentum`: derived from news_scout surface area; 0 if no scout data

**FOM Table (N/A this run):**

| Ticker | Confidence | Norm σ | Hit Rate | News Mom | FOM  |
|--------|------------|--------|----------|----------|------|
| —      | —          | —      | —        | —        | —    |

---

## 6. Open Questions / Things to Revisit Tomorrow

1. **Build `agents/src/trader/`**: add `orchestrator.py`, `cli.py`, `schemas.py`, and `tools/yfinance_client.py` so the full pipeline is runnable. Even a stub mode that outputs deterministic JSON is enough to unblock CI.
2. **Resolve proxy block**: either (a) whitelist `fc.yahoo.com` and `query1.finance.yahoo.com` in the cloud-env network policy, or (b) add an alternative data source (Polygon.io, Alpaca Markets data API, Alpha Vantage) reachable via the existing proxy.
3. **First real backtest**: once data flows, the first real backtest window will cover tomorrow's 1-day return for the 8 core tickers.
4. **News scout integration**: decide whether to wire a news_scout sub-agent (e.g. via WebSearch) for `news_momentum` scoring before or after the trader CLI exists.
5. **FOM calibration**: the 0.4/0.3/0.2/0.1 weights are a starting guess. After 5 trading days with live data, run a simple grid search over the weights to maximize rolling hit-rate.

---

*Analysis only — no order placement, no money movement.*  
*Scan artifact:* `agents/outputs/scan-2026-11-17.json`
