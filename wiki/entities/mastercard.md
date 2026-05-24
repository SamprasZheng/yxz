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

**Mastercard Agent Pay** was officially launched in April 2025, built on two technical pillars: **Agentic Token** and **Verifiable Intent**.

Q4 2025: CEO Michael Miebach confirmed the first agentic transaction completed on the network.

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

**Verifiable Intent** is an open standard co-developed with Google, providing a trust foundation for agentic transactions.

**Core concept**: For every transaction executed by an AI agent on behalf of a user, create an immutable record comprising "user identity × original instruction × transaction outcome."

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

## Related Pages

- [[concepts/agentic-payment-protocols]] — Full comparison of five major protocols (including Mastercard's position)
- [[concepts/agentic-payments]] — AI agent autonomous payment framework
- [[entities/visa]] — Competitor's Intelligent Commerce / TAP strategy
- [[entities/stripe]] — Payment infrastructure partner
