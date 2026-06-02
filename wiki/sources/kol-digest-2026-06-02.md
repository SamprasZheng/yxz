---
type: source
title: KOL + keyword digest — 2026-06-02
author: kol-daily-digest (automated)
date: 2026-06-02
ingested: 2026-06-02
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-06-02

## TL;DR

- **Anthropic IPO filing (June 1, 2026)** — confidential SEC S-1 submitted at ~$965B valuation; $47B annualized revenue; beats OpenAI to IPO filing; potential $1T debut would be second- or third-largest IPO ever. Claude Code billing restructured June 15.
- **NVIDIA Nemotron 3 Ultra + NemoClaw launch (GTC Taipei, June 1)** — 550B MoE open-weights model releasing June 4; NemoClaw formally announced with OpenShell in preview; Cadence, Siemens, Synopsys, CrowdStrike, Palantir among first adopters. Directly upgrades the Spacesharks Mission Desk hackathon stack.
- **OpenClaw 2026.6.1-beta.1 (June 1)** — first release hardening runtime resilience (interrupted tool calls, compaction handoffs, stale session cleanup); Skill Workshop with governed proposals lands; framed as the year supervised agent teams replace single assistants.
- **Google + Microsoft AI agent race** — Google information agents launching for Pro/Ultra subscribers this summer (Gemini 3.5 Flash default); Microsoft Agent 365 enterprise control plane reached GA May 1, 2026.
- **Audrey Tang world tour continues** — keynoted Mila AI Policy Conference 2026 on Plurality; panel in Gothenburg June 5; promoting ROOST (Robust Open Online Safety Tools) as Taiwan's cyber ambassador and Oxford AI Ethics fellow.

_KOL list is empty — add entries via the `/kol-tracker` skill to populate the KOL updates section in future digests._

## KOL updates

_No KOLs configured. No entries under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml`. Use the kol-tracker skill to add KOLs (e.g. Andrej Karpathy, Gavin Wood, Shawn Tabrizi) and this section will be populated automatically on the next digest run._

## Keyword sweep

### AI agents

- [Google Search's I/O 2026 updates: AI agents and more](https://blog.google/products-and-platforms/products/search/search-io-2026/) — Google upgraded Search with Gemini 3.5 Flash as default model in AI Mode; "information agents" launching for Pro & Ultra subscribers this summer; users can create, customise, and manage multiple AI agents.
- [Microsoft Build 2026: What to expect from the June 2 keynote](https://www.notebookcheck.net/Microsoft-Build-2026-What-to-expect-from-the-June-2-keynote.1311546.0.html) — Build 2026 opens June 2 in San Francisco; Microsoft Agent 365 enterprise control plane reached general availability May 1, 2026; GitHub Copilot updates and Windows local AI on the agenda.
- [AI agent trends 2026 report | Google Cloud](https://cloud.google.com/resources/content/ai-agent-trends-2026) — Market projected to surpass $10B in 2026; Gartner forecasts 40% of enterprise apps embed task-specific agents by year-end; shift from flashy demos to device control, workflow automation, and support.
- [Top AI Agent Development Companies to Watch in 2026](https://www.fingerlakes1.com/2026/06/01/top-ai-agent-development-companies-to-watch-in-2026/) — Industry survey: reasoning models (o1, DeepSeek-R1), multimodal as standard, and GPT-4-level performance at dramatically lower cost are the 2026 defining trends.
- [AI News | June 2026 (STARTUP EDITION)](https://blog.mean.ceo/ai-news-june-2026/) — Roundup of startup AI announcements; agentic workflows moving from pilots to production; efficiency improvements redefining cost floors.

### Claude Code

- [Anthropic Splits Claude Subscriptions: What Changes on June 15](https://devtoolpicks.com/blog/anthropic-splits-claude-subscriptions-agent-sdk-credit-june-2026) — Programmatic usage via Claude subscription plans moving to a separate monthly credit pool starting June 15; follows April 2026 ban on third-party agents using personal subscriptions.
- [Anthropic Uses Contractors to Improve Claude Code](https://letsdatascience.com/news/anthropic-uses-contractors-to-improve-claude-code-8265956a) — Project "Marlin" via Snorkel AI: contractors paid up to $280/task to create prompts and review code for fine-tuning Claude Code.
- [Claude Platform Release Notes](https://platform.claude.com/docs/en/release-notes/overview) — Opus 4.8, Sonnet 4.6, and Haiku 4.5 tiered model release; `ant` CLI launched as command-line client for Claude API with native Claude Code integration and YAML-based API resource versioning.
- [Anthropic's Code with Claude showed off coding's future](https://www.technologyreview.com/2026/05/21/1137735/anthropics-code-with-claude-showed-off-codings-future-whether-you-like-it-or-not/) — MIT Technology Review recap of May 2026 event: nearly half of attending developers had shipped a completely Claude-authored pull request in the prior week.
- [Anthropic's June 15 Billing Change: What Every Claude Code & Agent SDK User Must Do](https://codersera.com/blog/anthropic-june-2026-billing-change-claude-code/) — Practical migration guide for Agent SDK users; credit pools will be separate from personal-plan usage after June 15.

### Anthropic

- [Anthropic files for IPO | Washington Post](https://www.washingtonpost.com/technology/2026/06/01/anthropic-maker-claude-files-with-sec-go-public-an-ipo/) — Anthropic confidentially filed S-1 with SEC on June 1, 2026; ~$965B valuation; $47B annualized revenue; potential $1T IPO would rank second- or third-largest ever, behind SpaceX and Saudi Aramco; beats OpenAI to the filing.
- [AI Giant Anthropic Confidentially Files for US IPO | US News](https://www.usnews.com/news/top-news/articles/2026-06-01/ai-giant-anthropic-confidentially-files-for-us-ipo) — Confirms Anthropic now leading OpenAI on market value, reported revenue, and path to public markets.
- [Anthropic races toward Wall Street debut | Washington Times](https://www.washingtontimes.com/news/2026/jun/1/confidential-sec-filing-anthropic-races-toward-wall-street-debut/) — Background on Anthropic's investor base and capital structure ahead of IPO.
- [Higher usage limits for Claude and a compute deal](https://www.anthropic.com/news/higher-limits-spacex) — Anthropic announced higher usage limits alongside a new compute partnership (SpaceX referenced in URL slug); details pending official announcement.

### OpenAI

- [OpenAI launches the OpenAI Deployment Company](https://openai.com/index/openai-launches-the-deployment-company/) — New entity to help businesses build around intelligence; signals OpenAI expanding enterprise go-to-market beyond direct API sales.
- [GPT-5.5 family tracked in June 2026](https://llm-stats.com/llm-updates) — GPT-5.5 (Pro + Instant) variants live; Instant becomes the new ChatGPT default with reduced hallucinations and improved personalisation controls.
- [OpenAI Frontier Governance Framework (May 29)](https://releasebot.io/updates/openai) — Shared playbook for trustworthy third-party evaluations published; Frontier Governance Framework announced; structured safety posture for the GPT-5 era.
- [Model Release Notes | OpenAI Help Center](https://help.openai.com/en/articles/9624314-model-release-notes) — GPT-4.5 retiring June 27, 2026 following 30-day sunset period; new personal finance experience in ChatGPT launched May 15.
- [ChatGPT Interactive Learning](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) — 70+ math and science topics with interactive visual modules allowing real-time formula and variable experimentation.

### Polkadot

- [Polkadot DOT Cuts Issuance 53.6%](https://www.openpr.com/news/4489522/polkadot-news-dot-cuts-issuance-53-6-while-alphapepe-keeps) — March 14, 2026 tokenomics overhaul getting mainstream coverage: 2.1B DOT hard cap, ~56.88M annual issuance (down from ~120M); DOT trading ~$1.25–$2 range in June 2026.
- [21Shares TDOT ETF on Nasdaq (March 6, 2026)](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — First US spot Polkadot ETF; real DOT collateral; Coinbase as custodian; institutional adoption milestone.
- [Polkadot DeFi expansion to Ethereum](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — Key Polkadot DeFi protocol expanding to Ethereum; 1M DOT loan generated 53K DOT in yield, showcasing productive capital deployment.
- [Is It Too Late to Buy Polkadot? | Motley Fool](https://www.fool.com/investing/2026/05/30/is-it-too-late-to-buy-crypto/) — Mainstream financial press covering DOT among top altcoins as 2026 altseason liquidity improves.
- [Polkadot Price | CoinGecko](https://www.coingecko.com/en/coins/polkadot) — Live market data; analysts bullish based on hard-cap + coretime demand dynamics unfolding through 2026.

### OpenClaw

- [OpenClaw 2026.6.1-beta.1 release notes](https://github.com/openclaw/openclaw/releases) — June 1 release: agents and CLI-backed runtimes recover more cleanly from interrupted tool calls, stale session bindings, compaction handoffs, and media delivery retries.
- [Nemotron Labs: What OpenClaw Agents Mean for Every Organization | NVIDIA Blog](https://blogs.nvidia.com/blog/what-openclaw-agents-mean-for-every-organization/) — NVIDIA spotlighting OpenClaw adoption at GTC Taipei; 2026 framed as the transition from single assistants to supervised agent teams.
- [OpenClaw 2026: Complete Self-Hosted AI Agent Setup](https://petronellatech.com/blog/openclaw-ai-agent-guide-2026/) — Enterprise adoption guide; governed skill edits, inspectable workboards, durable SQLite-backed state, bounded network/provider waits, Control UI with proposal review workflow.
- [OpenClaw Current Status 2026: Comprehensive Analysis](https://skywork.ai/skypage/en/openclaw-status-analysis-trends/2049105001462431745) — Deep-dive on OpenClaw's 2026 trajectory; channel delivery steady across Telegram, WhatsApp, iMessage, Slack, Discord, Teams, Google Chat, iOS Talk.
- [Why OpenClaw agents are the next big enterprise challenge | Computer Weekly](https://www.computerweekly.com/news/366640697/Why-OpenClaw-agents-are-the-next-big-enterprise-challenge) — Security and governance focus: enterprise concerns about persistent AI agents with broad tool access; governance models needed.

### NemoClaw

- [Enterprise Software Leaders Build AI Agents With NVIDIA (June 1, 2026)](https://www.globenewswire.com/news-release/2026/06/01/3303984/0/en/enterprise-software-leaders-build-ai-agents-with-nvidia.html) — GlobeNewswire: Cadence, Dassault Systèmes, Siemens, Synopsys adopting NemoClaw for autonomous AI engineers; CrowdStrike and Palantir using Nemotron for long-running agents; 50M+ Nemotron 3 family downloads to April 2026.
- [Nvidia Debuts Open AI-Agent Stack With NemoClaw Framework](https://www.opensourceforu.com/2026/06/nvidia-debuts-open-ai-agent-stack-with-nemoclaw-framework/) — Stack overview: OpenShell isolates each agent in its own sandbox, enforces company-defined access policies, privacy router prevents internal data leakage to cloud models; CUDA-X Agent Skills available now; OpenShell in preview.
- [Nvidia GTC 2026: NemoClaw pairs with DGX Spark, DGX Station | Constellation Research](https://www.constellationr.com/insights/news/nvidia-gtc-2026-nvidia-launches-nemoclaw-eyes-pair-dgx-spark-dgx-station) — NemoClaw paired with DGX Spark + DGX Station for on-device agentic workloads; Jensen Huang keynote context.
- [Nvidia Solved the AI Agent Security Problem at GTC | FinTech Weekly](https://www.fintechweekly.com/news/nvidia-nemoclaw-gtc-2026-ai-agents-enterprise-payments-crypto-2026) — NemoClaw framed as solving the AI agent security problem; payment problem (autonomous agent payments) flagged as still unsolved.
- [NVIDIA NemoClaw Release Notes](https://docs.nvidia.com/nemoclaw/about/release-notes) — Official release notes page; Nemotron 3 Ultra launching June 4 as the first model tuned for NemoClaw long-running agent workloads.

### Plurality

- [Audrey Tang Closing Keynote — Towards Plurality, Mila AI Policy Conference 2026](https://www.llm-bento.com/videos/audrey-tang-cyber-ambassador-audrey-tang-towards-plurality-clo) — Tang delivered closing keynote on Plurality and AI policy; framing technology as a tool for collaborative diversity rather than centralised control.
- [Interview with Audrey Tang, 2025 Right Livelihood Laureate (May 26, 2026)](https://www.gchumanrights.org/gc-news/conversations/interview-with-audrey-tang-2025-rightlivelihood-laureate/) — Tang interviewed on technology, democracy, and human rights; promoting ROOST (Robust Open Online Safety Tools) initiative from Paris AI Summit 2025.
- [Inside Audrey Tang's Plan to Align Technology with Democracy | TIME](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — Tang on world tour promoting Plurality; now Taiwan's cyber ambassador and Oxford Institute for Ethics in AI fellow; co-authored book with Glen Weyl and 100+ online collaborators.
- [Plurality Launch | RadicalxChange](https://www.radicalxchange.org/updates/announcements/plurality-launch/) — Background on the Plurality book and Weyl/Tang framework for technology serving collaborative democratic governance.
- [Panel Discussion with Audrey Tang — Gothenburg, June 5, 2026](https://digidemlab.org/en/news/a-panel-discussion-with-audrey-tang/) — Tang visiting Gothenburg June 5 for open public panel on the future of democracy and digital civic participation.

### Audrey Tang

- [Interview with Audrey Tang — Global Campus Human Rights (May 26, 2026)](https://www.gchumanrights.org/gc-news/conversations/interview-with-audrey-tang-2025-rightlivelihood-laureate/) — 2025 Right Livelihood Award laureate; interview covering technology governance, digital democracy, and human rights landscape.
- [Audrey Tang and Glen Weyl on AI and Democracy at IE University](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/) — Joint event with Plurality co-author Glen Weyl; framing democracy itself as a social technology that must evolve alongside AI.
- [Panel Discussion with Audrey Tang — Gothenburg, June 5, 2026](https://digidemlab.org/en/news/a-panel-discussion-with-audrey-tang/) — Open panel at Digidem Lab; civic technology and digital democracy with international audience.
- [Taiwan's Audrey Tang | Island Times](https://islandtimes.org/taiwans-audrey-tang/) — Profile covering Tang's journey from Taiwan's Digital Minister to cyber ambassador-at-large; global platform for Plurality ideas.
- [Inside Audrey Tang's Plan to Align Technology with Democracy | TIME](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — Tang: "I hope to show that technology, when designed with diversity in mind, can strengthen rather than undermine democratic participation."

### NVIDIA Nemotron

- [NVIDIA Debuts Nemotron 3 Family of Open Models | NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Official newsroom: Nemotron 3 Ultra (550B MoE), Nano, Super family; open-weights with Apache 2.0; releasing June 4 via standard global channels including build.nvidia.com.
- [Nvidia CEO Jensen Huang launches Nemotron 3 Ultra at Computex 2026](https://cryptobriefing.com/nvidia-nemotron-3-ultra-computex-2026/) — 500–550B parameters; latent MoE + NVFP4 training; Intelligence Index score 48; activates only relevant parameter slices for 5x throughput vs prior generation; data + training recipe also released for transparency.
- [NVIDIA Computex 2026: Complete Recap](https://www.explainx.ai/blog/nvidia-computex-2026-nemotron-3-ultra-complete-recap) — Full recap: Nemotron 3 Ultra, Cosmos 3, RTX Spark all announced June 1; 300+ output tokens/sec; 30% lower operating cost than comparable models; 50M+ Nemotron 3 family downloads in the year to April 2026.
- [Enterprise Software Leaders Build AI Agents With NVIDIA](https://www.globenewswire.com/news-release/2026/06/01/3303984/0/en/enterprise-software-leaders-build-ai-agents-with-nvidia.html) — CrowdStrike + Palantir deploying long-running agents on Nemotron open models; enterprise AI engineers powered by Nemotron + NemoClaw now in production at major ISVs.
- [Nemotron 3 Ultra: NVIDIA's 550B Open Model | tbreak](https://tbreak.com/nemotron-3-ultra-open-model/) — Architecture deep-dive: latent MoE + NVFP4 training; 5x higher throughput vs previous Nemotron generations; designed specifically for agentic workflows with NemoClaw.

### PolkaSharks

_No new PolkaSharks-specific content found in the last 24h. General Polkadot ecosystem news (TDOT ETF milestone, hard-cap tokenomics mainstream coverage) is covered under the Polkadot keyword section above. Check vocus.cc/salon/Polkasharks directly for the latest episode._

## Cross-links

[[entities/nvidia]] — GTC Taipei NemoClaw formal launch; Nemotron 3 Ultra (550B MoE, June 4 release)
[[entities/anthropic]] — IPO filing (June 1); June 15 billing split; Opus 4.8 / Sonnet 4.6 / Haiku 4.5 release; "Marlin" fine-tuning project
[[entities/openai]] — GPT-5.5 family; Frontier Governance Framework; Deployment Company; GPT-4.5 retirement June 27
[[concepts/nemoclaw]] — NemoClaw formal GTC Taipei launch; OpenShell preview; CUDA-X Agent Skills available; enterprise adopters
[[concepts/nemotron]] — Nemotron 3 Ultra 550B MoE; latent MoE + NVFP4; 5x throughput; June 4 release date
[[concepts/openclaw]] — 2026.6.1-beta.1 runtime hardening; Skill Workshop; governed skill proposals
[[entities/polkadot]] — TDOT ETF; tokenomics hard-cap mainstream coverage; DeFi expansion to Ethereum
[[entities/audrey-tang]] — Mila AI Policy Conference keynote; Gothenburg panel June 5; ROOST advocacy
[[concepts/plurality]] — Ongoing world tour; Mila + IE University + Gothenburg events
[[concepts/dot-hard-cap]] — 53.6% issuance cut confirmed and covered in mainstream financial press
[[concepts/dgx-spark]] — NemoClaw paired with DGX Spark + DGX Station for on-device agent workloads
[[synthesis/spacesharks-mission-desk-hackathon-plan]] — Nemotron 3 Ultra + NemoClaw stack updates directly relevant to Mission Desk submission
[[synthesis/polkadot-2026-jam-tokenomics-six-region]] — TDOT ETF + tokenomics getting institutional and mainstream confirmation in June 2026
