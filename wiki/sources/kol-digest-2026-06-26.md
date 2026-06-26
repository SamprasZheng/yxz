---
type: source
title: KOL + keyword digest — 2026-06-26
author: kol-daily-digest (automated)
date: 2026-06-26
ingested: 2026-06-26
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-06-26

## TL;DR

- **KOL list is empty** — `kols:` in `.claude/skills/kol-tracker/kol-list.yaml` has no entries, so this run is keyword-sweep only. Add entries via the kol-tracker skill to get per-channel coverage.
- **Anthropic accuses Alibaba/Qwen of large-scale illicit Claude distillation** — 25,000 fake accounts, 28.8M exchanges, April–June 2026, reported to US senators and the White House. The single biggest Anthropic story of the sweep.
- **NVIDIA's BioNeMo Agent Toolkit (June 23) welds Nemotron + NemoClaw + OpenShell into a life-sciences agent stack**, with Anthropic and OpenAI both named as integrating partners — notable cross-vendor convergence on the NemoClaw runtime.
- **OpenAI shipped its first custom silicon** ("Jalapeño," with Broadcom, June 25) and **GPT-5.5-Cyber**, which leads the CyberGym benchmark (85.6%) ahead of Anthropic's reported "Mythos 5" (83.8%) — direct competitive framing against Anthropic in the same week as the Alibaba accusation.
- **Polkadot sentiment has turned sharply bearish** (bullish:bearish comment ratio 6.39:1 → 1.18:1 over a month) even as referenda #1909/#1910 propose a major staking overhaul (no nominator slashing, 48h unbonding, 0% commission, self-stake-funded validator rewards).
- **PolkaSharks and Plurality keyword sweeps returned no genuine new content** — search noise only (Polk County FL/IA government pages; unrelated US/world headlines). Worth flagging as a tracking gap if these terms matter going forward.

## KOL updates

_No KOLs are currently tracked — `kols:` in `kol-list.yaml` is empty. Use the kol-tracker skill ("add KOL") to populate it; this section will list per-channel updates once entries exist._

## Keyword sweep

### AI agents

- [Aampe AI agent platform processes 200B+ decisions/week](https://unrot.co/blogs/today-top-10-ai-news-june-25-2026) — production deployments at Grab, Swiggy, ZenBusiness, Taxfix; cited as evidence of enterprise-scale agent adoption.
- [AI agent software spend projected at $206.5B in 2026](https://www.buildfastwithai.com/blogs/ai-news-today-june-25-2026) — up 139% YoY from $86.4B in 2025, the fastest-growing enterprise software category.
- [Google DeepMind publishes an AI Control Roadmap](https://www.buildfastwithai.com/blogs/ai-news-today-june-25-2026) — defense-in-depth framework for production agents: MITRE ATT&CK-based threat taxonomy, supervisor AIs monitoring agent reasoning, coverage/time-to-response metrics.
- [Elogic Commerce to launch five Claude-powered offerings in July 2026](https://www.buildfastwithai.com/blogs/ai-news-today-june-25-2026) — AI strategy sessions, commerce readiness assessments, internal copilots, assistants, workflow automation pilots.
- [Daily AI Agent News tracker](https://aiagentstore.ai/ai-agent-news/this-week) — rolling 7-day digest; over a third of enterprises projected to integrate streaming data with agentic inference by 2028.

### Claude Code

- [Claude Code: /rewind support + reliability pass](https://code.claude.com/docs/en/whats-new) — resume conversations from before `/clear`, fixed scroll-jump during streaming, improved MCP resilience/OAuth handling, smarter sandbox prompts, lower CPU/memory on long sessions.
- [Anthropic launches Claude Tag on Slack](https://www.anthropic.com/news) — beta team workspace: tag @Claude into channels, delegate tasks, connect tools/data/codebases; Enterprise + Team tiers.
- [Anthropic eng leader: Claude Code made work "a lonely experience"](https://fortune.com/2026/06/23/anthropic-engineering-head-claude-code-lonely-experience-big-tech-morale/) — heavy agentic-coding adoption reduced peer interaction; company runs hackathons + pair-programming lunches as a counter.

### Anthropic

- [Anthropic accuses Alibaba of "illicitly" accessing Claude](https://www.bloomberg.com/news/articles/2026-06-24/anthropic-accuses-alibaba-of-illicitly-accessing-its-ai-models) — letter to US senators/White House; Qwen-linked operators allegedly used 25,000 fake accounts and 28.8M exchanges (April–June 2026) to distill Claude's software-engineering and agentic-reasoning capability.
- [Tom's Hardware: distillation-campaign details](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-claims-that-chinas-alibaba-illicitly-distilled-its-models-from-april-to-june-2026-says-effort-involved-25-000-fake-accounts-and-28-8-million-exchanges-on-claude) — same story, additional figures.
- [John Jumper to leave Google DeepMind for Anthropic](https://www.cnbc.com/2026/06/19/john-jumper-to-leave-google-deepmind-for-anthropic.html) — plus Bloomberg reporting two more DeepMind researchers (Jonas Adler, Alexander Pritzel) moving to Anthropic.

### OpenAI

- [OpenAI + Broadcom unveil "Jalapeño" inference chip](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/) — first custom AI accelerator, design-to-tape-out in 9 months, initial deployment targeted end of 2026.
- [GPT-5.5-Cyber launched June 22, centerpiece of Daybreak cybersecurity initiative](https://openai.com/index/daybreak-securing-the-world/) — 85.6% on CyberGym (highest single-model score recorded), ahead of base GPT-5.5 (81.8%) and Anthropic's reported "Mythos 5" (83.8%); gated via Trusted Access for Cyber (Akamai, Cisco, Cloudflare, CrowdStrike, Fortinet, Oracle, Palo Alto, Zscaler + government/academic applicants).
- [TechCrunch: Jalapeño chip coverage](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/) — OpenAI framed as "building the full stack" via the Broadcom partnership.

### Polkadot

- [Polkadot Socials Daily Digest — 2026-06-25](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-06-25/17933) — referenda #1909/#1910 live: remove nominator slashing, cut unbonding to 48h, move to 0% validator commission funded by self-stake.
- [CoinMarketCap CMC AI: Polkadot outlook](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — bullish:bearish social-sentiment ratio fell from 6.39:1 (May 18) to 1.18:1 (June 18); TDOT spot ETF flat for 8 straight sessions vs SOL/XRP ETF inflows.
- Web3 Summit 2026 (Berlin, June 18–19) — Polkadot participation, JAM upgrade demoed (carried over from prior-week coverage, surfaced again in this sweep).

### OpenClaw

- [OpenClaw 2026.6.11 release notes](https://buttondown.com/openclaw-newsletter/archive/openclaw-newsletter-2026-06-23/) — Slack relay mode, native Mattermost `/oc_queue`, per-DM model overrides, `openclaw agent --message-file`, RAFT CLI wake bridge; 310,000+ GitHub stars.
- [Prosus builds an OpenClaw rival to dodge EU privacy rules](https://www.bloomberg.com/news/articles/2026-06-23/prosus-develops-openclaw-rival-to-avoid-europe-privacy-concerns) — rolling out this week.
- [Microsoft launches Scout, an OpenClaw-inspired personal assistant](https://techcrunch.com/2026/06/02/microsoft-launches-scout-an-openclaw-inspired-personal-assistant/) — built on the OpenClaw framework, targeting Microsoft 365.
- [Linux Journal: "OpenClaw in 2026" adoption explainer](https://www.linuxjournal.com/content/openclaw-2026-what-it-whos-using-it-and-whether-your-business-should-adopt-it) — solo-founder / small-team positioning as a local agent that acts on files, browsers, scripts, messaging — not just chat.

### NemoClaw

- [NVIDIA BioNeMo Agent Toolkit announced (June 23)](https://nvidianews.nvidia.com/news/nvidia-launches-bionemo-agent-toolkit-giving-ai-agents-the-tools-to-accelerate-scientific-discovery) — Nemotron + NemoClaw + OpenShell + BioNeMo for biology/chemistry/genomics/drug discovery; adopters include Dassault Systèmes, Databricks, Lilly, Schrödinger, Snowflake, UW Medicine IPD; **Anthropic and OpenAI both named as integrating partners**.
- [JetPack 7.2 ships one-command NemoClaw deployment](https://letsdatascience.com/news/nvidia-releases-jetpack-72-with-nemoclaw-support-a20d72d2) — announced at GTC Taipei June 1; CUDA 13 on Orin, Yocto Project support, MIG on Jetson Thor, "Super Mode" for AGX Orin 32GB.
- [NemoClaw demoed on-prem at Dell TechWorld (June 22)](https://nvidianews.nvidia.com/) — Jensen Huang + Dell leadership on the Dell AI Factory partnership; physical-AI/robotics demos alongside agentic AI.

### Plurality

_Search noise only — results were generic US/world political headlines (Venezuela earthquakes, US budget news, Gaza/Lebanon) unrelated to the Audrey Tang / Glen Weyl Plurality framework. No genuine new content today; see the Audrey Tang section below for the closest related signal._

### Audrey Tang

- [MIT Solve profile: "build a bigger steering wheel for AI"](https://solve.mit.edu/articles/tse-audrey-tang) — pushing government-trust metrics toward 70%, designing civic tech meant to converge rather than polarize (published ~early June 2026).
- Oxford Accelerator Fellowship Programme — Tang is serving on Oxford's fellowship addressing digital democracy and **Plurality** in collaborative governance (cross-reference for the dead Plurality keyword sweep above).
- [Global Campus of Human Rights interview, 2025 Right Livelihood Laureate](https://www.gchumanrights.org/gc-news/conversations/interview-with-audrey-tang-2025-rightlivelihood-laureate/) — technology/democracy/human-rights discussion (published 2026-05-26, resurfacing in this sweep).

### NVIDIA Nemotron

- [NVIDIA debuts Nemotron 3 Ultra at Computex 2026 (June 1)](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — 550B total / 55B active params; Artificial Analysis Intelligence Index score 48, the highest of any US open model reported to date.
- [Nemotron 3 Nano Omni: unified multimodal model](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — vision + audio + language in one model, up to 9x efficiency gain for agentic workloads.
- [NVIDIA launches the Nemotron Coalition](https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models) — inaugural members Black Forest Labs, Cursor, LangChain, Mistral AI, Perplexity, Reflection AI, Sarvam, Thinking Machines Lab.

### PolkaSharks

_No relevant results — search returned only unrelated "Polk County" (FL/IA) government pages. No PolkaSharks-specific content surfaced in this sweep._

## Cross-links

- [[entities/anthropic]] · [[entities/openai]] — both surfaced 3+ times across this sweep (Claude Code, Anthropic, OpenAI, NemoClaw/BioNeMo, Nemotron sections) and previously had no dedicated wiki entry; created as stubs from this digest, pending full ingest.
- [[entities/nvidia]] — Nemotron 3 family, NemoClaw, BioNeMo Agent Toolkit, JetPack 7.2, Nemotron Coalition.
- [[concepts/nemotron]] — Nemotron 3 Ultra / Nano Omni / Coalition updates extend the existing Nemotron lineage coverage.
- [[concepts/nemoclaw]] — BioNeMo Agent Toolkit and JetPack 7.2 deployment news extend existing NemoClaw coverage.
- [[concepts/openclaw]] — 2026.6.11 release, Prosus rival, Microsoft Scout.
- [[entities/polkadot]] — referenda #1909/#1910 staking overhaul, sentiment data.
- [[entities/polkasharks]] — keyword sweep target; no new content this run.
- [[entities/audrey-tang]] — MIT Solve profile, Oxford Plurality fellowship.
- [[concepts/plurality]] — cross-referenced via the Audrey Tang Oxford fellowship item; the standalone "Plurality" keyword returned no usable signal today.
