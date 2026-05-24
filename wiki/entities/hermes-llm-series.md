---
type: entity
tags: [ai, llm, hermes, nous-research, open-weights, fine-tuning]
---

# Hermes LLM Series

The **Hermes LLM series** is the open-weight fine-tuned model lineage from [[entities/nous-research]]. This is distinct from the [[concepts/hermes-agent-framework]] — same org, same brand name, different artifact. The agent framework can drive Hermes LLMs *or* any other provider's models.

**HuggingFace org:** https://huggingface.co/NousResearch

## Lineage

| Generation | Notable variants | Base model | Notes |
|---|---|---|---|
| Nous-Hermes (Llama-1 / Llama-2) | Nous-Hermes-Llama-2-7B, Nous-Hermes-Llama2-13B | Llama-2 | Early instruction-tuned releases |
| Hermes-2 Pro | 7B, Mixtral variants | Llama-2 / Mistral | Function-calling focused |
| Hermes-3 | 8B / 70B / 405B | Llama-3.1 | Generalist tool-use + reasoning |
| **Hermes-4** | **70B**, **14B**, **405B** | Llama-3.1 (70B, 405B) and Qwen-3 (14B) | "Frontier hybrid-mode reasoning"; aligned to the user rather than vendor-RLHF defaults |

Hermes-4 is described on HuggingFace as a "frontier, hybrid-mode reasoning model." The 14B variant uses Qwen-3-14B as base, breaking the Llama-only convention of earlier generations.

## Positioning

- **Open weights, permissive licenses** — downloadable from HuggingFace, runnable locally with vLLM/Ollama/SGLang
- **Alignment philosophy:** aligned to the end user, not the model vendor — explicit counter-positioning vs. RLHF-heavy frontier labs
- **Function calling / tool use:** Hermes-2 Pro onward emphasizes structured tool calling, which is what makes them well-suited as the underlying brain for [[concepts/hermes-agent-framework]]

## Credits

The model fine-tuning and datasets across the series are credited to **Teknium, Karan4D, Emozilla, Huemin Art and Redmond AI**.

## Wiki relevance

Disambiguation page — exists primarily to keep [[concepts/hermes-agent-framework]] clean. If a source mentions "Hermes 70B" or "Hermes-4," it almost certainly refers to a model on this page; if it says "Hermes agent," "Hermes framework," or "skills/learning loop," it refers to the framework.
