---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-11-23
---

# Daily Trader Evaluation — 2026-11-23

> **Status: BLOCKED (stub report)**
> Two blockers prevented a live scan. This file documents what blocked the run so the pipeline can be fixed before the next execution.

---

## Blockers

### 1. Trader pipeline not implemented

`agents/src/trader/` does not exist. The agents codebase contains only:

```
agents/src/firefly/   ← Firefly orbital mission-planning pipeline (present)
agents/src/trader/    ← MISSING — CLI, orchestrator, tools, schemas not yet built
```

The scheduled task references `trader scan` and `trader research` CLI commands, plus `agents/src/trader/tools/yfinance_client.py`. None of these exist. The pipeline must be built before this task can run end-to-end.

### 2. Yahoo Finance blocked by outbound proxy

Even outside the missing pipeline, the remote execution environment's network policy blocks outbound connections to Yahoo Finance. Direct `yfinance` calls return:

```
Cookie fetch from fc.yahoo.com failed (ConnectionError)
CONNECT tunnel failed, response 403
```

All 15 tickers in the seed watchlist returned either a 403 or empty data. Market-data fetching requires either (a) an allowed endpoint in the env policy or (b) a data source not behind Yahoo Finance's CONNECT tunnel.

---

## Watchlist (seeded — no prior daily-trader file)

Since no prior `wiki/synthesis/daily-trader-*.md` exists, the watchlist is seeded from the core set specified in the scheduled task:

| # | Ticker | Seed reason |
|---|--------|-------------|
| 1 | NVDA | Core — AI infrastructure anchor |
| 2 | AAPL | Core — megacap bellwether |
| 3 | TSLA | Core — EV/AI car bellwether |
| 4 | MSFT | Core — cloud/AI platform |
| 5 | AMD | Core — GPU/CPU competitive read on NVDA |
| 6 | GOOGL | Core — hyperscaler + AI |
| 7 | META | Core — AI infra spend bellwether |
| 8 | AMZN | Core — hyperscaler + AWS |
| 9 | PLTR | Core — defense-AI; heavily covered in this wiki |
| 10 | AVGO | Core — networking + AI chip adjacency |
| 11 | ARM | Core — CPU IP foundational |
| 12 | TSM | Core — semiconductor fab bellwether (Taiwan) |
| 13 | SMCI | Core — AI server supply chain |
| 14 | INTC | Core — foundry turnaround watch |
| 15 | ORCL | Core — cloud database + AI infra |

Cap: 15 tickers (matches task budget).

---

## Yesterday's Backtest

**N/A** — no prior daily-trader recommendation file exists. Hit rate = undefined. This is the first run.

---

## Today's Scan Verdicts

**N/A** — `trader scan` CLI not implemented; Yahoo Finance proxy-blocked.

Stub output written to `agents/outputs/scan-2026-11-23.json`.

---

## Reranked Watchlist

Cannot rank without scan data. Tier assignments deferred to next run once blockers are resolved.

**Tier-1 (placeholder):** NVDA, AAPL, MSFT, GOOGL, PLTR ← chosen as highest-wiki-coverage / most-macro-sensitive from existing wiki content
**Tier-2 (placeholder):** TSM, AVGO, ARM, AMZN, META
**Dropped (placeholder):** TSLA, AMD, SMCI, INTC, ORCL

---

## FOM (Figure of Merit) Definition

The FOM formula for future runs, once data is available:

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

Each component is normalized to [0, 1]:

| Component | Normalization | Source |
|-----------|---------------|--------|
| `confidence` | Raw 0–1 output from the thesis-generation agent | `trader scan` JSON `thesis.confidence` |
| `normalized_sizing_sigma` | `sizing_sigma / max_sigma_in_batch` | `trader scan` JSON `sizing_sigma` |
| `recent_hit_rate` | Trailing-5-day hit count / 5 | backtest table (previous daily reports) |
| `news_momentum` | Normalized sentiment score from news_scout | `trader scan` JSON `news_scout.momentum` |

FOM table sorted descending:

| Ticker | confidence | norm_sizing_σ | hit_rate | news_mom | FOM |
|--------|-----------|---------------|----------|----------|-----|
| *all N/A* | — | — | — | — | — |

---

## Open Questions / To Revisit Tomorrow

1. **Build the trader pipeline** — `agents/src/trader/` needs orchestrator, schemas, agents, and CLI matching `trader scan --tickers <list> --window 7`.
2. **Resolve the data feed** — either add Yahoo Finance to the allowed outbound list in the environment policy, or switch to a proxy-compatible market-data API (e.g. Alpha Vantage, Polygon.io, or a local cache).
3. **Seed a backtest baseline** — once the first live scan runs, store its `direction` predictions in the synthesis page so the next run can backtest them.
4. **Consider adding PLTR to tier-1 permanently** — the wiki has the deepest fundamental coverage of Palantir (Q2-2026 $1.935B/+93% YoY; defense-AI thesis) making it the best-grounded ticker for LLM-assisted thesis generation.
5. **TSM / NVDA / AVGO chain** — the phased-array + ODC synthesis pages contain substantial supply-chain detail that could inform a cross-ticker thesis chain (semiconductor → fab → server → AI infra) for future scans.
