---
type: source
title: KOL + keyword digest — 2026-06-12
author: kol-daily-digest (automated)
date: 2026-06-12
ingested: 2026-06-12
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-06-12

## TL;DR

- **Anthropic filed a confidential S-1 with the SEC** (June 1, $965 B valuation) and launched **Claude Fable 5** (June 9) — Mythos-class, SWE-Bench Pro 80.3%, first model to break 90% on complex analytics benchmarks; directly relevant to the Hermes/NemoClaw agent stack this wiki tracks.
- **OpenAI filed its own confidential S-1** (June 8, Goldman Sachs / Morgan Stanley / JPMorgan, last private valuation $852 B, >$1 T IPO target); both Anthropic and OpenAI are now on the public-market runway for fall 2026 — the largest AI-company IPO race in history.
- **NVIDIA Nemotron 3 Ultra released June 4** (COMPUTEX 2026): 550 B total / 55 B active MoE, AA-Intelligence-Index 48 (leads US open-weights, trails China's Kimi K2.6 at 54); NemoClaw enterprise adoption expanding (Cadence, Dassault Systèmes, Siemens, Synopsys) and JetPack 7.2 adds Jetson support.
- **OpenClaw ClawJacked vulnerability** (CVE-2026-25253) disclosed: malicious JS can silently brute-force a running local gateway via WebSocket, achieving full agent takeover; >40,000 instances were found exposed; patched in 2026.6.5 — directly relevant to the NemoClaw sandbox policy design in [[synthesis/spacesharks-trust-stack]].
- **Polkadot DOT hard cap 2.1 B enacted and Agile Coretime live** — both milestones shipped June 10, matching two of three 2026 predictions in [[synthesis/polkadot-2026-jam-tokenomics-six-region]]; Web3 Summit Berlin June 18 is the next ecosystem event.

> _KOL list is currently empty — the `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` has no active entries. Use `/kol-tracker` to add KOLs for future sweeps._

---

## KOL updates

_KOL list is empty. No KOL channels were swept this run. Add entries via `/kol-tracker`._

---

## Keyword sweep

### AI agents

- [AI Agents News — June 2026 (Startup Edition)](https://blog.mean.ceo/ai-agents-news-june-2026/) — June 2026 marks the inflection from "are AI agents real?" to "which part of my company gets agentized first?"; AWS, Google Cloud, Microsoft, Databricks, IBM, BCG now describe agents in convergent terms: goals + memory + planning + tool use + autonomy.
- [EightX Labs opens public platform for agent recruiting, operating, and monetising](https://blog.mean.ceo/latest-ai-developments-news-june-2026/) — includes builder marketplace, unified audit trail, multi-agent orchestration, and Agent Manifest (EAM) v0.1 under Apache 2.0; early agentic-commerce infrastructure.
- [MetaMask Agent Wallet — AI agents execute on-chain EVM/DeFi trades under mandatory security checks, early access June 8](https://aiagentstore.ai/ai-agent-news/this-week) — extends agentic-payment rails into the EVM ecosystem; adjacent to [[synthesis/agentic-payments-six-region]].
- [Google I/O 2026: information agents launching first for AI Pro & Ultra subscribers this summer](https://blog.google/products-and-platforms/products/search/search-io-2026/) — agentic booking expanded to local experiences; Google's consumer-scale agent rollout now underway.
- [Alteryx Agent Studio (Inspire 2026) — converts existing data workflows into autonomous agents without centralised IT](https://theaitrack.com/ai-news-june-2026-in-depth-and-concise/) — enterprise data analytics entering the agent layer.

### Claude Code

- [Claude Code: fallback models, broader deny-rule glob support, stronger cross-session message security, reliable thinking controls](https://releasebot.io/updates/anthropic/claude-code) — latest patch; also fixes retries, update messaging, agent filtering, terminal/auth/UI bugs.
- [Claude Code adds post-session hook, `/cd` command, safe mode for troubleshooting](https://releasebot.io/updates/anthropic/claude-code) — MCP policy enforcement tightened; background session improvements.
- [Claude Sonnet 4 and Opus 4 deprecated — retire from API June 15, 2026](https://releasebot.io/updates/anthropic/claude) — migration: Sonnet 4 → claude-sonnet-4-6, Opus 4 → claude-opus-4-8; tight timeline.
- [Code with Claude (May 2026): Managed Agents, Proactive Workflows, Capability Curve](https://www.infoq.com/news/2026/05/code-with-claude/) — multi-step agentic coding without constant user prompting; now available on the Claude Developer Platform.

### Anthropic

- [Anthropic confidentially files draft S-1 with the SEC — $65 B Series H at $965 B valuation](https://www.anthropic.com/news/confidential-draft-s1-sec) — filed June 1, 2026; Anthropic is first in the Anthropic/OpenAI IPO race; targeted public listing in 2026.
- [Claude Fable 5 launched — Mythos-class, SWE-Bench Pro 80.3%, first to break 90% on complex analytics](https://www.anthropic.com/news/claude-fable-5-mythos-5) — released June 9; 1 M token context; $10/M input, $50/M output; safeguards route sensitive queries to Opus 4.8 in <5% of sessions; Mythos 5 restricted to Project Glasswing.
- [Claude Developer Platform: Managed Agents, vault credentials, session thread webhooks — alongside Fable 5](https://platform.claude.com/docs/en/release-notes/overview) — platform capabilities now match Fable 5's new features at launch.
- [Anthropic compute deal with SpaceX to support Fable 5 inference demand](https://www.anthropic.com/news/higher-limits-spacex) — partnership announced; cross-reference [[entities/starcloud]] and [[synthesis/orbital-data-center-six-region]].

### OpenAI

- [OpenAI confidentially files S-1 with SEC, targeting fall 2026 IPO](https://www.cnbc.com/2026/06/08/openai-confidentially-files-for-ipo-prepping-wall-street-for-ai-debut.html) — filed June 8; Goldman Sachs, Morgan Stanley, JPMorgan as lead underwriters; last private valuation $852 B (March 2026, $122 B raised); target >$1 T; no committed timeline.
- [Oracle Cloud commitment — access OpenAI models and Codex through Oracle, June 11](https://openai.com/news/) — enterprise distribution; hyperscaler integration continues.
- [OpenAI Economic Research Exchange launched June 8](https://openai.com/news/company-announcements/) — research infrastructure to study AI's economic impact; paired with "Built to benefit everyone" policy statement.
- [Better memory for ChatGPT — improved persistent cross-session memory, June 8](https://openai.com/news/company-announcements/) — consumer-product investment alongside IPO prep.

### Polkadot

- [DOT hard cap 2.1 B enacted June 10 — runtime upgrade v2.1.0, annual issuance cut 53.6%](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — [[concepts/dot-hard-cap]]: Referendum 1710 (81% approval) now fully on-chain; Polkadot shifts to disinflationary supply model.
- [Agile Coretime went live June 10 — flexible blockspace rental, no multi-year DOT lockups](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — [[concepts/agile-coretime]]: on-demand and bulk blockspace purchasing now live; replaces slot auctions.
- [Polkadot confirmed at Web3 Summit 2026, Berlin, June 18–19](https://www.tradingview.com/news/coindar:a4cf85f0e094b:0-polkadot-to-participate-in-web3-summit-2026-in-berlin-on-june-18th/) — upcoming ecosystem event; likely venue for JAM/Hub/CoreChain progress updates.
- [Market fear weighed on DOT price June 10 despite milestone day](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — broad sentiment headwind on the same day two headline protocol upgrades shipped; on-chain progress ≠ price.

### OpenClaw

- [ClawJacked: critical vulnerability enables full OpenClaw agent takeover via malicious JavaScript](https://www.oasis.security/blog/openclaw-vulnerability) — CVE-2026-25253; Oasis Security disclosure: malicious site's JS opens WebSocket to localhost gateway and brute-forces password (localhost exempt from rate limits), achieving RCE across all connected channels.
- [>40,000 OpenClaw instances exposed on internet; 63% assessed as vulnerable (Claw Chain — four chained flaws)](https://thehackernews.com/2026/05/four-openclaw-flaws-enable-data-theft.html) — "Claw Chain" (Cyera): data theft + privilege escalation + persistence; public disclosure Feb 3, 2026; underscores why [[concepts/nemoclaw]]'s sandboxed-gateway design is architecturally important.
- [OpenClaw 2026.6.5 released — safer plugin installs, stronger security checks, YYYY.M.PATCH versioning](https://releasebot.io/updates/openclaw) — patches ClawJacked-class issues; improves gateway/provider recovery.
- [Microsoft launches Scout — OpenClaw-inspired personal assistant for Microsoft 365, June 2](https://techcrunch.com/2026/06/02/microsoft-launches-scout-an-openclaw-inspired-personal-assistant/) — runs via Microsoft Execution Containers (MXC) on Windows; [[concepts/openclaw]]'s agentic design pattern adopted by a hyperscaler.

### NemoClaw

- [NVIDIA Nemotron 3 Ultra released June 4 at COMPUTEX 2026 — 550 B/55 B-active MoE, AA-Idx 48](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — hybrid Mamba-Transformer; 300+ tokens/sec; 30% lower per-task cost; weights under OpenMDW-1.1 (Linux Foundation); resolves the stale-fact flag added in [[concepts/nemotron]] on 2026-06-06.
- [Industrial leaders (Cadence, Dassault, Siemens, Synopsys) adopt NemoClaw to build autonomous AI engineers](https://blogs.nvidia.com/blog/industrial-software-leaders-secure-autonomous-ai-engineers-nemoclaw/) — compresses weeks of simulation and verification workflows into hours; first major enterprise-scale NemoClaw deployments.
- [JetPack 7.2 adds NemoClaw support on Jetson — edge/embedded NemoClaw deployments now official](https://blogs.nvidia.com/blog/rtx-ai-garage-gtc-2026-nemoclaw/) — extends OpenShell sandbox runtime to the Jetson form factor; adds an install path to [[concepts/nemoclaw]].
- [CUDA-X Agent Skills now accessible to NemoClaw agents — cuDF, cuOpt, AI-Q, NeMo, PhysicsNeMo, CUDA-Q](https://investor.nvidia.com/news/press-release-details/2026/Enterprise-Software-Leaders-Build-AI-Agents-With-NVIDIA/default.aspx) — domain-specific capability expansion for agents running inside the NemoClaw sandbox.

### NVIDIA Nemotron

- [Nemotron 3 Ultra vs Kimi K2.6: AA-Idx 48 vs 54; PinchBench agent productivity tied at 91%](https://www.buildfastwithai.com/blogs/nvidia-nemotron-3-ultra-review-2026) — Nemotron leads US open-weights but open-weight frontier has moved to China (per [[synthesis/open-weight-llm-agent-stack-six-region]]); on agent tasks the two are operationally tied.
- [NVIDIA Nemotron Coalition — multi-lab consortium to advance open frontier models under the Nemotron lineage](https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models) — collaborative open-weight research effort; NVIDIA's answer to the China-led open-weight frontier.

_See also [NemoClaw](#nemoclaw) above for the full Nemotron 3 Ultra release coverage._

### Plurality / Audrey Tang

- [Audrey Tang is on a world tour promoting Plurality as Taiwan's Cyber Ambassador-at-large](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — stepped back from Digital Minister role (2016–2024); Oxford Accelerator Fellowship; Plurality framework applied to AI governance and democratic participation globally.
- [Audrey Tang and Glen Weyl at IE University — AI, democracy, and Plurality as collaborative governance](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/) — ongoing lecture series; last found public engagement; no new publications in the last 24 h.

_No new Plurality/Audrey Tang announcements detected in the last 24 h._

### PolkaSharks

_No new content detected in the last 24 h for the PolkaSharks channel or brand. The Polkadot on-chain milestones (DOT hard cap enacted, Agile Coretime live) are the closest adjacent items — see [Polkadot](#polkadot) above. Check [vocus.cc/salon/Polkasharks](https://vocus.cc/salon/Polkasharks) manually for recent posts._

---

## Cross-links

**Existing wiki pages touched by this digest:**

- [[concepts/nemotron]] — Nemotron 3 Ultra released June 4; stale-fact flag from 2026-06-06 log now resolved.
- [[concepts/nemoclaw]] — enterprise adoption (Cadence/Dassault/Siemens/Synopsys) and JetPack 7.2 are new datapoints for a future deepen pass.
- [[concepts/openclaw]] — ClawJacked CVE-2026-25253 is a material new security development; >40k exposed instances updates the risk profile.
- [[entities/polkadot]] — DOT hard cap enacted + Agile Coretime live as of June 10.
- [[concepts/dot-hard-cap]] — runtime upgrade v2.1.0 enacted June 10, 2026; milestone confirmed.
- [[concepts/agile-coretime]] — live on Polkadot as of June 10, 2026; milestone confirmed.
- [[entities/audrey-tang]] — no new posts; world tour continues.
- [[concepts/plurality]] — no new publications.
- [[entities/nvidia]] — Nemotron 3 Ultra release + NemoClaw enterprise partners new.
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — two of three 2026 milestones (hard cap + Agile Coretime) confirmed shipped; JAM mainnet still pending.
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron 3 Ultra stale-fact resolved; Kimi K2.6 54 vs Ultra 48 gap confirmed.
- [[synthesis/spacesharks-trust-stack]] — ClawJacked vulnerability reinforces the value of NemoClaw's sandboxed gateway design.

**New stub pages created (≥ 3 mentions in this digest):**

- [[entities/anthropic]] — IPO S-1 (June 1), Fable 5 launch, Claude Code updates, Managed Agents, SpaceX compute deal → 4+ mentions.
- [[entities/openai]] — S-1 filing (June 8), Oracle deal, Economic Research Exchange, ChatGPT memory update → 4+ mentions.
