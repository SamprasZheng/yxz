---
type: source
title: KOL + keyword digest — 2026-06-28
author: kol-daily-digest (automated)
date: 2026-06-28
ingested: 2026-06-28
tags: [digest, kol, daily]
---

## TL;DR

- **KOL list is empty** — no channels were swept today. Add entries via the kol-tracker skill (`.claude/skills/kol-tracker/kol-list.yaml`) to get per-account coverage.
- US export-control politics is now the dominant AI-policy story on both sides: Anthropic got partial Mythos 5 access restored for "trusted partners" (Fable 5 stays fully blocked, 15 days into the suspension), while OpenAI's brand-new GPT-5.6 Sol/Terra/Luna preview is *also* restricted to a Trump-administration-approved partner list — same export-control mechanism hitting both labs simultaneously.
- NVIDIA shipped new open Nemotron models (Speech, RAG embed/rerank, Safety/PII) on June 23, widening the NemoClaw/Nemotron stack the Firefly + hackathon synthesis pages already track; no new NemoClaw-specific release since the GTC Taipei announcement.
- OpenClaw passed 350k+ GitHub stars and shipped a 2026.6.11 update (Slack relay mode, Mattermost `/oc_queue`, file-driven agent wake), while Microsoft shipped "Scout," an OpenClaw-inspired personal assistant — first sign of a major-vendor copycat.
- Polkadot (DOT) traded below $1 for the first time, ~98% off its 2021 ATH, with social sentiment near a multi-month low — bearish price action despite the supply-cap/burn mechanics already on-chain since March. No PolkaSharks-specific content found; no dated Audrey Tang news in the last 24h beyond her standing Plurality/digital-democracy profile.

## KOL updates

_KOL list is empty — no entries under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml`. Use the kol-tracker skill to add channels._

## Keyword sweep

### AI agents

- [AI agent trends 2026 report](https://cloud.google.com/resources/content/ai-agent-trends-2026) — Google Cloud's running trends report; backdrop for the day's agent-ecosystem news.
- Agentic Resource Discovery (ARD) — Google, Microsoft, GitHub, Hugging Face, NVIDIA, Salesforce, and Snowflake released an open spec letting agents discover/verify tools, APIs, MCP servers, and other agents at runtime (via [AI News Today June 27 2026: 15 Biggest Stories](https://www.buildfastwithai.com/blogs/ai-news-today-june-27-2026)).
- [Google DeepMind AI Control Roadmap](https://www.buildfastwithai.com/blogs/ai-news-today-june-27-2026) — treats highly capable agents as potential insider threats; permissions granted only after verified behavior plus continuous monitoring.
- OpenAI Codex org adoption rose from ~0% (mid-2025) to ~17% of active ChatGPT/Codex users, with non-developers the fastest-growing segment — reported via [AI News Today June 27 2026](https://www.buildfastwithai.com/blogs/ai-news-today-june-27-2026).
- [Daily AI Agent News — Last 7 Days](https://aiagentstore.ai/ai-agent-news/this-week) — rolling tracker, useful for next sweep's diffing baseline.

### Claude Code

- [Claude Code Docs — What's new](https://code.claude.com/docs/en/whats-new) — fullscreen mouse-click controls (`CLAUDE_CODE_DISABLE_MOUSE_CLICKS`), fixed hook-matcher substring bug on hyphenated identifiers (e.g. `code-reviewer`), voice-dictation fix for long-running macOS sessions, Linux mic-vs-SoX detection improvement.
- [📰 Claude Code Radar — June 27, 2026](https://www.skool.com/claude-code-pirates-8106/claude-code-radar-june-27-2026) — community-run daily radar, cross-check against official release notes above.
- Background-agent reliability fix: jobs no longer disappear from `claude agents` or lose data when written by a newer CLI version (via Claude Code release notes).
- [Microsoft Drops Claude Code: What Changes for You](https://memeburn.com/microsoft-drops-claude-code-what-changes-for-you/) — headline claim needs verification before citing further; flagged as unconfirmed.
- Earlier-June baseline: `/rewind` to resume before `/clear`, MCP/OAuth reliability, ~37% CPU reduction during streaming.

### Anthropic

- [US allows trusted partners to use Anthropic's Mythos 5 AI model — Bloomberg](https://www.bloomberg.com/news/articles/2026-06-26/us-allows-trusted-partners-to-use-anthropic-s-mythos-5-ai-model) — partial restoration after a two-week national-security hold; Fable 5 (the lighter sibling) is explicitly *not* included.
- [US government allows Anthropic limited release of AI model that sparked cybersecurity concerns — CNN](https://www.cnn.com/2026/06/26/tech/anthropic-mythos-release) — same story, additional detail on the cybersecurity rationale for the original hold.
- [Is Fable 5 Back? No — Day 15, Garbarino Demo & Mythos Irony (June 27)](https://explainx.ai/blog/is-fable-5-back-2026) — independent tracker confirms Fable 5 still serving zero traffic 15 days into the suspension.
- [OpenAI and Anthropic face new AI reality as users shift from 'tokenmaxxing' to efficiency — CNBC](https://www.cnbc.com/2026/06/26/openai-anthropic-new-ai-spending-reality-as-users-shift-to-efficiency.html) — cross-lab demand-side trend piece.
- [Anthropic Economic Index report: Cadences](https://www.anthropic.com/research/economic-index-june-2026-report) — Anthropic's own research output, June 2026 edition.

### OpenAI

- GPT-5.6 preview (Sol/Terra/Luna tiers) launched June 26 but restricted by the Trump administration to a small group of approved partners — mirrors the Anthropic Mythos 5 restriction same week (via [AI News Today June 27 2026](https://www.buildfastwithai.com/blogs/ai-news-today-june-27-2026) and [Arkansas Democrat-Gazette](https://www.arkansasonline.com/news/2026/jun/27/openai-restricting-release-of-new-model/)).
- [OpenAI News](https://openai.com/news/) — first-party newsroom, no additional June 27 post beyond the GPT-5.6 restriction story at fetch time.
- GPT-4.5 retired from ChatGPT (including custom GPTs) as of June 26; existing conversations roll forward to GPT-5.5.
- ChatGPT Business shipped a simplified model picker (web/iOS/Android) collapsing tiers around a speed-vs-reasoning axis; "Thinking Light" removed.
- Codex Remote reached general availability on all ChatGPT plans — start/continue work on a connected Mac/Windows host, review and approve from phone.

### Anthropic / OpenAI cross-note

Both labs had a same-week model-restriction event tied to the same US export-control mechanism (Mythos 5 partial unblock vs. GPT-5.6 Sol restricted-partner gating) — worth a synthesis note if this pattern recurs; not yet filed as a wiki page, flagging for a future ingest.

### Polkadot

- [Polkadot Price History: DOT Hits Sub-$1 in 2026 After $54.87 ATH — MEXC News](https://www.mexc.com/news/1174328) — DOT traded at $0.8758 on June 25, first sub-$1 print in its history, ~98% below the Nov-2021 ATH; market cap ~$1.48B, rank ~#44.
- Santiment social-sentiment data: bullish-to-bearish comment ratio collapsed to 1.18:1 on June 19 — one of the weakest sentiment readings in months (via [CoinMarketCap Polkadot updates](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/)).
- TDOT (Polkadot spot ETF) flows stayed flat for an eighth consecutive session on June 19 while Solana/XRP ETFs saw inflows — relative-weakness signal.
- On-chain fundamentals diverge from price: the March 2026 hard supply cap (2.1B DOT), 50%+ issuance cut, and coretime-revenue burn mechanics are unchanged; Agile Coretime has brought 150+ new dApps in Q1 2026 per the same sweep.
- [Polkadot News — Investing.com](https://www.investing.com/crypto/polkadot-new/news) — general feed for next sweep's baseline.

### OpenClaw

- [OpenClaw Newsletter — 2026-06-23](https://buttondown.com/openclaw-newsletter/archive/openclaw-newsletter-2026-06-23/) — latest first-party newsletter issue at fetch time.
- 2026.6.11 release: Slack relay mode, native Mattermost `/oc_queue`, per-DM model overrides, `openclaw agent --message-file`, and a RAFT CLI wake bridge for remote wake-ups.
- [Microsoft launches Scout, an OpenClaw-inspired personal assistant — TechCrunch](https://techcrunch.com/2026/06/02/microsoft-launches-scout-an-openclaw-inspired-personal-assistant/) — first major-vendor product explicitly modeled on OpenClaw's design.
- [OpenClaw Had a Rough Week — OpenClaw Blog](https://openclaw.ai/blog/openclaw-rough-week) — first-party postmortem/incident note; worth a follow-up read before citing specifics.
- Project now reported at 310k–350k+ GitHub stars depending on source/date — one of the fastest-growing open-source agent projects to date.

### NemoClaw

- NVIDIA shipped new Nemotron Speech (real-time ASR, ~10x faster than peers), Nemotron RAG (embed/rerank VLMs), and Nemotron Safety (Content Safety + PII) models on June 23 — widens the open stack NemoClaw builds on (via [NVIDIA Blog — Open Models, Data and Tools](https://blogs.nvidia.com/blog/open-models-data-tools-accelerate-ai/)).
- [Release Notes — NVIDIA NemoClaw](https://docs.nvidia.com/nemoclaw/about/release-notes) — first-party changelog; no new NemoClaw-specific entry since the GTC Taipei launch already in the wiki.
- Enterprise adopters cited building "autonomous AI engineers" on the platform: Cadence, Dassault Systèmes, Siemens, Synopsys (via [Enterprise DNA](https://enterprisedna.co/resources/news/nvidia-nemoclaw-nemotron-3-ultra-enterprise-agents-2026/)).
- JetPack 7.2 (Jetson edge AI) shipped one-command NemoClaw deployment, Jetson agent skills, CUDA 13 on Orin, and MIG support on Jetson Thor.
- No update found specific to the last 24h beyond the June 23 Nemotron model wave above.

### Plurality

- [Plurality: Technology and the Future of Democracy — Wilson Center](https://gbv.wilsoncenter.org/publication/plurality-technology-and-future-democracy) — Wilson Center hosted a book-launch event featuring Audrey Tang and Glen Weyl.
- [Audrey Tang and Glen Weyl discuss AI and Democracy at IE University](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/) — recent joint appearance, no exact date confirmed in result snippet.
- [GitHub — pluralitybook/plurality](https://github.com/pluralitybook/plurality) — root repository, still the canonical open-collaboration text.
- No dated item found specifically within the last 24h; coverage is steady-state rather than newsy this cycle.

### Audrey Tang

- No news item dated within the last 24h was found; search returned background/profile content only (Wikipedia, speaker-bureau pages, the 2025 Right Livelihood Award note).
- [Taiwan's Cyber Ambassador Says Humans & AI Can FOOM Together](https://lironshapira.substack.com/p/can-we-govern-superintelligence-taiwans) — most substantive recent piece surfaced, but undated relative to today's window; flag for manual date-check before citing as current.
- Standing role confirmed unchanged: Taiwan's ambassador-at-large for cyberspace governance.

### NVIDIA Nemotron

- (See NemoClaw section above — June 23 Nemotron Speech/RAG/Safety releases are the same story, cross-listed here per keyword.)
- [NVIDIA Nemotron 3 Ultra Review 2026 — AIToolsRecap](https://aitoolsrecap.com/Blog/nvidia-nemotron-3-ultra-550b-computex-2026) — background on the 550B MoE flagship already covered in `[[concepts/nemotron]]`.
- Adopters named across the Nemotron 3 + open-model wave: Bosch, CodeRabbit, CrowdStrike, Cohesity, Fortinet, Franka Robotics, Humanoid, Palantir, Salesforce, ServiceNow, Hitachi, Uber.

### PolkaSharks

- No results — search returned only unrelated "Polk County" government/news pages. Either no recent PolkaSharks content was indexed, or the channel name needs a more specific query (e.g. "Polkasharks YouTube" or a direct channel URL) for the next sweep. Existing wiki coverage (`sources/polkasharks-*`) remains the latest record.

## Cross-links

- [[entities/audrey-tang]]
- [[entities/polkadot]]
- [[concepts/nemoclaw]]
- [[concepts/nemotron]]
- [[concepts/openclaw]]
- [[concepts/plurality]]
- [[concepts/domain-specific-llm-agents]]
- [[synthesis/open-weight-llm-agent-stack-six-region]]
- [[synthesis/firefly-nemoclaw-reference-implementation]]
- [[synthesis/digital-democracy-user-owned-social-six-region]]
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]]
