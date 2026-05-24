"""NarratorAgent — thin in MVP: Jinja2 → Markdown brief.

v2.4 upgrades this to a Claude-generated investor-grade PDF.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

from jinja2 import Template

TEMPLATE_PATH = Path(__file__).resolve().parent.parent / "prompts" / "narrator.brief.md"


def run(context: dict[str, Any]) -> str:
    """Render the collated agent output as a one-page Markdown brief."""
    collated = context["collated"]
    req = context["request"]
    tmpl_src = TEMPLATE_PATH.read_text(encoding="utf-8")
    tmpl = Template(tmpl_src)
    return tmpl.render(req=req, c=collated)
