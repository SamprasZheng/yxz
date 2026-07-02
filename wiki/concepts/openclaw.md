---
type: concept
tags: [openclaw, agent-framework, open-source, computer-use, peter-steinberger, mit-license, chat-agents, nemoclaw]
---

# OpenClaw — Open-Source Autonomous AI Agent ("The AI that actually does things")

**OpenClaw** is a free, open-source autonomous AI personal assistant created by Austrian developer [[entities/peter-steinberger]]. It runs on the user's own machine (macOS / Windows / Linux), is driven via everyday chat apps (WhatsApp, Telegram, Discord, Slack, Teams, Twitch, Google Chat, plus widely-reported Signal / iMessage integrations), and *actually performs tasks* — running shell commands, controlling a browser, managing files, sending email, scheduling jobs.

> Tagline: **"The AI that actually does things."** Site: `openclaw.ai`. Repo: `github.com/openclaw/openclaw`. License: **MIT**.

OpenClaw is the **default agent profile** that ships inside the [[concepts/nemoclaw]] sandbox runtime — i.e. when NVIDIA's `nemoclaw onboard` installer runs without an override, it provisions an OpenClaw agent process behind OpenShell's policy cage. The two projects are independent (OpenClaw is community-owned; NemoClaw is NVIDIA-distributed) but co-marketed.

## Naming history (Clawd → Moltbot → OpenClaw)

| Date | Name | Why it changed |
|---|---|---|
| Nov 2025 | **"WhatsApp Relay"** / **Clawd** (also written *Clawdbot*) | Weekend hack by Steinberger — pun on "Claude" + "claw" |
| Dec 2025 / Jan 2026 | **Moltbot** | Anthropic sent a trademark request — "Clawd" was too close to "Claude". *Molt* refers to a lobster shedding its shell to grow |
| 29 Jan 2026 | **OpenClaw** | Trademark cleared, domain acquired, project formalized. Confirmed in [[sources/openclaw-introducing-steinberger-2026]] |

The space-lobster mascot has carried through all three names.

## Architecture

Three-layer design (per OpenClaw docs and third-party write-ups):

```
┌─────────────────────────────────────────────────────────┐
│ Agent Layer        — LLM driver, Skills (MD + YAML),    │
│                      tool registry, scheduled jobs      │
├─────────────────────────────────────────────────────────┤
│ Control Layer      — Gateway HTTP API ("the brain"):    │
│                      unified control surface for tools  │
├─────────────────────────────────────────────────────────┤
│ Browser Layer      — independent Chromium instance      │
│                      driven via CDP (Chrome DevTools)   │
└─────────────────────────────────────────────────────────┘
```

### Computer-use capability

Two primary mechanisms:

1. **Browser automation via CDP** — OpenClaw spins up its own Chromium and speaks the Chrome DevTools Protocol directly, getting millisecond-scale response times (no Selenium / no Playwright on the hot path).
2. **System command execution** — shell tool with full host access by default (this is why the [[concepts/nemoclaw]] sandbox exists — to cage an OpenClaw process that would otherwise be unconstrained on the host).

### Skills system

A *Skill* is a markdown playbook with YAML frontmatter — same shape as a Claude Code or Cursor skill — that defines a workflow OpenClaw can invoke. The project ships 100+ preconfigured AgentSkills and supports custom skill registration plus a plugin/extension system.

### Model-agnostic

OpenClaw supports **Anthropic Claude**, **OpenAI GPT** models, and **local models via Ollama**. The model choice is a config option, not a fork.

## Channel integrations (confirmed)

WhatsApp, Telegram, Discord, Slack, Microsoft Teams, Twitch, Google Chat are confirmed in the *Introducing OpenClaw* post. Signal and iMessage are widely cited in 2026 third-party guides; the post itself does not list them, so treat those two as ⚠️ **secondary-source confirmed only** (not first-party announced as of Jan 2026).

## Growth (per third-party reporting)

| Metric | Value | Date |
|---|---|---|
| GitHub stars | 196K+ | mid-Feb 2026 |
| GitHub stars | 247K+ | (Skywork guide, Q1 2026) |
| GitHub stars | 302K+ | Apr 2026 |
| Forks | 35K+ | mid-Feb 2026 |
| Contributors | 600+ | mid-Feb 2026 |
| Commits | 10K+ | mid-Feb 2026 |

Reportedly the fastest-growing project in GitHub history, overtaking React / Vue / TensorFlow's pace. Steinberger publicly disclosed running 100 internal agents that burned ~$1.3M/month in OpenAI tokens building OpenClaw itself.

**Verified 2026 timeline (WebSearch, 2026-07-02):** official launch **2026-01-25** (≈9K stars in the first 24h) → **~100K by 2026-02-02** → **~250K by 2026-03-03, overtaking React (~243K)** to become GitHub's most-starred project. On **2026-02-14** Steinberger announced he was **joining OpenAI** ("bringing agents to everyone"), and that a non-profit **OpenClaw Foundation** would provide future stewardship with **OpenAI as the primary financial sponsor** — the project stays **MIT-licensed and community-developed**, not absorbed. In under 60 days it went from a solo side project to GitHub's #1 repo, an NVIDIA-distributed enterprise product ([[concepts/nemoclaw]]), and an OpenAI hire ([Yahoo/Reuters](https://finance.yahoo.com/news/openclaw-founder-steinberger-joins-openai-223554158.html), [steipete.me](https://steipete.me/posts/2026/openclaw)).

## Comparison vs Hermes Agent Framework

| | OpenClaw | [[concepts/hermes-agent-framework|Hermes Agent Framework]] |
|---|---|---|
| Author | Peter Steinberger (independent → OpenAI-backed foundation) | Nous Research |
| Primary UX | Chat apps (WhatsApp / Telegram / Slack / …) → does things | OpenAI-compatible HTTP API (`:8642/v1`) for headless agent use |
| Model coupling | Model-agnostic (Claude, GPT, Ollama) | Built around Nous's Hermes model family |
| Default channel | Messaging platforms | Tool-using API endpoint |
| Status inside NemoClaw | **Default profile** | **Experimental profile** ⚠️ |
| License | MIT | (per Nous repo) |

The two are *sibling* agent frameworks that can both run inside the same NemoClaw / OpenShell sandbox — they are **not** forks of each other and were developed independently.

## Integration with NemoClaw sandbox

When [[concepts/nemoclaw]] is installed in its default mode, the agent process running inside the [[concepts/openshell-runtime]] sandbox is OpenClaw. The relationship:

- OpenClaw provides the agent loop, the chat-channel integrations, the Skills system, and the computer-use tooling.
- NemoClaw / OpenShell provides the **cage**: Landlock filesystem scope, seccomp syscall allowlist, netns egress allowlist, L7 credential proxy (so OpenClaw never sees raw provider API keys), and the `openclaw-sandbox.yaml` declarative policy file.
- The exposed surface is the OpenAI-compatible API on `127.0.0.1:8642` plus an OpenClaw browser dashboard on `127.0.0.1:18789`. The Hermes profile only exposes `:8642` — see [[sources/nemoclaw-hermes-install-runbook-2026]].

This means an unmodified OpenClaw install on a bare host has effectively root-level reach (intended — it's "the AI that actually does things"); NemoClaw is what makes the *same agent* safe to run autonomously over long horizons.

## Lineage — the personal computer-use agent (拉長時間軸)

OpenClaw is best read not as a 2025 novelty but as the point the **personal-agent** and **computer-use** lineages finally converged into a shipping consumer product.

| Era | Milestone | What it established |
|---|---|---|
| 1987 | Apple **Knowledge Navigator** concept video | The vision: a conversational agent that *acts* on your behalf across your tools |
| 1995–2007 | MS Bob / **Clippy**, desktop assistants | Assistant-in-the-OS UX (and how badly a passive one grates) |
| 2011 | **Siri** (→ Alexa/Assistant) | Voice NL front-end, but read-only — no real computer use |
| 2023 | **AutoGPT / BabyAGI** | The autonomous LLM loop (plan→act→observe) goes viral, but brittle and headless |
| 2024-10 | **Claude Computer Use** (Anthropic) | A frontier model driving a real screen/shell — computer-use becomes a first-class capability |
| 2025-01 | **OpenAI Operator** / browser agents | Vendor-hosted computer-use, but cloud-bound and gated |
| 2025-11 → 2026-01 | **OpenClaw** (Clawd → Moltbot → OpenClaw) | Merges the two: a *local, chat-driven, model-agnostic* agent that does things — the consumer packaging the earlier threads lacked |

The through-line: each step added one missing piece (NL front-end → autonomous loop → real computer use → local + consumer packaging). OpenClaw's contribution is **distribution and UX** (chat apps + Skills + one-command install), not a new capability primitive — which is exactly why it grew faster than it defended, and why the [[concepts/nemoclaw|NemoClaw sandbox]] had to arrive alongside it.

## Six-region positioning (台美日韓中國歐洲)

Like [[concepts/hermes-agent-framework|Hermes Agent]], the **agent-runtime layer is largely region-neutral** — OpenClaw is model-agnostic (Claude / GPT / local Ollama), so the same loop can drive any region's model, and the contested ground is the [[synthesis/open-weight-llm-agent-stack-six-region|model layer]] underneath, not the loop. Where OpenClaw *does* carry a regional signature is **origin and governance**: an **Austrian**-authored ([[entities/peter-steinberger]]), **US**-capital-stewarded (OpenClaw Foundation, **OpenAI** primary sponsor) project distributed globally under MIT. The meaningful six-region axis is therefore **who governs the personal-agent standard**:

- **US** — sets the de-facto standard by capital + platform gravity (OpenAI-sponsored Foundation; NVIDIA-distributed via NemoClaw; the model providers OpenClaw defaults to are US-frontier).
- **Europe** — origin of the code (Steinberger/Vienna) + the regulatory rail (an autonomous host-level agent is squarely in scope for the EU AI Act's transparency/oversight duties — cf. [[synthesis/digital-democracy-user-owned-social-six-region]]).
- **China** — a parallel domestic personal-agent ecosystem (WeChat/Alipay-embedded agents, sovereign models per [[synthesis/open-weight-llm-agent-stack-six-region]]) rather than adoption of a US-governed MIT project.
- **Japan / Korea** — consumers + messaging-platform integrators (LINE/KakaoTalk as the channel layer), not standard-setters.
- **Taiwan** — consumer + the hackathon-builder niche ([[entities/sampras]]'s Spacesharks entry via the NemoClaw stack), the recurring upstream-strong/midstream-absent signature at the agent-app layer.

## Long-horizon question — who owns the actor on your machine (100-year, scenario)

OpenClaw crystallises a governance question the wiki tracks across domains: **as agents move from advisory to acting, the control point shifts from the model to the runtime that holds the credentials and the host.** Two labelled scenarios:

1. **Cage-and-commons** — the actor stays user-owned + open (MIT OpenClaw), but must run inside an independently-governed cage ([[concepts/nemoclaw]]/[[concepts/openshell-runtime]] Landlock/seccomp/L7 credential proxy). The 100-year invariant, shared with the [[synthesis/firefly-nemoclaw-reference-implementation|sandbox cluster]]: *the actor must be constrained below the layer it can reason about* — you cannot let a prompt-manipulable process hold raw keys.
2. **Platform-recapture** — the "personal" agent is quietly re-centralised because the credentials, the sponsor, and the default model provider all sit with one platform (the Foundation-with-a-single-primary-sponsor structure is the early tell). This is the same platform-recapture risk [[synthesis/digital-democracy-user-owned-social-six-region]] flags for user-owned social graphs, now at the agent layer.

Which branch wins turns on the same [[concepts/proof-of-personhood|"prove-a-human-without-a-honeypot"]] and provenance ([[concepts/agentic-provenance]]) primitives the rest of the corpus depends on — an autonomous actor with your credentials needs both an identity it can prove and an audit trail it cannot forge.

## Sources

- [[sources/openclaw-introducing-steinberger-2026]] — first-party announcement (Jan 29 2026).
- OpenClaw site, [openclaw.ai](https://openclaw.ai/) and [blog index](https://openclaw.ai/blog).
- OpenClaw repo, [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) (MIT).
- Wikipedia, [*OpenClaw*](https://en.wikipedia.org/wiki/OpenClaw).
- MindStudio, [*What Is OpenClaw? The Open-Source AI Agent That Actually Does Things*](https://www.mindstudio.ai/blog/what-is-openclaw-ai-agent).
- MintMCP, [*How OpenClaw Works: Architecture, Skills, and Security Explained*](https://www.mintmcp.com/blog/openclaw-works-architecture-skills-security).
- DigitalOcean, [*What is OpenClaw? Your Open-Source AI Assistant for 2026*](https://www.digitalocean.com/resources/articles/what-is-openclaw).
- Techzine, [*Why OpenAI has recruited the founder of OpenClaw*](https://www.techzine.eu/news/applications/138796/why-openai-has-recruited-the-founder-of-openclaw/).
- The Next Web, [*Peter Steinberger's 100 AI agents racked up $1.3 million in OpenAI tokens in 30 days building OpenClaw*](https://thenextweb.com/news/openclaw-peter-steinberger-1-3-million-openai-token-bill).
- Lex Fridman Podcast #491, [*OpenClaw: The Viral AI Agent that Broke the Internet — Peter Steinberger*](https://www.youtube.com/watch?v=YFjfBk8HI5o).
