---
type: concept
tags: [rf, signal-processing, pa, linearization, 5g]
---

# DPD — Digital Predistortion

## Problem Background

High spectral efficiency modulations (256 QAM-OFDM for 5G) have high PAPR (Peak-to-Average Power Ratio), which excites the nonlinear characteristics of the PA (Power Amplifier):
- **Nonlinearity**: PA input-output relationship is non-linear; gain compression occurs at high input levels
- **Memory Effect**: Output depends not only on the current input but also on past samples (frequency/temperature dependence)
- **Out-band Spectral Regrowth**: Interference into adjacent frequency bands, degrading neighboring channel communication quality

DPD inserts a "pre-distorter" in front of the PA, so that signals passing through DPD and then the PA produce an overall linear response.

## PA Modeling Methods

### 1. Memoryless Polynomial
$y(n) = \sum_k a_k x(n)^k$

- LS (Least Squares) coefficient estimation
- Can model nonlinearity, **cannot model memory effects** (scattered data points)

### 2. Memory Polynomial
$y(n) = \sum_k \sum_p a_{k,p} x(n-p)^k$, where P is the memory depth

- Includes memory, LS estimation
- Time alignment problem: y(n) starts from y(P-1)

### 3. Neural Network (NN)
- Architecture: 1 hidden layer, 30 neurons
- Training: Levenberg-Marquardt (LM) backpropagation, minimizing sum-of-square error
- Input: PA input (real part + imaginary part + delay line, total 2×delay length neurons)
- Performance: superior to polynomial models, but longer training time (~15 minutes)

## DPD Training Method: Indirect Learning

1. Collect PA input/output data
2. Train post-distorter (DPD input = PA output, DPD output ≈ PA input)
3. Remove post-distorter; use post-distorter coefficients as pre-distorter

Complex gain normalization must be performed before training (to prevent DPD from reducing signal power).

## Typical Measurement Results

| Metric | Improvement |
|---|---|
| NMSE (test) vs. raw PA | ~−26 dB (significant improvement in PA linearity) |
| ACPR | ~−4 dB (out-band spectral regrowth suppression) |

NN DPD performance (NMSE + ACPR) is superior to polynomial DPD.

## Hardware Complexity Comparison

| | NN DPD | Polynomial DPD |
|---|---|---|
| Multipliers | $4n + (k-1)n^2$ | $2m + 2pm + p + 3$ |
| Adders | $4n + (k-1)n^2$ | $2m + 2pm + 1$ |
| Training speed | Slow (LM ~15 min) | Fast (LS closed-form solution) |
| Performance | Better | Second |

With 1 hidden layer and a small number of neurons, NN achieves near-equivalent complexity with better performance.

## CUDA Acceleration

- NN feedforward propagation parallelized with 2 threads
- Way1: thread1/2 each handles consecutive rows; Way2: thread1/2 interleave rows

## Related Links

- [[concepts/aesa]] — parent system where DPD is applied
- [[concepts/hybrid-phased-array]] — signal path containing PA
