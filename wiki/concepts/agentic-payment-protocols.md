---
type: concept
tags: [payments, ai-agents, protocols, agentic-commerce, x402, mpp, acp, ap2, l402, stablecoin, stripe, openai, google, mastercard, visa]
---

# Agentic Payment Protocols — Comprehensive Comparison

## Overview

Between 2025–2026, five major protocol standards emerged around the question of "how AI agents pay autonomously," forming a layered ecosystem. They are not purely competing — they are complementary pieces covering different layers (authorization layer, settlement layer, process layer).

## Five Protocols at a Glance

| Protocol | Originator | Release Date | Positioning | Payment Method |
|---|---|---|---|---|
| **x402** | Coinbase | 2025-05 (V2: 2025-12) | HTTP-native stablecoin settlement | USDC + multi-chain ERC-20 |
| **ACP** | OpenAI + Stripe | 2025-09 | Merchant checkout process standard | Fiat (card/bank transfer) |
| **AP2** | Google + 60+ partners | 2025-09-17 | Authorization trust framework (Mandate) | Payment-agnostic (fiat + crypto) |
| **MPP** | Stripe + Tempo | 2026-03-18 | Session-based continuous micropayments | Stablecoin + fiat + BTC |
| **L402** | Lightning Labs | 2020 (AI tools 2026-02) | Bitcoin Lightning HTTP micropayments | BTC (Lightning) |

## Protocol Details

### 1. x402 Protocol

Core mechanism: HTTP 402 status code triggers on-chain USDC payment, < 2 second settlement, ~$0.0001 per-transaction fee.

**V2 (2025-12-11) major upgrade:**
- Migrated from body-based to **header-based** data transfer
- Introduced **Session support**: after initial payment, subsequent requests skip repeated handshakes, supporting subscription patterns
- Supports **any ERC-20 token** (via Uniswap Permit2 + Coinbase Gas Sponsorship)
- CAIP standard alignment (chain/asset identifier standardization)
- Modular SDK: developers can add chains/assets/payment schemes as plugins
- 6-month cumulative total: **over 100 million payments**, 600+ developer Telegram community

**Supported chains (V2)**: Base, Solana, other L2s, traditional rails (ACH / SEPA / card) via facilitator

**Ecosystem position**: Stripe supports both MPP and x402; AP2 lists x402 as the official crypto extension.

See [[concepts/x402-protocol]] for details.

---

### 2. ACP — Agentic Commerce Protocol

**Originator**: OpenAI + Stripe jointly maintained, Apache 2.0 license

**Core design**: Defines the interaction model for AI agents and merchants to complete purchases. Four RESTful endpoints:
1. `Create Checkout` — create checkout session
2. `Update Checkout` — update cart/options
3. `Complete Checkout` — complete payment
4. `Cancel Checkout` — cancel order

**Version history**:
| Version | Date | Major Additions |
|---|---|---|
| Initial | 2025-09-29 | Base specification |
| V2 | 2025-12-12 | Fulfillment enhancements |
| V3 | 2026-01-16 | Capability negotiation |
| V4 | 2026-01-30 | Extension mechanisms, discounts, Payment Handlers |

**Real-world deployment**: ChatGPT built-in Instant Checkout (live 2026-02), Etsy products purchasable directly within ChatGPT, Shopify's millions of merchants progressively onboarding.

**Positioning**: Fiat-first, targeting consumer e-commerce agents; complements x402 (x402 is for account-free M2M scenarios; ACP is for account-based consumer scenarios).

---

### 3. AP2 — Agent Payments Protocol

**Originator**: Google, 60+ partners (including Coinbase, PayPal, Mastercard, Adyen, Etsy, Salesforce, etc.)

**Release date**: 2025-09-17

**Core mechanism: Mandates**

AP2 uses cryptographically signed "Mandates" as the core trust primitive, addressing three problems:
- **Authorization**: How much payment authority does the user grant to the agent?
- **Authenticity**: Does the agent request genuinely reflect user intent?
- **Accountability**: Who is responsible when disputes arise?

**Two shopping modes**:
1. **Real-time** (user present): Intent Mandate → agent presents cart → user signs Cart Mandate
2. **Delegated** (user absent): User pre-signs Intent Mandate (with rules) → agent auto-generates Cart Mandate for execution

**Technical standards**: Built on A2A Protocol + MCP; uses Verifiable Credentials (VC) + selective disclosure; aligned with FIDO Alliance.

**x402 Extension**: AP2 officially lists x402 as the standard extension for crypto payments, co-developed with Coinbase / Ethereum Foundation / MetaMask.

**Positioning**: Authorization framework, payment-agnostic (supports both fiat + crypto); suitable for enterprise multi-agent scenarios requiring complete audit trails.

---

### 4. MPP — Machine Payments Protocol

**Originator**: Stripe + Tempo (Stripe-invested crypto payment startup, co-invested by Paradigm)

**Release date**: 2026-03-18 (Tempo mainnet simultaneous launch)

**Core innovation: Session pre-authorization + continuous micropayment streaming**

MPP also revives HTTP 402 like x402, but adds a **Session** layer:
- Client pre-authorizes a spending limit once
- Subsequent requests stream continuous micropayments within the session without per-transaction on-chain confirmation
- Significantly reduces latency and gas costs

**Supported payment methods**:
- Stablecoin (Tempo chain)
- Fiat (Stripe card/bank)
- Bitcoin Lightning (Lightspark extension)
- Visa card network (via Visa partnership, supports trusted agent card payments)

**100+ services integrated at mainnet launch**: Browserbase, PostalForm, Prospect Butcher Co., Parallel Web Systems, etc.

**Positioning**: Optimized for continuous micropayments; suitable for AI agent long-duration workflows (e.g., continuous data subscriptions, streaming compute billing).

---

### 5. L402 — Lightning HTTP 402

**Originator**: Lightning Labs

**Initial release**: 2020 (based on Macaroon authentication tokens + Lightning Network)

**AI agent tools**: Open-sourced AI agent toolkit (7 composable skill modules) on 2026-02-11

**Core mechanism**: HTTP 402 + Lightning invoice; payment receipt serves as API access credential (no account required)

**Advantages**:
- Years of production maturity (5 years ahead of x402)
- Lightning Network scale (2025: ~100 million estimated wallet users, 8 million transactions/month)
- Bitcoin-native, no stablecoin regulatory risk

**Limitations**:
- Bitcoin only, no chain-agnostic flexibility
- LN liquidity management complexity higher than L1/stablecoin model

**2026 extension**: Lightspark integrates L402 into MPP, allowing MPP to also support Bitcoin payment paths.

---

## Traditional Payment Giants' Agentic Strategies

### Stripe
Dual-track approach:
- **MPP**: co-author, targeting stablecoin + continuous micropayments
- **ACP**: co-author, targeting traditional fiat e-commerce checkout
- **Agentic Commerce Suite**: all-in-one solution (SPT + fraud protection + ACP integration)
- Also announced x402 support

### PayPal
- **Agent Ready** (early 2026): allows existing millions of merchants to accept agent payments without development
- **Store Sync**: sync product data to AI channels (ChatGPT, Perplexity, etc.)
- Integrates with ChatGPT, Perplexity, Google UCP
- Partners with Mastercard Agent Pay

### Visa — Intelligent Commerce + TAP
- **Visa Intelligent Commerce (VIC)**: launched 2025, 100+ ecosystem partners, 30+ in sandbox development
- **Trusted Agent Protocol (TAP)**: released 2025-10-14; RFC 9421 signed HTTP messages; replay attack protection (timestamp + nonce); co-developed with Cloudflare
- Completed "hundreds" of controlled real agent transactions
- Prediction: before the 2026 holiday shopping season, millions of consumers will use agents to complete purchases

See [[entities/visa]] for details.

### Mastercard — Agent Pay + Verifiable Intent
- **Agent Pay** (2025-04): Agentic Token + Verifiable Intent dual pillars
- **Agentic Token**: each AI agent (ChatGPT / Gemini / Perplexity) receives an independent token with configurable category/amount/time restrictions; Citi + US Bank as first issuers
- **Verifiable Intent**: open standard co-developed with Google AP2; based on SD-JWT + FIDO + EMVCo + W3C; creates an immutable three-way record of "user identity × instruction × transaction result"
- Q4 2025: first agentic transaction completed on the network (confirmed by CEO Michael Miebach)

See [[entities/mastercard]] for details.

---

## Protocol Layer Analysis

```
[User Authorization Layer]    AP2 (Mandates)  ←→  Mastercard Verifiable Intent
                                   ↓
[Identity Layer]    Mastercard Agentic Token / Visa TAP / PayPal Agent Ready
                                   ↓
[Settlement Layer]    x402 (crypto) | ACP+MPP (fiat) | L402 (BTC)
```

## Positioning Comparison with x402

| | x402 | ACP | AP2 | MPP | L402 |
|---|---|---|---|---|---|
| Account-free M2M | ✅ | ❌ | N/A | ✅ | ✅ |
| Fiat payment | Via facilitator | ✅ | ✅ | ✅ | ❌ |
| Crypto-native | ✅ | ❌ | Extension | ✅ | BTC only |
| Subscription/Session | ✅ since V2 | ✅ | N/A | ✅ Core | ❌ |
| Open governance | x402 Foundation | Apache 2.0 | Open | Stripe+Tempo | Lightning Labs |
| Maturity (2026) | Medium | Early | Early | Just launched | Most mature |

## Related Pages

- [[concepts/x402-protocol]] — x402 detailed specifications and V2 upgrade
- [[concepts/agentic-payments]] — AI agent autonomous payment framework
- [[entities/coinbase]] — x402 originator
- [[entities/stripe]] — MPP + ACP co-originator
- [[entities/visa]] — Intelligent Commerce + TAP
- [[entities/mastercard]] — Agent Pay + Verifiable Intent
- [[sources/x402-protocol-coinbase-2025]] — x402 detailed source material
