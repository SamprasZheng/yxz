---
type: concept
tags: [fcc, ibfs, regulatory, spectrum, ngso, processing-round, constellation, mission-desk, firefly]
---

# Processing Round

A **processing round** is the FCC's administrative mechanism for handling multiple competing or potentially interfering satellite license applications that share the same frequency bands. When several operators apply for licences in overlapping spectrum within a defined window, the FCC batches them into a single "round" and reviews them together rather than on a purely first-come-first-served basis.

Processing rounds were formalized for NGSO constellation licensing because the sheer number of proposed constellations (Starlink, Kuiper, OneWeb, Telesat, etc.) made sequential review unworkable and created incentives for premature "placeholder" filings.

## When a Processing Round Is Triggered

Under 47 CFR Part 25 and the FCC's satellite processing procedures, the Satellite Division initiates a processing round when:
1. Multiple NGSO FSS applications seek authorization in the **same frequency bands** (typically Ku / Ka or V band)
2. Applications arrive within a common acceptance window (historically 30 days of the first complete application, though the FCC retains discretion)
3. The applications involve spectrum-sharing interactions that must be evaluated concurrently (co-frequency, co-coverage interference)

A public notice announces the cut-off date for the round; applications filed after the cut-off are placed in a subsequent round.

## Processing-Round Lineage (1990s → 2026)

The processing round is not new — it dates to the first commercial LEO era and has run in four distinct waves for modern broadband NGSO FSS:

| Wave | Year opened | Initiated by | Scope | Outcome |
|---|---|---|---|---|
| **"Big LEO" rounds** | early–mid **1990s** | Iridium / Globalstar / Odyssey / Ellipso era | 1.6/2.4 GHz mobile-satellite | Original processing-round precedent; spectrum split among survivors |
| **First modern Ku/Ka round** | **2016** (closed **2016-11-15**) | OneWeb (petition for 720 sats) | 10.7–12.7 / 14.0–14.5 / 17.8–18.6 / 27.5–30 GHz | 11+ competing applicants filed on the 2016-11-15 cutoff — **Space Norway, O3b, Boeing, SpaceX, Telesat, LeoSat, Kepler, Theia, Karousel**; OneWeb granted **2017-06-23** |
| **2017 round** | **2017** | second-cutoff entrants | Ku/Ka NGSO FSS | additional grants (SpaceX first-gen, Telesat, Kepler, Audacy…) |
| **2020 Ku/Ka round** | **2020** | Kuiper / New Spectrum Satellite / OneWeb | standard Ku/Ka NGSO FSS | 10 applicants; SpaceX Gen2 **7,500** partial grant (Dec 2022), several still pending |
| **2021 round** | **2021** | multiple | Ku/Ka + V-band expansion | drew license requests totalling **~81,195** NGSO satellites |
| **2026 "third" round** | **2026** (opened by **DA 26-552**, rel. 2026-06-05; cut-off **2026-07-06**) | Space Bureau, after the SpaceX-Gen2-V3 (DA 26-36) + Amazon-Leo (2026-02-10) waiver grants | **third Ku/Ka round** (10.7–30.0 GHz) + **third V-band round** (37.5–51.4 GHz) | SpaceX + Amazon Leo folded in; competing apps/petitions due **2026-07-06** (see below) |

Across the modern Ku/Ka/V rounds (2016–2026) the FCC has accumulated **well over ~43 NGSO FSS applications** (the ~43 figure is the 2016–2021 cumulative; the 2026 round reopens the count). Note the terminology wrinkle the FCC itself uses: the **2020 round** detailed below is the **third** *modern Ku/Ka round* counting from 2016 — **not** the first (a common misconception; the 2016 OneWeb-triggered round is the true modern precedent) — while the **2026** round the FCC opened in June is separately labelled the **"third Ku-/Ka-band processing round"** in its own numbering (i.e. the FCC's "third round" = the 2026 wave, distinct from the historian's "third modern round" = 2020). Both usages appear in the sources; this page keeps the 2016→2026 wave count above as canonical. *(Sources: [Payload Research — NGSO FSS spectrum priority](https://payloadspace.com/status-of-ngso-fixed-satellite-service-spectrum-priority-in-the-us-payload-research/); [AIAA — Analysis of FCC NGSO Applications 2000–2022](https://arc.aiaa.org/doi/10.2514/1.A35987); FCC 2016 Ku/Ka processing-round public notice, accessed 2026-07-03; FCC DA 26-552 "Space Bureau Opens Processing Rounds," rel. 2026-06-05, via search-index summary + [Exterra JSC coverage](https://www.exterrajsc.com/p/fcc-opens-third-spectrum-processing), accessed 2026-09-24.)*

## The 2020 Ku/Ka Processing Round

The highest-stakes modern round — the **third** of the four-wave series above — opened in 2020 for the **10.7–12.7 GHz, 12.75–13.25 GHz, 13.85–14.5 GHz, 17.7–18.6 GHz, 18.8–20.2 GHz, and 27.5–30 GHz** bands (standard Ku/Ka NGSO FSS bands). Participants included:
- **SpaceX Gen2 Starlink** (up to ~30,000 satellites in the most ambitious version; initially 7,500 authorised Dec 2022 as a "partial grant")
- **Amazon Kuiper** (3,236 satellites; initial grant Jul 2020 was in a prior round; Ku/Ka modification applications entered subsequent rounds)
- **WorldVu / OneWeb** (648 satellites; modification applications)
- **New Spectrum Satellite** and others

The round produced:
- SpaceX Gen2 **partial grant** (FCC-22-91, Dec 2022): 7,500 satellites in Ku/Ka; the remaining portion (higher altitudes, V band) deferred
- OneWeb **expedited partial grant** (Sept 2022, DA-23-362): modification granted
- The 2024 SpaceX Gen2 **V-band grant** (Nov 2024): E/V-band operations at 340–360 km altitude authorised

## The 2026 "Third" Ku/Ka + V-Band Processing Rounds (DA 26-552)

The round mechanism is **actively operative in 2026 under the existing Part 25 rules** — a fact worth stating plainly because the Part 100 update below can read as if "the round" is on hold pending OMB. It is not: the *classic Part 25 processing round* just ran a new wave, while the *new opt-in bonded Part 100 round* (the future replacement) is what awaits OMB clearance.

**Sequence (all 2026, verified 2026-09-24):**

1. **SpaceX Gen2 "V3 Upgrade" partial grant — DA 26-36, adopted/released 2026-01-09.** The Space Bureau granted SpaceX authority for an **additional 7,500 Gen2 Starlink satellites** (doubling its authorized Gen2 fleet to **~15,000**), addressing part of SpaceX's 2020 ~30,000-satellite application. Milestones: **50 % by 2028-12-01, 100 % by 2031-12-01**; ongoing collision-avoidance/disposal reporting; the Bureau retains authority to pause deployment if debris-risk thresholds are exceeded. Crucially, the grant came with a **waiver of the processing-round rules conditioned on SpaceX participating in future processing rounds** — i.e. *grant capacity now, adjudicate co-frequency contention later in a round.*

2. **Amazon Leo (formerly Project Kuiper) conditional grant — 2026-02-10.** The FCC (which now refers to both the constellation and licensee as **"Amazon Leo"** after Amazon's late-2025/2026 rebrand of Project Kuiper) authorized an **additional 4,504 satellites** — **3,212 Gen2** (Ku/V-band) + **1,292 polar-orbit** satellites for Arctic/Antarctic coverage — bringing the full authorized constellation to **7,727**. A **50 %-deployed-by-2026-07-30** milestone applies (anti-warehousing). Like SpaceX, the grant was **conditioned on participating in the then-forthcoming round**.

3. **Space Bureau opens the rounds — DA 26-552, released 2026-06-05.** The Bureau opened a **third Ku-/Ka-band processing round** (10.7–30.0 GHz) and a **third V-band processing round** (37.5–51.4 GHz), setting a **2026-07-06 filing cut-off** for competing applications/petitions. SpaceX's V-band ops were folded into the V-band round and its Ku/Ka ops into the Ku/Ka round; Amazon Leo's Ku/Ka ops were folded into the Ku/Ka round. (A companion order, **DA 26-553**, issued the same day.)

**Why this matters (拉高維度):** the 2026 sequence is a live illustration of the structural trajectory this page theorizes — the FCC granted the two dominant operators their large 2026 capacity increases *first*, via **waivers explicitly conditioned on later round participation*, then opened the round to let contention be worked out among all comers. That is "allocate provisionally, then let operators bargain under a regulatory backstop" in practice — the same direction Part 100 (opt-in bonded round) and FCC 26-26 (performance-based EPFD + good-faith coordination) push the two contention layers. *(Sources: FCC DA 26-36 (SpaceX Gen2 V3), rel. 2026-01-09 — via [SatNews](https://satnews.com/2026/01/12/fcc-authorizes-7500-additional-starlink-gen2-satellites-for-global-gigabit-coverage/) + [Via Satellite](https://www.satellitetoday.com/connectivity/2026/01/12/fcc-gives-spacex-approval-for-7500-more-starlink-gen2-satellites/); Amazon Leo grant 2026-02-10 — via [Broadband Breakfast](https://broadbandbreakfast.com/amazon-rebrands-prosatellite-internet-service-to-amazon-leo/) + Telecompetitor + [GRANT Kuiper Systems LLC / AmazonLeo-Gen2.pdf](https://cdn.geekwire.com/wp-content/uploads/2026/02/AmazonLeo-Gen2.pdf); FCC DA 26-552 / DA 26-553 "Space Bureau Opens Processing Rounds," rel. 2026-06-05 — via search-index summary of the primary PDFs + [Exterra JSC](https://www.exterrajsc.com/p/fcc-opens-third-spectrum-processing); docs.fcc.gov + federalregister.gov egress-blocked this run, so primaries corroborated via authoritative trade/law coverage. Accessed 2026-09-24.)*

## Processing Round Procedure Steps

1. **Public Notice of Filing**: The Satellite Division publishes an IBFS Notice of Filing announcing the processing round cut-off date and the spectrum/orbit parameters in scope.
2. **Pleading Cycle**: Third parties (other operators, incumbents, federal agencies) file comments and oppositions in the record. Common issues: space safety, [[concepts/epfd-equivalent-power-flux-density|EPFD]] emissions, NGSO–NGSO interference.
3. **Coordinated Technical Review**: Staff reviews all applications concurrently, often requiring operators to negotiate spectrum-sharing agreements with each other. The FCC may condition grants on bilateral coordination being completed post-grant.
4. **Grant, Partial Grant, or Deferral**: The FCC may:
   - Grant the full application
   - Partially grant (e.g., specific altitudes / frequency bands / satellite counts) and defer the rest
   - Defer pending further analysis
5. **Milestone Conditions**: Grants in a processing round typically carry milestone conditions (e.g., 50% of satellites deployed within 6 years of grant, 100% within 9 years) to prevent spectrum warehousing.
6. **Modification Applications**: Post-grant, operators file SAT-MOD applications to adjust orbital parameters, satellite counts, or frequency authorisations. These may trigger a new processing round if they expand into contested spectrum.

## Relationship to ITU Priority

Within the ITU system, filing priority is established by the date of the **API (Advance Publication Information)** submission. The FCC submits APIs for pending applications even before a processing round concludes. This means an operator can have ITU priority established while the FCC domestic review is still ongoing. See [[concepts/ngso-gso-coordination]] for the API → CR → Notification pipeline.

The ITU "processing round" concept is distinct from the FCC processing round: the ITU uses **coordination rounds** under Resolution 76 to manage the aggregate EPFD compliance of multiple NGSO systems.

## Six-Region View — a Uniquely American Instrument (台美日韓中國歐洲)

The processing round has **no clean six-region equivalent** — it is an artifact of the specific position the FCC occupies, and the honest comparison is that most administrations simply don't do this:

| Region | Competitive-batching mechanism? | Why |
|---|---|---|
| **US** | **Yes — the processing round is the mechanism.** | The US is the jurisdiction where the most operators compete for the *same domestic market*; the FCC needs a rule to adjudicate co-frequency co-coverage contention among many private applicants at once. |
| **Europe** | No FCC-style round. | NGSO authorization runs through **national regulators** + **CEPT/ECC** coordination; competing filings are handled by ITU priority + bilateral coordination, not a domestic competitive batch. (The proposed EU Space Act may add EU-level process by ~2030.) |
| **China** | No — state-allocated. | **MIIT** files megablocks (Guowang, CTC-1/CTC-2) directly at the ITU; there is one state-directed program, so no domestic competitive round to run. |
| **Japan / Korea** | No — few operators. | **MIC** (JP) / **MSIT** (KR) license their handful of operators individually; contention is rare enough that no batching rule is needed. |
| **Taiwan** | No — recipient not originator. | **NCC** licenses ground/terminal use; Taiwan files no competing NGSO constellations, so the question does not arise ([[synthesis/leo-taiwan-odc-gap]] pattern at the regulatory layer). |

**Durable finding:** the processing round is downstream of the ITU's global **first-come-first-served** rule (see [[concepts/ngso-gso-coordination]]); it is the *domestic* competition-management layer the US bolts on *because* it hosts the densest cluster of competing commercial applicants. Where the ITU FCFS rule is the 100-year scarcity engine (orbital-slot enclosure, per [[synthesis/space-regulatory-regimes-six-region]]), the processing round is a jurisdiction-specific overlay — which is why deepening it geographically means explaining its *absence* elsewhere, not tabulating parallels.

## Update (2026) — Part 100 and the "Licensing Assembly Line"

The processing-round mechanism is itself in play. Under FCC Chair Brendan Carr's *Space Modernization for the 21st Century* proceeding (**SB Docket No. 25-306**), the Commission moved to **replace Part 25 wholesale with a new Part 100** and a **"default-to-yes" licensing assembly line** (straightforward requests presumed in the public interest and expedited; a modular single-Form-312 model). The NPRM ran comments **2026-01-20** / replies **2026-02-18**.

**ADOPTED 2026-07-22, RELEASED 2026-07-23 (was: scheduled).** The FCC voted **unanimously** at the 2026-07-22 Open Meeting to adopt the **Report and Order + Further Notice of Proposed Rulemaking** ("Space Modernization for the 21st Century," **FCC 26-47**, rel. 2026-07-23), relocating and reorganizing the Part 25 rules into the new **Part 100** ("Space and Earth Station Services"). What the adopted Order actually did, with the processing round now confirmed:
- **Part 25 → Part 100 with a "default-to-yes" presumption** — an application is presumed in the public interest if it satisfies the Part 100 rules, *unless* it falls into one of **seven "targeted review categories"** that lose the presumption: **Failure to Certify, Waiver Requests, Market Access, Foreign Ownership, Processing Round, Spectral Constraints, Federal Coordination**. The processing round is thus explicitly **carved out of the assembly line** — it remains the one contested-spectrum path that still gets full scrutiny.
- **The processing round is kept, not abolished — but made opt-in and rules-based.** Applicants now **opt in** to a processing round with a fixed annual **filing window (January 1 – October 31)**. To deter speculative "paper" filings, round applicants must post a **$10 million surety bond within 30 days of authorization**; the bond **declines as the system deploys and reaches $0 at 90 % deployment**, alongside the milestone requirements. This replaces the *highly discretionary* Part 25 round with a predictable, calendared, bonded process.
- **Most space- and earth-station license terms extended to 20 years** (from the Part 25 standard 15); applicants may request shorter terms and retire satellites earlier.
- **Public-notice window cut to 15 days** (from 30) for typical license requests, except where statute requires longer.
- Also adopted: **adjacent-band radio-altimeter coexistence** measures, a **Lower C-band incumbent-relocation transition** + rebates supporting the FAA radio-altimeter retrofit, and resolution of pending petitions for reconsideration of the 2020 C-band R&O. Enforcement teeth: automatic termination for failure to operate within the specified timeframe or milestone failure, revocation, forfeitures, and targeted information requests. The **FNPRM** seeks comment on further Part 100 changes.
- **Effective date pending Federal Register publication / PRA review.** *(Sources: [FCC 26-47 R&O + FNPRM](https://docs.fcc.gov/public/attachments/FCC-26-47A1.pdf); [FCC — “FCC Adopts Groundbreaking Overhaul,” DOC-423287A1](https://docs.fcc.gov/public/attachments/DOC-423287A1.pdf); [Covington Global Policy Watch, 2026-07](https://www.globalpolicywatch.com/2026/07/fcc-approves-massive-modernization-of-satellite-licensing-regime/); [Akin — “Hello Part 100!”](https://www.akingump.com/en/insights/alerts/fcc-adopts-landscape-shifting-space-licensing-overhaul-hello-part-100); [SDxCentral — “targeted review categories”](https://www.sdxcentral.com/news/fcc-to-overhaul-space-bureaus-licensing-process-down-to-targeted-review-categories/); [FCC — July 2026 Open Meeting](https://www.fcc.gov/July2026), accessed 2026-08-02.)*
  > **Re-verified 2026-08-28:** ~5 weeks after release the R&O had **still not appeared in the Federal Register** — only the underlying NPRM is published there (FR Doc **2025-22019**, published **2025-12-05**). The opt-in bonded round therefore is **not yet operative**; the lag is consistent with **Paperwork Reduction Act / OMB** clearance of the new certification-based information collections. The **FNPRM** (the only portion open for comment) seeks comment on further reforms, including **Space-Based Experimental Licensing** and **NGSO call-sign merging** — the next tranche of Part 100 rulemaking to watch. *(Source: [Federal Register — Space Modernization NPRM (2025-22019)](https://www.federalregister.gov/documents/2025/12/05/2025-22019/space-modernization-for-the-21st-century), accessed 2026-08-28.)*
  >
  > **Re-verified 2026-09-24 — the effective-date mechanism is now precise (two-track).** The R&O's own text sets a **split effective date**: most of the Order takes effect **60 days after Federal Register publication**, *except* **§§ 9.10, 9.18, and 100.1–100.34** — the core new Part 100 licensing sections, which include the opt-in bonded round — which become effective **only after OMB completes review of the new information collections**, to be announced separately by the Space Bureau via a later Federal Register notice. So even once the R&O is published, the **round-relevant Part 100 sections remain gated on OMB**, not on the 60-day clock. As of 2026-09-24 no 2026 *final-rule* Federal Register document for SB Docket 25-306 had surfaced (only the 2025 NPRM), so the opt-in bonded round is still **not yet operative** — which is exactly why the FCC ran the **2026 third round under the legacy Part 25 rules** (above), not under Part 100. *(Sources: [DLA Piper — FCC overhauls space and satellite licensing process](https://www.dlapiper.com/en-th/insights/publications/2026/07/fcc-overhauls-space-and-satellite-licensing-process-key-changes); [Holland & Knight — Ground Control to Major Reform](https://www.hklaw.com/en/insights/publications/2026/07/ground-control-to-major-reform-fcc-adopts-landmark-overhaul-of-space); federalregister.gov + docs.fcc.gov egress-blocked, so the split-effective-date mechanism is quoted from the law-firm summaries of FCC 26-47, accessed 2026-09-24.)*

**This confirms the pre-vote framing — the round is regularized, not abolished.** The adopted text takes exactly the "simplified and time-boxed rather than abolished" fork below: co-frequency NGSO contention still needs a concurrent-review rule, so the FCC kept the round but made it a **calendared, opt-in, bonded** process that is deliberately *excluded* from the default-to-yes presumption. See [[concepts/schedule-s]] for the Part 25 → Part 100 form-model transition (20-year terms, single-Form-312, certifications) and [[concepts/epfd-equivalent-power-flux-density]] for the *separate* 2026-04-30 move (FCC 26-26) from fixed EPFD limits to performance-based GSO protection with good-faith coordination. The two tracks are distinct — Part 100 modernizes the **licensing process**, FCC 26-26 changed the **NGSO/GSO interference rule** — but together they push both NGSO/NGSO and NGSO/GSO contention from FCC *allocation* toward operator *bargaining* under a regulatory backstop.

## Long-Horizon View (labelled scenario)

Near term (2026–2030): the direction is now fixed in the **adopted** Part 100 R&O (above, FCC 26-47) — the round is **regularized and made rules-based** (not abolished): opt-in, calendared to a Jan 1–Oct 31 window, bonded ($10M declining to $0 at 90 % deployment), and deliberately carved out of the default-to-yes assembly line as a "targeted review category," increasingly paired with a robust NGSO–NGSO sharing framework + good-faith coordination rather than case-by-case staff-adjudicated splits. Structural fork (not a forecast): either (i) domestic batching **withers** as performance-based, coordination-first rules let operators privately partition shared spectrum — the round becomes a rarely-invoked backstop; or (ii) as LEO Ku/Ka fills and V/Q/E and optical inter-satellite bands contend, batching **intensifies** and other large markets (EU, eventually) grow their own round-like processes. Either way the binding long-run scarcity is not the US round but the ITU FCFS orbital-slot enclosure it sits beneath ([[synthesis/space-regulatory-regimes-six-region]]).

## IBFS Filing Types in a Processing Round

| IBFS type code | Meaning |
|---|---|
| SAT-LOA | Launch and Operate Application (original licence application) |
| SAT-PPL | Petition for Pioneer Preference licence |
| SAT-AMD | Amended application (within a round) |
| SAT-MOD | Modification application (post-grant, may trigger new round) |
| SAT-STA | Special Temporary Authority (short-term ops during a round or pending grant) |

## Relevance to Mission Desk / Firefly Agents

- Monitoring the IBFS for SAT-MOD and SAT-AMD filings by neighbouring constellation operators is a practical **early-warning signal** for potential spectrum environment changes that could affect downlink performance at an orbital data center (see [[concepts/orbital-data-center]])
- Processing round outcomes directly determine which operators hold rights in which frequency bands at which altitudes — key inputs to the [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]] interference-attribution verb
- The FCC's `fcc.report/IBFS/Filing-List/SAT` mirror provides RSS feeds per filing type, enabling automated ingestion of new SAT-MOD/SAT-AMD events

## See Also
- [[concepts/ngso-gso-coordination]]
- [[concepts/epfd-equivalent-power-flux-density]]
- [[concepts/schedule-s]]
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[synthesis/space-regulatory-regimes-six-region]] — six-region regulatory map; why the round is US-specific and the ITU FCFS enclosure is the long-run scarcity
- [[synthesis/leo-taiwan-odc-gap]] — the "recipient not originator" pattern at the regulatory layer
- [[sources/fcc-part-25-2024]]
- [[sources/fcc-space-bureau-2023]]
