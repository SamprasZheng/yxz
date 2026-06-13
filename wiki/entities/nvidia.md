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
| N1X / N1 | Client Arm PC SoC | NVIDIA+MediaTek Windows-on-Arm laptop chip (Computex 2026) — see [[entities/nvidia-n1x]] |

## GTC Taipei 2026 — Agent Challenge

NVIDIA's first major **Taiwan-hosted** GTC. Hackathon track requires Nemotron as the reasoning core. See [[sources/nvidia-agent-challenge-2026]] for deadline + rules. Entry vector for [[entities/sampras]]'s [[entities/jamia-gpt]] / [[entities/spacesharks-gpt]] port from GPT-4 to Nemotron-based agent stack. <!-- deduped → [[sources/nvidia-agent-challenge-2026]] -->

## Local Agent Hardware

- [[concepts/dgx-spark]] -> local reasoning workstation context for [[concepts/nemotron]], [[concepts/hermes-agent-framework]], and [[concepts/nemoclaw]] demos.
- [[concepts/openvino]] -> non-NVIDIA edge-inference comparison point from [[entities/raymond-lo]]'s Intel career path.

## People

- [[entities/raymond-lo]] — Developer Advocate Manager, Robotics and Embedded Devices (Oct 2025–). Joined from Intel (OpenVINO Global Lead Evangelist); earlier CTO of Meta AR (the AR-glasses company), Google Cloud AI, Samsung NEXT. PhD U Toronto under Steve Mann. Edge AI / Jetson Orin / LeRobot focus.

## Equity / valuation profile (NVDA)

*Public valuation framing only — no investment recommendation. Figures as of 2026-05-29 (stockanalysis.com/stocks/nvda/statistics/) unless otherwise noted.*

### Snapshot (2026-05-29)

| Metric | Value | Notes |
|---|---|---|
| Market cap | ~$5.11 trillion | Largest public company by market cap at date |
| Trailing P/E (TTM) | 32.3× | On GAAP TTM EPS ~$6.56; source: stockanalysis.com |
| Forward P/E | 21.2× | On FY2027 consensus EPS; source: stockanalysis.com |
| PEG ratio | 0.48 | Forward P/E ÷ long-run EPS growth est.; source: stockanalysis.com |
| EV/Sales (TTM) | 20.0× | source: stockanalysis.com |
| EV/EBITDA | 30.6× | source: stockanalysis.com |
| Price/Sales | 20.2× | source: stockanalysis.com |

NVDA's forward P/E (21×) is 34% below the Semiconductors industry median of 36× as of May 2026, and roughly 40% below NVDA's own 10-year trailing-P/E average of ~54× (fullratio.com, 2026-05-31). A widely discussed market observation is that consensus EPS estimates have repeatedly grown faster than the share price, mechanically *compressing* the forward multiple even as absolute price rose — the trailing P/E peaked above 138× in April 2023 at a share price of ~$27, then compressed to 80× (2024), 47× (2025), and ~32× (2026) as earnings scaled dramatically. This is a general market-structure observation about earnings outpacing price appreciation; it does not constitute a valuation call.

### Revenue concentration (Q1 FY2027, reported 2026-05-20)

NVIDIA reported Q1 FY2027 total revenue of **$81.6 billion** (+85% YoY). Data Center revenue was **$39.1 billion**, representing approximately **87% of total revenue** (+69% YoY; source: intellectia.ai / NVIDIA newsroom 2026-05-20). Microsoft, Amazon, Google, and Meta Platforms collectively represent a significant portion of revenue; NVIDIA does not publish a formal customer-concentration percentage in quarterly press releases. The dependence on a small number of hyperscaler AI capex cycles is cited in multiple analyst notes as a key concentration risk. See [[sources/trendforce-csp-capex-asic-2026]] for the broader picture of top-8 CSP capex (>$710 billion in 2026, +61% YoY) and the rising custom-ASIC share (27.8%). See [[concepts/asic-penetration-indicator]] for monitoring methodology.

### Public valuation risks (bear case)

| Risk | Mechanism | Related page |
|---|---|---|
| Custom-ASIC substitution | Google TPU (~78% of ASIC share), Trainium (Amazon), MTIA (Meta) displacing GPU workloads over time | [[concepts/asic-penetration-indicator]] |
| Inference-cost deflation | 280× inference cost decline (Nov 2022–Oct 2024 per Stanford HAI 2025); commoditisation pressure on premium GPU pricing | [[concepts/ai-inference-cost-economics]] |
| China export restrictions | H20 ban enacted April 9, 2025 → ~$8 billion Q2 FY2026 revenue headwind; Jensen Huang stated NVIDIA will exclude China from forward guidance (CNN, 2025-06-12); China represented >$17B in sales in calendar 2024 | — |
| Hyperscaler capex digestion | CSP build-out can pause between upgrade cycles; one-quarter demand softness has historically caused large multi-day drawdowns | [[sources/trendforce-csp-capex-asic-2026]] |
| Single-product-cycle dependence | Hopper → Blackwell → Rubin upgrade cadence; delays or yield issues (see [[concepts/hbm-yield-ramp-indicator]], [[concepts/liquid-cooling-leadtime-indicator]]) can shift revenue recognition quarters | — |

**Bull case (brief balance):** NVIDIA's CUDA software moat, multi-year enterprise pipeline expansion (sovereign AI, robotics, automotive), and recurring NIM/software revenue layer provide structural reasons the multiple may re-rate upward. The PEG of 0.48 implies the market is pricing in substantial forward earnings growth. See [[synthesis/us-equity-secondary-variable-dashboard]] for the broader secondary-variable monitoring framework relevant to AI-infrastructure stocks.

## Related

- [[concepts/dgx-spark]]
- [[concepts/nemotron]]
- [[concepts/hermes-agent-framework]]
- [[concepts/nemoclaw]]
- [[concepts/openvino]]
- [[concepts/cots-gpu-radiation-risk]]
- [[entities/starcloud]]
- [[entities/nvidia-n1x]]
- [[sources/nvidia-agent-challenge-2026]]
- [[concepts/asic-penetration-indicator]]
- [[concepts/ai-inference-cost-economics]]
- [[concepts/hbm-yield-ramp-indicator]]
- [[concepts/liquid-cooling-leadtime-indicator]]
- [[sources/trendforce-csp-capex-asic-2026]]

## Sources

- https://www.nvidia.com
- https://build.nvidia.com
- https://developer.nvidia.com/nemotron
- https://huggingface.co/nvidia
