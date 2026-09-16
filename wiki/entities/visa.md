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

### Intelligent Commerce Connect (launched 2026-04) — the protocol-agnostic aggregation layer

**Dating correction (2026-09-16):** an earlier version of this page dated Intelligent Commerce Connect to "2025-10." That conflated two things — **Visa Intelligent Commerce (VIC)**, the broad initiative launched *2025*, and **Intelligent Commerce Connect (ICC)**, a distinct *product* unveiled **April 2026** (2026-04-08). Corrected here per multiple corroborating trade reports ([The Paypers, 2026-04](https://thepaypers.com/payments/news/visa-launches-intelligent-commerce-connect-for-agentic-payments); [TechAfrica, 2026-04-20](https://techafricanews.com/2026/04/20/visa-bridges-the-gap-to-agentic-commerce-with-intelligent-commerce-connect/)).

ICC is a **network-, protocol-, and token-vault-agnostic "on-ramp"** to agentic commerce: through a **single Visa Acceptance Platform integration**, agent builders / merchants / enablers get secure payment initiation, tokenization, spend controls, and authentication — and, critically, **acceptance of payments initiated through multiple rival agent protocols at once: Trusted Agent Protocol (TAP), Machine Payments Protocol (MPP), Agentic Commerce Protocol (ACP), and Universal Commerce Protocol (UCP)**. Agents can pay with both Visa *and non-Visa* cards. As of launch it is **in pilot** with Aldar, AWS, Diddo, Highnote, Mesh, Payabli, and Sumvin, with broader availability across 2026. Strategically, ICC is Visa's bet that as the [[concepts/agentic-payment-protocols|protocol layer proliferates]], the durable position is not owning one protocol but being the **aggregation/interop on-ramp that makes the protocol choice invisible to the merchant** — the payments-layer instance of the "commoditize the rail, own the layer above it" pattern (see the convergence dimension in [[synthesis/agentic-payments-six-region]]).

### Visa × OpenAI ChatGPT integration (2026-06-10)

Visa **plugged its payment network directly into OpenAI's ChatGPT** on **2026-06-10**, letting AI agents inside ChatGPT complete purchases at *any Visa-accepting merchant*. Mechanism: developers/merchants accept agent-initiated Visa payments using **tokenized Visa credentials**, with **real-time authorization and fraud monitoring**, and each transaction **bound by user-set spending limits, merchant categories, and approvals** — the consumer-distribution complement to the merchant-side TAP framework ([Digital Commerce 360, 2026-06-12](https://www.digitalcommerce360.com/2026/06/12/visa-openai-agent-led-payments/)). Strategically this is Visa's answer to the distribution question the open protocols cannot easily solve — it reaches agent users *where they already are* (ChatGPT's installed base) rather than waiting for a permissionless agent web to form.

**Same-day symmetry with Mastercard.** On the *same date* (2026-06-10) [[entities/mastercard]] launched **Agent Pay for Machines (AP4M)** for pure M2M settlement. The two US card networks crossed into agent-native payments in lockstep — a signal that the incumbent rail is moving as a bloc into the [[synthesis/agentic-payments-six-region|agentic-payments]] layer, not lagging it. Where Mastercard's same-day move was *machine-to-machine* (AP4M), Visa's was *consumer-agent distribution* (ChatGPT) — the two incumbents splitting the agent-payment surface between the human-facing and machine-facing halves.

## Comparison with Mastercard

| Dimension | Visa (TAP / VIC) | Mastercard (Agent Pay) |
|---|---|---|
| Launch date | 2025-10 (TAP) | 2025-04 (Agent Pay) |
| Trust mechanism | RFC 9421 HTTP signing | SD-JWT Verifiable Intent |
| Token management | Within VIC framework | Agentic Token (per-agent issuance) |
| Open standards | RFC 9421 | FIDO / EMVCo / W3C / IETF |
| Co-development partner | Cloudflare | Google |

Visa is also a member of the **x402 Foundation** (under Linux Foundation governance), giving its card network a settlement role across the open agentic-payment standard.

## Historical lineage (the rail is 67 years old; the trust layer is new)

- **1958** — **BankAmericard** launched by Bank of America (Fresno "drop"); the first successful general-purpose consumer credit card.
- **1976** — rebranded **Visa**; **1970** the bank consortium (later Visa Inc.) formalises the four-party network model.
- **2008** — IPO (NYSE: V), then the largest US IPO to date; the network becomes a pure toll-taker on ~$13T+ annual payments volume.
- **2025–2026** — **Visa Intelligent Commerce** + **TAP** (RFC 9421) + **Intelligent Commerce Connect** + **Visa×OpenAI ChatGPT** (2026-06-10): rather than replace the rail, Visa adds an **agent-authentication + trusted-checkout layer** on top of it, then distributes it directly into the largest agent user base.

The through-line: Visa's structural bet is **the four-party card network survives the agent era by becoming the trust/identity layer for agents** — the rail stays, the agent proves it is a legitimate delegate (not a bot) via signed intent. This is the opposite of [[entities/coinbase]]'s "replace the rail with a stablecoin" bet and the near-twin of [[entities/mastercard]]'s Agent Pay.

## Six-region positioning (台美日韓中國歐洲)

Visa is a **US "incumbent-rail + trust-layer" node** on the [[synthesis/agentic-payments-six-region|six-region map]]. Its structural advantage is the one thing the open protocols lack: a **global acceptance footprint and issuer/bank relationships in every region**, which is why it appears as a *settlement participant* inside x402, MPP, and (via TAP) merchant-side checkout everywhere. It competes most directly with [[entities/ant-group-alipay|Alipay/Ant]] in Asia — where the card rail is weakest against the super-app wallet — and interoperates with, rather than originates, the sovereign-stablecoin rails of Japan/Korea/Europe. It sets a *US-origin de-facto standard* (RFC 9421 signing) the way the six-region map's US column describes. Full regional detail in the synthesis — not duplicated here.

## Long-horizon note (scenario, not forecast)

On a 100-year view Visa is a bet that **trust and dispute-resolution, not settlement rails, are the durable moat** — that agents will still need a credentialing/chargeback authority even if the money moves over stablecoins or CBDCs, and Visa becomes that authority-of-record. The bear case is the [[concepts/agentic-payments|machine-payer inversion]] plus permissionless settlement ([[concepts/x402-protocol]]) routing around the interchange model entirely, collapsing the toll. Labelled as a structural fork, not a prediction.

## Related Pages

- [[concepts/agentic-payment-protocols]] — Full comparison of five major protocols (including Visa's position)
- [[concepts/agentic-payments]] — AI agent autonomous payment framework
- [[synthesis/agentic-payments-six-region]] — six-region map + Linux-Foundation governance
- [[entities/mastercard]] — Competitor's Agent Pay strategy (the near-twin incumbent-rail + trust-layer bet)
- [[entities/stripe]] — MPP partner (Visa supports MPP)
- [[entities/coinbase]] — fellow x402 Foundation member; the "replace the rail" counter-strategy
- [[entities/ant-group-alipay]] — China node; Visa's sharpest regional competitor where the card rail is weakest
- [[concepts/x402-protocol]] — Visa provides the card payment layer in the x402 ecosystem
