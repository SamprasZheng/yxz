# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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
yarn deploy       # Deploy to GitHub Pages (gh-pages branch)
```

Deployment requires either `USE_SSH=true yarn deploy` or `GIT_USER=SamprasZheng yarn deploy`.

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
│   │   └── tags.yml         # Tag definitions (rf, dot, polkadot, ...)
│   ├── docs/                # Documentation pages (auto-sidebar via sidebars.ts)
│   ├── static/              # Static assets
│   └── docusaurus.config.ts # Site config: navbar, plugins, math rendering
└── .github/workflows/main.yml  # CI: auto-deploys on push to main
```

**Key architectural notes:**
- The portfolio page reads from `src/pages/portfolio/github-repo-info.json` — update this file to add/remove portfolio repos rather than editing the page component.
- Blog posts use front matter `authors` and `tags` fields; valid tags are defined in `blog/tags.yml`.
- Math rendering is enabled via `remark-math` + `rehype-katex` — use `$...$` (inline) and `$$...$$` (block) in MDX files.
- TypeScript config (`tsconfig.json`) is set to `noEmit: true` — it's only for editor type-checking, not compilation. Docusaurus handles the actual build.
- CI/CD uses Node 16 but `package.json` requires Node >=18; run locally with Node >=18.
