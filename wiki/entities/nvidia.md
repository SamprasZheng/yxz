---
type: entity
tags: [nvidia, ai, gpu, hardware, vendor, hackathon]
---

# NVIDIA Corporation

US semiconductor and AI infrastructure company (NASDAQ: NVDA). Founded 1993 by Jensen Huang, Chris Malachowsky, Curtis Priem. Headquarters Santa Clara, CA. By 2025–2026 the world's most valuable public company — market cap crossing **~$5 trillion** in 2026 — driven by data-center GPU demand (H100/H200/B200/GB200) and the CUDA software moat.

## Scale & structural position (layer-up)

NVIDIA is the **single upstream node beneath every technical domain in this wiki** — the reason it earns a full entity page rather than a passing mention. AI (Nemotron + NIM), orbital compute (H100 on [[entities/starcloud]]), radiation reliability (Orin TID), and even RF signal processing (CUDA NN-DPD) all resolve back to one company's silicon + software stack. That concentration is itself the story: a would-be six-region compute supply chain has, at the accelerator+software layer, collapsed to a near-monopoly.

- **Financials (layer-down):** FY2025 (ended Jan 2025) revenue **$130.5B**, of which **Data Center ≈$115.2B (~88%)**, Gaming ≈$11.4B (~9%), Pro-Vis ≈$1.9B, Automotive ≈$1.7B — i.e. NVIDIA is now overwhelmingly an AI-datacenter company with a legacy gaming tail. Gross margins in the ~70–75% band reflect the CUDA lock-in, not just the hardware.
- **The moat is software, not the die.** Competitors (AMD MI300/MI400, Google TPU, AWS Trainium, Huawei Ascend) match or approach raw FLOPS; what they cannot cheaply clone is ~18 years of **CUDA / cuDNN / TensorRT / NCCL / Triton** plus the framework ecosystem trained against it. This is the same "process/qualification moat, not product moat" pattern the wiki tracks in [[synthesis/radiation-test-rad-hard-six-region|rad-hard qualification]] and [[entities/win-semiconductors|Taiwan RF foundries]] — accumulated, not fast-cloned.

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

## Lineage & forward trajectory (拉長時間軸)

NVIDIA's arc is a **30-year pivot from a graphics-card maker into the utility layer of the AI economy** — the relevant lineage for understanding why one company sits under every domain here.

| Era | Milestone | Significance |
|---|---|---|
| 1993 | Founded (Huang / Malachowsky / Priem) | Bet on the 3D-graphics accelerator before the market existed |
| 1999 | GeForce 256 marketed as "the world's first GPU" | Coins the term; fixed-function → programmable pipeline begins |
| 2006 | **CUDA** released | Turns the GPU into a general parallel computer — the moat's foundation stone |
| 2012 | AlexNet trained on 2× GTX 580 | The accidental proof that GPUs = deep learning; NVIDIA leans in |
| 2016 | DGX-1 + Pascal P100; first deep-learning datacenter box | Pivot from consumer to datacenter |
| 2020 | Ampere A100 (Covid-era AI build-out) | Becomes the training workhorse |
| 2022 | Hopper H100 + the LLM boom (ChatGPT Nov 2022) | Demand goes vertical; H100 becomes a strategic asset |
| 2024 | Blackwell B200/GB200; ~$3T→ market cap | Rack-scale (NVL72) systems, not chips |
| **2026** | Blackwell ramp "off the charts"; **Vera Rubin** (successor) targeted **H2 2026**; ~$5T market cap; Nemotron 3 family | Annual-cadence roadmap; open-weight models as an ecosystem funnel |

**Forward (labelled scenario, not fact):** the near-term trajectory is an **annual architecture cadence** (Blackwell → Rubin → post-Rubin) with the value migrating from the chip to the **rack, the interconnect (NVLink/Spectrum-X), and the software SLA (NIM)**. The ~100-year structural question is whether accelerated compute stays a **CUDA-locked single-vendor utility** or commoditises the way x86 servers did — undercut from below by open ISAs, custom ASICs (TPU/Trainium/Ascend), and sovereign compute programs. The binding physical ceilings the wiki tracks elsewhere — power and **σT⁴ heat rejection** ([[synthesis/orbital-data-center-six-region]]), advanced-node lithography, and HBM supply ([[concepts/cots-gpu-radiation-risk]]) — bound NVIDIA too: it designs, it does not fab or make memory (see six-region below).

## Six-region position — the compute supply chain behind NVIDIA (台美日韓中國歐洲)

NVIDIA is a **US company**, but "an NVIDIA GPU" is a six-region artifact. The meaningful horizontal axis is **where each region sits in the stack that produces and consumes NVIDIA silicon** — the same upstream/midstream/downstream frame as [[synthesis/leo-taiwan-odc-gap]], now applied to compute. (This page points to the fuller maps rather than duplicating them.)

| Region | Role in the NVIDIA compute stack |
|---|---|
| **US** | Chip **design** + CUDA software moat + system integration (NVIDIA itself); the closed-frontier + open-funnel model layer ([[concepts/nemotron]]) — see [[synthesis/open-weight-llm-agent-stack-six-region]] |
| **Taiwan** | **Manufacturing keystone** — TSMC fabs the GPUs (advanced nodes), and OSAT/CoWoS advanced packaging is the actual 2024–26 bottleneck; the same "indispensable-midstream-fab, no sovereign design" position as the rest of the [[synthesis/phased-array-rf-frontend-supply-chain|Taiwan supply-chain]] map |
| **Korea** | **HBM memory** upstream (SK hynix lead, Samsung) — the co-binding scarcity alongside CoWoS; whoever controls HBM co-gates every accelerator |
| **Japan** | Materials + equipment (photoresist, silicon, test) upstream; substrate supply |
| **China** | **Sanction-walled** — export controls (A100→H20→banned) push demand onto domestic **Huawei Ascend**; the one region actively de-coupling from the NVIDIA stack, mirroring the sovereign-by-sanction pattern in [[synthesis/radiation-test-rad-hard-six-region]] and [[synthesis/open-weight-llm-agent-stack-six-region]] |
| **Europe** | Downstream consumer + sovereign-compute buyer (Jupiter exascale, national AI factories); no accelerator design at scale |

**Durable finding:** the compute supply chain is the **sharpest instance of the wiki's recurring signature** — a US-design / Taiwan-build / Korea-memory / China-sanction-walled split, with the value concentrated at the US software layer. Taiwan is again *indispensable-midstream-but-not-sovereign*; China is again *sovereign-by-sanction*.

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
- [[synthesis/open-weight-llm-agent-stack-six-region]] — where NVIDIA's Nemotron sits vs the China-led open-weight frontier
- [[synthesis/orbital-data-center-six-region]] — the σT⁴/power ceilings that bound NVIDIA-in-orbit
- [[synthesis/leo-taiwan-odc-gap]] — the upstream/midstream/downstream frame this page applies to compute
- [[synthesis/phased-array-rf-frontend-supply-chain]] — sibling Taiwan-fab/US-design supply-chain map

## Sources

- https://www.nvidia.com
- https://build.nvidia.com
- https://developer.nvidia.com/nemotron
- https://huggingface.co/nvidia
- NVIDIA FY2025 results (Data Center $115.2B of $130.5B) — https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025
- FY2027 Q1 record-quarter + Blackwell/Rubin roadmap (retrieved 2026-07-02) — https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2026
- ~$5T market-cap milestone (2026 reporting)
