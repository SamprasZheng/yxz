"""Load a trimmed slice of the Obsidian wiki as planner context.

The kb is injected into the analyst's system prompt as a list of
`title — one-line summary` pairs (NOT full body text — context-window
budget matters). The analyst's prompt then references concept slugs via
inline wikilinks in its rationale.

v1 hard-codes the relevant concept slugs. Once the Phase-A wiki ingest
lands (FinRobot, FinGPT, Qlib, CPCV, volatility-targeting, etc.), we
extend RELEVANT_SLUGS. Missing pages are silently skipped — the agent
still runs.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any


WIKI_ROOT = Path(__file__).resolve().parent.parent.parent.parent / "wiki"

# v1 allow-list. Add slugs as Phase-A wiki ingest creates them.
RELEVANT_SLUGS: tuple[str, ...] = (
    # Confidence + provenance concepts (already in wiki)
    "calibrated-confidence-llm",
    "tiered-inference",
    "small-model-ensemble",
    "agentic-provenance",
    # Concepts to be created by Phase A (silently skipped until then)
    "llm-as-feature-engineer",
    "volatility-targeting",
    "combinatorial-purged-cross-validation",
    "event-driven-quant-architecture",
)

# Pull the existing trading synthesis as a single must-read.
RELEVANT_SYNTHESIS: tuple[str, ...] = (
    "ai-quant-trading-architecture-improvements",
)

_FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)


def load_wiki() -> dict[str, dict[str, Any]]:
    """Return `{ slug: { path, frontmatter, body, kind } }`, silently skipping misses."""
    out: dict[str, dict[str, Any]] = {}
    if not WIKI_ROOT.exists():
        return out

    for slug in RELEVANT_SLUGS:
        path = WIKI_ROOT / "concepts" / f"{slug}.md"
        if not path.exists():
            continue
        out[slug] = {
            "kind": "concept",
            "path": str(path),
            **_parse(path.read_text(encoding="utf-8")),
        }

    for slug in RELEVANT_SYNTHESIS:
        path = WIKI_ROOT / "synthesis" / f"{slug}.md"
        if not path.exists():
            continue
        out[slug] = {
            "kind": "synthesis",
            "path": str(path),
            **_parse(path.read_text(encoding="utf-8")),
        }

    return out


def summarize_for_prompt(kb: dict[str, dict[str, Any]], max_chars_each: int = 400) -> str:
    """Return a compact `title — first paragraph` listing for the planner prompt."""
    lines: list[str] = []
    for slug, entry in kb.items():
        body = (entry.get("body") or "").strip()
        first_para = body.split("\n\n", 1)[0] if body else ""
        first_para = first_para.replace("\n", " ").strip()
        if len(first_para) > max_chars_each:
            first_para = first_para[: max_chars_each - 1] + "…"
        lines.append(f"- [[{slug}]] — {first_para}")
    return "\n".join(lines)


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
