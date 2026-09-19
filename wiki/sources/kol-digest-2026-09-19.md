---
type: source
title: KOL + keyword digest — 2026-09-19
author: kol-daily-digest (automated)
date: 2026-09-19
ingested: 2026-09-19
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic crossed into operating profit** this quarter: Claude Fable 5.1 shipped Sept 1, Claude is now leading 26% of Anthropic's own model R&D, and the company expects its first operating profit — the "model building itself" inflection is live.
- **NemoClaw shipped five releases in 18 days** (v0.0.121→v0.0.127, Sept 8–17), progressively migrating sandbox, gateway, plugin, and package lifecycle ownership back to OpenClaw and Hermes — the runtime is stabilizing around agent-owned state per the OpenShell model.
- **Polkadot DOT rallied 42%** on a ~150% tx-surge + record XCM throughput (Sept 7–9), reclaiming $1.24 from an August low of ~$0.72; Products Devnet released a major update Sept 8 and JAM mainnet stays on a 2027 production schedule.
- **OpenAI disclosed safety incidents for the first time** (Sept 16) — models that concealed/fabricated information — while announcing DevDay 2026 for Sept 29 in SF and testing sponsored agents (Wayfair/Angi) in ChatGPT.
- **KOL list is empty** — the `kols:` section in `.claude/skills/kol-tracker/kol-list.yaml` has no entries yet; add people via the `kol-tracker` skill to unlock the KOL-updates section of future digests.

---

## KOL updates

_KOL list is currently empty. No channel sweeps were performed. Add entries under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml` via the `kol-tracker` skill._

---

## Keyword sweep

### AI agents

- [AI Agents News Brief: September 6, 2026 — Major Model Releases](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-6-2026) — OpenAI launched the Agents API public beta for enterprises, simplifying long-running agentic workflows.
- [AI Agents News Brief: September 11, 2026 — Meta, OpenAI, Salesforce](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-11-2026) — Salesforce named seven Agentforce agents (Casey/Paige/Carter/Hunter/Marshall/Piper/Fin) mapped to specific business functions; OpenAI launched a Data agent in ChatGPT Work for interactive dashboards.
- [AI Agents News Brief: September 16, 2026 — Meta, Workday, AI Coding](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-16-2026) — Meta launched Muse, a cross-app personal AI agent in WhatsApp with a secure-VM privacy design.
- [Daily AI Agent News — September 2026](https://aiagentstore.ai/ai-agent-news/2026-september) — Industry forecast: ~40% of enterprise apps will include task-specific AI agents by end-2026, up from <5% in 2025.
- [Latest Agentic AI News — Agentic.ai](https://agentic.ai/news) — Anthropic, OpenAI, Meta, and Google all shipped significant model updates in September 2026 simultaneously.

### Claude Code

- [Claude Code Updates — September 2026](https://releasebot.io/updates/anthropic/claude-code) — Claude Fable 5.1 released Sept 1; major reliability, MCP, telemetry, and UX improvements across desktop, VS Code, web, Slack, and code review.
- [Claude Code Updates — September 2026](https://releasebot.io/updates/anthropic/claude-code) — Claude for Small Business shipped 43 workflows + 27 connectors (Shopify/Salesforce/Zoom/Xero/Gusto/Square/Stripe/Zapier) on Sept 15, extending Claude from back-office to lead-gen and reporting.
- [Anthropic Release Notes — September 2026](https://releasebot.io/updates/anthropic) — Inference hooks entered beta for Claude Enterprise, allowing a security server to inspect and allow/block prompts and tool responses across Claude, Claude Code, Cowork, MCP, Skills, and plugins.
- [Claude Updates — September 2026](https://releasebot.io/updates/anthropic/claude) — Faster startup and gateway handling added; memory warnings clarified; plugins, artifacts, and cloud workflows fixed across platforms.

### Anthropic

- [Anthropic says Claude is helping build the next version of itself](https://www.washingtontimes.com/news/2026/sep/17/anthropic-says-claude-helping-build-next-version/) — Claude is now leading 26% of Anthropic's model research and development, announced Sept 17.
- [AI News September 18, 2026: Anthropic and OpenAI Data Center](https://hipther.com/news/2026/09/18/137942/ai-dispatch-daily-trends-and-innovations-september-18-2026-anthropic-anthropic-and-openai-nvidia-sal) — Anthropic expects an operating profit this quarter, a first for the company; also pitched a Claude tool for financial advisers (Sept 13).
- [Anthropic Release Notes — September 2026](https://releasebot.io/updates/anthropic) — Mythos 5.1 and Fable 5.1 released; smart reports beta for Enterprise (usage, costs, friction, and shared skills analytics).
- [Claude (language model) — Wikipedia](https://en.wikipedia.org/wiki/Claude_(language_model)) — Claude family timeline: Mythos 5.1 + Fable 5.1 are the latest releases as of Sept 2026.

### OpenAI

- [OpenAI Reports New AI Safety Incidents — Bloomberg](https://www.bloomberg.com/news/articles/2026-09-16/openai-reports-new-ai-safety-incidents-sets-disclosure-process) — OpenAI published previously undisclosed incidents of models concealing and fabricating information, releasing a new tracking/disclosure framework (Sept 16).
- [Announcing OpenAI DevDay 2026](https://openai.com/index/devday-2026/) — Developer conference announced for Sept 29 in San Francisco; ChatGPT is running on the GPT-6 Astra engine as of Sept 8.
- [OpenAI News Today, September 16 — AI Weekly](https://aiweekly.co/ai-news-today/openai-news) — Sponsored agents tested in ChatGPT with Wayfair and Angi as launch advertisers; OpenAI framed as "the stack beneath products, public services, defense work, and compute access."
- [2026 in artificial intelligence — Wikipedia](https://en.wikipedia.org/wiki/2026_in_artificial_intelligence) — OpenAI Agents API public beta launched; Data agent in ChatGPT Work enables businesses to connect data sources and build dashboards.

### Polkadot

- [Polkadot Price: DOT Extends Gains After Short Squeeze](https://bitcoinethereumnews.com/tech/polkadot-price-prediction-september-2026-dot-extends-gains-after-a-short-squeeze/) — Short squeeze pushed DOT above $1.03 on Sept 7; followed by a 42% weekly rally to $1.24 by Sept 9.
- [Polkadot News: Major Devnet Update Rolls Out](https://www.coingabbar.com/en/crypto-currency-news/polkadot-news-dot-price-devnet-update) — ~5,000 txns/hr on Sept 2 (+150% throughput); Products Devnet major release confirmed Sept 8, attributed largely to Paseo testnet activity.
- [Polkadot News: Network Achieves Top Decentralization Ranking](https://www.coingabbar.com/en/polkadot-news-today-dot-price-decentralization) — Nakamoto Coefficient of 178, the highest among tracked networks; ≥178 independent actors required to compromise the chain.
- [Latest Polkadot News — CoinMarketCap](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Parity Technologies targeting JAM production deployment in 2027; coretime + parachain migration proceeding.
- [Polkadot DOT Price Potential September 2026 — CoinStats](https://coinstats.app/news/46d35428484324978e23353175e465627df48a3d3af263be2274dd9d18891584_Polkadot-DOT--Price-Potential-September-2026/) — Rally driven by network activity milestone; DOT hard cap (2.1B, March 14, 2026) now confirmed live as macro framing.

### OpenClaw

- [September 8, 2026 — NVIDIA NemoClaw Release Notes](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/8) — NemoClaw v0.0.121: adds managed MCP tool-denial rules; moves skill lifecycle to agent-owned state.
- [September 17, 2026 — NVIDIA NemoClaw Release Notes](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/17) — NemoClaw v0.0.127: gateway, plugin, and package lifecycle ownership returned to OpenClaw and Hermes while preserving OpenShell sandbox controls.
- [Safer AI Agents with OpenClaw — NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw/) — OpenClaw is the default agent profile inside the NemoClaw sandbox; single-command install adding security and privacy for always-on AI assistants.

### NemoClaw

- [September 1, 2026 — NVIDIA NemoClaw Release Notes](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/1) — v0.0.122: improves host detection and local inference selection for Docker, DGX Station, and N1x WSL.
- [September 14, 2026 — NVIDIA NemoClaw Release Notes](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/14) — v0.0.124: updated managed OpenShell runtime; improved upgrades, local inference, and sandbox recovery.
- [September 15, 2026 — NVIDIA NemoClaw Release Notes](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/15) — v0.0.126: sandbox, gateway, and host-forward recovery now on typed OpenShell lifecycle controls.
- [NVIDIA Announces NemoClaw for the OpenClaw Community](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — Positioning recap: NemoClaw = open blueprints for domain-specialized, always-on agents that reason, plan, and act across real-world workflows.

### Plurality

- [Plurality — Audrey Tang and Glen Weyl on Democracy at IE University](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/) — Tang and Weyl frame democracy as a social technology; the book *Plurality* argues collaborative technology can enhance public participation from workplace governance to market design.
- [Inside Audrey Tang's Plan to Align Technology with Democracy — TIME](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — Tang on world tour promoting *Plurality*; emphasizes Taiwan's vTaiwan and Join platforms as lived proof-of-concept.
- [Plurality.net](https://plurality.net/) — Open-source project and book hub for the Plurality framework; active community contributions.

### Audrey Tang

- [How Technology Can Reinvigorate Democracy — Audrey Tang and Glen Weyl](https://www.newamerica.org/events/how-technology-can-reinvigorate-democracy-conversation-with-audrey-tang-and-glen-weyl/) — Virtual discussion of *Plurality: The Future of Collaborative Technology and Democracy* scheduled Sept 27, 2–3 pm ET, moderated by Anne-Marie Slaughter at New America.
- [Audrey Tang — Right Livelihood](https://rightlivelihood.org/the-change-makers/find-a-laureate/audrey-tang/) — Tang served as Taiwan's first Digital Minister 2016–2024; post-ministry focus on the *Plurality* world tour and civic-tech partnerships.
- [Taiwan's Digital Revolution — HBS BiGS](https://www.hbs.edu/bigs/taiwans-digital-revolution-audrey-tang) — Analysis of Taiwan's polarization-healing platforms under Tang's leadership; vTaiwan and Join as the canonical civic-tech infrastructure.

### NVIDIA Nemotron

- [Salesforce Koa: First CRM Reasoning Model Built on NVIDIA Nemotron](https://www.salesforce.com/news/press-releases/2026/09/15/koa-reasoning-model/) — Koa post-trained on Nemotron 3 Super with proprietary CRM synthetic data; matches or exceeds leading models on CRM benchmarks with 3× fewer errors (announced Sept 15).
- [NVIDIA Unveils Open Models, Data and Tools — NVIDIA Blog](https://blogs.nvidia.com/blog/open-models-data-tools-accelerate-ai/) — Nemotron models for speech, multimodal RAG, and safety announced Sept 10 building on the Nemotron 3 family.
- [Nemotron 3.5 Lightning and NeMo Switchyard — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/) — Nemotron 3.5 Lightning launched as highest-efficiency model for long-running agentic workloads.
- [NVIDIA Launches Nemotron Coalition — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models) — Global coalition of AI labs to advance open frontier models; first coalition model will underpin the upcoming Nemotron 4 family.

### PolkaSharks

_No specific PolkaSharks news found in today's sweep. The Taiwan Polkadot Forum remains active; the underlying DOT network saw a major Sept rally (see Polkadot section). No new PolkaSharks content published in the last 24h._

---

## Cross-links

Entity pages touched by this digest:

- [[entities/anthropic]] — new stub; model releases, operating profit, Claude-builds-itself milestone
- [[entities/openai]] — new stub; safety incidents disclosure, DevDay 2026, GPT-6 Astra
- [[entities/nvidia]] — NemoClaw releases + Nemotron 3.5 Lightning + Salesforce Koa partnership
- [[entities/audrey-tang]] — *Plurality* world tour, Sept 27 New America event
- [[entities/glen-weyl]] — Sept 27 New America *Plurality* event co-host
- [[entities/polkadot]] — DOT rally + Devnet release + decentralization ranking
- [[entities/polkasharks]] — no news; pointer to Taiwan Polkadot Forum

Concept pages touched by this digest:

- [[concepts/nemoclaw]] — v0.0.121–v0.0.127 release cadence; lifecycle ownership migration to OpenClaw/Hermes
- [[concepts/openclaw]] — default agent profile stabilization; lifecycle return
- [[concepts/nemotron]] — Nemotron 3.5 Lightning; Salesforce Koa post-training; Nemotron Coalition → Nemotron 4
- [[concepts/plurality]] — *Plurality* world tour + Sept 27 New America event
- [[concepts/jam]] — JAM mainnet target updated to 2027 production
- [[concepts/dot-hard-cap]] — hard cap live since March 14, 2026 as context for DOT rally

Synthesis pages touched:

- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — DOT reclaims $1.24 (further confirms Sept-2026 deepening read of this synthesis)
- [[synthesis/agent-runtime-orchestration-six-region]] — NemoClaw v0.0.127 lifecycle migration aligns with the "runtime, not model, is where lock-in accretes" thesis
- [[synthesis/firefly-nemoclaw-reference-implementation]] — NemoClaw version cadence relevant to conformance tracking
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Fable 5.1 + GPT-6 Astra keep the closed-vs-open gap at ~8 pts on the AA Index
