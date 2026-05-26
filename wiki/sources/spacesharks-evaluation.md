---
type: source
tags: [spacesharks, evaluation, source]
title: "Evaluation"
author: "Spacesharks docs"
date: "2026-05-26"
ingested: "2026-05-26"
source_path: "D:/DOT/spacesharks/docs/EVALUATION.md"
---

# Evaluation

This rubric defines how Spacesharks scores predictions, recommendations, and operational quality from the event schema. It is designed to be honest by construction.

## Two tracks

- Prediction track: score committed forecasts after the prediction window closes
- Recommendation track: score operator-facing actions by acceptance and outcome delta

## Public scoreboard

The scoreboard keeps hit rate, calibration, Brier score, recommendation acceptance, outcome delta, source coverage, freshness, audit completeness, denied action count, and agent-authored skill count visible together.

## Guardrails

- Confidence on a prediction row is immutable after write
- Dismissed recommendations stay in denominators
- Verifiable timestamps must be written before the predicted window opens
- Evidence blobs are re-hashed nightly
- Hackathon-window misses stay on the board

