# AGENTS.md

This file guides Codex when working in this repository.

## Project Overview

Personal portfolio and blog site for Sampras Zheng, built with Docusaurus 3.7.0 and deployed to GitHub Pages at `https://SamprasZheng.github.io/yxz/`.

Primary domains:

- RF and hardware engineering
- SATCOM, phased arrays, radiation, and LEO infrastructure
- Polkadot, JAM, XCM, and crypto infrastructure
- AI agents, local workflows, and personal knowledge automation

## Privacy & Publishing Rules

- NEVER push to a public repo without explicit confirmation. All crypto, KOL, portfolio, and finance data is PRIVATE by default unless explicitly stated otherwise.
- `$hark/` and `D:/DOT/finance/` content is private and must never be committed to this public `yxz` repo.
- Before any commit, push, or deploy: show exactly which files will be affected and whether the target is public, then wait for explicit OK.

## Data Sources

- ALWAYS consult existing local sources first before pulling fresh data from the web. Local sources are canonical:
  - Stock/crypto picks, FOM, recommendations, backtests → read the `$hark` watchlist, recommendations, and rubric first.
  - Portfolio holdings and audits → `$hark/outputs/portfolio-audit-*.json`.
  - Research knowledge → `wiki/`.
- Treat web data as a delta layer only — use it to update or fill gaps, never to replace canonical files.

## Repository Layout

```text
yxz/
  my-website/              Docusaurus app
    blog/                  Blog posts
    docs/                  Documentation pages
    draft/                 Unpublished drafts
    scripts/               Node/Python content and quality scripts
    src/pages/index.tsx    Home page
    src/pages/portfolio/   Portfolio page and repo metadata
    static/img/og/         Open Graph images
  wiki/                    Obsidian-compatible LLM wiki
    sources/               One page per ingested source
    entities/              People, orgs, products, projects
    concepts/              Ideas, techniques, protocols
    synthesis/             Cross-source analysis
    index.md               LLM-maintained catalog
    log.md                 Append-only session history
  agents/                  Firefly orbital data center agent stack
  .codex/skills/           Repo-local Codex skills
  .claude/agents/          Claude Code subagent definitions
  .claude/commands/        Claude slash-command playbooks
  .githooks/               Local Git hooks
  .github/workflows/       CI, deploy, and scheduled checks
```

## Commands

All Docusaurus commands run from `my-website/`:

```bash
yarn start              # Dev server with hot reload
yarn build              # Generate static site into ./build
yarn serve              # Serve the static build locally
yarn clear              # Clear Docusaurus cache
yarn typecheck          # TypeScript type checking
yarn verify             # typecheck + build
yarn verify:quality     # wiki lint + OG check + portfolio check + typecheck + build
yarn lint:wiki          # Validate wiki frontmatter and wikilinks
yarn validate:og        # Validate Open Graph images
yarn portfolio:check    # Validate portfolio JSON metadata
yarn draft:from-wiki    # Create a draft post from a wiki synthesis page
yarn verify:live        # Verify the live GitHub Pages site
yarn deploy             # Deploy to GitHub Pages
```

Deployment requires either `USE_SSH=true yarn deploy` or `GIT_USER=SamprasZheng yarn deploy`.

## AI Workflow

Use repo-local Codex skills in `.codex/skills/` as the operating layer:

- `codex-repo-operator`: load repo conventions and choose the right checks.
- `llm-wiki-ingest`: ingest research into `wiki/`.
- `blog-publisher`: turn wiki synthesis or notes into Docusaurus drafts/posts.
- `og-image-validator`: generate and validate social cards.
- `firefly-mission-planner`: run and review `agents/` mission workflows.
- `portfolio-curator`: maintain portfolio repo metadata.

Claude-specific agents live in `.claude/agents/`:

- `research-ingest-agent`
- `blog-editor-agent`
- `technical-reviewer-agent`
- `seo-social-agent`
- `firefly-reviewer-agent`
- `git-commit-push`

Install local Git hooks with:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install-git-hooks.ps1
```

Install repo-local Codex skills into the user Codex skill directory with:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install-codex-skills.ps1
```

## Git Workflow

- Before committing, verify ONLY the intended files are staged. Use `git status` and explicit `git add <file>`.
- Never use blanket `git add .` / `git add -A` when other files may already be staged — it sweeps in unintended changes.

## Windows/Scripting Notes

- Write PowerShell and other scripts as ASCII-only. Keep non-ASCII data (e.g. Chinese text) in a separate UTF-8 data file — PowerShell 5.1 misreads inline Unicode.

## Web Scraping

- Avoid bulk or aggressive scraping and bot-detection probing (e.g. YouTube, X.com) that can get the IP rate-limited or blocked.

## Key Architecture Notes

- The portfolio page reads from `my-website/src/pages/portfolio/github-repo-info.json`. Add/remove projects there instead of changing the page component contract.
- Blog posts use frontmatter `authors` and `tags`; valid values are defined in `my-website/blog/authors.yml` and `my-website/blog/tags.yml`.
- The `polkadot` tag maps to permalink `/dot`; navbar links should use `/blog/tags/dot`.
- Math rendering is enabled through `remark-math` and `rehype-katex`; use `$...$` inline and `$$...$$` blocks.
- TypeScript config uses `noEmit: true`; Docusaurus handles compilation.
- CI uses Node 20. Run locally with Node 18 or newer.

## Wiki Rules

Read `wiki/AGENTS.md` before wiki work.

Session startup:

1. Read the last 10 entries of `wiki/log.md`.
2. Read `wiki/index.md`.
3. Search existing pages before creating new ones.

Rules:

- Internal wiki links must use Obsidian syntax: `[[path/to/page]]`.
- Every wiki page needs frontmatter with `type` and `tags`.
- Source pages also need `title`, `author`, `date`, and `ingested`.
- Contradictions are flagged on the older page; do not silently overwrite.
- Useful answers should be saved as `wiki/synthesis/<name>.md`.

Validate with:

```bash
cd my-website
yarn lint:wiki
```

## Generated Content

- `blog/live-*.md` files are generated by `yarn generate:living-topics`; do not hand-edit them.
- `static/img/og/*.png` should be `1200x630` and pass `yarn validate:og`.
- Firefly mission outputs are generated under `agents/outputs/` and summarized into `wiki/synthesis/`.

## Codex App Automations

The workspace has recurring Codex app automations for:

- `yxz weekly wiki lint`
- `yxz blog draft promoter`
- `yxz portfolio curator`
- `yxz kol digest triage`
- `yxz live site verifier`
