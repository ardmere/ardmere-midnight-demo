// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Read public ledger fields via ledger() / indexer (no proof, no DUST).
 *
 * Until CONTRACT_ADDRESS + BLOCKFROST_PROJECT_ID exist, prints fixtures and
 * lists the exact env needed for live Preprod reads.
 *
 * CLI: npm run read
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPreprodConfig, missingForPublish } from "./config.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

function main(): void {
  const cfg = loadPreprodConfig();
  const missing = missingForPublish(cfg).filter(
    (m) =>
      m.name === "BLOCKFROST_PROJECT_ID" || m.name === "CONTRACT_ADDRESS",
  );

  const vectors = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "vectors.json"), "utf8"),
  );
  const tree = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "tree.json"), "utf8"),
  );
  const report = JSON.parse(
    fs.readFileSync(path.join(fixturesDir, "report-ref.json"), "utf8"),
  );

  console.log(
    JSON.stringify(
      {
        source:
          missing.length === 0
            ? "preprod-ready (indexer call not yet wired in this CLI revision)"
            : "fixtures (live indexer read blocked)",
        snapshotId: vectors.snapshotIdHex,
        reportRef: report.reportRefHex,
        reportUrl: report.url,
        merkleRootField: tree.merkleRootFieldHex,
        published: false,
        proofServer: {
          url: cfg.proofServer,
          source: cfg.proofServerSource,
          note: "read does not use the proof server (no proof / no DUST).",
        },
        preprodAddress: cfg.contractAddress,
        missingSecrets: missing,
      },
      null,
      2,
    ),
  );
  if (missing.length > 0) process.exitCode = 2;
}

main();
