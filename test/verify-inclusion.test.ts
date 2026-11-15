// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { fromHex } from "../src/constants.js";
import { buildMst, type MstLeafInput } from "../src/mst/build.js";
import { DEMO_PRICES } from "../src/mst/constants.js";
import { inclusionProof } from "../src/mst/path.js";
import { verifyInclusionProof } from "../src/mst/verify.js";

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

describe("verify inclusion (off-chain)", () => {
  it("validates sampleInclusion in snapshot-vectors.json", () => {
    const json = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "snapshot-vectors.json"), "utf8"),
    );
    const result = verifyInclusionProof(json.sampleInclusion);
    assert.equal(result.ok, true, result.reason);
    assert.equal(result.liabilitiesMatch, true);
    assert.equal(result.navPositive, true);
  });

  it("rejects a tampered sibling hash", () => {
    const built = buildMst(loadBatch());
    const proof = inclusionProof(built, 0, DEMO_PRICES);
    proof.siblings[0].siblingHashHex = proof.siblings[0].siblingHashHex.replace(
      /^./,
      proof.siblings[0].siblingHashHex[0] === "a" ? "b" : "a",
    );
    const result = verifyInclusionProof(proof);
    assert.equal(result.ok, false);
  });

  it("rejects a tampered signed balance", () => {
    const built = buildMst(loadBatch());
    const proof = inclusionProof(built, 0, DEMO_PRICES);
    proof.btc = (BigInt(proof.btc) + 1n).toString();
    const result = verifyInclusionProof(proof);
    assert.equal(result.ok, false);
    assert.equal(result.leafHashMatches, false);
  });
});
