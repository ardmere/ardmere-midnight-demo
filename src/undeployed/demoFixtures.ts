// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fromHex } from "../constants.js";
import type { MstLeafInput } from "../mst/build.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../../fixtures");

export type AssetStrings = { btc: string; eth: string; usdt: string };

export type SnapshotVectors = {
  seq: number;
  timestamp: number;
  prices: AssetStrings;
  declaredReserves: AssetStrings;
  mstRootHashHex: string;
  liabilities: AssetStrings;
  gross: {
    btcPos: string;
    btcNeg: string;
    ethPos: string;
    ethNeg: string;
    usdtPos: string;
    usdtNeg: string;
  };
};

export function loadDemoBatch(): MstLeafInput[] {
  const mst = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "mst-batch.json"), "utf8"),
  ) as {
    activeLeaves: {
      userIdHashHex: string;
      btc: string;
      eth: string;
      usdt: string;
    }[];
  };
  return mst.activeLeaves.map((l) => ({
    userIdHash: fromHex(l.userIdHashHex),
    btc: BigInt(l.btc),
    eth: BigInt(l.eth),
    usdt: BigInt(l.usdt),
  }));
}

export function loadSnapshotVectors(): SnapshotVectors {
  return JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "snapshot-vectors.json"), "utf8"),
  ) as SnapshotVectors;
}
