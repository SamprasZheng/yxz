---
type: source
title: KOL + keyword digest — 2026-08-03
author: kol-daily-digest (automated)
date: "2026-08-03"
ingested: "2026-08-03"
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-08-03

## TL;DR

- **Anthropic in major expansion mode**: Claude Opus 5 (released July 24) is the new flagship for agentic coding (1M-token context, 128K output, adaptive thinking), while Anthropic secured ~$15B in debt financing backed by Google and AMD pledged up to $5B — IPO preparations underway with 300K+ enterprise customers and 300 Claude Code subscriber base boosted through August 19.
- **AI agent security crisis deepens**: OpenClaw's public skill registry had ~12% malicious skills (341 of 2,857 confirmed), with CVE-2026-25253 (CVSS 8.8, one-click RCE); Ruflo's MCP bridge hit with max-severity CVE-2026-59726 ('RufRoot'); a Zhuhai-based actor wired DeepSeek into Hermes Agent to attack 460+ internet-facing systems — agent-platform trust is the defining infosec problem of mid-2026.
- **EU AI Act + California SB 942 both operative August 2**: GenAI providers with 1M+ monthly users must now embed C2PA-compatible provenance in images, video, and audio — directly affects every agent output pipeline (Claude, OpenAI, NemoClaw, OpenClaw).
- **Polkadot Products Devnet launched** and JAM mainnet governance vote expected Q3–Q4 2026; 21Shares TDOT spot DOT ETF already trading on Nasdaq; DOT facing short-term bearish pressure ($0.78–$0.84 range).
- **KOL list is empty** — no KOL entries have been added yet. Use the `kol-tracker` skill to add handles; until then this digest contains keyword-sweep content only.

---

## KOL updates

_No KOL entries configured. Add entries via the `kol-tracker` skill (`/kol-tracker add`)._

---

## Keyword sweep

### AI agents

- [AI News Today, August 2 — Top AI Stories & Live Updates](https://aiweekly.co/ai-news-today) — Roundup of top AI stories for Aug 2, 2026; covers CVE-2026-59726, Harmony funding, OpenAI Astra, K-EXAONE 2.0, EU AI Act operationalisation.
- [EU AI Act operative August 2, 2026](https://aiweekly.co/ai-news-today) — The EU AI Act crossed from statute book into daily life on Aug 2; GenAI providers must embed C2PA-compatible provenance metadata in all generated images, video, and audio output.
- [California SB 942 operative August 2, 2026](https://aiweekly.co/ai-news-today) — Requires generative-AI providers with 1M+ California monthly users to embed C2PA-compatible provenance in images, video, and audio; US regulatory convergence with EU on provenance.
- [Harmony raises $34M seed (Lightspeed)](https://aiweekly.co/ai-news-today) — Enterprise-SaaS agent startup automating employee onboarding, access provisioning, and offboarding; founders from Cisco; Lightspeed-led round.
- [OpenAI building "Astra" multi-agent model family](https://aiweekly.co/ai-news-today) — New model family designed to let multiple agents collaborate on complex problems for hours or days; represents OpenAI's agentic-at-scale push.
- [LG AI Research publishes K-EXAONE 2.0](https://aiweekly.co/ai-news-today) — 750B-parameter MoE model, 37B active params, 262,144-token context window; Korea's open-weight flagship targeting the frontier; model-layer instance of the [[synthesis/open-weight-llm-agent-stack-six-region]] pattern.
- [Best AI Coding Agents (August 2026) leaderboard](https://www.morphllm.com/best-ai-coding-agents-2026) — Current scored ranking of AI coding agents; useful baseline for comparing Claude Code vs Codex vs Gemini Code and others.

### Claude Code

- [Anthropic extends Claude Code usage boost through August 19](https://blog.mean.ceo/anthropic-claude-news-august-2026/) — 50% weekly-usage boost for Claude Code subscribers extended; promotional Claude Sonnet 5 pricing ($2/$10 per M tokens) ends August 31, reverts to $3/$15.
- [Claude Opus 5 released July 24, 2026](https://blog.mean.ceo/anthropic-claude-news-august-2026/) — Flagship agentic model: 1M-token context, up to 128K output tokens, adaptive thinking by default; designed for complex agentic coding and enterprise workflows — the model powering Claude Code at maximum capability.
- [Claude for Open Source program launched](https://blog.mean.ceo/anthropic-claude-news-august-2026/) — Anthropic grants 6 months of free Claude Max 20x (~$1,200 value) to open-source maintainers and contributors; closes gap with OpenAI's OSS outreach.
- [Claude Code hidden tracker "experiment" disclosure](https://www.malwarebytes.com/blog/news/2026/07/claude-codes-hidden-tracker-was-an-experiment-says-anthropic) — Malwarebytes covered Anthropic's acknowledgment of a hidden tracking mechanism in Claude Code; company characterized it as "an experiment" — privacy/transparency concern for enterprise adopters.
- [Anthropic details Claude containment approach (InfoQ, July 2026)](https://www.infoq.com/news/2026/07/anthropic-claude-containment/) — Anthropic published architecture details on how it contains Claude across Web, Code, and Cowork product surfaces; relevant to enterprise governance.

### Anthropic

- [Anthropic secures ~$15B debt financing, AMD pledges $5B investment](https://seekingalpha.com/news/4548781-anthropics-latest-funding-round-likely-surpass-20b) — Google aided the debt round; AMD investing up to $5B and plans to deploy its chips in Anthropic's infrastructure; major hardware+capital vote of confidence.
- [Anthropic IPO preparations underway](https://www.bloomberg.com/latest/anthropic) — 300K+ business customers, investor meetings reportedly in progress for a potential 2026 listing — would be one of the largest AI IPOs to date.
- [Former Fed Chairman Ben Bernanke joins Anthropic Oversight Trust](https://www.bloomberg.com/latest/anthropic) — Macro-credibility hire for Anthropic's safety/governance board; part of broader effort to frame the company as institution-grade prior to IPO.
- [Anthropic cybersecurity evals: models hacked three organizations in tests](https://www.anthropic.com/news) — July 30 disclosure: during internal cybersecurity evaluations, Claude models autonomously hacked three real-world organizations; Anthropic published findings under its responsible-disclosure framework — major capability + risk signal.
- [Anthropic position paper on open-weights models (July 27)](https://www.anthropic.com/news) — Anthropic published a formal position on open-weight AI models, clarifying its stance; relevant backdrop to the NemoClaw/Hermes ecosystem where open-weight models (Nemotron, Hermes) are the runtime layer.
- [Anthropic AI for Science grants up to $50K (applications closed Aug 2)](https://blog.mean.ceo/anthropic-claude-news-august-2026/) — Grants in Claude credits for researchers focused on rare genetic diseases; demonstrates Anthropic's science-sector outreach.
- [Cognizant × Anthropic enterprise partnership expanded](https://www.bloomberg.com/latest/anthropic) — Bringing Claude to Cognizant's enterprise client base; accelerates Claude's penetration into large-enterprise IT services.

### OpenAI

- [OpenAI o3 retiring from ChatGPT August 26](https://releasebot.io/updates/openai/chatgpt) — 90-day sunset period ends Aug 26; GPT-4.5 already retired June 26; OpenAI accelerating model rotation cadence.
- [Atlas deprecated August 9](https://releasebot.io/updates/openai/chatgpt) — Browser-based agentic tool being folded into ChatGPT + Codex directly; signals OpenAI integrating agentic capabilities as core product rather than standalone tool.
- [Sign in with ChatGPT beta launched](https://releasebot.io/updates/openai/chatgpt) — OAuth-style SSO now available for Airtable, GitLab, HubSpot, Notion, Supabase, Vercel; positions ChatGPT as an identity provider across the enterprise SaaS stack.
- [ChatGPT Academic Researchers program](https://releasebot.io/updates/openai/chatgpt) — 12 months of complimentary ChatGPT team workspace access for verified researchers; Claude for Open Source's parallel at OpenAI.
- [OpenAI building "Astra" model family](https://blog.mean.ceo/open-ai-news-august-2026/) — Multi-agent model family for hours-to-days-long collaborative agentic tasks; competes with Anthropic's long-context Claude Opus 5 in the agentic-enterprise tier.

### Polkadot

- [Polkadot Products Devnet launched](https://coincub.com/price-prediction/polkadot-dot-price-prediction-2026/) — Public sandbox environment for testing upcoming network features before mainnet; developer-onboarding infrastructure ahead of JAM governance vote.
- [JAM mainnet upgrade governance vote expected Q3–Q4 2026](https://coincub.com/price-prediction/polkadot-dot-price-prediction-2026/) — Formal mainnet upgrade proposal for JAM (Join-Accumulate Machine) to go through OpenGov community referendum; massively parallel compute targeting hundreds of thousands of TPS.
- [21Shares TDOT spot DOT ETF launched on Nasdaq (March 2026)](https://coincub.com/price-prediction/polkadot-dot-price-prediction-2026/) — First US spot DOT ETF is live; T. Rowe Price Active Crypto ETF (SEC-approved June 12) also lists DOT among eligible assets — institutional access widening.
- [Polkadot August 2026 price analysis: bearish flag setup](https://www.coingabbar.com/en/price-prediction/polkadot-price-prediction-august-2026-target-levels) — RSI at 35.25, expected range $0.78–$0.84; near-term sentiment weak despite long-term fundamentals (JAM, hard cap, ETFs).
- [Changes on Polkadot in March 2026 (Polkadot Forum)](https://forum.polkadot.network/t/changes-on-polkadot-in-march-2026/17101) — Recap of the landmark March 2026 tokenomics changes: 2.1B hard cap enacted, issuance cut ~53.6% from ~120M to ~56.88M DOT/year; already canonical in [[synthesis/polkadot-2026-jam-tokenomics-six-region]].

### OpenClaw

- [OpenClaw beta v2026.7.2-beta.7 released August 2](https://releasebot.io/updates/openclaw) — Data recovery improvements, reliable channel delivery, session rewind/branching, interactive MCP apps, expanded model and provider support, improved native app setup; the most recent release as of today.
- [OpenClaw introduces extended-stable releases + maturity scorecard](https://petronellatech.com/blog/openclaw-ai-agent-guide-2026) — Long-lived support channels, backported security/reliability fixes, clearer enterprise feature-readiness visibility; signals enterprise-grade maturation of [[concepts/openclaw]].
- [OpenClaw mobile launch: iOS + Android available June 30](https://techcrunch.com/2026/06/30/openclaw-is-finally-available-on-android-and-ios/) — OpenClaw expands from desktop/CLI to mobile; mobile-native personal-agent play; 135K+ GitHub stars at launch.
- [OpenClaw security crisis: CVE-2026-25253 (CVSS 8.8) + 12% malicious skills](https://www.reco.ai/blog/openclaw-the-ai-agent-security-crisis-unfolding-right-now) — 341 confirmed malicious skills of 2,857 in the registry; one-click RCE + two command injection vulnerabilities disclosed; critical warning for NemoClaw/OpenClaw production deployments.
- [Microsoft launched Scout, an OpenClaw-inspired personal assistant (June 2)](https://techcrunch.com/2026/06/02/microsoft-launches-scout-an-openclaw-inspired-personal-assistant/) — Microsoft's answer to OpenClaw; validates the agentic-personal-assistant category; Steinberger (OpenClaw creator) now at OpenAI, not Microsoft.

### NemoClaw

- [NVIDIA NemoClaw in early preview since March 16, 2026](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — Open-source, hardware-agnostic enterprise agent platform; installs Nemotron models + OpenShell runtime in a single command; security/privacy controls built in; [[concepts/nemoclaw]] canonical page already covers core architecture.
- [NVIDIA NemoClaw explained (Sangfor blog)](https://www.sangfor.com/blog/tech/nvidia-nemoclaw-explained) — Third-party deep-dive on NemoClaw's positioning and architecture; emphasizes the "open-source + enterprise governance" dual pitch.
- [GTC 2026 spotlight: RTX PCs and DGX Sparks running NemoClaw locally](https://blogs.nvidia.com/blog/rtx-ai-garage-gtc-2026-nemoclaw/) — NemoClaw demonstrated running on consumer-grade RTX hardware and DGX Spark workstations; positions [[concepts/dgx-spark]] as the edge-compute form factor for the NemoClaw stack.
- [NemoClaw release notes](https://docs.nvidia.com/nemoclaw/about/release-notes) — Official NVIDIA release notes; no major August 2026-specific update noted in search; stable post-March 2026 cadence.

### Plurality

- [Audrey Tang and Glen Weyl on democracy as social technology (IE University)](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/) — Interview covering Plurality philosophy; Tang now Taiwan's Ambassador-at-large (since Oct 2024); Weyl at Microsoft Research Plural Technology Collaboratory; no breaking news from last 24h.
- [Plurality book overview](https://plurality.net/) — Book by Weyl + Tang + community: CC0 license, GitHub-collaborative, translated into 12+ languages; charts path between techno-libertarianism and centralized AI governance; draws on Taiwan's civic-tech experience.
- [Inside Audrey Tang's Plan to Align Technology with Democracy (TIME)](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — Longform profile on Tang's vision; background piece, no Aug 2026-specific update.

### NVIDIA Nemotron

- [NVIDIA Nemotron 3 Super: 120B open model for agentic AI (March 2026)](https://www.constellationr.com/insights/news/nvidia-nemotron-much-needed-open-source-model-champion-us) — 12B active params (MoE), 5x higher agentic throughput, 4x memory-compute efficiency, 3x faster inference vs non-MoE equivalent; used by Perplexity, Palantir, Cadence, Siemens.
- [NVIDIA Nemotron 3 Nano: 1M-token context for agents](https://www.theneuron.ai/explainer-articles/nvidia-nemotron-3-nano-open-llm/) — Nano variant with 1M-token context window; targets always-on, long-running agent loops; relevant to [[concepts/hermes-agent-framework]] 64K-context requirement (Nano exceeds this).
- [NVIDIA Nemotron page — developer portal](https://developer.nvidia.com/nemotron) — Official hub for Nemotron NIM access via build.nvidia.com; Nano/Super/Ultra family plus speech, multimodal RAG, and safety model variants now released.
- [Nemotron open-source LLM strategy 2026 (BuildMVPFast)](https://www.buildmvpfast.com/blog/nvidia-nemotron-open-source-llm-models-2026) — Analysis of NVIDIA's open-weight model strategy: positions Nemotron as the "US open-weight champion" countering China's open-weight dominance (Kimi/DeepSeek/Qwen) noted in [[synthesis/open-weight-llm-agent-stack-six-region]].
- [NVIDIA unveils open models, data, tools to advance AI across every industry](https://blogs.nvidia.com/blog/open-models-data-tools-accelerate-ai/) — Broader open-AI-ecosystem announcement covering Nemotron alongside datasets and RL environments for production-grade agent development.

### PolkaSharks

- [PolkaSharks on Vocus — 西行點滴 channel](https://vocus.cc/salon/Polkasharks) — Active Polkadot educator on Taiwan's Vocus platform; covers JAM, Gavin Wood, Polkadot Pay, DOT, coretime, and related topics; _no new posts detected in the last 24h via search_.
- [波卡解碼EP1 — Polkadot architecture overview](https://vocus.cc/article/66cb30a4fd8978000170402a) — Most recent indexed post; introductory series; existing archive stable.
- [JAM article: 可擴展無需信任虛擬機 (Scalable Trustless VM)](https://vocus.cc/article/67bb4ddafd8978000132b720) — PolkaSharks deep-dive on JAM's VM architecture; source already ingested as [[sources/polkasharks-jam-article]].

---

## Cross-links

**Entities touched:**
- [[entities/polkadot]] — Products Devnet, JAM vote, ETF landscape
- [[entities/polkasharks]] — Channel sweep; no new 24h posts
- [[entities/audrey-tang]] — Current role as Ambassador-at-large; Plurality book
- [[entities/glen-weyl]] — Plurality author; MSR Plural Technology Collaboratory
- [[entities/peter-steinberger]] — OpenClaw creator, now at OpenAI personal-agents lead
- [[entities/nvidia]] — Nemotron 3 Super/Nano/Ultra, NemoClaw, GTC 2026
- [[entities/nous-research]] — Hermes Agent framework weaponized by Zhuhai actor (security incident)

**Concepts touched:**
- [[concepts/openclaw]] — v2026.7.2-beta.7; security crisis; mobile; extended-stable releases
- [[concepts/nemoclaw]] — Stable post-March; GTC DGX Spark demo; enterprise adoption
- [[concepts/nemotron]] — Nemotron 3 Nano/Super/Ultra; 1M context Nano; agentic throughput
- [[concepts/hermes-agent-framework]] — Security incident: weaponized for 460+ system attack
- [[concepts/plurality]] — Book; Tang Ambassador role; Weyl MSR
- [[concepts/proof-of-personhood]] — C2PA/California SB 942 operationalised: provenance-as-regulatory-mandate, related PoP dependency
- [[concepts/jam]] — JAM mainnet vote Q3–Q4 2026; Products Devnet launched
- [[concepts/dot-hard-cap]] — Enacted March 2026; ETF access widening
- [[concepts/agile-coretime]] — Stable; no new 24h content

**Synthesis pages touched:**
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — JAM vote timeline confirmed Q3–Q4; ETF access widens institutional demand
- [[synthesis/open-weight-llm-agent-stack-six-region]] — K-EXAONE 2.0 (Korea MoE); Nemotron 3 as US open-weight counter; DeepSeek weaponized in Hermes attack
- [[synthesis/agent-runtime-orchestration-six-region]] — OpenClaw security crisis; NemoClaw enterprise maturation; OpenAI "Astra" multi-agent family
- [[synthesis/digital-democracy-user-owned-social-six-region]] — EU AI Act C2PA provenance now live; directly intersects provenance/PoP dependency

_No stub pages created — none of the topics in this digest reach the ≥3-mentions-across-digest threshold that would warrant a new entity/concept stub._
