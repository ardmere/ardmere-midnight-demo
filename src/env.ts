// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * Load the gitignored `.env` into process.env.
 *
 * Node's built-in loader is used (Node >= 20.12), so no dependency is needed.
 * Values already present in the real environment win: shell exports override
 * the file, which is what CI and one-off overrides expect. A missing `.env` is
 * not an error — every script must still work from plain env vars.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ENV_FILE = path.resolve(here, "../.env");

let loaded = false;

export function loadDotEnv(file: string = ENV_FILE): void {
  if (loaded) return;
  loaded = true;
  if (!fs.existsSync(file)) return;
  process.loadEnvFile(file);
}

/** Load `.env` once, then hand back process.env. */
export function preprodEnv(): NodeJS.ProcessEnv {
  loadDotEnv();
  return process.env;
}

/**
 * Set `key=value` in `.env`, preserving every other line and comment.
 *
 * Rewriting in place keeps the operator's edits (e.g. Blockfrost token) while
 * letting scripts fill in values they derived. The file is created with 0600
 * permissions when missing, because it holds secrets.
 */
export function upsertEnvVar(
  key: string,
  value: string,
  file: string = ENV_FILE,
): "created" | "updated" | "unchanged" {
  if (!/^[A-Z_][A-Z0-9_]*$/.test(key)) {
    throw new Error(`Invalid env key: ${key}`);
  }
  if (/\n/.test(value)) {
    throw new Error(`Refusing to write a multi-line value for ${key}`);
  }

  const exists = fs.existsSync(file);
  const lines = exists ? fs.readFileSync(file, "utf8").split("\n") : [];
  const entry = `${key}=${value}`;
  const index = lines.findIndex((l) =>
    new RegExp(`^\\s*${key}\\s*=`).test(l),
  );

  let status: "created" | "updated" | "unchanged";
  if (index >= 0) {
    if (lines[index] === entry) return "unchanged";
    lines[index] = entry;
    status = "updated";
  } else {
    if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
    lines.push(entry, "");
    status = exists ? "updated" : "created";
  }

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, lines.join("\n"), { mode: 0o600 });
  // writeFileSync does not chmod an existing file, so enforce it explicitly.
  fs.chmodSync(file, 0o600);
  return status;
}
