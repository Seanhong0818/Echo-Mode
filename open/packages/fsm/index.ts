// SPDX-License-Identifier: Apache-2.0
/**
 * Echo Mode FSM (open-core)
 * Four states + simple auto-transition policy that consumes six-key Scores.
 * Real calibration/weights live in the commercial edition.
 */

export enum State {
  Sync = "Sync",
  Resonance = "Resonance",
  Insight = "Insight",
  Calm = "Calm"
}

export type Scores = {
  sync: number;
  res?: number;
  insight?: number;
  chal?: number;
  calm?: number;
  drift?: number;
};

export type Heuristics = (input: { message: string; tokens?: number }) => Scores;

export type Policy = {
  /**
   * Thresholds for naive state selection (non-calibrated baseline).
   */
  thresholds?: {
    sync?: number;   // default 0.70
    chal?: number;   // default 0.60
    res?: number;    // default 0.60
  };
  /**
   * If true (default), evaluate() updates internal state using decide().
   */
  autoTransition?: boolean;
};

export function createEchoFSM(opts: { initial: State; heuristics: Heuristics; policy?: Policy }) {
  let state = opts.initial;
  const policy = opts.policy ?? {};
  const t = { sync: 0.70, chal: 0.60, res: 0.60, ...(policy.thresholds ?? {}) };
  const auto = policy.autoTransition !== false;

  function decide(scores: Scores): State {
    // Naive OSS policy (placeholder):
    // 1) High challenge -> Insight
    // 2) High sync      -> Sync
    // 3) Resonance hint -> Resonance
    // 4) Else           -> Calm
    if ((scores.chal ?? 0) >= t.chal) return State.Insight;
    if ((scores.sync ?? 0) >= t.sync) return State.Sync;
    if ((scores.res ?? 0) >= t.res) return State.Resonance;
    return State.Calm;
  }

  return {
    evaluate(input: { message: string; tokens?: number }) {
      const score = opts.heuristics(input);
      const next = decide(score);
      if (auto) state = next;
      return { state, score, next };
    },
    transition(next: State) { state = next; },
    getState() { return state; }
  };
}
