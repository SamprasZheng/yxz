---
type: source
title: KOL + keyword digest — 2026-09-16
author: kol-daily-digest (automated)
date: "2026-09-16"
ingested: "2026-09-16"
tags: [digest, kol, daily]
---

## TL;DR

- **Anthropic** shipped Claude Fable 5.1 + Mythos 5.1, launched Claudeforce (Salesforce partnership embedding Claude in Agentforce/Slack/CRM), cut cache-read API pricing by 75%, and raised Claude Code weekly limits 25% from Sept 14; an October IPO at ~$800B valuation is now in active planning.
- **NemoClaw v0.0.124** (Sept 14) restores interactive Deep Agents Code execution and upgrades OpenShell runtime to 0.0.116; **OpenClaw** shipped 4 stable releases in 8 days, added ClawHub plugin discovery, and hardened MCP tool-denial rules — the first MCP-specific CVE also landed on CISA's Known Exploited Vulnerabilities catalog this week.
- **Polkadot** OpenGov approved a dotUSD stablecoin proposal at 97.5%; DOT is trading ~$1.01 after the Sept 7 150% tx/XCM surge rally; elastic scaling explainer and a major Devnet technical release rolled out Sept 12–13.
- **NVIDIA** launched Nemotron Speech (Sept 10, leaderboard-topping ASR) and confirmed Nemotron 4 (>1T params, possible late-fall release); Nemotron 3.5 Lightning is positioned for long-running agentic workloads.
- The KOL list is currently empty — no per-channel monitoring was run this sweep. Add entries via the `kol-tracker` skill to activate KOL tracking.

---

## KOL updates

_KOL list is empty. No KOL sweep was performed. Use the `kol-tracker` skill to add channels (Twitter/X, YouTube, Substack, etc.) under the `kols:` section of `.claude/skills/kol-tracker/kol-list.yaml`._

---

## Keyword sweep

### AI agents

- [Salesforce Agentforce: seven named AI agents (Casey, Paige, Carter, Hunter, Marshall, Piper, Fin) for sales/service/IT/supply-chain — Sept 11, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-11-2026) — Salesforce named seven domain-specific Agentforce agents each bound to a single business function, signalling the shift from generic to role-specialized enterprise agents.
- [Meta Muse personal AI agent: cross-app task execution with a secure-VM privacy model](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-11-2026) — Meta's Muse handles messaging and purchasing across apps; a virtual-machine isolation layer is the privacy bet.
- [OpenAI Agents API enters public beta for enterprises — long-running agent orchestration](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-11-2026) — Public beta simplifies building agents that span multiple business systems; "multi-system" framing is now the dominant enterprise pitch.
- [OpenAI Data agent in ChatGPT Work (Sept 9): connect data sources, ask questions, generate dashboards](https://aiagentsdirectory.com/news/ai-agents-news-brief-september-11-2026) — First named agent in the ChatGPT Work tier; occupies the analyst-replacement niche.
- [AI Agents News — Week of Sept 13, 2026: week-in-review and signal round-up](https://aiagentstore.ai/ai-agent-news/this-week) — Editors call the week's lesson: a few tightly scoped agents with human review beat a swarm of loosely defined ones.

### Claude Code

- [Claude Code weekly limits now permanently 25% higher as of Sept 14 (Pro/Max/Team/Enterprise)](https://aicatchup.com/news/claude-code-weekly-limits-50-percent-promo) — The +50% promo ended; baseline lifted 25% for all paid plans.
- [Claude Code: self-hosted environments enter public beta for Team and Enterprise](https://code.claude.com/docs/en/changelog) — Teams can now run Claude Code in their own infrastructure; Enterprise inference hooks allow prompt/tool-response inspection server-side.
- [Claude Code adds managed MCP servers, unattended headless permissions, GitLab MR recognition](https://releasebot.io/updates/anthropic/claude-code) — Broadens the surface for CI/CD and remote agentic use cases.
- [Claude Code plugin evals, output-style switching, workflow/telemetry controls ship in latest release](https://releasebot.io/updates/anthropic/claude-code) — Plugin quality is now testable via the eval suite before publishing.

### Anthropic

- [Anthropic Threat Intelligence Report September 2026: AI misuse in real investigations, Dec 2025–Aug 2026 cases](https://www.anthropic.com/threat-intelligence-report-september-2026) — Covers how current safeguards respond and where visibility remains limited; most comprehensive Anthropic threat-intel disclosure to date.
- [Claudeforce: Salesforce × Anthropic partnership embeds Claude in Agentforce, Slack, and CRM — open beta targeted Sept 2026](https://blog.mean.ceo/anthropic-claude-news-september-2026/) — Largest enterprise CRM platform integration Claude has; likely accelerates agent adoption in regulated industries.
- [Claude Fable 5.1 + Claude Mythos 5.1 released; cache-read API pricing cut 75%](https://releasebot.io/updates/anthropic/claude) — Two new frontier models (coding + knowledge work); 75% cheaper cache reads materially changes multi-step agent economics.
- [Anthropic IPO: supervoting shares for Dario Amodei + co-founders ahead of expected October 2026 listing at ~$800B](https://stockanalysis.com/private/anthropic/) — $30B+ revenue run rate at 1,400% YoY cited; share structure mirrors dual-class moves at other AI labs.
- [Dario Amodei publicly calls for AI companies — including Anthropic — to slow down](https://aiweekly.co/ai-news-today/anthropic-news) — Unusual for a CEO to self-include in a slow-down call; paired with the IPO news, signals Anthropic positioning safety as a differentiator.

### OpenAI

- [Sam Altman: OpenAI will not go public in 2026 — "ill-advised given everything happening with safety"](https://blog.mean.ceo/open-ai-news-september-2026/) — OpenAI sitting on $122B committed capital + $4.7B revolver; Altman's statement is the most explicit timeline denial yet.
- [SoftBank upsized to $11.9B loan in OpenAI funding push (Sept 11)](https://aiweekly.co/ai-news-today/openai-news) — Largest single-lender line in OpenAI's history; bankrolls compute expansion without equity dilution.
- [OpenAI gives US government agencies 50% off models; Paul Christiano named to nonprofit board (Sept 9)](https://aiweekly.co/ai-news-today/openai-news) — Government pricing cut deepens the public-sector moat; Christiano's board seat is a safety-credibility signal.
- [OpenAI Codex: ChatGPT desktop quick-chat, Windows appshots, easier source file access](https://releasebot.io/updates/openai) — Incremental desktop UX push; Codex is becoming OpenAI's coding-agent surface.
- [OpenAI debuts financial tool tailored to investment bankers (Sept 10)](https://blog.mean.ceo/open-ai-news-september-2026/) — First domain-vertical product launch; signals OpenAI moving from API-provider to vertical-SaaS.

### Polkadot

- [Polkadot OpenGov: dotUSD stablecoin proposal passes at 97.5% approval — $5M backing](https://www.coingabbar.com/en/crypto-currency-news/polkadot-news-dot-price-devnet-update) — Polkadot's first governance-backed native stablecoin; adds a dollar-denominated leg to the DeFi/coretime economy.
- [DOT at ~$1.01 (Sept 13) after the Sept 7 150% tx surge + 42% weekly rally driven by Products Devnet activity](https://www.coingabbar.com/en/crypto-currency-news/polkadot-news-today-dot-price-rally-update) — Rally was real but testnet-heavy per synthesis page; current level is a consolidation from the $1.24 peak.
- [Major Polkadot Products Devnet technical release Sept 8–9 changes how testers and developers use the platform](https://www.coingabbar.com/en/crypto-currency-news/polkadot-news-dot-price-devnet-update) — Core infrastructure update to the public testnet; specifics not fully disclosed.
- [Elastic scaling explainer + privacy-first app development update — Sept 12–13](https://www.coingabbar.com/en/polkadot-news-today-dot-price-elastic-scaling) — Official comms push explaining the parachain scaling model; signals Polkadot is in a developer-education phase.
- [Polkadot processed ~5,000 tx in one hour on Sept 2 (+150% throughput) — Products Devnet attributed](https://cryptonews.net/news/analytics/33407824/) — Confirms last week's synthesis update that the surge is testnet-heavy, not paid organic mainnet demand.

### OpenClaw

- [OpenClaw: 4 stable releases in 8 days (Sept 7–14) — most dense release cycle yet](https://www.bighatgroup.com/blog/openclaw-weekly-2026-09-14/) — Rollback safety, plugin management, cloud sessions, voice/chat continuity, GPT Image 2.5 variants, read-only config all shipped.
- [ClawHub plugins now discoverable and manageable in a unified Control UI Plugins workspace](https://releasebot.io/updates/openclaw) — First centralized plugin marketplace for OpenClaw; lowers the install-friction barrier.
- [First MCP-specific CVE lands on CISA's Known Exploited Vulnerabilities catalog](https://www.bighatgroup.com/blog/openclaw-weekly-2026-09-14/) — MCP is now an official attack surface; OpenClaw positions this as a reason to treat the agent like company operating system, not a chatbot.
- [OpenAI exposes Codex harness as a managed service; MCP SDK hits 97M downloads under Linux Foundation stewardship](https://www.bighatgroup.com/blog/openclaw-weekly-2026-09-14/) — MCP is cemented as the default connectivity layer; OpenClaw benefits as MCP's best-known consumer interface.
- [OpenClaw 2.0: 16,000 pull-request milestone release detailed](https://flowtivity.ai/blog/openclaw-2-0-release/) — Retrospective analysis of the cumulative changes from the 16k-PR release; architectural summary.

### NemoClaw

- [NemoClaw v0.0.124 (Sept 14): OpenShell runtime upgraded to 0.0.116; interactive Deep Agents Code execution restored](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/14) — Interactive code execution was a regression; restoring it is significant for the hackathon Firefly stack that depends on it.
- [NemoClaw v0.0.121 (Sept 8): managed MCP tool-denial rules + agent-owned skill lifecycle state](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/8) — Tool-denial at the sandbox level is the key NemoClaw security primitive; now has managed-rule support without hand-written YAML.
- [NemoClaw v0.0.120 (Sept 4): secret-free verified config export + global host/gateway doctor; Hermes runtime → 0.20.6; Shields retired](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/4) — Configuration hygiene and dependency updates; Shields removal simplifies the policy stack.
- [NemoClaw v0.0.118 (Sept 1): headless package boundaries for Hermes lifecycle planning; credential-free OpenShell gateway health checks](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/release-notes/2026/9/1) — Headless-mode improvements target CI and remote-session use cases.

### Plurality

- [Plurality book + project: virtual discussion with Audrey Tang + Glen Weyl scheduled Sept 27, 2–3pm ET (New America)](https://www.newamerica.org/political-reform/events/how-technology-can-reinvigorate-democracy-conversation-with-audrey-tang-and-glen-weyl/) — One of the most prominent public conversations on Plurality this month; watch for policy outputs.
- [Audrey Tang at Solve at MIT 2026: keynote on democratizing AI, "putting AI in the loop of humanity"](https://www.youtube.com/watch?v=fqvdaHWH7a0) — Tang frames the AI governance question as a Plurality problem; directly relevant to the digital-democracy synthesis.
- [Plurality: Technology and the Future of Democracy — Wilson Center publication](https://gbv.wilsoncenter.org/publication/plurality-technology-and-future-democracy) — Signals Plurality is entering mainstream policy think-tank literature, not just civic-tech circles.
- [Tech for Impact Summit 2026 features Audrey Tang on Plurality and collaborative governance](https://tech4impactsummit.com/blog/plurality-collaborative-technology-democracy-vision/) — Plurality is on the 2026 conference circuit; consolidating mindshare in the impact-tech community.

### Audrey Tang

- [Audrey Tang at Solve at MIT 2026 — keynote + fireside conversation on AI democratization](https://www.youtube.com/watch?v=fqvdaHWH7a0) — Calls for AI to be "in the loop of humanity"; frames Taiwan's civic-tech experience as the model.
- [Audrey Tang confirmed for SXSW London 2026 and FWD50 as speaker](https://www.sxswlondon.com/speakers/audrey-tang-c21af57c) — Active 2026 conference tour as Taiwan's Ambassador-at-Large; Berlin Freedom Conference also listed.
- [AI Now Institute: Audrey Tang — "Reframing Impact: AI Democratization" (Feb 2026 paper, still circulating)](https://ainowinstitute.org/wp-content/uploads/2026/02/Reframing-Impact_Democratization_Audrey-Tang.pdf) — Policy framing paper gaining traction in the Sept 2026 AI governance debate.

### NVIDIA Nemotron

- [NVIDIA Nemotron Speech unveiled Sept 10: leaderboard-topping ASR for real-time captions + speech AI](https://blogs.nvidia.com/blog/open-models-data-tools-accelerate-ai/) — Expands Nemotron from text-only into multimodal; ASR is the first non-text modality.
- [Nemotron 3.5 Lightning: highest-efficiency model for long-running agentic workloads](https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/) — Positioned as the inference-budget model for agent loops; NeMo Switchyard also announced for model routing.
- [Nemotron 3 Nano Omni: 30B-A3B MoE with vision + audio encoders — multimodal agent-native model](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) — First Nemotron model to unify language, vision, and audio; targets edge/Jetson agent deployments.
- [Nemotron 4: NVIDIA training a >1T-parameter open model; release possible late fall 2026](https://www.technology.org/2026/08/12/nvidia-nemotron-4-trillion-parameter-open-model/) — The clearest signal yet that NVIDIA is entering the frontier-model race with an open-weight 1T+ entry.
- [Nemotron 3 Ultra: 1M-token context window with explicit reasoning mode — benchmarks live](https://benchlm.ai/models/nemotron-3-ultra) — 1M context is the relevant spec for long-horizon satellite operations and wiki-agent use cases.

### PolkaSharks

_No new PolkaSharks-specific content found in this sweep (channel not in KOL list; keyword search returned only general Polkadot news). Key Polkadot signals relevant to PolkaSharks content scope:_

- dotUSD stablecoin OpenGov approval (see Polkadot section above) — directly in the PolkaSharks DeFi/coretime curriculum.
- Elastic scaling explainer (Sept 12–13) — matches PolkaSharks Agile Coretime educational content arc.

---

## Cross-links

Existing wiki pages this digest touches:

- [[entities/polkadot]]
- [[entities/audrey-tang]]
- [[entities/glen-weyl]]
- [[entities/nvidia]]
- [[entities/anthropic]] ← new stub created this session
- [[entities/openai]] ← new stub created this session
- [[concepts/nemotron]]
- [[concepts/nemoclaw]]
- [[concepts/openclaw]]
- [[concepts/openshell-runtime]]
- [[concepts/hermes-agent-framework]]
- [[concepts/plurality]]
- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]]
- [[synthesis/agent-runtime-orchestration-six-region]]
- [[synthesis/open-weight-llm-agent-stack-six-region]]
- [[synthesis/digital-democracy-user-owned-social-six-region]]
- [[synthesis/firefly-nemoclaw-reference-implementation]]
