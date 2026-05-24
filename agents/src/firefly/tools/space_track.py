"""Space-Track CDM (Conjunction Data Message) summary for a target orbit shell.

The real Space-Track API requires session-based login. This client exposes a
tool the Nemotron executor can call; without credentials it returns a clearly
flagged offline summary so the agent loop never crashes.

Free tier: 30 req/min, 300 req/hr.
"""

from __future__ import annotations

import os
from typing import Any

import httpx

ST_BASE_URL = "https://www.space-track.org"


def cdm_30d_summary(
    altitude_km: float,
    inclination_deg: float,
    altitude_window_km: float = 50.0,
    incl_window_deg: float = 5.0,
    timeout_s: float = 30.0,
) -> dict[str, Any]:
    """Summarise 30-day CDM history for a shell around (altitude, inclination).

    Returns a dict with `cdm_count_30d`, `highest_pc`, `source`, `error` (if any).
    """
    user = os.environ.get("SPACETRACK_USER", "").strip()
    pwd = os.environ.get("SPACETRACK_PASS", "").strip()
    if not user or not pwd:
        return {
            "cdm_count_30d": None,
            "highest_pc": None,
            "source": "space-track",
            "status": "offline",
            "note": "SPACETRACK_USER/PASS not set — returning offline summary so agent loop continues.",
            "shell": {
                "altitude_km": altitude_km,
                "inclination_deg": inclination_deg,
                "altitude_window_km": altitude_window_km,
                "incl_window_deg": incl_window_deg,
            },
        }

    try:
        with httpx.Client(timeout=timeout_s, follow_redirects=True) as client:
            login = client.post(
                f"{ST_BASE_URL}/ajaxauth/login",
                data={"identity": user, "password": pwd},
            )
            if login.status_code >= 400:
                return {
                    "cdm_count_30d": None,
                    "source": "space-track",
                    "error": f"login failed: http {login.status_code}",
                }

            # Filter: altitude window (perigee or apogee), 30-day TCA window.
            altmin = altitude_km - altitude_window_km
            altmax = altitude_km + altitude_window_km
            inclmin = inclination_deg - incl_window_deg
            inclmax = inclination_deg + incl_window_deg

            query = (
                f"/basicspacedata/query/class/cdm_public"
                f"/TCA/%3Enow-30/PC_BIN1/%3E0"
                f"/SAT1_PERIGEE/{altmin}--{altmax}"
                f"/SAT1_INCLINATION/{inclmin}--{inclmax}"
                f"/orderby/PC_BIN1%20desc/format/json"
            )
            cdm = client.get(f"{ST_BASE_URL}{query}")

        if cdm.status_code >= 400:
            return {
                "cdm_count_30d": None,
                "source": "space-track",
                "error": f"query http {cdm.status_code}",
            }

        items = cdm.json() or []
        highest = None
        if items:
            try:
                highest = max(float(x.get("PC_BIN1") or 0) for x in items)
            except (TypeError, ValueError):
                highest = None
        return {
            "cdm_count_30d": len(items),
            "highest_pc": highest,
            "source": "space-track",
            "status": "live",
            "shell": {
                "altitude_km": altitude_km,
                "inclination_deg": inclination_deg,
            },
        }
    except httpx.HTTPError as exc:
        return {
            "cdm_count_30d": None,
            "source": "space-track",
            "error": f"transport: {exc}",
        }


TOOL_SCHEMA = {
    "type": "function",
    "function": {
        "name": "cdm_30d_summary",
        "description": (
            "Summarise the last 30 days of public CDM (Conjunction Data Message) "
            "events for a target orbit shell around (altitude_km, inclination_deg). "
            "Returns cdm_count_30d and highest collision probability seen."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "altitude_km": {"type": "number", "description": "Target altitude (km)."},
                "inclination_deg": {"type": "number", "description": "Target inclination (deg)."},
                "altitude_window_km": {
                    "type": "number",
                    "description": "Altitude shell half-width (km). Default 50.",
                },
                "incl_window_deg": {
                    "type": "number",
                    "description": "Inclination half-window (deg). Default 5.",
                },
            },
            "required": ["altitude_km", "inclination_deg"],
        },
    },
}


TOOLS: dict[str, Any] = {"cdm_30d_summary": cdm_30d_summary}
