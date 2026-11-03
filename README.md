# Ardmere × Midnight Wave 3 demo

Apache-2.0 Compact contract and TypeScript scripts for the Midnight Buildathon
Wave 3 signed-root membership demo.

Design authority: Project docs `ardmere-midnight-whitepaper.md` and
`ardmere-midnight-wave3-plan.md` (not this README).

## What this proves (and does not)

After `publishSnapshot` succeeds on Preprod, the public ledger holds
`snapshotId`, `reportRef`, `merkleRoot`, and `published = true`, and the
circuit has checked a Jubjub Schnorr signature from the deploy-time
`publisherPk` over those three commitment fields.

After `attestInclusion` succeeds, the caller has proven knowledge of a private
Merkle path whose leaf equals `derivePublicKey(callerSecretKey)` and whose
recomputed root equals the published `merkleRoot`, using the same Compact
Merkle hash as the off-chain tree. Leaf and path are not disclosed.

This does **not** prove exchange solvency, reserve ≥ liability, OKX Plonky2
verification on Midnight, that the Compact root equals any exchange Merkle
root, TEE attestation, or that the signer is honest (oracle trust).

`reportRef` is only a SHA-256 digest of a public Ardmere report URL (context
pointer).

## Model

| Layer | Behavior |
| --- | --- |
| Off-chain | Depth-4 Compact-hash Merkle tree, **8 leaves**. Leaves derived via `derivePublicKey` (security-guide pattern — **not** `ownPublicKey`). |
| On-chain ledger | **Only** `publisherPk`, `snapshotId`, `reportRef`, `merkleRoot`, `published`. |
| Forbidden | Ledger `MerkleTree` ADT, `insert`, `checkRoot`. |
| `publishSnapshot` | Schnorr verify over `(snapshotId, reportRef, merkleRoot)`, write fields, set published. |
| `attestInclusion` | Require published; bind `path.leaf`; `merkleTreePathRoot`; assert equals published root. |

Demo failures (no successful txs): **outsider**, **wrong-leaf**.

## Pinned toolchain (Preprod / ledger-v8)

Pinned on first successful compile in this repo (2026-11-03):

| Component | Version |
| --- | --- |
| Compact toolchain (`compact compile`) | **0.31.1** |
| Compact language | **0.23** |
| `@midnight-ntwrk/compact-runtime` | **0.16.0** |
| `@midnight-ntwrk/compact-js` | **2.5.1** |
| `@midnight-ntwrk/midnight-js-*` | **4.1.1** |
| `@midnight-ntwrk/ledger-v8` | **8.1.0** |
| `@midnight-ntwrk/wallet-sdk` | **1.2.0** |
| Proof server (local Docker) | **8.1.3** (`midnightntwrk/proof-server:8.1.3`) |
| Node.js | **22** or **24** |

Do not use Compact 0.34+ / runtime 0.19–0.20 on Preprod (ledger-9; incompatible).

**Schnorr note:** Compact 0.31.1 stdlib does not export `jubjubSchnorrVerify` /
`JubjubSchnorrSignature` (those land on ledger-9 toolchains). This repo ships
`contract/schnorr.compact` — the same Fiat–Shamir Jubjub polyfill pattern used
by official zk-loan examples — so Preprod stays compatible while matching the
whitepaper’s verify-then-write intent.

**`merkleRoot` type:** Compact’s native Merkle digest is `MerkleTreeDigest`
(`{ field: Field }`), which is what `merkleTreePathRoot` returns. The ledger
stores that type (not a separate exchange `Bytes<32>` root).

## Layout

```
LICENSE
README.md
contract/
  por_snapshot.compact      # ledger + publishSnapshot + attestInclusion
  schnorr.compact           # Preprod Schnorr polyfill
  managed/                  # compact compile output (keys + JS)
src/
  keys.ts  tree.ts  sign.ts  publish.ts  attest.ts  read.ts
fixtures/
  tree.json  report-ref.json  vectors.json
test/
  encode.test.ts  inclusion.test.ts
```

## Install & compile

```bash
# Compact toolchain (once)
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
export PATH="$HOME/.local/bin:$PATH"
compact update 0.31.1

npm install
npm run compile
npm run generate:fixtures   # writes fixtures/ + secrets/demo-keys.json (gitignored)
npm test
```

## Demo commands (intended)

| Command | Expectation |
| --- | --- |
| `npm run read` | Print public fields (no proof / no DUST). Until deploy: prints fixtures. |
| `npm run attest -- member` | Success path (local sim today; Preprod tx after deploy). |
| `npm run attest -- outsider` | Assert fails; no successful tx. |
| `npm run attest -- wrong-leaf` | Assert fails; no successful tx. |
| `npm run publish` | Prep step only; blocked until Preprod deploy. |

## Preprod status

**Not deployed yet.** This environment has no Docker (cannot run proof-server
8.1.3), and faucet / DUST / Blockfrost wiring is not configured.

Faucet (document for operators): `https://faucet.preprod.midnight.network/`  
Proof server (when Docker is available):

```bash
docker run -p 6300:6300 -e MIDNIGHT_PROOF_SERVER_VERBOSE=true \
  midnightntwrk/proof-server:8.1.3
```

## reportRef

- URL: `https://ardmere.github.io/docs/reports/exchange-comparison.html`
- Digest: SHA-256(UTF-8 URL) → `fixtures/report-ref.json`
- Snapshot id (demo): UTF-8 `ardmere-midnight-wave3-demo-v1` padded to 32 bytes

## License

Apache-2.0. Midnight-related Compact and TypeScript in this repository are
Apache-2.0 per Wave 3 rules. Do not copy MIT site-repo Go/Solidity into this
tree.
