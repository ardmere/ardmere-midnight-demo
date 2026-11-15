# Wave 3 progress — Standardized Midnight PoR

This note records the progress made during the Midnight Buildathon Wave 3
relative to the archived Wave 3 membership demo and the initial single-asset MST
scaffold.

## What changed

### 1. Three assets with signed balances

- The batch now covers **BTC / ETH / USDT** in one tree.
- A user's per-asset balance may be **negative**; each balance is encoded
  canonically as `(pos, neg)` with `net = pos - neg` and `pos == 0 || neg == 0`.
- MST nodes carry six `Uint<128>` gross sums (positive/negative per asset), so 64
  `Uint<64>` leaves cannot overflow.
- New leaf and parent domains: `ardmere:mst:leaf:v3` / `ardmere:mst:parent:v3`.

### 2. Per-user NAV > 0 at public prices

- Prices (`priceBtc`, `priceEth`, `priceUsdt`, micro-USDT per smallest unit) are
  **public circuit inputs** and are written to the ledger.
- For every active leaf the circuit checks
  `Σ(pos_i * price_i) > Σ(neg_i * price_i)`.
- Prices are bounded to `0 < price <= 1e12` to keep the `Uint<128>` arithmetic
  safe.
- All-zero leaves used for padding are exempt from the NAV check.

### 3. Authority-gated publication

- `authorityPk` is the deploying wallet's Zswap coin public key (`Bytes<32>`).
- `submitSnapshot` asserts `ownPublicKey().bytes == authorityPk`.
- Negative test: a different caller coin key is rejected.

### 4. Per-asset reserve check

For each asset the circuit asserts `posSum <= negSum + declaredReserves`, i.e.
net exposure must not exceed the operator's declared reserves. Negative net
exposure passes trivially.

### 5. End-to-end local chain run

- Added a testkit `compose.yml` (proof-server 8.1.3, indexer 4.0.1,
  midnight-node 0.22.5) with version defaults.
- Fixed the ESM/CJS loader mismatch in `standardPorCompiled.ts` so compact-js
  and the compiled contract share one `compact-runtime` WASM instance.
- Deployed `standard_por` and submitted one snapshot on **undeployed**:

| Field | Value |
| --- | --- |
| Contract | `301f868d9e836d46e81f6024c82136ace360b504976522eb0b945550b877d117` |
| `submitSnapshot` tx | `5a5b879b942fdcdf08730a135d3793380188c180e2279bb4f42ff43c7e430344` |
| Block height | 32 |
| MST root | `115b66282ea7e65b206336935bdfbc1ad5f72de1a186a126897defffdabd34a2` |
| Prices (micro-USDT) | BTC 600 / ETH 30 / USDT 1 |
| Net liabilities | BTC 117,000,000 / ETH 497,500,000 / USDT 248,000,000,000 |
| Declared reserves | BTC 137,000,000 / ETH 547,500,000 / USDT 268,000,000,000 |

The local chain is ephemeral; the values above come from the recorded run output
in `fixtures/undeployed-last-run.json`.

### 6. Circuit size and performance

- `submitSnapshot` is **k=20, 886,226 rows**.
- Prover key is about **291 MB** and is gitignored; run
  `npm run compile:standard-por` to regenerate it.
- A local proof takes about **2 minutes**; the testkit proof server needs a
  **16 GB** Docker VM (8 GB is OOM-killed).

### 7. Verification and tests

- **37 tests pass**: MST vectors, signed inclusion proofs, NAV rejection,
  authority rejection, over-reserve rejection, root tampering, and the archived
  Wave 3 regression suite.
- `npx tsc --noEmit` still reports the two pre-existing `as never` typing errors;
  they do not affect the runtime.

### 8. Documentation and release hygiene

- All docs and comments are in English.
- Root README rewritten for reviewers: setup, architecture, Midnight
  integration, reference run, trust boundary.
- English scope, encoding, trust-boundary and undeployed guides.
- Git history reset to a single Apache-2.0 root commit; no Chinese content in
  the repository history.

## Evidence

```bash
npm test
npm run build-mst
npm run submit-snapshot
npm run verify-inclusion
npm run undeployed:deploy-submit
```

## Known limitations / next steps

- Prices and reserves are **operator-supplied**; no price oracle or external
  reserve attestation is verified.
- Only one 64-user batch; no 128/1024-leaf or batch aggregation.
- No on-chain `attestInclusion` circuit yet; inclusion is verified off-chain.
- Preprod is still on ledger-9 while this repo targets ledger-v8; the working
  end-to-end path is undeployed.
