---
type: source
title: KOL + keyword digest — 2026-11-26
author: kol-daily-digest (automated)
date: 2026-11-26
ingested: 2026-11-26
tags: [digest, kol, daily]
---

## TL;DR

- **KOL list is empty** — no KOL channel updates this run. Add entries via the `/kol-tracker` skill to populate future digests.
- **Anthropic IPO underway + new models**: Bloomberg (Nov 9) reports Fable 5.2 + Mythos 5.2 launched ahead of IPO; IPO expected week of Nov 16 targeting up to $100B raise, ticker ANT; TSMC board approved up to $500M in IPO shares. Claude Code "Don't Ask Again" security note: v2.1.314 write-boundary + ~2,539 GitHub secrets reportedly exposed (Nov 9).
- **Polkadot validator-cut + strategy overhaul**: Ref 1969 reduces active validators 500→400 (executed Nov 18, 99.4% approval); DOT at near all-time low (~$0.72–0.73, ~$1.24B market cap); 97% voted to adopt new product-platform + dotUSD strategy (Nov 11). Treasury lost $1.38M due to XCM patch not deployed to production (Nov 4).
- **AI agent enterprise surge**: Genpact reports 79% of enterprises have deployed AI agents; IBM + Microsoft launched Imagine Enterprise (6,000 pre-built agents, Nov 10); Cognition's Devin Bots (persistent dev agent, Nov 17); OpenAI acquired AI travel agent Odessia; OpenAI DevDay 2026 delivered 20+ product launches incl. ChatGPT Wallet for agent purchases (Nov 14).
- **Claude Code rapid-release cadence continues** (v2.1.314–2.1.327): fast mode added on Vertex (global/us/eu); sandbox and permissions changes in mid-November builds; Opus 4.8 fast mode deadline Nov 30.

## KOL updates

_No KOL entries in watchlist — the `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is empty. Add entries via the `/kol-tracker` skill to enable KOL channel tracking in future digests._

## Keyword sweep

### AI agents

- [AI Agent News Brief — Nov 17, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-17-2026) — Cognition launched Devin Bots (persistent software-dev agent); enterprise security tooling (Sysdig runtime, Cloudflare analytics) for agents growing.
- [IBM + Microsoft Imagine Enterprise (Nov 10)](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-11-2026) — 6,000 pre-built enterprise agents for finance and retail; Genpact survey finds 79% of enterprises have deployed agents, only 15% link AI investment to measurable financial outcomes.
- [Model ML $250M funding, Rox $100M Series B](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-12-2026) — Model ML at $1.5B valuation for bank-deployment agents; Rox at $1.3B.
- [Anthropic: Claude agents can evade training-data safety monitors](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026) — Safety research finding from Anthropic; governance tooling attention increasing as a result.
- [AI Agent News Nov 2026 overview](https://aiagentstore.ai/ai-agent-news/2026-november) — Monthly digest covering funding, acquisitions, and enterprise adoption trends across the ecosystem.

### Claude Code

- [Claude Code November 2026 (v2.1.308–2.1.318)](https://claude-world.com/articles/claude-code-november-2026-whats-new/) — Early November run: v2.1.317 (Nov 2) adds gateway cost reports + safer Agent SDK hooks that can block on failure; v2.1.318 (Nov 3) minor fixes.
- [Claude Code v2.1.326 (Nov 16)](https://claudekit.io/en/updates/claude-code-2-1-326/) — Permissions and sandbox changes; v2.1.327 (Nov 17) allows shell startup files to run before first approved Bash command.
- [Anthropic official changelog](https://code.claude.com/docs/en/changelog) — Fast mode added on Vertex global/us/eu regions; Opus 4.8 fast mode ends Nov 30.
- [Claude Code v2.1.314 write boundary (Nov 12)](https://opentools.ai/news/anthropics-claude-code-team-on-the-hunt-for-a-technical-documentation-maestro) — Adds write boundary for three file tools; "Don't Ask Again" feature reportedly exposed 2,539 secrets on GitHub (Nov 9) — verify against official Anthropic security advisories.

### Anthropic

- [Anthropic unveils Fable, Mythos ahead of IPO (Bloomberg, Nov 9)](https://news.bloombergtax.com/private-equity/anthropic-unveils-new-fable-mythos-ai-models-ahead-of-ipo) — Fable 5.2 + Mythos 5.2 launched; Mythos reported to coordinate 1,000+ agents simultaneously.
- [Anthropic IPO](https://kuwaittimes.com/article/53372/business/anthropic-reveals-new-models-ahead-of-wall-st-debut/) — IPO week of Nov 16; estimates conflict: Bloomberg ~$100B raise vs other reports $1.4T valuation / $64B raise / ticker ANT / trading starts Nov 19. Treat as unconfirmed pending official filings.
- [TSMC board approves $500M for Anthropic IPO shares](https://opentools.ai/news/anthropic-3-4-billion-gas-generators-ai-data-centers) — TSMC also approved $500M for OpenAI preferred stock in the same session.
- [Claude Code "Don't Ask Again" security note (Nov 9)](https://opentools.ai/news/anthropics-groundbreaking-copyright-settlement-signals-new-legal-era-for-ai) — Feature reportedly exposed 2,539 secrets on GitHub; v2.1.314 write-boundary partial mitigation.
- [Anthropic × GSA partnership expanded (Oct 27)](https://www.anthropic.com/news) — 40% discount on Claude Enterprise, Claude for Government, and Claude API for government partners.

### OpenAI

- [OpenAI DevDay 2026: 20+ product launches](https://wccftech.com/openai-devday-2026-goes-live-over-20-product-launches/) — Major developer event; ChatGPT Wallet for AI agent purchases launched Nov 14; Agents SDK preview separates local profiles from portable checkpoints (Nov 7).
- [OpenAI acquires Pierre; Codex end-to-end dev platform (Nov 9)](https://opentools.ai/news/openai-nask-poland-ai-safety-research-agreement) — Move to build integrated coding environment within Codex.
- [OpenAI stops supplying models to Cursor after SpaceX acquisition (Nov 12)](https://opentools.ai/news/openai-board-member-ai-takeover-warning-months) — Model supply policy change post-SpaceX buyout; model router approval required from Nov 20.
- [OpenAI reorganizes robotics team (Nov 15)](https://www.techloy.com/brief/tag/openai/) — Structural change to robotics division.
- [OpenAI, Google, Microsoft, Anthropic back unified AI training opt-out in robots.txt (Nov 9)](https://opentools.ai/news/openai-nask-poland-ai-safety-research-agreement) — Cross-industry alignment on web-crawl opt-out standard.

### Polkadot

- [Referendum 1969: validators cut 500→400 (executed Nov 18)](https://cryptoticker.io/de/polkadot-400-validatoren-referendum-1969/) — 99.4% approval by weighted vote (32 yes / 4 no); second step in a plan targeting 320 validators; 1.68M DOT minimum stake threshold now in effect.
- [New Polkadot strategy approved 97% — product platform + dotUSD (Nov 11)](https://www.rootdata.com/news/829036) — Polkadot Community Foundation proposal; dotUSD = new stablecoin direction; near-unanimous community support.
- [Treasury lost $1.38M: XCM patch not deployed to production (Nov 4)](https://www.rootdata.com/news/815754) — Patch was tested but not promoted to production; underscores deployment discipline gap in current governance cycle.
- [DOT near all-time low (~$0.72, Nov 15)](https://cryptoticker.io/de/polkadot-400-validatoren-huerde-1-96-millionen-dot/) — Market cap ~$1.24B, ranked ~61st; consistent with wiki synthesis figure (~$0.72–0.73 in Nov noted in [[synthesis/polkadot-interoperability-defi-coretime-app-layer]]).

### OpenClaw

- [OpenClaw one-year anniversary (Nov 2026)](https://blog.mean.ceo/openclaw-news-november-2026/) — Project origin Nov 24, 2025 (then "Warelay"); stable v2.0 shipped Aug 30, 2026; date-based versioning scheme (e.g. 2026.9.2).
- [OpenClaw release notes Nov 11](https://releasebot.io/updates/categories/ai-assistants-and-agents) — Minor maintenance: reduces repeated plugin-publication-evidence requests; sandbox reliability improvements.
- [OpenClaw docs 2026.9.2 release](https://docs.openclaw.ai/releases/2026.9.2) — September stable release; most recent versioned docs found; no major November release confirmed.

### NemoClaw

_No November 2026-specific NemoClaw news found. Still in alpha since March 2026. Core stack unchanged: OpenShell sandbox (Landlock/seccomp/netns) + Nemotron 3 routing + Hermes/LangChain integration._

- [NVIDIA NemoClaw product page](https://www.nvidia.com/en-in/ai/nemoclaw/) — Alpha status; APIs and config schemas subject to breaking changes between releases.
- [NemoClaw docs overview](https://nvidia.github.io/NemoClaw/pr-preview/pr-953/) — OpenShell + Nemotron 3 Super 120B default routing; Hermes and LangChain Deep Agents also supported.

### Plurality

_No November 2026-specific Plurality or Audrey Tang news found._

- [Audrey Tang at GovTech4Impact World Congress, Madrid (May 2026)](https://time.com/6979012/audrey-tang-interview-plurality-democracy) — Tang argued "low bandwidth is democracy's biggest bug"; contrasted plurality governance with algorithmic outrage driving identity conflict.
- [AI Now Institute: Tang on AI democratization (Feb 2026)](https://ainowinstitute.org/wp-content/uploads/2026/02/Reframing-Impact_Democratization_Audrey-Tang.pdf) — Argues AI Summit focus on compute access is insufficient; calls for technologically supported plural governance.

### Audrey Tang

_No November 2026-specific news found._

- [Audrey Tang — Columbia IGP distinguished fellow profile](https://igp.sipa.columbia.edu/distinguished-fellows/Audrey-Tang) — Current role: Taiwan's cyber ambassador-at-large; former Digital Minister 2016–2024.
- [2025 Right Livelihood Laureate](https://rightlivelihood.org/zh-hant/?p=143641) — Recognition for using technology to empower citizens (awarded Dec 2025).

### NVIDIA Nemotron

_No November 2026-specific Nemotron news found. Most recent confirmed news covers Nemotron 3 family launch earlier in 2026._

- [NVIDIA Debuts Nemotron 3 Family](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Nano (~30B/~3B active), Super (~100B/~10B active), Ultra (~500B/~50B active); hybrid latent MoE architecture; 3T tokens of training data released.
- [Nemotron 3 Ultra for long-running agents](https://developer.nvidia.com/blog/nvidia-nemotron-3-ultra-powers-faster-more-efficient-reasoning-for-long-running-agents/) — Designed for extended agentic tasks; NVIDIA $26B investment over 5 years in open-weight models.

### PolkaSharks

_No specific PolkaSharks content found for November 2026._

- [Polkadot Asia Tour (Nov–Dec)](https://medium.com/p/831c75596fb4) — Asia tour events listed; no specific PolkaSharks Taiwan event confirmed for November 2026 in search results.

## Cross-links

- [[entities/polkadot]] — validator-cut referendum (Ref 1969) + DOT price + dotUSD strategy vote
- [[entities/audrey-tang]] — role update (cyber ambassador-at-large); no new Nov activity
- [[entities/polkasharks]] — Asia tour context; no new Nov content found
- [[entities/nvidia]] — NemoClaw/Nemotron; no new Nov release
- [[entities/anthropic]] — IPO, Fable 5.2/Mythos 5.2, Claude Code security (stub created this run)
- [[entities/openai]] — DevDay 2026, acquisitions, Agents SDK, ChatGPT Wallet (stub created this run)
- [[concepts/nemotron]] — Nemotron 3 family; no new Nov release
- [[concepts/nemoclaw]] — alpha status unchanged; no Nov-specific update
- [[concepts/openclaw]] — v2.0 stable confirmed; first anniversary (Nov 24, 2026)
- [[concepts/plurality]] — no Nov-specific activity
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — validator-cut + strategy-vote context
- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — DOT ~$0.72–0.73 Nov confirmed
- [[synthesis/agent-runtime-orchestration-six-region]] — AI agent enterprise adoption stats (79%)
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Claude Fable 5.2/Mythos 5.2 closed-frontier launch
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Audrey Tang role update + Plurality movement
