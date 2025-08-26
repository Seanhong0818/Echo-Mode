# API Reference

## echoMiddleware

### Options
- `provider`: string ("openai" | "anthropic" | "gemini" | "local")
- `getApiKey`: () => string
- `policy`:
  - `initialState`: EchoState (default: Sync)
  - `enableFootnote`: boolean
  - `weights`: { w_sync, w_res, w_chal, w_calm }

### Example

```ts
import { echoMiddleware, EchoState } from "@echo/express";

app.post("/chat", echoMiddleware({
  provider: "openai",
  getApiKey: () => process.env.OPENAI_API_KEY!,
  policy: {
    initialState: EchoState.Sync,
    enableFootnote: true,
    weights: { w_sync: 0.6, w_res: 0.2, w_chal: 0.15, w_calm: 0.05 },
  },
}));
