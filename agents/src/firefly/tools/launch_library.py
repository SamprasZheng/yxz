"""Launch Library 2 (thespacedevs.com) — upcoming launches matching an orbit class.

Free tier: 15 requests/hour unauthenticated. We respect that by caching
results to outputs/.cache/ll2-<query-hash>.json with a 1-hour TTL.

This module exposes ONE tool function to the Nemotron Nano executor agent:
`upcoming_launches(site_country, orbit_class, days_ahead)`.
"""

from __future__ import annotations

import hashlib
import json
import time
from pathlib import Path
from typing import Any

import httpx

LL2_BASE_URL = "https://ll.thespacedevs.com/2.3.0"
CACHE_DIR = Path("outputs/.cache")
CACHE_TTL_S = 60 * 60  # 1 hour


def _cache_path(key: str) -> Path:
    digest = hashlib.sha1(key.encode("utf-8")).hexdigest()[:16]
    return CACHE_DIR / f"ll2-{digest}.json"


def _read_cache(path: Path) -> Any | None:
    if not path.exists():
        return None
    age = time.time() - path.stat().st_mtime
    if age > CACHE_TTL_S:
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return None


def _write_cache(path: Path, payload: Any) -> None:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")


def upcoming_launches(
    site_country: str = "",
    orbit_class: str = "",
    days_ahead: int = 30,
    limit: int = 8,
    timeout_s: float = 20.0,
) -> dict[str, Any]:
    """Query LL2 for upcoming launches matching crude filters.

    `orbit_class` is matched loosely against LL2's `mission__orbit__abbrev`
    (SSO, LEO, GEO, MEO, etc). `site_country` matches launch_service_provider
    country_code if provided (e.g. "USA", "TWN").
    """
    params: dict[str, Any] = {
        "limit": limit,
        "mode": "list",
        "ordering": "net",
        "window_end__gte": "now",
    }
    if orbit_class:
        params["mission__orbit__abbrev__icontains"] = orbit_class.upper()
    if site_country:
        params["launch_service_provider__country_code"] = site_country.upper()

    cache_key = json.dumps(params, sort_keys=True)
    cache_path = _cache_path(cache_key)

    cached = _read_cache(cache_path)
    if cached is not None:
        return {"source": "ll2-cache", "params": params, **cached}

    try:
        resp = httpx.get(f"{LL2_BASE_URL}/launches/upcoming/", params=params, timeout=timeout_s)
    except httpx.HTTPError as exc:
        return {"source": "ll2", "error": f"transport: {exc}", "params": params, "results": []}

    if resp.status_code >= 400:
        return {
            "source": "ll2",
            "error": f"http {resp.status_code}: {resp.text[:200]}",
            "params": params,
            "results": [],
        }

    data = resp.json()
    results = []
    for item in (data.get("results") or [])[:limit]:
        results.append(
            {
                "name": item.get("name"),
                "net": item.get("net"),
                "provider": (item.get("launch_service_provider") or {}).get("name"),
                "pad": (item.get("pad") or {}).get("name"),
                "location": ((item.get("pad") or {}).get("location") or {}).get("name"),
                "rocket": (item.get("rocket") or {}).get("configuration", {}).get("name"),
                "orbit": (item.get("mission") or {}).get("orbit", {}).get("abbrev"),
                "status": (item.get("status") or {}).get("abbrev"),
            }
        )
    payload = {"count": len(results), "results": results}
    _write_cache(cache_path, payload)
    return {"source": "ll2", "params": params, **payload}


# OpenAI-compatible tool schema for the Nemotron executor.
TOOL_SCHEMA = {
    "type": "function",
    "function": {
        "name": "upcoming_launches",
        "description": (
            "Query Launch Library 2 for upcoming orbital launches matching an orbit class "
            "and optional country of the launch provider. Returns rocket, pad, NET datetime."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "site_country": {
                    "type": "string",
                    "description": "ISO-3 country code of the launch provider (e.g. USA, TWN, IND, CHN). Optional.",
                },
                "orbit_class": {
                    "type": "string",
                    "description": "Orbit abbreviation (SSO, LEO, GEO, MEO, ISS). Optional.",
                },
                "days_ahead": {
                    "type": "integer",
                    "description": "Lookahead horizon in days. Default 30.",
                },
            },
            "required": [],
        },
    },
}


TOOLS: dict[str, Any] = {"upcoming_launches": upcoming_launches}
