---
type: entity
tags: [coinbase, exchange, stablecoin, usdc, base, cdp, x402]
---

# Coinbase

## Basic Information

- **Type**: US-listed cryptocurrency exchange (NASDAQ: COIN)
- **Founded**: 2012, Brian Armstrong & Fred Ehrsam
- **Headquarters**: California, USA
- **Core business**: Cryptocurrency trading, custody, developer tools (CDP), Base L2

## Wiki-Relevant Projects

### x402 Protocol
In May 2025, Coinbase Developer Platform (CDP) released [[concepts/x402-protocol]], reviving the HTTP 402 status code as an automated payment standard for AI agents.

The protocol was formally contributed to the **Linux Foundation** — the **x402 Foundation** was launched **2026-04-02 at the MCP Dev Summit North America (New York)** — to keep the standard vendor-neutral and community-governed. Founding intent/support spans 20+ members across payments, cloud, and crypto: **AWS, American Express, Ant International, Google, Mastercard, Microsoft, Stripe, Visa, Circle, KakaoPay, Cloudflare, Adyen, Fiserv, Polygon, Shopify, Solana Foundation** ([Linux Foundation press](https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol), [CoinDesk 2026-04-02](https://www.coindesk.com/tech/2026/04/02/coinbase-s-ai-payments-system-joins-linux-foundation-gathers-support-from-google-stripe-aws-and-others)). That membership list *is* the six-region map in one table: US-incubated open protocol, with the China node ([[entities/ant-group-alipay|Ant International]]), Korea (KakaoPay), and Europe (Adyen) all buying in as settlement participants rather than standard-setters.

**Adoption (Chainalysis / on-chain, to Apr 2026):** ~**165M cumulative transactions**, ~**69K active AI agents**, ~**$50M** cumulative settled on Base; **95% of x402 value is now above $1** (up from 49% in early 2025) — evidence the rail is moving from dust-sized test traffic toward real commerce ([Chainalysis via TFTC](https://www.tftc.io/agentic-payments-x402-above-one-dollar-chainalysis/)). Coinbase is also building an **AI-agent app store / marketplace** on top of x402 and publicly exploring **facilitator fees as a new revenue stream** — the strategic reason a payments-neutral standard still benefits its incubator ([Cryptonews](https://cryptonews.com/news/coinbase-x402-ai-agent-app-store-crypto-payments/), [Tokenist](https://tokenist.com/coinbase-coin-linux-foundation-x402-protocol-revenue/)).

### Base
Ethereum L2 launched by Coinbase; one of the primary settlement chains for x402. USDC transaction fees for x402 on Base are approximately $0.0001 per transaction.

### USDC
Although USDC is issued by Circle, Coinbase is the primary distributor and promoter; USDC is the main denomination currency for x402.

### Coinbase Developer Platform (CDP)
Provides a hosted facilitator service for x402 (first 1,000 transactions per month free), simplifying developer integration.

## Historical lineage (why a crypto exchange defines the agent-payment rail)

- **2012** — founded as a retail Bitcoin brokerage (Brian Armstrong, Fred Ehrsam).
- **2018–2021** — pivots from pure exchange to *infrastructure*: USDC (with Circle, 2018), institutional custody, then **Base** L2 (2023).
- **2025** — ships [[concepts/x402-protocol]] (May): the exchange's distribution + a cheap USDC-on-Base settlement layer make it the natural home for a machine-payable HTTP standard.
- **2026** — cedes governance to the Linux Foundation while keeping the facilitator/marketplace economics.

The through-line: Coinbase's structural bet is that **the settlement layer for agent commerce is a stablecoin on a low-fee L2, not a card rail** — so it gives away the *protocol* to win the *facilitation*. This is the mirror image of the card networks ([[entities/visa]]/[[entities/mastercard]]), which keep their rail and add a trust layer on top, and of [[entities/ant-group-alipay|Ant]], which owns the graph and opens the protocol cross-border.

## Six-region positioning (台美日韓中國歐洲)

Coinbase is a **US "open-protocol" node** — the archetype for the [[synthesis/agentic-payments-six-region|six-region map]]'s finding that **the US leads on protocols while China leads on real volume**. x402 is the cleanest instance of the US strategy: publish an open, crypto-native standard and let the world settle on it. It is *complementary*, not competitive, with the bank-led sovereign-stablecoin approaches of Japan (JPYC), Korea (KakaoPay/won-stablecoins), and Europe (MiCA-regulated euro rails), and it stands opposite [[entities/ant-group-alipay|Ant/Alipay]]'s closed-domestic / open-cross-border model. Full regional detail lives in the synthesis — not duplicated here.

## Long-horizon note (scenario, not forecast)

On a 100-year view Coinbase is a bet that **value settlement becomes a permissionless internet primitive** the way packet routing did — the "TCP/IP of value" thesis it shares with [[concepts/x402-protocol]] and [[synthesis/agentic-payments-six-region]]'s machine-payer inversion. The bear case is the inverse: regulated bank/card rails ([[entities/visa]]/[[entities/mastercard]]) plus sovereign CBDC/stablecoins absorb agent payments, leaving crypto settlement a niche. Labelled as a structural fork, not a prediction.

## Related Pages

- [[concepts/x402-protocol]] — Payment protocol developed and led by Coinbase
- [[concepts/agentic-payments]] — Broader framework for autonomous AI payments
- [[concepts/agentic-payment-protocols]] — five-protocol comparison
- [[synthesis/agentic-payments-six-region]] — six-region map + Linux-Foundation governance + 100-year thesis
- [[sources/x402-protocol-coinbase-2025]] — Detailed source on x402
- [[entities/stripe]] · [[entities/visa]] · [[entities/mastercard]] — fellow x402 Foundation members
- [[entities/ant-group-alipay]] — the China node; closed-domestic / open-cross-border counterpart to Coinbase's open-protocol model
