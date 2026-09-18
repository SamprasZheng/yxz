---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-09-18
---

# Daily Trader Evaluation — 2026-09-18

**Status: STUB RUN — two blockers prevented live data; see Blockers section.**
This page is the first entry in the daily-trader series. Future runs will backtest prior calls once real data can flow.

---

## Blockers (Why This Is a Stub)

### Blocker 1 — Trader Pipeline Not Implemented

`agents/src/trader/` does **not exist** in this repository. Only `agents/src/firefly/` is present. The `trader research` / `trader scan` CLI described in the task specification has not been built yet.

**Resolution required:**
- Implement `agents/src/trader/cli.py` with `trader research` and `trader scan` subcommands
- Add `agents/src/trader/orchestrator.py`, `schemas.py`, and `tools/yfinance_client.py`
- Register `trader` entry point in `agents/pyproject.toml`

### Blocker 2 — Yahoo Finance Egress Blocked by Proxy

The remote execution environment proxy returns **HTTP 403 on CONNECT tunnel** to `fc.yahoo.com`. `yfinance 1.7.0` was installed successfully, but all 8 ticker fetches (NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN) failed with:

```
Failed to perform, curl: (7) CONNECT tunnel failed, response 403
```

**Resolution options:**
1. Run daily-trader from an environment with unrestricted HTTPS egress to Yahoo Finance
2. Switch to a proxy-compatible market-data provider (e.g. Polygon.io, Alpha Vantage) with an appropriate client adapter

---

## Yesterday's Backtest Table

| Ticker | Predicted Dir | Realized 1d% | Hit/Miss |
|--------|--------------|-------------|---------|
| —      | —            | —           | — (first run; no prior report to backtest) |

**Hit rate:** N/A (first run)
**Mean realized return:** N/A (first run)

---

## Today's Scan Verdicts

No live scan data available due to Blocker 1 + Blocker 2 above.

| Ticker | Direction | Confidence | Sizing σ | Source |
|--------|-----------|-----------|---------|--------|
| (stub) | —         | —         | —       | pipeline absent |

Scan JSON: `agents/outputs/scan-2026-09-18.json`

---

## Reranked Watchlist

**Seeded core watchlist for next run (no ranking possible without data):**

### Tier-1 (target: top 5 by forward FOM)
_Unpopulated — awaiting live pipeline_

### Tier-2 (next 5)
_Unpopulated — awaiting live pipeline_

### Seeded watchlist for next run
`NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN`

---

## FOM Table

**FOM Formula (to be applied once data flows):**

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

Where each component is normalized to [0, 1]:
- `confidence`: model confidence in the direction call (0–1)
- `normalized_sizing_sigma`: `min(sizing_sigma / 3.0, 1.0)` — how many daily-vol std-devs the momentum signal is, capped at 3σ
- `recent_hit_rate`: rolling 5-day hit rate (0–1), bootstrapped from prior daily-trader reports
- `news_momentum`: news-scout sentiment score (0–1), from LLM news summary of last 24h headlines

| Ticker | Confidence | Norm σ | Hit Rate | News Mom | FOM |
|--------|-----------|--------|----------|---------|-----|
| (stub) | — | — | — | — | — |

FOM table sorted descending once data is available.

---

## Open Questions / Revisit Tomorrow

1. **Pipeline build**: Who will implement `agents/src/trader/`? What LLM backend and data provider are the target choices?
2. **Proxy egress**: Should the schedule run from a different environment (e.g. GitHub Actions with full internet access instead of the Claude Code remote container), or should we add an alternative market-data provider?
3. **FOM calibration**: The `0.4/0.3/0.2/0.1` weights are an initial guess. After 5+ days of live data, a logistic regression or grid search over the weights will be worth running.
4. **News momentum**: No news-scout integration exists yet. Consider using `web_search` on each ticker at run time, or a dedicated Polygon.io news endpoint.
5. **Watchlist expansion**: Once data flows, the seeded 8-ticker core set can be extended to 15 by adding tickers the KOL tracker or wiki synthesis pages reference (e.g. Anduril-adjacent defense-tech ETFs, Palantir PLTR, SpaceX surrogates).

---

## Pipeline Design Notes (for implementer)

The intended pipeline (per task spec):
1. `trader scan` fetches OHLCV via yfinance, computes 5d/20d momentum, volume ratio, annualized vol
2. For each ticker: generates a `thesis` (direction, confidence, sizing_sigma) optionally via LLM
3. Produces `agents/outputs/scan-<date>.json`
4. This wiki page summarizes: backtest of prior day, today's scan, tier ranking, FOM table

**`LLM_BACKEND=disabled TRADER_OFFLINE=1` fallback** (from task spec): when Anthropic backend unavailable, a stubbed pipeline should still run and produce the JSON with heuristic-only direction calls (no LLM thesis). Currently not possible because the CLI binary doesn't exist.
