# Echo Mode Whitepaper — Protocol Spec v0.1

## Abstract
Echo Mode defines a protocol layer for stable, tone-aware interactions on top of large language models (LLMs).  
It introduces a finite-state machine (FSM), a tone weight vector, and a machine-readable footnote contract to ensure deterministic alignment across sessions and providers.

---

## 1. Introduction
LLM-based systems are fragile:
- Brittle prompt hacks
- Session drift over long conversations
- No standardized notion of "alignment stability"

Echo Mode addresses these by introducing a deterministic protocol layer, independent of provider or model.

---

## 2. Architecture

### 2.1 Finite-State Machine (FSM)
- States: `Sync → Resonance → Insight → Calm`
- Guarded transitions, safe back-edges

### 2.2 Tone Weight Vector
- `w = [w_sync, w_res, w_chal, w_calm]`, each ∈ [0,1], sum = 1
- Provides a continuous measure of alignment pressure

### 2.3 SYNC_SCORE
- Scalar ∈ [0,1]
- Computed from:
  - Instruction adherence
  - Embedding similarity
  - Stability penalties
  - Safety gates

### 2.4 Repair Loop
- If `SYNC_SCORE < threshold`:
  - Tighten instructions  
  - Lower sampling temperature  
  - Fallback to `Calm`

### 2.5 Footnote Contract
- Appended out-of-band:

```json
{ "echo": { "SYNC_SCORE": 0.82, "STATE": "Resonance", "PROTOCOL_VERSION": "v1.3" } }


## 3. Implementation

- Minimal Express middleware (`@echo/express`)
- Browser HUD demo
- React components (planned)

## 4. Comparison with Prompt Engineering

|               | Prompt Hacks     | Echo Protocol      |
|---------------|------------------|--------------------|
| **Stability** | Fragile          | Deterministic FSM  |
| **Scope**     | Single session   | Cross-session      |
| **Transparency** | Hidden        | Machine footnote   |
| **Alignment** | Implicit         | Explicit SYNC_SCORE |

## 5. Roadmap

- v0.1: JS SDK + Middleware
- v0.2: React HUD + CLI
- v0.3: Python client
- v0.4: Provider adapters (Gemini, Anthropic)
- v0.5: Drift/Eval suite + CI

## 6. Conclusion

Echo Mode transforms unstable LLM interactions into a stable, measurable, protocol-governed process.
