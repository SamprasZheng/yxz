---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-08-26
---

# Daily Trader Evaluation — 2026-08-26

> **STATUS: STUB RUN — pipeline blockers prevented live scan.** See §Blockers below.
> This document fulfils the commit/PR contract so the failure is visible.

---

## Blockers (why this is a stub)

| Blocker | Detail |
|---|---|
| `agents/src/trader/` missing | The trader pipeline (`orchestrator.py`, `cli.py`, `tools/yfinance_client.py`) does not exist in the repo. Only the Firefly orbital-data-center pipeline lives under `agents/src/`. |
| `yfinance` not installed | `pip install yfinance` timed out — outbound PyPI downloads are blocked in this remote execution environment. |
| No prior daily-trader file | This is run #1. There are no prior predictions to backtest. |

**Recommended remediation** (for the next maintainer / PR reviewer):

1. Scaffold `agents/src/trader/` with at minimum: `__init__.py`, `orchestrator.py`, `cli.py` (exposing `trader scan` and `trader research` sub-commands), `tools/yfinance_client.py`.
2. Add `yfinance>=0.2` to `agents/pyproject.toml` dependencies.
3. Register `trader = "trader.cli:app"` in `[project.scripts]`.
4. Re-run this scheduled task; the stub will be replaced by a live report.

---

## §1 — Yesterday's backtest

**No prior predictions.** This is the first run of the daily-trader evaluation agent. Backtest table will populate from run #2 onward.

| Ticker | Predicted Dir | Realized % | Hit/Miss |
|---|---|---|---|
| — | — | — | — |

**Prior-day metrics:** hit rate = N/A, mean realized return = N/A.

---

## §2 — Today's scan verdicts

Live scan could not execute (see §Blockers). The table below is seeded with the **core watchlist** (per task spec: no prior file → use core set). All direction/confidence/sizing fields are **placeholder-only** and must not be used for trading decisions.

| Ticker | Dir (stub) | Confidence | Sizing σ | Note |
|---|---|---|---|---|
| NVDA | — | — | — | core; AI infra |
| AAPL | — | — | — | core; consumer |
| TSLA | — | — | — | core; EV/AI |
| MSFT | — | — | — | core; cloud/AI |
| AMD | — | — | — | core; GPU/CPU |
| GOOGL | — | — | — | core; cloud/AI |
| META | — | — | — | core; social/AI |
| AMZN | — | — | — | core; cloud/ecomm |

**8 tickers seeded. Cap: 15. No live data fetched.**

---

## §3 — Reranked watchlist

Without live confidence or sizing data, a meaningful reranking cannot be performed.
The 8 core tickers are held flat at **tier-1** for continuity.

**Tier-1 (top 5 by planned FOM, order TBD by live run):**
NVDA, MSFT, GOOGL, META, AMZN

**Tier-2 (next 3):**
AAPL, TSLA, AMD

**New exploration candidates surfaced by news_scout:** none (scanner offline).

---

## §4 — Figure of Merit (FOM)

### Formula (canonical — use in all future runs)

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

All four components are normalized to **[0, 1]** before weighting:

| Component | Weight | Source | Normalization |
|---|---|---|---|
| `confidence` | 40% | LLM thesis confidence score (0–1) | direct |
| `normalized_sizing_sigma` | 30% | ATR-based sizing signal σ, mapped [0,1] via min-max over watchlist | min-max |
| `recent_hit_rate` | 20% | Rolling 5-day hit rate of prior direction calls | (hits/5) |
| `news_momentum` | 10% | Normalized count of bullish-minus-bearish headlines over 48 h | (bull-bear)/(bull+bear+1) |

**FOM table (stub — all values 0, pipeline offline):**

| Ticker | Confidence | Norm. σ | Hit Rate | News Mom. | FOM |
|---|---|---|---|---|---|
| NVDA | 0.00 | 0.00 | 0.00 | 0.00 | 0.000 |
| AAPL | 0.00 | 0.00 | 0.00 | 0.00 | 0.000 |
| TSLA | 0.00 | 0.00 | 0.00 | 0.00 | 0.000 |
| MSFT | 0.00 | 0.00 | 0.00 | 0.00 | 0.000 |
| AMD | 0.00 | 0.00 | 0.00 | 0.00 | 0.000 |
| GOOGL | 0.00 | 0.00 | 0.00 | 0.00 | 0.000 |
| META | 0.00 | 0.00 | 0.00 | 0.00 | 0.000 |
| AMZN | 0.00 | 0.00 | 0.00 | 0.00 | 0.000 |

*(All zeros because no live scan ran. Sorted descending by FOM, all tied.)*

---

## §5 — Open questions / tomorrow's priorities

1. **Build the trader pipeline.** The agent expects `agents/src/trader/cli.py` with sub-commands `scan` and `research`. The Firefly orchestrator (`agents/src/firefly/orchestrator.py`) is a useful reference pattern.
2. **Unblock PyPI access.** Either allow outbound HTTPS to `files.pythonhosted.org` in the remote execution environment, or pre-bundle `yfinance` in the project's virtual environment.
3. **Seed a live backtest from today.** Once the pipeline runs, tomorrow's evaluation will have real prior predictions to score.
4. **Tune FOM weights.** The 40/30/20/10 split is a starting prior. After 10+ days of live data, run a simple linear regression of FOM against next-day realized returns to calibrate.
5. **Consider news_momentum signal.** The current definition (bulk headline count) is naive. A FinBERT or Claude sentiment pass over top-5 news items per ticker would improve signal quality.

---

*No positions or orders were placed or implied. This file is for research and logging purposes only.*
