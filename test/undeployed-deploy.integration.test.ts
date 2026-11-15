// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  STANDARD_POR_ZK_DIR,
  standardPorCompiledContract,
} from "../src/standardPorCompiled.js";

const integration = process.env.MN_INTEGRATION_UNDEPLOYED === "1";

describe("undeployed deploy+submit", { skip: !integration }, () => {
  it("runs npm undeployed:deploy-submit (long, needs Docker or env-var-remote)", async () => {
    const repoRoot = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
    );
    const { spawnSync } = await import("node:child_process");
    const res = spawnSync(
      "npm",
      ["run", "undeployed:deploy-submit"],
      {
        cwd: repoRoot,
        env: process.env,
        encoding: "utf8",
        timeout: 30 * 60 * 1000,
      },
    );
    if (res.status !== 0) {
      console.error(res.stderr || res.stdout);
    }
    assert.equal(res.status, 0);
    const last = JSON.parse(
      fs.readFileSync(
        path.join(repoRoot, "fixtures/undeployed-last-run.json"),
        "utf8",
      ),
    ) as { status: string; contractAddress: string };
    assert.equal(last.status, "ok");
    assert.ok(last.contractAddress);
  });
});

describe("standardPor compiled contract (offline)", () => {
  it("wires witnesses + zk path", () => {
    const cc = standardPorCompiledContract();
    const assetsPath = path.join(STANDARD_POR_ZK_DIR, "keys");
    assert.ok(cc.tag === "standard_por");
    assert.ok(fs.existsSync(path.join(assetsPath, "submitSnapshot.verifier")));
  });
});