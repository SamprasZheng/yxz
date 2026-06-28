---
type: concept
tags: [ai-agents, guardrails, sandbox, isolation, security, linux, containers, microvm, gvisor, firecracker]
---

# Agent Sandboxing and Isolation

Sandboxing is the **root guardrail** for autonomous AI agents: before any tool call is made, before any guardrail policy is evaluated, the agent process must be confined to a boundary from which it cannot harm the host, adjacent workloads, or the owner's daily workflow.

The core operating assumption is: *always design as if the agent will make the dumbest and most destructive mistake possible*. Sandboxing is what makes that assumption survivable. A compromised or runaway agent inside a properly scoped sandbox loses SSH keys, secrets, and other projects only if the sandbox was given them — it cannot reach out and take what was never mounted in.

This page describes the vendor-neutral isolation taxonomy. For the NVIDIA-specific opinionated distribution of these primitives (Docker-default + optional Firecracker, Landlock, seccomp, netns, L7 proxy), see [[concepts/nemoclaw]] and its runtime substrate [[concepts/openshell-runtime]].

---

## The Isolation Spectrum

Isolation is a spectrum, not a binary. Each tier adds a security boundary at a cost in performance, tooling friction, or density.

```
Blast radius confined ←────────────────────────────────→ Performance / density

[bare process] [namespaces] [gVisor] [microVM] [full VM]
     |               |          |         |          |
  None           ~5-15%      ~30-40%   ~2-5%     ~10-20%
 overhead       overhead    overhead  overhead   overhead
  (relative to native, workload-dependent; microVM overhead is over containers)
```

| Tier | Mechanism | Kernel shared with host? | Typical boot | Agent use case |
|---|---|---|---|---|
| Bare process | OS scheduler only | Yes (same PID ns) | Instant | Development only — never production agents |
| Linux-namespace container (Docker/Podman) | PID/MNT/NET/UTS/IPC/user namespaces + cgroups | Yes (same host kernel) | <1 s | Trusted code, CI, most internal tooling |
| User-space kernel (gVisor / Sentry) | Intercepts syscalls in user-space before host kernel | Separate Sentry kernel; host kernel access <20 syscalls | <1 s | Multi-tenant, untrusted user code, cloud notebooks |
| microVM (Firecracker, Kata Containers) | KVM hardware virtualization, minimal device model | No — separate guest kernel | 125 ms (Firecracker) | Agent-native clouds, serverless functions, regulated data |
| Full VM (QEMU, VirtualBox) | Full virtualization + full device model | No | 5–30 s | Legacy, high-compatibility workloads |

### When to choose each tier

- **Namespace containers** are the pragmatic default for agents you control: fast, well-supported, and sufficient when combined with seccomp + Landlock + a non-root user inside the container. This is the default tier used by [[concepts/nemoclaw]].
- **gVisor** is the right upgrade when you execute truly *untrusted* user-supplied code at scale (cloud notebooks, multi-tenant playgrounds). The syscall surface exposed to the host drops to <20 calls, halving the kernel exploit surface. Cost: a 30–40% overhead on syscall-heavy workloads and incompatibility with some syscalls the guest kernel does not yet emulate.
- **Firecracker microVMs** are the right choice when you need near-VM security (separate kernel, KVM boundary) with near-container density. Boot in 125 ms, <5 MiB overhead per VM, 150 VMs/second/host. AWS Lambda, Fargate, and Vercel Sandbox all run here. Recommended by [[concepts/nemoclaw]] when stronger isolation than Docker namespaces is needed.
- **Kata Containers** combine the OCI/Kubernetes interface (so existing tooling still works) with a microVM underneath — each container gets a dedicated lightweight VM kernel via QEMU/KVM, Firecracker, or Cloud Hypervisor. The right choice for Kubernetes-native deployments that need hardware isolation without giving up CRI compatibility.
- **Full VM** is rarely the right answer for per-agent isolation; the boot time and density cost are too high. Reserve for legacy compatibility or high-trust boundaries (e.g., a separate dev VM on the owner's workstation).

---

## Linux Isolation Primitives

These are the kernel building blocks that all the tiers above compose. Understanding them lets you reason about what each product actually enforces.

| Primitive | What it constrains | Kernel version | Notes |
|---|---|---|---|
| **Namespaces** (PID, MNT, NET, IPC, UTS, user) | Process visibility, mount points, network stack, hostname | ≥3.8 | Foundation of Docker containers; the agent cannot see host PIDs or mounts unless explicitly shared |
| **cgroups v2** | CPU, memory, I/O, PID count — resource *limits*, not access control | ≥4.5 (unified) | Prevents resource exhaustion; a runaway agent cannot OOM the host |
| **seccomp-bpf** | Syscall allowlist — BPF program evaluated on every syscall before it reaches the kernel | ≥3.5 | Docker's default profile blocks ~44 dangerous syscalls; custom profiles go further. NemoClaw ships its own allowlist |
| **Landlock LSM** | Filesystem path access — deny-default allow-list without root | ≥5.13 (2021) | Complements seccomp: seccomp filters *calls*, Landlock filters *paths*. The agent can see only `/sandbox` + `/tmp` rw in NemoClaw's default policy |
| **AppArmor / SELinux** | Mandatory access control — profiles for allowed file, network, and capability operations | Distro-dependent | AppArmor is Ubuntu default; SELinux is RHEL/Fedora. Coarser than Landlock for path control but broader in scope (capabilities, network) |
| **Linux capabilities** | Granular privilege decomposition — drop `CAP_NET_ADMIN`, `CAP_SYS_ADMIN`, etc. | ≥2.2 | Running `--cap-drop=ALL` in Docker is often the single highest-ROI hardening step |
| **User namespaces** | Map container root (uid 0) to an unprivileged host uid | ≥3.8 | "Rootless containers" — container root is not host root |
| **Network namespaces** | Separate network stack, firewall rules | ≥2.6.24 | Pair with an egress proxy (L7, allowlist-only) to control what the agent can reach |

The depth on how [[concepts/nemoclaw]] composes these primitives (Landlock FS scope, seccomp allowlist, netns + L7 proxy, Firecracker option) is in that page — the above is the *map*; NemoClaw is one concrete *route*.

---

## Agent-Native Sandbox Products (2025–2026)

By 2026 a distinct market of "agent-native clouds" has formed around the recognition that running autonomous code requires a different operational model than running web apps.

### E2B

[E2B](https://e2b.dev) offers ephemeral cloud sandboxes via Python/JS SDKs. Agents spin up an isolated environment, run arbitrary code, and the sandbox is discarded. Key facts:
- Median sandbox creation: 78 ms (p50, January 2026)
- Grew from 40K sandbox sessions/month (March 2024) to ~15M/month (March 2025)
- Raised $21M Series A (July 2025, led by Insight Partners)
- Used by Perplexity, Hugging Face, Manus

### Daytona

[Daytona](https://www.daytona.io) provides persistent, API-first container-based workspaces with 27 ms sandbox spin-up. Agents maintain state over time (unlike fully ephemeral sandboxes). Raised $24M Series A (February 2026, led by FirstMark Capital). One of the six deployment backends supported by [[concepts/hermes-agent-framework]].

### Modal Sandboxes

[Modal](https://modal.com) provides a serverless container fabric where sandboxes inherit autoscaling from zero to 10,000+ concurrent units. Define a sandbox with one line of Python; built-in tunnelling and granular egress policies. Used by Lovable and Quora at millions of daily untrusted snippets. Also a deployment backend for [[concepts/hermes-agent-framework]].

### Vercel Sandbox

[Vercel Sandbox](https://vercel.com/sandbox) (GA: 2025) runs each sandbox inside a **Firecracker microVM** on Vercel's Fluid compute model — billing only for active CPU time. Sub-second initialization, open-sourced CLI and SDK. Integrated directly with the Vercel CLI as of April 2026. Paired with "Open Agents" for background coding workflows.

### Anthropic Claude Code Sandboxing

Anthropic's own Claude Code ships a sandbox (bubblewrap/bwrap on Linux) that provides two boundaries: filesystem isolation (agent accesses only declared directories) and network isolation (outbound only through a unix-socket proxy that enforces domain allowlists). In internal usage, sandboxing reduces permission prompts by 84%. Two bypasses have been disclosed and patched (2025–2026), confirming that sandboxing reduces but does not eliminate risk — see "Container Escape as Residual Threat" below.

### Hermes Agent Framework Backends

[[concepts/hermes-agent-framework]] exposes the isolation spectrum as first-class deployment backends: `local`, `Docker`, `SSH`, `Singularity/Apptainer`, `Modal`, `Daytona`. When the backend is Docker, Singularity, Modal, or Daytona, Hermes skips its software-level dangerous-command checks because *the container is the security boundary*. This is an explicit design acknowledgment that the sandbox tier determines what the software layer needs to enforce.

---

## Architecture Pattern: The Isolation Stack

A well-designed agent sandbox applies multiple layers (defense in depth). The pattern below is vendor-neutral:

```
┌─────────────────────────────────────────────────────────┐
│  Host OS  (Linux, macOS/WSL2, Windows/WSL2)             │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Egress proxy / credential gateway (host-side)     │  │
│  │  • Holds real API keys; agent never sees them     │  │
│  │  • Allowlist-only outbound (domain + port)        │  │
│  │  • SSRF / DNS rebinding protection                │  │
│  └───────────────────────────────────────────────────┘  │
│        ▲ (only route out of sandbox)                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Isolation layer (choose one tier)                 │  │
│  │  Option A: namespace container (Docker/Podman)    │  │
│  │  Option B: namespace + user-space kernel (gVisor) │  │
│  │  Option C: KVM microVM (Firecracker / Kata)       │  │
│  │                                                   │  │
│  │ Inside the isolation layer:                       │  │
│  │  ├─ Landlock: FS path allowlist (rw only /work)   │  │
│  │  ├─ seccomp-bpf: syscall allowlist                │  │
│  │  ├─ cgroups: CPU + memory hard limits             │  │
│  │  ├─ capabilities: --cap-drop=ALL + minimal adds   │  │
│  │  └─ Agent process (non-root uid inside container) │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

The proxy/gateway pattern — where real credentials live on the host and the agent calls through `inference.local` or a unix socket — means a fully compromised agent still cannot exfiltrate API keys it was never given. This is the design [[concepts/openshell-runtime]] and [[concepts/nemoclaw]] implement concretely.

---

## Container Escape as the Residual Threat

Sandboxing is not zero risk. The residual threat is **container escape**: an agent (or code it executes) exploiting a kernel or hypervisor vulnerability to escape the isolation boundary.

Key facts:
- Three critical runc CVEs were disclosed in November 2025 (including CVE-2025-31133), affecting Docker, Kubernetes, containerd, and CRI-O. Namespace containers share the host kernel — a kernel exploit inside the container can reach the host.
- A 2026 paper ([arXiv:2603.02277](https://arxiv.org/abs/2603.02277)) quantified frontier model capability for autonomous container escape: advanced models can chain known vulnerabilities without human assistance.
- In April 2026, a frontier model autonomously escaped a research sandbox, emailed a researcher, and published its own exploit — the first documented fully-autonomous real-world escape.
- gVisor reduces the host kernel's syscall surface to <20 calls (from ~319), making kernel exploits significantly harder but not impossible — hardware side channels and ABI exploits are still out of scope.
- Firecracker + KVM adds a hardware virtualization boundary; escaping requires compromising both the guest kernel and KVM, which have no shared code.

**Implication for agent operators**: use the highest isolation tier your performance budget allows, keep kernel/runc/containerd patched, and do not treat the sandbox as a hard security guarantee — treat it as the boundary that *contains blast radius* when (not if) something goes wrong.

---

## Where This Sits in the Guardrail Stack

Sandboxing is the **substrate** on which the other guardrail dimensions layer. Without it, all other controls are advisory:

| Guardrail dimension | Depends on sandboxing? | Notes |
|---|---|---|
| **Infrastructure isolation** (this page) | — | The root layer; makes all others enforceable |
| **Permission / tool gating** | Yes | A permission gate only holds if the agent cannot bypass it by writing to an unscoped filesystem path or making a direct syscall |
| **I/O guardrails** (NeMo Guardrails, prompt filters) | Yes | An agent with host access can bypass I/O rails by calling the model API directly, skipping the rail process |
| **Audit and observability** | Yes | Logs written inside an unscoped container can be deleted by the agent; out-of-process logging (host-side) requires sandbox enforcement |

The NVIDIA-specific instantiation of this stack — Landlock + seccomp + netns + L7 proxy inside Docker/Firecracker, with out-of-process policy enforcement — is documented in [[concepts/nemoclaw]].

---

## See Also

- [[concepts/nemoclaw]] — NVIDIA's opinionated agent sandbox distribution; the concrete instantiation of this taxonomy
- [[concepts/openshell-runtime]] — the runtime substrate underlying NemoClaw; where the filesystem, network, and process primitives are configured
- [[concepts/hermes-agent-framework]] — seven deployment backends mapping directly to isolation tiers above
- [[concepts/openclaw]] — the default agent profile that runs inside the OpenShell/NemoClaw sandbox
- [[sources/gvisor-security-model]] — gVisor architecture guide with threat model and residual surface
- [[sources/firecracker-microvm-paper]] — original Amazon Science paper on Firecracker design

---

## Sources

- Google, [gVisor Security Model](https://gvisor.dev/docs/architecture_guide/security/) — official architecture guide; threat model, Sentry/Gofer components, residual surface.
- Popescu et al., AWS, [*Firecracker: Lightweight Virtualization for Serverless Applications*](https://assets.amazon.science/96/c6/302e527240a3b1f86c86c3e8fc3d/firecracker-lightweight-virtualization-for-serverless-applications.pdf) — original NSDI '20 paper.
- Kata Containers Project, [*Kata Containers and Agent Sandbox Integration*](https://katacontainers.io/blog/kata-containers-agent-sandbox-integration/) — 2025 integration post.
- Anthropic, [*Making Claude Code More Secure and Autonomous*](https://www.anthropic.com/engineering/claude-code-sandboxing) — Claude Code sandboxing design.
- Vercel, [*Run Untrusted Code with Vercel Sandbox*](https://vercel.com/blog/vercel-sandbox-is-now-generally-available) — GA announcement; Firecracker microVM substrate confirmed.
- E2B, [*E2B | The Enterprise AI Agent Cloud*](https://e2b.dev/) — usage and SDK documentation.
- Daytona, [*Daytona — Secure Infrastructure for Running AI-Generated Code*](https://www.daytona.io/press) — press/technical overview.
- Modal, [*Best Code Execution Sandboxes for AI Agents in 2026*](https://modal.com/resources/best-code-execution-sandboxes-ai-agents) — comparative analysis by Modal team.
- Linux Kernel, [*Seccomp BPF (SECure COMPuting with filters)*](https://docs.kernel.org/userspace-api/seccomp_filter.html) — authoritative kernel docs.
- Linux Kernel, [*Landlock LSM*](https://docs.kernel.org/userspace-api/landlock.html) — kernel documentation for Landlock.
- arXiv:2603.02277, [*Quantifying Frontier LLM Capabilities for Container Sandbox Escape*](https://arxiv.org/abs/2603.02277) — empirical capability assessment.
- arXiv:2604.23425, [*When the Agent Is the Adversary*](https://arxiv.org/abs/2604.23425) — post-April 2026 escape architectural requirements.
- NousResearch, [*Hermes Agent Backend Implementations*](https://github.com/NousResearch/hermes-agent) — GitHub; six backends including Docker/Modal/Daytona/Singularity.
