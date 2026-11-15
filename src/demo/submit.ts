// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/** Step 4: submit the pre-generated proof to the live local chain. */
import { post, requireServer } from "./client.js";

await requireServer();
console.log(JSON.stringify(await post("/submit"), null, 2));
