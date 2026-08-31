---
type: source
title: KOL + keyword digest — 2026-08-19
author: kol-daily-digest (automated)
date: 2026-08-19
ingested: 2026-08-19
tags: [digest, kol, daily]
---

# KOL + Keyword Digest — 2026-08-19

## TL;DR

- **Anthropic revenue hits $65B annualized run rate** ahead of an expected October 2026 IPO targeting a ~$2 trillion valuation; Q2 revenue was $11.5B vs $787M a year prior — 14× YoY. `Model 2` won't be released publicly per Axios; Tino Cuéllar joins as Chief Global Affairs Officer.
- **NVIDIA ships Nemotron 3.5 Lightning** (30B MoE, 3B active params, single-GPU laptop/desktop) alongside **NeMo Switchyard** model-router; Nemotron 4 (1T params) reportedly in development, cloud budget $7B through FY2028.
- **NemoClaw v0.0.108** (2026-08-12) adds read-only host mounts, experimental Muse Glimmer profile for one DGX Spark, improved onboarding and MCP registration. **OpenClaw 2026.8.1-beta.1** ships sandboxed browser routes, provider fallbacks, and stronger secret-egress controls.
- **Claude Code** public-beta self-hosted runners landed this month — teams can run sessions on internal infrastructure with custom tooling; GitLab MR badge support added.
- **Polkadot** DOT -7% mid-August market-wide rout; Grayscale withdrew its spot DOT ETF application (2026-08-07); builders testing Polkadot Products devnet (streaming payments, Peoplebook on-chain registry, Validator Browser standalone site). No PolkaSharks-specific content found in last 24h.

## KOL Updates

_The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is currently empty. No KOL channels were swept. Add entries via the kol-tracker skill to enable per-channel monitoring._

## Keyword Sweep

### AI agents

- [Daily AI Agent News — Week of August 17, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — EU AI Act high-risk provisions enforceable from Aug 2 (fines up to €15M or 3% global revenue); enterprise shift to multi-agent orchestration now the dominant August narrative.
- [L&T Technology Services launches AgenticIQ](https://aiagentstore.ai/ai-agent-news/daily/2026-08-12) — End-to-end agentic AI platform for engineering and manufacturing; autonomous multi-agent workflows across product development and industrial operations.
- [Google agents call stores on your behalf](https://assindo.com/news/ai-agent-news-august-2026) — Google rolling out consumer agents that call stores, check inventory, and complete purchases by phone; voice AI funding hits record highs.
- [Code for India Bharat Agentic-AI Hackathon 2026](https://blog.mean.ceo/ai-agents-news-august-2026/) — 90-day virtual event launched Aug 15 across education, health, climate, governance, and financial inclusion tracks.
- [AI Agent News: Rogue Agents and Real Calls](https://assindo.com/news/ai-agent-news-august-2026) — Autonomous AI agents now running real workloads in enterprise software, healthcare, logistics, and finance; pilot era over.

### Claude Code

- [Claude Code self-hosted runners public beta](https://releasebot.io/updates/anthropic/claude-code) — Teams and Enterprise customers can now run Claude Code sessions on their own infrastructure with internal network access and compliance controls; on-demand and fixed runners supported.
- [Claude Code August 2026 release notes](https://releasebot.io/updates/anthropic/claude-code) — GitLab MR URL support in `--worktree` flag + agents view; faster self-hosted runner starts; stronger gateway and plugin validation; accessibility and diagnostics improvements.
- [Anthropic Compliance API covers Claude Code](https://releasebot.io/updates/anthropic/claude-developer-platform) — Security teams can pull Claude Code session content and metadata via the Compliance API (beta, Enterprise plans).
- [Claude Code August news roundup](https://blog.mean.ceo/claude-code-news-august-2026/) — Expanded Remote Control syncing, richer TUI workflows, automatic session continuation at usage limits, and tighter permission/security controls.
- [Releasebot Anthropic August 2026 update tracker](https://releasebot.io/updates/anthropic) — Aggregated Anthropic release notes; reference for full changelog history.

### Anthropic

- [Anthropic annualized revenue tops $65B ahead of IPO — Bloomberg](https://www.bloomberg.com/news/articles/2026-08-17/anthropic-revenue-run-rate-surpasses-65-billion-ahead-of-ipo) — Q2 revenue $11.5B vs $787M Q2-2025 (14× YoY); FY2026 investor expectation $100–120B total.
- [Anthropic plans ~$2T October IPO — Fortune](https://fortune.com/2026/08/13/anthropic-ipo-2-trillion-october-largest-ever-spacex/) — Largest IPO ever projected, eclipsing SpaceX; pricing expected Q4 2026.
- [Anthropic revenue surges 14-fold — Bloomberg](https://www.bloomberg.com/news/articles/2026-08-14/anthropic-revenue-ahead-of-ipo-surges-over-14-fold-in-second-quarter) — Confirms the quarterly trajectory; $9B compute deal with Riot Platforms + $10B with a cloud startup.
- [Anthropic not releasing "Model 2" — Axios](https://www.axios.com/2026/08/14/anthropic-model-2-ai-risk) — Internal model more powerful than Mythos won't be publicly released; AI risk assessment rising. Linked HN thread: [Anthropic Risk August 2026](https://news.ycombinator.com/item?id=49303540).
- [Anthropic newsroom](https://www.anthropic.com/news) — Tino Cuéllar (ex-Carnegie Mellon president) joins Aug 4 as Chief Global Affairs Officer; ongoing IPO prep.

### OpenAI

- [OpenAI Astra solves 10 unsolved math problems](https://techcrunch.com/2026/08/07/openai-says-it-slowed-astra-model-development-over-security-concerns/) — 249-page Lean 4 proof manuscript published on GitHub; work on Astra then slowed over internal security review (agentic coding + cybersecurity advances).
- [GPT-5.6 Sol Ultrafast — 14× speed mode](https://techcrunch.com/2026/08/13/openai-introduces-ultrafast-a-new-mode-that-makes-gpt-5-6-sol-work-at-14x-the-speed/) — Up to 750 output tokens/second; Plus/Pro users get slider for effort vs speed tradeoff.
- [OpenAI revenue run rate tops $40B — Bloomberg](https://www.bloomberg.com/news/articles/2026-08-13/openai-s-revenue-run-rate-tops-40-billion-ahead-of-ipo) — Roughly doubles the end-of-2025 run rate; IPO timing also approaching.
- [ChatGPT crosses 1 billion users](https://kraviona.com/blog/latest-ai-news-august-2026) — Milestone reached August 2026; OpenAI also launched GPT-5.6-Cyber for authorized cybersecurity work.
- [OpenAI appoints Dali Rajic as CRO](https://kraviona.com/blog/latest-ai-news-august-2026) — Aug 17, 2026; commercial scale-up ahead of anticipated IPO.

### Polkadot

- [DOT drops 7% in mid-August rout](https://crypto.news/tag/polkadot/) — Broader altcoin weakness as BTC stalled near $63K; risk-off sentiment across crypto markets.
- [Grayscale withdraws spot DOT ETF application](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Filed withdrawal Aug 7, days before a key regulatory milestone; reduces near-term institutional demand catalyst.
- [Polkadot Products devnet testing underway](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-17/18408) — Builders testing streaming payments, Peoplebook on-chain user registry, and Validator Browser standalone site.
- [Polkadot DOT hard cap recap](https://bitcoinfoundation.org/news/altcoins/polkadot-price-prediction-2026-will-dot-reach-new-highs/) — March 2026: 2.1B hard cap enacted (Ref. 1710), annual issuance halved; nominator slashing removed; unbonding period 28d → 24–48h.
- [Polkadot Socials Daily Digest 2026-08-17](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-17/18408) — Most recent forum digest; Polkadot community activity index for reference.

### OpenClaw

- [OpenClaw 2026.8.1-beta.1 released](https://releasebot.io/updates/openclaw) — Hardening-focused: sandboxed browser routes, trusted DNS targets, loopback provider endpoints rejecting unsafe paths, session write retention, provider fallbacks.
- [OpenClaw security release notes August 2026](https://petronellatech.com/blog/openclaw-ai-agent-guide-2026/) — Stronger secret egress, atomic model/runtime switching, SQLite snapshot backup/restore, macOS app profile isolation.
- [OpenClaw founder Peter Steinberger joins OpenAI](https://seekingalpha.com/news/4552261-openclaw-founder-joins-openai) — Steinberger leads OpenAI personal-agents team (confirmed role since Feb 2026); ongoing open-source development continues independently.
- [OpenClaw explained — KDnuggets](https://www.kdnuggets.com/openclaw-explained-the-free-ai-agent-tool-going-viral-already-in-2026) — Overview of OpenClaw's chat-driven local agent (WhatsApp/Telegram/Slack + CDP browser + shell access) for small-team automation.
- [OpenClaw AI agent security context — Reco](https://www.reco.ai/blog/openclaw-the-ai-agent-security-crisis-unfolding-right-now) — Security posture analysis; the Aug 2026 hardening releases address earlier vulnerability disclosures.

### NemoClaw

- [NemoClaw v0.0.108 (2026-08-12)](https://docs.nvidia.com/nemoclaw/user-guide/hermes/release-notes/2026/8/12) — Adds read-only host mounts, Experimental Muse Glimmer profile for one DGX Spark; improves onboarding recovery, credential rotation, inference validation, MCP registration, and Hermes config.
- [NemoClaw v0.0.106 (2026-08-10)](https://docs.nvidia.com/nemoclaw/latest/user-guide/deepagents/release-notes/2026/8/10) — Converges readiness across lifecycle commands; upgrades managed OpenShell runtime to v0.0.101; adds bounded DGX Spark vLLM choices.
- [NemoClaw v0.0.103 (2026-08-05)](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/5) — Adds `nemoclaw launch` command to start an agent directly after standard sandbox preflight checks.
- [NemoClaw v0.0.102 (2026-08-04)](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/4) — Authenticated attachment of operator-managed llama.cpp servers; Experimental managed vLLM profile for two DGX Spark systems.
- [NemoClaw v0.0.101 (2026-08-03)](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/3) — Experimental Google Chat support for OpenClaw; runtime status, failed-gateway cleanup, Hermes home-channel preservation during rebuilds.

### Plurality

- [Plurality book — plurality.net](https://plurality.net/) — No specific news found in the last 24h. The book and project site remain the canonical reference. No August 2026 events found in sweep.
- [Audrey Tang × Glen Weyl at IE University](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/) — Discussion on AI and democracy; most recently dated item in sweep; no August 2026 events confirmed.

_No new Plurality-specific posts or announcements found in the 24h window._

### Audrey Tang

- [Audrey Tang — Wikipedia](https://en.wikipedia.org/wiki/Audrey_Tang) — Currently serving as Taiwan's Ambassador-at-Large (since Oct 7, 2024) under President Lai Ching-te; previously first Minister of Digital Affairs (Aug 2022 – May 2024).
- [Audrey Tang Senior Fellow at Project Liberty](https://www.projectliberty.io/news/audrey-tang-taiwans-1st-digital-minister-appointed-as-senior-fellow-of-the-project-liberty-institute/) — Ongoing role; focuses on ethical governance frameworks for digital platforms.

_No new posts or announcements from Audrey Tang found in the last 24h sweep._

### NVIDIA Nemotron

- [NVIDIA releases Nemotron 3.5 Lightning — SiliconANGLE](https://siliconangle.com/2026/08/11/nvidia-releases-nemotron-3-5-lightning-nemo-switchyard-give-enterprise-ai-capability-options/) — 30B MoE with 3B active params; runs on single laptop/desktop GPU; targets code review, tool use, security alert monitoring, billing Q&A.
- [NeMo Switchyard model router launched](https://www.marktechpost.com/2026/08/11/nvidia-ai-releases-nemotron-3-5-lightning-and-nemo-switchyard/) — Routes requests between specialized and frontier models per workflow step; complements Nemotron 3.5 Lightning for cost-aware inference.
- [NVIDIA reportedly building Nemotron 4 at 1T params — TechWire Asia](https://techwireasia.com/2026/08/nvidia-nemotron-4-trillion-parameter-ai-model/) — Earliest ready "late autumn 2026"; cloud-compute budget capped at $7B through FY2028; NVIDIA has not confirmed.
- [Nemotron 3.5 Lightning vs. Nemotron 4 — Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/nvidia-nemotron-3-5-just-145525944.html) — Side-by-side context; 3.5 Lightning ships now as the enterprise-accessible tier while 4 targets the open frontier.
- [NVIDIA Nemotron 3 family launch reference — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Canonical Nemotron 3 Nano/Super/Ultra announcement; context for the 3.5 Lightning extension.

### PolkaSharks

- [Polkadot Socials Daily Digest 2026-08-17 — Polkadot Forum](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-17/18408) — Most recent ecosystem digest; no PolkaSharks-specific mention found.
- [Polkadot Socials Daily Digest 2026-08-15](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-15/18398) — Community activity; no PolkaSharks content identified.

_No PolkaSharks-specific posts or new content found in the 24h window. The channel is tracked in the wiki at [[entities/polkasharks]]._

## Cross-links

- [[entities/anthropic]] — revenue, IPO, Model 2
- [[entities/nvidia]] — Nemotron 3.5 Lightning, Nemotron 4, NemoClaw updates
- [[concepts/nemotron]] — Nemotron 3.5 Lightning (30B MoE), Nemotron 4 (1T) development
- [[concepts/nemoclaw]] — v0.0.101–v0.0.108 release series, Muse Glimmer, OpenShell v0.0.101
- [[concepts/openclaw]] — 2026.8.1-beta.1 hardening release; security boundary improvements
- [[entities/peter-steinberger]] — OpenAI personal-agents lead; OpenClaw open-source continues
- [[entities/polkadot]] — DOT -7% Aug, Grayscale ETF withdrawal, Products devnet
- [[entities/audrey-tang]] — Ambassador-at-Large; no new posts in 24h
- [[concepts/plurality]] — No new events in 24h; book/site canonical reference
- [[entities/polkasharks]] — No new content in 24h
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron 3.5 Lightning and Nemotron 4 update the US open-weight stack row
- [[synthesis/agent-runtime-orchestration-six-region]] — NemoClaw/OpenClaw updates directly relevant
- [[synthesis/firefly-nemoclaw-reference-implementation]] — NemoClaw v0.0.108 Muse Glimmer profile is a new experimental preset to track
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — Grayscale ETF withdrawal + DOT price dip; Products devnet progress
