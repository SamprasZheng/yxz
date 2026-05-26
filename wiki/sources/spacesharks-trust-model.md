---
type: source
tags: [spacesharks, starlink, trust, source]
title: "Trust Model"
author: "Spacesharks docs"
date: "2026-05-26"
ingested: "2026-05-26"
source_path: "D:/DOT/spacesharks/docs/TRUST.md"
---

# Trust Model

Trust comes from observable evidence, calibrated models, and a willingness to abstain.

## Trust layers

- Source trust: every state stores a source URL, observation timestamp, parser version, and evidence pointer
- Model trust: use multiple small models, require confidence scores, treat disagreement as signal, escalate hard cases to `Nemotron`
- Decision trust: never mark a satellite red without evidence, include confidence and disagreement, prefer abstention over forced guesses
- System trust: keep actions inside `NemoClaw`, keep the runtime alive in `OpenClaw`, log everything, and make the full event chain replayable

## Labels

- `green`: no current attention required
- `yellow`: notable change or elevated context, include in report
- `red`: high-priority review item with evidence and recommendation

