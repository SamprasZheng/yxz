---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-06-02
---

# Daily Trader Report — 2026-06-02

> **Run mode: OFFLINE STUB**
> Two blockers prevented live data and LLM scan from running.
> See §Blockers below. All price-based columns are N/A; the FOM degrades to a model-prior-only ranking.

---

## Blockers (first run)

| Component | Status | Detail |
|-----------|--------|--------|
| `agents/src/trader/` | **NOT IMPLEMENTED** | The trader pipeline does not exist — only the `firefly` pipeline is in `agents/src/`. Must be built before LLM-backed verdicts are possible. |
| `yfinance` outbound | **BLOCKED — HTTP 403** | Yahoo Finance returns `Host not in allowlist` in this remote execution environment. Network policy must whitelist `finance.yahoo.com` (or a permitted proxy) before price data can flow. |

---

## Yesterday's Backtest

**N/A — this is the first run.** No prior `wiki/synthesis/daily-trader-*.md` exists.
The seed watchlist is the core-8 set. Starting from run-2 there will be a populated backtest table.

| Ticker | Predicted Dir | Realized 1d % | Hit/Miss | Notes |
|--------|---------------|---------------|----------|-------|
| — | — | — | — | First run; no prior calls to score |

Hit rate: **N/A** | Mean realized return: **N/A**

---

## Today's Scan Verdicts

Scan run with `LLM_BACKEND=disabled TRADER_OFFLINE=1` (trader CLI not yet built; fallback to stub).
Price columns (`last_close`, `chg_1d_pct`, `vol5d`) are all N/A due to network block.
`news_momentum` is a **model-prior estimate** (knowledge cutoff Aug 2025) clearly labeled as such.

| Ticker | Direction | Confidence | Sizing σ | News Momentum (prior) | Thesis stub |
|--------|-----------|-----------|----------|-----------------------|-------------|
| NVDA | N/A | N/A | N/A | 0.90 | AI GPU leader; Blackwell ramp; datacenter demand intact |
| META | N/A | N/A | N/A | 0.85 | AI capex + Llama; revenue resilience; Reality Labs drag small |
| MSFT | N/A | N/A | N/A | 0.80 | Azure + Copilot M365 upsell; OpenAI optionality; enterprise moat |
| AMZN | N/A | N/A | N/A | 0.78 | AWS Bedrock/Trainium2 growth; retail margin expansion |
| GOOGL | N/A | N/A | N/A | 0.70 | Search defended via AI Overviews; antitrust overhang |
| AMD | N/A | N/A | N/A | 0.65 | MI300X gaining HPC share; ROCm software catch-up risk; EPYC strong |
| AAPL | N/A | N/A | N/A | 0.60 | Apple Intelligence rollout; upgrade supercycle uncertain |
| TSLA | N/A | N/A | N/A | 0.35 | FSD/Robotaxi optionality large but binary; EV margin pressure |

Scan artifact: `[[outputs/scan-2026-06-02.json]]`

---

## Watchlist Rerank

### Tier-1 (top 5 by FOM)

| Rank | Ticker | FOM (offline) | Notes |
|------|--------|---------------|-------|
| 1 | **NVDA** | 0.090 | AI-infra anchor; highest prior momentum |
| 2 | **META** | 0.085 | AI capex cycle + monetization clarity |
| 3 | **MSFT** | 0.080 | Broad enterprise AI adoption wave |
| 4 | **AMZN** | 0.078 | AWS + Bedrock acceleration |
| 5 | **GOOGL** | 0.070 | Search moat defended; regulatory wildcard |

### Tier-2 (next 3)

| Rank | Ticker | FOM (offline) | Notes |
|------|--------|---------------|-------|
| 6 | **AMD** | 0.065 | High upside if MI300X ramp accelerates; track GPU shipment data |
| 7 | **AAPL** | 0.060 | Steady; revisit if AI-phone cycle inflects |
| 8 | **TSLA** | 0.035 | High vol; skip until FSD/Robotaxi clarity improves |

No `news_scout` candidates (LLM backend disabled; no new tickers promoted).

---

## FOM Formula

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

**Component definitions:**
- `confidence` — LLM scan output in [0, 1]; how strongly the thesis holds given current macro + earnings data.
- `normalized_sizing_sigma` — Kelly/volatility-adjusted position size, normalized to [0, 1] across the watchlist.
- `recent_hit_rate` — rolling 5-day directional accuracy for this ticker, normalized to [0, 1].
- `news_momentum` — recency-weighted positive/negative news signal, normalized to [0, 1].

**Offline degradation:** With only `news_momentum` available, `FOM_offline = 0.1 × news_momentum`.
This collapses to a pure prior-ranking; use only as a tie-breaker until live data flows.

**Weight rationale:**
- Confidence gets the highest weight (0.4) because thesis quality is the hardest to proxy.
- Sizing signal (0.3) captures risk-adjusted opportunity size.
- Hit rate (0.2) rewards recent calibration.
- News momentum (0.1) is the most noisy; kept low-weighted.

**Future iterations to consider:**
- Add `earnings_proximity_penalty` (-0.05 within 7 days of earnings) — avoids binary event risk.
- Add `sector_concentration_discount` when top-3 FOM tickers are all in the same sector.
- Replace static weights with a rolling OLS fit once ≥20 daily observations exist.

---

## Open Questions / Revisit Tomorrow

1. **Network allowlist**: Can `finance.yahoo.com` be added? Alternatively, is there a permitted API proxy (e.g., Polygon.io, Alpaca, or a local CSV feed)?
2. **Trader pipeline**: Should `agents/src/trader/` mirror the firefly scaffold (typer CLI + Pydantic schemas + LLM agent)? Who owns the build?
3. **Backtest ground truth**: Tomorrow's report needs today's close prices. If the network is still blocked, consider caching a CSV snapshot before this session ends.
4. **TSLA flag**: Tier-2 but high volatility — keep on list for mean-reversion signals but do not size up without a cleaner setup.
5. **AMD watch**: If AMD prints a strong MI300X shipment update, confidence should jump to 0.80+ and tier-1 promotion is warranted.
6. **News scout expansion**: Once the trader CLI is built, add `news_scout` to surface non-core tickers (e.g., SMCI, AVGO, ARM) that correlate with the AI-infra theme.
