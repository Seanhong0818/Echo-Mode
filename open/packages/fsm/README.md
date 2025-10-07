# @echo/fsm — Echo Mode Finite-State Machine (Open Core)

**Protocol:** v1.3  
**License:** Apache-2.0  
**Language:** TypeScript (Node 18+)

Four states: **Sync → Resonance → Insight → Calm**.

This open-core package exposes a minimal, deterministic FSM that wraps a heuristic
scoring function. No learned weights or calibration are included here.

## Install
```bash
pnpm add @echo/fsm
```

## Quickstart
```ts
import { createEchoFSM, State } from "@echo/fsm";

const heuristics = ({ message }: { message: string }) => ({
  sync: Math.max(0, Math.min(1, 1 - (message.length/400)))
});

const fsm = createEchoFSM({ initial: State.Sync, heuristics });
console.log(fsm.evaluate({ message: "hello" }));
```

## API
- `createEchoFSM({ initial, heuristics })`
- `State` enum: `"Sync" | "Resonance" | "Insight" | "Calm"`
