---
type: source
tags: [llm-agent, satellite-operations, ReAct, MCP, digital-twin, competitive-intel, ground-station]
title: "Developing AI Agents for Satellite Operations"
author: "Unknown (ResearchGate author names not indexed)"
date: "2025-07-01"
ingested: "2026-05-24"
---

# Developing AI Agents for Satellite Operations

**Journal:** Journal of Space Operations & Communicator (ISSN 2410-0005), Vol. 21 No. 3, 2025

**DOI / URL:** https://www.researchgate.net/publication/393231850_Developing_AI_Agents_for_Satellite_Operations

⚠️ **Author names** not extractable from ResearchGate stub (403 access); the journal is the official publication of the Space Operations Technical Committee. Exact author attribution is UNCONFIRMED.

## Key Claims (from indexed abstract + search-engine-rendered snippets)

1. **MCP as ground-enterprise standard**: "AI-centric ground enterprise services with standard API and message format, such as the model-context-protocol (MCP), to facilitate communication between agents and ground system components." The MCP framing is presented as a proposed architecture direction, not a deployed production system.

2. **ReAct agent for telemetry monitoring**: Section 3 of the paper "discusses the structure of ReAct agents in monitoring telemetry data and log messages, as well as the chatbot agent for user-agent interfaces." The ReAct pattern (Reason + Act) is applied to parse anomaly telemetry streams.

3. **Satellite Digital Twin (SDT)**: The paper introduces the SDT concept as "a feedback layer that enables humans in the feedback loop to review actions and feedback, fostering reinforcement learning with human feedback (RLHF) to enhance the agent's reasoning abilities." SDT is positioned as a human-oversight mechanism rather than a physics-first simulation.

4. **RAG for domain knowledge**: Retrieval-augmented generation is integrated with the ReAct agent "to provide satellite domain knowledge as context for the LLM query to reduce hallucinations."

5. **Agent scope**: Agents "leverage existing components in ground systems by sending requests to activate specific command procedures, using standard APIs and message formats." The architecture is ground-system integration, not on-board AI.

## Relevance to Spacesharks Mission Desk

This paper is the closest published academic analogue to [[synthesis/spacesharks-mission-desk-hackathon-plan]]. It confirms that the concept of LLM + MCP + telemetry + digital twin for satellite ops has reached peer-reviewed publication status (July 2025). Key gaps the paper does NOT address that Spacesharks does:

- No lifecycle-axis fusion (pre-launch / commissioning / EOL taxonomy)
- No external NOTAM / CDM / SWPC integration — scope is internal telemetry only
- No labeled dataset moat / event schema
- No operator-decision action verbs — framed as monitoring / summarisation

## See Also

- [[concepts/llm-satellite-operations-landscape]] — competitive landscape overview
- [[concepts/satellite-digital-twin]] — SDT concept deep-dive
- [[sources/llm-expert-agent-mission-ops-2025]] — companion paper from same batch
- [[concepts/domain-specific-llm-agents]] — methodology context
