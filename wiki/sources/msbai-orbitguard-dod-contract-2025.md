---
type: source
title: "MSBAI Secures $1.2M DoD Contract to Advance Hybrid-Intelligence OrbitGuard, Empowering Real-Time Space Domain Awareness"
author: "MSBAI (press release via PR Newswire)"
date: "2025-09-01"
ingested: "2026-05-24"
tags: [msbai, orbitguard, sda, jepa, marl, dod, sbir, space-domain-awareness, anomaly-detection, conjunction-prediction]
---

# MSBAI OrbitGuard — DoD SBIR Contract (2025)

**Primary URL:** https://www.prnewswire.com/news-releases/msbai-secures-1-2m-dod-contract-to-advance-hybrid-intelligence-orbitguard-empowering-real-time-space-domain-awareness-302543915.html

**Secondary coverage:** https://aijourn.com/msbai-secures-1-2m-dod-contract-to-advance-hybrid-intelligence-orbitguard-empowering-real-time-space-domain-awareness/

## Contract facts (from PR Newswire press release)

- **Award:** $1.2 million, Direct-to-Phase II SBIR
- **Duration:** 18 months
- **Originating office:** DoD Chief Digital and Artificial Intelligence Office (CDAO)
- **Selection authority:** Office of the Secretary of Defense (OSD)
- **Executing agency:** Air Force Digital Transformation Office (DTO)

## Company background

MSBAI — legal name Microsurgeonbot Inc. — is an AI startup founded 2017, headquartered in Los Angeles, CA. It is an Air Force Techstars '20 graduate. CEO and founder is **Allan Grosvenor**. The company builds the **GURU** hybrid-intelligence platform for high-stakes engineering and defense operations. MSBAI is a small-business contractor, not a defense prime; it has no publicly confirmed affiliation with Lockheed Martin.

## OrbitGuard product description

OrbitGuard is described as a hybrid-intelligence copilot for space domain awareness. It ingests infrared, CelesTrak, and electro-optical data feeds and integrates with DoD enterprise services including the Unified Data Library (UDL). It runs on the GURU platform.

CEO verbatim quote from the press release:

> "OrbitGuard isn't 'just generative AI.' It's a hybrid-intelligence copilot" combining "symbolic rules for guaranteed precision, JEPA-based world models for predictive understanding, and multi-agent reinforcement learning for adaptive planning."

## Technology stack

1. **Neuro-symbolic architecture** — hierarchical design fusing multi-source data with symbolic constraint checks
2. **JEPA** (Joint Embedding Predictive Architecture) — for learned world models of orbital state evolution
3. **MARL** (Multi-Agent Reinforcement Learning) — for threat assessment and adaptive planning
4. **Graph-JEPA and Patch Time-Series Transformers** — listed as under development for the next contract phase

## Performance claims (from press release and aijourn.com)

| Metric | Value | Status |
|---|---|---|
| Anomaly detection / classification accuracy | 94–98% | Lab-validated, per press release |
| Maneuver detection accuracy | ~94–96% | Lab-validated, per press release |
| Operational accuracy target | ≥95% | Target, not achieved at publication |
| Processing latency | ~2 minutes end-to-end | Target |
| Uptime target | ≥99.9% | Target |
| Object-coverage scope (current) | ~15,000 on-orbit objects | Per press release |
| Object-coverage target | 20,000+ RSOs | Contract goal |

**Important note on the "0.98 precision-recall" claim:** The press release and all secondary coverage report "94 to 98 percent" accuracy, not a precision-recall pair of 0.98. The term "precision-recall" does not appear in the press release. The accuracy figure is self-reported by the company in a non-peer-reviewed press release. See [[concepts/jepa-sda-multi-agent-rl]] for the falsifiability analysis.

## Training dataset (from AMOS 2025 poster)

The AMOS 2025 poster (Grosvenor et al., "Hierarchical Neuro-Symbolic AI for Autonomous Spacecraft Maneuvering and Anomaly Detection") reports the system was trained on:
- **800+ labeled maneuver events** spanning 46 satellites from the DoD Unified Data Library (UDL)
- **~200,000 GMAT-simulated maneuvers** to address real-world data sparsity

This is a small labeled dataset. The reliance on simulation augmentation is a known limitation for production SDA ML systems.

## AMOS 2025 conference paper

Paper title: "Hierarchical Neuro-Symbolic AI for Autonomous Spacecraft Maneuvering and Anomaly Detection"
Authors: Allan Grosvenor, Abdul Wahab, Kyrylo Bohachov, Anton Zemlyansky, Ryland Adams, Dwyer Deighan (MSBAI)
Venue: AMOS Technical Conference 2025 (poster)
PDF: https://amostech.com/TechnicalPapers/2025/Poster/Grosvenor.pdf (PDF binary, not human-readable via WebFetch)

This is a **conference poster**, not a peer-reviewed journal article. The performance numbers in the DoD press release derive from lab validation, not an independent evaluation.

## Related pages

- [[entities/msbai]] — company profile
- [[concepts/jepa-sda-multi-agent-rl]] — JEPA + MARL-SDA concept analysis
- [[concepts/pc-probability-of-collision]] — Pc conjunction methods context
- [[entities/18-sds]] — Space Force catalog operator
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — why the hackathon deliberately avoids competing with incumbent SDA AI
