---
type: concept
tags: [spacesharks, mission-desk, satellite-lifecycle, data-contract, schema, provenance, hackathon, nvidia-agent-challenge-2026]
---

# Spacesharks Mission Desk — Lifecycle-Event Data Contract

This page defines the canonical lifecycle-event row schema used by every ingestor, every decision agent, every scoreboard component, and every blog publisher in the [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]]. The design is **provenance-first**: every row carries a source URL, ingest timestamp, parser version, and SHA-256 evidence hash so any claim can be traced deterministically back to its raw source. This is the dataset moat — not the agent code, not the inference stack, but the accumulating, source-linked, per-satellite event record that future small-constellation operators and brokers will pay for. The schema is therefore the long-term commercial product; the agent is its continuous ingest engine.

---

## 1. Minimum row contract — 11 core fields

Every row in every phase file must contain these fields. Per-phase extensions are appended on top (see §4).

| Field | Type | Required | Valid values / format | Semantics | Example |
|---|---|---|---|---|---|
| `schema_version` | string | required | `vMAJOR.MINOR` | Schema version of this row; see §7 for versioning policy | `v1.0` |
| `event_id` | string | required | `<phase>-<sat_id>-<event_time>-<short_hash>` | Stable, globally unique row identifier; short_hash is first 8 chars of `evidence_hash` | `on-orbit-ops-25544-20260524T0612Z-a3f7c819` |
| `sat_id` | string | required | NORAD CAT ID preferred; fallback to operator name | Canonical satellite identifier; NORAD CAT ID is the authoritative namespace | `25544` |
| `phase` | enum | required | `pre-launch \| launch-ascent \| commissioning \| on-orbit-ops \| eol-deorbit` | Lifecycle phase of the satellite at event time; must match the five phases in [[synthesis/spacesharks-mission-desk-hackathon-plan]] §3 | `on-orbit-ops` |
| `event_time` | string | required | ISO-8601 UTC, e.g. `2026-05-24T06:12:00Z` | Timestamp of the event itself, not ingest time; ingest time is implicit in the JSONL append order | `2026-05-24T06:12:00Z` |
| `source_type` | enum | required | `tle \| space-weather \| cdm \| notam \| regulatory \| press-release \| operator-telemetry \| derived \| manual` | Classification of the originating raw source | `space-weather` |
| `source_url` | string | required* | Canonical retrievable URL; `null` only when `source_type` is `manual` | Permanent link to the raw source at time of ingest; for paginated APIs include the exact query URL | `https://services.swpc.noaa.gov/products/alerts.json` |
| `confidence` | enum | required | `high \| medium \| low` | Ingestor-assigned confidence in the event claim; drives `review_status` via the governance layer ([[concepts/spacesharks-mission-desk-governance]]); tied to confidence tiering ([[concepts/spacesharks-mission-desk-evaluation-rubric]]) | `high` |
| `evidence_hash` | string | required | SHA-256 hex of the raw fetched payload at ingest time | Lets any reviewer verify the source has not silently mutated since the row was written; resolves to a blob at `data/evidence-blobs/<hash[:2]>/<hash>.raw` | `a3f7c819e6d2...` (64 hex chars) |
| `recommendation` | object\|null | optional | `null` or `{action_type, target_t, parameters}` | The decision action the desk drafts for the operator, if any; `null` for pure-observation rows | `{"action_type": "safe-mode-trigger", "target_t": "2026-05-24T08:00:00Z", "parameters": {"kp_threshold": 7}}` |
| `recommended_by` | string | optional* | `<agent_id>@<version>` | Agent identity that authored the recommendation; required when `recommendation` is non-null | `spacesharks-mission-desk@0.1.0` |
| `review_status` | enum | required | `auto-published \| draft \| internal-log-only \| needs-human-review \| dismissed` | Publication state set by the governance layer ([[concepts/spacesharks-mission-desk-governance]]) based on `confidence` + event significance | `auto-published` |

> `source_url` is required except when `source_type = manual`. `recommended_by` is optional except when `recommendation` is non-null.

---

## 2. Provenance fields

The following fields collectively form the audit trail. They appear in every row regardless of phase.

| Field | Purpose |
|---|---|
| `source_url` | Points to the raw, publicly retrievable artifact |
| `source_type` | Classifies the data pipeline that produced the row |
| `event_time` | Records when the event occurred in the world, not when it was observed |
| `evidence_hash` | SHA-256 of the raw payload — immutable fingerprint of the source at ingest |
| `recommended_by` | Identifies which agent version authored the recommendation |
| `parser_version` | git SHA or semver of the ingestor parser; required on every row |

`parser_version` is a required string field appended to the core set. Format: a semver tag (`0.1.0`) or a full git commit SHA (`a1b2c3d4`). When a parser bug is discovered after the fact, every row carrying that `parser_version` value can be identified and replayed deterministically — the `evidence_hash` ensures the re-run will operate on the identical raw payload, making the correction auditable without rewriting history.

---

## 3. Full core field list (with `schema_version` and `parser_version`)

For implementers: the complete minimum-viable row is these 13 fields.

```json
{
  "schema_version": "v1.0",
  "event_id": "on-orbit-ops-25544-20260524T0612Z-a3f7c819",
  "sat_id": "25544",
  "phase": "on-orbit-ops",
  "event_time": "2026-05-24T06:12:00Z",
  "source_type": "space-weather",
  "source_url": "https://services.swpc.noaa.gov/products/alerts.json",
  "confidence": "high",
  "evidence_hash": "a3f7c819e6d2b4f1c8e3a7d509c26f3b8e1d4a72c9b5f0e3827d641c4b9e2f7a",
  "parser_version": "0.1.0",
  "recommendation": {"action_type": "safe-mode-trigger", "target_t": "2026-05-24T08:00:00Z", "parameters": {"kp_threshold": 7}},
  "recommended_by": "spacesharks-mission-desk@0.1.0",
  "review_status": "auto-published"
}
```

Pure-observation rows set `recommendation` to `null` and omit `recommended_by`.

---

## 4. Per-phase row variants

Each phase appends additional fields on top of the 13-field core. The extras below are sourced directly from [[synthesis/spacesharks-mission-desk-hackathon-plan]] §3 — they are not invented here.

### Phase 1 — `pre-launch`

| Extra field | Type | Semantics | Example |
|---|---|---|---|
| `launch_id` | string | Vehicle-manifest launch identifier | `SpaceX-F9-230` |
| `vehicle` | string | Launch vehicle name | `Falcon 9` |
| `pad` | string | Launch complex identifier | `SLC-40` |
| `scheduled_t` | string (ISO-8601 UTC) | Originally planned launch window open | `2026-06-01T04:00:00Z` |
| `predicted_slip_prob` | float [0–1] | Agent's slip-probability score at the time of ingest | `0.34` |
| `actual_t` | string\|null (ISO-8601 UTC) | Actual launch time; `null` until confirmed | `null` |
| `slip_reason` | string\|null | Free-text slip cause, populated post-event | `null` |

### Phase 2 — `launch-ascent`

| Extra field | Type | Semantics | Example |
|---|---|---|---|
| `vehicle` | string | Launch vehicle | `Falcon 9` |
| `flight_id` | string | Operator's internal flight designation | `CRS-32` |
| `event` | string | Ascent event name | `MECO` |
| `measured_envelope` | object | Observed telemetry or press-release values for the event | `{"max_q_kPa": 32.1}` |
| `historical_envelope` | object | Vehicle-type historical envelope for the same event | `{"max_q_kPa_p50": 31.5, "max_q_kPa_p95": 34.0}` |
| `anomaly_score` | float [0–1] | Normalised deviation from historical envelope | `0.12` |
| `affected_payload_ids` | array of strings | NORAD CAT IDs or operator names of payloads flagged by this event | `["60123", "60124"]` |

### Phase 3 — `commissioning`

| Extra field | Type | Semantics | Example |
|---|---|---|---|
| `class` | string | Satellite bus / constellation class | `Starlink-v2-Mini` |
| `day_n` | integer | Mission day number from first contact | `7` |
| `baseline_anomalies` | float | Expected anomaly rate (per day) for this class at `day_n` | `1.4` |
| `observed_anomalies` | float | Observed anomaly count for this sat at `day_n` | `3.0` |
| `deviation_z` | float | Z-score of observed vs. baseline | `1.8` |
| `recommended_hold` | boolean | Whether the desk recommends holding nominal-ops promotion | `true` |

### Phase 4 — `on-orbit-ops`

| Extra field | Type | Semantics | Example |
|---|---|---|---|
| `event_type` | string | Categorical event label (`space-weather-alert`, `conjunction`, `interference`, `momentum-dump`, ...) | `space-weather-alert` |
| `environmental_inputs` | object | Key signal values that triggered the event row | `{"kp": 7.3, "goes_xray_class": "X1.2", "sep_flux": "elevated"}` |
| `decision` | string\|null | Natural-language decision drafted by the agent | `"Recommend safe mode within 108 min for SAA transit overlap"` |
| `operator_action_taken` | string\|null | Human-verified outcome; backfilled post-event | `null` |
| `outcome` | string\|null | Observed satellite state post-action; backfilled | `null` |

### Phase 5 — `eol-deorbit`

| Extra field | Type | Semantics | Example |
|---|---|---|---|
| `predicted_decay_t` | string (ISO-8601 UTC) | Agent's predicted atmospheric reentry window center | `2027-03-14T12:00:00Z` |
| `actual_decay_t` | string\|null (ISO-8601 UTC) | Confirmed reentry time; backfilled | `null` |
| `footprint_polygon` | object\|null | GeoJSON polygon of predicted debris footprint | `null` |
| `casualty_risk` | float\|null | Estimated casualty expectation (Ec) | `0.00012` |
| `passivation_status` | string | One of `not-started \| in-progress \| complete \| waived` | `not-started` |

---

## 5. `review_status` state machine

The governance layer assigns the initial state at ingest based on `confidence` and a significance heuristic. Subsequent transitions are event-driven.

```
                        ┌──────────────────────────────────┐
                        │         INGEST                   │
                        └──────────────┬───────────────────┘
                                       │
               ┌───────────────────────┼───────────────────────┐
               │                       │                       │
           confidence                confidence           confidence
              low                    medium                  high
               │                       │                       │
               ▼                       ▼                       ▼
     internal-log-only              draft              auto-published (*)
               │                       │                       │
               │           (human approves)                    │
               │                       │                       │
               │                       ▼                       │
               │               auto-published                  │
               │                                               │
               └───────────────────────┬───────────────────────┘
                                       │
                     (contradiction detected OR
                      confidence drops mid-run)
                                       │
                                       ▼
                            needs-human-review
                                       │
                          (human flags not actionable)
                                       │
                                       ▼
                                  dismissed
```

(*) `auto-published` from `high` confidence requires crossing the significance threshold (unusual magnitude of event, novel sat/phase combination, or decision confidence ≥ 0.85).

Key rules:

- `low` confidence → `internal-log-only`: row is stored and hashed but never propagated to the scoreboard or blog pipeline.
- `medium` confidence → `draft`: queued for `/auto-publish` but held until a human approves or `review_status` is manually advanced.
- `high` confidence → `auto-published` only if the significance threshold is also crossed; otherwise → `draft`.
- Any state → `needs-human-review`: triggered when the desk detects a contradiction with a prior wiki claim, when confidence degrades mid-run (e.g., the source URL returns HTTP 404 on re-check), or when a human operator raises a flag.
- Any state → `dismissed`: human action only; marks the row as non-actionable but preserves it in the JSONL for audit.

Full governance policy (threshold values, who can transition, rate-limit guards) belongs to [[concepts/spacesharks-mission-desk-governance]].

---

## 6. Storage layout

```
data/
  lifecycle-events/
    pre-launch/
      YYYY-MM.jsonl          ← append-only JSONL, one row per line
    launch-ascent/
      YYYY-MM.jsonl
    commissioning/
      YYYY-MM.jsonl
    on-orbit-ops/
      YYYY-MM.jsonl          ← highest-volume file; Phase 4 is the moat
    eol-deorbit/
      YYYY-MM.jsonl
  evidence-blobs/
    <hash[:2]>/
      <full-hash>.raw        ← content-addressed raw source payload
  lifecycle-events.sqlite    ← SQLite mirror; enables sub-second scoreboard queries
```

**Hot path:** ingestors append rows to `<phase>/YYYY-MM.jsonl` inside the [[concepts/nemoclaw|NemoClaw]] sandbox's allowed filesystem (as declared in `openclaw-sandbox.yaml` under the `filesystem.allow` list).

**Audit path:** every row's `evidence_hash` resolves to a content-addressed blob in `data/evidence-blobs/<hash[:2]>/<hash>.raw`. Blobs are write-once; no blob is ever deleted or overwritten.

**Index path:** the SQLite mirror at `data/lifecycle-events.sqlite` is rebuilt on demand from the JSONL files using a deterministic replay script. It is not the source of truth — JSONL is. The SQLite index enables the live scoreboard to serve sub-second queries over millions of rows without scanning JSONL. Columns mirror the core fields plus an indexed `phase` column.

---

## 7. Schema versioning

Every row carries `schema_version` (string, required) as the first field.

- Format: `vMAJOR.MINOR` — e.g. `v1.0`.
- **MAJOR** bump: any breaking change (field rename, type change, removal of a field, change to enum values).
- **MINOR** bump: additive only (new optional field; new enum value that is backward-compatible).
- The hackathon ships `v1.0`. The `v1.x` series is reserved for additive changes during the build window (May 24–27 2026); no MAJOR bump is expected before submission.
- Ingestors must reject rows whose `schema_version` MAJOR is higher than the version they were compiled against.
- The SQLite replay script uses `schema_version` to apply the correct column projection when rebuilding from mixed-version JSONL archives.

---

## See also

- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — parent plan; per-phase dataset rows in §3 are the authoritative source for the extras tables in §4 above
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — uses this schema to compute hit rate, calibration score, and coverage metrics for the scoreboard
- [[concepts/spacesharks-mission-desk-governance]] — sets `review_status` based on `confidence` + significance; defines transition thresholds and human-approval flows
- [[concepts/nemoclaw]] — the sandbox that enforces the storage allowlist; `openclaw-sandbox.yaml` gates write access to `data/lifecycle-events/`
- [[concepts/obsidian-llm-knowledge-base]] — the publish pipeline that consumes `auto-published` rows and drafts blog posts + OG images
- [[sources/nvidia-agent-challenge-2026]] — event context; deadline and judging rubric that makes the dataset moat the submission's core differentiator
