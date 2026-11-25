---
type: entity
tags: [leo, china, space, data-center, ai, strategic]
---

# ADA Space (China's Three-Body Computing Constellation)

## Basic Information

Chinese space-computing company (ADA Space / 国星宇航, founded 2018, Chengdu) executing the largest orbital-supercomputing program announced to date. The flagship effort — the **"Three-Body Computing Constellation" (三体计算星座)**, part of the broader **Star-Compute Program** — is a collaboration with **Zhejiang Lab (之江实验室)**, the Hangzhou state research institute backed by the Zhejiang government, Zhejiang University and (historically) Alibaba. The first **12 satellites launched 2025-05-14 from Jiuquan** — described by ADA Space as the world's first *dedicated* orbital-computing constellation.

> **Now publicly listed (2026-11-13).** ADA Space (listed as **Adaspace Technology**) completed **Hong Kong's first "space-AI" IPO**, debuting on the HKEX main board on **2026-11-13 under ticker 6935** after clearing its listing hearing 2026-10-29. It priced at the bottom of its HK$24.90–33.20 range (**HK$24.90**, 30.12M H shares) and raised **≈US$95.6M** (~HK$750M; earlier pre-marketing reporting of a ~$127M raise was superseded by the smaller final book), implying a market value of **≈$1.3B**. Demand was retail-skewed (HK public tranche ~3.43× subscribed, international ~1.79×) and the stock closed its first session **≈3.5% below offer (~HK$24.02)**. The prospectus discloses a still loss-making business — net losses of **RMB139.3M (2023), RMB177.2M (2024), RMB255.9M (2025)**. This materially sharpens the "not merely commercial" read below: the state-directed scale bet now also answers to **public capital markets**, giving the China node of the ODC map a *funded, listed* commercial arm rather than a purely state-backed one. Corroborated across ≥2 independently-named outlets ([Dealroom](https://dealroom.co/news/172501-ada-space-raises-95-6m-in-hong-kong-s-first-space-ai-ipo/), [TechNode Global, 2026-11-13](https://technode.global/2026/11/13/adaspace-raises-96m-hong-kong-ipo/), [The Bamboo Works](https://thebambooworks.com/adaspace-cleared-to-become-hong-kongs-first-ai-satellite-ipo/)); WebFetch proxy-blocked, read via search snippets.

## Constellation Specifications

| Item | Value |
|------|------|
| First launch | **2025-05-14**, 12 satellites (Jiuquan) |
| Combined compute (first 12) | **≈5 POPS** (peta-ops/s); 30 TB onboard storage |
| Optical inter-satellite link | up to **100 Gbps** per satellite |
| On-orbit accelerator | up to **744 TOPS** per satellite (remote-sensing payloads processed onboard) |
| On-orbit AI model | **8-billion-parameter** model resident on each satellite (onboard inference) |
| Target constellation size | **2,800 satellites** |
| Full-network target compute | **≈1,000 POPS** (one quintillion ops/s) |

## In-Orbit Status (2026-11)

The first 12 satellites have been on orbit for roughly **fourteen months** (launched 2025-05-14) and ADA Space / Zhejiang Lab report they have **demonstrated the constellation's core capabilities** (onboard processing, ISL, edge inference) — including a reported demonstration of **tasking robots on Earth from orbit**. The wider Chinese space-compute push was a headline theme at the **2026 Space Computing Industry Conference (April 2026)**, and Beijing is moving to **coordinate/manage** the several competing orbital-compute efforts — i.e. the program is transitioning from first-launch demonstration toward managed scale-up.

Three 2026 developments extend this:

- **Commercial pull-through (2026-06-05 →):** ADA Space signed a **strategic AI cooperation agreement with Tencent**, letting Tencent tap the constellation's on-orbit compute — the first named hyperscale-tier customer for a flying compute constellation, and evidence the "state-directed" read now carries a commercial-demand arm ([china-in-space](https://www.china-in-space.com/p/ada-space-signs-strategic-ai-agreement)). The demand arm has since widened: strategic agreements with the **Shanghai Meteorological Bureau** (in-orbit weather-data processing), **Alibaba Cloud** support, and a **Shanghai Jiao Tong University** technology collaboration.
- **Optical-ISL endurance milestone (announced 2026-07-29):** two constellation satellites held a **continuous laser inter-satellite link for 192 hours 8 minutes 45 seconds (>8 days) at 99.99 % data-transmission availability over separations up to 1,000 km** — the first *multi-day flown* optical-ISL endurance datum from any compute constellation. Because free-space optics is the load-bearing "net compute together" technology ([[concepts/leo-value-chain]] midstream A), this puts China ahead on *demonstrated-in-orbit* optical endurance even though the US holds the *bench* bandwidth ceiling (Google Suncatcher's 1.6 Tbps lab link, [[entities/axiom-space]]/Kepler's 2.5 Gbps flown) — the flown-vs-bench split now tracked on [[synthesis/orbital-data-center-six-region]] (cross-cutting read 2).
- **Scale-up cadence — Group-02 is now FLOWN (2026-10-14):** the **second satellite group ("Group-02", 8 computing satellites)** launched **2026-10-14 from Jiuquan on a LandSpace Zhuque-2E (ZQ-2E Y4)** — the methane-powered private Chinese rocket pitching itself as a dedicated deployer for space-computing constellations — alongside **2 laser data-transmission test satellites from Lanta Intelligence**; the new compute satellites are to link to the existing first group before their expanded compute + laser-ISL capacity is demonstrated. This resolves the prior "no specific second-group date asserted" flag (corroborated across [china-in-space](https://www.china-in-space.com/p/three-body-computing-constellation-316) + [Yicai Global, 2026-10-15](https://www.yicaiglobal.com/news/chinas-landspace-sends-10-new-satellites-into-space)). The **third group remains un-launched but imminent as of 2026-11-25**: mid-November reporting (tied to the IPO) says the group is **"recently completed" and will launch "in the coming weeks."** ⚠️ The *count* now disagrees across sources — the latest report describes it as **"at least five" satellites**, whereas the earlier Q4-2026 plan specified **≈14 satellites (~3,000 kg to a 525 km SSO)**; treat the exact size as unresolved pending the launch. The standing owner re-check "does the 3rd group fly before end-Q4-2026" is therefore **still open but firmer** (group built, vehicle/window narrowing to "coming weeks"), not yet resolved. Milestone unchanged: a **~100-satellite constellation by 2027**, toward the revised staging below.

The revised deployment staging is now **~1,000 satellites by 2030 → 2,800 by ~2035** (previously stated as "2,800 planned" without a clear year). This keeps China in the **"leads on deployed scale"** seat of the six-region map ([[synthesis/orbital-data-center-six-region]]): it remains the only actor with a *dedicated compute constellation already operating in orbit*, now with a named commercial customer and a concrete H2-2026 scale-up. Sources: [china-in-space](https://www.china-in-space.com/p/ada-space-eyes-launching-2800-ai), [SpaceNews (2025-05)](https://spacenews.com/china-launches-first-of-2800-satellites-for-ai-space-computing-constellation/), [Live Science](https://www.livescience.com/technology/computing/china-is-building-a-constellation-of-ai-supercomputers-in-space-and-just-launched-the-first-pieces) (all accessed 2026-07-15).

## Strategic Positioning

ADA Space's scale far exceeds any existing or planned commercial ODC program. Its nature is **not merely a commercial project** — yet with the **2026-11-13 HKEX listing** (above) it is now also a publicly-traded one, so the better frame is *state-aligned-and-market-funded*: a strategic positioning move by China in the following three converging domains, now financed partly by Hong Kong public capital:
1. AI computing (orbital edge inference)
2. Sensing (Earth observation + intelligence)
3. Communications (inter-satellite optical links)

## Competitive Implications

- Spectrum and orbital resource competition: 500–1200 km high-value commercial orbital inclinations and Ku/Ka/V bands are already approaching exhaustion (ITU 2025–2026 memos)
- A 2,800-satellite constellation means ADA Space alone could fill certain orbital inclination bands

## Why It Matters (six-region context)

ADA Space is the reason the ODC race is not a US-only story. In the six-region map ([[synthesis/orbital-data-center-six-region]]), China **leads on deployed scale** — it is the only actor with a *dedicated compute constellation already in orbit*, where the US leads on *capability per node* ([[entities/starcloud]] H100, [[entities/google-suncatcher]] TPU) and Europe is still at study stage (ASCEND). The state-directed model means orbital-slot and spectrum pre-emption ([[concepts/leo-value-chain]] midstream B) is a strategic, not commercial, calculation — a 2,800-satellite footprint can itself foreclose contested 500–1200 km inclinations and Ku/Ka/V bands.

> **Verification note (2026-06-03):** partner corrected to **Zhejiang Lab (之江实验室)**; program names ("Three-Body Computing Constellation" / Star-Compute) and the 12-sat / 5-POPS-initial / 2,800-sat / 1,000-POPS-target figures confirmed against [SpaceNews (2025-05)](https://spacenews.com/china-launches-first-of-2800-satellites-for-ai-space-computing-constellation/) and Live Science. Per-satellite 744-TOPS figure retained from the original LEO industry analysis source.

## Related Concepts

- [[concepts/orbital-data-center]]
- [[concepts/leo-value-chain]]

## Related Entities

- [[entities/starcloud]], [[entities/google-suncatcher]], [[entities/axiom-space]], [[entities/hanwha-aerospace]]

## Related Synthesis

- [[synthesis/orbital-data-center-six-region]]
- [[synthesis/leo-taiwan-odc-gap]]

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]
