"""OrbitDesignerAgent — Nemotron Super-49B reasoning, Obsidian-KB grounded.

Reasoning is performed by `nvidia/llama-3.3-nemotron-super-49b-v1.5` with
`detailed thinking on`. The agent receives the full mission request plus the
wiki concept pages from `kb_loader.py` and is asked to return a JSON object
matching the shape declared in `prompts/orbit_designer.system.md`.

If `NVIDIA_API_KEY` is unset or the call fails, the agent falls back to the
original deterministic stub so the orchestrator demo never breaks.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

from firefly.llm import LLMRouter, Role

SYSTEM_PROMPT_PATH = (
    Path(__file__).resolve().parent.parent / "prompts" / "orbit_designer.system.md"
)


def run(context: dict[str, Any]) -> dict[str, Any]:
    """Design an orbit. Real Nemotron call when key present, deterministic fallback otherwise."""
    req = context["request"]
    router: LLMRouter | None = context.get("router")

    if router is None or not router.available:
        return _fallback(req, reason="no NVIDIA_API_KEY — using deterministic stub")

    system = _build_system_prompt(context)
    user = _build_user_prompt(req)

    call = router.planner(
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        response_format={"type": "json_object"},
        max_tokens=4096,
    )

    if call.error or not call.content:
        return _fallback(req, reason=f"nemotron error: {call.error or 'empty response'}")

    parsed = _coerce_json(call.content)
    if parsed is None:
        return _fallback(req, reason="nemotron returned non-JSON")

    parsed["_telemetry"] = {
        "model": call.model,
        "role": call.role,
        "reasoning": call.reasoning,
        "latency_ms": call.latency_ms,
        "prompt_tokens": call.prompt_tokens,
        "completion_tokens": call.completion_tokens,
    }
    parsed.setdefault("tools_used", [])
    return parsed


def _build_system_prompt(context: dict[str, Any]) -> str:
    base = SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")
    kb = context.get("kb") or {}
    if not kb:
        return base
    kb_section = ["", "## Wiki KB excerpts you may cite (Obsidian wikilinks required)"]
    for slug, page in kb.items():
        body = (page.get("body") or "").strip()
        if len(body) > 2000:
            body = body[:2000] + "\n…(truncated)"
        kb_section.append(f"\n### [[concepts/{slug}]]\n{body}")
    return base + "\n".join(kb_section)


def _build_user_prompt(req: Any) -> str:
    return (
        f"Mission request: from `{req.from_}` to `{req.to}`, window `{req.window}`.\n"
        "Return ONE JSON object matching the schema in the system prompt. "
        "No prose, no markdown fences."
    )


_JSON_BLOCK_RE = re.compile(r"\{.*\}", re.DOTALL)


def _coerce_json(text: str) -> dict[str, Any] | None:
    """Parse JSON from a model response, tolerating ``` fences and prose."""
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    m = _JSON_BLOCK_RE.search(text)
    if not m:
        return None
    try:
        return json.loads(m.group(0))
    except json.JSONDecodeError:
        return None


def _fallback(req: Any, reason: str) -> dict[str, Any]:
    """Original deterministic Day-1 scaffold, kept as a never-fail safety net."""
    target = (req.to or "").upper()
    if "SSO" in target or "SUN" in target:
        orbit = {
            "type": "SSO",
            "altitude_km": 600 if "600" in target else 500,
            "inclination_deg": 97.79,
            "period_min": 96.7,
            "eclipse_fraction": 0.34,
        }
    elif "ISS" in target:
        orbit = {
            "type": "LEO-ISS",
            "altitude_km": 408,
            "inclination_deg": 51.6,
            "period_min": 92.9,
            "eclipse_fraction": 0.38,
        }
    elif "GEO" in target:
        orbit = {
            "type": "GEO",
            "altitude_km": 35786,
            "inclination_deg": 0.0,
            "period_min": 1436,
            "eclipse_fraction": 0.0,
        }
    else:
        orbit = {
            "type": "LEO-generic",
            "altitude_km": 550,
            "inclination_deg": 53.0,
            "period_min": 95.6,
            "eclipse_fraction": 0.36,
        }

    return {
        "mvp_stub": True,
        "stub_reason": reason,
        "orbit": orbit,
        "dose_estimate": {
            "tid_krad_per_year_behind_2mm_al": 2.4,
            "see_let_threshold_mev_cm2_mg": 37,
            "see_seu_rate_per_device_day": 1.4e-3,
            "source": "[[concepts/orbit-dose-budgeting]] (deterministic fallback)",
        },
        "debris_history": {"cdm_count_30d": None, "note": "Space-Track CDM not consulted in fallback."},
        "space_weather": {"kp_index": None, "solar_wind_km_s": None, "note": "NOAA SWPC not consulted in fallback."},
        "tools_used": [],
        "wiki_citations": [
            "[[concepts/orbit-dose-budgeting]]",
            "[[concepts/rha-radiation-hardening]]",
        ],
    }
