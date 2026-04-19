# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for Sampras Zheng, built with **Docusaurus 3.7.0**. Deployed to GitHub Pages at `https://SamprasZheng.github.io/yxz/`. Focus areas: RF/hardware engineering and Polkadot/blockchain.

## Commands

All commands run from `my-website/`:

```bash
yarn start        # Dev server with hot reload
yarn build        # Generate static site into ./build
yarn serve        # Serve the static build locally
yarn clear        # Clear Docusaurus cache
yarn typecheck    # TypeScript type checking
yarn verify       # typecheck + build (use before deploying)
yarn deploy       # Deploy to GitHub Pages (gh-pages branch)
```

Deployment requires either `USE_SSH=true yarn deploy` or `GIT_USER=SamprasZheng yarn deploy`.

### Automation scripts

```bash
yarn generate:living-topics   # Fetch Google News + DDG, update 5 living-tracker blog posts
yarn generate:weekly-outlook  # Generate a new weekly macro outlook blog post
yarn daily:local              # living-topics + verify
yarn weekly:local             # weekly-outlook + verify
yarn weekly:publish           # weekly-outlook + verify + deploy
```

Living-tracker posts are auto-generated into `blog/live-<key>.md` (keys: `live-polkadot`, `live-space`, `live-rf`, `live-ai`, `live-investing`). Do not hand-edit these — they are overwritten on each run.

## Architecture

```
yxz/
├── my-website/              # Main Docusaurus app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx                    # Home/landing page
│   │   │   └── portfolio/
│   │   │       ├── index.js                 # Portfolio page
│   │   │       └── github-repo-info.json    # Repo metadata (manually maintained)
│   │   ├── components/
│   │   │   └── PortfolioCard/               # Card used in portfolio page
│   │   └── css/custom.css                   # Global styles
│   ├── blog/                # Blog posts (MDX/Markdown)
│   │   ├── authors.yml      # Author profiles
│   │   └── tags.yml         # Tag definitions
│   ├── draft/               # Work-in-progress posts (not published)
│   ├── scripts/             # Node CJS automation scripts
│   ├── docs/                # Documentation pages (auto-sidebar via sidebars.ts)
│   ├── static/              # Static assets
│   └── docusaurus.config.ts # Site config: navbar, plugins, math rendering
├── wiki/                    # LLM knowledge wiki (Obsidian vault)
│   ├── sources/             # One .md per ingested source
│   ├── entities/            # People, orgs, products
│   ├── concepts/            # Ideas, frameworks, protocols
│   ├── synthesis/           # Cross-source analyses
│   ├── index.md             # Catalog of all wiki pages (LLM maintains)
│   ├── log.md               # Append-only session history (LLM maintains)
│   └── AGENTS.md            # Wiki schema and workflow rules
└── .github/workflows/main.yml  # CI: auto-deploys on push to main
```

**Key architectural notes:**
- The portfolio page reads from `src/pages/portfolio/github-repo-info.json` — update this file to add/remove portfolio repos rather than editing the page component.
- Blog posts use front matter `authors` and `tags` fields; valid tags are defined in `blog/tags.yml`. Note: the `polkadot` tag key maps to permalink `/dot` (not `/polkadot`) — the navbar uses `/blog/tags/dot`.
- Math rendering is enabled via `remark-math` + `rehype-katex` — use `$...$` (inline) and `$$...$$` (block) in MDX files.
- TypeScript config (`tsconfig.json`) is set to `noEmit: true` — it's only for editor type-checking, not compilation. Docusaurus handles the actual build.
- CI/CD uses Node 16 but `package.json` requires Node >=18; run locally with Node >=18.

## Wiki system

The `wiki/` directory is an Obsidian-compatible knowledge base. Read `wiki/AGENTS.md` at the start of any wiki session — it defines the full schema, linking conventions, and ingest/lint workflows.

**Session startup for wiki work:**
1. Read `wiki/log.md` (last 10 entries) to see recent activity
2. Read `wiki/index.md` to orient to the current page inventory
3. Proceed with ingest, query, or lint

**Key conventions:**
- Internal links use Obsidian wikilink syntax: `[[path/to/page]]` — never markdown hyperlinks
- Every page needs frontmatter: `type: source | entity | concept | synthesis` + `tags`
- Source pages also include: `title`, `author`, `date`, `ingested`
- Contradictions are flagged inline with `> ⚠️ **Contradicted** by ...` — never silently overwritten
- Good query answers should be filed as `synthesis/<name>.md` to persist across sessions
