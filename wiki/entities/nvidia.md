---
type: entity
tags: [nvidia, ai, gpu, hardware, vendor, hackathon]
---

# NVIDIA Corporation

US semiconductor and AI infrastructure company (NASDAQ: NVDA). Founded 1993 by Jensen Huang, Chris Malachowsky, Curtis Priem. Headquarters Santa Clara, CA. By 2025 the world's most valuable public company by market cap, driven by data-center GPU demand (H100/H200/B200/GB200) and the CUDA software moat.

## Role in this wiki

NVIDIA touches multiple domains in this knowledge base:

- **AI / agents** — [[concepts/nemotron]] is NVIDIA's open reasoning model family; [build.nvidia.com](https://build.nvidia.com) hosts free-tier NIM endpoints used for the GTC Taipei 2026 hackathon
- **Space computing** — H100 carried on Starcloud-1 ([[entities/starcloud]]) is the first GPU to train an LLM in orbit
- **Radiation reliability** — Aitech S-A2300 (NVIDIA **Orin** module) passed TID test May 2025 at 10 krad bare / 20 krad with Al shielding; H100 ECC covers HBM3 + caches but offers no TID/SEL protection — see [[concepts/cots-gpu-radiation-risk]]
- **Agentic stack** — NIM + NeMo + Nemotron + AI Blueprints positioned as full-stack alternative to OpenAI/Anthropic for self-hosted agents

## Key products relevant to this wiki

| Product | Type | Relevance |
|---|---|---|
| Nemotron family | Open LLM | Reasoning core, mandatory for GTC Taipei 2026 — see [[concepts/nemotron]] |
| NIM (NVIDIA Inference Microservices) | Hosted inference | Free dev-tier endpoints at build.nvidia.com |
| NeMo | Training/fine-tuning framework | Used for Nemotron post-training |
| CUDA / cuDNN | GPU compute | Underlies all training; also used in [[concepts/dpd-digital-predistortion]] NN-DPD |
| H100 / H200 | Data-center GPU | Hopper architecture; H100 in Starcloud orbit experiment |
| Jetson Orin | Edge AI module | Aitech S-A2300 rad-tested variant for space |
| B200 / GB200 | Data-center GPU | Blackwell architecture (2024–2025); powers Nemotron 3 training |

## GTC Taipei 2026 — Agent Challenge

NVIDIA's first major **Taiwan-hosted** GTC. Hackathon track requires Nemotron as the reasoning core. See [[sources/nvidia-agent-challenge-2026]] for deadline + rules. Entry vector for [[entities/sampras]]'s [[entities/jamia-gpt]] / [[entities/spacesharks-gpt]] port from GPT-4 to Nemotron-based agent stack. <!-- deduped → [[sources/nvidia-agent-challenge-2026]] -->

## Local Agent Hardware

- [[concepts/dgx-spark]] -> local reasoning workstation context for [[concepts/nemotron]], [[concepts/hermes-agent-framework]], and [[concepts/nemoclaw]] demos.
- [[concepts/openvino]] -> non-NVIDIA edge-inference comparison point from [[entities/raymond-lo]]'s Intel career path.

## People

- [[entities/raymond-lo]] — Developer Advocate Manager, Robotics and Embedded Devices (Oct 2025–). Joined from Intel (OpenVINO Global Lead Evangelist); earlier CTO of Meta AR (the AR-glasses company), Google Cloud AI, Samsung NEXT. PhD U Toronto under Steve Mann. Edge AI / Jetson Orin / LeRobot focus.

## Related

- [[concepts/dgx-spark]]
- [[concepts/nemotron]]
- [[concepts/hermes-agent-framework]]
- [[concepts/nemoclaw]]
- [[concepts/openvino]]
- [[concepts/cots-gpu-radiation-risk]]
- [[entities/starcloud]]
- [[sources/nvidia-agent-challenge-2026]]

## Sources

- https://www.nvidia.com
- https://build.nvidia.com
- https://developer.nvidia.com/nemotron
- https://huggingface.co/nvidia
