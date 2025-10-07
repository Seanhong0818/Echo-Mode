# @echo/exporters — CSV / JSONL Exporters (Open Core)

**License:** Apache-2.0

Lightweight exporters for saving Echo Mode scores to **CSV** or **JSON Lines** format.
Suitable for experiments and local logs.

---

## Install

```bash
pnpm add @echo/exporters
# or
npm i @echo/exporters
```

---

## Usage

```ts
import { toCSV, toJSONL } from "@echo/exporters";

toCSV("out.csv", [{ a: 1, b: "x" }, { a: 2 }]);
toJSONL("out.jsonl", [{ event: "eval", score: { sync: 0.91 } }]);
```

### Notes
- CSV values are JSON-stringified (so commas/newlines are safe).
- JSONL writes one object per line.
- Enterprise exporters add schema versioning, cloud sinks, and PII-safe redaction.
