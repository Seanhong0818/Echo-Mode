// SPDX-License-Identifier: Apache-2.0
export var State;
(function (State) {
    State["Sync"] = "Sync";
    State["Resonance"] = "Resonance";
    State["Insight"] = "Insight";
    State["Calm"] = "Calm";
})(State || (State = {}));
export function createEchoFSM(opts) {
    let state = opts.initial;
    return {
        evaluate(input) {
            const score = opts.heuristics(input);
            // naive suggested-next state policy (optional):
            const next = score.sync >= 0.7 ? State.Sync : State.Calm;
            return { state, score, next };
        },
        transition(next) {
            state = next;
        },
        getState() {
            return state;
        }
    };
}
