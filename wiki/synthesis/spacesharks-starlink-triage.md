---
type: synthesis
tags: [spacesharks, starlink, synthesis]
---

# Spacesharks Starlink Triage

The docs cluster around one clear product: a Starlink-first fleet triage loop that is safe, cheap, auditable, and replayable.

## What the docs agree on

- The MVP is intentionally narrow and should not expand into a full satellite lifecycle platform
- Starlink is the main fleet; MEO/GEO are reference objects only
- The default operating unit is a 50-satellite sample, expandable to 100
- Public evidence is the boundary; no private telemetry claims are made
- Low-cost small models do the first pass, with `Nemotron` used as arbiter or escalation target
- Trust comes from evidence, confidence reporting, abstention, and a replayable log

## Operational shape

- Ingest public orbit and space-environment signals
- Normalize them into `satellite_snapshot` and `fleet_brief` records
- Produce `green`, `yellow`, `red`, or `abstain` outputs
- Escalate disputed or risky cases
- Keep the runtime inside `NemoClaw` and the long-running process inside `OpenClaw`

## Evaluation shape

- Separate prediction scoring from recommendation scoring
- Report calibration, Brier score, acceptance rate, outcome delta, freshness, and audit completeness together
- Keep misses and dismissed recommendations on the board

## Source pages

- [[sources/spacesharks-plan]]
- [[sources/spacesharks-fleet-strategy]]
- [[sources/spacesharks-scope]]
- [[sources/spacesharks-trust-model]]
- [[sources/spacesharks-roadmap]]
- [[sources/spacesharks-evaluation]]
- [[sources/spacesharks-architecture]]
- [[sources/spacesharks-event-schema]]
- [[sources/spacesharks-model-ensemble]]
