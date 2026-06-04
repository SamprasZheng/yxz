---
type: source
title: KOL + keyword digest — 2026-06-04
author: kol-daily-digest (automated)
date: 2026-06-04
ingested: 2026-06-04
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic files confidential IPO with SEC** (June 1) at a $1 trillion+ valuation — combined with Claude Code Opus 4.8's dynamic multi-agent workflows and the June 15 subscription split, Anthropic is entering a new commercial phase.
- **NVIDIA Nemotron 3 Ultra launches at Computex 2026** (June 1): 500–550B-parameter MoE model, 48 on the Artificial Analysis Intelligence Index (highest US open model ever), weights available on Hugging Face + NVIDIA NIM from June 4 — directly relevant to the Spacesharks hackathon stack.
- **Claude Code Opus 4.8** ships dynamic multi-agent orchestration scripts (coordinate tens-to-hundreds of background agents), auto plugin loading from `.claude/skills`, and Fast mode defaulting to Opus 4.8 at 2.5× speed.
- **OpenClaw**: five zero-days patched June 3 (trust-boundary bypass / agent-access hijack across messaging platforms); Microsoft simultaneously launches Scout, its first OpenClaw-powered personal assistant inside Microsoft 365.
- **Polkadot runtime v2.1.0** goes live June 2: DOT supply hard-capped at 2.1 B, annual inflation cut 53.6% — on-chain confirmation of Referendum 1710 tracked in the wiki since March 2026.

> **Note:** The KOL list is currently empty. Add entries via the kol-tracker skill (`kol-tracker: add KOL`) so future digests include channel-level tracking.

---

## KOL updates

_KOL list is empty — no channel-level sweep was run. Add KOLs via the kol-tracker skill._

---

## Keyword sweep

### AI agents

- [Microsoft Agent Control Specification (ACS) open-sourced at Build 2026](https://techcrunch.com/2026/06/02/microsoft-offers-devs-a-better-way-to-control-ai-agent-behavior/) — new open standard defining what agents may/must not do, when humans must approve, and what evidence must be logged.
- [Microsoft Azure AI agent roadmap at Build 2026](https://www.digitimes.com/news/a20260603VL202/microsoft-azure-ai-agent-2026.html) — full-stack redesign for building, running, and governing agents; Hyland Enterprise Agent Mesh and Agent Lifecycle Management announced alongside.
- [Windows platform security for AI agents](https://blogs.windows.com/windowsdeveloper/2026/06/02/windows-platform-security-for-ai-agents/) — Microsoft Execution Containers (MXC) SDK for policy-based agent guardrails; OpenClaw now runs on Windows via MXC.
- [Google Search enters "agent era" at I/O 2026](https://blog.google/products-and-platforms/products/search/search-io-2026/) — Gemini 3.5 Flash as default in AI Mode; users can create and manage multiple Search AI agents for recurring tasks.
- [GitHub switches to usage-based token billing for agents from June 1](https://aiagentstore.ai/ai-agent-news/this-week) — affects coding agents, code-review agents, and multi-step agent sessions in IDEs and CI pipelines.

### Claude Code

- [Anthropic files confidential IPO with SEC at $1T+ valuation](https://www.washingtonpost.com/technology/2026/06/01/anthropic-maker-claude-files-with-sec-go-public-an-ipo/) — submitted June 1; public offering timing not yet announced.
- [Claude Code Opus 4.8 ships dynamic multi-agent orchestration](https://releasebot.io/updates/anthropic/claude-code) — high-effort defaults; orchestration scripts coordinate tens-to-hundreds of background agents; auto plugin loading from `.claude/skills`.
- [Anthropic subscription split June 15](https://devtoolpicks.com/blog/anthropic-splits-claude-subscriptions-agent-sdk-credit-june-2026) — programmatic Claude usage via subscription plans moves to a separate monthly credit pool; affects indie hackers and SDK users.
- [Anthropic expands Project Glasswing + Claude Security](https://releasebot.io/updates/anthropic) — Claude Mythos Preview extended to ~150 new orgs; Claude Security adds codebase scanning and patch suggestions.
- [Microsoft phases out Claude Code in favor of Copilot CLI](https://www.newsbytesapp.com/news/science/microsoft-phases-out-anthropics-claude-code-shifts-to-copilot-cli/tldr) — Microsoft reportedly moving enterprise developer toolchain away from Claude Code.

### Anthropic

- [Anthropic SpaceX compute deal + higher usage limits](https://www.anthropic.com/news/higher-limits-spacex) — partnership with SpaceX for compute infrastructure; Claude usage limits raised across plans.
- _(IPO and Claude Code product news covered above)_

### OpenAI

- [OpenAI Codex expands to 5 million weekly users](https://openai.com/news/) — Codex adds role-specific plugins, Sites for interactive workspace sharing, and in-place document annotations.
- [OpenAI frontier models + Codex now GA on AWS Bedrock](https://releasebot.io/updates/openai) — available in commercial and GovCloud regions with AWS-native security, governance, and billing.
- [GPT-4.5 deprecated June 27; o3 retired August 26](https://developers.openai.com/api/docs/deprecations) — GPT Image models flagged for API removal December 1, 2026.
- [Microsoft unveils AI models to reduce OpenAI reliance at Build 2026](https://www.cnbc.com/2026/06/02/microsoft-unveils-new-ai-models-lessen-reliance-on-openai-lower-costs.html) — Azure-native models give enterprise customers alternatives to OpenAI and Anthropic.

### Polkadot

- [Polkadot runtime v2.1.0 live: DOT hard cap + 53.6% inflation cut](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — supply capped at 2.1 B DOT, annual issuance reduced to ~56.88 M DOT; on-chain confirmation of Referendum 1710.
- [JAM Protocol mainnet target 2026; Sassafras deployment accelerating](https://www.bitget.com/news/detail/12560605074161) — ecosystem media frames 2026 as the "product explosion" year for Polkadot.
- [First US DOT ETF reportedly launched](https://www.openpr.com/news/4534225/polkadot-price-prediction-after-first-us-etf-launch-and-why) — 21Shares + Grayscale filings progressing; spot ETF launch noted in recent market coverage.

### OpenClaw

- [Five OpenClaw zero-days patched June 3](https://cybersecuritynews.com/five-openclaw-0-days/) — trust-boundary bypass flaws allowed attackers to hijack AI agent access across messaging platforms; all five fixed with strict ID-based matching and explicit configuration flags.
- [Microsoft Scout launches — first OpenClaw-powered AI personal assistant](https://techcrunch.com/2026/06/02/microsoft-launches-scout-an-openclaw-inspired-personal-assistant/) — persistent user profile and style; schedules meetings and completes tasks across Microsoft 365 and the web.
- [OpenClaw adds NVIDIA Skill Cards + SkillSpector risk analysis](https://releasebot.io/updates/openclaw) — ClawHub tightened with pre-publish verification; public Hugging Face dataset of skill scan outcomes released.
- [OpenClaw runs on Windows via Microsoft Execution Containers](https://blogs.windows.com/windowsdeveloper/2026/06/02/windows-platform-security-for-ai-agents/) — Windows companion app for node/gateway setup; MXC provides process-level isolation.

### NemoClaw

- [NVIDIA JetPack 7.2 + NemoClaw on Jetson Orin announced at Computex](https://www.opensourceforu.com/2026/06/nvidia-debuts-open-ai-agent-stack-with-nemoclaw-framework/) — agentic AI skills, Yocto project support, and CUDA 13 on Jetson Orin; NemoClaw now runs fully on-device for robotics.
- [Solomon integrates NemoClaw for humanoid robot multi-agent coordination](https://www.digitimes.com/news/a20260602PD226/solomon-3d-vision-2026.html) — combines inference, perception, sensor fusion, mobility, and manipulation into a single NemoClaw workflow.
- [NemoClaw open-agent-stack overview at Open Source For You](https://www.opensourceforu.com/2026/06/nvidia-debuts-open-ai-agent-stack-with-nemoclaw-framework/) — OpenShell sandbox, privacy router, and Landlock/seccomp/netns isolation layers explained.

### Plurality

- [Audrey Tang keynote "Towards Plurality" at Mila AI Policy Conference 2026](https://www.llm-bento.com/videos/audrey-tang-cyber-ambassador-audrey-tang-towards-plurality-clo) — closing keynote covers AI governance and digital democracy; Tang's most recent major public appearance.
- [Plurality world tour ongoing; Tang is Accelerator Fellow at Oxford](https://plurality.net/) — Tang and Glen Weyl continue promoting Plurality as a path between techno-libertarianism and centralized AI governance.

### Audrey Tang

_(see Plurality section — all recent activity is Plurality-related)_

- [Time Magazine profile: "Inside Audrey Tang's Plan to Align Technology with Democracy"](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — background profile surfacing alongside the Mila keynote; no new June 4-specific content confirmed.

### NVIDIA Nemotron

- [Nemotron 3 Ultra launched at Computex 2026 (June 1)](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — 500–550B-parameter MoE; ~55B active parameters per token; 5× faster and 30% cheaper than comparable dense models; Jensen Huang keynote at Taipei Music Center.
- [Nemotron 3 Ultra scores 48 on Artificial Analysis Index — top US open model ever](https://memeburn.com/nvidia-nemotron-3-ultra-americas-best-open-ai-model-2026/) — 300+ tokens/second; weights on Hugging Face and NVIDIA NIM from June 4.
- [Nemotron 3 Nano Omni released — unified vision + audio + language](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — multimodal agentic AI model; up to 9× more efficient for agent workflows vs prior Nano.
- [Jensen Huang teases Nemotron 4 roadmap at Computex](https://cryptobriefing.com/nvidia-nemotron-3-ultra-computex-2026/) — next-generation Nemotron 4 expected later in 2026.

### PolkaSharks

_no new posts detected in last 24h sweep (June 3–4, 2026)._

---

## Cross-links

Recurring topics (≥ 3 mentions) — all link to existing wiki pages:

- [[entities/nvidia]] — Computex 2026 keynote, Nemotron 3 Ultra, NemoClaw on Jetson
- [[concepts/nemotron]] — Nemotron 3 Ultra launch; Nano Omni multimodal; Nemotron 4 teaser
- [[concepts/nemoclaw]] — JetPack 7.2 + Jetson Orin support; Solomon humanoid robots; open-stack overview
- [[concepts/openclaw]] — Five zero-days patched; Microsoft Scout; Windows MXC integration
- [[entities/polkadot]] — Runtime v2.1.0 live; JAM mainnet 2026; US DOT ETF
- [[concepts/dot-hard-cap]] — Referendum 1710 on-chain confirmation June 2
- [[entities/audrey-tang]] — Plurality keynote at Mila AI Policy Conference 2026
- [[concepts/plurality]] — World tour; Tang + Weyl governance framework
- [[entities/peter-steinberger]] — OpenClaw creator; Microsoft Scout built on his framework

Single-mention (no stub needed):

- Anthropic — IPO filing, Opus 4.8, subscription split _(no entity page yet; candidate for future ingest given recurring coverage)_
