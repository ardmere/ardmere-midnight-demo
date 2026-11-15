// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Undeployed: deploy standard_por + one submitSnapshot tx.
 *
 * CLI: npm run undeployed:deploy-submit
 *
 * Modes (MN_TEST_ENVIRONMENT):
 * - `undeployed` (default): testkit starts local Docker stack.
 * - `env-var-remote`: connect to midnight-local-dev / custom endpoints via MN_TEST_*.
 *
 * Optional: MN_USE_STATIC_PROOF_SERVER=1 → proof at localhost:6300 (env-var-remote).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deployContract } from "@midnight-ntwrk/midnight-js-contracts";
import {
  getNetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { parseCoinPublicKeyToHex } from "@midnight-ntwrk/midnight-js-utils";
import {
  createDefaultTestLogger,
  getTestEnvironment,
  initializeMidnightProviders,
  StaticProofServerContainer,
} from "@midnight-ntwrk/testkit-js";
import { buildMst, normalizeBatch } from "./mst/build.js";
import {
  STANDARD_POR_PRIVATE_STATE_ID,
  STANDARD_POR_ZK_DIR,
  standardPorCompiledContract,
} from "./standardPorCompiled.js";
import { createStandardPorPrivateState } from "./standardPorWitnesses.js";
import { fromHex, toHex } from "./constants.js";
import { loadDemoBatch, loadSnapshotVectors } from "./undeployed/demoFixtures.js";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function assertZkArtifacts(): void {
  const prover = path.join(STANDARD_POR_ZK_DIR, "keys/submitSnapshot.prover");
  const verifier = path.join(STANDARD_POR_ZK_DIR, "keys/submitSnapshot.verifier");
  if (!fs.existsSync(prover) || !fs.existsSync(verifier)) {
    throw new Error(
      `Missing ZK keys under ${STANDARD_POR_ZK_DIR}/keys — run: npm run compile:standard-por`,
    );
  }
}

function resolveProofContainer():
  | StaticProofServerContainer
  | undefined {
  if (process.env.MN_USE_STATIC_PROOF_SERVER === "1") {
    const port = Number(process.env.MN_TEST_PROOF_PORT ?? "6300");
    return new StaticProofServerContainer(port);
  }
  const envKind = process.env.MN_TEST_ENVIRONMENT ?? "undeployed";
  if (envKind === "env-var-remote" && process.env.MN_TEST_PROOF_SERVER) {
    try {
      const u = new URL(process.env.MN_TEST_PROOF_SERVER);
      const port = u.port ? Number(u.port) : u.protocol === "https:" ? 443 : 80;
      return new StaticProofServerContainer(port);
    } catch {
      // testkit will start its own proof server container
    }
  }
  return undefined;
}

async function main(): Promise<void> {
  assertZkArtifacts();

  const logger = createDefaultTestLogger();
  const testEnv = getTestEnvironment(logger);
  const proofContainer = resolveProofContainer();

  const envConfig = await testEnv.start(proofContainer);
  setNetworkId(envConfig.networkId);

  try {
    const wallet = await testEnv.getMidnightWalletProvider();
    const providers = initializeMidnightProviders(wallet, envConfig, {
      privateStateStoreName: "standard-por-undeployed",
      zkConfigPath: STANDARD_POR_ZK_DIR,
    });

    const compiled = standardPorCompiledContract();
    const batch = loadDemoBatch();
    const vectors = loadSnapshotVectors();
    const built = buildMst(batch);
    const leaves = normalizeBatch(batch);
    const initialPrivateState = createStandardPorPrivateState({
      userIds: leaves.map((l) => l.userIdHash),
      btc: leaves.map((l) => l.btc),
      eth: leaves.map((l) => l.eth),
      usdt: leaves.map((l) => l.usdt),
    });

    const prices = {
      btc: BigInt(vectors.prices.btc),
      eth: BigInt(vectors.prices.eth),
      usdt: BigInt(vectors.prices.usdt),
    };
    const declaredReserves = {
      btc: BigInt(vectors.declaredReserves.btc),
      eth: BigInt(vectors.declaredReserves.eth),
      usdt: BigInt(vectors.declaredReserves.usdt),
    };
    const seq = BigInt(vectors.seq);
    const ts = BigInt(vectors.timestamp);
    const rootHash = built.root.hash;

    const exposures = [
      ["btc", built.gross.btcPos, built.gross.btcNeg, declaredReserves.btc],
      ["eth", built.gross.ethPos, built.gross.ethNeg, declaredReserves.eth],
      ["usdt", built.gross.usdtPos, built.gross.usdtNeg, declaredReserves.usdt],
    ] as const;
    for (const [asset, pos, neg, reserve] of exposures) {
      if (pos > neg + reserve) {
        throw new Error(`fixture ${asset} net exposure exceeds declared reserves`);
      }
    }
    if (toHex(rootHash) !== vectors.mstRootHashHex) {
      throw new Error("fixture MST root does not match snapshot-vectors.json");
    }

    const authorityPkHex = parseCoinPublicKeyToHex(
      wallet.getCoinPublicKey(),
      getNetworkId(),
    );
    const authorityPk = fromHex(authorityPkHex);

    logger.info("Deploying standard_por …");
    const deployed = await deployContract(providers, {
      compiledContract: compiled,
      privateStateId: STANDARD_POR_PRIVATE_STATE_ID,
      initialPrivateState,
      args: [authorityPk],
    });

    const contractAddress =
      deployed.deployTxData.public.contractAddress as string;

    logger.info(`Contract at ${contractAddress}; calling submitSnapshot …`);
    const callTx = await deployed.callTx.submitSnapshot(
      seq,
      ts,
      prices.btc,
      prices.eth,
      prices.usdt,
      declaredReserves.btc,
      declaredReserves.eth,
      declaredReserves.usdt,
      rootHash,
    );

    const out = {
      status: "ok",
      networkId: envConfig.networkId,
      contractAddress,
      authorityPkHex,
      submitSnapshot: {
        txHash: callTx.public.txHash,
        blockHeight: callTx.public.blockHeight,
        snapshotSeq: seq.toString(),
        timestamp: ts.toString(),
        prices: {
          btc: prices.btc.toString(),
          eth: prices.eth.toString(),
          usdt: prices.usdt.toString(),
        },
        declaredReserves: {
          btc: declaredReserves.btc.toString(),
          eth: declaredReserves.eth.toString(),
          usdt: declaredReserves.usdt.toString(),
        },
        mstRootHashHex: toHex(rootHash),
        liabilities: {
          btc: built.liabilities.btc.toString(),
          eth: built.liabilities.eth.toString(),
          usdt: built.liabilities.usdt.toString(),
        },
        gross: {
          btcPos: built.gross.btcPos.toString(),
          btcNeg: built.gross.btcNeg.toString(),
          ethPos: built.gross.ethPos.toString(),
          ethNeg: built.gross.ethNeg.toString(),
          usdtPos: built.gross.usdtPos.toString(),
          usdtNeg: built.gross.usdtNeg.toString(),
        },
      },
      env: {
        indexer: envConfig.indexer,
        node: envConfig.node,
        proofServer: envConfig.proofServer,
      },
      next: `Add CONTRACT_ADDRESS=${contractAddress} to .env, then extend read:por for chain queries.`,
    };

    console.log(JSON.stringify(out, null, 2));

    const outPath = path.join(repoRoot, "fixtures/undeployed-last-run.json");
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
  } finally {
    await testEnv.shutdown();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
