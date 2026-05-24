---
type: source
tags: [llm-agent, satellite-operations, RAG, mission-ops, competitive-intel]
title: "LLM based expert AI agent for mission operation management"
author: "Sobhana Mummaneni, Syama Sameera Gudipati, Satwik Panda"
date: "2025-03-31"
ingested: "2026-05-24"
---

# LLM Based Expert AI Agent for Mission Operation Management

**Journal:** Informatyka, Automatyka, Pomiary w Gospodarce i Ochronie Środowiska (IAPGOS)

**Volume/Issue:** Vol. 15 No. 1 (2025), pp. 88–94

**DOI:** https://doi.org/10.35784/iapgos.6694

**Affiliation:** Velagapudi Ramakrishna Siddhartha Engineering College, Department of Computer Science and Engineering, Vijayawada, India

## Key Claims (verified from journal page + PDF download)

1. **Core proposal**: "leveraging large language models to create an intelligent assistant for spacecraft operations" targeting "data analysis for pattern recognition, operational planning, and document summarisation."

2. **Addressed limitations**: Dependency on ground-based control and manual processes; "mission operation management is the coordination and control of various activities related to the operation of a satellite."

3. **RAG integration**: Retrieval Augmented Generation (RAG) cited as the core supporting mechanism for context injection from telemetry datasets and documentation.

4. **Offline-capable design**: "The system is designed to operate offline, providing flexibility in deployment" — notably contrasting with cloud-dependent hyperscaler approaches.

5. **Scope**: Framed as an assistant for "space agencies and research organizations" to "reduce mission expenses while improving outcomes." No enterprise ground-station integration layer described.

⚠️ **MCP and ReAct NOT mentioned**: Unlike [[sources/developing-ai-agents-satellite-ops-2025]], this paper does not discuss Model Context Protocol or ReAct agent patterns. The owner's intel briefing implied both papers share these features — this is INCORRECT for this paper. MCP/ReAct are present only in the Journal of Space Operations paper.

⚠️ **Venue clarification**: The owner's briefing stated this appeared in an "IEEE journal." The actual venue is IAPGOS, a Polish engineering journal indexed in Scopus/Web of Science, NOT IEEE. This is an important correction.

## Assessment

This is an early-stage academic proposal paper, not a systems build paper. The contribution is conceptual (apply LLM + RAG to mission ops) rather than architectural. The Journal of Space Operations paper ([[sources/developing-ai-agents-satellite-ops-2025]]) is significantly more technically mature.

## See Also

- [[concepts/llm-satellite-operations-landscape]] — competitive landscape
- [[sources/developing-ai-agents-satellite-ops-2025]] — more technically mature companion paper
- [[concepts/domain-specific-llm-agents]] — methodology framing
