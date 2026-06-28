"""Deterministic stub backend — tests + offline demos.

Returns fixture JSON shaped to satisfy each agent's schema validator. The
agent modules detect `call.error` is None and the content parses cleanly,
so they take the "happy path" without making a network call.

Hand-picked outputs:
- Executor role (news_scout, fundamentals_reader) → a single low-confidence
  SentimentScore / FundamentalsBrief with `unresolved=false`.
- Planner role (analyst) → an explicit `abstain=true` TradeThesis. This is
  the safer test-time default: it guarantees we exercise the abstain code
  path in the orchestrator without accidentally encoding any "fake alpha".
"""

from __future__ import annotations

import json
from typing import Any

from trader.llm.client import Call, Role


_STUB_SENTIMENT = {
    "items": [
        {
            "event_id": "stub-001",
            "sentiment": 0.0,
            "confidence": 0.3,
            "sectors": [],
            "horizon": "short",
            "rationale": "stub backend — no real LLM call was made",
            "source_urls": [],
        }
    ]
}

_STUB_FUNDAMENTALS = {
    "summary": "stub backend — no real EDGAR filing was read",
    "key_metrics": {},
    "confidence": 0.2,
}

_STUB_THESIS = {
    "direction": "flat",
    "confidence": 0.0,
    "sizing_sigma": 0.0,
    "horizon": "medium",
    "risk_flags": ["stub_backend_active"],
    "abstain": True,
    "rationale": "Stub backend produced no analysis. Abstain by default.",
    "contradictions": [],
}


class StubBackend:
    """Backend that never makes a network call. Returns hand-shaped JSON by role."""

    name = "stub"

    def __init__(self, reason: str = "LLM_BACKEND=disabled") -> None:
        self._reason = reason

    @property
    def available(self) -> bool:
        return True  # The stub itself is always "available".

    def chat(
        self,
        role: Role,
        messages: list[dict[str, Any]],
        *,
        response_format: dict[str, Any] | None = None,
        max_tokens: int = 4096,
        temperature: float | None = None,
    ) -> Call:
        # Inspect the last user message for a hint about which schema is expected.
        last_user = next(
            (m for m in reversed(messages) if m.get("role") == "user"),
            {"content": ""},
        )
        hint = (last_user.get("content") or "").lower()

        if role is Role.PLANNER:
            payload = _STUB_THESIS
        elif "fundamental" in hint or "edgar" in hint or "10-k" in hint or "10-q" in hint:
            payload = _STUB_FUNDAMENTALS
        else:
            payload = _STUB_SENTIMENT

        return Call(
            backend="stub",
            model="stub",
            role=role.value,
            latency_ms=0,
            content=json.dumps(payload),
            metadata={"reason": self._reason},
        )
