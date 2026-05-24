---
name: firefly-mission-planner
description: Run, review, and extend the Firefly orbital data center mission-planning agents under agents/. Use when planning ODC missions, changing Firefly agent code, reviewing orbit/dose/debris outputs, or writing mission synthesis pages into wiki/.
---

# Firefly Mission Planner

## Startup

Read:

1. `agents/README.md`
2. `agents/nemo_workflow.yaml`
3. Relevant files under `agents/src/firefly/`
4. `wiki/concepts/orbit-dose-budgeting.md` and radiation-hardening concepts when dose estimates are involved

## Run Workflow

From `agents/`:

```bash
uv sync
uv run firefly plan --from "Taiwan" --to "SSO-600km" --window 30d
```

Expected outputs:

- `agents/outputs/mission-<slug>.json`
- `wiki/synthesis/odc-mission-<slug>.md`
- updates to `wiki/index.md` and `wiki/log.md`

## Review Standard

Check launch opportunity assumptions, orbit parameters, radiation dose framing, debris-risk caveats, and whether any stub agent result is clearly labeled as stub output.

Run the Python tests after code changes:

```bash
cd agents
uv run pytest
```

