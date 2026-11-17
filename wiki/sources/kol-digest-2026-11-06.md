---
type: source
title: KOL + keyword digest — 2026-11-06
author: kol-daily-digest (automated)
date: 2026-11-06
ingested: 2026-11-06
tags: [digest, kol, daily]
---

## TL;DR

- **Claude Code guardrails tightened**: Anthropic added game-cloning restrictions to Claude Code (Opus 5.5) this week; separately, Anthropic's IPO valuation guidance slipped to $1.5–1.6T (from ~$2T), and Goldman Sachs restricted Claude Code to its 12,000-engineer cohort.
- **Agent infrastructure moves fast**: Google Cloud launched Agent Compute Engine (hardware-isolated microVMs per agent); Meta acquired Conductor (multi-agent coding orchestration); Sierra acquired Anon (browser-workflow agents); agentic-commerce startup "firmly" raised $15M Series A.
- **Polkadot treasury exploit**: A $1.38M loss via an unpatched XCM flaw (fixed in code four months ago, never deployed to production); DOT at ~$0.96, 98% below its 2021 ATH, technically bearish on all timeframes.
- **NVIDIA NemoClaw + Nemotron 3.5 family**: Oct 30 NemoClaw blueprint expansion now supports 3 framework harnesses (OpenClaw / Hermes / LangChain); Nemotron 3.5 Super VL (120B, multimodal, Oct 15) and 3.5 Transcribe (30B MoE, 40 languages, Oct 28) are the latest open-weight additions.
- **KOL list is currently empty** — no KOL channel sweeps were run. Use the kol-tracker skill (`/kol-tracker`) to add people/channels to `.claude/skills/kol-tracker/kol-list.yaml`.

---

## KOL updates

_KOL list is empty (seed only). No channel sweeps run. Add entries via the kol-tracker skill._

---

## Keyword sweep

### AI agents

- [AI Agents News — Week of November 3, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Aggregated weekly roundup; covers Google Cloud Agent Compute Engine launch, Meta/Conductor and Sierra/Anon acquisitions.
- [Google Cloud unveils Agent Compute Engine for AI agents](https://securitybrief.asia/story/google-cloud-unveils-agent-compute-engine-for-ai-agents) — New service runs each agent in a hardware-isolated microVM with credentials kept outside the sandbox; targets production agentic workloads.
- [firmly Raises $15 Million Series A and Launches Ask Agent for Agentic Commerce](https://globenewswire.com/news-release/2026/11/05/3396499/0/en/firmly-raises-15-million-series-a-and-launches-ask-agent-to-help-merchants-more-easily-adopt-agentic-commerce.html) — Agentic-commerce startup "firmly" raises $15M; Phaze secures $8.75M for AI agent remote workstation access.
- [20 Chinese Firms Sign AI Agent Self-Discipline Pact](https://geekqu.com/20-chinese-firms-sign-ai-agent-self-discipline-pact) — Twenty Chinese tech organisations pledge safety, privacy, and interoperability standards for AI agents; parallel to Western regulatory liability moves.
- [Latest Agentic AI News Today — Forbes](https://www.forbes.com/topics/agentic-ai/) — Forbes flags unauthorized agents in bank accounts and an autonomous Hugging Face breach as near-term security risks; regulators mulling developer liability.

### Claude Code

- [Anthropic tells Claude Code to stop recreating existing video games](https://www.techspot.com/news/114423-anthropic-tells-claude-code-stop-recreating-existing-video.html) — Anthropic added two sentences to Claude Code's system prompt on Opus 5.5 to block game-cloning requests citing IP policy; reverse-engineering requests also appear blocked.
- [Anthropic confirms new Claude Code limits to prevent game cloning](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-confirms-new-claude-code-limits-to-prevent-game-cloning-users-report-opus-5-5-is-also-actively-blocking-reverse-engineering-tasks) — Blocking limited to the Opus 5.5 + Claude Code combination; smaller models reportedly not affected.
- [Claude Code Updates by Anthropic - November 2026](https://releasebot.io/updates/anthropic/claude-code) — Versions 2.1.317 (new security checks, stricter Agent SDK hook controls) and 2.1.318 (authentication status details, cloud-session options, mod controls) shipped early November.
- [Anthropic News Today, November 5](https://aiweekly.co/ai-news-today/anthropic-news) — Reports: 40-minute partial outage on Claude/Claude Code/API; Wall Street Journal reports IPO valuation guidance at $1.5–1.6T (below the ~$2T figure discussed earlier); Goldman Sachs restricted Claude Code + GitHub Copilot to 12,000 engineers.
- [Claude Code News — blog.mean.ceo](https://blog.mean.ceo/claude-code-news-november-2026/) — Aggregator summary; unconfirmed headline about a trojanized VS Code extension (v2.1.313) planting an SSH backdoor on ~5,000 machines — treat as unverified pending primary source.

### Anthropic

_(Covered above under Claude Code; no additional primary Anthropic press release items found in this sweep.)_

### OpenAI

- [OpenAI promises to listen to communities on data centres after election result](https://thenationalnews.com/future/technology/2026/11/05/openai-data-centre-compact-compute-campus) — After Democrats won Congress in the Nov 4 midterms, OpenAI announced a "National Community Compact": self-funded energy costs, local jobs reports, no NDAs with public officials.
- [OpenAI News Today, November 5](https://aiweekly.co/ai-news-today/openai-news) — Product page lists GPT-6.1 Terra and Daybreak Red (AWS GovCloud US-East) both dated Nov 4, 2026; Greg Brockman called H1 2026 "pretty rough," Q3 marks a revenue turnaround with business sales now outpacing consumer.
- [OpenAI product releases](https://openai.com/news/product-releases/) — Daybreak Red + Images 2.6 + GPT-6.1 Terra listed; hardware device delayed to 2027 and "io" branding dropped per Wikipedia.

### Polkadot

- [Polkadot Treasury Loses $1.38M Due to Unimplemented XCM Patch](https://kucoin.com/news/flash/polkadot-treasury-loses-1-38m-due-to-unimplemented-xcm-patch) — dotUSD stablecoin supply-accounting flaw exploited; Parity confirmed the fix was in code since June 2026 but never deployed to production; resolved via network upgrade that did not affect holder balances.
- [Polkadot lost $1.38 million after hacker exploited security flaw fixed four months earlier](https://cryptoslate.com/polkadot-lost-1-38-million-after-hacker-exploited-security-flaw-fixed-four-months-earlier) — Corroborating coverage from CryptoSlate; full timeline of the patch-to-exploit gap.
- [Polkadot's $0.9417 support faces pressure as bearish trend holds](https://cryptonews.net/news/analytics/33688442/) — DOT at ~$0.96 on Nov 4; trading below every major moving average on daily and hourly charts; 98% below Nov-2021 ATH of $55.
- [Polkadot: 70% of accounts long as funding turns negative](https://cryptoticker.io/en/polkadot-long-accounts-negative-funding/) — Retail positioning heavily long while perpetual funding turns negative; sign of crowded positioning.
- [Latest Polkadot News - CoinMarketCap AI](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Roundup noting DOT at ~$0.96; first US spot DOT ETF (21Shares TDOT, Nasdaq) confirmed launched March 2026.

### OpenClaw

- [OpenClaw News — November 2026](https://blog.mean.ceo/openclaw-news-november-2026/) — First anniversary of the OpenClaw project; OpenClaw 2.0 (v2026.8.1, Aug 30) recap with redesigned UI, shared cloud sessions, faster setup.
- [State of OpenClaw 2026: The Enterprise Self-Hosted Agent](https://www.bighatgroup.com/blog/state-of-openclaw-2026-enterprise-self-hosted-ai-agent/) — Enterprise adoption growing; NVIDIA validated for enterprise deployment April 2026; Anthropic May-2026 subscription changes cited as a driver pushing teams toward provider-flexible OpenClaw.
- [OpenClaw — Wikipedia](https://en.wikipedia.org/wiki/OpenClaw) — Authoritative summary: renamed Jan 30 2026 (from Moltbot/Clawdbot/Warelay); Steinberger joined OpenAI Feb 2026; non-profit foundation took stewardship; 135k+ GitHub stars at launch.
- [OpenClaw: The AI Agent Security Crisis Unfolding Right Now — Reco.ai](https://www.reco.ai/blog/openclaw-the-ai-agent-security-crisis-unfolding-right-now) — Persistent security risks catalogued: CVE-2026-25253 RCE (patched), ClawHub marketplace malicious skills; CrowdStrike advisory against work-device installs.
- [OpenClaw 2026: Latest Version, Changelog & Updates — Petronella Cybersecurity](https://petronellatech.com/blog/openclaw-ai-agent-guide-2026/) — Overview of current version history; confirms enterprise policy adoption growing post-2.0.

### NemoClaw

- [NVIDIA expands NemoClaw blueprints for specialized AI agents](https://blockchain.news/news/nvidia-expands-nemoclaw-blueprints-for-specialized-ai-agents) — Oct 30, 2026: NemoClaw blueprints now support three harnesses (OpenClaw, Hermes Agent, LangChain Deep Agents); deployable on cloud, DGX Spark, and RTX PCs; OpenShell remains the production policy layer.
- [NVIDIA Announces NemoClaw for the OpenClaw Community](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — Original GTC Taipei March 2026 launch announcement for reference.
- [Nvidia's NemoClaw is OpenClaw with guardrails — The New Stack](https://thenewstack.io/nemoclaw-openclaw-with-guardrails/) — Technical explainer; confirms OpenShell + Landlock/seccomp/netns isolation model.

_No NemoClaw news dated November 2026 found; most recent item is Oct 30._

### Plurality

- [WebX 2026 — Audrey Tang appearance (July 13–14)](https://x.com/WebX_Asia/status/2075444908077490497) — Tang described as "Cyber Ambassador-at-large" (post-Digital Minister role); keynoted on Plurality vision; named TIME "100 Most Influential."
- [Inside Audrey Tang's Plan to Align Technology with Democracy — TIME](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — Feature interview on the Plurality framework and civic-tech trajectory; not November 2026, but most substantive recent piece.
- [Audrey Tang and Glen Weyl discuss AI and Democracy at IE University](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/) — Joint appearance on democratic tech; underscores ongoing Tang × Weyl collaboration.

_No Plurality or Audrey Tang news dated November 2026 found._

### NVIDIA Nemotron

- [Nvidia expands Nemotron LLM family with hyper-efficient models for agentic systems](https://siliconangle.com/2026/10/15/nvidia-expands-nemotron-llm-family-with-hyper-efficient-models-for-agentic-systems/) — Nemotron 3.5 Super VL (120B multimodal) + Bolt models launched Oct 15; open weights for post-training and self-hosting.
- [NVIDIA Releases Nemotron 3.5 Transcribe: 30B MoE, 40 Languages](https://www.marktechpost.com/2026/10/28/nvidia-nemotron-3-5-transcribe-open-speech-llm/) — Open-weight speech model for recorded audio; handles 40 languages and recordings up to 1 hour; Oct 28.
- [NVIDIA details edge AI workflow for DGX Spark and TensorRT Edge-LLM](https://blockchain.news/news/nvidia-edge-ai-dgx-spark-tensorrt-edge-llm-nemotron-3-5-lightning) — Nemotron 3.5 Lightning on DGX Spark via TensorRT Edge-LLM; 21 GB download, engine-build workflow published Oct 30.
- [NVIDIA Nemotron 3 Ultra — developer blog](https://developer.nvidia.com/blog/nvidia-nemotron-3-ultra-powers-faster-more-efficient-reasoning-for-long-running-agents/) — 550B-param MoE (55B active); designed for long-running agentic reasoning; older reference but canonical for hackathon stack context.
- [Open From Data Center to Desktop: NVIDIA Expands Nemotron Family](https://blogs.nvidia.com/blog/nemotron-3-5-super-vl/) — NVIDIA blog post; Nemotron 3.5 Super VL + Bolt 74B-A9B available; Bolt E4B released Oct 23.

_No Nemotron news dated November 2026 found; most recent items are Oct 28–30._

### PolkaSharks

_No PolkaSharks-specific news found in this sweep. The entity remains active as a Taiwanese Polkadot educator channel; no new episode or article dated within the last 24h was surfaced. The broader Polkadot news (XCM exploit, DOT price) is covered under the Polkadot keyword above._

---

## Cross-links

**Entities touched:**
- [[entities/nvidia]] — NemoClaw blueprint expansion + Nemotron 3.5 family
- [[entities/polkadot]] — $1.38M XCM treasury exploit; DOT price ~$0.96
- [[entities/peter-steinberger]] — OpenClaw 2.0 anniversary; ongoing OpenAI role
- [[entities/audrey-tang]] — WebX 2026 appearance; Plurality framing
- [[entities/glen-weyl]] — joint Tang × Weyl IE University appearance
- [[entities/polkasharks]] — no new content this sweep

**Concepts touched:**
- [[concepts/nemoclaw]] — blueprint expansion to 3 harnesses (OpenClaw/Hermes/LangChain)
- [[concepts/openclaw]] — 2.0 anniversary, enterprise rollout, persistent security risks
- [[concepts/nemotron]] — Nemotron 3.5 Super VL + Transcribe + Lightning additions
- [[concepts/hermes-agent-framework]] — now one of three NemoClaw harness targets
- [[concepts/agentic-payments]] — "firmly" $15M agentic-commerce raise; ongoing Claude Code → enterprise payment tooling adjacency
- [[concepts/xcm]] — exploited in the Polkadot treasury loss

**Synthesis pages touched:**
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — XCM exploit + DOT price context
- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — XCM production-deployment gap is a live falsifier entry
- [[synthesis/agent-runtime-orchestration-six-region]] — NemoClaw blueprint multi-harness expansion
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Audrey Tang / Plurality pulse check
