# Protocol Overview

Echo Mode provides a protocol layer for stable, tone-aware interactions on top of LLM chat APIs.  
It implements a finite-state machine (FSM), a tone weight vector, and an optional machine footnote.

## FSM States

- Sync
- Resonance
- Insight
- Calm

## Tone Weights

- `w_sync`
- `w_res`
- `w_chal`
- `w_calm`  
Each ∈ [0,1], and the sum is 1.

## Output Contract

```json
{
  "SYNC_SCORE": 0.82,
  "STATE": "Resonance",
  "PROTOCOL_VERSION": "v1.3"
}

Notes

Protocol = deterministic middleware around model I/O.
No fine-tuning. No agentive or mystical claims.
