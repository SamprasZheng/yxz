---
type: source
title: "Raymond Lo — HackMD profile"
author: "Raymond Lo"
date: "2026-05-24"
ingested: "2026-05-24"
tags: [person, hackmd, openvino, edge-ai, nvidia, jetson, source-stub]
---

# Raymond Lo — HackMD profile

URL: [hackmd.io/@raymondlo84](https://hackmd.io/@raymondlo84)

Entity page: [[entities/raymond-lo]].

## Ingest status

This is a **profile-level source stub**, not a full content ingest. HackMD's `/@<user>` profile page is a single-page React app — the per-note catalog is rendered client-side and is not visible to WebFetch / crawlers without authentication. Direct fetch of `hackmd.io/@raymondlo84` returns only the HackMD shell HTML, no note list.

What I CAN confirm externally about Raymond Lo's writing footprint is captured on [[entities/raymond-lo]]:

- Medium series (~241 followers) covering OpenVINO local LLMs (Llama 3.1, Whisper, gpt-oss), Agentic RAG with OpenVINO + LlamaIndex, Jetson Orin beginner guides, LeRobot SO101 setup
- GitHub `raymondlo84` — 51 repos; OpenVINO notebooks contributor; CVPR 2022 archive

## To finish this ingest

Provide direct HackMD note URLs (e.g. `hackmd.io/@raymondlo84/<slug>`) for any notes worth individual source pages. Each note that adds at least one concrete fact, framework, or benchmark not already in the wiki should be ingested as its own `sources/raymond-lo-<topic>-<year>.md`.

Candidate adjacent concept pages once notes are ingested (not yet created — would be stubs without content):

- **OpenVINO** — Intel's edge-inference optimization toolkit. Likely worth a concept page once 2+ Raymond Lo notes reference it concretely.
- **Jetson Orin** — currently mentioned only in [[concepts/cots-gpu-radiation-risk]] via the rad-tested Aitech S-A2300; would benefit from a dedicated concept page if his notes cover Jetson workflows in depth.
- **LeRobot** — Hugging Face's robotics framework; new domain for this wiki.

## Cross-references

- [[entities/raymond-lo]] — full bio + career arc
- [[entities/nvidia]] — current employer (Oct 2025–); Developer Advocate Manager, Robotics and Embedded Devices
- [[sources/nvidia-agent-challenge-2026]] — NVIDIA event context
- [[concepts/cots-gpu-radiation-risk]] — overlapping Jetson Orin angle
- [[concepts/domain-specific-llm-agents]] — overlapping edge-local LLM philosophy
