import express from "express";
import { createEchoFSM, State } from "../../open/packages/fsm/dist/index.js";
import { basicHeuristics } from "../../open/packages/heuristics/dist/index.js";

const app = express();
app.use(express.json());

const fsm = createEchoFSM({ initial: State.Sync, heuristics: basicHeuristics() });

app.post("/chat", (req, res) => {
  const msg = String(req.body?.message ?? "");
  const out = fsm.evaluate({ message: msg });
  res.json({ state: out.state, score: out.score, next: out.next });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Echo Mode demo running: http://localhost:${port}`));
