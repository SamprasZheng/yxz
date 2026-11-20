---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-11-20
---

# Daily Trader Evaluation — 2026-11-20

> **STATUS: STUB RUN — two blockers prevented live data and scan execution.**
> This file documents what was attempted, what blocked it, and the full methodology
> so the first successful run can proceed without re-deriving the approach.

---

## Blockers

### B1 — Trader pipeline does not exist

`agents/src/trader/` referenced in the task prompt has never been created.
Only `agents/src/firefly/` (orbital data-center mission planning) exists.

**Required to build:**

| Module | Purpose |
|---|---|
| `agents/src/trader/cli.py` | `trader research` and `trader scan` typer commands |
| `agents/src/trader/orchestrator.py` | Coordinates research/scan/rerank/FOM steps |
| `agents/src/trader/schemas.py` | Pydantic models: `TickerVerdict`, `ScanResult`, `FOMRow` |
| `agents/src/trader/tools/yfinance_client.py` | 1-day % change fetcher with retry/backoff |
| `agents/src/trader/tools/news_scout.py` | News momentum signal (RSS / Anthropic LLM summary) |

The `pyproject.toml` would need a `trader` entry-point and `yfinance` as a dependency.

### B2 — Yahoo Finance blocked by proxy (403)

`yfinance` v1.8.0 (Python 3.13) installed successfully, but all 15 ticker requests failed:

```
Cookie fetch from fc.yahoo.com failed (ConnectionError)
CONNECT tunnel failed, response 403
```

The remote execution environment's egress proxy blocks `fc.yahoo.com` and `finance.yahoo.com`.

**Resolution paths:**
- Add `finance.yahoo.com` + `fc.yahoo.com` to the environment egress allowlist, **or**
- Switch to [Stooq](https://stooq.com/q/d/l/?s=nvda.us&i=d) CSV (plain HTTP, proxy-friendly), **or**
- Use Alpha Vantage (env var `ALPHA_VANTAGE_KEY`), **or**
- Use the `pandas_datareader` stooq backend as fallback in `yfinance_client.py`

---

## Watchlist (seed — no prior file)

No `wiki/synthesis/daily-trader-*.md` file existed before this run.
Seed watchlist (15 tickers, capped per task instructions):

```
NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN, PLTR, AVGO, ARM, SMCI, TSM, INTC, QCOM
```

Rationale for additions beyond the core 8:
- **PLTR** — in wiki ([[entities/palantir]], Q2-2026 deepened 2026-08-07); high wiki-coverage relevance
- **AVGO** — dominant in AI networking/datacenter switching; complements NVDA thesis
- **ARM** — CPU licensing royalty play on AI inference edge silicon
- **SMCI** — server integrator; direct GPU datacenter exposure
- **TSM** — Taiwan Semiconductor; upstream to NVDA/AMD/ARM; in wiki ([[entities/win-semiconductors]] adjacency)
- **INTC** — turnaround watch; counterweight to AMD/NVDA
- **QCOM** — Snapdragon AI PC + on-device inference; complements ARM

---

## Yesterday's Backtest

No prior recommendations exist (first run). Backtest table: **N/A**.

For subsequent runs, the formula is:

| Column | Description |
|---|---|
| `ticker` | Symbol |
| `predicted_dir` | `long` / `short` / `abstain` from prior scan |
| `predicted_confidence` | 0–1 confidence score |
| `realized_pct` | Actual 1-day % change (yfinance close-to-close) |
| `hit` | `✓` if predicted direction matches sign of realized_pct |
| `sizing_sigma_predicted` | Expected move in σ units |
| `sizing_sigma_realized` | Realized move / trailing 20d σ |

**Hit rate (prior day):** N/A (no prior data)
**Mean realized return (long calls):** N/A

---

## Today's Scan Verdicts

Scan not executed — B1 (no pipeline) + B2 (proxy block).

**Fallback offline format** (what the pipeline would emit per ticker):

```json
{
  "ticker": "NVDA",
  "direction": "long | short | abstain",
  "confidence": 0.0,
  "sizing_sigma": 0.0,
  "thesis": "...",
  "news_momentum": 0.0,
  "data_source": "offline_stub"
}
```

---

## Reranked Watchlist

Cannot rerank without scan verdicts or backtest data.
On first successful run, rerank formula is:

```
forward_score  = confidence × sizing_sigma   (normalized 0–1)
backward_score = recent_hit_rate             (rolling 5-day, 0 on first run)
combined_score = 0.6 × forward + 0.4 × backward
```

**Tier-1** (top 5 by combined_score): TBD
**Tier-2** (next 5): TBD
**Dropped**: TBD

---

## FOM (Figure of Merit) Formula

Defined here for all future runs:

```
FOM = 0.4 × confidence
    + 0.3 × norm(sizing_sigma)
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

Where each component is normalized to [0, 1]:
- `confidence`: raw confidence score from scan verdict (already 0–1)
- `norm(sizing_sigma)`: `(sizing_sigma - min_σ) / (max_σ - min_σ)` across watchlist
- `recent_hit_rate`: rolling 5-day hit rate (0.5 as prior on first run)
- `news_momentum`: count of positive news mentions / (positive + negative) over 48h window, from `news_scout`

**Rationale for weights:**
- Confidence (0.4) dominates because it encodes the LLM's directional conviction
- Sizing sigma (0.3) captures expected magnitude — a high-confidence but tiny-move call is less actionable
- Recent hit rate (0.2) is backward-looking validation — degrades calls from models that have been wrong
- News momentum (0.1) is a soft signal; kept low to avoid overfitting to headlines

**FOM Table (stub):**

| Ticker | Confidence | norm_σ | Hit Rate | News Mom | FOM | Tier |
|---|---|---|---|---|---|---|
| NVDA | — | — | 0.50* | — | — | pending |
| AAPL | — | — | 0.50* | — | — | pending |
| TSLA | — | — | 0.50* | — | — | pending |
| MSFT | — | — | 0.50* | — | — | pending |
| AMD | — | — | 0.50* | — | — | pending |
| GOOGL | — | — | 0.50* | — | — | pending |
| META | — | — | 0.50* | — | — | pending |
| AMZN | — | — | 0.50* | — | — | pending |
| PLTR | — | — | 0.50* | — | — | pending |
| AVGO | — | — | 0.50* | — | — | pending |
| ARM | — | — | 0.50* | — | — | pending |
| SMCI | — | — | 0.50* | — | — | pending |
| TSM | — | — | 0.50* | — | — | pending |
| INTC | — | — | 0.50* | — | — | pending |
| QCOM | — | — | 0.50* | — | — | pending |

*Prior = 0.50 (uniform, first run)

---

## Open Questions / Things to Revisit Tomorrow

1. **Build the trader pipeline** — `agents/src/trader/` is the gating dependency. Suggest copying the Firefly CLI/orchestrator/schema pattern.
2. **Egress allowlist** — resolve proxy 403 for Yahoo Finance, or switch to a proxy-friendly data source (Stooq CSV or Alpha Vantage).
3. **LLM_BACKEND** — the task specifies `LLM_BACKEND=anthropic`; verify the `ANTHROPIC_API_KEY` env var is available in the scheduled run environment.
4. **TRADER_OFFLINE fallback** — implement the stubbed pipeline path (`LLM_BACKEND=disabled TRADER_OFFLINE=1`) so future runs produce at least a schema-valid JSON scan even when the LLM backend is unavailable.
5. **News scout** — decide data source: RSS feeds (Reuters, Bloomberg terminal, or free alternatives), or Anthropic web-search tool for headline sentiment.
6. **Backtest calibration** — after 5+ days of live calls, fit a Platt-scaling layer to convert raw confidence → calibrated probability; re-weight FOM confidence term accordingly.

---

## Related

- [[synthesis/techno-industrial-state-defense-tech-six-region]] — PLTR/Palantir context
- [[entities/palantir]] — deepened 2026-08-07
- [[entities/nvidia]] — NVDA context (AI, Jetson, GTC Taipei)
- Scan artifact: `agents/outputs/scan-2026-11-20.json`
