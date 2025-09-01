# Echo Mode Developer Guide

> Version: **v0.1**  
> Protocol Spec: **v1.3**  
> Status: **Draft**

This guide shows how to set up, integrate, and operate Echo Mode.  
It complements the **Quickstart**, **Middleware**, **API Reference**, and **RFC 0001**.

---

## Table of Contents
1. [Overview](#overview)  
2. [Setup](#setup)  
3. [Minimal Integration (Express)](#minimal-integration-express)  
4. [Footnote: Reading the Machine Contract](#footnote-reading-the-machine-contract)  
5. [Patterns & Best Practices](#patterns--best-practices)  
6. [Testing & Debugging](#testing--debugging)  
7. [Roadmap Alignment](#roadmap-alignment)  
8. [References](#references)

---

## Overview

Echo Mode is a **protocol layer** for LLM chat systems. It uses:

- **Finite-State Machine (FSM)** with states: `Sync`, `Resonance`, `Insight`, `Calm`
- **Tone weight vector** `w = [w_sync, w_res, w_chal, w_calm]`, `∑ w_i = 1`
- **SYNC_SCORE** ∈ \[0,1] — scalar stability/alignment signal
- **Repair loop** — guarded recovery when score drops
- Optional **machine footnote** appended out-of-band:
  ```json
  { "echo": { "SYNC_SCORE": 0.82, "STATE": "Resonance", "PROTOCOL_VERSION": "v1.3" } }

Works with any provider exposing chat completions (OpenAI/Anthropic/Gemini/local).
No fine-tuning. No agentive claims. Deterministic middleware around model I/O.

⸻

Setup

Requirements
	•	Node.js 20+
	•	pnpm via Corepack (corepack enable)
	•	Provider API key (e.g., OPENAI_API_KEY)

Install & build

pnpm install
pnpm -r build

Environment example (development):
export OPENAI_API_KEY=sk-...

Minimal Integration (Express)

Mirrors the snippet used in Quickstart/middleware.md, kept identical for consistency.

import express from "express";
import { echoMiddleware, EchoState } from "@echo/express";

const app = express();
app.use(express.json());

app.post("/chat", echoMiddleware({
  provider: "openai",                // or "anthropic", "gemini", ...
  getApiKey: () => process.env.OPENAI_API_KEY!,
  policy: {
    initialState: EchoState.Sync,
    enableFootnote: true,
    weights: { w_sync: 0.6, w_res: 0.2, w_chal: 0.15, w_calm: 0.05 },
  },
}));

app.listen(3000, () => console.log("Echo server running on :3000"));

Why these defaults?
	•	initialState: Sync — conservative start; guarded forward edges
	•	weights sum to 1 — used by controller/scoring (see RFC 0001 §3.2)
	•	enableFootnote: true — exposes {SYNC_SCORE, STATE, PROTOCOL_VERSION} for observability

⸻

Footnote: Reading the Machine Contract

When enableFootnote is true, responses include an out-of-band object:

{
  "echo": {
    "SYNC_SCORE": 0.82,
    "STATE": "Resonance",
    "PROTOCOL_VERSION": "v1.3"
  }
}

	•	STATE ∈ { "Sync", "Resonance", "Insight", "Calm" }
	•	SYNC_SCORE ∈ [0,1]
	•	PROTOCOL_VERSION reflects the spec version in use

Operational uses
	•	Log STATE transitions as a timeline (drift visibility)
	•	Dashboard SYNC_SCORE (rolling average, p95)
	•	Trigger repair loop when SYNC_SCORE < τ:
	•	tighten instructions
	•	reduce sampling temperature
	•	fallback to Calm

⸻

Patterns & Best Practices

A. Multi-session alignment
	•	Persist per-session SYNC_SCORE history
	•	Use rolling mean / EWMA to detect drift
	•	On resume, re-seed with initialState = Sync unless last state was Calm

B. Logging & observability
	•	Store raw footnotes (append-only) for audits
	•	Chart STATE vs time; annotate sharp drops with user events
	•	Alert when SYNC_SCORE falls below threshold N times in M minutes

C. Safety & recovery

If SYNC_SCORE < τ:
	•	First: tighten system/guard instructions
	•	Then: lower temperature or nucleus/top-p
	•	Finally: route to Calm, acknowledge limits, and re-sync

D. Cross-provider adapters
	•	Keep provider I/O in a thin adapter; policy/controller remain constant
	•	RFC 0001 guarantees stable footnote keys for interoperability
	•	Record provider/model id with each footnote for later analysis

E. Config hygiene
	•	Normalize w (∑ w_i = 1)
	•	Keep τ (threshold) close to your domain tolerance (e.g., 0.65–0.8)
	•	Version policy documents alongside PROTOCOL_VERSION

⸻

Testing & Debugging

cURL smoke test

curl -s http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi!"}]}'

Check the out-of-band footnote in the response payload. Confirm:
	•	STATE is one of: Sync | Resonance | Insight | Calm
	•	SYNC_SCORE ∈ [0,1]
	•	PROTOCOL_VERSION = "v1.3"

Local checks
	•	Score dips: inspect recent prompt/response length, refusal loops, or instruction conflicts
	•	State flapping: add hysteresis (see RFC 0001 §3.1 “guarded back-edges”)
	•	Provider mismatch: verify API key selection and model caps (tokens/temperature)

⸻

Roadmap Alignment
	•	v0.1: JS SDK + Express middleware + README
	•	v0.2: React HUD components + CLI (planned)
	•	v0.3: Python client (planned)
	•	v0.4: Provider adapters (Gemini, Anthropic) (planned)
	•	v0.5: Drift/Eval suite + CI (planned)

This guide targets v0.1 and the v1.3 protocol contract.

⸻

References
	•	Whitepaper — concept + architecture
	•	Protocol Overview — FSM, tone vector, repair loop
	•	API Reference — parameters & return shapes
	•	Middleware Guide — Express usage details
	•	RFCs — spec & evolution (see RFC 0001)
