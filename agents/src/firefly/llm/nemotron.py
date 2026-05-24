"""OpenAI-compatible client for Nemotron, defaulting to LOCAL Ollama on RTX 5070.

Why OpenAI-compat surface? Same code path works against three transports:

  1. LOCAL (default) — Ollama at http://127.0.0.1:11434/v1, model
     `nemotron-3-nano:4b` (Q4, ~2.8 GB; fits 12 GB VRAM with KV headroom).
     No VPN, no API key, no rate limit. Used by NemoClaw `my-assistant`
     sandbox already (see scripts/start-ollama.sh, scripts/nemoclaw-force-ollama.sh).
  2. CLOUD NIM (opt-in) — https://integrate.api.nvidia.com/v1, set
     NVIDIA_API_KEY + NEMOTRON_BACKEND=nim. Same Nano 9B v2 / Super 49B SKUs.
  3. ON-PREM NIM — set NEMOTRON_BASE_URL to a self-hosted NIM container,
     e.g. on DGX Spark, kept exactly the same.

Reasoning ON/OFF is a Nemotron-family directive — a one-line prefix on the
first system message (`detailed thinking on` / `detailed thinking off`). This
works on both local Ollama-served Nemotron and NIM-served Nemotron because
the model card defines the convention, not the server.
"""

from __future__ import annotations

import json
import os
import time
from dataclasses import dataclass, field
from typing import Any

import httpx

# ---- transport defaults --------------------------------------------------

LOCAL_OLLAMA_BASE_URL = "http://127.0.0.1:11434/v1"
CLOUD_NIM_BASE_URL = "https://integrate.api.nvidia.com/v1"

# Local model SKUs (Ollama tags). Both are real Nemotron-3 family with
# `tools` + `thinking` capabilities, validated under NemoClaw's meta-prompt.
LOCAL_PLANNER_MODEL = os.environ.get("FIREFLY_LOCAL_PLANNER", "nemotron-3-nano:4b")
LOCAL_EXECUTOR_MODEL = os.environ.get("FIREFLY_LOCAL_EXECUTOR", "nemotron-3-nano:4b")

# Cloud NIM SKUs — only used when NEMOTRON_BACKEND=nim.
CLOUD_PLANNER_MODEL = os.environ.get(
    "FIREFLY_CLOUD_PLANNER", "nvidia/llama-3.3-nemotron-super-49b-v1.5"
)
CLOUD_EXECUTOR_MODEL = os.environ.get(
    "FIREFLY_CLOUD_EXECUTOR", "nvidia/nemotron-nano-9b-v2"
)

REASONING_ON_SYSTEM_PREFIX = "detailed thinking on\n\n"
REASONING_OFF_SYSTEM_PREFIX = "detailed thinking off\n\n"


class NemotronError(RuntimeError):
    """Raised when the endpoint returns a non-2xx or malformed payload."""


@dataclass
class NemotronCall:
    """Captured request/response for telemetry + the demo trace."""
    model: str
    role: str
    reasoning: str
    latency_ms: int
    backend: str = "local"
    prompt_tokens: int | None = None
    completion_tokens: int | None = None
    content: str = ""
    tool_calls: list[dict[str, Any]] = field(default_factory=list)
    error: str | None = None


@dataclass
class Backend:
    """Resolved transport — base URL + auth + which model SKUs to use."""
    name: str
    base_url: str
    api_key: str
    planner_model: str
    executor_model: str

    @property
    def auth_header(self) -> dict[str, str]:
        # Ollama accepts (and ignores) any bearer; NIM requires the real key.
        return {"Authorization": f"Bearer {self.api_key or 'local'}"}


def resolve_backend() -> Backend:
    """Pick the transport based on env vars, defaulting to LOCAL Ollama."""
    explicit = (os.environ.get("NEMOTRON_BACKEND") or "").strip().lower()
    nvidia_key = os.environ.get("NVIDIA_API_KEY", "").strip()
    override_url = (os.environ.get("NEMOTRON_BASE_URL") or "").strip()

    if explicit == "disabled":
        # Tests / CI / offline demos — every call returns error, agents fall back.
        return Backend(
            name="disabled",
            base_url="",
            api_key="",
            planner_model=LOCAL_PLANNER_MODEL,
            executor_model=LOCAL_EXECUTOR_MODEL,
        )

    if explicit == "nim" or (not explicit and nvidia_key and not override_url):
        # Cloud NIM. Requires a key.
        return Backend(
            name="nim",
            base_url=override_url or CLOUD_NIM_BASE_URL,
            api_key=nvidia_key,
            planner_model=CLOUD_PLANNER_MODEL,
            executor_model=CLOUD_EXECUTOR_MODEL,
        )

    # Default: local Ollama (or an on-prem NIM if NEMOTRON_BASE_URL is set).
    return Backend(
        name="local" if not override_url else "onprem",
        base_url=override_url or LOCAL_OLLAMA_BASE_URL,
        api_key=nvidia_key,  # may be empty; Ollama ignores
        planner_model=LOCAL_PLANNER_MODEL,
        executor_model=LOCAL_EXECUTOR_MODEL,
    )


class NemotronClient:
    """Thin wrapper over an OpenAI-compatible chat completions endpoint."""

    def __init__(
        self,
        backend: Backend | None = None,
        timeout_s: float = 180.0,
    ) -> None:
        self.backend = backend or resolve_backend()
        self.timeout_s = timeout_s
        self._client = httpx.Client(timeout=timeout_s)

    @property
    def available(self) -> bool:
        """True if a reachable transport is configured.

        For local Ollama we don't ping at import time; we let the first call
        fail loudly with a transport error. The orchestrator falls back to a
        deterministic stub on failure so demos never crash.
        """
        if self.backend.name == "disabled":
            return False
        if self.backend.name == "nim":
            return bool(self.backend.api_key)
        return True  # local / onprem — assume reachable; verify lazily

    def chat(
        self,
        model: str,
        messages: list[dict[str, Any]],
        *,
        reasoning: str = "off",
        temperature: float = 0.2,
        max_tokens: int = 4096,
        tools: list[dict[str, Any]] | None = None,
        response_format: dict[str, Any] | None = None,
        role: str = "executor",
    ) -> NemotronCall:
        """Issue one chat completion. Returns NemotronCall regardless of outcome."""
        prefix = REASONING_ON_SYSTEM_PREFIX if reasoning == "on" else REASONING_OFF_SYSTEM_PREFIX
        prepared = _inject_reasoning_prefix(messages, prefix)

        body: dict[str, Any] = {
            "model": model,
            "messages": prepared,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": False,
        }
        if tools:
            body["tools"] = tools
            body["tool_choice"] = "auto"
        if response_format:
            body["response_format"] = response_format

        headers = {
            **self.backend.auth_header,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        started = time.perf_counter()
        call = NemotronCall(
            model=model,
            role=role,
            reasoning=reasoning,
            latency_ms=0,
            backend=self.backend.name,
        )

        if self.backend.name == "disabled":
            call.error = "backend disabled (NEMOTRON_BACKEND=disabled)"
            return call

        try:
            resp = self._client.post(
                f"{self.backend.base_url}/chat/completions",
                json=body,
                headers=headers,
            )
        except httpx.HTTPError as exc:
            call.latency_ms = int((time.perf_counter() - started) * 1000)
            call.error = f"transport ({self.backend.name}): {exc}"
            return call

        call.latency_ms = int((time.perf_counter() - started) * 1000)

        if resp.status_code >= 400:
            call.error = f"http {resp.status_code} ({self.backend.name}): {resp.text[:300]}"
            return call

        try:
            data = resp.json()
        except json.JSONDecodeError as exc:
            call.error = f"non-json response: {exc}"
            return call

        choice = (data.get("choices") or [{}])[0]
        msg = choice.get("message") or {}
        call.content = msg.get("content") or ""
        call.tool_calls = msg.get("tool_calls") or []
        usage = data.get("usage") or {}
        call.prompt_tokens = usage.get("prompt_tokens")
        call.completion_tokens = usage.get("completion_tokens")
        return call

    def close(self) -> None:
        self._client.close()


def _inject_reasoning_prefix(
    messages: list[dict[str, Any]], prefix: str
) -> list[dict[str, Any]]:
    """Prepend the Nemotron reasoning-control prefix to the first system message.

    Per the Llama-3.3-Nemotron-Super and Nemotron-3-Nano model cards,
    `detailed thinking on/off` is a system-message directive that the model
    has been post-trained to honor. We splice it onto the first system message
    so callers don't need to know the convention.
    """
    if not messages:
        return [{"role": "system", "content": prefix.strip()}]

    out: list[dict[str, Any]] = []
    injected = False
    for m in messages:
        if not injected and m.get("role") == "system":
            new_content = prefix + (m.get("content") or "")
            out.append({**m, "content": new_content})
            injected = True
        else:
            out.append(m)
    if not injected:
        out.insert(0, {"role": "system", "content": prefix.strip()})
    return out
