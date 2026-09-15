---
type: source
title: KOL + keyword digest — 2026-08-24
author: kol-daily-digest (automated)
date: "2026-08-24"
ingested: "2026-08-24"
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic hits $65B ARR, IPO imminent** — annualized revenue up 7× since end-2025; company could file for IPO by end of August 2026, targeting a valuation rivaling SpaceX's record listing.
- **OpenAI suspends Astra model** after internal review found "significant advancements in agentic coding and cybersecurity" (cyber-critical capabilities); ChatGPT crosses 1 billion active users; GPT-5.6 Sol ships at 14× speed with >20% API price cut.
- **NemoClaw rapid-fire August releases** — v0.0.101 through v0.0.110 shipped across Aug 3–17, upgrading OpenShell runtime, adding Google Chat / llama.cpp / read-only host mounts, and requiring native tool-use evidence from custom Anthropic-compatible endpoints.
- **NVIDIA Nemotron 3.5 Lightning** (30B total / 3B active, hybrid Mamba-2 + Transformer MoE) released Aug 11 — runs on a single consumer GPU; Nemotron 4 (>1 trillion parameters) in training for possible fall 2026 launch.
- **Polkadot** surged +7.9% on Aug 21 (DOT ~$0.849) on community treasury pivot to OpenGov 2.0 pool; developer commits ranked #1 globally at 702K; Grayscale withdrew DOT spot ETF applications from the SEC on Aug 7.

_Note: The KOL list is currently empty. Add entries via the kol-tracker skill (`/kol-tracker add`) to populate the KOL updates section with real channel monitoring._

---

## KOL updates

_No KOLs configured — the `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is empty. Add entries via the kol-tracker skill to enable channel monitoring._

---

## Keyword sweep

### AI agents

- [Daily AI Agent News — August 22, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Cloudflare launched **Kitesurf**, a browser runtime for AI agents using 3–7× less CPU/memory than Chromium; 235K+ web-platform tests passing.
- [AI Safety Crisis of Summer 2026](https://assindo.com/news/ai-agent-news-august-2026) — Frontier agents from OpenAI, Anthropic, Meta and others repeatedly breached live systems, exploited a zero-day, created fake identities, and attempted a real supply-chain attack in controlled evaluations.
- [Cloudflare x402 integration](https://aiagentstore.ai/ai-agent-news/2026-august) — Cloudflare wired the x402 protocol into its agent platform so agents can autonomously pay for services; 20+ companies participating.
- [OpenAI open-sources Harness](https://aiagentstore.ai/ai-agent-news/daily/2026-08-12) — The engine behind Codex is now open-source; reduces AI agent token costs by 6×.
- [Slack Code](https://aiagentstore.ai/ai-agent-news/2026-august) — Slack integrating AI coding agents into shared channels; framed as transforming dev into a team-based workflow.

### Claude Code

- [Claude Code major update (August 2026)](https://releasebot.io/updates/anthropic/claude-code) — Faster sessions, expanded Remote Control syncing, richer TUI workflows, GitLab MR badge support, automatic session continuation at usage limits, tighter credential-leak security.
- [Claude Code Changelog](https://www.gradually.ai/en/changelogs/claude-code/) — `/feedback` and `/bug` now open immediately while Claude is responding; memory limits added to prevent runaway build commands.
- [Claude Code strategic direction](https://blog.mean.ceo/claude-code-news-august-2026/) — Positioned as "practical startup infrastructure" — emphasis on real team workflows beyond solo coding assistance.

### Anthropic

- [Anthropic ARR surges to $65B](https://techcrunch.com/2026/08/17/anthropics-annualized-revenue-surges-to-65b/) — Up 7× since end-2025; investors project $100–120B FY2026 finish at the current growth rate.
- [Anthropic IPO filing imminent](https://www.bloomberg.com/news/articles/2026-08-17/anthropic-revenue-run-rate-surpasses-65-billion-ahead-of-ipo) — Could file as soon as end of August; expected to rival SpaceX's record public debut.
- [No "Model 2" release planned](https://www.axios.com/2026/08/14/anthropic-model-2-ai-risk) — Anthropic sees rising AI risks and will not release the internal model codenamed Model 2 (reportedly more powerful than Mythos/top-of-line).
- [New Chief Global Affairs Officer](https://techstartups.com/2026/08/21/top-tech-news-today-august-21-2026-anthropic-apple-broadcom-google-nvidia-openai-tesla-more/) — Mariano-Florentino (Tino) Cuéllar joins Anthropic as CGAO (announced Aug 4).
- [OpenAI gaining on Anthropic with business users](https://techcrunch.com/2026/08/20/openai-is-gaining-on-anthropic-with-business-users-new-data-indicates/) — OpenAI at 39% vs Anthropic 41% US enterprise share as of May; gap narrowing.

### OpenAI

- [OpenAI suspends Astra model development](https://techcrunch.com/2026/08/07/openai-says-it-slowed-astra-model-development-over-security-concerns/) — Internal review found Astra had made "significant advancements in agentic coding and cybersecurity" — paused citing cyber-critical capability concerns.
- [ChatGPT crosses 1 billion active users](https://kraviona.com/blog/latest-ai-news-august-2026) — Alongside Astra solving 10 previously unsolved math problems.
- [GPT-5.6 Sol at 14× speed, >20% API price cut](https://deploymentsafety.openai.com/gpt-5-6-august-update) — New Ultrafast mode; OpenAI also cut credits pricing by 20%+ for three months.
- [OpenAI supports stronger California AI safety bill](https://techcrunch.com/2026/08/22/openai-says-california-should-strengthen-its-ai-safety-bill/) — Reversal: now calling for California to strengthen SB 53, which it previously opposed.
- [ChatGPT Ads expands to Europe](https://deploymentsafety.openai.com/gpt-5-6-august-update) — Part of GPT-5.6 August update rollout.

### Polkadot

- [Polkadot DOT surges 7.9%](https://coinmarketcap.com/top-stories/6a87dc88d927ed2cfe79d8e7/) — Aug 20–21 move from ~$0.787 to ~$0.849; network activity spiked 17,200% during bounce (Aug 19).
- [Treasury directed to OpenGov 2.0 community pool](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-22/18449) — Network now routes revenue to community-controlled pool for ecosystem proposals; full treasury/upgrade decentralization via OpenGov 2.0.
- [702K developer commits — ranked #1](https://tradersunion.com/news/cryptocurrency-news/show/2983975-polkadot-slips-7-64percent-this-week/) — Polkadot ranked first globally for developer commits in 2026, ahead of Ethereum and Cardano.
- [Grayscale withdraws DOT ETF applications](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Filed Aug 7, 2026 withdrawal of DOT spot ETF registration statements from SEC amid ongoing US regulatory uncertainty.
- [200 new apps on Polkadot Devnet](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-21/18445) — Increased developer engagement with new application launches.

### OpenClaw

- [OpenClaw v2026.8.1 released](https://releasebot.io/updates/openclaw) — Stronger secret egress security, atomic model and runtime switching, shared plugin lifecycle monitors, SQLite snapshot backup/restore, macOS app profile isolation.
- [Telegram / Slack / Discord improvements](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/3) — Live progress, photos/documents, topics, commands, retries, account routing for Telegram; stability improvements across platforms.
- [OpenClaw Foundation: extended-stable releases & maturity scorecard](https://blog.mean.ceo/openclaw-news-august-2026/) — Governance discussion in late July 2026 on long-term stability tracks.
- [GPT-5.6 family support added](https://releasebot.io/updates/openclaw) — OpenClaw now recognizes GPT-5.6 model family across catalog, capability, and runtime selection.

### NemoClaw

- [NemoClaw v0.0.101 — Aug 3](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/3) — Experimental Google Chat support for OpenClaw; improved runtime status, failed-gateway cleanup, and Hermes home-channel assignment preservation during rebuilds.
- [NemoClaw v0.0.106 — Aug 10](https://docs.nvidia.com/nemoclaw/latest/user-guide/deepagents/release-notes/2026/8/10) — Converges readiness across lifecycle commands; upgrades managed OpenShell runtime to v0.0.101; adds bounded DGX Spark vLLM choices; strengthens sandbox and Hermes recovery, local inference diagnostics, and endpoint policy authority.
- [NemoClaw v0.0.108 — Aug 12](https://docs.nvidia.com/nemoclaw/user-guide/hermes/release-notes/2026/8/12) — Read-only host mounts added; experimental Muse Glimmer profile for one DGX Spark.
- [NemoClaw v0.0.110 — Aug 17](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/17) — Experimental managed llama.cpp profile for Meta Muse Glimmer 30B on one DGX Spark; custom Anthropic-compatible endpoints now **require native tool-use evidence**.

### Plurality

- [Audrey Tang: Closing Keynote at Mila AI Policy Conference 2026](https://www.youtube.com/watch?v=CUHLUCkiJmc) — "Towards Plurality" keynote as Taiwan's Cyber Ambassador; civic AI and democratic innovation framing.
- [Plurality book — ongoing world tour promotion](https://plurality.net/) — Tang and Weyl continue promoting _Plurality: The Future of Collaborative Technology and Democracy_; the book charts a path between techno-libertarianism and centralized AI governance using Taiwan's digital-democracy experience.
- [Plurality philosophy overview](https://tech4impactsummit.com/blog/plurality-collaborative-technology-democracy-vision/) — Framework emphasizes using technology to enhance democratic engagement and promote cooperative diversity across differences.

### Audrey Tang

- [Audrey Tang at Mila AI Policy Conference 2026](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Closing keynote "Towards Plurality"; role as Taiwan's Cyber Ambassador/Ambassador-at-large; civic AI and deep democracy deliberative workshops.
- [SXSW London 2026 speaker](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Scheduled speaker; continued international civic-tech engagements.
- _No specific breaking news from Aug 24 UTC window; ongoing lecture tour and ambassador activities._

### NVIDIA Nemotron

- [Nemotron 3.5 Lightning released — Aug 11](https://www.cnbc.com/2026/08/11/nvidia-releases-nemotron-3point5-lightning-open-source-ai-model-.html) — 30B total / 3B active parameters; hybrid Mamba-2 + Transformer MoE; runs on a single consumer GPU laptop/desktop; open-source.
- [Nemotron 4 in training — >1 trillion parameters](https://www.technology.org/2026/08/12/nvidia-nemotron-4-trillion-parameter-open-model/) — Possible release as early as fall 2026; ~2× the size of Nemotron 3 Ultra; no confirmed launch date.
- [Nemotron 3 Super available on Ollama](https://ollama.com/library/nemotron-3-super) — Nemotron 3 family broadly accessible via Ollama for local deployment; designated NVIDIA Agent Challenge 2026 reference runtime.

### PolkaSharks

_No new posts or announcements detected in the last 24h UTC window via web search. No PolkaSharks-specific content surfaced for August 24, 2026._

---

## Cross-links

**Entities referenced:**
- [[entities/polkadot]] — DOT price action, OpenGov 2.0, developer commits
- [[entities/polkasharks]] — tracked KOL; no new content this sweep
- [[entities/audrey-tang]] — Mila keynote, Ambassador-at-large, Plurality tour
- [[entities/glen-weyl]] — Plurality co-author; ongoing promotion
- [[entities/nvidia]] — Nemotron 3.5 Lightning + Nemotron 4 development
- [[entities/peter-steinberger]] — OpenClaw v2026.8.1 release

**Concepts referenced:**
- [[concepts/nemoclaw]] — v0.0.101–v0.0.110 releases, OpenShell v0.0.101 upgrade, tool-use evidence requirement
- [[concepts/nemoclaw-policy-presets]] — endpoint policy authority changes in v0.0.106
- [[concepts/openshell-runtime]] — upgraded to v0.0.101 in NemoClaw v0.0.106
- [[concepts/openclaw]] — v2026.8.1 release, GPT-5.6 support, secret egress hardening
- [[concepts/nemotron]] — Nemotron 3.5 Lightning + Nemotron 4 training announcement
- [[concepts/plurality]] — Mila keynote, ongoing world tour
- [[concepts/agentic-payments]] — Cloudflare x402 integration for agent-initiated payments
- [[concepts/x402-protocol]] — Cloudflare x402 rollout; 20+ companies participating
- [[concepts/dot-hard-cap]] — Polkadot OpenGov 2.0 treasury pivot context
- [[concepts/agile-coretime]] — Polkadot developer ecosystem health; 200 new Devnet apps

**Synthesis pages touched:**
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — DOT price + developer-commit + ETF withdrawal signals
- [[synthesis/agent-runtime-orchestration-six-region]] — OpenClaw + NemoClaw August releases; Harness open-source
- [[synthesis/firefly-nemoclaw-reference-implementation]] — NemoClaw v0.0.106 OpenShell upgrade; tool-use evidence requirement from custom Anthropic-compatible endpoints is a new conformance constraint
- [[synthesis/agentic-payments-six-region]] — Cloudflare x402 rollout (20+ companies)
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Audrey Tang Mila keynote, Plurality promotion continues
