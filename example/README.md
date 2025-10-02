  # Echo Mode Examples Step‑by‑Step Guide

  This guide shows you how to run Echo Mode **without any LLM API keys**,
  validate outputs, and integrate the protocol layer into your own service.

  > **What is Echo Mode?** A protocol layer that stabilizes LLM interactions using a
  > finite‑state machine (FSM) and heuristic scores. Open‑core provides runnable
  > scaffolding; commercial adds calibrated weights & dashboards.
  >
  > **Protocol version:** `v1.3`

  ---

  ## 0) Requirements

  - **Node.js 18+** (LTS recommended)
  - **pnpm** package manager (`npm i -g pnpm`)
  - A shell with `curl` (PowerShell on Windows is fine)

  Verify:
  ```bash
  node -v && pnpm -v
  # Expect Node 18/20+ and pnpm 9+
  ```

  ---

  ## 1) Workspace prep

  From the repo root:

  ```bash
  pnpm install
  pnpm -r --filter ./open/packages/* build
  ```

  This builds all open‑core packages used by the examples:

  - `@echo/fsm` — finite‑state machine
  - `@echo/heuristics` — baseline heuristics (3 rules: `sync`, `chal`, `calm`; others are stubs)
  - `@echo/middleware` — adds `x-echo-protocol: v1.3` header
  - `@echo/hud`, `@echo/exporters` — not required for this demo but built for completeness

  > If you get `ERR_MODULE_NOT_FOUND` later, you probably skipped this step.

  ---

  ## 2) REST demo — `examples/express-basic`

  ### 2.1 Start the server
  ```bash
  pnpm --dir examples/express-basic install
  pnpm --dir examples/express-basic dev
  # Logs: Echo Mode demo: http://localhost:3000
  ```

  ### 2.2 Send a test request
  ```bash
  curl -sS -X POST http://localhost:3000/chat        -H 'Content-Type: application/json'        -d '{"message":"hello echo?"}'
  ```

  **Expected shape**
  ```json
  {
    "state": "Insight",
    "score": {
      "sync": 0.98,
      "chal": 0.33,
      "calm": 0.79,
      "res": 0,
      "insight": 0,
      "drift": 0
    },
    "next": "Insight"
  }
  ```

  **What happened?**
  - The server evaluated your **input text** using open‑core heuristics (no model call).
  - The FSM applied a simple policy:
    1) `chal >= 0.60` → Insight
    2) else `sync >= 0.70` → Sync
    3) else `res >= 0.60` → Resonance
    4) else → Calm
  - `@echo/middleware` added `x-echo-protocol: v1.3` to the response headers.

  ### 2.3 Quick variations
  ```bash
  # Many question marks => higher 'chal' => likely Insight
  curl -sS -X POST http://localhost:3000/chat -H 'Content-Type: application/json'        -d '{"message":"why? really? how?"}'

  # Very long text => lower 'sync' => may fall back to Calm
  curl -sS -X POST http://localhost:3000/chat -H 'Content-Type: application/json'        -d "{"message":"$(python - <<'PY'
print('lorem '*120)
PY)"}"
  ```

  ---

  ## 3) REST demo (with mock "LLM") — optional

  This variant **simulates a model response** with a tiny deterministic mock.
  Still **no API keys** required.

  ```bash
  pnpm --dir examples/express-basic with-llm
  # Logs: Echo Mode demo (with mock LLM): http://localhost:3001

  curl -sS -X POST http://localhost:3001/chat        -H 'Content-Type: application/json'        -d '{"message":"what about edge cases?"}'
  ```

  Flow:
  1. (Optional) Evaluate the **user input**
  2. Get a **mock** model reply (no network)
  3. Evaluate the **model output** (recommended in real systems)

  To integrate a real model later, implement the `LLMAdapter` interface used by the example.

  ---

  ## 4) CLI demo — `examples/cli-playground`

  ```bash
  pnpm --dir examples/cli-playground install
  pnpm --dir examples/cli-playground start
  # Type text, press enter. Type 'exit' to quit.
  ```

  Example:
  ```text
  > hello echo?
  → {
    "state": "Insight",
    "score": { "sync": 0.98, "chal": 0.33, "calm": 0.79, "res": 0, "insight": 0, "drift": 0 },
    "next": "Insight"
  }
  ```

  ---

  ## 5) Heuristics & policy (open‑core)

  **Three baseline rules (in `@echo/heuristics`)**
  - `sync`  = `clamp(1 - (len(message) + tokens)/500, 0, 1)`
  - `chal`  = `min(1, count('?') / 3)`
  - `calm`  = `clamp(0.6 * sync + 0.2, 0, 1)`

  **Other keys**: `res`, `insight`, `drift` are stubs at `0` (API shape parity).

  **Naive FSM policy (in `@echo/fsm`)**
  - `chal ≥ 0.60` → Insight
  - else `sync ≥ 0.70` → Sync
  - else `res ≥ 0.60` → Resonance
  - else → Calm

  > Commercial replaces these with calibrated weights, EWMA smoothing, drift repair, and dashboards.

  ---

  ## 6) Integrate into your service

  Minimal pattern for any Node/Express app:

  ```ts
  import express from "express";
  import { createEchoFSM, State } from "@echo/fsm";
  import { basicHeuristics } from "@echo/heuristics";
  import { echoMiddleware } from "@echo/middleware";

  const fsm = createEchoFSM({ initial: State.Sync, heuristics: basicHeuristics() });
  const app = express();
  app.use(express.json());
  app.use(echoMiddleware());

  app.post("/chat", (req, res) => {
    const msg = String(req.body?.message ?? "");
    const out = fsm.evaluate({ message: msg });
    res.json(out);
  });
  ```

  Swap in your own heuristics by providing any function returning the `Scores` shape.

  ---

  ## 7) Troubleshooting

  - **`ERR_MODULE_NOT_FOUND` / cannot resolve `@echo/*`**  
    Re‑run build: `pnpm -r --filter ./open/packages/* build`

  - **Wrong Node version**  
    Use Node 18+ (LTS). Consider `nvm` on macOS/Linux or `nvs` on Windows.

  - **Port already in use**  
    Set `PORT=3005` (or similar) before starting the demo.

  - **Windows path/quote issues (curl/python)**  
    Use WSL2 or Git Bash; or simplify the long‑text example by pasting a long string.

  ---

  ## 8) What’s next

  - Add the React HUD (`@echo/hud`) to your internal tool for visibility
  - Export runs with `@echo/exporters` (CSV/JSONL) for quick offline analysis
  - For calibrated scoring, drift dashboards, RBAC/SOC2 features → upgrade to the commercial control panel

  ---

  © Echo Mode Open‑core (Apache‑2.0). Protocol v1.3.
