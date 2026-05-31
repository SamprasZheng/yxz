---
type: source
title: "Firecracker: Lightweight Virtualization for Serverless Applications"
author: "Alexandru Agache, Marc Brooker, Andreea Florescu, Alexandra Iordache, Anthony Liguori, Rolf Neugebauer, Phil Piwonka, Diana-Maria Popa (Amazon Web Services)"
date: "2020-02-01"
ingested: "2026-06-01"
tags: [firecracker, microvm, kvm, sandbox, aws-lambda, serverless, virtualization, isolation]
---

# Firecracker: Lightweight Virtualization for Serverless Applications

NSDI '20 paper describing the Firecracker virtual machine monitor (VMM), the technology underlying AWS Lambda, AWS Fargate, and subsequently Vercel Sandbox and other agent-native execution platforms.

**URL**: [https://assets.amazon.science/96/c6/302e527240a3b1f86c86c3e8fc3d/firecracker-lightweight-virtualization-for-serverless-applications.pdf](https://assets.amazon.science/96/c6/302e527240a3b1f86c86c3e8fc3d/firecracker-lightweight-virtualization-for-serverless-applications.pdf)

**GitHub**: [https://github.com/firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker) (Apache 2.0)

## Key facts

- **Isolation mechanism**: KVM hardware virtualization (not namespace-only); each microVM runs a separate guest kernel. Escaping requires compromising both the guest kernel and KVM — they share no code.
- **Minimal device model**: Only five emulated devices: `virtio-net`, `virtio-block`, `virtio-vsock`, serial console, minimal keyboard controller (stop-only). Every omitted device is eliminated attack surface.
- **Jailer**: A companion binary that provides a second line of defense via Linux namespaces and seccomp-bpf if the virtualization boundary is compromised.
- **Boot time**: User-space code running in 125 ms; supports 150 microVMs/second/host creation rate.
- **Memory overhead**: <5 MiB per microVM, enabling dense co-location.
- **Production deployments**: AWS Lambda, AWS Fargate, Fly.io, Vercel Sandbox (each sandbox is a Firecracker microVM per the Vercel GA announcement).
- **Agent runtime use (2025–2026)**: AWS AgentCore runtime gives each agent session its own Firecracker microVM, terminated when the session ends — direct application of the paper's security model to autonomous agent execution. [[concepts/nemoclaw]] lists Firecracker as the recommended option when stronger isolation than Docker namespaces is needed.
- **Language**: Written in Rust (memory safety as a design goal for the VMM itself).

## Relationship to wiki

- Referenced by [[concepts/agent-sandboxing-isolation]] as the canonical source for the Firecracker microVM tier.
- Firecracker is used by [[concepts/openshell-runtime]] / [[concepts/nemoclaw]] as the optional high-isolation alternative to Docker containers.
