// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fromHex, hexToBigint } from "../src/constants.js";
import type { MerklePath, SchnorrSignature } from "../src/contract.js";
import { demoKeys } from "../src/demoKeys.js";
import { recomputeRootFromPath } from "../src/tree.js";
import { simulateAttest, simulatePublish } from "../src/localSim.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

/** Committed fixtures are generated from the same deterministic demo keys. */
function memberSecretKeys(): Uint8Array[] {
  const fromFile = path.resolve(here, "../secrets/demo-keys.json");
  if (fs.existsSync(fromFile)) {
    const json = JSON.parse(fs.readFileSync(fromFile, "utf8"));
    return json.memberSecretKeysHex.map(fromHex);
  }
  return demoKeys().memberSecretKeys;
}

function pathFromJson(p: any): MerklePath {
  return {
    leaf: fromHex(p.leafHex),
    path: p.path.map((e: any) => ({
      sibling: { field: hexToBigint(e.siblingFieldHex) },
      goes_left: e.goes_left,
    })),
  };
}

function signatureFromJson(s: any): SchnorrSignature {
  return {
    announcement: {
      x: hexToBigint(s.announcement.x),
      y: hexToBigint(s.announcement.y),
    },
    response: hexToBigint(s.response),
  };
}

describe("off-chain inclusion vs circuit path root", () => {
  it("each fixture path recomputes to the published merkleRoot", () => {
    const tree = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
    );
    const rootField = hexToBigint(tree.merkleRootFieldHex);
    for (const p of tree.paths) {
      const path = pathFromJson(p);
      const recomputed = recomputeRootFromPath(path);
      assert.equal(recomputed.field, rootField);
    }
  });

  it("valid signature publishes; member attest succeeds; outsider and wrong-leaf fail", () => {
    const vectors = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
    );
    const tree = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
    );
    const report = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
    );
    const memberKs = memberSecretKeys();

    const publisherPk = {
      x: hexToBigint(vectors.publisherPk.x),
      y: hexToBigint(vectors.publisherPk.y),
    };
    const published = simulatePublish({
      publisherPk,
      snapshotId: fromHex(vectors.snapshotIdHex),
      reportRef: fromHex(report.reportRefHex),
      merkleRoot: { field: hexToBigint(tree.merkleRootFieldHex) },
      signature: signatureFromJson(vectors.validSignature),
      callerSk: memberKs[0],
    });
    assert.equal(published.published, true);

    const memberPath = pathFromJson(tree.paths[0]);
    simulateAttest({
      publishedContext: published.context,
      callerSk: memberKs[0],
      path: memberPath,
    });

    assert.throws(() =>
      simulateAttest({
        publishedContext: published.context,
        callerSk: randomBytes(32),
        path: memberPath,
      }),
    );

    assert.throws(() =>
      simulateAttest({
        publishedContext: published.context,
        callerSk: memberKs[1],
        path: memberPath,
      }),
    );
  });

  it("rejects signature when a signed field is mutated", () => {
    const vectors = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
    );
    const tree = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
    );
    const report = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
    );
    const memberKs = memberSecretKeys();
    const publisherPk = {
      x: hexToBigint(vectors.publisherPk.x),
      y: hexToBigint(vectors.publisherPk.y),
    };

    assert.throws(() =>
      simulatePublish({
        publisherPk,
        snapshotId: fromHex(vectors.mutatedSnapshotIdHex),
        reportRef: fromHex(report.reportRefHex),
        merkleRoot: { field: hexToBigint(tree.merkleRootFieldHex) },
        signature: signatureFromJson(vectors.validSignature),
        callerSk: memberKs[0],
      }),
    );
  });
});
