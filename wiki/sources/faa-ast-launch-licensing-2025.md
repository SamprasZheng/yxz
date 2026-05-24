---
type: source
title: "FAA Office of Commercial Space Transportation (AST) — Licensing Program Overview 2025"
author: "FAA Office of Commercial Space Transportation (AST)"
date: "2025-08-14"
ingested: "2026-05-24"
tags: [faa, ast, space-launch, regulatory, licensing, notam, mission-desk]
---

# FAA AST — Licensing Program Overview 2025

**Primary URLs:**
- [faa.gov/space](https://www.faa.gov/space)
- [faa.gov/space/licenses](https://www.faa.gov/space/licenses)
- [faa.gov/space/licenses/licensing_process](https://www.faa.gov/space/licenses/licensing_process)
- [faa.gov/data_research/commercial_space_data/licenses/](https://www.faa.gov/data_research/commercial_space_data/licenses/)

**Milestone:** August 14, 2025 — FAA recorded its **1,000th licensed or permitted commercial space operation**, marking a record year for US commercial launch activity.

## 1. Regulatory office

The **Office of Commercial Space Transportation (AST)**, housed within FAA, is the sole US authority for commercial launch and reentry licensing. Its statutory basis is the Commercial Space Launch Act (51 U.S.C. § 50901 et seq.). AST operates within FAA's Line of Business for aviation safety.

## 2. License types under Part 450

As of March 10, 2026, all new licenses are issued under 14 CFR **Part 450** (Streamlined Launch and Reentry License Requirements), which consolidates the former Parts 415, 417, 431, and 435. Operators had until March 10, 2026 to transition existing licenses to Part 450.

| License type | Scope | Duration |
|-------------|-------|----------|
| **Vehicle Operator License** | Covers a class of vehicles with a defined mission profile; multiple flights under one license | Up to 5 years, renewable |
| **Mission-Specific License** | One launch or reentry operation; typically for novel vehicles/trajectories | Single operation |
| **Experimental Permit** | R&D / test-to-failure operations; not for revenue payload | Up to 1 year, renewable |

Part 450 licenses issued to date (2025 data): **seven Part 450 licenses**, including Astra Space, ABL Space, Inversion Space, Relativity Space, SpaceX (multiple vehicle types), Stratolaunch, and Varda Space.

## 3. Application timeline

The statutory review period is **180 days** from receipt of a complete application. In 2024 the FAA reported an average of **151 days** for full review. Notable fast-track: Blue Origin New Glenn first launch licensed in **114 days**. For two Part 450 licenses the FAA exceeded the 180-day limit.

The Part 450 Aerospace Rulemaking Committee (ARC) was launched in 2025 to recommend revisions; report expected late summer 2025.

### Application workflow steps

1. Pre-application meeting with AST (recommended)
2. Submit application via OCST portal including: flight safety analysis, hazard analysis, financial responsibility documentation, payload review (if required), environmental review (NEPA)
3. FAA completeness check (30-day target)
4. Safety evaluation — performance-based under § 450.101 (see below)
5. Environmental determination (EA or EIS if new site/trajectory; tiered EA for mission profile updates)
6. Policy review (national security, foreign policy, international obligations)
7. License issuance (or denial with written reasons)
8. **License modification** — operators can amend an existing license for new trajectories or annual-launch-limit increases (e.g., IFT-9: May 15, 2025 modification increased Starbase annual launches from 5 → 25)

## 4. Safety criteria: § 450.101

The core quantitative safety standard is the **Expected Casualty (EC) limit**:

- Maximum collective risk: **1 × 10⁻⁴ expected casualties** per launch/reentry from the general public
- Individual risk: no single uninvolved person may face > **1 × 10⁻⁶ probability of casualty** per operation
- Aircraft risk: < **1 × 10⁻⁶ probability of casualty** per operation from debris affecting air traffic
- High-consequence event protection (debris field, toxic release, nuclear/radiological payload)
- Disposal of orbiting stages (deorbit / graveyard orbit compliance)

These criteria replace the prescriptive rules in old Parts 415/417 with **performance-based requirements** — operators may propose any means of compliance that demonstrably meets the EC threshold.

## 5. Hazard area and NOTAM obligations (§ 450.161)

Under § 450.161, the operator must:
- Publicize, survey, control, or evacuate each flight hazard area before flight
- Coordinate Aircraft Hazard Area NOTAMs via the appropriate ARTCC or applicable ANSP
- Establish agreements with USCG (Letter of Intent / LOI) for Notice to Mariners (NOTMAR) covering maritime hazard areas
- Verify warnings have been issued before declaring launch commit
- Notify FAA if warnings have NOT been issued so FAA can determine if launch can safely proceed

The NOTAM must include: keywords "airspace," "space launch," or "space reentry"; launch site description; effective dates/times; chart of area boundaries. Issued **48–72 hours** before launch.

**USCG NOTMAR coordination:** The operator's LOI with USCG defines responsibilities. USCG publishes NOTMARs (Notice to Mariners) via Local NTM, Broadcast NTM, and NAVTEX for maritime hazard areas. Mariners in rocket flight trajectory/hazard areas are urged to vacate during launch windows.

## 6. Relationship to FCC and ITU

The FAA AST license governs **launch safety** (airspace, public casualty risk). It is separate from and does not substitute for:
- **FCC** license / Special Temporary Authority (STA) for radio frequency use (payload communications, TT&C)
- **FCC** earth station or satellite system authorization for on-orbit operations
- **ITU** coordination for frequency and orbital slot registration

Both FAA and FCC approvals are typically required before a commercial orbital launch. The mission-desk agent should track both clocks independently. See [[sources/faa-notam-search-2024]] for agent retrieval recipe.

## 7. Mission-desk notes

- FAA AST publishes a **Commercial Space Data** page at `faa.gov/data_research/commercial_space_data` listing license status and historical launch counts. No machine-readable API; web scraping or manual check required.
- FAA also publishes an annual **Aerospace Forecast** with commercial space projections (2025–2045 edition available).
- Stakeholder engagement pages (e.g., `faa.gov/space/stakeholder_engagement/spacex_starship`) post EA/EIS documents and mission-specific license modifications — useful for tracking imminent Starship launch windows.

## 8. Related pages

- [[concepts/notam]] — NOTAM structure and retrieval
- [[concepts/launch-window-slip]] — slip/scrub mechanics
- [[sources/faa-part-450-2020]] — the regulation itself
- [[sources/faa-notam-search-2024]] — how agents pull NOTAM data
- [[sources/notam-starship-ift8-2025]] — example license + NOTAM lifecycle
- [[synthesis/faa-notam-launch-lifecycle]] — agent integration guide
