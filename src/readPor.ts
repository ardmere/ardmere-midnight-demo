// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Read public Standard PoR snapshot fields (fixtures until live deploy).
 *
 * CLI: npm run read:por
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPreprodConfig, missingForPublish } from "./config.js";
import { preprodEnv } from "./env.js";
import { simulateSubmitSnapshot } from "./standardPorSim.js";
import { fromHex, toHex } from "./constants.js";
import { buildMst } from "./mst/build.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

function main(): void {
  const cfg = loadPreprodConfig(preprodEnv());
  const missing = missingForPublish(cfg).filter((m) =>
    ["BLOCKFROST_PROJECT_ID", "CONTRACT_ADDRESS"].includes(m.name),
  );

  const mst = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "mst-batch.json"), "utf8"),
  );
  const vectors = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "snapshot-vectors.json"), "utf8"),
  );

  const batch = mst.activeLeaves.map((l: any) => ({
    userIdHash: fromHex(l.userIdHashHex),
    btc: BigInt(l.btc),
    eth: BigInt(l.eth),
    usdt: BigInt(l.usdt),
  }));

  const { ledger } = simulateSubmitSnapshot({
    seq: BigInt(vectors.seq),
    timestamp: BigInt(vectors.timestamp),
    prices: {
      btc: BigInt(vectors.prices.btc),
      eth: BigInt(vectors.prices.eth),
      usdt: BigInt(vectors.prices.usdt),
    },
    declaredReserves: {
      btc: BigInt(vectors.declaredReserves.btc),
      eth: BigInt(vectors.declaredReserves.eth),
      usdt: BigInt(vectors.declaredReserves.usdt),
    },
    batch,
  });

  console.log(
    JSON.stringify(
      {
        source:
          missing.length === 0
            ? "fixtures+sim (indexer read not wired; use CONTRACT_ADDRESS when deploy exists)"
            : "fixtures+sim",
        authorityPkHex: toHex(ledger.authorityPk),
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
        liabilities: {
          btc: (ledger.liabilitiesBtcPos - ledger.liabilitiesBtcNeg).toString(),
          eth: (ledger.liabilitiesEthPos - ledger.liabilitiesEthNeg).toString(),
          usdt: (ledger.liabilitiesUsdtPos - ledger.liabilitiesUsdtNeg).toString(),
        },
        gross: {
          btcPos: ledger.liabilitiesBtcPos.toString(),
          btcNeg: ledger.liabilitiesBtcNeg.toString(),
          ethPos: ledger.liabilitiesEthPos.toString(),
          ethNeg: ledger.liabilitiesEthNeg.toString(),
          usdtPos: ledger.liabilitiesUsdtPos.toString(),
          usdtNeg: ledger.liabilitiesUsdtNeg.toString(),
        },
        published: ledger.published,
        fixtureRoot: mst.mstRootHashHex,
        fixtureLiabilities: mst.liabilities,
        preprod: {
          contractAddress: cfg.contractAddress,
          missingSecrets: missing,
        },
        note: "On-chain read deferred until standard_por deploy on Preprod/undeployed.",
      },
      null,
      2,
    ),
  );

  const built = buildMst(batch);
  if (toHex(built.root.hash) !== mst.mstRootHashHex) {
    throw new Error("fixture internal inconsistency");
  }
}

main();
