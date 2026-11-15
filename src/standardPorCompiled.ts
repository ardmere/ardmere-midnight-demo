// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

import path from "node:path";
import { fileURLToPath } from "node:url";
import * as CompiledContract from "@midnight-ntwrk/compact-js/effect/CompiledContract";
import * as standardPorGenerated from "../contract/managed/standard_por/contract/index.js";
import { standardPorWitnesses } from "./standardPorWitnesses.js";
import type { StandardPorLedger } from "./standardPorContract.js";

const here = path.dirname(fileURLToPath(import.meta.url));

export const STANDARD_POR_PRIVATE_STATE_ID = "standard_por";
export const STANDARD_POR_ZK_DIR = path.resolve(
  here,
  "../contract/managed/standard_por",
);

export function standardPorCompiledContract() {
  // Import the ESM build of the Compact-generated Contract here (not via
  // createRequire): compact-js creates the maintenance authority with the ESM
  // compact-runtime instance, and the two loaders produce distinct WASM class
  // identities, which makes `contractState.maintenanceAuthority = cma` throw
  // "expected instance of ContractMaintenanceAuthority" on deploy.
  let cc = CompiledContract.make(
    "standard_por",
    (standardPorGenerated as any).Contract as never,
  );
  cc = CompiledContract.withWitnesses(cc, standardPorWitnesses);
  cc = CompiledContract.withCompiledFileAssets(cc, STANDARD_POR_ZK_DIR);
  return cc;
}
/** Decode the public ledger state using the same ESM build as the contract. */
export const standardPorLedger = (standardPorGenerated as any).ledger as (
  state: unknown,
) => StandardPorLedger;
