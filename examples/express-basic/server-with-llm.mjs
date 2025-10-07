import express from "express";
import { createEchoFSM, State } from "../../open/packages/fsm/dist/index.js";
import { basicHeuristics } from "../../open/packages/heuristics/dist/index.js";
import { MockLLM } from "./mock-adapter.mjs";

const app = express();
app.use(express.json());

const fsm = createEchoFSM({ initial: State.Sync, heuristics: basicHeuristics() });
const llm = new MockLLM();

app.post("/chat", async (req, res) => {
  const msg = String(req.body?.message ?? "");
  const modelReply = await llm.generate(msg);
  const out = fsm.evaluate({ message: modelReply });
  res.json({ modelReply, state: out.state, score: out.score, next: out.next });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Echo Mode LLM demo: http://localhost:${port}`));
