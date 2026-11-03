// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Local Compact circuit simulation helpers (no proof server / no Preprod).
 *
 * Important: load compact-runtime via createRequire (CJS) so instanceof checks
 * share the same onchain-runtime WASM instance as the compiled contract.
 */

import { randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import {
  Contract,
  ledger,
  type MerkleDigest,
  type MerklePath,
  type SchnorrSignature,
  type JubjubPoint,
} from "./contract.js";
import { createPrivateState, witnesses } from "./witnesses.js";

const require = createRequire(import.meta.url);
const compactRuntime = require("@midnight-ntwrk/compact-runtime") as typeof import("@midnight-ntwrk/compact-runtime");
const ocrt = require("@midnight-ntwrk/onchain-runtime-v3") as typeof import("@midnight-ntwrk/onchain-runtime-v3");

function coinPk(): { bytes: Uint8Array } {
  return { bytes: randomBytes(32) };
}

export function simulatePublish(args: {
  publisherPk: JubjubPoint;
  snapshotId: Uint8Array;
  reportRef: Uint8Array;
  merkleRoot: MerkleDigest;
  signature: SchnorrSignature;
  callerSk?: Uint8Array;
}): { published: boolean; merkleRoot: MerkleDigest; context: any } {
  const C = new Contract(witnesses) as any;
  const sk = args.callerSk ?? randomBytes(32);
  const init = C.initialState(
    compactRuntime.createConstructorContext(createPrivateState(sk), coinPk()),
    args.publisherPk,
  );
  const circuitCtx = compactRuntime.createCircuitContext(
    ocrt.sampleContractAddress(),
    coinPk(),
    init.currentContractState,
    init.currentPrivateState,
  );
  const result = C.impureCircuits.publishSnapshot(
    circuitCtx,
    args.snapshotId,
    args.reportRef,
    args.merkleRoot,
    args.signature,
  );
  // After an impure circuit, public state lives on the query context.
  const charged =
    result.context.currentQueryContext?.state ??
    result.context.currentContractState?.data;
  const led = ledger(charged);
  return {
    published: led.published,
    merkleRoot: led.merkleRoot,
    context: result.context,
  };
}

export function simulateAttest(args: {
  publishedContext: any;
  callerSk: Uint8Array;
  path: MerklePath;
}): void {
  const C = new Contract(witnesses) as any;
  const ctx = {
    ...args.publishedContext,
    currentPrivateState: createPrivateState(args.callerSk),
  };
  C.impureCircuits.attestInclusion(ctx, args.path);
}
