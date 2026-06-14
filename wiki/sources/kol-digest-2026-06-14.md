---
type: source
title: KOL + keyword digest — 2026-06-14
author: kol-daily-digest (automated)
date: 2026-06-14
ingested: 2026-06-14
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic released Claude Fable 5** (Mythos-class, 1M-token context, always-on adaptive thinking) alongside Claude Mythos 5; Claude Sonnet 4 and Opus 4 retire June 15 — the largest Claude model-lineup change in months, with a new advisor tool (fast executor + high-intelligence advisor pairing) now in public beta for long-horizon agentic work.
- **OpenClaw security alert**: BleepingComputer reported June 9 that OpenClaw's email-agent profile falls for simulated phishing attacks and leaks user data; separately Microsoft is testing an OpenClaw-inspired enterprise agent inside Microsoft 365 Copilot. Project now at 310K+ GitHub stars.
- **NVIDIA NemoClaw / Agent Toolkit** formally launched at GTC Taipei with Nemotron 3 Ultra (550B params, AA-Idx ~48) live on Hugging Face since June 4 — US open-weight leader, but still trailing China's Kimi K2.6 (~54), consistent with the open-weight frontier thesis in [[synthesis/open-weight-llm-agent-stack-six-region]].
- **Polkadot** confirmed DOT hard cap (−53.6% inflation, runtime v2.1.0) and Agile Coretime both live on mainnet June 10; Web3 Summit Berlin June 18-19 is the first major community event in the post-hard-cap era.
- **Five Eyes** (US/AU/CA/NZ/UK) jointly released "Careful Adoption of Agentic AI Services" — first coordinated inter-agency security guidance targeting agentic AI specifically, citing critical-infrastructure and defense risks.

_KOL list is currently empty — no KOL channel sweep was run. Add entries via the `/kol-tracker` skill (e.g., `/kol-tracker add @karpathy ai "https://twitter.com/karpathy"`) to populate future KOL sections._

## KOL updates

_No KOL entries in `.claude/skills/kol-tracker/kol-list.yaml`. Skipped per guardrails._

## Keyword sweep

### AI agents

- [AI Agents News | June 2026 (Startup Edition)](https://blog.mean.ceo/ai-agents-news-june-2026/) — MetaMask Agent Wallet launched June 8; AI agents can now execute onchain DeFi trades across EVM chains under mandatory security checks, bridging agentic payments and DeFi.
- [Daily AI Agent News — Last 7 Days](https://aiagentstore.ai/ai-agent-news/this-week) — Five Eyes agencies (US/AU/CA/NZ/UK) jointly published "Careful Adoption of Agentic AI Services" guidance on agentic AI risks in critical infrastructure and defense; first multi-nation coordinated agentic-security document.
- [AI Agents Complete Overview 2026](https://cogitx.ai/blog/ai-agents-complete-overview-2026) — AWS, Google, Microsoft, IBM, Databricks, BCG converging on a shared agentic framing: goal-directed systems with memory, planning, tool use, and selective autonomy.
- [AI Agent Trends 2026 Report | Google Cloud](https://cloud.google.com/resources/content/ai-agent-trends-2026) — Google Cloud's trend report maps enterprise adoption moving from chat to work delegation across support, sales, research, coding, and admin.
- [Alteryx Agent Studio at Inspire 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Alteryx unveiled Agent Studio + MCP Server, converting existing data workflows and business rules directly into deployable autonomous agents; notable as a no-code-style agentic on-ramp.

### Claude Code

- [Claude Code Release Notes June 2026](https://releasebot.io/updates/anthropic/claude-code) — Added nested sub-agents, smarter model/region routing, new plugin search, improved Chrome/VSCode/terminal workflows; broad session/agent/memory/UI bug fixes.
- [Claude Fable 5 accessible via Claude Code v2.1.170](https://releasebot.io/updates/anthropic/claude-code) — Mythos-class model now reachable from the CLI; described as exceeding all previously generally-available models.
- [Claude Sonnet 4 / Opus 4 retire June 15](https://platform.claude.com/docs/en/release-notes/overview) — Migration path: Claude Sonnet 4.6 and Claude Opus 4.8 respectively; retirement confirmed for tomorrow.
- [Advisor tool public beta](https://releasebot.io/updates/anthropic) — New mode pairs a fast executor model with a high-intelligence advisor for long-horizon agentic workloads; available in beta for Claude Code users today.

### Anthropic

- [Claude Fable 5 and Mythos 5 general availability](https://releasebot.io/updates/anthropic) — Both released June 2026; 1M-token context, 128k max output, always-on adaptive thinking; marks Fable family reaching production readiness.
- [Managed Agents + Vault + Webhooks on developer platform](https://www.infoq.com/news/2026/05/code-with-claude/) — Scheduled Managed Agents, vault-stored environment variables, and richer session-thread webhook events now available; strengthens Claude's agentic deployment story.
- [DXC integrates Claude into banking and airline systems (June 11)](https://releasebot.io/updates/anthropic) — DXC Technology named Claude integration partner for mission-critical enterprise back-ends; signals enterprise go-to-market maturing.
- [Claude Partner Network Services Track launch (June 3)](https://releasebot.io/updates/anthropic) — New SI/consulting partner hub and services track; Anthropic building a reseller/integrator layer around Claude.

### OpenAI

- [OpenAI to acquire Ona (June 12)](https://openai.com/news/company-announcements/) — Acquisition announced; Ona's scope not fully disclosed; signals continued expansion of data/infrastructure capabilities ahead of IPO.
- [GPT-5.2 deprecated → GPT-5.5 (June 12)](https://releasebot.io/updates/openai/chatgpt) — Existing GPT-5.2 conversations auto-migrated to GPT-5.5; OpenAI compressing the 5.x versioning cadence.
- [Confidential S-1 draft filed with SEC (June 10)](https://openai.com/news/company-announcements/) — Pre-IPO milestone; confidential draft submission precedes a formal roadshow; timeline undisclosed.
- [ChatGPT memory system upgrade](https://releasebot.io/updates/openai/chatgpt) — More capable cross-session memory with a reviewable summary page; rolling out to Plus/Pro US users.
- [OpenAI Economic Research Exchange (June 8)](https://openai.com/news/) — New initiative sharing data with economists on AI's macroeconomic effects; signals growing engagement ahead of public scrutiny in IPO process.

### Polkadot

- [DOT hard cap + Agile Coretime live on mainnet June 10](https://www.tradingview.com/news/coindar:a4cf85f0e094b:0-polkadot-to-participate-in-web3-summit-2026-in-berlin-on-june-18th/) — Runtime v2.1.0 confirms both; annual inflation cut −53.6% (matches [[concepts/dot-hard-cap]] thesis); flexible blockspace purchasing now active.
- [Web3 Summit Berlin June 18-19](https://www.tradingview.com/news/coindar:a4cf85f0e094b:0-polkadot-to-participate-in-web3-summit-2026-in-berlin-on-june-18th/) — Polkadot participating; first major community gathering post-hard-cap; likely venue for JAM mainnet timeline discussion.
- [DOT price forecast ~$0.97 by June 15](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Short-term market fear weighing despite improved tokenomics; analysts cite broad crypto decline, not DOT-specific issues.

### OpenClaw

- [OpenClaw email agent falls for phishing attacks, leaks user data (June 9)](https://www.bleepingcomputer.com/news/security/openclaw-ai-agent-found-falling-for-phishing-attacks-spills-user-data/) — BleepingComputer: phishing simulation showed the email-agent profile compromised in ways analogous to human users; user data exfiltration demonstrated in lab settings.
- [TechRadar: OpenClaw vulnerability and agentic AI security](https://www.techradar.com/pro/what-the-openclaw-vulnerability-reveals-about-the-future-of-agentic-ai-security) — Analysis: susceptibility reveals systemic trust assumptions in autonomous email agents; argues prompt-injection defenses must be first-class, not afterthoughts.
- [310K+ GitHub stars; fastest-growing open-source agent of 2026](https://blog.mean.ceo/openclaw-news-june-2026/) — Community traction continues despite vulnerability disclosure; indicates operator appetite outrunning security readiness.
- [Monthly patch versioning switch; floor 2026.6.5](https://github.com/openclaw/openclaw/releases) — Cadence moved to YYYY.M.PATCH after published beta; signals project maturity milestone.
- [Microsoft testing OpenClaw-inspired agent in M365 Copilot](https://www.infoq.com/news/2026/05/code-with-claude/) — TechCrunch: enterprise adaptation under development; expected reveal at Microsoft Build June; validates the OpenClaw model for enterprise but raises question of who controls the security posture.

### NemoClaw

- [NVIDIA Agent Toolkit formally launched at GTC Taipei](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — Full open-source stack: NemoClaw blueprints + OpenShell secure runtime (early preview) + Nemotron models + CUDA-X domain libraries; enterprise ISV partnerships announced.
- [Nemotron 3 Ultra (550B total / 55B active) live on Hugging Face since June 4](https://research.nvidia.com/labs/nemotron/Nemotron-3-Ultra/) — MoE Hybrid Mamba-Attention architecture; 20T training tokens; AA-Idx ~48, US open-weight leader but behind Kimi K2.6 (~54).
- [Enterprise software leaders building on NVIDIA agents](https://investor.nvidia.com/news/press-release-details/2026/Enterprise-Software-Leaders-Build-AI-Agents-With-NVIDIA/default.aspx) — NVIDIA announced enterprise ISV partnerships integrating NemoClaw + Nemotron for production agentic workloads; signals the stack moving beyond hackathon context.
- [FinTech Weekly: NemoClaw solved security, payments unsolved](https://www.fintechweekly.com/news/nvidia-nemoclaw-gtc-2026-ai-agents-enterprise-payments-crypto-2026) — Analysis: OpenShell addresses sandboxing; autonomous agent payment authorization remains the open problem for enterprise deployment; intersects with [[synthesis/agentic-payments-six-region]].
- [NemoClaw docs + release notes](https://docs.nvidia.com/nemoclaw/about/release-notes) — OpenShell still early preview; NemoClaw blueprints available now; Jetson + DGX Spark deployment paths documented.

### Plurality

- [Audrey Tang at Gothenburg panel (June 5)](https://digidemlab.org/en/news/a-panel-discussion-with-audrey-tang/) — Open panel discussion on the future of democracy; Tang as Cyber Ambassador-at-large continuing her post-ministerial Plurality world tour.
- [Global Campus of Human Rights interview (May 26)](https://www.gchumanrights.org/gc-news/conversations/interview-with-audrey-tang-2025-rightlivelihood-laureate/) — 2025 Right Livelihood Laureate interview; covers digital freedom, AI governance, and Plurality's technology-democracy frame.
- [SXSW London 2026 speaker profile](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Tang confirmed as SXSW London 2026 speaker; Plurality ideas scaling to global stage/venue.
- [Plurality.net book / GitHub repository](https://github.com/pluralitybook/plurality) — No specific June 14 code/protocol update; book remains the canonical reference for the collaborative-technology-and-democracy framework.

### Audrey Tang

_See Plurality section above — searches for both keywords returned the same activity set. No separate June 14 item found distinct from the Plurality sweep._

- [Audrey Tang — Wikipedia / Right Livelihood](https://rightlivelihood.org/news/taiwans-audrey-tang-honoured-with-right-livelihood-award-for-advancing-digital-democracy-and-social-trust/) — Taiwan's Cyber Ambassador-at-large; 2025 Right Livelihood Award for digital democracy and social trust; 2016-2024 Digital Minister.
- [Tech for Impact Summit 2026 speaker](https://tech4impactsummit.com/speakers/audrey-tang/) — Confirmed speaker at the 2026 Tech for Impact Summit alongside Plurality promotion activities.

### NVIDIA Nemotron

- [Nemotron 3 Ultra: 550B total / 55B active params, AA-Idx ~48](https://research.nvidia.com/labs/nemotron/Nemotron-3-Ultra/) — Released June 4 to Hugging Face; US open-weight leader; full training data, RL environments, post-training recipes, and fine-tuning code also open-sourced.
- [Nemotron 3 family complete: Nano → Super → Ultra](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Nano (Dec 2025), Super (Mar 2026), Ultra (Jun 2026); three-tier family now fully released.
- [5× inference speedup with NVFP4 on Blackwell](https://artificialanalysis.ai/articles/nvidia-nemotron-3-ultra-launch-announced) — >300 tok/s at BF16 on DeepInfra pre-release; NVFP4 on Blackwell delivers the 5× gain; key differentiator for NemoClaw deployments on DGX Spark and Jetson.
- [Community analysis: SOTA US open-weight but trails China frontier](https://medium.com/@ffguci8/nvidia-nemotron-3-the-sota-open-weight-ai-model-family-of-2026-4612ae7aefb4) — Nemotron 3 Ultra (~48) leads US open weights while trailing Kimi K2.6 (~54) and the broader China-led open frontier; consistent with the wiki's existing open-weight six-region thesis.

### PolkaSharks

_No new PolkaSharks content found in the last 24h._ Polkadot ecosystem developments are covered above under the Polkadot section. Verify at [vocus.cc/salon/Polkasharks](https://vocus.cc/salon/Polkasharks) for the next episode release.

## Cross-links

**Existing wiki pages touched by this digest:**

- [[entities/nvidia]] — Nemotron 3 Ultra release; NemoClaw Agent Toolkit formal launch; enterprise ISV partnerships
- [[entities/polkadot]] — DOT hard cap + Agile Coretime live June 10; Web3 Summit Berlin June 18-19
- [[entities/polkasharks]] — No new episode; ecosystem Polkadot news covered under keyword sweep
- [[entities/peter-steinberger]] — OpenClaw phishing vulnerability (June 9); Microsoft M365 Copilot agent adaptation in progress
- [[entities/audrey-tang]] — Gothenburg panel June 5; GCHR interview May 26; SXSW London 2026 speaker
- [[concepts/nemoclaw]] — Full Agent Toolkit launched; OpenShell in early preview; ISV partnerships announced
- [[concepts/openclaw]] — Phishing vulnerability disclosed June 9; 310K+ stars; versioning switched to YYYY.M.PATCH
- [[concepts/nemotron]] — Nemotron 3 Ultra (550B, AA-Idx ~48) live; full Nano/Super/Ultra family complete
- [[concepts/hermes-agent-framework]] — No specific June 14 news; adjacent NemoClaw/OpenClaw ecosystem active
- [[concepts/agile-coretime]] — Confirmed live on mainnet via runtime v2.1.0 as of June 10, 2026
- [[concepts/dot-hard-cap]] — Confirmed live; −53.6% inflation; market sentiment short-term bearish
- [[concepts/plurality]] — Tang Gothenburg panel + SXSW London 2026; no code/protocol-specific update today
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron 3 Ultra AA-Idx ~48 vs Kimi K2.6 ~54 confirms China-led open-weight frontier thesis
- [[synthesis/agentic-payments-six-region]] — NemoClaw payment-auth gap reinforces the unsolved autonomous-agent payment problem identified here

**New stub pages created (>= 3 digest mentions):**

- [[entities/anthropic]] — Created: referenced across Claude Code, Anthropic, and AI agents sections (Fable 5, Managed Agents, Partner Network, advisor tool)
- [[entities/openai]] — Created: referenced across OpenAI and AI agents sections (Ona acquisition, GPT-5.5, S-1 draft, memory upgrade, Research Exchange)
