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

In February 2026, Steinberger joined **OpenAI** to lead a personal-agents division. OpenClaw was moved to an **independent open-source foundation with OpenAI backing**; it remains MIT-licensed and community-developed.

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
