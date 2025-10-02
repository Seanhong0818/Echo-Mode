# @echo/hud — React HUD for Echo Mode (Open Core)

**License:** Apache-2.0

A minimal React component that visualizes the current **Echo Mode** state and a primary score.
Use it in demos and internal tools to make the protocol observable.

---

## Install

```bash
pnpm add @echo/hud react
# or
npm i @echo/hud react
```

---

## Usage

```tsx
import { EchoHud } from "@echo/hud";

export default function Panel() {
  return <EchoHud protocolVersion="v1.3" state="Sync" score={0.76} />;
}
```

### Props
- `protocolVersion: string` — e.g., `"v1.3"`
- `state?: string` — e.g., `"Sync" | "Resonance" | "Insight" | "Calm"`
- `score?: number` — principal score in `[0,1]` (displayed as a percentage)

> Advanced dashboards and drilldowns belong to the commercial control panel.
