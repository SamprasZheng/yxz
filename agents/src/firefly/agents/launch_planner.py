"""LaunchPlannerAgent — Nano-4B executor with `upcoming_launches` tool.

Reasoning OFF (executor mode). Picks the right `orbit_class` + `site_country`
from the resolved orbit, calls Launch Library 2 once, then summarises.

Falls back to a deterministic placeholder if the LLM router is disabled or
the tool call errors so the orchestrator JSON shape is always valid.
"""

from __future__ import annotations

from typing import Any

from firefly.agents._tool_loop import run_tool_loop
from firefly.llm import LLMRouter, Role
from firefly.tools import launch_library

SYSTEM_PROMPT = """\
You are LaunchPlannerAgent inside the Firefly orbital data-center planner.

You have ONE tool: `upcoming_launches(site_country, orbit_class, days_ahead)`.

Procedure:
1. Read the user message — it contains the resolved target orbit (type, altitude, inclination)
   and the requested launch country.
2. Map the orbit type to LL2's orbit abbreviation:
     SSO  -> "SSO"     LEO-ISS -> "LEO"   GEO -> "GEO"
     LEO-generic -> "LEO"   MEO -> "MEO"
3. Call `upcoming_launches` ONCE with appropriate arguments.
4. After the tool returns, produce a short Markdown summary (<= 6 bullets) listing
   the top candidate launches: provider, vehicle, pad, NET date. End with one
   sentence on the best-fit window.

Do not call the tool more than once.
"""


def run(context: dict[str, Any]) -> dict[str, Any]:
    req = context["request"]
    router: LLMRouter | None = context.get("router")
    orbit_payload = context.get("orbit") or {}
    orbit = orbit_payload.get("orbit") or {}

    if router is None or not router.available:
        return _fallback(req, orbit, reason="LLM router unavailable")

    user_prompt = (
        f"Target orbit: type={orbit.get('type','?')}, "
        f"altitude={orbit.get('altitude_km','?')} km, "
        f"inclination={orbit.get('inclination_deg','?')}°. "
        f"Requested launch site / country: `{req.from_}`. "
        f"Window: {req.window}. Find upcoming launches."
    )

    loop = run_tool_loop(
        router=router,
        system_prompt=SYSTEM_PROMPT,
        user_prompt=user_prompt,
        tool_schemas=[launch_library.TOOL_SCHEMA],
        role=Role.EXECUTOR,
        max_rounds=3,
    )

    candidate_windows: list[dict[str, Any]] = []
    for step in loop.steps:
        if step.name == "upcoming_launches" and isinstance(step.result, dict):
            for r in step.result.get("results", [])[:5]:
                candidate_windows.append(
                    {
                        "provider": r.get("provider"),
                        "site": r.get("location") or r.get("pad") or req.from_,
                        "vehicle": r.get("rocket"),
                        "earliest": r.get("net"),
                        "orbit": r.get("orbit"),
                        "status": r.get("status"),
                    }
                )

    return {
        "agent_real": True,
        "summary_md": loop.final_content or "(no narrative; see candidate_windows)",
        "candidate_windows": candidate_windows or _fallback(req, orbit, "")["candidate_windows"],
        "tool_steps": [
            {"name": s.name, "arguments": s.arguments, "error": s.error}
            for s in loop.steps
        ],
        "rounds": loop.rounds,
        "errors": loop.errors,
    }


def _fallback(req: Any, orbit: dict[str, Any], reason: str) -> dict[str, Any]:
    return {
        "mvp_stub": True,
        "stub_reason": reason or "deterministic placeholder",
        "candidate_providers": ["SpaceX Falcon 9", "Rocket Lab Electron", "Firefly Alpha"],
        "candidate_windows": [
            {
                "provider": "TBD",
                "site": req.from_,
                "earliest": None,
                "orbit": orbit.get("type"),
            }
        ],
    }
