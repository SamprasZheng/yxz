---
type: entity
tags: [llm-agent, satellite-operations, mission-planning, competitive-intel, space-force, ai-scheduling]
---

# Cognitive Space

Cognitive Space is a Houston, Texas-based startup that develops AI-powered automated satellite operations software. It describes itself as "the market leader in intelligent space automation" and has government customers including the US Space Development Agency (SDA), US Air Force Research Lab (AFRL), NOAA, and commercial customer Terran Orbital.

## Founding and Leadership

- **CEO & Founder:** Guy de Carufel
- **Headquarters:** Houston, TX (4203 Montrose Blvd., STE 525)
- **Founded:** ~2020 (first funding round December 2020 per Crunchbase)
- **Total funding raised:** $11.2M across 7 rounds (as of 2025); most recent known seed round $4M, October 2023

## Products

### CNTIENT.Optimize

AI-driven fleet management software for satellite data collection scheduling. Claimed capabilities:
- **87% time savings per operator per week** in real-world operations
- AI-driven collection planning outperforms traditional algorithms **by 4x**
- Near real-time mission plan rescheduling
- Concurrent management of collection planning and multi-ground station pass scheduling
- API integration for programmatic access

### CNTIENT.Earth

Earth observation tasking product (details not publicly disclosed beyond product page mention).

## Government Contracts

| Contract | Value | Date | Program |
|---|---|---|---|
| AFRL + SDA combined | $1.5M | Nov 2022 | SBIR Phase II awards |
| SDA SBIR Phase II (sensor management) | $3.22M | Oct 2023 | Missile tracking satellite sensor optimization |
| SDA Other Transaction Authority | ~$1.8M (est.) | Mar 2025 | PWSA BMC3 mesh network management |
| Combined SDA awards (2025) | ~$5M total | Mar 2025 | Two awards: sensor management + mesh networking |

The March 2025 awards tasked Cognitive Space to (1) apply AI to enhance automated sensor management for missile-tracking satellites and (2) implement automated mesh network management for the Proliferated Warfighter Space Architecture (PWSA) Battle Management Command, Control and Communication (BMC3) ecosystem.

⚠️ **Headcount and revenue not publicly disclosed.**

## Technical Approach

CNTIENT is an AI-based mission planning platform using proprietary scheduling optimization algorithms. No public LLM-specific architecture described — marketing copy uses "AI algorithms" and "intelligent automation" without technical specifics. The system is presented as a constraint-satisfaction scheduler with AI optimization, rather than a conversational or agentic LLM system.

## Relevance to Spacesharks Mission Desk

Cognitive Space is the clearest direct commercial competitor to [[synthesis/spacesharks-mission-desk-hackathon-plan]] in the **mission planning and scheduling** dimension. Key contrast:

- Cognitive Space: single-constellation tasking optimizer (which satellites collect what data when) targeting commercial EO operators
- Spacesharks: lifecycle-axis decision assistant fusing external signals (SWPC, NOTAM, CDM) — not a tasking scheduler
- Cognitive Space is ground-station-integrated (API to enterprise) but focused on collection efficiency, not anomaly / EOL / environmental risk reasoning

The SDA customer base confirms the US government is buying AI satellite-ops automation. Cognitive Space's ~$5M government contract portfolio validates the market but also reveals the current scale: small SBIR-level engagements, not large program-of-record contracts.

## See Also

- [[concepts/llm-satellite-operations-landscape]] — full competitive map
- [[entities/slingshot-aerospace]] — SSA/CDM competitor
- [[entities/kayhan-space]] — collision avoidance competitor
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Spacesharks canonical plan
