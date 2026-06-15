---
type: synthesis
tags: [trader, daily, watchlist, fom, bootstrap]
date: 2026-06-15
---

# Daily Trader Evaluation — 2026-06-15 (Bootstrap Run)

> **Status: BLOCKED / STUB** — This is the first daily-trader run. Live market data could not be fetched due to network egress restrictions in the remote execution environment. All methodology, FOM formula, and infrastructure gaps are documented below so the next run can proceed cleanly.

---

## 1. Yesterday's Backtest

**No prior report exists** (`wiki/synthesis/daily-trader-*.md` returned no results). Backtest section skipped for this bootstrap run. Starting from run #2, this table will show:

| Ticker | Predicted Dir | Predicted Conf | Realized 1d % | Hit? | Notes |
|--------|--------------|----------------|----------------|------|-------|
| —      | —            | —              | —              | —    | First run — no prior recommendations |

**Hit rate:** N/A  
**Mean realized return:** N/A

---

## 2. Today's Watchlist (Seed)

15-ticker core universe seeded from task specification (no prior report to recover from):

| # | Ticker | Rationale |
|---|--------|-----------|
| 1 | NVDA   | AI GPU leader; most-watched momentum name |
| 2 | AAPL   | Mega-cap; relative-value anchor |
| 3 | TSLA   | High-beta EV/AI play |
| 4 | MSFT   | Cloud + Copilot AI monetisation |
| 5 | AMD    | GPU/CPU challenger to NVDA |
| 6 | GOOGL  | AI search + TPU + YouTube |
| 7 | META   | LLaMA + ad-cycle AI play |
| 8 | AMZN   | AWS + Bedrock + Trainium |
| 9 | SMCI   | AI server supply chain |
|10 | TSM    | Foundry chokepoint (NVDA/AAPL/AMD) |
|11 | AVGO   | Networking ASIC + XPU custom silicon |
|12 | QCOM   | Edge AI / Snapdragon |
|13 | ARM    | Architecture royalties across AI silicon |
|14 | MU     | HBM / DRAM demand from AI clusters |
|15 | INTC   | Turnaround / foundry wildcard |

---

## 3. Today's Scan — BLOCKED

**Root cause:** The remote execution environment (code.claude.com) blocks outbound HTTP to financial data hosts:

| Host | Status | Error |
|------|--------|-------|
| `query1.finance.yahoo.com` | ❌ Blocked | HTTP 403 — not in egress allowlist |
| `query2.finance.yahoo.com` | ❌ Blocked | HTTP 403 — not in egress allowlist |
| `alphavantage.co`          | ❌ Blocked | HTTP 403 |
| `api.polygon.io`           | ❌ Blocked | HTTP 403 |

**Pipeline gap:** `agents/src/trader/` does not exist yet (only `agents/src/firefly/` is implemented). The `trader scan` CLI referenced in the task prompt is a future deliverable.

**Fallback attempted:** `LLM_BACKEND=disabled TRADER_OFFLINE=1` — no offline cache exists on first run, so no stub data was produced. JSON artifact at `agents/outputs/scan-2026-06-15.json` records the failure for audit.

---

## 4. Reranked Watchlist (Tier Assignment Deferred)

Cannot rerank without live data. Provisional tier structure for next run:

- **Tier-1 (top 5):** assign by highest FOM score from scan
- **Tier-2 (next 5):** assign by FOM rank 6–10
- **Drop:** rank 11–15 or any ticker with `direction = abstain` and `confidence < 0.4`

No exploration candidates from news_scout (not run — pipeline absent).

---

## 5. Figure of Merit (FOM) — Formula Established

`FOM = 0.4 × confidence + 0.3 × norm_sizing_sigma + 0.2 × recent_hit_rate + 0.1 × news_momentum`

### Component definitions

| Component | Weight | Range | Definition |
|-----------|--------|-------|------------|
| `confidence` | 40% | [0, 1] | Direction call confidence from momentum/vol ratio. `conf = min(0.9, 0.5 + |momentum| × 10)` where `momentum = 0.5×ret_1d + 0.3×ret_5d + 0.2×ret_10d`. |
| `norm_sizing_sigma` | 30% | [0, 1] | `(sizing_sigma + 3) / 6`, clamped [0,1]. `sizing_sigma = momentum / annualised_vol`. Covers −3σ to +3σ regime. |
| `recent_hit_rate` | 20% | [0, 1] | Fraction of prior daily calls where direction was correct. Set to **0.5** (neutral) on first run; updates from backtest data in subsequent runs. |
| `news_momentum` | 10% | [0, 1] | `min(1.0, |ret_1d| / 0.03)` — a 3% daily move earns full score. Proxy for news-driven volatility. |

### Rationale for weights
- Confidence is the primary signal because it combines magnitude and risk-adjustment in one number.
- Sizing sigma adds risk-normalised conviction (a large move in a low-vol stock is more significant than the same move in TSLA).
- Hit rate provides the feedback loop: tickers whose calls verified against realized returns earn a higher FOM slot over time.
- News momentum is a tiebreaker / recency signal, weighted low to avoid overreacting to one-day spikes.

### Planned iterations
- Add sector-rotation signal once a portfolio-level view is built.
- Replace `news_momentum` with an LLM-scored news sentiment once `agents/src/trader/` is built.
- Consider adding `earnings_proximity` penalty (−0.1 if earnings within 5 trading days).

---

## 6. Open Questions / Things to Revisit Tomorrow

1. **Egress fix (blocker):** Add `query1.finance.yahoo.com` and `query2.finance.yahoo.com` to the network allowlist in the remote environment settings (see https://code.claude.com/docs/en/claude-code-on-the-web). Alternatively, add an API key for a permitted data provider (Alpha Vantage, Polygon.io, Tiingo, Alpaca Markets) to the environment variables and update the fetch script to use it.

2. **Pipeline build:** `agents/src/trader/` needs to be scaffolded. Minimum viable structure:
   - `agents/src/trader/cli.py` — `trader research` (single ticker) + `trader scan` (watchlist)
   - `agents/src/trader/orchestrator.py` — orchestrates data fetch → LLM thesis → output
   - `agents/src/trader/schemas.py` — Pydantic models for ticker verdict, scan output
   - `agents/src/trader/tools/yfinance_client.py` — wraps yfinance with retry/cache

3. **Tier verification:** Once data flows, verify that the 15-ticker universe is well-diversified (not all correlated AI plays). Consider adding a non-tech hedge: SPY, GLD, or TLT as relative-value context.

4. **Backtest baseline:** Run #2 will be the first real backtest. On that run, compare today's watchlist prices (from run #2 fetch, `period=2d`) against the provisional directions implied by the FOM formula to establish a synthetic "Day 0 call" and measure Day 1 realised return.

5. **LLM thesis:** The `TRADER_OFFLINE=1` fallback produces mechanical signals only. Once the Anthropic backend is connected, each ticker should get a 3-sentence qualitative thesis that synthesises the quantitative signals with recent news context.

---

## 7. Infrastructure Setup Checklist

- [ ] **Network egress:** Add Yahoo Finance / market-data host to allowlist
- [ ] **Trader CLI:** Scaffold `agents/src/trader/` (see open question #2)
- [ ] **API key:** Set `ALPHA_VANTAGE_API_KEY` or equivalent in env vars if Yahoo remains blocked
- [ ] **Offline cache:** Implement JSON price cache in `agents/outputs/price-cache/` for zero-network fallback
- [ ] **LLM backend:** Configure `ANTHROPIC_API_KEY` in remote env for thesis generation
- [ ] **PR template:** Create `.github/PULL_REQUEST_TEMPLATE/daily_trader.md` for consistent PR format

---

*Scan artifact:* `[[../agents/outputs/scan-2026-06-15.json]]`  
*Next run:* daily-trader-2026-06-16 — first real data run if egress is fixed.
