"""Fundamentals reader — latest SEC filing excerpt → structured FundamentalsBrief.

Always pulls the most recent 10-Q (with 10-K fallback when there is no 10-Q
on record yet). Trims the excerpt to ~3 KB so the executor LLM can summarize
without context-window strain.

When the EDGAR fetch returns a stub (offline, ticker not in registry, etc.),
we return a FundamentalsBrief with `unresolved=True` and a low confidence
score — the analyst's abstain guardrails then fire downstream.
"""

from __future__ import annotations

import datetime as dt
import json
from pathlib import Path
from typing import Any

from pydantic import ValidationError

from trader.llm import LLMRouter
from trader.schemas import FundamentalsBrief
from trader.tools import sec_edgar


_SYSTEM_PROMPT_PATH = Path(__file__).resolve().parent.parent / "prompts" / "fundamentals.system.md"


def run(context: dict[str, Any]) -> dict[str, Any]:
    req = context["request"]
    router: LLMRouter = context["router"]

    filing = sec_edgar.fetch_latest_filing(req.ticker, form="10-Q")
    if filing.get("is_stub"):
        # Try 10-K as a fallback before giving up.
        filing_k = sec_edgar.fetch_latest_filing(req.ticker, form="10-K")
        if not filing_k.get("is_stub"):
            filing = filing_k

    if filing.get("is_stub"):
        return {
            "fundamentals": FundamentalsBrief(
                ticker=req.ticker,
                summary=filing.get("excerpt", ""),
                confidence=0.1,
                unresolved=True,
            ),
            "filing_meta": filing,
        }

    brief = _summarize(req.ticker, filing, router)
    return {"fundamentals": brief, "filing_meta": filing}


def _summarize(ticker: str, filing: dict[str, Any], router: LLMRouter) -> FundamentalsBrief:
    system_prompt = _SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")
    user_payload = {
        "ticker": ticker,
        "form": filing.get("form"),
        "filed_date": filing.get("filed_date"),
        "excerpt": filing.get("excerpt", "")[:3000],
    }
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Summarize this SEC filing excerpt:\n\n" + json.dumps(user_payload, ensure_ascii=False)},
    ]
    call = router.executor(
        messages,
        response_format={"type": "json_object"},
        max_tokens=2048,
    )

    if call.error or not call.content:
        return FundamentalsBrief(
            ticker=ticker,
            latest_filing_date=_parse_date(filing.get("filed_date")),
            filing_type=filing.get("form"),
            summary="LLM did not return a parseable summary.",
            confidence=0.1,
            unresolved=True,
        )

    parsed = _parse(call.content)
    if parsed is None:
        return FundamentalsBrief(
            ticker=ticker,
            latest_filing_date=_parse_date(filing.get("filed_date")),
            filing_type=filing.get("form"),
            summary="LLM output did not parse as JSON.",
            confidence=0.1,
            unresolved=True,
        )

    try:
        return FundamentalsBrief(
            ticker=ticker,
            latest_filing_date=_parse_date(filing.get("filed_date")),
            filing_type=filing.get("form"),
            summary=parsed.get("summary", ""),
            key_metrics=parsed.get("key_metrics", {}) or {},
            confidence=float(parsed.get("confidence", 0.3)),
        )
    except ValidationError:
        return FundamentalsBrief(
            ticker=ticker,
            latest_filing_date=_parse_date(filing.get("filed_date")),
            filing_type=filing.get("form"),
            summary=parsed.get("summary", "") or "Schema validation failed.",
            confidence=0.1,
            unresolved=True,
        )


def _parse(content: str) -> dict[str, Any] | None:
    text = content.strip()
    if text.startswith("```"):
        lines = [ln for ln in text.splitlines() if not ln.strip().startswith("```")]
        text = "\n".join(lines).strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start >= 0 and end > start:
            try:
                return json.loads(text[start : end + 1])
            except json.JSONDecodeError:
                return None
        return None


def _parse_date(s: str | None) -> dt.date | None:
    if not s:
        return None
    try:
        return dt.date.fromisoformat(s)
    except ValueError:
        return None
