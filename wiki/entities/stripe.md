---
type: entity
tags: [stripe, payments, fintech, agentic-commerce, mpp, acp, stablecoin]
---

# Stripe

## Basic Information

- **Type**: Private fintech company — valuation **~$159B** (Feb 2026 tender offer; up from ~$65B in 2024 and ~$91.5B early 2025) ([Stripe/press coverage 2026-02](https://www.investing.com/news/analyst-ratings/stripe-unveils-288-products-at-sessions-2026-focused-on-ai-commerce-93CH-4656455))
- **Founded**: 2010, Patrick Collison & John Collison
- **Headquarters**: South San Francisco, USA / Dublin, Ireland
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

On 2026-03-18, Stripe and **Tempo** (a payments-focused blockchain **co-developed by Stripe and Paradigm** — not merely an investee; corrects the earlier "startup Stripe invested in" framing) jointly released the **Machine Payments Protocol (MPP)** ([Forbes 2026-03-20](https://www.forbes.com/sites/jonmarkman/2026/03/20/stripes-ai-payments-protocol-signals-machine-to-machine-commerce-era/)).

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

Stripe is the only player participating in all three major protocols (ACP / MPP / x402) simultaneously, strategically attempting to control the payment infrastructure for agentic commerce regardless of which front-end protocol wins. Stripe is also a **co-developer of the x402 Foundation** alongside Coinbase and Cloudflare, now under Linux Foundation governance — reinforcing the protocol-agnostic settlement-backend strategy.

At **Stripe Sessions 2026** the company launched **~288 products**, most oriented to AI commerce, and consolidated its **Agentic Commerce Suite** into a five-layer stack: **MCP** (tool discovery) + **UCP** (universal checkout) + **ACP** (checkout interaction) + **MPP** (machine payments) + **x402** (crypto settlement), with **Tempo stablecoin micropayments** as the on-chain settlement option ([Investing.com 2026-02](https://www.investing.com/news/analyst-ratings/stripe-unveils-288-products-at-sessions-2026-focused-on-ai-commerce-93CH-4656455), [Stripe Sessions](https://stripe.com/sessions/2026)).

## Historical lineage (payments-primitives strategy)

- **2010** — founded on "seven lines of code" developer-first card acceptance (Patrick & John Collison).
- **2010s** — becomes the internet's default merchant-processing API; adds Billing, Connect (marketplaces), Radar (fraud), Issuing.
- **2024–2025** — stablecoin pivot: acquires **Bridge** (stablecoin infra, 2024) and **Privy** (wallets, 2025); co-develops **Tempo** with Paradigm.
- **2025–2026** — ships the agent-era primitives: **ACP** with OpenAI (Sep 2025), **Shared Payment Tokens**, **MPP** with Tempo (Mar 2026), x402 support.

The through-line: Stripe's structural bet is **own the primitive, stay neutral on the protocol** — it never picks a winner among ACP/MPP/x402 because it wants to be the settlement backend under *all* of them, the same way it became the card-acceptance layer under every e-commerce front end.

## Six-region positioning (台美日韓中國歐洲)

Stripe is a **US "open-protocol / neutral-backend" node**, structurally distinct from the card networks it sits beside on the [[synthesis/agentic-payments-six-region|six-region map]]. Its Dublin second-HQ and deep EU merchant base make it the most *Europe-native* of the US players — a bridge into the MiCA-regulated euro-stablecoin regime — while its Tempo/crypto rails compete cross-border with [[entities/ant-group-alipay|Ant International's]] open **AMP**. It originates *protocols and infrastructure* (the US pattern), not sovereign currency rails (the Japan/Korea/Europe/Taiwan bank-led pattern). Full regional detail in the synthesis — not duplicated here.

## Long-horizon note (scenario, not forecast)

On a 100-year view Stripe is a bet that **payment infrastructure stays a horizontal utility layer** beneath whatever settlement medium (card, fiat rail, stablecoin, CBDC) or front-end protocol wins — capturing basis points on machine-to-machine volume at a scale the [[concepts/agentic-payments|machine-payer inversion]] could push orders of magnitude above human commerce. The bear case: settlement disintermediates to a permissionless rail ([[concepts/x402-protocol]]) where a neutral processor earns nothing, or sovereign rails internalise it. Labelled as a structural fork, not a prediction.

## Related Pages

- [[concepts/agentic-payment-protocols]] — Full comparison of the five major protocols
- [[concepts/agentic-payments]] — Framework for autonomous AI agent payments
- [[concepts/x402-protocol]] — Coinbase's HTTP-native payment standard
- [[synthesis/agentic-payments-six-region]] — six-region map + Linux-Foundation governance + 100-year thesis
- [[entities/coinbase]] · [[entities/visa]] · [[entities/mastercard]] — fellow x402 Foundation members
- [[entities/ant-group-alipay]] — China node; Ant International's open AMP is the cross-border competitor to Stripe's Tempo/MPP rails
