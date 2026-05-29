"""Narrator — Jinja2 template, NOT an LLM call.

Renders the final brief from the collated context. Keeping this out of the
LLM (unlike Firefly's narrator which uses a planner) is a deliberate choice
for v1: deterministic, fast, safe, easy to test, and it puts the provenance
footer in a known spot. The narrator can be upgraded to an LLM call in v2
without changing the orchestrator contract.
"""

from __future__ import annotations

import datetime as dt
from pathlib import Path
from typing import Any

import jinja2


_TEMPLATE_PATH = Path(__file__).resolve().parent.parent / "prompts" / "narrator.brief.md"


def run(context: dict[str, Any]) -> str:
    req = context["request"]
    thesis = context.get("thesis")
    sentiment = context.get("sentiment") or []
    fundamentals = context.get("fundamentals")
    price = context.get("price_signal")
    router = context.get("router")

    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(_TEMPLATE_PATH.parent),
        autoescape=False,
        trim_blocks=True,
        lstrip_blocks=True,
    )
    template = env.get_template(_TEMPLATE_PATH.name)
    return template.render(
        ticker=req.ticker,
        generated_at=dt.datetime.now(dt.UTC).isoformat(timespec="seconds"),
        llm_backend=getattr(router.backend, "name", "unknown") if router else "unknown",
        thesis=thesis,
        sentiment_rows=sentiment,
        fundamentals=fundamentals,
        price=price,
    )
