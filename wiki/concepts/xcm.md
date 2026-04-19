---
type: concept
tags: [polkadot, interoperability, cross-chain, messaging]
---

# XCM (Cross-Consensus Messaging)

Polkadot's protocol for passing messages and transferring assets between parachains and the relay chain — the core interoperability layer of the ecosystem.

## What it enables

- Trustless asset transfers between parachains (e.g., DOT on relay chain → Hydration parachain)
- Cross-chain smart contract calls
- Any-to-any chain communication within the Polkadot security domain

## Practical example (per [[sources/polkasharks-ep1-polkadot-intro]])

[[entities/polkasharks]] demonstrated a live flow:
1. Collect MoonWell rewards on Moonbeam (EVM parachain)
2. Swap via StellaSwap
3. XCM transfer: Moonbeam EVM → Polkadot relay chain
4. XCM transfer: relay chain → Hydration
5. Convert to HDX, move to cold storage

All steps within the Polkadot security model — no trusted bridge required.

## Versions

- XCM V5 planned for 2025 (per [[sources/polkasharks-ep10-2024-annual]])

## Sources

- [[sources/polkasharks-ep1-polkadot-intro]] — practical demo
- [[sources/polkasharks-ep10-2024-annual]] — V5 roadmap

## Related

- [[entities/polkadot]]
- [[concepts/hydration-omnipool]] — common XCM destination
