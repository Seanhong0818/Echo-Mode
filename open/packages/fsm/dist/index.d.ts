export declare enum State {
    Sync = "Sync",
    Resonance = "Resonance",
    Insight = "Insight",
    Calm = "Calm"
}
export type Heuristics = (input: {
    message: string;
    tokens?: number;
}) => {
    sync: number;
    res?: number;
    insight?: number;
    calm?: number;
};
export declare function createEchoFSM(opts: {
    initial: State;
    heuristics: Heuristics;
}): {
    evaluate(input: Parameters<Heuristics>[0]): {
        state: State;
        score: {
            sync: number;
            res?: number;
            insight?: number;
            calm?: number;
        };
        next: State;
    };
    transition(next: State): void;
    getState(): State;
};
