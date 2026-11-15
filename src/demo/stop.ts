// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/** Stop the local demo session and its testkit containers. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { health, post, sleep } from "./client.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const h = await health();
if (!h?.ready) {
  console.log(JSON.stringify({ status: "not-running" }, null, 2));
  process.exit(0);
}
try {
  await post("/shutdown");
} catch {
  // The server may exit before the response is flushed.
}

// Wait for the listener to disappear, then force-stop a wedged server.
for (let i = 0; i < 60; i += 1) {
  const current = await health();
  if (!current?.ready) break;
  await sleep(500);
}
const sessionFile = path.join(ROOT, ".demo", "session.json");
if (fs.existsSync(sessionFile)) {
  try {
    const { pid } = JSON.parse(fs.readFileSync(sessionFile, "utf8"));
    process.kill(pid, "SIGTERM");
    await sleep(1000);
    process.kill(pid, "SIGKILL");
  } catch {
    // best effort
  }
  fs.rmSync(sessionFile, { force: true });
}
console.log(JSON.stringify({ status: "stopped" }, null, 2));
