---
type: synthesis
tags: [trader, daily, watchlist, fom, stub, blocked]
date: 2026-08-19
status: stub-blocked
---

# Daily Trader — 2026-08-19 (STUB — pipeline missing + network blocked)

> **⚠ This is a stub report.** Both pre-conditions for a real daily-trader run failed today:
>
> 1. **Pipeline missing** — the scheduled prompt targets `agents/src/trader/` (orchestrator, schemas, agents, `cli.py` with `trader research` / `trader scan`, `tools/yfinance_client.py`). None of it exists in the repo. Only `agents/src/firefly/` is present.
> 2. **Market-data egress denied** — even the fallback "just call yfinance directly" path fails: the environment's agent proxy returns HTTP 403 on `CONNECT` tunnels to `fc.yahoo.com:443` (Yahoo Finance API) and to `stooq.com` (see `agents/outputs/scan-2026-08-19.json` for the recorded errors). Free market-data hosts appear to be off the network policy.
>
> Following the scheduled prompt's escape hatch — *"If you hit a blocker (auth, missing dep, etc.) write a stub report that explains what blocked you, commit it, and open the PR anyway so the failure is visible."* — this file records both blockers, seeds tomorrow's run, and documents the FOM formula so the next attempt can pick it up unchanged.

## Blockers (in order)

### 1. `agents/src/trader/` does not exist

```
$ ls agents/src/
firefly/         # only this — no `trader/`
```

The scheduled prompt references, and depends on:

- `agents/src/trader/orchestrator.py`
- `agents/src/trader/schemas.py`
- `agents/src/trader/agents/…` (thesis/news_scout/technicals/etc.)
- `agents/src/trader/cli.py` exposing `trader research <ticker>` and `trader scan --tickers …`
- `agents/src/trader/tools/yfinance_client.py`

None of these files exist. `pyproject.toml` also does not declare a `trader` console script or a `yfinance` dependency. The Firefly Typer app (`firefly.cli:app`) is the only registered entrypoint.

**Fix (owner action):** bootstrap the trader package. Minimum viable scaffold:

```
agents/src/trader/
  __init__.py
  cli.py              # typer app with `research` + `scan`
  orchestrator.py
  schemas.py          # pydantic: TickerThesis, ScanResult, FomInputs
  agents/
    thesis.py         # LLM: writes long/short/abstain + confidence
    news_scout.py     # pulls headlines, proposes new candidates
    technicals.py     # feeds momentum/vol z-scores in
  tools/
    yfinance_client.py  # thin wrapper w/ retry + rate-limit awareness
agents/pyproject.toml   # add: yfinance, pandas, numpy; add `trader` script
```

Once scaffolded, wire the CLI:

```toml
[project.scripts]
firefly = "firefly.cli:app"
trader  = "trader.cli:app"    # <-- new
```

### 2. Network egress denies Yahoo/Stooq

The environment's `HTTPS_PROXY` gateway policy-denies both:

```
2026-08-19T23:11:33Z  connect_rejected  fc.yahoo.com:443     "gateway answered 403 to CONNECT"
2026-08-19T23:11:33Z  connect_rejected  stooq.com:443        "gateway answered 403 to CONNECT"
```

(Recorded in `curl "$HTTPS_PROXY/__agentproxy/status"` during today's attempt; also reproduced by a direct `yfinance` call that returned 8/8 `no_history` in `agents/outputs/scan-2026-08-19.json`.)

This means even with the trader pipeline built, a *daily* run in this environment would need one of:

- The network policy widened to permit `*.yahoo.com`, `query1.finance.yahoo.com`, `query2.finance.yahoo.com`, and one CSV fallback host (e.g. `stooq.com`).
- Or, a paid data provider whose host **is** on the allowlist (e.g. IEX Cloud, Polygon, Alpaca, Tiingo — need to test each against `curl "$HTTPS_PROXY/__agentproxy/status"` before relying).
- Or, this daily-trader schedule moved off the remote sandbox environment (which is restricted by design) onto a runner with unrestricted market-data egress — e.g. a GitHub Actions workflow with the API key in `secrets`.

**Fix (owner action):** decide the data-source posture (free vs paid vs move-the-runner), then update the network policy or migrate the schedule off this environment.

## Yesterday's backtest

**None.** There is no prior `daily-trader-*.md` in `wiki/synthesis/`, so there is no set of prior calls to score against realized returns. This is the first attempt.

## Today's scan verdicts

**None generated.** `agents/outputs/scan-2026-08-19.json` was written but every row has `error: no_history` (yfinance connection blocked). It is preserved as evidence of the blocker, not as a signal.

## Seed watchlist for tomorrow (bootstrap)

Use this as the day-2 watchlist so the next run isn't also blocked on "there is no prior file to read." Sourced from the scheduled prompt's own seed set:

| Ticker | Sector | Why seeded |
| --- | --- | --- |
| NVDA  | Semis (accel)     | AI compute reference name; drives ODC/hyperscale synthesis links |
| AAPL  | Consumer HW       | Mega-cap ballast |
| TSLA  | Auto/AI           | High-vol reference; feeds sizing_sigma calibration |
| MSFT  | Cloud/AI          | Hyperscale demand-side link to `orbital-data-center-six-region` |
| AMD   | Semis (accel)     | Second-source to NVDA thesis |
| GOOGL | Cloud/AI          | TPU / Suncatcher link |
| META  | Social/AI         | Open-weight funder link (`open-weight-llm-agent-stack-six-region`) |
| AMZN  | Cloud/e-comm      | AWS / Kuiper link |

Cap at 15 tickers per the prompt (currently 8; leaves headroom for news_scout adds).

## FOM (Figure of Merit) — canonical formula (v1)

Documented here so the first real run can implement it verbatim rather than re-deriving.

```
FOM = 0.40 · confidence
    + 0.30 · normalized_sizing_sigma
    + 0.20 · recent_hit_rate
    + 0.10 · news_momentum
```

Component definitions (all normalized to `[0, 1]`):

- `confidence` — the thesis agent's own scalar confidence on today's direction call.
- `normalized_sizing_sigma` — `min(1, sizing_sigma / sizing_sigma_cap)`, where `sizing_sigma_cap = 1.0`.
- `recent_hit_rate` — rolling 20-trading-day hit rate of this ticker's prior directional calls (long/short correct = 1, abstain = 0.5 credit, wrong = 0). Undefined on cold start → default `0.5`.
- `news_momentum` — `news_scout` composite: `0.5 · (unique_headlines_24h / cap_20) + 0.5 · sentiment_z`, clipped to `[0, 1]`. Undefined on cold start → default `0.0`.

Tiering off FOM (post-rerank):

- **tier-1**: top 5 by FOM
- **tier-2**: next 5
- drop the rest below 10 unless news_scout flagged as *new-candidate* (keep those on a probation shelf for one day).

Ties broken by `confidence`, then by lower `vol_annualized_pct` (prefer the less-noisy call at equal merit).

## Open questions / revisit tomorrow

1. **Bootstrap posture** — do we build the `agents/src/trader/` package inside this repo, or vendor it from a separate one? The Firefly precedent is in-repo, so lean in-repo unless the owner says otherwise.
2. **Data provider** — free (yfinance) requires opening the network policy; paid requires a key + budget line. Which is the intended day-2 answer?
3. **LLM backend** — the prompt's fallback ladder is `anthropic → disabled+offline`. The `disabled` path needs a deterministic technicals-only scorer (see `scratchpad/trader_scan.py` in this run for a first draft of the momentum composite → direction/confidence/sizing_sigma mapping — reusable once the pipeline exists).
4. **FOM v2** — after ~10 days of realized returns we'll have enough to fit the four weights empirically (constrained least-squares vs realized 1-d and 5-d PnL). Track FOM v1 vs a rebalanced v2 in the same report.
5. **Universe expansion** — after seed stabilizes, add sector-diverse names so the top-5 tier-1 is not all mega-cap tech (dilutes cross-sectional signal).

## Provenance

- Scheduled task fired: 2026-08-19 23:10 UTC
- Runner: remote sandbox (per `HTTPS_PROXY` gateway policy)
- Attempted scan output: `agents/outputs/scan-2026-08-19.json` (all rows error)
- Related synthesis (not queried, but relevant thematic backdrop): [[synthesis/leo-taiwan-odc-gap]], [[synthesis/open-weight-llm-agent-stack-six-region]], [[synthesis/agent-runtime-orchestration-six-region]]
