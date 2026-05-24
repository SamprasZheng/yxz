"""RiskAgent — Nano-4B executor with `cdm_30d_summary` tool.

Reads the resolved orbit from context, calls Space-Track once for the shell's
30-day CDM history, then summarises. Offline-safe: if Space-Track creds are
missing the tool returns a clearly flagged stub and the agent still produces
a structured response.
"""

from __future__ import annotations

from typing import Any

from firefly.agents._tool_loop import run_tool_loop
from firefly.llm import LLMRouter, Role
from firefly.tools import space_track

SYSTEM_PROMPT = """\
You are RiskAgent inside the Firefly orbital data-center planner.

You have ONE tool: `cdm_30d_summary(altitude_km, inclination_deg, ...)`.

Procedure:
1. Read the user message — it contains the resolved target orbit.
2. Call `cdm_30d_summary` ONCE with that altitude + inclination.
3. After the tool returns, write a short Markdown risk note (<= 4 bullets):
   - 30-day CDM count for the shell
   - highest collision probability observed (if any)
   - whether the shell is busy (CDM count > 10 in 30 days) or quiet
   - one mitigation hint for orbital data-center deployment

If the tool returns `status: "offline"`, say so plainly — do not invent numbers.
"""


def run(context: dict[str, Any]) -> dict[str, Any]:
    router: LLMRouter | None = context.get("router")
    orbit_payload = context.get("orbit") or {}
    orbit = orbit_payload.get("orbit") or {}

    if router is None or not router.available:
        return _fallback(orbit, reason="LLM router unavailable")

    altitude = orbit.get("altitude_km")
    inclination = orbit.get("inclination_deg")

    if altitude is None or inclination is None:
        return _fallback(orbit, reason="no resolved orbit to query")

    user_prompt = (
        f"Target orbit: altitude={altitude} km, inclination={inclination}°, "
        f"type={orbit.get('type','?')}. Summarise the 30-day debris risk "
        f"for this shell."
    )

    loop = run_tool_loop(
        router=router,
        system_prompt=SYSTEM_PROMPT,
        user_prompt=user_prompt,
        tool_schemas=[space_track.TOOL_SCHEMA],
        role=Role.EXECUTOR,
        max_rounds=3,
    )

    cdm_count: int | None = None
    highest_pc: float | None = None
    for step in loop.steps:
        if step.name == "cdm_30d_summary" and isinstance(step.result, dict):
            cdm_count = step.result.get("cdm_count_30d")
            highest_pc = step.result.get("highest_pc")

    return {
        "agent_real": True,
        "summary_md": loop.final_content or "(no narrative)",
        "cdm_count_30d": cdm_count,
        "highest_collision_probability": highest_pc,
        "tool_steps": [
            {"name": s.name, "arguments": s.arguments, "error": s.error}
            for s in loop.steps
        ],
        "rounds": loop.rounds,
        "errors": loop.errors,
    }


def _fallback(orbit: dict[str, Any], reason: str) -> dict[str, Any]:
    return {
        "mvp_stub": True,
        "stub_reason": reason,
        "cdm_count_30d": None,
        "highest_collision_probability": None,
        "mitigations": [],
    }
