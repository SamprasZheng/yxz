"""Backend protocol + factory.

Every backend exposes `chat(role, messages, **kw) -> Call`. The router never
sees backend-specific types.

Backend selection (resolved once at process start):

    LLM_BACKEND=nemotron   → NemotronBackend (default)
    LLM_BACKEND=anthropic  → AnthropicBackend
    LLM_BACKEND=disabled   → StubBackend (deterministic JSON for tests)

When the requested backend can't import its SDK or lacks credentials, the
factory degrades to StubBackend so agent code can still run end-to-end —
just with placeholder thesis output.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Protocol


class Role(str, Enum):
    """Two operating modes; the backend maps each to a concrete model."""

    PLANNER = "planner"     # high reasoning — analyst
    EXECUTOR = "executor"   # fast classification — news_scout, fundamentals_reader


@dataclass
class Call:
    """Captured request/response for telemetry + the wiki audit trail."""

    backend: str
    model: str
    role: str
    latency_ms: int = 0
    prompt_tokens: int | None = None
    completion_tokens: int | None = None
    content: str = ""
    error: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)


class Backend(Protocol):
    """Minimal surface every backend implements."""

    name: str

    @property
    def available(self) -> bool:
        ...

    def chat(
        self,
        role: Role,
        messages: list[dict[str, Any]],
        *,
        response_format: dict[str, Any] | None = None,
        max_tokens: int = 4096,
        temperature: float | None = None,
    ) -> Call:
        ...


def load_backend() -> Backend:
    """Resolve the backend once from env vars.

    Falls through to StubBackend if the requested backend's SDK is missing or
    credentials aren't set, so demos and tests never fail on import.
    """
    requested = (os.environ.get("LLM_BACKEND") or "").strip().lower() or "nemotron"

    if requested == "disabled":
        from trader.llm.stub_backend import StubBackend
        return StubBackend()

    if requested == "anthropic":
        try:
            from trader.llm.anthropic_backend import AnthropicBackend
            backend = AnthropicBackend()
            if backend.available:
                return backend
        except ImportError:
            pass
        from trader.llm.stub_backend import StubBackend
        return StubBackend(reason="anthropic backend requested but unavailable")

    # Default — nemotron via firefly's client.
    try:
        from trader.llm.nemotron_backend import NemotronBackend
        backend = NemotronBackend()
        # Nemotron's `available` returns True even when local Ollama might be
        # down (lazy verification by design — see firefly/llm/nemotron.py).
        # We still trust it and let chat() error out lazily.
        return backend
    except ImportError:
        from trader.llm.stub_backend import StubBackend
        return StubBackend(reason="nemotron backend SDK missing")
