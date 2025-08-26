```md
# API Reference

## Middleware Options

```ts
echoMiddleware({
  provider: "openai" | "anthropic" | "gemini" | "local",
  getApiKey: () => string,
  policy: {
    initialState: EchoState,
    enableFootnote?: boolean,
    weights?: {
      w_sync: number,
      w_res: number,
      w_chal: number,
      w_calm: number,
    },
  },
})

Parameters
	•	provider: Which LLM backend to call.
	•	getApiKey: Function returning provider API key.
	•	policy.initialState: Starting FSM state.
	•	policy.enableFootnote: Append machine footnote to response.
	•	policy.weights: Tone weight vector (normalized).

Response Footnote
{ "echo": { "SYNC_SCORE": 0.81, "STATE": "Sync", "PROTOCOL_VERSION": "v1.3" } }
