"""PowerThermalAgent — STUB. Real impl arrives in v2.2 (solar-array + radiator sizing)."""

from __future__ import annotations

from typing import Any


def run(context: dict[str, Any]) -> dict[str, Any]:
    return {
        "mvp_stub": True,
        "v2_owner": "v2.2",
        "stub_reason": "v2.2 sizes solar arrays + radiators for the target compute load.",
        "solar_array_kw": None,
        "radiator_m2": None,
        "battery_kwh": None,
    }
