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

Pinned on first successful compile in this repo (2026-11-03); hosted proof
probe 2026-11-04:

| Component | Version |
| --- | --- |
| Compact toolchain (`compact compile`) | **0.31.1** |
| Compact language | **0.23** |
| `@midnight-ntwrk/compact-runtime` | **0.16.0** |
| `@midnight-ntwrk/compact-js` | **2.5.1** |
| `@midnight-ntwrk/midnight-js-*` | **4.1.1** |
| `@midnight-ntwrk/ledger-v8` | **8.1.0** |
| `@midnight-ntwrk/wallet-sdk` | **1.2.0** |
| Proof server (hosted Preprod default) | **`https://proof-server.preprod.midnight.network`** (reports `/version` **8.1.0**, proof **V2**) |
| Proof server (optional local Docker) | **8.1.3** (`midnightntwrk/proof-server:8.1.3`) |
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

## Proof server (hosted, no local Docker)

Default `MIDNIGHT_PROOF_SERVER_URL` is Midnight’s hosted Preprod endpoint:

```text
https://proof-server.preprod.midnight.network
```

Wire-up: `httpClientProofProvider(url, NodeZkConfigProvider(zkConfigPath))` in
`src/providers.ts`. Health check: `npm run proof:health`.

### Privacy caveat

The proof server sees **witness / private proving inputs in the clear** (no
TLS client auth; request bodies include circuit private data). Midnight’s own
docs recommend a **local** proof server for that reason. This demo defaults to
the **hosted** Preprod server so Wave 3 work can proceed **without Docker**.
That is a deliberate hackathon/demo tradeoff — **do not** treat hosted proving
as a privacy-preserving production setup. Override to local anytime:

```bash
export MIDNIGHT_PROOF_SERVER_URL=http://127.0.0.1:6300
docker run -p 127.0.0.1:6300:6300 midnightntwrk/proof-server:8.1.3
```

## Layout

```
LICENSE
README.md
.env.example
contract/
  por_snapshot.compact      # ledger + publishSnapshot + attestInclusion
  schnorr.compact           # Preprod Schnorr polyfill
  managed/                  # compact compile output (keys + JS)
src/
  config.ts providers.ts proofHealth.ts
  keys.ts tree.ts sign.ts publish.ts attest.ts read.ts wallet.ts demoKeys.ts
fixtures/
  tree.json report-ref.json vectors.json
test/
  encode.test.ts inclusion.test.ts proof-config.test.ts wallet.test.ts
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
npm run generate:fixtures   # deterministic; also writes secrets/demo-keys.json
npm test
npm run proof:health        # probes hosted proof-server (no Docker)
```

`generate:fixtures` is deterministic: demo keys are derived from a fixed
label, so fixtures never churn and a fresh clone can run `npm test` and the
`attest` demo without any gitignored secrets file.

## Demo commands

Verified locally on Node 22.23.4 against Compact 0.31.1:

| Command | Expectation |
| --- | --- |
| `npm run proof:health` | Hosted proof-server `/health` ok, version `8.1.0`, proof `V2` |
| `npm run read` | Public fields (no proof / no DUST). Fixtures until deploy. |
| `npm run attest -- member` | Local circuit success; Preprod tx when secrets exist |
| `npm run attest -- outsider` | Assert fails; no successful tx |
| `npm run attest -- wrong-leaf` | Assert fails; no successful tx |
| `npm run publish` | Prep; lists missing secrets if any; does not invent keys |
| `npm run wallet:address -- --generate-seed` | Offline Preprod `mn_addr_preprod1…` address for the faucet |

## Secrets required for Preprod deploy (operator-supplied)

Copy `.env.example` → `.env`. Scripts **do not invent** wallet keys.

| Env | Purpose |
| --- | --- |
| `BLOCKFROST_PROJECT_ID` | Preprod indexer + node RPC (Blockfrost). Retired Midnight-hosted RPC/indexer. |
| `MIDNIGHT_WALLET_SEED` **or** `MIDNIGHT_WALLET_MNEMONIC` | Exactly one. Fund via faucet; wait for DUST. |
| `PRIVATE_STATE_PASSWORD` | ≥16 chars for midnight-js private-state store |
| `CONTRACT_ADDRESS` | After deploy, for publish/attest/read |
| `MIDNIGHT_PROOF_SERVER_URL` | Optional; default hosted Preprod URL above |

Faucet: `https://midnight-tmnight-preprod.nethermind.dev/` (also reachable at
`https://faucet.preprod.midnight.network/`)

### Faucet and DUST checklist

Findings from the 2026-11-06 local run:

- The faucet accepts **only** an unshielded `mn_addr_preprod1…` address, and
  each request sends 5,000 tNIGHT. Shielded and DUST addresses are rejected.
- `POST /api/drips` enforces **Cloudflare Turnstile** (`X-Captcha-Token`):
  without a solved challenge it answers `403 Captcha verification failed`.
  The claim therefore **cannot be automated unattended** — a human must solve
  the challenge in a browser.
- Get the address to paste with `npm run wallet:address --silent` (add
  `-- --generate-seed` once to create a seed under `secrets/`). This is
  offline and spends nothing.
- Holding tNIGHT generates no DUST on its own: the tNIGHT must be
  **registered** for tDUST generation, and DUST accrues over time (roughly a
  week to refill a full cap). A wallet right after the faucet drip has no DUST
  yet and cannot pay fees.
- Blockfrost is still mandatory: the Midnight-hosted Preprod indexer/RPC were
  retired on 2026-10-09 and now answer `410 ENDPOINT_DECOMMISSIONED`.

**Preprod status:** contract **not deployed** in this environment. Hosted
proof-server is reachable; Blockfrost token + wallet seed/mnemonic + DUST are
still required from the operator before a real publish tx.

Known gap: this tree has **no deploy or wallet-sync implementation** yet.
`src/publish.ts` builds the payload and provider stack but never submits, and
`createProofStack` returns `publicDataProvider: null` without Blockfrost. A
real Preprod run needs a `deployContract`/`callTx` path plus a synced wallet
before the on-chain demo can be claimed.

## reportRef

- URL: `https://ardmere.github.io/docs/reports/exchange-comparison.html`
- Digest: SHA-256(UTF-8 URL) → `fixtures/report-ref.json`
- Snapshot id (demo): UTF-8 `ardmere-midnight-wave3-demo-v1` padded to 32 bytes

## License

Apache-2.0. Midnight-related Compact and TypeScript in this repository are
Apache-2.0 per Wave 3 rules. Do not copy MIT site-repo Go/Solidity into this
tree.
