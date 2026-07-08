---
type: concept
tags: [ai-agents, provenance, observability, audit, trust, spacesharks-mission-desk, nemoclaw, nvidia-agent-challenge-2026]
---

# Agentic Provenance — Evidence Trails for AI Agent Outputs

**Agentic provenance** is the capacity to answer "where did this recommendation come from?" at every layer of an AI agent's reasoning chain: which input source, which parser version, which model and tier, which arbiter rule, and which sandbox action. It is the connective tissue that makes an agent's outputs contestable, reproducible, and commercially defensible — not just auditable in principle.

Provenance is distinct from logging. A log records *that something happened*. Provenance records *why the output is trustworthy* — by chaining evidence back through every transformation from raw byte to published recommendation. Without provenance, a labeled dataset is just a file. With it, the dataset becomes a moat.

---

## 1. The four trust layers

### Layer 1 — Data trust

Every input row carries:

| Field | Purpose |
|---|---|
| `source_url` | Canonical retrievable URL at ingest time; `null` only for `manual` source_type |
| `source_timestamp` | When the event occurred in the world (not when it was ingested) |
| `ingest_timestamp` | When the agent read and parsed the source |
| `parser_version` | Semver tag or git SHA of the ingestor that produced this row |
| `evidence_hash` | SHA-256 of the raw fetched payload — content-addressed, write-once |

The `evidence_hash` is the ground anchor. If a source mutates post-ingest (the nightly evidence re-hash job in [[concepts/spacesharks-mission-desk-governance]] detects this), the hash fails to match and the row is flagged `needs-human-review`. No silent mutations.

See [[concepts/spacesharks-mission-desk-event-schema]] for the full field specification; this page does not redefine it.

### Layer 2 — Model trust

Every inference output carries:

| Field | Purpose |
|---|---|
| `model_id` | Fully qualified model identifier, e.g. `nemotron-super-49b-v1` |
| `tier` | Inference tier (T1–T5 per [[synthesis/spacesharks-mission-desk-hackathon-plan]] §2.5) |
| `prompt_hash` | SHA-256 of the rendered prompt at call time; enables exact replay |
| `model_confidence` | Calibrated probability emitted by the model or ensemble |
| `ensemble_disagreement_metric` | KL divergence or vote-gap across ensemble members, when applicable |

Cross-link: [[concepts/small-model-ensemble]] (sibling, documents the ensemble architecture) and [[concepts/calibrated-confidence-llm]] (sibling, documents calibration methodology).

The `prompt_hash` is the determinism hook: given the same model version and the same prompt hash, the inference is reproducible. Combined with `parser_version` and `evidence_hash`, a row can be re-derived from first principles.

### Layer 3 — Decision trust

Every recommendation carries a five-tuple:

```
(recommendation, confidence, evidence_pointers, disagreement_level, decision_route)
```

where `decision_route` ∈ `{publish / monitor-only / needs-review}`. This is the layer the [[concepts/spacesharks-mission-desk-governance|governance layer]] reads from when assigning `review_status`. `evidence_pointers` are explicit links to the Layer 1 `evidence_hash` values that contributed to the decision — not a free-text justification, but machine-readable citations.

### Layer 4 — System trust

Every sandbox action emits an audit log row containing:

| Field | Purpose |
|---|---|
| `audit_log_id` | Stable, globally unique identifier for this action |
| `policy_preset_hash` | SHA-256 of the active `openclaw-sandbox.yaml` at action time |
| `denied_actions[]` | List of tool calls blocked by the policy in this session window |

[[concepts/nemoclaw]] enforces this at the OpenShell runtime layer, outside the agent process — the agent cannot suppress its own audit trail via prompt injection. [[concepts/nemoclaw-policy-presets]] governs which policy YAML is active. The `policy_preset_hash` is the tamper-evidence anchor for Layer 4: a judge can verify that the policy file committed to the repo is the exact file that ran.

---

## 2. Industry and standards analogues

### W3C PROV (PROV-DM / PROV-O)

The canonical academic vocabulary for provenance. [PROV-DM](https://www.w3.org/TR/prov-dm/) (W3C Recommendation, 30 April 2013) defines the core data model: entities, activities, and agents connected by `wasGeneratedBy`, `used`, `wasAttributedTo`, and `wasDerivedFrom` relations. [PROV-O](https://www.w3.org/TR/prov-o/) maps those relations to OWL. The four-layer model above is a domain-specific instantiation of PROV-DM for agent pipelines: a `recommendation` entity `wasGeneratedBy` an inference activity `used` a dataset entity `wasAttributedTo` a model agent.

### C2PA / Content Credentials

[C2PA](https://c2pa.org/) (Coalition for Content Provenance and Authenticity) specifies manifest-based, cryptographically-signed provenance records attached to digital content. The current specification is **v2.3 (December 2025)**, which — directly relevant to agentic outputs — added **manifests for unstructured text (LLM outputs)** and live-video-streaming support, extending provenance beyond media files to exactly the class of artefact an agent emits ([Content Authenticity Initiative, "State of Content Authenticity 2026"](https://contentauthenticity.org/blog/the-state-of-content-authenticity-in-2026)). Adoption is now hardware-deep (Google integrated **C2PA Assurance Level 2 into Pixel camera silicon**; OpenAI DALL·E/Sora, Adobe Firefly, Google Imagen embed credentials; TikTok mandates labels for realistic AI content). The analogue for agentic outputs: every agent recommendation is a "content unit" carrying a C2PA-style manifest chaining back to its raw sources. The `evidence_hash` in the event schema plays the role of the C2PA content hash; the `policy_preset_hash` plays the role of the tool/software assertion. Technical specification: [spec.c2pa.org](https://spec.c2pa.org/).

### NIST AI 600-1 — Generative AI Profile

[NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) (July 2024) identifies content provenance as one of four primary considerations for generative AI risk management (alongside governance, pre-deployment testing, and incident disclosure). Provenance is referenced 151 times in the document. Key requirements for agentic systems: documented dataset and model provenance, transparency of AI-generated outputs to downstream users, and monitoring for misuse signals. The `recommended_by` field in the event schema directly satisfies the "identify which AI system authored the output" requirement.

### Helicone / LangSmith / Langfuse / AgentOps

Commercial agent observability platforms implement the **trace → span → event** model:

- A **trace** is the full lifecycle of one agent invocation (query to final output).
- A **span** is one unit of work within the trace (tool call, LLM inference call, memory lookup).
- An **event** is a timestamped annotation within a span (policy denial, confidence below threshold).

LangSmith (LangChain-native) offers the deepest agent-execution graph tracing with node-by-node state diffs. Langfuse (open-source, self-hostable) is OpenTelemetry-compatible at the ingestion layer. Helicone is a drop-in API proxy operating at the call level. AgentOps instruments the agent loop directly.

The Mission Desk's JSONL audit trail is functionally equivalent to a self-hosted trace store: each lifecycle event row is a span; the NemoClaw audit log rows are policy-enforcement events nested within that span. The `audit_completeness` metric in [[concepts/spacesharks-mission-desk-evaluation-rubric]] is what commercial platforms call "trace coverage."

### CycloneDX ML-BOM / AI-BOM

[CycloneDX 1.5+](https://cyclonedx.org/capabilities/mlbom/) introduced the Machine Learning Bill of Materials (ML-BOM): model name and version, training-data sources, evaluation metrics, license, and provenance attestation for the model artifact itself. The current specification is v1.7 (October 2025, ECMA-424 2nd Edition). The `model_id` field in Layer 2 above is the runtime pointer into the ML-BOM record for the deployed model.

### EU AI Act Article 50

[Article 50](https://artificialintelligenceact.eu/article/50/) of the EU AI Act requires that providers of AI systems generating synthetic content mark outputs in a machine-readable format detectable as AI-generated. The markings must be effective, interoperable, robust, and resistant to deliberate removal. **Application date: 2 August 2026** (the AI Omnibus provisional agreement of May 2026 grandfathers GenAI systems already on the market until **2 December 2026** for the Article 50(2) marking requirement); a Commission [Code of Practice on AI-generated content](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content) (2nd draft March 2026, final expected mid-2026) operationalises it, converging on C2PA as the reference marking format ([Sidley, "Preparing for Compliance by 2 August 2026"](https://datamatters.sidley.com/2026/06/24/eu-ai-act-transparency-obligations-preparing-for-compliance-by-2-august-2026/)). For the Mission Desk, every published row carries `recommended_by` (which agent version) and `evidence_hash` (tamper-evident source link) — satisfying the machine-readable marking and preservation-of-provenance obligations for the EU market.

### NemoClaw audit log + L7 credential proxy

The runtime hook for Layer 4. [[concepts/nemoclaw]] enforces audit logging outside the agent process: a sandboxed agent cannot suppress its own log lines even if compromised. The L7 credential proxy is also an audit surface — every inference call that egresses the sandbox passes through it, so model calls are logged at the network layer independent of the agent's own instrumentation. This is the key distinction from commercial observability platforms, which depend on the agent self-reporting.

---

## 2.5 Six-region provenance-regulation map (台美日韓中國歐洲)

Provenance is the one AI-trust layer that has moved from voluntary spec to **hard law** — and it inverts the usual six-region pattern. On model *capability* the US leads and everyone else chases (see [[synthesis/open-weight-llm-agent-stack-six-region]]); on AI-content *provenance regulation* the pattern flips: **China and Korea legislated mandatory labelling first, while the US remains voluntary/state-patchwork**. For an always-on agent that publishes machine-generated recommendations across markets, the binding constraint is the *strictest* regime it touches.

| Region | Instrument (dated) | Mandatory? | Mechanism | Posture |
|---|---|---|---|---|
| **China** | *Measures for Labeling AI-Generated Synthetic Content* + national standard **GB 45438-2025**, effective **2025-09-01** (CAC + MIIT + MPS + SARFT) | **Yes — world-first mandatory** | **Both** explicit on-screen label **and** implicit watermark/metadata (provider code, content ID, generation timestamp); **extraterritorial** | State-mandated, first-mover ([Inside Privacy](https://www.insideprivacy.com/international/china/china-releases-new-labeling-requirements-for-ai-generated-content/), [China Law Translate](https://www.chinalawtranslate.com/en/ai-labeling/)) |
| **Korea** | **AI Basic Act** (world's first *comprehensive* AI law), enforced **2026-01** | **Yes** | Generative-AI outputs must be labelled human- or machine-readably; **visible** watermark mandatory for high-harm deepfakes, **invisible/provenance-standard** acceptable otherwise | Comprehensive-law-led ([Stimson](https://www.stimson.org/2026/south-koreas-ai-basic-act-seeking-balance-between-industry-innovation-and-social-risk/), [FPF](https://fpf.org/blog/south-koreas-new-ai-framework-act-a-balancing-act-between-innovation-and-regulation/)) |
| **Europe** | **EU AI Act Article 50(2)**, applies **2026-08-02** (grandfather to 2026-12-02); Code of Practice + C2PA reference | **Yes** | Machine-readable marking, "effective/interoperable/robust/removal-resistant" | Regulation-led, standard-converging |
| **US** | No federal mandate; **NIST AI 600-1** (voluntary); state laws e.g. **California SB 942** AI Transparency Act; industry-led C2PA (Adobe/Microsoft/OpenAI/Google founders) | **No (federal)** | Voluntary provenance + patchwork state disclosure | Industry- + state-led, laggard on mandate |
| **Japan** | **AI Promotion Act** (2025, innovation-first, no penalties) | **No** | Sole duty: notify users they are interacting with AI; **no** content-watermark mandate | Light-touch/reputational ([FPF](https://fpf.org/blog/understanding-japans-ai-promotion-act-an-innovation-first-blueprint-for-ai-regulation/)) |
| **Taiwan** | Draft **AI Basic Act** (no dedicated content-labelling mandate yet) | Not yet | — | Recipient of others' standards; the upstream-strong/midstream-absent pattern of [[synthesis/leo-taiwan-odc-gap]] recurring at the AI-governance layer |

**The structural read:** provenance regulation is *converging on the same technical primitives* (content hash + signed metadata + watermark) that this page's four-layer model already implements — but the political leadership is Asian-state-first, not US-industry-first. An agent built provenance-complete from day one (evidence hash, model/prompt hash, policy hash) is over-compliant everywhere by construction, which is the durable reason to bake it into the schema rather than bolt it on per-market. This is the AI-governance sibling of the identity-provenance question in [[synthesis/digital-democracy-user-owned-social-six-region]] (both ask "prove where this came from without a surveillance honeypot") and the political-economy frame of [[synthesis/techno-industrial-state-defense-tech-six-region]].

## 2.6 Lineage and 100-year trajectory

- **1990s–2013:** provenance formalised for scientific workflows and the semantic web → **W3C PROV-DM** (Recommendation 2013-04-30) fixes the entity/activity/agent vocabulary this page instantiates.
- **2016–2021:** software supply-chain shock (SolarWinds) drives **SBOM** mandates (US EO 14028); CycloneDX/SPDX standardise machine-readable bills of materials — the pattern later cloned for models (**ML-BOM**, CycloneDX v1.5 2023 → **v1.7 Oct 2025 / ECMA-424 2nd ed**, the final 1.x; v2.0 in development).
- **2021–2024:** generative-AI provenance crisis → **C2PA** founded (2021), NIST AI 600-1 (2024), EU AI Act adopted (2024).
- **2025–2026:** provenance goes *mandatory* — China GB 45438 (Sep 2025), Korea AI Basic Act (Jan 2026), EU Article 50 (Aug 2026); **C2PA v2.3 extends manifests to text/LLM output** — the exact artefact an agent emits.
- **Forward (labelled scenario, not forecast):** by ~2035, signed provenance is expected to be a *default transport property* of machine-generated content the way TLS became default for transport — an unsigned agent recommendation reads as an unsigned certificate does today. The 100-year invariant: **as agents move from advising to acting, the question "who/what authored this and on what evidence" becomes the load-bearing trust primitive of the whole stack** — the same shift, one layer up, that [[concepts/openclaw]]'s "control point moves from model to the runtime holding the credentials" describes. The open long-horizon fork is whether provenance stays an *open cryptographic commons* (C2PA-style, verifiable by anyone) or fragments into *per-jurisdiction sovereign watermark registries* (the China/Korea/EU divergence taken to its limit) — the provenance analogue of the spectrum-commons-vs-enclosure fork on [[concepts/epfd-equivalent-power-flux-density]].

---

## 3. Operational requirements for the Mission Desk

- **Reproducibility invariant.** Every event row is reproducible from the 5-tuple `(source_url, parser_version, model_id, tier, policy_preset_hash, timestamp)`. Any reviewer can re-derive a row from its raw evidence blob by re-running the same parser version against the same content-addressed payload. This is what makes the labeled-lifecycle dataset a commercially defensible asset, not merely a historical record.

- **Audit log as single source of truth.** The NemoClaw audit log is the ground truth for "what did the agent actually do." It feeds the `audit_completeness` metric in [[concepts/spacesharks-mission-desk-evaluation-rubric]]: `audit_completeness = rows_with_audit_log_id / total_rows`. A row without an `audit_log_id` is an unverifiable claim.

- **No silent failures.** The owner's invariant — "所有 action 都要 log / 所有失敗都要可觀測" — means a failed model call is logged with the same provenance shape as a successful one. A `model_confidence: null` row with `error: timeout` is a valid, provenance-complete row. The schema does not have an "I gave up" state that skips evidence fields.

- **Lossy logs are catastrophic.** The [[concepts/openclaw]] always-on profile means the desk runs continuously. A missed audit row does not merely create a gap — it breaks reproducibility for every downstream row that references that decision in its `evidence_pointers`. On a 24/7 ops loop, one dropped log line can corrupt a chain of dependent rows. This is why the NemoClaw out-of-process enforcement is a hard requirement, not a convenience: the agent cannot be the sole log writer.

- **Evidence blobs are write-once.** `data/evidence-blobs/<hash[:2]>/<hash>.raw` is append-only. No blob is ever deleted or overwritten. This is the storage-layer equivalent of PROV-DM's `wasGeneratedBy` immutability principle: the past is fixed; only interpretations of the past can be revised (via `needs-human-review` transitions), never the raw evidence itself.

---

## 4. Spacesharks Mission Desk application

The labeled-lifecycle dataset described in [[synthesis/spacesharks-mission-desk-hackathon-plan]] is commercially valuable only if every row is independently reproducible and verifiable — that is the core of the moat argument. A generic LLM observability product offers traces but not domain-specific, satellite-lifecycle-structured, source-linked evidence chains; the Mission Desk's dataset is defensible precisely because provenance is baked into the schema, not bolted on as an afterthought. [[entities/spacesharks-gpt]] is the eventual consumer of this dataset: as the desk accumulates months of provenance-rich rows across all five lifecycle phases, the GPT's retrieval layer gains a corpus that no competitor can replicate without running the same ingest loop for the same duration. Provenance is not a compliance checkbox for the Mission Desk — it is the product.

---

## Operator pitch line

Every satellite recommendation the desk makes is reproducible to a raw byte, traceable through model and policy, and auditable at the sandbox boundary — that chain of custody is the dataset moat judges and future operators are actually buying.

---

## Cross-references

- [[concepts/nemoclaw]] — runtime audit log and L7 proxy; Layer 4 enforcement point
- [[concepts/nemoclaw-policy-presets]] — `policy_preset_hash` source; graded hackathon artifact
- [[concepts/openclaw]] — always-on agent profile; drives the 24/7 ops loop that makes lossy logs catastrophic
- [[concepts/hermes-agent-framework]] — agent loop; Hermes skill creation generates new rows with full provenance
- [[concepts/openshell-runtime]] — underlying sandbox enforcing out-of-process audit
- [[concepts/spacesharks-mission-desk-event-schema]] — defines all provenance fields; this page cross-links, does not redefine
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — `audit_completeness` and `calibration_per_tier` consume the provenance chain
- [[concepts/spacesharks-mission-desk-governance]] — nightly evidence re-hash job; `needs-human-review` triggers on hash mismatch
- [[concepts/small-model-ensemble]] — ensemble disagreement metric in Layer 2
- [[concepts/tiered-inference]] — tier field in Layer 2
- [[concepts/calibrated-confidence-llm]] — calibrated confidence in Layer 2
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — parent plan; dataset moat thesis in §1 and §2
- [[synthesis/spacesharks-trust-stack]] — Layer 4 (system trust) of the four-layer trust architecture this page operationalises
- [[synthesis/digital-democracy-user-owned-social-six-region]] — identity-provenance sibling ("prove origin without a surveillance honeypot")
- [[synthesis/open-weight-llm-agent-stack-six-region]] — model-capability six-region map that the provenance-regulation map inverts
- [[synthesis/techno-industrial-state-defense-tech-six-region]] — political-economy frame beneath the six-region regulation divergence
- [[entities/spacesharks-gpt]] — eventual dataset consumer
- [[entities/sampras]] — wiki owner and Mission Desk builder
