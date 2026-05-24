# Unified Firefly — Orbital Data Center Mission Architect

> NeMo Agent Toolkit MVP. Codename **Firefly**.

A multi-agent system that turns a one-line mission intent — *"From Taiwan to SSO-600km in the next 30 days"* — into a concrete orbital data center (ODC) deployment plan: launch opportunities, orbit parameters, expected radiation dose, debris conjunction history, and a Markdown mission brief filed automatically into the project's Obsidian wiki at `../wiki/synthesis/`.

## MVP scope (4-day build)

One **deeply implemented** agent (`OrbitDesignerAgent`) wired end-to-end to live APIs; four agents stubbed in YAML to make the v2 expansion path visible.

| Agent | Status | Tools |
| --- | --- | --- |
| `OrbitDesignerAgent` | **real** | Space-Track, NOAA SWPC, Launch Library 2, CelesTrak, SatMAD, dose-estimator |
| `LaunchPlannerAgent` | stub | (v2.1) |
| `PowerThermalAgent` | stub | (v2.2) |
| `RiskAgent` | stub | (v2.3) |
| `NarratorAgent` | thin (Jinja → Markdown) | (v2.4 → Claude PDF) |

See `../CLAUDE.md` for project-wide conventions and the plan at `C:\Users\User\.claude\plans\nemo-agent-toolkit-unified-firefly.md`.

## Quick start

```bash
cd agents
uv sync               # install
cp .env.example .env  # fill SPACETRACK_USER/PASS + ANTHROPIC_API_KEY
uv run firefly plan --from "Taiwan" --to "SSO-600km" --window 30d
```

Expected:

1. `outputs/mission-<slug>.json` with keys `orbit`, `launch_opportunities`, `dose_estimate`, `debris_risk` + `mvp_stub: true` flags on the four un-implemented agents.
2. `../wiki/synthesis/odc-mission-<slug>.md` — a new synthesis page wikilinked to `[[orbit-dose-budgeting]]` and `[[rha-radiation-hardening]]`.
3. `../wiki/index.md` updated under `## Mission runs`; `../wiki/log.md` appended.

## Directory layout

```
agents/
├── pyproject.toml
├── nemo_workflow.yaml      # architecture-of-record (5 agent slots)
├── src/firefly/
│   ├── cli.py              # `firefly plan ...`
│   ├── orchestrator.py     # fans out → agents, collates → narrator
│   ├── kb_loader.py        # Obsidian vault → LLM context
│   ├── wiki_writer.py      # close-the-loop: synthesis/ + index + log
│   ├── agents/             # 1 real, 4 stubs, 1 thin
│   ├── tools/              # 6 tools (Space-Track / NOAA / LL2 / CelesTrak / SatMAD / dose)
│   └── prompts/            # Markdown prompts (orbit-designer system, narrator brief)
├── outputs/                # gitignored — generated per run
└── tests/
    ├── test_smoke.py
    └── test_dose_estimator.py  # pins math to wiki/concepts/orbit-dose-budgeting.md
```

## Why NeMo Agent Toolkit

- Active NVIDIA project ([NVIDIA/NeMo-Agent-Toolkit](https://github.com/NVIDIA/NeMo-Agent-Toolkit), 2.3k★)
- YAML-config orchestration + A2A + MCP out of the box
- No existing space-mission examples → genuine gap-fill, not duplication

## v2 expansion path

- **v2.1** `LaunchPlannerAgent` — promote LL2 client into a launch-window optimizer
- **v2.2** `PowerThermalAgent` — solar-panel + radiator sizing
- **v2.3** `RiskAgent` — full CDM debris run + AP9/AE9 via IRENE
- **v2.4** `NarratorAgent` — investor-grade PDF via Claude
- **v3** — JAXA, ESA DISCOSweb (post-approval), ISRO via LL2 deep-dive
- **v4** — Framing E (Polkadot rail) and Framing C (Isaac Sim self-evolving loop)
