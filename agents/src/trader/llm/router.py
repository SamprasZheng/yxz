"""Dual-role router — single entry point every trader agent talks to.

Mirrors Firefly's [`LLMRouter`](../../firefly/llm/router.py): the agent code
calls `router.planner(...)` or `router.executor(...)`, and the backend
decides what concrete model SKU answers. Accumulates a per-call trace that
lands in the run JSON for the wiki audit trail.
"""

from __future__ import annotations

from typing import Any

from trader.llm.client import Backend, Call, Role, load_backend


class LLMRouter:
    """Routes (role, messages) → (backend SKU, response). Owns the trace."""

    def __init__(self, backend: Backend | None = None) -> None:
        self.backend: Backend = backend or load_backend()
        self.trace: list[Call] = []

    @property
    def available(self) -> bool:
        return self.backend.available

    def chat(
        self,
        role: Role,
        messages: list[dict[str, Any]],
        *,
        response_format: dict[str, Any] | None = None,
        max_tokens: int = 4096,
        temperature: float | None = None,
    ) -> Call:
        call = self.backend.chat(
            role,
            messages,
            response_format=response_format,
            max_tokens=max_tokens,
            temperature=temperature,
        )
        self.trace.append(call)
        return call

    def planner(self, messages: list[dict[str, Any]], **kw: Any) -> Call:
        return self.chat(Role.PLANNER, messages, **kw)

    def executor(self, messages: list[dict[str, Any]], **kw: Any) -> Call:
        return self.chat(Role.EXECUTOR, messages, **kw)

    def summary(self) -> dict[str, Any]:
        """Telemetry rollup for the run JSON + the wiki page footer."""
        by_role: dict[str, dict[str, Any]] = {}
        for c in self.trace:
            entry = by_role.setdefault(
                c.role,
                {
                    "model": c.model,
                    "backend": c.backend,
                    "calls": 0,
                    "latency_ms_total": 0,
                    "prompt_tokens": 0,
                    "completion_tokens": 0,
                    "errors": 0,
                },
            )
            entry["calls"] += 1
            entry["latency_ms_total"] += c.latency_ms
            entry["prompt_tokens"] += c.prompt_tokens or 0
            entry["completion_tokens"] += c.completion_tokens or 0
            if c.error:
                entry["errors"] += 1
        return {
            "backend": self.backend.name,
            "by_role": by_role,
            "total_calls": len(self.trace),
        }
