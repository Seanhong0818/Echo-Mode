/** Write CSV (values are JSON-stringified). */
export declare function toCSV(path: string, rows: Record<string, unknown>[]): void;
/** Write JSON Lines (one JSON object per line). */
export declare function toJSONL(path: string, rows: unknown[]): void;
