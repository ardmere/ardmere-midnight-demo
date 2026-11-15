// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Dry-run standard_por submitSnapshot (local circuit sim + proof-server health).
 *
 * CLI: npm run submit-snapshot [-- --dry-run]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPreprodConfig, missingForPublish } from "./config.js";
import { preprodEnv } from "./env.js";
import { checkProofServer } from "./proofHealth.js";
import { fromHex, toHex } from "./constants.js";
import { buildMst } from "./mst/build.js";
import { simulateSubmitSnapshot } from "./standardPorSim.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

function loadDemoBatch() {
  const mst = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "mst-batch.json"), "utf8"),
  );
  return mst.activeLeaves.map((l: any) => ({
    userIdHash: fromHex(l.userIdHashHex),
    btc: BigInt(l.btc),
    eth: BigInt(l.eth),
    usdt: BigInt(l.usdt),
  }));
}

function loadSnapshotVectors() {
  return JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "snapshot-vectors.json"), "utf8"),
  );
}

async function main(): Promise<void> {
  const dryRun =
    process.argv.includes("--dry-run") ||
    !process.argv.includes("--submit-preprod");
  const cfg = loadPreprodConfig(preprodEnv());
  const missing = missingForPublish(cfg);
  const proof = await checkProofServer(cfg.proofServer);

  const batch = loadDemoBatch();
  const built = buildMst(batch);
  const vectors = loadSnapshotVectors();

  const prices = {
    btc: BigInt(vectors.prices.btc),
    eth: BigInt(vectors.prices.eth),
    usdt: BigInt(vectors.prices.usdt),
  };
  const declaredReserves = {
    btc: BigInt(vectors.declaredReserves.btc),
    eth: BigInt(vectors.declaredReserves.eth),
    usdt: BigInt(vectors.declaredReserves.usdt),
  };

  const { ledger } = simulateSubmitSnapshot({
    seq: BigInt(vectors.seq),
    timestamp: BigInt(vectors.timestamp),
    prices,
    declaredReserves,
    batch,
  });

  const liabilities = {
    btc: (ledger.liabilitiesBtcPos - ledger.liabilitiesBtcNeg).toString(),
    eth: (ledger.liabilitiesEthPos - ledger.liabilitiesEthNeg).toString(),
    usdt: (ledger.liabilitiesUsdtPos - ledger.liabilitiesUsdtNeg).toString(),
  };

  const payload = {
    mode: dryRun ? "dry-run" : "preprod-submit-not-implemented",
    status: "sim-ok",
    publicFields: {
      snapshotSeq: ledger.snapshotSeq.toString(),
      timestamp: ledger.timestamp.toString(),
      mstRootHashHex: toHex(ledger.mstRoot),
      prices: {
        btc: ledger.priceBtc.toString(),
        eth: ledger.priceEth.toString(),
        usdt: ledger.priceUsdt.toString(),
      },
      declaredReserves: {
        btc: ledger.declaredReservesBtc.toString(),
        eth: ledger.declaredReservesEth.toString(),
        usdt: ledger.declaredReservesUsdt.toString(),
      },
      liabilities,
      gross: {
        btcPos: ledger.liabilitiesBtcPos.toString(),
        btcNeg: ledger.liabilitiesBtcNeg.toString(),
        ethPos: ledger.liabilitiesEthPos.toString(),
        ethNeg: ledger.liabilitiesEthNeg.toString(),
        usdtPos: ledger.liabilitiesUsdtPos.toString(),
        usdtNeg: ledger.liabilitiesUsdtNeg.toString(),
      },
      published: ledger.published,
    },
    derived: {
      mstRootHashHex: toHex(built.root.hash),
      liabilities: {
        btc: built.liabilities.btc.toString(),
        eth: built.liabilities.eth.toString(),
        usdt: built.liabilities.usdt.toString(),
      },
    },
    proofServer: {
      url: cfg.proofServer,
      ok: proof.ok,
      version: proof.version,
    },
    preprod: {
      wouldNeed: missing,
      note:
        "Preprod on-chain submit is still gated on DUST/L9. Use npm run undeployed:deploy-submit for local chain (docs/UNDEPLOYED.md).",
    },
    trustBoundary: "docs/TRUST-BOUNDARY.md",
  };

  console.log(JSON.stringify(payload, null, 2));
  if (process.argv.includes("--strict-proof") && !proof.ok) {
    process.exitCode = 1;
  }
}

main();
