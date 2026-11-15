// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import { fromHex, toHex } from "../constants.js";
import { mstPure } from "../mstContract.js";
import type { MstNode } from "../mstContract.js";
import { DEMO_PRICES, MST_DEPTH } from "./constants.js";
import { splitSigned } from "./build.js";
import type { MstInclusionProof } from "./path.js";

export type VerifyInclusionResult = {
  ok: boolean;
  recomputedRootHex: string;
  expectedRootHex: string;
  leafHashMatches: boolean;
  liabilitiesMatch: boolean;
  navValue: string;
  navPositive: boolean;
  depth: number;
  reason?: string;
};

export function verifyInclusionProof(
  proof: MstInclusionProof,
): VerifyInclusionResult {
  const expectedRootHex = proof.mstRootHashHex.toLowerCase();
  if (proof.siblings.length !== MST_DEPTH) {
    return {
      ok: false,
      recomputedRootHex: "",
      expectedRootHex,
      leafHashMatches: false,
      liabilitiesMatch: false,
      navValue: "0",
      navPositive: false,
      depth: proof.siblings.length,
      reason: `expected ${MST_DEPTH} siblings`,
    };
  }

  const userId = fromHex(proof.userIdHashHex);
  const btcSplit = splitSigned(BigInt(proof.btc));
  const ethSplit = splitSigned(BigInt(proof.eth));
  const usdtSplit = splitSigned(BigInt(proof.usdt));

  const leafFromData = toHex(
    mstPure.leafHash(
      userId,
      btcSplit.pos,
      btcSplit.neg,
      ethSplit.pos,
      ethSplit.neg,
      usdtSplit.pos,
      usdtSplit.neg,
    ),
  );
  const leafHashMatches =
    leafFromData.toLowerCase() === proof.leafHashHex.toLowerCase();

  let node: MstNode = {
    hash: fromHex(proof.leafHashHex),
    btcPosSum: btcSplit.pos,
    btcNegSum: btcSplit.neg,
    ethPosSum: ethSplit.pos,
    ethNegSum: ethSplit.neg,
    usdtPosSum: usdtSplit.pos,
    usdtNegSum: usdtSplit.neg,
  };

  for (const step of proof.siblings) {
    const sibling: MstNode = {
      hash: fromHex(step.siblingHashHex),
      btcPosSum: BigInt(step.siblingBtcPosSum),
      btcNegSum: BigInt(step.siblingBtcNegSum),
      ethPosSum: BigInt(step.siblingEthPosSum),
      ethNegSum: BigInt(step.siblingEthNegSum),
      usdtPosSum: BigInt(step.siblingUsdtPosSum),
      usdtNegSum: BigInt(step.siblingUsdtNegSum),
    };
    node = step.goesLeft
      ? mstPure.parentHash(node, sibling)
      : mstPure.parentHash(sibling, node);
  }

  const recomputedRootHex = toHex(node.hash).toLowerCase();
  const rootMatches = recomputedRootHex === expectedRootHex.toLowerCase();

  const liabilitiesMatch =
    (node.btcPosSum - node.btcNegSum).toString() === proof.liabilities.btc &&
    (node.ethPosSum - node.ethNegSum).toString() === proof.liabilities.eth &&
    (node.usdtPosSum - node.usdtNegSum).toString() === proof.liabilities.usdt;

  const prices = proof.prices ?? {
    btc: DEMO_PRICES.btc.toString(),
    eth: DEMO_PRICES.eth.toString(),
    usdt: DEMO_PRICES.usdt.toString(),
  };
  const priceBtc = BigInt(prices.btc);
  const priceEth = BigInt(prices.eth);
  const priceUsdt = BigInt(prices.usdt);
  const posValue =
    btcSplit.pos * priceBtc +
    ethSplit.pos * priceEth +
    usdtSplit.pos * priceUsdt;
  const negValue =
    btcSplit.neg * priceBtc +
    ethSplit.neg * priceEth +
    usdtSplit.neg * priceUsdt;
  const navValue = posValue - negValue;
  const navPositive = navValue > 0n;

  const ok = leafHashMatches && rootMatches && liabilitiesMatch && navPositive;

  return {
    ok,
    recomputedRootHex,
    expectedRootHex,
    leafHashMatches,
    liabilitiesMatch,
    navValue: navValue.toString(),
    navPositive,
    depth: proof.siblings.length,
    reason: ok
      ? undefined
      : !leafHashMatches
        ? "leaf hash does not match userId+balances"
        : !rootMatches
          ? "recomputed root does not match mstRootHashHex"
          : !liabilitiesMatch
            ? "recomputed liabilities do not match proof"
            : "net asset value is not positive",
  };
}
