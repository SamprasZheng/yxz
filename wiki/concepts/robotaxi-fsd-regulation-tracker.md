---
type: concept
tags: [us-equities, leading-indicator, trader-agent, autonomous-vehicles, regulation]
---

# FSD / Robotaxi 法規追蹤器 (FSD / Robotaxi Regulation Tracker)

## What It Is / Why It Leads

The FSD/Robotaxi regulation tracker monitors the regulatory permit ladder that unlocks commercial autonomous vehicle (AV) service — the administrative precondition for the sector to re-rate. Unlike quarterly earnings or macro-economic series, this indicator is **event-driven**: each new permit issuance, NHTSA enforcement action, or state-level legislative change is a discrete, low-frequency event that can shift forward earnings estimates for multiple companies simultaneously.

The signal leads because stock re-ratings happen when investors update the probability distribution over commercialization timelines, and those timelines are bounded by regulation, not technology alone. A company can demonstrate driverless competence in a geofenced pilot and still be worth very little commercially without a paid-fare permit. The three-gate test below defines exactly when re-rating probability becomes high. This indicator sits in the [[synthesis/ai-quant-trading-architecture-improvements]] trader-agent as an event-type feature fed by regulatory document parsing.

## What to Watch (Sub-metrics)

| Sub-metric | Source | Cadence |
|---|---|---|
| California DMV: new driverless testing permits, deployment permits issued | CA DMV AV permit holders page | Event-driven; CA DMV publishes updates on permit-holders list |
| CPUC: new drivered / driverless deployment permits for paid passenger service | CPUC AV programs page | Event-driven |
| NHTSA SGO crash data: ADS and L2 ADAS incidents | NHTSA SGO crash reporting portal | Monthly CSV release |
| NHTSA enforcement orders, recalls on ADS/L2 systems | NHTSA press releases; Federal Register | Event-driven |
| State AV legislation (non-CA): TX, AZ, FL deployment statutes | State legislative trackers | Periodic |
| Tesla FSD "unsupervised" mode approvals and robotaxi expansion cities | Tesla 8-K; state DMV filings | Event-driven |
| Waymo geofence expansion decisions (new cities, county boundary changes) | Waymo blog; CPUC advice letters | Event-driven |
| UBER/LYFT platform licensing for autonomous miles | Company 10-Q; state TNC filings | Quarterly |

## Update Cadence

Event-driven. No fixed calendar. The trader agent should parse CPUC dockets and CA DMV permit-holder page changes. NHTSA SGO data publishes monthly CSV updates at [nhtsa.gov/laws-regulations/standing-general-order-crash-reporting](https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting).

## The CA Permit Ladder (Authoritative Framework)

California operates a two-authority, sequential permit system. Understanding each rung is essential to interpreting any permit news.

### California DMV — Vehicle Testing and Deployment Permits

The California DMV administers AV permits under California Vehicle Code. As of November 2025: **30 companies hold drivered testing permits**, **6 companies hold driverless testing permits**, **3 companies hold deployment permits**.

| Permit Tier | DMV Name | What It Allows | Mileage Threshold |
|---|---|---|---|
| 1 | Testing with a Safety Driver | AV with human operator available to intervene; data collection only | N/A to start |
| 2 | Driverless Testing Permit | Test without safety driver; no commercial passengers; no fares | 50,000 miles with Tier 1 first (10,000 for low-speed) |
| 3 | Autonomous Vehicle Deployment Permit | Deploy AV commercially; prerequisite for CPUC paid-fare authority | Additional 50,000 miles with Tier 2 (10,000 for low-speed); 250,000 miles for heavy-duty trucks |

Source: [dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/](https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/) and updated CA AV regulations (2025 amendments authorizing heavy-duty trucks and transit).

### CPUC — Paid Passenger Service Authority

A separate California Public Utilities Commission authorization is required for **fare collection**. The DMV deployment permit alone does not authorize charging passengers. The CPUC operates two parallel programs:

| CPUC Permit | Name | Distinguishing Feature |
|---|---|---|
| Drivered Deployment | Drivered Autonomous Vehicle Deployment | Paid passenger service with safety driver present |
| Driverless Deployment | Driverless Autonomous Vehicle Deployment | Paid passenger service, no in-vehicle operator; requires remote-operator communication link at all times |

**Waymo** holds a Phase I Driverless AV Deployment Permit from CPUC (approved August 10, 2023), authorizing paid driverless rides in San Francisco and parts of San Mateo County. Waymo has revised its CPUC Passenger Safety Plan to reflect 2025 expansion. The permit issuance survived a legal challenge in 2025 (CPUC did not abuse discretion ruling by California Court of Appeal).

**Cruise** held a similar permit but operations were suspended following its October 2023 incident; permit status is under regulatory review.

Source: [cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/autonomous-vehicle-programs](https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/autonomous-vehicle-programs)

### NHTSA Standing General Order (SGO) on Crash Reporting

NHTSA's Standing General Order 2021-01 (as third-amended April 2025, effective June 16, 2025) requires manufacturers and operators to report crashes involving:
- **ADS vehicles**: crash on a public US road, ADS engaged within 30 seconds prior, resulting in property damage, injury, or worse
- **Level 2 ADAS vehicles**: crash on a public US road, L2 system engaged within 30 seconds prior, resulting in fatality, airbag deployment, hospital transport, or vulnerable road user strike

Reports must be submitted within 5 days (ADS) or 5 days (L2). NHTSA publishes monthly CSV updates. The 2025 amendment streamlined reporting to reduce duplicate filings.

Data portal: [nhtsa.gov/laws-regulations/standing-general-order-crash-reporting](https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting) — "SGO Crash Reporting" section. See [[sources/nhtsa-sgo-crash-reporting]].

## The Three-Gate Re-Rating Trigger

The precise re-rating event is when **all three gates are simultaneously true** for a given company in a given market. A company with only one or two gates achieves limited re-rating because the commercial earnings potential is still blocked.

| Gate | Definition | Status as of Mid-2026 |
|---|---|---|
| Gate 1: No safety driver (無安全員) | The vehicle operates without a human operator in the car or a backup monitoring requirement | Waymo: YES in SF, LA, Phoenix, Austin, Atlanta, Miami — all driverless. Tesla: NOT YET commercially (safety rider present in Austin; internal driverless tests not open to customers) |
| Gate 2: Paid commercial (可收費) | Fares can be collected from the public | Waymo: YES (CPUC Driverless Deployment Permit since Aug 2023, now ~10 US cities). Tesla: NOT YET paid commercial to public without rider |
| Gate 3: Geofence expansion (可擴區) | The company has demonstrated regulatory and operational capacity to expand beyond a single pilot geofence | Waymo: YES — demonstrated 10 cities by mid-2025; targeting 20+ cities by end-2026, including London. Tesla Austin: limited downtown geofence, still restricted hours (06:00–midnight) |

**Verdict (mid-2026)**: Only **Waymo/GOOGL** fully satisfies all three gates at commercial scale. Tesla's Austin launch is still gated at 2 (no fare collection from public) and partially at 3 (restricted geofence). All other companies are at Tier 1–2 on the DMV ladder in California.

## Interpretation Table: Which Gate Favors Which Names

| Company | Gate Status | Investor Read |
|---|---|---|
| GOOGL (Waymo) | All three gates satisfied; ~500K rides/week as of Mar 2026 | Re-rating is already occurring; incremental trigger = new city permit + 1M rides/week target by end-2026; margin/unit-economics disclosure |
| TSLA | Gate 1 partial (testing), Gate 2 not yet, Gate 3 restricted | Re-rating event = FSD unsupervised commercial approval + fare rollout + multi-city expansion; still a probability-weighted, not confirmed, event |
| AMZN (Zoox) | Testing phase in Las Vegas/San Francisco; no paid service | Catalyst = CPUC driverless deployment permit for Zoox's purpose-built capsule; watch DMV driverless testing permit progress |
| MBLY (Mobileye) | Sensors/software supplier, not operator; Moove deployment partnership in Dubai | Re-rating tied to OEM partners reaching Gate 2+3 in major markets; different mechanism from operator names |
| UBER / LYFT | Platform beneficiaries; partnered with Waymo (UBER), Alphabet (LYFT) | Benefit arrives when autonomous miles grow as percentage of ride volume, compressing cost per mile without needing own fleet. UBER's Waymo partnership in Austin is live. Gate dependency is on their AV partners |

## Concrete Data Points (2025–2026)

- **Waymo rides**: Crossed 250,000 paid weekly rides on April 24, 2025 (4 cities). Reached 500,000 weekly rides by ~February 2026 across 10 cities. March 2026: average weekly paid trips ~500,000, a 10× increase vs May 2024 (50,000/week). Target 1 million rides/week by end-2026.
- **Waymo fleet**: ~2,500 robotaxis in US as of late 2025.
- **Waymo expansion**: 10 US cities operational by mid-2025 (Phoenix, SF, LA, Austin, Atlanta, Miami, Dallas, Houston, San Antonio, Orlando). Targeting 20+ cities by end-2026 including Nashville, Denver, Las Vegas, San Diego, DC, London. New York City expansion was pulled (regulatory friction with NYC TLC), demonstrating that permit risk remains real.
- **Tesla Austin robotaxi**: Launched June 22, 2025 (limited capacity, safety rider in passenger seat, downtown Austin only, 06:00–midnight window, ~31 active vehicles by December 2025). Driverless internal testing ongoing but not open to paying customers as of mid-2026. Musk stated monitors could be removed by Q4 2025 / Q1 2026 — not confirmed commercially.
- **CA DMV permit holders (Nov 2025)**: 30 drivered testing, 6 driverless testing, 3 deployment permits.
- **NHTSA SGO**: Third amendment effective June 16, 2025; CSV data covers June 16, 2025 – April 15, 2026 (public dataset). Monthly updates.

## Risk Factors (Non-Re-Rating Events)

- **Incident-driven rollback**: A high-profile ADS crash can trigger suspension of CPUC drivered/driverless deployment permits (Cruise precedent, Oct 2023). NHTSA SGO data is the early-warning system.
- **Legislative restriction**: NYC's refusal to grant Waymo TNC permits shows that regulatory approval is city-by-city and is not guaranteed to follow CA's lead.
- **NHTSA federal rulemaking**: The Trump administration's AV regulatory framework (2025) is broadly permissive (removing FMVSS barriers for non-standard vehicle designs) but does not preempt state permit authority. Accelerated federal NHTSA exemptions for Zoox/Waymo could be a positive catalyst.

## Representative Tickers (Sector Proxies, Not Holdings)

| Ticker | Role | Key Gate Dependency |
|---|---|---|
| TSLA | Operator + software licensor | FSD unsupervised commercial approval + fare collection |
| GOOGL | Operator via Waymo subsidiary | Already beyond all three gates; marginal catalyst = scale economics disclosure |
| AMZN | Operator via Zoox (purpose-built) | CPUC driverless deployment permit |
| UBER | Platform beneficiary | Partner AV fleet as % of total rides |
| LYFT | Platform beneficiary | Partner AV fleet (Alphabet partnership) |
| MBLY | Perception tech supplier to OEMs | OEM AV deployment at scale; different valuation mechanism |

## Canonical Data Sources

- California DMV AV Program: [dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/](https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/) — see [[sources/ca-dmv-autonomous-vehicle-program]]
- CPUC AV Programs: [cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/autonomous-vehicle-programs](https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/autonomous-vehicle-programs)
- NHTSA SGO Crash Reporting: [nhtsa.gov/laws-regulations/standing-general-order-crash-reporting](https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting) — see [[sources/nhtsa-sgo-crash-reporting]]
- Waymo blog (primary): [waymo.com/blog](https://waymo.com/blog)

## See Also

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[synthesis/ai-quant-trading-architecture-improvements]] — Trader-agent umbrella; this indicator feeds event-driven signal layer
- [[synthesis/ai-quant-trading-oss-stack-selection]] — OSS data stack for parsing regulatory events
- [[concepts/glp1-consumer-spillover-indicator]] — Sister indicator in the same secular demand/autonomy cluster
- [[concepts/event-driven-quant-architecture]] — Pub/sub architecture that processes this type of low-frequency event
- [[concepts/llm-as-feature-engineer]] — Pattern for converting regulatory text into a structured quant feature
- [[sources/ca-dmv-autonomous-vehicle-program]] — CA DMV AV permit framework source page
- [[sources/nhtsa-sgo-crash-reporting]] — NHTSA SGO source page
