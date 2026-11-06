// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Submit publishSnapshot on Preprod via hosted proof server.
 *
 * Prep step (not a user demo command). Requires deploy + operator secrets.
 * Without secrets, prints the intended payload + exact missing env — does not
 * invent keys or claim a Preprod tx.
 *
 * CLI: npm run publish
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadPreprodConfig,
  missingForPublish,
} from "./config.js";
import { checkProofServer } from "./proofHealth.js";
import { createProofStack } from "./providers.js";
import { preprodEnv } from "./env.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

async function main(): Promise<void> {
  const cfg = loadPreprodConfig(preprodEnv());
  const missing = missingForPublish(cfg);
  const proof = await checkProofServer(cfg.proofServer);

  const vectors = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
  );
  const tree = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
  );
  const report = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
  );

  // Always construct the proof stack so ZK path + hosted URL are wired even
  // when wallet secrets are absent (deploy/tx still blocked).
  const stack = createProofStack();

  if (missing.length > 0) {
    console.log(
      JSON.stringify(
        {
          status: "blocked",
          note: "publishSnapshot is wired for hosted proof-server but Preprod secrets are missing. Not inventing keys.",
          proofServer: {
            url: cfg.proofServer,
            source: cfg.proofServerSource,
            ok: proof.ok,
            version: proof.version,
            proofVersions: proof.proofVersions,
          },
          zkConfigPath: stack.config.zkConfigPath,
          circuit: "publishSnapshot",
          payload: {
            snapshotId: vectors.snapshotIdHex,
            reportRef: report.reportRefHex,
            reportUrl: report.url,
            merkleRootField: tree.merkleRootFieldHex,
            publisherPk: vectors.publisherPk,
            signature: vectors.validSignature,
          },
          missingSecrets: missing,
          privacyCaveat:
            "Hosted proof-server receives witness/private proving inputs in the clear. Demo/hackathon use only; use a local proof-server for stronger privacy.",
        },
        null,
        2,
      ),
    );
    process.exitCode = 2;
    return;
  }

  console.log(
    JSON.stringify(
      {
        status: "ready-but-undeployed-path-not-executed",
        note: "Secrets present in env. Full wallet sync + deployContract/call are the next implementation step once CONTRACT_ADDRESS is set and DUST is available. This run does not submit a tx.",
        proofServer: {
          url: cfg.proofServer,
          source: cfg.proofServerSource,
          ok: proof.ok,
          version: proof.version,
        },
        contractAddress: cfg.contractAddress,
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
