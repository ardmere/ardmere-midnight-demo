// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/** Step 5: regulator reads and verifies the public snapshot from the indexer. */
import { get, requireServer } from "./client.js";

await requireServer();
const snapshot = await get<any>("/read");
if (!snapshot.published) {
  throw new Error("snapshot is not published");
}
console.log(JSON.stringify(snapshot, null, 2));
