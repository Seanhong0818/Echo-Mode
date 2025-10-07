// SPDX-License-Identifier: Apache-2.0
/**
 * Open-core baseline heuristics (4-rule version).
 * Transparent rules for computing: sync, res, insight, calm.
 * No learned weights. Other dimensions (chal, drift) are stubs.
 */
/**
 * Core transparent heuristics.
 * Rules:
 *  1. Length penalty → sync: shorter = more synchronized.
 *  2. Emphasis (!, ?) → resonance proxy.
 *  3. Question structure → insight proxy.
 *  4. Residual calm = 1 - weighted sum(sync,res,insight).
 */
export function basicHeuristics() {
    return ({ message, tokens = 0 }) => {
        const text = String(message ?? "").trim();
        const len = text.length;
        // 1. Sync: shorter text implies stronger alignment.
        const syncRaw = 1 - (len + tokens) / 500;
        const sync = clamp(syncRaw);
        // 2. Resonance: punctuation and emphasis.
        const punctCount = (text.match(/[!?]/g) || []).length;
        const res = clamp(punctCount / 5);
        // 3. Insight: question form or interrogative words.
        const isQuestion = /\?$/.test(text) || /\b(why|how|what|when|where|which)\b/i.test(text);
        const insight = clamp((isQuestion ? 0.6 : 0) + (1 - sync) * 0.2);
        // 4. Calm: derived residual stability.
        const calm = clamp(1 - (sync * 0.4 + res * 0.3 + insight * 0.3));
        // Return full score object with stubs for future calibration fields.
        return { sync, res, insight, calm, chal: 0, drift: 0 };
    };
}
/** Normalize number into [0,1] */
function clamp(x) {
    if (!Number.isFinite(x))
        return 0;
    return Math.max(0, Math.min(1, x));
}
