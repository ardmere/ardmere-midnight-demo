// Copyright 2026 Ardmere
// SPDX-License-Identifier: Apache-2.0

/** Fixed hackathon batch size (see docs/MST-ENCODING.md). */
export const MST_LEAF_COUNT = 64;

/** Binary tree depth: 2^6 = 64. */
export const MST_DEPTH = 6;

export const ZERO_USER_ID = new Uint8Array(32);

/** Largest per-asset magnitude representable in a Compact Uint<64>. */
export const UINT64_MAX = 2n ** 64n - 1n;

/**
 * Demo prices in micro-USDT per smallest asset unit:
 * - BTC: 60,000 USDT / BTC, 1 sat = 1e-8 BTC -> 600 micro-USDT
 * - ETH:  3,000 USDT / ETH, 1e-8 ETH       ->  30 micro-USDT
 * - USDT: 1 micro-USDT per 1e-6 USDT      ->   1 micro-USDT
 *
 * Prices are public circuit inputs; these are only the demo defaults.
 */
export const DEMO_PRICES = {
  btc: 600n,
  eth: 30n,
  usdt: 1n,
} as const;
