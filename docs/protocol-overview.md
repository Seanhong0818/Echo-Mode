# Protocol Overview

Echo Mode defines a **protocol layer** for conversational stability on top of LLM APIs.  
It standardizes I/O without altering model parameters.

## Core Concepts

- **Finite-State Machine (FSM)**  
  States: Sync, Resonance, Insight, Calm.  
  Deterministic transitions with back-edges for recovery.

- **Tone Weight Vector**  
  w = [w_sync, w_res, w_chal, w_calm], normalized to 1.0.  
  Used to calculate SYNC_SCORE.

- **Output Contract**  
  Optional footnote: `{SYNC_SCORE, STATE, PROTOCOL_VERSION}`

- **Repair Loop**  
  If SYNC_SCORE < threshold → adjust prompt policy (temperature, guardrails).

---

## Example Flow

1. User triggers Echo Mode → enters `Sync`.  
2. Model maintains alignment → `Resonance`.  
3. If deviation grows, FSM routes to `Insight` (challenge mode).  
4. System falls back to `Calm` when instability persists.

---
