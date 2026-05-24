"""Dual-mode router: same Nemotron-3 Nano served twice — planner (thinking ON), executor (thinking OFF).

Default transport is **local Ollama on RTX 5070** (`nemotron-3-nano:4b`, ~2.8 GB).
The cloud NIM path is an opt-in fallback (set `NEMOTRON_BACKEND=nim`).

Why one model in two modes instead of two models? On 12 GB VRAM we can't
hold two Nemotron checkpoints hot. The Nemotron family's `detailed thinking
on/off` toggle is *exactly* the differentiator we're showcasing — same
weights, same SKU, two operating modes. Other model families (Llama, Qwen,
DeepSeek) do not give you this in one ollama-pull-able artifact.

When NEMOTRON_BACKEND=nim is set, the router uses two different cloud SKUs
(Super-49B for planner, Nano-9B for executor) because cloud isn't memory-bound.
"""

from __future__ import annotations

from enum import Enum
from typing import Any

from firefly.llm.nemotron import (
    Backend,
    NemotronCall,
    NemotronClient,
    resolve_backend,
)


class Role(str, Enum):
    PLANNER = "planner"     # detailed thinking ON  — orbit design, narrator
    EXECUTOR = "executor"   # detailed thinking OFF — tool calls, classification


_ROLE_TO_REASONING = {
    Role.PLANNER: "on",
    Role.EXECUTOR: "off",
}


def _model_for(backend: Backend, role: Role) -> str:
    return backend.planner_model if role is Role.PLANNER else backend.executor_model


class LLMRouter:
    """Single entry point Firefly agents talk to."""

    def __init__(self, client: NemotronClient | None = None) -> None:
        self.client = client or NemotronClient()
        self.trace: list[NemotronCall] = []

    @property
    def backend(self) -> Backend:
        return self.client.backend

    @property
    def available(self) -> bool:
        return self.client.available

    def chat(
        self,
        role: Role,
        messages: list[dict[str, Any]],
        *,
        tools: list[dict[str, Any]] | None = None,
        response_format: dict[str, Any] | None = None,
        max_tokens: int = 4096,
        temperature: float | None = None,
    ) -> NemotronCall:
        model = _model_for(self.backend, role)
        reasoning = _ROLE_TO_REASONING[role]
        if temperature is None:
            temperature = 0.15 if role is Role.PLANNER else 0.3

        call = self.client.chat(
            model=model,
            role=role.value,
            messages=messages,
            reasoning=reasoning,
            tools=tools,
            response_format=response_format,
            max_tokens=max_tokens,
            temperature=temperature,
        )
        self.trace.append(call)
        return call

    def planner(self, messages: list[dict[str, Any]], **kw: Any) -> NemotronCall:
        return self.chat(Role.PLANNER, messages, **kw)

    def executor(self, messages: list[dict[str, Any]], **kw: Any) -> NemotronCall:
        return self.chat(Role.EXECUTOR, messages, **kw)

    def summary(self) -> dict[str, Any]:
        """Telemetry rollup for the mission JSON + the demo screenshot."""
        by_role: dict[str, dict[str, Any]] = {}
        for c in self.trace:
            entry = by_role.setdefault(
                c.role,
                {
                    "model": c.model,
                    "reasoning": c.reasoning,
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
            "base_url": self.backend.base_url,
            "by_role": by_role,
            "total_calls": len(self.trace),
        }
