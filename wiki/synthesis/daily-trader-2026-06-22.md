---
type: synthesis
tags: [trader, daily, watchlist, fom, blocked]
date: "2026-06-22"
---

# Daily Trader Evaluation — 2026-06-22 (BLOCKED — pipeline does not exist)

## Status: blocked at Task 1 (no trader pipeline in repo) — 19th consecutive blocked run

This routine is specced to backtest yesterday's trader recommendations, run today's
scan, rerank the watchlist, and recompute FOM scores using
`agents/src/trader/` (`orchestrator.py`, `cli.py`, `tools/yfinance_client.py`).
None of that exists in this repository, on `main` or on any branch, today.

Verified directly before writing this report:

- `agents/src/` contains only `firefly/` (the orbital-data-center mission
  planner: `cli.py`, `orchestrator.py`, `kb_loader.py`, `wiki_writer.py`,
  plus `agents/`, `tools/`, `prompts/` subpackages). There is no `trader/`
  package anywhere under `agents/src/`.
- `agents/pyproject.toml` declares the `firefly` console script only
  (`[project.scripts] firefly = "firefly.cli:app"`); there is no `trader`
  entry point, and `yfinance` is not in `dependencies`.
- `git log --all --oneline -i --grep="trader"` returns nothing — no commit,
  on any branch, has ever added trader code.
- Repo-wide search for `trader` (excluding `node_modules`/`.git`) only
  matches incidental prose (`wiki/log.md` guardrail boilerplate, the word
  "traders" in a 2025 JAM blog post) — no trader source file exists.
- `wiki/synthesis/daily-trader-*.md` does not exist on `main`.

## This is now a 19-day-old known issue, not a new finding

`git ls-remote --heads origin` shows **18 prior `auto/daily-trader-*`
branches**, one for every prior run of this routine, starting
**2026-05-29** and continuing through **2026-06-21**. Every one of them
hit the identical blocker (the first few runs apparently attempted to
synthesize a placeholder report without flagging the block clearly; from
2026-06-03 onward they explicitly self-labeled `[STUB]`/`BLOCKED`). All
**18 PRs are still open** — none merged, none closed:

- PR #10 → #51, one per branch, `2026-05-29` → `2026-06-21`.
- Title pattern converged on `daily-trader: blocked — trader pipeline
  does not exist in repo` by the most recent run.
- Zero code has been added to close the gap in the ~25 calendar days
  (≈18 run-days) this routine has been firing.

Each blocked run still produces a new branch + PR per its own
instructions ("write a stub report... commit it, and open the PR anyway
so the failure is visible"), which is correct per spec — but the
accumulating effect is **18 stale open PRs with no owner action**, which
is itself worth surfacing rather than silently repeating forever.

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
   avoid a blocked run repeating on every future schedule tick, and close
   out the 18 (soon 19) stale open PRs this has produced.

## Open questions for tomorrow

- Does a trader pipeline exist in a sibling repo, a private branch, or
  local uncommitted work that simply hasn't been pushed here?
- If the pipeline is to be built from scratch, what's the intended
  data source/broker for the "research" verb beyond `yfinance` daily
  bars (fundamentals? options flow? news_scout sourcing)?
- Should this routine's schedule be paused until the pipeline exists, to
  avoid repeated no-op blocked runs and further stale-PR accumulation?
