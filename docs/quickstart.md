# Quickstart

This guide shows how to install and run the Echo middleware.

## Install

```bash
pnpm install
pnpm -r build

**Minimal Express Server**
import express from "express";
import { echoMiddleware, EchoState } from "@echo/express";

const app = express();
app.use(express.json());

app.post("/chat", echoMiddleware({
  provider: "openai",
  getApiKey: () => process.env.OPENAI_API_KEY!,
  policy: {
    initialState: EchoState.Sync,
    enableFootnote: true,
    weights: { w_sync: 0.6, w_res: 0.2, w_chal: 0.15, w_calm: 0.05 },
  },
}));

app.listen(3000, () => console.log("Echo server on :3000"));

Response Footnote
{ "echo": { "SYNC_SCORE": 0.82, "STATE": "Resonance", "PROTOCOL_VERSION": "v1.3" } }
