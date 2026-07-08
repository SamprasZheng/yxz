---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-07-08
---

# Daily Trader Evaluation — 2026-07-08

> **Status: STUB RUN — two blockers prevented live data and scan.**
> This file documents what blocked the run, the seeded watchlist for future runs, and the FOM formula established for this recurring task.

---

## Run Blockers

### Blocker 1 — No trader pipeline

`agents/src/trader/` does not exist in the repository. The task specification assumed a pre-existing orchestrator (`trader research`, `trader scan` CLI), schemas, and a `tools/yfinance_client.py`. None of these are present; only the Firefly orbital-mission pipeline lives under `agents/src/`. Building the trader pipeline from scratch is out of scope for a single scheduled run.

**Recommended fix for owner:** scaffold `agents/src/trader/` with at minimum `cli.py`, `orchestrator.py`, `schemas.py`, and `tools/yfinance_client.py`. The Firefly pipeline (`agents/src/firefly/`) is a usable template.

### Blocker 2 — Yahoo Finance blocked by network egress policy

`yfinance` is installed (`pip install yfinance` succeeded), but the proxy gateway returns `403 CONNECT` to `fc.yahoo.com`. Per the proxy README, 403 from the proxy is an organizational policy denial — not a transient rate-limit — and must not be retried or routed around. All 15 tickers returned no data.

**Recommended fix for owner:** request that `finance.yahoo.com` / `fc.yahoo.com` be added to the egress allowlist, or substitute a proxy-compatible data source (e.g., Polygon.io, Alpha Vantage, or a self-hosted OHLCV feed).

---

## Yesterday's Backtest (N/A — First Run)

No prior `wiki/synthesis/daily-trader-*.md` file exists. This is the inaugural run; there are no prior predictions to score.

| Ticker | Predicted Dir | Realized % | Hit/Miss |
|--------|--------------|------------|----------|
| —      | —            | —          | —        |

**Prior hit rate:** N/A (baseline = 0 days of history)

---

## Today's Scan — Blocked

`LLM_BACKEND=anthropic uv run trader scan` cannot run because `agents/src/trader/cli.py` does not exist.

Fallback attempted: `LLM_BACKEND=disabled TRADER_OFFLINE=1` stub mode. Also not available (no pipeline code).

All ticker verdicts below are **placeholder stubs** and carry **no analytical weight**.

| Ticker | Dir    | Confidence | Sizing σ | Notes                        |
|--------|--------|------------|----------|------------------------------|
| NVDA   | —      | —          | —        | No data; pipeline missing    |
| AAPL   | —      | —          | —        | No data; pipeline missing    |
| TSLA   | —      | —          | —        | No data; pipeline missing    |
| MSFT   | —      | —          | —        | No data; pipeline missing    |
| AMD    | —      | —          | —        | No data; pipeline missing    |
| GOOGL  | —      | —          | —        | No data; pipeline missing    |
| META   | —      | —          | —        | No data; pipeline missing    |
| AMZN   | —      | —          | —        | No data; pipeline missing    |
| SMCI   | —      | —          | —        | No data; pipeline missing    |
| AVGO   | —      | —          | —        | No data; pipeline missing    |
| ARM    | —      | —          | —        | No data; pipeline missing    |
| PLTR   | —      | —          | —        | No data; pipeline missing    |
| TSM    | —      | —          | —        | No data; pipeline missing    |
| INTC   | —      | —          | —        | No data; pipeline missing    |
| QCOM   | —      | —          | —        | No data; pipeline missing    |

---

## Seeded Watchlist (for future runs)

Seeded from the default core set specified in the task, capped at 15:

```
NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN, SMCI, AVGO, ARM, PLTR, TSM, INTC, QCOM
```

**Tier-1 (top 5 by thematic relevance to owner's AI×Space thesis):**
NVDA, TSM, SMCI, AVGO, ARM

**Tier-2 (next 5 broad-market anchors):**
MSFT, GOOGL, META, AMZN, PLTR

**Dropped (watchlist trim, reintroduce once pipeline running):**
AAPL, TSLA, AMD, INTC, QCOM

Rationale for tier-1 selection: these five are directly named in the wiki's ODC / phased-array / AI-agent corpus
([[synthesis/orbital-data-center-six-region]], [[synthesis/phased-array-rf-frontend-supply-chain]],
[[synthesis/open-weight-llm-agent-stack-six-region]]). NVDA = GPU compute moat; TSM = fab sovereignty;
SMCI = AI server integrator; AVGO = custom silicon (Google TPU, Meta MTIA); ARM = ISA licensing in all
of the above.

---

## Reranked Watchlist

No backward score available (first run). Forward score = thematic relevance only.

| Rank | Ticker | Tier   | Rationale                                        |
|------|--------|--------|--------------------------------------------------|
| 1    | NVDA   | tier-1 | GPU compute moat; most cited in wiki corpus      |
| 2    | TSM    | tier-1 | Fab sovereignty; phased-array + ODC supply chain |
| 3    | SMCI   | tier-1 | AI server integrator; ODC hardware layer         |
| 4    | AVGO   | tier-1 | Custom silicon; Google/Meta ASIC                 |
| 5    | ARM    | tier-1 | ISA licensing; embedded + AI perimeter           |
| 6    | PLTR   | tier-2 | Defense AI; Palantir thesis in wiki              |
| 7    | MSFT   | tier-2 | Azure AI infrastructure                          |
| 8    | GOOGL  | tier-2 | Suncatcher TPU + Gemini; ODC entity              |
| 9    | META   | tier-2 | Open-weight LLM (Llama 4); V-JEPA world model    |
| 10   | AMZN   | tier-2 | AWS Kuiper + AWS cloud anchor                    |

---

## Figure of Merit (FOM) Formula

Established for this recurring task. Formula is identical each day unless the owner revises it:

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

**Component definitions:**

| Component              | Definition                                              | Normalization          |
|------------------------|---------------------------------------------------------|------------------------|
| `confidence`           | LLM thesis confidence score from trader scan (0–1)      | Already in [0,1]       |
| `sizing_sigma`         | Forward σ-scaled position size from scan output         | Divide by max in batch |
| `recent_hit_rate`      | Rolling 5-day directional accuracy for this ticker      | Already in [0,1]       |
| `news_momentum`        | News-scout positive/negative signal (−1 to +1 → 0 to 1)| (signal + 1) / 2       |

**FOM table (stub — all values N/A this run):**

| Ticker | confidence | norm_σ | hit_rate | news_mom | **FOM** |
|--------|-----------|--------|----------|----------|---------|
| NVDA   | —         | —      | —        | —        | —       |
| TSM    | —         | —      | —        | —        | —       |
| SMCI   | —         | —      | —        | —        | —       |
| AVGO   | —         | —      | —        | —        | —       |
| ARM    | —         | —      | —        | —        | —       |
| PLTR   | —         | —      | —        | —        | —       |
| MSFT   | —         | —      | —        | —        | —       |
| GOOGL  | —         | —      | —        | —        | —       |
| META   | —         | —      | —        | —        | —       |
| AMZN   | —         | —      | —        | —        | —       |

---

## Scan Output File

Expected: `agents/outputs/scan-2026-07-08.json` — not produced (pipeline missing).

---

## Open Questions / Revisit Tomorrow

1. **Pipeline scaffold**: Has `agents/src/trader/` been created? If yes, tomorrow's run can attempt `uv run trader scan`.
2. **Egress policy**: Has `finance.yahoo.com` been added to the proxy allowlist? If not, substitute data source?
3. **Anthropic API key**: Is `ANTHROPIC_API_KEY` set in the remote environment? The Firefly code uses it; trader would too.
4. **FOM weight calibration**: Once 5+ days of hit-rate history accumulate, consider increasing `recent_hit_rate` weight from 0.2 → 0.3 and reducing `confidence` from 0.4 → 0.3 (backward signal should earn more weight as it compounds).
5. **News scout**: The `news_momentum` component requires a news-fetching tool. Candidate: Anthropic web-search tool, or a Perplexity/NewsAPI call. Neither is wired yet.
6. **Watchlist growth**: Current 10-ticker live list is below the 15-ticker cap. Re-add AAPL, TSLA, AMD once pipeline is running to fill the roster.

---

*Analysis only — no orders placed, no money moved.*
*Run date: 2026-07-08 UTC | Agent: daily-trader-evaluation*
