---
type: synthesis
tags: [trader, daily, watchlist, fom]
date: 2026-09-25
---

# Daily Trader Evaluation — 2026-09-25

**Run status: STUB — two blockers prevented live data collection.**

---

## Blockers (why this is a stub)

### Blocker 1 — Trader pipeline does not exist

`agents/src/trader/` is absent from the repository.
The only agent pipeline present is `agents/src/firefly/` (orbital data-center mission planner).
The scheduled task referenced `trader scan` / `trader research` CLIs that have never been built.

**To unblock:** scaffold `agents/src/trader/` with at minimum:
- `cli.py` exposing `trader scan --tickers ... --window N`
- `tools/yfinance_client.py` wrapping yfinance with retry/backoff
- `orchestrator.py` coordinating news_scout + thesis agents
- `schemas.py` defining `ScanVerdict` (ticker, direction, confidence, sizing_sigma)
- An entry-point in `agents/pyproject.toml` (`trader = "trader.cli:app"`)

### Blocker 2 — Proxy blocks Yahoo Finance (outbound CONNECT 403)

The remote execution environment's network policy does not permit outbound CONNECT
tunnels to Yahoo Finance endpoints (`fc.yahoo.com`, `query2.finance.yahoo.com`).

```
Failed to perform, curl: (7) CONNECT tunnel failed, response 403
```

All 15 tickers failed. One retry attempted; same result.

**To unblock:** add `finance.yahoo.com` and `query2.finance.yahoo.com` to the allowed-hosts
allowlist in the execution environment, or use an alternative data source accessible
through the proxy (e.g., an internal price feed, a whitelisted REST API).

---

## Watchlist (seeded from default core set — no prior file found)

No prior `daily-trader-*.md` file exists, so the watchlist is seeded from the default
core set specified in the scheduled task, padded to 15 tickers:

| # | Ticker | Rationale |
|---|--------|-----------|
| 1 | NVDA | AI GPU leader; highest wiki coverage (hackathon, ODC, radiation) |
| 2 | AAPL | Macro bellwether; consumer hardware |
| 3 | TSLA | EV/energy/autonomous macro signal |
| 4 | MSFT | Cloud + AI (Azure OpenAI, GitHub Copilot) |
| 5 | AMD | GPU/CPU competitive moat vs NVDA |
| 6 | GOOGL | Cloud + AI (Gemini, DeepMind, Suncatcher TPU) |
| 7 | META | Consumer social + AR/AI spend |
| 8 | AMZN | Cloud (AWS) + logistics + Kuiper LEO constellation |
| 9 | PLTR | Defense-AI prime (Palantir Q2 +93% YoY — fresh fact in wiki) |
| 10 | TSM | Upstream semiconductor; Taiwan ODC/RF supply chain anchor |
| 11 | AVGO | ASIC + networking; AI infrastructure layer |
| 12 | SMCI | AI server compute (HGX cluster) |
| 13 | ARM | IP licensor; edge AI + mobile; NVDA relationship |
| 14 | SPY | Broad-market beta reference |
| 15 | QQQ | Tech-sector beta reference |

---

## Yesterday's backtest

**Not available** — this is the first run and no prior predictions exist.

| Ticker | Predicted dir | Realized 1d % | Hit/Miss |
|--------|--------------|---------------|----------|
| — | — | — | — |

*Prior hit rate: N/A (first run)*

---

## Today's scan verdicts

**Not available** — trader pipeline absent; yfinance blocked.

| Ticker | Direction | Confidence | Sizing σ |
|--------|-----------|------------|---------- |
| — | — | — | — |

---

## Reranked watchlist

**Not available** — no scan verdicts to combine with backtest signal.

| Tier | Tickers |
|------|---------|
| Tier-1 (top 5) | — |
| Tier-2 (next 5) | — |
| Dropped | — |

---

## Figure of Merit (FOM) — formula definition

For future runs once data is available, FOM per ticker is defined as:

```
FOM = 0.4 × confidence
    + 0.3 × normalized_sizing_sigma
    + 0.2 × recent_hit_rate
    + 0.1 × news_momentum
```

Where each component is independently normalized to [0, 1] within the run's watchlist:

| Component | Source | Normalization |
|-----------|--------|---------------|
| `confidence` | Thesis-agent output (0–1) | Already [0,1]; use directly |
| `normalized_sizing_sigma` | |Sizing σ| clipped to [0, 3] then ÷ 3 | 0 = no edge, 1 = ≥3σ move expected |
| `recent_hit_rate` | Rolling 5-run directional accuracy | 0 = 0/5, 1 = 5/5 |
| `news_momentum` | News-scout signal: positive/neutral/negative mapped to 1/0.5/0 | Averaged across news items |

Weights (0.4 / 0.3 / 0.2 / 0.1) reflect: thesis quality > sizing edge > track record > news noise.
These weights should be iterated over once ≥5 runs of backtest data are available.

**FOM table for this run:** not available (all components require live scan + historical data).

---

## Open questions / revisit tomorrow

1. **Build the trader pipeline**: scaffold `agents/src/trader/` — see Blocker 1 above.
2. **Unblock Yahoo Finance**: add to proxy allowlist — see Blocker 2 above.
3. **Data source fallback**: consider Alpha Vantage or Financial Modeling Prep as proxy-friendly
   alternatives; both offer free tiers with REST/HTTPS endpoints that may pass the proxy.
4. **Seeding prior hits**: on first live run, hit_rate component will be 0.5 (unknown) for all
   tickers; meaningful backtest signal accumulates after ≥3 runs.
5. **PLT (Palantir)** wiki entry is freshly updated (Q2 +93% YoY, market cap ≈$409B, 2026-08-07);
   if data becomes available PLTR will be a high-interest thesis candidate.
6. **TSM context**: Taiwan ODC/phased-array upstream thesis is bullish on TSM as the foundry anchor
   for LEO-spec GaN PAs and SATCOM beamformer ICs; watch for any guidance on LEO customer ramp.
7. **Watchlist expansion candidates** (from wiki synthesis coverage):
   - `MACOM` / `MTSI` — GaN-on-SiC RF PA; absorbed Wolfspeed RF, RTP fab transfer 2025-07-25
   - `LSCC` / Lattice — FPGAs adjacent to space-grade compute
   - `AXELERA` (private) — edge AI inference accelerator for satellite ops; not yet publicly traded
