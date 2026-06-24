---
type: source
title: KOL + keyword digest — 2026-06-23
author: kol-daily-digest (automated)
date: 2026-06-23
ingested: 2026-06-23
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-06-23

## TL;DR

- **KOL watchlist is empty** — `.claude/skills/kol-tracker/kol-list.yaml` has no entries under `kols:`. This cycle only ran the 11-term keyword sweep; add accounts via the kol-tracker skill to get per-channel coverage tomorrow.
- **Claude Code / Anthropic**: the newsroom lists "Dynamic Workflows" (research preview, CLI/Desktop/VS Code + API/Bedrock/Vertex/Foundry) for large multi-step problems, alongside **Claude Opus 4.8**; separately, **Fable 5** exited included usage on Pro/Max/Team/seat-based Enterprise as of today (June 23) and now draws on usage credits. Anthropic is also absorbing US export-control fallout (Fable 5/Mythos 5 access suspended per its June 12 statement) while expanding commercially (Seoul office, TCS/DXC regulated-industry deals).
- **OpenAI** hired Transformer co-author **Noam Shazeer** as Lead for Architecture Research (June 18); GPT-5.2 is already pulled from ChatGPT and GPT-4.5 retires June 27, with **GPT-5.6** previewed for "late June."
- **NVIDIA Nemotron / NemoClaw / OpenClaw**: Nemotron 3 Ultra (550B MoE, AA-Index 48) anchors a new **Nemotron Coalition** (Black Forest Labs, Cursor, LangChain, Mistral, Perplexity, Reflection AI, Sarvam, Thinking Machines) — extends existing [[concepts/nemotron]] coverage. OpenClaw passed 310k+ GitHub stars as Microsoft shipped **Scout**, an OpenClaw-inspired M365 assistant; Jensen Huang says "every company...needs an OpenClaw strategy."
- **Polkadot**: social sentiment fell to a multi-month low (bullish:bearish 1.18:1, down from 6.39:1 a month ago) heading into Web3 Summit Berlin (June 18–19); no PolkaSharks-specific new content surfaced this cycle. Plurality / Audrey Tang also turned up no items inside the sweep window — evergreen coverage only.

## KOL updates

_KOL watchlist is empty — no channels configured under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml`. Use the kol-tracker skill to add entries; this section will populate once accounts are tracked._

## Keyword sweep

### AI agents

- [Daily AI Agent News — June 20, 2026](https://aiagentstore.ai/ai-agent-news/daily/2026-06-21) — daily aggregator of agent product/launch news, closest-dated roundup to this sweep window.
- [AI News Today — June 21, 2026: 16 Biggest Stories](https://www.buildfastwithai.com/blogs/ai-news-today-june-21-2026) — broad roundup; cites Gartner's 40%-of-enterprise-apps-by-EOY2026 and McKinsey's 62%-experimenting/23%-scaled agent-adoption figures.
- [AI agent trends 2026 report — Google Cloud](https://cloud.google.com/resources/content/ai-agent-trends-2026) — Google Cloud's 2026 enterprise agent-adoption trend report.
- [AI Agents News | June 2026 (Startup Edition)](https://blog.mean.ceo/ai-agents-news-june-2026/) — startup-focused agent launch roundup.
- [Top AI News for June 2026 — AIapps](https://www.aiapps.com/blog/ai-news-breakthroughs-launches-trends-must-read/) — monthly breakthroughs/launches digest.

### Claude Code

- [What's new — Claude Code Docs](https://code.claude.com/docs/en/whats-new) — official changelog; week of June 8–12 added `/cd` (move session to new working directory), sub-agents spawning their own sub-agents, and `--safe-mode`.
- [Anthropic Newsroom](https://www.anthropic.com/news) — "Dynamic Workflows" research preview for large multi-step problems (CLI/Desktop/VS Code + API/Bedrock/Vertex/Foundry) plus Claude Opus 4.8.
- [Claude Code Updates by Anthropic — Releasebot](https://releasebot.io/updates/anthropic/claude-code) — third-party changelog tracker for June 2026.
- [Codex vs Claude Code in June 2026: The Fable 5 Era Rematch — Developers Digest](https://www.developersdigest.tech/blog/codex-vs-claude-code-june-2026) — comparative coverage framed around the Fable 5 launch (June 9).
- Fable 5 exited included usage on Pro/Max/Team/seat-based Enterprise as of today, June 23 — usage-credit-only thereafter (per Anthropic/Releasebot tracking).

### Anthropic

- [TechCrunch — "When the Trump administration cracks down on Anthropic, who benefits?"](https://techcrunch.com/2026/06/21/when-the-trump-administration-cracks-down-on-anthropic-who-benefits/) — analysis of fallout after the US export-control order suspended Fable 5/Mythos 5 access (Anthropic statement June 12).
- [Slate — Alex Bores political profile](https://slate.com/news-and-politics/2026/06/alex-bores-kennedy-conway-anthropic.html) — political angle tying a NY race to Anthropic.
- [Anthropic Newsroom](https://www.anthropic.com/news) — Seoul office + Korea ecosystem partnerships (June 17); first Anthropic Public Record + TCS/DXC regulated-industries partnerships (June 12); Claude Partner Network Services Track (June 3).
- [Anthropic Release Notes — Releasebot](https://releasebot.io/updates/anthropic) — third-party tracker of the above.

### OpenAI

- [AI News Today — June 22, 2026: 15 Biggest Stories](https://www.buildfastwithai.com/blogs/ai-news-today-june-22-2026) — closest-dated roundup to this sweep window.
- [OpenAI News](https://openai.com/news/) — Noam Shazeer (Transformer co-author, "Attention Is All You Need") joins as Lead for Architecture Research (June 18); chief scientist previewed GPT-5.6 for "late June," no confirmed date.
- [ChatGPT — Release Notes | OpenAI Help Center](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) — GPT-5.2 (Instant/Thinking/Pro) already removed from ChatGPT (June 12); GPT-4.5 retires June 27 after a 30-day sunset.
- [OpenAI Release Notes — Releasebot](https://releasebot.io/updates/openai) — third-party changelog tracker.
- ChatGPT Business added Record & Replay for the Codex macOS app — capture a workflow once, reuse it as a team skill.

### Polkadot

- [Polkadot to Participate in Web3 Summit 2026 in Berlin — TradingView News](https://www.tradingview.com/news/coindar:a4cf85f0e094b:0-polkadot-to-participate-in-web3-summit-2026-in-berlin-on-june-18th/) — Berlin summit June 18–19, JAM-upgrade showcase.
- [Latest Polkadot News — CoinMarketCap](https://coinmarketcap.com/cmc-ai/polkadot-new/latest-updates/) — bullish:bearish comment ratio collapsed to 1.18:1 by June 18–19, down from 6.39:1 on May 18 — multi-month sentiment low.
- [Polkadot News — Investing.com](https://www.investing.com/crypto/polkadot-new/news) — general market/news tracker.
- 21Shares' TDOT spot ETF was flat for an eighth consecutive session (per CoinMarketCap roundup) — no incremental institutional inflow signal vs. Solana/XRP ETFs over the same stretch.

### OpenClaw

- [How Microsoft took on the OpenClaw fad — Runtime](https://www.runtime.news/how-microsoft-took-on-the-openclaw-fad/) — Microsoft Scout, an OpenClaw-inspired M365 assistant; opt-in features, end-user approval required for all write operations.
- [Microsoft launches Scout, an OpenClaw-inspired personal assistant — TechCrunch](https://techcrunch.com/2026/06/02/microsoft-launches-scout-an-openclaw-inspired-personal-assistant/) — same launch, company framing.
- [Windows platform security for AI agents — Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2026/06/02/windows-platform-security-for-ai-agents/) — OpenClaw's node/gateway now run via Microsoft Execution Containers on Windows, with a new companion app.
- [Releases · openclaw/openclaw — GitHub](https://github.com/openclaw/openclaw/releases) — v2026.6.9: richer Telegram delivery, more reliable agent recovery (retries, session-history repair), stronger Codex integration, hosted search/provider plugins.
- OpenClaw passed 310k+ GitHub stars / 58k+ forks this month; Jensen Huang (NVIDIA) said "every company in the world today needs to have an OpenClaw strategy" (per Runtime/TechCrunch coverage).

### NemoClaw

- [NVIDIA Announces NemoClaw for the OpenClaw Community — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — background announcement, still the canonical first-party reference.
- [NVIDIA Releases JetPack 7.2 with NemoClaw Support — Let's Data Science](https://letsdatascience.com/news/nvidia-releases-jetpack-72-with-nemoclaw-support-a20d72d2) — one-command NemoClaw deploy on Jetson, CUDA 13 on Orin, MIG on Jetson Thor, "Super Mode" on AGX Orin 32GB (200→241 TOPS at 60W) — announced at GTC Taipei, June 1.
- [Industrial Software Leaders Build Secure, Autonomous AI Engineers With NVIDIA NemoClaw — NVIDIA Blog](https://blogs.nvidia.com/blog/industrial-software-leaders-secure-autonomous-ai-engineers-nemoclaw/) — nTop (JetZero blended-wing-body geometry iteration) and SimScale (autonomous simulation agents) adopting NemoClaw.
- [Release Notes | NVIDIA NemoClaw](https://docs.nvidia.com/nemoclaw/about/release-notes) — official changelog.

### Plurality

- No items inside the 24h sweep window. Search surfaced only evergreen/background coverage: [Plurality root repo — GitHub](https://github.com/pluralitybook/plurality) and an undated [IE University write-up of Audrey Tang + Glen Weyl's AI4Democracy Day session](https://www.ie.edu/cgc/news-and-events/audrey-tang-and-glen-weyl-on-how-democracy-is-a-social-technology/). Already deeply covered by [[concepts/plurality]] and [[synthesis/digital-democracy-user-owned-social-six-region]] — nothing here extends the wiki.

### Audrey Tang

- No items inside the 24h sweep window. Closest dated item: a [Solve Effect podcast episode](https://solve.mit.edu/articles/tse-audrey-tang) (published June 3) on democracy, AI, and well-being. Forward-looking only: listed as an [SXSW London 2026 speaker](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c). Already covered in depth by [[entities/audrey-tang]].

### NVIDIA Nemotron

- [NVIDIA Debuts Nemotron 3 Family of Open Models — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models) — Nemotron 3 Ultra: 550B-parameter MoE, 55B active, AA Intelligence Index 48 (highest US open model), >300 tok/s.
- [NVIDIA Nemotron 3 Ultra Powers Faster, More Efficient Reasoning for Long-Running Agents — NVIDIA Technical Blog](https://developer.nvidia.com/blog/nvidia-nemotron-3-ultra-powers-faster-more-efficient-reasoning-for-long-running-agents/) — throughput/efficiency detail for long-running agent workloads.
- [NVIDIA Launches Nemotron Coalition of Leading Global AI Labs — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-launches-nemotron-coalition-of-leading-global-ai-labs-to-advance-open-frontier-models) — new cross-lab collaboration; inaugural members Black Forest Labs, Cursor, LangChain, Mistral AI, Perplexity, Reflection AI, Sarvam, Thinking Machines Lab.
- [NVIDIA Nemotron 3 Ultra: America's Best Open AI Model 2026 — Memeburn](https://memeburn.com/nvidia-nemotron-3-ultra-americas-best-open-ai-model-2026/) — third-party framing of the same launch, "3-6x faster than Chinese rivals" claim.

### PolkaSharks

- No new content found. [vocus.cc/salon/Polkasharks](https://vocus.cc/salon/Polkasharks) is the active channel referenced by [[entities/polkasharks]], but no new episode/article surfaced in this sweep — existing wiki coverage (Polkadot Decoded EP1–EP10, JAM deep-dive) remains current. Worth a direct-URL check next cycle if Sampras has a newer episode link.

## Cross-links

- [[entities/polkadot]] — sentiment + Web3 Summit Berlin item.
- [[entities/polkasharks]] — channel checked, no new content this cycle.
- [[entities/audrey-tang]] — no new item; existing page remains canonical.
- [[concepts/plurality]] — no new item; existing page remains canonical.
- [[concepts/nemoclaw]] — JetPack 7.2 + industrial-adoption items.
- [[concepts/openclaw]] — Microsoft Scout + v2026.6.9 release items.
- [[concepts/nemotron]] — Nemotron 3 Ultra + new Nemotron Coalition.
- [[entities/anthropic]] — Claude Code / Fable 5 / export-control items (new stub, created this cycle — recurring across both the "Claude Code" and "Anthropic" sweeps).
- [[entities/openai]] — Shazeer hire / model-retirement items (new stub, created this cycle — recurring across "AI agents" and "OpenAI" sweeps).
- [[concepts/claude-code]] — Dynamic Workflows / changelog items (new stub, created this cycle — recurring across "Claude Code" and "Anthropic" sweeps).
- [[synthesis/digital-democracy-user-owned-social-six-region]] — companion synthesis for the Plurality/Audrey Tang no-news result.
- [[synthesis/firefly-nemoclaw-reference-implementation]] — companion synthesis for the NemoClaw/Nemotron items.
