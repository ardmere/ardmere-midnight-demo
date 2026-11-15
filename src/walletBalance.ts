// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Sync unshielded balances on Preprod via Blockfrost indexer (read-only).
 *
 * Requires BLOCKFROST_PROJECT_ID + MIDNIGHT_WALLET_SEED in .env.
 *
 * CLI: npm run wallet:balance
 */

import ws from "ws";
import { NoOpTransactionHistoryStorage } from "@midnight-ntwrk/wallet-sdk-abstractions";
import {
  UnshieldedWallet,
  PublicKey,
  createKeystore,
} from "@midnight-ntwrk/wallet-sdk-unshielded-wallet";
import { HDWallet, Roles } from "@midnight-ntwrk/wallet-sdk-hd";
import {
  getNetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { loadPreprodConfig } from "./config.js";
import { preprodEnv, upsertEnvVar } from "./env.js";
import { resolveSeed, deriveUnshieldedAddress } from "./wallet.js";

/** NIGHT / tNIGHT display: 1 NIGHT = 10^6 STAR (smallest unit on ledger). */
const STAR_PER_NIGHT = 1_000_000n;

function keystoreFromSeed(seedHex: string) {
  setNetworkId("preprod");
  const hd = HDWallet.fromSeed(Buffer.from(seedHex, "hex"));
  if (hd.type !== "seedOk") throw new Error("Invalid seed");
  const derived = hd.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.NightExternal])
    .deriveKeysAt(0);
  hd.hdWallet.clear();
  if (derived.type !== "keysDerived") throw new Error("Key derivation failed");
  return createKeystore(derived.keys[Roles.NightExternal], getNetworkId());
}

function formatStar(amount: bigint): string {
  const whole = amount / STAR_PER_NIGHT;
  const frac = amount % STAR_PER_NIGHT;
  if (frac === 0n) return `${whole} NIGHT (${amount} STAR)`;
  return `${whole}.${frac.toString().padStart(6, "0").replace(/0+$/, "")} NIGHT (${amount} STAR)`;
}

async function main(): Promise<void> {
  const env = preprodEnv();
  const cfg = loadPreprodConfig(env);
  if (!cfg.blockfrostProjectId) {
    throw new Error(
      "BLOCKFROST_PROJECT_ID missing. Create a Midnight Preprod project on blockfrost.io and add it to .env.",
    );
  }

  const argId = process.argv.find((a) => a.startsWith("--blockfrost="))?.slice(13);
  if (argId && !env.BLOCKFROST_PROJECT_ID) {
    upsertEnvVar("BLOCKFROST_PROJECT_ID", argId);
    process.env.BLOCKFROST_PROJECT_ID = argId;
  }

  const { seedHex } = resolveSeed(env, { generate: false });
  const derived = deriveUnshieldedAddress(seedHex);

  // Node needs a WebSocket implementation for the indexer client.
  globalThis.WebSocket = ws as unknown as typeof WebSocket;

  const configuration = {
    networkId: "preprod" as const,
    indexerClientConnection: {
      indexerHttpUrl: cfg.indexer,
      indexerWsUrl: cfg.indexerWS,
    },
    txHistoryStorage: new NoOpTransactionHistoryStorage(),
  };

  const keystore = keystoreFromSeed(seedHex);
  const wallet = UnshieldedWallet(configuration).startWithPublicKey(
    PublicKey.fromKeyStore(keystore),
  );

  const syncTimeoutMs = Number(process.env.WALLET_SYNC_TIMEOUT_MS ?? 120_000);
  await wallet.start();

  const synced = await Promise.race([
    wallet.waitForSyncedState(),
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`sync timed out after ${syncTimeoutMs}ms`)),
        syncTimeoutMs,
      ),
    ),
  ]);

  await wallet.stop();

  const balances = synced.balances;
  const coins = synced.availableCoins;
  const dustRegistered = coins.filter(
    (c) => c.meta.registeredForDustGeneration,
  ).length;

  const lines = Object.entries(balances).map(([tokenType, amount]) => ({
    tokenType,
    amountStar: amount.toString(),
    display: formatStar(amount),
  }));

  const totalStar = Object.values(balances).reduce((a, b) => a + b, 0n);

  console.log(
    JSON.stringify(
      {
        address: derived.address,
        networkId: derived.networkId,
        synced: synced.progress.isStrictlyComplete(),
        connected: synced.progress.isConnected,
        highestTransactionId: synced.progress.highestTransactionId.toString(),
        appliedTransactionId: synced.progress.appliedId.toString(),
        unshieldedBalances: lines,
        totalUnshieldedStar: totalStar.toString(),
        totalUnshieldedDisplay: formatStar(totalStar),
        availableUtxoCount: coins.length,
        utxosRegisteredForDust: dustRegistered,
        faucetReceived:
          totalStar >= 4_000_000_000n
            ? "likely (≥4B STAR ~ 4000+ tNIGHT)"
            : totalStar > 0n
              ? "partial (some STAR)"
              : "not yet (0 unshielded balance)",
        note: "tDUST is separate; register tNIGHT in Lace or registerNightUtxosForDustGeneration before paying fees.",
      },
      null,
      2,
    ),
  );
}

const isDirect =
  process.argv[1]?.endsWith("walletBalance.ts") ||
  process.argv[1]?.endsWith("walletBalance.js");
if (isDirect) {
  main().catch((e) => {
    console.error(String(e?.message ?? e));
    process.exitCode = 1;
  });
}