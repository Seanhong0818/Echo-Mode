# Echo Mode (OSS) — Protocol-Layer Stability for LLM Interactions

[![CI](https://img.shields.io/github/actions/workflow/status/ORG/echo-mode/ci.yml?branch=main)](#)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](#)
[![npm](https://img.shields.io/npm/v/@echo/fsm.svg)](#)

**Echo Mode** is an open-core toolkit that stabilizes LLM conversations using a **finite-state protocol** and lightweight **heuristics**.  
States: **Sync**, **Resonance**, **Insight**, **Calm**.  
This repo ships the **Apache-2.0** open-core: scaffolding, basic heuristics, HUD, middleware, exporters.  
Advanced **calibration, learned weights, dashboards** live in the commercial repo.

- Protocol Version: **v1.3**
- Language: **TypeScript (Node 18+)**
- Package Manager: **pnpm**
- Monorepo: pnpm workspaces under `open/`

---

## Features (OSS)

- ✅ **FSM core** — deterministic state transitions with guard hooks
- ✅ **Basic heuristics** — transparent rules (no learned weights)
- ✅ **HUD (React)** — visualizes state + scores
- ✅ **Express middleware** — drop-in protocol enforcement for APIs
- ✅ **Exporters** — CSV/JSON for logs and offline analysis
- 🔒 **Commercial** (separate repo): calibration weights, drift dashboards, provider connectors, RBAC/audit, compliance

See **`docs/BOUNDARY.md`** for the OSS ↔ Commercial split.

---

## Quickstart

```bash
# clone
git clone https://github.com/ORG/echo-mode.git
cd echo-mode

# install
pnpm install

# build all OSS packages
pnpm -r --filter ./open/packages/* build

# run example dev servers (if provided by packages)
pnpm -r --filter @echo/hud dev
```

Use the FSM in your app:

```ts
// app.ts
import { createEchoFSM, State } from "@echo/fsm";
import { basicHeuristics } from "@echo/heuristics";

const fsm = createEchoFSM({
  initial: State.Sync,
  heuristics: basicHeuristics(),
});

const { state, score } = fsm.evaluate({
  // minimal telemetry-free signals you provide
  message: "User: keep it concise.",
  tokens: 42,
});

if (score.sync < 0.6) {
  fsm.transition(State.Sync);
}
```

Add middleware:

```ts
import express from "express";
import { echoMiddleware } from "@echo/middleware";

const app = express();
app.use(express.json());
app.use(echoMiddleware()); // enforces state & headers

app.post("/chat", async (req, res) => {
  // your handler – now guarded by Echo Mode protocol headers
  res.json({ ok: true });
});

app.listen(3000);
```

Mount the HUD (React):

```tsx
import { EchoHud } from "@echo/hud";

export function Panel() {
  return <EchoHud protocolVersion="v1.3" />;
}
```

Export logs:

```ts
import { toCSV, toJSONL } from "@echo/exporters";
toCSV("runs.csv", [{ ts: Date.now(), state: "Sync", score: 0.71 }]);
```

---

## Packages

- `@echo/fsm` – finite state machine and protocol contracts
- `@echo/heuristics` – transparent rules (no ML weights)
- `@echo/hud` – React visualization components
- `@echo/middleware` – Express/Node middleware
- `@echo/exporters` – CSV/JSON emitters

---

## Telemetry & Privacy

- **OSS default:** telemetry **OFF**.  
- The open-core runs locally and does not collect or send data.  
- See `docs/PRIVACY.md` and `docs/TELEMETRY.md`.

---

## Security

- Vulnerability disclosure process: see `docs/SECURITY.md`.
- Supply chain: lockfile, Dependabot, npm provenance, optional SBOM (`sbom/`).

---

## Versioning & Releases

- **SemVer** for OSS packages.  
- Release tags `vX.Y.Z` trigger npm publish for `open/packages/*`.  
- Changelog uses Keep a Changelog in `docs/CHANGELOG.md`.

---

## License

- Code in this repository is licensed under **Apache-2.0**.  
- “Echo Mode” is a trademark; see `docs/TRADEMARKS.md`.

---

## Commercial Extensions

For calibration weights, drift dashboards, SaaS control panel, and provider connectors, contact the team or see the private commercial repository.

