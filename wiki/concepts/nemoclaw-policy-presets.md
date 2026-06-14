---
type: concept
tags: [nemoclaw, openclaw, policy, sandbox, guardrails, hackathon]
---

# NemoClaw Policy Presets — The Reusable Building Blocks of Sandbox Egress Policy

A **policy preset** is a single YAML bundle that declares everything a [[concepts/nemoclaw]] sandbox needs to interact safely with one external service: the allowed DNS hostnames, port/protocol, optional auth-header rewriting at the L7 gateway, and any service-specific quirks (e.g. Discord's split between API, gateway, and CDN hosts). Presets are **composable, hot-reloadable, and trust-graded** (official-vs-community).

This page is the conceptual model. The canonical preset library lives at [[sources/awesome-nemoclaw-voltagent-2026]]; the runtime primitives are at [[concepts/nemoclaw]].

## Why presets exist

NemoClaw's network domain is deny-by-default. The *first* thing any non-trivial agent needs is permission to talk to a handful of well-known services (its model provider, its messenger, its package registry). Writing those YAML allowlists from scratch every time is busywork *and* dangerous (it's easy to over-grant — e.g. allowing the whole of `*.discord.com` when you only need `discord.com/api/v10`).

A preset solves both problems: tight, audited, reusable.

## Three preset families

| Family | Maintainer | Trust posture | Examples |
|---|---|---|---|
| **Official** | NVIDIA, shipped with NemoClaw | Trusted default; counts toward hackathon "graded policy artifact" credit | Discord API/gateway/CDN, Docker Hub, NVIDIA registry, Hugging Face Hub + inference, Jira, npm, Outlook, PyPI, Slack, Telegram |
| **Community** | VoltAgent + contributors via `awesome-nemoclaw` | Review-as-you-add | GitLab, Notion, Linear, Confluence, Teams, Zendesk, Sentry, Stripe, Cloudflare, Google Workspace, AWS, GCP, Vercel, Supabase, Neon, Algolia, Airtable, HubSpot |
| **Custom** | You | Yours to audit | Whatever your specific stack needs |

## The five canonical recipes

These are the operational patterns the preset library is designed to support — each is a composition of multiple presets plus a sandbox-monitoring/lifecycle posture:

### 1. Approval-first web agent

> "Unknown hosts require operator approval."

Default-deny on unknown hostnames, but instead of *silently* dropping the request the policy escalates: the agent receives a structured rejection (via the intent-verification injection NemoClaw does on every turn — see [[concepts/nemoclaw]]) and the operator gets a prompt to allow / deny / allow-permanently. This is the safest pattern for web-browsing agents that need to follow arbitrary links but shouldn't be allowed to exfiltrate to anywhere they please.

### 2. Sandbox monitoring workflow

> "Status, logs, TUI loop."

Pairs `nemoclaw … status` + `nemoclaw … logs --follow` with the TUI to give the operator a live read on what's being allowed/denied. Useful in dev; *essential* during hackathon judging because the judge expects to see a denied tool call in the audit log as proof the policy is real.

### 3. Remote GPU assistant recipe

> "Persistent remote sandbox."

The sandbox lives on a remote GPU box (DGX Spark / Brev VM / cloud node); the operator's local machine just holds the credentials and the OpenAI-compatible `:8642` shim points at the remote. Good fit when inference must run locally (privacy router) but the developer's laptop can't host the model.

### 4. Telegram support bot recipe

> "Bot bridge into sandboxed agent."

The sandboxed agent gets the Telegram preset (so it can read/post) plus whatever knowledge-source presets it needs. The bridge runs *outside* the sandbox, forwarding messages in and replies out — so a prompt-injection on the bot can't escape to the host even if it convinces the agent to misbehave.

### 5. Runtime model-switching workflow

> "Switch model without restart."

Because credentials live in the host-side gateway (not the sandbox), swapping the upstream inference provider — local NIM → cloud frontier → back — is a gateway-config change, not a sandbox restart. The agent process never notices. This is what makes the "develop on local Nemotron, demo on hosted Nemotron Ultra" pattern cheap.

## Composition example

A typical "Discord support bot using Hugging Face for model pulls and Notion for the FAQ KB" agent stacks:

```
base: approval-first-web-agent.yaml
presets:
  - discord.yaml               # official
  - huggingface.yaml           # official
  - notion.yaml                # community
inference:
  primary: nim://nemotron-49b
  fallback: openai-compatible://cloud
```

The deny-default base + three additive presets is the entire egress policy. Hot-reload, no restart.

## Worked example — the Firefly sandbox policy (this repo)

The abstract recipes above are instantiated concretely by this wiki's own [[synthesis/firefly-nemoclaw-reference-implementation|Firefly agent]] at `agents/firefly-sandbox.yaml` — a real, reviewable OpenShell/NemoClaw policy. It demonstrates the **deny-default base + per-service additive presets** pattern on a domain-specific (orbital-mission) agent rather than the generic Discord/Notion examples:

```yaml
network:
  default: deny                          # deny-default base
  allow:
    - host: inference.local              # model provider (gateway-rerouted)
      ports: [443, 8443, 8642]
    - host: www.space-track.org          # ≈ one "official-style" preset per tool
    - host: ll.thespacedevs.com          #   each entry carries a `reason:` field
    - host: services.swpc.noaa.gov       #   (the audit-trail justification)
    - host: celestrak.org                #   rate-limit fallback
inference:
  default_provider: ollama-local         # recipe #5: runtime model-switching —
  rerouting:                             #   swap ollama-local ↔ nim-cloud at the
    upstreams: { ollama-local: …, nim-cloud: { requires_credential: NVIDIA_API_KEY } }
```

Mapping to the five canonical recipes:

- **Recipe #5 (runtime model-switching)** — the `inference.rerouting.upstreams` block (`ollama-local` ↔ `nim-cloud`) is exactly the "develop on local Nemotron, demo on hosted" gateway swap, with `NVIDIA_API_KEY` held in the host vault and never mounted into the sandbox.
- **Recipe #3 (remote GPU assistant)** — the on-prem NIM path (see [[concepts/dgx-spark]]) is the same "credentials local, model remote" topology.
- Each `network.allow` entry is a minimal, single-host, `reason:`-annotated preset — the *opposite* of over-granting `*.space-track.org` — i.e. the tight/audited posture this page argues for, applied to a real toolset.

The Firefly policy also adds a `daemon` block (6-hour refresh, alert on `space_weather.kp_index >= 6`) — the **always-on** lifecycle the recipes assume but rarely show. Full reconciliation: [[synthesis/firefly-nemoclaw-reference-implementation]].

## Why this matters for the hackathon

For [[sources/nvidia-agent-challenge-2026|GTC Taipei Agent Challenge 2026]], the `openclaw-sandbox.yaml` policy file is a **graded artifact** (see [[concepts/nemoclaw]] hackathon section). Submissions that:

1. Compose from official presets where one exists,
2. Have a small, reviewable diff for the agent's actual ask,
3. Demonstrate at least one denied tool call in the audit log,

…win the "secure by design" criterion cleanly. The preset library is what lets a team produce that artifact in minutes rather than hours.

## Cross-references

- Runtime + YAML primitives: [[concepts/nemoclaw]]
- Canonical preset library: [[sources/awesome-nemoclaw-voltagent-2026]]
- Build-a-Claw onboarding portal: [[sources/nemoclaw-build-a-claw-portal-2026]]
- Hackathon scoring context: [[sources/nvidia-agent-challenge-2026]]
- Hermes-profile install operator runbook: [[sources/nemoclaw-hermes-install-runbook-2026]]
