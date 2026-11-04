// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Generate fixtures/ + secrets/demo-keys.json from a fresh keypair and tree.
 * Run after `npm run compile`.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SNAPSHOT_ID_UTF8,
  REPORT_URL,
  pad32,
  toHex,
  bigintToHex,
} from "../src/constants.js";
import { generatePublisherKeypair, pointToJson } from "../src/keys.js";
import { buildDemoTree, assertPathsMatchRoot } from "../src/tree.js";
import {
  encodeSnapshotMessage,
  mutateSnapshotId,
  signSnapshot,
} from "../src/sign.js";
import { reportRefFromUrl } from "../src/reportRef.js";
import { simulatePublish } from "../src/localSim.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const fixturesDir = path.join(root, "fixtures");
const secretsDir = path.join(root, "secrets");

function main(): void {
  fs.mkdirSync(fixturesDir, { recursive: true });
  fs.mkdirSync(secretsDir, { recursive: true });

  const kp = generatePublisherKeypair();
  const tree = buildDemoTree();
  assertPathsMatchRoot(tree);

  const snapshotId = pad32(SNAPSHOT_ID_UTF8);
  const reportRef = reportRefFromUrl(REPORT_URL);
  const msg = encodeSnapshotMessage(snapshotId, reportRef, tree.root);
  const signature = signSnapshot({
    publisherSk: kp.sk,
    publisherPk: kp.pk,
    snapshotId,
    reportRef,
    merkleRoot: tree.root,
  });

  // Valid signature accepted by local circuit sim.
  const published = simulatePublish({
    publisherPk: kp.pk,
    snapshotId,
    reportRef,
    merkleRoot: tree.root,
    signature,
    callerSk: tree.memberSecretKeys[0],
  });
  if (!published.published) {
    throw new Error("valid signature did not publish");
  }

  // Mutated message encoding differs; mutated-field signature must fail.
  const mutatedId = mutateSnapshotId(snapshotId);
  const mutatedMsg = encodeSnapshotMessage(mutatedId, reportRef, tree.root);
  if (msg.every((v, i) => v === mutatedMsg[i])) {
    throw new Error("mutated snapshotId did not change message encoding");
  }
  let mutatedRejected = false;
  try {
    simulatePublish({
      publisherPk: kp.pk,
      snapshotId: mutatedId,
      reportRef,
      merkleRoot: tree.root,
      signature, // signature for original message
      callerSk: tree.memberSecretKeys[0],
    });
  } catch {
    mutatedRejected = true;
  }
  if (!mutatedRejected) {
    throw new Error("expected mutated snapshot publish to fail");
  }

  const reportRefJson = {
    url: REPORT_URL,
    reportRefHex: toHex(reportRef),
    algorithm: "SHA-256 over UTF-8 URL bytes",
    note: "Context pointer only. Midnight root is not an exchange Merkle root; Plonky2 is not verified on Midnight.",
  };

  const treeJson = {
    depth: 4,
    leafCount: 8,
    merkleRootFieldHex: bigintToHex(tree.root.field),
    leavesHex: tree.leaves.map(toHex),
    paths: tree.paths.map((p) => ({
      leafHex: toHex(p.leaf),
      path: p.path.map((e) => ({
        siblingFieldHex: bigintToHex(e.sibling.field),
        goes_left: e.goes_left,
      })),
    })),
    note: "Member secret keys are NOT in this file; see secrets/demo-keys.json (gitignored).",
  };

  const vectorsJson = {
    snapshotIdHex: toHex(snapshotId),
    snapshotIdUtf8: SNAPSHOT_ID_UTF8,
    messageFieldCount: msg.length,
    messageFieldsHex: msg.map(bigintToHex),
    publisherPk: pointToJson(kp.pk),
    validSignature: {
      announcement: {
        x: bigintToHex(signature.announcement.x),
        y: bigintToHex(signature.announcement.y),
      },
      response: bigintToHex(signature.response),
    },
    mutatedSnapshotIdHex: toHex(mutatedId),
    mutatedMessageFieldsHex: mutatedMsg.map(bigintToHex),
    checks: {
      validSignatureAcceptedByLocalSim: true,
      mutatedFieldSignatureRejectedByLocalSim: true,
    },
    encoding:
      "Vector<3, Field> = [degradeToTransient(snapshotId), degradeToTransient(reportRef), transientHash(merkleRoot)]",
  };

  const secretsJson = {
    publisherSkHex: bigintToHex(kp.sk),
    memberSecretKeysHex: tree.memberSecretKeys.map(toHex),
    warning: "LOCAL DEMO ONLY. Do not commit. Not for production.",
  };

  fs.writeFileSync(
    path.join(fixturesDir, "report-ref.json"),
    JSON.stringify(reportRefJson, null, 2) + "\n",
  );
  fs.writeFileSync(
    path.join(fixturesDir, "tree.json"),
    JSON.stringify(treeJson, null, 2) + "\n",
  );
  fs.writeFileSync(
    path.join(fixturesDir, "vectors.json"),
    JSON.stringify(vectorsJson, null, 2) + "\n",
  );
  fs.writeFileSync(
    path.join(secretsDir, "demo-keys.json"),
    JSON.stringify(secretsJson, null, 2) + "\n",
  );

  console.log(
    JSON.stringify(
      {
        wrote: [
          "fixtures/report-ref.json",
          "fixtures/tree.json",
          "fixtures/vectors.json",
          "secrets/demo-keys.json",
        ],
        merkleRootFieldHex: treeJson.merkleRootFieldHex,
        validSignatureAccepted: true,
        mutatedRejected: true,
      },
      null,
      2,
    ),
  );
}

main();
