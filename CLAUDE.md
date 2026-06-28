# CLAUDE.md

This file guides Claude Code when working in this repository. It mirrors `AGENTS.md` and adds Claude-specific commands, agents, and skills.

## Project Overview

Personal portfolio and blog site for Sampras Zheng, built with Docusaurus 3.7.0 and deployed to GitHub Pages at `https://SamprasZheng.github.io/yxz/`.

The repository combines:

- Docusaurus blog and portfolio site
- Obsidian-compatible LLM wiki
- Firefly orbital data center mission-planning agents
- Claude and Codex skills, agents, hooks, and automations

## Privacy & Publishing Rules

- NEVER push to a public repo without explicit confirmation. All crypto, KOL, portfolio, and finance data is PRIVATE by default unless I explicitly state it can be public.
- `$hark/` and `D:/DOT/finance/` content is private and must never be committed to this public `yxz` repo.
- Before any commit, push, or deploy: show exactly which files will be affected and whether the target is public, then wait for my explicit OK.

## Data Sources

- ALWAYS consult my existing local sources first before pulling fresh data from the web. Local sources are canonical:
  - Stock/crypto picks, FOM, recommendations, backtests → read the `$hark` watchlist, recommendations, and rubric first.
  - Portfolio holdings and audits → `$hark/outputs/portfolio-audit-*.json`.
  - Research knowledge → `wiki/`.
- Treat web data as a delta layer only — use it to update or fill gaps, never to replace canonical files.

## Commands

All site commands run from `my-website/`:

```bash
yarn start
yarn build
yarn serve
yarn clear
yarn typecheck
yarn verify
yarn verify:quality
yarn lint:wiki
yarn validate:og
yarn portfolio:check
yarn draft:from-wiki
yarn verify:live
yarn deploy
```

Content automation:

```bash
yarn generate:living-topics
yarn generate:weekly-outlook
yarn generate:og
yarn daily:local
yarn weekly:local
yarn weekly:publish
```

Living-tracker posts are generated into `blog/live-<key>.md` and should not be hand-edited.

## Claude Agents

Use `.claude/agents/` for repeatable role-specific work:

- `research-ingest-agent`: research and persist source/entity/concept/synthesis wiki pages.
- `blog-editor-agent`: convert wiki synthesis or notes into Docusaurus drafts.
- `technical-reviewer-agent`: review technical claims and missing evidence.
- `seo-social-agent`: create metadata, social copy, and OG image direction.
- `firefly-reviewer-agent`: audit Firefly mission outputs and wiki synthesis.
- `git-commit-push`: stage, commit, and push with git error handling.

## Claude Commands

Use `.claude/commands/` playbooks when relevant:

- `auto-publish.md`: video publishing pipeline for posts marked `video_ready: true`.
- `tdd.md`: autonomous test-driven development loop.
- `validate-og.md`: social-card validation workflow.
- `wiki-ingest-parallel.md`: parallel research ingestion.

## Skills

Claude local skills:

- `.claude/skills/wiki-ingest-parallel`
- `.claude/skills/kol-tracker`

Repo-local Codex skills:

- `.codex/skills/codex-repo-operator`
- `.codex/skills/llm-wiki-ingest`
- `.codex/skills/blog-publisher`
- `.codex/skills/og-image-validator`
- `.codex/skills/firefly-mission-planner`
- `.codex/skills/portfolio-curator`

## Wiki System

The `wiki/` directory is an Obsidian-compatible knowledge base. Read `wiki/AGENTS.md` at the start of any wiki session.

Startup:

1. Read the last 10 entries of `wiki/log.md`.
2. Read `wiki/index.md`.
3. Search existing coverage before creating pages.

Rules:

- Internal links use `[[path/to/page]]`; do not use markdown links for internal wiki pages.
- Every page needs frontmatter with `type` and `tags`.
- Source pages also include `title`, `author`, `date`, and `ingested`.
- Contradictions are flagged on the older page.
- Good query answers should be filed as `wiki/synthesis/<name>.md`.

Validation:

```bash
cd my-website
yarn lint:wiki
```

## Firefly Agents

Firefly lives under `agents/`.

Quick start:

```bash
cd agents
uv sync
uv run firefly plan --from "Taiwan" --to "SSO-600km" --window 30d
```

Expected outputs:

- `agents/outputs/mission-<slug>.json`
- `wiki/synthesis/odc-mission-<slug>.md`
- `wiki/index.md` and `wiki/log.md` updates

Run tests after agent code changes:

```bash
cd agents
uv run pytest
```

## Git Workflow

- Before committing, verify ONLY the intended files are staged. Use `git status` and explicit `git add <file>`.
- Never use blanket `git add .` / `git add -A` when other files may already be staged — it sweeps in unintended changes.

## Windows/Scripting Notes

- Write PowerShell and other scripts as ASCII-only. Keep non-ASCII data (e.g. Chinese text) in a separate UTF-8 data file — PowerShell 5.1 misreads inline Unicode.

## Web Scraping

- Avoid bulk or aggressive scraping and bot-detection probing (e.g. YouTube, X.com) that can get my IP rate-limited or blocked.

## Hooks And CI

Local Git hook setup:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install-git-hooks.ps1
```

The pre-commit hook blocks likely credential files, files over 10 MB, and runs targeted checks for wiki, OG images, portfolio metadata, and site TypeScript changes.

GitHub Actions:

- `Deploy Docusaurus`
- `Daily Living Topics`
- `Weekly Outlook Content`
- `AI Quality Gate`
- `Weekly Wiki Lint`
- `Weekly Portfolio Check`
- `Post Publish Verify`

Codex app automations:

- `yxz weekly wiki lint`
- `yxz blog draft promoter`
- `yxz portfolio curator`
- `yxz kol digest triage`
- `yxz live site verifier`
