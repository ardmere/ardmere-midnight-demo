// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Jubjub Schnorr sign over encodeSnapshotMessage(snapshotId, reportRef, merkleRoot).
 * Challenge and encoding come from compiled pureCircuits (parity with the circuit).
 */

import { randomBytes } from "node:crypto";
import { ecMulGenerator } from "@midnight-ntwrk/compact-runtime";
import { JUBJUB_ORDER, TWO_248 } from "./constants.js";
import {
  pureCircuits,
  type MerkleDigest,
  type SchnorrSignature,
  type JubjubPoint,
} from "./contract.js";

export function encodeSnapshotMessage(
  snapshotId: Uint8Array,
  reportRef: Uint8Array,
  merkleRoot: MerkleDigest,
): bigint[] {
  return pureCircuits.encodeSnapshotMessage(snapshotId, reportRef, merkleRoot);
}

export function schnorrChallenge(
  announcement: JubjubPoint,
  pk: JubjubPoint,
  msg: bigint[],
): bigint {
  return pureCircuits.schnorrChallenge(
    announcement.x,
    announcement.y,
    pk.x,
    pk.y,
    msg,
  );
}

export function randomNonce(): bigint {
  for (;;) {
    const candidate =
      BigInt("0x" + Buffer.from(randomBytes(32)).toString("hex")) %
      (JUBJUB_ORDER - 1n);
    if (candidate > 0n) return candidate;
  }
}

export function signSnapshot(args: {
  publisherSk: bigint;
  publisherPk: JubjubPoint;
  snapshotId: Uint8Array;
  reportRef: Uint8Array;
  merkleRoot: MerkleDigest;
  nonce?: bigint;
}): SchnorrSignature {
  const msg = encodeSnapshotMessage(
    args.snapshotId,
    args.reportRef,
    args.merkleRoot,
  );
  const k = args.nonce ?? randomNonce();
  const announcement = ecMulGenerator(k);
  const cFull = schnorrChallenge(announcement, args.publisherPk, msg);
  const c = cFull % TWO_248;
  const response = (k + c * args.publisherSk) % JUBJUB_ORDER;
  return { announcement, response };
}

/** Local helper: mutate one byte of snapshotId for negative signature tests. */
export function mutateSnapshotId(snapshotId: Uint8Array): Uint8Array {
  const out = new Uint8Array(snapshotId);
  out[0] = (out[0] + 1) & 0xff;
  return out;
}

function main(): void {
  const sid = new Uint8Array(32);
  const rref = new Uint8Array(32);
  const root = { field: 1n };
  const msg = encodeSnapshotMessage(sid, rref, root);
  console.log(
    JSON.stringify({ messageFieldCount: msg.length, ok: msg.length === 3 }),
  );
}

const isDirect =
  process.argv[1] &&
  (process.argv[1].endsWith("sign.ts") || process.argv[1].endsWith("sign.js"));
if (isDirect) {
  main();
}
