---
type: synthesis
tags: [trader, daily, watchlist, fom, blocked]
date: 2026-06-27
---

# Daily Trader Evaluation — 2026-06-27 (BLOCKED: no trader pipeline in this repo)

## Summary

The scheduled "daily trader evaluation" routine could not run any of its core steps (backtest, scan, rerank, FOM scoring) because **the `yxz` repository contains no trader/equities pipeline at all**. This page documents the blocker so the failure is visible, per the routine's own escalation instructions, rather than fabricating results.

## What the routine assumed vs. what exists

The routine brief assumes:

- `agents/src/trader/` — an orchestrator, schemas, and agent modules
- `agents/src/trader/cli.py` exposing `trader research` and `trader scan`
- `agents/src/trader/tools/yfinance_client.py` for realized-return backtesting
- Prior `wiki/synthesis/daily-trader-*.md` reports to recover yesterday's watchlist

None of this exists. `agents/src/` contains exactly one package: `agents/src/firefly/` — the Firefly orbital-data-center mission planner (NeMo Agent Toolkit MVP, `firefly plan --from ... --to ...`, Space-Track/NOAA/Launch-Library/CelesTrak/SatMAD tools). It has no relationship to equities, tickers, or `yfinance`.

Confirmed by direct inspection:

- `find agents/src -maxdepth 4 -type d` → only `agents/src/firefly/{agents,llm,prompts,tools}`. No `trader/` directory anywhere in the repo.
- `agents/pyproject.toml` dependencies: `typer`, `pydantic`, `httpx`, `pyyaml`, `jinja2`, `anthropic`, `satmad`. No `yfinance`, `pandas`, or any market-data library.
- `uv run firefly --help` is the only CLI entry point (`[project.scripts] firefly = "firefly.cli:app"`); there is no `trader` script.
- Repo-wide search for `trader|yfinance|ticker` (case-insensitive) returns only incidental, unrelated matches: `wiki/log.md` (a "CryptoTicker" news-source name and the word "traders" in prose about JAM/DOT holders), and `my-website/blog/2025-02-24-JAM-intro.md` (same "traders" prose match). Zero references to an actual trading pipeline.
- No prior `wiki/synthesis/daily-trader-*.md` files exist — this is the first invocation of this routine to leave a trace in the wiki.
- `uv` and `python3` are available in this environment and `uv sync` succeeds for the **firefly** project, confirming the environment itself is not the blocker — the trader code simply isn't in this repository.

## Tasks attempted

| # | Task | Status |
|---|---|---|
| 1 | Determine today's watchlist | Skipped — no prior report and no trader-specific wiki pages to seed from; would have defaulted to the brief's hardcoded core set (`NVDA, AAPL, TSLA, MSFT, AMD, GOOGL, META, AMZN`), but seeding a watchlist with no pipeline to run it through is pointless |
| 2 | Backtest prior recommendations | Blocked — no prior recommendations exist, no `yfinance_client.py` to fetch realized returns |
| 3 | Run today's scan | Blocked — `trader scan` command does not exist; `agents` package is `firefly`, not `trader` |
| 4 | Rerank watchlists | Blocked — depends on (2) and (3) |
| 5 | Reevaluate FOM | Blocked — depends on (3) and (4); formula documented below for when the pipeline exists |
| 6 | Write outputs and commit | This stub page, fulfilling the brief's own "write a stub report explaining the blocker" fallback instruction |

## FOM formula (documented for future implementation, not computed today)

```
FOM = 0.4 * confidence + 0.3 * normalized_sizing_sigma + 0.2 * recent_hit_rate + 0.1 * news_momentum
```

Each component normalized to `[0, 1]`. Cannot be populated without a working `trader scan` that emits `thesis.confidence` and `sizing_sigma` per ticker, and at least one prior day's realized returns for `recent_hit_rate`.

## Open questions for the routine owner

1. **Does the trader pipeline live in a different repository?** This session's GitHub access is scoped to `sampraszheng/yxz` only — if `trader` code lives elsewhere, this routine is pointed at the wrong repo/scope.
2. **Is this routine premature?** If the trader subsystem hasn't been built yet, the daily schedule should probably pause until `agents/src/trader/` (orchestrator, schemas, `cli.py`, `tools/yfinance_client.py`) actually lands, rather than generating a blocked stub every day.
3. If the trader pipeline is meant to be built as part of this routine's first run, that's a substantially larger task (new package, dependencies, tests, CLI) than a "daily evaluation" — worth scoping as its own implementation task rather than discovering the gap silently inside a scheduled run.

## Recommendation

Pause or fix the schedule until one of the following is true: (a) the trader pipeline is implemented under `agents/src/trader/` in this repo, or (b) the routine is repointed at the correct repository. Re-running this routine unchanged will produce the same blocked stub every day.
