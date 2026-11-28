---
type: source
title: "KOL + keyword digest — 2026-11-28"
author: kol-daily-digest (automated)
date: "2026-11-28"
ingested: "2026-11-28"
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-11-28

## TL;DR

- **KOL list is empty** — no person/channel tracking this run; add entries via the `/kol-tracker` skill to enable KOL monitoring in future digests.
- **Anthropic launched Skills over MCP in public beta for Claude Code** (2026-11-24, requires v2.1.331+), alongside Tasks and Elicitation reaching GA; unconfirmed reports of Opus 5.6 routing to some Claude Code users internally — the week's most significant Claude Code development.
- **Polkadot governance voted 97% in favour** of a consumer-products strategy pivot centred on a privacy-focused Polkadot app and dotStables/dotUSD stablecoin; DOT price ~$0.668 (down ~2.7% on Nov 27), trending bearish from ~$0.95 in early November; Acala chain exit plan approved for Feb 2027.
- **AI agent funding continued to accelerate**: Sierra raised $1.75B at a $30B valuation; Meta acquired parallel-agent startup Conductor; Palo Alto Networks reportedly in $500M talks for Clutch Security (credential security for AI agents); 79% of enterprises now report using AI agents in production per Genpact.
- **OpenClaw v2026.11.5 shipped** (global + per-agent compaction-summary limits); NemoClaw remains in alpha with no November-specific announcements; PolkaSharks had no detectable new content in the sweep window.

---

## KOL updates

_No KOL entries are configured. The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is intentionally empty. To begin tracking people and channels, run the `/kol-tracker` skill to add entries — the next digest run will then include KOL-specific post harvesting._

---

## Keyword sweep

### AI agents

Sources: [aiagentsdirectory.com Nov 27](https://aiagentsdirectory.com/news/ai-agents-daily-brief-november-27-2026), [aiagentsdirectory.com Nov 23](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-23-2026), [aiagentsdirectory.com Nov 19](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026)

- [AI coding agent exposed company secrets](https://aiagentsdirectory.com/news/ai-agents-daily-brief-november-27-2026) — security incident reported Nov 27; underscores the credential-exposure risk as agents gain shell and repo access.
- [Sierra raises $1.75B at $30B valuation](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-23-2026) — latest mega-round in the enterprise-agent space; valuation now rivals mid-tier SaaS incumbents.
- [Meta acquires Conductor (parallel coding agents)](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-23-2026) — Meta absorbs a startup built on fan-out parallel agent execution; accelerates competition with GitHub Copilot and Claude Code.
- [Palo Alto Networks in talks to acquire Clutch Security (~$500M)](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-23-2026) — Clutch secures agent credentials; acquisition signals that agentic identity management is becoming a standalone security category.
- [Databricks Genie ZeroOps enters public beta](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026) — autonomous job/table monitoring agent with human-approval gate for production changes; Nov 19.
- [LangChain LangSmith Tool Gateway enters public beta](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026) — centralises credentials, access policies, and audit traces for multi-agent tool calls; Nov 19.
- [Microsoft Foundry lets agents have M365 identities and mailboxes](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026) — agents become first-class identity principals inside enterprise Microsoft tenants; Nov 19.
- [ByteDance reportedly preparing AI agent service to compete with Meta's Muse](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026) — launch reportedly weeks away; would add a third major consumer-agent product alongside OpenAI and Meta.
- [79% of enterprises use AI agents in production (Genpact)](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026) — adoption milestone crossed; Gartner warning notes many projects have unclear value propositions.
- [Growing number of companies (banks, airlines) blocking AI agents from their systems](https://aiagentsdirectory.com/news/ai-agents-daily-brief-november-27-2026) — counter-trend to adoption surge; access-policy fragmentation is emerging as an operational risk.

### Claude Code

Sources: [Dataconomy Nov 26](https://dataconomy.com/2026/11/26/anthropic-adds-skills-over-mcp-to-claude-and-claude-code/), [Cryptobriefing (Skills)](https://cryptobriefing.com/anthropic-skills-over-mcp-claude-beta/), [Cryptobriefing (Opus 5.6)](https://cryptobriefing.com/anthropic-testing-opus-5-6-claude-code/), [Claude Code changelog](https://code.claude.com/docs/en/changelog)

- [Skills over MCP enters public beta (Claude Code ≥ v2.1.331, Nov 24)](https://dataconomy.com/2026/11/26/anthropic-adds-skills-over-mcp-to-claude-and-claude-code/) — Claude and Claude Code can now consume Skills over MCP; Tasks and Elicitation reached GA the same day; major composability unlock for the agent-skills ecosystem.
- [Unconfirmed: Opus 5.6 routing to some Claude Code users (since ~Nov 24)](https://cryptobriefing.com/anthropic-testing-opus-5-6-claude-code/) — no official model ID or pricing disclosed; treat as unconfirmed internal testing.
- [Addy Osmani (Anthropic engineer) publishes Claude Code shipping guide](https://emergent.sh/news/anthropic-engineer-shares-claude-code) — covers PR workflows and post-merge practices; Nov 24.
- [Code Mode on Bedrock/Google Cloud Agent Platform/MS Foundry (Nov 23 changelog)](https://code.claude.com/docs/en/changelog) — expands Claude Code terminal sessions to three additional cloud-agent platforms.
- [Plugin marketplaces in managedExtraKnownMarketplaces auto-update on or after Nov 30](https://code.claude.com/docs/en/changelog) — upcoming default change; plugin authors should verify marketplace listings before the cutover.

### Anthropic

Sources: [aiagentsdirectory.com Nov 23](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-23-2026), [Claude Updates Releasebot](https://releasebot.io/updates/anthropic/claude)

- [Anthropic launches proactive AI agent (Nov 23)](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-23-2026) — expands beyond reactive chat to proactively initiating tasks; details of scope/model not confirmed in secondary sources.
- [Meetings beta for Team and Enterprise (Nov 12)](https://releasebot.io/updates/anthropic/claude) — beta feature for scheduling/meeting-related workflows inside Team/Enterprise plans.
- [Computer use beta for Team and Enterprise (~Nov 20)](https://releasebot.io/updates/anthropic/claude) — desktop GUI automation now in beta for paid plans.

### OpenAI

Sources: [The Neuron Nov 26](https://theneuron.ai/digest/everything-that-happened-in-ai-today-november-26-2026), [Sam on AI Nov 26](https://samonai.substack.com/p/ai-brief-november-26-2026)

- [OpenAI Private Inference pilot announced by Sam Altman (Nov 26)](https://theneuron.ai/digest/everything-that-happened-in-ai-today-november-26-2026) — limited enterprise pilot with stronger privacy safeguards; positions OpenAI against cloud providers for sensitive workloads.
- [Unified Chat and Work experience rolling out to Pro subscribers](https://samonai.substack.com/p/ai-brief-november-26-2026) — shared usage meter across Chat and Work; some heavy users may hit limits sooner under the combined plan.
- [GPT-6.2 "Astra" and "Sol" reported introduced Nov 18](https://theneuron.ai/digest/everything-that-happened-in-ai-today-november-26-2026) — from secondary aggregators only; treat as unconfirmed until OpenAI confirms the model names.

### Polkadot

Sources: [GlobeNewswire Nov 20](https://www.globenewswire.com/news-release/2026/11/20/3407354/0/en/polkadot-community-foundation-to-back-new-community-approved-strategy-around-the-polkadot-app.html), [Polkadot blog (new strategy)](https://polkadot.com/blog/polkadots-new-strategy/), [CoinMarketCap](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/), [CryptoTicker](https://cryptoticker.io/en/polkadot-staking-yield-dot-inflation), [DiarioBitcoin Nov 27](https://www.diariobitcoin.com/analisis/polkadot-dot-pierde-terreno-el-27-de-noviembre-de-2026-y-pone-a-prueba-soportes/)

- [Community approved 97%: pivot to privacy-focused Polkadot App + dotStables strategy](https://polkadot.com/blog/polkadots-new-strategy/) — Polkadot Community Foundation backing the shift; dotStables starts with dotUSD to add DOT utility through stablecoin usage; biggest governance vote this month.
- [Acala chain exit plan approved; production expected to stop after 2027-02-10](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — governance backstop for a parachain winding down; unconfirmed by second source, treat with caution.
- [Validator set reduced toward ~400 (from 600) around Nov 18–20](https://cryptoticker.io/en/polkadot-staking-yield-dot-inflation) — entry threshold rising to ~1.96M DOT; staking yield ~2.8% vs ~3.3% inflation — negative real yield.
- [DOT price ~$0.668 on Nov 27, down ~2.7% on the day, bearish technical read](https://www.diariobitcoin.com/analisis/polkadot-dot-pierde-terreno-el-27-de-noviembre-de-2026-y-pone-a-prueba-soportes/) — price has trended from ~$0.95 in early November; supports-under-test as of Nov 27.
- [Polkadot Weekly Brief for week ending Nov 20](https://www.kucoin.com/news/insight/DOT/6b00f10c9278e40007d8e42c) — covers the new strategy vote and validator set; KuCoin price ~$0.655 differs from CMC $0.702 — both approximate.

### OpenClaw

Sources: [OpenClaw docs v2026.11.5](https://docs.openclaw.ai/releases/2026.11.5.md), [OpenClaw docs v2026.11.2](https://docs.openclaw.ai/releases/2026.11.2.md), [blog.mean.ceo Nov 2026](https://blog.mean.ceo/openclaw-news-november-2026/)

- [v2026.11.5: global and per-agent limits for client-side compaction summaries (default 16,000 chars)](https://docs.openclaw.ai/releases/2026.11.5.md) — operational guardrail for large long-running agents; reduces runaway context compression costs.
- [v2026.11.2: protect unsaved Agent Files drafts when agent is reconfigured](https://docs.openclaw.ai/releases/2026.11.2.md) — UX fix preventing data loss on agent-config changes mid-session.
- [OpenClaw marks first year anniversary in November 2026](https://blog.mean.ceo/openclaw-news-november-2026/) — project launched as Clawdbot (Nov 2025) → Moltbot (Jan 27, 2026) → OpenClaw (Jan 30, 2026); reportedly 384,000+ GitHub stars and 3.2M+ monthly active users as of earlier 2026 figures.

### NemoClaw

Sources: [NVIDIA NemoClaw product page](https://www.nvidia.com/en-us/ai/nemoclaw/), [NVIDIA NemoClaw docs](https://nvidia.github.io/NemoClaw/pr-preview/pr-1212/about/overview.html)

- _No new NemoClaw-specific announcements found for Nov 27–28, 2026._ — The project remains in alpha (early preview since 2026-03-16); APIs and runtime behaviour are subject to breaking changes.
- [NemoClaw supports Hermes (Nous Research) and LangChain Deep Agents harnesses](https://nvidia.github.io/NemoClaw/pr-preview/pr-1212/about/overview.html) — tuned for Nemotron 3 Ultra; model routing supports NVIDIA Endpoints, OpenAI, Anthropic, Google Gemini, and local Ollama.

### Plurality

Sources: [Time (Audrey Tang interview)](https://time.com/6979012/audrey-tang-interview-plurality-democracy), [MODA background](https://moda.gov.tw/press/background-information/8693)

- _No Plurality-specific news dated Nov 27–28, 2026 found._ — Most recent findable item is Audrey Tang's appearance at GovTech4Impact World Congress 2026 (Madrid, May 2026), where she argued low bandwidth is democracy's biggest "bug."
- Tang's current role: **Taiwan cyber ambassador at large** (since leaving Digital Minister post in 2024); continues advising on AI governance + plurality frameworks.

### Audrey Tang

- _Covered above under Plurality — no additional November 2026 items found in the sweep._

### NVIDIA Nemotron

Sources: [NVIDIA Nemotron 3 launch](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models), [DeepLearning.AI — The Batch](https://www.deeplearning.ai/the-batch/nvidias-nemotron-goes-big), [NVIDIA developer blog](https://developer.nvidia.com/blog/nvidia-nemotron-3-ultra-powers-faster-more-efficient-reasoning-for-long-running-agents/)

- _No new Nemotron announcements dated Nov 27–28, 2026 found._ — NVIDIA's LLM info page (last updated Aug 2026) describes four text/agentic tiers: Lightning, Nano, Super, Ultra.
- [Nemotron 3 Ultra: ~500B parameters / ~50B active, hybrid latent MoE, optimised for multi-agent long-running tasks](https://developer.nvidia.com/blog/nvidia-nemotron-3-ultra-powers-faster-more-efficient-reasoning-for-long-running-agents/) — the reference model for the NVIDIA Agent Challenge and NemoClaw stack.
- [NVIDIA is investing ~$26B over 5 years in open-weight models](https://www.constellationr.com/index%2Ephp/insights/nvidia-nemotron-much-needed-open-source-model-champion-us) — positions NVIDIA as the primary US open-source LLM player as Meta has shifted attention away from Llama.

### PolkaSharks

- _No PolkaSharks content found in the last 24h._ — Search returned Taiwan virtual-asset event listings and unrelated CERN results; no PolkaSharks episode, newsletter, or social post surfaced for Nov 27–28.

---

## Cross-links

**Existing pages this digest touches:**

- [[entities/audrey-tang]] — Taiwan cyber ambassador at large; Plurality co-author; no new items this window.
- [[concepts/plurality]] — Governance philosophy; no new items this window.
- [[entities/polkasharks]] — Taiwan Polkadot educator; no new content found this sweep.
- [[entities/polkadot]] — New strategy vote (97%) + dotStables + Acala exit + validator cut + DOT price ~$0.668.
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — Polkadot strategy pivot is relevant to the tokenomics + consumer-products pillars; dotStables/dotUSD is the pUSD concept under a new name.
- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — Acala exit plan is a governance backstop to the DeFi layer; worth verifying against next deepening pass.
- [[concepts/nemoclaw]] — Alpha status confirmed; no new release; NemoClaw still uses Hermes + LangChain harnesses.
- [[concepts/nemotron]] — Nemotron 3 family current; no new model announcement this window.
- [[concepts/openclaw]] — v2026.11.5 (compaction limits) + v2026.11.2 (draft protection) shipped this week.
- [[entities/nvidia]] — No new Nemotron/NemoClaw announcements; $26B open-weight investment thesis unchanged.
- [[concepts/agent-skills-standard]] — Anthropic's Skills over MCP entering public beta is a direct instantiation of this standard.
- [[concepts/mcp-aerospace-applications]] — AAIF-governance relevance: Skills over MCP beta expands the MCP + Agent Skills composability surface.
- [[synthesis/agent-runtime-orchestration-six-region]] — Sierra $1.75B, Meta/Conductor acquisition, LangSmith Tool Gateway beta, and Microsoft Foundry agent identities are all runtime-layer developments worth folding into the next deepening pass.
- [[synthesis/open-weight-llm-agent-stack-six-region]] — OpenAI Private Inference + GPT-6.2 "Astra" unconfirmed report; ByteDance agent service incoming — both are US closed-frontier and China developments.
- [[entities/glen-weyl]] — No new activity this window; Plurality search returned background material only.

**Stubs created:** none — no topic reached ≥ 3 mentions across the digest without an existing page.
