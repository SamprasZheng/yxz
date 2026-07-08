---
type: source
title: KOL + keyword digest — 2026-07-08
author: kol-daily-digest (automated)
date: 2026-07-08
ingested: 2026-07-08
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic overtook OpenAI on revenue** (confirmed by Fortune, early July 2026), holds four of the top five slots on the AI Intelligence Index with Claude Fable 5 at #1, and restored Fable 5 / Mythos 5 globally on July 1 after a two-week US export-control suspension; Anthropic's $965B valuation now exceeds OpenAI's $852B.
- **OpenAI launched GPT-5.6** (Sol / Terra / Luna) but delayed full public rollout after the US government requested early access and oversight; Sam Altman is reportedly discussing giving the government a ~5% equity stake in OpenAI.
- **Claude Code** shipped Claude Sonnet 5 as the new default model (1M-token context, $2/$10/Mtok promotional pricing through August 31), switched the default permission mode to "Manual", and expanded Claude Cowork to mobile and web (TechCrunch, July 7).
- **NVIDIA Nemotron-Labs-TwoTower** dropped July 1 — an open-weight diffusion LLM on a frozen Nemotron-3-Nano-30B-A3B backbone; Palantir is deploying Nemotron in US agencies; enterprise adoption (Bosch, CrowdStrike, Salesforce, Uber) continues to widen.
- **Polkadot** hit an all-time low of $0.7993 on June 28 and Moonbeam migrated off the network to Coinbase's Base L2, yet Hyperbridge relaunched on Polkadot Hub mainnet in early July and JAM development targets ~40% cost reduction in H2; KOL list is currently empty — add entries via the kol-tracker skill to populate the KOL updates section.

## KOL updates

_No KOLs tracked. The `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml` is empty. Add entries via the kol-tracker skill to enable per-channel monitoring._

## Keyword sweep

### AI agents

- [AI News Today July 7 2026: 15 Biggest Stories](https://www.buildfastwithai.com/blogs/ai-news-today-july-7-2026) — Roundup of the largest AI agent stories from July 7, including JADEPUFFER and new platform launches.
- [All Things Agentic: July 6, 2026](https://byobot.ai/ai-news/all-things-agentic-july-6-2026) — Weekly agentic AI digest; highlights the shift from demos to workflow replacement as July 2026's defining theme.
- [JADEPUFFER: AI agent chains a full ransomware lifecycle](https://aiagentsdirectory.com/news/ai-agents-directory-daily-brief-july-5-2026) — Security demonstration shows an autonomous agent completing ransomware from a single unpatched service; skill floor for attacks now equals the cost of running an agent.
- [BNB Chain Agent Studio hits mainnet](https://blog.mean.ceo/ai-agents-news-july-2026/) — BNB Smart Chain enables 15-minute autonomous agent deployment on mainnet; expands agent infrastructure beyond EVM developer niche.
- [Agentic AI July 2026 launches — agentic.ai](https://agentic.ai/news) — Z.ai GLM-5.2 matches Opus 4.8 / GPT-5.5 agentic capability at a fraction of the cost; corporate deployment moving from PoC to workflow replacement.

### Claude Code

- [Claude Cowork expands to mobile and web — TechCrunch](https://techcrunch.com/2026/07/07/the-coding-agent-wars-are-spilling-into-the-rest-of-the-office-claude-cowork/) — July 7: coding-agent wars spilling into the broader office suite; Claude Cowork accessible on mobile and web, targeting non-developer workflows.
- [Claude Code Changelog July 2026](https://www.gradually.ai/en/changelogs/claude-code/) — Sonnet 5 is now the default model (1M-token context, $2/$10/Mtok through Aug 31); /code-review consolidated into one finder, cutting token usage ~25%.
- [Claude Code GitHub releases](https://github.com/anthropics/claude-code/releases) — Default permission mode changed to "Manual" across CLI, VS Code, and JetBrains; background session reliability improved so long-running commands survive process restarts on all platforms including Windows.
- [Claude Code Updates — Releasebot](https://releasebot.io/updates/anthropic/claude-code) — AskUserQuestion behavior improved; agent session status fixed (completed rows no longer flip to "Needs your input"); stalled agents labeled "Needs attention."
- [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview) — Full API/SDK release history; Sonnet 5 promotional pricing extends through August 31, 2026.

### Anthropic

- [Redeploying Claude Fable 5](https://www.anthropic.com/news/redeploying-fable-5) — Global access to Fable 5 and Mythos 5 restored July 1 after a two-week export-control suspension; resolution required a new safety classifier and an industry jailbreak framework built with Amazon, Microsoft, and Google.
- [Anthropic's biggest win of 2026 — TheStreet](https://www.thestreet.com/technology/anthropic-ipo-fable5-mythos-safety-classifier-block-jailbreak) — $965B valuation exceeds OpenAI's $852B; Claude 5 family holds four of the top five Artificial Analysis Intelligence Index slots.
- [Anthropic vs OpenAI model race 2026 — Silicon Report](https://siliconreport.com/anthropic-vs-openai-model-race-2026-6d51dcd7) — Fortune confirmed Anthropic overtook OpenAI on revenue; Fable 5 ranks #1 on the AI Intelligence Index as of July 2026.
- [Al Jazeera: US lifts restrictions on Fable and Mythos](https://www.aljazeera.com/economy/2026/7/1/us-lifts-restrictions-on-powerful-ai-models-fable-mythos-anthropic-says) — International coverage of the export-control resolution; Fable 5 and Mythos 5 available globally on Pro/Max/Team/Enterprise plans from July 1.
- [Anthropic Newsroom](https://www.anthropic.com/news) — Claude Sonnet 5 (launched June 30) described as the most agentic Sonnet ever built; performs close to Opus 4.8 on many tasks at lower introductory pricing.

### OpenAI

- [OpenAI limits GPT-5.6 Sol access — Fox News](https://www.foxnews.com/science/trump-puts-brakes-openais-newest-ai-model) — US government requested early access and additional oversight before broader public availability of GPT-5.6 Sol; initial rollout limited to vetted partners sharing data with authorities.
- [MIT Technology Review: OpenAI government stake](https://www.technologyreview.com/2026/07/07/1140197/the-download-your-openai-stake-treasury-ai-warning/) — Sam Altman reportedly discussing giving the US government a 5% stake in OpenAI, currently worth ~$320 per American household; Treasury AI warning also covered (July 7).
- [GPT-5.6 Sol / Terra / Luna pricing — Releasebot](https://releasebot.io/updates/openai) — Sol $5/$30 per Mtok (flagship), Terra $2.50/$15, Luna $1/$6 (fastest); accompanies gpt-realtime-2.1 with 25% p95 latency reduction.
- [OpenAI advertising expansion — unrot.co](https://unrot.co/blogs/today-top-10-ai-news-july-6-2026) — OpenAI developing image, video, conversational, native, and interactive advertising formats to diversify beyond API/subscription revenue (July 6).
- [AI Update July 3, 2026 — MarketingProfs](https://www.marketingprofs.com/opinions/2026/55197/ai-update-july-3-2026-ai-news-and-views-from-the-past-week) — Weekly roundup covering OpenAI's government oversight dynamics and the widening competitive gap with Anthropic.

### Polkadot

- [DOT hits all-time low — MEXC](https://www.mexc.com/learn/article/polkadot-dot-price-prediction-july-2026-why-polkadot-just-did-something-it-has-never-done-before/1) — DOT reached $0.7993 on June 28, a lifetime low representing a 98.5% decline from the 2021 ATH; trading ~$0.83 with early technical reversal signals.
- [Moonbeam abandons Polkadot for Base — CryptoNews](https://cryptonews.net/news/altcoins/33100302/) — Moonbeam Network (GLMR) announced closure of its Polkadot parachain slot and 1:1 GLMR migration to Coinbase's Base L2 as part of an AI pivot.
- [Polkadot ecosystem weekly: JAM + Sassafras roadmap](https://medium.com/@polkadot_eri/polkadot-ecosystem-weekly-observations-polkadot-releases-latest-roadmap-key-technologies-to-90a5840d423d) — JAM and Sassafras consensus protocol targeted for H2 2026 deployment; ~40% operational cost reduction cited.
- [Polkadot Socials Daily Digest 2026-07-04](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-07-04/18038) — Forum-curated social highlights; Hyperbridge re-launch on Polkadot Hub mainnet confirmed in early July posts.
- [Is Polkadot Dead? 2026 data-driven look — MEXC](https://www.mexc.com/learn/article/is-polkadot-dead-a-2026-data-driven-look-at-dots-ecosystem-investment-value/1) — Analysis arguing active JAM development and TDOT ETF diverge significantly from token price; community divided between capitulation and conviction.

### OpenClaw

- [TechCrunch: People using OpenClaw to date now](https://techcrunch.com/2026/07/02/yep-were-using-openclaw-to-date-now/) — OpenClaw's viral adoption now includes date-planning and social automation; mainstream crossover accelerating well beyond developer use cases (July 2).
- [OpenClaw Release Notes July 2026 — Releasebot](https://releasebot.io/updates/openclaw) — GPT-5.6 support shipped; new openclaw attach workflow; expanded Telegram/Codex pairing; refreshed iOS app; cron scheduling options; broad reliability fixes.
- [OpenClaw vs Hermes: agent control model debate — The New Stack](https://thenewstack.io/openclaw-hermes-agent-harness/) — OpenClaw and Hermes agree on the definition of an agent but disagree on what controls it; architectural debate over centralized vs distributed policy enforcement.
- [KDnuggets: OpenClaw explained](https://www.kdnuggets.com/openclaw-explained-the-free-ai-agent-tool-going-viral-already-in-2026) — Primer on OpenClaw's local-first, MIT-licensed autonomous agent architecture; warns it should be treated as privileged software given file/shell/memory access.
- [OpenAI sponsoring OpenClaw financially](https://blog.mean.ceo/openclaw-news-july-2026/) — OpenAI committed financial sponsorship while the project remains MIT open source; signals strategic alignment with the autonomous agent ecosystem.

### NemoClaw

- [NVIDIA announces NemoClaw — NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — Open-source reference stack (announced GTC March 2026) for always-on AI agents in NVIDIA OpenShell sandboxes; installs via single CLI; hardware-agnostic.
- [TechRadar: NemoClaw signals the enterprise agent era](https://www.techradar.com/pro/why-nvidias-nemoclaw-signals-the-true-enterprise-agent-era) — Analysis argues NemoClaw's security/privacy layer is the missing piece that finally makes corporate IT comfortable deploying autonomous agents at scale.
- [Palantir + NVIDIA Nemotron for US agencies](https://blogs.nvidia.com/blog/palantir-secure-ai-us-agencies-nemotron-open-models/) — Palantir is deploying Nemotron open models in secure US government environments; first major production proof of the NemoClaw security posture.
- [NVIDIA NemoClaw docs — release notes](https://docs.nvidia.com/nemoclaw/about/release-notes) — Official release notes covering OpenShell runtime isolation, L7 credential proxy, Landlock/seccomp/netns sandbox layers, and OpenAI-compatible port 8642 interface.
- [GitHub NVIDIA/NemoClaw](https://github.com/NVIDIA/NemoClaw) — Active repository; run Hermes and OpenClaw more securely inside NVIDIA OpenShell; Apache 2.0 license consistent with prior wiki entries.

### Plurality

- [UN Global Dialogue on safe and inclusive AI — July 2026](https://news.un.org/en/story/2026/07/1167862) — UNESCO-convened dialogue opens with calls for inclusive AI governance; global push for Plurality-compatible frameworks amid warnings of "catastrophic harm" from unregulated deployment.
- [Wilson Center Plurality book launch event](https://www.wilsoncenter.org/publication/plurality-technology-and-future-democracy) — June 2026 launch featuring Audrey Tang and Glen Weyl; positions Plurality between techno-libertarianism and centralized AI governance.
- [vTaiwan spreading globally](https://thelivinglib.org/plurality-the-future-of-collaborative-technology-and-democracy/) — vTaiwan's statistical aggregation approach adopted by governments, cooperatives, and blockchain communities worldwide.
- [Audrey Tang: "plural governance" — India AI Impact Summit](https://ainowinstitute.org/wp-content/uploads/2026/02/Reframing-Impact_Democratization_Audrey-Tang.pdf) — Tang calls for AI to be "put in the loop of humanity" via plural governance; reframes AI democratization away from access-only toward participation.
- [CIGI Plurality governance forum](https://www.cigionline.org/events/plurality-the-future-of-collaborative-technology-and-democracy/) — Centre for International Governance Innovation hosted a Plurality event; convergence with global AI governance discourse is accelerating.

### Audrey Tang

- [Taiwan's Cyber Ambassador on governing superintelligence](https://lironshapira.substack.com/p/can-we-govern-superintelligence-taiwans) — Substack interview: Tang argues humans and AI can "FOOM together" through plural governance; discusses Utah's social graph portability law as Plurality in practice.
- [SXSW London 2026 keynote speaker](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Tang featured as a keynote speaker on digital democracy and Plurality's global reach.
- [India AI Impact Summit 2026 — "Reframing Impact"](https://ainowinstitute.org/wp-content/uploads/2026/02/Reframing-Impact_Democratization_Audrey-Tang.pdf) — Tang's framing of AI democratization as participation rather than access; "plural governance" as the operational form of Plurality.
- [Audrey Tang: TED 2026 #freethefuture — LinkedIn](https://www.linkedin.com/posts/tangaudrey_ted2026-freethefuture-activity-7450193617467383809-DWe2) — TED 2026 participation under the "#freethefuture" banner; consistent with her Plurality + digital democracy platform.
- [Right Livelihood Award — Audrey Tang profile](https://rightlivelihood.org/the-change-makers/find-a-laureate/audrey-tang/) — Background; recognized for civic tech, digital democracy, and open government contributions.

### NVIDIA Nemotron

- [Nemotron-Labs-TwoTower released July 1 — MarkTechPost](https://www.marktechpost.com/2026/07/01/nvidia-releases-nemotron-labs-twotower/) — Open-weight diffusion LLM built on a frozen Nemotron-3-Nano-30B-A3B backbone; novel hybrid diffusion + autoregressive architecture.
- [Nemotron 3 Nano Omni: vision + audio + language, 9× efficiency](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — Unified multimodal model for agentic tasks; up to 9× more efficient than prior separate-modality approaches.
- [Palantir deploying Nemotron in US agencies](https://blogs.nvidia.com/blog/palantir-secure-ai-us-agencies-nemotron-open-models/) — Secure deployment of open Nemotron models in US government via Palantir; proof of concept for sovereign/air-gapped deployments.
- [NVIDIA at ICML 2026: open model research](https://blogs.nvidia.com/blog/open-models-icml-2026/) — Nemotron model family featured in ICML 2026 open-model research presentations.
- [Enterprise Nemotron adoption: Bosch, CrowdStrike, Salesforce, Uber](https://blogs.nvidia.com/blog/open-models-data-tools-accelerate-ai/) — Major enterprises adopting Nemotron for vertical agent stacks; NVIDIA open-model strategy mirroring the NemoClaw reference implementation pattern.

### PolkaSharks

- [Polkadot Socials Daily Digest 2026-07-01](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-07-01/17992) — Forum-curated socials highlights from July 1; no PolkaSharks-specific posts surfaced in this sweep.
- [Polkadot Socials Daily Digest 2026-07-02](https://forum.polkadot.network/t/polkadot-socials-daily-digest-2026-07-02/18006) — Hyperbridge re-launch on Polkadot Hub mainnet confirmed; relevant to ecosystem PolkaSharks covers.
- [Polkadot community — X](https://x.com/i/communities/1684503420152037379) — Active community discussion ongoing; specific PolkaSharks posts not surfaced by keyword search.
- _No PolkaSharks-specific content found in the last 24h. The channel may need to be added as a named KOL entry in the watchlist for direct handle-level tracking._

## Cross-links

- [[entities/polkadot]] — DOT all-time low $0.7993, Moonbeam migration to Base, Hyperbridge Hub relaunch, JAM H2 targets
- [[entities/nvidia]] — Nemotron-Labs-TwoTower (July 1), Nano Omni multimodal, Palantir/US-agency deployment confirmed
- [[entities/polkasharks]] — No new content this sweep; referenced in PolkaSharks keyword section above
- [[entities/audrey-tang]] — SXSW London 2026, TED 2026 #freethefuture, India AI Summit, plural governance framing; Utah graph-portability law
- [[concepts/nemotron]] — Nemotron-Labs-TwoTower (July 1), Nano Omni multimodal, enterprise adoption widening
- [[concepts/nemoclaw]] — Enterprise security layer focus; Palantir US-government production deployment confirmed
- [[concepts/openclaw]] — GPT-5.6 support shipped, mainstream consumer adoption accelerating, OpenAI sponsorship, JADEPUFFER risk signal
- [[concepts/plurality]] — UN global AI dialogue, Wilson Center launch, vTaiwan global spread, India AI Summit plural-governance framing
- [[concepts/jam]] — H2 2026 mainnet targets; Sassafras consensus upgrade; ~40% cost-reduction claim
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — DOT all-time low and Moonbeam exit are live falsifier signals for the scarce-token + abundant-blockspace thesis
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron-Labs-TwoTower, GPT-5.6 Sol/Terra/Luna, GLM-5.2 cost-parity all update the open-weight frontier map
- [[synthesis/firefly-nemoclaw-reference-implementation]] — NemoClaw release notes and Palantir production deployment inform the conformance table
- [[synthesis/llm-satellite-operations-six-region]] — JADEPUFFER agent-chained attack is an adjacent security risk signal for satellite ops AI
