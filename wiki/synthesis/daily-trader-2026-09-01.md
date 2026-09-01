---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-09-01
---

# Daily Trader Evaluation — 2026-09-01

> **Run status: STUB** — Two infrastructure blockers prevented live scan execution. This report documents the blockers, establishes the framework and FOM formula for future runs, and proposes a build plan.

---

## 1. Blockers This Run

| ID | Component | Issue | Remediation |
|----|-----------|-------|-------------|
| B1 | `agents/src/trader/` | Pipeline **does not exist** — only `agents/src/firefly/` is present. `trader/cli.py`, `orchestrator.py`, `tools/yfinance_client.py`, and schema modules are all absent. | Build trader scaffold (see §7 below). |
| B2 | `yfinance` / Yahoo Finance | All HTTPS requests fail: `CONNECT tunnel failed, response 403`. Network policy in the remote execution environment blocks `fc.yahoo.com` and Yahoo Finance chart endpoints. | Switch data provider to one allowed by the proxy (Alpha Vantage, Polygon.io, Quandl) **or** pre-fetch price fixtures in a local/CI step before this agent runs. |

No live price data was retrieved. No model-scored verdicts were generated.

---

## 2. Yesterday's Backtest (T-1 → 2026-08-31)

*No prior `daily-trader-*.md` exists — this is the inaugural run. Backtest table will populate from run #2 onward.*

| Ticker | Predicted Dir | Predicted Confidence | Realized 1-d % | Hit? | Note |
|--------|--------------|---------------------|-----------------|------|------|
| — | N/A | N/A | N/A | N/A | First run; no prior recommendation to test. |

**Prior-day hit rate:** N/A (0/0)
**Prior-day mean realized return:** N/A

---

## 3. Watchlist for This Cycle

Source: default core set (no prior report to inherit from).

```
NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN,
SMCI, PLTR, AVGO, ARM, CRM, NOW, SNOW
```

Total: 15 tickers (at budget cap).

**Selection rationale:** Broad AI-infrastructure, semiconductor, and mega-cap software coverage aligned with the thesis clusters already in `wiki/synthesis/` (LLM satellite ops, orbital data centers, Firefly/NeMo stack). SMCI and AVGO cover the HPC supply chain. PLTR and CRM cover AI-software deployment. ARM covers chip IP relevant to space/edge compute.

---

## 4. Today's Scan Verdicts

*Deferred — blockers B1 and B2 unresolved. Stub output at `agents/outputs/scan-2026-09-01.json`.*

| Ticker | Direction | Confidence | Sizing σ | Thesis Summary |
|--------|-----------|-----------|---------|----------------|
| — | — | — | — | Data unavailable |

---

## 5. Reranked Tiers

*Cannot rerank without scan verdicts or realized returns.*

**Tier-1 (top 5 by FOM):** TBD

**Tier-2 (next 5 by FOM):** TBD

**Dropped (bottom 5):** TBD

---

## 6. Figure of Merit (FOM) — Formula Definition

The FOM is a composite score combining forward-looking model output with backward-looking realized performance. Each component is normalized to [0, 1] before weighting.

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

### Component Definitions

| Component | Weight | Normalization | Source |
|-----------|--------|--------------|--------|
| `confidence` | 0.40 | Model output in [0,1] | Trader thesis agent |
| `normalized_sizing_sigma` | 0.30 | `σ / σ_max` across watchlist | Risk module (ATR-based) |
| `recent_hit_rate` | 0.20 | Rolling 5-day hit rate in [0,1] | Prior backtest table |
| `news_momentum` | 0.10 | Normalized sentiment score in [0,1] | News scout agent |

**FOM Table (this run — all N/A):**

| Ticker | confidence | norm_σ | hit_rate | news_mom | FOM | Tier |
|--------|-----------|--------|---------|---------|-----|------|
| — | — | — | — | — | — | — |

**Design notes:**
- Confidence dominates (40%) because thesis quality is the primary edge — momentum and news are decorators.
- Sizing sigma (30%) penalizes high-volatility tickers that eat position budget disproportionately.
- Hit rate (20%) applies a recency signal to reward tickers the model has called correctly; zero on first run.
- News momentum (10%) is intentionally low-weighted — it captures short-burst events but mean-reverts quickly.
- Formula can be re-calibrated via `agents/src/trader/scoring.py` (to be built). Consider adding a `sector_beta` term if the watchlist becomes sector-concentrated.

---

## 7. Build Plan — Trader Pipeline Scaffold

To unblock future runs, the following modules need to be created under `agents/src/trader/`:

```
agents/src/trader/
├── __init__.py
├── cli.py                  # typer app: `trader research` + `trader scan`
├── orchestrator.py         # scan loop: fetch → score → rerank → write
├── schemas.py              # Pydantic: ScanResult, Verdict, FOMScore
├── scoring.py              # FOM calculation (formula above)
└── tools/
    ├── __init__.py
    ├── price_client.py     # abstracts yfinance OR alternative provider
    └── news_client.py      # news_scout stub
```

**Entry points mirroring the task prompt:**
```bash
trader research NVDA --window 7
trader scan --tickers NVDA,AAPL,MSFT --window 7 --skip-wiki
```

**Data provider alternatives (for B2):**
- Alpha Vantage free tier: 25 req/day, OHLCV daily — sufficient for 15 tickers.
- `yfinance` with a self-hosted cookie relay (runs outside the proxy restriction).
- Commit a nightly price fixture JSON from a local cron or GitHub Actions job that has broader network access.

---

## 8. Open Questions / Things to Revisit Tomorrow

1. **Network policy**: Does the remote env allow any financial data API? Check proxy status at `$HTTPS_PROXY/__agentproxy/status` for an allowed domain list. If not, the pre-fetch fixture pattern is the fastest unblock.
2. **Pipeline build**: Who is building `agents/src/trader/`? Should this be an autonomous agent task or manual? The PR opened here proposes the schema — review and approve before next daily run.
3. **Watchlist expansion**: Once prices are available, should we add sector ETFs (QQQ, SMH, ARKK) as market-beta references for normalizing individual-stock returns?
4. **Backtest window**: 1-day backtest is very noisy. Consider switching to a 3-day rolling evaluation once a week of data accumulates.
5. **Holiday/weekend handling**: The scheduled task fires daily; need to detect non-trading days (US market closed) and skip the scan or emit a `market_closed` status without calling the data provider.

---

## See Also

- [[synthesis/open-weight-llm-agent-stack-six-region]] — underlying LLM stack context
- [[synthesis/orbital-data-center-six-region]] — Firefly/ODC thesis relevant to SMCI, AVGO, ARM
- `agents/outputs/scan-2026-09-01.json` — raw stub scan artifact
