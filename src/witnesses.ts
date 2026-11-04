// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import type { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import { TWO_248 } from "./constants.js";

export type PrivateState = {
  /** Secret key for the attesting member (32 bytes). */
  callerSk: Uint8Array;
};

export type LedgerView = {
  publisherPk: { x: bigint; y: bigint };
  snapshotId: Uint8Array;
  reportRef: Uint8Array;
  merkleRoot: { field: bigint };
  published: boolean;
};

export const createPrivateState = (callerSk: Uint8Array): PrivateState => ({
  callerSk,
});

export const witnesses = {
  getSchnorrReduction(
    context: WitnessContext<LedgerView, PrivateState>,
    challengeHash: bigint,
  ): [PrivateState, [bigint, bigint]] {
    const q = challengeHash / TWO_248;
    const r = challengeHash % TWO_248;
    return [context.privateState, [q, r]];
  },

  callerSecretKey(
    context: WitnessContext<LedgerView, PrivateState>,
  ): [PrivateState, Uint8Array] {
    return [context.privateState, context.privateState.callerSk];
  },
};
