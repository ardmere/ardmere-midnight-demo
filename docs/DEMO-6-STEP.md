# Six-step local demo

This is the strict recording sequence:

1. compile
2. deploy
3. exchange generates the proof
4. exchange submits the proof on-chain
5. regulator reads and verifies the snapshot
6. user verifies the inclusion proof

The old `undeployed:deploy-submit` command is still available as a one-shot
convenience. The commands below split it into observable stages.

## Why a session server

The testkit chain is ephemeral. `npm run demo:deploy` starts a local session
server that owns the testkit stack, wallet and providers. The later commands
connect to that live session:

```text
demo:deploy -> src/demo/session.ts (background)
                    |
                    +-- demo:prove
                    +-- demo:submit
                    +-- demo:read
                    +-- demo:verify (local only)
```

`npm run demo:stop` shuts the chain down. Session state is written under
`.demo/` and is gitignored.

## Commands

```bash
# 1. compile the circuits and generate the prover/verifier
npm run compile:standard-por

# 2. deploy the contract (starts the session if needed)
npm run demo:deploy

# 3. generate the global proof without submitting it
npm run demo:prove

# 4. submit the pre-generated proof to the local chain
npm run demo:submit

# 5. regulator reads the published snapshot from the indexer
npm run demo:read

# 6. user verifies one inclusion path against the anchored root
npm run demo:verify

# cleanup
npm run demo:stop
```

Run the commands with the same testkit image versions used by the reference
run:

```bash
export PROOF_SERVER_VERSION=8.1.3
export INDEXER_VERSION=4.0.1
export MIDNIGHT_NODE_VERSION=0.22.5
```

## Stage details

### 1. Compile

`npm run compile:standard-por` compiles the MST circuits and
`contract/standard_por.compact`, then generates the ZKIR, verifier and the
`submitSnapshot.prover` under `contract/managed/standard_por/`. The prover is
large and gitignored.

### 2. Deploy

`npm run demo:deploy` starts the testkit session if it is not already running,
waits for the wallet to sync, and deploys `standard_por` with the wallet coin
public key as `authorityPk`. It prints `contractAddress`, `authorityPkHex`,
`deployTxHash` and `blockHeight`.

The session server keeps the wallet and providers alive, so the next commands
do not need to restart the chain.

### 3. Generate proof

`npm run demo:prove` builds the same MST and public inputs, creates an
**unproven** call transaction for `submitSnapshot`, sends it to the local proof
server, and writes the proven transaction to:

```text
.demo/submitSnapshot.proof.bin
```

It also writes `.demo/proof.json` with the proof size, snapshot sequence,
timestamp, root, prices and reserves. No transaction is submitted at this
stage.

### 4. Submit

`npm run demo:submit` deserializes the proof, balances and signs the
transaction, submits it to the local Midnight node, and waits for
finalization. It writes `.demo/submit.json` with `txHash`, `blockHeight`,
`blockHash` and `txStatus`.

The contract verifies the global proof as part of transaction execution. The
state update only happens if the proof is valid.

### 5. Read snapshot

`npm run demo:read` queries the contract state through the indexer
(`getPublicStates`), decodes the public ledger with the generated Compact
ledger decoder, and writes `.demo/snapshot.json`.

The regulator sees the anchored root, prices, declared reserves, net
liabilities, gross sums and the `published` flag. In this demo the source is
the local indexer; in production it can be the same query against a public
indexer.

### 6. Verify inclusion

`npm run demo:verify` reads the anchored root from `.demo/snapshot.json` and the
sample inclusion JSON from `fixtures/snapshot-vectors.json`. It recomputes the
leaf and six parent levels, compares the root, checks liabilities, and computes
per-user NAV.

This step requires no proof server, no global proof and no wallet. It is the
user-side check against the root that the contract already anchored.

## Recording with filtered paths

The commands print absolute paths such as `/Users/jason/...` (for example the
Compact compiler's `Wrote ...` line). To keep those paths out of the recording
without moving the repository:

```bash
./scripts/demo-run.sh npm run --silent compile:standard-por
./scripts/demo-run.sh npm run --silent demo:deploy
./scripts/demo-run.sh npm run --silent demo:prove
./scripts/demo-run.sh npm run --silent demo:submit
./scripts/demo-run.sh npm run --silent demo:read
./scripts/demo-run.sh npm run --silent demo:verify
```

The wrapper merges stderr into stdout, replaces `$HOME` with `/Users/bryn` for
display, and preserves the command's exit code. The files still live under the
real home directory. Override the display name with `DEMO_USER=...`.

Combine it with a prompt override:

```bash
PROMPT='bryn@midnight %~ $ '
```

## Example output shape

```json
{
  "status": "ok",
  "stage": "verify",
  "anchoredRootHex": "115b6628…bd34a2",
  "proofRootHex": "115b6628…bd34a2",
  "recomputedRootHex": "115b6628…bd34a2",
  "rootMatches": true,
  "leafHashMatches": true,
  "liabilitiesMatch": true,
  "navPositive": true,
  "published": true
}
```

Values differ per run because the local chain is ephemeral.

## Caveats

- The chain is the **undeployed** testkit chain, not Preprod or mainnet.
- The proof file contains privacy-sensitive transaction material; `.demo/` is
  gitignored and must not be committed.
- This strict split bypasses `submitCallTx`'s private-state bookkeeping after
  submission. `standard_por` is one-shot (`published` prevents a second
  snapshot), so the demo does not need a follow-up call. The convenience
  `undeployed:deploy-submit` command still uses the higher-level path.
- `demo:deploy` assumes no earlier session is running. If a session is stale,
  run `npm run demo:stop` and start again.
