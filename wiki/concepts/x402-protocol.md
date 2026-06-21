---
type: concept
tags: [x402, http, payments, protocol, stablecoin, usdc, open-standard]
---

# x402 Protocol

## Definition

**x402** is an open, internet-native payment protocol released by [[entities/coinbase]] in May 2025, reviving the HTTP `402 Payment Required` status code to serve as a trigger mechanism for machine-to-machine (M2M) automated micropayments.

Core idea: **Any HTTP endpoint can require payment, and any HTTP client can pay automatically — with no human intervention required.**

## Technical Specifications

### Standard Exchange Flow

```http
→ GET /api/data
← 402 Payment Required
  X-Payment-Required: { amount: "0.01", currency: "USDC", network: "base", payTo: "0x..." }

→ GET /api/data
  X-Payment: <signed_payment_receipt>
← 200 OK
  { data: ... }
```

### Core Parameters

| Parameter | Description |
|---|---|
| `amount` | Required amount (typically $0.0001–$1) |
| `currency` | Payment currency (primarily USDC) |
| `network` | Chain (Base / Polygon / Solana / Stellar / Algorand) |
| `payTo` | Recipient address |
| `X-Payment` | Signed receipt header after payment is completed |

### Performance

- Settlement time: < 2 seconds
- Per-transaction fee: ~$0.0001 USD
- Coinbase CDP facilitator: first 1,000 transactions/month free

## V2 Upgrade (2025-12-11)

> ⚠️ **Update**: V1 technical details have been partially superseded by V2; see description below.

x402 V2 is a major version upgrade with core changes:

| Aspect | V1 | V2 |
|---|---|---|
| Data transfer | body-based | **header-based** |
| Session support | None | ✅ No repeated handshake after initial payment |
| Token support | Primarily USDC | **Any ERC-20** (Permit2 + Gas Sponsorship) |
| Standard alignment | Custom | CAIP chain/asset identifiers; IETF header conventions |
| SDK architecture | Monolithic | Modular plugins (extensible chains/assets/payment schemes) |
| Traditional payments | None | ACH / SEPA / card via facilitator |

**V2 Session support**: wallet-based identity; after the first payment establishes a session, subsequent requests skip repeated payment handshakes, supporting subscription models and long-running agent workflows. Coming soon: Sign-In-With-X (SIWx) header (based on CAIP-122).

**Adoption data (2025-12)**: 6-month cumulative total of **over 100 million payments**; 600+ developer Telegram community; SDK supports Node.js / Python / Go.

## Governance

In December 2025, Coinbase and Cloudflare announced the **x402 Foundation** to maintain the open specification and prevent the protocol from being monopolized by a single company.

> **Updated (2026)**: the Foundation was placed under **Linux Foundation** governance to keep the standard vendor-neutral. It was initially developed by **Coinbase, Cloudflare, and Stripe**, and its founding-intent membership already spans most regions of [[synthesis/agentic-payments-six-region]]: Adyen, AWS, American Express, Ampersend.ai, Base, Circle, Fiserv, Google, **KakaoPay**, Mastercard, Microsoft, Polygon Labs, PPRO, Shopify, Sierra, Solana Foundation, Stripe, thirdweb, and Visa ([Linux Foundation press, 2025](https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol); [Decrypt](https://decrypt.co/363173/coinbase-linux-foundation-launch-x402-foundation)). China and Taiwan are the conspicuous absentees from the membership list.

## Supported Ecosystem

- **Infrastructure**: Coinbase CDP, Cloudflare Workers, Vercel
- **Chains (V2)**: Base, Solana, any EVM L2 (via modular SDK); Polygon / Stellar / Algorand (V1 legacy)
- **Traditional payments**: ACH / SEPA / card via facilitator (new in V2)
- **Integrations**: Google AP2 (x402 as official crypto extension), Stripe (supports both x402 + MPP), Visa TAP (card payment layer), AWS, Nous Research, World AgentKit (2026-03)

## Comparison with Existing Payment Methods

| Item | Traditional API Key | Stripe/Subscription | x402 |
|---|---|---|---|
| Account required | Yes | Yes | No |
| Manual setup | Yes | Yes | No |
| Granularity | Session/month | Monthly | Per request |
| Machine automation | Partial | No | Full |
| Settlement speed | T+1~T+3 | Instant (but intermediated) | < 2 second on-chain finality |
| Fee | 3% | 2.9%+$0.30 | ~$0.0001 |

## Adoption Status (2026 Q2 — Chainalysis June 2026 data)

| Metric | Value | Notes |
|---|---|---|
| Cumulative transaction count | **140M+** | Chainalysis, June 2026 ([Crowdfund Insider](https://www.crowdfundinsider.com/2026/06/283501-chainalysis-shares-insights-on-agentic-payments-reaching-key-milestone-x402-protocol-shows-signs-of-traction-on-base/)) |
| Base chain | **119M+ txns / ~$35M** value | Base dominates cumulative txn count ([Chainalysis](https://www.chainalysis.com/blog/x402-agentic-payments-adoption/)) |
| Solana | 35M+ txns / $10M+ | since x402-on-Solana launch summer 2025 |
| Cumulative on-chain settled volume | **~$45–50M** | Base $35M + Solana $10M; the conservative settled figure |
| Headline/notional volume | **"$600M+"** | facilitator-quoted/notional, not settled on-chain (see contradiction note) |
| Share of txns valued ≥ $1 | **95%** (up from 49% in early 2025) | Chainalysis June 2026 — *the* signal that wash/test activity is receding |
| Daily real transaction volume | ~$28,000 | CoinDesk 2026-03 baseline; ~131K txns/day, avg ~$0.20 |
| Single-day peak (Feb 2026) | 3.8M txns / ~$2M | burst activity, not sustained |
| Active agents | ~69,000 | late April 2026 |
| Developer community | 600+ | Telegram group |

**Named production deployments (April 2026):** Coinbase Agent.market, Stripe Machine Payments, CoinGecko paid endpoints, Circle Wallets reference workflow, Cloudflare Agents SDK.

> **Contradiction — now explained (updated 2026-06-21)**: the long-flagged conflict between the **"$600M cumulative volume"** headline and the **~$50M on-chain settled** figure is reconciled by Chainalysis's June-2026 breakdown: settled on-chain value across the two main chains is **Base ~$35M + Solana ~$10M ≈ $45M**, while the "$600M+" is a facilitator-quoted/notional aggregate. Treat **~$45–50M as the conservative settled number** and "$600M" as notional throughput. The discrepancy is therefore one of *definition*, not of bad data. Tracked in [[synthesis/agentic-payments-six-region]].

**Note (wash-trading, updated)**: A CoinDesk (2026-03) investigation found ~half of observed x402 transactions were "gamified" (wash/testing) rather than genuine commercial demand. The **Chainalysis June-2026 figure that 95% of transactions are now ≥ $1 (up from 49% in early 2025)** is the first quantitative sign that real, sub-dollar-filtered usage is displacing test traffic — though absolute volume remains small versus China's [[entities/ant-group-alipay|Alipay AI Pay]] (~300M cumulative txns). Consistent with the 25-year micropayment-failure lineage analysed in [[synthesis/agentic-payments-six-region]].

## Limitations and Risks

- Real commercial demand is still being validated (2026/03 daily transaction volume only $28,000, partial wash trading)
- Holding large amounts of USDC requires wallet management infrastructure
- Agent wallet security (private key management) is a new challenge
- Regulatory uncertainty (stablecoin payment regulations)
- Intense competition: ACP / MPP / AP2 and other protocols compete for the same market, though with different positioning

## Related Pages

- [[synthesis/agentic-payments-six-region]] — six-region map, Linux-Foundation governance, $600M↔$50M contradiction, 100-year micropayment thesis
- [[concepts/agentic-payments]] — broader AI automated payment framework
- [[concepts/agentic-payment-protocols]] — full comparison of x402 vs ACP vs AP2 vs MPP vs L402
- [[sources/x402-protocol-coinbase-2025]] — detailed source material
- [[entities/coinbase]] — protocol originator
- [[entities/stripe]] — co-developer; supports x402 + MPP + ACP
- [[entities/visa]] — adds card payment layer to x402 via TAP
- [[entities/mastercard]] — x402 Foundation member; Agent Pay / Verifiable Intent
- [[entities/ant-group-alipay]] — China's Alipay AI Pay; the closed-super-app counterpart that x402 competes against on real volume
- [[concepts/xcm]] — Polkadot cross-chain messaging (related M2M automation domain)
