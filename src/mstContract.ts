// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const managed = path.resolve(
  here,
  "../contract/managed/mst_bundle/contract/index.js",
);

export const mstCompiled: any = require(managed);

export type MstNode = {
  hash: Uint8Array;
  btcPosSum: bigint;
  btcNegSum: bigint;
  ethPosSum: bigint;
  ethNegSum: bigint;
  usdtPosSum: bigint;
  usdtNegSum: bigint;
};

export const mstPure = mstCompiled.pureCircuits as {
  leafHash(
    userIdHash: Uint8Array,
    btcPos: bigint,
    btcNeg: bigint,
    ethPos: bigint,
    ethNeg: bigint,
    usdtPos: bigint,
    usdtNeg: bigint,
  ): Uint8Array;
  parentHash(left: MstNode, right: MstNode): MstNode;
  mstRootFromLeaves(
    userIds: Uint8Array[],
    btcPos: bigint[],
    btcNeg: bigint[],
    ethPos: bigint[],
    ethNeg: bigint[],
    usdtPos: bigint[],
    usdtNeg: bigint[],
  ): MstNode;
};
