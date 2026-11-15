// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0
/**
 * reportRef = SHA-256(UTF-8 URL). Documented in README.
 * The circuit stores the digest as Bytes<32>; it does not rehash the URL.
 */

import { createHash } from "node:crypto";
import { REPORT_URL } from "./constants.js";

export function reportRefFromUrl(url: string = REPORT_URL): Uint8Array {
  return createHash("sha256").update(url, "utf8").digest();
}
