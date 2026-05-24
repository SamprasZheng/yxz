---
type: concept
tags: [ai, agents, sandbox, security, runtime, guardrails, nemoclaw, openclaw]
---

# OpenShell Runtime

OpenShell is the sandbox runtime layer referenced by [[concepts/nemoclaw]] and [[concepts/openclaw]]. In this wiki, it should be treated as the lower-level execution cage: filesystem scope, network/process controls, syscall policy, and credential egress mediation sit here, while NemoClaw is the NVIDIA-distributed agent stack that packages those controls into usable profiles.

## Graph role

- Runtime substrate for [[concepts/nemoclaw]]
- Safety boundary for [[concepts/openclaw]]
- Policy target for [[concepts/nemoclaw-policy-presets]]
- Deployment concern for [[sources/nvidia-agent-challenge-2026]]
- Operator context for [[sources/nemoclaw-hermes-install-runbook-2026]]

## Related

- [[concepts/nemoclaw]]
- [[concepts/openclaw]]
- [[concepts/nemoclaw-policy-presets]]
- [[sources/nemoclaw-build-a-claw-portal-2026]]
- [[sources/nemoclaw-hermes-install-runbook-2026]]
- [[entities/nvidia]]
