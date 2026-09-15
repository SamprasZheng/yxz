---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-09-09
---

# Daily Trader Evaluation — 2026-09-09

> **Status: STUB — blockers prevented live evaluation. See §Blockers below.**
>
> This is the **first run** of the daily trader evaluation pipeline. No prior
> `daily-trader-*.md` files exist, so there is no backtest baseline.

---

## Blockers (why this is a stub)

### 1. Trader pipeline not built

`agents/src/trader/` does not exist. The repo's agent code lives entirely
under `agents/src/firefly/` (orbital data center mission planning). The
`trader scan`, `trader research` CLI, `tools/yfinance_client.py`, and
all schemas referenced in the task specification have not been implemented
yet.

**Fix required:** Build `agents/src/trader/` with at minimum:
- `cli.py` — `trader research` (single ticker) and `trader scan` (watchlist)
- `orchestrator.py`
- `tools/yfinance_client.py` (or alternate price feed)
- `schemas.py` — ticker scan verdict schema
- `agents/` — news_scout, thesis_writer, sizer sub-agents

### 2. Network access to Yahoo Finance blocked

`yfinance` was installed successfully (`pip install yfinance`), but every
price fetch failed with:

```
CONNECT tunnel failed, response 403
```

The remote execution environment proxies all outbound HTTPS and blocks
`fc.yahoo.com` / `finance.yahoo.com`. No 1-day price change data could be
retrieved for any ticker.

**Fix required:** Either (a) run the daily evaluation in an environment with
Yahoo Finance access, or (b) integrate a proxy-permitted alternative such as
Alpha Vantage, Polygon.io, or a pre-cached OHLCV dataset.

---

## Watchlist (seed — no prior file to inherit from)

First run uses the core seed from the task specification, capped at 8
tickers (within the 15-ticker budget):

| Ticker | Seed Source          |
|--------|----------------------|
| NVDA   | core seed            |
| AAPL   | core seed            |
| TSLA   | core seed            |
| MSFT   | core seed            |
| AMD    | core seed            |
| GOOGL  | core seed            |
| META   | core seed            |
| AMZN   | core seed            |

---

## Backtest (Prior-Day Recommendations)

**N/A — first run.** No prior daily-trader synthesis page exists; no
predicted directions to score.

| Ticker | Predicted Dir | Realized 1d% | Hit/Miss |
|--------|---------------|--------------|----------|
| —      | —             | blocked      | —        |

**Hit rate:** N/A (0 prior calls)
**Mean realized return:** N/A

---

## Today's Scan Verdicts

Scan not executed — `agents/src/trader/` pipeline missing.
Stub JSON written to `agents/outputs/scan-2026-09-09.json`.

| Ticker | Direction | Confidence | Sizing σ | Source               |
|--------|-----------|------------|----------|----------------------|
| NVDA   | —         | —          | —        | pipeline not built   |
| AAPL   | —         | —          | —        | pipeline not built   |
| TSLA   | —         | —          | —        | pipeline not built   |
| MSFT   | —         | —          | —        | pipeline not built   |
| AMD    | —         | —          | —        | pipeline not built   |
| GOOGL  | —         | —          | —        | pipeline not built   |
| META   | —         | —          | —        | pipeline not built   |
| AMZN   | —         | —          | —        | pipeline not built   |

---

## Reranked Watchlist

Cannot rank without scan verdicts. Tier assignments deferred.

**Tier-1 (top 5):** Deferred.
**Tier-2 (next 5):** Deferred.

---

## Figure of Merit (FOM)

Formula (to be computed on next successful run):

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

Each component is normalized to [0, 1]:
- **confidence**: from the scan verdict's thesis confidence score [0–1]
- **normalized_sizing_sigma**: `sizing_sigma / max_sizing_sigma` across the
  current watchlist
- **recent_hit_rate**: rolling 5-day directional accuracy [0–1]
- **news_momentum**: normalized sentiment score from news_scout agent [0–1]

| Ticker | FOM  | confidence | norm_σ | hit_rate | news_mom |
|--------|------|------------|--------|----------|----------|
| —      | N/A  | N/A        | N/A    | N/A      | N/A      |

---

## Open Questions / Revisit Tomorrow

1. **Build the trader pipeline.** Priority-1 prerequisite for every
   subsequent run. See §Blockers §1.
2. **Network access.** Confirm whether the scheduled runner (GitHub Actions
   or Claude Code web) permits outbound access to Yahoo Finance or
   Polygon.io. If not, bake a pre-cached OHLCV CSV or use the GitHub
   Actions `ubuntu-latest` runner which allows external HTTPS.
3. **Watchlist seeding from wiki.** Once the pipeline runs, the news_scout
   agent can surface additional candidates from recent wiki synthesis
   pages (e.g., `entities/palantir`, `entities/nvidia`,
   `entities/hanwha-aerospace`).
4. **FOM calibration.** The 0.4/0.3/0.2/0.1 weights are a starting prior.
   After 10+ runs, compute an OLS regression of FOM vs realized 5-day
   return to calibrate weights empirically.
5. **Backtest methodology.** Define the "realized 1d% change" baseline
   day precisely (market close UTC vs close-of-prior-session) and handle
   market holidays.

---

## Artifacts

- `agents/outputs/scan-2026-09-09.json` — stub scan output documenting blockers
