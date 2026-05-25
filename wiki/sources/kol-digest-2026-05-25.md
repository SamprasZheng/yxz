---
type: source
title: KOL + keyword digest — 2026-05-25
author: kol-daily-digest (automated)
date: 2026-05-25
ingested: 2026-05-25
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-05-25

## TL;DR

- **Anthropic dominates the week**: Q1 2026 revenue grew 80× year-on-year (confirmed at Code with Claude 2026); company ranked #1 on CNBC Disruptor 50; secured a $1.25 B/month compute deal with xAI/SpaceX Colossus through May 2029; Claude Managed Agents entered public beta with self-hosted sandboxes and "MCP tunnels" research preview — Anthropic is the most-discussed AI vendor across every keyword sector today.
- **NVIDIA Nemotron-Labs Diffusion LM released May 23**: first DLM architecture on HuggingFace, 24 K+ downloads in 24 hours; Nemotron 3 Nano Omni (30B-A3B MoE, 9× throughput over comparable open omni models) tops six leaderboards — directly upgrades the [[concepts/nemotron]] tier available to the Spacesharks Agent Challenge stack.
- **OpenClaw security crisis escalates**: Shodan/ZoomEye scans reveal ~245 K publicly accessible instances; Anthropic billing friction surfaces as Claude Code detects HERMES.md files and routes requests to "extra usage" tier (1,336-point HN post); Microsoft's "Project Lobster" internally tests "ClawPilot" despite CEO calling [[concepts/openclaw]] a "virus" in February 2026.
- **NemoClaw × Olares OS integration ships** (GOSIM Paris, May 14): [[concepts/nemoclaw]] sandboxed agents now run natively on Olares One and NVIDIA DGX Spark via shared Kubernetes substrate — material for the Spacesharks on-prem deployment narrative.
- **Polkadot Hyperbridge breach**: attacker minted 1 B DOT and dumped for ETH, pushing cross-chain security into focus as DOT trades at $1.25; technical offset is 9,032 active developers (competitive with Ethereum and Solana) and the Bulletin Chain launch for decentralised app data storage.

---

## KOL updates

> **Note — KOL list is empty.** The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` contains no entries. Add KOLs using the `kol-tracker` skill (e.g. `/kol-tracker add @karpathy`). The keyword sweep below ran in full.

_no new posts_ (no KOL channels configured)

---

## Keyword sweep

### AI agents

- [Google Search's I/O 2026 updates: AI agents and more](https://blog.google/products-and-platforms/products/search/search-io-2026/) — Google upgrades Search with Gemini 3.5 Flash as the default AI Mode model globally; users can now create, customise and manage multiple background AI agents.
- [Anthropic's Code with Claude Announces Managed Agents, Proactive Workflows](https://www.infoq.com/news/2026/05/code-with-claude/) — Claude Managed Agents enters public beta with self-hosted sandboxes and a research-preview "MCP tunnels" feature (announced May 19, 2026).
- [Google is pitching an AI agent ecosystem to consumers who may not buy it](https://techcrunch.com/2026/05/21/google-is-pitching-an-ai-agent-ecosystem-to-consumers-who-may-not-buy-it/) — TechCrunch analysis: consumer adoption of multi-agent ecosystems remains uncertain despite Google I/O 2026 push.
- [Agent AI is Coming. Are You Ready?](https://thehackernews.com/2026/05/agent-ai-is-coming-are-you-ready.html) — "Identity dark matter" (non-human identities) now outnumber visible IAM elements 57% vs 43% as enterprises adopt agents; security posture gap widens.
- [Visa Wants to Make AI Shoppers as Trusted as Human Ones](https://www.pymnts.com/visa/2026/visa-wants-to-make-ai-shoppers-as-trusted-as-human-ones/) — [[entities/visa]] Trusted Agent Protocol (TAP) update; Klarna also shipped a live-shopping engine inside ChatGPT pulling 400 M listings; Netflix handed AI agents autonomous ad-buy authority.

### Claude Code

- [Anthropic's Code with Claude showed off coding's future](https://www.technologyreview.com/2026/05/21/1137735/anthropics-code-with-claude-showed-off-codings-future-whether-you-like-it-or-not/) — MIT Technology Review on the May 6 San Francisco + May 19 London events; Dario Amodei confirms 80× annualised revenue growth; SpaceX compute partnership announced same day.
- [What's new — Claude Code Docs](https://code.claude.com/docs/en/whats-new) — Agent view (monitor all sessions from one screen), goal mode (runs until condition met), fast mode now defaults to Opus 4.7.
- [Anthropic Silently Patches Claude Code Sandbox Bypass](https://www.securityweek.com/anthropic-silently-patches-claude-code-sandbox-bypass/) — Researcher discloses network-sandbox bypass that could have enabled data exfiltration; patched without public advisory.
- [Claude Code News | May 2026 (Startup Edition)](https://blog.mean.ceo/claude-code-news-may-2026/) — Practical builder-focused roundup: coding assistants are now revenue-generating tools for small teams; security review integration reduces P1 defects.
- [Claude Code Changelog: All Release Notes (2026)](https://claudefa.st/blog/guide/changelog) — Changelog tracker covering all 2026 updates in one place.

### Anthropic

- [Anthropic will pay xAI $1.25B per month for compute](https://techcrunch.com/2026/05/20/anthropic-will-pay-xai-1-25-billion-per-month-for-compute/) — Three-year deal (to May 2029) for Colossus data-centre capacity near Memphis; driven by 80× Q1 demand surge.
- [2026 CNBC Disruptor 50 list: Why Anthropic was No. 1](https://www.cnbc.com/2026/05/19/2026-cnbc-disruptor-50-rankings-anthropic-no-1.html) — Anthropic leapfrogs OpenAI to top the 2026 Disruptor 50; enterprise trust and explosive growth cited.
- [Two hours that changed AI](https://www.axios.com/2026/05/21/ai-news-cycle-openai-anthropic-spacex) — Axios recaps the compressed news cycle: Anthropic SpaceX compute + Code with Claude London event land within hours of each other on May 21.
- [Anthropic Release Notes — May 2026](https://releasebot.io/updates/anthropic) — Aggregated changelog: Claude Security public beta adds repo scanning, vulnerability explanations, patch guidance; Project Glasswing expanded.
- [Christopher Olah speaking at Vatican AI encyclical presentation](https://www.vaticannews.va/en/pope/news/2026-05/pope-leo-xiv-first-encyclical-magnifica-humanitas.html) — Anthropic co-founder and interpretability research lead speaks at Pope Leo XIV's *Magnifica Humanitas* encyclical presentation on May 25, 2026.

### OpenAI

- [GPT-5.5 Instant: smarter, clearer, and more personalised](https://openai.com/index/gpt-5-5-instant/) — OpenAI ships GPT-5.5 Instant; release notes emphasise clarity and adaptive personalisation over raw capability jumps.
- [AI Daily Brief: May 25, 2026](https://uitg.co/tech/ai/post/740) — Daily briefing covering OpenAI Codex recognised in 2026 Gartner Magic Quadrant for Enterprise AI Coding Agents.
- [ChatGPT Updates by OpenAI — May 2026](https://releasebot.io/updates/openai/chatgpt) — New personal finance experience for Pro users (connected accounts, spending dashboard); free-tier users get inline web images.
- [Open AI News | May 2026 (Startup Edition)](https://blog.mean.ceo/open-ai-news-may-2026/) — Virgin Atlantic used Codex to ship mobile app redesign with near-total unit test coverage by a fixed holiday deadline; AdventHealth integrates ChatGPT for Healthcare.

### Polkadot

- ['Polkadot Is Kind of Done.' The Once Hyped Layer 0 Faces…](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) — The Defiant covers declining narrative momentum; Hyperbridge bridge breach (attacker minted 1 B DOT, dumped for ETH) hammers cross-chain confidence.
- [DOT Price Prediction: $1.41 breakout target](https://blockchain.news/news/20260519-price-prediction-target-dot-141-breakout-as-polkadot-consolidates-above) — DOT at $1.25, testing $1.29 resistance where multiple MAs converge; next move defines short-term trend.
- [Latest Polkadot News — CoinMarketCap](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Bulletin Chain announced (decentralised Web3 app data storage, no central Web2 dependency); Proof-of-Frag esports tournament with HEROIC on Counter-Strike infrastructure.
- [Technology stabilizes, ecosystem takes off: 2026 key year for Polkadot](https://www.bitget.com/news/detail/12560605074161) — Bitget analysis: 9,032 active devs (Chainspect), Polkadot Docs MCP AI coding assistant live; JAM + Agile Coretime as long-term thesis anchors.
- [Polkadot (DOT) hard supply cap enacted March 2026](https://www.mexc.com/news/1073023) — Runtime upgrade v2.1.0 enacted March 12 2026; 2.1 B DOT hard cap, issuance cut 53.6% to 56.88 M DOT/year.

### OpenClaw

- [OpenClaw Chain Vulnerabilities Expose 245,000 Public AI Agent Servers to Attack](https://cybersecuritynews.com/openclaw-chain-vulnerabilities/) — Shodan + ZoomEye scans (May 2026): ~65 K and ~180 K exposed instances respectively; financial services, healthcare, and legal sectors at highest risk given PII/PHI processing.
- [OpenClaw Release Notes — May 2026](https://releasebot.io/updates/openclaw) — v2026.5.4-beta.1 (98-commit beta, May 4): File Transfer Plugin ships four agent tools (file_fetch, dir_list, dir_fetch, file_write) for binary file operations on paired nodes.
- [State of OpenClaw 2026: The Enterprise Self-Hosted Agent](https://www.bighatgroup.com/blog/state-of-openclaw-2026-enterprise-self-hosted-ai-agent/) — Comprehensive enterprise evaluation: Anthropic subscription crackdown (Claude Code detects HERMES.md and routes to "extra usage" tier); Microsoft "Project Lobster" internally tests "ClawPilot"; Tencent maintainers increasing community influence.
- [Nemotron Labs: What OpenClaw Agents Mean for Every Organization](https://blogs.nvidia.com/blog/what-openclaw-agents-mean-for-every-organization/) — NVIDIA blog frames OpenClaw's growth and security challenges as an enterprise governance inflection point.
- [OpenClaw: The AI Agent Security Crisis Unfolding Right Now](https://www.reco.ai/blog/openclaw-the-ai-agent-security-crisis-unfolding-right-now/) — Reco security analysis: "Identity dark matter" — unmanaged non-human agents — is the core exposure; OpenClaw deployments without network policies are the largest attack surface.

### NemoClaw

- [Olares OS Now Runs NVIDIA NemoClaw, Bringing Sandboxed AI Agents to Personal Hardware](https://www.prnewswire.com/news-releases/olares-os-now-runs-nvidia-nemoclaw-bringing-sandboxed-ai-agents-to-personal-hardware-302772155.html) — Announced at GOSIM Paris 2026 (May 14): NemoClaw runs natively on Olares One and NVIDIA DGX Spark via shared Kubernetes substrate; full blueprint portability across Olares-supported hardware.
- [Nvidia GTC 2026: Nvidia launches NemoClaw, eyes to pair with DGX Spark, DGX Station](https://www.constellationr.com/insights/news/nvidia-gtc-2026-nvidia-launches-nemoclaw-eyes-pair-dgx-spark-dgx-station) — Constellation Research retrospective on GTC announcement; DGX Spark integration is the key enterprise on-prem story.
- [Nvidia Solved the AI Agent Security Problem at GTC. The Payment Problem Is Still Ours.](https://www.fintechweekly.com/news/nvidia-nemoclaw-gtc-2026-ai-agents-enterprise-payments-crypto-2026) — FinTech Weekly analysis: NemoClaw's sandboxed policy presets address security; agentic payments (x402, ACP, AP2) remain unresolved for enterprise multi-agent workflows.
- [NemoClaw Review 2026: Features, Pricing, 7 Alternatives](https://www.taskade.com/blog/nemoclaw-review) — Taskade product roundup; hardware-agnostic runtime framed as main differentiator vs hosted alternatives.

### Plurality

- [Inside Audrey Tang's Plan to Align Technology with Democracy](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — TIME interview: Tang now ambassador-at-large on Oxford Accelerator Fellowship; world tour continues to promote Plurality framework as alternative to both AI centralisation and blockchain libertarianism.
- [Reframing Impact: AI Summit 2026 Democratization — Audrey Tang](https://ainowinstitute.org/wp-content/uploads/2026/02/Reframing-Impact_Democratization_Audrey-Tang.pdf) — AI Now Institute keynote: Plurality calls for "plural governance" centered on civil-society organisations; Tang warns synthesised content erodes cross-border cooperation trust.
- [AI and Democracy: Ambassador Audrey Tang on Plurality in Practice](https://podcasts.ox.ac.uk/ai-and-democracy-ambassador-audrey-tang-plurality-practice-transparency-and-collective-intelligence) — Oxford podcast: collaborative civic technologies and beneficial information flows as the Plurality implementation path.
- [Audrey Tang | Tech for Impact Summit 2026](https://tech4impactsummit.com/speakers/audrey-tang/) — Tang featured as keynote on democratic governance of AI; "putting AI in the loop of humanity" framing.

### Audrey Tang

- [Audrey Tang's BBC Interview Matters for the Future of Digital Governance and AI](https://www.projectspeaker.com/audrey-tangs-bbc-interview-matters-for-the-future-of-digital-governance-and-ai/) — BBC appearance covers cybersecurity, digital democracy, and international tech governance; TAP framing of AI trust erosion via synthetic content.
- [Audrey Tang — Right Livelihood Laureate 2025](https://rightlivelihood.org/the-change-makers/find-a-laureate/audrey-tang/) — Tang recognised as 2025 Right Livelihood Laureate for advancing social use of digital technology to empower citizens and heal societal divides.
- [Audrey Tang: Alignment Assemblies can enable us to govern AI collaboratively](https://rebootdemocracy.ai/blog/audrey-tang-ai-democracy/) — Reboot Democracy post: Tang proposes "Alignment Assemblies" as plural governance mechanism for AI policy; complements Plurality book framework.
- [Audrey Tang and Hélène Landemore on Taiwan's Digital Democracy](https://www.governance.ai/post/audrey-tang-and-helene-landemore-on-taiwans-digital-democracy-collaborative-civic-technologies-and-beneficial-information-flows) — GovAI blog: Taiwan as case study for participatory digital-governance export to other democracies.

### NVIDIA Nemotron

- [NVIDIA Debuts Nemotron 3 Family of Open Models](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Newsroom announcement: Nemotron 3 Nano Omni (30B-A3B hybrid MoE) tops six leaderboards for document intelligence, video, and audio understanding; 9× throughput vs comparable open omni models.
- [Diffusion Language Models Are Here: NVIDIA Nemotron-Labs DLM Architecture](https://dev.to/monuminu/diffusion-language-models-are-here-deep-dive-into-nvidias-nemotron-labs-dlm-architecture-2ke2) — DEV.to deep-dive: Nemotron-Labs DLM released on HuggingFace May 23, 2026; 24 K+ downloads in 24 hours; represents a non-autoregressive generation architecture pivot.
- [NVIDIA Launches Nemotron 3 Nano Omni Model — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — Combined vision + audio encoders eliminate separate perception models; designed for agentic reasoning at scale with lower inference cost.
- [NVIDIA Nemotron: Advanced Multimodal AI Models for Agentic Reasoning](https://www.nvidia.com/en-us/ai-data-science/foundation-models/nemotron/) — Product page: Nano / Super / Ultra tier family; NIM access via build.nvidia.com; mandatory stack component for GTC Taipei 2026 Agent Challenge.
- [Trusted LLM Security Operations with NVIDIA Nemotron](https://www.upwind.io/feed/trusted-llm-security-operations-nvidia-nemotron) — Upwind blog: Nemotron paired with Ceramic Supervised Generation for grounded enterprise responses; security-ops use case with auditability emphasis.

### PolkaSharks

- _No dedicated PolkaSharks posts or channel updates found in the last 24 h._ General Polkadot community news (Hyperbridge breach, Bulletin Chain, Proof-of-Frag tournament) is covered under the **Polkadot** section above. If PolkaSharks has a Vocus.cc, YouTube, or X channel, add it to `kol-list.yaml` so future digests can fetch directly.

---

## Cross-links

Pages this digest touches — wikilink to existing pages; no new stubs required (Anthropic and OpenAI each appear in ≥ 3 sections, stub pages created separately):

**Entities (existing):**
- [[entities/nvidia]] — Nemotron 3 Nano Omni + NemoClaw + DGX Spark coverage
- [[entities/peter-steinberger]] — OpenClaw creator; enterprise adoption/security news
- [[entities/audrey-tang]] — BBC interview, Oxford fellowship, AI Now Institute keynote, Right Livelihood Laureate
- [[entities/polkasharks]] — No posts today; mentioned under PolkaSharks sweep
- [[entities/polkadot]] — Hyperbridge breach, Bulletin Chain, Proof-of-Frag, DOT price, dev count
- [[entities/visa]] — TAP (Trusted Agent Protocol) agentic-payment update

**Entities (new stubs):**
- [[entities/anthropic]] — 4+ mentions across digest (Claude Managed Agents, 80× revenue, xAI deal, OpenClaw billing friction)
- [[entities/openai]] — 3+ mentions across digest (GPT-5.5 Instant, Codex, ChatGPT Healthcare/Finance)

**Concepts (existing):**
- [[concepts/nemotron]] — Nemotron 3 Nano Omni + DLM release
- [[concepts/nemoclaw]] — Olares OS integration, DGX Spark pairing
- [[concepts/openclaw]] — Security crisis (245 K exposed), v2026.5.4-beta.1, Anthropic billing friction
- [[concepts/hermes-agent-framework]] — OpenClaw/HERMES.md detection by Claude Code
- [[concepts/plurality]] — Tang BBC interview, AI Now Institute keynote, Oxford podcast
- [[concepts/agentic-payments]] — NemoClaw × FinTech Weekly piece; Klarna/ChatGPT shopping; Visa TAP
- [[concepts/dot-hard-cap]] — DOT hard cap v2.1.0 enacted March 2026; context for current price action
