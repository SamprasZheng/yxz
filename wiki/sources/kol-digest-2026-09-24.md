---
type: source
title: KOL + keyword digest — 2026-09-24
author: kol-daily-digest (automated)
date: 2026-09-24
ingested: 2026-09-24
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-09-24

## TL;DR

- **Anthropic shipped Claude Opus 5.5 on Sept 22** — matches Fable 5.1 on benchmarks, 1M-token context, 40% cheaper to run ($4/$20/$0.20 per M input/output/cache), the latest in a month of back-to-back Claude releases (Fable 5.1 + Mythos 5.1 on Sept 1); the open-vs-closed frontier gap widens again per the [[synthesis/open-weight-llm-agent-stack-six-region]] falsifier.
- **[[concepts/nemoclaw]] hit v0.0.128 (Sept 22)** with canonical v1alpha1 config export for single-agent sandboxes; four weekly patch releases this month hardened the OpenShell lifecycle ownership and security surface — actively maintained ahead of the hackathon submission window.
- **[[entities/polkadot]] DOT jumped ~42%** on strong support for Referendum 1944 (dotUSD stablecoin proposal) and a record ~5,000 TXs/hour throughput burst (Sept 2, largely Products Devnet); Parity Technologies sets JAM production target for 2027, one year later than the prior "post-2026" signal.
- **NVIDIA Nemotron 3 Diarization released Sept 23** — 100M-parameter open-weight speaker-diarization model (8 speakers, streaming + offline, OpenMDW License 1.1); rounds out September's Nemotron 3 multimodal push (speech, RAG, safety, diarization).
- **KOL list is currently empty** — no person-specific feed was collected this run. Add KOL entries via the `kol-tracker` skill to enable per-account monitoring.

---

## KOL updates

The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` contains no entries. No KOL-specific feed was swept this run.

_To add KOLs, use the `kol-tracker` skill (e.g., `/kol-tracker add @handle`)._

---

## Keyword sweep

### AI agents

- [AI Agents News Brief: September 20, 2026 — Anthropic, OpenAI, Google, Meta](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-20-2026) — Weekly brief: Salesforce AIforce (headless composable Salesforce data/workflow layer for external agents, Sept 16), Meta Muse Spark 1.3 (Sept 2, 20% fewer tool calls / 25% less tokens), Docusign MCP Server opening to all agents Sept 30.
- [OpenAI GPT-6 Astra — computer-use + recurrent depth reasoning](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-6-2026) — Described as an "autonomous digital worker"; computer-use capabilities and recurrent depth reasoning mark its differentiation from GPT-5-era models.
- [AI Agent Trends 2026 Report | Google Cloud](https://cloud.google.com/resources/content/ai-agent-trends-2026) — Defines 2026 as the transition year from single-prompt productivity tools to agents operating across multiple business systems; recommends tight human review and limited autonomy footprint.
- [Agentic AI News — September 2026 Launches, Models & Research | Agentic.ai](https://agentic.ai/news) — Monthly roundup of agent launches, model releases, and orchestration research in September 2026.
- [AI Agents News — Week of September 22, 2026 (Daily Updates)](https://aiagentstore.ai/ai-agent-news/this-week) — Daily digest covering the week's agent news.

### Claude Code

- [Claude Code Updates by Anthropic — September 2026 | Releasebot](https://releasebot.io/updates/anthropic/claude-code) — Claude Code now spans terminals, IDEs, web, desktop, Slack, and CI/CD; practical tool for founders and solo engineers testing product ideas before hiring an engineering team.
- [Claude Code News | September 2026 (Startup Edition)](https://blog.mean.ceo/claude-code-news-september-2026/) — Startup-focused coverage of Claude Code's expanding integration surface and use cases for pre-team founders.

### Anthropic

- [Anthropic upgrades Claude with new Opus 5.5 model | 9to5Mac](https://9to5mac.com/2026/09/22/anthropic-upgrades-claude-with-new-opus-5-5-model-details-here/) — Claude Opus 5.5 (released Sept 22, 2026): matches Fable 5.1, 1M-token context, 40% cheaper to run, $4/$20/$0.20 per M input/output/cache tokens; Claude Sonnet 5.5 and Haiku 5.5 "coming in weeks."
- [Claude Updates by Anthropic — September 2026 | Releasebot](https://releasebot.io/updates/anthropic/claude) — Full changelog of Claude platform changes; includes Claude Fable 5.1 + Mythos 5.1 (Sept 1, two safety-tier twins) and Small Business workflows (43 workflows, 27 connectors incl. Shopify/Salesforce/Zoom/Xero/Stripe/Zapier).
- [Anthropic Claude News | September 2026 (Startup Edition)](https://blog.mean.ceo/anthropic-claude-news-september-2026/) — Summary of Anthropic's September release velocity and Claude's expansion into SMB and enterprise infrastructure.

### OpenAI

- [OpenAI Release Notes — September 2026 | Releasebot](https://releasebot.io/updates/openai) — GPT-5.5 retiring Oct 14, 2026 across ChatGPT/ChatGPT Work/Codex; ChatGPT Voice extended to GPT-6 Astra, Sol, and Luna plus email/calendar plugins in ChatGPT Work.
- [OpenAI Academy Expansion](https://openai.com/news/company-announcements/) — New role-based courses added for developers, leaders, educators, and college students.
- [ChatGPT Ads App International Rollout](https://aiweekly.co/ai-news-today/openai-news) — ChatGPT Ads app available internationally in markets where ChatGPT Ads are live starting Sept 23, 2026.
- [ChatGPT Health Permissions Update](https://aiweekly.co/ai-news-today/openai-news) — New Health connections default to the user's global Plugins setting; low-risk actions allowed by default, sensitive actions still require explicit permission.
- [LLM News Today — September 2026 | LLM Stats](https://llm-stats.com/ai-news) — Aggregated LLM releases and model stats for September 2026.

### Polkadot

- [Polkadot Price Prediction September 2026: DOT Jumps 42% on dotUSD Vote | TechBullion](https://techbullion.com/polkadot-price-prediction-september-2026-dot-jumps-42-on-dotusd-vote-as-remittix-builds-toward-launch/) — ~42% weekly rally on strong governance support for Referendum 1944 (dotUSD network-native stablecoin); DOT targets $1.30 as monthly active addresses double.
- [Polkadot News: Network Achieves Top Decentralization Ranking | CoinGabbar](https://www.coingabbar.com/en/polkadot-news-today-dot-price-decentralization) — Polkadot claims highest Nakamoto Coefficient among tracked networks.
- [Polkadot Products Devnet +150% Throughput | CryptoPanic](https://cryptorank.io/news/feed/e4954-polkadot-price-prediction-september-2026-dot-extends-gains-after-a-short-squeeze) — ~5,000 TXs/hour on Sept 2 attributed largely to Polkadot Products Devnet activity.
- [Runtime v2.5.0 Adds Governance Tracks | CoinGabbar](https://www.coingabbar.com/en/crypto-currency-news/polkadot-news-dot-price-devnet-update) — New on-chain governance tracks for technical maintenance and emergency economic actions.
- [JAM Production Target 2027 | CoinStats](https://coinstats.app/news/46d35428484324978e23353175e465627df48a3d3af263be2274dd9d18891584_Polkadot-DOT--Price-Potential-September-2026/) — Parity Technologies targeting JAM production in 2027 (parachain functionality migration); one year later than the prior "post-2026" framing.

### OpenClaw

- [September 22, 2026 | NVIDIA NemoClaw Release Notes](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/22) — NemoClaw v0.0.128: canonical v1alpha1 config export for supported single-agent sandboxes; completes OpenShell lifecycle ownership migration.
- [OpenClaw Changelog — September 2026 | Gradually](https://www.gradually.ai/en/changelogs/openclaw/) — Doctor plugin registry recovery (bundled plugins stay available after restart); Side chat improvement (draft stays editable while answer is pending); security hardening across command parsing, browser origin checks, plugin Git installs, service credentials, and webhook logging.
- [OpenClaw Release Notes — September 2026 | Releasebot](https://releasebot.io/updates/openclaw) — Full September changelog rollup.

### NemoClaw

- [September 22, 2026 | NVIDIA NemoClaw](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/22) — v0.0.128: canonical v1alpha1 config export for single-agent sandboxes; lifecycle controls completed.
- [September 17, 2026 | NVIDIA NemoClaw](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/17) — v0.0.127: gateway/plugin/package lifecycle ownership returned to OpenClaw and Hermes; OpenShell sandbox controls preserved.
- [September 15, 2026 | NVIDIA NemoClaw](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/15) — v0.0.126: sandbox, gateway, and host-forward recovery moved onto typed OpenShell lifecycle controls.
- [September 14, 2026 | NVIDIA NemoClaw](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/14) — v0.0.124: managed OpenShell runtime updated to 0.0.116; improved agent message handling; restored interactive Deep Agents Code execution.

### Plurality

- [Plurality Book Virtual Discussion — September 27, 2026 | PIT-UN / U of Virginia](https://pit-un.virginia.edu/how-technology-can-reinvigorate-democracy-conversation-audrey-tang-and-glen-weyl) — Audrey Tang + Glen Weyl + moderator Anne-Marie Slaughter discuss *Plurality: The Future of Collaborative Technology and Democracy* (2–3 PM ET, virtual).
- [Plurality.net](https://plurality.net/) — Both book and open-source project; explores how collaborative technology can promote transparency and direct input on governance, markets, and workplace.
- [Plurality: A Vision of the Future of Democracy and Society | TechPolicy.au](https://techpolicy.au/podcast/plurality-a-vision-of-the-future-of-democracy-and-society/) — Podcast episode covering Tang and Weyl's thesis on multi-perspective, inclusive, adaptive governance tech.

### Audrey Tang

- [Cyber Ambassador Audrey Tang — Towards Plurality — Closing Keynote, Mila AI Policy Conference 2026 | YouTube](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Tang delivered the closing keynote at the Mila AI Policy Conference 2026; focus on Plurality as the framework for aligning AI with democratic values.
- [Audrey Tang — 2025 Right Livelihood Award | Right Livelihood](https://rightlivelihood.org/the-change-makers/find-a-laureate/audrey-tang/) — Tang recognized as 2025 Right Livelihood Award laureate for digital freedom work as Taiwan's Digital Minister (2016–2024) and Cyber Ambassador-at-large.
- [Inside Audrey Tang's Plan to Align Technology with Democracy | TIME](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — Profile covering her focus on broadening Plurality's reach to global audiences post-Taiwan government role.

### NVIDIA Nemotron

- [NVIDIA Releases Nemotron 3 Diarization — Sept 23, 2026 | MarkTechPost](https://www.marktechpost.com/2026/09/23/nvidia-releases-nemotron-3-diarization/) — 100M-parameter open-weight model; tracks up to 8 speakers in real-time streaming + offline recordings; answers "who spoke when"; OpenMDW License 1.1 (commercial use permitted).
- [NVIDIA Nemotron 3 Diarization Open Weights Hit Hugging Face | CCLeaks](https://ccleaks.com/news/nvidia-nemotron-3-diarization-sep-2026) — Model weights now live on Hugging Face; both offline and streaming checkpoints available.
- [NVIDIA Nemotron 3.5 Lightning and NeMo Switchyard | NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/) — Nemotron 3.5 Lightning available on Hugging Face, ModelScope, OpenRouter, build.nvidia.com as a NIM microservice; broader September push includes speech, multimodal RAG, and safety models.

### PolkaSharks

_No new posts found for PolkaSharks in the last 24h sweep. The search returned no PolkaSharks-specific content for September 24, 2026._

---

## Cross-links

Existing wiki pages this digest touches:

**Entities:**
- [[entities/anthropic]] — Claude Opus 5.5 / Fable 5.1 / Mythos 5.1 releases; SMB workflow expansion
- [[entities/polkadot]] — DOT +42% / dotUSD Referendum 1944 / JAM 2027 target
- [[entities/polkasharks]] — no new content found this sweep
- [[entities/nvidia]] — Nemotron 3 Diarization, Nemotron 3.5 Lightning
- [[entities/peter-steinberger]] — OpenClaw Doctor-registry fix, Side-chat, security hardening
- [[entities/audrey-tang]] — Mila AI Policy Conference closing keynote, Right Livelihood laureate, Sept 27 Plurality event
- [[entities/glen-weyl]] — Sept 27 Plurality book virtual discussion co-presenter

**Concepts:**
- [[concepts/nemoclaw]] — v0.0.124–v0.0.128 lifecycle ownership migration complete
- [[concepts/openclaw]] — registry recovery, Side chat, security hardening
- [[concepts/nemotron]] — Nemotron 3 Diarization; Nemotron 3.5 Lightning as NIM
- [[concepts/agile-coretime]] — Polkadot 2.0 / Agile Coretime framing in DOT rally coverage
- [[concepts/dot-hard-cap]] — dotUSD Referendum 1944 builds on the hard-cap tokenomics frame
- [[concepts/plurality]] — Tang keynote + Sept 27 book discussion

**Synthesis:**
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Claude Opus 5.5 narrows the cost/capability gap; Anthropic releases in Sept touch the closed-frontier benchmark table
- [[synthesis/agent-runtime-orchestration-six-region]] — NemoClaw weekly patch cadence; lifecycle ownership completions touch the sandbox/isolation sub-layer
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — dotUSD Referendum 1944 + JAM 2027 target; throughput surge on Products Devnet (testnet-heavy caveat still applies)
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Tang keynote + Plurality Sept event; Weyl co-presenting
