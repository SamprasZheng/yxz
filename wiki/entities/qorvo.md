---
type: entity
tags: [rf, semis, mobile, handset, wifi, cellular, gaas, baw, fem, 5g, defense, gan, nasdaq, us]
---

# Qorvo, Inc. (NASDAQ: QRVO)

US RF semiconductor company formed by the March 2015 merger of RF Micro Devices and TriQuint Semiconductor. Headquartered in Greensboro, NC. As of fiscal year 2025 (ended March 2025), Qorvo reported total annual revenue of approximately **$3.72 billion**. Qorvo is one of the two dominant independent RF front-end module suppliers for cellular handsets alongside [[entities/skyworks]], and is simultaneously a leading GaN power-amplifier vendor for defense / infrastructure.

**Pending merger:** On October 28, 2025, Qorvo and Skyworks announced a definitive agreement to combine in a cash-and-stock transaction valuing the combined enterprise at approximately **$22 billion**. Qorvo shareholders receive $32.50 cash + 0.96 SWKS shares per QRVO share. Skyworks shareholders own ~63% of the combined entity; Qorvo shareholders ~37%. Shareholders voted to approve the deal in February 2026; regulatory close is targeted for 2026. Combined pro forma revenue ~$7.7B; management guides >$500M in annual cost synergies within three years. Phil Brace (Skyworks CEO) will lead the combined company; Bob Bruggeworth (Qorvo CEO) joins the board.

---

## Two Distinct Qorvo Businesses — Critical Disambiguation

Qorvo operates in two substantially different markets that should not be conflated:

1. **Mobile / connectivity RF front-end** (ACG + CSG segments) — handset PA/FEM/BAW for cellular and Wi-Fi; this is what most equity analysts mean when they discuss "Qorvo." This page covers this segment.
2. **Defense / infrastructure GaN power amplifier** (HPA segment) — high-power GaN-on-SiC PAs for radar, electronic warfare, SATCOM, and 5G base stations. This is covered in [[synthesis/phased-array-rf-frontend-supply-chain]], which lists Qorvo as a US leader in GaN PA for phased-array / AESA applications. The two businesses share the Qorvo corporate entity but serve entirely different customers, technology stacks, and market dynamics.

---

## Business Segments (as of FY2025)

Qorvo reports three segments:

| Segment | Q4 FY2025 Revenue | Character |
|---|---|---|
| **ACG** — Advanced Cellular Group | $580.3M | Handset RF (PA, FEM, PAMiD, BAW filters); Apple + Android |
| **HPA** — High-Performance Analog | $187.9M | Defense/Aerospace radar/EW/SATCOM GaN PAs; 5G base station; power mgmt ICs |
| **CSG** — Connectivity and Sensors Group | $101.3M | Wi-Fi FEMs, Bluetooth, IoT, Matter/Zigbee, sensors |

ACG represents the majority of revenue (~56% in Q4 FY2025) and is the most volatile segment due to handset cyclicality and customer concentration.

**HPA growth:** HPA hit record Defense & Aerospace quarterly revenue in the December 2024 quarter and grew 14.2% year-over-year in Q4 FY2025. The long-cycle defense business provides a more stable earnings base vs. the handset-driven ACG. For the defense GaN content specifically, see [[synthesis/phased-array-rf-frontend-supply-chain]] — that page covers GaN PA supply-chain dynamics across US, Europe, Korea, and China.

**CSG structural decline:** CSG revenue fell 17.5% year-over-year in Q4 FY2025 as lower-tier Android OEMs turned to cheaper commodity Wi-Fi FEM solutions and Qorvo proactively de-emphasized low-margin Android content in the Wi-Fi space.

---

## ACG: Cellular RF Front-End Business

### Technology portfolio

Qorvo's cellular business centers on [[concepts/rf-front-end-module]] products:

- **GaAs InGaP HBT PAs** — the core transmit amplifier for 4G/5G handsets; manufactured partly in-house (RFAB Richardson TX) and partly at contract foundries including [[entities/win-semiconductors]].
- **BAW (FBAR) filters** — Qorvo operates one of the three major BAW filter process platforms (alongside Murata and TDK/RF360). BAW is essential above ~2.5 GHz for 5G NR bands. The integration of BAW filtering into FEMs (resulting in **iFEM** products) is a key Qorvo differentiator — iFEMs reduce board area and simplify OEM design.
- **PAMiD modules** — the flagship integration format: co-packaged PA, duplexer/multiplexer, LNA, and switch in a laminate module; used in Apple iPhone and Samsung Galaxy flagship lines.
- **Wi-Fi FEMs and iFEMs** — standalone and integrated (BAW-filtered) front-end modules for 802.11ax (Wi-Fi 6/6E) and 802.11be (Wi-Fi 7). The 6 GHz band requires BAW filtering in Wi-Fi iFEMs.

### Apple and Android customer mix

Qorvo supplies content to both Apple iPhone (a share of the cellular RFFE alongside Skyworks and Broadcom) and Android OEMs (Samsung, Huawei, Xiaomi, Oppo/vivo, etc.). The Apple content is higher-ASP PAMiD; the Android content spans a broader range from premium PAMiD down to mid-tier FEMs.

**Structural headwind — China Android content loss:** Starting around 2022–2024, Qorvo experienced a material reduction in FEM content from Chinese Android OEMs, driven by (1) domestic Chinese RF suppliers (notably ROFS Microsystem / Vanchip / Smilics) capturing low-to-mid-band filter and PA content in budget devices, and (2) Qorvo's deliberate choice to proactively reduce low-margin Android revenue rather than compete on price. Management guided a ~$200M decline in lower-margin Android revenue across FY2025 and FY2026. Sales to China-based Android OEMs fell from ~$100M to ~$65M in a single quarter during the FY2025 cycle. This contraction is the primary reason ACG revenue declined across successive quarters (ACG fell from ~$654M → $635M → $580M over Q2–Q4 FY2025).

### Wi-Fi 7 FEM design win — MediaTek Dimensity 9400

On October 31, 2024, Qorvo announced that [[entities/mediatek]] selected Qorvo as a **key supplier for the inaugural wave of Wi-Fi 7 FEMs** on the MediaTek Dimensity 9400 platform (MT6653 Wi-Fi 7/Bluetooth combo chip). Volume shipments began Q4 2024.

Key technical details:
- Qorvo supplies both **linear and non-linear architecture FEMs** plus **iFEMs with integrated BAW filtering** for the MT6653.
- The product line spans low- to high-power offerings across the full Wi-Fi 7 spectrum (2.4 / 5 / 6 GHz).
- Eric Creviston (president, Connectivity and Sensors Group): "We're pleased MediaTek has selected Qorvo to be a key supplier of Wi-Fi 7 FEMs for their next-generation mobile Wi-Fi platform."

This design win is strategically significant: it demonstrates Qorvo's ability to win at the integration inflection point (iFEM with BAW) that Wi-Fi 7's 6 GHz requirement creates. See [[entities/mediatek]] for the Dimensity 9400 platform context.

---

## Restructuring and Strategic Actions (FY2024–FY2025)

Qorvo executed several material restructuring actions during this period:

1. **SiC power device divestiture** — In December 2024 Qorvo entered a definitive agreement to sell its silicon carbide (SiC) power device business (a non-core segment acquired with the NextInput/SiGe acquisitions); sale closed January 14, 2025. Pre-sale write-downs included $13.7M inventory, $16.6M intangible impairment, and ~$96.5M goodwill impairment. Net effect: the HPA segment is now more cleanly focused on RF/GaN rather than power conversion.
2. **Android footprint reduction** — Intentional de-emphasis of low-margin Android content to improve gross margin mix.
3. **OpEx reduction** — Actions targeting ~$70M annual OpEx reduction by FY2027.

By Q2 FY2026 (September 2025, the last pre-merger quarter reported), Qorvo recovered to $1.1B quarterly revenue with 47.0% GAAP gross margin, suggesting the restructuring actions were improving profitability before the merger announcement.

---

## Valuation Context (Public and Neutral)

Prior to the merger announcement, QRVO traded at materially depressed multiples relative to the broader semiconductor sector. The public bear case cited: (1) ACG cyclicality and China Android content erosion; (2) CSG structural revenue decline; (3) limited pricing power vs. larger integrated rivals (Qualcomm includes RF360 filter JV and QET power management; Apple vertically integrates some RFFE content for future iPhones). The public bull case cited: (1) HPA defense growth in a strong DoD RF/GaN cycle; (2) Wi-Fi 7 iFEM positioning; (3) free cash flow generation even in the down-cycle. The $22B merger transaction (October 2025) was read by the market as confirmation that standalone Qorvo at its pre-announcement price was undervalued relative to its strategic asset value.

---

## Cross-links

- RF front-end technology foundation: [[concepts/rf-front-end-module]]
- Pending merger counterpart: [[entities/skyworks]]
- MediaTek design win context: [[entities/mediatek]]
- GaAs foundry: [[entities/win-semiconductors]]
- Defense / GaN phased-array segment (distinct business): [[synthesis/phased-array-rf-frontend-supply-chain]]

## Sources

- [Qorvo Wi-Fi 7 FEM for Dimensity 9400 press release (2024-10-31)](https://www.qorvo.com/newsroom/news/2024/qorvo-selected-by-mediatek-as-key-supplier-for-the-inaugural-wave-of-wi-fi-7-fems)
- [GlobeNewswire — Qorvo Wi-Fi 7 FEM announcement](https://www.globenewswire.com/news-release/2024/10/31/2973009/11142/en/Qorvo-Selected-by-MediaTek-as-Key-Supplier-for-the-Inaugural-Wave-of-Wi-Fi-7-FEMs-Used-in-MediaTek-Dimensity-9400.html)
- [Qorvo press release — Skyworks + Qorvo merger announcement (2025-10-28)](https://www.qorvo.com/newsroom/news/2025/skyworks-and-qorvo-to-combine-to-create-22-billion-us-based-leader)
- [Qorvo FY2025 Q4 earnings release — SEC Form 8-K](https://www.sec.gov/Archives/edgar/data/0001604778/000160477825000030/earningsrelease20250329.htm)
- [Qorvo FY2026 Q2 earnings release — SEC Form 8-K](https://www.sec.gov/Archives/edgar/data/0001604778/000162828025048216/earningsrelease20250927.htm)
- [Qorvo FY2025 Q3 — record defense revenue (Semiconductor Today)](https://www.semiconductor-today.com/news_items/2024/may/qorvo2-210524.shtml)
