// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Long-lived local demo session.
 *
 * Owns the testkit chain + wallet + providers so the six demo commands can be
 * separate processes against one live chain:
 *   compile -> deploy -> prove -> submit -> read -> verify
 *
 * Start it explicitly with `npm run demo:session`, or let `demo:deploy` start
 * it in the background.
 */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createCallTxOptions,
  createUnprovenCallTx,
  deployContract,
  getPublicStates,
} from "@midnight-ntwrk/midnight-js-contracts";
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
import { Transaction } from "@midnight-ntwrk/ledger-v8";
import { buildMst, normalizeBatch } from "../mst/build.js";
import {
  STANDARD_POR_PRIVATE_STATE_ID,
  STANDARD_POR_ZK_DIR,
  standardPorCompiledContract,
  standardPorLedger,
} from "../standardPorCompiled.js";
import { createStandardPorPrivateState } from "../standardPorWitnesses.js";
import { fromHex, toHex } from "../constants.js";
import { loadDemoBatch, loadSnapshotVectors } from "../undeployed/demoFixtures.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DEMO_DIR = path.join(ROOT, ".demo");
const PROOF_PATH = path.join(DEMO_DIR, "submitSnapshot.proof.bin");
const PROOF_META_PATH = path.join(DEMO_DIR, "proof.json");
const SUBMIT_PATH = path.join(DEMO_DIR, "submit.json");
const SNAPSHOT_PATH = path.join(DEMO_DIR, "snapshot.json");
const SESSION_PATH = path.join(DEMO_DIR, "session.json");
const PORT = Number(process.env.DEMO_PORT ?? "8787");

fs.mkdirSync(DEMO_DIR, { recursive: true });

let testEnv: any;
let wallet: any;
let providers: any;
let compiled: any;
let envConfig: any;
let contractAddress: string | undefined;
let authorityPkHex: string | undefined;
let deployTx: any;
let lastSubmit: any;
let ready = false;
let shuttingDown = false;

function assertZkArtifacts(): void {
  const prover = path.join(STANDARD_POR_ZK_DIR, "keys/submitSnapshot.prover");
  const verifier = path.join(STANDARD_POR_ZK_DIR, "keys/submitSnapshot.verifier");
  if (!fs.existsSync(prover) || !fs.existsSync(verifier)) {
    throw new Error(
      `Missing ZK keys under ${STANDARD_POR_ZK_DIR}/keys — run: npm run compile:standard-por`,
    );
  }
}

function resolveProofContainer(): StaticProofServerContainer | undefined {
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
      // fall through to testkit-managed proof server
    }
  }
  return undefined;
}

async function bootstrap(): Promise<void> {
  assertZkArtifacts();
  const logger = createDefaultTestLogger();
  testEnv = getTestEnvironment(logger);
  envConfig = await testEnv.start(resolveProofContainer());
  setNetworkId(envConfig.networkId);
  wallet = await testEnv.getMidnightWalletProvider();
  providers = initializeMidnightProviders(wallet, envConfig, {
    privateStateStoreName: "standard-por-demo",
    zkConfigPath: STANDARD_POR_ZK_DIR,
  });
  compiled = standardPorCompiledContract();
  ready = true;
  fs.writeFileSync(
    SESSION_PATH,
    JSON.stringify(
      {
        port: PORT,
        pid: process.pid,
        networkId: envConfig.networkId,
        startedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
}

async function deploy(): Promise<any> {
  if (contractAddress) {
    throw new Error(`already deployed at ${contractAddress}`);
  }
  fs.rmSync(PROOF_PATH, { force: true });
  fs.rmSync(PROOF_META_PATH, { force: true });
  fs.rmSync(SUBMIT_PATH, { force: true });
  fs.rmSync(SNAPSHOT_PATH, { force: true });
  lastSubmit = undefined;

  const batch = loadDemoBatch();
  const built = buildMst(batch);
  const leaves = normalizeBatch(batch);
  const vectors = loadSnapshotVectors();
  if (toHex(built.root.hash) !== vectors.mstRootHashHex) {
    throw new Error("fixture MST root does not match snapshot-vectors.json");
  }

  authorityPkHex = parseCoinPublicKeyToHex(
    wallet.getCoinPublicKey(),
    getNetworkId(),
  );

  const initialPrivateState = createStandardPorPrivateState({
    userIds: leaves.map((l) => l.userIdHash),
    btc: leaves.map((l) => l.btc),
    eth: leaves.map((l) => l.eth),
    usdt: leaves.map((l) => l.usdt),
  });

  const deployed = await deployContract(providers, {
    compiledContract: compiled,
    privateStateId: STANDARD_POR_PRIVATE_STATE_ID,
    initialPrivateState,
    args: [fromHex(authorityPkHex)],
  });

  contractAddress = deployed.deployTxData.public.contractAddress;
  deployTx = deployed.deployTxData.public;
  return {
    status: "ok",
    stage: "deploy",
    networkId: envConfig.networkId,
    contractAddress,
    authorityPkHex,
    deployTxHash: (deployTx as any).txHash ?? null,
    blockHeight: (deployTx as any).blockHeight ?? null,
  };
}

async function prove(): Promise<any> {
  if (!contractAddress) throw new Error("deploy first");
  const batch = loadDemoBatch();
  const built = buildMst(batch);
  const vectors = loadSnapshotVectors();
  if (toHex(built.root.hash) !== vectors.mstRootHashHex) {
    throw new Error("fixture MST root does not match snapshot-vectors.json");
  }

  const prices = {
    btc: BigInt(vectors.prices.btc),
    eth: BigInt(vectors.prices.eth),
    usdt: BigInt(vectors.prices.usdt),
  };
  const reserves = {
    btc: BigInt(vectors.declaredReserves.btc),
    eth: BigInt(vectors.declaredReserves.eth),
    usdt: BigInt(vectors.declaredReserves.usdt),
  };
  const args = [
    BigInt(vectors.seq),
    BigInt(vectors.timestamp),
    prices.btc,
    prices.eth,
    prices.usdt,
    reserves.btc,
    reserves.eth,
    reserves.usdt,
    built.root.hash,
  ];

  const options = createCallTxOptions(
    compiled,
    "submitSnapshot",
    contractAddress as any,
    STANDARD_POR_PRIVATE_STATE_ID,
    undefined,
    args as any,
  );
  const unproven = await createUnprovenCallTx(providers, options as any);
  const proven = await providers.proofProvider.proveTx(unproven.private.unprovenTx);
  const bytes = Buffer.from(proven.serialize());
  fs.writeFileSync(PROOF_PATH, bytes);

  const meta = {
    status: "proven",
    stage: "prove",
    proofPath: path.relative(ROOT, PROOF_PATH),
    proofBytes: bytes.length,
    snapshotSeq: vectors.seq,
    timestamp: vectors.timestamp,
    mstRootHashHex: vectors.mstRootHashHex,
    prices: vectors.prices,
    declaredReserves: vectors.declaredReserves,
    networkId: envConfig.networkId,
    contractAddress,
  };
  fs.writeFileSync(PROOF_META_PATH, JSON.stringify(meta, null, 2));
  return meta;
}

async function submit(): Promise<any> {
  if (!contractAddress) throw new Error("deploy first");
  if (!fs.existsSync(PROOF_PATH)) throw new Error("prove first");
  const bytes = new Uint8Array(fs.readFileSync(PROOF_PATH));
  const proven = Transaction.deserialize(
    "signature",
    "proof",
    "pre-binding",
    bytes,
  );
  const balanced = await wallet.balanceTx(proven);
  const txId = await providers.midnightProvider.submitTx(balanced);
  const txData = await providers.publicDataProvider.watchForTxData(txId);
  lastSubmit = {
    status: "ok",
    stage: "submit",
    txId,
    txHash: txData.txHash,
    blockHeight: txData.blockHeight,
    blockHash: txData.blockHash,
    txStatus: String(txData.status),
    contractAddress,
    mstRootHashHex: loadSnapshotVectors().mstRootHashHex,
  };
  fs.writeFileSync(SUBMIT_PATH, JSON.stringify(lastSubmit, null, 2));
  return lastSubmit;
}

async function readSnapshot(): Promise<any> {
  if (!contractAddress) throw new Error("deploy first");
  let states: any = null;
  for (let i = 0; i < 30; i += 1) {
    try {
      states = await getPublicStates(
        providers.publicDataProvider,
        contractAddress as any,
      );
      if (states) break;
    } catch {
      // indexer may still be syncing the finalized tx
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  if (!states) throw new Error("contract state not available from indexer");

  const ledger = standardPorLedger(states.contractState.data);
  const snapshot = {
    status: "ok",
    stage: "read",
    source: "indexer:queryContractState",
    contractAddress,
    authorityPkHex: toHex(ledger.authorityPk),
    snapshotSeq: ledger.snapshotSeq.toString(),
    timestamp: ledger.timestamp.toString(),
    mstRootHashHex: toHex(ledger.mstRoot),
    prices: {
      btc: ledger.priceBtc.toString(),
      eth: ledger.priceEth.toString(),
      usdt: ledger.priceUsdt.toString(),
    },
    declaredReserves: {
      btc: ledger.declaredReservesBtc.toString(),
      eth: ledger.declaredReservesEth.toString(),
      usdt: ledger.declaredReservesUsdt.toString(),
    },
    liabilities: {
      btc: (ledger.liabilitiesBtcPos - ledger.liabilitiesBtcNeg).toString(),
      eth: (ledger.liabilitiesEthPos - ledger.liabilitiesEthNeg).toString(),
      usdt: (ledger.liabilitiesUsdtPos - ledger.liabilitiesUsdtNeg).toString(),
    },
    gross: {
      btcPos: ledger.liabilitiesBtcPos.toString(),
      btcNeg: ledger.liabilitiesBtcNeg.toString(),
      ethPos: ledger.liabilitiesEthPos.toString(),
      ethNeg: ledger.liabilitiesEthNeg.toString(),
      usdtPos: ledger.liabilitiesUsdtPos.toString(),
      usdtNeg: ledger.liabilitiesUsdtNeg.toString(),
    },
    published: ledger.published,
    submitTx: lastSubmit
      ? {
          txHash: lastSubmit.txHash,
          blockHeight: lastSubmit.blockHeight,
        }
      : null,
  };
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2));
  return snapshot;
}

function json(res: http.ServerResponse, code: number, body: unknown): void {
  res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body, null, 2));
}

const server = http.createServer(async (req, res) => {
  try {
    const url = req.url ?? "/";
    if (req.method === "GET" && url === "/health") {
      return json(res, 200, {
        ok: true,
        ready,
        deployed: Boolean(contractAddress),
        proven: fs.existsSync(PROOF_PATH),
        contractAddress: contractAddress ?? null,
      });
    }
    if (req.method === "POST" && url === "/deploy") {
      const out = await deploy();
      return json(res, 200, out);
    }
    if (req.method === "POST" && url === "/prove") {
      const out = await prove();
      return json(res, 200, out);
    }
    if (req.method === "POST" && url === "/submit") {
      const out = await submit();
      return json(res, 200, out);
    }
    if (req.method === "GET" && url === "/read") {
      const out = await readSnapshot();
      return json(res, 200, out);
    }
    if (req.method === "POST" && url === "/shutdown") {
      json(res, 200, { status: "shutting-down" });
      setTimeout(() => void shutdown(), 50);
      return;
    }
    return json(res, 404, { error: `no route: ${req.method} ${url}` });
  } catch (err) {
    return json(res, 500, {
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

async function shutdown(): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;
  ready = false;
  server.close();
  try {
    await Promise.race([
      Promise.resolve(testEnv?.shutdown()),
      new Promise((resolve) => setTimeout(resolve, 15_000)),
    ]);
  } catch {
    // best effort
  } finally {
    fs.rmSync(SESSION_PATH, { force: true });
    process.exit(0);
  }
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());

bootstrap()
  .then(() => {
    server.listen(PORT, "127.0.0.1", () => {
      console.log(`demo session listening on http://127.0.0.1:${PORT}`);
    });
  })
  .catch(async (err) => {
    console.error(err);
    await shutdown();
  });
