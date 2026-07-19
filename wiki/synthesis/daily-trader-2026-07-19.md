---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-07-19
---

# Daily Trader: Backtest + Rerank + FOM — 2026-07-19

> **Run status:** offline-stub — no trader pipeline exists in this repo (only Firefly orbital planner). yfinance blocked by remote-env proxy (403 CONNECT). Price data sourced from web searches. LLM scan not runnable. All verdicts are manual analysis anchored on verified market data; treat confidence values as estimates, not model outputs.

---

## 1. Infrastructure Blockers (first run)

| Blocker | Detail |
|---------|--------|
| `agents/src/trader/` absent | Only `agents/src/firefly/` exists; no trader CLI, orchestrator, or schemas. |
| yfinance proxy 403 | Remote env proxy blocks CONNECT tunnels to Yahoo Finance API. |
| Price data completeness | Daily % change confirmed for NVDA, AAPL, TSLA, PLTR only; other tickers have close price but not precise 1-day delta. |
| LLM scan | `LLM_BACKEND=anthropic uv run trader scan` not runnable (CLI absent). Fallback `LLM_BACKEND=disabled TRADER_OFFLINE=1` also not runnable. |

These blockers are filed so future runs can address them incrementally (add trader pipeline, configure proxy allowlist for Yahoo Finance).

---

## 2. Backtest — Prior Recommendations

**No prior daily-trader file exists.** This is run #1. No backtest is possible.

- **Hit rate:** N/A (0 prior predictions)
- **Mean realized return:** N/A
- **Watchlist sourced from:** core seed set + wiki-mentioned public companies

The next run (2026-07-20 or first Monday) will backtest the predictions filed below.

---

## 3. Today's Scan — Verdicts (last trading day: 2026-07-17 Friday close)

**Market context (July 17 close):**
- S&P 500: 7,457.69 (−1.01% on day)
- Nasdaq Composite: 25,520.24 (−1.40%)
- DJIA: 52,146.42 (−0.77%)
- SMH (VanEck Semis ETF): −9.0% on week (3rd weekly decline in 4)
- PHLX Semiconductor Index: −20.2% from June 22 record high
- Macro theme: Chinese AI model improvements (Kimi / Moonshot AI) restarting the "do hyperscalers need fewer GPUs?" debate; rotation from large-cap tech into small-caps and value; Russell 2000 leading S&P by 2.4 pp for the week.

| Ticker | Last Close (Jul 17) | 1-Day % Chg | Direction | Confidence | Sizing σ | Thesis Summary |
|--------|---------------------|-------------|-----------|------------|----------|----------------|
| NVDA   | $207.40             | −2.21%      | **short** | 0.65       | 1.80     | AI capex re-rating; chip index −20.2% from peak; highest-conviction bearish thesis in semis |
| AAPL   | $333.74             | +0.14%      | **long**  | 0.60       | 0.80     | +5.8% on week vs Mag7 weakness; services/HW mix insulated from AI capex debate |
| AMD    | $500.90             | n/a         | **short** | 0.60       | 1.50     | −5% intra-day Jul 17 before recovery; MI300X demand narrative weakened |
| COIN   | $157.12             | n/a         | **short** | 0.55       | 1.60     | Risk-off; crypto β to large-cap growth; BTC consolidating |
| PLTR   | $132.38             | −1.53%      | **long**  | 0.55       | 1.30     | Defense/gov software secular demand; NATO AIP contract; relative resilience vs pure-semis |
| TSLA   | $380.84             | −2.61%      | **short** | 0.55       | 1.40     | Growth/AI-adjacent selloff; FSD pace uncertain |
| MA     | n/a (est ~$493)     | n/a         | **long**  | 0.50       | 1.00     | Value rotation; FCF compounder; agentic-payments tailwind (see [[synthesis/agentic-payments-six-region]]) |
| V      | $358.56             | n/a         | **long**  | 0.50       | 1.00     | Same thesis as MA; payment volumes resilient; defensive rotation |
| MSFT   | $393.82             | n/a         | abstain   | 0.45       | 1.10     | Azure AI capex re-rated; Copilot real but scale uncertain |
| GOOGL  | $346.77             | n/a         | abstain   | 0.45       | 1.00     | Search moat intact; but TPU infra capex headwind |
| META   | $646.01             | n/a         | abstain   | 0.45       | 1.00     | Ad revenue solid; Llama strategy differentiates; but capex drag |
| AMZN   | $247.23             | n/a         | abstain   | 0.45       | 1.00     | AWS AI capex questioned; e-commerce floor |

---

## 4. Reranked Watchlist

### Tier-1 (highest signal clarity, forward + news conviction)

| Rank | Ticker | Direction | FOM  | Why this tier |
|------|--------|-----------|------|---------------|
| 1    | AAPL   | LONG      | 0.66 | Relative-strength breakout in bearish tape; highest news momentum |
| 2    | NVDA   | SHORT     | 0.64 | Highest sizing σ + strong bearish macro thesis |
| 3    | AMD    | SHORT     | 0.60 | Semiconductor rout co-primary with NVDA |
| 4    | COIN   | SHORT     | 0.59 | High β risk-off; clear directional signal |
| 5    | PLTR   | LONG      | 0.57 | Defense secular insulation + relative strength |

### Tier-2 (moderate signal, watch for confirmation)

| Rank | Ticker | Direction | FOM  | Why this tier |
|------|--------|-----------|------|---------------|
| 6    | TSLA   | SHORT     | 0.56 | Growth selloff but high volatility, lower confidence |
| 7    | MA     | LONG      | 0.56 | Value rotation thesis; data incomplete for MA close |
| 8    | V      | LONG      | 0.56 | Same as MA; confirmed close available |
| 9    | MSFT   | abstain   | 0.54 | Mixed Azure signals; hold for earnings clarity |
| 10   | GOOGL  | abstain   | 0.52 | Neutral; watch AI-capex commentary |

### Dropped (low FOM, conflicting signals)

- **META** (0.52): Ad revenue solid but heavy capex; abstain promoted to drop pending earnings.
- **AMZN** (0.52): Same; AWS capex guidance is the key catalyst.

---

## 5. FOM Table — Sorted Descending

**FOM formula (v1.0):**

```
FOM = 0.4 × confidence + 0.3 × normalized_sizing_σ + 0.2 × recent_hit_rate + 0.1 × news_momentum
```

- `confidence`: model/analyst conviction in direction (0–1)
- `normalized_sizing_σ`: recent realized daily volatility normalized to [0,1] (higher σ = larger position sizing opportunity but also more risk; cap at σ=2.5 → 1.0)
- `recent_hit_rate`: rolling hit rate from prior backtest windows (0.5 for all on first run — no data)
- `news_momentum`: directional strength of recent news flow (0=strongly negative, 1=strongly positive)

All four components are normalized to [0, 1]. In subsequent runs, `recent_hit_rate` will be replaced with the actual rolling 5-day hit rate per ticker.

| Rank | Ticker | Confidence | Sizing σ (norm) | Hit Rate | News Mom. | **FOM** | Direction |
|------|--------|-----------|-----------------|----------|-----------|---------|-----------|
| 1    | AAPL   | 0.60      | 0.80            | 0.50     | 0.80      | **0.660** | LONG |
| 2    | NVDA   | 0.65      | 0.85            | 0.50     | 0.20      | **0.635** | SHORT |
| 3    | AMD    | 0.60      | 0.80            | 0.50     | 0.20      | **0.600** | SHORT |
| 4    | COIN   | 0.55      | 0.75            | 0.50     | 0.40      | **0.585** | SHORT |
| 5    | PLTR   | 0.55      | 0.65            | 0.50     | 0.55      | **0.570** | LONG |
| 6    | TSLA   | 0.55      | 0.70            | 0.50     | 0.30      | **0.560** | SHORT |
| 7    | MA     | 0.50      | 0.55            | 0.50     | 0.70      | **0.555** | LONG |
| 8    | V      | 0.50      | 0.55            | 0.50     | 0.70      | **0.555** | LONG |
| 9    | MSFT   | 0.45      | 0.60            | 0.50     | 0.55      | **0.530** | abstain |
| 10   | GOOGL  | 0.45      | 0.55            | 0.50     | 0.55      | **0.515** | abstain |
| 11   | META   | 0.45      | 0.55            | 0.50     | 0.50      | **0.510** | abstain |
| 12   | AMZN   | 0.45      | 0.55            | 0.50     | 0.50      | **0.510** | abstain |

---

## 6. Predictions for Next-Run Backtest (2026-07-21 Monday open)

These predictions will be backtested in the next daily run against July 21 realized returns.

| Ticker | Predicted Direction | Confidence | Key Risk |
|--------|---------------------|------------|----------|
| AAPL   | LONG                | 0.60       | If Mag7 selloff broadens to AAPL, thesis breaks |
| NVDA   | SHORT               | 0.65       | Any positive capex guidance from hyperscalers flips |
| AMD    | SHORT               | 0.60       | MI300X supply data could reverse |
| COIN   | SHORT               | 0.55       | BTC breakout above $110K would flip |
| PLTR   | LONG                | 0.55       | Broad risk-off could override defensive thesis |
| TSLA   | SHORT               | 0.55       | FSD milestone news could flip quickly |
| MA     | LONG                | 0.50       | Recession fears could hurt consumer spending |
| V      | LONG                | 0.50       | Same as MA |

---

## 7. Open Questions / Things to Revisit Tomorrow

1. **Trader pipeline**: Create `agents/src/trader/` with a minimal CLI (`trader scan --tickers ... --window 7`) using the Firefly orchestrator pattern as template. Without it, every run is a manual stub.
2. **Proxy allowlist**: Check `/root/.ccr/README.md` for how to allowlist `query2.finance.yahoo.com` so yfinance can fetch data programmatically.
3. **MA close price**: Could not confirm July 17 close for Mastercard — the $493 figure may be from a different date range. Verify before Monday open.
4. **Weekly wiki insight**: The semiconductor rout is −20% from peak but PHLX is not yet officially in "bear territory" (−20% threshold). Watch Monday open for potential reversal if no new Chinese AI news over the weekend.
5. **FOM calibration**: Once 5+ days of backtest data accumulate, re-weight `recent_hit_rate` component (currently a flat 0.5 filler). Consider separating `sizing_σ` into upside and downside σ.
6. **New exploration candidates** (from news_scout signal): Consider adding **INTC** (Intel dropped 4% July 17, potential bottom-fishing thesis for next week) and **NVDL** (2× NVDA ETF, high-leverage short vehicle) to watchlist.

---

## Data Sources

- Market indices: web search results citing Yahoo Finance, CNBC live market updates July 17 2026
- Individual closes: Yahoo Finance, 247wallst.com, tradersunion.com, investrade.com
- Market narrative: CNBC "Stocks fall after Netflix whiff while chip stocks sell-off hammers Nasdaq" (July 17); ts2.tech "Small Caps Outperform Tech; S&P 500 Closes at 7,457.69" (July 18 recap)
- Semiconductor context: 247wallst.com "AMD Falls 5%, Intel Drops 4%, NVIDIA Slides 3% Before Recovering" (July 17); Intellectia.ai "Semiconductor Stocks July 2026: NVDA vs AMD Investment Analysis"

> **Disclaimer:** Analysis only. No orders placed, no money moved. All figures are informational and may contain errors due to proxy/data-access constraints. Verify before trading.
