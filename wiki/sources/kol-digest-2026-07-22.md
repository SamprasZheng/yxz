---
type: source
title: KOL + keyword digest — 2026-07-22
author: kol-daily-digest (automated)
date: "2026-07-22"
ingested: "2026-07-22"
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic's $1.5B copyright settlement received final court approval on 2026-07-20**, and Claude Fable 5 returned to global availability on 2026-07-01 following Washington negotiations; Anthropic's ~$965B IPO track is now unblocked. Life-sciences push adds $400M Coefficient Bio deal and Nobel-laureate John Jumper hire.
- **OpenAI publicly released GPT-5.6 (Sol / Terra / Luna) and GPT-Live voice models on 2026-07-08–09**, alongside ChatGPT Work — the company's clearest pivot from model demos to workflow replacement.
- **NVIDIA and LangChain launched the NemoClaw Deep Agents Blueprint on 2026-07-08**, giving enterprises a deny-by-default, full-audit-trail reference architecture on Nemotron 3 Ultra; the Nemotron Coalition (Mistral AI, Cursor, LangChain, Perplexity, Black Forest Labs, etc.) was announced simultaneously, accelerating the open-frontier model ecosystem.
- **OpenClaw crossed 135 000 GitHub stars but simultaneously triggered the first major AI-agent security crisis of 2026**: CVE-2026-25253 (CVSS 8.8, one-click RCE) plus two command-injection advisories — highlights the sandbox-governance gap that NemoClaw was built to close.
- **Polkadot staking reformed on 2026-07-08** (nominators no longer slashable, unbonding cut from 28 days to ≈48 hours via Refs 1909/1910); Nakamoto Coefficient hit 166 (highest of major blockchains, 2026-07-17); smart contracts on Polkadot Hub tripled Q2 (90→268), though DOT continues to trade near its all-time low (~$0.83).
- **KOL list is currently empty** — no channel sweep was performed. Add entries via the `kol-tracker` skill to enable per-person tracking.

---

## KOL updates

_KOL list is empty — no entries to sweep. Add KOLs via the `kol-tracker` skill (e.g., "add KOL @karpathy")._

---

## Keyword sweep

### AI agents

- [AI Agents News — Week of July 21, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — ICML 2026 opened July 6 in Seoul with a record 23 918 submissions and an unusually heavy emphasis on agentic AI in its workshop program; industry consensus is shifting from demos to workflow replacement.
- [LangChain and NVIDIA Launch NemoClaw Deep Agents Blueprint](https://www.hpcwire.com/aiwire/2026/07/08/langchain-and-nvidia-launch-nemoclaw-deep-agents-blueprint-for-enterprise-agents/) — July 8 announcement: one-command setup for LangChain Deep Agents Code on NemoClaw with Nemotron 3 Ultra, deny-by-default networking, human approval, and audit trail.
- [Oracle AI Agent Studio announced](https://openai.com/news/) — July 14: Oracle launched an AI-native builder for Fusion Agentic Applications, letting pro-code developers and coding agents build and run agents inside Oracle AI Agent Studio.
- [Cybersecurity Implications of AI Summit 2026](https://aiagentstore.ai/ai-agent-news/2026-july) — July 9 virtual event targeting agentic AI risk, identity security, and enterprise governance strategies for autonomous agents.
- [UnionPay Agentic Payment Open Protocol](https://aiagentstore.ai/ai-agent-news/2026-july) — July 17 at WAIC Shanghai: UnionPay unveiled a financial time-series foundation model plus an Agentic Payment Open Protocol, extending the agentic payments rail into China's card-network incumbent.

### Claude Code

- [What's new — Claude Code Docs](https://code.claude.com/docs/en/whats-new) — Desktop version received a **built-in browser**, allowing Claude to pull up docs, designs, or any site and interact with pages mid-task; `/doctor` command introduced for full setup diagnostics.
- [Claude Cowork expands to mobile and web (TechCrunch)](https://techcrunch.com/2026/07/07/the-coding-agent-wars-are-spilling-into-the-rest-of-the-office-claude-cowork/) — Claude Cowork (general knowledge-work agent) expanded to web and mobile for Max subscribers, enabling start-on-desktop / pick-up-on-phone workflows.
- [Alberta Government uses Claude to fix cybersecurity vulnerabilities](https://www.anthropic.com/news/alberta-government-claude-cybersecurity) — Claude Code scanned 466 million lines of Alberta government code in 20 hours and remediated security gaps across systems.
- [Claude Code in Claude for Government Desktop (Releasebot)](https://releasebot.ai/updates/anthropic/claude-code) — Public beta of Claude Code in a FedRAMP High authorized desktop environment, with tamper-evident audit logs and stronger admin controls for public-sector teams.
- [Claude Code Updates — July 2026 (Releasebot)](https://releasebot.io/updates/anthropic/claude-code) — Live MCP connector data for published artifacts; new sharing and collaboration options rolled out alongside Cowork expansion.

### Anthropic

- [Anthropic's $1.5B copyright settlement approved (TechCrunch)](https://techcrunch.com/2026/07/20/anthropics-landmark-1-5b-copyright-settlement-is-approved/) — Federal judge gave final approval to Anthropic's class-action copyright settlement on 2026-07-20; removes a major litigation overhang.
- [Claude Fable 5 IPO & safety classifier (TheStreet)](https://www.thestreet.com/technology/anthropic-ipo-fable5-mythos-safety-classifier-block-jailbreak) — Claude Fable 5 returned to global availability 2026-07-01 after two weeks of Washington negotiations, a new Mythos safety classifier, and an industry jailbreak framework co-developed with Amazon, Microsoft, and Google; unblocks Anthropic's ~$965B IPO.
- [Anthropic's 100-day sprint into biopharma](https://endpoints.news/anthropics-life-sciences-plans-mystery-programs-nobel-hires-ma-and-big-ambition/) — $400M Coefficient Bio deal + Nobel-laureate John Jumper hire + Claude Science launch; Anthropic is now building its own drug pipeline.
- [What Anthropic's latest AI discovery does—and doesn't—show (MIT Technology Review)](https://www.technologyreview.com/2026/07/13/1140343/what-anthropics-latest-ai-discovery-does-and-doesnt-show/) — July 13 research: Anthropic reports that LLMs contain a latent "J-space" of concepts not visible in output; implications for interpretability and safety are still debated.
- [Anthropic Release Notes — July 2026 (Releasebot)](https://releasebot.io/updates/anthropic) — Ongoing rollout of Claude Code desktop features, live MCP connector data, and government-edition capabilities.

### OpenAI

- [OpenAI releases GPT-5.6 — Sol, Terra, Luna (CNBC)](https://www.cnbc.com/2026/07/08/openai-expanding-gpt-5point6-ai-model-release-ending-government-limits.html) — Publicly released July 8–9 after a period limited to trusted partners at US government request; Sol = most powerful, Luna = fastest, Terra = balanced everyday workhorse.
- [OpenAI releases GPT-5.6 and ChatGPT Work (Axios)](https://www.axios.com/2026/07/09/ai-openai-gpt-release) — ChatGPT Work, powered by GPT-5.6, converts scattered notes and drafts into finished deliverables; ChatGPT character limit for custom instructions raised to 5 000.
- [GPT-Live voice models launched (Releasebot)](https://releasebot.io/updates/openai) — GPT-Live can listen and speak simultaneously, enabling natural-conversation-speed interactions; described as a step change from turn-based voice.
- [July 2026 AI mega-update (AIapps)](https://www.aiapps.com/blog/july-ai-mega-update-major-breakthroughs-launches/) — Desktop app updated with unified Recents, cloud-synced Work conversations across web/mobile/desktop, and Projects in the app.

### Polkadot

- [dotID decentralized identity goes live on People Chain (Polkadot Forum)](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-07-14/18127) — July 5: dotID is the first officially approved username authority for Polkadot People Chain, giving DOT holders human-readable on-chain identities.
- [Staking overhaul under Refs 1909 & 1910 (CoinMarketCap)](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — July 8: nominator slashing removed, unbonding cut from 28 days to ≈48 hours, validator self-stake requirements enforced with new commission caps and self-stake rewards.
- [Polkadot tops decentralization chart at Nakamoto Coefficient 166 (MEXC)](https://www.mexc.com/learn/article/polkadot-dot-price-prediction-july-2026-why-polkadot-just-did-something-it-has-never-done-before/1) — July 17: coefficient of 166 is the highest of any major blockchain, reinforcing the network's validator-diversity narrative.
- [Smart contracts on Polkadot Hub tripled Q2 2026 (CoinMarketCap)](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — From ~90 at end of Q1 to 268 by June, indicating accelerating builder activity on the Hub.
- [DOT near all-time low (CoinPrediction)](https://coinprediction.ai/dot-july-2026-price-prediction-news-and-risk-score) — DOT trading ~$0.83 in July, having touched a fresh ATL of $0.7993 on 2026-06-28; analyst base case for July is $0.81–$0.85 range.

### OpenClaw

- [OpenClaw security crisis: CVE-2026-25253 (Reco AI)](https://www.reco.ai/blog/openclaw-the-ai-agent-security-crisis-unfolding-right-now) — CVSS 8.8 one-click RCE vulnerability publicly disclosed alongside two command-injection CVEs; underscores the need for sandboxed execution (cf. NemoClaw).
- [OpenClaw crosses 135 000 GitHub stars (KDnuggets)](https://www.kdnuggets.com/openclaw-explained-the-free-ai-agent-tool-going-viral-already-in-2026) — Viral growth in 2026; now one of the fastest-growing open-source agent projects, driven by WhatsApp/Telegram/Slack integrations and local-first privacy pitch.
- [OpenClaw Changelog July 2026 (Gradually.ai)](https://www.gradually.ai/en/changelogs/openclaw/) — GPT-5.6 is now the default model for new setups; Claude Sonnet 5 and Meta Muse Spark 1.1 added as options; Telegram/Slack/Discord improvements include live progress, voice sessions, and attachment handling.
- [OpenClaw Release Notes — July 2026 (Releasebot)](https://releasebot.io/updates/openclaw) — Codex and coding-agent delegation tracking improved; Claude Code gained temporary access to selected sessions.
- [OpenClaw optimization guide (GitHub)](https://github.com/OnlyTerp/openclaw-optimization-guide) — Community-maintained guide covering speed optimization, memory architecture, context management, and model selection for OpenClaw deployments.

### NemoClaw

- [LangChain and NVIDIA launch NemoClaw Deep Agents Blueprint (PR Newswire)](https://www.prnewswire.com/news-releases/langchain-and-nvidia-launch-nemoclaw-deep-agents-blueprint-for-enterprise-agents-302820446.html) — July 8: one-command setup for LangChain Deep Agents Code (dcode) on NemoClaw + Nemotron 3 Ultra; deny-by-default networking, human-approval gate, and full audit trail; >10× lower inference cost vs closed models.
- [Deep Agents Code on NVIDIA NemoClaw (LangChain blog)](https://www.langchain.com/blog/deep-agents-code-on-nemoclaw-a-governed-blueprint-for-your-most-sensitive-code) — Governed blueprint for enterprise-sensitive code: NemoClaw's L7 credential proxy and Landlock/seccomp/netns enforcement positioned as the "missing infrastructure layer beneath open claws."
- [NVIDIA NemoClaw release notes (NVIDIA Docs)](https://docs.nvidia.com/nemoclaw/user-guide/hermes/release-notes) — Ongoing Hermes integration updates; snapshot/destroy lifecycle and OpenShell port-forward documented for production deployments.
- [NemoClaw GitHub repo (NVIDIA)](https://github.com/NVIDIA/NemoClaw) — Supports Hermes, LangChain Deep Agents, and OpenClaw; OpenAI-compatible API on port 8642; sandbox isolation via OpenShell containers.

### Plurality

- [Audrey Tang at WebX 2026 (X / WebX)](https://x.com/WebX_Asia/status/2075444908077490497) — July 13–14: Audrey Tang spoke at WebX 2026 in her role as Plurality founder and Taiwan's Cyber Ambassador-at-large, promoting technology for collaborative diversity to a global audience.
- [AI and Democracy: Audrey Tang on Plurality in Practice (Oxford Podcasts)](https://podcasts.ox.ac.uk/ai-and-democracy-ambassador-audrey-tang-plurality-practice-transparency-and-collective-intelligence) — Recent Oxford discussion: Tang on Plurality's approach to transparent AI-assisted deliberation and collective intelligence as a democratic-governance primitive.

### Audrey Tang

- [Audrey Tang at WebX 2026 (X / WebX)](https://x.com/WebX_Asia/status/2075444908077490497) — July 13–14 appearance at WebX 2026 as Plurality founder and Taiwan Cyber Ambassador-at-large; focus on digital democracy and AI-for-governance themes.
- [Taiwan's Cyber Ambassador on AI + human FOOM (Liron Shapira Substack)](https://lironshapira.substack.com/p/can-we-govern-superintelligence-taiwans) — Tang's public position: humans and AI can "FOOM together" through participatory governance structures rather than control vs. autonomy framing.

### NVIDIA Nemotron

- [Japanese enterprises build with Nemotron open models (NVIDIA Newsroom)](https://nvidianews.nvidia.com/news/japans-enterprises-and-startups-build-industry-specialized-ai-with-nvidia-nemotron-open-models) — July 15: avatarin (remote-presence robotics), ENEOS Holdings, Hitachi, NTT DATA, SoftBank/SB Intuitions, and Stockmark are building Japanese-language industry AI on Nemotron open models.
- [Nemotron Coalition formed (NVIDIA Newsroom)](https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models) — First-of-its-kind global collaboration: Black Forest Labs, Cursor, LangChain, Mistral AI, Perplexity, Reflection AI, Sarvam, Thinking Machines Lab as inaugural members advancing open frontier-level foundation models.
- [Nemotron 3 Nano Omni Model launched (NVIDIA Blog)](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — New multimodal Nemotron variant unifying vision, audio, and language for up to 9× more efficient AI agents; targets edge deployments.
- [Palantir brings secure AI to US agencies with Nemotron (NVIDIA Blog)](https://blogs.nvidia.com/blog/palantir-secure-ai-us-agencies-nemotron-open-models/) — Palantir using Nemotron open models inside its classified/FedRAMP environments; bridges NVIDIA's open-model push with the defense-AI market ([[synthesis/techno-industrial-state-defense-tech-six-region]] relevance).

### PolkaSharks

_No new posts detected in the last 24 h sweep. The `PolkaSharks` search returned only Polkadot price-prediction content with no PolkaSharks-specific articles or social posts in the result set._

---

## Cross-links

**Entities:**
- [[entities/nvidia]] — Nemotron Coalition + Nemotron 3 Nano Omni + NemoClaw Deep Agents Blueprint
- [[entities/polkadot]] — dotID live, staking reform Refs 1909/1910, Nakamoto Coefficient 166
- [[entities/polkasharks]] — No new posts this digest
- [[entities/audrey-tang]] — WebX 2026 appearance, Plurality promotion
- [[entities/palantir]] — Nemotron for US agencies (defense-AI intersection)

**Concepts:**
- [[concepts/nemotron]] — Nemotron 3 Nano Omni launch; Japanese enterprise adoption; Nemotron Coalition
- [[concepts/nemoclaw]] — LangChain Deep Agents Blueprint; CVE-2026-25253 context (sandbox-governance gap)
- [[concepts/openclaw]] — CVE-2026-25253 RCE; 135k★; GPT-5.6 as new default
- [[concepts/hermes-agent-framework]] — LangChain Deep Agents blueprint uses Hermes runtime on NemoClaw
- [[concepts/dot-hard-cap]] — Staking reform (nominators no longer slashable; unbonding 28d→48h)
- [[concepts/plurality]] — Audrey Tang at WebX 2026; Oxford discussion on AI + democratic governance
- [[concepts/agentic-payments]] — UnionPay Agentic Payment Open Protocol at WAIC Shanghai

**Synthesis:**
- [[synthesis/agent-runtime-orchestration-six-region]] — NemoClaw + LangChain blueprint reinforces US open-ecosystem dominance; OpenClaw CVEs illustrate sandbox-governance gap that NemoClaw addresses
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — Staking reform + dotID + Nakamoto Coefficient 166 update; DOT ATL context
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Audrey Tang / Plurality activity at WebX 2026
- [[synthesis/techno-industrial-state-defense-tech-six-region]] — Palantir × Nemotron for US agencies
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron Coalition adds Mistral AI, Cursor, Perplexity to the open-frontier-model ecosystem

_No new stub pages created: all recurring topics (≥3 mentions) already have existing wiki pages._
