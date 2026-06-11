---
type: concept
tags: [satellite-netops, llm-agents, multi-agent, aerospace, network-operations, satops, 6G-NTN, satellite-communications, spacesharks]
---

# Satellite NetOps Agents — LLM Agents for Satellite Network Operations

## The core distinction: NetOps vs SatOps

Satellite operations research divides into two largely siloed bodies of work that are only beginning to converge:

| Dimension | **SatOps** (Satellite Platform Operations) | **NetOps** (Satellite Network Operations) |
|---|---|---|
| Domain | Spacecraft bus, orbit, attitude, power, thermal, propulsion | RF spectrum, carrier assignment, cell configuration, interference, routing |
| Lifecycle scope | Pre-launch → commissioning → on-orbit → EOL | Continuous while the payload is active (on-orbit + ground segment) |
| Decision actors | Mission operations engineers, AOCS team | Network operations center (NOC), frequency coordinators |
| LLM agent entry point | Anomaly analysis, maneuver recommendation, subsystem triage | Configuration parameter generation, fault diagnosis, resource optimization |
| Commercial buyer | Satellite operator (SATCOM fleet team) | Ground segment integrator, NOC operator |
| Incumbent automation tools | STK, FreeFlyer, GMAT, Systems Tool Kit | NMS platforms (Comstream, iDirect, Hughes NOC tools) |

Most 6G/NTN academic work addresses **NetOps**. Most startup "AI for satellite ops" marketing addresses **SatOps**. The fusion of both — full lifecycle from RF link to orbital mechanics — is where commercial differentiation can be built. See [[synthesis/spacesharks-mission-desk-hackathon-plan]] §3 for how Spacesharks Mission Desk pursues this fusion.

## Published research: satellite NetOps agents

### SCNOC-Agentic (2025) — the most domain-specific paper at ingest time

[[sources/scnoc-agentic-sun-2025]] is the most narrowly targeted paper on the satellite NetOps agent problem. Published in *Electronics* (MDPI) 14(16), 3320, August 2025. Authors: Sun, W.; Sun, C.; Zhang, Y.; Yin, Z.; Kang, Z.

Architecture: four components — intent refinement, multi-agent workflow, long-term memory, and graph-based retrieval (Graph-RAG). Tested on Qwen2.5 family. Four scenarios: network task planning, carrier/cell optimization, fault analysis, satellite management and control.

**Key confirmed result:** qwen2.5-70B improved network task planning parameter generation accuracy from 15.6% to 32.2% with the SCNOC-Agentic framework.

The authors claim this is the first LLM-agent architecture specifically built for the satellite communications NetOps domain. The claim appears defensible — prior arXiv work (2404.09134, 2401.07764, 2410.03688) targeted resource allocation optimization in 6G NTN rather than the network-management-and-control workflow layer.

### Adjacent 6G/NTN LLM-agent work

Several arXiv papers (2024–2025) address LLM agents for 6G networks with NTN (Non-Terrestrial Networks) as a sub-topic:

- **arXiv:2404.09134** — Generative AI Agents with LLM for Satellite Networks via Mixture of Experts Transmission: MoE + RAG for resource allocation optimization. Targets transmission strategy, not operational management.
- **arXiv:2410.03688** — "6G LLM Agents: A Novel Paradigm": broad framework for LLM agents in 6G networks including NTN; planning-focus rather than NetOps-specific.
- **arXiv:2401.07764** — LLM Agents Meet 6G Networks: Perception, Grounding, Alignment: conceptual architecture paper.
- **arXiv:2509.04993** — LLM Multi-Agent System for 6G: Dual-Loop Edge-Terminal Collaboration; focuses on terrestrial edge networks.

None of the arXiv papers listed above specifically target satellite *network operations and control* as SCNOC-Agentic does. They address the problem one layer up (resource allocation, routing optimization) rather than the operational configuration and fault-management layer.

### SatOps-focused agent work

A separate body of work addresses the satellite *platform* side:

- *Developing AI Agents for Satellite Operations* (ResearchGate, 2025): LLM + RAG for satellite anomaly resolution and subsystem triage. Uses domain-specific knowledge bases to reduce hallucinations in satellite command generation.
- *Toward Integrated Satellite Operations and Network Management* (MDPI Technologies 2025, DOI 10.3390/technologies13080312): Proposes a CMS (Convergent Management System) framework to bridge SatOps and NetOps gaps, defining three modes — integrated operations, coordinated operations, and adaptive operations.

The CMS paper is architecturally significant: it explicitly names the SatOps/NetOps integration problem as unsolved. SCNOC-Agentic addresses only the NetOps side; the CMS paper addresses the interface; Spacesharks Mission Desk aspires to address both from a lifecycle-event perspective.

## LLM agents for satellite operations: what the landscape looks like as of 2026-05

The following characterisation is derived from the research found at ingest time:

| Layer | Maturity | Who's working on it |
|---|---|---|
| 6G NTN resource allocation + LLM | Active academic research (multiple arXiv papers) | University/industry labs in China, Korea, EU |
| Satellite NetOps (NOC automation) via LLM | Early academic (SCNOC-Agentic is the lead paper) | Likely China-based telecom/satellite labs |
| Satellite SatOps (platform anomaly) via LLM | Early academic + startup pilots | ResearchGate 2025 paper; US/EU-side startups |
| Fusion (lifecycle-wide, SatOps + NetOps) | Not yet published | Spacesharks Mission Desk (owner's hackathon entry) claims this space |
| MCP-standardized aerospace tool access | Early open-source (see [[concepts/mcp-aerospace-applications]]) | Individual developers / small orgs |

## Six-region positioning

The SatOps/NetOps split maps cleanly onto the geographic distribution of ops-AI work (full map: [[synthesis/llm-satellite-operations-six-region]]):

- **NetOps-agent academic lead is China** — [[sources/scnoc-agentic-sun-2025|SCNOC-Agentic]] (Qwen2.5-70B, 15.6%→32.2% task-planning accuracy) is the lead paper, and the broader 6G-NTN agent literature is China/Korea/EU-lab heavy. This sits inside China's **sovereign full-stack autonomy** archetype (domestic compute + Chinese open-weight base + agent), which by 2026-05 extended to autonomous *action* with the "Air Target Agent System" (LLM "brain + tool army" on Huawei Ascend).
- **SatOps-agent + on-board autonomy lead is split US/Europe** — US defense SDA copilots ([[entities/msbai|MSBAI]] etc.) and Europe's [[entities/aiko-space|AIKO]] on-board autonomy.
- **Taiwan** has neither a NetOps nor a SatOps vendor; the owner's [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks]] aims at the *fusion* layer (lifecycle SatOps+NetOps over public signals) precisely because that layer is unclaimed — see §"fusion" row below.

## Relevance to Spacesharks Mission Desk

The [[synthesis/spacesharks-mission-desk-hackathon-plan]] operates at the fusion layer: it ingests both network-layer signals (CDMs, spectrum filings, ITU data) and platform-layer signals (solar weather, TID accumulation, orbital drag) into the same decision loop. SCNOC-Agentic validates the NetOps automation vector; the SatOps papers validate the platform-anomaly vector. Neither prior paper fuses both in a lifecycle-events dataset. That gap is the structural differentiation the owner is building toward.

## See also

- [[sources/scnoc-agentic-sun-2025]] — the primary NetOps agent paper
- [[concepts/mcp-aerospace-applications]] — standardized tool access layer for aerospace LLM agents
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — lifecycle-fusion entry
- [[concepts/hermes-agent-framework]] — agent runtime used in owner's stack
- [[concepts/nemoclaw]] — sandbox runtime used in owner's stack
- [[concepts/llm-satellite-operations-landscape]] — full competitive map: academic papers, commercial vendors, hyperscalers, structural gap table
- [[synthesis/llm-satellite-operations-six-region]] — six-region (台美日韓中國歐洲) ops-AI map; NetOps-agent academic lead is China
