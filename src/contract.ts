// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const managed = path.resolve(
  here,
  "../contract/managed/por_snapshot/contract/index.js",
);

// Compiled Compact output is CommonJS.
export const compiled: any = require(managed);

export type MerkleDigest = { field: bigint };
export type JubjubPoint = { x: bigint; y: bigint };
export type SchnorrSignature = {
  announcement: JubjubPoint;
  response: bigint;
};
export type MerklePath = {
  leaf: Uint8Array;
  path: { sibling: MerkleDigest; goes_left: boolean }[];
};

export const pureCircuits = compiled.pureCircuits as {
  derivePublicKey(sk: Uint8Array): Uint8Array;
  encodeSnapshotMessage(
    sid: Uint8Array,
    rref: Uint8Array,
    root: MerkleDigest,
  ): bigint[];
  schnorrChallenge(
    ann_x: bigint,
    ann_y: bigint,
    pk_x: bigint,
    pk_y: bigint,
    msg: bigint[],
  ): bigint;
};

export const Contract = compiled.Contract as new (witnesses: unknown) => {
  initialState: (...args: unknown[]) => unknown;
  impureCircuits: Record<string, (...args: unknown[]) => unknown>;
  circuits: Record<string, (...args: unknown[]) => unknown>;
  _merkleTreePathRoot_0(path: MerklePath): MerkleDigest;
};

export const ledger = compiled.ledger as (state: unknown) => {
  publisherPk: JubjubPoint;
  snapshotId: Uint8Array;
  reportRef: Uint8Array;
  merkleRoot: MerkleDigest;
  published: boolean;
};
