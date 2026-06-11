---
type: concept
tags: [jepa, sda, marl, multi-agent-rl, space-domain-awareness, anomaly-detection, conjunction-prediction, orbital-ai, defense-ai, lockheed, msbai, darpa-hallmark, moat-analysis]
---

# JEPA + Multi-Agent RL for Space Domain Awareness

This page covers: (1) JEPA as Yann LeCun framed it and why it is interesting for orbital state time-series; (2) the MARL-SDA application stack — sensor tasking, conjunction prediction, behaviour-anomaly detection; (3) verified public benchmarks; (4) why this is incumbent territory, not hackathon territory. See also [[synthesis/spacesharks-mission-desk-hackathon-plan]] for the strategic consequence.

---

## 1. JEPA primer — LeCun's framing

**Source:** LeCun, Yann. "A Path Towards Autonomous Machine Intelligence." OpenReview preprint, v0.9.2, 2022-06-27. (https://openreview.net/pdf?id=BZ5a1r-kVsf)

JEPA (Joint Embedding Predictive Architecture) is a self-supervised learning framework that predicts in **latent representation space** rather than in pixel/token space.

The core insight: instead of training a model to reconstruct the exact future (which forces the model to predict every irrelevant detail), JEPA trains an encoder to map both the context and the target into an abstract embedding space, then predicts the target embedding from the context embedding. Irrelevant variations that cannot be predicted — noise, fine texture, low-level sensor jitter — are discarded by the encoder; the predictor only has to predict semantically meaningful structure.

LeCun's hierarchy of architectures in the paper:

1. **Generative models** (GANs, VAEs, diffusion): predict in pixel/token space; forced to model everything.
2. **Joint Embedding Architectures (JEA)** (CLIP, SimCLR): map both x and y to embeddings, push them together; cannot predict y from x alone.
3. **JEPA**: map x and y to embeddings; train a *predictor* to generate the embedding of y from the embedding of x. Prediction is in representation space only.
4. **H-JEPA** (Hierarchical JEPA): stacked JEPA modules operating at multiple time scales and abstraction levels.

### Why JEPA is interesting for orbital state vectors

A satellite's orbit evolves according to Newtonian mechanics plus perturbations (atmospheric drag, J2/J4 gravity harmonics, solar radiation pressure, third-body effects, maneuvers). The **state vector** (6D position-velocity, RTN frame) is a high-dimensional, highly structured time series.

Token-prediction approaches (e.g., transformer autoregression on discretized state vectors) force the model to memorize irrelevant numerical noise in the measurements. JEPA's prediction-in-latent-space property means the encoder can learn an invariant representation of the orbital regime (period, eccentricity, argument of perigee) and the predictor only needs to forecast regime evolution — discarding measurement noise.

Published work bridging general JEPA to time-series anomaly detection:

- **MTS-JEPA** (He et al., arXiv 2602.04643, Feb 2026; Purdue/RPI/Stony Brook): Multi-Resolution Joint-Embedding Predictive Architecture for multivariate time series. Addresses representation collapse in JEPA by adding a soft codebook bottleneck that decouples transient shocks from long-term trends. Reports state-of-the-art performance on standard time-series benchmarks. **No orbital datasets tested** in the public preprint.
- **Koopman Invariants in JEPAs** (arXiv 2511.09783, 2025): shows that JEPA latent embeddings spontaneously cluster by underlying dynamical regime — directly relevant to orbital regime classification.
- **V-JEPA / I-JEPA** (Meta AI, 2023–2026): video and image variants; confirmed "rudimentary intuitive physics" by Garrido et al. 2023; V-JEPA 2.1 (March 2026) improves temporal consistency.

The bridge from general time-series JEPA to orbital anomaly detection is conceptually sound but **not yet formally published** as a dedicated orbital-SDA paper. MSBAI is the first public actor to claim deployment of JEPA-based world models against live SDA data.

---

## 2. MARL-SDA application stack

### 2a. Sensor tasking (DARPA Hallmark)

DARPA Hallmark (2015–2020) was the canonical multi-agent sensor-tasking program for SDA:

- Built three capability classes: (1) ML-based indications and warnings, (2) multi-source SSA data fusion, (3) AI-generated course-of-action (COA) for response.
- Key tools: **VIRSA** (virtual assistant for space SA) and **TRACER** (task management and analysis framework).
- Hallmark transitioned its developed strategies to DoD and national security organizations upon DARPA program close.
- **Phase 2 prime:** Ball Aerospace (now BAE Systems Space & Mission Systems).

Published academic work on RL sensor tasking post-Hallmark:

- "Optimal Tasking of Ground-Based Sensors for Space Situational Awareness Using Deep Reinforcement Learning" (MDPI Sensors 22(20), 2022) — confirmed peer-reviewed work applying DRL to SSA sensor scheduling; demonstrates task-reward formulations. No precision-recall figure.
- "Reinforcement Learning for Space-to-Space Surveillance: Autonomous Scheduling for RSO Imaging" (Huterer Prats, Schaub et al., AMOS 2025) — University of Colorado Boulder.
- "Hypothesis-Driven Sensor Tasking for SDA" (Dagan, Becker, Sunberg, AMOS 2025) — University of Colorado Colorado Springs.

### 2b. Conjunction prediction with ML

The conjunction assessment (CA) pipeline is: orbital propagation → screening volume filter → Pc calculation → anomaly triage → maneuver recommendation. ML enters at two points:

**Point 1 — Covariance realism improvement:** Pc = 0 if covariance is wrong. Several AMOS 2025 papers address neural-augmented uncertainty quantification (Digantara; Booz Allen Hamilton SWFCast).

**Point 2 — Maneuver intent detection:** MSBAI's primary contribution. Historical pattern-of-life plus JEPA world model predicts the "expected" state; deviations flag maneuver candidates. AMOS 2025 papers from multiple teams address this: Digantara "Evaluating Maneuver Pattern of Life Violations using Unsupervised Learning," MSBAI "Hierarchical Neuro-Symbolic AI" (poster).

### 2c. Behavioural anomaly detection (pattern-of-life)

"Pattern of Life" (PoL) is the standard term in SDA for characterizing a satellite's normal operational behaviour (stationkeeping cadence, attitude maneuvers, RF emission schedule) and detecting deviations. Notable public work:

- **Altamira Technologies POLARIS** (AMOS 2025): "Pattern of Life Analysis Real-time Identification System" — operational system.
- **Digantara** (multiple AMOS 2025 papers): maneuver PoL, graph neural networks for debris classification, probabilistic multi-agent data fusion.
- **Kansas State University** (AMOS 2025): "Applying Deep Learning to Anomaly Detection of Russian Satellite Activity for Indications Prior to Military Activity."
- **Kratos** (AMOS 2025): "Expanding Pattern-of-Life Capabilities on Satellite Passive RF Datasets."

MARL enters here as a mechanism to coordinate multiple heterogeneous sensors (radar, EO, RF) into a unified PoL assessment — each sensor is an agent, the collective task is complete coverage of the RSO catalog.

---

## 3. Public benchmarks — verified vs. claimed

| Claim | Source | Verified? | Notes |
|---|---|---|---|
| "Precision-Recall 0.98" for Lockheed Martin + MSBAI | Owner's briefing | ⚠️ **Unconfirmed** | No paper or press release uses the phrase "precision-recall 0.98" |
| "94–98% accuracy" for OrbitGuard across ~15,000 objects | MSBAI press release (PR Newswire, Sept 2025) | Confirmed as *self-reported* | Lab validation only; not independently peer-reviewed |
| "~94–96% maneuver detection" for OrbitGuard | MSBAI press release + AMOS 2025 poster abstract | Confirmed as *self-reported* | Same caveat: company-reported, AMOS poster not peer-reviewed |
| Training on 800+ real labeled events + ~200K GMAT-simulated | AMOS 2025 search-result summary | Confirmed from conference programme description | Dataset size is modest; augmentation-heavy |
| Lockheed + MSBAI joint program | Owner's briefing | ⚠️ **Unconfirmed** | No joint program announced publicly |
| Lockheed iSpace uses JEPA | Owner's briefing implied | ⚠️ **Unconfirmed** | iSpace product pages name no ML methodology |
| DARPA Hallmark multi-agent SDA | DARPA official page | Confirmed | Program closed 2020; techniques transitioned to DoD |

**The most honest summary:** MSBAI is a real, DoD-funded startup that does deploy JEPA + MARL for SDA. The "0.98 precision-recall" figure the owner cited is a garbled version of MSBAI's "94–98% accuracy" claim from a company press release (not a precision-recall pair, and not peer-reviewed). Lockheed Martin is a separate large-prime player with iSpace and Space Fence but has made no public claim of JEPA usage. The owner appears to have conflated or extrapolated two separate entities into a single "Lockheed + MSBAI" story.

---

## 4. Why this is incumbent territory — the moat analysis

### 4a. Data moat

The fundamental barrier to entry is **labeled ground-truth data at scale**:

- Real maneuver events with verified intent labels require access to DoD classified catalogs or operator maneuver notifications.
- MSBAI's 800-label dataset (after years of DoD engagement and UDL access) illustrates how thin even the best public datasets are.
- Defense primes and government contractors have multi-year privileged access to Space-Track.org `cdm` class data (operator-only), the UDL, and classified sensor feeds (Space Fence radar, GEODSS electro-optical, SBSS).
- Commercial entrants without DoD relationships are limited to `cdm_public` class and CelesTrak — see [[concepts/cdm-conjunction-data-message]] for the two-tier data access structure.

### 4b. Sensor network access

Accurate covariance (the #1 quality factor for Pc, per [[concepts/covariance-ellipsoid]]) requires a dense, calibrated sensor network:

- **Space Fence** (Lockheed, Marshall Islands): the most sensitive S-band radar on Earth for catalog maintenance. Data is classified/government-only.
- **LeoLabs** commercial phased-array network: the best commercial covariance available, ~5 min CDM delivery, but subscription-gated. See [[entities/leolabs]].
- **GEODSS, SBSS** (USSF): electro-optical, government-only.

Without covariance-realistic data, a JEPA world model trained on covariance-poor TLEs will produce high false-positive rates regardless of ML architecture sophistication.

### 4c. Compute and security clearance

Training Graph-JEPA or Patch Time-Series Transformers over a 15,000-object catalog with millisecond update rates requires sustained GPU compute. MSBAI's DoD contract provides this. Independent teams do not have equivalent access.

Additionally, many SDA AI contracts require personnel security clearances at Secret or Top Secret/SCI level. Hackathon teams cannot obtain these in a 72-hour window.

### 4d. Lead time

MSBAI has been operating since 2017 and graduated from Air Force Techstars in 2020. The DoD SBIR was awarded in September 2025. The system has been in development for at least 5 years. Lockheed iSpace has been in operational use for even longer. DARPA Hallmark ran for 5+ years (2015–2020) before transitioning.

### 4e. Conclusion for Spacesharks / hackathon context

A 72-hour hackathon agent cannot replicate: (a) years of labeled maneuver events, (b) Space Fence radar data access, (c) LeoLabs covariance calibration, or (d) DoD ATO certification. The incumbent SDA AI layer — MSBAI OrbitGuard, Lockheed iSpace, Digantara, Altamira POLARIS — is deeply entrenched.

**The Spacesharks design choice to not compete on orbital-physics precision is well-founded.** The hackathon-accessible data layer (Space-Track `cdm_public`, CelesTrak TLEs) is precision-limited by design. Competing on "better conjunction prediction" against MSBAI's GURU platform with DoD UDL access would be structurally impossible in a hackathon context. See [[synthesis/spacesharks-mission-desk-hackathon-plan]] for the affirmative design — the Spacesharks moat lies in operator decision-support and labeled lifecycle behavior, not raw orbital-mechanics ML.

---

## 5. Landscape map

| Actor | Product | Technology | Data access | Status |
|---|---|---|---|---|
| MSBAI | OrbitGuard on GURU | JEPA + MARL + neuro-symbolic | DoD UDL, CelesTrak, IR, EO | $1.2M DoD SBIR, active 2025 |
| Lockheed Martin | iSpace | Advanced analytics, fusion (ML methods not disclosed) | Space Fence, USSF networks, commercial | Operational; German Space Agency customer |
| Altamira Technologies | POLARIS | Pattern-of-life ML | Government sensor feeds | Operational (AMOS 2025) |
| Digantara | Unnamed platform | Graph neural networks, unsupervised PoL, probabilistic fusion | Commercial + some DoD | Multiple AMOS 2025 papers |
| Slingshot Aerospace | Beacon + Plato | CDM aggregation, fleet coordination, maneuver sharing | Commercial + NOAA TraCSS | $13.3M NOAA contract — see [[entities/slingshot-aerospace]] |
| LeoLabs | CDM service | Commercial phased-array radar | Own sensor network | <5 min CDMs, 22K+ objects — see [[entities/leolabs]] |
| DARPA Hallmark / Ball Aerospace | VIRSA, TRACER | ML indications/warnings + AI COA | DoD classified | Transitioned 2020; Ball/BAE inherits |

This table is **US-centric** — the SDA-AI public landscape is. The one major non-US datapoint as of mid-2026 is China's **"Air Target Agent System"** (unveiled 2026-05-28; reported SCMP 2026-05-30, *Interesting Engineering*): an LLM stack on **Huawei Ascend** hardware (outside US export controls) framed as a "brain plus tool army" — an LLM coordinator that decomposes tasks, auto-selects algorithms, coordinates workflows, and **recovers from failure without human handoff** (it self-diagnosed a GPU-contention failure in a port-monitoring test and switched models). This is *autonomous targeting/surveillance*, the closest non-US analog to the MSBAI/Lockheed SDA-AI layer, and notable for moving past human-in-the-loop. Treat the capability claims as secondary-press, not independently verified. The full regional distribution of the ops-AI layer — and why the moat is **data access, not model access** — is mapped in [[synthesis/llm-satellite-operations-six-region]].

---

## 6. Related pages

- [[sources/msbai-orbitguard-dod-contract-2025]] — primary MSBAI source
- [[entities/msbai]] — MSBAI company profile
- [[entities/lockheed-martin-space]] — Lockheed iSpace, Space Fence, ARISE
- [[concepts/pc-probability-of-collision]] — Pc methods context
- [[concepts/cdm-conjunction-data-message]] — CDM data standard and two-tier access structure
- [[concepts/covariance-ellipsoid]] — why covariance realism is the #1 quality factor
- [[entities/18-sds]] — 18 SDS catalog and TraCSS transition
- [[entities/leolabs]] — commercial covariance-realistic CDM service
- [[entities/slingshot-aerospace]] — Beacon CDM and NOAA TraCSS UI
- [[concepts/orbital-data-center]] — adjacent ODC domain
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Spacesharks hackathon strategy; explicitly avoids competing on orbital-physics ML
- [[synthesis/cdm-pc-decisioning]] — CDM → Pc → maneuver decision workflow
- [[synthesis/llm-satellite-operations-six-region]] — six-region ops-AI map; this SDA-AI layer is the US "defense-funded vertical SDA copilot" archetype
