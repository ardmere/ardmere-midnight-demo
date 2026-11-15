// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import type { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import { MST_LEAF_COUNT } from "./mst/constants.js";
import { splitSigned } from "./mst/build.js";

export type StandardPorPrivateState = {
  userIds: Uint8Array[];
  btcPos: bigint[];
  btcNeg: bigint[];
  ethPos: bigint[];
  ethNeg: bigint[];
  usdtPos: bigint[];
  usdtNeg: bigint[];
};

export type StandardPorLedgerView = {
  authorityPk: Uint8Array;
  snapshotSeq: bigint;
  timestamp: bigint;
  mstRoot: Uint8Array;
  priceBtc: bigint;
  priceEth: bigint;
  priceUsdt: bigint;
  declaredReservesBtc: bigint;
  declaredReservesEth: bigint;
  declaredReservesUsdt: bigint;
  liabilitiesBtcPos: bigint;
  liabilitiesBtcNeg: bigint;
  liabilitiesEthPos: bigint;
  liabilitiesEthNeg: bigint;
  liabilitiesUsdtPos: bigint;
  liabilitiesUsdtNeg: bigint;
  published: boolean;
};

export function createStandardPorPrivateState(args: {
  userIds: Uint8Array[];
  btc: bigint[];
  eth: bigint[];
  usdt: bigint[];
}): StandardPorPrivateState {
  for (const [name, arr] of [
    ["userIds", args.userIds],
    ["btc", args.btc],
    ["eth", args.eth],
    ["usdt", args.usdt],
  ] as const) {
    if (arr.length !== MST_LEAF_COUNT) {
      throw new Error(`expected ${MST_LEAF_COUNT} ${name}`);
    }
  }

  return {
    userIds: args.userIds,
    btcPos: args.btc.map((v) => splitSigned(v).pos),
    btcNeg: args.btc.map((v) => splitSigned(v).neg),
    ethPos: args.eth.map((v) => splitSigned(v).pos),
    ethNeg: args.eth.map((v) => splitSigned(v).neg),
    usdtPos: args.usdt.map((v) => splitSigned(v).pos),
    usdtNeg: args.usdt.map((v) => splitSigned(v).neg),
  };
}

export const standardPorWitnesses = {
  batchUserIds(
    context: WitnessContext<StandardPorLedgerView, StandardPorPrivateState>,
  ): [StandardPorPrivateState, Uint8Array[]] {
    return [context.privateState, context.privateState.userIds];
  },
  batchBtcPos(
    context: WitnessContext<StandardPorLedgerView, StandardPorPrivateState>,
  ): [StandardPorPrivateState, bigint[]] {
    return [context.privateState, context.privateState.btcPos];
  },
  batchBtcNeg(
    context: WitnessContext<StandardPorLedgerView, StandardPorPrivateState>,
  ): [StandardPorPrivateState, bigint[]] {
    return [context.privateState, context.privateState.btcNeg];
  },
  batchEthPos(
    context: WitnessContext<StandardPorLedgerView, StandardPorPrivateState>,
  ): [StandardPorPrivateState, bigint[]] {
    return [context.privateState, context.privateState.ethPos];
  },
  batchEthNeg(
    context: WitnessContext<StandardPorLedgerView, StandardPorPrivateState>,
  ): [StandardPorPrivateState, bigint[]] {
    return [context.privateState, context.privateState.ethNeg];
  },
  batchUsdtPos(
    context: WitnessContext<StandardPorLedgerView, StandardPorPrivateState>,
  ): [StandardPorPrivateState, bigint[]] {
    return [context.privateState, context.privateState.usdtPos];
  },
  batchUsdtNeg(
    context: WitnessContext<StandardPorLedgerView, StandardPorPrivateState>,
  ): [StandardPorPrivateState, bigint[]] {
    return [context.privateState, context.privateState.usdtNeg];
  },
};
