# @echo/heuristics — Baseline Heuristics (3-rule Open Core)

**Protocol:** v1.3 • **License:** Apache-2.0

This package provides a **baseline heuristics** implementation with **three transparent rules**:
- `sync`: length-penalized score in [0,1]
- `chal`: naive challenge signal (number of `?`, capped at 1)
- `calm`: derived from sync (`0.6*sync + 0.2`)

Remaining keys (`res`, `insight`, `drift`) are stubs at `0`.

Commercial editions replace this with **calibrated six-dimensional weights**
and drift repair.

---

## Install

```bash
pnpm add @echo/heuristics
# or
npm i @echo/heuristics
```

## Quickstart

```ts
import { basicHeuristics } from "@echo/heuristics";

const score = basicHeuristics();
console.log(score({ message: "hello?" }));
// → { sync: 0.99, chal: 0.33, calm: 0.79, res: 0, insight: 0, drift: 0 }
```
