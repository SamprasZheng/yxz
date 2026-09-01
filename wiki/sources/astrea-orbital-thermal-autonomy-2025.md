---
type: source
tags: [llm-agent, satellite-operations, on-board-autonomy, thermal-control, reinforcement-learning, iss, europe, thales-alenia-space, edge-llm, flown-in-orbit]
title: "ASTREA: Introducing Agentic Intelligence for Orbital Thermal Autonomy"
author: "Alejandro D. Mousist (Thales Alenia Space)"
date: "2025-09-16"
ingested: "2026-09-01"
---

# ASTREA — Agentic Intelligence for Orbital Thermal Autonomy (arXiv 2509.13380)

Primary source for the **first agentic LLM system executed on flight-heritage hardware (TRL 9)** for autonomous spacecraft operations — flown **on-orbit aboard the International Space Station (ISS)**. It is the load-bearing new datapoint that tests the "Europe = on-board autonomy but *no LLM layer*" archetype in [[synthesis/llm-satellite-operations-six-region]].

- **Paper:** *ASTREA: Introducing Agentic Intelligence for Orbital Thermal Autonomy*, arXiv [2509.13380](https://arxiv.org/abs/2509.13380) (v1 2025-09-16, v2 2025-10-11).
- **Author / affiliation:** Alejandro D. Mousist, **Thales Alenia Space** (European Franco-Italian prime; the ESA/CNES-anchored on-board-autonomy prime referenced across the Europe rows of the corpus — the same institutional lineage as [[entities/aiko-space|AIKO]]'s Thales Alenia Space partnership). Single-author preprint.
- **Subject classes:** Robotics, AI, Machine Learning, Multi-agent Systems, Systems & Control.

## What it is

ASTREA integrates a **resource-constrained LLM agent** with a **reinforcement-learning controller** in an **asynchronous architecture** tailored for space-qualified platforms, using **thermal control** as the representative subsystem. The LLM provides *semantic-reasoning supervision* over an adaptive RL controller — a "supervisor + controller" split rather than an LLM directly issuing low-level actuator commands.

- **Model:** a quantized **Qwen2.5-1.5B (4-bit)** edge LLM — chosen to balance reasoning against the compute/thermal budget of a space-qualified edge processor (per the paper's literature-review summary; the base is an open-weight Chinese model, see [[synthesis/open-weight-llm-agent-stack-six-region]]).
- **Architecture:** asynchronous — the slow LLM supervisor runs on a different cadence from the fast RL control loop, so LLM inference latency does not block real-time control. This asynchrony is the paper's key space-systems contribution.

## Results

- **Ground:** LLM-guided supervision **improves thermal stability and reduces constraint violations**, confirming feasibility of combining semantic reasoning with adaptive control under hardware constraints.
- **On-orbit (ISS):** the first run **failed to beat baseline** because LLM inference latency was misaligned with the **rapid thermal cycles of a LEO orbit** (~90-minute period). After **synchronizing the agent's decision cadence to the orbit length**, ASTREA **surpassed the baseline** — reduced violations, extended episode durations, improved CPU utilization. The honest "first attempt lost, tuned attempt won" reporting is itself a useful datapoint on the real latency wall for on-orbit LLM agents.

## Why it matters (for the cluster)

1. **First flown agentic-LLM for live subsystem control.** Distinct from the many *proposal-only* papers in [[concepts/llm-satellite-operations-landscape]] (Journal of Space Ops, IAPGOS — architecture proposals, no deployment). ASTREA is TRL 9, flown, with real telemetry — it *actually controls a live subsystem in orbit*.
2. **It came from Europe (Thales Alenia Space), not the US defense stack.** This nuances the six-region map: the first on-orbit LLM-ops-agent is European and civil-agency-adjacent, not a US classified SDA copilot. See the Europe-row reconciliation in [[synthesis/llm-satellite-operations-six-region]].
3. **The latency wall is the real constraint, not model capability.** ASTREA's ISS result shows the binding limit for on-orbit LLM agents is *inference cadence vs orbital dynamics*, echoing the σT⁴/compute-budget constraints in [[synthesis/orbital-data-center-six-region]] and the edge-compute radiation limits in [[concepts/cots-gpu-radiation-risk]].

## Contrast with the US civil equivalent

The near-simultaneous US analog is [[sources/navi-orbital-vlm-earth-obs-2026]] (NASA JPL, first in-orbit **VLM** for Earth-observation tasking, 2026-04-16). ASTREA = **control-loop supervision** (thermal); NAVI-Orbital = **perception/tasking + dialogue** (imagery). Together they mark 2025-09 → 2026-04 as the window when agentic LLM/VLM systems first *flew* rather than being proposed.

## See also

- [[synthesis/llm-satellite-operations-six-region]] — six-region map; ASTREA is the Europe-row falsifier-nuance
- [[concepts/llm-satellite-operations-landscape]] — the proposal-vs-flown academic frontier
- [[sources/navi-orbital-vlm-earth-obs-2026]] — the near-simultaneous US (NASA JPL) in-orbit VLM
- [[entities/aiko-space]] — Europe's other on-board-autonomy actor (deep-learning, no LLM) — ASTREA is the LLM-layer Europe was said to lack
- [[concepts/satellite-digital-twin]] — where on-board reasoning sits in the SDT stack
