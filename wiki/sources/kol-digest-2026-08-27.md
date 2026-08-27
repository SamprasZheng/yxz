---
type: source
title: KOL + keyword digest — 2026-08-27
author: kol-daily-digest (automated)
date: "2026-08-27"
ingested: "2026-08-27"
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-08-27

## TL;DR

- **Anthropic ARR hit $65B** (up from $47B in May, $9B at end-2025) with an IPO filing expected as soon as end-August; Claude Code shipped a `/design` artboard-editor skill (Aug 17) and now supports `ANTHROPIC_DEFAULT_MODEL`, accelerating its shift from coding assistant to full terminal workspace.
- **NVIDIA released Nemotron 3.5 Lightning** (Mamba-2 + Transformer MoE, 30B total / 3B active, 1M-token context) — Jensen Huang's first open-model release since endorsing the approach in July; Nemotron 4 (1T params) is in training for late-fall; NemoClaw shipped v0.0.105→v0.0.114 across August adding OpenShell v0.0.101, deterministic read-only MCP calls for LangChain Deep Agents, and a Muse Glimmer 30B llama.cpp profile.
- **OpenAI paused "Astra"** after the model hit a critical cybersecurity capability threshold; also open-sourced Harness (Codex engine, 6× cheaper agent token costs), cut GPT-5.6 Sol pricing >20%, and launched Jalapeño inference (industry-leading speed, Aug 25).
- **Polkadot**: Grayscale withdrew its DOT spot ETF registration (Aug 7); DOT rally cooled at $1.04; Hydration TVL +10.1% to $56.6M; Cloud Swap moved to beta (Hub ↔ Hydration stablecoin transfers); ~200 new apps on Devnet — ecosystem building amid price softness.
- **KOL list is empty** — no channel URLs are tracked yet. Add entries via the `kol-tracker` skill to populate the KOL updates section in future runs.

---

## KOL updates

_The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is currently empty (seed list only). No KOL channels were swept. Use the `kol-tracker` skill to add entries (name, handle, channels, why) so future digests include individual KOL posts._

---

## Keyword sweep

### AI agents

- [AI Agents News Brief: August 21, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-august-21-2026) — Enterprise shift to multi-agent orchestration is the dominant August story; autonomous agents now run real workloads (not demos) across enterprise software, healthcare, logistics, and finance.
- [OpenAI open-sources Harness (Codex engine)](https://techcrunch.com/2026/08/20/openai-is-gaining-on-anthropic-with-business-users-new-data-indicates/) — Reduces AI agent token costs sixfold; originally the engine behind Codex; now available to third-party developers.
- [L&T Technology Services launches AgenticIQ](https://aiagentstore.ai/ai-agent-news/2026-august) — End-to-end agentic AI platform for engineering and manufacturing, enabling autonomous multi-agent workflows.
- [Google Cloud agent-security guidance](https://aiagentsdirectory.com/news/ai-agents-news-brief-august-21-2026) — Frames agent security as the top gating issue for enterprise adoption; recommends Secure AI Frameworks, task-level provenance, and human-in-the-loop checks.
- [Google consumer agents call stores for you](https://assindo.com/news/ai-agent-news-august-2026) — Voice agent functionality landed at Google, Apple (Siri rebuild), and multiple well-funded startups simultaneously; voice AI funding hit record highs.

### Claude Code

- [/design skill released Aug 17 (research preview)](https://origami.sa/en/blog/claude-code-august-2026/) — Converts ideas, screenshots, or existing designs into editable artboards inside Claude Design; Claude Code is becoming a wider workspace beyond coding.
- [ANTHROPIC_DEFAULT_MODEL env var support added](https://releasebot.io/updates/anthropic/claude-code) — Also: new `/usage` loop breakdowns, model picker and pricing controls; background session stability fixes.
- [Claude Code August 2026 changelog](https://www.gradually.ai/en/changelogs/claude-code/) — MCP, remote-control, and VSCode session fixes; code review, background jobs, permissions, and accessibility improvements across the month.
- [Claude Code as startup infrastructure](https://blog.mean.ceo/claude-code-news-august-2026/) — Framed as production infrastructure for startups: faster bug fixes, cheaper experiments, better repo understanding, fewer contractor hours for routine tasks.

### Anthropic

- [Anthropic ARR surges to $65B ahead of IPO](https://techcrunch.com/2026/08/17/anthropics-annualized-revenue-surges-to-65b/) — Annualized revenue run rate hit $65B at end of July (up from $47B in May, $9B at end-2025); investors project $100–120B by year-end.
- [Anthropic IPO filing expected as soon as end of August](https://www.bloomberg.com/news/articles/2026-08-17/anthropic-revenue-run-rate-surpasses-65-billion-ahead-of-ipo) — Could match or exceed SpaceX's record-setting public debut; people familiar with preparations cited Bloomberg.
- [Google chip veteran hired for hardware push](https://techstartups.com/2026/08/21/top-tech-news-today-august-21-2026-anthropic-apple-broadcom-google-nvidia-openai-tesla-more/) — Anthropic tapped the executive as part of a push into custom silicon; no further details publicly available.
- [Claude Mythos 5 added to Claude Security for Enterprise](https://releasebot.io/updates/anthropic) — Expands frontier cyber defense with codebase scans, vulnerability findings, and suggested patches; targets enterprise security teams.

### OpenAI

- [OpenAI slows Astra model development over security concerns](https://techcrunch.com/2026/08/07/openai-says-it-slowed-astra-model-development-over-security-concerns/) — Astra hit OpenAI's "critical cybersecurity threshold" — it could independently identify and carry out cyberattacks against well-protected systems; internal review triggered the pause.
- [Jalapeño inference results: industry-leading speed and efficiency (Aug 25)](https://deploymentsafety.openai.com/gpt-5-6-august-update) — First public benchmark results for OpenAI's Jalapeño inference stack; framed as a step-change in token throughput.
- [GPT-5.6 Sol API and credit pricing cut >20% for 3 months](https://deploymentsafety.openai.com/gpt-5-6-august-update) — Pricing reduction in effect; OpenAI is gaining on Anthropic with US business users in Q3 according to Ramp spend data.
- [Admin plugin for ChatGPT Work and Codex launched (Aug 25)](https://openai.com/news/product-releases/) — Adds enterprise admin controls; AI Futures also launched Aug 20.
- [DALL-E GPT retiring Aug 30; ChatGPT Images is the replacement](https://releasebot.io/updates/openai/chatgpt) — Users advised to download images before the cutoff; GPT-based image generation moving to the native ChatGPT Images feature.

### Polkadot

- [DOT rally cooled at $1.04 with $443.94K long liquidations](https://tradersunion.com/news/cryptocurrency-news/show/2983975-polkadot-slips-7-64percent-this-week/) — Broke out of multi-month descending channel but pulled back sharply; $0.83–$0.94 zone now critical for recovery confirmation.
- [Grayscale withdraws DOT spot ETF registration (Aug 7)](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Abrupt withdrawal of SEC registration statements; reflects ongoing US regulatory uncertainty around crypto-based funds.
- [Hydration TVL +10.1% to $56.6M (Aug 24)](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-22/18449) — Polkadot's largest DeFi protocol grew TVL month-over-month despite broader ecosystem challenges; Omnipool + Aave-v3 + HOLLAR composite strength.
- [Cloud Swap moved into beta — Hub ↔ Hydration stablecoin transfers live](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-26/18468) — Enables stablecoin transfers between Polkadot Hub and Hydration; coretime/JAM architectural discussion also active.
- [~200 new apps on Polkadot Devnet](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Developer activity rising; transaction count surge noted Aug 25, though from a low baseline; validator commission post-reform discussions ongoing.

### OpenClaw

- [OpenClaw 2026.7.2 released — crash-recoverable data, session rewind/fork](https://openclawnews.tech/the-openclaw-revolution-everything-new-in-the-august-2026-update/) — Persisted data now survives primary-database damage with quarantine store + crash-recoverable snapshots; sessions can be rewound or forked from individual messages.
- [GPT-5.6 Sol, Terra, Luna, Ultra reasoning support added](https://openclawnews.tech/the-openclaw-revolution-everything-new-in-the-august-2026-update/) — Multi-model reasoning support now ships across OpenClaw and the Codex runtime; 385,000+ GitHub stars.
- [`openclaw attach` command for Codex-style workflow resumption](https://releases.sh/openclaw) — Launches an external harness against an existing Gateway session; enables interactive Codex-style workflows to be resumed and inspected.
- [Multi-platform triage: WhatsApp, Discord, Slack, Telegram](https://openclawnews.tech/the-openclaw-revolution-everything-new-in-the-august-2026-update/) — OpenClaw can now triage inboxes, prep research, and handle routine ops across major messaging platforms.

### NemoClaw

- [NemoClaw v0.0.105 (Aug 7) — inference path restoration](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/7) — Restored local and managed inference paths across Windows, Linux ARM64, DGX Spark, Ollama, vLLM, and managed llama.cpp.
- [NemoClaw v0.0.106 (Aug 10) — OpenShell runtime upgraded to v0.0.101](https://docs.nvidia.com/nemoclaw/latest/user-guide/deepagents/release-notes/2026/8/10) — Converged readiness across lifecycle commands; added bounded DGX Spark vLLM choices.
- [NemoClaw v0.0.108 (Aug 12) — read-only host mounts + Muse Glimmer profile](https://docs.nvidia.com/nemoclaw/user-guide/hermes/release-notes/2026/8/12) — Adds read-only host mounts and an Experimental Muse Glimmer profile for DGX Spark.
- [NemoClaw v0.0.110 (Aug 17) — Meta Muse Glimmer 30B via managed llama.cpp on DGX Spark](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/17) — Experimental profile; first managed llama.cpp inference path for a third-party model.
- [NemoClaw v0.0.114 (Aug 23) — deterministic read-only MCP tool calls for LangChain Deep Agents](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/23) — Adds per-stage launch-readiness probe timing; deterministic MCP calls improve reproducibility for agent pipelines.

### Plurality

- [Audrey Tang delivers "Towards Plurality" closing keynote at Mila AI Policy Conference 2026](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Most recent public framing of the Plurality framework in the context of AI governance; Tang's ongoing world tour to promote civic-tech approaches to AI policy.
- [Plurality book and framework](https://plurality.net/) — Co-authored by Glen Weyl and Audrey Tang; charts a path between techno-libertarianism and centralized AI governance, drawing on Taiwan's digital-democracy experience.

### Audrey Tang

- [Tang paneled "Geopolitics of AI" at Columbia University (Aug 21)](https://x.com/audreyt) — Panel with Melanie Hart, Kori Schake, Emmanuel Bacry, Jean-Marie Guehenno; Tang is Carnegie Distinguished Fellow at Columbia for 2026–27.
- [Tang posted concerns about free/open-source AI model risks (Aug 20)](https://x.com/audreyt) — Notes risks related to attention and tuning in open-weight models; consistent with her governance-first framing.
- [SXSW London 2026 speaker listing](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Confirmed speaker; Taiwan Cyber Ambassador role (since Oct 2024) is central to her current platform.

### NVIDIA Nemotron

- [Nemotron 3.5 Lightning released Aug 11 — Mamba-2 + Transformer MoE, 30B/3B active](https://www.cnbc.com/2026/08/11/nvidia-releases-nemotron-3point5-lightning-open-source-ai-model-.html) — 1M-token context window, reasoning ON/OFF modes, speculative-decoding drafters (DSpark, DFlash, MTP); first open-source Nemotron release since Jensen Huang endorsed the approach in July.
- [Nemotron 4 (1 trillion parameters) in training, possible late-fall release](https://www.technology.org/2026/08/12/nvidia-nemotron-4-trillion-parameter-open-model/) — Open model family at hyperscale; NVIDIA positioning itself as both a chip supplier and an open-model provider simultaneously.
- [Nemotron 3 Super: hybrid Mamba-Transformer MoE for agentic reasoning](https://developer.nvidia.com/blog/introducing-nemotron-3-super-an-open-hybrid-mamba-transformer-moe-for-agentic-reasoning/) — Technical overview of the agentic-reasoning focus; Nemotron 3 family still the NemoClaw reference runtime.

### PolkaSharks

_No PolkaSharks-specific content found in the last 24h sweep. Polkadot Forum daily social digests are active (last: [Aug 26](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-26/18468)), but no PolkaSharks-attributed posts or episodes were captured. Check vocus.cc/salon/Polkasharks directly if recent activity is expected._

---

## Cross-links

[[entities/nvidia]] — Nemotron 3.5 Lightning, Nemotron 4, NemoClaw v0.0.105–v0.0.114
[[concepts/nemotron]] — Nemotron 3.5 Lightning (Mamba-2 MoE, 30B/3B active, 1M ctx); Nemotron 4 in training
[[concepts/nemoclaw]] — v0.0.105→v0.0.114 August releases; OpenShell v0.0.101; deterministic MCP tool calls
[[concepts/openshell-runtime]] — Upgraded to v0.0.101 in NemoClaw v0.0.106
[[concepts/openclaw]] — 2026.7.2 release: crash-recoverable snapshots, session rewind/fork, GPT-5.6 multi-model
[[concepts/hermes-agent-framework]] — NemoClaw Hermes release-notes track active (v0.0.108 Aug 12)
[[entities/audrey-tang]] — Columbia AI panel (Aug 21), Mila AI Policy keynote; open-weight model risks post (Aug 20)
[[concepts/plurality]] — "Towards Plurality" keynote at Mila; ongoing Weyl-Tang world-tour framing
[[entities/polkadot]] — Grayscale ETF withdrawal; Hydration TVL +10.1%; Cloud Swap beta; Devnet activity
[[concepts/hydration-omnipool]] — TVL +10.1% to $56.6M (Aug 24); Cloud Swap beta (Hub ↔ Hydration)
[[synthesis/polkadot-2026-jam-tokenomics-six-region]] — Coretime/JAM architectural evolution actively discussed on forum
[[synthesis/agent-runtime-orchestration-six-region]] — NemoClaw/OpenClaw August releases; Harness open-sourced; LangChain Deep Agents MCP
[[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron 3.5 Lightning + Nemotron 4; OpenAI Astra pause; open-vs-closed dynamics
[[entities/polkasharks]] — No new content found this sweep; see PolkaSharks section above
