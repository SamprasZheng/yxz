---
type: source
title: KOL + keyword digest — 2026-08-26
author: kol-daily-digest (automated)
date: "2026-08-26"
ingested: "2026-08-26"
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-08-26

## TL;DR

- **NVIDIA Nemotron 3.5 Lightning** (30B MoE, 4× faster output, single-GPU) released Aug 11 alongside **NeMo Switchyard** model router; Nemotron 4 (≥1 trillion parameters) reportedly targeting late-autumn 2026.
- **NemoClaw v0.0.110** (Aug 17) adds managed llama.cpp profile for Meta Muse Glimmer 30B + rootless Podman path; an Oasis Security local-Ollama prompt-injection vulnerability was patched in NemoClaw v0.0.35.
- **OpenClaw v2026.7.2** ships State Safety, Multimodal Memory, and Session Branching; GPT-5.6 Ultra support added Aug 24; OpenClaw Foundation nonprofit stewardship now official, reducing single-company dependence.
- **Anthropic** SF staff advised WFH Aug 25-26 (Allied Universal security contractor strike concern); Claude Code added public-beta self-hosted environments for Team/Enterprise plans; Anthropic changed data retention policy to give business customers greater data control.
- **Polkadot DOT** staking hits new ATH ~914M DOT; price +18.38% over 7 days; OpenGov 2.0 declared fully decentralized with community-controlled treasury; network activity spiked 17,200%.

---

## KOL updates

_KOL list is currently empty — no entries have been added under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml`. Add entries via the `kol-tracker` skill to begin tracking specific people and channels._

---

## Keyword sweep

### AI agents

- [AI Agents News — Week of August 25, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Google Cloud published agent-security guidance (Secure AI Frameworks, task-level provenance, human-in-the-loop) as the top gating issue for scaling autonomous workflows.
- [AI AGENT Act coverage](https://assindo.com/news/ai-agent-news-august-2026) — US Senate bill S.5051 (AI AGENT Act) and Google's Agent Payments Protocol (AP2) + NIST agent-identity work converging on verifiable, task-bounded authorization records for agents.
- [Microsoft ThinkingBox](https://aiagentstore.ai/ai-agent-news/this-week) — Microsoft released open-source ThinkingBox sandbox for testing whether AI agents perform reliably in repeated real-work conditions, not just one-off demos.
- [Voice AI surge](https://aiagentstore.ai/ai-agent-news/this-week) — Google, Apple, and voice AI startups all converged on agent-based calling capabilities (Google agents calling stores; Siri rebuilt); voice AI funding hit record highs.
- [Microsoft Project Perception public preview](https://aiagentsdirectory.com/news/ai-agents-news-brief-august-21-2026) — Cybersecurity-focused agent platform entered public preview on Aug 3 to help organizations detect and respond to threats via AI defenders.

### Claude Code

- [Claude Code self-hosted environments beta](https://releasebot.io/updates/anthropic/claude-code) — Anthropic added public-beta self-hosted environments for Claude Code (Team + Enterprise plans), enabling sessions on internal networks with custom tooling and compliance controls.
- [Claude Code Aug 22 update](https://releasebot.io/updates/anthropic/claude-code) — Improved cost estimates, cloud sessions, remote control, IDE/terminal workflows; new Bedrock and Alpine support; Python 1.x upgrade helper; better `/resume` and `/goal` behavior.
- [Claude Code as startup infrastructure](https://blog.mean.ceo/claude-code-news-august-2026/) — Analysis framing Claude Code as practical team infrastructure, not just a coding helper, following improvements to daily terminal work, code review, background jobs, and permissions.

### Anthropic

- [Anthropic SF WFH advisory Aug 25-26](https://www.explainx.ai/blog/anthropic-sf-wfh-security-strike-august-2026) — Anthropic instructed SF staff to work from home Aug 25-26 after its office security contractor (Allied Universal) warned of a possible strike; the guards' union said no strike was called.
- [Anthropic hardware push — Google chip veteran hire](https://www.bloomberg.com/latest/anthropic) — Anthropic tapped a Google chip veteran (reported Aug 22) as part of a push into custom AI hardware.
- [Anthropic data retention policy change](https://www.bloomberg.com/news/articles/2026-08-20/anthropic-plans-to-change-data-retention-policy-for-advanced-ai) — Anthropic plans to let business customers retain greater control of their data when using advanced AI models, reversing an earlier policy designed to mitigate cyberattacks.
- [Anthropic IPO ambition](https://www.bloomberg.com/latest/anthropic) — Reports surfaced (Aug 21) of Anthropic aiming for a valuation trajectory comparable to SpaceX's IPO record.

### OpenAI

- [OpenAI o3 retired from ChatGPT](https://openai.com/news/) — OpenAI retired the o3 model from ChatGPT on Aug 26, 2026, following a 90-day sunset period, to focus resources on newer models.
- [Russian "Burke Institute" influence cluster disrupted](https://openai.com/index/responding-next-frontier-critical-cyber-capabilities/) — OpenAI disrupted a Russian covert-influence cluster that used ChatGPT via VPNs to generate English-language social posts posing as a think tank called the "Burke Institute" across Substack, Telegram, X, Facebook, and LinkedIn.
- [Codex + ChatGPT Work 5-hour cap reinstated](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) — OpenAI reinstated a 5-hour usage cap on Codex and ChatGPT Work for Plus subscribers on Aug 25, after temporarily removing the restriction.

### Polkadot

- [DOT staking ATH ~914M DOT](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-25/18464) — Polkadot Cloud reports 880M+ DOT staked at ~2.9% APY; community tracking shows new ATH ~914M DOT following two-day unbonding and removal of nominator slashing.
- [OpenGov 2.0 fully decentralized](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-22/18449) — All treasury and upgrade decisions now in community hands via OpenGov 2.0; payments made automatically from network revenue pool.
- [Network activity spike 17,200%](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Daily transactions surged ~17,200% (from low base) on Aug 19, supporting a short-term price recovery; DOT up +18.38% over 7 days.
- [Tokenomics discussion — 2.1B cap + 53.6% issuance cut](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-23/18454) — Community discussion on DOT supply-control measures: 2.1B hard cap (Ref. 1710), ~53.6% reduction in annual issuance, Dynamic Allocation Pool changes reviewed.

### OpenClaw

- [OpenClaw v2026.7.2 — State Safety, Multimodal Memory, Session Branching](https://openclawnews.tech/the-openclaw-revolution-everything-new-in-the-august-2026-update/) — Major August update ships three headline features: State Safety (safer state handling), Multimodal Memory (cross-session memory for images/files), and Session Branching (fork and compare agent sessions).
- [GPT-5.6 Sol/Terra/Luna/Ultra support added Aug 24](https://releasebot.io/updates/openclaw) — OpenClaw and the Codex runtime now support GPT-5.6 Sol, Terra, Luna, and Ultra reasoning across all profiles.
- [OpenClaw Foundation nonprofit governance](https://blog.mean.ceo/openclaw-news-august-2026/) — A nonprofit steward now governs OpenClaw, reducing single-company dependence and enabling long-term trust if governance stays transparent.
- [Safer browser/network boundaries Aug 8](https://releases.sh/openclaw) — Sandboxed browser routes, trusted DNS targets, custom browser origins, and loopback provider endpoints now reject unsafe access paths.

### NemoClaw

- [NemoClaw v0.0.110 (Aug 17) — managed llama.cpp + rootless Podman](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/17) — Adds experimental managed llama.cpp profile for Meta Muse Glimmer 30B on DGX Spark; strengthens Portable OpenClaw path with rootless Podman lifecycle authority.
- [NemoClaw v0.0.108 (Aug 12) — read-only mounts + Muse Glimmer profile](https://docs.nvidia.com/nemoclaw/user-guide/hermes/release-notes/2026/8/12) — Adds read-only host mounts, experimental Muse Glimmer profile for DGX Spark, improved onboarding recovery, messaging credential rotation.
- [NemoClaw v0.0.105 (Aug 7) — inference path restoration](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/7) — Restores local and managed inference paths across Windows, Linux ARM64, DGX Spark, Ollama, vLLM, and managed llama.cpp; improved Shields recovery and Hermes operations.
- [Oasis Security local-Ollama vulnerability patched](https://thehackernews.com/2026/08/a-malicious-webpage-could-poison-your.html) — Oasis Security disclosed a weakness in NemoClaw that could let an attacker-controlled webpage take unauthenticated control of the local Ollama instance; patched in NemoClaw v0.0.35.

### Plurality

- [Audrey Tang at WebX 2026 (July 13-14)](https://x.com/WebX_Asia/status/2075444908077490497) — Tang spoke at WebX 2026 in her capacity as Plurality founder and Taiwan's Cyber Ambassador-at-large, framing cyberspace as a "conflict region" and Plurality as converting conflict into co-creation energy.
- [Audrey Tang × Glen Weyl at IE University](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/) — Tang and Weyl discussed "AI and Democracy," positioning digital democracy as a social technology; Plurality book remains the key reference charting a path between techno-libertarianism and centralized AI governance.
- [Mila AI Policy Conference closing keynote](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Tang delivered closing keynote "Towards Plurality" at the Mila AI Policy Conference 2026.

### Audrey Tang

- [Columbia University "Geopolitics of AI" panel (Aug 21)](https://x.com/audreyt) — Tang joined a panel with Melanie Hart, Kori Schake, Emmanuel Bacry, and Jean-Marie Guehenno to discuss the geopolitics of AI.
- [Post on scrutinizing open-source AI models (Aug 20)](https://x.com/audreyt) — Tang posted on social media arguing that free open-source AI models require active scrutiny rather than passive acceptance.
- [Carnegie Distinguished Fellow program 2026-27](https://x.com/audreyt) — Tang announced she is co-creating at Columbia University as a Carnegie Distinguished Fellow, partnering with peers during 2026-27.

### NVIDIA Nemotron

- [Nemotron 3.5 Lightning released (Aug 11) — 30B MoE, 4× speed](https://www.cnbc.com/2026/08/11/nvidia-releases-nemotron-3point5-lightning-open-source-ai-model-.html) — NVIDIA released Nemotron 3.5 Lightning: 30B-parameter MoE with 3B active parameters, 4× faster output vs peers, single-GPU deployable, open-source, designed for long-running agentic workloads.
- [NeMo Switchyard released alongside Lightning](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/) — NeMo Switchyard routes tasks to the cheapest/most appropriate AI model in the Nemotron family; companion product to Lightning targeting cost-aware agent deployments.
- [Nemotron 4 (≥1 trillion parameters) in development](https://techwireasia.com/2026/08/nvidia-nemotron-4-trillion-parameter-ai-model/) — Reports from The Information cite employees confirming Nemotron 4 is in development at ≥1T parameters, potentially ready in late autumn 2026; NVIDIA has not confirmed.
- [Nemotron 3.5 Lightning on Hugging Face](https://huggingface.co/nvidia) — Model weights published to Hugging Face by NVIDIA; accessible for self-hosted inference.

### PolkaSharks

_No new posts or announcements found for PolkaSharks in the last 24 hours. Channel monitoring is pending KOL list entry — add a channel URL via the `kol-tracker` skill to enable direct feed tracking._

---

## Cross-links

Existing wiki pages this digest touches:

- [[entities/nvidia]] — Nemotron 3.5 Lightning + NeMo Switchyard release; Nemotron 4 development
- [[concepts/nemotron]] — Nemotron 3.5 Lightning (30B MoE); NeMo Switchyard router; Nemotron 4 rumoured ≥1T
- [[concepts/nemoclaw]] — v0.0.105 / v0.0.108 / v0.0.110 updates; Oasis Security vulnerability patched
- [[concepts/openclaw]] — v2026.7.2 State Safety / Multimodal Memory / Session Branching; Foundation governance
- [[entities/audrey-tang]] — Columbia Geopolitics of AI panel (Aug 21); open-source AI scrutiny post (Aug 20); Carnegie Fellowship
- [[concepts/plurality]] — Mila AI Policy Conference keynote; WebX 2026; IE University discussion with Glen Weyl
- [[entities/polkadot]] — DOT staking ATH ~914M; OpenGov 2.0 fully decentralized; +18.38% 7-day price
- [[concepts/dot-hard-cap]] — Community discussion on 2.1B DOT cap + 53.6% issuance cut
- [[concepts/agile-coretime]] — OpenGov 2.0 treasury community control relevant to coretime burn mechanics
- [[entities/polkasharks]] — No new content; KOL channel not yet configured
- [[concepts/hermes-agent-framework]] — NeMo Switchyard is an adjacent model-routing tool in the NVIDIA agent stack
