---
type: source
tags: [vlm, llm-agent, satellite-operations, earth-observation, on-board-autonomy, langgraph, gemma, jetson-orin, nasa-jpl, loft-orbital, us, flown-in-orbit]
title: "NAVI-Orbital: First In-Orbit Demonstration of a Zero-Shot Vision-Language Model for Autonomous Earth Observation"
author: "Juan Manuel Delfa Victoria, Taran Cyriac John, et al. (NASA JPL)"
date: "2026-06-15"
ingested: "2026-09-01"
---

# NAVI-Orbital — First In-Orbit Vision-Language-Model Agent (arXiv 2606.18271)

Primary source for the **first in-orbit demonstration of a vision-language model (VLM) performing autonomous multi-modal inference entirely onboard** — a real US (NASA JPL) agentic system flown in orbit. It is the US-side companion datapoint to [[sources/astrea-orbital-thermal-autonomy-2025]] and the key test of "the US LLM-*reasoning* layer for live ops is thin" in [[synthesis/llm-satellite-operations-six-region]].

- **Paper:** *NAVI-Orbital: First In-Orbit Demonstration of a Zero-Shot Vision-Language Model for Autonomous Earth Observation*, arXiv [2606.18271](https://arxiv.org/abs/2606.18271).
- **Authors / affiliation:** Juan Manuel Delfa Victoria (technical lead, AI group at **NASA JPL**) + Taran Cyriac John (originated the concept — a digital assistant for astronauts on the Moon/Mars) + co-authors.
- **Coverage:** [IEEE Spectrum](https://spectrum.ieee.org/nasa-ai-satellite-image-analysis), [TechCrunch (2026-06-15)](https://techcrunch.com/2026/06/15/a-satellite-just-learned-to-find-things-on-its-own-heres-what-that-means/).

## What flew

- **Host:** [Loft Orbital](https://www.loftorbital.com/) **YAM-9** spacecraft (launched **2025-11-28**, ~4-month checkout).
- **Model:** Google DeepMind's **Gemma 3** VLM — the *same open-weight base you can download from Hugging Face*, run **zero-shot** (no fine-tuning on the task dataset).
- **Compute:** on-board **NVIDIA Jetson Orin AGX** — the same edge-GPU family as [[entities/liscotech|LiscoTech's GPGPU100]] (Orin Nano) and the Aitech Orin TID work in [[concepts/cots-gpu-radiation-risk]].
- **Orchestration:** a **graph-based state machine (LangGraph)** coordinating dedicated agents for **detection** and **dialogue** — re-tasked through **plain-English prompts** in place of conventional command sequences. Notably **not** MCP-based — see the flown-vs-MCP note in [[concepts/mcp-aerospace-applications]].

## Live-run results (2026-04-16)

- Two live capture tests: one over **Toulouse, France**, one over the **coast of Argentina**. The VLM classified each scene, produced a text description of its content and feature relationships, and answered operator follow-up in natural-language dialogue.
- **88% accuracy** classifying a benchmark set of **7,960 images**, **zero-shot** (Gemma 3 not trained/fine-tuned on the dataset or its categories).

## Why it matters (for the cluster)

1. **First flown agentic VLM in orbit — and it is US + civil + open-weight.** It nuances the six-region "US owns the moat via classified data" framing: this milestone used a **public open-weight model (Gemma 3)** on a **commercial bus (Loft Orbital)** for **civil EO**, not a classified SDA copilot.
2. **But it is EO-tasking/perception + dialogue, not a bus-flying flight-ops copilot.** So it *sharpens* rather than falsifies the hub's load-bearing claim: the US "thin LLM-*reasoning* layer for *live flight ops*" gap holds — NAVI-Orbital tasks a *sensor*, ASTREA supervises a *control loop*, but neither is a full lifecycle copilot flying the spacecraft.
3. **Zero-shot open-weight on a $-class edge GPU** is the democratization signal in [[synthesis/llm-satellite-operations-six-region]]'s optimistic 100-year fork — capable agentic perception now runs on a downloadable model on commodity edge silicon in orbit.

## See also

- [[synthesis/llm-satellite-operations-six-region]] — six-region map; NAVI-Orbital is the US-row flown datapoint
- [[sources/astrea-orbital-thermal-autonomy-2025]] — the near-simultaneous Europe (Thales Alenia Space) in-orbit LLM control-supervisor
- [[concepts/llm-satellite-operations-landscape]] — the proposal-vs-flown academic frontier
- [[concepts/mcp-aerospace-applications]] — why flown agents (LangGraph) have not yet adopted MCP
- [[concepts/cots-gpu-radiation-risk]] — the Jetson Orin edge-GPU radiation ledger this rides on
- [[entities/liscotech]] — the Taiwan Orin-class flown edge-compute counterpart
