// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/** Step 6: user verifies one inclusion path against the anchored root. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyInclusionProof } from "../mst/verify.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const snapshotPath = path.join(ROOT, ".demo", "snapshot.json");
const vectorsPath = path.join(ROOT, "fixtures", "snapshot-vectors.json");

if (!fs.existsSync(snapshotPath)) {
  throw new Error("no .demo/snapshot.json; run `npm run demo:read` first");
}

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const vectors = JSON.parse(fs.readFileSync(vectorsPath, "utf8"));
if (!snapshot.published) {
  throw new Error("snapshot is not published");
}

const proof = {
  ...vectors.sampleInclusion,
  mstRootHashHex: snapshot.mstRootHashHex,
};
const result = verifyInclusionProof(proof);
const rootMatches = result.expectedRootHex === snapshot.mstRootHashHex;
const ok = result.ok && rootMatches && result.navPositive;

console.log(
  JSON.stringify(
    {
      status: ok ? "ok" : "failed",
      stage: "verify",
      contractAddress: snapshot.contractAddress,
      anchoredRootHex: snapshot.mstRootHashHex,
      proofRootHex: result.expectedRootHex,
      recomputedRootHex: result.recomputedRootHex,
      rootMatches,
      leafHashMatches: result.leafHashMatches,
      liabilitiesMatch: result.liabilitiesMatch,
      navPositive: result.navPositive,
      navValueMicroUsdt: result.navValue,
      published: snapshot.published,
      reason: result.reason,
    },
    null,
    2,
  ),
);

if (!ok) process.exitCode = 1;
