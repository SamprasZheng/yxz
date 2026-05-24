"""LLM clients + dual-model router for Firefly."""

from firefly.llm.nemotron import NemotronClient, NemotronError
from firefly.llm.router import LLMRouter, Role

__all__ = ["NemotronClient", "NemotronError", "LLMRouter", "Role"]
