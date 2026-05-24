---
type: entity
tags: [stripe, payments, fintech, agentic-commerce, mpp, acp, stablecoin]
---

# Stripe

## Basic Information

- **Type**: Private fintech company (valuation ~$65B USD, 2024)
- **Founded**: 2010, Patrick Collison & John Collison
- **Headquarters**: San Francisco, USA / Dublin, Ireland
- **Core business**: Internet payment infrastructure; developer-friendly APIs; global merchant payment processing

## Projects Related to Agentic Payments

### ACP — Agentic Commerce Protocol (co-maintained)

On 2025-09-29, Stripe and OpenAI jointly released the **Agentic Commerce Protocol (ACP)**, an Apache 2.0 open-source specification.

ACP defines the checkout interaction model between AI agents and merchants:
- **Four RESTful endpoints**: Create / Update / Complete / Cancel Checkout
- Supports physical goods, digital goods, subscriptions, and asynchronous shopping
- Can be implemented as a RESTful interface or MCP server
- Already supported: ChatGPT Instant Checkout (2026-02), Etsy, Shopify with millions of merchants onboarding

**Version evolution** (2025-09 → 2026-01): capability negotiation → discounts → Payment Handlers

### MPP — Machine Payments Protocol (co-author)

On 2026-03-18, Stripe and Tempo (a crypto payments startup Stripe invested in) jointly released the **Machine Payments Protocol (MPP)**.

MPP also revives HTTP 402, with the core innovation being **Session Pre-authorization**:
- An agent pre-authorizes a spending limit once; subsequent micropayments stream continuously within the session
- Supports: stablecoin (Tempo chain), fiat currency (Stripe), Bitcoin (Lightspark extension), Visa card
- Launched on mainnet with 100+ services integrated (Browserbase, PostalForm, etc.)

### Agentic Commerce Suite

Stripe's complete agentic commerce solution, including:
- **Shared Payment Tokens (SPT)**: agents securely pass buyer payment credentials with seller-specific scope, amount/time limits
- ACP integration
- MCP integration
- Fraud protection, refunds, tax calculations

**Integrated brands** (early 2026): Coach, Kate Spade, URBN (Anthropologie / Free People / Urban Outfitters), Revolve, Ashley Furniture; platforms: Squarespace, Wix, Etsy, WooCommerce, BigCommerce, commercetools

### x402 Support

Stripe also announced support for the x402 protocol, making its payment infrastructure a protocol-agnostic settlement backend.

## Positioning in the Agentic Payments Ecosystem

Stripe is the only player participating in all three major protocols (ACP / MPP / x402) simultaneously, strategically attempting to control the payment infrastructure for agentic commerce regardless of which front-end protocol wins.

## Related Pages

- [[concepts/agentic-payment-protocols]] — Full comparison of the five major protocols
- [[concepts/agentic-payments]] — Framework for autonomous AI agent payments
- [[concepts/x402-protocol]] — Coinbase's HTTP-native payment standard
