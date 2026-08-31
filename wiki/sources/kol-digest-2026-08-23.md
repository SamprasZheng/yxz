---
type: source
title: KOL + keyword digest — 2026-08-23
author: kol-daily-digest (automated)
date: "2026-08-23"
ingested: "2026-08-23"
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-08-23

## TL;DR

- **Anthropic ARR hits ~$65B, IPO filing imminent**: Annualized revenue jumped sharply from end-2025; investors project $100–120B for full-year 2026. Anthropic may file its IPO — potentially matching SpaceX's record debut — as early as end of August. Market share is 41% vs OpenAI's 39% among US businesses.
- **NVIDIA drops Nemotron 3.5 Lightning, hints at 1T-param Nemotron 4**: Lightning is a 30B MoE model (3B active params, 1M-token context, hybrid Mamba-2 + MoE + Attention), the most efficient model in its class for long-running agentic workloads. Nemotron 4 at ≥1T parameters is reportedly targeting late-autumn availability. Both moves extend the [[synthesis/firefly-nemoclaw-reference-implementation]] stack's model backbone.
- **Claude Code auto-mode goes default (Aug 14), ranked #1 for agentic coding**: Auto mode is now default for Pro/Max/Team plans; enterprise and API remain opt-in. CellCog's August rankings placed Claude Code first for hooks, subagents, and dynamic workflow depth.
- **OpenAI pauses Astra model over critical cybersecurity threshold**: Astra independently identified and could carry out cyberattacks against well-protected systems — a first-of-kind public developer safety halt. ChatGPT crossed 1 billion active users. GPT-5.6 Luna prices dropped 80%.
- **Polkadot developer commits hit 702K (first per Chainspect); Grayscale withdraws DOT ETF**: Strong developer activity contrasts with bearish price action (−7.64% on the week). Grayscale abruptly withdrew spot-ETF registration statements for DOT on Aug 7. Community treasury decentralization advanced under OpenGov 2.0. KOL list is currently empty — add entries via the kol-tracker skill to enable channel monitoring.

---

## KOL updates

_KOL list is currently empty — the `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` contains only commented-out examples. No channel monitoring was performed. Use the kol-tracker skill to add KOLs (e.g., Andrej Karpathy, Gavin Wood, Audrey Tang) and they will appear here on the next run._

---

## Keyword sweep

### AI agents

- [Daily AI Agent News — Week of August 22, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Cloudflare launched **Kitesurf**, a browser runtime for AI agents (3–7× less CPU/memory than Chromium) plus x402 integration so agents can pay for services autonomously.
- [AI Agent News August 2026: Rogue Agents and Real Calls](https://assindo.com/news/ai-agent-news-august-2026) — L&T Technology Services launched **AgenticIQ**, an end-to-end agentic AI platform for engineering and manufacturing; the dominant story this August is the enterprise shift to multi-agent architectures.
- [AI Agent News August 2026: Latest Breakthroughs — Skycrumbs Blog](https://skycrumbs.com/blog/ai-agents-news-august-2026) — Google's agents now call stores autonomously; Siri rebuilt for agent workflows; voice AI funding hit record highs.
- [AI Agents News — August 2026 STARTUP EDITION](https://blog.mean.ceo/ai-agents-news-august-2026/) — CellCog's August 2026 harness rankings: Claude Code first for hooks/subagents/dynamic workflows; enterprise multi-agent deployments now running real workloads across healthcare, logistics, and finance.
- [AI Agent News August 2026 — Daily AI Agent Store](https://aiagentstore.ai/ai-agent-news/2026-august) — August 2026 is surfacing the **governance gap**: most organizations lack clear answers on responsibility when an autonomous agent makes a mistake.

### Claude Code

- [Claude Code puts auto mode in the driver's seat — The Register](https://www.theregister.com/ai-and-ml/2026/08/10/claude-code-puts-auto-mode-in-the-drivers-seat/5285326) — Anthropic making auto mode the default from August 14; classifier deemed "as safe or safer than an average user clicking through prompts"; applies to Pro/Max/Team plans.
- [Claude Code May–August 2026 weekly limits promotion — Hacker News](https://news.ycombinator.com/item?id=49348751) — Anthropic extended the 50% weekly usage boost for Claude Code subscribers through August 19, 2026.
- [Claude Code Changelog August 2026 — Gradually](https://www.gradually.ai/en/changelogs/claude-code/) — New features: `ANTHROPIC_DEFAULT_MODEL` env var, cross-session idle notifications (macOS + Linux), stronger macOS sandbox protections, VS Code screen reader improvements.
- [Anthropic Release Notes August 2026 — Releasebot](https://releasebot.io/updates/anthropic) — Claude Code updates include improved auto mode, Remote Control reliability, startup speed, and clipboard copy fixes.
- [Claude Code News August 2026 — STARTUP EDITION](https://blog.mean.ceo/claude-code-news-august-2026/) — Claude Code is becoming practical startup infrastructure; CellCog ranked it first among agentic coding harnesses for August 2026.

### Anthropic

- [Anthropic's annualized revenue surges to $65B — TechCrunch](https://techcrunch.com/2026/08/17/anthropics-annualized-revenue-surges-to-65b/) — ARR reached ~$65B by end of July 2026, up sharply from end-2025; investors project $100–120B for full-year 2026.
- [Anthropic's annual revenue run rate reportedly hits $65 billion — Fortune](https://fortune.com/2026/08/18/anthropic-annual-revenue-run-rate-65-billion/) — Enterprise spending on Claude and AI agents drove the acceleration; IPO preparations are underway, potentially matching SpaceX's public debut in scale.
- [Anthropic sees AI risks rising, no plan to release stronger "Model 2" — Axios](https://www.axios.com/2026/08/14/anthropic-model-2-ai-risk) — Anthropic's August risk report flagged rising AI risks; "Model 2" (more powerful than Mythos) is not being released, though development continues broadly.
- [OpenAI is gaining on Anthropic with business users — TechCrunch](https://techcrunch.com/2026/08/20/openai-is-gaining-on-anthropic-with-business-users-new-data-indicates/) — Ramp data: Anthropic 41% vs OpenAI 39% US business market share; gap narrowing.
- [Top Tech News August 21, 2026 — TechStartups](https://techstartups.com/2026/08/21/top-tech-news-today-august-21-2026-anthropic-apple-broadcom-google-nvidia-openai-tesla-more/) — Mariano-Florentino (Tino) Cuéllar joined Anthropic as Chief Global Affairs Officer on August 4, 2026.

### OpenAI

- [OpenAI institutes new safeguards after Hugging Face breach — TechCrunch](https://techcrunch.com/2026/08/18/openai-institutes-new-safeguards-after-hugging-face-breach/) — Post-Hugging-Face incident: enhanced monitoring during development, greater alignment/security emphasis in post-training; RL paused for two weeks then restarted on lower-risk models.
- [OpenAI says it slowed Astra model development over security concerns — TechCrunch](https://techcrunch.com/2026/08/07/openai-says-it-slowed-astra-model-development-over-security-concerns/) — Astra reached a "critical cybersecurity threshold" — can independently identify and execute cyberattacks against well-protected systems; development paused on some aspects.
- [AI News August 2026: OpenAI 1B Users, Astra Launch & Major Price Cuts — Kraviona](https://kraviona.com/blog/latest-ai-news-august-2026) — ChatGPT crossed 1 billion active users; Astra solved 10 unsolved math problems for $2,000 compute; GPT-5.6 Luna prices dropped 80%; GPT-5.6 Sol API pricing cut >20%.
- [GPT-5.6 August Updates — OpenAI Deployment Safety Hub](https://deploymentsafety.openai.com/gpt-5-6-august-update) — Ultrafast mode for GPT-5.6 Sol (Aug 13); ChatGPT for Teens (Aug 18); ads in ChatGPT testing (Aug 11).
- [OpenAI Newsroom — Product Releases](https://openai.com/news/product-releases/) — Ongoing product velocity; Astra pause is a safety first for public developer communications on model capability thresholds.

### Polkadot

- [Polkadot Socials Daily Digest: 2026-08-22 — Polkadot Forum](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-22/18449) — Community treasury now fully controlled by OpenGov 2.0 with new model directing network revenue to community-controlled pool.
- [Polkadot Socials Daily Digest: 2026-08-20 — Polkadot Forum](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-08-20/18436) — DOT flagged as altseason candidate; analyst cites interoperability thesis as potential driver.
- [Developer activity rises but price remains pinned — Traders Union](https://tradersunion.com/news/cryptocurrency-news/show/2983975-polkadot-slips-7-64percent-this-week/) — Chainspect 2026 commit ranking placed Polkadot first with 702K commits, ahead of Ethereum and Cardano; price −7.64% on the week.
- [Polkadot Rebounds: Bulls Target 0.870, August 4, 2026 — Capitaxer](https://www.capitaxer.com/polkadot-rebounds-bulls-target-0-870-4-august-2026/) — Network activity spiked 17,200% (low base) amid short-term price recovery on Aug 19.
- [Latest Polkadot News — crypto.news](https://crypto.news/tag/polkadot/) — Grayscale abruptly withdrew spot-ETF registration statements for DOT from the SEC on August 7, 2026; ~200 new apps launched on Polkadot Devnet.

### OpenClaw

- [What is OpenClaw? Complete Guide — emergent.sh](https://emergent.sh/learn/what-is-openclaw) — OpenClaw (creator: [[entities/peter-steinberger]]) has 350,000+ GitHub stars as of May 2026, making it the most-starred software project in GitHub history; runs locally, 100+ AgentSkills, brings-your-own API key.
- [OpenClaw Explained — KDnuggets](https://www.kdnuggets.com/openclaw-explained-the-free-ai-agent-tool-going-viral-already-in-2026) — Connects to 50+ messaging platforms, supports all major AI models; designed for self-hosted deployment with full data ownership.
- [The Complete OpenClaw Guide — Context Studios](https://www.contextstudios.ai/blog/the-complete-openclaw-guide-how-we-run-an-ai-agent-in-production-2026) — Detailed production-deployment guide covering shell automation, file management, API control, and workflow orchestration.
- [20 Best AI Agents in 2026 — OpenClaw Blog](https://openclaw-ai.net/en/blog/best-ai-agents-2026) — OpenClaw ranked in top AI agent platforms alongside AutoGPT, CrewAI, and others for 2026.
- [What is OpenClaw? — Naoma AI](https://naoma.ai/en-GB/articles/what-is-openclaw) — Naming history confirmed: Clawdbot → Moltbot (early 2026, trademark) → OpenClaw (Jan 2026); 100K stars reached Feb 2026.

### NemoClaw

- [NVIDIA Announces NemoClaw for the OpenClaw Community — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — NemoClaw installs Nemotron models + NVIDIA OpenShell runtime in a single command; adds privacy/security controls for autonomous enterprise agents; early preview from March 16, 2026.
- [NVIDIA GTC 2026: NemoClaw launch — Constellation Research](https://www.constellationr.com/insights/news/nvidia-gtc-2026-nvidia-launches-nemoclaw-eyes-pair-dgx-spark-dgx-station) — Designed to pair with DGX Spark and DGX Station; Jensen Huang featured NemoClaw as a headline GTC 2026 announcement.
- [NemoClaw Release Notes — NVIDIA Docs](https://docs.nvidia.com/nemoclaw/about/release-notes) — August 4, 2026 release notes posted; hardware-agnostic (not limited to NVIDIA chips).
- [NemoClaw — NVIDIA's Open-Source Enterprise AI Agent Platform — Trapilot](https://trapilot.ai/claws/nemoclaw) — Enterprise deployment overview; built for companies wanting workforce-level AI agent deployments.
- [Security Bulletin: NVIDIA NemoClaw April 2026 — NVIDIA](https://nvidia.custhelp.com/app/answers/detail/a_id/5837/~/security-bulletin:-nvidia-nemoclaw---april-2026) — April 2026 security bulletin confirms active production use and patch cadence.

### Plurality

- [Inside Audrey Tang's Plan to Align Technology with Democracy — TIME](https://time.com/6979012/audrey-tang-interview-plurality-democracy/) — Tang describes Plurality as a paradigm for harnessing collaboration across social differences; technology to strengthen democracy rather than fracture it.
- [Towards Plurality: Closing Keynote at Mila AI Policy Conference 2026 — YouTube](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Tang delivered closing keynote on Plurality and civic AI at the Mila AI Policy Conference 2026.
- [Plurality: The Future of Collaborative Technology and Democracy — GitHub](https://github.com/pluralitybook) — Book co-authored with [[entities/glen-weyl]] and 100+ online collaborators; open-source on GitHub.
- [Plurality and Collaborative Technology — Tech for Impact Summit](https://tech4impactsummit.com/blog/plurality-collaborative-technology-democracy-vision/) — Summary of core Plurality thesis for tech-for-impact practitioners.
- [WebX 2026 — Audrey Tang at WebX Asia](https://x.com/WebX_Asia/status/2075444908077490497) — Tang spoke at WebX2026 (July 13-14) on digital democracy and civic AI.

### Audrey Tang

- [Cyber Ambassador Audrey Tang — Towards Plurality, Mila AI Policy Conference 2026](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Closing keynote on education, Plurality, and Civic AI at Mila 2026 conference.
- [Audrey Tang — SXSW London 2026 Speakers](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Featured speaker; globally recognized civic-tech leader and Oxford Accelerator Fellowship Fellow.
- [Audrey Tang — Tech for Impact Summit 2026](https://tech4impactsummit.com/speakers/audrey-tang/) — Continuing global tour promoting Plurality; current role as Taiwan's Cyber Ambassador-at-large (assumed Oct 2024).
- [Open Commons with Sachi Kamiya — July 2026](https://x.com/audreyt) — Appeared on Open Commons in July 2026; Eurasia Convention Busan keynote on education + Plurality + Civic AI.
- [Audrey Tang — AAE Speakers Bureau](https://www.aaespeakers.com/keynote-speakers/audrey-tang) — TIME100 "Most Influential People in AI" (2023); Taiwan's Cyber Ambassador since Oct 2024; global circuit of democracy + AI governance events.

### NVIDIA Nemotron

- [NVIDIA Releases Nemotron 3.5 Lightning — CNBC](https://www.cnbc.com/2026/08/11/nvidia-releases-nemotron-3point5-lightning-open-source-ai-model-.html) — 30B MoE model (3B active params), hybrid Mamba-2 + Attention, 1M-token context, highest efficiency in class for long-running agentic workloads; released Aug 11, 2026.
- [NVIDIA AI Releases Nemotron 3.5 Lightning and NeMo Switchyard — MarkTechPost](https://www.marktechpost.com/2026/08/11/nvidia-ai-releases-nemotron-3-5-lightning-and-nemo-switchyard/) — NeMo Switchyard released alongside: routes individual workflow parts between specialist and frontier models; jointly addresses latency and cost.
- [Nvidia Is Building a 1-Trillion-Parameter Open Model Called Nemotron 4 — technology.org](https://www.technology.org/2026/08/12/nvidia-nemotron-4-trillion-parameter-open-model/) — Nemotron 4 reportedly targeting late-autumn availability; employees confirmed to The Information; NVIDIA has not officially announced parameter count or timing.
- [Nvidia reportedly builds 1-trillion-parameter Nemotron 4 AI model — TechWireAsia](https://techwireasia.com/2026/08/nvidia-nemotron-4-trillion-parameter-ai-model/) — Same report; context: would surpass existing open-weight models by a wide margin.
- [NVIDIA Nemotron 3.5 Lightning and NeMo Switchyard — NVIDIA Blog](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/) — Official blog post; early adopters include CrowdStrike (cybersecurity), Harvey (legal), CodeRabbit (coding), Fastino Labs (finance), Lila Sciences (healthcare).

### PolkaSharks

- No new content surfaced for PolkaSharks in the last 24 hours. The entity page at [[entities/polkasharks]] notes coverage through the 2024 Polkadot Decoded series. General Polkadot results were captured under the **Polkadot** keyword above. _No new posts._

---

## Cross-links

Entities with multiple mentions across this digest:

- [[entities/audrey-tang]] — Plurality, Audrey Tang, WebX2026, Mila AI Policy keynote
- [[entities/peter-steinberger]] — OpenClaw section (multiple refs)
- [[entities/glen-weyl]] — Plurality co-author
- [[entities/nvidia]] — NemoClaw, Nemotron sections
- [[entities/polkasharks]] — PolkaSharks keyword sweep
- [[entities/polkadot]] — Polkadot keyword sweep

Concepts touched:

- [[concepts/plurality]] — Plurality keyword sweep, Audrey Tang sweep
- [[concepts/jam]] — Polkadot developer activity context
- [[concepts/agile-coretime]] — Polkadot ecosystem context

Synthesis pages implicated:

- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — Polkadot treasury, developer activity, Grayscale ETF withdrawal
- [[synthesis/agent-runtime-orchestration-six-region]] — OpenClaw 350K★, NemoClaw enterprise, Cloudflare Kitesurf, AI agents governance gap
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron 3.5 Lightning and reported Nemotron 4 (1T params); US open-as-funnel strategy
- [[synthesis/firefly-nemoclaw-reference-implementation]] — NemoClaw Aug 4 release notes; Nemotron 3.5 Lightning as potential Lightning-mode router candidate
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Plurality world tour, Tang at Mila/WebX/Busan, Plurality book promotion
- [[synthesis/sampras-2026-engineering-thesis]] — Anthropic $65B ARR + IPO arc; OpenAI Astra safety halt; Claude Code ranked #1

_No new stub pages created: all touched entities/concepts already have pages in the wiki. Anthropic's IPO arc and Astra safety halt are notable new developments — consider creating entity pages for `entities/anthropic` (if not present) and a concept page for the Astra model on next ingest if they recur._
