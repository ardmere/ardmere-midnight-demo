# Wave 3 demo archive

## Archived branch

| Branch | Contents |
| --- | --- |
| **`cursor/archive-wave3-signed-root-demo-0c01`** | Full snapshot of the Ardmere × Midnight Wave 3 "signed root + Schnorr `publishSnapshot` + `derivePublicKey` membership `attestInclusion`" demo, including deterministic fixtures, `.env` loading, Preprod faucet address derivation, and the hosted proof-server probe. |

**Merge lineage**: started from `cursor/wave3-demo-scaffold-fb9d`, went through the toolchain and reproducibility fixes on `cursor/demo-reproducible-fixtures-wallet-0c01`, and was frozen at the archive point.

## Purpose

- The hackathon **no longer** uses this demo as the submission target.
- The toolchain and Preprod configuration may be reused **read-only**; contract semantics are in `contract/por_snapshot.compact` and the archived branch README.
- Fixes (toolchain only) may be cherry-picked from the archived branch into this MVP branch; **do not** keep adding PoR features on the archive.

## What the archived demo proves

- The publisher's Schnorr commitment to `(snapshotId, reportRef, merkleRoot)`.
- A member can prove inclusion **without disclosing** the leaf and path.
- It does **not** prove solvency, external reserves, or equivalence between an exchange Merkle root and the Compact root.

## Current hackathon target

See [HACKATHON-MVP-SCOPE.md](./HACKATHON-MVP-SCOPE.md): **standardized single-batch Merkle Sum liability snapshot + solvency inequality + user inclusion self-check**.
