---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-06-30
---

# Daily Trader Evaluation — 2026-06-30

> **Status: BLOCKED (first run / stub report)**
> Two blockers prevented live scan data: (1) the `agents/src/trader/` pipeline does not yet exist; (2) Yahoo Finance / yfinance is blocked by the remote-env HTTPS proxy (403 CONNECT tunnel failed on all 15 tickers). This document records the watchlist seed, FOM formula definition, and unblocking steps so the next run can proceed with live data.
> Scan artifact: `agents/outputs/scan-2026-06-30.json`

---

## 1. Yesterday's Backtest

**No prior daily-trader report exists — this is run #1.**

No predicted directions to backtest. Hit rate: N/A. Realized returns: N/A.

---

## 2. Today's Scan Verdicts

All 15 tickers returned `proxy-blocked` via yfinance. No signal computed.

| Ticker | Direction | Confidence | Sizing σ | RSI-14 | Mom-5d % | Mom-20d % | Error |
|--------|-----------|------------|----------|--------|----------|-----------|-------|
| NVDA | — | — | — | — | — | — | proxy-blocked |
| AAPL | — | — | — | — | — | — | proxy-blocked |
| TSLA | — | — | — | — | — | — | proxy-blocked |
| MSFT | — | — | — | — | — | — | proxy-blocked |
| AMD | — | — | — | — | — | — | proxy-blocked |
| GOOGL | — | — | — | — | — | — | proxy-blocked |
| META | — | — | — | — | — | — | proxy-blocked |
| AMZN | — | — | — | — | — | — | proxy-blocked |
| SMCI | — | — | — | — | — | — | proxy-blocked |
| PLTR | — | — | — | — | — | — | proxy-blocked |
| AVGO | — | — | — | — | — | — | proxy-blocked |
| TSM | — | — | — | — | — | — | proxy-blocked |
| ARM | — | — | — | — | — | — | proxy-blocked |
| INTC | — | — | — | — | — | — | proxy-blocked |
| QCOM | — | — | — | — | — | — | proxy-blocked |

**Scan fallback note:** `TRADER_OFFLINE=1` equivalent — stubbed pipeline produces the JSON artifact but all signal fields are null.

---

## 3. Reranked Watchlist

Cannot rank without data. Watchlist seeded from core set (CLAUDE.md default):

**Tier-1 (candidates for next run, no ordering):**
`NVDA`, `AAPL`, `TSLA`, `MSFT`, `AMD`

**Tier-2:**
`GOOGL`, `META`, `AMZN`, `SMCI`, `PLTR`

**Watch / exploration:**
`AVGO`, `TSM`, `ARM`, `INTC`, `QCOM`

Reranking will apply FOM scores once live data is available.

---

## 4. Figure of Merit (FOM) — Formula Definition

FOM is defined as a composite forward score per ticker:

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

Where:
- **confidence** ∈ [0,1] — model's directional conviction (derived from raw signal score / 3.5, capped at 1.0)
- **normalized_sizing_sigma** ∈ [0,1] — position size signal from RSI sweet-spot × confidence
- **recent_hit_rate** ∈ [0,1] — rolling 5-day hit rate of prior direction calls; defaults to 0.5 (no history) on first run
- **news_momentum** ∈ [0,1] — news scout sentiment score; defaults to 0.5 (neutral) when offline

All components normalized to [0,1] before weighting. FOM ∈ [0,1].

**Rationale:** The 40/30/20/10 split weights forward signal quality heaviest, then position sizing discipline, then empirical accuracy, then news flow. The news_momentum term is intentionally small to prevent headlines from dominating systematic signals.

**FOM Table (this run — all null):**

| Ticker | Confidence | Norm. σ | Hit Rate | News Mom. | FOM |
|--------|-----------|---------|----------|-----------|-----|
| All | N/A | N/A | N/A | N/A | N/A |

---

## 5. Blockers and Unblocking Steps

### Blocker A — Yahoo Finance / yfinance proxy block (Priority: HIGH)

**Error:** `ProxyError: CONNECT tunnel failed, response 403` on `finance.yahoo.com` via the remote-env outbound HTTPS proxy.

**Options to unblock (in order of preference):**
1. **Add `finance.yahoo.com` to the remote-env proxy allowlist** — simplest fix; contact the environment operator or update the network policy config. Check `/root/.ccr/README.md` for the proxy allow-list mechanism.
2. **Switch to a proxy-friendly price feed** — Polygon.io, Tiingo, or Alpha Vantage all offer free tiers with JSON REST APIs; the scan script (`agents/trader_scan.py`) can be adapted to call these instead. Requires an API key in the environment.
3. **Use a self-hosted price feed** — run a local Redis/SQLite cache seeded from a non-proxied machine and read from it in the remote env.

### Blocker B — No trader pipeline (Priority: MEDIUM)

**State:** `agents/src/trader/` does not exist. Only the Firefly orbital data center pipeline is present under `agents/src/firefly/`.

**To build the pipeline:**
1. Create `agents/src/trader/` with `orchestrator.py`, `cli.py`, `agents/`, `tools/yfinance_client.py`, `schemas.py`.
2. Register a `trader` entry point in `agents/pyproject.toml` (mirrors the existing `firefly` entry point).
3. Implement `trader scan --tickers <list> --window <days> --skip-wiki` outputting `agents/outputs/scan-<date>.json`.
4. Implement `trader research <ticker>` for single-ticker deep dives.

The standalone `agents/trader_scan.py` script written today provides a reference implementation of the signal logic (RSI-14, 5/20-day momentum, vol ratio → direction/confidence/sizing_sigma) that can be migrated into the proper pipeline structure.

---

## 6. Signal Logic (Reference — from `agents/trader_scan.py`)

```python
direction:
  raw_score = 0
  if RSI < 35:  raw_score += 1   # oversold → bullish
  if RSI > 70:  raw_score -= 1   # overbought → bearish
  if mom5 > 1%: raw_score += 1   # short-term momentum
  if mom20 > 3%: raw_score += 1  # medium-term trend
  if vol_ratio > 1.3: raw_score += 0.5  # volume confirmation

  direction = "long" if raw_score > 0.5 else "short" if < -0.5 else "abstain"
  confidence = min(|raw_score| / 3.5, 1.0)
  sizing_sigma = confidence × 1.2 if RSI ∈ [40,65] else confidence
```

---

## 7. Open Questions / Things to Revisit Tomorrow

1. **Proxy allowlist** — has the operator added `finance.yahoo.com`? Try `curl -sv https://finance.yahoo.com` in the next session before running the scan.
2. **Alternative feed** — if proxy is not fixable, pick one of Polygon/Tiingo/Alpha Vantage and store the API key in the remote env secrets.
3. **Trader pipeline build** — do we want the full `agents/src/trader/` pipeline, or is `agents/trader_scan.py` sufficient for the daily routine? The standalone script is ~130 lines and covers the core signal loop.
4. **LLM scan backend** — the task spec calls for `LLM_BACKEND=anthropic` for a thesis-generation step per ticker. Once yfinance unblocks, consider whether to add an Anthropic call for a 1-sentence thesis per ticker or keep the routine fully deterministic.
5. **Watchlist curation** — 15 tickers (the cap) currently covers large-cap US tech + semiconductors. Consider adding 1–2 Taiwan exposure tickers (TSM already in list) and an AI-infra play (e.g., DELL, HPE) aligned with the repo's ODC/Firefly research focus.
6. **FOM weights calibration** — the 40/30/20/10 split is a first-principles guess. After 10+ days of data, run a simple OLS regression on (FOM components → next-day realized return) to recalibrate.
