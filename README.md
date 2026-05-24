# yxz - Sampras Zheng's Personal Blog & Portfolio

Live site: [SamprasZheng.github.io/yxz](https://SamprasZheng.github.io/yxz/)

Personal blog, portfolio, wiki, and AI-agent workspace for Sampras Zheng. The public site is built with Docusaurus 3 and deployed to GitHub Pages. The broader repository also contains an Obsidian-compatible LLM wiki, local AI workflow skills, Claude agents, Firefly mission-planning agents, and automation scripts.

## Focus Areas

- RF and hardware engineering
- SATCOM, phased arrays, calibration, EVM, and radiation effects
- LEO space infrastructure, orbital data centers, and satellite lifecycle regulation (FAA Part 450 / NOTAM, FCC IBFS / spectrum, SSA / conjunction)
- Competitive intelligence on satellite-ops AI agents (Cognitive Space / Slingshot / Kayhan / AIKO / MSBAI) and lifecycle external-signal data feeds (NOAA SWPC / Space-Track CDM / FAA NOTAM)
- Polkadot, JAM, XCM, and crypto infrastructure
- AI agents, MCP workflows, personal knowledge systems, and automation
- Macro and supply-chain analysis

## Repository Structure

```text
yxz/
  my-website/              Docusaurus 3 site
    blog/                  Published blog posts
    docs/                  Docs pages
    draft/                 Draft posts
    scripts/               Content, validation, and publish scripts
    src/pages/portfolio/   Portfolio page and repo metadata
    static/img/og/         Open Graph images
  wiki/                    Obsidian-compatible LLM knowledge base
    sources/               One page per source
    entities/              People, orgs, products, projects
    concepts/              Ideas, protocols, frameworks
    synthesis/             Cross-source analyses
  agents/                  Firefly orbital data center mission planner
  .codex/skills/           Repo-local Codex skills
  .claude/agents/          Claude Code agents
  .claude/commands/        Claude Code slash-command workflows
  .githooks/               Local Git hooks
  .github/workflows/       CI, deploy, and scheduled automation
```

## Commands

Run site commands from `my-website/`.

```bash
# Development
yarn start
yarn build
yarn serve
yarn clear

# Quality
yarn typecheck
yarn verify
yarn verify:quality
yarn lint:wiki
yarn validate:og
yarn portfolio:check
yarn verify:live

# Content automation
yarn draft:from-wiki ../wiki/synthesis/<page>.md
yarn generate:living-topics
yarn generate:weekly-outlook
yarn generate:og
yarn daily:local
yarn weekly:local
yarn weekly:publish

# Deploy
USE_SSH=true yarn deploy
GIT_USER=SamprasZheng yarn deploy
```

## AI Operating System

This repo is set up as a repeatable AI workflow, not only a website.

Repo-local Codex skills:

- `codex-repo-operator`
- `llm-wiki-ingest`
- `blog-publisher`
- `og-image-validator`
- `firefly-mission-planner`
- `portfolio-curator`

Claude agents:

- `research-ingest-agent`
- `blog-editor-agent`
- `technical-reviewer-agent`
- `seo-social-agent`
- `firefly-reviewer-agent`
- `git-commit-push`

Install local Git hooks:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install-git-hooks.ps1
```

Install repo-local Codex skills into the user Codex directory:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install-codex-skills.ps1
```

## Wiki

`wiki/` is an Obsidian-compatible LLM-maintained knowledge base. Read `wiki/AGENTS.md` before wiki work.

Core rules:

- Internal links use `[[path/to/page]]`.
- Every page has `type` and `tags`.
- Source pages also include `title`, `author`, `date`, and `ingested`.
- Update `wiki/index.md` and append `wiki/log.md` after ingest work.
- Run `cd my-website && yarn lint:wiki`.

## Blog And Portfolio Notes

- Blog tags are defined in `my-website/blog/tags.yml`.
- Blog authors are defined in `my-website/blog/authors.yml`.
- `blog/live-*.md` files are generated; do not hand-edit them.
- The portfolio page reads `my-website/src/pages/portfolio/github-repo-info.json`.
- Open Graph images should live in `my-website/static/img/og/` and pass `yarn validate:og`.

## CI And Automation

GitHub Actions:

- `Deploy Docusaurus`
- `Daily Living Topics`
- `Weekly Outlook Content`
- `AI Quality Gate`
- `Weekly Wiki Lint`
- `Weekly Portfolio Check`
- `Post Publish Verify`

Local scheduled scripts:

- `scripts/auto-commit.ps1`
- `scripts/register-auto-commit-task.ps1`

Codex app automations:

- `yxz weekly wiki lint`
- `yxz blog draft promoter`
- `yxz portfolio curator`
- `yxz kol digest triage`
- `yxz live site verifier`

## Tech Stack

| Layer | Choice |
| --- | --- |
| Site | Docusaurus 3.7.0 |
| UI | React, TypeScript, MDX |
| Math | remark-math, rehype-katex |
| Hosting | GitHub Pages |
| CI | GitHub Actions, Node 20 |
| Package manager | Yarn |
| Wiki | Markdown, Obsidian wikilinks |
| Agents | Python, Firefly MVP under `agents/` |
