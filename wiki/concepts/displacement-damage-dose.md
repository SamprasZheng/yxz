---
type: concept
tags: [rf-hardware, space, radiation, semiconductor, testing, solar-cell, optocoupler, image-sensor, niel]
---

# DDD — Displacement Damage Dose (NIEL)

The **third** space-radiation degradation mechanism, distinct from [[concepts/tid-total-ionizing-dose|TID]] (ionizing, cumulative) and [[concepts/see-single-event-effects|SEE]] (single-particle, transient/destructive). DDD is **cumulative like TID but non-ionizing**: an incident particle displaces atoms out of their lattice sites, creating stable crystal defects that degrade the *bulk* semiconductor. The accepted space-radiation taxonomy is therefore **three** mechanisms — ionizing dose (TID), displacement damage (DDD), single-event effects (SEE) — not two. DDD is the one this wiki previously under-weighted, yet it is the *dominant* failure mode for the specific device classes below.

## Damage Mechanism — Non-Ionizing Energy Loss (NIEL)

A charged or neutral particle loses energy two ways in matter: **ionizing** (frees electron-hole pairs → the TID mechanism) and **non-ionizing** (elastically/inelastically knocks lattice atoms off their sites → displacement damage). The non-ionizing fraction is the **Non-Ionizing Energy Loss (NIEL)**, in MeV·cm²/g — the displacement analogue of LET.

```
Primary knock-on atom (PKA) displaced from lattice
    → Frenkel pairs (vacancy + interstitial); dense PKAs → defect clusters
    → Stable deep-level traps in the bandgap
    → Reduced minority-carrier lifetime + mobility + carrier removal
```

The stable defects act as **recombination/generation centres and traps**, which is why DDD hits *minority-carrier* and *optoelectronic* devices hardest — the failure is loss of carrier lifetime, not a threshold-voltage shift.

**Displacement Damage Dose:**

```
DDD (MeV/g) = NIEL(E) × particle fluence (particles/cm²)   [integrated over the energy spectrum]
```

NIEL is commonly derived from the **Norgett–Robinson–Torrens (NRT)** displacement model; a newer *effective*-DDD definition adds molecular-dynamics amorphization corrections for semiconductors. Because different particles at different energies produce different NIEL, DDD lets a mission fold a mixed proton/electron/neutron spectrum into one damage-equivalent number — exactly what NIEL scaling is for.

## Which Devices DDD Governs (加深探究 — the layer-down)

| Device class | DDD failure signature | Why it dominates over TID |
|---|---|---|
| **Solar cells / arrays** | End-of-life Pmax / Isc / Voc loss (array power budget) | Displacement kills minority-carrier diffusion length in the base; the #1 array-sizing driver |
| **Optocouplers** | Current-transfer-ratio (CTR) collapse — the LED emitter side degrades by DDD | The classic DDD-limited part; TID barely touches it, DDD ruins it |
| **CCD / CMOS image sensors** | Dark-current spikes, charge-transfer-efficiency (CTE) loss, hot pixels, RTS noise | Bulk traps in the pixel epitaxy; star-trackers and EO payloads are DDD-limited |
| **LEDs / laser diodes / photodiodes** | Light-output/responsivity droop | Optical output ∝ carrier lifetime |
| **Bipolar transistors** | hFE (gain) loss via base-region lifetime | Overlaps ELDRS-TID; DDD adds a *dose-rate-independent* gain-loss term |

The through-line: **DDD is a minority-carrier / optoelectronic threat.** A part can pass TID and SEE handsomely and still be a DDD write-off — which is precisely why it deserves its own screening line, not a footnote under TID.

## Test Sources & the Proton-Bundling Trap (向外抓取)

- **Protons** (cyclotron, ~10–200 MeV) — the workhorse: a proton deposits **both** ionizing (TID) **and** non-ionizing (DDD) energy at once. This is the trap: a single proton campaign *bundles* TID+DDD, so you cannot attribute a failure to one mechanism without a companion **Co-60 (pure TID)** run — the difference isolates the displacement component.
- **Neutrons** (reactor / spallation) — nearly pure displacement (no ionization), the cleanest DDD-only source; **ASTM E722** defines the 1-MeV-equivalent-neutron fluence normalization for silicon.
- **Electrons** (Van de Graaff / LINAC, ~1 MeV) — low-NIEL, historically the solar-cell qualification particle; the **JPL relative-damage-coefficient / equivalent-1-MeV-electron-fluence** method grew out of electron+proton solar-cell data.
- **Two solar-cell prediction methodologies** (both authoritative, both in use): the **JPL Equivalent Fluence** method (map every particle to an equivalent 1-MeV-electron fluence) and the **NRL Displacement Damage Dose** method (Summers/Messenger/Walters/Warner — map everything to DDD via NIEL). The NRL DDD approach is the more physically unified and is standard for multi-junction III-V cells; JPL equivalent-fluence remains widely used and both are cross-validated in the literature.

There is **no single clean DDD standard** the way [[concepts/tid-total-ionizing-dose|TM1019]] governs TID or JESD57 governs [[concepts/see-single-event-effects|SEE]] — DDD is assessed through proton/neutron/electron testing plus NIEL scaling, guided by NASA optocoupler test guidelines, ESA/ESCC methods, and ASTM E722. The absence of one canonical procedure is itself why DDD is the most-overlooked of the three mechanisms. Sources: [Development of effective DDD calculation for space (PLOS One 2022)](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0276364), [Modeling solar cell degradation: NRL-DDD vs JPL equivalent-fluence (ResearchGate)](https://www.researchgate.net/publication/229479488_Modeling_solar_cell_degradation_in_space_A_comparison_of_the_NRL_displacement_damage_dose_and_the_JPL_equivalent_fluence_approaches), [NASA Optocoupler Ground Radiation Testing Guideline (NEPP 2002)](https://nepp.nasa.gov/docuploads/6C7CB0A4-CB50-46C9-BA4063F668ACA695/Opto_Guidelines_2002.pdf), [NASA Standards for Radiation Effects (NTRS 20150011462)](https://ntrs.nasa.gov/api/citations/20150011462/downloads/20150011462.pdf).

## Relationship to the Other Two Mechanisms

| | TID | **DDD** | SEE |
|---|---|---|---|
| Energy channel | Ionizing (e-h pairs) | **Non-ionizing (lattice displacement / NIEL)** | Ionizing, single-track |
| Cumulative? | Yes | **Yes** | No (per-event) |
| Damage locus | Oxides (gate/STI) | **Bulk crystal (minority-carrier)** | Sensitive-volume node charge |
| Dose metric | krad(Si) | **DDD in MeV/g (or 1-MeV-n-equiv fluence)** | LET, cross-section |
| Worst-hit devices | MOS, bipolar linear | **Solar cells, optocouplers, image sensors, LEDs** | SRAM, FPGA, power MOSFET |
| Primary test source | Co-60 γ | **Proton / neutron / electron** | Heavy-ion / proton accelerator |
| Node-scaling trend | gate better / STI worse | **weakly node-dependent — a materials & device-architecture issue, not a logic-node one** | worse (Qcrit ↓) |

The scaling row is the key cross-cut: TID and SEE pull in opposite directions with the logic node (see each page's scaling section), but **DDD is largely orthogonal to the logic node** — it tracks the semiconductor *material* (Si vs GaAs vs InGaP/Ge vs InP) and device *architecture* (bulk-carrier vs surface-channel), so it does not "improve for free" as CMOS shrinks. For an optocoupler or a solar array, Moore's law offers no relief.

## Historical Lineage & 100-Year View (拉長時間軸)

| Era | Milestone | Why it mattered |
|---|---|---|
| **1962** | [[concepts/tid-total-ionizing-dose|Starfish Prime]] trapped-electron belt degrades satellite **solar arrays** (not just electronics) | First mass demonstration of *displacement*-driven array power loss — the birth of DDD as an engineering concern |
| **1960s–70s** | JPL builds the **relative-damage-coefficient / equivalent-1-MeV-electron-fluence** solar-cell handbook | Gave the first predictive DDD method (equivalent-fluence flavour) |
| **1980s–90s** | **NRL (Summers, Messenger, Walters, Warner)** formalise **NIEL** and the **Displacement Damage Dose** method | Unified all particles/energies into one displacement metric; extended cleanly to multi-junction III-V cells |
| **1990s–2000s** | Optocoupler DDD failures (CTR collapse) + CCD/CMOS dark-current studies (Hubble, star-trackers) | DDD recognised as the *governing* mode for opto/imaging parts, distinct from TID |
| **2024–26** | [[concepts/solar-cycle-25-leo-radiation|Solar Cycle 25]] peak raises trapped/SEP fluence; NewSpace flies COTS image sensors + large arrays | DDD budgeting re-surges alongside the COTS-in-space wave ([[concepts/cots-gpu-radiation-risk]]) |

**100-year structural view (labelled scenario, not fact):** like its two siblings, the *forcing* is astrophysically fixed — trapped protons/electrons and solar particle events set the displacement fluence, unchanged by technology. What migrates is the *device exposure surface*: as missions add ever-larger solar arrays, higher-resolution image sensors, and optical/laser inter-satellite links, the **optoelectronic** device population — precisely the DDD-limited class — grows fastest. The century-scale invariant mirrors the [[concepts/rha-radiation-hardening|RHA]] "toll booth never closes" thesis: DDD cannot be shielded away cheaply (protons/neutrons are penetrating, the shielding exponent is weak like the SEE case — see [[concepts/orbit-dose-budgeting]]), so it is managed by **material choice, annealing-aware design margins, and array/sensor over-sizing**. The long-run equilibrium is again *system-level* — you size the power and imaging budgets for end-of-life displaced-lattice performance, not beginning-of-life datasheet numbers.

## Six-Region & Standards Note (水平展開 — honest N/A)

- **六地域 (台美日韓中國歐洲): partial N/A.** The displacement *physics* is region-agnostic (NIEL is a material constant), so the meaningful geographic axis is the same **standards + method-authorship** duopoly mapped on [[concepts/tid-total-ionizing-dose]] and [[concepts/see-single-event-effects]]: the two predictive methods are US-authored (**JPL** equivalent-fluence + **NRL** DDD); neutron NIEL normalization is **ASTM E722** (US); ESA/ESCC carries the European method set; China runs sovereign **GJB** equivalents; Japan/Korea/Taiwan are adopters. Taiwan's test ecosystem ([[concepts/taiwan-radiation-test-ecosystem]]) already has the **proton beam** that does DDD screening (NTU Hospital cyclotron) — so DDD is, unusually, a mode Taiwan *can* run domestically (unlike heavy-ion SEE), a small exception to the upstream-strong/midstream-absent signature.
- **Test-capacity tie-in:** because protons do DDD+TID together, the proton-accelerator capacity mapped on [[synthesis/radiation-test-rad-hard-six-region]] is the DDD-relevant capacity; heavy-ion facilities (the scarce SEE bottleneck) are *not* the DDD constraint. DDD is the least supply-constrained of the three mechanisms to test.

## Related

- [[concepts/tid-total-ionizing-dose]] — the *ionizing* cumulative mechanism; DDD is its *non-ionizing* twin (protons cause both at once)
- [[concepts/see-single-event-effects]] — the single-particle mechanism; DDD completes the three-mechanism taxonomy
- [[concepts/rha-radiation-hardening]] — DDD adds an optocoupler/solar-cell/image-sensor screening line to the assurance workflow
- [[concepts/orbit-dose-budgeting]] — DDD is a *separate* budget line (NIEL-scaled) not captured by the TID krad number
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 raises the trapped/SEP fluence that drives displacement damage
- [[concepts/cots-gpu-radiation-risk]] — COTS image sensors + arrays are the NewSpace DDD-exposed surface
- [[concepts/taiwan-radiation-test-ecosystem]] — Taiwan's proton beam *can* run DDD screening (the mode it is not missing)
- [[synthesis/radiation-test-rad-hard-six-region]] — proton capacity is the DDD-relevant capacity; heavy-ion is the SEE bottleneck
- [[sources/space-radiation-tid-see-2025]] — the source that framed radiation as "two threats"; DDD is the missing third
- [[sources/radtest-playbook-sampras-2021]] — engineer's playbook; DDD screening belongs alongside the TID/SEE steps
