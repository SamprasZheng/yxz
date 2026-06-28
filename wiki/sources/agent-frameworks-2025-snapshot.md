---
type: source
tags: [ai, agents, crewai, autogen, langgraph, multi-agent, framework, oss]
title: "Agent Framework Snapshot 2026 — CrewAI / AutoGen / LangGraph"
author: "crewAIInc / Microsoft / LangChain-AI (multi-repo snapshot)"
date: "2026-05-29"
ingested: "2026-05-29"
---

# Agent Framework Snapshot — CrewAI / AutoGen / LangGraph (May 2026)

A single source page covering the three orchestration frameworks the briefing proposed for the brain layer. These are **generic** multi-agent frameworks (not finance-specific); a quant trading crew is built by writing financial tools and wiring agents on top.

## CrewAI

- **Repo**: [github.com/crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) · ~31k–44k stars (varies by source, 2026); fastest-growing of the three.
- **Model**: role-playing "crew" — each agent has a role / backstory / goal; assemble into a crew with tasks.
- **Strength**: lowest barrier to a visible result; the briefing's Research-Agent / Risk-Agent / Portfolio-Agent split maps cleanly onto CrewAI roles. **Recommended starting point** for the office-worker low-frequency profile.

## LangGraph

- **Repo**: [github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) · ~12k+ stars (2026).
- **Model**: explicit **directed graph** (state machine / DAG) with state persistence and reducer logic for concurrent updates.
- **Strength**: precise control over execution order, branching, and error recovery — stops agents looping forever. The briefing's rigid "[fetch news] → [judge bad-news] → [technical screen + stop-loss] → [risk-pass: execute]" workflow is a LangGraph use case.

## AutoGen — ⚠️ maintenance mode

- **Repo**: [github.com/microsoft/autogen](https://github.com/microsoft/autogen) · Microsoft Research; pioneered multi-agent *conversation* patterns.
- **Status correction**: as of ~April 2025 AutoGen is in **maintenance mode** — the README now points new users to the **Microsoft Agent Framework** (the successor that merges AutoGen + Semantic Kernel). New builds should prefer Agent Framework or one of the above, not vanilla AutoGen.

## Decision lens (debug-ability / control)

| Need | Pick |
|---|---|
| Fastest to a working crew, role metaphor | CrewAI |
| Strict workflow, no infinite loops, auditable state | LangGraph |
| New Microsoft-stack project | Microsoft Agent Framework (AutoGen successor) |

This page only gives selection trade-offs; the architecture page [[synthesis/ai-quant-trading-architecture-improvements]] §3.4 lists framework choice as an open governance question, and §4.6 forbids any of them from calling the order API directly.

## See Also

- [[synthesis/ai-quant-trading-oss-stack-selection]] — §3 agent frameworks
- [[sources/finrobot-ai4finance-2024]] — a finance-specific agent platform built on these ideas
- [[synthesis/ai-quant-trading-architecture-improvements]] — §3.4 agent-governance open question
- [[concepts/agentic-provenance]] — trace/audit every agent decision
