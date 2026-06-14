---
type: concept
tags: [nvidia, agent-runtime, sandbox, guardrails, security, hackathon, gtc-2026]
---

# NemoClaw — NVIDIA's Open-Source Sandbox + Guardrails Stack for Always-On Agents

NemoClaw is an **open-source reference stack** (Apache 2.0) that NVIDIA announced at GTC 2026 for running autonomous "always-on" AI agents more safely. It packages NVIDIA's [[concepts/openshell-runtime|OpenShell sandbox runtime]] with guided onboarding, hardened blueprints, state management, channel messaging, and **out-of-process policy enforcement** so that a self-evolving coding agent cannot bypass its own guardrails by prompt injection.

> Marketed primarily as the safe runtime for **[[concepts/openclaw|OpenClaw]]** (the community-owned, [[entities/peter-steinberger|Peter Steinberger]]–founded always-on agent framework that ships as NemoClaw's default profile). NemoClaw also ships an experimental **Hermes** profile — see [[concepts/hermes-agent-framework]].

## What NemoClaw is (and is *not*)

| | NemoClaw | NeMo Guardrails (predecessor / sibling) |
|---|---|---|
| Layer | Runtime sandbox + policy enforcement (network/FS/process/inference) | LLM I/O rail (Colang dialog guards, prompt filters) |
| Enforcement point | **Outside the agent process** (Landlock, seccomp, netns, L7 proxy) | Inside the inference pipeline |
| Scope | Whole agent + tools + filesystem + egress | Single LLM call's input/output |
| Bypass surface | Container escape | Prompt injection |
| Repo | `github.com/NVIDIA/NemoClaw` | `github.com/NVIDIA/NeMo-Guardrails` |

**They are different products with overlapping branding.** NemoClaw is *not* a rebrand of NeMo Guardrails; it is a complementary runtime layer that can coexist with NeMo Guardrails dialog rails. Confusion is common because both live under the "NeMo" umbrella and both use the word "guardrails."

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│  Host (macOS / WSL2 / Linux)                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ OpenShell gateway (credential vault + L7 proxy)      │ │
│  │   • Holds real provider API keys                     │ │
│  │   • Rewrites Authorization headers at egress         │ │
│  │   • SSRF-validates DNS/IP before allowing requests   │ │
│  └──────────────────────────────────────────────────────┘ │
│        ▲ inference.local (in-sandbox DNS)                 │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Sandbox = Docker / Podman / Firecracker microVM      │ │
│  │   ├─ Landlock (FS scope: /sandbox + /tmp rw, rest ro)│ │
│  │   ├─ seccomp (syscall allowlist)                     │ │
│  │   ├─ netns (declarative egress policy, hot-reload)   │ │
│  │   └─ Agent process (OpenClaw / Hermes / custom)      │ │
│  └──────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

### Sandbox model

The sandbox is a **Docker container by default** (not a Kubernetes pod), with hardening layered inside it. OpenShell also supports **Podman**, **Firecracker microVMs**, and **Kubernetes** as compute drivers — Firecracker is the recommended choice when stronger isolation is needed than Docker namespaces provide. (It is not gVisor and not WASM.)

### Policy primitives (YAML, declarative, hot-reloadable)

OpenShell policies govern four domains, all expressed in `openclaw-sandbox.yaml` (or the Hermes equivalent):

1. **Filesystem** — Landlock-enforced read-write allowlist. Default: `/sandbox` + `/tmp` rw; system paths ro; provider keys never mounted into the sandbox.
2. **Network** — declarative egress allowlist (domain + port); hot-reloadable without restarting the agent; the L7 proxy is the only path out.
3. **Process** — seccomp syscall allowlist + Linux namespaces; blocks privilege escalation and dangerous syscalls.
4. **Inference** — model calls are rerouted via `inference.local` to the host-side gateway, which injects credentials and can switch providers (NIM / OpenAI-compatible upstream) without touching the agent.

### Privacy Router

A pluggable component that strips PII from prompts before they leave the sandbox and reach cloud inference. Sits between the agent and the gateway. Configurable per-route.

### Intent verification

The NemoClaw plugin injects **sandbox and policy context into every agent turn**, so when a tool call is blocked the agent receives a structured rejection (and the operator gets an auditable log line) rather than a silent failure. Operator-defined policy can require explicit intent confirmation for high-risk actions.

## Install

Single-command installer (Apache 2.0):

```bash
# Default: OpenClaw profile
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash

# Hermes profile
export NEMOCLAW_AGENT=hermes
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash

# Non-interactive (CI / hackathon scripts)
curl -fsSL https://www.nvidia.com/nemoclaw.sh | \
  NEMOCLAW_NON_INTERACTIVE=1 \
  NEMOCLAW_ACCEPT_THIRD_PARTY_SOFTWARE=1 \
  NEMOCLAW_SANDBOX_NAME=my-hermes \
  NVIDIA_API_KEY=$NVIDIA_API_KEY \
  bash
```

After install: `nemoclaw onboard` (or `nemohermes onboard`) walks through sandbox name, inference provider, model selection, and network policy preset.

> Hermes-profile note: Hermes config is written to `/sandbox/.hermes` (inside the sandbox), not to the host. Hermes does **not** expose the OpenClaw browser dashboard on port `18789` — only the OpenAI-compatible API on `8642`. Full operator runbook at [[sources/nemoclaw-hermes-install-runbook-2026]].

## Hardware requirements

| Resource | Minimum | Recommended |
|---|---|---|
| CPU | 4 vCPU | 4+ vCPU |
| RAM | 8 GB | 16 GB |
| Disk | 20 GB free | 40 GB free |
| Sandbox image | ~2.4 GB compressed | — |

Host: macOS, Windows + WSL2, or Linux. Docker / Podman, or host virtualization for Firecracker microVMs. GPU is **not required for the runtime itself** (inference is routed); GPU is needed only if you host inference locally (DGX Spark / Station support is called out in the docs).

## Verification (quickstart self-check)

```bash
# OpenAI-compatible API the sandboxed agent exposes
curl -sf http://127.0.0.1:8642/health
curl -s  http://127.0.0.1:8642/v1/models

# Sandbox introspection
nemohermes my-hermes status
nemohermes my-hermes logs --follow
```

The port `8642` OpenAI-compatible endpoint is the same shape an external evaluator (or hackathon judge) can hit, so a graded harness can interact with the agent **without ever entering the sandbox itself**.

## Why this earns NVIDIA Agent Challenge 2026 bonus credit

The GTC Taipei hackathon (deadline + rules canonical at [[sources/nvidia-agent-challenge-2026]]) awards an explicit bonus for using NemoClaw as the agent runtime. Reasoning likely understood by judges: <!-- deduped → [[sources/nvidia-agent-challenge-2026]] -->

1. **Out-of-process enforcement** — submissions that run inside NemoClaw cannot self-modify their own guardrails, which is what the judging rubric is checking for in the "secure by design" criterion.
2. **Reproducible eval surface** — the `127.0.0.1:8642` OpenAI-compatible endpoint plus `nemoclaw … logs --follow` give judges a uniform black-box harness and full audit trail across all submissions.
3. **Policy YAML is graded artifact** — `openclaw-sandbox.yaml` (or Hermes equivalent) is the declarative artifact that documents what the agent is *allowed* to do; judges read it directly.
4. **NVIDIA ecosystem alignment** — bonus reward for stack alignment (NemoClaw + NIM + optionally a Nemotron model) showcases the NVIDIA Agent Toolkit story the hackathon is promoting.

> ⚠️ Bonus is **not automatic** just by running inside the sandbox. To earn it cleanly the submission should: (a) commit the `openclaw-sandbox.yaml` policy file, (b) demonstrate at least one *denied* tool call in the audit log (proves the policy is real, not permissive), (c) expose the `:8642` health + `/v1` endpoints for the judge harness.

> ⚠️ As of the May 2026 ingest, the **Hermes profile is explicitly marked experimental and not recommended for production**. For the hackathon this is fine; for any post-hackathon deployment, prefer the OpenClaw profile.

## Ecosystem & community

The runtime is only half the story — the community/ecosystem layer is where day-to-day operators actually live:

- **[[sources/nemoclaw-build-a-claw-portal-2026|Build-a-Claw portal]]** ([nvidia.com/en-us/ai/build-a-claw](https://www.nvidia.com/en-us/ai/build-a-claw/)) — NVIDIA's onboarding hub; routes you to the right install path (Brev cloud VM / DGX Spark / Jetson) instead of forcing a raw `curl | bash`.
- **[[sources/awesome-nemoclaw-voltagent-2026|VoltAgent/awesome-nemoclaw]]** — community-curated index of policy presets, recipes, and templates; surfaces official-NVIDIA presets and community ones side-by-side.
- **[[concepts/nemoclaw-policy-presets|Policy-preset pattern]]** — the conceptual model behind the preset library (deny-default base + composable per-service YAML bundles, hot-reloadable, trust-graded). Covers the five canonical recipes: approval-first web agent, sandbox monitoring, remote GPU assistant, Telegram bot bridge, runtime model-switching.
- **NVIDIA Developer Forum** — official announcement + support thread at [forums.developer.nvidia.com/t/introducing-nvidia-nemoclaw/363701](https://forums.developer.nvidia.com/t/introducing-nvidia-nemoclaw/363701) (OP `rjensen`, 2026-03-16).
- **OpenClaw "Claw Crew" Discord** — [discord.gg/openclaw](https://discord.gg/openclaw); shared community with the upstream [[concepts/openclaw]] agent framework (founder [[entities/peter-steinberger]]). English-primary, Chinese welcomed.

## Reference implementation in this repo

The owner's own [[synthesis/firefly-nemoclaw-reference-implementation|Firefly mission-architect agent]] is a working NemoClaw consumer. `agents/firefly-sandbox.yaml` exercises all four policy domains documented above — Landlock `filesystem` allow/deny, deny-default `network` L7 allowlist, seccomp `process` (`block_syscalls: [kexec_load, reboot, bpf, perf_event_open, ptrace]`), and the out-of-process `inference` credential vault rerouting `inference.local` → `ollama-local`/`nim-cloud` — plus a `daemon` block for the always-on 6-hour refresh loop. It is the canonical "what a real NemoClaw policy looks like" example for this wiki; see [[synthesis/firefly-nemoclaw-reference-implementation]] for the full code↔concept reconciliation (including the divergence that the workflow-of-record still drives its agent slots on Claude while the Nemotron dual-mode router lives in a parallel module).

## Relationship to other NVIDIA agent stack pieces

- [[concepts/openshell-runtime]] — the underlying sandbox runtime; NemoClaw is the opinionated distribution of it.
- [[concepts/openclaw]] — the **default agent profile** that runs inside the sandbox; community-owned (MIT), created by [[entities/peter-steinberger]], not an NVIDIA project.
- [[concepts/hermes-agent-framework]] — the second supported agent profile (experimental). Hermes provides the agent loop; NemoClaw provides the cage.
- [[concepts/nemotron]] — NVIDIA's open model family; a natural choice for the inference target NemoClaw routes to.
- [[concepts/mcp-aerospace-applications]] — NemoClaw's L7 egress policy governs which MCP servers the sandboxed agent is allowed to call; this is the "whitelist" layer the owner references when integrating aerospace MCP tool servers (STK, SPICE, Space-Track, etc.).
- **NIM** — NVIDIA Inference Microservices; the gateway can point at NIM endpoints for self-hosted inference.
- **NeMo Agent Toolkit** — broader umbrella; OpenShell is described in NVIDIA docs as "part of NVIDIA Agent Toolkit."
- **NeMo Guardrails** (Colang) — different product, different layer; can stack on top of NemoClaw for dialog-level rails.

## Sources

- NVIDIA, [*NemoClaw Developer Guide*](https://docs.nvidia.com/nemoclaw/latest/) — official docs (overview, architecture, quickstart-hermes, quickstart-openclaw, deploy-to-remote-gpu, troubleshooting).
- NVIDIA Newsroom, [*NVIDIA Announces NemoClaw for the OpenClaw Community*](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — GTC 2026 announcement.
- NVIDIA Developer Blog, [*Run Autonomous, Self-Evolving Agents More Safely with NVIDIA OpenShell*](https://developer.nvidia.com/blog/run-autonomous-self-evolving-agents-more-safely-with-nvidia-openshell/).
- NVIDIA Blog, [*How Autonomous AI Agents Become Secure by Design With NVIDIA OpenShell*](https://blogs.nvidia.com/blog/secure-autonomous-ai-agents-openshell/).
- GitHub, [NVIDIA/NemoClaw](https://github.com/NVIDIA/NemoClaw) and [NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell) (Apache 2.0).
- Repello AI, [*What Is NVIDIA NeMoClaw? A Security Engineer's First Look*](https://repello.ai/blog/nvidia-nemoclaw).
- Penligent, [*NVIDIA OpenClaw Security: What NemoClaw Changes and What It Still Cannot Fix*](https://www.penligent.ai/hackinglabs/nvidia-openclaw-security-what-nemoclaw-changes-and-what-it-still-cannot-fix/).
- SDxCentral, [*Nvidia details NemoClaw security guardrails in wake of AI agent concerns*](https://www.sdxcentral.com/news/nvidia-details-nemoclaw-security-guardrails-in-wake-of-ai-agent-concerns/).
