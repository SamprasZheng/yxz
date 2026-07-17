---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-07-17
---

# Daily Trader Evaluation — 2026-07-17

> **Status: STUB — two blockers prevented live data retrieval. See § Blockers.**
> Analysis-only; no orders placed, no money moved.

---

## Blockers This Run

### Blocker 1 — `agents/src/trader/` does not exist
The task specification references `agents/src/trader/` (orchestrator, schemas, CLI), but this module has not been implemented yet. Only `agents/src/firefly/` exists in the repository. The `trader research` / `trader scan` commands are unavailable. **Action required:** implement the trader pipeline (or confirm it lives in a separate branch) before this step can run autonomously.

### Blocker 2 — yfinance blocked by remote-environment proxy (HTTP 403)
All eight seed tickers returned a `curl: (56) CONNECT tunnel failed, response 403` error. The managed remote-execution environment's outbound network policy blocks `query2.finance.yahoo.com`. A single retry with 1-second backoff produced identical results. **Action required:** either allowlist Yahoo Finance in the proxy config (`/root/.ccr/README.md`), use a pre-fetched data cache, or switch to a price feed accessible through the proxy.

---

## 1. Yesterday's Watchlist & Backtest

**First run — no prior `daily-trader-*.md` exists.** No backtest is possible. Watchlist seeded from task specification defaults:

| Ticker | Seeded From |
|--------|-------------|
| NVDA   | Core seed |
| AAPL   | Core seed |
| TSLA   | Core seed |
| MSFT   | Core seed |
| AMD    | Core seed |
| GOOGL  | Core seed |
| META   | Core seed |
| AMZN   | Core seed |

Prior-day hit rate: **N/A (first run)**
Prior-day mean realized return: **N/A (first run)**

---

## 2. Today's Scan

**Scan skipped — both `trader scan` CLI and live price data unavailable (see § Blockers).**

For future runs the scan command would be:
```bash
cd agents
uv sync
LLM_BACKEND=anthropic uv run trader scan \
  --tickers NVDA,AAPL,TSLA,MSFT,AMD,GOOGL,META,AMZN \
  --window 7 --skip-wiki
```

Fallback (offline stub with no LLM):
```bash
cd agents
LLM_BACKEND=disabled TRADER_OFFLINE=1 uv run trader scan \
  --tickers NVDA,AAPL,TSLA,MSFT,AMD,GOOGL,META,AMZN \
  --window 7 --skip-wiki
```

No `agents/outputs/scan-2026-07-17.json` was produced.

---

## 3. Reranked Watchlist

Because no live scan data is available, the tier assignment is based solely on the seed order. This section should be regenerated once the trader pipeline and price data are accessible.

**Tier 1 (forward candidates — held for next run)**

| Rank | Ticker | Rationale |
|------|--------|-----------|
| 1 | NVDA | AI-infrastructure demand; high beta; seed anchor |
| 2 | MSFT | AI-platform + Azure cloud; lower beta hedge |
| 3 | GOOGL | Ad-revenue resilience + Gemini cycle |
| 4 | META | Ad-revenue + Llama open-weight moat |
| 5 | AMZN | AWS + consumer; broad-market proxy |

**Tier 2 (monitoring)**

| Rank | Ticker | Rationale |
|------|--------|-----------|
| 6 | AMD | NVDA alternative; GPU/CPU cycle |
| 7 | AAPL | Hardware cycle + Services |
| 8 | TSLA | High-volatility; optionality signal |

**Dropped:** none (all 8 are below the 15-ticker cap on the first run).

---

## 4. Figure of Merit (FOM)

### Formula

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

All four components normalized to [0, 1].

**Component definitions:**

| Component | Source | Normalization |
|-----------|--------|---------------|
| `confidence` | Trader scan thesis confidence (0–1) | already [0, 1] |
| `normalized_sizing_sigma` | (raw_sigma − σ_min) / (σ_max − σ_min) across today's watchlist | per-run min/max |
| `recent_hit_rate` | Fraction of past 5 directional calls that were correct | rolling 5-day window |
| `news_momentum` | Scalar from news_scout agent (0=no news, 1=strong positive catalysts) | model output |

**Weights rationale:**
- `confidence` (0.4) dominates: it integrates model + technicals + fundamentals.
- `sizing_sigma` (0.3): rewards asymmetric setups where the recent move is outsized relative to noise floor, indicating trend initiation.
- `recent_hit_rate` (0.2): backward-looking accountability; prevents overweighting high-confidence calls that have been systematically wrong.
- `news_momentum` (0.1): small weight because news is noisy and often lagging; it is a tie-breaker, not a driver.

### FOM Table (stub — no live data)

| Ticker | confidence | norm_sigma | hit_rate | news_mom | FOM | Tier |
|--------|-----------|------------|----------|----------|-----|------|
| NVDA | — | — | — | — | — | 1 |
| MSFT | — | — | — | — | — | 1 |
| GOOGL | — | — | — | — | — | 1 |
| META | — | — | — | — | — | 1 |
| AMZN | — | — | — | — | — | 1 |
| AMD | — | — | — | — | — | 2 |
| AAPL | — | — | — | — | — | 2 |
| TSLA | — | — | — | — | — | 2 |

FOM ranking will be populated once the trader pipeline and proxy access are operational.

---

## 5. Open Questions / Things to Revisit Tomorrow

1. **Implement `agents/src/trader/`** — orchestrator, schemas, and CLI. At minimum: `trader scan --tickers <csv> --window <days>` should produce a JSON with `ticker`, `direction`, `confidence`, `sizing_sigma`, `thesis`.
2. **Proxy allowlist for Yahoo Finance** — check `/root/.ccr/README.md` and run `curl -sS "$HTTPS_PROXY/__agentproxy/status"` to see which hosts are blocked. Consider adding `query2.finance.yahoo.com` or switching to a proxy-compatible data source (e.g., Alpha Vantage, Polygon.io, or a cached CSV).
3. **FOM formula iteration** — the 0.4/0.3/0.2/0.1 weights are initialization priors. After 5+ runs with real hit-rate data, re-derive weights via a simple OLS regression of `FOM` on next-day realized return.
4. **news_momentum component** — not yet wired. The `news_scout` agent from the task spec does not exist yet; the field should default to 0.5 (neutral) until it is implemented.
5. **Watchlist expansion** — consider adding sector rotation candidates from the six-region synthesis pages: `TSM` (Taiwan semiconductor, leo-taiwan-odc-gap); `PLTR` (defense-tech-state synthesis); `HOOD`/`COIN` (agentic-payments-six-region).
6. **PR + branch automation** — confirm GitHub Actions can trigger `auto/daily-trader-*` branches without requiring a human merge each time, or decide if the daily PR is review-gated.

---

## Appendix: Infrastructure Checklist

| Item | Status | Notes |
|------|--------|-------|
| `agents/src/trader/` module | ❌ Missing | Must be created |
| `trader scan` CLI | ❌ Missing | Depends on module above |
| yfinance / price feed | ❌ Proxy-blocked | Proxy 403 on all tickers |
| Prior daily-trader file | ❌ None | First run — no backtest possible |
| `agents/outputs/` directory | ✅ Exists | Empty; scan JSON would land here |
| `wiki/synthesis/` directory | ✅ Exists | This file created successfully |
| FOM formula documented | ✅ Done | See § 4 above |
| Branch + PR | ✅ Created | `auto/daily-trader-2026-07-17` |
