---
type: entity
tags: [mastercard, payments, card-network, agentic-commerce, verifiable-intent, agent-pay]
---

# Mastercard

## Basic Information

- **Type**: Global payment network (NYSE: MA)
- **Founded**: 1966 (predecessor: Interbank Card Association)
- **Headquarters**: Purchase, New York, USA
- **Core business**: Global card payment clearing network; cross-border payments; digital payment innovation

## Agentic Payments Strategy: Agent Pay

### Launch

**Mastercard Agent Pay** was officially announced **2025-04-29** (launch partners Microsoft, IBM, Braintree), built on two technical pillars: **Agentic Token** and **Verifiable Intent**. Agentic Token is an extension of the **Mastercard Digital Enablement Service (MDES)** ([Mastercard news](https://www.mastercard.com/global/en/news-and-trends/stories/2025/agentic-commerce-momentum.html)).

Q4 2025: CEO Michael Miebach confirmed the first agentic transaction completed on the network. By 2026 the framework is **broadly available through Mastercard-certified processors**.

**Agent Pay for Machines (2026-06):** Mastercard extended Agent Pay to **machine-to-machine, always-on micropayments** — "super-fast, always-on payments" for autonomous machine/agent transactions, moving beyond human-in-the-loop shopping into pure M2M settlement (the card-network answer to [[concepts/x402-protocol]]/MPP streaming micropayments) ([Mastercard press 2026-06](https://www.mastercard.com/us/en/news-and-trends/press/2026/june/mastercard-launches-agent-pay-for-machines.html)).

### Agentic Token

**Agentic Token** is an AI agent extension of traditional payment tokens:
- A single physical card can issue independent tokens for different AI agents (separate ChatGPT token, Gemini token, Perplexity token)
- Each token can have fine-grained limits set at issuance:
  - **Category restrictions**: limited to "fresh produce," "airline tickets," etc.
  - **Amount ceiling**: $500/month cap
  - **Time restrictions**: weekdays only
- When an agent attempts to use a token, the network enforces restrictions at the token layer — no need for merchants or agents to evaluate this themselves
- **First issuing banks**: Citi, US Bank

### Verifiable Intent

**Verifiable Intent** is an **open-source, standards-based** framework co-developed with Google, providing a trust foundation for agentic transactions. Mastercard formally introduced it **2026-03-05**, with formal **pilots beginning Feb 2026** ([PYMNTS 2026](https://www.pymnts.com/mastercard/2026/mastercard-unveils-open-standard-to-verify-ai-agent-transactions/), [Mastercard: Verifiable Intent](https://www.mastercard.com/global/en/news-and-trends/stories/2026/verifiable-intent.html)).

**Core concept**: For every transaction executed by an AI agent on behalf of a user, create an immutable record comprising "user identity × original instruction × transaction outcome." Mechanically, the agent structures the request and records it as a **signed Intent Artifact on Mastercard infrastructure**; each later transaction carries a reference to that artifact, so the card's **issuer can verify at authorization time whether the cart is consistent with the user's original intent** — a cryptographic guard against an agent drifting off-instruction.

**Technical specifications**:
- Format: **SD-JWT** (Selective Disclosure JWT) + Key Binding
- Constitutes a layered delegation chain: identity → intent → action
- **Layer 1**: Issued by the issuer, placed in the credential provider wallet, binding the user identity to a public key (`cnf.jwk`)
- Algorithm: ES256; credential validity approximately one year; issuer keys discoverable via JWKS
- Selective Disclosure: each party obtains only the minimum necessary information
- **Open standard foundations**: FIDO Alliance, EMVCo, IETF, W3C

**Aligned protocols**: Google AP2 + Universal Commerce Protocol (UCP); designed to be protocol-agnostic (not tied to a specific payment protocol)

### Ecosystem Partnerships

| Partner | Role |
|---|---|
| Google | Verifiable Intent co-development; AP2 standard alignment |
| OpenAI | Early partner (at 2025 Agent Pay announcement) |
| Microsoft | Initial partner |
| IBM | Initial partner |
| PayPal | Agent Pay integration (Q4 2025) |
| Citi | First Agentic Token issuing bank |
| US Bank | First Agentic Token issuing bank |

## Positioning

Mastercard's agentic strategy is to build a **trust and authorization layer** on top of the existing card network, rather than replacing the payment settlement layer. Agentic Token provides fine-grained authorization controls, and Verifiable Intent provides an auditable intent record — together they make traditional card payments viable in the AI agent era, with better compliance than crypto-native solutions.

Mastercard is also a member of the **x402 Foundation** (under Linux Foundation governance), positioning its trust/authorization layer to interoperate with the open crypto-settlement standard rather than competing head-on.

## Historical lineage (Interbank → agent-credentialing)

- **1966** — **Interbank Card Association** formed by a group of banks to compete with BankAmericard; later **Master Charge** (1969) → **MasterCard** (1979) → **Mastercard** (2016 wordmark).
- **2006** — IPO (NYSE: MA); four-party network toll-taker like [[entities/visa]].
- **2014** — **MDES** tokenization launched (the plumbing Agentic Token now extends).
- **2025–2026** — **Agent Pay** (Apr 2025) → **Verifiable Intent** open-sourced (Mar 2026) → **Agent Pay for Machines** (Jun 2026): the network re-cast as an **agent credentialing + intent-verification authority**.

The through-line: Mastercard's structural bet is nearly identical to Visa's — **keep the settlement rail, own the agent-trust layer** — but it leans harder on *open standards* (FIDO/EMVCo/W3C/IETF, open-sourced Verifiable Intent, Google AP2 alignment) as the wedge, betting that an interoperable trust framework beats a proprietary one.

## Six-region positioning (台美日韓中國歐洲)

Mastercard is a **US "incumbent-rail + open-trust-layer" node** on the [[synthesis/agentic-payments-six-region|six-region map]], the near-twin of [[entities/visa]] but distinguished by AP2/Google alignment and an open-standards posture. Like Visa it is a *settlement participant* in the open protocols and a *rail provider* under the regional sovereign-stablecoin regimes rather than their originator; its Verifiable Intent / SD-JWT credentialing is a US-origin de-facto standard that Japan/Korea/Europe/Taiwan adopt rather than author. It records the **first live EU AI-agent payment** (with Santander/PayOS, Mar 2026) — its bridge into the MiCA regime. Sharpest regional contest is again vs [[entities/ant-group-alipay|Alipay/Ant]] in Asia. Full regional detail in the synthesis — not duplicated here.

## Long-horizon note (scenario, not forecast)

On a 100-year view Mastercard is a bet that **cryptographic intent-verification becomes the permanent audit substrate of agent commerce** — that even in a machine-payer world ([[concepts/agentic-payments]]) someone must attest "this agent was authorized to spend this, for this reason," and Mastercard's open Intent-Artifact standard becomes that substrate regardless of the settlement medium. The bear case mirrors Visa's: permissionless rails + sovereign stablecoins internalise both settlement *and* attestation, dissolving the network's role. Labelled as a structural fork, not a prediction.

## Related Pages

- [[concepts/agentic-payment-protocols]] — Full comparison of five major protocols (including Mastercard's position)
- [[concepts/agentic-payments]] — AI agent autonomous payment framework
- [[synthesis/agentic-payments-six-region]] — six-region map + Linux-Foundation governance
- [[entities/visa]] — Competitor's Intelligent Commerce / TAP strategy (the near-twin incumbent-rail + trust-layer bet)
- [[entities/stripe]] — Payment infrastructure partner
- [[entities/coinbase]] — fellow x402 Foundation member; the "replace the rail" counter-strategy
- [[entities/ant-group-alipay]] — China node; Mastercard's sharpest regional competitor in Asia
- [[concepts/x402-protocol]] — open crypto-settlement standard Mastercard now co-governs
