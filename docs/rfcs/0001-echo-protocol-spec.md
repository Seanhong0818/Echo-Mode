# RFC 0001: Echo Protocol Specification v0.1

- Author: Sean (Meta Origin)  
- Status: Draft  
- Created: 2025-08-31  
- Labels: spec, protocol  
- Affected: FSM, SYNC_SCORE, Footnote, Repair Loop  
- PROTOCOL_VERSION: v1.3 (no change)

---

## 1. Summary
Define the Echo Protocol as a provider-agnostic layer that stabilizes LLM interactions via:
- Finite-State Machine (FSM)
- Tone Weight Vector `w`
- Scalar `SYNC_SCORE`
- Machine-readable Footnote
- Deterministic Repair Loop

---

## 2. Motivation
Long, multi-turn interactions suffer from tone drift and brittle prompt patterns.  
A deterministic layer should:
- Constrain transitions with an explicit FSM  
- Measure alignment using a scalar score  
- Expose machine footnotes for observability  
- Provide a repair path when stability degrades  

---

## 3. Specification

### 3.1 Finite-State Machine (FSM)
States: `Sync`, `Resonance`, `Insight`, `Calm`.

Mandatory transitions (simplified):

Sync → Resonance      (when alignment passes threshold)
Resonance → Insight   (on deviation or challenge routing)
Insight → Calm        (on unresolved instability)
Calm → Sync           (on recovery)

- Implementations MAY include guarded back-edges (e.g., `Resonance → Sync`) with hysteresis.  
- Implementations MUST document any additional states or transitions if present.  

### 3.2 Tone Weight Vector
Let `w = [w_sync, w_res, w_chal, w_calm]`, with each `w_i ∈ [0,1]` and `∑ w_i = 1`.  
- `w` conditions controller behavior and contributes to scoring.  
- Implementations MUST normalize `w`.  

### 3.3 SYNC_SCORE (Scalar)
A stability metric `s ∈ [0,1]`. A compliant implementation MUST compute `s` from at least:
- instruction adherence signal  
- embedding/semantic similarity signal  
- stability penalties (e.g., verbosity drift, refusal oscillation)  
- safety gates (if breached, `s` must not exceed a safety ceiling)  

Implementations MAY include additional terms.  
Exact coefficients are **implementation-defined**.  

### 3.4 Repair Loop
If `s < τ` (threshold), the controller MUST attempt at least one of:
- tighten guard instructions  
- reduce sampling temperature  
- fallback to `Calm` state  

### 3.5 Footnote (Machine Contract)
Implementations SHOULD append an out-of-band footnote object:

```json
{
  "echo": {
    "SYNC_SCORE": 0.82,
    "STATE": "Resonance",
    "PROTOCOL_VERSION": "v1.3"
  }
}
```

- **STATE** ∈ { "Sync", "Resonance", "Insight", "Calm" }  
- **SYNC_SCORE** ∈ [0,1]  
- **PROTOCOL_VERSION** MUST reflect the spec version used  

---

## 3.6 Backward Compatibility
- The footnote keys above are **stable** in v0.1.  
- New keys MUST be additive and optional.  
- Removing or renaming existing keys requires a new RFC and version bump.  

---

## 4. Rationale
- FSM provides deterministic routing over open-ended model outputs.  
- A scalar score preserves simplicity for dashboards/alerts while allowing multi-term computation internally.  
- Footnote exposes observability without leaking sensitive prompts.  

---

## 5. Alternatives Considered
- Prompt-only guardrails (fragile, non-deterministic)  
- Fine-tuning for tone (provider-specific, costly)  
- Hidden evaluation (no external observability)  

---

## 6. Security & Privacy
- Do not emit user PII in footnotes.  
- SYNC_SCORE MUST NOT encode sensitive content.  
- When safety gates trigger, implementations MAY clamp `s` and route to `Calm`.  

---

## 7. Drawbacks
- Additional layer adds latency (~milliseconds).  
- Non-standardized coefficients reduce cross-implementation comparability (acceptable for v0.1).  

---

## 8. Adoption
- JS middleware `@echo/express` (reference).  
- Example servers under `examples/`.  

---

## 9. Unresolved Questions
- Should a minimal scoring formula be standardized in v0.2?  
- What are recommended default thresholds per state transition?  

---

## 10. Decision
- On acceptance, mark spec as **Accepted** and keep `PROTOCOL_VERSION=v1.3`.  
- Future breaking changes require a new RFC and semantic bump.  
