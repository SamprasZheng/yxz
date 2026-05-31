---
type: concept
tags: [ai-agents, guardrails, security, privacy, pii, sanitization, exfiltration]
---

# Agent Data Sanitization — PII and Secret Masking Before LLM Calls

**Agent data sanitization** is the practice of detecting and neutralizing sensitive strings — PII, credentials, account identifiers — in the text that feeds an agent's LLM prompt *before* that prompt is transmitted to a cloud inference endpoint. It severs the first leg of Simon Willison's "lethal trifecta" (see [[sources/willison-lethal-trifecta-2025]]): even if an agent is prompt-injected and attempts exfiltration, there is nothing sensitive in the prompt context to exfiltrate.

This page documents the general pattern. For one concrete instantiation, see [[concepts/nemoclaw]], which includes a pluggable "Privacy Router" component that strips PII from prompts before they leave the sandbox and reach cloud inference.

## Why Sanitization Is Necessary

When a locally-running agent reads from a private data vault (financial records, loan details, account numbers, crypto wallet addresses) and then constructs a prompt that summarizes or queries that data, the raw sensitive values travel inside the prompt to whichever LLM API is being called. Even with [[concepts/agent-egress-control]] in place:

- The LLM API endpoint *is* on the allowlist — it has to be.
- A prompt injection in another part of the context can cause the model to repeat or summarize the sensitive values it saw earlier in the same turn.
- The LLM provider's logs, fine-tuning pipelines, or a future breach of the provider's infrastructure can expose those values.
- A misconfigured allowlist or a future addition of a new permitted endpoint is a single point of failure.

Sanitization provides **defense-in-depth**: the sensitive data never reaches the cloud even if egress control is bypassed or correctly permits the LLM endpoint.

OWASP Top 10 for LLM Applications 2025 — **LLM02:2025 Sensitive Information Disclosure** — explicitly recommends "LLM applications should perform adequate data sanitization to prevent user data from entering the training model" and lists tokenization and redaction as mitigations.

## Two Sanitization Strategies

### Irreversible Redaction

The sensitive entity is permanently removed or replaced with a fixed placeholder. The downstream prompt and response never contain the original value.

| Operator | Result | Use case |
|---|---|---|
| **Redact** | Entity removed entirely | Secrets, keys — value is irrelevant to the task |
| **Mask** | Characters replaced (`ACCT_###`) | Account IDs where structure is meaningful but value is not |
| **Hash** (SHA-256/SHA-512, salted) | Deterministic opaque token | Deduplication without exposing value |
| **Replace** | Fixed label (`<PERSON>`, `<CREDIT_CARD>`) | Classification tasks where type matters, value does not |

Irreversible redaction is the right choice for API secrets, private keys, and raw account numbers. The agent can reason about the *type* of entity ("this field contains an account ID") without the cloud LLM ever seeing `ACCT-00193847`.

### Reversible Pseudonymization (Tokenization)

The sensitive entity is replaced with a synthetic stand-in; a local mapping is kept that allows the original value to be restored after the LLM response is received.

```
Input:  "Account 00193847 has a balance of $142,300"
→ Sent to LLM: "Account ACCT_TOKEN_A1 has a balance of AMT_TOKEN_B1"
← LLM responds: "ACCT_TOKEN_A1 is overweight equities by 12%"
→ Local deanonymization: "Account 00193847 is overweight equities by 12%"
```

This allows the LLM to reason about relationships between entities (e.g., "the same account that holds X also holds Y") without seeing the actual values. The mapping is held in local process memory and is never transmitted.

Reversible operators include **Encrypt** (AES with a local key, decryptable by `DeanonymizerEngine`) and **Replace with fake values** (Faker-generated realistic names / IDs that preserve entity grammar while being fictional).

### Choosing Between Them

| Criterion | Irreversible | Reversible |
|---|---|---|
| Secret must never appear anywhere in cloud | Yes — use irreversible | — |
| LLM needs to track entity identity across turns | — | Yes — use reversible |
| Output needs to reference original value | No | Yes |
| Compliance / audit trail required | Either (hash creates linkable token) | Reversible with audit log |

For a finance-vault agent: redact/mask raw account numbers, loan balances, and national IDs; use reversible pseudonymization for names and entity references where the LLM's reasoning depends on them being consistent.

## Microsoft Presidio — The Canonical OSS Tool

**Presidio** ([github.com/microsoft/presidio](https://github.com/microsoft/presidio), MIT license) is Microsoft's open-source PII detection and anonymization framework. It is the most widely adopted OSS tool for this pattern, wrapped by LangChain and LlamaIndex, and deployed in production at multiple companies.

### Architecture

```
Text with PII
    │
    ▼
┌─────────────────────────────────────┐
│  AnalyzerEngine                     │
│  • Named Entity Recognition (spaCy) │
│  • Regex recognizers (credit card,  │
│    SSN, IBAN, phone, email, …)      │
│  • Checksum validators              │
│  • Context-based disambiguation     │
└─────────────────────────────────────┘
    │  List of RecognizerResult entities
    ▼
┌─────────────────────────────────────┐
│  AnonymizerEngine                   │
│  Per-entity operator:               │
│  Replace / Redact / Hash /          │
│  Mask / Encrypt / Custom (lambda)   │
└─────────────────────────────────────┘
    │  Anonymized text + entity map
    ▼
[Send to LLM]
    │  LLM response (with tokens)
    ▼
┌─────────────────────────────────────┐
│  DeanonymizerEngine                 │
│  Reverses Encrypt; other ops        │
│  are one-way                        │
└─────────────────────────────────────┘
    │  Restored response
    ▼
User / downstream system
```

### Built-in Recognizers (selected)

- Credit card numbers (Luhn-validated)
- US SSN, IBAN, SWIFT/BIC
- Email addresses, phone numbers
- Person names, locations (NER via spaCy)
- IP addresses, US driving license, passport numbers
- **Custom recognizers** via regex or ML model

### Installation

```bash
pip install presidio-analyzer presidio-anonymizer
python -m spacy download en_core_web_lg  # NER model
```

The `presidio-image-redactor` package extends detection to images via OCR.

### Pseudonymization with Faker

```python
from presidio_anonymizer import AnonymizerEngine
from presidio_anonymizer.entities import OperatorConfig
from faker import Faker

fake = Faker()
engine = AnonymizerEngine()

operators = {
    "PERSON": OperatorConfig("custom", {"lambda": lambda _: fake.name()}),
    "CREDIT_CARD": OperatorConfig("mask", {"masking_char": "#", "chars_to_mask": 12, "from_end": False}),
    "IBAN_CODE": OperatorConfig("replace", {"new_value": "<IBAN_REDACTED>"}),
}
```

### Encrypt + Deanonymize (Reversible)

```python
from presidio_anonymizer.entities import OperatorConfig
import json

operators = {
    "PERSON": OperatorConfig("encrypt", {"key": "<32-byte-local-key>"}),
}
result = engine.anonymize(text=prompt, analyzer_results=pii_list, operators=operators)
# ... send result.text to LLM ...
# restore:
from presidio_anonymizer import DeanonymizerEngine
deanonymizer = DeanonymizerEngine()
restored = deanonymizer.deanonymize(result.text, result.items)
```

## Alternative Tools

| Tool | License | Notes |
|---|---|---|
| **Presidio** (Microsoft) | MIT | Most complete; NER + regex + image; Python + REST API |
| **spaCy NER + custom rules** | MIT | Lower-level; build your own pipeline |
| **AWS Comprehend** (PII detection API) | Commercial | Managed; no self-hosting; sends text to AWS |
| **Google DLP API** | Commercial | Managed; 50+ infoTypes; Cloud-only |
| **Scrubadub** | MIT | Lightweight Python; fewer entity types than Presidio |
| **GLiNER** | Apache 2.0 | NLP zero-shot NER; useful for domain-specific entities Presidio misses |

For local-only operation (required when the private vault content must not leave the machine), Presidio is the right default: it runs entirely in-process, no cloud dependency.

## Secret Pattern Matching

PII recognizers cover people and financial data; secrets require separate pattern matching:

| Secret type | Regex pattern (illustrative) |
|---|---|
| OpenAI / Anthropic API key | `sk-[A-Za-z0-9]{48}` |
| AWS access key | `AKIA[A-Z0-9]{16}` |
| Generic high-entropy 40+ hex | `[0-9a-f]{40,}` |
| Private key PEM header | `-----BEGIN (RSA |EC |)PRIVATE KEY-----` |
| JWT | `eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+` |
| National ID (Taiwan) | `[A-Z][12][0-9]{8}` |

These should be applied as additional Presidio `PatternRecognizer` entities or as a pre-pass regex scan.

## Sanitization Pipeline Position

The sanitizer must sit **between the local data source and the LLM API call** — not inside the LLM's system prompt, which can be bypassed. The correct architecture:

```
Private vault (filesystem / DB)
    │
    ▼
[Data reader tool]
    │  raw text with PII/secrets
    ▼
[Sanitization layer — Presidio + secret scanner]
    │  masked/tokenized text
    ▼
[Prompt constructor]
    │  clean prompt
    ▼
[Egress proxy → LLM API]           ← also governed by [[concepts/agent-egress-control]]
```

The sanitization layer is a local in-process step — the raw sensitive text never leaves this boundary.

## Limitations

- **Context-dependent PII**: Presidio may miss PII that is only sensitive in combination (e.g., "P1 is overweight NVDA" is not PII alone, but combined with "P1 belongs to Sampras" it is). Structural isolation (separate system-prompt contexts) is the right complement.
- **Novel secret formats**: Custom or internal key formats require custom recognizers.
- **Residual leakage in reasoning**: Even with masked prompts, a very capable model may statistically infer entity identities from co-occurrence patterns if the same masked token appears in many prompts. For high-sensitivity data, irreversible redaction is safer than consistent pseudonymization.
- **Performance**: NER adds latency (~50–200 ms per 1k tokens on CPU). Cache analysis results where the same document is referenced repeatedly.

## Relationship to Other Concepts

- [[sources/willison-lethal-trifecta-2025]] — this layer severs lethal-trifecta leg 1 (access to private data in the prompt)
- [[concepts/agent-egress-control]] — the complementary network layer that severs leg 3 (exfiltration vector); both layers are needed
- [[concepts/nemoclaw]] — NemoClaw's Privacy Router is a pluggable component implementing this pattern between the agent and the gateway
- [[concepts/agentic-provenance]] — provenance logs should record which sanitization pass was applied to each prompt turn

## Sources

- Microsoft, [*Presidio — Home*](https://microsoft.github.io/presidio/) and [*Presidio Anonymizer*](https://microsoft.github.io/presidio/anonymizer/) — official documentation
- Microsoft, [github.com/microsoft/presidio](https://github.com/microsoft/presidio) — MIT-licensed source; active as of 2026
- OWASP, [*LLM02:2025 Sensitive Information Disclosure*](https://genai.owasp.org/llmrisk/llm02-insecure-output-handling/) — OWASP Top 10 for LLM Applications 2025
- Simon Willison, [*The lethal trifecta for AI agents*](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) (2025-06-16) — threat framing
- DZone, [*Secure LLM Usage With Reversible Data Anonymization*](https://dzone.com/articles/llm-pii-anonymization-guide) — reversible tokenization pipeline walkthrough
- John, [*Protecting Sensitive Data When Using AI Tools: Presidio and Alternatives*](https://johnoct.com/blog/2026/01/25/presidio-redaction-protecting-sensitive-data-ai-tools/) — alternatives comparison (Jan 2026)
