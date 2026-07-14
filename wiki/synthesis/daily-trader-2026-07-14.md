---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-07-14
---

# Daily Trader Evaluation — 2026-07-14

> **Run mode: STUB (offline fallback).** Two infrastructure blockers prevented live data retrieval. All market figures are N/A. The FOM framework and watchlist seed are fully documented so tomorrow's run can execute end-to-end once blockers are resolved.

---

## 1 — Blockers (must fix before next run)

| # | Component | Error | Remediation |
|---|-----------|-------|-------------|
| 1 | **yfinance → Yahoo Finance** | Proxy denies `CONNECT fc.yahoo.com:443` with HTTP 403 (policy denial). All price fetches return empty history. | Either allowlist `query1.finance.yahoo.com` + `fc.yahoo.com` in the proxy policy, or switch the price-data adapter to a proxy-allowed source (e.g. Alpha Vantage via HTTPS, Polygon.io, or a Cloudflare Worker relay). |
| 2 | **`agents/src/trader/` pipeline** | Sub-module does not exist. No `cli.py`, `orchestrator.py`, `schemas.py`, or `tools/yfinance_client.py`. Only `agents/src/firefly/` is present. | Scaffold the trader pipeline (see §6 open questions). Until then, the scan and backtest steps cannot run. |
| 3 | **`trader scan` CLI** | No entrypoint registered in `agents/pyproject.toml`. | Add `trader = "trader.cli:app"` to `[project.scripts]` once the module is created. |

---

## 2 — Watchlist (today's seed)

No prior `daily-trader-*.md` exists — this is the first run. Watchlist seeded from the core default set. Capped at 8 (well within the 15-ticker budget) because live scan is unavailable.

| Ticker | Seed reason |
|--------|-------------|
| NVDA | AI compute leader; highest wiki cross-reference (Starcloud, NemoClaw, ODC) |
| MSFT | Azure AI platform; Copilot revenue acceleration signal |
| GOOGL | Suncatcher / Trillium TPU; AI infra + search dominance |
| META | Llama open-weight bet; ad-platform cash generation |
| AMZN | AWS Bedrock; Kuiper constellation build |
| AAPL | Consumer device + supply-chain macro signal |
| TSLA | High-beta sentiment proxy; energy storage optionality |
| AMD | GPU supply chain alternative; MI300X data-center ramp |

---

## 3 — Yesterday's backtest

**N/A — first run, no prior recommendations to evaluate.**

The backtest table will populate from tomorrow's run using today's watchlist and the format below:

| Ticker | Predicted dir | Confidence | Sizing σ | Realized 1d % | Hit? | Notes |
|--------|--------------|------------|----------|---------------|------|-------|
| — | — | — | — | — | — | First run |

**Prior-day hit rate:** N/A  
**Prior-day mean realized return:** N/A

---

## 4 — Today's scan verdicts

**N/A — trader pipeline not yet scaffolded; proxy blocks live price data.**

Expected output format (for next run):

| Ticker | Direction | Confidence [0–1] | Sizing σ | Thesis summary | News momentum |
|--------|-----------|-----------------|----------|----------------|---------------|
| NVDA | long/short/abstain | 0.xx | 0.xx | … | … |

All verdicts defaulted to `abstain` / N/A for today.

---

## 5 — Watchlist rerank (tier-1 / tier-2)

Without live scan scores, the rerank degenerates to the seed order. Tomorrow's combined forward×backward score will produce real tiers.

**Tier-1 (top 5 — structural priority based on wiki cross-references):**
1. NVDA — highest wiki density; AI hardware backbone
2. GOOGL — ODC / Suncatcher unique moat signal
3. MSFT — Azure Bedrock revenue proxy
4. AMZN — AWS + Kuiper dual-optionality
5. META — Llama open-weight flywheel

**Tier-2 (next 5):**
6. AMD — GPU supply alternative
7. AAPL — macro consumer signal
8. TSLA — sentiment / volatility proxy
_(Slots 9–10 vacant pending pipeline scan; filled from news_scout candidates next run.)_

---

## 6 — FOM (Figure of Merit) — framework definition

The FOM formula is defined here so every future run can compute and compare it consistently.

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

**Component definitions:**

| Component | Raw source | Normalization | Weight |
|-----------|-----------|---------------|--------|
| `confidence` | LLM thesis confidence score (0–1) from trader scan | Already in [0, 1] | 0.40 |
| `sizing_sigma` | Volatility-adjusted position size signal; higher = stronger expected move | Divide by max across watchlist | 0.30 |
| `recent_hit_rate` | Trailing 5-day hit rate for this ticker (# correct direction / # calls) | Already in [0, 1]; default 0.5 for first run | 0.20 |
| `news_momentum` | news_scout signal score (0–1); 0 = no coverage, 1 = multiple bullish/bearish catalyst headlines | Already in [0, 1]; default 0.5 if scout absent | 0.10 |

**FOM table (today — all N/A):**

| Ticker | confidence | sizing_σ (norm) | hit_rate | news_mom | FOM | Tier |
|--------|-----------|-----------------|----------|----------|-----|------|
| NVDA | N/A | N/A | 0.50\* | 0.50\* | N/A | T1 |
| GOOGL | N/A | N/A | 0.50\* | 0.50\* | N/A | T1 |
| MSFT | N/A | N/A | 0.50\* | 0.50\* | N/A | T1 |
| AMZN | N/A | N/A | 0.50\* | 0.50\* | N/A | T1 |
| META | N/A | N/A | 0.50\* | 0.50\* | N/A | T1 |
| AMD | N/A | N/A | 0.50\* | 0.50\* | N/A | T2 |
| AAPL | N/A | N/A | 0.50\* | 0.50\* | N/A | T2 |
| TSLA | N/A | N/A | 0.50\* | 0.50\* | N/A | T2 |

\* Default neutral value used when no historical data or news scout is available.

**FOM iteration plan:** adjust weights after 10 trading days of live data. Consider adding `sector_rotation_signal` (0.1) and decreasing `news_momentum` to 0.0 if news_scout proves noisy.

---

## 7 — Open questions / to-do for next run

1. **Scaffold `agents/src/trader/`**: create `cli.py` (Typer), `orchestrator.py`, `schemas.py` (Pydantic), and `tools/yfinance_client.py` with retry logic. Register `trader` entrypoint in `pyproject.toml`.
2. **Fix price-data proxy block**: test `query2.finance.yahoo.com` as an alternative endpoint, or integrate Alpha Vantage / Polygon.io (both allow free-tier HTTPS data). Update `yfinance_client.py` to respect `HTTPS_PROXY` via `requests` session.
3. **Wire LLM scan**: add `LLM_BACKEND=anthropic` path to call Claude claude-sonnet-4-6 for each ticker thesis; `LLM_BACKEND=disabled` fallback should return deterministic stub verdicts for CI.
4. **Add news_scout tool**: a lightweight HTTPX call to a news API (e.g. NewsAPI.org or Alpaca News) for headline sentiment; normalize to [0, 1] via keyword weighting.
5. **Persist backtest state**: after each run, write `agents/outputs/backtest-state.json` accumulating per-ticker hit history so `recent_hit_rate` grows from real data.
6. **CI action**: add a GitHub Actions workflow (`Daily Trader`) that runs this script every trading day at 09:00 UTC (before US open), commits the daily-trader report, and opens a draft PR.
7. **FOM calibration**: after 10 live-data days, run a simple grid search over weight combinations to minimize Brier score on direction predictions.

---

## 8 — Appendix: scan artifact

Raw scan JSON at: `agents/outputs/scan-2026-07-14.json`

All fields are `null` this run due to infrastructure blockers. The JSON schema is designed so that next run's successful output drops in place with no format changes.
