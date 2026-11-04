// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  HOSTED_PREPROD_PROOF_SERVER,
  loadPreprodConfig,
  missingPreprodSecrets,
  ZK_CONFIG_PATH,
} from "../src/config.js";
import { checkProofServer } from "../src/proofHealth.js";
import { createProofStack } from "../src/providers.js";

const here = path.dirname(fileURLToPath(import.meta.url));

describe("hosted proof config", () => {
  it("defaults proofServer to Midnight hosted Preprod URL", () => {
    const cfg = loadPreprodConfig({});
    assert.equal(cfg.proofServer, HOSTED_PREPROD_PROOF_SERVER);
    assert.equal(cfg.proofServerSource, "hosted");
  });

  it("lists exact missing secrets without inventing keys", () => {
    const cfg = loadPreprodConfig({});
    const missing = missingPreprodSecrets(cfg);
    const names = missing.map((m) => m.name);
    assert.ok(names.includes("BLOCKFROST_PROJECT_ID"));
    assert.ok(
      names.some((n) => n.includes("MIDNIGHT_WALLET")),
      "wallet secret required",
    );
    assert.ok(names.includes("PRIVATE_STATE_PASSWORD"));
  });

  it("honors MIDNIGHT_PROOF_SERVER_URL override", () => {
    const cfg = loadPreprodConfig({
      MIDNIGHT_PROOF_SERVER_URL: "http://127.0.0.1:6300",
    });
    assert.equal(cfg.proofServer, "http://127.0.0.1:6300");
    assert.equal(cfg.proofServerSource, "local");
  });

  it("zk config path contains compiled keys for publish + attest", () => {
    assert.ok(fs.existsSync(path.join(ZK_CONFIG_PATH, "keys/publishSnapshot.prover")));
    assert.ok(fs.existsSync(path.join(ZK_CONFIG_PATH, "keys/attestInclusion.prover")));
    assert.ok(fs.existsSync(path.join(ZK_CONFIG_PATH, "zkir/publishSnapshot.zkir")));
  });

  it("createProofStack wires httpClientProofProvider to hosted URL", () => {
    const stack = createProofStack({});
    assert.equal(stack.config.proofServer, HOSTED_PREPROD_PROOF_SERVER);
    assert.ok(stack.proofProvider);
    assert.ok(stack.zkConfigProvider);
  });

  it("hosted Preprod proof-server /health is ok (network)", async () => {
    const result = await checkProofServer(HOSTED_PREPROD_PROOF_SERVER);
    assert.equal(result.ok, true, result.error);
    assert.ok(result.version, "version missing");
    // Hosted reported 8.1.0 on 2026-11-04; matrix pins local 8.1.3 — both V2.
    assert.ok(
      String(result.version).startsWith("8.1."),
      `unexpected version ${result.version}`,
    );
  });
});

void here;
