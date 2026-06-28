"""Nemotron backend — wraps firefly.llm.nemotron.NemotronClient.

Reuses the existing NemoClaw-friendly client (local Ollama on RTX 5070 by
default; NVIDIA NIM cloud if NEMOTRON_BACKEND=nim). Maps Role → the planner
or executor model SKU resolved by `resolve_backend()`.

We intentionally re-use Firefly's client rather than re-implementing the
OpenAI-compatible transport. Firefly is a peer package inside the same wheel
(`agents/pyproject.toml` lists both under hatch packages), so the import is
zero-cost.
"""

from __future__ import annotations

import time
from typing import Any

from firefly.llm.nemotron import NemotronClient, resolve_backend

from trader.llm.client import Call, Role


_ROLE_TO_REASONING = {
    Role.PLANNER: "on",
    Role.EXECUTOR: "off",
}


class NemotronBackend:
    """Backend protocol implementation using Firefly's NemotronClient."""

    name = "nemotron"

    def __init__(self, client: NemotronClient | None = None) -> None:
        self.client = client or NemotronClient(backend=resolve_backend())

    @property
    def available(self) -> bool:
        return self.client.available

    def _model_for(self, role: Role) -> str:
        be = self.client.backend
        return be.planner_model if role is Role.PLANNER else be.executor_model

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
        reasoning = _ROLE_TO_REASONING[role]
        if temperature is None:
            temperature = 0.15 if role is Role.PLANNER else 0.3

        nem_call = self.client.chat(
            model=model,
            messages=messages,
            reasoning=reasoning,
            temperature=temperature,
            max_tokens=max_tokens,
            response_format=response_format,
            role=role.value,
        )
        return Call(
            backend=f"nemotron/{self.client.backend.name}",
            model=model,
            role=role.value,
            latency_ms=nem_call.latency_ms,
            prompt_tokens=nem_call.prompt_tokens,
            completion_tokens=nem_call.completion_tokens,
            content=nem_call.content,
            error=nem_call.error,
            metadata={"reasoning": reasoning, "base_url": self.client.backend.base_url},
        )
