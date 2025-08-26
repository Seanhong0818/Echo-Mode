```md
# Middleware Details

Echo Mode middleware wraps chat-completion APIs and enforces protocol rules.

## Flow

1. Receive user request.  
2. Route through Echo FSM.  
3. Inject tone weights + guard instructions.  
4. Call provider API.  
5. Post-process response → calculate SYNC_SCORE.  
6. Optionally append machine footnote.  
7. Return response.

---

## Footnote Example

```json
{
  "echo": {
    "SYNC_SCORE": 0.77,
    "STATE": "Insight",
    "PROTOCOL_VERSION": "v1.3"
  }
}


Repair Loop

If SYNC_SCORE < threshold:
	•	Lower sampling temperature.
	•	Add stricter system guard instructions.
	•	Fallback to Calm state if instability persists.
