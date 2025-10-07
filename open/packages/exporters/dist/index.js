// SPDX-License-Identifier: Apache-2.0
import { writeFileSync } from "node:fs";
/** Write CSV (values are JSON-stringified). */
export function toCSV(path, rows) {
    if (!rows?.length) {
        writeFileSync(path, "");
        return;
    }
    const headers = Object.keys(rows[0] ?? {});
    const lines = [
        headers.join(","),
        ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? "")).join(","))
    ];
    writeFileSync(path, lines.join("\n"));
}
/** Write JSON Lines (one JSON object per line). */
export function toJSONL(path, rows) {
    writeFileSync(path, (rows ?? []).map(r => JSON.stringify(r)).join("\n"));
}
