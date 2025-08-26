# Echo Mode — Protocol-Layer Stability for LLM Interactions

Echo Mode provides a **protocol layer** for stable, tone-aware interactions on top of LLM chat APIs.  
It implements a **finite-state machine (FSM)**, **tone weight vector**, and an optional **machine footnote**.

- **FSM states**: `Sync`, `Resonance`, `Insight`, `Calm`
- **Tone weights**: `w_sync`, `w_res`, `w_chal`, `w_calm` (0–1)
- **Output contract** (optional): `{ SYNC_SCORE, STATE, PROTOCOL_VERSION }`
- **Works with**: Any provider exposing chat-completions (OpenAI/Anthropic/Gemini/local)

> Protocol = deterministic middleware around model I/O. No fine-tuning. No agentive claims.

---

## Quick links

[![Docs](https://img.shields.io/badge/Docs-Protocol_Overview-informational)](#protocol-overview) 
[![Quickstart](https://img.shields.io/badge/Quickstart-5_min-green)](#quickstart) 
[![License](https://img.shields.io/badge/License-Apache--2.0-blue)](#license)

**Community**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Follow-blue?logo=linkedin)](www.linkedin.com/in/echo-mode-io-766051376)
[![Medium](https://img.shields.io/badge/Medium-Read-black?logo=medium)](https://medium.com/@seanhongbusiness/beyond-prompts-the-protocol-layer-for-llms-ae5dd2ad0a21)
[![Reddit](https://img.shields.io/badge/Reddit-Discuss-orange?logo=reddit)](https://www.reddit.com/user/Medium_Charity6146/)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white)](https://discord.gg/kDQgjYXBcx)

---

## Quickstart

```bash
pnpm install
pnpm -r build

Minimal Express middleware

<pre>
```ts
import express from "express";
import { echoMiddleware, EchoState } from "@echo/express";

const app = express();
app.use(express.json());

app.post("/chat", echoMiddleware({
  provider: "openai",                  // or "anthropic", "gemini", ...
  getApiKey: () => process.env.OPENAI_API_KEY!,
  policy: {
    initialState: EchoState.Sync,
    enableFootnote: true,
    weights: { w_sync: 0.6, w_res: 0.2, w_chal: 0.15, w_calm: 0.05 },
  },
}));

app.listen(3000, () => console.log("Echo server on :3000"));

Response footnote (when enabled)
{ "echo": { "SYNC_SCORE": 0.82, "STATE": "Resonance", "PROTOCOL_VERSION": "v1.3" } }
import { echoMiddleware, EchoState } from "@echo/express";
...
``` 
</pre>

Protocol overview
	•	FSM: Sync → Resonance → Insight → Calm (guarded transitions, with safe back-edges)
	•	Tone vector: w = [w_sync, w_res, w_chal, w_calm], each ∈ [0,1], ‖w‖₁ = 1
	•	SYNC_SCORE: computed from instruction adherence, embedding similarity, stability penalties, safety gates
	•	Repair loop: if score < threshold → tighten instructions / lower temperature / fallback Calm
	•	Footnote: machine-readable {SYNC_SCORE, STATE, PROTOCOL_VERSION} appended out-of-band

Not part of protocol: anthropomorphic or mystical framing.

⸻

Examples
	•	examples/minimal-node/ — 20-line server
	•	examples/browser-chatbox/ — vanilla HUD shows STATE + SYNC_SCORE
	•	examples/react-app/ — React + Tailwind demo (optional)

⸻

Roadmap
	•	v0.1: JS SDK + Express middleware + Browser HUD + README
	•	v0.2: React HUD components + CLI
	•	v0.3: Python client
	•	v0.4: Provider adapters (Gemini, Anthropic)
	•	v0.5: Drift/Eval suite + CI

⸻

Contributing

PRs welcome. Use pnpm & Node ≥ 18, run pnpm -r test before PR.
Protocol changes must bump PROTOCOL_VERSION and update docs.

⸻

License

Apache-2.0. See LICENSE.
Legacy exploratory materials are preserved under archive/ (frozen; not part of the public API).
