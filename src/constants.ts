// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

/** Jubjub subgroup order (circuit scalar field for Schnorr response). */
export const JUBJUB_ORDER =
  0x0e7db4ea6533afa906673b0101343b00a6682093ccc81082d0970e5ed6f72cb7n;

/** Challenge truncation modulus used by the Schnorr polyfill (2^248). */
export const TWO_248 =
  452312848583266388373324160190187140051835877600158453279131187530910662656n;

/** Demo Merkle depth (binary tree → up to 16 leaves; we fill 8). */
export const MERKLE_DEPTH = 4;

/** Number of demo member leaves. */
export const LEAF_COUNT = 8;

/**
 * Fixed demo snapshot id (Bytes<32>). Not related to Sepolia auditId / keccak.
 * UTF-8 padded to 32 bytes.
 */
export const SNAPSHOT_ID_UTF8 = "ardmere-midnight-wave3-demo-v1";

/**
 * Public Ardmere report URL used only as reportRef context pointer.
 * Midnight does not re-verify exchange proofs for this URL.
 */
export const REPORT_URL =
  "https://ardmere.github.io/docs/reports/exchange-comparison.html";

/** Domain separator for leaf derivation (must match Compact pad string). */
export const LEAF_DOMAIN = "ardmere:por:pk:v1";

export function pad32(text: string): Uint8Array {
  const out = new Uint8Array(32);
  const bytes = new TextEncoder().encode(text);
  out.set(bytes.slice(0, 32));
  return out;
}

export function toHex(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("hex");
}

export function fromHex(hex: string): Uint8Array {
  const h = hex.startsWith("0x") ? hex.slice(2) : hex;
  return Uint8Array.from(Buffer.from(h, "hex"));
}

export function bigintToHex(n: bigint): string {
  return n.toString(16);
}

export function hexToBigint(hex: string): bigint {
  const h = hex.startsWith("0x") ? hex.slice(2) : hex;
  return BigInt("0x" + h);
}
