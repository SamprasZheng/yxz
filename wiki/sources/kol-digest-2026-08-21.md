---
type: source
title: KOL + keyword digest — 2026-08-21
author: kol-daily-digest (automated)
date: "2026-08-21"
ingested: "2026-08-21"
tags: [digest, kol, daily]
---

## TL;DR

- **NemoClaw v0.0.108** (2026-08-12) ships an Experimental Muse Glimmer profile for one DGX Spark + read-only host mounts; five releases in three weeks signal an accelerating cadence aligned with the [[concepts/nemoclaw]] sandbox hardening roadmap.
- **NVIDIA Nemotron 4** (1T parameters, ~2× Ultra) is reportedly in training with a late-autumn target; meanwhile **Nemotron 3.5 Lightning** (30B/3B active, Mamba-2 + Transformer MoE) dropped Aug 11 as a laptop-runnable open model — significant for [[synthesis/open-weight-llm-agent-stack-six-region]] US open-as-funnel strategy.
- **Claude Code auto mode goes default Aug 14** for Pro/Max/Team; self-hosted environments hit public beta — Anthropic is compressing the gap between managed and self-hosted agent infra at [[synthesis/agent-runtime-orchestration-six-region]].
- **OpenAI** crossed 1B ChatGPT users and paused Astra model development after an internal security review found significant agentic-coding/cybersecurity capability jumps; EU AI Act high-risk enforcement went live Aug 2.
- **Polkadot** saw a 17,200% relay-chain transaction spike (6 → 1,456 daily, Aug 18) and faces a CLARITY Act regulatory spotlight; Grayscale withdrew its DOT ETF application Aug 7 — no action required on [[synthesis/polkadot-2026-jam-tokenomics-six-region]] yet but worth watching.
- _KOL list is currently empty — add entries via the `kol-tracker` skill to populate the KOL Updates section._

---

## KOL Updates

_KOL list is empty — no entries under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml`. Use the `kol-tracker` skill to add KOLs (e.g. Andrej Karpathy, Gavin Wood, Peter Steinberger, Shawn Tabrizi)._

---

## Keyword Sweep

### AI agents

- [Daily AI Agent News — August 11, 2026](https://aiagentstore.ai/ai-agent-news/daily/2026-08-12) — L&T Technology Services launched **AgenticIQ**, an end-to-end agentic AI platform for engineering/manufacturing multi-agent workflows.
- [AI Agents News — Week of August 19, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Enterprise shift to **multi-agent orchestration networks** (vs single assistants) is the dominant Aug-2026 story; Google rolling out consumer calling agents.
- [EU AI Act enforcement (August 2, 2026)](https://aiweekly.co/ai-news-today) — High-risk provisions (risk management, human oversight, conformity assessment) became enforceable Aug 2; fines up to €15M or 3% of global revenue.
- [Meta Muse Glimmer](https://blog.mean.ceo/ai-agents-news-august-2026/) — Meta released Muse Glimmer (<20 GB VRAM), enabling coding, function calling, scheduling, and multi-step task sequences on a single consumer GPU.
- [AI Agent News: Rogue Agents and Real Calls](https://assindo.com/news/ai-agent-news-august-2026) — Google consumer agents can now call stores, check inventory, and complete purchases by phone.

### Claude Code

- [Claude Code auto mode as default (Aug 14)](https://9to5mac.com/2026/08/07/psa-claude-code-enabling-auto-mode-as-default-next-week-anthropic-says/) — Pro/Max/Team sessions switch to auto mode (classifier replaces repeated approval prompts for irreversible/destructive/out-of-bounds actions).
- [Claude Code self-hosted environments public beta](https://releasebot.io/updates/anthropic/claude-code) — Teams can now run sessions on own infrastructure with internal network access, custom tooling, compliance controls; supports fixed or on-demand runners (Team + Enterprise).
- [Claude Code changelog August 2026](https://www.gradually.ai/en/changelogs/claude-code/) — Added GitLab MR URL support to `--worktree` flag, `claude agents view`, `forward_user_identity` apps gateway setting, `ANTHROPIC_DEFAULT_MODEL` env var.
- [50% usage boost extended through Aug 19](https://releasebot.io/updates/anthropic) — Temporary 50% weekly usage boost for Claude Code subscribers extended to Aug 19, 2026.

### Anthropic

- [Claude Code changelog](https://code.claude.com/docs/en/changelog) — See Claude Code section above; Anthropic's main Aug-2026 story is the auto-mode default + self-hosted environments rollout.
- [Anthropic release notes](https://releasebot.io/updates/anthropic) — No separate model releases announced in the Aug 2026 window; activity concentrated on Claude Code infrastructure.

### OpenAI

- [ChatGPT crosses 1B users](https://kraviona.com/blog/latest-ai-news-august-2026) — Milestone crossed in August 2026; CFO Sarah Friar told employees OpenAI "will be a public company in 2027" or sooner.
- [OpenAI institutes new safeguards after Hugging Face breach](https://techcrunch.com/2026/08/18/openai-institutes-new-safeguards-after-hugging-face-breach/) — New policies include detailed model monitoring, emphasis on alignment + security during post-training; RL paused two weeks, now restarted for lower-risk models.
- [Astra model development slowed](https://techcrunch.com/2026/08/07/openai-says-it-slowed-astra-model-development-over-security-concerns/) — Internal review found Astra made "significant advancements in agentic coding and cybersecurity"; OpenAI suspended some work while evaluating safety implications.
- [GPT-5.6 Sol update](https://deploymentsafety.openai.com/gpt-5-6-august-update) — Plus/Pro users get a slider to choose how much effort ChatGPT uses per response; ChatGPT Ads expanded to 31 European countries.
- [OpenAI math proof manuscript](https://openai.com/news/) — Published 249-page Lean 4 proof certificates on GitHub with zero unverified steps across 10 proofs; Astra solved 10 previously unsolved math problems for $2,000 in compute.

### Polkadot

- [Polkadot relay chain 17,200% transaction spike (Aug 18)](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Daily relay transactions jumped from 6 → 1,456; absolute numbers remain modest but signal developer-activity uptick.
- [Grayscale withdraws spot DOT ETF application (Aug 7)](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Withdrew just before SEC decision deadline; 21Shares' TDOT ETF on Nasdaq remains from March 2026 launch.
- [CLARITY Act regulatory spotlight (Aug 18)](https://crypto.news/tag/polkadot/) — DOT named as a token that could be affected by the CLARITY Act, which aims to split crypto oversight between SEC and CFTC.
- [DOT price — bearish flag flag pattern noted by analysts](https://www.coingabbar.com/en/price-prediction/polkadot-price-prediction-august-2026-target-levels) — Analyst projection of $0.75–$0.93 range in Aug 2026; no fundamental change to the [[concepts/dot-hard-cap]] March 2026 milestone.

### OpenClaw

- [OpenClaw hardening release (August 2026)](https://releases.sh/openclaw) — Ships safer browser/network boundaries, resilient agent/provider runs, stronger channel recovery, operator diagnostics, patched dependencies.
- [OpenClaw new features](https://www.gradually.ai/en/changelogs/openclaw/) — Secret egress host binding; GPT-5.6 Ultra + runtime switching support for Sol/Terra/Luna engines; channel plugin ingress monitors; SQLite snapshots for verified DB artifacts.
- [OpenClaw durable message recovery](https://releasebot.io/updates/openclaw) — Durable message recovery across gateway restarts for Telegram, Signal, Slack; important for always-on operator deployments of [[concepts/openclaw]].

### NemoClaw

- [NemoClaw v0.0.108 (Aug 12)](https://docs.nvidia.com/nemoclaw/user-guide/hermes/release-notes/2026/8/12) — Adds read-only host mounts, Experimental Muse Glimmer profile for one DGX Spark; improves onboarding recovery, messaging credential rotation, inference validation, MCP registration.
- [NemoClaw v0.0.106 (Aug 10)](https://docs.nvidia.com/nemoclaw/latest/user-guide/deepagents/release-notes/2026/8/10) — Converges readiness across lifecycle commands; upgrades managed OpenShell runtime to v0.0.101; adds bounded DGX Spark vLLM choices.
- [NemoClaw v0.0.103 (Aug 5)](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/5) — Adds `nemoclaw launch <name>` CLI and agent-specific variants for direct launch after sandbox preflight and recovery checks.
- [NemoClaw v0.0.102 (Aug 4)](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/4) — Adds authenticated attachment of operator-managed llama.cpp servers; Experimental managed vLLM profile for two DGX Spark systems.
- [NemoClaw v0.0.101 (Aug 3)](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/3) — Adds experimental Google Chat support for OpenClaw; improves runtime status, failed-gateway cleanup, inference-route cleanup, Hermes home-channel assignment preservation.

### Plurality

- [Audrey Tang — digital democracy podcast (Aug 2026)](https://www.thegreatsimplification.com/episode/169-audrey-tang) — Tang featured discussing how technology addresses polarization, misinformation, trust erosion; emphasizes vTaiwan + Polis model.
- [Plurality.net — ongoing](https://plurality.net/) — No breaking Aug-2026 news; project continues with book distribution and civic-tech community building. Taiwan remains the most mature practical implementation.

### Audrey Tang

- [Audrey Tang — Oxford podcast (recent)](https://podcasts.ox.ac.uk/ai-and-democracy-ambassador-audrey-tang-plurality-practice-transparency-and-collective-intelligence) — Tang (now Taiwan Cyber Ambassador-at-large) on AI + democracy, Plurality in practice, and collective intelligence framing.
- _No breaking Aug 21, 2026 news specific to Tang; most recent 24h activity not independently found._

### NVIDIA Nemotron

- [Nemotron 4 — 1-trillion-parameter open model in development](https://techwireasia.com/2026/08/nvidia-nemotron-4-trillion-parameter-ai-model/) — NVIDIA reportedly training Nemotron 4 (~2× Ultra); potential late-autumn release; not announced officially.
- [Nemotron 3.5 Lightning released (Aug 11)](https://www.cnbc.com/2026/08/11/nvidia-releases-nemotron-3point5-lightning-open-source-ai-model-.html) — 30B total / 3B active parameters; hybrid Mamba-2 + Transformer MoE architecture; runs on a single laptop/desktop GPU.
- [NeMo Switchyard released](https://www.buildmvpfast.com/blog/nvidia-nemotron-open-source-llm-models-2026) — NVIDIA software that routes tasks to the cheapest/most-appropriate Nemotron model tier; aligns with [[concepts/tiered-inference]] patterns.

### PolkaSharks

_No news found for PolkaSharks in the last 24h sweep (2026-08-21). No new Polkadot Decoded episodes or PolkaSharks News Brief entries were surfaced._

---

## Cross-links

- [[concepts/nemoclaw]] — five releases (v0.0.101–v0.0.108) in Aug 2026; Muse Glimmer profile notable
- [[concepts/openclaw]] — hardening-focused release; secret egress host binding; durable messaging
- [[concepts/nemotron]] — Nemotron 3.5 Lightning (Aug 11) + Nemotron 4 in development; [[concepts/tiered-inference]] routing angle via NeMo Switchyard
- [[entities/nvidia]] — two Nemotron releases + NemoClaw cadence; Nemotron 4 scale signal
- [[entities/polkadot]] — transaction spike + Grayscale ETF withdrawal + CLARITY Act risk; no protocol-level news
- [[concepts/dot-hard-cap]] — referenced in Polkadot context; no change
- [[entities/audrey-tang]] — continuing digital democracy ambassador role; no breaking news
- [[concepts/plurality]] — stable; no Aug-2026 milestone
- [[synthesis/agent-runtime-orchestration-six-region]] — Claude Code self-hosted environments + NemoClaw cadence both update the US/runtime row
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron 3.5 Lightning + Nemotron 4 news updates the US open-as-funnel row
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — Grayscale ETF withdrawal + CLARITY Act regulatory signal; no synthesis edit required yet
