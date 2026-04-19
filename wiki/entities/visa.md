---
type: entity
tags: [visa, payments, card-network, agentic-commerce, tap, intelligent-commerce]
---

# Visa

## Basic Information

- **Type**: Global payment network (NYSE: V)
- **Founded**: 1958 (predecessor: BankAmericard, Bank of America)
- **Headquarters**: San Francisco, California, USA
- **Core business**: Global card payment clearing network; digital payments; cross-border settlement

## Agentic Payments Strategy: Visa Intelligent Commerce

### Visa Intelligent Commerce (VIC)

**VIC** is Visa's comprehensive agentic commerce initiative launched in 2025, with the goal of enabling AI agents to securely complete shopping transactions on behalf of users.

**Status as of early 2026**:
- 100+ ecosystem partners
- 30+ partners actively developing in the VIC sandbox
- 20+ agents / agent enablers directly integrated with VIC
- **Hundreds** of controlled real agent-initiated transactions completed
- Forecast: before the 2026 holiday shopping season, **millions of consumers** will use AI agents to complete purchases

### Trusted Agent Protocol (TAP)

**TAP** is the core security framework of VIC, officially released on **2025-10-14**, co-developed with **Cloudflare**.

**Function**: Enables AI agents to securely convey intent, user identity, and payment information at each step of a transaction with a merchant.

**Technical specifications**:

| Element | Description |
|---|---|
| **Agent Intent** | Declaration that the AI agent is a trusted agent intending to acquire or purchase specific goods |
| **Consumer Recognition** | Whether the consumer has an existing account or has previously interacted with the merchant |
| **Payment Information** | Payment data supporting the merchant's preferred checkout method |
| **Message Signature** | HTTP message signature per **RFC 9421** standard |
| **Replay Attack Protection** | Requests include timestamp (created/expires) + nonce; server can reject expired or duplicate signatures |

TAP specifications are published at the **Visa Developer Center** and on GitHub.

### x402 Integration

Visa added card payment support to x402 via TAP, enabling the x402 ecosystem to accept the Visa card network as a settlement option (through Visa's trusted agent card payment mechanism).

### Stripe Partnership

Visa supports Stripe + Tempo's Machine Payments Protocol (MPP), providing card network infrastructure backing for trusted autonomous agent payments.

## Comparison with Mastercard

| Dimension | Visa (TAP / VIC) | Mastercard (Agent Pay) |
|---|---|---|
| Launch date | 2025-10 (TAP) | 2025-04 (Agent Pay) |
| Trust mechanism | RFC 9421 HTTP signing | SD-JWT Verifiable Intent |
| Token management | Within VIC framework | Agentic Token (per-agent issuance) |
| Open standards | RFC 9421 | FIDO / EMVCo / W3C / IETF |
| Co-development partner | Cloudflare | Google |

## Related Pages

- [[concepts/agentic-payment-protocols]] — Full comparison of five major protocols (including Visa's position)
- [[concepts/agentic-payments]] — AI agent autonomous payment framework
- [[entities/mastercard]] — Competitor's Agent Pay strategy
- [[entities/stripe]] — MPP partner (Visa supports MPP)
- [[concepts/x402-protocol]] — Visa provides the card payment layer in the x402 ecosystem
