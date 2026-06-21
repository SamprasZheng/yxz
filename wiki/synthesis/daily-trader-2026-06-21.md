---
type: synthesis
tags: [trader, daily, watchlist, fom, blocked]
date: "2026-06-21"
---

# Daily Trader Evaluation — 2026-06-21 (BLOCKED — pipeline does not exist)

## Status: blocked at Task 1 (no trader pipeline in repo)

This routine is specced to backtest yesterday's trader recommendations, run today's
scan, rerank the watchlist, and recompute FOM scores using
`agents/src/trader/` (`orchestrator.py`, `cli.py`, `tools/yfinance_client.py`).
None of that exists in this repository.

Verified directly before writing this report:

- `agents/src/` contains only `firefly/` (the orbital-data-center mission
  planner: `cli.py`, `orchestrator.py`, `kb_loader.py`, `wiki_writer.py`,
  plus `agents/`, `tools/`, `prompts/` subpackages). There is no `trader/`
  package anywhere under `agents/src/`.
- `agents/pyproject.toml` declares the `firefly` console script only
  (`[project.scripts] firefly = "firefly.cli:app"`); there is no `trader`
  entry point, and `yfinance` is not in `dependencies`.
- `git log --all --oneline | grep -i trader` returns nothing — no commit,
  on any branch, has ever added trader code.
- `find /home/user/yxz -iname "*trader*"` (repo-wide, excluding
  `node_modules`) returns nothing — no file in the repo mentions "trader"
  by name.
- No prior `wiki/synthesis/daily-trader-*.md` report exists to recover
  yesterday's watchlist from (this is the first invocation of this
  routine against this repo).

Because Tasks 2–5 (backtest prior calls, run `trader scan`, rerank by
forward/backward score, compute FOM) all depend on a `trader` CLI and a
`yfinance_client.py` that are not present, none of them could be
attempted — there is nothing to `uv sync`, no command to run, no JSON
scan to produce, and no prior-day predictions to backtest. Falling back
to `LLM_BACKEND=disabled TRADER_OFFLINE=1` (the documented degraded path)
is moot, since the module the env vars would configure does not exist.

## What exists instead

`agents/` in this repo is scoped to **Firefly**, the orbital-data-center
mission-planning agent system described in `agents/README.md`:
orbit design, launch-window planning, radiation dose estimation, and
debris-conjunction risk for space missions — not equities research or
trading. See `[[synthesis/spacesharks-mission-desk-hackathon-plan]]` and
`[[synthesis/firefly-nemoclaw-reference-implementation]]` for the adjacent,
actually-implemented agent work in this repo.

## Recommendation

Before this routine can run as specified, one of the following needs to
happen:

1. Build the `agents/src/trader/` package (orchestrator, schemas, CLI
   with `research`/`scan` subcommands, `tools/yfinance_client.py`,
   `LLM_BACKEND=anthropic|disabled` + `TRADER_OFFLINE` plumbing) — this is
   a multi-file feature build, not a daily-evaluation task, and should be
   scoped and approved as its own piece of work rather than improvised
   inside this scheduled run.
2. Point this routine at a different repository that already contains
   the trader pipeline, if one exists elsewhere.
3. Retire/pause this scheduled routine until (1) or (2) is resolved, to
   avoid a blocked run repeating on every future schedule tick.

## Open questions for tomorrow

- Does a trader pipeline exist in a sibling repo, a private branch, or
  local uncommitted work that simply hasn't been pushed here?
- If the pipeline is to be built from scratch, what's the intended
  data source/broker for the "research" verb beyond `yfinance` daily
  bars (fundamentals? options flow? news_scout sourcing)?
- Should this routine's schedule be paused until the pipeline exists, to
  avoid repeated no-op blocked runs?
