// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Submit publishSnapshot on Preprod (preparation step, not a user demo command).
 *
 * Blocked until: funded Preprod wallet (faucet + DUST), local proof-server
 * (Docker), and contract deploy address. This scaffold loads fixtures and
 * prints the intended call payload; it does not claim a Preprod deploy.
 *
 * CLI: npm run publish
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../fixtures");

function main(): void {
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
        status: "not-deployed",
        note:
          "Preprod publish blocked: need Docker proof-server, faucet NIGHT/DUST, and deploy. Fixtures are ready for the call.",
        snapshotId: vectors.snapshotIdHex,
        reportRef: report.reportRefHex,
        reportUrl: report.url,
        merkleRootField: tree.merkleRootFieldHex,
        publisherPk: vectors.publisherPk,
        signature: vectors.validSignature,
        blockers: [
          "docker not available in this environment (proof-server:8.1.3)",
          "Preprod faucet funding + DUST registration not run",
          "Blockfrost / indexer credentials not configured",
          "contract not yet deployed (no address)",
        ],
      },
      null,
      2,
    ),
  );
}

main();
