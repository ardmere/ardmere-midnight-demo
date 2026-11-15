// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Verify an MST inclusion JSON against an expected root (fixtures or CLI arg).
 *
 * CLI:
 *   npm run verify-inclusion -- fixtures/snapshot-vectors.json
 *   npm run verify-inclusion -- path/to/inclusion.json [--root 0x...]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyInclusionProof, type MstInclusionProof } from "./mst/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultFixture = path.resolve(
  here,
  "../fixtures/snapshot-vectors.json",
);

function parseArgs(): { file: string; rootOverride?: string } {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("-")) ?? defaultFixture;
  const rootIdx = args.indexOf("--root");
  const rootOverride =
    rootIdx >= 0 && args[rootIdx + 1] ? args[rootIdx + 1] : undefined;
  return { file, rootOverride };
}

function loadProof(filePath: string): MstInclusionProof {
  const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (raw.sampleInclusion) {
    return raw.sampleInclusion as MstInclusionProof;
  }
  return raw as MstInclusionProof;
}

function main(): void {
  const { file, rootOverride } = parseArgs();
  const proof = loadProof(path.resolve(file));
  if (rootOverride) {
    proof.mstRootHashHex = rootOverride.replace(/^0x/i, "");
  }

  const result = verifyInclusionProof(proof);
  console.log(
    JSON.stringify(
      {
        file,
        leafIndex: proof.leafIndex,
        ok: result.ok,
        expectedRootHex: result.expectedRootHex,
        recomputedRootHex: result.recomputedRootHex,
        leafHashMatches: result.leafHashMatches,
        liabilitiesMatch: result.liabilitiesMatch,
        navValueMicroUsdt: result.navValue,
        navPositive: result.navPositive,
        reason: result.reason,
      },
      null,
      2,
    ),
  );
  if (!result.ok) process.exitCode = 1;
}

main();
