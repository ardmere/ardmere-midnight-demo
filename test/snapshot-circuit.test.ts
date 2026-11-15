// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { fromHex, toHex } from "../src/constants.js";
import { buildMst, type MstLeafInput } from "../src/mst/build.js";
import { DEMO_PRICES } from "../src/mst/constants.js";
import { simulateSubmitSnapshot } from "../src/standardPorSim.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

function loadBatch(): MstLeafInput[] {
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

function loadVectors() {
  return JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "snapshot-vectors.json"), "utf8"),
  );
}

function reservesFrom(vectors: any) {
  return {
    btc: BigInt(vectors.declaredReserves.btc),
    eth: BigInt(vectors.declaredReserves.eth),
    usdt: BigInt(vectors.declaredReserves.usdt),
  };
}

describe("standard_por submitSnapshot (local sim)", () => {
  it("accepts a batch whose users have positive NAV and exposure within reserves", () => {
    const batch = loadBatch();
    const built = buildMst(batch);
    const vectors = loadVectors();
    const { ledger, built: built2 } = simulateSubmitSnapshot({
      seq: 1n,
      timestamp: 1_700_000_000n,
      prices: DEMO_PRICES,
      declaredReserves: reservesFrom(vectors),
      batch,
    });
    assert.equal(ledger.published, true);
    assert.equal(toHex(ledger.mstRoot), toHex(built2.root.hash));
    assert.equal(ledger.liabilitiesBtcPos - ledger.liabilitiesBtcNeg, built.liabilities.btc);
    assert.equal(ledger.liabilitiesEthPos - ledger.liabilitiesEthNeg, built.liabilities.eth);
    assert.equal(ledger.liabilitiesUsdtPos - ledger.liabilitiesUsdtNeg, built.liabilities.usdt);
    assert.equal(ledger.priceBtc, DEMO_PRICES.btc);
    assert.equal(ledger.priceEth, DEMO_PRICES.eth);
    assert.equal(ledger.priceUsdt, DEMO_PRICES.usdt);
  });

  it("rejects a batch whose net exposure exceeds declared reserves", () => {
    const batch = loadBatch();
    const built = buildMst(batch);
    const reserves = reservesFrom(loadVectors());
    reserves.btc = built.liabilities.btc - 1n;
    assert.throws(
      () =>
        simulateSubmitSnapshot({
          seq: 2n,
          timestamp: 2n,
          prices: DEMO_PRICES,
          declaredReserves: reserves,
          batch,
        }),
      /exceeds reserves/,
    );
  });

  it("rejects a tampered root hash", () => {
    const batch = loadBatch();
    const built = buildMst(batch);
    const tampered = new Uint8Array(built.root.hash);
    tampered[0] ^= 0xff;
    assert.throws(
      () =>
        simulateSubmitSnapshot({
          seq: 3n,
          timestamp: 3n,
          prices: DEMO_PRICES,
          declaredReserves: reservesFrom(loadVectors()),
          batch,
          rootHash: tampered,
        }),
      /root mismatch|CompactError|assert/i,
    );
  });

  it("rejects a caller that is not the authority", () => {
    const batch = loadBatch();
    assert.throws(
      () =>
        simulateSubmitSnapshot({
          seq: 4n,
          timestamp: 4n,
          prices: DEMO_PRICES,
          declaredReserves: reservesFrom(loadVectors()),
          batch,
          callerCoinPk: randomBytes(32),
          authorityPk: randomBytes(32),
        }),
      /not authority|assert/i,
    );
  });

  it("rejects a user whose net asset value is not positive", () => {
    const batch: MstLeafInput[] = [
      {
        userIdHash: randomBytes(32),
        btc: 0n,
        eth: 0n,
        usdt: 1n,
      },
      {
        userIdHash: randomBytes(32),
        btc: -1n,
        eth: 0n,
        usdt: 0n,
      },
    ];
    assert.throws(
      () =>
        simulateSubmitSnapshot({
          seq: 5n,
          timestamp: 5n,
          prices: DEMO_PRICES,
          declaredReserves: { btc: 1n, eth: 1n, usdt: 1n },
          batch,
        }),
      /negative nav|assert/i,
    );
  });
});
