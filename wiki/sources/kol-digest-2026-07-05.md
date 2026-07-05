---
type: source
title: KOL + keyword digest — 2026-07-05
author: kol-daily-digest (automated)
date: 2026-07-05
ingested: 2026-07-05
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic / Claude Code:** Claude Sonnet 5 became the default model on July 1 (most agentic Sonnet ever, $2/$10 per Mtok through Aug 31); Claude Fable 5 and Mythos 5 export-control suspension lifted as of June 30, globally available — following a new industry safety classifier built alongside Amazon, Microsoft, and Google.
- **OpenAI revenue inversion:** GPT-5.6 (Sol/Terra/Luna family) launched in limited government preview (~20 orgs, GA expected mid-July); Anthropic now projects $47B ARR vs OpenAI's $25–33B — the first time Anthropic has publicly forecast higher revenue, marking a notable competitive-position shift.
- **OpenClaw:** GPT-5.6 support shipped, native iOS app launched June 29, new `openclaw attach` workflow for external harness sessions; a ClawHub skill-store security breach was also reported — directly illustrating the credential-egress risk that [[concepts/nemoclaw]] and [[concepts/openshell-runtime]] are designed to address.
- **Polkadot:** Hyperbridge went live on Polkadot Hub mainnet (July 2) enabling cryptographically-secure bridging to 14+ chains; Moonbeam announced 1:1 GLMR→Base migration with a new decentralised AI agent; Web3 Summit Berlin 2026 concluded with ~900 attendees and 187 live app deployments.
- **KOL list is empty** — the `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` contains only a seed comment. Add real entries via the `kol-tracker` skill to enable per-person channel monitoring in future digests.

## KOL updates

_No KOLs configured. The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is currently empty (seed list only). Add entries via the `kol-tracker` skill._

## Keyword sweep

### AI agents

- [AI Updates Today — July 2026 model releases](https://llm-stats.com/llm-updates) — Claude Sonnet 5 leads the agentic tier; enterprise shift from "demos to workflow replacement" is the defining July trend.
- [Agentic AI News — July 2026](https://agentic.ai/news) — Winners are mapping one messy process, adding human review, and proving time saved or errors reduced — not buying hype.
- [AI agent trends 2026 report | Google Cloud](https://cloud.google.com/resources/content/ai-agent-trends-2026) — Agents can now plan tasks, write software, and complete complex assignments with minimal human oversight; multimodal capabilities standard across frontier models.
- [AI News Today July 1 2026: 15 Biggest Stories](https://www.buildfastwithai.com/blogs/ai-news-today-july-1-2026) — Enterprise recoil from "tokenmaxxing" burning annual budgets in weeks; Sonnet 5 at $2/$10 is Anthropic's direct cost-model response.
- [Need to Know News — July 3, 2026](https://www.theaimarketers.ai/need-to-know-news-july-3rd-2026) — Reasoning models (o1, DeepSeek-R1) trading speed for accuracy; efficiency improvements delivering GPT-4-level performance at dramatically lower cost.

### Claude Code

- [Claude Code Updates — July 2026 (Releasebot)](https://releasebot.io/updates/anthropic/claude-code) — Sonnet 5 now default in Claude Code with native 1M-token context; background agents auto-commit, push, and open a draft PR when code work completes.
- [Anthropic Release Notes — July 2026](https://releasebot.io/updates/anthropic) — Rate limits increased across Chat, Cowork, Claude Code, and Platform; Manual default permission mode added; broad crash/session/plugin/accessibility fixes.
- [Claude Developer Platform Updates — July 2026](https://releasebot.io/updates/anthropic/claude-developer-platform) — Claude in Chrome GA; draft-PR handoff, background notifications, improved failover and session handling.
- [Redeploying Claude Fable 5 | Anthropic](https://www.anthropic.com/news/redeploying-fable-5) — Fable 5 globally available July 1 after 19-day export-control suspension; new safety classifier co-developed with Amazon/Microsoft/Google.
- [Release notes | Claude Help Center](https://support.claude.com/en/articles/12138966-release-notes) — Official release notes; smarter AskUserQuestion behavior and improved CLI reliability alongside Sonnet 5 rollout.

### Anthropic

- [Redeploying Claude Fable 5 | Anthropic](https://www.anthropic.com/news/redeploying-fable-5) — Fable 5 restored globally July 1; Mythos 5 restored for approved US orgs after June 26 government sign-off; safety classifier + jailbreak framework the key deliverable.
- [Anthropic just landed its biggest win of 2026 — TheStreet](https://www.thestreet.com/technology/anthropic-ipo-fable5-mythos-safety-classifier-block-jailbreak) — New safety classifier + industry jailbreak framework central to Fable 5 reinstatement; positioned as IPO signal.
- [Claude Enterprise Updates](https://releasebot.io/updates/anthropic/claude) — Richer admin analytics, model-level entitlements, spend alerts; Claude apps gateway for Bedrock/GCP with corporate SSO and per-user cost attribution.
- [AI News Today July 1 2026](https://www.buildfastwithai.com/blogs/ai-news-today-july-1-2026) — California's "Poppy" AI assistant piloted with 2,800 employees across 67 departments; full statewide rollout July 2026.
- [Anthropic Claude News | July 2026 (blog.mean.ceo)](https://blog.mean.ceo/anthropic-claude-news-july-2026/) — Anthropic projects $47B ARR vs OpenAI's $25–33B annualised; would be profitable in 2029.

### OpenAI

- [OpenAI News | openai.com](https://openai.com/news/) — GPT-5.6 family (Sol/Terra/Luna) launched; Sol $5/$30, Terra $2.50/$15, Luna $1/$6 per Mtok.
- [Sam Altman seeks new world order for AI — Fortune](https://fortune.com/2026/07/02/sam-altman-new-world-order-ai-openai-google-anthropic/) — OpenAI on course for $25–33B ARR but losing revenue-projection lead to Anthropic and Google.
- [AI News Today July 1 2026](https://www.buildfastwithai.com/blogs/ai-news-today-july-1-2026) — GPT-5.6 Sol running at up to 750 tok/sec on Cerebras; stronger reasoning, coding, biology, and cybersecurity performance; new ultra mode.
- [AI News Today July 3 2026 — unrot.co](https://unrot.co/blogs/today-top-10-ai-news-july-3-2026) — GPT-5.6 limited to ~20 organisations as of July 3; general availability expected mid-July 2026.
- [OpenAI Release Notes — July 2026](https://releasebot.io/updates/openai) — ChatGPT Business adds admin controls for plugin discovery, policies, and installs; GeneBench-Pro benchmark for AI agents in computational biology introduced.

### Polkadot

- [Polkadot Socials Daily Digest: 2026-07-04 — Polkadot Forum](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-07-04/18038) — July 4 digest; Hyperbridge and Moonbeam Base migration dominate social discussion.
- [Hyperbridge live on Polkadot Hub mainnet — Polkadot Forum](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-07-02/18006) — Hyperbridge connects 14+ chains via cryptographically-secure bridging with cross-chain messaging, state queries, and asset transfers (July 2).
- [Moonbeam GLMR→Base migration — Polkadot Forum](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-07-04/18038) — Moonbeam announced full 1:1 GLMR migration to Base + new decentralised AI agent product (July 4).
- [Is Polkadot Dead? — MEXC 2026 data-driven look](https://www.mexc.com/learn/article/is-polkadot-dead-a-2026-data-driven-look-at-dots-ecosystem-investment-value/1) — DOT down ~98.5% from ATH; 6th globally in active core developers; JAM targeting ~40% cost reduction and developer activity uplift.
- [Web3 Summit 2026 Berlin recap — CoinMarketCap](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — ~900 attendees; 187 builders deployed live apps ranging from decentralised websites to smart contracts.

### OpenClaw

- [OpenClaw Release Notes — July 2026](https://releasebot.io/updates/openclaw) — GPT-5.6 model family support shipped; new `openclaw attach` for external harness sessions; richer Telegram/Codex pairing and cron scheduling options.
- [OpenClaw native iOS app — MacRumors (June 29)](https://www.macrumors.com/2026/06/29/openclaw-ios-app/) — iOS app supports chat, voice approvals, sharing, and device-aware automation alongside existing gateway; OpenClaw expanding beyond desktop.
- [OpenClaw and Hermes: what an agent is vs. what controls it — The New Stack](https://thenewstack.io/openclaw-hermes-agent-harness/) — Analysis of the architectural divergence between OpenClaw and Hermes on control-plane philosophy; directly relevant to [[concepts/nemoclaw-policy-presets]] design.
- [ClawHub skill-store breach — OpenClaw Security News](https://github.com/joylarkin/openclaw-security-news) — Security breach in ClawHub skill store reported July 2026; reinforces credential-egress risk in open agent ecosystems and the rationale for Landlock/seccomp/netns sandboxing.
- [Microsoft launches Scout, an OpenClaw-inspired personal assistant — TechCrunch (June 2)](https://techcrunch.com/2026/06/02/microsoft-launches-scout-an-openclaw-inspired-personal-assistant/) — Scout ships June 2; OpenClaw's architecture becoming the reference design for personal AI agents at Microsoft scale.

### NemoClaw

- [NVIDIA NemoClaw Release Notes — docs.nvidia.com](https://docs.nvidia.com/nemoclaw/about/release-notes) — No major July release found; early preview status continues since March 2026 launch.
- [GitHub — NVIDIA/NemoClaw](https://github.com/NVIDIA/NemoClaw) — Apache 2.0; OpenShell runtime + Nemotron local models; single-command install; ClawHub breach makes the sandboxing rationale more visible in the community.
- [Palantir + NVIDIA Nemotron sovereign deployment](https://investors.palantir.com/news-details/2026/Palantir-Launches-Engine-for-Deploying-NVIDIA-Nemotron-Open-Models-in-Sovereign-Environments/) — Palantir engine brings Nemotron into air-gapped US government environments; extends the defense-AI NemoClaw use case.
- [GTC 2026 NemoClaw spotlight — NVIDIA Blog](https://blogs.nvidia.com/blog/rtx-ai-garage-gtc-2026-nemoclaw/) — RTX PCs and DGX Sparks running latest open models and AI agents locally; NemoClaw featured as reference on-device agent stack.
- [Nemotron 3 Nano Omni multimodal — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — Vision + audio + language unified in Nano Omni; up to 9x more efficient for AI agents; Nemotron Safety models expand language support.

### Plurality

- [Inside Audrey Tang's Plan to Align Technology with Democracy — TIME](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — Tang frames Plurality as a path between techno-libertarianism and centralised AI governance, drawing on Taiwan's COVID/infodemic response as proof of concept.
- [Plurality.net](https://plurality.net/) — Core resource for the Weyl/Tang framework; no major new publication in the last 24h.
- [AI and Democracy: Ambassador Audrey Tang — Oxford Podcasts](https://podcasts.ox.ac.uk/ai-and-democracy-ambassador-audrey-tang-plurality-practice-transparency-and-collective-intelligence) — Podcast on Plurality in practice, transparency, and collective intelligence.
- [Audrey Tang at Tech for Impact Summit 2026](https://tech4impactsummit.com/speakers/audrey-tang/) — Tang speaking on digital democracy and AI governance; continuing world tour promoting Plurality ideas.
- [Utah social-graph data-portability law — Liron Shapira Substack](https://lironshapira.substack.com/p/can-we-govern-superintelligence-taiwans) — Tang cited Utah's law (effective July 2026) enabling cross-platform community/content migration as a concrete Plurality-aligned policy win.

### Audrey Tang

- [Finding Light through the Cracks — new book (March 2026)](https://lironshapira.substack.com/p/can-we-govern-superintelligence-taiwans) — Tang's latest book "Reinventing democracy with Audrey Tang" published March 2026; active promotion continues.
- [Taiwan Cyber Ambassador: Humans & AI Can FOOM Together — Liron Shapira](https://lironshapira.substack.com/p/can-we-govern-superintelligence-taiwans) — Tang argues coevolutionary AI/human trajectory is governable; Taiwan's civic-tech governance model as global template.
- [Audrey Tang Post on TED2026 #freethefuture — LinkedIn](https://www.linkedin.com/posts/tangaudrey_ted2026-freethefuture-activity-7450193617467383809-DWe2) — Tang active at TED 2026 promoting free-future and digital-rights agenda.
- [SXSW London 2026 Speaker](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Featured at SXSW London 2026 on digital democracy and AI.
- [Reframing Impact: AI Summit 2026 — AI Now Institute](https://ainowinstitute.org/wp-content/uploads/2026/02/Reframing-Impact_Democratization_Audrey-Tang.pdf) — AI Now Institute paper co-authored by Tang on AI democratisation (Feb 2026).

### NVIDIA Nemotron

- [NVIDIA Debuts Nemotron 3 Family of Open Models — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Nemotron 3 Nano/Super/Ultra open models; speech ASR, multimodal RAG, and safety model expansions shipped.
- [Palantir + Nemotron sovereign AI — Palantir investor relations](https://investors.palantir.com/news-details/2026/Palantir-Launches-Engine-for-Deploying-NVIDIA-Nemotron-Open-Models-in-Sovereign-Environments/) — Palantir deploys Nemotron in air-gapped US government environments; the sovereign open-weight use case for the NVIDIA stack.
- [Nemotron 3 Super: 5x higher throughput — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai/) — 5x throughput improvement for agentic AI workloads vs prior Nemotron generation.
- [NVIDIA Nemotron Coalition of global AI labs — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models) — Multi-lab coalition to advance open frontier models; enterprise adopters include Bosch, CrowdStrike, Salesforce, ServiceNow, Uber.
- [Nemotron 3 Nano Omni multimodal — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — Vision + audio + language unified; up to 9x more efficient for AI agents.

### PolkaSharks

_No new PolkaSharks-specific content found in the last 24h. The Polkadot Forum daily digests (July 1–4) cover broader ecosystem activity but do not mention PolkaSharks specifically. See [Polkadot Socials Daily Digest: 2026-07-04](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-07-04/18038) for the closest public signal._

## Cross-links

**Entities touched this digest:**
- [[entities/nvidia]] — Nemotron 3 family expansion (Nano Omni multimodal + Safety models), Palantir sovereign deployment
- [[entities/polkadot]] — Hyperbridge mainnet live, Moonbeam Base migration, Web3 Summit Berlin 2026
- [[entities/peter-steinberger]] — OpenClaw GPT-5.6 support, iOS app, ClawHub breach (Steinberger now at OpenAI)
- [[entities/audrey-tang]] — "Finding Light through the Cracks" (March 2026), Utah data-portability law, TED 2026 / SXSW London
- [[entities/palantir]] — Palantir-Nemotron engine for US government sovereign AI
- [[entities/openai]] — GPT-5.6 Sol/Terra/Luna launch, $25–33B ARR, ChatGPT Business plugin admin controls *(stub created this digest)*

**Concepts touched this digest:**
- [[concepts/openclaw]] — GPT-5.6 support, iOS app, ClawHub breach
- [[concepts/nemoclaw]] — ClawHub breach reinforces sandboxing rationale; Palantir sovereign use case
- [[concepts/openshell-runtime]] — ClawHub breach illustrates credential-egress risk
- [[concepts/nemotron]] — Nemotron 3 Super/Nano Omni multimodal + Safety models + enterprise coalition
- [[concepts/plurality]] — Utah data-portability law; Tang at TED 2026 / SXSW London
- [[concepts/hermes-agent-framework]] — OpenClaw vs Hermes control-plane divergence (The New Stack)
- [[entities/polkasharks]] — No new content; Polkadot Forum daily digests are the closest public signal
