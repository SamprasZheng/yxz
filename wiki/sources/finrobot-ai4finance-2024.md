---
type: source
tags: [trading, quant, llm, agents, finrobot, ai4finance, multi-agent, oss]
title: "FinRobot: An Open-Source AI Agent Platform for Financial Applications using Large Language Models"
author: "Hongyang Yang, Boyu Zhang, Neng Wang, Cheng Guo, Xiaoli Zhang, Likun Lin, Junlin Wang, Tianyu Zhou, Mao Guan, Runjia Zhang, Christina Dan Wang"
date: "2024-05-23"
ingested: "2026-05-29"
---

# FinRobot: An Open-Source AI Agent Platform for Financial Applications using Large Language Models

**arXiv**: [2405.14767](https://arxiv.org/abs/2405.14767) (submitted 2024-05-23; v2 revised 2024-05-27)
**GitHub**: [github.com/AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) — Apache-2.0 — ~7,100 stars (2026-05)
**Venue**: preprint; presented within AI4Finance community and cited widely in financial-AI literature

## Abstract (paraphrased)

FinRobot introduces the first open-source AI agent platform dedicated to financial analysis, addressing the barriers between the finance and AI communities. It supports multiple financially-specialized AI agents, each powered by an LLM, and uses a Financial Chain-of-Thought (CoT) methodology to decompose complex financial problems into logical sub-task sequences. The platform's multi-source architecture facilitates selection of the most accurate LLM for each specific task, and its real-time data processing pipeline assures timely financial analysis.

## Paper Contribution

The paper's main claims:
1. First open-source, production-ready **multi-agent** financial AI platform (vs. FinGPT's single-model approach)
2. Introduction of **Financial Chain-of-Thought (CoT)** prompting for financial problem decomposition
3. A four-layer architecture separating domain agents, model algorithms, ops, and foundation backends
4. Demonstrated use-cases: automated equity research reports, DCF valuation, market forecasting, peer analysis

## Four-Layer Architecture (from Section 3 of paper)

| Layer | Name | Technical Content |
|---|---|---|
| 1 | **Financial AI Agents** | Perception → CoT reasoning → action execution; agent roles: Director, Assistant, LLM Analyst, Market Forecasting Agents, Document Analysis Agents, Financial Analysts |
| 2 | **Financial LLM Algorithms** | FinGPT (domain NLP/sentiment), FinRL (reinforcement learning for portfolio allocation), FinML (classical ML), multimodal LLMs (text + tables + charts) |
| 3 | **LLMOps & DataOps** | Smart Scheduler (multi-source LLM routing), real-time data pipeline, RAG capability, model fine-tuning lifecycle management |
| 4 | **Multi-source LLM Foundation Models** | Plug-and-play backends: GPT-4o, Claude, Gemini, Llama, and any OpenAI-compatible endpoint |

### Smart Scheduler (Layer 3)
The Smart Scheduler is the routing component that selects which LLM backend handles each sub-task. It implements the [[concepts/tiered-inference]] pattern at the framework level: cheap local models for routine classification tasks; frontier models for complex reasoning. This makes FinRobot compatible with local [[concepts/nemoclaw]]/[[concepts/nemotron]] inference deployments.

### Financial Chain-of-Thought (CoT)
FinRobot's CoT is domain-adapted: instead of general reasoning chains, it structures problems as sequences of financial sub-tasks — e.g., "retrieve income statement → compute EBITDA margin → compare to sector peers → project 3-year DCF → generate valuation summary." Each step is assigned to the agent most suited for it.

## Agent Roles (from paper + GitHub README)

- **Director Agent**: orchestrates task assignment and prioritises financial sub-tasks; the top-level planner
- **Assistant Agent**: data collection, scraping, preliminary preprocessing and formatting
- **LLM Analyst**: advanced LLM reasoning over financial text (earnings calls, SEC filings, macro commentary)
- **Market Forecasting Agents**: synthesise market news and financial data for stock price direction predictions
- **Document Analysis Agents**: extract structured insights from annual reports, 10-Ks, proxy statements
- **Financial Analysts**: quantitative analysis — portfolio construction, risk assessment, factor decomposition

Note: The paper does not use the label "CFGPT" for any of these agents. CFGPT refers to a separate financial GPT variant from different research groups.

## Relationship to FinGPT

The GitHub README states FinRobot "surpasses [[sources/fingpt-ai4finance-2024]]'s single-model approach." FinGPT is embedded in Layer 2 as the primary financial NLP/sentiment component. FinRobot adds the orchestration layer on top. The evolution:

```
FinGPT (2023) — single LoRA fine-tuned model, sentiment + NLP tasks
  → FinRobot (2024) — multi-agent orchestration, CoT decomposition, pluggable backends
```

## Key Confirmed Facts

- **License**: Apache-2.0 (confirmed from GitHub; not MIT — a prior stub had this ambiguous; the paper uses an "MIT education license" disclaimer for academic use only, but the repo license file is Apache-2.0)
- **Submission date**: 2024-05-23; arXiv ID 2405.14767
- **Authors**: 11 listed, led by Hongyang Yang and Christina Dan Wang (AI4Finance Foundation / Columbia / NYU Shanghai)
- **GitHub stars**: ~7,100 (2026-05-29)
- **Community**: >1,000 developers on Discord (per project README)
- **Published use-case**: automated equity research report (15+ chart types, HTML/PDF output, DCF projections, peer comparison)

## Owner-Intel Note (from [[synthesis/ai-quant-trading-architecture-improvements]])

FinRobot is the **architectural lineage** for the `trader` agent's brain-layer design. The synthesis page §0 explicitly names FinRobot as the skeleton. The critical constraint from §4.6: **FinRobot's LLM agents must never call the order API directly** — all outputs flow through `risk_gate` → `execution_sdk`. FinRobot is the brain; circuit breakers and volatility targeting stay in deterministic Python code outside the agent's scope.

## See Also

- [[entities/finrobot]] — entity page with architecture summary and trader-agent mapping
- [[sources/fingpt-ai4finance-2024]] — single-model predecessor source page
- [[sources/agent-frameworks-2025-snapshot]] — CrewAI/LangGraph/AutoGen as FinRobot alternatives
- [[synthesis/ai-quant-trading-architecture-improvements]] — §0 baseline; §4.6 trading guardrails
- [[concepts/domain-specific-llm-agents]] — FinRobot as concrete instantiation
- [[concepts/tiered-inference]] — Smart Scheduler implements this pattern
- [[concepts/llm-as-feature-engineer]] — recommended role for FinRobot outputs in the `trader` stack
- [[concepts/agentic-provenance]] — CoT traces should carry provenance for audit
- [[entities/qlib]] — execution/backtest layer downstream of FinRobot brain outputs
