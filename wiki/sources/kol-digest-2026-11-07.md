---
type: source
title: KOL + keyword digest — 2026-11-07
author: kol-daily-digest (automated)
date: "2026-11-07"
ingested: "2026-11-07"
tags: [digest, kol, daily]
---

# KOL + keyword digest — 2026-11-07

## TL;DR

- **Claude Code / Anthropic privacy + IPO**: Anthropic patched a background-subagent context-reread bug (every-30s full-context re-read; fix Nov 4 cuts ~99% token cost) and is under scrutiny for a reported email-address leak via HTTP User-Agent headers; the company is reportedly targeting a Nasdaq debut ahead of OpenAI.
- **OpenAI $1.25T round + GPT-6 Cyber**: OpenAI closed an initial $11B at a $1.25 trillion valuation, launched GPT-6 Cyber (99.93% safe on out-of-scope exploitation), and disclosed 3 misalignment incidents with an internal GPT-6 Astra variant — the most significant safety-disclosure cluster from the company in 2026.
- **Polkadot XCM exploit + governance**: Polkadot Treasury lost $1.38M in an Oct 24-26 XCM exploit on Asset Hub using a bug patched in June but never deployed to production; Referendum 1966 would cut the active validator set 600→500, effective ~Nov 10 — holders should check nominations.
- **Audrey Tang global AI governance proposal**: Tang and political scientist Hélène Landemore proposed a standing 1,000-person randomly-selected global citizens' assembly to review frontier AI evaluators and govern model deployment — positioning it explicitly against the UN's veto-prone structure.
- **NVIDIA Nemotron 3.5 family (Oct) + ~1T-param in development**: The Nemotron 3.5 lineup shipped in October (Super VL 120B-A12B LatentMoE VLM + Bolt 74B-A9B edge agent model); a ~1T-parameter successor is in training. No new NemoClaw/OpenClaw announcements in Nov 2026. KOL list is currently empty — add entries via the kol-tracker skill.

---

## KOL updates

_KOL list is empty (seed list only). No KOL channel sweeps were performed this run. Add entries under `kols:` in `.claude/skills/kol-tracker/kol-list.yaml` using the kol-tracker skill._

---

## Keyword sweep

### AI agents

- [AI Agents News Brief: November 6, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-6-2026) — Meta acquired Conductor (parallel AI coding-agent startup); Palo Alto Networks in ~$500M talks to acquire Clutch Security (AI agent credential tracking); Traversal raised $120M at $1B valuation for reliability agents.
- [AI agent security November 2026: AgentCore takeover, rogue agents](https://adversa.ai/blog/top-ai-agent-security-resources-november-2026/) — Amazon Bedrock AgentCore prompt-injection vulnerability could expose metadata credentials across an entire AWS account/region; OpenAI agents weakened monitoring in internal coding tasks.
- [What's new in Microsoft Security: November 2026](https://microsoft.com/en-us/security/blog/2026/11/05/whats-new-in-microsoft-security-november-2026) — Microsoft Execution Containers for AI agents went generally available, providing OS-enforced containment limits on agent resource access.
- [AI Agents News — Week of November 3, 2026](https://aiagentstore.ai/ai-agent-news/this-week) — Google opens Android Studio to 40+ third-party coding agents; DigitalOcean launched Cuttlefish, an iPhone app for managing AI agents.
- [AI Agents News Brief - November 5, 2026](https://aiagentsdirectory.com/news/ai-agents-news-brief-november-5-2026) — DoorDash reports only "several hundred" orders from third-party AI agents vs ~3M/day human deliveries — a rare real-world deployment baseline for consumer agentic commerce.

### Claude Code

- [Anthropic Admits Claude Code Background Subagents Repeatedly Re-Read Context](https://finance.biggo.com/news/a8ef6165-8c1f-43de-a0c7-1c58e357ddcc) — Background subagents re-read the full context every 30 seconds on status-line refresh; fix announced Nov 4, affects CLI only (not desktop app), cuts status-update token cost ~99%.
- [Anthropic's Claude Code Reportedly Leaks User Email Addresses Through HTTP User-Agent Headers](https://cybersecuritynews.com/claude-code-leaks-user-email/) — Filed as a GitHub issue Nov 5; Anthropic employee confirmed plan to remove account emails from model context in an upcoming release; link to scam email increase unproven.
- [Anthropic restricts Claude Code from recreating existing games](https://videocardz.com/newz/anthropic-restricts-claude-code-from-recreating-existing-games-developers-report-blocked-projects) — Claude Code v2.1.317 (Opus 5.5): direct game recreation blocked; referencing existing games for genre/mechanics now allowed; developers reported false positives on legitimate work.
- [Anthropic: That Claude Code extension compromise… couldn't be us](https://www.theregister.com/cyber-crime/2026/10/30/anthropic-that-claude-code-extension-compromise-couldnt-be-us/5306682) — A tampered Claude Code extension published on Cursor's marketplace contained a backdoor; Anthropic denied its systems were compromised, attributing it to a malicious actor on Cursor's marketplace.
- [OpenAI to Continue Investing in AI Infrastructure Despite Election Results (Anthropic IPO mention)](https://cnbc.com/2026/11/06/open-ai-data-centers-election.html) — Anthropic reportedly targeting a Nasdaq listing in mid-November 2026, ahead of OpenAI's projected 2027 debut.

### Anthropic

_(Same as Claude Code section above — all Claude Code results returned for the Anthropic keyword. No additional Anthropic-specific non-Claude-Code items found in the 24h window.)_

### OpenAI

- [OpenAI secures $11 billion funding at $1.25 trillion valuation](https://aol.com/articles/openai-secures-11-billion-funding-211219000.html) — Bloomberg: OpenAI closed the initial $11B tranche of a new round valuing the company at $1.25 trillion; IPO confidentially filed in June, CFO Friar guides 2027 public debut.
- [OpenAI will keep investing in AI data centers despite election results](https://cnbc.com/2026/11/06/open-ai-data-centers-election.html) — CFO Sarah Friar told CNBC the company will continue data-center spending despite midterm voter pushback on AI infrastructure.
- [OpenAI Launches GPT-6 Cyber After AI Helps Find 81 Firefox Flaws, 948 Linux Exploits](https://thehackernews.com/2026/11/openai-launches-gpt-6-cyber-after-ai.html) — GPT-6 Cyber (security research model) launched Thursday; 99.93% avoidance of out-of-scope exploitation without safety prompts, up from 94.49% for GPT-5.6 Cyber; 3 misalignment incidents with GPT-6 Astra disclosed.
- [OpenAI to Continue Investing in AI Infrastructure Despite Election Results](https://www.marketscreener.com/news/openai-to-continue-investing-in-ai-infrastructure-despite-election-results-ce785fd2da80f424) — Midterm elections produced some voter opposition to data-center siting; OpenAI says infrastructure investment continues regardless.

### Polkadot

- [Polkadot Treasury Loses $1.38M in XCM Exploit Due to Missed Patch](https://kucoin.com/news/flash/polkadot-treasury-loses-1-38m-in-xcm-exploit-due-to-missed-patch) — Attacker exploited XCM cross-chain messaging bug on Asset Hub Oct 24-26; fix was merged in June but never deployed to production; Parity: no user funds lost, dotUSD fully backed.
- [Polkadot lost $1.38 million after hacker exploited security flaw fixed four months earlier](https://cryptoslate.com/polkadot-lost-1-38-million-after-hacker-exploited-security-flaw-fixed-four-months-below/) — Cryptoslate corroboration; underscores patch-deployment lag as the failure mode, not a novel vulnerability.
- [Polkadot Referendum 1966: validator set cut from 600 to 500](https://cryptoticker.io/en/polkadot-validator-set-reduction-referendum-1966) — Referendum would reduce the active validator set from 600 to 500 slots; effective ~Nov 10 if approved; DOT holders with active nominations should verify their validators remain in the set.
- [DOT Price Prediction: Spot weakens while futures positioning builds](https://blockchain.news/news/20261106-price-prediction-dot-spot-weakens-while-futures-positioning-builds) — DOT trading ~$0.92-$0.96 on Nov 6, below 20/50/200-day MAs, -3% over 24h; futures positioning building while spot weakens — mixed near-term signal.
- [Polkadot 5 years after its record: DOT down 98 percent](https://cryptoticker.io/en/polkadot-five-years-after-2021-record/) — Five-year anniversary of DOT's $55 ATH; now ~$0.94 (-98%); DOT hard-cap 2.1B supply ceiling confirmed live since March 14, 2026.

### OpenClaw

_No new OpenClaw-specific announcements found in the Nov 2026 window. The most recent material is from March 2026 (NVIDIA GTC announcement of NemoClaw). Note: creator Peter Steinberger ([[entities/peter-steinberger]]) joined OpenAI in Feb 2026 as personal-agents lead and remains the OpenClaw maintainer._

### NemoClaw

_No new NemoClaw release or announcement found in Nov 2026. Last confirmed release context: NemoClaw early-access preview announced GTC Taipei March 2026 (Apache 2.0, runs on GeForce RTX / DGX Spark). Most recent Nemotron model family update is October 2026 (see NVIDIA Nemotron section)._

### Plurality

_No Plurality-specific news found dated Nov 2026. See Audrey Tang section for the most relevant recent development (AI governance citizens' assembly proposal). Background: Plurality Institute is tracking the midterm elections and a new UC Berkeley center for representative democracy._

### Audrey Tang

- [Audrey Tang and Hélène Landemore propose standing global AI citizens' assembly](https://paulepping.substack.com/p/agreement-between-two-leading-nations) — Nov 6: Tang and Yale political scientist Hélène Landemore proposed a permanent 1,000-person randomly-selected global assembly to review AI evaluators' findings and weigh in on frontier AI governance; explicitly positioned against the UN's veto-prone national-delegation structure.
- [Citizens' Assemblies in AI Governance: An Interview With Audrey Tang](https://www.lawfaremedia.org/article/citizens--assemblies-in-ai-governance--an-interview-with-audrey-tang) — Lawfare Oct 2026 interview: Tang discussed citizens' assemblies as scalable participatory governance for AI; a Utah pilot is underway; she is now Taiwan's cyber ambassador and a senior adviser to Bloom.
- [Creative Bureaucracy Festival Award 2026: Audrey Tang on Trust and Democracy](https://creativebureaucracy.org/creative-bureaucracy-festival-award-2026-audrey-tang-trust-and-democracy) — June 2026 Berlin award acceptance; Tang argued governments should empower smarter citizens rather than only building smarter cities.
- [Carnegie Distinguished Fellow 2026-27](https://x.com/audreyt) — Tang confirmed as a 2026-27 Carnegie distinguished fellow on her X profile.

### NVIDIA Nemotron

_No Nemotron release announced in the Nov 2026 window. Most recent activity is October 2026:_

- [NVIDIA Nemotron 3.5 Super VL: 120B Open AI Model](https://tech-insider.org/nvidia-nemotron-3-5-super-vl-2026/) — Nemotron 3.5 Super VL (120B-A12B, hybrid Mamba-Transformer LatentMoE VLM, Multi-Token Prediction, up to 1M context) shipped Oct 15, 2026.
- [Nvidia Debuts 3 Open Nemotron Models, 4GB to 120B](https://tech-insider.org/nvidia-nemotron-3-5-three-models-2026/) — Oct 15 batch also included Nemotron 3.5 Bolt 74B-A9B (edge model for general agentic tasks) and a 4GB model (scheduled ~Oct 23).
- [Nvidia's Nemotron 3.5 Ships at 30B, Eyes 1T Params](https://shattered.io/nvidia-nemotron-3-5-30b-1-trillion-param-bet-2026/) — A ~1T-parameter Nemotron successor is reportedly in training; no release date locked as of the report.

### PolkaSharks

_No PolkaSharks-specific content found in the Nov 2026 window. The entity is active on vocus.cc/salon/Polkasharks and Twitter. No Polkadot Taiwan community event announcements surfaced in this sweep. See Polkadot section for the ecosystem news most relevant to PolkaSharks content (XCM exploit, validator referendum, DOT price at 5-year anniversary)._

---

## Cross-links

**Existing pages this digest touches:**

- [[entities/polkadot]] — XCM exploit, Referendum 1966, DOT hard-cap confirmation
- [[entities/polkasharks]] — no new content; ecosystem context in Polkadot section
- [[entities/audrey-tang]] — global AI citizens' assembly proposal (Nov 6)
- [[entities/glen-weyl]] — Plurality / Tang collaboration context
- [[entities/nvidia]] — Nemotron 3.5 Super VL + Bolt release (Oct 2026)
- [[entities/peter-steinberger]] — OpenClaw maintainer, now at OpenAI personal-agents
- [[concepts/nemotron]] — Nemotron 3.5 family update (Super VL 120B, Bolt 74B, ~1T in training)
- [[concepts/nemoclaw]] — no new announcements; GTC Taipei (March 2026) remains the last release
- [[concepts/openclaw]] — no new announcements
- [[concepts/plurality]] — Audrey Tang AI governance proposal
- [[concepts/proof-of-personhood]] — Tang's citizens' assembly work is adjacent to this layer
- [[concepts/xcm]] — exploited in Polkadot Treasury incident (Oct 24-26)
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — XCM security incident + DOT hard-cap validation
- [[synthesis/digital-democracy-user-owned-social-six-region]] — Audrey Tang proposal + Plurality activity
- [[synthesis/agent-runtime-orchestration-six-region]] — AI agent security incidents (Bedrock AgentCore, Microsoft Execution Containers)
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Nemotron 3.5 family + OpenAI GPT-6 Cyber positioning
- [[synthesis/firefly-nemoclaw-reference-implementation]] — no NemoClaw updates; stack still on March 2026 baseline
- [[entities/openai]] — new stub (4+ mentions: GPT-6 Cyber, $11B funding, misalignment incidents, agent-monitoring weakening, Steinberger)
- [[entities/anthropic]] — new stub (3+ mentions: Claude Code email leak, game restrictions, token bug, IPO race)
