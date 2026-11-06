// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { upsertEnvVar } from "../src/env.js";

function tmpFile(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ardmere-env-"));
  return path.join(dir, ".env");
}

describe(".env writing", () => {
  it("creates the file with restrictive permissions", () => {
    const file = tmpFile();
    assert.equal(upsertEnvVar("MIDNIGHT_WALLET_ADDRESS", "mn_addr_preprod1x", file), "created");
    assert.equal(fs.statSync(file).mode & 0o777, 0o600);
    assert.match(fs.readFileSync(file, "utf8"), /^MIDNIGHT_WALLET_ADDRESS=mn_addr_preprod1x$/m);
  });

  it("updates in place without disturbing comments or other keys", () => {
    const file = tmpFile();
    fs.writeFileSync(file, "# header\nKEEP=1\nTARGET=old\nOTHER=2\n", { mode: 0o600 });
    assert.equal(upsertEnvVar("TARGET", "new", file), "updated");
    const text = fs.readFileSync(file, "utf8");
    assert.match(text, /# header/);
    assert.match(text, /^KEEP=1$/m);
    assert.match(text, /^TARGET=new$/m);
    assert.match(text, /^OTHER=2$/m);
    assert.equal(text.match(/TARGET=/g)?.length, 1);
  });

  it("is idempotent", () => {
    const file = tmpFile();
    upsertEnvVar("K", "v", file);
    const before = fs.readFileSync(file, "utf8");
    assert.equal(upsertEnvVar("K", "v", file), "unchanged");
    assert.equal(fs.readFileSync(file, "utf8"), before);
  });

  it("rejects invalid keys and multi-line values", () => {
    const file = tmpFile();
    assert.throws(() => upsertEnvVar("bad key", "v", file));
    assert.throws(() => upsertEnvVar("OK_KEY", "a\nb", file));
  });
});
