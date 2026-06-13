---
type: entity
tags: [trading, quant, llm, agents, finrobot, ai4finance, multi-agent, oss, open-source]
---

# FinRobot

**FinRobot** is an open-source AI agent platform for financial applications built and maintained by the **AI4Finance Foundation**. It is the multi-agent successor to [[entities/fingpt]], moving beyond single-model sentiment scoring toward an orchestrated team of LLM-powered specialist agents.

- **Repo**: [github.com/AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot)
- **Paper**: arXiv:2405.14767 — "FinRobot: An Open-Source AI Agent Platform for Financial Applications using Large Language Models" (May 2024)
- **License**: Apache-2.0
- **GitHub stars**: ~7,100 (as of 2026-05)
- **Maintainer**: AI4Finance Foundation (founded 2017 at Columbia University by Bruce/Hongyang Yang; 501(c)(3) nonprofit; ~15 core contributors, ~200 total)

## What FinRobot Is

FinRobot is an **orchestration framework** — the "brain layer" plumbing — not a forecaster or an execution engine. It decomposes complex financial analysis tasks into a Financial Chain-of-Thought (CoT) sequence and routes sub-tasks to the right model or tool. In the [[synthesis/ai-quant-trading-architecture-improvements]] three-layer model it occupies the **大腦層 (brain layer)**, while deterministic risk and execution code lives separately in the execution layer.

The platform integrates multiple AI technologies: LLMs, reinforcement learning (FinRL), machine learning (FinML), and multimodal LLMs that handle text, tables, and charts.

## Four-Layer Architecture

The platform is organized as four layers stacked from domain-specific agents at the top down to raw LLM backends at the bottom:

| Layer | Name | Role |
|---|---|---|
| 1 (top) | **Financial AI Agents** | Formulate Financial CoT; break problems into logical sub-task sequences; perception → brain → action workflow |
| 2 | **Financial LLM Algorithms** | Dynamically configure model strategy per task; includes FinGPT (sentiment/NLP), FinRL (RL portfolio allocation), FinML (classical ML) |
| 3 | **LLMOps & DataOps** | Smart Scheduler for multi-source LLM routing; real-time data ingestion pipeline with RAG; fine-tuning and model lifecycle management |
| 4 (bottom) | **Multi-source LLM Foundation Models** | Plug-and-play LLM backends (GPT-4, Claude, Gemini, open models); global-market compatibility |

The **Smart Scheduler** (Layer 3) is FinRobot's routing mechanism: it selects the appropriate LLM backend for each sub-task, enabling the [[concepts/tiered-inference]] pattern where routine classification goes to cheap local models and complex reasoning escalates to larger frontier models.

## Agent Roles

Within a FinRobot multi-agent workflow, agents are assigned specialised roles:

- **Director Agent** — orchestrates task assignment and prioritises financial sub-tasks
- **Assistant Agent** — handles data collection, scraping, and preliminary preprocessing
- **LLM Analyst** — employs advanced LLM reasoning for financial text (earnings calls, SEC filings, macro commentary)
- **Market Forecasting Agents** — synthesise market news and financial data for stock price direction predictions
- **Document Analysis Agents** — extract insights from structured financial documents (annual reports, 10-Ks, proxy statements)
- **Financial Analysts** — conduct detailed quantitative analysis across portfolio management and risk assessment

These roles are configurable and composable. Published use cases include automated equity research report generation (15+ chart types, HTML/PDF output), 3-year DCF financial projections, and peer company comparison analysis.

## Relationship to FinGPT

FinRobot "surpasses FinGPT's single-model approach" (GitHub README). Where [[entities/fingpt]] is a single LoRA-fine-tuned model producing a sentiment signal, FinRobot is the orchestration layer that can use FinGPT as one specialist inside a larger agent pipeline. The evolution is:

```
FinGPT (single model, sentiment) → FinRobot (multi-agent, orchestrated CoT)
```

## Relevance to `trader` Agent

In the `agents/src/trader/` architecture, FinRobot is the conceptual lineage for the **perception → brain split**: the perception layer feeds structured events; the brain layer decomposes them into CoT sub-tasks and routes to appropriate models. See [[synthesis/ai-quant-trading-architecture-improvements]] §0 for the explicit mapping (FinRobot skeleton → Finviz screener context → AI final QC).

The architecture page is explicit (§4.6) that FinRobot's decisions must never call order APIs directly — every output passes through `risk_gate` → `execution_sdk`. FinRobot provides the brain; circuit breakers and volatility targeting stay in deterministic Python.

## Key Properties

- **Apache-2.0 license** — commercially permissive; suitable for production embedding
- **Active community**: Discord reported >1,000 developers; 200+ contributors on GitHub
- **Pluggable backends**: any OpenAI-compatible endpoint works in Layer 4, which means it can route to a local NemoClaw/Nemotron inference endpoint (see [[concepts/nemoclaw]] and [[concepts/tiered-inference]])
- **Trading guardrails enforced by design**: the four-layer architecture keeps LLM output separate from execution

## See Also

- [[entities/fingpt]] — single-model predecessor; FinRobot's internal sentiment specialist
- [[sources/finrobot-ai4finance-2024]] — full source ingest: paper + architecture detail
- [[synthesis/ai-quant-trading-architecture-improvements]] — the synthesis this entity directly backs
- [[concepts/domain-specific-llm-agents]] — FinRobot as a concrete instantiation
- [[concepts/tiered-inference]] — Smart Scheduler implements this pattern
- [[concepts/small-model-ensemble]] — compatible pattern for the multi-agent vote layer
- [[concepts/agentic-provenance]] — each FinRobot CoT step should carry trace IDs for audit
- [[concepts/llm-as-feature-engineer]] — the recommended role for FinRobot's outputs in the `trader` stack
