# yxz — Sampras Zheng's Personal Blog & Portfolio

Live site: **[SamprasZheng.github.io/yxz](https://SamprasZheng.github.io/yxz/)**

Personal blog and portfolio for Sampras Zheng — RF/hardware engineer turned cross-domain builder. Covers phased-array SATCOM, Polkadot/blockchain, LEO space infrastructure, AI agents, and macro. Built with Docusaurus 3, deployed via GitHub Actions to GitHub Pages.

---

## About

Born in Yilan, Taiwan. NCTU Electronics Engineering graduate.

**Career path:**
- **TronFutureTech** — SATCOM phased array system development
- **Qualcomm** — RF calibration algorithm development, Wi-Fi 7 pre-silicon emulation, post-silicon verification
- **NVIDIA** — System-Level Product Validation, N1X-class CPU study, GB20X-class GPU chip validation

**Cross-domain thesis:** AI deployment from Earth to orbit × crypto-native infrastructure in space × radiation-validated hardware paths for commercial compute in space environments.

---

## Blog Topics

| Tag | Focus |
|-----|-------|
| `RF` | Phased-array, SATCOM, beamforming, RF calibration, Wi-Fi |
| `Polkadot` | DOT ecosystem, JAM protocol, governance, DeFi, parachains |
| `Space` | LEO satellite, orbital data centers, ISL, Taiwan supply chain |
| `AI` | AI agents, MCP workflows, domain-specific LLMs |
| `Macro` | Tech-sector macro, supply chain investment, weekly outlook |
| `Crypto` | Blockchain infrastructure, tokenomics, on-chain analysis |

**Selected posts:**
- [2026 LEO × Taiwan — The Structural Gap of the Missing Mid-Tier C](https://SamprasZheng.github.io/yxz/blog/leo-odc-taiwan-gap)
- [2026 Tech Roadmap: AI in Space, Crypto, RF SATCOM](https://SamprasZheng.github.io/yxz/blog/space-ai-rf-crypto-roadmap-2026)
- [Domain-Specialized AI Agent — Why I Built My Own myGPTs](https://SamprasZheng.github.io/yxz/blog/ai-agent)
- [JAM Protocol Deep-Dive](https://SamprasZheng.github.io/yxz/blog/jam-intro)
- [Polkadot: Long Way In](https://SamprasZheng.github.io/yxz/blog/longway-on-polkadot)

---

## Wiki

`wiki/` is an Obsidian-compatible knowledge base (LLM-maintained). It indexes research across Polkadot ecosystem, LEO/space infrastructure, AI/payments, and geopolitics.

```
wiki/
├── sources/      ← one .md per ingested source
├── entities/     ← people, orgs, products
├── concepts/     ← ideas, frameworks, protocols
├── synthesis/    ← cross-source analyses
├── index.md      ← full catalog
└── log.md        ← append-only session history
```

Current coverage: Polkadot (JAM, Agile Coretime, XCM, DOT hard cap, OpenGov), LEO supply chain (orbital data centers, ISL, Taiwan RF/PCB suppliers), AI payments (x402, agentic commerce), and geopolitics (The Technological Republic).

---

## Repo Structure

```
yxz/
├── my-website/              # Docusaurus 3 app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx                    # Home / landing page
│   │   │   └── portfolio/
│   │   │       ├── index.js                 # Portfolio page
│   │   │       └── github-repo-info.json    # Repo metadata (manually maintained)
│   │   ├── components/
│   │   │   └── PortfolioCard/
│   │   └── css/custom.css
│   ├── blog/                # Blog posts (MDX/Markdown)
│   │   ├── authors.yml
│   │   └── tags.yml
│   ├── scripts/             # Node automation scripts (CJS)
│   │   ├── update-living-topics.cjs     # Fetch news → update 5 living-tracker posts
│   │   ├── generate-weekly-outlook.cjs  # Generate weekly macro outlook post
│   │   ├── generate-og-images.cjs       # OG image generation
│   │   └── deploy-github.cjs            # Deploy helper
│   ├── static/              # Static assets (images, OG cards)
│   └── docusaurus.config.ts # Site config
├── wiki/                    # LLM knowledge wiki (Obsidian vault)
└── .github/workflows/       # CI: auto-deploys on push to main
```

---

## Commands

All commands run from `my-website/`:

```bash
# Development
yarn start          # Dev server with hot reload
yarn build          # Generate static site → ./build
yarn serve          # Serve the static build locally
yarn clear          # Clear Docusaurus cache

# Quality
yarn typecheck      # TypeScript type checking
yarn verify         # typecheck + build (run before deploying)

# Deploy
USE_SSH=true yarn deploy          # Deploy via SSH
GIT_USER=SamprasZheng yarn deploy # Deploy via HTTPS

# Content automation
yarn generate:living-topics   # Fetch Google News + DDG → update 5 living-tracker posts
yarn generate:weekly-outlook  # Generate a new weekly macro outlook post
yarn daily:local               # living-topics + verify
yarn weekly:local              # weekly-outlook + verify
yarn weekly:publish            # weekly-outlook + verify + deploy
```

**Living-tracker posts** are auto-generated into `blog/live-<key>.md` (keys: `live-polkadot`, `live-space`, `live-rf`, `live-ai`, `live-investing`). Do not hand-edit — overwritten on each run.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Docusaurus 3.7.0](https://docusaurus.io/) |
| Language | TypeScript / MDX |
| Math | remark-math + rehype-katex |
| Hosting | GitHub Pages (`gh-pages` branch) |
| CI/CD | GitHub Actions (auto-deploy on push to `main`) |
| Runtime | Node ≥ 18 |
| Package manager | Yarn |

---

## Key Architecture Notes

- **Portfolio page** reads from `src/pages/portfolio/github-repo-info.json` — add/remove repos by editing this file, not the component.
- **Blog tags**: valid tags defined in `blog/tags.yml`. The `polkadot` key maps to permalink `/dot` (navbar uses `/blog/tags/dot`).
- **Math rendering**: use `$...$` (inline) and `$$...$$` (block) in MDX.
- **TypeScript**: `tsconfig.json` is `noEmit: true` — editor type-checking only; Docusaurus handles the build.
- **CI**: uses Node 16 in the workflow; run locally with Node ≥ 18.

---

## Authors

- **Sampras Zheng** — RF/hardware engineer, Polkadot builder, space infrastructure analyst  
  GitHub: [@SamprasZheng](https://github.com/SamprasZheng) · LinkedIn: [samprascheng](https://linkedin.com/in/samprascheng)

- **PolkaSharks** — Taiwanese Polkadot educator  
  X: [@Polkasharks](https://x.com/Polkasharks) · YouTube: [PolkaSharks](https://youtube.com/@PolkaSharks) · [bento.me/polkasharks](https://bento.me/polkasharks)
