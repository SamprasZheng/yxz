---
type: source
tags: [spacesharks, schema, source]
title: "Event Schema"
author: "Spacesharks docs"
date: "2026-05-26"
ingested: "2026-05-26"
source_path: "D:/DOT/spacesharks/docs/EVENT_SCHEMA.md"
---

# Event Schema

The hackathon version writes two record types: `satellite_snapshot` and `fleet_brief`.

## `satellite_snapshot`

The snapshot record stores identity, observation and ingest timestamps, public evidence pointers, parser version, risk label, risk score, confidence, disagreement, escalation status, reason codes, recommendation, and review status.

## `fleet_brief`

The brief record stores the report window, fleet size, counts by risk label, top red and yellow objects, optional cost estimate, source URLs, and the generating agent.

## Storage

- JSONL is the source of truth
- Reports and indexes are derived from the JSONL records
- Evidence blobs are stored separately by hash

