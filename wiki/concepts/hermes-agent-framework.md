---
type: concept
tags: [ai-agents, hermes, nous-research, agent-framework, self-improving-agents, nvidia-agent-challenge-2026]
---

# Hermes Agent Framework

**Hermes Agent** is an open-source self-improving AI agent framework built by [[entities/nous-research]]. It is distinct from the [[entities/hermes-llm-series]] (Hermes-2/3/4) — Hermes Agent is the orchestration/runtime layer, the Hermes LLM series is the model lineage. Both ship from the same org, the framework can drive any provider's models, not just Nous's.

**Repo:** https://github.com/NousResearch/hermes-agent — MIT License, Python 88.6%, latest release **v0.14.0 (2026-05-16)**, ~165k stars / 27k forks reported in May 2026.

**Site:** https://hermes-agent.nousresearch.com/

## Core thesis

> "The only agent with a built-in learning loop — it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions."

NVIDIA framing (May 13, 2026 blog): four standout capabilities — self-evolving skills, contained sub-agents, curated reliability, and active orchestration that lifts identical models above raw API calls.

## Architecture pillars

| Layer | Mechanism |
|---|---|
| Learning loop | Agent-curated memory + periodic self-nudges to persist learnings |
| Skill creation | After complex tasks the agent writes a new skill; skills self-improve during use; usage sidecar `~/.hermes/skills/.usage.json` tracks `use_count`, `view_count`, `state` |
| Cross-session recall | SQLite FTS5 full-text search over past conversations + LLM summarization |
| User modeling | Honcho dialectic provider builds a persistent profile across sessions |
| Sub-agents | Isolated workers with focused contexts — enables smaller models to perform like larger ones |
| Memory backends | Plugin architecture (`plugins/memory/<name>/`); current providers: honcho, mem0, supermemory, byterover, hindsight, holographic, openviking, retaindb |

The often-cited claim that Hermes uses a `MEMORY.md` file does **not** match the current docs. Hermes uses pluggable memory providers configured under `memory.provider` in `~/.hermes/config.yaml`; skills live at `~/.hermes/skills/`. The `MEMORY.md`-style persistence narrative likely conflates Hermes with Claude/Cursor-style agents that do use a literal `MEMORY.md` file.

## Deployment footprint (terminal backends)

Seven supported backends per the repo: **local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox**. Modal and Daytona provide serverless hibernation — near-zero idle cost — which underwrites the "runs on a $5 VPS or serverless idle" framing. The agent is decoupled from any one host; users can drive a remote VM from Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Teams or email via the messaging gateway (20+ platforms).

## Installation & requirements

```
pip install hermes-agent
hermes postinstall
```

Or bleeding edge: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`

- Python ≥ 3.11
- **Minimum model context: 64,000 tokens** — enforced at startup, smaller-window models are rejected
- OS: Linux / macOS / WSL2 (primary), Android via Termux, native Windows (early beta)
- Config split: secrets → `~/.hermes/.env`, settings → `~/.hermes/config.yaml`

## Model providers supported

25+ providers including: **Nous Portal, OpenRouter (200+ models), NVIDIA NIM (Nemotron), OpenAI, Anthropic, DeepSeek, AWS Bedrock, GitHub Copilot, Alibaba Qwen, Hugging Face, NovitaAI, z.ai/GLM, Kimi/Moonshot, MiniMax, Xiaomi MiMo**, plus local endpoints (vLLM, Ollama, SGLang). Switch with `hermes model` — no lock-in.

## NVIDIA integration — NemoClaw / Hermes path

NVIDIA's NemoClaw documentation (https://docs.nvidia.com/nemoclaw/latest/get-started/quickstart-hermes) exposes Hermes as an experimental agent option via the `nemohermes` command (alias for `nemoclaw` with `NEMOCLAW_AGENT=hermes`). Hermes exposes an **OpenAI-compatible API on port 8642** (`http://127.0.0.1:8642/v1`). Reference config in the docs: `nvidia/nemotron-3-super-120b-a12b` on NVIDIA Endpoints. DGX Spark (128 GB unified memory, 1 PFLOPS AI) is positioned for continuous on-prem 120B-parameter agent operation.

NVIDIA explicitly marks the Hermes path as experimental and not production-recommended as of the documentation snapshot.

## Relevance to the wiki owner

This is the framework recommended for the **NVIDIA Agent Challenge 2026** (see [[sources/nvidia-agent-challenge-2026]] for deadline + rules) that [[entities/sampras]] is competing in. <!-- deduped → [[sources/nvidia-agent-challenge-2026]] --> Hermes Agent's design — long-running, persistent, skill-evolving — directly matches the hackathon theme "long agents that run, persist, and perform — not demos, not slide decks." See also [[concepts/domain-specific-llm-agents]] for the broader narrow-agent philosophy that Hermes operationalizes.

## The agent layer is region-neutral; the model layer is contested

Hermes Agent's defining design choice — **model-agnostic, 25+ providers, switch with `hermes model`, no lock-in** — means the *runtime* layer is geopolitically neutral while the *model* layer underneath it is the contested ground. The same Hermes loop can drive a US Nemotron, a Chinese Qwen/DeepSeek/GLM/Kimi/MiniMax/Xiaomi-MiMo, a French Mistral, or a local Korean/Japanese sovereign model — its provider list already spans all six regions (NVIDIA NIM, OpenAI, Anthropic, DeepSeek, Alibaba Qwen, z.ai/GLM, Kimi/Moonshot, MiniMax, Xiaomi MiMo). This is the practical payoff of the [[synthesis/open-weight-llm-agent-stack-six-region|six-region open-weight map]]: because the open-weight frontier moved to China in 2026 (Kimi K2.6 leads open-weights) while the mandated-for-the-hackathon core is US (Nemotron), a model-agnostic framework lets a builder honour the [[sources/nvidia-agent-challenge-2026|Nemotron requirement]] for the graded path *and* benchmark against the cheaper/stronger Chinese open frontier for everything ungated. Nous Research itself embodies the entanglement — see [[entities/hermes-llm-series]], whose Hermes-4 14B is built on a **Chinese (Qwen-3)** base.

## See also

- [[synthesis/open-weight-llm-agent-stack-six-region]] -> six-region map of the model layer this region-neutral framework runs on
- [[concepts/dgx-spark]] -> local/on-prem deployment surface mentioned in the NVIDIA integration path
- [[concepts/nemotron]] -> NVIDIA model family used in the challenge stack
- [[concepts/nemoclaw]] -> sandbox/runtime integration path
- [[concepts/mcp-aerospace-applications]] — MCP-standardized tool connectivity layer; Hermes exposes an OpenAI-compatible (MCP-shaped) endpoint on port 8642 that aerospace tool servers can register against

- [[entities/nous-research]] — the org
- [[entities/hermes-llm-series]] — the LLM lineage (different artifact, same org)
- [[concepts/domain-specific-llm-agents]] — narrow-agent design philosophy
- [[concepts/obsidian-llm-knowledge-base]] — adjacent persistent-knowledge pattern
