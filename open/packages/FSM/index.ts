// SPDX-License-Identifier: Apache-2.0

export enum State {
  Sync = "Sync",
  Resonance = "Resonance",
  Insight = "Insight",
  Calm = "Calm"
}

export type Heuristics = (input: { message: string; tokens?: number }) => {
  sync: number;
  res?: number;
  insight?: number;
  calm?: number;
};

/**
 * Deterministic FSM for Echo Mode baseline.
 * No learned weights or calibration logic here.
 */
export function createEchoFSM(opts: { initial: State; heuristics: Heuristics }) {
  let state = opts.initial;

  return {
    evaluate(input: Parameters<Heuristics>[0]) {
      const score = opts.heuristics(input);
      return { state, score };
    },
    transition(next: State) {
      state = next;
    },
    getState() {
      return state;
    }
  };
}
