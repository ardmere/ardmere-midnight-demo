// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Generate / load Jubjub signing key and publisherPk.
 *
 * CLI: npm run keys
 * Writes public publisherPk into fixtures/vectors.json (via generate-fixtures).
 * Secret keys stay under secrets/ (gitignored) unless --print is used for local demo.
 */

import { randomBytes } from "node:crypto";
import { ecMulGenerator } from "@midnight-ntwrk/compact-runtime";
import {
  JUBJUB_ORDER,
  bigintToHex,
  fromHex,
  hexToBigint,
  toHex,
} from "./constants.js";
import type { JubjubPoint } from "./contract.js";

export type PublisherKeypair = {
  sk: bigint;
  pk: JubjubPoint;
};

/** Reduce arbitrary bytes to a nonzero Jubjub scalar. */
export function secretKeyFromBytes(bytes: Uint8Array): bigint {
  const hex = toHex(bytes);
  const scalar = BigInt("0x" + hex) % (JUBJUB_ORDER - 1n);
  return scalar + 1n;
}

export function randomSecretKey(): bigint {
  return secretKeyFromBytes(randomBytes(32));
}

export function derivePublisherPk(sk: bigint): JubjubPoint {
  return ecMulGenerator(sk);
}

export function generatePublisherKeypair(): PublisherKeypair {
  const sk = randomSecretKey();
  return { sk, pk: derivePublisherPk(sk) };
}

export function loadPublisherKeypairFromHex(skHex: string): PublisherKeypair {
  const sk = secretKeyFromBytes(fromHex(skHex));
  return { sk, pk: derivePublisherPk(sk) };
}

export function pointToJson(pk: JubjubPoint): { x: string; y: string } {
  return { x: bigintToHex(pk.x), y: bigintToHex(pk.y) };
}

export function pointFromJson(j: { x: string; y: string }): JubjubPoint {
  return { x: hexToBigint(j.x), y: hexToBigint(j.y) };
}

function main(): void {
  const kp = generatePublisherKeypair();
  console.log(
    JSON.stringify(
      {
        publisherPk: pointToJson(kp.pk),
        // Secret printed only for local demo generation — do not commit.
        publisherSkHex: bigintToHex(kp.sk),
      },
      null,
      2,
    ),
  );
}

const isDirect =
  process.argv[1] &&
  (process.argv[1].endsWith("keys.ts") || process.argv[1].endsWith("keys.js"));
if (isDirect) {
  main();
}
