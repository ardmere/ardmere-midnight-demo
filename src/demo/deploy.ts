// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/** Step 2: deploy standard_por through the live demo session. */
import { ensureServer, post } from "./client.js";

try {
  await ensureServer();
  console.log(JSON.stringify(await post("/deploy"), null, 2));
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`\nDeploy failed: ${message}`);
  if (message.includes("already deployed")) {
    console.error(
      "The demo session already has a contract. Run `npm run demo:stop`, then `npm run demo:deploy` for a fresh run.",
    );
  }
  process.exitCode = 1;
}
