# Echo Mode Developer Guide

This guide provides developers with the resources needed to integrate Echo Mode into LLM-based systems.  
It covers setup, minimal integration, footnote handling, best practices, testing, and roadmap alignment.

---

## 1. Overview

Echo Mode is a **protocol layer** for LLM chat systems. It uses:

- **Finite-State Machine (FSM)** with states: `Sync`, `Resonance`, `Insight`, `Calm`
- **Tone Weight Vector**  
  `w = [w_sync, w_res, w_chal, w_calm]`, with `Σ w_i = 1`
- **SYNC_SCORE ∈ [0,1]** — scalar stability/alignment signal
- **Repair loop** — guarded recovery when score drops
- Optional **machine footnote** appended out-of-band:

```json
{
  "echo": {
    "SYNC_SCORE": 0.82,
    "STATE": "Resonance",
    "PROTOCOL_VERSION": "v1.3"
  }
}
```

Works with any provider exposing chat completions (OpenAI / Anthropic / Gemini / local).  
No fine-tuning. No agentive claims. Deterministic middleware around model I/O.

---

## 2. Setup

### Requirements
- Node.js 20+
- pnpm via Corepack (`corepack enable`)
- Provider API key (e.g., `OPENAI_API_KEY`)

### Install & Build
```bash
pnpm install
pnpm -r build
```

### Environment Example
```bash
export OPENAI_API_KEY=sk-...
```

---

## 3. Minimal Integration (Express)

Mirrors the snippet used in `quickstart/middleware.md` (kept identical for consistency):

```ts
import express from "express";
import { echoMiddleware, EchoState } from "@echo/express";

const app = express();
app.use(express.json());

app.post("/chat", echoMiddleware({
  provider: "openai", // or "anthropic", "gemini", ...
  getApiKey: () => process.env.OPENAI_API_KEY!,
  policy: {
    initialState: EchoState.Sync,
    enableFootnote: true,
    weights: { w_sync: 0.6, w_res: 0.2, w_chal: 0.15, w_calm: 0.05 },
  },
}));

app.listen(3000, () => console.log("Echo server running on :3000"));
```

**Why these defaults?**
- `initialState = Sync` → conservative start, guarded forward edges  
- `weights` sum to 1 — used by controller/scoring  
- `enableFootnote = true` — exposes `{SYNC_SCORE, STATE, PROTOCOL_VERSION}`

---

## 4. Footnote: Reading the Machine Contract

When `enableFootnote=true`, responses include an out-of-band object:

```json
{ "echo": { "SYNC_SCORE": 0.82, "STATE": "Resonance", "PROTOCOL_VERSION": "v1.3" } }
```

- `STATE ∈ { "Sync", "Resonance", "Insight", "Calm" }`  
- `SYNC_SCORE ∈ [0,1]`  
- `PROTOCOL_VERSION` reflects the spec version in use  

**Operational uses**
- Log `STATE` transitions for drift visibility  
- Dashboard metrics (rolling average, p95)  
- Trigger repair loop when `SYNC_SCORE < τ`

---

## 5. Patterns & Best Practices

### A. Multi-session alignment
- Persist per-session `SYNC_SCORE` history  
- Use rolling mean / EWMA to detect drift  
- On resume: re-seed with last state (`Sync` unless last was `Calm`)

### B. Logging & observability
- Store raw footnotes (append-only) for audits  
- Chart `STATE` vs time; annotate sharp drops  
- Alert when `SYNC_SCORE` falls below threshold N times in M minutes

### C. Safety & recovery
- If `SYNC_SCORE < τ`:
  - tighten guard instructions  
  - lower temperature or nucleus/top-p  
  - fallback to `Calm`

### D. Cross-provider adapters
- Keep provider I/O thin; controller constant  
- Record provider/model id in each footnote for later analysis

### E. Config hygiene
- Normalize `w` (`Σ w_i = 1`)  
- Keep `τ` (threshold) close to domain tolerance (e.g., 0.65–0.8)  
- Version policy docs alongside `PROTOCOL_VERSION`

---

## 6. Testing & Debugging

### cURL Smoke Test
```bash
curl -s http://localhost:3000/chat   -H "Content-Type: application/json"   -d '{"messages":[{"role":"user","content":"Hi!"}]}'
```

**Check the out-of-band footnote** in the response:
- `STATE ∈ {Sync, Resonance, Insight, Calm}`
- `SYNC_SCORE ∈ [0,1]`
- `PROTOCOL_VERSION = "v1.3"`

### Local Checks
- **Score dips**: inspect prompt/response length, refusal loops, instruction conflicts  
- **State flapping**: add hysteresis for `Resonance → Sync` (see RFC 0001 §3.1)  
- **Provider mismatch**: verify API key selection and model caps (tokens/temperature)

---

## 7. Roadmap Alignment

- **v0.1**: JS SDK + Express middleware + README  
- **v0.2**: React HUD components + CLI (planned)  
- **v0.3**: Python client (planned)  
- **v0.4**: Provider adapters (Gemini, Anthropic) (planned)  
- **v0.5**: Drift/Eval suite + CI (planned)

---

This guide targets **v0.1** and the **v1.3 protocol contract**.
