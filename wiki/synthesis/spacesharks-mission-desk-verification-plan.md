---
type: synthesis
tags: [hackathon, nvidia-agent-challenge-2026, sampras, agent, nemotron, nemoclaw, hermes, verification, test-plan, deployment, openclaw, opencloud, nemocloud, sandbox, docker, spacesharks]
---

# Spacesharks Mission Desk — Verification & Test Plan

Canonical verification / test / deployment-attestation plan for [[entities/sampras|Sampras]]'s [[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge 2026]] entry. Companion to:

- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — *what the agent does* (lifecycle, verbs, build plan)
- [[synthesis/spacesharks-trust-stack]] — *why the agent's output should be trusted* (four-layer reliability)
- This page — *how we prove it works, on every surface we ship*

This page is the **final delivery gate**. If the checks here do not pass, the submission is not shipped. The single hardest gate — repeated four times, once per deployment surface — is:

> **Every published Mission Desk decision row must carry `model.family == "nemotron"` in its provenance block, and the live `/health` probe on the judge-facing port must return a Nemotron model id at submission time.**

Anything else can be deferred to post-hackathon polish. The Nemotron-attestation gate cannot.

---

## 1. Scope

The Mission Desk is verified against **four deployment surfaces** simultaneously, because the hackathon judging harness, NemoClaw sandbox semantics, and the desk's own 24/7 loop together demand a model substrate that survives all of:

| # | Surface | Owner | Why it exists | Judge-facing? |
|---|---|---|---|---|
| 1 | **Open Cloud** (build.nvidia.com NIM) | NVIDIA | Free-tier reference model endpoint; remote inference; "demo on hosted Nemotron" path | yes |
| 2 | **Nemo Cloud** (paid partner NIM via Bitdeer/CoreWeave/DigitalOcean) | NVIDIA partner | Nemotron 3 Super 120B / Ultra-253B reach when free tier insufficient | yes (stretch) |
| 3 | **NemoClaw Sandbox** (`orbital-hermes` profile) | local — Hermes-on-DGX-Spark / WSL | Judge harness hits `127.0.0.1:8642`; deny-by-default egress; audit log | **primary** |
| 4 | **Docker container** (reproducible reference image) | local — repo `Dockerfile.mission-desk` | Reviewer rebuild path; CI; "smoke test on a clean box" | yes (artifact) |

The verification plan covers every surface against the same matrix of checks. A surface either passes the full matrix or is **excluded from the submitted README's "verified surfaces" line** — partial passes are not silently elevated.

Out of scope for this page:

- Behavioural correctness of individual decision verbs — that is the [[concepts/spacesharks-mission-desk-evaluation-rubric|evaluation rubric]]'s job; this page verifies the substrate the rubric runs on.
- Sandbox policy authoring — covered by [[concepts/nemoclaw-policy-presets]].
- Build sequencing — covered in [[synthesis/spacesharks-mission-desk-hackathon-plan|§5 of the Mission Desk plan]].

---

## 2. The seven verification layers

The test pyramid is deliberately tall and narrow — most tests are cheap, only the soak and golden-replay tests cost real time:

```
                          ┌─────────────────────────────┐
                          │  L7 Final-delivery gate     │  must pass, once per surface
                          │  Nemotron attestation       │
                          └─────────────────────────────┘
                       ┌─────────────────────────────────┐
                       │  L6 24-hour soak                │  one run, starts Day 2 evening
                       │  Hermes daemon + ingest loop    │
                       └─────────────────────────────────┘
                  ┌─────────────────────────────────────────┐
                  │  L5 Golden-event replay                 │   ≤ 10 min per replay
                  │  G5 storm / Starship IFT-9 / red Pc     │
                  └─────────────────────────────────────────┘
              ┌─────────────────────────────────────────────────┐
              │  L4 Sandbox-policy chaos test                   │   ≤ 5 min per attempt
              │  denied-action must appear in audit             │
              └─────────────────────────────────────────────────┘
        ┌─────────────────────────────────────────────────────────────┐
        │  L3 Schema + provenance integration tests                   │   < 60 s
        │  every row → evidence_hash resolves → re-derive matches     │
        └─────────────────────────────────────────────────────────────┘
   ┌──────────────────────────────────────────────────────────────────────┐
   │  L2 Ingestor parser unit tests                                       │   < 10 s
   │  Celestrak / NOAA SWPC / FAA NOTAM / FCC IBFS / Space-Track CDM      │
   └──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│  L1 Health + route probe                                                     │   < 2 s
│  curl :8642/health, /v1/models contains "nemotron"                           │
└──────────────────────────────────────────────────────────────────────────────┘
```

### L1 — Health + route probe (< 2 s)

For every surface, the canonical probe is:

```bash
# Liveness
curl -sf "${BASE_URL}/health"

# Route attestation — the model id MUST contain the literal substring "nemotron"
curl -sf "${BASE_URL}/v1/models" \
  | jq -er '.data[].id | select(test("nemotron"; "i"))' \
  | head -1
```

If the route attestation returns empty for any surface, that surface is **failed** and the deployment-matrix verifier (§6) refuses to mark the submission ready. There is no "we used Qwen as a fallback because the Nemotron endpoint was down" escape hatch — that is the hackathon's central requirement, see [[concepts/nemotron]] §"mandatory reasoning core" and [[sources/nvidia-agent-challenge-2026]].

Failure mode the WSL+Ollama lane has already shipped: the openshell `openai`-typed provider config silently falls back to real `api.openai.com` when `base_url=` is used instead of `OPENAI_BASE_URL=`. The L1 probe catches this because real OpenAI returns 401 on a dummy key, but additionally we grep `/tmp/sandbox-logs` for `endpoint=` after the first turn — both are part of the matrix verifier.

### L2 — Ingestor parser unit tests (< 10 s)

Five parsers, one test file each, deterministic fixtures committed under `tests/fixtures/`:

| Ingestor | Fixture | Asserted fields |
|---|---|---|
| Celestrak TLE | one TLE for a Starlink bird in `phase: on-orbit` | `sat_id`, `epoch`, `mean_motion`, `inclination`, `eccentricity` |
| NOAA SWPC | `goes-xray-flux-1m.json` from product catalog | `event_time`, `flux_class`, `band`, `source_url`, `parser_version` |
| FAA NOTAM | one Starship IFT-9 AHA NOTAM | `notam_id`, `effective`, `expires`, `area_polygon`, `affecting_artcc` |
| FCC IBFS | one Starlink Gen2 SAT-MOD entry | `filing_id`, `applicant`, `filing_type`, `date_filed`, `action` |
| Space-Track CDM | one cdm_public row with red Pc | `cdm_id`, `tca`, `pc`, `miss_distance`, `object_1_id`, `object_2_id` |

Parsers are tested in isolation; no network, no model, no sandbox. These tests catch the "I broke the schema by renaming a field" failure mode that would otherwise only surface during the L3 round-trip.

### L3 — Schema + provenance integration tests (< 60 s)

For each of the five ingestors, one round-trip test:

1. Ingest a fixture row.
2. Persist it via [[concepts/spacesharks-mission-desk-event-schema|the event schema]] write path.
3. Read it back; assert every required field present.
4. Resolve `evidence_hash` against the stored evidence blob; recompute hash; assert match.
5. Assert `model.family == "nemotron"` (for decision rows that invoked the model; ingest-only rows are exempt).

This is the layer that catches the [[concepts/agentic-provenance|provenance]] failure mode — a row written without an evidence pointer, or with a hash that no longer resolves. The nightly re-hash job described in [[concepts/spacesharks-mission-desk-evaluation-rubric|the rubric]] §6 piggybacks on this exact code path.

### L4 — Sandbox-policy chaos test (≤ 5 min)

NemoClaw sandbox earns hackathon bonus only if the audit log shows at least one **denied** tool call (per [[concepts/nemoclaw]] §"Why this earns the bonus"). We deliberately fire the agent at three off-allowlist domains and expect:

| Probe | Expected outcome |
|---|---|
| `curl https://example.com` from inside the sandbox | denied, audit row written, `denied_action_count++` |
| Request a credential file outside the policy allowlist | denied, audit row written |
| Try to write to `/host/` from the sandbox | denied, audit row written |

If any of these are *allowed*, the policy file is too permissive; the chaos test fails and the policy YAML is tightened before re-running. The probe set is also the smoke-test for [[concepts/nemoclaw-policy-presets|policy presets]] when we swap official→community presets mid-build.

### L5 — Golden-event replay (≤ 10 min each)

Three replays cover the three Phase 4 MVP verbs from [[synthesis/spacesharks-mission-desk-hackathon-plan|the plan]] §5. Each is a deterministic offline rerun against frozen inputs from the wiki sources we already ingested:

| Verb | Golden event | Expected behaviour |
|---|---|---|
| Safe-mode trigger | **May 2024 G5 storm** (Kp 9, X-flares, Starlink mass-maneuvers) — see [[concepts/swpc-space-weather-feeds]] | output a `safe-mode-recommended` row with `confidence: high` and the X-flare URL in `evidence_pointers[]` |
| Conjunction triage | **Red Pc CDM** from frozen Space-Track fixture — see [[concepts/pc-probability-of-collision]] | output a `manoeuvre-recommended` row with `Pc ≥ 1e-4` and a delta-v option list |
| Launch slip pre-alert | **Starship IFT-8 scrub chain** — see [[sources/notam-starship-ift8-2025]] | output a `slip-probability ≥ 0.5` row before the actual scrub timestamp |

Golden replay is the cheapest way to detect a regression introduced by a model swap (Nemotron Nano 2 9B vs Super 49B vs Super 120B vs Ultra-253B). Run it on **every** Tier change.

### L6 — 24-hour soak (one run, starts Day 2 evening 2026-05-25)

Continuous ingest + 5-tier freshness (per [[synthesis/spacesharks-mission-desk-hackathon-plan|plan §2.5]]) for ≥ 24 hours. Acceptance:

- Hermes daemon does not crash; if it does, the auto-restart loop ([[concepts/hermes-agent-framework]] §"Hibernation backend") fires and recovery is logged.
- ≥ 1 NemoClaw-denied action appears in the audit log (`denied_action_count ≥ 1`).
- ≥ 2 agent-authored skills appear in `~/.hermes/skills/` (`agent_authored_skill_count ≥ 2`).
- T1 (SWPC) latency p95 ≤ 90 s; T2 (Celestrak) latency p95 ≤ 5 min.
- At least one row promoted from `draft` → `auto-published` via the 30-min cancel window (per [[concepts/spacesharks-mission-desk-governance|governance]]).
- `audit_completeness ≥ 0.95` over the full 24 h window.

The soak run is also the source of demo footage for the Day 4 video. If the soak fails, the Day 3 polish budget absorbs the fix — there is no second 24 h budget.

### L7 — Final-delivery gate (per surface)

The single hard gate. For each of the four surfaces, all of the following must be true at submission time (2026-05-28, target 03:00 Taipei):

1. L1 health probe returns 200 and a Nemotron model id.
2. L3 integration: a freshly written decision row in the last 60 minutes has `model.family == "nemotron"` *and* `model.id` matching the L1 probe.
3. L4: ≥ 1 denied action exists in the NemoClaw audit log within the soak window.
4. L5: all three golden replays still pass against the currently-routed model.
5. L6: soak ran for ≥ 24 h ending no earlier than 2026-05-27 18:00 Taipei (no stale soak).
6. Scoreboard exposes all ten metrics from [[concepts/spacesharks-mission-desk-evaluation-rubric|the rubric]] §5.

Anything else (wiki linting, blog OG cards, video polish) is **soft-gated** — failure surfaces in the README as a known limitation, but the submission ships.

---

## 3. Per-surface verification

The seven layers are surface-agnostic. The bring-up commands differ.

### 3.1 — Open Cloud (build.nvidia.com NIM)

**What it is.** NVIDIA-hosted Nemotron NIM endpoints; free tier (Mini 4B / Nano 2 9B / Nemotron 3 Nano / Super 49B / Ultra-253B), 1k–5k credits, 40 RPM. See [[concepts/nemotron]] §"Access & pricing".

**Bring-up.**

```bash
export NVIDIA_API_KEY=nvapi-...
export BASE_URL=https://integrate.api.nvidia.com/v1
# Verify the model id matches the desk's contract
curl -sf "${BASE_URL}/models" -H "Authorization: Bearer ${NVIDIA_API_KEY}" \
  | jq -er '.data[].id | select(test("nemotron"; "i"))' | head -1
```

**Acceptance.**

- L1 returns a Nemotron id (recommended: `nvidia/llama-3.3-nemotron-super-49b-v1.5`).
- Round-trip from desk → endpoint → row succeeds; `model.id` recorded.
- 40-RPM rate limit not breached in soak — desk's tier-cascade [[concepts/tiered-inference|escalation policy]] keeps T1 small.

**Known caveats.**

- Free credits evaporate fast on Ultra-253B. Tier policy MUST keep Ultra at < 5 % of total calls.
- `Llama-3.3-Nemotron-Super-49B-v1.5` is the documented "primary" pick — do not silently swap to `Super-49B-v1` (the v1.5 refresh is more stable per [[concepts/nemotron]]).

### 3.2 — Nemo Cloud (paid partner NIM)

**What it is.** Bitdeer / CoreWeave / DigitalOcean hosted Nemotron 3 Super 120B (and eventually Ultra 500B / 50B active). Paid: $0.20 / M input tok, $0.80 / M output tok. Reach this when free tier insufficient.

**Bring-up.**

```bash
export NEMO_CLOUD_API_KEY=...
export BASE_URL=<partner-endpoint>/v1
curl -sf "${BASE_URL}/models" -H "Authorization: Bearer ${NEMO_CLOUD_API_KEY}" \
  | jq -er '.data[].id | select(test("nemotron-3"; "i"))' | head -1
```

**Acceptance.**

- L1 returns a Nemotron 3 Super / Ultra id.
- Tier-3 escalation triggers per [[concepts/tiered-inference|tiered-inference]] (red Pc events; manual review; etc.) route to this surface, not to Open Cloud.
- Egress event logged in the NemoClaw audit row alongside `model.id` — Layer 4 provenance per [[synthesis/spacesharks-trust-stack|trust stack]] §5.

**Treat as stretch.** If paid-tier setup blocks Day-1, drop to Open Cloud + skip §3.2 from the submission's "verified surfaces" line. Do not let Nemo Cloud bring-up consume Day-2 build budget.

### 3.3 — NemoClaw Sandbox (`orbital-hermes`)

**What it is.** The judge-facing surface. Sandbox name `orbital-hermes`, Hermes-profile NemoClaw, OpenAI-compatible API on port `8642`. See [[sources/nemoclaw-hermes-install-runbook-2026]].

**Bring-up.**

```bash
export NEMOCLAW_AGENT=hermes
nemohermes onboard            # sandbox name: orbital-hermes
                              # model: nvidia/nemotron-3-super-120b-a12b
                              #   (fallback: llama-3.3-nemotron-super-49b-v1.5 on free tier)
nemohermes orbital-hermes connect
# Health
curl -sf http://127.0.0.1:8642/health
curl -sf http://127.0.0.1:8642/v1/models \
  | jq -er '.data[].id | select(test("nemotron"; "i"))' | head -1
# If remote GPU host, ensure port-forward survives shell exit:
openshell forward start --background 8642 orbital-hermes
```

**Acceptance.**

- L1 returns a Nemotron id on `127.0.0.1:8642`.
- L4 chaos test produces ≥ 1 denied action in `nemohermes orbital-hermes logs --follow`.
- `nemohermes inference set --model <nemotron-variant>` hot-swap does not require sandbox reboot — exercise this once mid-soak to prove the [[concepts/nemoclaw-policy-presets|runtime model-switching workflow]].
- **Snapshot taken before any policy YAML edit**: `nemohermes orbital-hermes snapshot create --name pre-policy-tighten`. Snapshots are the cheapest rollback for the "I broke the policy YAML" failure the graders specifically probe for.

**Critical gotcha.** Do NOT `nemohermes orbital-hermes destroy` before judging is complete. The harness hits `127.0.0.1:8642`; destroyed sandbox → harness times out → graded non-functional. The destroy step is the literal last action after submission.

**WSL+Ollama backup lane.** The repo's `scripts/start-ollama.sh` + `scripts/nemoclaw-force-ollama.sh` path is a backup for local dev when build.nvidia.com is unreachable. The backup substrate currently routes to `qwen2.5:7b` / `nemotron-3-nano:4b` per the GPU-bring-up memory; **for the submission the routed model MUST be a Nemotron variant**, not Qwen. The verifier script in §6 fails the Sandbox surface if the routed model is non-Nemotron at submission time.

### 3.4 — Docker container (reproducible reference image)

**What it is.** A `Dockerfile.mission-desk` that bundles the desk's ingestors, the event-schema writer, the scoreboard renderer, and a thin OpenAI-compatible client pointing at a configurable upstream. Goal: a reviewer can `docker run` a clean box and reproduce the L1/L2/L3 layers without WSL, without NemoClaw, without the wiki.

**Image contract.**

```
FROM nvidia/cuda:12.4-base-ubuntu22.04   # base image carrying CUDA libs only; no model weights
ENV NEMOTRON_BASE_URL=                   # required at run
ENV NEMOTRON_API_KEY=                    # required at run
ENV NEMOTRON_MODEL_ID=                   # required; must contain "nemotron"
COPY src/ /opt/mission-desk/src/
COPY tests/ /opt/mission-desk/tests/
COPY data/lifecycle-events.schema.json /opt/mission-desk/data/
ENTRYPOINT ["/opt/mission-desk/bin/entrypoint"]
CMD ["verify"]
```

**Bring-up.**

```bash
docker build -f Dockerfile.mission-desk -t mission-desk:hackathon .
docker run --rm \
  -e NEMOTRON_BASE_URL=https://integrate.api.nvidia.com/v1 \
  -e NEMOTRON_API_KEY=$NVIDIA_API_KEY \
  -e NEMOTRON_MODEL_ID=nvidia/llama-3.3-nemotron-super-49b-v1.5 \
  mission-desk:hackathon verify
```

**Acceptance.**

- `verify` subcommand runs L1 + L2 + L3 in < 90 s on a clean Docker Desktop install.
- Entrypoint **refuses to start** if `NEMOTRON_MODEL_ID` does not contain the literal substring `nemotron` (case-insensitive). Fast-fail belongs at the boundary; failing later wastes everyone's time.
- Image is published to a public registry or attached to the submission as a tarball with a SHA-256 digest committed to the README.

**Non-goal.** Docker is not a place to run the 24 h soak. Soak owns the NemoClaw sandbox. Docker exists for reviewer reproducibility, not as the runtime substrate.

---

## 4. Test plan — concrete file layout

```
tests/
├── unit/
│   ├── test_parsers_celestrak.py
│   ├── test_parsers_noaa_swpc.py
│   ├── test_parsers_faa_notam.py
│   ├── test_parsers_fcc_ibfs.py
│   └── test_parsers_spacetrack_cdm.py
├── integration/
│   ├── test_event_schema_roundtrip.py        # L3 — every ingestor → schema → re-read
│   ├── test_provenance_hash_resolves.py      # L3 — evidence_hash → blob → recomputed hash
│   └── test_decision_row_carries_nemotron.py # L3 — model.family must be "nemotron"
├── sandbox/
│   └── test_nemoclaw_denies_offlist.sh       # L4 — three deny probes
├── golden/
│   ├── replay_g5_storm.py                    # L5 — safe-mode trigger
│   ├── replay_red_pc_cdm.py                  # L5 — conjunction triage
│   └── replay_ift8_scrub_chain.py            # L5 — launch slip pre-alert
├── soak/
│   └── soak_24h.py                           # L6 — runs continuously, emits hourly metrics
└── fixtures/
    ├── celestrak_starlink_tle.txt
    ├── goes_xray_flux_1m.json
    ├── faa_notam_starship_ift9.txt
    ├── fcc_ibfs_starlink_satmod.json
    └── spacetrack_cdm_red_pc.txt
```

Tests are intentionally **boring** — file-per-ingestor, fixture-per-scenario. No clever shared base classes. The reviewer should be able to `cat tests/unit/test_parsers_celestrak.py` and understand the contract in 30 seconds.

---

## 5. Acceptance matrix (the submission's verified-surfaces line)

The submission README's "Verified surfaces" line is generated from this matrix; cells flip to ✗ if any underlying layer fails. The matrix is also the §1 output of `scripts/verify-deployment-matrix.sh`.

| Layer | Open Cloud | Nemo Cloud | Sandbox (`orbital-hermes`) | Docker |
|---|---|---|---|---|
| L1 health + Nemotron route | required | stretch | **required** | required |
| L2 parser units | required | required | required | required |
| L3 schema + provenance | required | required | required | required |
| L4 sandbox policy chaos | n/a | n/a | **required** | n/a |
| L5 golden-event replay | required | stretch | required | required |
| L6 24-h soak | n/a | n/a | **required** | n/a |
| L7 final-delivery gate | required | stretch | **required** | required |

If Nemo Cloud (stretch) fails, the submission still ships with three verified surfaces. If Sandbox fails, the submission does not ship — it is the judge-facing surface.

---

## 6. The verifier scripts

Two new scripts back this plan; both are idempotent and exit non-zero on any failure.

- `scripts/verify-nemotron-route.sh <base_url> [api_key]` — one-surface L1 probe; greps `/v1/models` for a Nemotron id, emits the matched id to stdout, exits 0 only when matched.
- `scripts/verify-deployment-matrix.sh` — orchestrator; calls the route probe against all four surfaces, runs `pytest tests/`, runs L4 sandbox chaos against `orbital-hermes`, and prints the §5 matrix as a markdown table. Exit code is 0 only when every "required" cell passes.

Wiring into git workflow: `verify-deployment-matrix.sh` is the manual pre-submission gate, not a pre-commit hook (it touches network and a live sandbox). The pre-commit hook installed by `scripts/install-git-hooks.ps1` already covers the cheap surface — credential files, large files, wiki lint, OG validation.

---

## 7. Risks specific to verification

| Risk | Probability | Mitigation |
|---|---|---|
| Free-tier credits exhaust mid-soak (Open Cloud) | medium | Tier-cascade keeps Ultra at < 5 %; switch primary to Super-49B-v1.5 if Ultra burns budget; Sandbox uses paid partner only on tier-3 escalation |
| Nemotron route silently swaps to non-Nemotron (e.g., openshell falls back to OpenAI) | high (already shipped this bug on a Qwen lane) | L1 probe is mandatory in every CI/local/judge run; `OPENAI_BASE_URL` not `base_url`; grep `endpoint=` from sandbox logs |
| Soak crashes 12 h in, no buffer | medium | Auto-restart loop ([[concepts/hermes-agent-framework]] hibernation fallback); soak starts Day 2 evening → Day 3 morning, leaving Day 3 afternoon as fix budget |
| Docker image is built but never tested on a clean box | high | A second machine (or `docker run --rm` from a fresh user) executes the verify subcommand before the README's "verified surfaces" line is locked |
| Judge harness hits `:8642` after sandbox destroyed | medium | Destroy is the literal last step; submission README explicitly says "do not destroy before judging completes" |
| Nemo Cloud paid-tier setup eats Day-2 build budget | medium | Drop §3.2 to "stretch"; if not ready by Day-3 morning, remove from submission |

---

## 8. Decision provenance

This page exists because the owner — late on 2026-05-24 — explicitly asked for a verification plan integrating *all four* deployment surfaces (Open Cloud / Nemo Cloud / Sandbox / Docker) into the existing Mission Desk + Trust Stack plans, with a single hard non-negotiable constraint:

> **The final delivery verification MUST check that the routed model is Nemotron.**

The owner's framing — paraphrased — was: research / plan / scope / architecture are defined; integrate now, do not re-plan. This page is the integration. It introduces no new architecture; it formalises the test ladder and per-surface acceptance the previously-existing synthesis pages assumed but never wrote down.

The seven-layer pyramid was sized against the hackathon-window budget: L1–L4 are designed to run unattended in CI on every commit; L5 runs on every model swap; L6 is one-shot on Day-2 evening; L7 is the final-day gate. The Nemotron-attestation requirement is enforced at L1 (route), L3 (decision row), and L7 (gate) — three independent layers, all checked by `scripts/verify-deployment-matrix.sh`, so a single layer failing closed is not enough to silently ship a non-Nemotron submission.

---

## See also

- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — *what the agent does* (parent plan)
- [[synthesis/spacesharks-trust-stack]] — *why output should be trusted* (companion)
- [[concepts/spacesharks-mission-desk-event-schema]] — row contract every L3 test asserts against
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — scoreboard metrics surfaced at L7
- [[concepts/spacesharks-mission-desk-governance]] — publish/review policy; L6 soak proves the 30-min cancel window fires
- [[concepts/nemotron]] — variant selection; the route probe greps for this family name
- [[concepts/nemoclaw]] / [[concepts/nemoclaw-policy-presets]] — sandbox substrate; L4 chaos test source of truth
- [[concepts/hermes-agent-framework]] — runtime; L6 soak depends on auto-restart loop
- [[concepts/tiered-inference]] — L7 routing across Open Cloud / Nemo Cloud / Sandbox
- [[concepts/agentic-provenance]] — every test row carries the four-layer provenance block
- [[concepts/small-model-ensemble]] — L5 golden replays exercise the three-specialist arbiter
- [[concepts/calibrated-confidence-llm]] — abstention path covered by an L5 replay variant
- [[sources/nvidia-agent-challenge-2026]] — judging context; deadline 2026-05-28
- [[sources/nemoclaw-hermes-install-runbook-2026]] — operator-level Day-1 reference for §3.3
- [[entities/sampras]] — entrant
