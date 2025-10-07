# @echo/hud — Echo Mode React HUD (Open Core)

**Protocol:** v1.3  
**License:** Apache-2.0  
**Language:** React (TypeScript)

The HUD visualizes FSM states (`Sync`, `Resonance`, `Insight`, `Calm`) and their current heuristic scores in real time.
It’s designed for developers who want to embed Echo Mode feedback directly in chat UIs or dashboards.

---

## ⚡ Install

```bash
pnpm add @echo/hud
# or
npm i @echo/hud
```

---

## 🧩 Usage

```tsx
import { EchoHud } from "@echo/hud";

export default function Demo() {
  const sample = { state: "Resonance", score: { sync: 0.88 } };
  return <EchoHud {...sample} />;
}
```

---

## ⚙️ Props

| Prop | Type | Description |
|------|------|-------------|
| `state` | `"Sync" \| "Resonance" \| "Insight" \| "Calm"` | FSM current state |
| `score` | `{ sync: number; res?: number; insight?: number; calm?: number }` | Heuristic result |

---

## 🧠 Example (Dev Preview)

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { EchoHud } from "@echo/hud";

const App = () => (
  <div style={{ padding: 20 }}>
    <EchoHud state="Sync" score={{ sync: 0.94 }} />
  </div>
);

createRoot(document.getElementById("root")!).render(<App />);
```
