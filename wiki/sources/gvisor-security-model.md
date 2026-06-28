---
type: source
title: "gVisor Security Model"
author: "Google / gVisor Project"
date: "2024-01-01"
ingested: "2026-06-01"
tags: [sandbox, gvisor, security, container, user-space-kernel, isolation]
---

# gVisor Security Model

Official architecture guide for the gVisor user-space kernel. Canonical reference for the Sentry/Gofer threat model and what gVisor does and does not protect against.

**URL**: [https://gvisor.dev/docs/architecture_guide/security/](https://gvisor.dev/docs/architecture_guide/security/)

## Key facts

- **Threat model**: Targets exploitation of host kernel bugs via the System API (syscall) vector.
- **Sentry**: User-space kernel process that intercepts all application syscalls. Applications cannot directly pass arguments to the host kernel. Sentry has implemented >70% of the 319 Linux syscalls.
- **Host kernel surface**: Sentry itself uses <20 host syscalls (file descriptor ops, sync, timers, signal management + Gofer communication). This is the reduction that makes gVisor meaningful — not zero, but dramatically constrained.
- **Gofer**: A sidecar companion process running in a slightly more privileged context, used for filesystem operations the Sentry cannot service within its restriction.
- **Residual threats (explicitly out of scope)**: hardware side channels (e.g. Spectre/Meltdown — deferred to vendor mitigations), system ABI exploits (implicit hardware/privileged paths outside documented APIs), network-accessible service vulnerabilities, resource exhaustion (delegated to host cgroups).
- **GKE Sandbox**: Google's production deployment of gVisor; uses `gvisor.dev/docs` as the RuntimeClass definition.

## Relationship to wiki

- Referenced by [[concepts/agent-sandboxing-isolation]] as the canonical source for the gVisor tier of the isolation spectrum.
- The <20 host syscall figure is the load-bearing fact that distinguishes gVisor from namespace-only containers.
