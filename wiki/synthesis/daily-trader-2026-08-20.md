---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-08-20
status: stub
---

# Daily Trader Evaluation — 2026-08-20

> **STUB RUN** — Two hard blockers prevented a live scan. This page documents the blockers, the intended methodology, and the seed watchlist so the next run can start from a known state.

---

## Blockers

### 1. Trader pipeline does not exist

`agents/src/trader/` is absent from the repository — only the Firefly orbital mission-planning pipeline exists. The CLI commands `trader scan` and `trader research` referenced in the task prompt have not been built yet.

**What's needed to unblock:**
- Create `agents/src/trader/` with at minimum:
  - `cli.py` — `trader research <ticker>` and `trader scan --tickers <list>` commands
  - `orchestrator.py` — pipeline entry point
  - `tools/yfinance_client.py` — wraps `yfinance.Ticker.history()`
  - `schemas.py` — `ScanResult`, `Thesis`, `FOMScore` Pydantic models
- Register a `trader` entrypoint in `agents/pyproject.toml`

### 2. Yahoo Finance / yfinance network-blocked

The remote execution environment proxies all HTTPS through an agent proxy that returns `403 CONNECT tunnel failed` for `finance.yahoo.com`. All 8 seed tickers (NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN) returned errors.

**What's needed to unblock:**
- Either whitelist `finance.yahoo.com` in the environment's network policy, or
- Switch to an alternative data source accessible through the proxy (e.g., a locally-served mock, a CSV fixture for offline testing, or an allowed financial API endpoint).

---

## Intended Methodology (for next run)

### Watchlist

Seed: `NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN` (core 8, capped at 15 total).
On subsequent runs: recover yesterday's tickers from the prior `daily-trader-*.md` + promote any new tickers surfaced by the news scout.

### Backtest (yesterday's calls)

For each ticker in the prior day's watchlist, fetch 1-day realized % change via `yfinance.Ticker(sym).history(period="2d")`. Score each call:

| Ticker | Predicted Dir | Realized % | Hit? | Notes |
|--------|--------------|-----------|------|-------|
| —      | —            | —         | —    | No prior report; first run |

**Hit rate:** N/A (no prior report)
**Mean realized return:** N/A

### Today's Scan

Command (when pipeline exists):
```bash
cd agents
uv sync
LLM_BACKEND=anthropic uv run trader scan \
  --tickers NVDA,AAPL,TSLA,MSFT,AMD,GOOGL,META,AMZN \
  --window 7 \
  --skip-wiki
```

Fallback (offline stub):
```bash
LLM_BACKEND=disabled TRADER_OFFLINE=1 uv run trader scan ...
```

Output: `agents/outputs/scan-2026-08-20.json` (stub with `status: "stub"` written this run).

### Scan Verdicts

| Ticker | Direction | Confidence | Sizing σ | Thesis Summary |
|--------|-----------|-----------|---------|----------------|
| NVDA   | —         | —         | —       | Pipeline not available |
| AAPL   | —         | —         | —       | Pipeline not available |
| TSLA   | —         | —         | —       | Pipeline not available |
| MSFT   | —         | —         | —       | Pipeline not available |
| AMD    | —         | —         | —       | Pipeline not available |
| GOOGL  | —         | —         | —       | Pipeline not available |
| META   | —         | —         | —       | Pipeline not available |
| AMZN   | —         | —         | —       | Pipeline not available |

### Reranked Watchlist

**Tier 1 (top 5):** NVDA, MSFT, GOOGL, META, AMZN *(seeded by market-cap heuristic; replace with FOM scores once scan runs)*

**Tier 2 (next 5):** AAPL, TSLA, AMD *(remaining seed tickers)*

**Dropped:** none (first run, all tickers retained)

### FOM — Figure of Merit

Formula (normalized to [0,1] per component):

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

**Component definitions:**
- `confidence`: model's thesis confidence (0–1) from the scan output
- `normalized_sizing_sigma`: `sizing_sigma / max(sizing_sigma across watchlist)` — relative position size signal
- `recent_hit_rate`: rolling 5-day hit rate for this ticker's prior directional calls (0–1); defaults to 0.5 for first run
- `news_momentum`: normalized count/sentiment of positive news events from `news_scout` in the past 7 days (0–1); defaults to 0.5 when scout is unavailable

**FOM Table (stub — all scores 0 due to missing scan):**

| Ticker | Confidence | Norm σ | Hit Rate | News Mom. | FOM  | Tier |
|--------|-----------|--------|----------|-----------|------|------|
| NVDA   | 0.00      | 0.00   | 0.50     | 0.50      | 0.15 | T1   |
| MSFT   | 0.00      | 0.00   | 0.50     | 0.50      | 0.15 | T1   |
| GOOGL  | 0.00      | 0.00   | 0.50     | 0.50      | 0.15 | T1   |
| META   | 0.00      | 0.00   | 0.50     | 0.50      | 0.15 | T1   |
| AMZN   | 0.00      | 0.00   | 0.50     | 0.50      | 0.15 | T1   |
| AAPL   | 0.00      | 0.00   | 0.50     | 0.50      | 0.15 | T2   |
| TSLA   | 0.00      | 0.00   | 0.50     | 0.50      | 0.15 | T2   |
| AMD    | 0.00      | 0.00   | 0.50     | 0.50      | 0.15 | T2   |

*All FOMs are identical (0.15 = 0.4×0 + 0.3×0 + 0.2×0.5 + 0.1×0.5) because the scan did not run. This is the correct degenerate output for a first / blocked run — ties are broken by market-cap heuristic for tier assignment.*

---

## Open Questions / Things to Revisit Tomorrow

1. **Build the trader pipeline.** `agents/src/trader/` needs to be created before any live scan can run. The Firefly pipeline (`agents/src/firefly/`) is a good structural template.
2. **Unblock yfinance.** Either whitelist `finance.yahoo.com` in the environment's network policy or introduce a mock/fixture data path so offline runs still produce non-trivial backtest tables.
3. **Calibrate the FOM formula.** The 0.4/0.3/0.2/0.1 weights are unvalidated placeholders. After the first real run, compute the Pearson correlation of each component against next-day realized return and reweight accordingly.
4. **News scout integration.** The `news_momentum` component is currently stubbed at 0.5. Hook in a real news source (e.g., Alpaca News API or a proxy-accessible endpoint) to populate it.
5. **Add `trader` to `pyproject.toml`.** The entrypoint block should read:
   ```toml
   [project.scripts]
   firefly = "firefly.cli:app"
   trader  = "trader.cli:app"
   ```

---

## Artifacts

- `agents/outputs/scan-2026-08-20.json` — stub scan output documenting blockers
- `wiki/synthesis/daily-trader-2026-08-20.md` — this file
