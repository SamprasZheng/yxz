---
type: synthesis
tags: [radiation, see, tid, rha, rad-hard, testing, heavy-ion, supply-chain, leo, taiwan, six-region, sovereignty]
sources:
  - "[[sources/space-radiation-tid-see-2025]]"
  - "[[sources/radtest-playbook-sampras-2021]]"
concepts:
  - "[[concepts/rha-radiation-hardening]]"
  - "[[concepts/tid-total-ionizing-dose]]"
  - "[[concepts/see-single-event-effects]]"
  - "[[concepts/taiwan-radiation-test-ecosystem]]"
  - "[[concepts/cots-gpu-radiation-risk]]"
---

# Space Radiation Test Infrastructure & Rad-Hard Sovereignty — Six-Region Map

**Question this answers:** Across the chain that lets a chip fly — heavy-ion / proton single-event-effect ([[concepts/see-single-event-effects|SEE]]) accelerators, Co-60 total-ionizing-dose ([[concepts/tid-total-ionizing-dose|TID]]) sources, and the radiation-hardened ([[concepts/rha-radiation-hardening|RHA]]) IC product lines they qualify — who leads, who lags, and where does Taiwan sit? This is the **qualification-layer companion** to [[synthesis/phased-array-rf-frontend-supply-chain]] (the RF-component map) and [[synthesis/orbital-data-center-six-region]] (the compute map). All three converge on the same structural finding from [[synthesis/leo-taiwan-odc-gap]]: Taiwan makes the hardest atoms but does not own the gate that certifies them.

## Why test infrastructure *is* the supply chain

Radiation qualification is the **implicit admission ticket** for any part entering a constellation supply chain ([[concepts/rha-radiation-hardening]]). The capability is unevenly distributed because the three test modes have very different capital and access profiles:

| Test mode | What it bounds | Capital / access character |
|---|---|---|
| **Co-60 γ TID** ([[concepts/tid-total-ionizing-dose]]) | Cumulative dose; Vth drift; ELDR | Cheapest, most widely available; many national labs + medical sources |
| **Proton SEE** | Trapped-belt + SEP environment; indirect SEE via nuclear reactions | Mid; medical proton-therapy cyclotrons are increasingly dual-use |
| **Heavy-ion SEE** ([[concepts/see-single-event-effects]]) | Direct GCR ionization; full SEU/SEL/SEFI/SEB cross-sections | **Scarcest + most expensive** — needs a large accelerator; the true sovereignty bottleneck |

The US National Academies put the punchline plainly: heavy-ion testing is *"usually the most reliable method for bounding risk due to single-event effects... [but] also the most expensive — both in terms of cost and schedule,"* and the national system is *"working but increasingly fragile"* ([Testing at the Speed of Light, NAP 24993, 2018](https://nap.nationalacademies.org/read/24993/chapter/5)). Increasing in-package integration and 3D stacking *raise* the required ion energy to penetrate to the sensitive volume — so the heavy-ion bottleneck tightens exactly as commercial NewSpace volume explodes.

## Six-region leadership

| Region | Heavy-ion SEE | Proton SEE | TID (Co-60) | Rad-hard IC product line | Net position |
|---|---|---|---|---|---|
| **US** | **Leads** — TAMU Radiation Effects Facility (~80,000 hrs total beam time, He→Au to 40 MeV/u; world's leading commercial SEE provider), LBNL BASE (to Bi, LET>99), BNL NSRL | Leads — TAMU (≤45 MeV), UC Davis, MGH | Leads — multiple labs + commercial (Zero-G >6000-part COTS DB) | **Leads** — BAE RAD750 / RAD5500/RAD5545 (100 krad, latch-up immune), Microchip rad-hard FPGA/MCU | Full-stack leader; but flagged "fragile" by its own gov |
| **Japan** | **Strong** — HIMAC (QST-NIRS Chiba, p→Xe to 800 MeV/u, SEE since ~1994), TIARA (QST-Takasaki AVF cyclotron, microbeam), RIKEN RIBF | Strong — HIMAC, CYRIC | Strong — QST, JAXA | **Yes** — Renesas rad-hard line | Deep facility + device base; smaller commercial-terminal market |
| **Europe** | **Leads (ESA-coordinated)** — GANIL (FR, ESA partner), GSI/FAIR (DE, highest energy), UCLouvain HIF (BE), **RADEF/Jyväskylä (FI)** — ESA ECIF since 2005, contract to 2027, high-penetration cocktails | Strong — PSI (CH), RADEF, UCLouvain | Strong — incl. commercial **TRAD (Toulouse)** Co-60+Cf+Am | **Yes** — STMicroelectronics, Infineon, Teledyne e2v (UK), 3D Plus | Strong + uniquely *coordinated* via ESA ECIF network |
| **China** | **Sovereign** — HIRFL (IMP-CAS Lanzhou, 2 dedicated SEE terminals), CIAE (Beijing, HI-13 tandem) | Yes — CIAE, CSNS | Yes — domestic | **Domestic-only** (US ITAR/EAR cut off Western rad-hard supply → forced indigenization) | Self-sufficient + opaque; sanctions made rad-hard a sovereignty project |
| **Korea** | **Emerging** — RAON (IBS, Daejeon; 200 MeV/u U beam; commissioning, not yet a routine SEE service); KAERI/KOMAC is proton-focused | Yes — **KOMAC** (KAERI, Gyeongju, 100 MeV proton) | Yes — KAERI | Largely **absent** (buys Western rad-hard) | Fast-building basic-science accelerators; SEE *service* + rad-hard IC line still nascent |
| **Taiwan** | ❌ **Absent** — must travel to LBNL/TAMU/TRIUMF/GANIL | ✅ Since 2023 — CGMH + NTU Cancer Center superconducting cyclotron | ✅ INER Co-60 | ❌ **Absent** (no indigenous rad-hard IC) | TID+proton domestic since 2023 (★★☆☆☆); heavy-ion + rad-hard IC absent |

## Region notes

- **US — leads but self-describes as fragile.** TAMU's Radiation Effects Facility is the commercial SEE workhorse (~80k beam-hours cumulative; He→Au to 40 MeV/u); LBNL BASE and BNL NSRL round out the high-LET/space-sim end. The rad-hard *device* monopoly is just as decisive: BAE's RAD-series flight processors and Microchip's rad-hard FPGAs are the heritage parts most non-US programs still buy. The fragility warning ([NAP 24993](https://nap.nationalacademies.org/read/24993/chapter/6)) is the strategic tell: capacity is funding-dependent, not guaranteed.
- **Japan — deep, dual-use, quiet.** HIMAC was built for carbon-ion cancer therapy but has run electronics SEE for ~25 years; it reaches Xe at 800 MeV/u — enough energy for thick modern packages. Combined with TIARA's microbeam and Renesas's rad-hard line, Japan is the strongest non-US/non-Europe full chain.
- **Europe — the coordination advantage.** No single European facility matches TAMU's commercial throughput, but ESA's **ECIF** program *coordinates* GANIL, RADEF, UCLouvain, PSI and others into a qualified shared network — plus the only major *commercial* European lab, TRAD. STMicro/Infineon/Teledyne-e2v give Europe a real rad-hard device base. Coordination, not raw capacity, is the European moat.
- **China — sovereignty by sanction.** US ITAR/EAR controls on rad-hard parts made domestic capability non-optional; HIRFL (two dedicated SEE terminals) + CIAE give China an indigenous heavy-ion test base, and rad-hard ICs are built domestically. Capability is real but opaque; few public cross-sections.
- **Korea — accelerators ahead of services.** Korea is pouring capital into big-science machines (RAON heavy-ion, KOMAC proton) but a *routine, commercial* SEE qualification service and an indigenous rad-hard IC line both lag the hardware. Closest analog to Taiwan, one notch ahead on heavy-ion hardware.
- **Taiwan — the 2023 half-step, now an operating service.** The [[concepts/taiwan-radiation-test-ecosystem|NSPO/TASA consortium]] (2020) + the NTU Cancer Center superconducting-cyclotron MoU (2022, proton SEE from 2023) closed the TID and proton gaps domestically. **Mid-2026 fact-check:** the alliance has scaled from its founding trio to **~13 member institutions with 500+ tests completed (2020–2025)** and TASA now markets 「太空輻射環境驗測」 as a formal industrial service ([[concepts/taiwan-radiation-test-ecosystem]], accessed 2026-07-23) — so the ★★☆☆☆ is a *utilised* capability, not a paper one. Heavy-ion SEE and any rad-hard IC remain absent — the same "absent midstream/gate" shape as [[synthesis/phased-array-rf-frontend-supply-chain]] and [[synthesis/leo-taiwan-odc-gap]].

## Where Taiwan sits (the honest read)

Taiwan's upstream is world-class — [[entities/win-semiconductors]] (GaAs/GaN MMIC), [[entities/ascend-tech]] (filters into Starlink/Kuiper), [[entities/huatong-pcb]] (LEO PCB) — but the parts these vendors ship into constellations are qualified on **foreign heavy-ion beams**, and the high-reliability brains of any spacecraft are **foreign rad-hard ICs**. Two domestic gaps, both one layer up from where Taiwan plays: (1) no heavy-ion accelerator with flight-part SEE throughput (a tens-of-billions-NTD capital item, no visible plan), and (2) no indigenous rad-hard IC product line. This is the identical value-capture story the sibling syntheses tell: the toll booth sits at integration + certification, and Taiwan doesn't own it.

The [[concepts/cots-gpu-radiation-risk|COTS-GPU]] turn does *not* erase this. NewSpace's COTS-everything economics (Starlink/[[entities/starcloud|Starcloud]]) shifts work from "buy a rad-hard part" to "upscreen a commercial lot" — but upscreening is *more* heavy-ion-beam-hungry per program, not less, because each unqualified lot now needs its own cross-section curve. The bottleneck moves from the fab to the accelerator.

## Long-horizon (100-year) view — labelled scenario, not fact

The binding constraint here is a **physical invariant on the order of the σT⁴ heat-rejection ceiling** in [[synthesis/orbital-data-center-six-region]]: the galactic-cosmic-ray + trapped-particle environment is fixed by the heliosphere and Earth's magnetosphere, modulated only by the ~11-year solar cycle ([[concepts/solar-cycle-25-leo-radiation]]). Silicon nodes keep shrinking → Qcrit keeps falling → SEE sensitivity *rises* with every process generation. So:

- **The qualification toll booth never closes.** As long as there is space hardware and shrinking transistors, somebody must own a heavy-ion beam and a rad-hard process. This is a ~century-scale structural rent, not a transient gap.
- **Rad-hard fabrication structurally lags the commercial node by ~1–2 decades** (RAD5545 is a Power-Architecture part; flight FPGAs trail leading-edge logic). This lag is itself an invariant — rad-hard volumes can never amortize a leading-edge fab — so the "rad-hard-by-design on a trailing node + COTS-upscreen-on-leading-node" split is likely permanent.
- **~2030s–2050s scenario:** orbital compute scale ([[concepts/orbital-data-center]]) forces *industrial-scale* SEE throughput; whoever owns abundant high-energy heavy-ion beam time + a sovereign rad-hard line captures the gate. US fragility (its own warning) + China sovereignty + ESA coordination are three different bets on who holds it.
- **~2100 ceiling:** absent a physics change (e.g., inherently radiation-immune device substrates at scale, or self-healing logic), the toll booth is permanent. The open question mirrors the sibling syntheses' shared unknown: does *coordination/standardization* (ESA-ECIF style, or an international shared-beam compact) dissolve the per-nation bottleneck, the way fee-funded security or shared launch cadence might?

## Falsifiability / what would change this read

- Taiwan stands up a heavy-ion accelerator with routine flight-part SEE throughput → the "heavy-ion absent" claim falsifies and the domestic gate closes ([[concepts/taiwan-radiation-test-ecosystem]]).
- A Taiwanese (or Korean) fabless house ships a qualified indigenous rad-hard MCU/FPGA at volume → the "rad-hard absent" claim falsifies.
- COTS-upscreen + system-level mitigation ([[concepts/cots-gpu-radiation-risk]]: SEL-cutoff + ECC + shielding) becomes accepted for high-reliability missions without per-lot heavy-ion data → the heavy-ion bottleneck *weakens* and the whole sovereignty thesis softens.
- An international shared-beam / mutual-recognition compact emerges → coordination dissolves the per-nation gate (Europe's ECIF is the proof-of-concept).

## Cross-links

- Physics + process: [[concepts/tid-total-ionizing-dose]], [[concepts/see-single-event-effects]], [[concepts/rha-radiation-hardening]], [[concepts/solar-cycle-25-leo-radiation]], [[concepts/orbit-dose-budgeting]]
- COTS / AI compute: [[concepts/cots-gpu-radiation-risk]], [[concepts/orbital-data-center]], [[entities/starcloud]]
- Taiwan + supply chain: [[concepts/taiwan-radiation-test-ecosystem]], [[concepts/leo-value-chain]], [[entities/win-semiconductors]], [[entities/ascend-tech]], [[entities/huatong-pcb]]
- Sibling six-region maps: [[synthesis/phased-array-rf-frontend-supply-chain]], [[synthesis/orbital-data-center-six-region]], [[synthesis/leo-taiwan-odc-gap]], [[synthesis/agentic-payments-six-region]], [[synthesis/polkadot-2026-jam-tokenomics-six-region]]
- Source playbook: [[sources/radtest-playbook-sampras-2021]], [[sources/space-radiation-tid-see-2025]]
