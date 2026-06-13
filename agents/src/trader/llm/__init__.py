"""Trader LLM layer — Backend protocol + dual-role router.

Two backends ship in v1, swapped via `LLM_BACKEND` env var:

  nemotron   — re-uses firefly.llm.nemotron.NemotronClient (NemoClaw on
               RTX 5070 by default; NVIDIA NIM cloud if NEMOTRON_BACKEND=nim).
  anthropic  — claude-opus-4-7 (planner) + claude-haiku-4-5 (executor).
  disabled   — deterministic stubs returning fixture JSON. Used in tests
               and offline demos.

No agent module imports a specific model name. The router maps Role → the
backend's resolved model SKU.
"""

from trader.llm.client import Backend, Call, Role, load_backend
from trader.llm.router import LLMRouter

__all__ = ["Backend", "Call", "Role", "load_backend", "LLMRouter"]
