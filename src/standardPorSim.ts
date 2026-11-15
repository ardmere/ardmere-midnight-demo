// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import { randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import {
  StandardPorContract,
  standardPorLedger,
  type StandardPorLedger,
} from "./standardPorContract.js";
import {
  createStandardPorPrivateState,
  standardPorWitnesses,
} from "./standardPorWitnesses.js";
import type { BuiltMst, MstLeafInput } from "./mst/index.js";
import { buildMst, normalizeBatch } from "./mst/build.js";

const require = createRequire(import.meta.url);
const compactRuntime = require("@midnight-ntwrk/compact-runtime") as typeof import("@midnight-ntwrk/compact-runtime");
const ocrt = require("@midnight-ntwrk/onchain-runtime-v3") as typeof import("@midnight-ntwrk/onchain-runtime-v3");

function coinPk(bytes?: Uint8Array): { bytes: Uint8Array } {
  return { bytes: bytes ?? randomBytes(32) };
}

export type SimAssetTriple = { btc: bigint; eth: bigint; usdt: bigint };

export function simulateSubmitSnapshot(args: {
  seq: bigint;
  timestamp: bigint;
  prices: SimAssetTriple;
  declaredReserves: SimAssetTriple;
  batch: MstLeafInput[];
  /** Override for negative testing (default: computed MST root). */
  rootHash?: Uint8Array;
  /** Override the caller identity; defaults to matching the authority. */
  callerCoinPk?: Uint8Array;
  /** Override the constructor authority; defaults to the caller coin key. */
  authorityPk?: Uint8Array;
}): { ledger: StandardPorLedger; built: BuiltMst } {
  const built = buildMst(args.batch);
  const rootHash = args.rootHash ?? built.root.hash;

  const leaves = normalizeBatch(args.batch);
  const privateState = createStandardPorPrivateState({
    userIds: leaves.map((l) => l.userIdHash),
    btc: leaves.map((l) => l.btc),
    eth: leaves.map((l) => l.eth),
    usdt: leaves.map((l) => l.usdt),
  });

  const callerCoin = coinPk(args.callerCoinPk);
  const authorityPk = args.authorityPk ?? callerCoin.bytes;

  const C = new StandardPorContract(standardPorWitnesses) as any;
  const init = C.initialState(
    compactRuntime.createConstructorContext(privateState, callerCoin),
    authorityPk,
  );
  const circuitCtx = compactRuntime.createCircuitContext(
    ocrt.sampleContractAddress(),
    callerCoin,
    init.currentContractState,
    init.currentPrivateState,
  );

  const result = C.impureCircuits.submitSnapshot(
    circuitCtx,
    args.seq,
    args.timestamp,
    args.prices.btc,
    args.prices.eth,
    args.prices.usdt,
    args.declaredReserves.btc,
    args.declaredReserves.eth,
    args.declaredReserves.usdt,
    rootHash,
  );

  const charged =
    result.context.currentQueryContext?.state ??
    result.context.currentContractState?.data;
  const ledger = standardPorLedger(charged);
  return { ledger, built };
}
