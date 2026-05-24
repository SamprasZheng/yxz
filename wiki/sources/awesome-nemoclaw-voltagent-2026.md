---
type: source
title: "awesome-nemoclaw — Curated NemoClaw presets, recipes, and playbooks"
author: VoltAgent
date: 2026
ingested: "2026-05-24"
tags: [nemoclaw, openclaw, awesome-list, policy, voltagent, community]
---

# awesome-nemoclaw (VoltAgent)

The `VoltAgent/awesome-nemoclaw` GitHub repo is the community-curated index of presets, recipes, deployment templates, and operational playbooks for [[concepts/nemoclaw]]. As of ingest it sits at ~84 stars / 19 forks — small but the de-facto starting point for non-trivial NemoClaw deployments because it surfaces the **official NVIDIA policy presets alongside community-contributed ones in a single README**.

Repo: [github.com/VoltAgent/awesome-nemoclaw](https://github.com/VoltAgent/awesome-nemoclaw)

Maintainer: [VoltAgent](https://github.com/VoltAgent) (the same org that publishes `awesome-voltagent`, `awesome-agent-skills`, and the VoltAgent TypeScript agent framework).

## README structure

- **Start Here** — quickstart installation
- **Plugin Layout** — TypeScript plugin structure (NemoClaw is shipped as an OpenClaw plugin)
- **Policy Presets** — official + community
- **Agent Recipes** — task-oriented setups
- **Templates** — baseline configurations
- **Example Projects**
- **Official Resources**
- **Contributing**

## Plugin layout (canonical NemoClaw plugin shape)

```
nemoclaw/
├── src/
│   ├── index.ts, cli.ts
│   ├── commands/
│   │   ├── launch.ts, connect.ts, status.ts, logs.ts, slash.ts
│   │   └── blueprint/
│   └── [resolve, fetch, verify, exec, state].ts
├── openclaw.plugin.json
└── package.json
```

This is the shape every NemoClaw-aware OpenClaw plugin follows — useful as a reference when writing your own (e.g. for a [[sources/nvidia-agent-challenge-2026|GTC hackathon]] submission that needs a custom slash command).

## Policy presets

The headline value of the list — every preset is a ready-to-drop YAML egress/policy bundle for a specific external service, hot-reloadable into the running sandbox without restart.

**Official (NVIDIA-maintained):**
Discord API + gateway + CDN, Docker Hub, NVIDIA registry, Hugging Face Hub + inference, Jira, npm, Outlook, PyPI, Slack, Telegram.

**Community (this repo):**
GitLab, Notion, Linear, Confluence, Teams, Zendesk, Sentry, Stripe, Cloudflare, Google Workspace, AWS, GCP, Vercel, Supabase, Neon, Algolia, Airtable, HubSpot.

The official/community split matters: NVIDIA-maintained presets get treated as trusted defaults for the hackathon bonus-credit "graded policy artifact" check (see [[concepts/nemoclaw]] hackathon section); community presets are review-as-you-add.

## Agent recipes (verbatim names)

1. **Approval-first web agent** — "Unknown hosts require operator approval"
2. **Sandbox monitoring workflow** — "Status, logs, TUI loop"
3. **Remote GPU assistant recipe** — "Persistent remote sandbox"
4. **Telegram support bot recipe** — "Bot bridge into sandboxed agent"
5. **Runtime model-switching workflow** — "Switch model without restart" (links out to `docs.nvidia.com/nemoclaw/latest/inference/switch-inference-providers.html`)

These five recipes are the pattern library that [[concepts/nemoclaw-policy-presets]] abstracts.

## How to use this list (workflow)

1. Pick a recipe whose shape matches your agent (e.g. Telegram bot bridge → "Telegram support bot recipe").
2. Compose the recipe's base policy with however many service-specific presets you need (Hugging Face for model pulls, Stripe for payments, etc.).
3. Drop the merged YAML into `openclaw-sandbox.yaml` (or Hermes equivalent at `/sandbox/.hermes/...`).
4. Hot-reload — no sandbox restart required.

## Why this matters for the hackathon

Two reasons judges care about an `awesome-nemoclaw`-derived policy file in a [[sources/nvidia-agent-challenge-2026|GTC Agent Challenge]] submission:

1. **Demonstrates ecosystem fluency** — the team knows where the canonical preset library lives, didn't reinvent egress rules from scratch, and can therefore be trusted to have read the runtime docs.
2. **Reduces "did they actually read what they pasted" risk** — official presets are vetted; the team's diff against them is small and reviewable.

## Cross-references

- Runtime + policy primitives: [[concepts/nemoclaw]]
- The pattern abstracted as a concept: [[concepts/nemoclaw-policy-presets]]
- Hackathon scoring rubric: [[sources/nvidia-agent-challenge-2026]]
- Onboarding portal: [[sources/nemoclaw-build-a-claw-portal-2026]]

## Sources

- [VoltAgent/awesome-nemoclaw on GitHub](https://github.com/VoltAgent/awesome-nemoclaw)
- [VoltAgent org on GitHub](https://github.com/VoltAgent)
- [NemoClaw inference provider switching docs](https://docs.nvidia.com/nemoclaw/latest/inference/switch-inference-providers.html)
