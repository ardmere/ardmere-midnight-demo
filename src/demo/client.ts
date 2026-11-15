// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Tiny client for the local demo session server.
 *
 * The server owns the testkit chain, wallet and providers so that deploy,
 * prove, submit and read can be separate CLI commands against one live chain.
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PORT = Number(process.env.DEMO_PORT ?? "8787");
const BASE = `http://127.0.0.1:${PORT}`;
const DEMO_DIR = path.join(ROOT, ".demo");
const SESSION_LOG = path.join(DEMO_DIR, "session.log");

type Health = {
  ok: boolean;
  ready: boolean;
  deployed?: boolean;
  proven?: boolean;
  contractAddress?: string;
};

export async function health(): Promise<Health | null> {
  try {
    const res = await fetch(`${BASE}/health`, {
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    return (await res.json()) as Health;
  } catch {
    return null;
  }
}

export async function ensureServer(): Promise<Health> {
  fs.mkdirSync(DEMO_DIR, { recursive: true });
  const existing = await health();
  if (existing?.ready) return existing;
  if (existing && !existing.ready) {
    // A previous server is still closing; wait for its port to be released.
    for (let i = 0; i < 60; i += 1) {
      await sleep(500);
      if (!(await health())) break;
    }
  }

  const tsx = path.join(ROOT, "node_modules", ".bin", "tsx");
  const fd = fs.openSync(SESSION_LOG, "a");
  const child = spawn(tsx, ["src/demo/session.ts"], {
    cwd: ROOT,
    detached: true,
    stdio: ["ignore", fd, fd],
    env: { ...process.env, DEMO_PORT: String(PORT) },
  });
  child.unref();
  fs.closeSync(fd);

  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    const h = await health();
    if (h?.ready) return h;
    await sleep(1000);
  }
  throw new Error(
    `demo session did not become ready; see ${path.relative(ROOT, SESSION_LOG)}`,
  );
}

export async function requireServer(): Promise<Health> {
  const h = await health();
  if (!h?.ready) {
    throw new Error(
      "demo session is not running; run `npm run demo:deploy` first (or `npm run demo:stop` to reset)",
    );
  }
  return h;
}

export async function post<T>(route: string): Promise<T> {
  const res = await fetch(`${BASE}${route}`, {
    method: "POST",
    signal: AbortSignal.timeout(600_000),
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(body.error ?? `${route} failed with ${res.status}`);
  }
  return body as T;
}

export async function get<T>(route: string): Promise<T> {
  const res = await fetch(`${BASE}${route}`, {
    signal: AbortSignal.timeout(30_000),
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(body.error ?? `${route} failed with ${res.status}`);
  }
  return body as T;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
