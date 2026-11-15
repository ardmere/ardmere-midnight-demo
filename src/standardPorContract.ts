// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const managed = path.resolve(
  here,
  "../contract/managed/standard_por/contract/index.js",
);

export const standardPorCompiled: any = require(managed);

export type StandardPorLedger = {
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

export const StandardPorContract = standardPorCompiled.Contract as new (
  witnesses: unknown,
) => {
  initialState: (...args: unknown[]) => unknown;
  impureCircuits: {
    submitSnapshot: (...args: unknown[]) => unknown;
  };
};

export const standardPorLedger = standardPorCompiled.ledger as (
  state: unknown,
) => StandardPorLedger;
