// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import { mstPure, type MstNode } from "../mstContract.js";
import {
  MST_LEAF_COUNT,
  UINT64_MAX,
  ZERO_USER_ID,
} from "./constants.js";
import { toHex } from "../constants.js";

export type AssetTriple = { btc: bigint; eth: bigint; usdt: bigint };

export type MstLeafInput = AssetTriple & {
  userIdHash: Uint8Array;
};

/** Signed-magnitude split for one asset: net = pos - neg. */
export type Split = { pos: bigint; neg: bigint };

export type MstLeaf = MstLeafInput & {
  btcPos: bigint;
  btcNeg: bigint;
  ethPos: bigint;
  ethNeg: bigint;
  usdtPos: bigint;
  usdtNeg: bigint;
};

export type BuiltMst = {
  leaves: MstLeaf[];
  levels: MstNode[][];
  root: MstNode;
  /** Net exposure per asset (posSum - negSum), in smallest units. */
  liabilities: AssetTriple;
  /** Gross long/short sums, in smallest units. */
  gross: {
    btcPos: bigint;
    btcNeg: bigint;
    ethPos: bigint;
    ethNeg: bigint;
    usdtPos: bigint;
    usdtNeg: bigint;
  };
};

/** Canonical signed split: at most one side is non-zero. */
export function splitSigned(value: bigint): Split {
  if (value >= 0n) return { pos: value, neg: 0n };
  return { pos: 0n, neg: -value };
}

function assertAmount(asset: string, value: bigint, i: number): void {
  if (typeof value !== "bigint") {
    throw new Error(`leaf ${i}: ${asset} must be a bigint`);
  }
  const abs = value < 0n ? -value : value;
  if (abs > UINT64_MAX) {
    throw new Error(`leaf ${i}: ${asset} magnitude exceeds Uint<64>`);
  }
}

function assertLeaf(entry: MstLeafInput, i: number): void {
  if (entry.userIdHash.length !== 32) {
    throw new Error(`leaf ${i}: userIdHash must be 32 bytes`);
  }
  assertAmount("btc", entry.btc, i);
  assertAmount("eth", entry.eth, i);
  assertAmount("usdt", entry.usdt, i);
}

function expandLeaf(entry: MstLeafInput): MstLeaf {
  const btc = splitSigned(entry.btc);
  const eth = splitSigned(entry.eth);
  const usdt = splitSigned(entry.usdt);
  return {
    userIdHash: new Uint8Array(entry.userIdHash),
    btc: entry.btc,
    eth: entry.eth,
    usdt: entry.usdt,
    btcPos: btc.pos,
    btcNeg: btc.neg,
    ethPos: eth.pos,
    ethNeg: eth.neg,
    usdtPos: usdt.pos,
    usdtNeg: usdt.neg,
  };
}

/** Pad with zero-balance leaves to the fixed 64-leaf shape. */
export function normalizeBatch(entries: MstLeafInput[]): MstLeaf[] {
  if (entries.length > MST_LEAF_COUNT) {
    throw new Error(`at most ${MST_LEAF_COUNT} leaves`);
  }
  const out: MstLeaf[] = entries.map((e, i) => {
    assertLeaf(e, i);
    return expandLeaf(e);
  });
  while (out.length < MST_LEAF_COUNT) {
    out.push(
      expandLeaf({
        userIdHash: new Uint8Array(ZERO_USER_ID),
        btc: 0n,
        eth: 0n,
        usdt: 0n,
      }),
    );
  }
  return out;
}


export function buildMst(entries: MstLeafInput[]): BuiltMst {
  const leaves = normalizeBatch(entries);
  const userIds = leaves.map((l) => l.userIdHash);

  const root = mstPure.mstRootFromLeaves(
    userIds,
    leaves.map((l) => l.btcPos),
    leaves.map((l) => l.btcNeg),
    leaves.map((l) => l.ethPos),
    leaves.map((l) => l.ethNeg),
    leaves.map((l) => l.usdtPos),
    leaves.map((l) => l.usdtNeg),
  );

  const levels: MstNode[][] = [];
  let layer: MstNode[] = leaves.map((l) => ({
    hash: mstPure.leafHash(
      l.userIdHash,
      l.btcPos,
      l.btcNeg,
      l.ethPos,
      l.ethNeg,
      l.usdtPos,
      l.usdtNeg,
    ),
    btcPosSum: l.btcPos,
    btcNegSum: l.btcNeg,
    ethPosSum: l.ethPos,
    ethNegSum: l.ethNeg,
    usdtPosSum: l.usdtPos,
    usdtNegSum: l.usdtNeg,
  }));
  levels.push(layer);

  while (layer.length > 1) {
    const next: MstNode[] = [];
    for (let i = 0; i < layer.length; i += 2) {
      next.push(mstPure.parentHash(layer[i], layer[i + 1]));
    }
    levels.push(next);
    layer = next;
  }

  const top = levels[levels.length - 1][0];
  if (root.hash.length !== 32) {
    throw new Error("unexpected root hash length");
  }
  if (toHex(root.hash) !== toHex(top.hash)) {
    throw new Error("TS root hash mismatch vs layered build");
  }
  const sumFields = [
    "btcPosSum",
    "btcNegSum",
    "ethPosSum",
    "ethNegSum",
    "usdtPosSum",
    "usdtNegSum",
  ] as const;
  for (const field of sumFields) {
    if (root[field] !== top[field]) {
      throw new Error(`TS root ${field} mismatch vs layered build`);
    }
  }

  return {
    leaves,
    levels,
    root,
    liabilities: {
      btc: root.btcPosSum - root.btcNegSum,
      eth: root.ethPosSum - root.ethNegSum,
      usdt: root.usdtPosSum - root.usdtNegSum,
    },
    gross: {
      btcPos: root.btcPosSum,
      btcNeg: root.btcNegSum,
      ethPos: root.ethPosSum,
      ethNeg: root.ethNegSum,
      usdtPos: root.usdtPosSum,
      usdtNeg: root.usdtNegSum,
    },
  };
}

/** Net per-asset exposure over active leaves (not padded). */
export function totalActiveLiabilities(entries: MstLeafInput[]): AssetTriple {
  let btc = 0n;
  let eth = 0n;
  let usdt = 0n;
  for (let i = 0; i < entries.length; i++) {
    assertLeaf(entries[i], i);
    btc += entries[i].btc;
    eth += entries[i].eth;
    usdt += entries[i].usdt;
  }
  return { btc, eth, usdt };
}

/** Net asset value in micro-USDT for one user at the given prices. */
export function netAssetValue(
  balances: AssetTriple,
  prices: AssetTriple,
): bigint {
  const btc = splitSigned(balances.btc);
  const eth = splitSigned(balances.eth);
  const usdt = splitSigned(balances.usdt);
  const pos =
    btc.pos * prices.btc + eth.pos * prices.eth + usdt.pos * prices.usdt;
  const neg =
    btc.neg * prices.btc + eth.neg * prices.eth + usdt.neg * prices.usdt;
  return pos - neg;
}
