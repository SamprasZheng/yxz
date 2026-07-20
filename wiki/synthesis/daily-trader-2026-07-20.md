---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-07-20
---

# Daily Trader Evaluation — 2026-07-20

> **Status: BLOCKED — stub report** — two hard blockers prevented live data collection. See §Blockers for detail and §Next-Run Setup for what must be resolved before this automation can produce actionable output.

---

## Blockers Encountered

### Blocker 1 — Trader Pipeline Does Not Exist

`agents/src/trader/` is absent from the repository. Only the Firefly orbital-mission-planning agent lives under `agents/src/` (as `agents/src/firefly/`). The `trader` CLI entry point is not registered in `agents/pyproject.toml`, so `uv run trader scan ...` fails immediately with `No such file or directory`.

**Resolution required:** Create `agents/src/trader/` with at minimum:
- `cli.py` — `trader research <ticker>` and `trader scan --tickers ...` commands
- `orchestrator.py` — scan orchestration + output JSON writer
- `schemas.py` — `ScanVerdict`, `FOMScore`, `BacktestRow` Pydantic models
- `tools/yfinance_client.py` — price-history + news-headline fetcher

### Blocker 2 — yfinance / External Finance APIs Blocked by Proxy

All `yfinance.Ticker.history()` calls fail with:

```
Failed to perform, curl: (56) CONNECT tunnel failed, response 403
```

The remote execution environment's outbound HTTPS proxy does not permit connections to Yahoo Finance endpoints. This affects all tickers in the seed watchlist.

**Resolution options (pick one):**
1. Run the daily trader workflow locally (not in the remote Claude-Code sandbox).
2. Pre-fetch OHLCV data via a GitHub Actions step that has unrestricted network access, write JSON to `agents/outputs/prices-<date>.json`, then run this session against the cached file.
3. Wire an alternative data source (Alpaca data API, Polygon.io) whose domain the proxy permits.

---

## Step 1 — Watchlist (Seeded)

No prior `wiki/synthesis/daily-trader-*.md` file was found. Seeding from the core default set. Cap: 15 tickers.

| Ticker | Basis |
|--------|-------|
| NVDA   | Core — AI infrastructure / GPU bellwether |
| AAPL   | Core — mega-cap consumer + services |
| TSLA   | Core — EV / energy / AI volatility anchor |
| MSFT   | Core — cloud + Copilot AI monetization |
| AMD    | Core — GPU/CPU alternative to NVDA; AI infra |
| GOOGL  | Core — search + TPU / Gemini / ODC (Suncatcher) |
| META   | Core — social AI, Llama open-weight strategy |
| AMZN   | Core — cloud / AWS + robotics |

**Watchlist for next run:** NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN (8 tickers; 7 slots remain before the 15-ticker cap).

---

## Step 2 — Backtest of Prior Recommendations

**N/A — first run, no prior recommendations exist.**

| Ticker | Predicted Dir | Realized 1d % | Hit/Miss |
|--------|--------------|---------------|----------|
| —      | —            | —             | —        |

**Prior-day hit rate:** N/A  
**Mean realized return:** N/A

---

## Step 3 — Today's Scan Verdicts

**Blocked** — trader CLI absent; yfinance proxy-blocked. No live scan verdicts produced.

| Ticker | Direction | Confidence | Sizing σ | Thesis |
|--------|-----------|-----------|----------|--------|
| —      | —         | —         | —        | —      |

*LLM_BACKEND=disabled TRADER_OFFLINE=1 fallback was not available because the CLI itself does not exist.*

---

## Step 4 — Reranked Watchlist

**Cannot rerank** — no scan verdicts available. Retaining seed order as placeholder.

### Tier 1 (top 5 — forward score + backward score combined)
All deferred pending live run.

### Tier 2 (next 5)
All deferred pending live run.

### Dropped
None — watchlist too small to trim.

---

## Step 5 — Figure of Merit (FOM)

**FOM Formula (document for future runs):**

```
FOM = 0.4 × confidence
    + 0.3 × norm(sizing_sigma)
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

Where each component is normalized to [0, 1]:
- `confidence`: LLM thesis confidence [0, 1] from scan verdict.
- `norm(sizing_sigma)`: `sizing_sigma` clipped to [0, 3] then divided by 3.
- `recent_hit_rate`: rolling 5-day hit rate (correct direction calls / total calls).
- `news_momentum`: news sentiment score [0, 1] from news_scout agent (positive headline density in the last 24 h).

**FOM Table (stub — all N/A this run):**

| Rank | Ticker | confidence | norm_σ | hit_rate | news_mom | FOM   |
|------|--------|-----------|--------|----------|----------|-------|
| —    | —      | —         | —      | —        | —        | —     |

---

## Step 6 — Outputs

- `agents/outputs/scan-2026-07-20.json` — stub JSON with blocker detail.
- This page — stub synthesis with blockers documented.
- `wiki/log.md` — one-line entry appended.
- `wiki/index.md` — link added under **Trader / Daily Research**.

---

## Open Questions / Things to Revisit Tomorrow

1. **Pipeline bootstrap** — Who is building `agents/src/trader/`? Until it exists, this entire automation is a no-op. Recommend filing a GitHub issue to track the build.
2. **Data access** — Which network route will be used for price data? Decide between local execution, GitHub Actions pre-fetch, or an alternative broker API that clears the proxy.
3. **FOM calibration** — Once real scan verdicts exist (2–3 runs), backtest whether the 0.4/0.3/0.2/0.1 weight split improves on a uniform baseline. The formula is a first draft; plan to tune after ≥5 runs.
4. **Watchlist expansion** — Consider adding sector ETFs (SOXX for semis, ARKK for disruptive tech) and Polkadot-adjacent tokens (DOT, MATIC) once the trader pipeline exists.
5. **Correlation guard** — NVDA/AMD/MSFT/GOOGL/META/AMZN all have high AI-theme correlation. The rerank should penalize correlated tier-1 clusters; add a diversity factor to FOM v2.

---

*Generated by the daily-trader-evaluation-agent on 2026-07-20 UTC. All data in this report is stub/placeholder due to pipeline and network blockers.*
