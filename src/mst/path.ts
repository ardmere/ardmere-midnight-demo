// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import type { BuiltMst } from "./build.js";
import { DEMO_PRICES, MST_DEPTH } from "./constants.js";
import { toHex } from "../constants.js";

export type MstInclusionStep = {
  siblingHashHex: string;
  siblingBtcPosSum: string;
  siblingBtcNegSum: string;
  siblingEthPosSum: string;
  siblingEthNegSum: string;
  siblingUsdtPosSum: string;
  siblingUsdtNegSum: string;
  goesLeft: boolean;
};

export type InclusionPrices = { btc: string; eth: string; usdt: string };

export type MstInclusionProof = {
  leafIndex: number;
  userIdHashHex: string;
  /** Signed balance in smallest units. */
  btc: string;
  eth: string;
  usdt: string;
  leafHashHex: string;
  siblings: MstInclusionStep[];
  mstRootHashHex: string;
  /** Net liabilities (posSum - negSum) per asset. */
  liabilities: { btc: string; eth: string; usdt: string };
  /** Published prices (micro-USDT per smallest unit). */
  prices: InclusionPrices;
};

/**
 * Build an inclusion path from `buildMst` layers for one leaf index.
 * Sibling nodes carry gross long/short sums so the verifier can recompute
 * every parent sum and hash.
 */
export function inclusionProof(
  tree: BuiltMst,
  leafIndex: number,
  prices: { btc: bigint; eth: bigint; usdt: bigint } = DEMO_PRICES,
): MstInclusionProof {
  if (leafIndex < 0 || leafIndex >= tree.leaves.length) {
    throw new RangeError("leafIndex out of range");
  }
  const leaf = tree.leaves[leafIndex];
  const siblings: MstInclusionStep[] = [];
  let idx = leafIndex;

  for (let level = 0; level < MST_DEPTH; level++) {
    const layer = tree.levels[level];
    const isLeft = idx % 2 === 0;
    const siblingIdx = isLeft ? idx + 1 : idx - 1;
    const sibling = layer[siblingIdx];
    siblings.push({
      siblingHashHex: toHex(sibling.hash),
      siblingBtcPosSum: sibling.btcPosSum.toString(),
      siblingBtcNegSum: sibling.btcNegSum.toString(),
      siblingEthPosSum: sibling.ethPosSum.toString(),
      siblingEthNegSum: sibling.ethNegSum.toString(),
      siblingUsdtPosSum: sibling.usdtPosSum.toString(),
      siblingUsdtNegSum: sibling.usdtNegSum.toString(),
      goesLeft: isLeft,
    });
    idx = Math.floor(idx / 2);
  }

  return {
    leafIndex,
    userIdHashHex: toHex(leaf.userIdHash),
    btc: leaf.btc.toString(),
    eth: leaf.eth.toString(),
    usdt: leaf.usdt.toString(),
    leafHashHex: toHex(tree.levels[0][leafIndex].hash),
    siblings,
    mstRootHashHex: toHex(tree.root.hash),
    liabilities: {
      btc: tree.liabilities.btc.toString(),
      eth: tree.liabilities.eth.toString(),
      usdt: tree.liabilities.usdt.toString(),
    },
    prices: {
      btc: prices.btc.toString(),
      eth: prices.eth.toString(),
      usdt: prices.usdt.toString(),
    },
  };
}

/** @deprecated Use `verifyInclusionProof` from `./verify.js`. */
export function verifyInclusionOffChain(proof: MstInclusionProof): boolean {
  return proof.siblings.length === MST_DEPTH;
}
