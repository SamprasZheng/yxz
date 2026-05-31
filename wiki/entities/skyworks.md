---
type: entity
tags: [rf, semis, mobile, handset, wifi, cellular, apple, fem, 5g, iot, auto, broad-markets, 6g, nasdaq, us]
---

# Skyworks Solutions, Inc. (NASDAQ: SWKS)

US RF semiconductor company headquartered in Irvine, CA. Founded in its current form through the 2002 merger of Alpha Industries and Conexant's wireless division. Skyworks designs and markets analog and mixed-signal semiconductors enabling wireless connectivity, with cellular handset RF front-end as its largest business and a diversified "Broad Markets" segment spanning IoT, automotive, aerospace, data center clocking, and industrial applications.

**Fiscal year 2025 (ended October 3, 2025) total revenue: $4.09 billion.** Market-cap range approximately $12–15B pre-merger announcement.

**Pending merger:** On October 28, 2025, Skyworks announced a definitive agreement to acquire a Qorvo subsidiary and combine the two companies in a transaction valuing the combined enterprise at approximately **$22 billion**. Skyworks shareholders own ~63% of the combined entity post-close. Phil Brace (Skyworks CEO) leads the combined company. Combined pro forma annual revenue ~$7.7B; >$500M annual cost synergies targeted within three years. See [[entities/qorvo]] for structural deal terms.

---

## Business Segments

Skyworks reports two segments:

| Segment | FY2025 Revenue (approx.) | Character |
|---|---|---|
| **Mobile** | ~$1.5B | Cellular handset RF FEM/PAMiD for smartphones; Apple-heavy |
| **Broad Markets** | ~$2.6B | IoT, automotive (5G telematics), defense/aerospace, edge AI, data center timing, industrial |

**Note on mix shift:** Broad Markets became the majority revenue segment (>60%) in FY2025. This represents a sustained diversification from the company's historical profile as a near-pure-play handset RFFE supplier.

---

## Mobile Segment — Apple Concentration

### Apple dependency

Skyworks has the most concentrated single-customer exposure in the semiconductor sector. Selected confirmed data points:

- In Skyworks' fiscal Q1 2025, **Apple represented 72%** of total company revenue (CONFIRMED from SEC 8-K disclosures and Motley Fool analysis).
- In each of fiscal years ended October 2025, September 2024, and September 2023, Apple constituted more than 10% of net revenue (a standard SEC disclosure threshold; in practice it was far higher — approximately 50–60% on a full-year blended basis as Mobile segment proportion fell).
- The three largest accounts receivable balances comprised 82% of gross A/R as of October 3, 2025, reflecting the concentration across a small number of customers.

### What Skyworks supplies to Apple

Inside the iPhone, Skyworks historically has supplied **SkyOne** (a multi-band PA/FEM module that integrates PA + LNA + switch for the lower sub-6 GHz bands) and sky-branded cellular RFFE content across mid and high sub-6 GHz bands. Apple's iPhone RF front-end is a multi-vendor platform; Qorvo, Murata (filters), and Broadcom (Wi-Fi) also have content. Apple has long been rumored to be developing some in-house RFFE IP — if Apple were to vertically integrate a larger fraction of its own RF front-end, Skyworks would be the most exposed supplier.

### Android and the structural maturity debate

Unlike Qorvo, Skyworks does not heavily emphasize Android FEM revenue in its segment reporting. The Mobile segment's dependency on Apple is the defining risk factor. The bull debate for the Mobile segment is: iPhone units are relatively inelastic (Apple's installed base is sticky, ASP is rising), and each new iPhone adds RF complexity (more 5G bands, sub-6 carrier aggregation, potentially early FR3 content). The bear debate is: Apple is incentivised to reduce RFFE supplier dependency over time, and Chinese Android OEM volume is not a natural Skyworks share opportunity.

---

## Broad Markets Segment — The Diversification Story

The Broad Markets platform ($2.6B per FY2025 management commentary) encompasses:

- **IoT/edge connectivity** — Wi-Fi, Zigbee, Matter, Thread; indoor and outdoor wireless for smart-home and industrial devices.
- **Automotive** — 5G telematics and in-vehicle infotainment FEMs for global OEMs including BYD, Ford, Geely, and Nissan (all confirmed FY2025 design wins per earnings commentary). Automotive is a multi-year content ramp with long design cycles.
- **Defense and aerospace** — precision RF components for satellite communications, radar, and electronic warfare; aerospace-grade packaging.
- **Data center clocking** — Skyworks unveiled what it described as the industry's first single-chip ultra-low-jitter clock device supporting simultaneous Ethernet and PCIe outputs for AI data center fabric; this positions Skyworks for the 800G/1.6T Ethernet density cycle.
- **Industrial** — power conditioning, RF signal chain components.

Growth cadence: Broad Markets grew mid-to-high-single-digits year-over-year in the first outlook period of FY2025. The segment is less cyclical than Mobile but also less capital-intensive; margins in some sub-segments (automotive, defense) are higher than handset FEM.

---

## 6G RF Front-End Work — MediaTek Co-demonstration (MWC 2026)

At Mobile World Congress 2026 (Barcelona, March 2–5, 2026), Skyworks and [[entities/mediatek]] jointly demonstrated early 6G RF front-end innovations at MediaTek's Hall 3 stand:

**Products demonstrated:**
- **SKYR60002** — A 6G FR3 LNA and PA module with integrated filters, designed for the 6.425 GHz to >7 GHz FR3 band defined in the latest 3GPP standard. The module provides high linearity, wide bandwidth, and robust thermal performance to meet 3GPP FR3 requirements. Engineering samples available to early-access partners aligned with MediaTek's chipset evaluation schedule.
- **SKY58287-11** — A high-efficiency Ultra High Band (UHB) PC1 (Power Class 1) RF front-end module optimized for MediaTek platforms. Addresses cell-edge coverage extension for 5G/6G network operators. Uses packaging technology that reduces thermal resistance, eliminating the need for an external heat sink and simplifying high-power fixed-wireless system design.

**Technical context on FR3 and PC1:**
- FR3 (7–24 GHz in 3GPP R19+ terminology, though the demonstrated band is 6.425–7 GHz per the latest WRC-23/3GPP spectrum) is the key 6G spectrum focus band: wide available spectrum, better than FR2/mmWave propagation, high-frequency enough for massive spatial reuse.
- PC1 (Power Class 1) means the highest UE transmit power class — 26 dBm conducted — for extended coverage scenarios in sub-6 and UHB bands.
- Integrated filter modules like SKYR60002 are the natural evolution from standalone FEM + separate BAW filter toward iFEM architecture, matching the Wi-Fi 7 trend described in [[concepts/rf-front-end-module]].

**Strategic significance:** This collaboration is notable because it signals Skyworks is investing in next-generation platform-level RF co-development with a leading modem partner. For a stock heavily discounted on Apple concentration concerns, a credible 6G roadmap with MediaTek broadens the TAM narrative.

---

## The Public Valuation Debate (Neutral Summary)

Skyworks trades at a structurally depressed multiple relative to the broader semiconductor sector. The public debate, stated neutrally:

**Bear arguments:**
1. **Single-customer risk** — ~70%+ of revenue from Apple in peak iPhones quarters; any material Apple RFFE in-sourcing would be a significant revenue event.
2. **Handset cyclicality** — smartphone units fluctuate with macro; content growth is the offset but depends on Apple's RF architecture choices each generation.
3. **Commodity pressure** — Android RFFE is increasingly competitive with Chinese domestic suppliers; Skyworks' Android exposure is smaller than Qorvo's but not zero.
4. **Merger execution risk** — integrating Qorvo at $22B enterprise value introduces integration complexity and leverage risk.

**Bull arguments:**
1. **Broad Markets scale** — $2.6B in Broad Markets with growing automotive, defense, and data-center timing content provides a portfolio floor below Mobile cyclicality.
2. **Wi-Fi 7 and 6G content tailwind** — as each generation adds RF complexity (FR3, UHB PC1, iFEM), per-phone ASP rises; see [[concepts/rf-front-end-module]].
3. **Apple sticky relationship** — Apple has sourced Skyworks RF content across multiple iPhone generations; switching an RFFE supplier mid-platform is technically disruptive.
4. **Merger synergies** — $500M+ annual cost synergies and combined $7.7B revenue at Qorvo+SWKS combined creates a US-based RFFE champion that can negotiate more effectively with Apple and invest more in R&D.

No recommendation is expressed here. These represent the publicly stated bull/bear frameworks.

---

## Cross-links

- RF front-end technology foundation: [[concepts/rf-front-end-module]]
- Pending merger counterpart: [[entities/qorvo]]
- MediaTek 6G co-demonstration: [[entities/mediatek]]
- GaAs foundry context: [[entities/win-semiconductors]]
- Defense / phased-array RF (adjacency): [[synthesis/phased-array-rf-frontend-supply-chain]]

## Sources

- [Skyworks FY2025 Q4 earnings release — SEC Form 8-K (Nov 2025)](https://www.sec.gov/Archives/edgar/data/0000004127/000110465925102814/tm2529602d1_ex99-1.htm)
- [Skyworks + Qorvo merger announcement (Oct 28, 2025) — Qorvo press release](https://www.qorvo.com/newsroom/news/2025/skyworks-and-qorvo-to-combine-to-create-22-billion-us-based-leader)
- [Skyworks + MediaTek 6G FR3 + PC1 MWC 2026 — GlobeNewswire](https://www.globenewswire.com/news-release/2026/03/02/3247048/0/en/Skyworks-and-MediaTek-Showcase-Early-6G-FR3-and-PC1-RF-Front-End-Innovations-at-MWC-2026.html)
- [Skyworks + MediaTek 6G MWC 2026 — Microwave Journal](https://www.microwavejournal.com/articles/45433-skyworks-and-mediatek-showcase-early-6g-fr3-and-pc1-rf-front-end-innovations-at-mwc-2026)
- [Skyworks + MediaTek 6G — Semiconductor Today (2026-03-09)](https://www.semiconductor-today.com/news_items/2026/mar/skyworks-mediatek-090326.shtml)
- [Skyworks Broad Markets FY2025 — Semiconductor Today (2025-02-25)](https://www.semiconductor-today.com/news_items/2025/feb/skyworks-250225.shtml)
- [Skyworks Apple dependency analysis — Motley Fool (historical baseline; updated with FY2025 SEC data)](https://www.fool.com/investing/2019/04/06/heres-how-much-skyworks-depends-on-apple.aspx)
- [Skyworks Form 10-K FY2025 — SEC EDGAR (Nov 2025)](https://investors.skyworksinc.com/static-files/58b91ff0-62ab-46df-9f2b-576b02f06914)
- [Electronics Weekly — MWC Skyworks/MediaTek 6G front-end PA (2026-03)](https://www.electronicsweekly.com/news/business/mwc-skyworks-and-mediatek-show-front-end-pa-for-6g-2026-03/)
