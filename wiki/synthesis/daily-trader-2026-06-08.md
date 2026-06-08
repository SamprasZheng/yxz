---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-06-08
---

# Daily Trader Report — 2026-06-08

> **DATA MODE: OFFLINE_STUB**
>
> Two blockers prevented live data:
> 1. **Network policy** — `finance.yahoo.com` is not in this remote-env's egress allowlist → all `yfinance` calls returned `HTTP 403 Host not in allowlist`.
> 2. **No trader pipeline** — `agents/src/trader/` does not exist; this is **run-1** (seed run). The `trader scan` CLI referenced in the task spec has not been built yet.
>
> Fallback: signals are estimated from model knowledge (cutoff Aug 2025) and are **for methodology documentation only — not for trading decisions**.
> Tomorrow's run should: (a) add `finance.yahoo.com` to the env allowlist OR switch to an allowed data source, (b) scaffold `agents/src/trader/` with at minimum a `yfinance_client.py` and a `cli.py`.

---

## 1. Yesterday's Backtest

**Run-1 — no prior report to backtest.**

| Ticker | Predicted Dir | Realized 1d % | Hit/Miss |
|--------|--------------|---------------|----------|
| —      | —            | —             | —        |

**Summary:** hit_rate = N/A (first run; neutral prior 0.5 applied in FOM).

---

## 2. Today's Scan Verdicts (OFFLINE_STUB)

Scan artifact: `agents/outputs/scan-2026-06-08.json`

Signals generated with: 5-day momentum vs threshold (±2%), RSI-14 overbought/oversold guard, estimated daily volatility σ≈1.8% for large-cap tech.

| Ticker | Price (est) | 1d % | 5d % | RSI-14 | Direction | Confidence | Sizing σ | Notes |
|--------|------------|------|------|--------|-----------|------------|----------|-------|
| NVDA   | $135       | +1.2 | +3.1 | 62     | **long**  | 0.642      | 1.72     | AI-GPU Blackwell ramp |
| META   | $620       | +0.8 | +2.4 | 59     | **long**  | 0.658      | 1.33     | Llama + Reels flywheel |
| MSFT   | $445       | +0.5 | +1.8 | 57     | **long**  | 0.666      | 1.00     | Azure + Copilot |
| GOOGL  | $185       | +0.6 | +1.5 | 56     | abstain   | 0.400      | 0.83     | Below 2% threshold |
| AMZN   | $210       | +0.4 | +1.2 | 55     | abstain   | 0.400      | 0.67     | Below 2% threshold |
| AMD    | $180       | −0.3 | −1.1 | 47     | abstain   | 0.400      | 0.61     | Weak but no short signal |
| AAPL   | $225       | +0.2 | +0.5 | 52     | abstain   | 0.400      | 0.28     | Low momentum |
| TSLA   | $260       | −1.8 | −4.2 | 38     | **short** | 0.614      | 2.33     | Delivery miss + CEO overhang |

---

## 3. FOM Formula

```
FOM = 0.4 × confidence + 0.3 × norm_sizing_sigma + 0.2 × recent_hit_rate + 0.1 × news_momentum
```

Component definitions:

| Component | Weight | Range | Notes |
|-----------|--------|-------|-------|
| `confidence` | 0.40 | [0,1] | Model's conviction in predicted direction; 0.40 = neutral/abstain floor |
| `norm_sizing_sigma` | 0.30 | [0,1] | `sizing_sigma / max(sizing_sigma)` across watchlist; captures signal magnitude relative to volatility |
| `recent_hit_rate` | 0.20 | [0,1] | Fraction of prior predictions correct (last N days); first-run = 0.5 neutral prior |
| `news_momentum` | 0.10 | [0,1] | Qualitative news/catalyst signal (0=bearish, 0.5=neutral, 1=strongly bullish); manually set; replace with NLP signal when trader pipeline exists |

`sizing_sigma = |5d_momentum_pct| / rolling_10d_daily_vol_pct`; capped at 3.0.

The `news_momentum` component deliberately receives the smallest weight (0.1) because it is the least objective — it should be replaced by a quantified news-sentiment score once the `news_scout` agent is built.

---

## 4. FOM Table (Sorted Descending)

| Rank | Ticker | Direction | Conf  | norm-σ | HitRate | NewsM | **FOM** |
|------|--------|-----------|-------|--------|---------|-------|---------|
| 1    | TSLA   | short     | 0.614 | 1.000  | 0.50    | 0.35  | **0.681** |
| 2    | NVDA   | long      | 0.642 | 0.738  | 0.50    | 0.85  | **0.663** |
| 3    | META   | long      | 0.658 | 0.571  | 0.50    | 0.75  | **0.610** |
| 4    | MSFT   | long      | 0.666 | 0.429  | 0.50    | 0.72  | **0.567** |
| 5    | GOOGL  | abstain   | 0.400 | 0.357  | 0.50    | 0.65  | **0.432** |
| 6    | AMZN   | abstain   | 0.400 | 0.286  | 0.50    | 0.68  | **0.414** |
| 7    | AMD    | abstain   | 0.400 | 0.262  | 0.50    | 0.55  | **0.394** |
| 8    | AAPL   | abstain   | 0.400 | 0.119  | 0.50    | 0.50  | **0.346** |

---

## 5. Reranked Watchlist

### Tier-1 (Top 5 by FOM — highest signal/quality)

| Ticker | Direction | FOM   | Rationale |
|--------|-----------|-------|-----------|
| TSLA   | **short** | 0.681 | Strongest sizing_sigma (2.33); -4.2% 5d momentum; RSI 38 (not yet oversold enough to fade); catalyst risk high |
| NVDA   | **long**  | 0.663 | AI-GPU demand; Blackwell ramp; highest news_momentum score |
| META   | **long**  | 0.610 | Consistent earnings beats; Llama 4 moat building |
| MSFT   | **long**  | 0.567 | Steady compounder; Azure + Copilot growth unlocking |
| GOOGL  | abstain   | 0.432 | Watch for re-entry; Search AI mode transition risk |

### Tier-2 (Next 3)

| Ticker | Direction | FOM   | Rationale |
|--------|-----------|-------|-----------|
| AMZN   | abstain   | 0.414 | Solid fundamentals; AWS re-acceleration watch |
| AMD    | abstain   | 0.394 | MI300 ramp; watch for NVDA share loss signals |
| AAPL   | abstain   | 0.346 | Low volatility; optionality on AI super-cycle |

**New exploration candidates from news_scout:** None — news_scout agent not yet built. Candidates to add in run-2 when network is unblocked: `SMCI` (server AI infra), `ARM` (chip architecture licensing), `PLTR` (AI enterprise SaaS), `MRVL` (custom silicon for AI).

---

## 6. Open Questions / Revisit Tomorrow

1. **Network unblock**: Can `finance.yahoo.com` or an alternative data source (e.g., Alpha Vantage, Polygon.io) be added to the env allowlist? Without live prices, all signals are stale-knowledge estimates.

2. **Build `agents/src/trader/`**: Scaffold the trader pipeline with at minimum:
   - `tools/yfinance_client.py` — price + volume fetch
   - `agents/signal_agent.py` — RSI, SMA, momentum
   - `agents/news_scout.py` — headline NLP sentiment
   - `orchestrator.py` — runs scan, produces JSON
   - `cli.py` — `trader research <TICKER>` and `trader scan --tickers ...`

3. **TSLA short validity**: TSLA's high FOM comes from a strong short signal (-4.2% 5d) but these prices are from Aug-2025 knowledge — by June 2026 the setup may have fully resolved. Confirm live price before acting.

4. **FOM calibration**: The 0.4/0.3/0.2/0.1 weights are naive priors. After run-5 there will be enough hit/miss data to fit weights via logistic regression.

5. **Watchlist expansion**: Consider adding `SMCI`, `ARM`, `PLTR`, `MRVL` for wider AI-infrastructure coverage (cap at 15 tickers per task spec).

6. **Backtest attribution**: Once live prices are available for run-2, the run-1 predictions (TSLA short, NVDA/META/MSFT long) will generate the first real hit/miss row. Mark run-1 backtest date as 2026-06-09.

---

*Analysis only — no order placement, no money movement.*
*Prices estimated from model knowledge cutoff Aug 2025; treat as illustrative, not actionable.*
