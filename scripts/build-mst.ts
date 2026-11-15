// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * CLI: npm run build-mst
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildMst, type MstLeafInput } from "../src/mst/build.js";
import { fromHex, toHex } from "../src/constants.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.resolve(here, "../fixtures/mst-batch.json");

function main(): void {
  const useFixture = !process.argv.includes("--random");
  let batch: MstLeafInput[];

  if (useFixture && fs.existsSync(fixturePath)) {
    const json = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
    batch = json.activeLeaves.map((l: any) => ({
      userIdHash: fromHex(l.userIdHashHex),
      btc: BigInt(l.btc),
      eth: BigInt(l.eth),
      usdt: BigInt(l.usdt),
    }));
  } else {
    batch = [
      {
        userIdHash: fromHex("a".repeat(64)),
        btc: 1_000n,
        eth: -500n,
        usdt: 2_000_000n,
      },
    ];
  }

  const built = buildMst(batch);
  console.log(
    JSON.stringify(
      {
        mstRootHashHex: toHex(built.root.hash),
        liabilities: {
          btc: built.liabilities.btc.toString(),
          eth: built.liabilities.eth.toString(),
          usdt: built.liabilities.usdt.toString(),
        },
        gross: {
          btcPos: built.gross.btcPos.toString(),
          btcNeg: built.gross.btcNeg.toString(),
          ethPos: built.gross.ethPos.toString(),
          ethNeg: built.gross.ethNeg.toString(),
          usdtPos: built.gross.usdtPos.toString(),
          usdtNeg: built.gross.usdtNeg.toString(),
        },
        activeLeaves: batch.length,
        paddedTo: 64,
      },
      null,
      2,
    ),
  );
}

main();
