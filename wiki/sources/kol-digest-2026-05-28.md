---
type: source
title: KOL + keyword digest — 2026-05-28
author: kol-daily-digest (automated)
date: 2026-05-28
ingested: 2026-05-28
tags: [digest, kol, daily]
---

## TL;DR

- **Claude Managed Agents enters public beta with self-hosted sandboxes and MCP tunnels** (Code w/ Claude London, May 26): agents now execute tools inside operator-controlled infrastructure (Cloudflare, Daytona, Modal, Vercel, or self-hosted) and connect to private MCP servers — the most significant Claude Code deployment milestone of the month.
- **OpenClaw v2026.5.26 shipped May 27** with production-ready Telegram, iMessage, WhatsApp, Discord, and Signal channels, faster Gateway startup via metadata caching, transcript-backed meeting summaries, and SSRF/prompt-injection hardening — despite "OpenClaw is dead" sentiment spreading in developer forums.
- **NVIDIA Nemotron 3 Nano Omni** (released April 28) is the newest Nemotron family entry: a 30B active-parameter open multimodal model unifying vision, audio, video, and text, achieving 9× higher throughput than competing omnimodal models; Nemotron 3 Super and Ultra remain on track for H1 2026.
- **Polkadot under structural pressure**: Polkassembly governance platform quietly shut down, Polkadot Africa closed May 22, and Ref 1890 validator transition deadline looms May 31 with DOT near $1.24; a bright note is 9,032 active developers (competitive with Ethereum and Solana).
- **Today is the NVIDIA Agent Challenge 2026 deadline (owner-reported May 28 12:00 PM)** — the Spacesharks Mission Desk entry targeting the Nemotron + Hermes + NemoClaw stack is due; GTC Taipei conference opens June 1–4 and will likely surface follow-on NemoClaw/Nemotron news.
- _KOL list is empty — add entries via the kol-tracker skill (`/kol-tracker`) so future digests include curated channel updates._

## KOL updates

_No KOLs configured. The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is empty. Add entries via the kol-tracker skill to populate this section in future digests._

## Keyword sweep

### AI agents

- [Google launches AI information agents + upgrades AI Mode to Gemini 3.5 Flash](https://techcrunch.com/2026/05/21/google-is-pitching-an-ai-agent-ecosystem-to-consumers-who-may-not-buy-it/) — Google reinvents Alerts as 24/7 background agents for market-trend and price tracking; Gemini 3.5 Flash is now the global default in Search AI Mode.
- [Anthropic Claude Managed Agents: self-hosted sandboxes + MCP tunnels in public beta](https://claude.com/blog/code-w-claude-london-2026-rethinking-how-we-build) — Announced at Code w/ Claude London (May 26); agents can run tool execution on operator-controlled infra and connect to private MCP servers; supports Cloudflare, Daytona, Modal, and Vercel as managed providers.
- [Camunda ProcessOS: AI-powered agentic process intelligence layer in closed beta](https://aiagentstore.ai/ai-agent-news/this-week) — Discovers, re-engineers, and continuously optimizes business processes as agentic workflows; closed beta since May 20.
- [NVIDIA publishes "verified agent skills" pipeline spec (May 19)](https://blogs.nvidia.com/blog/open-models-data-tools-accelerate-ai/) — Developer spec for cataloguing, scanning, signing, and documenting portable NemoClaw skill packages; infrastructure for a verified agent marketplace.
- [Alteryx Agent Studio unveiled at Inspire 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Business analysts can convert existing data workflows into autonomous agents without centralized IT; no-code builder targeting enterprise data teams.

### Claude Code

- [Code w/ Claude London 2026 (May 26–27) — self-hosted sandboxes, MCP tunnels, European debut](https://claude.com/blog/code-w-claude-london-2026-rethinking-how-we-build) — Two-day conference; headline feature is Claude Managed Agents running tools inside operator infra; two full days of keynotes, breakouts, and workshops with Anthropic teams.
- [Week 20 digest (May 11–15, v2.1.139–v2.1.142): Agent view, /goal, Opus 4.7 fast mode, Rewind compress](https://code.claude.com/docs/en/whats-new) — `claude agents` gives one screen for all running sessions; `/goal` keeps Claude working until a completion condition holds; fast mode defaults to Opus 4.7; Rewind can compress older context with "Summarize up to here."
- [MIT Technology Review: Code w/ Claude showed off coding's future](https://www.technologyreview.com/2026/05/21/1137735/anthropics-code-with-claude-showed-off-codings-future-whether-you-like-it-or-not/) — Editorial on how the coding-agent paradigm is reshaping software development, with mixed but substantive developer reception.

### Anthropic

- [Claude Managed Agents: self-hosted sandboxes and MCP tunnels enter public beta](https://www.anthropic.com/news) — Major trust-boundary milestone: agent tool execution now moves to operator infrastructure; MCP tunnels let private servers connect inside Claude's boundary.
- [Project Glasswing expands: Claude Security public beta + cyber verification tools](https://www.anthropic.com/news) — Eligible security teams can scan codebases, triage vulnerabilities, and generate fixes using Claude Security.
- [Anthropic grew 80-fold in a single quarter; renting SpaceX data-center capacity](https://fortune.com/2026/05/08/anthropic-80fold-growth-quarter-renting-elon-musk-data-center/) — Revenue surge forcing Anthropic to rent compute from SpaceX facilities; signals demand is outpacing owned infrastructure.
- [Anthropic top-10 2026 hires poaching from OpenAI, Google, xAI, and Microsoft](https://techfundingnews.com/anthropic-top-10-hires/) — Talent war accelerating; hire pattern suggests focus on enterprise, safety, and agent infrastructure.

### OpenAI

- [OpenAI model disproves conjecture in discrete geometry (May 22)](https://openai.com/research/index/release/) — Symbolic AI-for-math milestone: model successfully disproved a previously open conjecture in discrete geometry, extending the pattern of LLMs advancing formal reasoning.
- [OpenAI advancing content provenance for a transparent AI ecosystem (May 20)](https://openai.com/index/openai-launches-the-deployment-company/) — Framework work on provenance and watermarking to address misinformation as AI-generated content scales.
- [OpenAI + Dell Technologies: Codex in hybrid and on-premises enterprise environments (May 19)](https://openai.com/news/) — Partnership to deploy Codex in air-gapped and hybrid enterprise settings; relevant for defense and regulated industries.
- [OpenAI confidentially filing IPO prospectus with Goldman Sachs / Morgan Stanley](https://www.cnbc.com/2026/05/20/openai-ipo-filing.html) — Confirms public-market path is live; OpenAI Deployment Company (launched May 11) is the commercial vehicle designed to help organizations build and deploy AI systems.

### Polkadot

- [Referendum 1890: validator transition deadline May 31, DOT ~$1.24](https://invezz.com/news/2026/05/26/polkadot-price-outlook-how-referendum-1890-could-move-dot/) — Validators not meeting the new threshold by May 31 face forced rebalancing; short-term staking mechanics are creating DOT price pressure.
- [Polkassembly governance platform shuts down after 5+ years of operations](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) — Key OpenGov UX tool gone; community impact on proposal participation is unclear but notable.
- [Polkadot Africa closes May 22 following Web3 Foundation regional program sunsetting](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) — W3F pivoting away from operating regional programs; Africa hub had five months of inactivity before formal closure.
- [9,032 active Polkadot developers in May 2026 — competitive with Ethereum and Solana](https://thedefiant.io/news/blockchains/polkadot-ecosystem-update-may-2026) — Chainspect data; developer retention holding despite negative ecosystem narrative.
- [Polkadot Bulletin Chain + DApps covering fees for new users](https://medium.com/@polkadot_eri/polkadot-ecosystem-weekly-observations-polkadot-releases-latest-roadmap-key-technologies-to-90a5840d423d) — New decentralized data-storage model announced; DApp-pays fee model via Polkadot Cloud reduces onboarding friction.

### OpenClaw

- [OpenClaw v2026.5.26 stable release (May 27): production channels, faster Gateway, meeting summaries](https://github.com/openclaw/openclaw/releases) — Telegram, iMessage, WhatsApp, Discord, and Signal are production-ready; Gateway startup faster via metadata caching; transcript-backed meeting summaries added; SSRF policy validation and prompt-injection filtering hardened.
- ["OpenClaw is dead" sentiment spreading in developer forums despite active development](https://medium.com/data-science-in-your-pocket/openclaw-is-dead-6f6e3cab731f) — Multiple-weekly-release cadence continues and GitHub repo is active; community perception of complexity or stagnation is nevertheless spreading.
- [OpenClaw 2026 self-hosted enterprise setup guide published](https://petronellatech.com/blog/openclaw-ai-agent-guide-2026/) — Third-party guide reflecting enterprise self-hosting interest; aligns with Claude Managed Agents MCP sandbox pattern for a combined OpenClaw-inside-NemoClaw deployment.

### NemoClaw

- [NVIDIA NemoClaw GTC 2026 announcement recap (March 16) — no new May 28 announcements](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — Jensen Huang launched NemoClaw at GTC (single-command install, OpenAI-compatible :8642, enterprise focus vs. OpenClaw's individual-user origin); no material new NemoClaw news on May 28 — watch GTC Taipei June 1–4 for follow-ons.
- [NVIDIA Agent Challenge 2026 deadline today (owner-reported May 28 12:00 PM)](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — Submissions targeting the Nemotron + Hermes + NemoClaw stack are due; gold-ticket + front-row keynote prize package per owner report (unconfirmed in indexed sources); see [[sources/nvidia-agent-challenge-2026]] for canonical context.

### Plurality

- [Audrey Tang at Tech for Impact Summit 2026 and SXSW London — Plurality framing continues global circuit](https://tech4impactsummit.com/speakers/audrey-tang/) — Tang is framing AI-era governance through Plurality's collaborative-diversity lens; keynote-tier appearances at two major 2026 events.
- [The Great Simplification podcast: Tang on polarization, misinformation, and rebuilding institutional trust (May 6)](https://www.thegreatsimplification.com/episode/169-audrey-tang) — Deep conversation on how Plurality's collaborative tools can restore civic trust; aired May 6.
- [Oscar-winning director Cynthia Wade filming documentary on Audrey Tang and Taiwan democracy](https://rightlivelihood.org/the-change-makers/find-a-laureate/audrey-tang/) — Feature documentary targeting film-festival premiere; elevates Plurality's reach beyond the tech-policy audience.

### Audrey Tang

- [Audrey Tang speaking engagement at Cambridge UK (May 24)](https://www.varsity.co.uk/interviews/29745) — In-person appearance discussing AI governance, Taiwan's cyber-ambassador role, and digital democracy.
- [Right Livelihood Award for advancing digital democracy and social trust (2025 award)](https://rightlivelihood.org/news/taiwans-audrey-tang-honoured-with-right-livelihood-award-for-advancing-digital-democracy-and-social-trust/) — Recognises Tang's "Taiwan Model" of digital diplomacy and her role in making millions direct participants in policy-shaping.
- [SXSW London 2026 speaker: digital democracy and frontier technology alignment](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Listed as keynote-tier speaker; reflects Plurality framework's growing mainstream platform.

### NVIDIA Nemotron

- [Nemotron 3 Nano Omni launched April 28: 30B-A3B open multimodal, 9× throughput lead](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Open multimodal model unifying vision, audio, video, and text processing in a single 30B active-parameter architecture; tops leaderboards for document intelligence, video, and audio understanding; full weights open-sourced on Hugging Face via NIM microservice.
- [Nemotron 3 Super and Ultra models slated for H1 2026](https://developer.nvidia.com/nemotron) — Completes the Nano/Super/Ultra trifecta for high-accuracy multi-agent and complex planning workloads; watch GTC Taipei June 1–4 for possible timing announcements.
- [NVIDIA verified agent skills pipeline published May 19](https://blogs.nvidia.com/blog/open-models-data-tools-accelerate-ai/) — Developer spec for cataloguing, scanning, signing, and documenting portable NemoClaw skill packages; lays groundwork for a curated agent-skill marketplace around the Nemotron ecosystem.

### PolkaSharks

_No fresh PolkaSharks content indexed in the last 24h. Broader Polkadot ecosystem context is in the Polkadot section above. To track PolkaSharks directly, add the vocus.cc/salon/Polkasharks (and any X/YouTube) channel URLs to the KOL list via the kol-tracker skill._

## Cross-links

### Existing wiki pages touched by this digest

- [[concepts/openclaw]] — OpenClaw keyword section; AI agents and NemoClaw sections
- [[concepts/nemoclaw]] — NemoClaw keyword section; AI agents and NVIDIA Nemotron sections
- [[concepts/nemotron]] — NVIDIA Nemotron section; Nemotron 3 Nano Omni is the latest addition
- [[entities/nvidia]] — NVIDIA Nemotron and NemoClaw sections; Agent Challenge context
- [[concepts/hermes-agent-framework]] — Agent Challenge deadline context in NemoClaw section
- [[concepts/nemoclaw-policy-presets]] — Verified agent skills pipeline aligns with policy-preset skill catalog
- [[entities/polkadot]] — Polkadot keyword section throughout
- [[concepts/dot-hard-cap]] — Ref 1890 validator transition context
- [[concepts/agile-coretime]] — Polkadot Cloud DApp-pays fee model
- [[entities/audrey-tang]] — Plurality and Audrey Tang sections
- [[concepts/plurality]] — Plurality keyword section; Audrey Tang sections
- [[sources/nvidia-agent-challenge-2026]] — Agent Challenge deadline today
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Agent Challenge submission context

### New stubs created (≥ 3 digest mentions, no prior page)

- [[entities/anthropic]] — Created this session: appeared in Claude Code, Anthropic, AI agents, and OpenAI sections (> 3 mentions)
- [[entities/openai]] — Created this session: appeared in OpenAI keyword section and across OpenClaw, AI agents, and NemoClaw sections (> 3 mentions)
