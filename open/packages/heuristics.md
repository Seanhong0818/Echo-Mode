# Heuristics Package

## package.json
```json
{
  "name": "@echo/heuristics",
  "version": "1.3.0",
  "license": "Apache-2.0",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "LICENSE", "README.md"],
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "lint": "echo lint",
    "test": "echo tests-todo"
  },
  "devDependencies": { "typescript": "^5.6.0" }
}
```

## tsconfig.build.json
```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": { "outDir": "dist" },
  "include": ["src"]
}
```

## src/index.ts
```ts
// SPDX-License-Identifier: Apache-2.0

export type Input = { message: string; tokens?: number };

/**
 * Transparent baseline heuristics (no learned weights).
 * Returns a simple 'sync' score in [0,1] based on length and token count.
 */
export function basicHeuristics() {
  return ({ message, tokens = 0 }: Input) => {
    const len = message?.trim()?.length ?? 0;
    const raw = 1 - (len + tokens) / 500;
    const sync = Math.max(0, Math.min(1, Number.isFinite(raw) ? raw : 0));
    return { sync };
  };
}
```
