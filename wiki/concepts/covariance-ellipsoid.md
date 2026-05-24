---
type: concept
tags: [conjunction, cdm, pc, ssa, space-debris, mission-desk, firefly, astrodynamics]
---

# Covariance Ellipsoid

The covariance ellipsoid is the 3-D (or 6-D) representation of uncertainty in a space object's state (position + velocity) derived from orbit determination. In conjunction assessment, the covariances of the primary and secondary objects are combined and projected onto the encounter plane to form the 2-D probability density function that feeds the [[concepts/pc-probability-of-collision|Pc]] integral.

## Structure in the CDM

CCSDS 508.0-B-1 requires the covariance be reported as a **6×6 lower-triangular matrix in RTN (Radial, Transverse, Normal) or UVW coordinates** at TCA. The CDM carries 21 independent elements (lower triangle of the symmetric matrix):

```
CR_R         (radial-radial position variance)
CT_R CT_T    (transverse terms)
CN_R CN_T CN_N
CRDOT_R ... (position-velocity cross terms)
CTDOT_R ... 
CNDOT_R ...
CRDOT_RDOT CTDOT_TDOT CNDOT_NDOT  (velocity variances)
```

All 21 elements in the 6×6 position/velocity submatrix are **required** by CCSDS 508.0-B-1. A CDM without a populated covariance cannot support Pc calculation — only miss distance screening.

## Combined Covariance in the Encounter Plane

To compute Pc, the individual covariances of the primary (C₁) and secondary (C₂) objects are **summed** to form the combined covariance C = C₁ + C₂, then projected onto the 2-D encounter plane (perpendicular to the relative velocity vector at TCA). This 2×2 projected matrix defines the bivariate normal PDF that is integrated over the collision disk.

## Covariance Realism

Covariance realism is the degree to which the reported covariance accurately represents the true orbit uncertainty. It is arguably the most operationally important quality indicator for a CDM:

- **Over-confident (too small) covariance**: PDF is too narrow → Pc is inflated (false alarm risk)
- **Under-confident (too large) covariance**: PDF is too wide → Pc is deflated (missed collision risk)

18 SDS covariances derived from TLE-based tracking are generally acknowledged to be **optimistic** for smaller debris and objects with high area-to-mass ratios (where atmospheric drag uncertainty dominates). This is a known structural limitation of the public Space-Track CDM dataset.

Commercial providers address this in different ways:
- **LeoLabs**: phased-array radar network with higher update cadence; publishes covariance realism assessments comparing propagated orbit to subsequent observations
- **COMSPOC**: uses additional sensor sources to improve covariance fidelity
- **NorthStar**: space-based optical tracking expected to improve covariance for deep LEO objects with low RCS

## Covariance Quality Flags in Practice

The TraCSS CDM Spec v2.1 (July 2025) adds an `OD_QUALITY` field with enumerated values (`GOOD`, `FAIR`, `POOR`, `UNKNOWN`) for each object. The Firefly agent should:
1. Reject Pc calculations where either object has `OD_QUALITY = POOR` or `UNKNOWN`
2. Flag events where only one object has covariance (secondary has TLE + no covariance = miss distance only, no Pc)
3. Annotate output with a covariance confidence rating before presenting Pc to operator

## Non-Positive-Definite Covariances

Numerical errors in orbit determination can produce covariance matrices that are not positive definite (PD) — a mathematical impossibility for a valid covariance. NASA CARA published a remediation procedure (NTRS 20170007917) for "remediating non-PD state covariances." A robust CDM parser should check PD status and apply scaling or eigenvalue floor correction before computing Pc.

## See Also

- [[concepts/pc-probability-of-collision]] — the integral that uses the covariance
- [[concepts/tca-time-of-closest-approach]] — the epoch at which covariance is evaluated
- [[concepts/hard-body-radius]] — the integration domain paired with the covariance
- [[sources/ccsds-508-cdm-2013]] — CDM covariance field definitions
- [[synthesis/cdm-pc-decisioning]] — how to handle covariance quality in the triage workflow
