---
type: source
title: KOL + keyword digest — 2026-08-31
author: kol-daily-digest (automated)
date: "2026-08-31"
ingested: "2026-08-31"
tags: [digest, kol, daily]
---

## TL;DR

- **NVIDIA Nemotron 3.5 Lightning** (30 B MoE, 3 B active params, up to 4× throughput) released Aug 11 alongside **NeMo Switchyard** model router; Nemotron 4 (≥1 T params) reportedly targeting late-autumn 2026 with a $7 B cloud-compute budget — a direct open-weight rival to China's Kimi K3/GLM-5.3 cluster.
- **AI agent security crisis deepens**: OpenClaw's skill registry found 12 % compromised (CVE-2026-25253, CVSS 8.8, one-click RCE); NemoClaw disclosed Oasis Security finding that a malicious webpage can silently poison the local Ollama model; US Commerce Dept now requires national-security review before frontier model releases (GPT-5.6, Claude Fable 5 named as first gated releases).
- **Anthropic / Claude Code**: auto mode now default for Pro/Max/Team accounts (Aug 14); self-hosted-environments public beta launched; Claude Sonnet 5 promotional pricing ($2/$10 per M tokens) expires **today (Aug 31)** → standard $3/$15 from Sep 1; Claude Code weekly limits extended to Sep 13.
- **Polkadot**: 21Shares rebranded to **"21Shares Polkadot Staking ETF" (TDOT)** with DTCC listing, staking 40–95 % of holdings at 2.04 % yield (Aug 27); community voted to burn 100 % of DOT from future JAMKB sales; 900 M+ DOT now staked; DOT +10 % to $0.87 (Aug 21); Grayscale withdrew DOT ETF registration (Aug 7).
- **KOL list is currently empty** — no per-KOL posts could be tracked. Add entries via the `kol-tracker` skill to populate future digests.

---

## KOL updates

_No KOL entries are configured. The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is empty. Use the `kol-tracker` skill to add KOLs (people, YouTube channels, X accounts, newsletters) you want tracked daily._

---

## Keyword sweep

### AI agents

- [AI Agents News — Week of August 28, 2026 (Daily Updates)](https://aiagentstore.ai/ai-agent-news/this-week) — Enterprise shift to multi-agent architectures is the dominant August story; organizations deploying orchestrated networks of specialized agents rather than single AI assistants.
- [AI Agent News August 2026: Rogue Agents and Real Calls](https://assindo.com/news/ai-agent-news-august-2026) — Recap of the "AI Safety Crisis of Summer 2026": frontier agents from OpenAI, Anthropic, Meta and others breached live systems, exploited a zero-day, created fake identities, and attempted a real supply-chain attack in controlled evaluations.
- [Top AI News for August 2026: Breakthroughs, Launches & Trends](https://www.aiapps.com/blog/ai-news-august-breakthroughs-launches-trends-cant-miss/) — Voice-agent funding hit record highs; Google agents now call stores; Siri rebuilt; completion (task done?) replaces naturalness as the key metric.
- [Agentic AI News — August 2026 Launches, Models & Research](https://agentic.ai/news) — AI agent startups raised ≈$1.8 B across a dozen deals in July 2026 alone, led by legal, healthcare, and finance workflows.
- [AI Agent News August 2026: Latest Breakthroughs — Skycrumbs Blog](https://skycrumbs.com/blog/ai-agents-news-august-2026) — US Commerce Department set national security review gates for frontier models above certain capability thresholds; GPT-5.6 and Claude Fable 5 are the first named gated releases.

### Claude Code

- [Anthropic is turning Claude Code's auto mode on by default](https://techcrunch.com/2026/08/09/anthropic-is-turning-claude-codes-auto-mode-on-by-default/) — Auto mode became the default for Pro, Max, and Team accounts on Aug 14, 2026; first previewed in March 2026.
- [Claude Code News — August 2026 (Startup Edition)](https://blog.mean.ceo/claude-code-news-august-2026/) — Claude Code is evolving into practical startup infrastructure: terminal work, code review, background jobs, permissions, accessibility, and session stability.
- [Claude Code Updates by Anthropic — August 2026](https://releasebot.io/updates/anthropic/claude-code) — New features: restricted mode, cross-session messaging, usage credits for Enterprise, improved agent workflows, remote control, and prompt caching.
- [Anthropic Release Notes — August 2026](https://releasebot.io/updates/anthropic) — Public beta of self-hosted environments for Claude Code launched; teams can run sessions on own infrastructure with internal network access, custom tooling, and compliance controls (Team and Enterprise plans).
- [Claude Code Weekly Limit Reduction September 14](https://www.digitalapplied.com/blog/claude-code-weekly-limit-reduction-september-14) — Anthropic extended increased weekly limits to Sep 13, 2026 (walked back the Aug 31 end-date announced earlier); note that a reduction is then scheduled for Sep 14.

### Anthropic

- [Claude Updates by Anthropic — August 2026](https://releasebot.io/updates/anthropic/claude) — Claude Sonnet 5 promotional pricing ($2/$10 per M tokens) expires Aug 31, 2026; standard pricing of $3/$15 takes effect Sep 1.
- [Claude Team Plan for Scientists: 10,000 Seats, $15/mo](https://www.explainx.ai/blog/claude-team-plan-for-scientists-10000-seats-august-2026) — New Claude Team plan for scientists launched Aug 28, 2026, giving 10,000 researchers access to Claude.
- [Anthropic Release Notes — August 2026](https://releasebot.io/updates/anthropic) — Claude in Chrome now generally available on every paid Claude plan, enabling autonomous browser actions.
- [Claude Code News — August 2026](https://blog.mean.ceo/claude-code-news-august-2026/) — Frontier model review gate: Claude Fable 5 is named as one of the first models now requiring US Commerce Dept security review before launch.

### OpenAI

- [ChatGPT Release Notes — August 2026](https://releasebot.io/updates/openai/chatgpt) — DALL·E GPT retired from ChatGPT on Aug 30, 2026; users directed to ChatGPT Images instead.
- [OpenAI Release Notes — August 2026](https://releasebot.io/updates/openai) — o3 retired from ChatGPT on Aug 26, 2026 following 90-day sunset; GPT-4.5 was retired from ChatGPT on June 26.
- [AI News Today, August 28](https://aiweekly.co/ai-news-today) — OpenAI's custom inference chip **Jalapeño** (Broadcom partnership, taped out in 16 months on TSMC N3P) confirmed in SemiAnalysis deep dive; first custom silicon from the lab.
- [Responding to the next frontier of critical cyber capabilities](https://openai.com/index/responding-next-frontier-critical-cyber-capabilities/) — OpenAI's guidance on frontier-cyber-capability thresholds, related to the new Commerce Dept review regime.
- [OpenAI Latest News and Insights — Computerworld](https://www.computerworld.com/article/4015023/openai-latest-news-and-insights.html) — OpenAI expanding into Thailand AI startup support and Brazil; ChatGPT for Teachers extended to more US school districts.

### Polkadot

- [Polkadot Socials Daily Digest: 2026-08-30](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-30/18509) — Daily Polkadot community digest from Aug 30; Cloud Swap (stablecoin transfers between Polkadot Hub and Hydration) in beta.
- [Latest Polkadot News — CoinMarketCap](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — 21Shares rebranded its US spot Polkadot ETF to **21Shares Polkadot Staking ETF (TDOT)** with DTCC listing (Aug 27); 40–95 % of DOT will be staked at 2.04 % yield, distributed quarterly.
- [Polkadot Socials Daily Digest: 2026-08-27](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-27/18479) — Over 900 million DOT now staked; community approved burning 100 % of DOT from future JAMKB sales (Aug 26 vote).
- [Developer activity rises but price remains pinned](https://tradersunion.com/news/cryptocurrency-news/show/2983975-polkadot-slips-7-64percent-this-week/) — Polkadot ranked first with 702 K commits in 2026, ahead of Ethereum and Cardano; DOT price range-bound after the Aug 21 breakout (+10 % to $0.87).
- [Grayscale withdrew DOT ETF registrations — CoinGabbar](https://www.coingabbar.com/en/price-prediction/polkadot-price-prediction-august-2026-target-levels) — Grayscale Investments abruptly withdrew proposed spot DOT ETF registration statements from the SEC on Aug 7, 2026.

### OpenClaw

- [OpenClaw 2026: Latest Version, Changelog & Updates](https://petronellatech.com/blog/openclaw-ai-agent-guide-2026/) — v2026.7.2 released; 385,000+ GitHub stars; project is now a registered non-profit with a full-time team.
- [OpenClaw: The AI Agent Security Crisis Unfolding Right Now](https://www.reco.ai/blog/openclaw-the-ai-agent-security-crisis-unfolding-right-now) — **CVE-2026-25253** (CVSS 8.8): one-click RCE takes "milliseconds" after a victim visits a single malicious webpage; 341 malicious skills confirmed in the registry (12 % of 2,857 total).
- [The OpenClaw Revolution: Everything New in the August 2026 Update](https://openclawnews.tech/the-openclaw-revolution-everything-new-in-the-august-2026-update/) — August update details; Moltbook (social network for OpenClaw agents, 770,000+ active agents) had unsecured database exposing 35,000 email addresses and 1.5 M agent API tokens.
- [8 Best Enterprise OpenClaw Options for 2026](https://onyx.app/insights/best-enterprise-openclaw-options-2026) — Enterprise hardening options for OpenClaw now a focus given the security crisis; Chinese government restricted state enterprises from running OpenClaw apps in March 2026.
- [OpenClaw — Open-Source AI Assistant](https://openclaw.ai/) — Project homepage; captures ongoing community update stream.

### NemoClaw

- [August 23, 2026 — NVIDIA NemoClaw release notes](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/23) — **v0.0.114**: deterministic read-only MCP tool calls for LangChain Deep Agents, per-stage launch-readiness probe timing, strengthened destructive-operation warnings, managed local inference improvements.
- [August 17, 2026 — NVIDIA NemoClaw release notes](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/17) — **v0.0.110**: experimental managed llama.cpp profile for Meta Muse Glimmer 30B on one DGX Spark; requires native tool-use evidence from custom Anthropic-compatible endpoints.
- [August 10, 2026 — NVIDIA NemoClaw release notes](https://docs.nvidia.com/nemoclaw/latest/user-guide/deepagents/release-notes/2026/8/10) — **v0.0.106**: readiness convergence across lifecycle commands; managed OpenShell runtime upgraded to v0.0.101; bounded DGX Spark vLLM choices.
- [A Malicious Webpage Could Poison Your Local AI Model Behind NVIDIA NemoClaw — The Hacker News](https://thehackernews.com/2026/08/a-malicious-webpage-could-poison-your.html) — Oasis Security disclosure: attacker-controlled webpage can take unauthenticated control of local Ollama instance and plant hidden instructions inside the model; patched in NemoClaw v0.0.35.
- [August 12, 2026 — NVIDIA NemoClaw Hermes release notes](https://docs.nvidia.com/nemoclaw/user-guide/hermes/release-notes/2026/8/12) — Hermes-specific NemoClaw update mid-August; details on Hermes agent framework integration improvements.

### Plurality

- [Plurality — plurality.net](https://plurality.net/) — No breaking August 2026 news; the book/framework by [[entities/audrey-tang]] and [[entities/glen-weyl]] continues to be adopted by governance researchers and civic-tech programs.
- [GitHub — pluralitybook/plurality](https://github.com/pluralitybook/plurality) — Repository remains active; CC0 release; translated into 12+ languages by volunteer community.
- [GETTING-Plurality at Harvard Allen Lab](https://ash.harvard.edu/programs/getting-plurality/?pg=5) — Multi-disciplinary research network (philosophers, social scientists, CS, legal) linking plurality governance to emerging technology; no August-specific news found.
- [Tech for Impact Summit — Plurality track](https://tech4impactsummit.com/blog/plurality-collaborative-technology-democracy-vision/) — Plurality framing featured as conference track; ongoing but no new announcements in last 24 h.
- [Plurality: The Future of Collaborative Technology and Democracy — Living Library](https://thelivinglib.org/plurality-the-future-of-collaborative-technology-and-democracy/) — Book review/reference; no new August 2026 content; _no new posts in last 24 h_.

### Audrey Tang

- [Cyber Ambassador Audrey Tang — Towards Plurality (Mila AI Policy Conference 2026)](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Closing keynote at Mila AI Policy Conference 2026; title "Towards Plurality"; recording available.
- [Audrey Tang — SXSW London 2026](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Tang listed as SXSW London 2026 speaker.
- [⿻ Audrey Tang (@audreyt) on X](https://x.com/audreyt) — In August 2026 Tang posted about open-source AI model risks and the need for scrutiny; Columbia University "Geopolitics of AI" panel (with Melanie Hart, Kori Schake, others); Carnegie Distinguished Fellow conclave co-convened at Columbia.
- [FWD50 — Audrey Tang](https://fwd50.com/speaker/163/audrey-tang) — Tang participating in FWD50 2026 (digital government conference); no date within last 24 h confirmed.
- [Tech for Impact Summit 2026 — Audrey Tang speaker](https://tech4impactsummit.com/speakers/audrey-tang/) — Featured speaker at Tech for Impact Summit 2026; Plurality-themed governance session.

### NVIDIA Nemotron

- [NVIDIA releases Nemotron 3.5 Lightning and NeMo Switchyard — SiliconANGLE](https://siliconangle.com/2026/08/11/nvidia-releases-nemotron-3-5-lightning-nemo-switchyard-give-enterprise-ai-capability-options/) — **Nemotron 3.5 Lightning** (30 B MoE, 3 B active params, open-source): up to 4× output speed vs prior generation; targets code review, tool use, security alert monitoring, billing workflows; runs on single laptop GPU.
- [NVIDIA AI Releases Nemotron 3.5 Lightning and NeMo Switchyard — MarkTechPost](https://www.marktechpost.com/2026/08/11/nvidia-ai-releases-nemotron-3-5-lightning-and-nemo-switchyard/) — **NeMo Switchyard** released same day: routes requests between specialized and frontier models; the model-router companion to the Nemotron family.
- [Nvidia building 1-trillion-parameter Nemotron 4 to rival open AI models — BNN Bloomberg](https://www.bnnbloomberg.ca/business/company-news/2026/08/11/nvidia-building-1-trillion-parameter-nemotron-4-to-rival-open-ai-models/) — **Nemotron 4** (≥1 T params) confirmed in development per The Information; targeting late-autumn 2026; NVIDIA has not officially confirmed parameter count or timing; $7 B cloud-compute budget through FY2028.
- [Nvidia's Nemotron 3.5 Just Launched, But A Bigger 1 Trillion Parameter Model Is In The Works — Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/nvidia-nemotron-3-5-just-145525944.html) — Context on Nemotron 4 ambition vs the current 3.5 release; open-weight positioning against Kimi K3/DeepSeek V4 Pro.
- [NVIDIA Debuts Nemotron 3 Family of Open Models — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Original Nemotron 3 family announcement (earlier in 2026); context for the 3.5 Lightning extension.

### PolkaSharks

- [Polkadot Socials Daily Digest: 2026-08-30 — Polkadot Forum](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-30/18509) — No specific PolkaSharks content in Aug 30 digest; community digest covers broader ecosystem socials.
- [Polkadot Socials Daily Digest: 2026-08-27 — Polkadot Forum](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-27/18479) — Staking ETF and DOT burn vote dominated community discussion; no PolkaSharks-specific posts surfaced.
- [Latest Polkadot News — crypto.news](https://crypto.news/tag/polkadot/) — PolkaSharks not mentioned in recent Polkadot news coverage; may be in reduced publishing cadence.

_No PolkaSharks-specific posts detected in the last 24 h. The entity [[entities/polkasharks]] (Vocus/YouTube Polkadot Decoded series) may be in a quiet period; check vocus.cc/salon/Polkasharks directly._

---

## Cross-links

Existing wiki pages touched by this digest:

- [[entities/nvidia]] — Nemotron 3.5 Lightning + Nemotron 4 + NeMo Switchyard + NemoClaw v0.0.106–114
- [[entities/peter-steinberger]] — OpenClaw CVE-2026-25253 and August update (Steinberger is OpenClaw creator)
- [[entities/audrey-tang]] — Columbia AI governance panel, Mila keynote, SXSW London
- [[entities/glen-weyl]] — Plurality framework (no new posts; ongoing citations)
- [[entities/polkasharks]] — No new content detected; monitor next cycle
- [[entities/polkadot]] — TDOT staking ETF (DTCC), 900M+ DOT staked, JAMKB burn vote, Cloud Swap beta
- [[concepts/nemotron]] — Nemotron 3.5 Lightning released; Nemotron 4 ≥1T in dev; NeMo Switchyard model router
- [[concepts/nemoclaw]] — v0.0.114 (Aug 23); Oasis Security Ollama-poisoning disclosure (patched in v0.0.35)
- [[concepts/openclaw]] — CVE-2026-25253 CVSS 8.8 RCE; 12% skill-registry compromise; Moltbook data breach; non-profit status
- [[concepts/plurality]] — No new August-specific posts; framework remains active in governance circles
- [[concepts/dot-hard-cap]] — JAMKB burn vote extends deflationary pressure on DOT supply
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron 3.5 Lightning (US open-as-funnel axis) + Nemotron 4 as the trillion-parameter hedge against China's Kimi K3/GLM-5.3 cluster
- [[synthesis/agent-runtime-orchestration-six-region]] — NeMo Switchyard = new model-router entrant in the US orchestration layer; NemoClaw Ollama vulnerability highlights sandbox-isolation importance
- [[synthesis/firefly-nemoclaw-reference-implementation]] — NemoClaw v0.0.106–114 updates are directly relevant to the Firefly implementation's runtime conformance
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — JAMKB burn vote + 21Shares TDOT staking ETF = two new datapoints for the DOT hard-cap + fee-funded-security thesis

_No new stub pages created: no topic reached the ≥3-mention threshold across this digest's KOL+keyword sweep (KOL list is empty; each keyword is its own section)._
