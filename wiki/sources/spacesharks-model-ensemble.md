---
type: source
tags: [spacesharks, models, ensemble, source]
title: "Model Ensemble"
author: "Spacesharks docs"
date: "2026-05-26"
ingested: "2026-05-26"
source_path: "D:/DOT/spacesharks/docs/MODEL_ENSEMBLE.md"
---

# Model Ensemble

The model strategy is five small models voting first, with `Nemotron` escalation when the vote is risky or unstable.

## Primary five

- `nemotron-3-nano:4b`
- `mistral-nemo:12b`
- `qwen3:8b` or `qwen3.5:9b`
- `gemma3:4b`
- `phi4-mini`

## Escalation rules

- Escalate when at least two models vote red
- Escalate when any model votes red with low confidence
- Escalate when disagreement is high
- Escalate when the result will appear in the user-facing brief
- Escalate when local evidence is missing or contradictory

## Failure handling

- Continue with remaining models if one is offline
- Require higher agreement from remaining votes
- If too few primary models respond, escalate to `Nemotron`
- If `Nemotron` is unavailable, do not upgrade yellow to red

