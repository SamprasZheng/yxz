---
type: source
title: KOL + keyword digest — 2026-11-17
author: kol-daily-digest (automated)
date: 2026-11-17
ingested: 2026-11-17
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic IPO imminent:** 825M shares on Nasdaq "ANT" at $70–78/share; pricing Nov 18, first trading Nov 19; reportedly 6× oversubscribed and potentially the biggest-ever US first-time share sale. Fable 5.2 + Mythos 5.2 launched concurrently; US export controls on Mythos already keeping foreign firms in limbo.
- **Claude Code 2.1.325 (Nov 13):** Code Mode experiment (Claude writes JS to call its tools), Fable 5.2 as default Fable model, stricter sandbox permission defaults + zstd security fix. Projects coordinator update (Nov 14) enables autonomous progress reporting.
- **AI-agent security layer heating up:** CrowdStrike buying agent startups ~$495M; Palo Alto in talks for Clutch Security ~$500M (agent credential tracking); 79% of enterprises now report deployed agents (Genpact). United Airlines, by contrast, moved to restrict AI agents over security concerns.
- **Polkadot governance + price stress:** 97%-approval strategy vote for dotUSD stablecoin + mobile Polkadot App + product-platform shift (Nov 11). DOT hit all-time low $0.6821 (Nov 15) in a broader crypto selloff; validator set being cut 500 → 400 (Referendum 1969, Nov 18).
- **NVIDIA Nemotron for Science at SC26 (Nov 16):** Nemotron 3.5 Super VL (120B multimodal) + LitmusBench v0.2 chemistry dataset on Hugging Face; Bolt E4B (4GB edge model) announced Oct 15 — the family now spans 4GB to 120B for agentic systems.

> **Note:** KOL list is intentionally empty — no channel URLs to sweep. Add entries via the `kol-tracker` skill to enable person-level monitoring.

---

## KOL updates

_KOL list empty — no entries under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml`. Add people/channels via `/kol-tracker` to enable this section._

---

## Keyword sweep

### AI agents

- [AI News - Nov 12, 2026 — AI Agents, Infrastructure, and Equity](https://riorundown.substack.com/p/ai-news-nov-12-2026-ai-agents-infrastructure) — Week digest: AWS Emulator for local dev (written by autonomous agents); Cloudflare Kitesurf open-sourced (stateless browser engine for agents, Apache 2.0).
- [AI Agents News Brief: November 7, 2026 — Perplexity Teammates, Meta Muse, DeepMind RSA](https://aiagentsdirectory.com/news/ai-agents-directory-daily-brief-november-7-2026) — Perplexity Teammates: persistent 24/7 agents for Max subscribers; Meta acquired Conductor (parallel coding agents).
- [AI Agents News Brief: Cloudflare, CrowdStrike, OpenAI, and more — November 14, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-2026-11-14) — CrowdStrike ~$495M agent-startup buys; Palo Alto in talks ~$500M for Clutch Security (agent credential tracking); United Airlines restricts AI agents.
- [AI Agents News Brief: November 12, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-12-2026) — IBM added 6,000+ agents to Imagine Enterprise for regulated firms; Genpact survey: 79% of enterprises deployed AI agents; Kindo raised $30M to manage enterprise AI agents.
- [AI Agents Expand Enterprise Reach, Tackle Complex Workflows, and Enhance Security](https://aiagentsdirectory.com/news/ai-agents-expand-enterprise-reach-tackle-complex-workflows-and-enhance-security) — OpenAI healthcare agents in ChatGPT + API; Palo Alto acquisition framing for agent security as a distinct product category.

### Claude Code

- [Claude Code changelog — official](https://code.claude.com/docs/en/changelog) — Authoritative; v2.1.325 (Nov 13): stricter sandbox permission defaults + zstd decoding security fix as the lead changes.
- [This week in Claude Code, Codex and Gemini CLI — week of November 15, 2026](https://dev.to/aicoding-guide/this-week-in-claude-code-codex-and-gemini-cli-week-of-november-15-2026-4pmm) — Claude Fable 5.2 set as default Fable model in v2.1.321; Opus 4.8 fast-mode deprecated Oct 30, removed Nov 30.
- [Claude Code 'Projects' gets a major update](https://note.com/masa_wunder/n/n96cbb6bc85c9?hl=en) — Nov 14 Projects update: the coordinator now reports its progress autonomously without being asked.
- [Claude Code, Codex CLI, OpenCode Update in 4 Days [2026]](https://shattered.io/claude-code-codex-cli-opencode-update-4-days-2026/) — Code Mode (v2.1.323): experimental opt-in where Claude writes JavaScript to call its tools — an entirely new tool-use path.
- [Claude Code Changelog: Every Release Explained in Plain English](https://clockedcode.com/blog/claude-code-changelog) — Third-party tracker; v2.1.321 fixed four permission/sandbox security gaps before the stricter defaults in 2.1.325.

### Anthropic

- [Anthropic sets IPO price range of $70 to $78 — CNBC](https://www.cnbc.com/2026/11/10/anthropic-sets-price-range-of-70-to-78-in-upcoming-ipo.html) — 825M shares on Nasdaq ticker "ANT"; pricing expected Nov 18, first trading Nov 19; ~6× oversubscribed.
- [Anthropic Holds the Key to the Future of the AI Trade — Bloomberg](https://bloomberg.com/news/newsletters/2026-11-16/anthropic-holds-the-key-to-the-future-of-the-ai-trade) — Bloomberg frames IPO as potentially the biggest-ever US first-time share sale; US limits on Mythos model keeping foreign firms in limbo.
- [AI news this week: Anthropic S-1, Fable 5.2, Hydrogen](https://farhanaiagents.substack.com/p/ai-news-week-nov-16-2026) — Fable 5.2 + Mythos 5.2 launched as "most capable for daunting technical work"; MSCI eyeing Nov 30 index inclusion post-IPO.
- [Anthropic News Today, November 11](https://aiweekly.co/ai-news-today/anthropic-news) — Claude Meetings beta (Team + Enterprise): joins Google Meet calls to take notes, answer questions, create artifacts live.
- [MSCI eyes November 30 index entry for Anthropic after expected IPO](https://cryptobriefing.com/msci-anthropic-ipo-index-inclusion/) — MSCI expects Anthropic to qualify for index inclusion Nov 30 post-IPO; missing data could delay the early add.

### OpenAI

- [OpenAI releases CSAM classifier and ChatGPT warnings — TechCrunch](https://techcrunch.com/2026/11/16/openai-releases-a-new-image-classifier-and-chatgpt-warnings-to-combat-csam) — CSAM image classifier (Nov 16): free API access for select companies, developed with NCMEC; ChatGPT 24-hr block for CSAM attempts.
- [Setting a new standard for responsible AI infrastructure — OpenAI](https://openai.com/index/setting-new-standard-responsible-ai-infrastructure/) — National Community Compact + Compute Campus Policy Blueprint published Nov 5.
- [The logs existed: notes on California's complaint against OpenAI's agents — DEV Community](https://dev.to/veritaschain/the-logs-existed-notes-on-californias-complaint-against-openais-agents-5h67) — _Unverified:_ California AG allegedly sued OpenAI Foundation + OpenAI Group PBC over agent incidents in testing; check primary sources before relying on this.
- [OpenAI News Today, November 5](https://aiweekly.co/ai-news-today/openai-news) — Dan Driscoll named Senior Counselor for National Security Modernization (Nov 2); ChatGPT Images 2.6 adds animated GIF generation.
- [OpenAI — Wikipedia](https://en.wikipedia.org/wiki/OpenAI) — Brockman described H1 2026 as "pretty rough"; Q3 showed revenue inflection with business sales overtaking consumer.

### Polkadot

- [Polkadot's New Strategy Passes with 97% Support — KuCoin](https://www.kucoin.com/news/flash/polkadot-s-new-strategy-passes-with-97-support-focuses-on-product-platform-and-dotusd) — dotUSD dollar-pegged stablecoin + mobile Polkadot App (private messaging + digital cash) + product-platform framing; vote closed Nov 11 with 97% approval.
- [Polkadot cuts active set to 400 validators on November 18 — CryptoTicker](https://cryptoticker.io/en/polkadot-400-validators-referendum-1969/) — Referendum 1969 reduces active validator set from 500 to 400; scheduled Nov 18 ~midday CET; 1.68M DOT required for 400th slot.
- [Polkadot hits all-time low — CryptoTicker](https://cryptoticker.io/en/polkadot-all-time-low-august-rebound/) — DOT hit $0.6821 on Kraken Nov 15, lowest since 2020 launch; tied to a broader crypto selloff (Bitcoin −12.5% over 7 days).
- [Latest Polkadot News — CoinMarketCap](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Polkadot SDK stable2609-2 released Nov 12; 77,045 USDC OpenGov allocation for RPC services approved.
- [Polkadot's $0.9417 support faces pressure — CryptoNews](https://cryptonews.net/news/analytics/33688442/) — Treasury loss of $1.38M USD due to XCM patch not deployed to production environment; bearish technical setup.

### OpenClaw

- [OpenClaw News | November, 2026 (STARTUP EDITION)](https://blog.mean.ceo/openclaw-news-november-2026/) — Anniversary month: OpenClaw turns one year old; newsletter positions it for research, inbox triage, and admin work.
- [openclaw the lobster that took over the world — NeuroHive](https://neurohive.io/en/guides/openclaw-the-lobster-that-took-over-the-world-how-one-developer-built-the-most-popular-open-source-ai-agent-in-history/) — Origin story: Clawdbot (Nov 2025) → Moltbot (Anthropic trademark issue) → OpenClaw (Jan 2026 rebrand); 313K+ stars by March 2026.
- [What is OpenClaw? — TechRadar](https://techradar.com/pro/what-is-openclaw) — Overview; [[entities/peter-steinberger]] joined OpenAI Feb 2026 to lead personal-agents division; independent nonprofit foundation claim not confirmed.
- [OpenClaw: From Viral Prototype to Agentic Infrastructure — Catalaize](https://catalaize.substack.com/p/openclaw-from-viral-prototype-to) — Evolution framing; notes v2026.7.2 beta listed for late July 2026 (fragmentary, not independently verified).
- [cutting through the openclaw and moltbook hype — DeepLearning.AI](https://www.deeplearning.ai/the-batch/cutting-through-the-openclaw-and-moltbook-hype) — Debunked early hype; noted significant security challenges including infostealer malware targeting the project.

### NemoClaw

_No November 2026 release news found. Background from March 2026 launch:_

- [NVIDIA NemoClaw docs — docs.nvidia.com](https://docs.nvidia.com/nemoclaw/0.0.15/about/overview.html) — Still alpha; APIs, config schemas, and runtime behavior subject to breaking changes between releases.
- [NVIDIA NemoClaw: a security layer for autonomous AI agents — BetterStack](https://betterstack.com/community/guides/ai/nvidia-nemoclaw.md) — Technical reference: OpenShell runtime + L7 credential proxy + Landlock/seccomp/netns isolation.
- [Nvidia launches NemoClaw platform for AI agents — Yahoo Finance](https://finance.yahoo.com/news/nvidia-launches-nemoclaw-platform-for-ai-agents-200851962.html) — Announced GTC March 16, 2026; supports NVIDIA Endpoints, OpenAI, Anthropic, Google Gemini, and Ollama inference.

### Plurality / Audrey Tang

_No new content from either Plurality or Audrey Tang found in the last 24 hours._

- [plurality.net](https://plurality.net/) — Project homepage; no November 2026 activity surfaced.
- [Audrey Tang on Civic AI — P2P Foundation Wiki](https://wiki.p2pfoundation.net/Audrey_Tang_on_Civic_AI) — Current roles: Taiwan Cyber Ambassador at Large + TED 2026 Guest Curator + Columbia IGP Distinguished Fellow; 2025 Right Livelihood Laureate.
- [2026-07-31 Civic Wave](https://archive.tw/2026-07-31-civic-wave) — Most recent findable dated content: Tokyo workshop reconstruction (July 2026).

### NVIDIA Nemotron

- [NVIDIA Introduces Nemotron for Science — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-introduces-nemotron-for-science-to-accelerate-discoveries-with-agents) — Primary announcement (Nov 16, SC26 Chicago): Nemotron 3.5 Super VL (120B multimodal) + LitmusBench v0.2 chemistry dataset on Hugging Face for science agents.
- [NVIDIA Introduces Nemotron for Science — HPCwire](https://www.hpcwire.com/aiwire/2026/11/16/nvidia-introduces-nemotron-for-science-to-accelerate-discoveries-with-agents/) — SC26 context: adds scientific post-training recipes to the Nemotron 3.5 Super VL base; Nemotron Coalition collaboration.
- [NVIDIA Unveils Nemotron for Science at SC26 — CASRAI](https://casrai.org/news/nvidia-nemotron-for-science-litmusbench-sc26-2026) — LitmusBench v0.2 chemistry dataset and training recipes available on Hugging Face immediately.
- [Nvidia expands Nemotron LLM family — SiliconANGLE](https://siliconangle.com/2026/10/15/nvidia-expands-nemotron-llm-family-with-hyper-efficient-models-for-agentic-systems/) — Oct 15: Bolt 74B-A9B (24GB, edge agentic) + Bolt E4B (4GB) added alongside Super VL 120B, targeting a 4GB→120B span.
- [Every Nemotron AI Model Explained — Second Talent](https://www.secondtalent.com/resources/every-nemotron-ai-model-explained-compared/) — Model guide; confirms Nemotron models can be downloaded and run free in production per NVIDIA's Nov 2 statement.

### PolkaSharks

_No new content found in the last 24 hours._ Last known activity: Polkadot Decoded series through late 2024. No November 2026 publications surfaced in sweep. See [[entities/polkasharks]].

---

## Cross-links

**Existing pages this digest touches:**

- [[entities/nvidia]] — Nemotron for Science at SC26, NemoClaw alpha status
- [[concepts/nemotron]] — Nemotron 3.5 Super VL 120B + Bolt 74B-A9B + Bolt E4B 4GB; Nemotron for Science
- [[concepts/nemoclaw]] — still alpha; March 2026 launch background; supports Anthropic inference
- [[entities/polkadot]] — 97% strategy vote (dotUSD + mobile app), DOT ATL $0.6821, validator cut to 400
- [[entities/polkasharks]] — no new content this sweep
- [[entities/audrey-tang]] — Cyber Ambassador, TED 2026 Guest Curator; no November activity
- [[concepts/plurality]] — no November 2026 activity
- [[concepts/openclaw]] — 1-year anniversary; v2026.7.2 beta (late July, unverified); security challenges
- [[entities/peter-steinberger]] — leading OpenAI personal-agents division since Feb 2026
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — validator cut + DOT ATL stress-test for the fee-funded-security thesis
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Anthropic IPO + Fable 5.2/Mythos 5.2 launches update the closed-frontier US row
- [[synthesis/agent-runtime-orchestration-six-region]] — Claude Code Code Mode (JS tool calls) + Projects coordinator autonomy are runtime-layer changes

**New stub created this sweep:**

- [[entities/anthropic]] — mentioned 4+ times across digest (Claude Code, Anthropic keyword, OpenClaw rebrand history, NemoClaw inference support); stub created.
