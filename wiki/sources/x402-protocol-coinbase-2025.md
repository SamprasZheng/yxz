---
type: source
title: "x402: Internet-Native Payments for APIs and AI Agents"
author: Coinbase Developer Platform
date: 2025-05-01
ingested: 2026-04-19
tags: [x402, payments, ai-agents, stablecoin, usdc, http, coinbase, cloudflare]
---

# x402: Internet-Native Payments for APIs and AI Agents

## Summary

Coinbase launched **x402** in May 2025, reviving the long-dormant HTTP `402 Payment Required` status code as an open-standard protocol for automated micro-payments between AI agents. The core concept: any HTTP request can trigger a machine-to-machine (M2M) on-chain payment — no account, subscription, or API key required; the entire process is automated.

## Background

The HTTP 1.1 specification (RFC 2616, 1999) defined `402 Payment Required` but reserved it for "future use," leaving it unimplemented for 25 years. Coinbase redefined it as a trigger point for stablecoin micropayments, and in December 2025 announced the **x402 Foundation** with Cloudflare to promote open standardization.

> **Updated (2026)**: the x402 Foundation was subsequently placed under **Linux Foundation** governance (initially developed by Coinbase, Cloudflare, *and* Stripe), with founding-intent members including Adyen, AWS, American Express, Circle, Fiserv, Google, KakaoPay, Mastercard, Microsoft, Polygon Labs, Shopify, Solana Foundation, Stripe, and Visa. See [[concepts/x402-protocol]] and [[synthesis/agentic-payments-six-region]].

## Technical Flow

```
1. AI Agent sends HTTP request
2. Server returns 402 + { amount, currency, payTo, network }
3. Agent automatically sends USDC payment on-chain
4. Agent resends request with receipt (payment_receipt header)
5. Server verifies → resource unlocked
```

- **Settlement time**: < 2 seconds
- **Transaction fee**: ~$0.0001 USD per transaction
- **Supported chains**: Base, Polygon, Solana, Stellar, Algorand
- **Supported assets**: USDC (ERC-20 and chain equivalents)

## Industry Support

| Organization | Role |
|---|---|
| Coinbase | Protocol initiator; CDP facilitator service (first 1,000 transactions/month free) |
| Cloudflare | Co-founded x402 Foundation; pay-per-crawl integration |
| Google | Google Agentic Payments Protocol integrates x402 |
| Vercel | Platform support |
| AWS | Documentation promotion; agentic commerce explainer |
| Solana Foundation | Official x402 on Solana promotion |
| Stellar Foundation | x402 on Stellar integration |
| Algorand | x402 integration |
| Nous Research | Per-inference billing for Hermes 4 using x402 |

## Major Use Cases

### 1. API Pay-per-Call
No subscription or API key needed; AI agent automatically pays per API call. Developers can implement in just a few lines of code.

### 2. On-Demand Data Purchase
- Compliance agent purchases a one-time regulatory query
- Trading agent purchases a real-time market snapshot
- Financial research agent purchases a single paywalled article

### 3. AI Model Inference Billing
Nous Research implemented per-inference billing for the Hermes 4 LLM using x402 — the first real production case.

### 4. Content Micropayments
Agent automatically pays to read paywalled articles, images, and music, bypassing subscription walls.

### 5. Cloudflare Pay-per-Crawl
Cloudflare transforms bot access from "blocking problem" to "pricing mechanism": legitimate crawlers pay x402 to pass through, replacing traditional CAPTCHAs.

### 6. Agentic Marketplace
AI agents trade 24/7 automatically; both buyers and sellers are software programs — no human intervention required.

## Current Data (Early 2026)

- On Solana: 35M+ transactions, $10M+ transaction volume (summer 2025 to early 2026)
- Daily real transaction volume: approximately $28,000 (CoinDesk, 2026/03)
- Issue: most transaction volume is still test or wash trading; real agentic commerce demand has not yet exploded

> ⚠️ **Note**: Protocol infrastructure is mature, but commercial demand validation is still in early stages.

> **Updated (2026 Q2)**: by late April 2026, ~165M cumulative transactions, ~69,000 active agents, ~$50M cumulative on-chain volume; five named production deployments (Coinbase Agent.market, Stripe Machine Payments, CoinGecko, Circle Wallets, Cloudflare Agents SDK). A separate Nov 2025 "$600M payment volume" headline conflicts with the ~$50M on-chain figure — contradiction tracked on [[concepts/x402-protocol]] and [[synthesis/agentic-payments-six-region]].

## Market Size Projections

- McKinsey: agentic commerce will mediate $3–5 trillion in global commerce by 2030
- US B2C retail market: up to $1 trillion mediated by AI agents
- 2026 agentic commerce transaction volume: $8 billion; projected $3.5 trillion by 2031

## Related Concepts

- [[concepts/x402-protocol]] — Technical details and protocol specifications
- [[concepts/agentic-payments]] — Broad framework for autonomous AI agent payments
- [[concepts/agentic-payment-protocols]] — five-protocol comparison + regional architecture families
- [[synthesis/agentic-payments-six-region]] — six-region map + Linux-Foundation governance + 100-year thesis
- [[entities/coinbase]] — Protocol initiating organization
- [[concepts/xcm]] — Polkadot cross-chain messaging protocol (also in the M2M payment space)

## Sources

- [x402.org](https://www.x402.org/)
- [Coinbase Developer Docs](https://docs.cdp.coinbase.com/x402/welcome)
- [Cloudflare x402 Foundation Blog](https://blog.cloudflare.com/x402/)
- [AWS Agentic Commerce](https://aws.amazon.com/blogs/industries/x402-and-agentic-commerce-redefining-autonomous-payments-in-financial-services/)
- [Google x402 Integration](https://www.coinbase.com/developer-platform/discover/launches/google_x402)
- [CoinDesk Demand Status Report (2026/03)](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
