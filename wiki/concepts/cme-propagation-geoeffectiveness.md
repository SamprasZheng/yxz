---
type: concept
tags: [space-weather, cme, geoeffectiveness, solar-wind, bz, wsa-enlil, forecasting, leo-operations, mechanism]
---

# CME Propagation and Geoeffectiveness — the Sun-to-Earth Causal Chain

This is the **mechanism ("layer-down") page** for the space-weather cluster: the causal chain that turns a solar eruption into the operational indices an LEO agent consumes ([[concepts/space-weather-operational-indices]]) via the feeds it polls ([[concepts/swpc-space-weather-feeds]]). The index and feed pages tell you *what to read and when to act*; this page tells you *why a coronal mass ejection three days ago produces the Kp spike today*, and — critically — *why the "how bad" is far harder to forecast than the "when."* It sits beneath [[synthesis/space-weather-forecasting-six-region]] (the who-forecasts-it map) and [[concepts/solar-cycle-25-leo-radiation]] (the SC25 storm chain these mechanisms drove).

## The three-arrival structure of a solar eruption

A single flare/CME event does **not** arrive as one signal. It splits into three physically distinct fronts with three different travel times — which is why the domain's warning lead time is *layered*, not single-valued:

| Front | Physics | Travel time Sun→Earth | Index it drives | Lead time it gives |
|---|---|---|---|---|
| **Electromagnetic (X-ray/EUV)** | photons at *c* | **~8.3 min** (light-speed) | R-scale (radio blackout), prompt EUV drag heating | **≈0** — the flash and the effect are simultaneous |
| **Solar Energetic Particles (SEPs)** | relativistic protons/ions, field-guided | **~10 min – few hours** | S-scale (proton flux), SEU/SEL threat | minutes to ~1 hr (protons outrun their own CME) |
| **CME bulk plasma + shock** | magnetized plasma cloud, ~300–3000 km/s | **~1–4 days** (speed-dependent) | Kp/Ap/Dst geomagnetic storm, thermospheric drag | **1–4 days** (the only *actionable* warning window) |

**The load-bearing consequence:** only the CME gives usable warning. The R-scale radio blackout and the first SEUs are effectively **un-forecastable in real time** — the X-rays that cause them arrive at the same instant as the light announcing the flare. This is the physics-capped lead time the whole forecasting domain is built around (see the "warning is capped by physics" argument in [[synthesis/space-weather-forecasting-six-region]]).

## Anatomy of an arriving CME (why the storm has structure)

An Earth-directed CME hits as a **layered structure**, and each layer can drive geomagnetic activity differently:

1. **Shock front** — the leading fast-mode shock; sudden storm commencement (SSC), a step jump in solar-wind dynamic pressure and Dst.
2. **Sheath** — turbulent, compressed, heated ambient plasma swept up ahead of the ejecta. Fields here are *draped and disordered*; a sheath with a chance southward excursion can be strongly geoeffective, and sheath structure is notoriously hard to predict ([Kilpua et al.](https://arxiv.org/pdf/2011.06632)).
3. **Ejecta / magnetic cloud (MC)** — the CME's own flux rope: smooth, rotating magnetic field, low plasma β, low temperature. If the rope's rotation carries a **sustained southward Bz**, this is the classic driver of the main storm phase.

The operational point: a storm's severity depends on *which layer* carries the southward field and *for how long* — information the standard arrival-time models do not carry (below).

## Geoeffectiveness — the four drivers

Whether a CME produces a G1 ripple or a G5 superstorm is governed by four in-situ quantities measured at [[entities/noaa-swpc|L1]] ~30–60 min before impact:

1. **Southward Bz (the master switch).** Dayside magnetic reconnection requires the interplanetary field to oppose Earth's northward dayside field. **No sustained Bz < 0, no major storm** — a Kp 9 event requires Bz roughly < −15 nT held for hours ([[concepts/space-weather-operational-indices]]). A fast CME that arrives *northward* is nearly harmless.
2. **Speed** — sets the dynamic pressure and the dawn-dusk convection electric field (VBz). Fast (>1000 km/s) transit compresses the magnetosphere and amplifies coupling.
3. **Duration** — how long southward Bz is sustained sets the ring-current injection (the Dst nadir). This is why **complex ejecta** (below) are dangerous: they extend the southward-field window.
4. **Dynamic pressure / density** — deepens the ring current and can push the magnetopause inside geosynchronous orbit, exposing GEO satellites to raw solar wind.

The **Newell/Borovsky coupling functions** formalize this (dΦ/dt ∝ v^(4/3) B_T^(2/3) sin^(8/3)(θ/2), where θ is the IMF clock angle) — but every term except the pre-arrival speed estimate is unknown until the CME is ~30 min out.

## The forecast asymmetry: we predict *when* far better than *how bad*

The operational workhorse is **WSA-Enlil + Cone** (the model behind SWPC's `enlil_time_series.json`, [[concepts/swpc-space-weather-feeds]]). Its verified skill:

- **Arrival-time MAE ≈ 10.4 ± 1.5 h** over 2010–2016 real-time runs at the CCMC, with a slight *early* bias (~−4 h) ([Wold et al. 2018, *J. Space Weather Space Clim.*](https://www.swsc-journal.org/articles/swsc/full_html/2018/01/swsc170034/swsc170034.html)); a larger 2024 re-analysis of 1702 predictions puts MAE ≈ **13.2 h** (bias −2.5 h, σ 17.4 h) ([Kay & Palmerio 2024, *Space Weather*](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2024SW003951)).
- **But the Cone CME is inserted as a *non-magnetized* hydrodynamic blob** — so Enlil predicts arrival time and speed, and **cannot predict the internal Bz**, i.e. the master switch of geoeffectiveness.

So the standing operational reality: SWPC can tell you a CME arrives *around 30 July ± ~12 h*, but whether it lands G1 or G3 is only known from the L1 monitor ~30–60 min before impact. This asymmetry — **skillful timing, poor severity** — is why the L1 vantage ([[entities/noaa-swpc|SOLAR-1/SWFO-L1]], operational 2026-06-10) is irreplaceable: it is the *only* instrument that reads the Bz before the storm, and no upstream model substitutes for it.

## Complex ejecta / "cannibal CMEs" — the forecast-buster

When a **faster CME launched later overtakes a slower one still in transit**, the two merge into **complex ejecta** (also *compound streams*). The merged structure carries **more cumulative magnetic energy than either CME alone**, tends to have **long duration**, and can hold the magnetosphere in a driven state for an extended period ([Lugaz et al. 2015, "A New Class of Complex Ejecta"](https://arxiv.org/pdf/1402.1075)). Popularly ("cannibal CME"), it is the scenario that most often makes a storm **exceed its pre-arrival G-scale forecast**, because:

- the pre-merger Cone models each CME separately and does not resolve the CME-CME interaction;
- compression at the collision interface can amplify and re-orient the field, producing an unexpectedly strong/sustained southward Bz;
- the extended southward window deepens the ring current beyond a single-CME expectation.

SC25's declining phase produced two textbook cases inside two months, both driven by multi-active-region eruption clusters:

- **2026-06-09 — G3** from a cannibal-CME merger; aurora reached France and New Zealand.
- **2026-07-29 → 08-01 — forecast "up to G3 (Strong)", *observed only G1–G2*** ([SWPC watch, 2026-07-27](https://www.spaceweather.gov/news/geomagnetic-storm-watches-effect-29-31-july-g3-strong); [extended into 1 Aug](https://www.spaceweather.gov/news/geomagnetic-storm-watches-now-continue-1-august)): multiple CMEs from 27–28 July plus an M1.9/filament CME (N20W67, partial halo) on 30 July, WSA-Enlil projecting **G2–G3 most likely on 30 July** as successive ejecta merged. But the realized storm **under-performed the forecast by ~2 levels** (G1–G2, not G3), with an S1 radiation storm on 30 July. This is the **flip side** of the 3–4 July case, which *over*-performed (G2 forecast → G3 observed). Both folded into the storm chain in [[concepts/solar-cycle-25-leo-radiation]].

**The asymmetry cuts both ways — three 2026 cases make the point:**

| Date | Pre-arrival forecast | Observed | Why the miss |
|---|---|---|---|
| 2026-07-03/04 | ~G2 | **G3** (Kp 7.33) | southward Bz stronger/longer than the non-magnetized Cone model could carry |
| 2026-07-29→08-01 | **up to G3** | G1–G2 | merged ejecta arrived with weaker/less-sustained southward Bz than the "worst-case" watch assumed |
| 2026-02-01/04 | large flare (X8.1) → CME | **G1** (Kp 5) | the CME merely *glanced* Earth — geometry, not field strength, capped the storm |

The lesson the Enlil-Cone limitation guarantees (below): forecasters can be wrong in **either** direction on severity, because the two variables that decide it — the internal **Bz** and the **impact geometry** — are both invisible until the cloud is ~30–60 min from L1. The 2026-02-01 X8.1 case is the sharpest reminder that **flare magnitude and storm magnitude are decoupled**: the cycle's 3rd-strongest flare (R3 radio blackout) produced only a minor G1 storm, because its ejecta was aimed to graze rather than hit ([SWPC](https://www.spaceweather.gov/news/update-x81-strong-flare-region-4366)).

## 拉長時間軸 — why this mechanism is a permanent operational constraint

The Sun-to-Earth causal chain is set by fixed physics, so its constraints are **century-scale invariants**, not SC25 quirks:

- **The lead-time ceiling never moves.** Flare X-rays and prompt SEPs will always arrive at ≈light-speed; the CME will always take ~1–4 days. Forecast *skill* on timing improves with better models and denser L1/L5 coverage, but the *actionable* window stays ~1–4 days and the R/S-scale window stays ~0 — forever.
- **Severity forecasting stays L1-bound until a physics breakthrough.** Predicting internal CME Bz from *remote* (coronagraph) data — before the cloud reaches L1 — is the single highest-value unsolved problem in the field. Until it is solved, every nation's forecast severity is only as good as its share of the shared L1/L5 vantage (the cross-national architecture argued in [[synthesis/space-weather-forecasting-six-region]]).
- **Complex ejecta scale with activity, not with the cycle phase.** Any epoch with clustered active regions (including deep in a declining phase, as 2026 shows) can produce cannibal-CME over-performances — so the operational posture in [[concepts/swpc-space-weather-feeds]] is a *standing* requirement, not a solar-max-only one.

## Related pages

- [[concepts/space-weather-operational-indices]] — the indices (Kp/Dst/Bz/S/R) this chain drives, with the storm timeline
- [[concepts/swpc-space-weather-feeds]] — the feeds (incl. `enlil_time_series.json`) that deliver the forecast + L1 in-situ read
- [[concepts/solar-cycle-25-leo-radiation]] — the SC25 declining-phase storm chain these mechanisms produced
- [[entities/noaa-swpc]] — the L1 fleet (SOLAR-1/SWFO-L1) and WSA-Enlil model owner
- [[concepts/cdm-conjunction-data-message]] — CDM Pc degrades exactly during the storms this chain produces (drag + bulk manoeuvring)
- [[synthesis/space-weather-forecasting-six-region]] — who runs the forecast centers and why the L1/L5 vantage is cross-national
- [[sources/noaa-swpc-product-catalog]] — the verified feed catalog including the ENLIL products
