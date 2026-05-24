---
type: source
title: "Explore and Build Claws — NVIDIA Build-a-Claw Resource Hub"
author: NVIDIA
date: 2026
ingested: "2026-05-24"
tags: [nvidia, nemoclaw, openclaw, brev, dgx-spark, jetson, gtc-2026, onboarding]
---

# Build-a-Claw — NVIDIA's Resource Portal for OpenClaw + NemoClaw

The official NVIDIA landing page at [nvidia.com/en-us/ai/build-a-claw](https://www.nvidia.com/en-us/ai/build-a-claw/) (page title: **"Explore and Build Claws"**, contains the **"Build-a-Claw Resource Hub"** section) is the canonical onboarding portal for anyone trying to get [[concepts/nemoclaw]] or its parent agent framework OpenClaw running. It centralizes the install paths, hardware target docs, and the OpenClaw "Claw Crew" Discord invite ([discord.gg/openclaw](https://discord.gg/openclaw)) into one place — useful as the single URL to give a hackathon teammate.

> Context: NemoClaw is NVIDIA's open-source sandbox + guardrails runtime around OpenClaw (see [[concepts/nemoclaw]] for the architecture). The Build-a-Claw portal is the *front door*, not the docs — for runtime depth go to `docs.nvidia.com/nemoclaw/latest/`, and for install troubleshooting see [[sources/nemoclaw-hermes-install-runbook-2026]].

## What the portal links out to

Headings on the page (verbatim):

- "Get started quickly with NemoClaw"
- "Install OpenClaw on your NVIDIA DGX Spark/OEM GB10"
- "Install NemoClaw on your DGX Spark/OEM GB10"
- "Install OpenClaw on your NVIDIA Jetson"
- "Try OpenClaw for free on the cloud"
- "Try NemoClaw for free on the cloud"
- "Join our community on Discord"

## The three install paths

| Path | Target | Why pick this |
|---|---|---|
| **Cloud VM via NVIDIA Brev** | "Spin up NemoClaw on a free cloud VM with NVIDIA Brev. Nothing to install on your machine." | Fastest first-run; zero local install; clean sandbox to throw away after experimenting. Default recommendation for hackathon teammates trying NemoClaw for the first time. |
| **DGX Spark / OEM GB10** | Local Grace-Blackwell developer box | Local inference target for the privacy-router story — keep prompts on-device, host Nemotron / open models locally. NemoClaw + DGX Spark is the combination NVIDIA pushes hardest in the [[sources/nvidia-agent-challenge-2026|GTC Taipei hackathon]] context. |
| **NVIDIA Jetson** | Edge / embedded | "Fully local AI personal assistant on Jetson with OpenClaw and WhatsApp" — no cloud APIs needed. This is the lowest-power persistent always-on agent target. OpenClaw only (NemoClaw on Jetson AGX Thor is documented separately by community at ajeetraina.com). |

## Brev VM — what it actually is

NVIDIA Brev is the company's one-click cloud GPU instance launcher with "Launchables" (pre-baked images). The NemoClaw Launchable spins up a configured VM with the runtime already installed, exposing the standard `127.0.0.1:8642` OpenAI-compatible endpoint inside the VM. For [[sources/nvidia-agent-challenge-2026|hackathon submissions]] where the judge harness needs a reachable HTTP endpoint, a Brev Launchable is the lowest-friction way to demo without dragging laptop hardware on stage.

## Safety disclaimer (on-page, verbatim)

The portal explicitly warns:

> "Running autonomous agents involves inherent risks including system access, data exposure, and potential security vulnerabilities."

This is the same disclaimer pattern that appears throughout NVIDIA's NemoClaw collateral — the runtime ships with deny-by-default policy presets *because* OpenClaw left to its own devices is dangerous. The [[concepts/nemoclaw-policy-presets|policy-preset library]] is what makes the sandbox safe to actually use.

## Why this page matters for the hackathon

For [[sources/nvidia-agent-challenge-2026|GTC Taipei Agent Challenge 2026]] submissions, the canonical instruction to a teammate is no longer "curl this shell script" — it's "go to nvidia.com/en-us/ai/build-a-claw and pick the path that matches your hardware." The portal handles the branching (cloud vs DGX vs Jetson) that the raw `nemoclaw.sh` installer punts on.

## Cross-references

- Runtime + install internals: [[concepts/nemoclaw]]
- Operator install runbook (Hermes profile): [[sources/nemoclaw-hermes-install-runbook-2026]]
- Community policy-preset library: [[concepts/nemoclaw-policy-presets]] / [[sources/awesome-nemoclaw-voltagent-2026]]
- Hackathon context: [[sources/nvidia-agent-challenge-2026]]

## Sources

- [Explore and Build Claws — NVIDIA Build-a-Claw](https://www.nvidia.com/en-us/ai/build-a-claw/) (official portal)
- [Build an Autonomous AI Agent with Nemotron and OpenClaw at GTC](https://www.nvidia.com/gtc/training/build-a-claw/) (GTC training session companion page)
- [OpenClaw on DGX Spark — build.nvidia.com/spark/openclaw](https://build.nvidia.com/spark/openclaw)
- [Run OpenClaw For Free On NVIDIA RTX GPUs & DGX Spark](https://www.nvidia.com/en-us/geforce/news/open-claw-rtx-gpu-dgx-spark-guide/)
- [Getting Started with NVIDIA NemoClaw on Jetson AGX Thor](https://www.ajeetraina.com/getting-started-with-nvidia-nemoclaw-on-jetson-agx-thor/) (community)
- [NVIDIA Developer Forum — Introducing NVIDIA NemoClaw (thread 363701)](https://forums.developer.nvidia.com/t/introducing-nvidia-nemoclaw/363701) — official announcement thread, OP `rjensen`, 2026-03-16.
