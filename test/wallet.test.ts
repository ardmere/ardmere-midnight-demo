// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { deriveUnshieldedAddress, resolveSeed } from "../src/wallet.js";

const SEED = "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f";

describe("offline wallet identity", () => {
  it("derives a Preprod unshielded address from a hex seed", () => {
    const { address, networkId } = deriveUnshieldedAddress(SEED);
    assert.equal(networkId, "preprod");
    assert.match(address, /^mn_addr_preprod1[0-9a-z]+$/);
  });

  it("is deterministic for the same seed", () => {
    assert.equal(
      deriveUnshieldedAddress(SEED).address,
      deriveUnshieldedAddress(SEED).address,
    );
  });

  it("rejects a malformed seed", () => {
    assert.throws(() => deriveUnshieldedAddress("not-a-seed"));
    assert.throws(() => deriveUnshieldedAddress("0x" + SEED));
  });

  it("prefers MIDNIGHT_WALLET_SEED over any stored seed", () => {
    const resolved = resolveSeed({ MIDNIGHT_WALLET_SEED: SEED });
    assert.equal(resolved.source, "env");
    assert.equal(resolved.seedHex, SEED);
  });
});
