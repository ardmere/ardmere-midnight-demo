// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Preprod network + proof-server configuration.
 *
 * Default proof endpoint is Midnight's hosted Preprod proof server (no local
 * Docker). Witness/private inputs are sent to that host — see README privacy
 * caveat. Override with MIDNIGHT_PROOF_SERVER_URL for a local server.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

export type CircuitName = "publishSnapshot" | "attestInclusion";

const here = path.dirname(fileURLToPath(import.meta.url));

/** Compiled contract directory (keys/ + zkir/ + contract/). */
export const ZK_CONFIG_PATH = path.resolve(
  here,
  "../contract/managed/por_snapshot",
);

/**
 * Official hosted Preprod proof server (verified reachable 2026-11-04).
 * Reports `/version` = 8.1.0; support matrix lists local image 8.1.3.
 * Both speak proof V2.
 */
export const HOSTED_PREPROD_PROOF_SERVER =
  "https://proof-server.preprod.midnight.network";

/** Optional local Docker fallback (not required for this demo path). */
export const LOCAL_PROOF_SERVER = "http://127.0.0.1:6300";

export const PREPROD_FAUCET = "https://midnight-tmnight-preprod.nethermind.dev/";

export const PREPROD_BLOCKFROST = {
  indexer: "https://midnight-preprod.blockfrost.io/api/v0",
  indexerWS: "wss://midnight-preprod.blockfrost.io/api/v0/ws",
  node: "https://rpc.midnight-preprod.blockfrost.io",
  nodeWS: "wss://rpc.midnight-preprod.blockfrost.io",
} as const;

export type PreprodConfig = {
  networkId: "preprod";
  proofServer: string;
  proofServerSource: "hosted" | "env" | "local";
  indexer: string;
  indexerWS: string;
  node: string;
  faucet: string;
  blockfrostProjectId: string | null;
  walletSeed: string | null;
  walletMnemonic: string | null;
  contractAddress: string | null;
  privateStatePassword: string | null;
  zkConfigPath: string;
};

function trimOrNull(v: string | undefined): string | null {
  const t = v?.trim();
  return t ? t : null;
}

function withProjectId(base: string, projectId: string): string {
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}project_id=${encodeURIComponent(projectId)}`;
}

/**
 * Resolve Preprod config from env. Does not invent secrets.
 *
 * Env:
 * - MIDNIGHT_PROOF_SERVER_URL (optional; default hosted Preprod)
 * - BLOCKFROST_PROJECT_ID (required for node/indexer)
 * - MIDNIGHT_WALLET_SEED (64–128 hex) XOR MIDNIGHT_WALLET_MNEMONIC (24 words)
 * - CONTRACT_ADDRESS (after deploy)
 * - PRIVATE_STATE_PASSWORD (min 16 chars for private-state store)
 */
export function loadPreprodConfig(
  env: NodeJS.ProcessEnv = process.env,
): PreprodConfig {
  const envProof = trimOrNull(env.MIDNIGHT_PROOF_SERVER_URL);
  let proofServer: string;
  let proofServerSource: PreprodConfig["proofServerSource"];
  if (envProof) {
    proofServer = envProof.replace(/\/$/, "");
    proofServerSource =
      envProof.includes("127.0.0.1") || envProof.includes("localhost")
        ? "local"
        : "env";
  } else {
    proofServer = HOSTED_PREPROD_PROOF_SERVER;
    proofServerSource = "hosted";
  }

  const projectId = trimOrNull(env.BLOCKFROST_PROJECT_ID);
  const indexer = projectId
    ? withProjectId(PREPROD_BLOCKFROST.indexer, projectId)
    : PREPROD_BLOCKFROST.indexer;
  const indexerWS = projectId
    ? withProjectId(PREPROD_BLOCKFROST.indexerWS, projectId)
    : PREPROD_BLOCKFROST.indexerWS;
  const node = projectId
    ? withProjectId(PREPROD_BLOCKFROST.node, projectId)
    : PREPROD_BLOCKFROST.node;

  return {
    networkId: "preprod",
    proofServer,
    proofServerSource,
    indexer,
    indexerWS,
    node,
    faucet: trimOrNull(env.MIDNIGHT_FAUCET_URL) ?? PREPROD_FAUCET,
    blockfrostProjectId: projectId,
    walletSeed: trimOrNull(env.MIDNIGHT_WALLET_SEED),
    walletMnemonic: trimOrNull(env.MIDNIGHT_WALLET_MNEMONIC),
    contractAddress: trimOrNull(env.CONTRACT_ADDRESS),
    privateStatePassword: trimOrNull(env.PRIVATE_STATE_PASSWORD),
    zkConfigPath: ZK_CONFIG_PATH,
  };
}

export type MissingSecret = {
  name: string;
  why: string;
  how: string;
};

/** Exact secrets/env the operator must supply before Preprod deploy/tx. */
export function missingPreprodSecrets(cfg: PreprodConfig): MissingSecret[] {
  const missing: MissingSecret[] = [];
  if (!cfg.blockfrostProjectId) {
    missing.push({
      name: "BLOCKFROST_PROJECT_ID",
      why: "Preprod node RPC + indexer are served by Blockfrost; every request needs a project token.",
      how: "Create a Midnight Preprod project at https://blockfrost.io and export the project_id.",
    });
  }
  if (!cfg.walletSeed && !cfg.walletMnemonic) {
    missing.push({
      name: "MIDNIGHT_WALLET_SEED or MIDNIGHT_WALLET_MNEMONIC",
      why: "Needed to sign deploy / publish / attest transactions and hold tNIGHT + DUST.",
      how: "Export a 32–128 hex-char seed (Lace-compatible BIP-39 seed is 128 hex chars) OR a 24-word MIDNIGHT_WALLET_MNEMONIC. Do not invent one in CI — use your operator wallet.",
    });
  }
  if (cfg.walletSeed && cfg.walletMnemonic) {
    missing.push({
      name: "MIDNIGHT_WALLET_SEED xor MIDNIGHT_WALLET_MNEMONIC",
      why: "Both are set; they would select different wallets.",
      how: "Unset one of them.",
    });
  }
  if (!cfg.privateStatePassword || cfg.privateStatePassword.length < 16) {
    missing.push({
      name: "PRIVATE_STATE_PASSWORD",
      why: "midnight-js private-state store requires a password ≥ 16 characters.",
      how: "Export a strong random password (≥16 chars). Never commit it.",
    });
  }
  return missing;
}

export function missingForPublish(cfg: PreprodConfig): MissingSecret[] {
  const base = missingPreprodSecrets(cfg);
  if (!cfg.contractAddress) {
    base.push({
      name: "CONTRACT_ADDRESS",
      why: "publishSnapshot targets an already-deployed por_snapshot instance.",
      how: "Deploy first, then export CONTRACT_ADDRESS=mn_… from the deploy output.",
    });
  }
  return base;
}
