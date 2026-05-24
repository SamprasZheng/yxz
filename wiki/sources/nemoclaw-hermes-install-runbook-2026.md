---
type: source
title: "NemoClaw / Hermes Install Runbook"
author: "Sampras (operator notes, derived from NVIDIA NemoClaw Quickstart with Hermes)"
date: "2026-05-24"
ingested: "2026-05-24"
tags: [nvidia, nemoclaw, hermes, runbook, install, hackathon, gtc-2026]
---

# NemoClaw / Hermes Install Runbook (2026-05-24)

Operator-level runbook for installing the **experimental Hermes profile** of [[concepts/nemoclaw]] for the [[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge 2026]]. Derived from the NVIDIA NemoClaw Quickstart with Hermes; treat the live docs as source of truth, this page as a frozen snapshot.

## Profile selection

- The `nemohermes` CLI is an alias for `nemoclaw` with `NEMOCLAW_AGENT=hermes` pre-set.
- Hermes support is **experimental** — see warning on [[concepts/nemoclaw]].
- Hermes-specific config is written to `/sandbox/.hermes` inside the sandbox (distinct from the host-side `~/.hermes/` used by the standalone [[concepts/hermes-agent-framework]] install).
- Model traffic egresses via the `inference.local` rewrite path described in [[concepts/nemoclaw]].
- Hermes exposes the **OpenAI-compatible API on port `8642`** (same shape as the OpenClaw profile; this is the judge-harness surface).
- Hermes does **NOT** expose the OpenClaw browser dashboard on port `18789` — debugging happens via `nemohermes … logs --follow` rather than the web UI.

## Interactive install

```bash
export NEMOCLAW_AGENT=hermes
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

If NemoClaw is already installed, re-run onboarding for the Hermes profile only:

```bash
nemohermes onboard
```

Recommended runbook defaults for the hackathon:

- Sandbox name: `orbital-hermes`
- Model: `nvidia/nemotron-3-super-120b-a12b` (Gen3 reference model — see [[concepts/nemotron]] for variant tradeoffs and pricing)

## Non-interactive install skeleton

For CI / scripted bring-up:

```bash
export NEMOCLAW_AGENT=hermes
export NEMOCLAW_NON_INTERACTIVE=1
export NEMOCLAW_ACCEPT_THIRD_PARTY_SOFTWARE=1
export NEMOCLAW_SANDBOX_NAME=orbital-hermes
export NVIDIA_API_KEY="<fill>"
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

Provider/model selection may require additional provider environment variables depending on the host. **Prefer the interactive path for Day 1** unless the target GPU host is already well understood — Hermes is experimental and silent failures during scripted bring-up are harder to diagnose than interactive ones.

## Connect

From the host:

```bash
nemohermes orbital-hermes connect
```

Inside the sandbox shell, drop into the Hermes agent loop:

```bash
hermes
```

## Health check

From the host (port 8642 is the OpenAI-compatible endpoint):

```bash
curl -sf http://127.0.0.1:8642/health
```

If port forwarding is not active (e.g. sandbox is on a remote GPU host), bring it up via OpenShell:

```bash
openshell forward start --background 8642 orbital-hermes
```

This is the same `openshell` tooling underlying [[concepts/nemoclaw]]; the `--background` flag lets the forward survive after the launching shell exits, which matters for long-lived hackathon eval runs.

## Lifecycle

```bash
nemohermes orbital-hermes status
nemohermes orbital-hermes logs --follow
nemohermes orbital-hermes snapshot create --name before-change
nemohermes inference set --model nvidia/nemotron-3-super-120b-a12b --provider nvidia
```

- `snapshot create` captures sandbox state — useful before swapping the inference model or rewriting `openclaw-sandbox.yaml`. Snapshots are the cheapest rollback for the "I broke the policy YAML" failure mode the hackathon graders specifically probe for.
- `inference set` hot-swaps the model/provider without re-onboarding the sandbox; this is the documented path for trying Nemotron Super-49B vs Super-120B mid-run.

## Destroy

```bash
nemohermes orbital-hermes destroy
```

**Order of operations:** destroy **only after submission and judging are complete**. The judge harness hits `127.0.0.1:8642` — if the sandbox is gone, the harness will time out and the submission is graded as non-functional.

## What's NOT in this runbook

- GPU-host provisioning (DGX Spark / Station setup) — see [[concepts/nemoclaw]] § Hardware requirements and the NVIDIA Quickstart.
- OpenClaw profile (the default, non-experimental agent profile) — see [[concepts/nemoclaw]] § Install.
- Policy YAML authoring (`openclaw-sandbox.yaml` or Hermes equivalent) — judge-graded artifact; covered in [[concepts/nemoclaw]] § Policy primitives.
- Bonus-credit checklist — see [[sources/nvidia-agent-challenge-2026]].

## Cross-references

- [[concepts/nemoclaw]] — full architecture, policy model, why this earns hackathon bonus.
- [[concepts/hermes-agent-framework]] — the Hermes agent runtime that NemoClaw wraps; note the config path divergence (`/sandbox/.hermes` here vs. `~/.hermes/` for standalone Hermes).
- [[concepts/nemotron]] — model selection rationale; the reference 120B is paid-only via Bitdeer/CoreWeave while Super-49B is free on build.nvidia.com.
- [[sources/nvidia-agent-challenge-2026]] — submission deadline, bonus-credit rules.
