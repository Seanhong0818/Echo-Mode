/**
 * Open-core baseline heuristics (4-rule version).
 * Transparent rules for computing: sync, res, insight, calm.
 * No learned weights. Other dimensions (chal, drift) are stubs.
 */
export type Input = {
    message: string;
    tokens?: number;
};
export type Scores = {
    sync: number;
    res: number;
    insight: number;
    calm: number;
    chal?: number;
    drift?: number;
};
/**
 * Core transparent heuristics.
 * Rules:
 *  1. Length penalty → sync: shorter = more synchronized.
 *  2. Emphasis (!, ?) → resonance proxy.
 *  3. Question structure → insight proxy.
 *  4. Residual calm = 1 - weighted sum(sync,res,insight).
 */
export declare function basicHeuristics(): ({ message, tokens }: Input) => Scores;
