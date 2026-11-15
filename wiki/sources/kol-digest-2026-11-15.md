---
type: source
title: KOL + keyword digest — 2026-11-15
author: kol-daily-digest (automated)
date: 2026-11-15
ingested: 2026-11-15
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic IPO roadshow launched Nov 10** (Nasdaq ticker: ANT); Claude services hit a widespread outage Nov 13 (authentication errors affecting claude.ai + Claude Code; partially restored by Nov 14). Claude Code 2.1.323 added experimental opt-in Code Mode; 2.1.321 made Fable 5.2 the default Fable model.
- **OpenAI shipped ChatGPT Wallet** (Nov 13), giving its "dots" agents autonomous purchasing power for Pro users 18+ in the US; OpenAI reportedly prepping IPO filing at ~$1.25T valuation and disbanded its standalone robotics team.
- **Polkadot governance voted 97%** (Nov 11) to pivot strategy toward consumer apps and a DOT-backed stablecoin (dotUSD); DOT price dropped ~14% over 24h to ~$0.71 on Binance. Validator active set cuts to 500 (since era 2351) with a further cut to 400 scheduled Nov 18.
- **NVIDIA Nemotron 3.5 family** (Super VL 120B, Bolt 74B-A9B, Bolt E4B) released Oct 15 for agentic workloads and is now on HuggingFace/OpenRouter/NIM; Nemotron 4 (1T+ params) reportedly in development. NemoClaw docs reached version 0.0.39, now also supports LangChain Deep Agents on Nemotron 3 Ultra.
- **79% of enterprises have deployed AI agents** (Genpact report, Nov 12); Cloudflare open-sourced its Kitesurf browser engine for agents (Apache 2.0, Nov 14); CrowdStrike reportedly acquiring Clutch Security (AI agent credential tracking) for ~$495M.

## KOL updates

_KOL list is currently empty — no KOL channels were swept. Add entries via the `kol-tracker` skill to populate this section in future runs. Run `/kol-tracker` to add people or channels to `.claude/skills/kol-tracker/kol-list.yaml`._

## Keyword sweep

### AI agents

- [AI Agents News Brief: Cloudflare, CrowdStrike, OpenAI, and more — November 14, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-2026-11-14) — Cloudflare open-sourced Kitesurf (stateless browser engine for agents, Apache 2.0); CrowdStrike in talks to acquire Clutch Security for ~$495M (AI agent credential tracking).
- [United Airlines blocks AI agents from booking flights](https://www.washingtonpost.com/travel/2026/11/12/united-airlines-blocks-ai-agents-booking-flights/) — United warns third-party AI agents can expose sensitive data or cause unintended bookings; among the first major airline restrictions on agentic commerce.
- [AI News — Nov 12, 2026 — AI Agents, Infrastructure, and Equity](https://riorundown.substack.com/p/ai-news-nov-12-2026-ai-agents-infrastructure) — Genpact report: 79% of enterprises have deployed AI agents; AWS open-sourced a 200-service emulator reportedly written entirely by AI agents without human review.
- [AI Agents News Brief: November 7, 2026 — Perplexity Teammates, Meta Muse, DeepMind RSA](https://aiagentsdirectory.com/news/ai-agents-directory-daily-brief-november-7-2026) — Perplexity launched "Teammates": always-on 24/7 agents for Max subscribers, collaborating via Slack.
- [AI Agents News Brief: November 6, 2026 — Acquisitions, Security, and Development Tools](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-6-2026) — Meta acquired Conductor (run multiple coding agents in parallel); Kindo raised $30M for enterprise agent management; Rox raised $100M at $1.3B for AI sales agents.

### Claude Code

- [Anthropic's Claude is experiencing a widespread outage — Android Authority](https://androidauthority.com/anthropic-claude-outage-nov-2026-3735078) — Nov 13 outage: authentication errors hit claude.ai and platform.claude.com; recovery visible on claude.ai by Nov 14 but errors flagged as still possible.
- [Claude Code changelog — Claude Code Docs](https://code.claude.com/docs/en/changelog) — 2.1.323: experimental Code Mode (Claude writes JS to call tools); 2.1.322: fast mode on Vertex (global/US/EU); 2.1.321: Fable 5.2 default + Remote Control settings support.
- [Anthropic tells Claude Code to stop recreating existing video games — TechSpot](https://www.techspot.com/news/114423-anthropic-tells-claude-code-stop-recreating-existing-video.html) — Programmer Addy Osmani (Nov 3): Claude will now decline prompts requesting recreations of existing games — an IP/policy guardrail added to the model.
- [Anthropic Release Notes — November 2026 Latest Updates — Releasebot](https://releasebot.io/updates/anthropic) — Tracks Anthropic's rolling release cadence; Fable 5.2 promotion and Vertex fast-mode were the most recent logged changes.
- [Anthropic investigates authentication errors hitting Claude AI and Claude Code — CryptoBriefing](https://cryptobriefing.com/anthropic-investigates-claude-authentication-errors/) — Secondary confirmation of the Nov 13 auth outage; recovery was visible by next day.

### Anthropic

- [Claude AI is down: Anthropic investigates login failures — BusinessToday](https://businesstoday.in/technology/news/story/claude-ai-outage-anthropic-investigates-login-failures-as-ai-chatbot-and-coding-tools-face-outage-567403-2026-11-13) — Outage confirmed at business-press level; Anthropic investigating on Nov 13.
- [Claude Code News — November 2026](https://blog.mean.ceo/claude-code-news-november-2026/) — Secondary roundup notes Anthropic IPO roadshow launched Nov 10 for planned Nasdaq listing under ANT; treat figures from this secondary source with caution.
- [Claude Release Timeline: Models, Apps, API & Claude Code](https://www.claudeai.directory/anthropic-claude-release-timelines) — Aggregator tracking the full Anthropic release history; useful for model naming cross-reference.

### OpenAI

- [ChatGPT Wallet lets OpenAI's agents buy things for you — GSMArena](https://www.gsmarena.com/chatgpt_wallet_lets_openais_agents_buy_things_for_you-news-75481.php) — Launched Nov 13: ChatGPT Wallet ties OpenAI's "dots" personal agents to payment cards; users approve each purchase; US Pro only, 18+.
- [OpenAI Gives AI Agents a Wallet While Blocking Them From Seeing the Card — PYMNTS](https://pymnts.com/news/artificial-intelligence/2026/openai-gives-ai-agents-a-wallet-while-blocking-them-from-seeing-the-card) — Technical detail: agents initiate payments without direct card-number access — a trust-separation design for agentic commerce.
- [OpenAI disbands its stand-alone robotics team — Fortune](https://fortune.com/2026/11/13/openai-disbands-robotics-team-as-its-general-models-start-running-robots/) — Robotics researchers reassigned internally; general-purpose models now drive robotics rather than a dedicated team.
- [OpenAI news and analysis — TechCrunch](https://techcrunch.com/tag/openai/) — Bloomberg via TechCrunch: OpenAI received ~$11B first close at ~$1.25T valuation (below the ~$1.4T initial pitch); IPO filing reportedly imminent.
- [AI News November 2026: 7 Shocking Stories, One Global Crash — IMFounder](https://imfounder.com/science-tech/ai/ai-news-november-2026) — Roundup noting OpenAI IPO prep alongside broader AI infrastructure volatility; source is secondary/aggregator.

### Polkadot

- [Polkadot's New Strategy Passes with 97% Support, Focusing on Product Platform and dotUSD — KuCoin News](https://www.kucoin.com/news/flash/polkadot-s-new-strategy-passes-with-97-support-focuses-on-product-platform-and-dotusd) — Polkadot Community Foundation plan approved Nov 11; first product: a mobile app for private messaging + digital cash; economic core = dotStables family (dotUSD first).
- [Polkadot Bets on a Messaging App and a DOT-Backed Stablecoin — Crypto News Flash](https://www.crypto-news-flash.com/polkadot-bets-on-a-messaging-app-and-a-dot-backed-stablecoin/) — Detailed breakdown of the dotUSD stablecoin design and consumer messaging strategy.
- [Polkadot Spot Price Drops 4.56% in an Hour to $0.711 on Nov. 14 — TokenPost](https://www.tokenpost.com/news/investing/57517) — DOT fell ~14% over 24h as of Nov 14; various sources show $0.71–0.84 depending on timestamp.
- [Polkadot staking: 500 validators, 15M fewer DOT active — CryptoTicker](https://cryptoticker.io/en/polkadot-validator-cut-active-staking-15-million-dot/) — Active validator set trimmed to 500 since era 2351 (Nov 11); Referendum 1969 schedules a further cut to 400 on Nov 18 (treat as unconfirmed — source text is garbled).
- [Polkadot Backs DOT Stablecoin Plan as Price Hits Fresh Lows — ETHNews](https://ethnews.com/polkadot-backs-dot-stablecoin-plan-as-price-hits-fresh-lows/) — Notes a proposed shutdown of Acala and Karura over fragmented liquidity concerns — an ecosystem consolidation signal.

### OpenClaw

- [OpenClaw News | November 2026 (STARTUP EDITION) — Mean CEO Blog](https://blog.mean.ceo/openclaw-news-november-2026/) — Anniversary framing (~1 year old); stable release 2.0 shipped Aug 30, 2026. Source is secondary.
- [OpenClaw in 2026: What It Is, Who's Using It, and Whether Your Business Should Adopt It — Linux Journal](https://www.linuxjournal.com/node/1341418) — Overview of the project: 350k+ GitHub stars claimed, 3.2M MAU, 44k community skills; treat adoption figures as estimated/varying across sources.
- [The OpenClaw Saga: How the Last Two Weeks Changed the Agentic AI World Forever — HackerNoon](https://hackernoon.com/lang/bn/the-openclaw-saga-how-the-last-two-weeks-changed-the-agentic-ai-world-forever) — Retrospective on the fork dispute and the transition toward an open-source foundation model.
- [What is OpenClaw? Complete History: ClawdBot, Moltbot, Moltbook, Mission Control & the AI Agent Revolution (2026) — Taskade Blog](https://www.taskade.com/blog/moltbook-clawdbot-openclaw-history.md) — Covers the naming lineage: Clawdbot → Moltbot → OpenClaw (Jan 30, 2026); [[entities/peter-steinberger]] joined OpenAI in Feb 2026 to lead personal agents.
- [OpenClaw the Lobster That Took Over the World — NeuroHive](https://neurohive.io/en/guides/openclaw-the-lobster-that-took-over-the-world-how-one-developer-built-the-most-popular-open-source-ai-agent-in-history/) — Origin story; notes security concern CVE-2026-25253 (CVSS 8.8) and a coordinated malware campaign on the public skills registry.

### NemoClaw

- [NVIDIA NemoClaw v0.0.39 docs](https://docs.nvidia.com/nemoclaw/0.0.39/about/overview.html) — Latest doc version indexed; confirms NemoClaw is an Apache 2.0 open-source reference stack for running OpenClaw always-on assistants with security guardrails, using the OpenShell sandbox runtime.
- [NVIDIA NemoClaw — nvidia.com (India)](https://www.nvidia.com/en-in/ai/nemoclaw/) — Product page confirms NemoClaw now also runs LangChain's Deep Agents harness tuned for Nemotron 3 Ultra, plus Nous Research's Hermes agents.
- [NVIDIA NemoClaw — nvidia.com (Singapore)](https://www.nvidia.com/en-sg/ai/nemoclaw/) — Duplicate product page (different region); same content as above, confirms multi-model runtime support.

### Plurality

- [Audrey Tang: Learning From Taiwan's Digital Civic Experimentation — CoinDesk](https://www.coindesk.com/consensus-magazine/2024/05/22/audrey-tang-learning-from-taiwans-digital-civic-experimentation) — No November 2026 news found. Most recent item is Tang's Dec 2025 Stockholm University lecture (2025 Right Livelihood laureate) arguing algorithms should reinforce unexpected common ground, not extremes. _No new posts in the last 24h._

### Audrey Tang

_No November 2026 news found in the 24h sweep. Most recent public activity: Dec 2025 Stockholm University lecture + GDS 2025 talk on Utah's Digital Choice Act. See [[entities/audrey-tang]]._

### NVIDIA Nemotron

- [NVIDIA Launches Nemotron 3.5 Super VL and Bolt for AI Agents — Techzine](https://www.techzine.eu/news/analytics/145037/nvidia-launches-nemotron-3-5-super-vl-and-bolt-for-ai-agents/) — Oct 15 release: Super VL (120B/12B-active MoE, multimodal, ~26T token pretraining) + Bolt 74B-A9B (24 GB local agentic) + Bolt E4B (4 GB conversational); on HuggingFace/OpenRouter/ModelScope/NIM.
- [Every Nemotron AI Model Explained and Compared (Nov 2026) — Second Talent](https://www.secondtalent.com/resources/every-nemotron-ai-model-explained-compared/) — Nov 12 roundup: three tiers — 3.5 Lightning (30B/3B active), 3.5 Super VL (120B/12B active), 3 Ultra (550B/55B active); all governed by OpenMDW-1.1 (verify against official model cards).
- [Open From Data Center to Desktop: NVIDIA Expands Nemotron Family — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/) — Official announcement; Super VL and Bolt 74B-A9B available immediately (Oct 15); Bolt E4B to follow Oct 23.
- [NVIDIA AI Models, Updates & Pricing Changes (November 2026) — WriteWorks](https://www.writeworks.ai/ai-updates/nvidia) — Pricing tracker; logs early/mid-October price changes for Nemotron 3 Ultra, 3.5 Lightning, 3 Super; no November changes recorded yet.
- [NVIDIA's latest 120B-parameter model completes tasks 5x faster — Interesting Engineering](https://interestingengineering.com/ai-robotics/nvidia-nemotron-35-super-vl-5x-faster) — Consumer-facing summary of Super VL's efficiency claim vs prior generation; treats NVIDIA's own benchmark figures, so verify independently.

### PolkaSharks

_No November 2026 news found in the 24h sweep. No recent posts or announcements surfaced. The most recent indexed PolkaSharks content predates this window. See [[entities/polkasharks]] for the full KOL profile._

## Cross-links

- [[entities/audrey-tang]]
- [[entities/polkadot]]
- [[entities/nvidia]]
- [[entities/peter-steinberger]]
- [[entities/polkasharks]]
- [[concepts/nemotron]]
- [[concepts/nemoclaw]]
- [[concepts/openclaw]]
- [[concepts/plurality]]
- [[concepts/agentic-payments]]
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]]
- [[synthesis/agent-runtime-orchestration-six-region]]
- [[synthesis/agentic-payments-six-region]]
