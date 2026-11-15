# Standardized Midnight PoR — Hackathon MVP

This repository (`main`) is the Midnight Buildathon Wave 3 submission target.
The main [README](README.md) covers setup, architecture and the reference run;
this file is the short hackathon index.

| Document | Purpose |
| --- | --- |
| [README.md](README.md) | Setup, architecture, reference run, trust boundary |
| [docs/HACKATHON-MVP-SCOPE.md](docs/HACKATHON-MVP-SCOPE.md) | Minimum scope, IN/OUT, acceptance checklist |
| [docs/PROGRESS-WAVE3.md](docs/PROGRESS-WAVE3.md) | What changed during Wave 3 |
| [docs/ARCHIVE.md](docs/ARCHIVE.md) | Archived Wave 3 membership demo (not the submission target) |

## Goal

A single fixed-size batch of a **64-leaf, BTC/ETH/USDT three-asset Merkle Sum
Tree**. Per-asset balances may be negative (canonical `(pos, neg)` encoding); the
circuit checks each user's **NAV > 0** at public prices and each asset's **net
exposure ≤ declared reserves**, then publishes the on-chain snapshot. Users can
verify inclusion off-chain. It does **not** prove external reserves or real
prices.

## Commands (local MVP / no Preprod DUST)

| Command | Description |
| --- | --- |
| `npm test` | MST + `standard_por` local sim + archived Wave 3 regression |
| `npm run compile:mst` | Compile the MST pure circuits (needs Compact **0.31.1**) |
| `npm run compile:standard-por` | Compile `submitSnapshot` (prover ~291 MB, generated locally) |
| `npm run generate:mst-fixtures` | Rewrite `fixtures/mst-batch.json` and `fixtures/snapshot-vectors.json` |
| `npm run build-mst` | Print `mstRoot`, net liabilities and gross sums |
| `npm run submit-snapshot` | Local sim + proof-server health (`--dry-run`) |
| `npm run verify-inclusion` | Verify the sample in `fixtures/snapshot-vectors.json` |
| `npm run read:por` | Print simulated public ledger fields (fixtures) |
| `npm run undeployed:deploy-submit` | Deploy to **undeployed** and submit one `submitSnapshot` (see [docs/UNDEPLOYED.md](docs/UNDEPLOYED.md)) |

Trust boundary: [docs/TRUST-BOUNDARY.md](docs/TRUST-BOUNDARY.md) · Encoding: [docs/MST-ENCODING.md](docs/MST-ENCODING.md)

### 3-minute demo (local)

```bash
npm run build-mst
npm run submit-snapshot
npm run verify-inclusion
```
