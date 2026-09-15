---
type: source
title: KOL + keyword digest — 2026-08-22
author: kol-daily-digest (automated)
date: "2026-08-22"
ingested: "2026-08-22"
tags: [digest, kol, daily]
---

## TL;DR

- **OpenAI Astra suspended after hitting "critical cybersecurity threshold"**: Astra solved 10 long-standing unsolved math problems (Lean 4 verified proofs) and made autonomous advances in agentic coding/cybersecurity significant enough that OpenAI paused development on 2026-08-18 and announced new containment policies — the most consequential AI safety event of the month.
- **NVIDIA Nemotron 3.5 Lightning released (2026-08-11)**: 30B MoE with 3B active parameters, runs on a single laptop GPU; paired with NeMo Switchyard (model router); Nemotron 4 (1T+ params) confirmed in training for late-autumn 2026 — directly upgrades the Spacesharks/Firefly stack's model-routing layer.
- **NemoClaw v0.0.108 (2026-08-12)** ships read-only host mounts, Experimental Muse Glimmer profile for DGX Spark, and improvements to MCP registration and Hermes configuration.
- **OpenClaw security crisis deepens**: 341 malicious skills confirmed out of 2,857 in the registry (~12% compromised) — the first major AI agent supply-chain attack; the 2026.8.1 release ships stronger secret egress security in response; directly relevant to NemoClaw policy preset design.
- **Polkadot CLARITY Act moment**: DOT named a focal point in US Senate CLARITY Act debate (August 19 White House crypto summit); relay-chain transactions spiked 17,200% on August 18; DOT up ~7.9% on macro-driven rally after Trump crypto push — no KOLs tracked yet (KOL list empty; add entries via the kol-tracker skill).

---

## KOL updates

_KOL list is currently empty — no KOL channels were swept. To add KOLs, run the `kol-tracker` skill and use `add KOL`. The keyword sweep below ran in full._

---

## Keyword sweep

### AI agents

- [Daily AI Agent News — Week of August 21, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Enterprise shift to multi-agent architectures is the dominant story; task-completion rate is now the KPI, not conversational quality.
- [EU AI Act high-risk provisions enforceable August 2, 2026](https://aiagentstore.ai/ai-agent-news/2026-august) — Risk management, human oversight, and conformity assessment now required; fines up to €15M or 3% of global annual revenue.
- [Google consumer agents rolling out: phone calls, inventory checks, purchases](https://aiagentstore.ai/ai-agent-news/daily/2026-08-12) — Google agents can now call stores, check stock, and complete transactions autonomously.
- [L&T Technology Services launches AgenticIQ (August 11)](https://blog.mean.ceo/ai-agents-news-august-2026/) — End-to-end agentic AI platform targeting engineering and manufacturing multi-agent workflows.
- [Cognizant announces EMEA AI Unit](https://blog.mean.ceo/ai-agents-news-august-2026/) — Foundation/Accelerate/Transform service tiers to help EMEA customers deploy agentic AI.
- [Code for India "Bharat Agentic-AI Hackathon 2026" launched August 15](https://aiagentstore.ai/ai-agent-news/2026-august) — 90-day virtual hackathon targeting public-good agentic AI across education, health, climate, governance, financial inclusion.

### Claude Code

- [Claude Code: new prompt/runner settings, MCP security, Remote Control stability](https://releasebot.io/updates/anthropic/claude-code) — Broad August update with startup speed improvements and memory leak fixes.
- [Claude Code self-hosted environments in public beta (Team + Enterprise)](https://releasebot.io/updates/anthropic/claude-code) — Teams can now run sessions on their own infrastructure with internal network access and custom tooling.
- [Claude Academy launched](https://releasebot.io/updates/anthropic) — New learning hub with courses, tutorials, badges, and personalized recommendations for safe, effective AI use.
- [Claude Sonnet 5 promotional pricing ends August 31, 2026](https://releasebot.io/updates/anthropic/claude) — Standard pricing takes effect September 1.
- [50% weekly usage boost for Claude Code subscribers extended through August 19](https://releasebot.io/updates/anthropic/claude-code) — Temporary capacity boost now expired.

### Anthropic

- [Anthropic release notes — August 2026](https://releasebot.io/updates/anthropic) — Tighter MCP and plugin security, resilient cross-session messaging, built-in "Concise" output style added.
- [Claude Code becomes practical startup infrastructure](https://blog.mean.ceo/anthropic-claude-news-august-2026/) — Analyst framing shifts from "coding helper" to daily-terminal team infrastructure.
- [Prompt caching fixed for custom gateways](https://releasebot.io/updates/anthropic/claude-code) — Previously broken caching for non-default API gateways now resolved.

### OpenAI

- [OpenAI Astra solves 10 long-standing unsolved math problems with Lean 4 proofs](https://kraviona.com/blog/latest-ai-news-august-2026) — 249-page manuscript + machine-checkable proof certificates published on GitHub.
- [OpenAI suspends Astra development after "critical cybersecurity threshold" reached](https://techcrunch.com/2026/08/07/openai-says-it-slowed-astra-model-development-over-security-concerns/) — Astra's autonomous agentic coding/cybersecurity capabilities triggered internal safety review and a development pause.
- [New safeguards announced August 18 after Hugging Face breach](https://techcrunch.com/2026/08/18/openai-institutes-new-safeguards-after-hugging-face-breach/) — More detailed monitoring and alignment/security emphasis during post-training.
- [GPT-5.6 Sol Ultrafast mode previewed (14× speed, August 13)](https://aiweekly.co/ai-news-today) — Speed-optimized tier announced; GPT-5.6 Luna prices dropped 80%.
- [Daybreak models available on AWS (August 11)](https://deploymentsafety.openai.com/gpt-5-6-august-update) — Expanded cloud availability.
- [ChatGPT for Teens launched August 18](https://kraviona.com/blog/latest-ai-news-august-2026) — Age-specific product with safety guardrails.
- [OpenAI revenue run rate tops $40 billion](https://kraviona.com/blog/latest-ai-news-august-2026) — $7B employee share buyback completed August 10.
- [OpenAI reaches 1B users milestone](https://kraviona.com/blog/latest-ai-news-august-2026) — Cumulative active-user count reported.

### Polkadot

- [Relay-chain daily transactions spike 17,200% on August 18 (6 → 1,456)](https://coinmarketcap.com/top-stories/6a87dc88d927ed2cfe79d8e7/) — Chainspect reported the jump; absolute numbers remain modest but signal developer momentum.
- [Grayscale withdraws spot DOT ETF application (August 7)](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Filed days before a key SEC decision deadline; 21Shares' TDOT ETF on Nasdaq (launched March 2026) remains live.
- [DOT named focal point of CLARITY Act debate (August 18–19)](https://crypto.news/tag/polkadot/) — Senate vote on CLARITY Act (SEC/CFTC oversight split) pending; featured at White House crypto summit August 19.
- [DOT up ~7.9% on macro-driven rally (August 20)](https://coinmarketcap.com/top-stories/6a87dc88d927ed2cfe79d8e7/) — Primarily driven by Trump pro-crypto policy push and broader crypto short squeeze, not a DOT-specific catalyst.

### OpenClaw

- [341 malicious skills confirmed out of 2,857 in registry (~12%)](https://medium.com/data-science-collective/355k-github-stars-in-5-months-17-defense-rate-the-complete-honest-guide-to-openclaw-28d2f59598e1) — First major AI agent skill-registry supply-chain attack confirmed in July 2026; still a live concern.
- [OpenClaw 2026.8.1 ships stronger secret egress security](https://releasebot.io/updates/openclaw) — Atomic model/runtime switching, shared plugin lifecycle monitors, SQLite snapshot backup/restore, macOS app profile isolation.
- [OpenClaw reaches 355K GitHub stars — fastest-growing open-source agent tool of 2026](https://www.reco.ai/blog/openclaw-the-ai-agent-security-crisis-unfolding-right-now) — Peter Steinberger's self-hosted agent now covers macOS/Windows/Linux with multi-model and multi-messenger support.
- [China restricts state enterprises from running OpenClaw (March 2026)](https://petronellatech.com/blog/openclaw-ai-agent-guide-2026/) — Context item: government-directed restriction citing security risks, not a new event but relevant to enterprise deployment posture.

### NemoClaw

- [NemoClaw v0.0.108 (August 12): read-only host mounts + Muse Glimmer DGX Spark profile](https://docs.nvidia.com/nemoclaw/user-guide/hermes/release-notes/2026/8/12) — Also improves onboarding recovery, messaging credential rotation, inference validation, MCP registration, snapshot and Hermes configuration.
- [NemoClaw v0.0.106 (August 10): managed OpenShell runtime upgraded to v0.0.101](https://docs.nvidia.com/nemoclaw/latest/user-guide/deepagents/release-notes/2026/8/10) — Converges readiness across lifecycle commands; adds bounded DGX Spark vLLM choices.
- [NemoClaw v0.0.103 (August 5): `nemoclaw launch <name>` CLI command added](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/8/5) — Agents can now launch directly after sandbox preflight without extra steps.

### Plurality

- [Plurality book article August 16, 2026](https://thelivinglib.org/plurality-the-future-of-collaborative-technology-and-democracy/) — Analysis of Taiwan's digital democracy innovations and their global applicability; draws on *Plurality* by Weyl & Tang.
- [Audrey Tang closes Mila AI Policy Conference 2026 with plural governance keynote](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Called for governance frameworks centering on organizations that are neither state nor market.
- [GETTING-Plurality research network active](https://ash.harvard.edu/programs/getting-plurality/?pg=5) — Cross-disciplinary research linking philosophy, social science, computer science, and law around Plurality governance models.

### Audrey Tang

- [Audrey Tang speaks at WebX 2026 (July 13–14)](https://x.com/WebX_Asia/status/2075444908077490497) — Keynote on Plurality as a framework for collaborative technology and democratic renewal.
- [Closing keynote at Mila AI Policy Conference 2026](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Argued for plural governance; Taiwan presented as a model for democratic AI policy.
- [Tang calls for plural governance centering neither-state-nor-market organizations in 2026](https://lironshapira.substack.com/p/can-we-govern-superintelligence-taiwans) — Interview arguing humans and AI can develop together under non-hierarchical plural structures; current role: Taiwan Cyber Ambassador-at-large.

### NVIDIA Nemotron

- [Nemotron 3.5 Lightning released August 11: 30B MoE, 3B active params, single-GPU](https://www.cnbc.com/2026/08/11/nvidia-releases-nemotron-3point5-lightning-open-source-ai-model-.html) — Lightweight open-source model built for high-volume agentic tasks.
- [NeMo Switchyard released alongside Lightning: AI model router](https://www.marktechpost.com/2026/08/11/nvidia-ai-releases-nemotron-3-5-lightning-and-nemo-switchyard/) — Determines cheapest and most appropriate model per task; agentic cost routing companion.
- [Nemotron 4 confirmed in training — 1T+ parameters, expected late autumn 2026](https://techwireasia.com/2026/08/nvidia-nemotron-4-trillion-parameter-ai-model/) — NVIDIA confirmed development but declined to verify specs; could be ready as early as late autumn per employees citing The Information.

### PolkaSharks

_no new posts — no indexed content found for PolkaSharks in the last 24h._

---

## Cross-links

Entities touched by this digest:

- [[entities/nvidia]]
- [[entities/peter-steinberger]]
- [[entities/audrey-tang]]
- [[entities/glen-weyl]]
- [[entities/polkadot]]

Concepts touched by this digest:

- [[concepts/nemotron]]
- [[concepts/nemoclaw]]
- [[concepts/openclaw]]
- [[concepts/nemoclaw-policy-presets]]
- [[concepts/dgx-spark]]
- [[concepts/hermes-agent-framework]]
- [[concepts/plurality]]
- [[concepts/dot-hard-cap]]
- [[concepts/agentic-payments]]

Synthesis pages touched by this digest:

- [[synthesis/agent-runtime-orchestration-six-region]]
- [[synthesis/open-weight-llm-agent-stack-six-region]]
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]]
- [[synthesis/firefly-nemoclaw-reference-implementation]]
- [[synthesis/digital-democracy-user-owned-social-six-region]]

No stub pages created (no topic reached ≥3 mentions that lacked an existing wiki page).
