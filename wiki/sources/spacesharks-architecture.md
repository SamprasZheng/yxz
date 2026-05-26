---
type: source
tags: [spacesharks, architecture, source]
title: "Architecture"
author: "Spacesharks docs"
date: "2026-05-26"
ingested: "2026-05-26"
source_path: "D:/DOT/spacesharks/docs/ARCHITECTURE.md"
---

# Architecture

The system is a safe, long-running Starlink fleet triage loop rather than a chatbot or generic satellite dashboard.

## Flow

1. Select a representative Starlink sample fleet
2. Ingest public orbit and space-environment signals
3. Normalize each satellite snapshot into a structured record
4. Run lightweight models first
5. Escalate red, disputed, or low-confidence cases to `Nemotron`
6. Persist the full decision trail
7. Generate today, 7-day, and 30-day briefs

## Design principles

- Safety first inside `NemoClaw`
- Longevity first in `OpenClaw`
- Small models do the default work
- `Nemotron` is reserved for hard cases
- Every result must be reconstructable from the log
- Starlink is the main object set; MEO/GEO are optional references

