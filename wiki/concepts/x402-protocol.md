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

In December 2025, Coinbase and Cloudflare co-founded the **x402 Foundation** to maintain the open specification and prevent the protocol from being monopolized by a single company.

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

## Adoption Status (2026 Q1)

| Metric | Value | Notes |
|---|---|---|
| Cumulative payment count | 100M+ | 6 months (2025-06 to 2025-12) |
| Solana transactions | 35M+ / $10M+ | Mid-2025 to early 2026 |
| Daily real transaction volume | ~$28,000 | CoinDesk 2026-03; includes significant testing/wash activity |
| Cumulative buyers | 94,060 | eco.com data |
| Sellers | 22,000 | eco.com data |
| Developer community | 600+ | Telegram group |

**Note**: A CoinDesk (2026-03) investigation found that approximately half of observed x402 transactions were "gamified" activity (wash trading/testing), not genuine commercial demand. Real agentic commerce demand has yet to materialize.

## Limitations and Risks

- Real commercial demand is still being validated (2026/03 daily transaction volume only $28,000, partial wash trading)
- Holding large amounts of USDC requires wallet management infrastructure
- Agent wallet security (private key management) is a new challenge
- Regulatory uncertainty (stablecoin payment regulations)
- Intense competition: ACP / MPP / AP2 and other protocols compete for the same market, though with different positioning

## Related Pages

- [[concepts/agentic-payments]] — broader AI automated payment framework
- [[concepts/agentic-payment-protocols]] — full comparison of x402 vs ACP vs AP2 vs MPP vs L402
- [[sources/x402-protocol-coinbase-2025]] — detailed source material
- [[entities/coinbase]] — protocol originator
- [[entities/stripe]] — supports both x402 + MPP + ACP
- [[entities/visa]] — adds card payment layer to x402 via TAP
- [[concepts/xcm]] — Polkadot cross-chain messaging (related M2M automation domain)
