---
type: source
tags: [spacesharks, starlink, hackathon, source]
title: "Hackathon Plan"
author: "Spacesharks docs"
date: "2026-05-26"
ingested: "2026-05-26"
source_path: "D:/DOT/spacesharks/docs/PLAN.md"
---

# Hackathon Plan

The hackathon goal is intentionally narrow: prove one trustworthy Starlink fleet triage loop, not a full satellite lifecycle platform.

## Core outcome

- Run safely in `NemoClaw`
- Stay alive in `OpenClaw` for 24 hours
- Monitor 50 public Starlink objects, expandable to 100
- Use a small-model ensemble for low-cost daily triage
- Escalate red, disputed, or low-confidence cases to `Nemotron`
- Produce traceable today, 7-day, and 30-day fleet briefs

## Build sequence

- Day 1: lock the fleet sample, define schemas, stand up the policy boundary and event log, connect CelesTrak data, add one space-environment source
- Day 2: implement the ensemble, add red/yellow/green scoring, add abstain and escalation rules, generate the first brief
- Day 3: build the demo flow, stage one low-confidence case, stage one denied action for auditability
- Day 4: freeze schemas, validate the 24-hour run, polish the submission, record the walkthrough, package the result

## Deliverables

- One Starlink-first demo loop
- One fleet overview
- One red satellite detail view
- One today / 7-day / 30-day report flow
- One replayable event log
- One trust and confidence explanation

