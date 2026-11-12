---
type: source
title: KOL + keyword digest — 2026-11-12
author: kol-daily-digest (automated)
date: "2026-11-12"
ingested: "2026-11-12"
tags: [digest, kol, daily]
---

## TL;DR

- **KOL list is empty** — no KOL channel sweep ran. Add entries via the `kol-tracker` skill to populate future digests.
- **OpenAI launched ChatGPT Business Agents** (Nov 11) — beta with Business Hub + Business Agents targeting US e-commerce/services; also acquired AI travel agent Odessia and shut it down the same day; Q3 revenue up 50% to ~$10B but losses grew to $10.9B.
- **United Airlines banned AI booking agents**, citing security risks and opposition to AI "middlemen" — a live friction point for agentic commerce.
- **Anthropic/Claude Code**: Fable 5.2 set as default model (v2.1.321), background MCP tasks added, game-recreation restrictions confirmed on Opus 5.5; unverified security alert about a trojanized VS Code extension (2.1.313) planting SSH backdoor on ~5,000 machines — treat as unconfirmed until primary source found.
- **Polkadot in stress**: Referendum 1966 reduced active validators 600→500 (enacted ~Nov 10); Acala/Karura announced shutdown (halt Feb 2027); Coinbase reported DOT deposit/withdrawal delays; DOT at ~$0.86.
- **NVIDIA Nemotron 3.5 Super VL** (120B open-weight) integrated with ElevenLabs voice agents (Nov 11) and Box content retrieval (Nov 5); model available under OpenMDW License v1.1.

---

## KOL updates

_No KOL entries are configured in `.claude/skills/kol-tracker/kol-list.yaml`. The `kols:` section is intentionally left empty with an example shape. Use the `kol-tracker` skill to add entries (e.g., Andrej Karpathy, Sam Altman, Gavin Wood, Audrey Tang channels) so future runs can sweep them._

---

## Keyword sweep

### AI agents

- [AI Agents News Brief: November 11, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-11-2026) — Major platform launches and acquisitions roundup; Perplexity Teammates, CrowdStrike insider-threat detection for agents.
- [United Airlines bans AI agents from booking flights](https://www.cbsnews.com/news/united-airlines-bans-ai-agents-booking-flights/) — CEO Scott Kirby: "I don't want to create another middleman"; cites security risks and federal-rule conflicts; first major carrier to block autonomous booking.
- [OpenAI acquires Odessia, the AI travel agent from Sonder's founder](https://thenextweb.com/news/openai-acquires-odessia-ai-travel-agent) — Francis Davidson joins OpenAI; service shut down on acquisition day; signals OpenAI consolidating agentic-commerce talent.
- [OpenAI introduces Business Agents in ChatGPT](https://businesstoday.in/technology/news/story/chatgpt-could-soon-let-you-talk-directly-to-businesses-openai-introduces-new-ai-agents-566851-2026-11-11) — Beta limited to US e-commerce and online-service businesses; two-part: Business Hub (broader) + Business Agents (narrow).
- [Plurai raises $13M seed for agent simulation environments](https://aiagentstore.ai/ai-agent-news/this-week) — Building trustworthy, self-improving AI agents; focus on simulation-based testing before deployment.

### Claude Code

- [Claude Code changelog — November 2026](https://code.claude.com/docs/en/changelog) — v2.1.321 makes Claude Fable 5.2 the default model; v2.1.319 adds background MCP tasks, expanded auto-mode and gateway controls; `/schedule` warning for uninvited connectors added; email-exposure check before web/shell calls.
- [Anthropic confirms Claude Code limits to prevent game cloning](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-confirms-new-claude-code-limits-to-prevent-game-cloning-users-report-opus-5-5-is-also-actively-blocking-reverse-engineering-tasks) — Two sentences added to Opus 5.5 system prompt steering away from recreating named games; some users report incidental blocking of reverse-engineering requests.
- [Claude Code November 2026 changelog summary](https://www.gradually.ai/en/changelogs/claude-code/) — Aggregated changelog; Fast mode now live on Vertex in global/US/EU regions with standard-speed fallback.

### Anthropic

- [Anthropic tells Claude Code to stop recreating existing video games](https://www.techspot.com/news/114423-anthropic-tells-claude-code-stop-recreating-existing-video.html) — Policy confirmed by Anthropic employee Addy Osmani on Nov 2–3; scoped to Claude Code + Opus 5.5 combo.
- [Claude Code release notes — Releasebot](https://releasebot.io/updates/anthropic/claude-code) — Third-party tracking of v2.1.319 and v2.1.321; Remote Control settings-file support added; dates partially conflict with official changelog — verify at code.claude.com.
- [Cat Wu leaves Anthropic for OpenAI](https://releasebot.io/updates/anthropic) — Senior PM for Claude Code reportedly joins OpenAI core products; secondary source only.

### OpenAI

- [OpenAI revenue surges, but billions in losses remain](https://www.heise.de/en/news/OpenAI-revenue-surges-but-billions-in-losses-remain-11520113.html) — Q3 2026: revenue ~$10B (+50% YoY), losses $10.9B; IPO targeted no earlier than 2027 per WSJ.
- [OpenAI Launches ChatGPT Business](https://www.ummid.com/news/2026/11/11/openai-launches-chatgpt-business-whats-new.html) — Business Hub (open to eligible markets) + Business Agents (US e-commerce beta); agentic commerce bridge from consumer to enterprise.
- [OpenAI acquires Odessia AI travel agent](https://thenextweb.com/news/openai-acquires-odessia-ai-travel-agent) — Acquisition + same-day shutdown; founder Francis Davidson joining; signals consolidation of travel-AI vertical.

### Polkadot

- [Polkadot passes Referendum 1966: only 500 validators from Tuesday](https://cryptoticker.io/en/polkadot-referendum-1966-approved-500-validators/) — Active validator set reduced from 600 to 500; enacted at Relay Chain block 33,814,400 (~Nov 10); nominators most exposed to reshuffling.
- [Acala and Karura to halt operations in February 2027](https://kucoin.com/news/flash/acala-and-karura-to-halt-operations-in-february-2027-amid-polkadot-ecosystem-challenges) — Referendum 195 submitted Nov 9; block production stops Feb 10 2027; only ~$249k TVL remains; LDOT unbonding deadline Dec 16 2026 (conflicting reports — verify against Subsquare).
- [Coinbase flags issues with Polkadot DOT deposits and withdrawals](https://lapaasvoice.com/coinbase-flags-issues-with-polkadot-dot-deposits-and-withdrawals-reports-transaction-delays) — Delays reported Nov 10 following a Nov 9 incident; resolution timeline unclear.
- [Polkadot 5 years after its record: DOT down 98 percent](https://cryptoticker.io/en/polkadot-five-years-after-2021-record/) — DOT at ~$0.86 as of Nov 10; 28 active parachain IDs on Polkadot; JAM mainnet date still unconfirmed as of Nov 4 forum update.

### OpenClaw

- [OpenClaw is yesterday's hype and today's AI blueprint](https://www.pcworld.com/article/3223720/openclaw-is-yesterdays-hype-and-todays-ai-blueprint.html) — PCWorld analysis (~72 days old): hype faded, 2.0 more stable, key security holes patched; cautious endorsement for business adoption.
- [OpenClaw News — November 2026 anniversary](https://joinground.substack.com/p/openclaw-is-everywhere-right-now) — Project ~1 year old; free open-source; WhatsApp/Telegram/Slack/Signal interfaces; 250k+ GitHub stars; creator Peter Steinberger reportedly joins OpenAI; OpenClaw Foundation transition.
- [OpenClaw security: 40,000 exposed instances](https://news.cgtn.com/news/2026-03-11/OpenClaw-AI-tool-that-broke-every-record-and-caused-a-security-panic-1LpwvrIqQk8/p.html) — March 2026: 40k public-internet instances exposed; two Chinese government alerts issued; Cisco/Gartner/Trend Micro risk flags remain live.

### NemoClaw

- [NVIDIA NemoClaw user guide](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/home) — Official docs updated ~Nov 4; NemoClaw = open-source reference stack for running AI agents inside NVIDIA OpenShell sandboxes; supports OpenClaw, Hermes, LangChain Deep Agents Code; provides guided onboarding, managed inference, network policy, lifecycle operations.
- [NemoClaw — NVIDIA enterprise AI agent platform overview](https://nemoclaw.bot/) — Third-party summary: enterprise fork of OpenClaw; launched GTC March 2026; install paths via Brev / DGX Spark / Jetson; _no new November 2026 announcements found_.

### Plurality

- [Audrey Tang — Great Simplification podcast (Nov 4 2026)](https://www.thegreatsimplification.com/episode/169-audrey-tang) — Digital democracy, misinformation, and trust in institutions; most recent public media appearance found.
- [Citizens' Assemblies in AI Governance — Lawfare interview (Oct 7 2026)](https://www.lawfaremedia.org/article/citizens--assemblies-in-ai-governance--an-interview-with-audrey-tang) — Citizens' assembly test case in Utah for AI governance; tools for citizens to share perspectives on weighty issues.
- [About — Plurality](https://plurality.net/about/) — Tang + E. Glen Weyl's framework: "technology for collaboration across social difference"; vTaiwan deliberation model; _no new November 2026 activity found_.

### Audrey Tang

- [Audrey Tang — Solve at MIT 2026 keynote](https://www.youtube.com/watch?v=fqvdaHWH7a0) — 2026 keynote on digital democracy and civic AI.
- [Cyber Ambassador Audrey Tang — Closing keynote at Mila AI Policy Conference 2026](https://www.youtube.com/watch?v=CUHLUCkiJmc) — Towards Plurality; most recent November-adjacent conference appearance.
- [GLOCOM Visiting Professor appointment](https://www.glocom.ac.jp/en/activities/727) — Effective June 1, 2026; International University of Japan; focus on Civic AI + democratic innovation; _no news specific to November 2026_.

### NVIDIA Nemotron

- [Nvidia expands collaboration with ElevenLabs to put Nemotron models inside voice agents](https://cryptobriefing.com/nvidia-elevenlabs-nemotron-voice-agents/) — Nov 11: Nemotron 3.5 Super VL in ElevenAgents platform; memory, routines, and tool features; first deployment: Poland's national e-Health platform.
- [Box taps Nvidia's Nemotron for new agent-first content retrieval system](https://techcrunch.com/2026/11/05/box-taps-nvidias-nemotron-for-new-agent-first-content-retrieval-system/) — Nov 5: Nemotron 3.5 Retriever embedded in Box Enterprise Advanced; vendor claims 4× faster queries, 20% fewer errors, 90% fewer tokens; rolling out early 2027.
- [NVIDIA's latest 120B-parameter model completes tasks 5x faster](https://interestingengineering.com/ai-robotics/nvidia-nemotron-35-super-vl-5x-faster) — Nemotron 3.5 Super VL: 120B params; open weights under OpenMDW License v1.1; check model card before assuming commercial terms.
- [Korea's AI Ecosystem Advances and Secures Agentic AI With NVIDIA](https://blogs.nvidia.com/blog/korea-secure-agentic-ai) — Nov 8: LG AI Research K-EXAONE-2.5 built on Nemotron-Personas-Korea datasets; API access opening.

### PolkaSharks

_No new content found for PolkaSharks in the last 24h sweep. The term returned no relevant November 2026 results — the keyword may be too niche for public search indexing. Check the official PolkaSharks channels directly._

---

## Cross-links

**Existing pages this digest touches:**

- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — Polkadot validator cut, Acala shutdown, DOT price weakness
- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — Acala/Karura DeFi sunset context
- [[synthesis/agent-runtime-orchestration-six-region]] — OpenClaw/NemoClaw developments, OpenClaw Foundation transition
- [[synthesis/open-weight-llm-agent-stack-six-region]] — NVIDIA Nemotron 3.5 Super VL (120B open-weight), OpenAI strategy
- [[synthesis/agentic-payments-six-region]] — OpenAI Business Agents launch, United Airlines agentic-commerce friction
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Audrey Tang / Plurality no new events
- [[synthesis/firefly-nemoclaw-reference-implementation]] — NemoClaw docs update noted (~Nov 4)
- [[entities/audrey-tang]] — GLOCOM professorship, Mila keynote, Great Simplification appearance
- [[concepts/plurality]] — No November 2026 activity
- [[sources/nemoclaw-hermes-install-runbook-2026]] — NemoClaw docs context
- [[sources/openclaw-introducing-steinberger-2026]] — OpenClaw Foundation transition / Steinberger joining OpenAI

_No new stub pages created — no topic reached the ≥3-mention threshold for a genuinely new entity or concept not already covered in the wiki._
