// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Read public ledger fields via ledger() / indexer (no proof, no DUST).
 *
 * Until Preprod deploy exists, prints fixture public fields and notes that
 * on-chain read is blocked.
 *
 * CLI: npm run read
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
        source: "fixtures (contract not deployed on Preprod yet)",
        snapshotId: vectors.snapshotIdHex,
        reportRef: report.reportRefHex,
        reportUrl: report.url,
        merkleRootField: tree.merkleRootFieldHex,
        published: false,
        note: "After deploy + publishSnapshot, this command will call ledger()/indexer with no proof and no DUST.",
        preprodAddress: null,
      },
      null,
      2,
    ),
  );
}

main();
