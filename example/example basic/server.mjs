import express from "express";
import { createEchoFSM, State } from "@echo/fsm";
import { basicHeuristics } from "@echo/heuristics";
import { echoMiddleware } from "@echo/middleware";

const fsm = createEchoFSM({ initial: State.Sync, heuristics: basicHeuristics() });
const app = express();
app.use(express.json());
app.use(echoMiddleware());

app.post("/chat", (req, res) => {
  const msg = String(req.body?.message ?? "");
  const out = fsm.evaluate({ message: msg });
  res.json({ state: out.state, score: out.score, next: out.next });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Echo Mode demo: http://localhost:${port}`));
