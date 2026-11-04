// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Off-chain depth-4 Compact-hash Merkle tree with 8 demo leaves.
 * Leaf derivation and path folding match the circuit (derivePublicKey +
 * merkleTreePathRoot). Empty slots use the same blank-tree rules as Compact.
 */

import { randomBytes } from "node:crypto";
import {
  CompactTypeBytes,
  CompactTypeMerkleTreeDigest,
  CompactTypeMerkleTreePath,
} from "@midnight-ntwrk/compact-runtime";
import { StateBoundedMerkleTree } from "@midnight-ntwrk/onchain-runtime-v3";
import {
  LEAF_COUNT,
  MERKLE_DEPTH,
  toHex,
} from "./constants.js";
import {
  pureCircuits,
  type MerkleDigest,
  type MerklePath,
} from "./contract.js";
import { Contract } from "./contract.js";
import { witnesses } from "./witnesses.js";

const leafType = new CompactTypeBytes(32);
const pathType = new CompactTypeMerkleTreePath(MERKLE_DEPTH, leafType);

export function toAligned(leaf: Uint8Array) {
  return {
    value: leafType.toValue(leaf),
    alignment: leafType.alignment(),
  };
}

export function deriveLeaf(sk: Uint8Array): Uint8Array {
  return pureCircuits.derivePublicKey(sk);
}

export type BuiltTree = {
  /** 8 member secret keys (private — not for public logs). */
  memberSecretKeys: Uint8Array[];
  /** Public leaves (derivePublicKey of each secret). */
  leaves: Uint8Array[];
  /** Compact MerkleTreeDigest root. */
  root: MerkleDigest;
  /** Inclusion paths for each of the 8 leaves. */
  paths: MerklePath[];
};

export function buildDemoTree(memberSecretKeys?: Uint8Array[]): BuiltTree {
  const sks =
    memberSecretKeys ??
    Array.from({ length: LEAF_COUNT }, () => randomBytes(32));
  if (sks.length !== LEAF_COUNT) {
    throw new Error(`expected ${LEAF_COUNT} member keys`);
  }
  const leaves = sks.map(deriveLeaf);

  let tree = new StateBoundedMerkleTree(MERKLE_DEPTH);
  for (let i = 0; i < LEAF_COUNT; i++) {
    tree = tree.update(BigInt(i), toAligned(leaves[i]));
  }
  tree = tree.rehash();

  const rootAligned = tree.root();
  if (!rootAligned) {
    throw new Error("tree root missing after rehash");
  }
  const root = CompactTypeMerkleTreeDigest.fromValue([...rootAligned.value]);

  const paths: MerklePath[] = [];
  for (let i = 0; i < LEAF_COUNT; i++) {
    const pathAligned = tree.pathForLeaf(BigInt(i), toAligned(leaves[i]));
    paths.push(pathType.fromValue([...pathAligned.value]));
  }

  return { memberSecretKeys: sks, leaves, root, paths };
}

/** Recompute root from a path using the compiled circuit helper (same hash). */
export function recomputeRootFromPath(path: MerklePath): MerkleDigest {
  const c = new Contract(witnesses);
  return c._merkleTreePathRoot_0(path);
}

export function assertPathsMatchRoot(tree: BuiltTree): void {
  for (let i = 0; i < tree.paths.length; i++) {
    const recomputed = recomputeRootFromPath(tree.paths[i]);
    if (recomputed.field !== tree.root.field) {
      throw new Error(`path ${i} root mismatch`);
    }
  }
}

function main(): void {
  const tree = buildDemoTree();
  assertPathsMatchRoot(tree);
  console.log(
    JSON.stringify(
      {
        merkleRootField: tree.root.field.toString(16),
        leafCount: tree.leaves.length,
        leaf0: toHex(tree.leaves[0]),
        pathsMatchRoot: true,
      },
      null,
      2,
    ),
  );
}

const isDirect =
  process.argv[1] &&
  (process.argv[1].endsWith("tree.ts") || process.argv[1].endsWith("tree.js"));
if (isDirect) {
  main();
}
