---
type: source
title: KOL + keyword digest — 2026-11-25
author: kol-daily-digest (automated)
date: "2026-11-25"
ingested: "2026-11-25"
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic IPO + models:** Anthropic filed an S-1 registration; quarterly revenue at ~$16.8B (+50% YoY); two new flagship models shipped — Claude Fable 5.2 and Claude Mythos 5.2 — plus Anthropic donated its Agent Skills standard to the Linux Foundation's Agentic AI Foundation (AAIF, Oct 29), standardizing the portable skill-store layer across agent runtimes.
- **AI agent enterprise surge:** 79% of enterprises have deployed AI agents (Genpact); IBM + Microsoft launched "Imagine Enterprise" (Nov 10, 6,000 pre-built agents); OpenAI acquired AI travel startup Odessia; Cognition launched Devin Bots (persistent software-dev agents).
- **Polkadot validator cut + dotUSD strategy:** Referendum 1969 reduced the active validator set from 500 → 400 on Nov 18 (99.4% weighted approval); DOT hit an all-time low of ~$0.68 on Nov 15 (mkt cap ~$1.24B); community passed a 97%-approved new strategy focused on the dotUSD product platform; treasury lost $1.38M due to XCM patch not deployed to production.
- **Anthropic / Claude Code cadence:** Claude Code v2.1.308–2.1.326 shipped this month; cloud sessions now auto-detect repo deps/APIs/keys; Fast mode on Opus 4.8 deprecated (cutover Nov 30); Anthropic safety policy rewritten (dropped "no release until safe" pledge).
- **KOL list is empty** — no KOL channel content was swept because `kol-list.yaml` has no entries under `kols:`. Use the kol-tracker skill to add people/channels and unlock the KOL section in future runs.

## KOL updates

_No KOL entries configured. The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is empty. Add entries with the kol-tracker skill to populate this section._

## Keyword sweep

### AI agents

- [AI Agent News Today (Nov 12–18, 2026)](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-18-2026) — Aggregated daily brief covering enterprise platform launches, funding, and governance for AI agents; Nov 18 edition tracked 11 sources.
- [IBM + Microsoft "Imagine Enterprise" launch (Nov 10, 2026)](https://aiagentsdirectory.com/news/ai-agents-news-brief-security-enterprise-and-new-platforms-dominate) — Platform ships with 6,000 pre-built agents targeting finance and retail sectors.
- [Cognition launches Devin Bots](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-17-2026) — New persistent software-development agent from the Devin team, introducing autonomous long-running task handling.
- [OpenAI acquires AI travel agent Odessia](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-17-2026) — OpenAI shut down Odessia's public operations post-acquisition; signal of OpenAI consolidating vertical-agent IP.
- [Genpact: 79% of enterprises deployed AI agents, only 15% link to measurable financial outcomes](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-19-2026) — Enterprise adoption is broad but financial ROI visibility remains thin.

### Claude Code

- [Claude Code November 2026 releases (v2.1.308–v2.1.326)](https://www.havoptic.com/releases/claude-code/2026/11) — Steady release cadence; v2.1.317 added cost reports for gateway admins and Agent SDK hooks that can block on failure.
- [Cloud sessions auto-detect repo environment (Nov 6)](https://blog.mean.ceo/claude-code-news-november-2026/) — Claude Code cloud sessions now identify a repo's dependencies, network access, and API keys without manual config and can save that environment for reuse.
- [Fast mode on Opus 4.8 deprecated (cutover Nov 30)](https://www.havoptic.com/r/claude-code-2.1.326) — Deprecated Oct 30; removal date Nov 30, 2026; sessions on that profile need to migrate.

### Anthropic

- [Anthropic unveils Claude Fable 5.2 and Mythos 5.2](https://news.bloombergtax.com/private-equity/anthropic-unveils-new-fable-mythos-ai-models-ahead-of-ipo) — Two new flagship models described as most capable for technical work; released ahead of IPO.
- [Anthropic files S-1; quarterly revenue ~$16.8B (+50% YoY)](https://www.anthropic.com/news?via=p2p) — IPO registration filed; revenue nearly doubled; Anthropic Public Benefit Fund commits portion of shares to public benefit.
- [Anthropic donates Agent Skills standard to AAIF / Linux Foundation (Oct 29)](https://linas.substack.com/p/anthropic-claude-2026-every-launch-guide) — Agent Skills (portable, reusable agent capability format) handed to the Agentic AI Foundation, standardizing the skill-store sub-layer.
- [Anthropic safety policy rewritten](https://www.anthropic.com/news?via=p2p) — Dropped the "no release until safe" pledge in favor of a transparency-based framework.
- [US federal judge blocks Pentagon from labeling Anthropic a "supply chain risk"](https://www.anthropic.com/news?via=p2p) — Court ruled DoD cannot apply that designation as a pressure tactic.

### OpenAI

- [OpenAI DevDay 2026: 20+ product launches](https://wccftech.com/openai-devday-2026-goes-live-over-20-product-launches/) — Updates across ChatGPT, Codex, models, and the API; exact date not confirmed in search results.
- [OpenAI ARR close to $70B](https://www.computerworld.com/article/4015023/openai-latest-news-and-insights.html) — Annual recurring revenue reported by Axios; no November 25 2026 specific item confirmed.
- [OpenAI acquires Odessia (AI travel agent)](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-17-2026) — Acquisition closed and product shut down; vertical-agent consolidation signal.

### Polkadot

- [Referendum 1969: active validators cut 500 → 400 on Nov 18](https://cryptoticker.io/de/polkadot-400-validatoren-referendum-1969/) — Passed with 99.4% weighted approval; staking entry threshold ~1.68–1.96M DOT depending on source; next step (→320) needs a separate referendum.
- [Polkadot Community Foundation strategy approved with 97% of votes](https://www.rootdata.com/news/829036) — New strategy focuses on the product platform and dotUSD; approved Nov 11.
- [DOT hits all-time low ~$0.68 around Nov 15; market cap ~$1.24B, ranked 61st](https://cryptoticker.io/de/polkadot-validatorenschnitt-aktives-staking/) — Price ~6% above ATL when reported; continued validator-cut-related staking pressure cited.
- [Polkadot treasury lost $1.38M due to XCM patch not in production](https://www.rootdata.com/news/815754) — Treasury incident from early November; patch was tested but not deployed to mainnet.

### OpenClaw

_no new posts in last 24h (no November 25 2026 items found — most recent coverage is from February 2026, when Peter Steinberger joined OpenAI and moved OpenClaw into the OpenClaw Foundation; ~500K systems running, 30+ orgs, independent open-source)._

### NemoClaw

_no new posts in last 24h (no November 2026 items found — most recent coverage is from the original GTC 2026 launch; Hermes agent install path confirmed on NVIDIA product page)._

### Plurality

_no new posts in last 24h (no November 2026 specific items; most recent: Audrey Tang spoke at GovTech4Impact World Congress May 2026 in Madrid, arguing "low bandwidth is democracy's biggest bug")._

### Audrey Tang

_no new posts in last 24h (no November 2026 specific items; current role: Taiwan Cyber Ambassador at Large since Oct 2024; most recent public appearance: GovTech4Impact World Congress May 2026)._

### NVIDIA Nemotron

_no new posts in last 24h (no November 2026 announcements; NVIDIA product page last updated Aug 2026 — family spans Lightning/Nano/Super/Ultra tiers; $26B 5-year open-models investment in place)._

### PolkaSharks

_no new posts in last 24h (no PolkaSharks-specific items found; Polkadot ecosystem context this week: validator cut + ATL DOT price + treasury incident — see Polkadot section above)._

## Cross-links

Existing wiki pages this digest touches:

- [[entities/polkadot]] — validator cut, dotUSD strategy, DOT ATL
- [[concepts/dot-hard-cap]] — DOT price action and staking dynamics
- [[concepts/xcm]] — treasury incident from XCM patch deployment failure
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — validator governance + dotUSD strategy
- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — XCM production incident
- [[entities/audrey-tang]] — Cyber Ambassador status
- [[concepts/plurality]] — no new content
- [[concepts/nemoclaw]] — no new content
- [[concepts/openclaw]] — Foundation stewardship status
- [[entities/nvidia]] — Nemotron product page update
- [[concepts/nemotron]] — Nemotron 3 family status
- [[concepts/agent-skills-standard]] — AAIF donation confirmed Oct 29
- [[synthesis/agent-runtime-orchestration-six-region]] — AAIF agent-skills standardization
- [[entities/peter-steinberger]] — OpenClaw Foundation stewardship

No new stub pages created: none of the above topics reached the ≥3 mentions threshold for a new entity/concept page not already in the wiki.
