// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Probe the configured proof server (/health, /version, /ready, /proof-versions).
 * Default target: hosted Preprod proof server (no Docker).
 *
 * CLI: npm run proof:health
 */

import {
  HOSTED_PREPROD_PROOF_SERVER,
  loadPreprodConfig,
} from "./config.js";

export type ProofHealth = {
  url: string;
  source: string;
  ok: boolean;
  health: unknown;
  version: string | null;
  ready: unknown;
  proofVersions: unknown;
  error?: string;
};

async function getText(url: string): Promise<string> {
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.text();
}

async function getJson(url: string): Promise<unknown> {
  const text = await getText(url);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function checkProofServer(
  url: string = loadPreprodConfig().proofServer,
): Promise<ProofHealth> {
  const cfg = loadPreprodConfig();
  const base = url.replace(/\/$/, "");
  try {
    const [health, version, ready, proofVersions] = await Promise.all([
      getJson(`${base}/health`),
      getText(`${base}/version`).catch(() => null),
      getJson(`${base}/ready`).catch(() => null),
      getJson(`${base}/proof-versions`).catch(() => null),
    ]);
    const status =
      health &&
      typeof health === "object" &&
      (health as { status?: string }).status === "ok";
    return {
      url: base,
      source: cfg.proofServerSource,
      ok: Boolean(status),
      health,
      version,
      ready,
      proofVersions,
    };
  } catch (e: any) {
    return {
      url: base,
      source: cfg.proofServerSource,
      ok: false,
      health: null,
      version: null,
      ready: null,
      proofVersions: null,
      error: String(e?.message ?? e),
    };
  }
}

async function main(): Promise<void> {
  const cfg = loadPreprodConfig();
  const result = await checkProofServer(cfg.proofServer);
  console.log(
    JSON.stringify(
      {
        ...result,
        defaultHosted: HOSTED_PREPROD_PROOF_SERVER,
        privacyCaveat:
          "Witness/private circuit inputs are sent to this proof-server host. Prefer a local proof-server for production privacy; hosted Preprod is for hackathon/demo convenience without Docker.",
      },
      null,
      2,
    ),
  );
  if (!result.ok) process.exitCode = 1;
}

const isDirect =
  process.argv[1] &&
  (process.argv[1].endsWith("proofHealth.ts") ||
    process.argv[1].endsWith("proofHealth.js"));
if (isDirect) {
  main();
}
