---
type: entity
tags: [adr, active-debris-removal, on-orbit-servicing, ssa, space-debris, stm, commercial-ssa, japan, six-region, mission-desk]
---

# Astroscale

Astroscale Holdings Inc. is the Japan-headquartered on-orbit-servicing company that is the **commercial flagship of the "act" tier** ([[concepts/conjunction-screening-providers|conjunction screening]] detects, Astroscale *removes/services*) in the wiki's [[synthesis/commercial-space-traffic-management-six-region|six-region commercial space-traffic-management map]]. It is the **only listed, commercially-structured active-debris-removal (ADR) pure-play at scale** — Tokyo Stock Exchange Growth Market, 2024-06 (ticker **186A**, ~¥20.1B raised) — and the single most-referenced non-US vendor across the SSA/ops-AI/STM corpus. This page consolidates the Astroscale facts formerly scattered as plain text across [[synthesis/commercial-space-traffic-management-six-region]], [[synthesis/space-situational-awareness-six-region]], and [[synthesis/llm-satellite-operations-six-region]].

## Business

- **Founded:** 2013 by Nobu Okada; HQ Tokyo.
- **Listing:** Tokyo Stock Exchange Growth Market, 2024-06 (186A) — the world's first pure-play ADR company to go public.
- **Subsidiaries:** Astroscale Japan (ADR + servicing), Astroscale Ltd (UK, Harwell/Oxfordshire — ELSA-M + UK defence), Astroscale US (Denver), plus Israel and France presence.
- **Anchor demand:** JAXA's Commercial Removal of Debris Demonstration (**CRD2**) program is the foundational customer; the company is building a genuine *servicing-as-a-service* business on top of that agency anchor — the "commercial flagship, agency-anchored" pattern in [[synthesis/commercial-space-traffic-management-six-region]] §3.3.

## Service Portfolio (拆分細化 of the "act" tier — three lines, not one ADR product)

Astroscale is **not** a pure-ADR company any more; by 2026 it runs three distinct on-orbit-servicing lines, which is why the T3 "act" tier in the commercial-STM map should be read as a *servicing portfolio*, not a single debris-removal bet:

| Line | Product(s) | What it does | 2026 status |
|---|---|---|---|
| **ADR — active debris removal** | ADRAS-J, ADRAS-J2 | Rendezvous with + deorbit *existing uncontrolled* large debris | ADRAS-J complete + deorbited 2026-03; ADRAS-J2 in development (launch 2027–2028) |
| **LEX — life extension & refueling** | ELSA-M, REFLEX-J, LEXI | Dock with a *client's own* satellite to extend life / refuel / deorbit on command | ELSA-M mission-readiness 2026-09/10; REFLEX-J past SRR (JAXA Space Strategy Fund) |
| **Inspection / monitoring** | ISSA-J1, HEO partnership | Non-contact inspection + space-domain-awareness imagery for allied nations | ISSA-J1 in assembly + e-test (PSLV launch); HEO allied-monitoring deal |

## ADR — ADRAS-J and ADRAS-J2

- **ADRAS-J** (JAXA CRD2 Phase I) achieved the **world-first non-cooperative rendezvous-and-proximity-operations (RPO) campaign** against a large piece of real debris — a spent **H-IIA rocket upper stage** (~11 m × 4 m, ~3 tonnes) in LEO — and **completed operations + began controlled deorbit in 2026-03** after ~293 days. Recognized with a Japan Minister of Defense Award. It is the proof that non-cooperative close approach of a tumbling object is operationally real, not just simulated.
- **ADRAS-J2** (JAXA CRD2 Phase II; ~¥12B / ~$82M) is the intended **world-first *removal* of an existing large debris object** — it will capture and deorbit the *same* H-IIA upper-stage class ADRAS-J inspected. It signed its **own Isar Aerospace Spectrum launch contract on 2026-09-01** (Isar's *second* Astroscale deal after ELSA-M) for a **2027–2028 / Japan-FY2027** window from **Andøya Space, Norway**; spacecraft development and testing are underway as of late 2026.

## LEX — ELSA-M (life extension) and REFLEX-J (refueling)

- **ELSA-M** (Astroscale Ltd, UK) is a **~520 kg servicer** designed to capture and deorbit an **end-of-life Eutelsat OneWeb satellite** — a *cooperative* client sat fitted with a docking plate, distinct from ADR's uncontrolled targets. It **completed its Critical Design Review in 2025-06** (validated by an ESA + Eutelsat customer team), signed an **Isar Aerospace Spectrum launch contract 2026-03-16**, and is slated for Astroscale's **FY2028**. In **late Sept / early Oct 2026** Astroscale UK announced a **mission-readiness milestone** and **ISO/IEC 27001:2022 certification** (eligibility to work with government + private partners). Largely self-funded, with ESA + UK Space Agency support; built and operated at Harwell.
- **REFLEX-J** (Astroscale Japan) is a **refueling** spacecraft under the Life-Extension line, funded through **JAXA's Space Strategy Fund** (electric-propulsion propellant resupply in GEO). Year-1 contract raised 2026-03, year-2 signed 2026-04; **System Requirements Review complete**, System Definition Review in preparation (Q1 FY2027 update, 2026-09).

## Inspection + UK defence (2026 diversification)

- **ISSA-J1** is an inspection/space-situational-awareness satellite (SRR complete; assembly + electrical testing underway; **PSLV** launch contract) — moving Astroscale toward the *monitoring* adjacency of the SSA stack, not only removal.
- **UK Ministry of Defence programme (disclosed 2026-09-30):** Astroscale Ltd won a **multi-year ~£15M (~$20M) UK MoD defence programme** (signed 2026-09-29 UK time; the specific service is undisclosed at the customer's request, revenue recognised over several fiscal years). This is the clearest 2026 signal that the UK arm is broadening from ELSA-M-only into sovereign UK defence SSA/servicing — the same "government-anchored" demand pattern the US vendors show ([[entities/slingshot-aerospace]], [[entities/leolabs]]), now visible in Astroscale's UK book.

## Six-Region Positioning

Astroscale is the **Japan** node of the commercial-STM six-region map and the anomaly among the six: where the US built a crowded Tier-2 conjunction-screening-SaaS market ([[entities/slingshot-aerospace|Slingshot]], [[entities/kayhan-space|Kayhan]], COMSPOC) and Europe a VC+agency-pulled debris-data startup wave (Vyoma/Neuraspace/Okapi), Japan **skipped the screening market and bet the "act" tier nobody else commercialized** — ADR + life-extension + refueling as a listed business. Full market-model treatment, the three market models, and the 100-year STM-commercialization question: [[synthesis/commercial-space-traffic-management-six-region]]. Its on-board autonomy software analog in Europe is [[entities/aiko-space]] (which supplies autonomy *software* rather than flying servicers); its US SSA-data counterparts are [[entities/leolabs]] (Tier-1) and [[entities/slingshot-aerospace]] (Tier-2).

## Relevance to Firefly / Mission Desk

Astroscale sits one step *downstream* of the [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]]: the Mission Desk's conjunction/CDM triage ([[synthesis/cdm-pc-decisioning]]) decides *whether* an object is a collision risk; an ADR/servicing operator like Astroscale is who *acts* on the chronic-debris subset. The "detect → decide → act" chain across [[concepts/conjunction-screening-providers]] (detect), the Mission Desk (decide), and Astroscale (act) is the full commercial space-safety stack.

## See Also

- [[synthesis/commercial-space-traffic-management-six-region]] — the six-region commercial STM market map; Astroscale = the Japan "act-tier commercial flagship"
- [[synthesis/space-situational-awareness-six-region]] — national SSA infrastructure companion
- [[synthesis/llm-satellite-operations-six-region]] — ops-AI six-region map (Astroscale's RPO autonomy context)
- [[concepts/conjunction-screening-providers]] — the detect layer upstream of Astroscale's act layer
- [[entities/aiko-space]] — Europe's on-board-autonomy analog (software, not servicers)
- [[entities/slingshot-aerospace]] · [[entities/kayhan-space]] · [[entities/leolabs]] · [[entities/privateer-space]] — the US commercial SSA vendors Astroscale is mapped against

## Sources

- Tokyo Stock Exchange Growth listing (2024-06) — https://www.astroscale.com/astroscale-listed-on-the-tokyo-stock-exchange-growth-market/
- ADRAS-J mission complete + deorbit (2026-03) — https://www.astroscale.com/en/news/astroscales-adras-j-mission-completes-operations-begins-deorbit ; Minister of Defense Award — https://www.astroscale.com/en/news/adras-j-mission-honored-with-minister-of-defense-award
- ADRAS-J2 × Isar Aerospace Spectrum launch contract (2026-09-01, 2027–2028 window from Andøya) — SpaceNews "Astroscale finalizes contract for Japanese debris removal mission" https://spacenews.com/astroscale-finalizes-contract-for-japanese-debris-removal-mission/ ; Payload "Astroscale Selects Isar to Launch Debris Removal Mission" ; SpaceWatch.GLOBAL (2026-09)
- ELSA-M × Isar Aerospace (2026-03-16, 520 kg, Eutelsat OneWeb target) — https://isaraerospace.com/press/isar-aerospace-secures-first-active-debris-removal-mission-with-astroscale ; ELSA-M Critical Design Review complete (2025-06) — https://www.astroscale.com/news/astroscales-elsa-m-spacecraft-completes-critical-design-review ; ELSA-M mission-readiness + ISO/IEC 27001:2022 (2026-09-30 / 2026-10-01) — Astroscale UK news page (astroscale.com/en/news)
- UK MoD ~£15M multi-year defence programme (signed 2026-09-29, disclosed 2026-09-30; service undisclosed) — Astroscale Holdings TDnet disclosure 2026-09-30 ; Seraphim "SpaceTech Sector Newsletter — September 2026"
- REFLEX-J (JAXA Space Strategy Fund refueling; year-1 raised 2026-03, year-2 signed 2026-04; SRR complete) + ISSA-J1 (inspection, PSLV launch, assembly + e-test underway) — Astroscale Q1 FY2027 update (2026-09) ; JAXA Space Strategy Fund electric-propulsion GEO refueling award
