# Middleware

This document explains how to integrate Echo Mode middleware in an application.

## Minimal Express Example

```ts
import express from "express";
import { echoMiddleware, EchoState } from "@echo/express";

const app = express();
app.use(express.json());

app.post("/chat", echoMiddleware({
  provider: "openai", // or "anthropic", "gemini"
  getApiKey: () => process.env.OPENAI_API_KEY!,
  policy: {
    initialState: EchoState.Sync,
    enableFootnote: true,
    weights: { w_sync: 0.6, w_res: 0.2, w_chal: 0.15, w_calm: 0.05 },
  },
}));

app.listen(3000, () => console.log("Echo server running on port 3000"));

Options
	•	provider: string ("openai" | "anthropic" | "gemini" | "local")
	•	getApiKey: function returning a string
	•	policy:
	•	initialState: EchoState (default: Sync)
	•	enableFootnote: boolean
	•	weights: object with tone weights
