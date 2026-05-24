"""Orchestrator — fans out a MissionRequest to the 5 agents, collates, narrates, writes back to wiki.

Architecture (Nemotron dual-model split):

  PLANNER tier (Super-49B, reasoning ON)
      ├─ OrbitDesignerAgent     — deep orbital + radiation reasoning
      └─ NarratorAgent          — long-context wiki RAG, [[wikilink]] citations

  EXECUTOR tier (Nano-2 9B, reasoning OFF)
      ├─ LaunchPlannerAgent     — tool-call: Launch Library 2
      └─ RiskAgent              — tool-call: Space-Track CDM lookup

  PowerThermalAgent stays a v2.2 stub (documented).

Each agent receives the same `context` dict containing the shared LLMRouter,
the loaded Obsidian KB, and the MissionRequest. The router accumulates a trace
of every Nemotron call which lands in the mission JSON for demo + audit.
"""

from __future__ import annotations

import datetime as dt
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from firefly.agents import launch_planner, narrator, orbit_designer, power_thermal, risk
from firefly.kb_loader import load_wiki
from firefly.llm import LLMRouter
from firefly.wiki_writer import write_synthesis


@dataclass
class MissionRequest:
    """A one-line mission intent."""
    from_: str
    to: str
    window: str = "30d"

    def slug(self) -> str:
        raw = f"{self.from_}-{self.to}".lower()
        return re.sub(r"[^a-z0-9-]+", "-", raw).strip("-")


def run(req: MissionRequest, write_to_wiki: bool = True) -> dict[str, Any]:
    """Execute the full workflow. Returns the collated result dict."""
    started = dt.datetime.now(dt.UTC).isoformat()
    kb = load_wiki()
    router = LLMRouter()

    context = {"request": req, "kb": kb, "router": router}

    # Planner-tier agent first — its orbit choice constrains the executor tier.
    orbit = orbit_designer.run(context)

    # Pass the resolved orbit downstream so executor agents can target it.
    context["orbit"] = orbit

    launch = launch_planner.run(context)
    risk_out = risk.run(context)
    thermal = power_thermal.run(context)

    collated: dict[str, Any] = {
        "request": {"from": req.from_, "to": req.to, "window": req.window},
        "started": started,
        "orbit": orbit,
        "launch_opportunities": launch,
        "power_thermal": thermal,
        "debris_risk": risk_out,
        "dose_estimate": orbit.get("dose_estimate"),
        "llm_telemetry": router.summary(),
    }

    # Narrate (planner-tier when key is present; Jinja fallback otherwise).
    brief_md = narrator.run({**context, "collated": collated})
    brief_path = Path("outputs") / f"mission-{req.slug()}.md"
    brief_path.parent.mkdir(parents=True, exist_ok=True)
    brief_path.write_text(brief_md, encoding="utf-8")
    collated["brief_path"] = str(brief_path)

    if write_to_wiki:
        wiki_path = write_synthesis(req=req, collated=collated, brief_md=brief_md)
        collated["wiki_synthesis_path"] = str(wiki_path)

    collated["finished"] = dt.datetime.now(dt.UTC).isoformat()
    # Refresh telemetry — narrator may have added calls.
    collated["llm_telemetry"] = router.summary()
    return collated
