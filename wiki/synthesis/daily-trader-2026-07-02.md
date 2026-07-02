---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-07-02
---

# Daily Trader Evaluation — 2026-07-02

> **Run status: STUB** — two hard blockers prevented live data collection (see §Blockers). The framework, watchlist seed, and FOM formula are committed so the routine can self-heal once the pipeline is in place.

---

## Blockers (why this is a stub)

### 1. Trader pipeline does not exist

`agents/src/trader/` is absent from the repo. The repository only ships `agents/src/firefly/` (the Firefly orbital data center mission planner). The CLIs referenced in the routine spec (`trader scan`, `trader research`) have not been implemented.

**Fix required:** Create `agents/src/trader/` with:
- `orchestrator.py` — scan loop over watchlist
- `cli.py` — `trader research <ticker>` + `trader scan --tickers <csv> --window <n>` entry points
- `agents/` — thesis agent, news scout, sizing agent
- `tools/yfinance_client.py` — market data wrapper
- `schemas.py` — Pydantic models for scan output

### 2. Yahoo Finance blocked by outbound proxy

The remote execution environment blocks CONNECT tunnels to `fc.yahoo.com:443` (HTTP 403 policy denial). `yfinance` was successfully installed but every `Ticker.history()` call failed:

```
Failed to get ticker 'NVDA' reason: Failed to perform,
curl: (56) CONNECT tunnel failed, response 403.
Proxy log: ts=2026-07-02T23:09:35Z kind=connect_rejected host=fc.yahoo.com:443
```

**Fix options (choose one):**
- Add Yahoo Finance to the proxy allowlist in the environment's network policy.
- Swap in an alternative data provider whose endpoint is proxy-reachable (Alpha Vantage, Polygon.io, Quandl, or a self-hosted OHLCV cache).
- Set `TRADER_OFFLINE=1` in the environment and pre-load a local OHLCV parquet/CSV cache that `yfinance_client.py` reads as fallback.

---

## Yesterday's Backtest

*First run — no prior recommendations to score.*

| Ticker | Predicted Dir | Realized % | Hit/Miss |
|--------|--------------|------------|----------|
| —      | —            | —          | —        |

Hit rate: **N/A** (no prior run)  
Mean realized return: **N/A**

---

## Seeded Watchlist (run 0 bootstrap)

No prior `daily-trader-*.md` found, so the watchlist is seeded from the core defaults. Cap is 15 tickers; only 8 used this run.

| # | Ticker | Reason for inclusion |
|---|--------|----------------------|
| 1 | NVDA   | AI/GPU compute leader; high wiki coverage ([[entities/nvidia]]) |
| 2 | AAPL   | Large-cap anchor; consumer AI exposure |
| 3 | TSLA   | High-beta AI/autonomy proxy |
| 4 | MSFT   | Enterprise AI (Azure OpenAI); consistent coverage |
| 5 | AMD    | GPU competitive alternative to NVDA |
| 6 | GOOGL  | Search AI + TPU/Cloud compute |
| 7 | META   | Social AI infra + AR hardware |
| 8 | AMZN   | AWS + Alexa + Trainium/Inferentia |

---

## Today's Scan Verdicts

*Skipped — trader CLI not implemented, market data proxy-blocked.*

| Ticker | Direction | Confidence | Sizing σ | Thesis |
|--------|-----------|------------|----------|--------|
| —      | —         | —          | —        | —      |

Scan JSON: `agents/outputs/scan-2026-07-02.json`  
Backend attempted: Anthropic (no entry point available)  
Fallback status: `TRADER_OFFLINE=1` stub would have run if CLI existed.

---

## Reranked Tiers

*Cannot rank without scan data. Tier assignment deferred to next run.*

**Tier 1 (target: top 5 by combined FOM):** —  
**Tier 2 (next 5):** —  
**Dropped:** —

Ranking formula: `forward_score × backward_score`  
- `forward_score = thesis.confidence × sizing_sigma` (from today's scan)  
- `backward_score = 1 if yesterday's call was correct, 0.5 if abstain, 0 if wrong`

---

## Figure of Merit (FOM)

Formula (frozen for iteration):

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

All components normalized to [0, 1] across the watchlist universe.

| Component              | Weight | Source                      | Notes |
|------------------------|--------|-----------------------------|-------|
| `confidence`           | 0.40   | LLM thesis score (scan)     | Primary signal |
| `normalized_sizing_σ`  | 0.30   | Position-sizing agent (scan)| Normalised within the daily watchlist |
| `recent_hit_rate`      | 0.20   | Rolling 5-day backtest      | 0 on day 0 (no history) |
| `news_momentum`        | 0.10   | News scout sentiment (scan) | 0 if no news surfaced |

FOM table (this run): all tickers score 0.000 (no data).

| Ticker | Confidence | Sizing σ | Hit Rate | News | FOM   | Tier |
|--------|-----------|----------|----------|------|-------|------|
| NVDA   | —         | —        | —        | —    | 0.000 | —    |
| AAPL   | —         | —        | —        | —    | 0.000 | —    |
| TSLA   | —         | —        | —        | —    | 0.000 | —    |
| MSFT   | —         | —        | —        | —    | 0.000 | —    |
| AMD    | —         | —        | —        | —    | 0.000 | —    |
| GOOGL  | —         | —        | —        | —    | 0.000 | —    |
| META   | —         | —        | —        | —    | 0.000 | —    |
| AMZN   | —         | —        | —        | —    | 0.000 | —    |

---

## Open Questions / Revisit Tomorrow

1. **Pipeline build**: Who owns implementing `agents/src/trader/`? This routine runs on a schedule but has no pipeline to execute — a one-time build is a prerequisite for any live data.
2. **Proxy network policy**: Does the environment network policy allow adding `finance.yahoo.com` / `query2.finance.yahoo.com` to the allowlist, or should the design pivot to a proxy-compatible data source?
3. **Offline mode design**: Should `TRADER_OFFLINE=1` + a local OHLCV cache be the primary fallback, or just a CI/dev tool?
4. **Watchlist curation**: Are there tickers beyond the 8 core defaults that should be in the seed list? (e.g. PLTR, RKLB, AST, ASTS based on wiki entity coverage)
5. **FOM weight tuning**: The 0.4/0.3/0.2/0.1 weights are a placeholder. After 10+ live days, run a grid search against realized returns to calibrate.
6. **News scout scope**: The `news_momentum` component assumes a `news_scout` sub-agent exists. Define its data sources (e.g. proxy-reachable RSS/API) before wiring.

---

*Analysis only — no orders placed, no capital moved.*
