---
type: source
title: KOL + keyword digest — 2026-05-27
author: kol-daily-digest (automated)
date: "2026-05-27"
ingested: "2026-05-27"
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-05-27

## TL;DR

- **Anthropic landmark month**: Claude Opus 4.7 launched May 4, the "Code with Claude" London conference (May 19) shipped Managed Agents (Dreaming, multiagent orchestration, outcomes, webhooks) and doubled rate limits, and the company disclosed 80× Q1 revenue growth while projecting its first profitable quarter at ~$10.9 B Q2 revenue.
- **NVIDIA Nemotron 3 family expanded**: Nemotron 3 Nano Omni (multimodal: vision/audio/image/text, tops 6 leaderboards) and Nemotron 3 Super (120 B params / 12 B active, 5× throughput for agentic AI) launched; a Nemotron Coalition of global AI labs (Mistral, LangChain, Cursor, Perplexity, Black Forest Labs, etc.) was announced. NemoClaw has no new May-specific updates — last major news was March 2026 GTC.
- **OpenClaw shipped rapidly** across v2026.5.20–5.22 (Discord Voice Follow, meeting-notes plugin, 4 100× faster `/models` endpoint, Grok web search), but simultaneously disclosed 4 security CVEs enabling data theft, privilege escalation, and persistence.
- **Polkadot ecosystem stress**: DOT trading near all-time lows (~$1.22), Polkassembly quietly shut down after 5+ years, Polkadot Africa closed after 5 months of inactivity; Referendum 1890 sets a mandatory 10 000 DOT validator self-stake with enforcement around May 31.
- **KOL list is empty** — no KOL channels were swept. Add entries via the kol-tracker skill (`/kol-tracker` → "add KOL") to begin tracking individuals.

---

## KOL updates

_No KOLs are currently tracked. The `kols:` list in `.claude/skills/kol-tracker/kol-list.yaml` is empty. Use the kol-tracker skill to add entries._

---

## Keyword sweep

### AI agents

- [Google I/O 2026: Search enters the agent era](https://blog.google/products-and-platforms/products/search/search-io-2026/) — Gemini 3.5 Flash is now the default in AI Mode; users can create and manage multiple 24/7 information agents directly in Search.
- [7 Explosive AI Updates in May 2026](https://imfounder.com/science-tech/ai/ai-updates-may-2026/) — Camunda ProcessOS (AI intelligence layer for agentic business workflows, closed beta May 20) and Blue Yonder "Model Training Factory" (supply-chain agents, NVIDIA collaboration) are the standout enterprise agent launches.
- [Agent AI Is Coming. Are You Ready?](https://thehackernews.com/2026/05/agent-ai-is-coming-are-you-ready.html) — Okta/CyberScoop report: identity dark matter exceeds visible IAM assets 57% to 43%; broad agent permissions and orphaned access now constitute a structural security risk.
- [Google Cloud AI Agent Trends 2026 report](https://cloud.google.com/resources/content/ai-agent-trends-2026) — Published June 2026 Q2 trends report; AI agents are transitioning from chatbot to "software worker" classification with real spend authority.
- [Microsoft + xAI agree to regulatory pre-release access](https://imfounder.com/science-tech/ai/ai-updates-may-2026/) — Both companies will provide governments early model access for safety testing, a first-mover regulatory posture likely to spread.

### Claude Code

- [Code with Claude conference — MIT Tech Review coverage](https://www.technologyreview.com/2026/05/21/1137735/anthropics-code-with-claude-showed-off-codings-future-whether-you-like-it-or-not/) — Two-day London event (May 19–20); nearly half the packed audience had shipped a PR fully written by Claude in the past week.
- [Claude Managed Agents announced](https://www.infoq.com/news/2026/05/code-with-claude/) — Four new features: Dreaming (scheduled session review + memory curation), multiagent orchestration, outcomes, and webhooks; doubles Claude Code rate limits and raises Claude Opus API limits effective immediately.
- [What's new in Claude Code — Agent view + /goal](https://code.claude.com/docs/en/whats-new) — Week 20 update ships Agent view (one-screen session dashboard showing running/blocked/done state) and the `/goal` command that keeps Claude working across turns until a condition holds.
- [Claude Security public beta](https://releasebot.io/updates/anthropic/claude-code) — Repo scanning, vulnerability explanations, and patch guidance; in public beta for Claude Enterprise; Team and Max access coming soon.
- [Windows without Git Bash](https://releasebot.io/updates/anthropic/claude-code) — Claude Code now uses PowerShell as the shell tool when Git Bash is absent, removing the last major Windows onboarding blocker.

### Anthropic

- [Claude Opus 4.7 launched](https://www.anthropic.com/news) — Released May 4; next step in the Opus line; improved vision and creative capabilities; API model ID `claude-opus-4-7`.
- [Anthropic grew 80-fold in Q1 — renting SpaceX Colossus](https://fortune.com/2026/05/08/anthropic-80fold-growth-quarter-renting-elon-musk-data-center/) — Revenue and usage grew 80× in Q1 on an annualized basis; Anthropic is turning to SpaceXAI orbital data centers for additional compute headroom.
- [Gates Foundation $200 M partnership](https://www.anthropic.com/news/gates-foundation-partnership) — Four-year commitment: grant funding, Claude usage credits, and technical support for global health, life sciences, education, and economic mobility programs.
- [First profitable quarter projected](https://techcrunch.com/2026/05/20/anthropic-says-its-about-to-have-its-first-profitable-quarter/) — Anthropic told investors it will more than double revenue to ~$10.9 B in Q2 and deliver an operating profit for the first time.
- [Acquired Stainless (May 18)](https://releasebot.io/updates/anthropic) — SDK tooling startup acquired; assumed to strengthen Claude API and developer platform capabilities.

### OpenAI

- [OpenAI filing for IPO confidentially](https://www.cnbc.com/2026/05/20/openai-ipo-filing.html) — Confidential draft prospectus filed May 20; working with Goldman Sachs and Morgan Stanley; targeting a fall public debut.
- [OpenAI to spend $50 B on compute in 2026](https://www.bloomberg.com/news/articles/2026-05-05/openai-to-spend-50-billion-on-computing-in-2026-brockman-says) — Brockman confirmed the figure; signals sustained infrastructure arms race with Anthropic and Google.
- [Codex added to ChatGPT mobile app](https://openai.com/news/) — Preview: users can review work, approve commands, and monitor coding tasks from mobile.
- [ChatGPT personal finance experience](https://openai.com/news/) — Pro users in the US can now securely connect financial accounts and view a money dashboard; marks first step into the fintech / agentic payments space.
- [Dell + OpenAI Codex on-prem partnership](https://openai.com/news/) — Brings Codex to hybrid and on-premises enterprise environments; competes directly with GitHub Copilot for enterprise deployments.

### Polkadot

- [Polkadot price outlook: Referendum 1890](https://invezz.com/news/2026/05/26/polkadot-price-outlook-how-referendum-1890-could-move-dot/) — Referendum 1890 mandates validators hold a minimum self-stake of 10 000 DOT; enforcement deadline ~May 31, 2026; could force validator churn and short-term DOT supply pressure.
- ['Polkadot Is Kind of Done' — ecosystem update](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) — DOT at ~$1.22 (near all-time low); Polkassembly governance platform shut down after 5+ years; Polkadot Africa initiative closed after 5 months of inactivity.
- [9 032 active Polkadot developers — Chainspect](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Developer count remains competitive with Ethereum and Solana even as price declines; signals that technical activity is holding despite market pessimism.

### OpenClaw

- [What's New in OpenClaw May 2026 — v2026.5.3 to v2026.5.5](https://blink.new/blog/openclaw-whats-new-may-2026) — Faster gateway auth warmup, improved onboarding, Discord Voice Follow (v2026.5.20), meeting-notes plugin + 4 100× faster `/models` endpoint (v2026.5.22), Grok web search, smarter sub-agent context.
- [Four OpenClaw flaws enable data theft, privilege escalation, and persistence](https://thehackernews.com/2026/05/four-openclaw-flaws-enable-data-theft.html) — Security researchers disclosed 4 CVEs; no patch timeline mentioned in the article; relevant to any NemoClaw + OpenClaw sandbox deployment.
- [What OpenClaw agents mean for every organization — NVIDIA Blog](https://blogs.nvidia.com/blog/what-openclaw-agents-mean-for-every-organization/) — NVIDIA framing OpenClaw/NemoClaw as enterprise infrastructure, not a developer toy; positions NemoClaw's guardrails as the missing trust layer.
- [OpenClaw v2026.5.4: Twilio dial-in for Google Meet](https://blink.new/blog/openclaw-whats-new-may-2026) — Paced audio streaming + backpressure-aware buffering + barge-in queue clearing; significantly improves OpenClaw voice-agent experience in Meet calls.

### NemoClaw

- _No new NemoClaw-specific announcements found in the last 24 h. Last major news: NVIDIA announced NemoClaw at GTC March 2026._ See the adjacent NVIDIA Nemotron section for the latest model-family updates relevant to NemoClaw deployments.
- [NVIDIA Nemotron blog: what OpenClaw agents mean for organizations](https://blogs.nvidia.com/blog/what-openclaw-agents-mean-for-every-organization/) — NVIDIA continues to position NemoClaw as the security/privacy wrapper that makes OpenClaw enterprise-safe.
- [OpenClaw CVEs — impact on NemoClaw](https://thehackernews.com/2026/05/four-openclaw-flaws-enable-data-theft.html) — The 4 newly disclosed OpenClaw CVEs (data theft, privilege escalation, persistence) are relevant to NemoClaw deployments if the default OpenClaw profile is used inside the sandbox; monitor for NVIDIA advisory.

### Plurality

- [Audrey Tang at UC Santa Cruz — Civic AI speech](https://x.com/audreyt/status/2054138453726761027) — May 12 speech at UCSC on Civic AI and democratic renewal; framed universities as "gardens of Civic AI" and called for institutions to lead pluralist democratic experimentation.
- [Audrey Tang joins democracy dialogue in Sweden](https://rightlivelihood.org/news/audrey-tang-joins-democracy-dialogue-in-sweden/) — May 18; conversation organized by Digidem Lab, Right Livelihood, and Gothenburg City Library on the future of participatory democracy.
- _Plurality governance search returned no direct Plurality-book or Plurality-project news this cycle; results were dominated by corporate governance (Flutter Entertainment) and generic voting-standard articles. No new Plurality project announcements identified._

### Audrey Tang

- [UC Santa Cruz — Civic AI and democratic renewal speech (May 12)](https://x.com/audreyt/status/2054138453726761027) — Tang: "halls of higher education can be our gardens of Civic AI and democratic renewal."
- [Sweden democracy dialogue with Digidem Lab (May 18)](https://rightlivelihood.org/news/audrey-tang-joins-democracy-dialogue-in-sweden/) — Focus on participatory democracy; organized with Right Livelihood Award program.
- [SXSW London 2026 speaker](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Tang is listed as a confirmed speaker; event in London; topic expected to overlap with Plurality and Civic AI themes.
- [Current role: Taiwan Cyber Ambassador-at-Large](https://en.wikipedia.org/wiki/Audrey_Tang) — Transitioned from Digital Minister role; Right Livelihood Award 2025 recipient for digital civic engagement work.

### NVIDIA Nemotron

- [Nemotron 3 Nano Omni: multimodal agent model](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — Unifies vision, audio, image, and text in a single open model; tops 6 leaderboards for document intelligence, video understanding, and audio understanding; sets new efficiency frontier.
- [Nemotron 3 Super: 5× higher throughput for agentic AI](https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai/) — 120 B parameters / 12 B active; hybrid Mamba-Transformer architecture; designed for always-on agent workloads; available via NVIDIA NIM.
- [Nemotron Coalition of global AI labs announced](https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models) — Founding members: Black Forest Labs, Cursor, LangChain, Mistral AI, Perplexity, Reflection AI, Sarvam, Thinking Machines Lab; goal: advance open frontier models in the NVIDIA ecosystem.
- [Nemotron Speech: real-time open ASR](https://nvidianews.nvidia.com/news/nvidia-expands-open-model-families-to-power-the-next-wave-of-agentic-physical-and-healthcare-ai) — Leaderboard-topping open model for real-time, low-latency speech recognition; key for voice-agent deployments including OpenClaw voice-call features.
- [Inside Nemotron 3: techniques, tools, and training data — NVIDIA Technical Blog](https://developer.nvidia.com/blog/inside-nvidia-nemotron-3-techniques-tools-and-data-that-make-it-efficient-and-accurate/) — Deep-dive on architecture choices; relevant for NemoClaw hackathon participants selecting the right model variant (Super vs Nano Omni vs Ultra-253B).

### PolkaSharks

- _No new public content found for PolkaSharks in this sweep. The account operates primarily on vocus.cc (which is JS-rendered and not indexed in web search) with limited social-media presence; new content may exist but is not surfaced by search engines._
- _Polkadot ecosystem context (see [[entities/polkadot]] and the Polkadot keyword section above) remains relevant to PolkaSharks topics._

---

## Cross-links

Entities and concepts touched by this digest:

- [[entities/nvidia]] — Nemotron 3 family, NemoClaw, OpenClaw enterprise positioning
- [[concepts/nemotron]] — Nano Omni + Super launched; Nemotron Coalition; Speech model
- [[concepts/nemoclaw]] — No new May releases; CVE exposure from OpenClaw flaws warrants monitoring
- [[concepts/openclaw]] — v2026.5.20–5.22 releases; 4 CVEs disclosed
- [[entities/polkadot]] — Referendum 1890; DOT near all-time low; Polkassembly + Africa shutdown
- [[entities/audrey-tang]] — UCSC Civic AI speech; Sweden democracy dialogue; SXSW London
- [[concepts/plurality]] — Audrey Tang continues Civic AI framing; no direct Plurality project news
- [[concepts/hermes-agent-framework]] — Claude Managed Agents (Dreaming, multiagent) reflects similar capability trajectory to Hermes learning loop
- [[concepts/agentic-provenance]] — Claude Security beta (audit trail, vulnerability guidance) is a direct analogue to the provenance layer in the Spacesharks trust stack
- [[entities/nous-research]] — Nous Research / Hermes mentioned as Nemotron Coalition adjacent (LangChain, Mistral as members)
