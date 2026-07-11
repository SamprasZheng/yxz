---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-07-11
---

# Daily Trader Evaluation — 2026-07-11

> **Status: STUB — two blockers prevented live data.** See § Blockers below.
> This stub establishes the watchlist, FOM formula, and report schema so the next run can execute immediately.

---

## Blockers (Why This Is a Stub)

### Blocker 1 — Trader pipeline not yet built

`agents/src/trader/` does not exist.  The `agents/` directory contains only the Firefly mission-planning pipeline (`agents/src/firefly/`).  There is no `trader scan`, `trader research`, or `yfinance_client.py`.

**Required to unblock:**  Create the trader module under `agents/src/trader/` with at minimum:
- `cli.py` — `trader scan` and `trader research` entrypoints (Typer)
- `tools/yfinance_client.py` — yfinance wrapper returning normalized OHLCV + derived signals
- `orchestrator.py` — scan loop: fetch → score → rank → emit JSON
- `schemas.py` — Pydantic models for `TickerSignal`, `ScanResult`, `FOMScore`

### Blocker 2 — Outbound HTTPS proxy blocks Yahoo Finance

`yfinance` calls fail with `curl: (56) CONNECT tunnel failed, response 403` for all tickers.  The remote execution environment routes traffic through a pre-configured proxy (`HTTPS_PROXY` / CA bundle `/root/.ccr/ca-bundle.crt`) that rejects the Yahoo Finance CDN endpoint (`query1.finance.yahoo.com`).

**Required to unblock:**  One of:
- Allowlist `query1.finance.yahoo.com` and `finance.yahoo.com` in the proxy policy.
- Replace yfinance with a proxy-compatible data source (e.g., Alpha Vantage, Polygon.io, or a self-hosted price cache).
- Pre-stage OHLCV CSVs in `agents/data/prices/` for the offline `TRADER_OFFLINE=1` path.

---

## Watchlist (Seeded — No Prior Report)

No prior `daily-trader-*.md` report found.  Watchlist seeded from CLAUDE.md core set.
Cap: 15 tickers.

| # | Ticker | Rationale |
|---|--------|-----------|
| 1 | NVDA | AI-GPU flagship; cross-cuts Nemotron/NemoClaw wiki clusters |
| 2 | AAPL | Mega-cap bellwether |
| 3 | TSLA | High-beta; momentum signal anchor |
| 4 | MSFT | AI infra + Copilot exposure |
| 5 | AMD | GPU/CPU; direct NVDA competitive read |
| 6 | GOOGL | Gemini + cloud; Suncatcher ODC signal |
| 7 | META | AI infra spend; social-graph wiki relevance |
| 8 | AMZN | AWS; Kuiper constellation operator |
| 9 | AVGO | Broadband IC; DPD/beamformer wiki cluster |
| 10 | ARM | CPU IP; SoC/edge AI supply chain |
| 11 | SMCI | NVIDIA downstream; H100 integration |
| 12 | TSM | Taiwan upstream; LEO supply chain anchor |
| 13 | SPY | Benchmark |
| 14 | QQQ | Tech benchmark |
| 15 | INTC | Laggard signal; x86 vs ARM |

---

## Yesterday's Backtest

*N/A — first run.  No prior predictions to score.*

| Ticker | Predicted Dir | Realized 1d % | Hit/Miss |
|--------|--------------|---------------|----------|
| — | — | BLOCKED (proxy 403) | — |

**Hit rate:** N/A (first run)
**Mean realized return:** N/A

---

## Today's Scan Verdicts

*Blocked — yfinance 403 / trader module absent.*

| Ticker | Direction | Confidence | Sizing σ | Note |
|--------|-----------|-----------|---------|------|
| (all 15) | N/A | N/A | N/A | BLOCKED |

**Fallback attempted:** `LLM_BACKEND=disabled TRADER_OFFLINE=1 uv run trader scan` — command not available (module missing).

---

## Reranked Watchlist

*Cannot rank without live signals.  Static seed order preserved.*

**Tier-1 (high-priority — verify first once data flows):**
NVDA, AVGO, TSM, AMD, ARM

**Tier-2 (monitor):**
MSFT, GOOGL, AAPL, META, SMCI

**Dropped / benchmarks (not traded, used for context):**
SPY, QQQ, TSLA, AMZN, INTC

---

## FOM Formula (Canonical Definition)

```
FOM(ticker) = 0.4 × confidence
            + 0.3 × normalized_sizing_sigma
            + 0.2 × recent_hit_rate
            + 0.1 × news_momentum
```

Component definitions and normalization:

| Component | Raw source | Normalization | Weight |
|-----------|-----------|--------------|--------|
| `confidence` | Thesis confidence output from LLM scan (0–1) | Already [0,1] | 0.4 |
| `normalized_sizing_sigma` | `sizing_sigma` from scan (e.g. 0–3σ) | Clip to [0,3], divide by 3 | 0.3 |
| `recent_hit_rate` | Rolling 5-day directional hit rate for this ticker | Already [0,1] (0.5 = chance) | 0.2 |
| `news_momentum` | news_scout signal: 0 = no news, 1 = strong tailwind, −1 = headwind; map to [0,1] via `(signal+1)/2` | [0,1] | 0.1 |

FOM table (this run — all N/A due to blocker):

| Ticker | Confidence | Norm σ | Hit Rate | News Mom | **FOM** | Tier |
|--------|-----------|--------|----------|----------|---------|------|
| NVDA | N/A | N/A | N/A (seed) | N/A | — | T1-seed |
| AVGO | N/A | N/A | N/A (seed) | N/A | — | T1-seed |
| TSM | N/A | N/A | N/A (seed) | N/A | — | T1-seed |
| AMD | N/A | N/A | N/A (seed) | N/A | — | T1-seed |
| ARM | N/A | N/A | N/A (seed) | N/A | — | T1-seed |
| MSFT | N/A | N/A | N/A (seed) | N/A | — | T2-seed |
| GOOGL | N/A | N/A | N/A (seed) | N/A | — | T2-seed |
| AAPL | N/A | N/A | N/A (seed) | N/A | — | T2-seed |
| META | N/A | N/A | N/A (seed) | N/A | — | T2-seed |
| SMCI | N/A | N/A | N/A (seed) | N/A | — | T2-seed |

---

## Open Questions / To Revisit Tomorrow

1. **Build `agents/src/trader/`** — at minimum `tools/yfinance_client.py` + `cli.py` + `orchestrator.py` + `schemas.py`.  The FOM schema above can drive `schemas.py` directly.
2. **Proxy allowlist** — request that `query1.finance.yahoo.com` be added to the remote execution environment's proxy passthrough, or switch to an alternative data source.
3. **Offline price cache** — as a fallback, pre-stage 30-day OHLCV CSVs in `agents/data/prices/<TICKER>.csv`; the `TRADER_OFFLINE=1` path should read from there instead of calling yfinance.
4. **`pyproject.toml` update** — add `yfinance>=0.2` (or the replacement data lib) and `trader` entrypoint to `agents/pyproject.toml`.
5. **FOM iteration** — once first live data runs, evaluate whether `recent_hit_rate` (weight 0.2) should be replaced with a Brier-score-calibrated probability; consider adding a `volatility_regime` component (e.g., VIX-normalized) for position sizing.
6. **Backtesting window** — consider expanding backtest to 5-day rolling window once 5+ daily reports exist; current 1-day window is noisy.

---

*Disclaimer: analysis only — no order placement, no money movement.*
