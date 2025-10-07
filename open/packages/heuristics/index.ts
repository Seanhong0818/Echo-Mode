// SPDX-License-Identifier: Apache-2.0
/**
 * Open-core baseline heuristics (3-rule version).
 * Provides transparent scores: sync, chal, calm.
 * Other dimensions are stubs at 0.
 */

export type Input = { message: string; tokens?: number };

export type Scores = {
  sync: number;
  res?: number;
  insight?: number;
  chal?: number;
  calm?: number;
  drift?: number;
};

export function basicHeuristics() {
  return ({ message, tokens = 0 }: Input): Scores => {
    const text = String(message ?? "");
    const len = text.trim().length;
    const raw = 1 - (len + (Number.isFinite(tokens) ? tokens : 0)) / 500;
    const sync = Math.max(0, Math.min(1, Number.isFinite(raw) ? raw : 0));

    const q = (text.match(/\?/g) || []).length;
    const chal = Math.min(1, q / 3);

    const calm = Math.max(0, Math.min(1, sync * 0.6 + 0.2));

    return { sync, chal, calm, res: 0, insight: 0, drift: 0 };
  };
}
