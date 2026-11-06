// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Offline wallet identity for the Preprod faucet step.
 *
 * Derives the unshielded `mn_addr_preprod…` address the faucet accepts from a
 * seed, without touching the network. Nothing is signed and no DUST is spent:
 * this only answers "which address do I paste into the faucet?" so an operator
 * can fund a wallet before the deploy path exists.
 *
 * CLI:
 *   npm run wallet:address                     # derive from configured/first-run seed
 *   npm run wallet:address -- --generate-seed  # create + persist a new seed
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";
import { HDWallet, Roles } from "@midnight-ntwrk/wallet-sdk-hd";
import { createKeystore } from "@midnight-ntwrk/wallet-sdk-unshielded-wallet";
import {
  getNetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { loadPreprodConfig } from "./config.js";
import { toHex } from "./constants.js";
import { ENV_FILE, preprodEnv, upsertEnvVar } from "./env.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const seedFile = path.resolve(here, "../secrets/wallet-seed.txt");

/** Derive the faucet-facing unshielded address for a 32–64 byte hex seed. */
export function deriveUnshieldedAddress(seedHex: string): {
  address: string;
  networkId: string;
} {
  const seed = seedHex.trim();
  if (!/^[0-9a-fA-F]{64,128}$/.test(seed)) {
    throw new Error(
      `Seed must be 64–128 hex characters without a prefix. Got ${seed.length}.`,
    );
  }

  setNetworkId("preprod");

  const hd = HDWallet.fromSeed(Buffer.from(seed, "hex"));
  if (hd.type !== "seedOk") {
    throw new Error("Invalid seed: HDWallet.fromSeed rejected it.");
  }
  const derived = hd.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
    .deriveKeysAt(0);
  hd.hdWallet.clear();
  if (derived.type !== "keysDerived") {
    throw new Error("Key derivation failed.");
  }

  const keystore = createKeystore(
    derived.keys[Roles.NightExternal],
    getNetworkId(),
  );
  return {
    address: String(keystore.getBech32Address()),
    networkId: String(getNetworkId()),
  };
}

/**
 * Resolve which seed to use: operator env first, then the persisted demo seed.
 * Only creates a seed when explicitly asked — never silently.
 */
export function resolveSeed(
  env: NodeJS.ProcessEnv = process.env,
  options: { generate?: boolean } = {},
): { seedHex: string; source: "env" | "file" | "generated" } {
  const fromEnv = loadPreprodConfig(env).walletSeed;
  if (fromEnv) return { seedHex: fromEnv, source: "env" };
  if (fs.existsSync(seedFile)) {
    return { seedHex: fs.readFileSync(seedFile, "utf8").trim(), source: "file" };
  }
  if (!options.generate) {
    throw new Error(
      "No wallet seed found. Set MIDNIGHT_WALLET_SEED, or pass --generate-seed to create one under secrets/ (gitignored).",
    );
  }
  const seedHex = toHex(randomBytes(32));
  fs.mkdirSync(path.dirname(seedFile), { recursive: true });
  fs.writeFileSync(seedFile, seedHex + "\n", { mode: 0o600 });
  return { seedHex, source: "generated" };
}

async function main(): Promise<void> {
  const writeEnv = !process.argv.includes("--no-save");
  const { seedHex, source } = resolveSeed(preprodEnv(), {
    generate: process.argv.includes("--generate-seed"),
  });
  const derived = deriveUnshieldedAddress(seedHex);
  const relSeed = path.relative(process.cwd(), seedFile);

  const saved = writeEnv
    ? {
        seed: upsertEnvVar("MIDNIGHT_WALLET_SEED", seedHex),
        address: upsertEnvVar("MIDNIGHT_WALLET_ADDRESS", derived.address),
      }
    : null;

  console.log(
    JSON.stringify(
      {
        address: derived.address,
        networkId: derived.networkId,
        seedSource: source,
        seedStorage: source === "env" ? "MIDNIGHT_WALLET_SEED" : relSeed,
        envFile: writeEnv
          ? {
              path: path.relative(process.cwd(), ENV_FILE),
              gitignored: true,
              seed: saved?.seed,
              address: saved?.address,
            }
          : "not written (--no-save)",
        nextSteps: [
          "Paste the address into the Preprod faucet (Cloudflare Turnstile is required, so this step cannot be automated).",
          "Register the received tNIGHT for tDUST generation so fees can be paid.",
          "BLOCKFROST_PROJECT_ID is still required for Preprod indexer and node RPC.",
        ],
        warning:
          "The seed is written to .env (gitignored, mode 0600). Never commit it.",
      },
      null,
      2,
    ),
  );
}

const isDirect =
  process.argv[1] &&
  (process.argv[1].endsWith("wallet.ts") ||
    process.argv[1].endsWith("wallet.js"));
if (isDirect) {
  main().catch((e) => {
    console.error(String(e?.message ?? e));
    process.exitCode = 1;
  });
}
