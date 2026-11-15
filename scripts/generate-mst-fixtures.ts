// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import { createHash, randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildMst,
  netAssetValue,
  type MstLeafInput,
} from "../src/mst/build.js";
import { inclusionProof } from "../src/mst/path.js";
import { DEMO_PRICES } from "../src/mst/constants.js";
import { toHex } from "../src/constants.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

function userIdHash(label: string): Uint8Array {
  return createHash("sha256").update(`ardmere:mst:user:${label}`, "utf8").digest();
}

function demoBatch(): MstLeafInput[] {
  // Signed balances in smallest units. Some users are short one asset but
  // every user has a positive NAV at the demo prices.
  const specs: { label: string; btc: bigint; eth: bigint; usdt: bigint }[] = [
    { label: "alice", btc: 50_000_000n, eth: 320_000_000n, usdt: -2_000_000_000n },
    { label: "bob", btc: -20_000_000n, eth: 100_000_000n, usdt: 150_000_000_000n },
    { label: "carol", btc: 12_000_000n, eth: -5_000_000n, usdt: 30_000_000_000n },
    { label: "dave", btc: -3_000_000n, eth: -2_000_000n, usdt: 40_000_000_000n },
    { label: "eve", btc: 80_000_000n, eth: 50_000_000n, usdt: -1_000_000_000n },
    { label: "frank", btc: 5_000_000n, eth: 10_000_000n, usdt: 2_000_000_000n },
    { label: "grace", btc: -8_000_000n, eth: 25_000_000n, usdt: 25_000_000_000n },
    { label: "heidi", btc: 1_000_000n, eth: -500_000n, usdt: 4_000_000_000n },
  ];
  return specs.map((s) => ({
    userIdHash: userIdHash(s.label),
    btc: s.btc,
    eth: s.eth,
    usdt: s.usdt,
  }));
}

function reserveFor(net: bigint, margin: bigint): bigint {
  return (net > 0n ? net : 0n) + margin;
}

function main(): void {
  fs.mkdirSync(fixturesDir, { recursive: true });
  const batch = demoBatch();
  for (const leaf of batch) {
    const nav = netAssetValue(leaf, DEMO_PRICES);
    if (nav <= 0n) {
      throw new Error(`demo leaf has non-positive NAV: ${nav}`);
    }
  }

  const built = buildMst(batch);
  const declaredReserves = {
    btc: reserveFor(built.liabilities.btc, 20_000_000n),
    eth: reserveFor(built.liabilities.eth, 50_000_000n),
    usdt: reserveFor(built.liabilities.usdt, 20_000_000_000n),
  };

  const prices = {
    btc: DEMO_PRICES.btc.toString(),
    eth: DEMO_PRICES.eth.toString(),
    usdt: DEMO_PRICES.usdt.toString(),
  };

  const activeLeaves = batch.map((l, i) => ({
    index: i,
    userIdHashHex: toHex(l.userIdHash),
    btc: l.btc.toString(),
    eth: l.eth.toString(),
    usdt: l.usdt.toString(),
    leafHashHex: toHex(built.levels[0][i].hash),
  }));

  const sampleInclusion = inclusionProof(built, 2, DEMO_PRICES);

  const liabilities = {
    btc: built.liabilities.btc.toString(),
    eth: built.liabilities.eth.toString(),
    usdt: built.liabilities.usdt.toString(),
  };
  const gross = {
    btcPos: built.gross.btcPos.toString(),
    btcNeg: built.gross.btcNeg.toString(),
    ethPos: built.gross.ethPos.toString(),
    ethNeg: built.gross.ethNeg.toString(),
    usdtPos: built.gross.usdtPos.toString(),
    usdtNeg: built.gross.usdtNeg.toString(),
  };

  fs.writeFileSync(
    path.join(fixturesDir, "mst-batch.json"),
    JSON.stringify(
      {
        leafCount: 64,
        activeLeafCount: batch.length,
        units: { btc: "1e-8 BTC", eth: "1e-8 ETH", usdt: "1e-6 USDT" },
        prices,
        activeLeaves,
        mstRootHashHex: toHex(built.root.hash),
        liabilities,
        gross,
        declaredReservesDemo: {
          btc: declaredReserves.btc.toString(),
          eth: declaredReserves.eth.toString(),
          usdt: declaredReserves.usdt.toString(),
        },
      },
      null,
      2,
    ),
  );

  fs.writeFileSync(
    path.join(fixturesDir, "snapshot-vectors.json"),
    JSON.stringify(
      {
        seq: 1,
        timestamp: 1_700_000_000,
        prices,
        declaredReserves: {
          btc: declaredReserves.btc.toString(),
          eth: declaredReserves.eth.toString(),
          usdt: declaredReserves.usdt.toString(),
        },
        mstRootHashHex: toHex(built.root.hash),
        liabilities,
        gross,
        rngNonceHex: toHex(randomBytes(16)),
        sampleInclusion,
      },
      null,
      2,
    ),
  );

  console.log(
    JSON.stringify(
      {
        wrote: ["fixtures/mst-batch.json", "fixtures/snapshot-vectors.json"],
        mstRootHashHex: toHex(built.root.hash),
        liabilities,
        declaredReserves: {
          btc: declaredReserves.btc.toString(),
          eth: declaredReserves.eth.toString(),
          usdt: declaredReserves.usdt.toString(),
        },
      },
      null,
      2,
    ),
  );
}

main();
