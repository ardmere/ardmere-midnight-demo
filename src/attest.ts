// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Demo attest commands (member / outsider / wrong-leaf).
 *
 * Without Preprod secrets: runs local circuit simulation (no proof server).
 * With secrets + CONTRACT_ADDRESS: intended to submit via hosted proof-server
 * (wallet path); until that wallet wiring lands, still reports readiness.
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
import { fromHex, hexToBigint, toHex } from "./constants.js";
import type { MerklePath, SchnorrSignature } from "./contract.js";
import { simulateAttest, simulatePublish } from "./localSim.js";
import { demoKeys } from "./demoKeys.js";
import {
  loadPreprodConfig,
  missingForPublish,
} from "./config.js";
import { checkProofServer } from "./proofHealth.js";
import { preprodEnv } from "./env.js";

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
  // The committed fixtures come from deterministic demo keys, so a fresh
  // clone needs no gitignored secrets file to run the demo.
  const secrets = fs.existsSync(secretsPath)
    ? JSON.parse(fs.readFileSync(secretsPath, "utf8"))
    : {
        memberSecretKeysHex: demoKeys().memberSecretKeys.map(toHex),
      };
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

async function main(): Promise<void> {
  const mode = process.argv[2] ?? "member";
  const cfg = loadPreprodConfig(preprodEnv());
  const missing = missingForPublish(cfg);
  const proof = await checkProofServer(cfg.proofServer);
  const { vectors, tree, report, secrets } = loadFixtures();

  const publisherPk = {
    x: hexToBigint(vectors.publisherPk.x),
    y: hexToBigint(vectors.publisherPk.y),
  };
  const snapshotId = fromHex(vectors.snapshotIdHex);
  const reportRef = fromHex(report.reportRefHex);
  const merkleRoot = { field: hexToBigint(tree.merkleRootFieldHex) };
  const signature = signatureFromJson(vectors.validSignature);

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

  const preprod = {
    proofServer: {
      url: cfg.proofServer,
      source: cfg.proofServerSource,
      ok: proof.ok,
      version: proof.version,
    },
    missingSecrets: missing,
    note:
      missing.length > 0
        ? "Local circuit sim only. Hosted proof-server reachable check above; Preprod tx blocked on missing secrets."
        : "Secrets present — Preprod wallet call path not yet submitting in this CLI revision; local sim still run for demo fidelity.",
  };

  if (mode === "member") {
    simulateAttest({
      publishedContext: published.context,
      callerSk: memberSk,
      path: memberPath,
    });
    console.log(
      JSON.stringify({ mode: "member", result: "ok", preprod }, null, 2),
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
        JSON.stringify({
          mode: "outsider",
          result: "unexpected-success",
          preprod,
        }),
      );
      process.exitCode = 1;
    } catch (e: any) {
      console.log(
        JSON.stringify(
          {
            mode: "outsider",
            result: "assert-failed",
            message: String(e?.message ?? e).slice(0, 200),
            note: "No successful tx (local sim).",
            preprod,
          },
          null,
          2,
        ),
      );
    }
    return;
  }

  if (mode === "wrong-leaf") {
    try {
      simulateAttest({
        publishedContext: published.context,
        callerSk: fromHex(secrets.memberSecretKeysHex[1]),
        path: memberPath,
      });
      console.log(
        JSON.stringify({
          mode: "wrong-leaf",
          result: "unexpected-success",
          preprod,
        }),
      );
      process.exitCode = 1;
    } catch (e: any) {
      console.log(
        JSON.stringify(
          {
            mode: "wrong-leaf",
            result: "assert-failed",
            message: String(e?.message ?? e).slice(0, 200),
            note: "No successful tx (local sim).",
            preprod,
          },
          null,
          2,
        ),
      );
    }
    return;
  }

  console.error(`Unknown mode: ${mode}. Use member | outsider | wrong-leaf`);
  process.exitCode = 2;
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
