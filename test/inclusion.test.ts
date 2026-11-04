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
import { recomputeRootFromPath } from "../src/tree.js";
import { simulateAttest, simulatePublish } from "../src/localSim.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");
const secretsPath = path.resolve(here, "../secrets/demo-keys.json");

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
    assert.ok(fs.existsSync(secretsPath), "run npm run generate:fixtures first");
    const vectors = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
    );
    const tree = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
    );
    const report = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
    );
    const secrets = JSON.parse(fs.readFileSync(secretsPath, "utf8"));

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
      callerSk: fromHex(secrets.memberSecretKeysHex[0]),
    });
    assert.equal(published.published, true);

    const memberPath = pathFromJson(tree.paths[0]);
    simulateAttest({
      publishedContext: published.context,
      callerSk: fromHex(secrets.memberSecretKeysHex[0]),
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
        callerSk: fromHex(secrets.memberSecretKeysHex[1]),
        path: memberPath,
      }),
    );
  });

  it("rejects signature when a signed field is mutated", () => {
    assert.ok(fs.existsSync(secretsPath), "run npm run generate:fixtures first");
    const vectors = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
    );
    const tree = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
    );
    const report = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
    );
    const secrets = JSON.parse(fs.readFileSync(secretsPath, "utf8"));
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
        callerSk: fromHex(secrets.memberSecretKeysHex[0]),
      }),
    );
  });
});
