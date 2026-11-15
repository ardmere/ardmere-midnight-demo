# Trust boundary — three-asset signed NAV PoR (hackathon MVP)

This document states what the **64-leaf, three-asset MST + `submitSnapshot`**
MVP proves on Midnight, and what it does **not** prove.

## What the on-chain snapshot proves (when submitted)

Given a fixed batch of up to **64** users and three assets (BTC, ETH, USDT),
the circuit checks:

1. **MST root consistency** — the disclosed `mstRoot` equals the root
   recomputed inside the circuit from the private signed balances using the
   encoding in [`MST-ENCODING.md`](./MST-ENCODING.md).
2. **Canonical signed balances** — each asset per leaf is encoded as
   `(pos, neg)` with `pos == 0 || neg == 0`; net = `pos - neg`.
3. **Per-user NAV > 0** — at the operator-supplied public prices, every user's
   net asset value in micro-USDT is strictly positive. This is the check that
   allows a user to be short one asset while remaining solvent overall.
   A leaf whose six balances are all zero is treated as padding and exempt
   from the NAV check.
4. **Per-asset net exposure ≤ declared reserves** — for each asset,
   `posSum ≤ negSum + declaredReserves`.
5. **Authority** — the caller's Zswap coin public key
   (`ownPublicKey().bytes`) equals the `authorityPk` fixed at deploy time.
6. **Publication** — prices, reserves and gross sums are written to the
   public ledger after all checks pass, and `published` becomes `true`.

## What inclusion verification proves (off-chain CLI today)

`npm run verify-inclusion` checks that:

- the user's `(userIdHash, signed btc/eth/usdt)` hashes to the claimed leaf;
- 6 sibling nodes recompute the same MST root and net liabilities;
- the user's NAV at the published prices is positive.

It does **not** by itself prove the exchange told the truth about reserves,
prices, coverage or identities.

## What is NOT proved

| Claim | Status |
| --- | --- |
| Prices reflect the real market | **Not proved** — prices are public circuit inputs chosen by the operator |
| Real-world reserves match `declaredReserves` | **Not proved** — operator-chosen public numbers |
| Full exchange user base covered | **Not proved** — only one 64-user **batch** |
| `userIdHash` maps to a real customer | **Not proved** — opaque hash chosen off-chain |
| Honesty of internal ledgers / balances | **Not proved** |
| No duplicate or omitted users | **Not proved** |
| Cross-chain reserve attestations (OKX / Plonky2, Ethereum, etc.) | **Out of scope** |
| Equivalence to any external PoR root format | **Not claimed** |
| Individual balances hidden on-chain | Only **net = pos - neg** matters; gross sums and root are public, individual balances stay in witness |

## Operator responsibilities

- Choose `declaredReserves` and prices consistent with the disclosure policy.
  Both are public but **not cryptographically tied to external reality**.
- Build the MST honestly from internal books; a malicious operator can
  publish an arbitrary root with fabricated leaves and NAV-positive users.
- Protect the authority wallet: whoever controls `authorityPk` (the deployer's
  Zswap coin public key) can call `submitSnapshot` once; the contract has no
  key rotation or multi-sig.
- Protect witness material (full batch balances) when using a **hosted** proof
  server — prefer a local proof server for production-like privacy.

## Demo / hackathon caveats

- `submit-snapshot` is a **circuit simulation**; the real chain path is
  `npm run undeployed:deploy-submit` (testkit Docker).
- Inclusion is verified **off-chain**; there is no on-chain
  `attestInclusion` circuit in this MVP.
- **Wave 3** `por_snapshot` (signed membership tree) is archived and proves a
  different statement.
- **Preprod ledger-9 vs repo ledger-v8**: preprod submission still needs a
  toolchain upgrade.

## References

- Scope: [`HACKATHON-MVP-SCOPE.md`](./HACKATHON-MVP-SCOPE.md)
- Encoding: [`MST-ENCODING.md`](./MST-ENCODING.md)
- Archive: [`ARCHIVE.md`](./ARCHIVE.md)
