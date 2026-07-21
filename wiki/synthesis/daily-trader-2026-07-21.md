---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-07-21
---

# Daily Trader Evaluation — 2026-07-21

> **FIRST RUN / STUB REPORT**
> This is the inaugural daily-trader run for the yxz repo. No prior
> `daily-trader-*.md` file existed, so there is no backtest to report.
> The trader pipeline (`agents/src/trader/`) does not yet exist — the
> scan ran as a one-off Python script using `yfinance`.
>
> **OFFLINE FALLBACK ACTIVE:** `yfinance` was blocked by the remote
> environment's proxy (HTTP 403 on CONNECT tunnel to `query2.finance.yahoo.com`).
> All tickers returned errors; no live price data was retrieved.
> Market data cells are marked **OFFLINE** throughout.
> The pipeline infrastructure, FOM formula, and tier structure are
> fully defined below so the next run can execute correctly once
> network access is resolved.

---

## 1. Yesterday's Backtest

_Not applicable — first run. No prior recommendations exist._

| Ticker | Predicted Dir | Realized 1d % | Hit/Miss |
|--------|--------------|---------------|----------|
| —      | —            | OFFLINE       | —        |

**Prior hit rate:** N/A (first run)
**Prior mean realized return:** N/A

---

## 2. Today's Scan — Watchlist & Verdicts

**Watchlist (15 tickers, core seed):**
NVDA · AAPL · TSLA · MSFT · AMD · GOOGL · META · AMZN ·
SMCI · ARM · AVGO · QCOM · CRM · ASML · TSM

**Scan method:** `yfinance` 14-day history → 1d/5d returns, volume
ratio, 7-day momentum → direction + confidence heuristic.
**LLM backend:** disabled (first run; Anthropic backend not wired yet).
**Fallback:** `TRADER_OFFLINE=1` — stubbed pipeline.

| Ticker | Dir       | Confidence | Sizing σ | 1d %     | 5d %     | Vol Ratio | Status  |
|--------|-----------|-----------|---------|---------|---------|-----------|---------|
| NVDA   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| AAPL   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| TSLA   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| MSFT   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| AMD    | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| GOOGL  | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| META   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| AMZN   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| SMCI   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| ARM    | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| AVGO   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| QCOM   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| CRM    | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| ASML   | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |
| TSM    | OFFLINE   | OFFLINE    | OFFLINE  | OFFLINE  | OFFLINE  | OFFLINE   | BLOCKED |

**Scan artifact:** `agents/outputs/scan-2026-07-21.json`
(contains raw error payloads for all 15 tickers)

---

## 3. Reranked Watchlist

All tickers are unscored due to offline status. Ordering below
preserves the intended AI-chip-heavy concentration (which reflects
the portfolio's thematic focus on GPU/LLM infrastructure, ODC, and
RF SoC supply chain as documented in the wiki's six-region synthesis pages).

**Tier 1 (top 5 — thematic priority pending live data):**
NVDA · AMD · AVGO · TSM · ARM

**Tier 2 (next 5):**
MSFT · GOOGL · META · ASML · SMCI

**Dropped / watchonly (remaining):**
AAPL · TSLA · AMZN · QCOM · CRM

**Promoted exploration candidates:** none (news_scout not wired; no
news data retrieved in this run).

---

## 4. Figure of Merit (FOM)

### Formula (v1.0 — document here for iteration)

```
FOM = 0.4 × confidence
    + 0.3 × norm_sigma          # (sizing_sigma − 0.5) / 2.5  → [0,1]
    + 0.2 × recent_hit_rate     # rolling 5-session hit rate; neutral=0.5 on first run
    + 0.1 × news_momentum       # (vol_ratio − 1.0) / 2.0, clipped to [0,1]
```

**Component definitions:**
- `confidence` ∈ [0,1]: model confidence in direction call. Derived from
  |5d return| magnitude on this run (no LLM); 0.5 baseline for abstain.
- `norm_sigma` ∈ [0,1]: normalised position-sizing signal. `sizing_sigma`
  is |7d momentum %| / 2, clipped to [0.5, 3.0], then normalised.
- `recent_hit_rate` ∈ [0,1]: fraction of last 5 direction calls that were
  correct. Set to 0.5 (neutral) for all tickers on first run.
- `news_momentum` ∈ [0,1]: volume surge proxy. `vol_ratio = mean(vol last 5d)
  / mean(vol prior 5d)`. Normalised as `(vol_ratio − 1) / 2`, clipped to
  [0,1]. Set to 0 when vol_ratio ≤ 1.

**FOM table (all OFFLINE — no scores computable):**

| Rank | Ticker | FOM   | Confidence | norm_σ | Hit Rate | News Mom. |
|------|--------|-------|-----------|--------|----------|-----------|
| —    | NVDA   | N/A   | N/A        | N/A    | 0.50*    | N/A       |
| —    | AAPL   | N/A   | N/A        | N/A    | 0.50*    | N/A       |
| …    | …      | …     | …          | …      | …        | …         |

*First-run neutral value.

---

## 5. Open Questions / Things to Revisit Tomorrow

1. **Network access:** yfinance was blocked by the remote env proxy
   (`curl: (56) CONNECT tunnel failed, response 403`). Resolve by:
   - Confirming whether the proxy whitelist includes `query2.finance.yahoo.com`
   - Or switching to a different data source (Alpha Vantage, Polygon.io,
     or a local cache) that the proxy permits.
   - Reference: `/root/.ccr/README.md` proxy setup docs.

2. **Trader pipeline build:** `agents/src/trader/` does not exist.
   The task referenced `agents/src/trader/cli.py` (subcommands
   `trader research` / `trader scan`) and
   `agents/src/trader/tools/yfinance_client.py`. These need to be
   scaffolded before the pipeline can run end-to-end.

3. **LLM backend wiring:** Once the pipeline is built, wire
   `LLM_BACKEND=anthropic` with `claude-sonnet-5` for thesis generation
   (technical analysis, catalyst reasoning, risk flags). Currently disabled.

4. **news_scout integration:** The scan references a `news_scout` component
   that should surface exploration candidates. Not yet implemented.

5. **Tier assignment logic:** With all tickers offline, the tier-1/tier-2
   split is manually assigned based on wiki-corpus thematic relevance
   (ODC/GPU/RF/Radiation supply chain). Once live data flows, rerank by FOM.

6. **Backtest cadence:** Tomorrow will be the first real backtest session
   (if data access is restored). Expected to validate direction calls
   made in the *next* run (today's run has no calls to backtest).

---

## 6. Infrastructure Blockers Summary

| Component | Status | Blocker |
|-----------|--------|---------|
| yfinance data fetch | BLOCKED | Proxy 403 on `query2.finance.yahoo.com` |
| trader pipeline (`agents/src/trader/`) | NOT BUILT | Needs scaffolding |
| LLM backend (Anthropic) | DISABLED | Pipeline not built |
| news_scout | NOT BUILT | Pipeline not built |
| Prior-day backtest | N/A | First run |

---

*Scan artifact:* `agents/outputs/scan-2026-07-21.json`
*Next run:* 2026-07-22 — first real scan if network access restored.
