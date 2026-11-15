// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { fromHex, toHex } from "../src/constants.js";
import {
  buildMst,
  netAssetValue,
  normalizeBatch,
  splitSigned,
} from "../src/mst/build.js";
import { inclusionProof, verifyInclusionOffChain } from "../src/mst/path.js";
import { DEMO_PRICES, MST_LEAF_COUNT } from "../src/mst/constants.js";
import { mstPure } from "../src/mstContract.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

function uid(label: string): Uint8Array {
  return createHash("sha256").update(`test:${label}`).digest();
}

function leafJson(l: any) {
  return {
    userIdHash: fromHex(l.userIdHashHex),
    btc: BigInt(l.btc),
    eth: BigInt(l.eth),
    usdt: BigInt(l.usdt),
  };
}

describe("MST (64-leaf, three-asset signed Merkle Sum)", () => {
  it("leafHash matches pureCircuits for signed balances", () => {
    const h = uid("leaf-a");
    const values = { btc: 42_000n, eth: -7n, usdt: 9n };
    const btc = splitSigned(values.btc);
    const eth = splitSigned(values.eth);
    const usdt = splitSigned(values.usdt);
    const off = mstPure.leafHash(
      h, btc.pos, btc.neg, eth.pos, eth.neg, usdt.pos, usdt.neg,
    );
    const viaTree = buildMst([{ userIdHash: h, ...values }]);
    assert.equal(toHex(off), toHex(viaTree.levels[0][0].hash));
  });

  it("mstRootFromLeaves matches layered parentHash build", () => {
    const batch = [
      { userIdHash: uid("u0"), btc: 10n, eth: -2n, usdt: 30n },
      { userIdHash: uid("u1"), btc: -4n, eth: 6n, usdt: 1n },
      { userIdHash: uid("u2"), btc: 5n, eth: 3n, usdt: -2n },
    ];
    const built = buildMst(batch);
    const leaves = normalizeBatch(batch);
    const direct = mstPure.mstRootFromLeaves(
      leaves.map((l) => l.userIdHash),
      leaves.map((l) => l.btcPos),
      leaves.map((l) => l.btcNeg),
      leaves.map((l) => l.ethPos),
      leaves.map((l) => l.ethNeg),
      leaves.map((l) => l.usdtPos),
      leaves.map((l) => l.usdtNeg),
    );
    assert.equal(toHex(direct.hash), toHex(built.root.hash));
    assert.equal(direct.btcPosSum - direct.btcNegSum, built.liabilities.btc);
    assert.equal(direct.ethPosSum - direct.ethNegSum, built.liabilities.eth);
    assert.equal(direct.usdtPosSum - direct.usdtNegSum, built.liabilities.usdt);
  });

  it("fixture batch is stable and inclusion depth is 6", () => {
    const mst = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "mst-batch.json"), "utf8"),
    );
    const batch = mst.activeLeaves.map(leafJson);
    const built = buildMst(batch);
    assert.equal(toHex(built.root.hash), mst.mstRootHashHex);
    assert.equal(built.liabilities.btc.toString(), mst.liabilities.btc);
    assert.equal(built.liabilities.eth.toString(), mst.liabilities.eth);
    assert.equal(built.liabilities.usdt.toString(), mst.liabilities.usdt);
    const proof = inclusionProof(built, 0, DEMO_PRICES);
    assert.equal(proof.siblings.length, 6);
    assert.ok(verifyInclusionOffChain(proof));
  });

  it("rejects more than 64 entries", () => {
    const many = Array.from({ length: MST_LEAF_COUNT + 1 }, (_, i) => ({
      userIdHash: uid(`x${i}`),
      btc: 1n,
      eth: 1n,
      usdt: 1n,
    }));
    assert.throws(() => buildMst(many), /at most 64/);
  });

  it("rejects magnitudes beyond Uint<64>", () => {
    assert.throws(
      () =>
        buildMst([
          {
            userIdHash: uid("huge"),
            btc: 2n ** 64n,
            eth: 0n,
            usdt: 0n,
          },
        ]),
      /exceeds Uint<64>/,
    );
  });

  it("computes signed NAV in micro-USDT", () => {
    // 1 sat = 600, 1e-8 ETH = 30, 1e-6 USDT = 1 micro-USDT.
    const nav = netAssetValue(
      { btc: 50_000_000n, eth: -5_000_000n, usdt: -2_000_000_000n },
      DEMO_PRICES,
    );
    assert.equal(nav, 50_000_000n * 600n - 5_000_000n * 30n - 2_000_000_000n);
    assert.ok(nav > 0n);
  });
});
