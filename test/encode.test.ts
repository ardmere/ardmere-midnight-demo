// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  REPORT_URL,
  SNAPSHOT_ID_UTF8,
  fromHex,
  hexToBigint,
  pad32,
  toHex,
} from "../src/constants.js";
import { encodeSnapshotMessage, mutateSnapshotId } from "../src/sign.js";
import { reportRefFromUrl } from "../src/reportRef.js";
import { pureCircuits } from "../src/contract.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

describe("encodeSnapshotMessage Vector<3, Field>", () => {
  it("matches fixtures/vectors.json encoding", () => {
    const vectors = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
    );
    const tree = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
    );
    const report = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
    );

    const sid = fromHex(vectors.snapshotIdHex);
    const rref = fromHex(report.reportRefHex);
    const root = { field: hexToBigint(tree.merkleRootFieldHex) };
    const msg = encodeSnapshotMessage(sid, rref, root);

    assert.equal(msg.length, 3);
    assert.equal(msg.length, vectors.messageFieldCount);
    assert.deepEqual(
      msg.map((f) => f.toString(16)),
      vectors.messageFieldsHex,
    );
  });

  it("reportRef is SHA-256(UTF-8 URL)", () => {
    const report = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
    );
    const expected = createHash("sha256").update(REPORT_URL, "utf8").digest();
    assert.equal(toHex(reportRefFromUrl()), report.reportRefHex);
    assert.equal(toHex(expected), report.reportRefHex);
  });

  it("snapshotId fixture matches pad32 UTF-8 constant", () => {
    const vectors = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
    );
    assert.equal(toHex(pad32(SNAPSHOT_ID_UTF8)), vectors.snapshotIdHex);
  });

  it("mutating snapshotId changes message encoding", () => {
    const vectors = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
    );
    const tree = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
    );
    const report = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
    );
    const sid = fromHex(vectors.snapshotIdHex);
    const rref = fromHex(report.reportRefHex);
    const root = { field: hexToBigint(tree.merkleRootFieldHex) };
    const msg = encodeSnapshotMessage(sid, rref, root);
    const mutated = encodeSnapshotMessage(mutateSnapshotId(sid), rref, root);
    assert.notDeepEqual(msg, mutated);
  });

  it("pureCircuits.encodeSnapshotMessage agrees with sign.ts helper", () => {
    const sid = pad32(SNAPSHOT_ID_UTF8);
    const rref = reportRefFromUrl();
    const root = { field: 123456789n };
    assert.deepEqual(
      encodeSnapshotMessage(sid, rref, root),
      pureCircuits.encodeSnapshotMessage(sid, rref, root),
    );
  });
});
