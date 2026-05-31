---
type: source
tags: [datacenter-cooling, liquid-cooling, ocp, standard, ai-hardware, trader-agent]
title: "OCP Universal Quick Disconnect (UQD) Specification"
author: "Open Compute Project — UQD Workstream (contributors: CPC, NVIDIA, Staubli, Parker, Gates, CEJN, Amphenol)"
date: "2020-01-01"
ingested: "2026-06-01"
---

# OCP Universal Quick Disconnect (UQD) Specification

The Open Compute Project (OCP) Universal Quick Disconnect (UQD) is an industry standard for spill-free, tool-free quick-connect/disconnect couplings that connect liquid-cooled server equipment to rack manifolds and coolant distribution units (CDUs). The standard enables multi-vendor interoperability in data center liquid-cooling infrastructure, which is essential as the AI computing transition drives rapid DLC adoption.

## Specification History

| Version | Release | Key change |
|---|---|---|
| UQD v1.0 | ~2020 | Initial release; Intel-initiated spill-free coupling standard |
| UQDB v1.0 | ~2021 | Blind-mate variant (mating without visual alignment) |
| UQD v1.0.2 | 2024 | Current stable release; minor errata; document at [opencompute.org](https://www.opencompute.org/documents/ocp-universal-quick-disconnect-uqd-specification-rev-1-0-2-pdf) |
| UQD v2.0 (draft) | April 2025 (draft dated April 16, 2025) | Unification of UQD + UQDB into single spec; defined interoperability testing; new mating configuration; backward-compatible with v1.0 and UQDB v1.0 |

The v2.0 workstream was established in late 2024 and is co-led by Elizabeth Langer (CPC Principal Technologist - Thermal) and Travis Gaskill (NVIDIA Thermal/Mechanical Engineer). A workstream update video was published on YouTube ([Workstream Update - UQDv2.0](https://www.youtube.com/watch?v=gW4aas0961M)). CPC presented UQD 2.0 at COMPUTEX 2025 (May 17–20, 2025, Booth R1226, TaiNEX-2).

## Scope and Purpose

The OCP UQD standard defines:

- **Physical geometry** — coupling body diameter, thread/bayonet engagement, face configuration to ensure male-female interoperability across vendors
- **Performance requirements** — spill-free disconnection (zero fluid loss on disconnect), rated flow rates, operating pressure range, temperature range for data center coolant (typically 20–45°C facility water)
- **Leak test requirement** — 100% helium leak testing is required per v2.0 draft (CPC COMPUTEX 2025 commentary); spill-proof valve mechanism is patented per UQDB04 and UQD06 product lines
- **Material compatibility** — compatibility with data center coolant additives and corrosion inhibitors
- **Interoperability requirement** — v2.0 goal is true cross-vendor mating: a coupling from any OCP-certified vendor mates with any OCP-certified counterpart

## OCP-Certified Vendor Ecosystem (as of mid-2025)

Active certified or workstream-contributing suppliers include:

- **CPC (Colder Products Company)** — founding contributor; UQDB04 and UQD06 product lines; leading UQD v2.0 workstream
- **Staubli** — UQD and UQDB product lines approved by NVIDIA (certification announced 2025; [staubli.com/us/en/news/global/2025/uqd-staubli-nvidia-approved.html](https://www.staubli.com/us/en/news/global/2025/uqd-staubli-nvidia-approved.html))
- **Parker Hannifin** — UQD Series non-spill liquid cooling couplings
- **Gates Corporation** — OCP UQD-compliant couplings for data center applications
- **CEJN** — listed in OCP product registry ([opencompute.org/products/340/cejn-universal-quick-disconnect-uqd](https://www.opencompute.org/products/340/cejn-universal-quick-disconnect-uqd))
- **Amphenol Industrial** — OCP-compliant liquid cooling quick disconnects ([amphenol-industrial.com/ocp-compliant-liquid-cooling-quick-disconnects/](https://amphenol-industrial.com/ocp-compliant-liquid-cooling-quick-disconnects/))

NVIDIA's direct participation (Travis Gaskill in v2.0 workstream) indicates that NVIDIA is standardizing UQD as part of its GB200/GB300 rack-scale reference architecture.

## Market Context

The global UQD Coupling for Liquid Cooling market was valued at approximately USD 95.31 million in 2024 and is projected to reach USD 2,630 million by 2031, representing a CAGR of ~46% (Intel Market Research). This growth is primarily driven by AI accelerator deployments requiring DLC for GB200 (130 kW/rack), GB300, and future Rubin-generation racks.

At SMCI's stated 2,000 DLC racks/month production rate (2025), approximately 48–144 UQD connections are consumed per rack, implying ~96,000–288,000 UQD couplings demanded monthly from this single OEM.

## Specification Documents and URLs

- **UQD v1.0.2 PDF** (current stable): [opencompute.org/documents/ocp-universal-quick-disconnect-uqd-specification-rev-1-0-2-pdf](https://www.opencompute.org/documents/ocp-universal-quick-disconnect-uqd-specification-rev-1-0-2-pdf) — NOTE: this URL returns HTTP 403 in automated fetches; access via OCP member portal or direct browser navigation.
- **UQD v2.0 draft presentation**: [youtube.com/watch?v=gW4aas0961M](https://www.youtube.com/watch?v=gW4aas0961M) (workstream update video)
- **UQD v2.0 introduction**: [youtube.com/watch?v=fRZbiLgIgIk](https://www.youtube.com/watch?v=fRZbiLgIgIk)
- **CPC UQD product page**: [cpcworldwide.com/Liquid-Cooling/Products/Universal-Quick-Disconnects-UQDs](https://www.cpcworldwide.com/Liquid-Cooling/Products/Universal-Quick-Disconnects-UQDs)
- **OCP product registry**: [opencompute.org/products/340/cejn-universal-quick-disconnect-uqd](https://www.opencompute.org/products/340/cejn-universal-quick-disconnect-uqd)

## Ingestion Notes

- OCP UQD v1.0.2 PDF (canonical document) returned HTTP 403 in automated fetch during ingestion; spec contents summarized from secondary sources (CPC product documentation, COMPUTEX 2025 coverage, workstream video summaries, Amphenol application notes).
- Version number in slug is "2024" because v1.0.2 is the current stable release date and v2.0 was still draft status at ingestion time.
- The v2.0 draft dated April 16, 2025 (DRAFT_OCP+UQD+Spec+v2.0.1_16Apr25 at hansenfluid.com) failed to fetch due to expired TLS certificate.

## Related Wiki Pages

- [[concepts/liquid-cooling-leadtime-indicator]] — uses UQD lead time as a sub-metric for the supply-chain leading indicator
