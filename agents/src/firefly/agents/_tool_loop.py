"""Shared tool-calling loop for executor-tier agents.

OpenAI-compatible: model returns `tool_calls`, we dispatch via `ALL_TOOLS`,
feed results back as `role=tool` messages, repeat up to `max_rounds` rounds.

Returns a structured trace so the demo + mission JSON can show *exactly*
which tools Nemotron Nano picked, with arguments and latency.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from typing import Any

from firefly.llm import LLMRouter, Role
from firefly.tools import ALL_TOOLS


@dataclass
class ToolStep:
    name: str
    arguments: dict[str, Any]
    result: Any
    error: str | None = None


@dataclass
class ToolLoopResult:
    final_content: str
    steps: list[ToolStep] = field(default_factory=list)
    rounds: int = 0
    errors: list[str] = field(default_factory=list)


def run_tool_loop(
    router: LLMRouter,
    system_prompt: str,
    user_prompt: str,
    tool_schemas: list[dict[str, Any]],
    *,
    role: Role = Role.EXECUTOR,
    max_rounds: int = 4,
    max_tokens: int = 2048,
) -> ToolLoopResult:
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]
    result = ToolLoopResult(final_content="")

    for round_idx in range(max_rounds):
        result.rounds = round_idx + 1
        call = router.chat(
            role,
            messages,
            tools=tool_schemas,
            max_tokens=max_tokens,
        )
        if call.error:
            result.errors.append(f"round {round_idx + 1}: {call.error}")
            break

        if not call.tool_calls:
            result.final_content = call.content
            break

        # Record the assistant's tool-calling message so context carries forward.
        messages.append(
            {
                "role": "assistant",
                "content": call.content or None,
                "tool_calls": call.tool_calls,
            }
        )

        for tc in call.tool_calls:
            fn = (tc.get("function") or {})
            name = fn.get("name") or ""
            raw_args = fn.get("arguments") or "{}"
            try:
                args = json.loads(raw_args) if isinstance(raw_args, str) else dict(raw_args)
            except json.JSONDecodeError:
                args = {}

            handler = ALL_TOOLS.get(name)
            step = ToolStep(name=name, arguments=args, result=None)
            if handler is None:
                step.error = f"unknown tool: {name}"
                step.result = {"error": step.error}
            else:
                try:
                    step.result = handler(**args)
                except Exception as exc:  # noqa: BLE001 — surface any tool fault to the model
                    step.error = f"tool exception: {exc}"
                    step.result = {"error": step.error}

            result.steps.append(step)
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tc.get("id"),
                    "name": name,
                    "content": json.dumps(step.result, ensure_ascii=False),
                }
            )
    else:
        result.errors.append(f"max_rounds={max_rounds} reached without final answer")

    return result
