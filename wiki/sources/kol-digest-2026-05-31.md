---
type: source
title: KOL + keyword digest — 2026-05-31
author: kol-daily-digest (automated)
date: "2026-05-31"
ingested: "2026-05-31"
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-05-31

> **Sweep summary:** 0 KOLs tracked (list is empty — use the kol-tracker skill to add entries), 11 keywords, ~30 items captured. Date window: items dated 2026-05-28 through 2026-05-31 unless noted otherwise.

---

## TL;DR

- **Anthropic had its biggest week on record**: Claude Opus 4.8 shipped (2026-05-28) with dynamic multi-agent orchestration (10s–100s of parallel agents) and self-hosted sandboxes in public beta; simultaneously Anthropic closed a $65 B Series H at ~$965 B valuation — now the most valuable AI startup, eclipsing OpenAI.
- **NVIDIA launched Nemotron 3 Nano Omni and Nemotron 3 Super** (both 2026-05-28) — the Nano Omni is a unified vision/audio/text model achieving 9× throughput over comparable open omni models; the Super is a hybrid Mamba-Transformer MoE delivering 5× higher throughput for agentic workloads — both timed to GTC Taipei (June 1–4).
- **OpenClaw shipped v2026.5.28-beta.3** but faces twin headwinds: four critical security flaws expose ~245 K public instances (Shodan/ZoomEye, May 2026), and Hermes Agent has overtaken it in daily downloads (458 B vs 173 B daily).
- **NemoClaw sandbox security is in question**: Lasso researchers (2026-05-13) demonstrated practical data-exfiltration techniques inside NemoClaw/OpenShell environments — abusing trusted tools and approved outbound connections to steal credentials — signaling that policy-based sandboxing alone may not be sufficient.
- **OpenAI confidentially filed IPO paperwork** (2026-05-20, Goldman Sachs + Morgan Stanley), was named Gartner Leader in enterprise coding agents (2026-05-27), and turned Codex CLI into a persistent autonomous agent runtime with Computer Use on Windows.

> _KOL list is currently empty. Add entries via the kol-tracker skill (`/kol-tracker add <name>`) so future digests include curated-channel coverage._

---

## KOL updates

_KOL list is empty — no entries under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml`. Add KOLs via the kol-tracker skill._

---

## Keyword sweep

### AI agents

- [Google Search's I/O 2026 updates: AI agents and more](https://blog.google/products-and-platforms/products/search/search-io-2026/) — Google upgraded Search with Gemini 3.5 Flash as the default model in AI Mode and introduced user-manageable AI search agents that run 24/7 in the background; users can create, customize, and manage multiple information agents directly in Search.
- [8 Ways AI Agents Are Evolving in 2026 — Salesforce](https://www.salesforce.com/blog/ai-agent-trends-2026/) — Five months into 2026, enterprise AI agents have shifted from monitoring to orchestration; context engineering and deterministic control layers are the dominant new patterns; fewer than 1 in 4 organizations have scaled agents to production despite ~two-thirds experimenting.
- [AI agent trends 2026 report — Google Cloud](https://cloud.google.com/resources/content/ai-agent-trends-2026) — Gartner projects 40% of enterprise applications will embed AI agents by end of 2026, up from < 5% in 2025; market growth from $7.8 B to $52 B+ by 2030.
- [Blue Yonder Model Training Factory + NVIDIA](https://www.salesforce.com/blog/ai-agent-trends-2026/) — Blue Yonder introduced a "Model Training Factory" for fine-tuning and testing supply-chain agents built in collaboration with NVIDIA.
- [7 Agentic AI Trends to Watch in 2026 — MachineLearningMastery.com](https://machinelearningmastery.com/7-agentic-ai-trends-to-watch-in-2026/) — Multi-agent orchestration, tool-use standardization, and memory persistence identified as the three highest-velocity sub-trends in agentic AI for H1 2026.

### Claude Code

- [Anthropic upgrades Claude with Opus 4.8, details here — 9to5Mac](https://9to5mac.com/2026/05/28/anthropic-upgrades-claude-with-new-opus-4-8-model-heres-whats-new/) (2026-05-28) — Claude Opus 4.8 released with stronger benchmarks, improved honesty ("more likely to flag uncertainties, less likely to make unsupported claims"), and effort control in claude.ai; high-effort mode matches Opus 4.7 token spend with better coding performance.
- [Anthropic's Code with Claude Announces Managed Agents, Proactive Workflows — InfoQ](https://www.infoq.com/news/2026/05/code-with-claude/) — Claude Code's new "dynamic workflows" feature orchestrates 10s–100s of background agents for large-scale tasks; self-hosted sandboxes (tool execution in user-controlled environments, agent loop on Anthropic infra) entered public beta; Claude Code rate limits doubled for Pro, Max, and Enterprise.
- [Live blog: Code w/ Claude 2026 — Simon Willison](https://simonwillison.net/2026/May/6/code-w-claude-2026/) — Anthropic hosted Code with Claude in San Francisco (2026-05-06) and London (2026-05-19); sessions published to YouTube.
- [Anthropic's Mythos Moves Closer to Claude Code — Winbuzzer](https://winbuzzer.com/2026/05/26/anthropics-mythos-moves-closer-to-claude-code-xcxwbn/) (2026-05-26) — Anthropic's internal "Mythos" project reportedly integrating tighter codebase-awareness into Claude Code; details sparse.

### Anthropic

- [Anthropic nears $1 trillion valuation — Bloomberg](https://www.bloomberg.com/news/articles/2026-05-28/anthropic-raises-at-965-billion-valuation-eclipsing-openai) (2026-05-28) — Anthropic closed a $65 B Series H at a $965 B valuation, led by Altimeter Capital, Dragoneer, Greenoaks, and Sequoia Capital; now the most valuable US AI startup, eclipsing OpenAI.
- [Anthropic tops OpenAI as most valuable AI startup — CNBC](https://www.cnbc.com/2026/05/28/anthropic-open-ai-startup-value.html) (2026-05-28) — CNBC confirms the $965 B round; contextualizes against OpenAI's recent valuation.
- [Anthropic forms $200 million partnership with the Gates Foundation](https://www.anthropic.com/news/gates-foundation-partnership) (2026-05-13) — Anthropic committed $200 M in grant funding, Claude usage credits, and technical support for global health, life sciences, education, and economic mobility programs over four years.
- [Anthropic Release Notes — May 2026 — Releasebot](https://releasebot.io/updates/anthropic) — Full May 2026 timeline: Claude Opus 4.7 (May 4) → SpaceX Colossus capacity deal + doubled rate limits (May 5) → Claude for Small Business + Code with Claude SF (May 6) → three new Managed Agents features (May 7) → Gates Foundation partnership (May 13) → PwC alliance expansion (May 14) → Stainless acquisition (May 18) → KPMG global alliance + Code with Claude London (May 19) → Claude Opus 4.8 (May 28).
- [Anthropic's Code with Claude showed off coding's future — MIT Technology Review](https://www.technologyreview.com/2026/05/21/1137735/anthropics-code-with-claude-showed-off-codings-future-whether-you-like-it-or-not/) (2026-05-21) — MIT Tech Review editorial: Anthropic's event demonstrated a vision of AI as collaborative engineering partner rather than replacement; reaction is polarized among professional developers.

### OpenAI

- [OpenAI to confidentially file for IPO — CNBC](https://www.cnbc.com/2026/05/20/openai-ipo-filing.html) (2026-05-20) — OpenAI filed a confidential draft S-1 prospectus with Goldman Sachs and Morgan Stanley; IPO expected in coming weeks.
- [OpenAI May 2026 Updates: GPT-5.5 Instant, Codex, GPT-5.6 — Codersera](https://codersera.com/blog/openai-may-2026-updates-roundup/) — GPT-5.5 Instant (May 5): 52.5% fewer hallucinations on high-stakes prompts, new ChatGPT default; Codex CLI promoted to persistent autonomous agent runtime; Computer Use on Windows added to Codex.
- [OpenAI named Gartner Leader in enterprise coding agents — OpenAI News](https://openai.com/news/) (2026-05-27) — OpenAI cited as a Leader in Gartner's new enterprise coding-agents evaluation; shared a Frontier Governance Framework for safety alongside the designation.
- [OpenAI + Dell Technologies partnership](https://openai.com/news/) (2026-05-18) — Dell Technologies partnered with OpenAI to bring Codex to hybrid and on-premises enterprise environments, targeting regulated industries.
- [OpenAI model disproves discrete geometry conjecture](https://openai.com/news/) — An OpenAI reasoning model independently disproved a central conjecture in discrete geometry; published as a demonstration of frontier research capability beyond code.

### Polkadot

- [DOT highlighted among top altcoins for altseason — The Motley Fool](https://www.fool.com/investing/2026/05/30/is-it-too-late-to-buy-crypto/) (2026-05-30) — DOT listed among altcoins poised for growth as market liquidity improves; currently trades ~$1.22, up 8% from all-time low ($1.13 on 2026-02-06) but down 97.8% from its all-time high ($55.13, Nov 2021).
- [Moonwell proposes Ethereum mainnet launch](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) (2026-05-29) — Moonwell, a Polkadot DeFi protocol, proposed expanding to Ethereum mainnet — a signal of cross-ecosystem expansion rather than Polkadot-exclusivity.
- [Bifrost returns 53,000 DOT in treasury loan yield](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) (2026-05-28) — Bifrost successfully returned yield from a 1 M DOT treasury loan, producing 53,000+ DOT in returns; a positive OpenGov treasury-experiment signal.
- ['Polkadot Is Kind of Done' — The Defiant](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) (May 2026) — Critical long-form piece arguing Polkadot's Layer-0 thesis has stalled; highlights low DOT price, parachain fatigue, and community uncertainty about the JAM timeline.
- [Polkadot Blockchain Academy 2026 and beyond](https://polkadot.academy/polkadot-blockchain-academy-2026-and-beyond-fuelling-the-second-era-of-polkadot/) — PBA reframes its mission around "fuelling the second era" of Polkadot; Polkadot leads all blockchains in total GitHub commits in 2026, signaling strong engineering momentum despite price weakness.

### OpenClaw

- [OpenClaw Release Notes — May 2026 — Releasebot](https://releasebot.io/updates/openclaw) — v2026.5.28-beta.3 shipped: steadier agent and Codex recovery (cwd/workspace separation, hook-context isolation, session-lock timeout release); safer channel delivery; stricter input validation; broader provider and media support; cold and warm agent turns faster; published tarball significantly smaller.
- [Four OpenClaw Flaws Enable Data Theft, Privilege Escalation, and Persistence — The Hacker News](https://thehackernews.com/2026/05/four-openclaw-flaws-enable-data-theft.html) (May 2026) — Four critical vulnerabilities discovered in OpenClaw's agent runtime; attackers can steal data, escalate privileges, and establish persistence inside running agent sessions.
- [OpenClaw Chain Vulnerabilities Expose 245,000 Public AI Agent Servers — Cybersecurity News](https://cybersecuritynews.com/openclaw-chain-vulnerabilities/) (May 2026) — Shodan and ZoomEye scans reveal ~65 K and ~180 K publicly accessible OpenClaw instances respectively (~245 K total); the majority appear to be misconfigured self-hosted deployments with no network isolation.
- [OpenClaw vs Hermes Agent: Stars, Downloads & Usage 2026 — DEV Community](https://dev.to/rosgluk/openclaw-vs-hermes-agent-stars-downloads-usage-2026-b07) — Hermes Agent daily volume (458 B) now leads OpenClaw (173 B) by 2.6×; Hermes more than doubled its volume in 11 days since the flip first occurred at 224 B vs 186 B on May 10; OpenClaw's daily volume has declined.

### NemoClaw

- [NVIDIA NemoClaw Research Highlights AI Sandbox Exfiltration Risks — eSecurity Planet](https://www.esecurityplanet.com/threats/nvidia-nemoclaw-research-highlights-ai-sandbox-exfiltration-risks/) (2026-05-13) — Lasso researchers demonstrated multiple data-exfiltration techniques against NemoClaw and OpenShell environments: attackers abused trusted tools and approved outbound connections to steal credentials, manipulate agent behavior, and maintain persistence inside the sandbox; sandboxing may not be sufficient to prevent sensitive data theft.
- [Release Notes — NVIDIA NemoClaw](https://docs.nvidia.com/nemoclaw/about/release-notes) — No specific May 2026 release noted in search results; most recent release activity preceded the security research disclosure.

### Plurality

- [Global Democracy Coalition 2026 Regional Forums — IDEA](https://www.idea.int/news/discover-global-democracy-coalition-regional-forums-2026-join-conversation-future-democracy) — GDC convening four 2026 regional forums (Africa, Americas, Asia-Pacific, Europe) focused on youth-led civic movements, digital activism, surveillance, and disinformation; one session explicitly covers how digital platforms are reshaping participation — directly in the Plurality intellectual tradition.
- [Plurality: The Future of Collaborative Technology and Democracy — CIGI](https://www.cigionline.org/multimedia/plurality-the-future-of-collaborative-technology-and-democracy/) — Ongoing academic engagement with the Weyl/Tang book; no breaking news item in last 24 h, but the concept is gaining institutional traction through the GDC forums.

### Audrey Tang

- [Audrey Tang joins democracy dialogue in Sweden — Right Livelihood](https://rightlivelihood.org/news/audrey-tang-joins-democracy-dialogue-in-sweden/) (2026-05-18) — Tang visited Gothenburg for a public conversation on participatory democracy, co-organized by Digidem Lab, Right Livelihood, and Gothenburg City Library; framing: Taiwan's digital democracy model as an alternative in an era when technology is seen as a democratic threat.
- [Interview: Audrey Tang on technology, democracy and human rights — GC Human Rights](https://www.gchumanrights.org/gc-news/conversations/interview-with-audrey-tang-2025-rightlivelihood-laureate/) (2026-05-26) — Global Campus of Human Rights pressed Tang on urgent issues in the tech–democracy intersection; Tang (2025 Right Livelihood Laureate) emphasized civic AI, digital inclusion, and Taiwan's open-government experience.
- [Audrey Tang at UC Santa Cruz on Civic AI and democratic renewal](https://x.com/audreyt/status/2054138453726761027) (2026-05-12) — Tang delivered a speech at UCSC arguing that universities can serve as "gardens of Civic AI and democratic renewal"; clip shared via her X account.

### NVIDIA Nemotron

- [NVIDIA Launches Nemotron 3 Nano Omni — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) (2026-05-28) — Nemotron 3 Nano Omni announced: unified open model for video, audio, image, and text; 9× higher throughput than comparable open omni models; tops six leaderboards for complex document intelligence, video and audio understanding; already adopted by Aible, Foxconn, Palantir; Dell/Oracle/Infosys evaluating.
- [Nemotron 3 Super Delivers 5x Higher Throughput for Agentic AI — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai/) (2026-05-28) — Nemotron 3 Super: hybrid Mamba-Transformer Mixture-of-Experts architecture; 5× higher throughput than the prior Nemotron Super line; designed for long-context agentic reasoning in production deployments.
- [NVIDIA Debuts Nemotron 3 Family — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) (2026-05-28) — Official announcement grouping Nano Omni + Super under the Nemotron 3 family umbrella; released under NVIDIA Open Model License; available via NIM on build.nvidia.com.
- [Nemotron 3 Nano Explained — Deep Infra](https://deepinfra.com/blog/nemotron-3-nano-nvidia-efficient-small-llm) — Technical explainer on the Nano's efficient architecture; positions it as a router/worker complement to the Super/Ultra in tiered inference pipelines.

### PolkaSharks

_No results for "PolkaSharks" as a channel or project in the last 24 h. Searched via WebSearch; only general Polkadot news returned. The entity [[entities/polkasharks]] notes the channel is vocus.cc-first with secondary Instagram/TikTok presence — those platforms are not accessible via WebSearch._

---

## Cross-links

Pages this digest touches:

**Entities**
- [[entities/nvidia]] — Nemotron 3 Nano Omni + Super launch; NemoClaw security research
- [[entities/polkadot]] — DOT altseason mention; Moonwell/Bifrost governance; The Defiant critique
- [[entities/polkasharks]] — No new content; channel access blocked for WebSearch
- [[entities/audrey-tang]] — Sweden dialogue; UC Santa Cruz; GC Human Rights interview
- [[entities/noaa-swpc]] — _(not directly touched this digest)_

**Concepts**
- [[concepts/nemotron]] — Nemotron 3 Nano Omni + Super; Nemotron 3 family launch
- [[concepts/nemoclaw]] — NemoClaw sandbox exfiltration research (Lasso, 2026-05-13)
- [[concepts/openclaw]] — v2026.5.28-beta.3; security flaws; Hermes overtake
- [[concepts/hermes-agent-framework]] — Hermes now leads OpenClaw in daily downloads
- [[concepts/plurality]] — Plurality book gaining institutional traction; GDC 2026 forums
- [[concepts/openshell-runtime]] — Named in NemoClaw exfiltration research as a co-target

**Synthesis**
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — NVIDIA Agent Challenge submission window closed 2026-05-28; Nemotron 3 family launches directly after deadline (GTC Taipei starts June 1)
- [[synthesis/spacesharks-mission-desk-verification-plan]] — NemoClaw sandbox exfiltration findings are relevant to the L4 sandbox-policy chaos test layer
- [[synthesis/spacesharks-trust-stack]] — OpenClaw security flaws and Hermes overtake reinforce the importance of the agentic-provenance and sandboxing layers

> **Stub decision:** No new entity/concept stub pages created. All topics with ≥ 3 mentions across this digest (Anthropic, NVIDIA, OpenClaw, NemoClaw, Polkadot) are already covered by existing wiki pages. The Nemotron 3 Nano Omni and Nemotron 3 Super are new model variants under the existing [[concepts/nemotron]] page — not a new entity.
