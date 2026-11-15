// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/** Step 3: exchange generates the submitSnapshot proof without submitting it. */
import { post, requireServer } from "./client.js";

await requireServer();
console.log(JSON.stringify(await post("/prove"), null, 2));
