---
type: entity
tags: [lockheed-martin, sda, ispace, space-fence, defense-prime, ai-ml, space-domain-awareness, satellite-intelligence]
---

# Lockheed Martin Space (AI/SDA product line)

**Type:** Defense prime contractor (space segment)
**Parent:** Lockheed Martin Corporation (NYSE: LMT)

This page covers Lockheed Martin's space domain awareness AI/ML product line. It does not cover the broader corporate history, launch vehicles, or satellite manufacturing.

## iSpace

**iSpace™** (Intelligent Space Awareness) is Lockheed Martin's command-and-control software suite for space domain awareness and asset management. Key capabilities:

- Sensor tasking and data correlation across optical, radar, infrared, and radio sensors — government, commercial, and scientific networks globally
- Real-time space object tracking, collision prediction, maneuver detection, break-up monitoring, launch processing, and co-orbital threat analysis
- Net-centric, open, scalable architecture with configurable user interface
- Serves defense, civil, commercial, and international operators
- **Customer confirmed:** German Space Agency (space situational awareness operations)

iSpace is described by Lockheed as using "advanced analytics and fusion capabilities" and providing "proactive management of space events." The product page (as of 2024) does not explicitly name any ML methodology (no JEPA, no reinforcement learning, no specific algorithm names). Lockheed's public product marketing for iSpace does not disclose precision/recall metrics.

> Note: The names "iSpaceMind" and "Space Mind" that appear in some secondary sources were **not confirmed** on Lockheed Martin's official product pages or press releases. The canonical product name is **iSpace**.

## Space Fence

Space Fence is a ground-based S-band radar system operated by the U.S. Space Force (contract awarded to Lockheed Martin). It can detect objects "as small as a marble in low earth orbit" and dramatically expanded the number of trackable objects in the space catalog. The system achieved initial operational capability in 2020.

Space Fence generates raw track data that feeds into catalog systems like 18 SDS / Space-Track.org and TraCSS. Lockheed's public communications on Space Fence do not describe specific ML algorithms or anomaly-detection precision/recall for the system.

## T-TAURI

T-TAURI (Telemetry Analytics for Universal Artificial Intelligence) is an onboard satellite AI application developed by Lockheed Martin that predicts spacecraft failures from telemetry. It has been deployed on Pony Express 2 smallsat missions.

## ARISE and MDCX

- **ARISE™:** Modeling and simulation platform using AI-driven models for rapid AI agent training in defense contexts.
- **MDCX™:** Ground control system for autonomous systems.

## AI/ML program scale

As of 2024, Lockheed Martin reports "over 80 space projects and programs using AI/ML." This spans onboard anomaly prediction, ground-based fusion and analytics, and combat system threat assessment (e.g., Aegis with AI threat-assessment integration for destroyer counter-Houthi deployments).

## Orbital State Recommender at AMOS 2025

Lockheed Martin Space presented "Orbital State Recommender Validation for Space Battle Management Applications" (authors: Oliver Schultz, Joseph Brink, Mark Williams) at AMOS 2025. This confirms an active research track in AI-driven orbital state estimation for battle management.

## What Lockheed has NOT publicly claimed

- Lockheed Martin has made no public claim of using JEPA specifically.
- No public Lockheed SDA paper or product page discloses a "precision-recall 0.98" metric for conjunction prediction or anomaly detection.
- The "Lockheed Martin + MSBAI consortium" framing from the owner's briefing is ⚠️ **Unconfirmed** — no joint program has been publicly announced.

## Related pages

- [[concepts/jepa-sda-multi-agent-rl]] — JEPA + MARL architecture overview including incumbents
- [[entities/msbai]] — small-business SDA AI contractor; no confirmed Lockheed partnership
- [[entities/18-sds]] — 18th Space Defense Squadron; consumer of SDA intelligence products
- [[entities/leolabs]] — commercial SSA provider; complement/competitor to iSpace data feeds
- [[entities/slingshot-aerospace]] — commercial SDA platform; cross-reference for commercial landscape
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — why the Spacesharks team avoids competing on orbital-physics precision
