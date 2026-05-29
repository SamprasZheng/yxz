"""News scout — headlines → structured SentimentScore[].

Architecture role: feature engineer, not decision-maker. Outputs a continuous
sentiment ∈ [-1, 1] with calibrated confidence per headline. The downstream
analyst aggregates these.

LLM contract:
    Role:     EXECUTOR
    Format:   JSON object `{ "items": [SentimentScore, ...] }`
    Retries:  1 on JSON parse failure; then the headlines that couldn't be
              scored land in the output with `unresolved=true`.

Stub behavior: when the LLM backend returns an error or unparseable content,
we emit one `unresolved=true` sentiment row per headline with
sentiment=0 / confidence=0 — never a hallucinated score.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any

from pydantic import ValidationError

from trader.llm import LLMRouter
from trader.schemas import NewsItem, SentimentScore
from trader.tools import newsfeed


_SYSTEM_PROMPT_PATH = Path(__file__).resolve().parent.parent / "prompts" / "news_scout.system.md"


def run(context: dict[str, Any]) -> dict[str, Any]:
    """Fetch headlines, score each via executor LLM, return list of SentimentScore."""
    req = context["request"]
    router: LLMRouter = context["router"]

    items = newsfeed.fetch_headlines(
        req.ticker, limit=20, window_days=req.window_days
    )
    if not items:
        return {"news_items": [], "sentiment": []}

    scored = _score_batch(req.ticker, items, router)
    return {"news_items": items, "sentiment": scored}


def _score_batch(ticker: str, items: list[NewsItem], router: LLMRouter) -> list[SentimentScore]:
    system_prompt = _load_system_prompt()
    user_payload = {
        "ticker": ticker,
        "headlines": [
            {
                "title": it.title,
                "url": it.url,
                "source": it.source,
                "published": it.published.isoformat() if it.published else None,
                "summary": it.summary,
            }
            for it in items
        ],
    }
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": json.dumps(user_payload, ensure_ascii=False)},
    ]

    call = router.executor(
        messages,
        response_format={"type": "json_object"},
        max_tokens=4096,
    )

    parsed = _parse(call.content) if call.content and not call.error else None
    if parsed is None and not call.error:
        # One retry — sometimes the model adds a trailing newline or fence.
        call = router.executor(
            messages
            + [{"role": "user", "content": "Your previous response did not parse. Emit ONLY the JSON object."}],
            response_format={"type": "json_object"},
            max_tokens=4096,
        )
        parsed = _parse(call.content) if call.content and not call.error else None

    if parsed is None:
        # Fall back to unresolved markers — never invent scores.
        return [_unresolved(ticker, it) for it in items]

    scored: list[SentimentScore] = []
    for row in parsed.get("items", []):
        try:
            scored.append(SentimentScore(**row))
        except ValidationError:
            continue

    # If the model dropped headlines, mark the missing ones as unresolved.
    if len(scored) < len(items):
        seen_urls = {url for s in scored for url in s.source_urls}
        for it in items:
            if it.url not in seen_urls:
                scored.append(_unresolved(ticker, it))

    return scored


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _load_system_prompt() -> str:
    return _SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")


def _parse(content: str) -> dict[str, Any] | None:
    """Tolerant JSON parser — strips markdown fences if present."""
    text = content.strip()
    if text.startswith("```"):
        # Strip ```json ... ``` fences.
        lines = [ln for ln in text.splitlines() if not ln.strip().startswith("```")]
        text = "\n".join(lines).strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Try to extract the largest JSON object from the response.
        start = text.find("{")
        end = text.rfind("}")
        if start >= 0 and end > start:
            try:
                return json.loads(text[start : end + 1])
            except json.JSONDecodeError:
                return None
        return None


def _unresolved(ticker: str, item: NewsItem) -> SentimentScore:
    eid = hashlib.sha1(item.url.encode("utf-8", errors="ignore")).hexdigest()[:10]
    return SentimentScore(
        event_id=f"{ticker.lower()}-{eid}",
        sentiment=0.0,
        confidence=0.0,
        sectors=[],
        rationale="LLM could not score this headline; defaulted to unresolved.",
        source_urls=[item.url],
        unresolved=True,
    )
