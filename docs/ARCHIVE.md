# Archived Wave 3 membership demo

The earlier Ardmere × Midnight Wave 3 "signed root + membership" demo is kept
**in-tree for regression tests only**. It is not the hackathon submission
target.

## Where the code lives

| Path | Contents |
| --- | --- |
| `contract/por_snapshot.compact` | Signed-root membership snapshot (8 leaves, depth 4) |
| `contract/schnorr.compact` | Jubjub Schnorr polyfill used by the archived contract |
| `src/attest.ts`, `src/localSim.ts`, `src/keys.ts`, `src/sign.ts` | Local simulation and demo commands |
| `fixtures/tree.json`, `fixtures/vectors.json` | Deterministic archived fixtures |
| `test/inclusion.test.ts`, `test/encode.test.ts` | Regression coverage |

The old `cursor/archive-wave3-signed-root-demo-0c01` branch was removed when the
repository history was reset to a single clean commit; the code above is the
reference copy.

## What the archived demo proves

- the publisher's Schnorr commitment to `(snapshotId, reportRef, merkleRoot)`;
- a member can prove inclusion without disclosing the leaf and path;
- it does **not** prove solvency, external reserves, or equivalence between an
  exchange Merkle root and the Compact root.

## Current hackathon target

See [HACKATHON-MVP-SCOPE.md](./HACKATHON-MVP-SCOPE.md): a standardized
single-batch, three-asset signed Merkle Sum liability snapshot with per-user NAV
and per-asset net-exposure checks.
