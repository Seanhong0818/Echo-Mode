// SPDX-License-Identifier: Apache-2.0

export type Input = { message: string; tokens?: number };

/**
 * Transparent baseline heuristics (no learned weights).
 * Returns a simple 'sync' score in [0,1] based on length and token count.
 */
export function basicHeuristics() {
  return ({ message, tokens = 0 }: Input) => {
    const len = message?.trim()?.length ?? 0;
    const raw = 1 - (len + tokens) / 500;
    const sync = Math.max(0, Math.min(1, Number.isFinite(raw) ? raw : 0));
    return { sync };
  };
}
