---
type: concept
tags: [ai, agents, sandbox, security, runtime, guardrails, nemoclaw, openclaw]
---

# OpenShell Runtime

OpenShell is the **sandbox runtime layer** under [[concepts/nemoclaw]] and [[concepts/openclaw]] — the lower-level execution cage in which filesystem scope, network/process controls, syscall policy, and credential-egress mediation are enforced. [[concepts/nemoclaw]] is NVIDIA's opinionated *distribution* of OpenShell (onboarding, profiles, presets); OpenShell is the substrate those profiles run on. In NVIDIA's framing it is described as "part of NVIDIA Agent Toolkit."

The mental model: **OpenShell is to NemoClaw what containerd is to Docker** — the engine versus the product wrapped around it. An agent author rarely calls OpenShell directly; they hand NemoClaw a policy YAML and NemoClaw drives `openshell` underneath.

## Why a separate runtime layer at all (layer up)

The system-level reason OpenShell exists: an autonomous, *always-on* agent ([[concepts/openclaw]], [[concepts/hermes-agent-framework]]) with shell + browser + file tools is, on a bare host, effectively root with a chat interface. The standard LLM-side defense ([NeMo Guardrails / Colang](https://github.com/NVIDIA/NeMo-Guardrails)) only filters one model call's input/output and is defeated by prompt injection. OpenShell moves the enforcement boundary **out of the agent process entirely** so that even a fully-compromised agent cannot exceed the policy — the agent can be talked into *trying* anything, but the cage, not the model, decides what executes. This is the "secure by design / enforcement outside the process" claim the [[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge 2026]] rewards.

## The four enforcement primitives (layer down — mechanism)

OpenShell composes four standard Linux isolation mechanisms; none are NVIDIA-invented, which is the point — they are battle-tested kernel features, not a novel trust-me sandbox:

| Domain | Linux primitive | What it bounds | Bypass surface |
|---|---|---|---|
| **Filesystem** | [Landlock LSM](https://docs.kernel.org/userspace-api/landlock.html) (mainline since 5.13, 2021) | read/write/exec path allowlist | Landlock privilege-escalation gap → host FS |
| **Process / syscall** | [seccomp-BPF](https://docs.kernel.org/userspace-api/seccomp_filter.html) + namespaces + `no_new_privs` + capability drop | the syscall set the agent may issue | seccomp filter gap → host kernel |
| **Network** | netns + L7 egress proxy | which hosts/ports the agent may reach | container/namespace escape |
| **Inference / credentials** | out-of-process gateway (credential vault) | the agent never holds provider API keys | gateway compromise |

Because Landlock/seccomp/netns share the **host kernel**, a kernel-level escape gives host access — so OpenShell additionally supports stronger compute drivers when the threat model demands it: **Docker (default), Podman, [Firecracker](https://firecracker-microvm.github.io/) microVMs (AWS, Rust, KVM hardware boundary, ~125 ms boot), and Kubernetes.** Firecracker is the recommended driver when namespace isolation is insufficient. (OpenShell is *not* [gVisor](https://gvisor.dev/) and *not* WASM, though those occupy the same isolation-spectrum: gVisor = user-space kernel intercepting syscalls; microVM = dedicated guest kernel + hardware boundary.)

## CLI surface

OpenShell is consumed through `openshell` verbs (which NemoClaw/`nemoclaw` wrap):

```bash
openshell sandbox create --name firefly --policy ./firefly-sandbox.yaml
openshell inference  set    --provider ollama-local --model nemotron-3-nano:4b --sandbox firefly
openshell agent      run    --sandbox firefly --cmd "firefly plan --from Taiwan --to SSO-600km"
openshell sandbox    status --name firefly
openshell sandbox    destroy --name firefly
```

Network and filesystem policy are **hot-reloadable** — egress allowlist edits take effect without restarting the agent process (see [[concepts/nemoclaw-policy-presets]]).

## Reference implementation in this repo

This wiki's own [[synthesis/firefly-nemoclaw-reference-implementation|Firefly agent]] is a concrete OpenShell consumer: `agents/firefly-sandbox.yaml` is a complete OpenShell policy whose header invokes exactly the `openshell sandbox create --name firefly --policy ./firefly-sandbox.yaml` verb above, and whose four policy blocks (`filesystem` Landlock allow/deny, `network` deny-default L7 allowlist, `process` seccomp `block_syscalls: [kexec_load, reboot, bpf, perf_event_open, ptrace]`, `inference` credential-vault rerouting via `inference.local`) map 1-to-1 onto the four primitives above. It is the canonical worked example for "what an OpenShell policy actually looks like in production." Full reconciliation: [[synthesis/firefly-nemoclaw-reference-implementation]].

## Lineage and horizon (拉長時間軸)

- **2008–2014:** seccomp (2.6.12, 2005) → seccomp-BPF (3.5, 2012); Linux namespaces mature → the container era (Docker 2013).
- **2018:** AWS Firecracker (microVM isolation for Lambda/Fargate); Google gVisor (user-space kernel) — the "container is not a security boundary" consensus forms.
- **2021:** Landlock lands in mainline 5.13 — unprivileged, stackable FS sandboxing, the missing piece for per-process FS scope.
- **2025–2026:** the **agent-runtime-security** category emerges (the bureado/awesome-agent-runtime-security index, the "Your Container Is Not a Sandbox" 2026 microVM survey) as always-on LLM agents make untrusted-code-execution the *default* workload rather than an edge case; OpenShell/NemoClaw is NVIDIA's entry.
- **Forward (scenario, not fact):** as agent autonomy escalates, the boundary trends from shared-kernel (Landlock/seccomp) toward hardware-enforced (microVM, confidential compute / [TEE](https://en.wikipedia.org/wiki/Trusted_execution_environment)) for any agent touching untrusted input or third-party tools — the same trajectory multi-tenant cloud took, compressed into a few years. The 100-year invariant: **the agent that can act in the world must be caged by something it cannot reason its way out of** — enforcement must live below the layer the agent can manipulate, which always means the OS/hardware, never the prompt.

## Six-region note (水平展開)

Sandbox/runtime isolation is one of the few stack layers that is **genuinely not regionalized**: the primitives are open-source kernel features (Landlock, seccomp — upstream Linux), and the leading microVM/userspace-kernel projects are US-origin open source (Firecracker/AWS, gVisor/Google) used worldwide. There is no meaningful Taiwan/Japan/Korea/China/Europe *divergence* at the runtime layer — the contested ground is one layer up (the **model**, see [[synthesis/open-weight-llm-agent-stack-six-region]]) and one layer down (the **silicon**, see [[concepts/dgx-spark]] + [[synthesis/orbital-data-center-six-region]]). Recorded here as an honest N/A so the cluster's six-region coverage is explicit rather than missing.

## Graph role

- Runtime substrate for [[concepts/nemoclaw]]
- Safety boundary for [[concepts/openclaw]] and [[concepts/hermes-agent-framework]]
- Policy target for [[concepts/nemoclaw-policy-presets]]
- Inference-host context for [[concepts/dgx-spark]]
- Deployment concern for [[sources/nvidia-agent-challenge-2026]]
- Operator context for [[sources/nemoclaw-hermes-install-runbook-2026]]

## Related

- [[concepts/nemoclaw]] — opinionated distribution of this runtime
- [[concepts/openclaw]] — default agent profile run inside the cage
- [[concepts/hermes-agent-framework]] — experimental agent profile
- [[concepts/nemoclaw-policy-presets]] — the composable YAML the runtime enforces
- [[concepts/dgx-spark]] — on-prem inference host the runtime can reroute to
- [[synthesis/firefly-nemoclaw-reference-implementation]] — repo's worked OpenShell policy
- [[sources/nemoclaw-build-a-claw-portal-2026]] / [[sources/nemoclaw-hermes-install-runbook-2026]]
- [[entities/nvidia]]

## Sources

- NVIDIA, [*Run Autonomous, Self-Evolving Agents More Safely with NVIDIA OpenShell*](https://developer.nvidia.com/blog/run-autonomous-self-evolving-agents-more-safely-with-nvidia-openshell/).
- NVIDIA, [*How Autonomous AI Agents Become Secure by Design With NVIDIA OpenShell*](https://blogs.nvidia.com/blog/secure-autonomous-ai-agents-openshell/).
- GitHub, [NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell) (Apache 2.0).
- Linux kernel docs — [Landlock](https://docs.kernel.org/userspace-api/landlock.html), [seccomp-BPF](https://docs.kernel.org/userspace-api/seccomp_filter.html).
- [Firecracker microVM](https://firecracker-microvm.github.io/) (AWS) and [gVisor](https://gvisor.dev/) (Google) — isolation-spectrum reference points.
- bureado, [*awesome-agent-runtime-security*](https://github.com/bureado/awesome-agent-runtime-security) — 2026 category index.
</content>
</invoke>
