# @echo/fsm — Echo Mode Finite-State Machine (Open Core)

**Protocol:** v1.3 • **License:** Apache-2.0

The FSM maps heuristic **Scores** to one of four protocol states:
**Sync, Resonance, Insight, Calm**. This open-core package ships a simple, non-calibrated policy.
The commercial edition replaces thresholds with calibrated policies and learned weights.

---

## Install

```bash
pnpm add @echo/fsm
# or
npm i @echo/fsm
```

When used inside the monorepo, the workspace variant is already available.

---

## Quickstart

```ts
import { createEchoFSM, State } from "@echo/fsm";

// Any function that returns Scores (see types below)
const heuristics = ({ message }: { message: string }) => ({ sync: 0.92 });

const fsm = createEchoFSM({ initial: State.Sync, heuristics });

const out1 = fsm.evaluate({ message: "hello" });  // { state, score, next }
console.log(out1.state); // "Sync"

fsm.transition(State.Calm);                        // manual override
console.log(fsm.getState()); // "Calm"
```

---

## API

### `createEchoFSM(options)`
- `initial: State` — initial machine state
- `heuristics(input) => Scores` — scoring function (open-core or yours)
- `policy?: Policy` — optional naive thresholds & auto-transition flag

**Returns**
- `evaluate(input) => { state, score: Scores, next: State }`
- `transition(next: State)`
- `getState() => State`

### Types

```ts
export enum State {
  Sync = "Sync",
  Resonance = "Resonance",
  Insight = "Insight",
  Calm = "Calm"
}

export type Scores = {
  sync: number;
  res?: number;
  insight?: number;
  chal?: number;
  calm?: number;
  drift?: number;
};

export type Policy = {
  thresholds?: { sync?: number; chal?: number; res?: number };
  autoTransition?: boolean; // default: true
};
```

**Default policy (open-core)**
1) `chal >= 0.60` → Insight  
2) else `sync >= 0.70` → Sync  
3) else `res >= 0.60` → Resonance  
4) else → Calm

---

## Notes
- This is **not calibrated**. Enterprise/SaaS adds learned weights, calibration UIs,
  drift dashboards, and compliance tooling.
- Scores may be derived from **user input**, **model output**, or any text turn.

## License
Apache-2.0
