---
type: entity
tags: [satellite-operations, on-board-ai, anomaly-detection, mission-autonomy, competitive-intel, ESA]
---

# AIKO (Autonomous Intelligent saKe of Operations)

AIKO is a Turin, Italy-based space autonomy startup founded in **2017** that develops AI/ML-powered software for on-board satellite autonomy and ground-based anomaly detection. AIKO was the **first company in Europe to demonstrate deep learning in orbit**. It has offices in both Torino (HQ) and Toulouse, France.

## Founding and Leadership

- **Founded:** 2017, Torino, Italy
- **Legal entity:** AIKO S.r.l. (Torino) and AIKOSPACE S.a.S (Toulouse)
- **Total funding:** ~€7M (Series A round open for additional investment up to €5M max)

## Funding

| Round | Amount | Date | Investors |
|---|---|---|---|
| Early stage (incl. Primo Space Fund) | Not disclosed | ~2019–2021 | Primo Space |
| Series A close | €3.5M | October (year est. 2023) | Deep Blue Ventures + Primo Space |
| Series A extension | €520K | 2024 | Club degli Investitori (via Simon Fiduciaria) |
| **Series A total** | **€4M** (open to €5M max) | — | — |
| **Total funding** | **~€7M** | — | — |

AIKO was admitted to Thales Alenia Space's **Space Business Catalyst** industrial accelerator at the start of 2024.

## Products

### GENE (gifted_GENE)

AI-powered anomaly detection and root-cause analysis platform for satellite ground operations:

- **Performance**: In testing with Tyvak International, analyzed 10 telemetry streams in **3 minutes**, identified **4 out of 5 anomalies** with minimal false positives — "outperforming traditional methods"
- **Predictive capability**: Can predict anomalies **up to 4 days in advance**
- **Operator impact**: Reduced operator workload by **over 30%** in the Tyvak International deployment
- **ESA ARTES funding**: An 18-month ESA ARTES programme project funded the initial development
- **Customer**: Tyvak International (nanosatellite manufacturer, Telespazio subsidiary) — confirmed partnership and deployment

### OLIVER

Real-time decision-making software for spacecraft planning and in-orbit operations. Combines on-board and ground-based components for mission replanning.

### CLEAR

Onboard payload data processor: reduces ground data downlink dependency by processing and filtering imagery onboard.

### DANA

Autonomous maneuvering and in-orbit servicing software: collision avoidance, orbit repositioning, and proximity operations support.

## Technical Approach

AIKO's architecture spans both **on-board** and **ground** deployment, distinguishing it from most competitors who are ground-only:

- **On-board AI**: Models designed to operate within satellite compute constraints; demonstrated on-orbit deep learning inference
- **Ground integration**: Distributed intelligence combining on-board decisions with ground oversight
- **AI methods**: Machine learning, deep learning, and reinforcement learning — selected per mission need
- **Safety framework**: Actions bounded by mission rules and safety envelopes with full operator oversight maintained

## Customers and Partners

- **Tyvak International** (confirmed production deployment of GENE)
- **Thales Alenia Space** (MoU for joint software development, April 2022; Space Business Catalyst membership 2024)
- ESA (ARTES programme funding for GENE; additional ESA collaboration via CNES partnership for AIKO France)
- **CNES** (French space agency collaboration for autonomous orbit and SSA applications)

## Relevance to Spacesharks Mission Desk

AIKO is the closest competitor to [[synthesis/spacesharks-mission-desk-hackathon-plan]] in the **anomaly detection / telemetry reasoning** dimension — specifically the on-orbit ops phase. Key contrast:

- AIKO GENE: internal telemetry analysis, production-deployed, narrows to subsystem health anomalies
- Spacesharks: external signal fusion (SWPC + NOTAM + CDM) + lifecycle-axis reasoning + labeled dataset moat
- AIKO is on-board-capable (unique differentiator Spacesharks does not have); Spacesharks is ground-desk-only
- AIKO's market is primarily institutional (ESA, Thales, CNES ecosystem); Spacesharks targets operator/hackathon demo

The GENE "4 of 5 anomalies in 3 minutes" result is a strong benchmark. The Spacesharks Mission Desk does not claim to replicate this depth of telemetry ML; instead it sits one abstraction layer up: given an anomaly has occurred (or is likely given external conditions), what should the operator do next?

## Six-region positioning — Europe's flagship ops-AI vendor

In the [[synthesis/llm-satellite-operations-six-region]] map, AIKO is **Europe's flagship** and the clearest instance of the **agency-anchored on-board autonomy** archetype: ESA ARTES-funded, CNES/Thales-partnered, safety-envelope-bounded, and the only commercial vendor with production on-board deep learning at scale. The contrast that defines the three regional bets:

- **vs US (defense-funded vertical SDA copilot):** AIKO trades the US incumbents' classified-data + compute advantage for *on-board* autonomy and an institutional (ESA) anchor customer. It has **no LLM-reasoning layer** — it is deep-learning/RL, like the US SDA vendors.
- **vs China (sovereign full-stack autonomy):** AIKO's safety-framed, operator-oversight-maintained design is the explicit opposite of the Chinese "Air Target Agent System" autonomous-action-without-human-handoff model.
- **vs Taiwan ([[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks]]):** AIKO has the on-board capability Spacesharks lacks; Spacesharks has the external-signal-fusion + lifecycle-reasoning layer AIKO lacks. They sit one abstraction layer apart (telemetry-ML vs operator-decision-support).

## See Also

- [[concepts/llm-satellite-operations-landscape]] — full competitive map
- [[synthesis/llm-satellite-operations-six-region]] — six-region (台美日韓中國歐洲) ops-AI map; AIKO is the Europe flagship
- [[concepts/satellite-digital-twin]] — digital twin concept AIKO GENE partially instantiates
- [[entities/cognitive-space]] — US scheduling counterpart
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Spacesharks canonical plan
