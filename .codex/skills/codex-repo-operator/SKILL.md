---
name: codex-repo-operator
description: Operate the yxz repository using its Docusaurus, Obsidian wiki, Firefly agents, scripts, CI, hooks, and automation conventions. Use for any task that touches this repo's blog, portfolio, wiki, agent code, workflows, deployment, generated content, or local automation setup.
---

# Codex Repo Operator

## Startup

Before changing files, load the smallest useful context:

1. Read `AGENTS.md`.
2. Read `CLAUDE.md` when a task mentions Claude commands, Claude agents, or `.claude/`.
3. Read `my-website/package.json` before running site commands.
4. For wiki tasks, read `wiki/AGENTS.md`, the last entries of `wiki/log.md`, and `wiki/index.md`.
5. For Firefly work, read `agents/README.md` and `agents/nemo_workflow.yaml`.

## Repo Map

- `my-website/`: Docusaurus 3 site, blog, docs, portfolio, scripts, static assets.
- `wiki/`: Obsidian-compatible LLM knowledge base.
- `agents/`: Firefly orbital data center mission-planning agents.
- `.codex/skills/`: repo-local Codex skills to mirror the user's repeat workflows.
- `.claude/agents/` and `.claude/commands/`: Claude Code agents and slash-command playbooks.
- `.githooks/`: local Git hooks installed by `scripts/install-git-hooks.ps1`.

## Quality Commands

Run commands from `my-website/` unless noted:

- `yarn typecheck`: TypeScript check.
- `yarn build`: Docusaurus build.
- `yarn verify`: typecheck plus build.
- `yarn lint:wiki`: validate wiki frontmatter and links.
- `yarn validate:og`: validate Open Graph images.
- `yarn portfolio:check`: validate portfolio JSON.
- `yarn verify:quality`: wiki lint, OG validation, portfolio check, typecheck, and build.

Use targeted checks while iterating. Run `yarn verify:quality` before broad content or automation changes when time permits.

## Editing Rules

- Preserve user changes in the dirty worktree.
- Keep wiki internal links as Obsidian wikilinks.
- Add portfolio repositories by editing `src/pages/portfolio/github-repo-info.json`.
- Do not hand-edit generated `blog/live-*.md` posts.
- Prefer deterministic scripts under `my-website/scripts/` for repeated checks.
- Keep deployment changes compatible with GitHub Pages and Node 20 CI.

