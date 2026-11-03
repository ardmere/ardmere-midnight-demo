// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Demo attest commands (member / outsider / wrong-leaf).
 *
 * On Preprod these submit attestInclusion txs (or fail before a successful tx).
 * Without deploy + proof-server, this CLI runs the local circuit simulation
 * against fixtures so negative cases still demonstrate assert failure.
 *
 * Usage:
 *   npm run attest -- member
 *   npm run attest -- outsider
 *   npm run attest -- wrong-leaf
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";
import { fromHex, hexToBigint } from "./constants.js";
import type { MerklePath, SchnorrSignature } from "./contract.js";
import { simulateAttest, simulatePublish } from "./localSim.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

function loadFixtures() {
  const vectors = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
  );
  const tree = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
  );
  const report = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
  );
  const secretsPath = path.resolve(here, "../secrets/demo-keys.json");
  if (!fs.existsSync(secretsPath)) {
    throw new Error(
      "Missing secrets/demo-keys.json — run: npm run generate:fixtures",
    );
  }
  const secrets = JSON.parse(fs.readFileSync(secretsPath, "utf8"));
  return { vectors, tree, report, secrets };
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

function main(): void {
  const mode = process.argv[2] ?? "member";
  const { vectors, tree, report, secrets } = loadFixtures();

  const publisherPk = {
    x: hexToBigint(vectors.publisherPk.x),
    y: hexToBigint(vectors.publisherPk.y),
  };
  const snapshotId = fromHex(vectors.snapshotIdHex);
  const reportRef = fromHex(report.reportRefHex);
  const merkleRoot = { field: hexToBigint(tree.merkleRootFieldHex) };
  const signature = signatureFromJson(vectors.validSignature);

  // Local sim of a successful publish so attest can run against published state.
  const published = simulatePublish({
    publisherPk,
    snapshotId,
    reportRef,
    merkleRoot,
    signature,
    callerSk: fromHex(secrets.memberSecretKeysHex[0]),
  });

  const memberPath = pathFromJson(tree.paths[0]);
  const memberSk = fromHex(secrets.memberSecretKeysHex[0]);

  if (mode === "member") {
    simulateAttest({
      publishedContext: published.context,
      callerSk: memberSk,
      path: memberPath,
    });
    console.log(
      JSON.stringify({
        mode: "member",
        result: "ok",
        note: "Local circuit simulation succeeded. Preprod tx not submitted (undeployed).",
      }),
    );
    return;
  }

  if (mode === "outsider") {
    try {
      simulateAttest({
        publishedContext: published.context,
        callerSk: randomBytes(32),
        path: memberPath,
      });
      console.log(
        JSON.stringify({ mode: "outsider", result: "unexpected-success" }),
      );
      process.exitCode = 1;
    } catch (e: any) {
      console.log(
        JSON.stringify({
          mode: "outsider",
          result: "assert-failed",
          message: String(e?.message ?? e).slice(0, 200),
          note: "No successful tx (local sim).",
        }),
      );
    }
    return;
  }

  if (mode === "wrong-leaf") {
    try {
      // Member key 1 with path for leaf 0 → leaf binding fails.
      simulateAttest({
        publishedContext: published.context,
        callerSk: fromHex(secrets.memberSecretKeysHex[1]),
        path: memberPath,
      });
      console.log(
        JSON.stringify({ mode: "wrong-leaf", result: "unexpected-success" }),
      );
      process.exitCode = 1;
    } catch (e: any) {
      console.log(
        JSON.stringify({
          mode: "wrong-leaf",
          result: "assert-failed",
          message: String(e?.message ?? e).slice(0, 200),
          note: "No successful tx (local sim).",
        }),
      );
    }
    return;
  }

  console.error(`Unknown mode: ${mode}. Use member | outsider | wrong-leaf`);
  process.exitCode = 2;
}

main();
