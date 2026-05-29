---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-05-29
---

# Daily Trader Evaluation — 2026-05-29

> **Run status: STUB (Day 0 — infrastructure not yet live)**
>
> Two critical blockers prevented a live scan. Both are documented below. This file
> establishes the canonical watchlist seed, FOM formula, and scaffolding so the next
> run can hit the ground running.

---

## Blockers

| # | Component | Detail |
|---|-----------|--------|
| 1 | `agents/src/trader/` pipeline | Does not exist. The `trader scan` / `trader research` CLI has not been implemented. This is the inaugural run — the pipeline scaffold must be built before live scans can execute. See `agents/outputs/scan-2026-05-29.json` for the stub JSON. |
| 2 | `yfinance` data feed | `yfinance 1.4.1` installed successfully but all 15 ticker requests returned **HTTP 403 "Host not in allowlist"**. The Claude Code on-web sandbox network policy blocks outbound requests to Yahoo Finance endpoints. Retried once — same result. Price data is completely unavailable in this execution environment. |

**Resolution path:** Run in an environment with unrestricted outbound HTTP (local dev machine or GitHub Actions with `GITHUB_TOKEN`). The `uv run trader scan` command can be invoked there once the pipeline exists.

---

## Yesterday's Backtest

No prior `daily-trader-*.md` file found — this is Day 0. No backtest is possible.

Hit rate: **N/A** | Mean realized return: **N/A**

---

## Watchlist Seed (15 tickers, capped per budget)

Sourced from: no prior report → defaulted to core set from task spec + high-relevance AI/semicon names from wiki knowledge (NVIDIA dominant in [[concepts/nemotron]] / [[entities/nvidia]] coverage).

| Ticker | Rationale |
|--------|-----------|
| NVDA   | Core AI infrastructure; GTC Taipei 2026 context in wiki |
| AAPL   | Large-cap anchor; consumer AI cycle proxy |
| TSLA   | EV + autonomy; high-beta sentiment barometer |
| MSFT   | Azure AI / OpenAI exposure |
| AMD    | AI GPU alternative to NVDA; data center CPU |
| GOOGL  | Search + Gemini AI; cloud |
| META   | LLM infra (Llama); AR/social |
| AMZN   | AWS + Bedrock; retail + logistics AI |
| NFLX   | Streaming; ad-supported model monetization |
| AVGO   | Custom AI ASICs (Google TPU, Meta MTIA); network semicon |
| ARM    | CPU IP; pervasive in mobile + edge AI |
| SMCI   | AI server ODM; NVDA supply-chain proxy |
| PLTR   | AI analytics + defense; AIP platform |
| COIN   | Crypto market proxy; macro risk-on signal |
| MSTR   | Bitcoin treasury; crypto-equity leverage |

---

## Today's Scan Verdicts

**Unavailable** — trader pipeline + yfinance both blocked. Stub verdicts below use
neutral priors for scaffolding only; do NOT use for trading decisions.

| Ticker | Direction | Confidence | Sizing σ | Notes |
|--------|-----------|-----------|----------|-------|
| NVDA   | abstain   | 0.50      | 0.00     | no data |
| AAPL   | abstain   | 0.50      | 0.00     | no data |
| TSLA   | abstain   | 0.50      | 0.00     | no data |
| MSFT   | abstain   | 0.50      | 0.00     | no data |
| AMD    | abstain   | 0.50      | 0.00     | no data |
| GOOGL  | abstain   | 0.50      | 0.00     | no data |
| META   | abstain   | 0.50      | 0.00     | no data |
| AMZN   | abstain   | 0.50      | 0.00     | no data |
| NFLX   | abstain   | 0.50      | 0.00     | no data |
| AVGO   | abstain   | 0.50      | 0.00     | no data |
| ARM    | abstain   | 0.50      | 0.00     | no data |
| SMCI   | abstain   | 0.50      | 0.00     | no data |
| PLTR   | abstain   | 0.50      | 0.00     | no data |
| COIN   | abstain   | 0.50      | 0.00     | no data |
| MSTR   | abstain   | 0.50      | 0.00     | no data |

---

## Reranked Watchlist

Ranking is degenerate (all abstain, no data). Tier split uses wiki-relevance as a
tiebreaker (AI semicon / infra first, narrative/crypto last).

**Tier 1 (top 5 — watch priority)**

1. NVDA — AI GPU dominance; primary wiki anchor
2. AVGO — Custom ASIC growth; NVDA ecosystem beneficiary
3. AMD — AI GPU #2; earnings catalyst sensitivity
4. MSFT — Azure AI; Microsoft-OpenAI investment return
5. ARM  — Pervasive IP; data-center CPU share gain

**Tier 2 (next 5)**

6. GOOGL
7. META
8. AMZN
9. AAPL
10. PLTR

**Dropped / Deprioritized for next run** (unless news catalyst):
TSLA, NFLX, SMCI, COIN, MSTR

---

## Figure of Merit (FOM)

### Formula

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

All components normalized to **[0, 1]**:

| Component | Normalization rule | Default when missing |
|-----------|-------------------|----------------------|
| `confidence` | LLM thesis confidence ÷ max across watchlist | 0.50 |
| `normalized_sizing_sigma` | abs(sizing_sigma) ÷ max across watchlist | 0.00 |
| `recent_hit_rate` | rolling 5-day hit count ÷ 5 | 0.50 (unknown) |
| `news_momentum` | news_scout polarity score mapped to [0,1] | 0.50 (neutral) |

**Rationale for weights:**
- `confidence` (40%) dominates because thesis quality is the primary alpha driver.
- `sizing_sigma` (30%) captures the model's magnitude conviction — a high-confidence
  small-sigma call is less actionable than a high-sigma one.
- `hit_rate` (20%) provides backward-looking calibration signal as the series matures.
- `news_momentum` (10%) is a short-horizon catalyst flag, deliberately low-weighted
  to avoid noise-chasing.

### FOM Table (Day 0 — all stubs)

All tickers score **FOM = 0.40 × 0.50 + 0.30 × 0.00 + 0.20 × 0.50 + 0.10 × 0.50 = 0.35**
by the neutral prior. No meaningful ranking is possible until live data flows.

| Rank | Ticker | FOM   | Confidence | Sizing σ | Hit Rate | News Mom. |
|------|--------|-------|-----------|----------|----------|-----------|
| 1–15 | all    | 0.35  | 0.50      | 0.00     | 0.50     | 0.50      |

---

## Open Questions / Revisit Tomorrow

1. **Pipeline build priority** — `agents/src/trader/` needs: `orchestrator.py`, `schemas.py`, CLI (`cli.py` with `trader scan` + `trader research`), `tools/yfinance_client.py`. Mirror the Firefly agent pattern in `agents/src/firefly/`.
2. **Network policy** — Either run daily-trader in GitHub Actions (which has unrestricted egress) or request Yahoo Finance allowlist in the sandbox network policy. The yfinance alternative `pandas_datareader` or direct Yahoo query via HTTPS will hit the same 403.
3. **LLM backend** — `LLM_BACKEND=anthropic` is the target; `LLM_BACKEND=disabled TRADER_OFFLINE=1` should produce a schema-valid stub that can be committed. Build the stub mode first so CI can pass.
4. **news_scout** — Not yet defined. On implementation, wire it to a public news API (NewsAPI, Benzinga, or Alpha Vantage news endpoint — check allowlist) or a scraper targeting SEC EDGAR filings for 8-Ks.
5. **FOM calibration** — After 10 trading days, run a Brier score against realized returns to validate the 40/30/20/10 weight split. Consider bumping `hit_rate` to 25% after series is established.
6. **Watchlist scope** — 15 tickers is the cap. Consider adding a sector ETF (XLK, SOXX) as a beta hedge anchor for the next non-stub run.

---

## Artifacts

- Stub scan JSON: `agents/outputs/scan-2026-05-29.json`
- This file: `wiki/synthesis/daily-trader-2026-05-29.md`

*No order placement. No money movement. Analysis only.*
