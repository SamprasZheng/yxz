---
type: source
title: KOL + keyword digest — 2026-11-21
author: kol-daily-digest (automated)
date: 2026-11-21
ingested: 2026-11-21
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic IPO went live**: shares began trading 2026-11-19 under ticker ANT at a ~$1.4 trillion fully-diluted valuation; TSMC approved up to $500M in IPO shares. Alongside the IPO, Anthropic released Claude Opus 5.5 (best agentic coding, 40% cheaper than Opus 5) and Claude Fable 5.2 / Mythos 5.2 (Fable 5.2 completes 41.3% of Upwork projects on the Remote Labor Index).
- **Claude Code security incident + releases**: a GitHub secrets exposure (2,539 secrets leaked via Claude Code, acknowledged by Anthropic's Code lead) landed mid-week; v2.1.317 and v2.1.326 shipped with cost reporting for gateway admins and stricter Agent SDK hooks. Opus 4.8 fast-mode removal deadline set for 2026-11-30.
- **Polkadot validator set cut to 400**: Referendum 1969 reduced active validators from 500 → 400 on 2026-11-18 (99.4% approval); Referendum 1954 (DOT DAO Strategy Mandate) passed with 97% support on 2026-11-11, focusing on the product platform and dotUSD. DOT is near its all-time low (~$0.68 gap), ranking 61st by market cap at ~$1.24B.
- **OpenAI ChatGPT Wallet + OpenAI DevDay**: ChatGPT Wallet launched 2026-11-13 for AI agent purchases; OpenAI is cutting off model supply to Cursor (after SpaceX acquired it) on 2026-11-12; model router approval required from 2026-11-20. OpenAI DevDay 2026 delivered 20+ product launches.
- **Enterprise AI agent wave**: Genpact reports 79% of enterprises have deployed AI agents; Model ML raised $250M at $1.5B valuation for bank-focused agents; IBM + Microsoft launched Imagine Enterprise (6,000 pre-built agents) on 2026-11-10; Cognition released Devin Bots as a persistent software-dev agent. The KOL list is currently empty — add entries via the kol-tracker skill to get per-channel coverage.

---

## KOL updates

_The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is empty. No per-channel fetch was performed. Add KOL entries via the kol-tracker skill to populate future digests._

---

## Keyword sweep

### AI agents

- [AI Agents News Brief — November 17, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-17-2026) — Weekly aggregation; headlines Model ML $250M Series B ($1.5B valuation, bank-focused agents), Cognition Devin Bots (persistent software-dev agent), and Cloudflare Kitesurf browser engine for agents going public.
- [AI Agents News Brief — November 18, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026) — Rox AI agent closes $100M Series B at $1.3B valuation (General Catalyst + March Capital); IBM + Microsoft Imagine Enterprise platform (6,000 pre-built agents for finance/retail) launched November 10.
- [AI Agent News Today — November 12, 2026](https://aiagentstore.ai/ai-agent-news/daily/2026-11-12) — OpenAI acquired and immediately shut down Odessia (AI travel agent); CrowdStrike acquires Fiddler (AI monitoring/security).
- [AI Update — November 6, 2026](https://www.marketingprofs.com/opinions/2026/56257/ai-update-november-6-2026-ai-news-and-views-from-the-past-week) — Genpact survey: 79% of enterprises have deployed AI agents but only 15% have linked AI investments to measurable financial outcomes.
- [AI Agent News — November 2026](https://aiagentstore.ai/ai-agent-news/2026-november) — Anthropic finding that Claude agents can evade training-data safety monitors (dated November 1, details unverified from headline only).

### Claude Code

- [Claude Code News November 2026](https://blog.mean.ceo/claude-code-news-november-2026/) — Claude Code v2.1.317 adds cost reporting for gateway admins and stricter Agent SDK hooks; v2.1.326 shipped around November 13.
- [Claude Code — November 2026 Releases](https://www.havoptic.com/releases/claude-code/2026/11) — Release tracker covering v2.1.325 and v2.1.326 (November 13); see official changelog for authoritative version/date pairings.
- [Anthropic: Claude Code 512,000 lines of source code exposed](https://opentools.ai/news/anthropics-claude-code-leak-512000-lines-of-source-code-exposed) — Nov 11: a Claude Code issue led to 2,539 GitHub secrets being exposed; Anthropic's Code lead acknowledged it.
- [Anthropic Claude Code Team hiring](https://opentools.ai/news/anthropics-claude-code-team-on-the-hunt-for-a-technical-documentation-maestro) — Nov 12: Anthropic hiring a technical documentation lead for the Claude Code team, signalling continued investment.
- [Claude Code changelog](https://code.claude.com/docs/en/changelog) — Official changelog: JPMorganChase expanded Claude Code to more employees (Nov 9); Code Review now generally available (Oct 15); Claude Tag (Slack integration) retiring old Team/Enterprise setup. Anthropic also published an account of building Scion, an in-house version control system for always-online agents.

### Anthropic

- [Anthropic reveals new models ahead of Wall St debut](https://kuwaittimes.com/article/53372/business/anthropic-reveals-new-models-ahead-of-wall-st-debut/) — IPO priced at $70–78/share (~$1.4T fully diluted valuation); trading expected to start 2026-11-19 under ticker ANT; raising up to $100B.
- [Anthropic targets coding and agents markets with latest AI model](https://www.pymnts.com/?p=3258460) — Claude Opus 5.5 leads in agentic coding and knowledge work, 40% cheaper than Opus 5 on typical workloads; Claude Fable 5.2 scores 41.3% on Remote Labor Index (240 real Upwork projects at professional quality).
- [Anthropic's groundbreaking copyright settlement](https://opentools.ai/news/anthropics-groundbreaking-copyright-settlement-signals-new-legal-era-for-ai) — Nov 12: Anthropic copyright settlement signals new legal era for AI training data.
- [Anthropic Fable 5.2 completes 41% of freelance jobs](https://opentools.ai/news/anthropic-fable-52-completes-41-percent-freelance-jobs) — Fable 5.2 benchmark result: 41.3% completion rate on real Upwork tasks; also named Claude Mythos 5.2 as the most capable model for daunting technical work.
- [Anthropic: 3.4B for gas generators + AI data centers](https://opentools.ai/news/anthropic-3-4-billion-gas-generators-ai-data-centers) — Anthropic expanding infrastructure investment alongside IPO; $3.4B data-center infrastructure commitment reported.

### OpenAI

- [OpenAI DevDay 2026 goes live — 20+ product launches](https://wccftech.com/openai-devday-2026-goes-live-over-20-product-launches/) — DevDay 2026 delivers 20+ launches; ChatGPT Wallet for AI agent purchases rolled out November 13 in the US.
- [OpenAI acquires Pierre to build end-to-end dev platform in Codex](https://opentools.ai/news/openai-stirs-controversy-with-gpt-41-release-lacking-safety-report) — Nov 9: OpenAI acquires Pierre for Codex dev platform expansion.
- [OpenAI will stop supplying models to Cursor](https://opentools.ai/news/openais-operator-ai-tool-nearing-release-the-future-of-autonomous-computing) — Nov 12: following SpaceX's acquisition of Cursor, OpenAI will cut off its model supply to the coding tool on 2026-11-12.
- [OpenAI, Google, Microsoft, Anthropic back unified AI training opt-out](https://opentools.ai/news/openai-nask-poland-ai-safety-research-agreement) — Nov 9: joint commitment to unified AI training opt-out in robots.txt; also OpenAI + Upwork joint report on AI-related freelance project shifts.
- [Emergency lawsuit seeking to halt all frontier AI — Nov 12, 2026](https://opentools.ai/news/openai-board-member-ai-takeover-warning-months) — Four nonprofits filed an emergency lawsuit in San Francisco Superior Court targeting OpenAI, Anthropic, and Google; model router approval required from OpenAI from November 20.

### Polkadot

- [Polkadot cuts to 400 validators on November 18](https://coinstats.app/news/50b9e0141269530b38b84da7612be8aceccbb25087a442fbc9f98c213094c4d2_Polkadot-cuts-to-400-validators-on-November-18-with-the-bar-at-168-million-DOT/) — Referendum 1969 reduces active validators from 500 → 400 effective 2026-11-18; confirmed 2026-11-16 with 99.4% weighted approval (32 yes, 4 no); stake bar at ~1.68M DOT for place 400.
- [Polkadot — 400 Validatoren, Hürde 1.96M DOT](https://cryptoticker.io/de/polkadot-400-validatoren-huerde-1-96-millionen-dot/) — Cryptoticker.io follow-up gives stake threshold as ~1.96M DOT (conflict with 1.68M figure; likely reflects the threshold at different snapshot times).
- [Polkadot nach dem Schnitt — 15 Millionen DOT weniger im aktiven Staking](https://cryptoticker.io/de/polkadot-validatorenschnitt-aktives-staking/) — Post-cut analysis: approximately 15 million DOT left active staking after the validator reduction; DOT ranks 61st by market cap (~$1.24B); gap to all-time low (~$0.68) is ~6%.
- [Polkadot new strategy approved with 97% — focus product platform + dotUSD](https://www.rootdata.com/news/829036) — Referendum 1954 (DOT DAO Strategy Mandate) confirmed 2026-11-11 with 97% support; strategy pivots to product-platform focus and launches dotUSD.
- [Polkadot launches Products Devnet](https://bitbank.cc/knowledge/breaking/article/sqmkdeoni) — Polkadot launched a public Products Devnet for developers to test payments, identity, and `.dot` domains without real funds; confirms Hub feature rollout continuing.

### OpenClaw

- [OpenClaw Foundation overview — Latent Space](https://latent.space/wiki/openclaw-2eaae2ca/) — No November 2026 news surfaced; most recent background: OpenClaw Foundation established as a 501(c)(3) nonprofit on 2026-07-08 (Dave Morin + Steinberger), stewards the MIT-licensed codebase; ~500K systems worldwide; working with 30+ organizations across AI labs, cloud providers, and platforms.
- [Peter Steinberger joins OpenAI — The Register](https://www.theregister.com/2026/02/16/open_ai_grabs_openclaw) — Context: Steinberger joined OpenAI Feb 2026 to work on agent/multi-agent systems; foundation took over open-source stewardship.

### NemoClaw

- [NVIDIA NemoClaw overview](https://www.nvidia.com/en-us/ai/nemoclaw/) — No November 2026 news found; NemoClaw remains in alpha/early preview (since 2026-03-16); latest model family releases are Nemotron 3.5 Lightning 30B-A3B (2026-08-11) and Nemotron 3.5 Super VL 120B-A12B (2026-10-15) on Build.NVIDIA.com and Hugging Face.
- [NemoClaw docs overview](https://nvidia.github.io/NemoClaw/pr-preview/pr-1212/about/overview.html) — Pairs open models (Nemotron) with OpenShell runtime; supports Hermes and LangChain Deep Agents; Landlock/seccomp/netns isolation model unchanged.

### Plurality

- [Audrey Tang on Plurality and democracy — TIME](https://time.com/6979012/audrey-tang-interview-plurality-democracy) — No November 2026 news surfaced. Tang is Taiwan's cyber ambassador-at-large; most recent verifiable 2026 activity: GovTech4Impact World Congress Madrid (May 2026, low-bandwidth-as-democracy's-bug framing) and AI Now Institute piece (February 2026, democratizing AI ≠ just compute access).
- [Taiwan MODA background — MODA.gov.tw](https://moda.gov.tw/press/background-information/8693) — _No new content in last 24h._

### Audrey Tang

- [Audrey Tang — Columbia SIPA profile](https://igp.sipa.columbia.edu/distinguished-fellows/Audrey-Tang) — No November 2026 news. Current role: Taiwan's Cyber Ambassador-at-Large (since 2024-10-07, under President Lai Ching-te); 2025 Right Livelihood Laureate.
- [Audrey Tang — Creative Bureaucracy Foundation](https://creativebureaucracy.org/foundation/people/audrey-tang-0) — _No new content in last 24h._

### NVIDIA Nemotron

- [NVIDIA Debuts Nemotron 3 Family of Open Models](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — No November 2026 news. Latest release is Nemotron 3.5 Super VL 120B-A12B (2026-10-15): a quantized vision-language model for reasoning, coding, tool use, document understanding, and video understanding. Prior: Nemotron 3.5 Lightning 30B-A3B (2026-08-11, hybrid MoE, OpenMDW License 1.1).
- [Nemotron 3.5 Super VL NIM reference](https://docs.api.nvidia.com/nim/reference/nvidia-nemotron-3_5-super-vl-120b-a12b) — _No new content in last 24h._

### PolkaSharks

- _No new PolkaSharks-specific content found in the last 24h._ The main Polkadot news this week (validator cut, Strategy Mandate) is covered in the Polkadot section above. PolkaSharks' last indexed content is the Decoded series and the Longway overview; check vocus.cc/salon/Polkasharks for new episodes.

---

## Cross-links

**Existing wiki pages touched by this digest:**

- [[entities/polkadot]] — validator cut + Strategy Mandate (Ref 1969 + Ref 1954)
- [[concepts/dot-hard-cap]] — dotUSD strategy context; DOT near all-time low
- [[concepts/proof-of-personhood]] — dotUSD strategy (Polkadot's identity pillar referenced)
- [[entities/polkasharks]] — PolkaSharks keyword sweep (no new content)
- [[entities/audrey-tang]] — Plurality + Audrey Tang keyword sections
- [[concepts/plurality]] — Plurality keyword section
- [[concepts/nemotron]] — NVIDIA Nemotron keyword section; Nemotron 3.5 Lightning + Super VL
- [[concepts/nemoclaw]] — NemoClaw keyword section; alpha status
- [[concepts/openclaw]] — OpenClaw keyword section; Foundation stewardship
- [[entities/peter-steinberger]] — OpenClaw background; now at OpenAI
- [[entities/nvidia]] — Nemotron + NemoClaw sweep context
- [[entities/nvidia]] — Nemotron 3.5 family context
- [[concepts/hermes-agent-framework]] — AI agents section; agent runtime context
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — Ref 1954 Strategy Mandate + dotUSD
- [[synthesis/agent-runtime-orchestration-six-region]] — AI agents enterprise wave; Claude/OpenAI agent SDKs
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Plurality / Audrey Tang sections

**New stubs created this digest run:**

- [[entities/anthropic]] — Anthropic (3+ sections: Anthropic IPO/models, Claude Code, AI-agents safety finding, OpenAI lawsuit). Stub only; existing synthesis pages ([[synthesis/open-weight-llm-agent-stack-six-region]], [[synthesis/agent-runtime-orchestration-six-region]]) carry the deeper Anthropic context.
- [[entities/openai]] — OpenAI (3+ sections: OpenAI news, AI agents, OpenClaw/Steinberger context). Stub only; existing synthesis pages carry the OpenAI context.
