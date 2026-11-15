// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Deterministic demo key material.
 *
 * Every "random" key in the demo is derived from a fixed label with SHA-256.
 * That keeps `npm run generate:fixtures` idempotent and lets a fresh clone run
 * `npm test` / `npm run attest` without first creating a gitignored secrets
 * file — the committed fixtures and the local member keys stay consistent.
 *
 * These are public demo keys. They are NOT operator keys and must never hold
 * real value.
 */

import { createHash } from "node:crypto";
import { JUBJUB_ORDER, LEAF_COUNT } from "./constants.js";
import { secretKeyFromBytes } from "./keys.js";

export const DEMO_LABEL = "ardmere-midnight-wave3-demo-v1";

/** Deterministic 32-byte stream for a label (counter-mode SHA-256). */
export function demoBytes(label: string): Uint8Array {
  return Uint8Array.from(
    createHash("sha256").update(`${DEMO_LABEL}:${label}`).digest(),
  );
}

export type DemoKeys = {
  publisherSk: bigint;
  /** One secret key per Merkle leaf, in leaf order. */
  memberSecretKeys: Uint8Array[];
  /** Fixed Schnorr nonce so the recorded signature vector is stable. */
  signatureNonce: bigint;
};

export function demoKeys(): DemoKeys {
  const nonce =
    BigInt("0x" + Buffer.from(demoBytes("signature-nonce")).toString("hex")) %
    (JUBJUB_ORDER - 1n);

  return {
    publisherSk: secretKeyFromBytes(demoBytes("publisher-sk")),
    memberSecretKeys: Array.from({ length: LEAF_COUNT }, (_, i) =>
      demoBytes(`member-sk:${i}`),
    ),
    signatureNonce: nonce > 0n ? nonce : 1n,
  };
}
