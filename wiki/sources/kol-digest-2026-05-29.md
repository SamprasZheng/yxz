---
type: source
title: KOL + keyword digest — 2026-05-29
author: kol-daily-digest (automated)
date: "2026-05-29"
ingested: "2026-05-29"
tags: [digest, kol, daily]
---

# KOL + Keyword Digest — 2026-05-29

## TL;DR

- **Anthropic reaches near-$1T valuation**: raised $65B at $965B valuation on 2026-05-28 (Altimeter / Dragoneer / Greenoaks / Sequoia), eclipsing OpenAI for the first time; simultaneously launched Claude Opus 4.8 with 1M-token context window and reported a $47B annualised revenue run rate.
- **Claude Code doubles the clock + ships sandboxed agents**: the Code with Claude London event (2026-05-19) revealed a doubled 5-hour Pro/Max limit, private MCP server support inside Claude Managed Agents self-hosted sandboxes, and a new Claude Security repo-scanning layer — usage grew 80× year-on-year vs. the planned 10×.
- **NVIDIA Nemotron 3 goes multimodal**: Nemotron 3 Nano Omni handles video/audio/image/text at 9× throughput vs. comparable open models; companion Nemotron-Labs-Diffusion (tri-mode: AR + diffusion + self-speculation) decodes 5.9× more tokens per forward pass than Qwen3-8B.
- **OpenClaw 2026.5.27-alpha.1 + four CVEs patched**: new alpha ships after responsible-disclosure fix; ecosystem is drifting toward MCP-connected tools, voice-enabled agents, and persistent agent state.
- **Polkadot Referendum 1890 heads to May 31 enactment**: 10K DOT validator self-stake requirement, nominators become unslashable, unbonding drops 28 days → 24–48 hours; Polkadot Africa and Polkassembly both shuttered this month — DOT trades near all-time-low at $1.22.

> **KOL list is empty** — no KOL channels are being tracked yet. Add entries via the `kol-tracker` skill (`/kol-tracker` → "add KOL") to enable the KOL updates section.

---

## KOL Updates

_No KOLs are currently tracked. The kol-list.yaml `kols:` section is empty. Use the kol-tracker skill to add KOLs._

---

## Keyword Sweep

### AI agents

- [Anthropic Claude Managed Agents: self-hosted sandboxes + MCP tunnels public beta](https://www.anthropic.com/news) — Anthropic released public-beta self-hosted sandbox support and a research-preview "MCP tunnels" feature letting agents call internal MCP servers via an outbound-only encrypted gateway (2026-05-19).
- [Google information agents — AI-powered Alerts launching for Pro/Ultra](https://blog.google/products-and-platforms/products/search/search-io-2026/) — Google I/O 2026: information agents run 24/7 background sweeps on market trends, price tracking, and weather; first for AI Pro & Ultra subscribers, summer 2026.
- [Camunda ProcessOS: agentic process automation closed beta](https://techcrunch.com/2026/05/21/google-is-pitching-an-ai-agent-ecosystem-to-consumers-who-may-not-buy-it/) — Camunda announced ProcessOS (AI intelligence layer that discovers, re-engineers, and optimises business processes as agentic workflows) at CamundaCon; closed beta from 2026-05-20.
- [NVIDIA-verified agent skills pipeline published](https://aiagentstore.ai/ai-agent-news/this-week) — NVIDIA published developer resources for "NVIDIA-verified agent skills": a catalog/scan/sign/document pipeline with machine-readable skill cards (2026-05-19).
- [The Hacker News: "Agent AI is Coming. Are You Ready?"](https://thehackernews.com/2026/05/agent-ai-is-coming-are-you-ready.html) — Overview of agentic AI deployment trends, identity-dark-matter security risks (57% vs 43% ratio per Orchid Security), and enterprise readiness (2026-05-19).

### Claude Code

- [Code with Claude London 2026 — event recap](https://www.infoq.com/news/2026/05/code-with-claude/) — Two-day developer event 2026-05-19 in London (SF: 2026-05-06); announced Managed Agents, Proactive Workflows, and expanded Capability Curve rollout.
- [Claude Code 5-hour limit doubled; richer review automation](https://releasebot.io/updates/anthropic/claude-code) — Pro, Max, and Enterprise customers get 2× the session time; new skill and hook controls, better session/workflow visibility, improved plugin management.
- [Claude Managed Agents: sandbox + private MCP server support](https://www.anthropic.com/news) — Agents can now execute tools inside a user-controlled sandbox and connect to private MCP servers — both environment and services stay within enterprise boundaries.
- [Claude Security: repo scanning, vulnerability explanations, patch guidance](https://releasebot.io/updates/anthropic) — New security layer for Claude Code surfaces repo vulnerabilities with natural-language explanations and suggested patches.
- [MIT Technology Review: "Code with Claude showed off coding's future"](https://www.technologyreview.com/2026/05/21/1137735/anthropics-code-with-claude-showed-off-codings-future-whether-you-like-it-or-not/) — Editorial take on Code with Claude event: AI-assisted coding becoming default for professional developers, debate on skill atrophy (2026-05-21).

### Anthropic

- [Anthropic raises $65B at $965B valuation — eclipses OpenAI](https://www.bloomberg.com/news/articles/2026-05-28/anthropic-raises-at-965-billion-valuation-eclipsing-openai) — Funding round led by Altimeter Capital, Dragoneer, Greenoaks, and Sequoia Capital; first time Anthropic's valuation surpasses OpenAI's (2026-05-28).
- [Claude Opus 4.8 launched — 1M token context, 128k output](https://www.anthropic.com/news) — Most capable generally available Claude model; 1M-token context window by default on Claude API, Amazon Bedrock, and Vertex AI; 128k max output tokens.
- [Revenue run rate hits $47B; 80× annualised growth](https://winbuzzer.com/2026/05/26/anthropics-mythos-moves-closer-to-claude-code-xcxwbn/) — Q1 2026 revenue and usage grew 80× annualised rather than the planned 10×; Anthropic reportedly raising at a $900B→$965B valuation trajectory.
- [Milan office opening; Seoul representative director appointed](https://www.anthropic.com/news) — Anthropic opened a Milan office on 2026-05-27 for Italian enterprise/research/developers; KiYoung Choi appointed Representative Director of Korea ahead of Seoul office opening (2026-05-26).
- [Gates Foundation $200M partnership](https://www.anthropic.com/news/gates-foundation-partnership) — Anthropic announced a $200M partnership with the Bill & Melinda Gates Foundation targeting global health and development AI applications.

### OpenAI

- [Gartner names OpenAI a Leader in enterprise coding agents](https://openai.com/news/) — OpenAI recognised in Gartner's enterprise coding agents Magic Quadrant (2026-05-27).
- [DeployCo launched — $4B consulting subsidiary, acquires Tomoro](https://www.buildfastwithai.com/blogs/ai-news-today-may-28-2026) — OpenAI launched the OpenAI Deployment Company (DeployCo), a majority-owned consulting subsidiary backed by $4B from 19 investment firms; simultaneously acquired Tomoro (150 forward-deployed engineers) for initial ops capacity (2026-05-11).
- [OpenAI IPO preparation under way](https://openai.com/news/product-releases/) — OpenAI is reportedly preparing to file for an initial public offering; timeline not confirmed.

### Polkadot

- [Referendum 1890: 10K DOT validator self-stake — enacts May 31](https://invezz.com/news/2026/05/26/polkadot-price-outlook-how-referendum-1890-could-move-dot/) — 100% Aye support; mandates minimum 10K DOT self-stake per validator (~$12.4K at current price); also removes nominator slashing and cuts unbonding from 28 days to 24–48 hours.
- [Polkadot Africa initiative closes after five months of inactivity](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) — Community-driven initiative announced closure on 2026-05-22 following Web3 Foundation ending direct funding for such programs.
- [Polkassembly governance platform quietly shuts down](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) — After 5+ years of operations, the primary Polkadot OpenGov discussion/voting interface has shut down.
- [DOT near all-time low: $1.22 (+8% from Feb ATL of $1.13)](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — DOT down 97.8% from ATH $55.13; prediction markets rank DOT last among major altcoins for expected 2026 returns.
- [9,032 active developers on Polkadot as of May 2026](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) — Developer count (Chainspect data) remains competitive with Ethereum and Solana despite price weakness.

### OpenClaw

- [OpenClaw 2026.5.27-alpha.1 released](https://github.com/openclaw/openclaw/releases) — New alpha marks faster Gateway and reply paths, more reliable transcript/media handling, broader channel support, stronger security boundaries, and improved observability.
- [Four OpenClaw flaws patched after responsible disclosure](https://thehackernews.com/2026/05/four-openclaw-flaws-enable-data-theft.html) — Vulnerabilities enabled data theft, privilege escalation, and persistence; patched in version 2026.4.22.
- [May 24 release: faster startup, meeting capture, session helpers, observability smoke tests](https://releasebot.io/updates/openclaw) — Infrastructure release targeting operational/multi-agent installs: package integrity gates, SecretRef guidance, context-pressure preflights.
- [NVIDIA Blog: "What OpenClaw Agents Mean for Every Organization"](https://blogs.nvidia.com/blog/what-openclaw-agents-mean-for-every-organization/) — NVIDIA editorial on enterprise implications of the OpenClaw + NemoClaw agent model.
- [Trend: market drifting toward MCP-connected tools, voice agents, persistent state](https://releasebot.io/updates/openclaw) — OpenClaw release notes analysis: explicit provider routing, scheduled work, and long-horizon persistent agents are the dominant adoption vector in May 2026.

### NemoClaw

- [Nemotron-Labs-Diffusion: tri-mode LM paper published (May 2026)](https://research.nvidia.com/publication/2026-05_nemotron-labs-diffusion-tri-mode-language-model-unifying-autoregressive) — NVIDIA Research introduces tri-mode architecture unifying AR, diffusion, and self-speculation decoding; Nemotron-Labs-Diffusion-8B decodes 5.9× more tokens per forward than Qwen3-8B; 4× throughput on SPEED-Bench with SGLang on GB200.
- [NVIDIA Blog + NVIDIA Newsroom: NemoClaw for OpenClaw community (GTC 2026)](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — Primary announcement was March 2026 GTC; no new NemoClaw product announcements in the 2026-05-29 window, but NVIDIA is actively publishing operator content and the NVIDIA Blog "What OpenClaw Agents Mean" post cross-promotes the NemoClaw stack.
- [Dell DGX Pro Max with GB10/GB300 — first NemoClaw-purpose-built desktop](https://www.constellationr.com/insights/news/nvidia-gtc-2026-nvidia-launches-nemoclaw-eyes-pair-dgx-spark-dgx-station) — Dell announced DGX systems designed specifically for local NemoClaw agent builds; on sale ahead of GTC Taipei 2026-06-01.

### Plurality

- [Audrey Tang — Right Livelihood interview: tech, democracy, and ROOST (2026-05-26)](https://www.gchumanrights.org/gc-news/conversations/interview-with-audrey-tang-2025-rightlivelihood-laureate/) — Global Campus of Human Rights interviewed the 2025 Right Livelihood Laureate on technology, democracy, and the ROOST (Robust Open Online Safety Tools) initiative launched at the 2025 Paris AI Summit.
- [Audrey Tang speech at UC Santa Cruz: "From Polarization to Co-Creation" (2026-05-12)](https://x.com/audreyt/status/2054138453726761027) — Tang spoke on Civic AI and democratic renewal at UCSC; framed halls of higher education as "gardens of CivicAI and democratic renewal."
- [Sweden democracy dialogue with Digidem Lab + Right Livelihood (2026-05-18)](https://rightlivelihood.org/news/audrey-tang-joins-democracy-dialogue-in-sweden/) — Public conversation on the future of participatory democracy at Gothenburg City Library; organised by Digidem Lab in collaboration with Right Livelihood.

### Audrey Tang

- [Right Livelihood interview on technology, democracy, human rights (2026-05-26)](https://www.gchumanrights.org/gc-news/conversations/interview-with-audrey-tang-2025-rightlivelihood-laureate/) — Tang discussed her current role as Taiwan's cyber ambassador and Oxford Ethics in AI fellow, and the ROOST initiative _(see also: Plurality section above)_.
- [TED 2026 #FreetheFuture — LinkedIn post](https://www.linkedin.com/posts/tangaudrey_ted2026-freethefuture-activity-7450193617467383809-DWe2) — Tang shared a TED 2026 post with the #freethefuture theme; no additional detail indexed.
- [SXSW London 2026 speaker profile](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Tang listed as confirmed speaker at SXSW London 2026; theme details not yet public.
- [Tech for Impact Summit 2026 speaker](https://tech4impactsummit.com/speakers/audrey-tang) — Tang confirmed speaker at Tech for Impact Summit 2026.

### NVIDIA Nemotron

- [Nemotron 3 Nano Omni launched — multimodal open model](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — Handles video, audio, image, and text; 9× higher throughput than other open omni models at equivalent interactivity; tops 6 leaderboards for complex document intelligence plus video/audio understanding.
- [Nemotron-Labs-Diffusion: AR + diffusion + self-speculation tri-mode LM](https://research.nvidia.com/publication/2026-05_nemotron-labs-diffusion-tri-mode-language-model-unifying-autoregressive) — 8B model; 5.9× more tokens per forward than Qwen3-8B with better accuracy; 4× throughput on SPEED-Bench; enables faster agentic inference without separate speculative-decoding infrastructure.
- [Nemotron Speech: new ASR model, 10× faster than class competitors](https://blogs.nvidia.com/blog/open-models-data-tools-accelerate-ai/) — Part of Nemotron family expansion into speech; real-time, low-latency speech recognition for live captions and speech AI; top of ASR leaderboards at announcement.
- [Nemotron 3 Super and Ultra: first-half 2026 timeline confirmed](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — NVIDIA confirms both Super and Ultra variants remain on H1 2026 release schedule; Nano Omni is the first ship from the Nemotron 3 family.

### PolkaSharks

_No new PolkaSharks-specific content found in the 2026-05-29 sweep. The vocus.cc/salon/Polkasharks channel was not indexed with new posts in the last 24h. General Polkadot news (Referendum 1890, Africa closure, Polkassembly shutdown) is captured under the Polkadot keyword above._

---

## Cross-links

Existing wiki pages touched by this digest:

- [[entities/nvidia]] — NemoClaw, Nemotron 3 Nano Omni, Nemotron-Labs-Diffusion, OpenClaw blog
- [[concepts/nemotron]] — Nemotron 3 Nano Omni, Nemotron-Labs-Diffusion, Nemotron Speech, Super/Ultra timeline
- [[concepts/nemoclaw]] — Nemotron-Labs-Diffusion context; Dell DGX; NVIDIA Blog cross-promotion
- [[concepts/openclaw]] — 2026.5.27-alpha.1 release, 4 CVEs, MCP-connected trends
- [[entities/peter-steinberger]] — OpenClaw creator; ongoing releases
- [[concepts/hermes-agent-framework]] — Referenced in NemoClaw ecosystem; port 8642 integration
- [[entities/polkadot]] — Referendum 1890, Africa closure, Polkassembly shutdown, DOT price
- [[entities/polkasharks]] — No new content; channel check confirmed
- [[entities/audrey-tang]] — Right Livelihood interview, UCSC speech, Sweden dialogue, TED 2026
- [[concepts/plurality]] — ROOST initiative, Civic AI framing at UCSC
- [[entities/anthropic]] — $965B raise, Claude Opus 4.8, $47B run rate, Code with Claude events _(stub created this digest)_
- [[concepts/claude-code]] — 5-hour limit doubled, Managed Agents sandbox, Security layer _(future ingest candidate)_
- [[concepts/dot-hard-cap]] — 2.1B DOT cap context for Referendum 1890 validator-economics story
