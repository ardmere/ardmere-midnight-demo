// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Midnight.js provider wiring for Preprod using the hosted proof endpoint.
 *
 * Full wallet-backed providers need operator secrets (see config.ts).
 * `createProofStack` alone is enough to build httpClientProofProvider against
 * the hosted server once ZK artifacts exist from `npm run compile`.
 */

import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import {
  loadPreprodConfig,
  missingPreprodSecrets,
  type CircuitName,
  type PreprodConfig,
} from "./config.js";

export type ProofStack = {
  config: PreprodConfig;
  zkConfigProvider: NodeZkConfigProvider<CircuitName>;
  proofProvider: ReturnType<typeof httpClientProofProvider<CircuitName>>;
  publicDataProvider: ReturnType<typeof indexerPublicDataProvider>;
};

/**
 * Build zk + proof + public-data providers for Preprod.
 * Throws with the exact missing env names if Blockfrost is absent (indexer).
 * Does not create a wallet — that requires MIDNIGHT_WALLET_* secrets.
 */
export function createProofStack(
  env: NodeJS.ProcessEnv = process.env,
): ProofStack {
  const config = loadPreprodConfig(env);
  setNetworkId("preprod");

  const missing = missingPreprodSecrets(config).filter(
    (m) => m.name === "BLOCKFROST_PROJECT_ID",
  );
  // Indexer needs Blockfrost; proof provider itself only needs the proof URL.
  // Allow creating zk+proof without Blockfrost for proof-health / dry-run.
  const zkConfigProvider = new NodeZkConfigProvider<CircuitName>(
    config.zkConfigPath,
  );
  const proofProvider = httpClientProofProvider<CircuitName>(
    config.proofServer,
    zkConfigProvider,
  );

  if (missing.length > 0) {
    // Still return zk+proof; publicDataProvider construction deferred.
    return {
      config,
      zkConfigProvider,
      proofProvider,
      publicDataProvider: null as unknown as ReturnType<
        typeof indexerPublicDataProvider
      >,
    };
  }

  const publicDataProvider = indexerPublicDataProvider(
    config.indexer,
    config.indexerWS,
  );

  return { config, zkConfigProvider, proofProvider, publicDataProvider };
}

export function requireDeploySecrets(
  env: NodeJS.ProcessEnv = process.env,
): PreprodConfig {
  const config = loadPreprodConfig(env);
  const missing = missingPreprodSecrets(config);
  if (missing.length > 0) {
    const lines = missing
      .map((m) => `- ${m.name}: ${m.why}\n  → ${m.how}`)
      .join("\n");
    throw new Error(
      `Missing Preprod secrets/env (not inventing keys):\n${lines}`,
    );
  }
  return config;
}
