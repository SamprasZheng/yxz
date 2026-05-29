"""Anthropic backend — Claude Opus (planner) + Haiku (executor).

Set `LLM_BACKEND=anthropic` and `ANTHROPIC_API_KEY=...`. Model SKUs default to
the values pinned in [memory/claude-api skill] (current as of 2026-05); override
via env vars for fine-grained migration:

    TRADER_ANTHROPIC_PLANNER   default: claude-opus-4-7
    TRADER_ANTHROPIC_EXECUTOR  default: claude-haiku-4-5

The wrapper extracts text from Anthropic's `message.content` blocks (list of
{type, text}) and packs everything into the shared `Call` shape so the router
doesn't see Anthropic-specific types.
"""

from __future__ import annotations

import os
import time
from typing import Any

from trader.llm.client import Call, Role


_DEFAULT_PLANNER = "claude-opus-4-7"
_DEFAULT_EXECUTOR = "claude-haiku-4-5"


class AnthropicBackend:
    """Backend protocol implementation using the official `anthropic` SDK."""

    name = "anthropic"

    def __init__(self) -> None:
        from anthropic import Anthropic  # imported lazily; raises if SDK missing

        api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
        self._client = Anthropic(api_key=api_key) if api_key else None
        self.planner_model = os.environ.get("TRADER_ANTHROPIC_PLANNER", _DEFAULT_PLANNER)
        self.executor_model = os.environ.get("TRADER_ANTHROPIC_EXECUTOR", _DEFAULT_EXECUTOR)

    @property
    def available(self) -> bool:
        return self._client is not None

    def _model_for(self, role: Role) -> str:
        return self.planner_model if role is Role.PLANNER else self.executor_model

    def chat(
        self,
        role: Role,
        messages: list[dict[str, Any]],
        *,
        response_format: dict[str, Any] | None = None,
        max_tokens: int = 4096,
        temperature: float | None = None,
    ) -> Call:
        model = self._model_for(role)
        if temperature is None:
            temperature = 0.15 if role is Role.PLANNER else 0.3

        # Anthropic's API splits system out from the messages list.
        system_text, conv = _split_system(messages)
        # If a JSON object is requested, hint via system prompt — Anthropic
        # doesn't have a structured `response_format` like OpenAI/Nemotron yet.
        if response_format and response_format.get("type") == "json_object":
            system_text = (
                (system_text + "\n\n" if system_text else "")
                + "Respond with a single valid JSON object only. No prose, no code fences."
            )

        call = Call(
            backend="anthropic",
            model=model,
            role=role.value,
            metadata={"system_prefix_chars": len(system_text)},
        )

        if not self.available:
            call.error = "ANTHROPIC_API_KEY not set"
            return call

        started = time.perf_counter()
        try:
            resp = self._client.messages.create(  # type: ignore[union-attr]
                model=model,
                max_tokens=max_tokens,
                temperature=temperature,
                system=system_text or None,
                messages=conv,
            )
        except Exception as exc:  # noqa: BLE001 — surface to telemetry
            call.latency_ms = int((time.perf_counter() - started) * 1000)
            call.error = f"anthropic: {exc}"
            return call

        call.latency_ms = int((time.perf_counter() - started) * 1000)
        call.content = _extract_text(resp)
        usage = getattr(resp, "usage", None)
        if usage is not None:
            call.prompt_tokens = getattr(usage, "input_tokens", None)
            call.completion_tokens = getattr(usage, "output_tokens", None)
        return call


def _split_system(messages: list[dict[str, Any]]) -> tuple[str, list[dict[str, Any]]]:
    """Anthropic wants system text out-of-band. Concatenate all system msgs."""
    sys_parts: list[str] = []
    conv: list[dict[str, Any]] = []
    for m in messages:
        role = m.get("role")
        if role == "system":
            sys_parts.append(m.get("content") or "")
        else:
            conv.append({"role": role, "content": m.get("content") or ""})
    return "\n\n".join(p for p in sys_parts if p), conv


def _extract_text(resp: Any) -> str:
    """Stitch the text blocks together; ignore tool-use blocks (v1 doesn't use them)."""
    content = getattr(resp, "content", None) or []
    parts: list[str] = []
    for block in content:
        # SDK returns objects with .type and .text; fall back to dict access.
        btype = getattr(block, "type", None) or (block.get("type") if isinstance(block, dict) else None)
        if btype == "text":
            text = getattr(block, "text", None) or (block.get("text") if isinstance(block, dict) else "")
            if text:
                parts.append(text)
    return "".join(parts)
