"""Firefly tools — wrapped external APIs exposed as OpenAI-compatible tool schemas.

Each module exports two symbols:
  - TOOL_SCHEMA: dict — OpenAI/NIM function-calling JSON schema
  - TOOLS:       dict[name, callable] — runtime dispatch table

Currently live:
  - launch_library.py — Launch Library 2 (no auth, 15/hr free tier, 1h cache)
  - space_track.py    — Space-Track CDM (SPACETRACK_USER/PASS; offline-safe)

Planned (not blocking the hackathon MVP):
  - noaa_swpc.py        (Kp, solar wind, X-ray — no auth)
  - celestrak.py        (no-auth TLE fallback)
  - satmad_propagate.py (orbit geometry from SatMAD)
  - dose_estimator.py   (closed-form from wiki/concepts/orbit-dose-budgeting.md)
"""

from firefly.tools import launch_library, space_track

ALL_TOOL_SCHEMAS = [
    launch_library.TOOL_SCHEMA,
    space_track.TOOL_SCHEMA,
]

ALL_TOOLS = {
    **launch_library.TOOLS,
    **space_track.TOOLS,
}

__all__ = ["ALL_TOOL_SCHEMAS", "ALL_TOOLS", "launch_library", "space_track"]
