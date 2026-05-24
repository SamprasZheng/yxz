"""Load the project Obsidian wiki as prompt context.

Returns a dict keyed by slug (filename without .md), with frontmatter + body.
Day 1 implementation is intentionally minimal — it lets agents discover
which concepts exist, even if MVP only feeds the most relevant 5–7 into prompts.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

WIKI_ROOT = Path(__file__).resolve().parent.parent.parent.parent / "wiki"

# MVP — explicit allow-list of concepts the OrbitDesignerAgent draws on.
# Day 3 will widen this via tag filtering.
RELEVANT_CONCEPTS = (
    "orbit-dose-budgeting",
    "rha-radiation-hardening",
    "cots-gpu-radiation-risk",
    "orbital-data-center",
    "leo-value-chain",
    "see-single-event-effects",
    "tid-total-ionizing-dose",
)

_FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)


def _parse(md: str) -> dict[str, Any]:
    m = _FRONTMATTER_RE.match(md)
    if not m:
        return {"frontmatter": {}, "body": md}
    fm_raw, body = m.group(1), m.group(2)
    fm: dict[str, Any] = {}
    for line in fm_raw.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return {"frontmatter": fm, "body": body}


def load_wiki(only: tuple[str, ...] = RELEVANT_CONCEPTS) -> dict[str, dict[str, Any]]:
    """Load wiki concept pages keyed by slug. Silently skips missing files."""
    out: dict[str, dict[str, Any]] = {}
    if not WIKI_ROOT.exists():
        return out
    for slug in only:
        path = WIKI_ROOT / "concepts" / f"{slug}.md"
        if not path.exists():
            continue
        out[slug] = {"path": str(path), **_parse(path.read_text(encoding="utf-8"))}
    return out
