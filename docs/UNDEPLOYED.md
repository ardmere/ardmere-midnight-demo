# Undeployed: `deployContract` + `submitSnapshot`

Deploy `standard_por` on a local **undeployed** chain and submit one demo
snapshot from the fixtures batch.

The demo batch covers BTC/ETH/USDT; a single user's per-asset balance may be
negative, but each user's NAV at the public prices must be > 0. The deploying
wallet's Zswap coin public key is stored as `authorityPk`, and only that key
can call `submitSnapshot`.

## Prerequisites

1. **Compact 0.31.1** and the compiled ZK artifacts (`submitSnapshot.prover`
   is large and is not committed by default):

   ```bash
   npm run compile:standard-por
   ```

2. **Docker memory ≥ 16 GB (recommended).** The current `submitSnapshot` is a
   **k=20** circuit (~886k rows, prover ~291 MB); the testkit proof server is
   OOM-killed under an 8 GB Docker VM (exit 137). Set Docker Desktop →
   Settings → Resources → Memory to 16 GB.

3. Choose one local chain:

   | Mode | `MN_TEST_ENVIRONMENT` | Notes |
   | --- | --- | --- |
   | testkit Docker | `undeployed` (default) | Starts node / indexer / proof server automatically |
   | midnight-local-dev | `env-var-remote` | Start local-dev first, then point `MN_TEST_*` at it |

## Commands

```bash
# Full testkit stack (needs Docker)
npm run undeployed:deploy-submit

# Connect to an already-running midnight-local-dev
# (example ports; use the ones from your local setup)
MN_TEST_ENVIRONMENT=env-var-remote \
MN_TEST_NETWORK_ID=undeployed \
MN_TEST_INDEXER=http://localhost:8088/api/v4/graphql \
MN_TEST_INDEXER_WS=ws://localhost:8088/api/v4/graphql/ws \
MN_TEST_NODE=http://localhost:9944 \
MN_TEST_NODE_WS=ws://localhost:9944 \
MN_USE_STATIC_PROOF_SERVER=1 \
npm run undeployed:deploy-submit
```

Optional:

- `MN_TEST_WALLET_SEED` — testkit wallet mnemonic (when switching wallets).
- `MN_TEST_FAUCET` — set for `env-var-remote` when test tokens are needed.

## Output

- Terminal JSON: `contractAddress`, `authorityPkHex`, the first
  `submitSnapshot` `txHash` / public fields (`prices`, `declaredReserves`,
  `liabilities`, `gross`).
- `fixtures/undeployed-last-run.json` — same payload, for wiring `read:por`
  to an indexer later.

After writing `CONTRACT_ADDRESS` to `.env`, the public ledger fields
(`snapshotSeq`, `mstRoot`, `priceBtc/Eth/Usdt`, `liabilitiesBtcPos/Neg`, …,
`published`) can be compared against the Preprod/undeployed explorer.

## Integration test (optional)

```bash
MN_INTEGRATION_UNDEPLOYED=1 npm test
```

Requires Docker (`undeployed`) or a ready `env-var-remote`; CI and
Docker-less environments skip it by default.

## Relationship to Preprod

This repo still targets **ledger-v8**. While Preprod is on L9 and DUST is
limited, use undeployed for the "one real submit" demo; keep Blockfrost and
the old Wave 3 path for Preprod.
