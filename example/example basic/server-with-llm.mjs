import express from "express";
import { createEchoFSM, State } from "@echo/fsm";
import { basicHeuristics } from "@echo/heuristics";
import { echoMiddleware } from "@echo/middleware";

// Inline mock adapter to avoid TypeScript transpilation in this demo
const mockAdapter = {
  async generate(input) {
    const output = input.includes("?")
      ? "Let me explore that—here are a few angles to consider..."
      : "Acknowledged. Here's a concise response.";
    const tokens = Math.ceil(output.length / 4);
    return { output, usage: { tokens } };
  }
};

const fsm = createEchoFSM({ initial: State.Sync, heuristics: basicHeuristics() });
const app = express();
app.use(express.json());
app.use(echoMiddleware());

app.post("/chat", async (req, res) => {
  const user = String(req.body?.message ?? "");

  // (1) Optional: evaluate the user input
  const inEval = fsm.evaluate({ message: user });

  // (2) Get "model" output via mock (no keys needed)
  const { output, usage } = await mockAdapter.generate(user);

  // (3) Evaluate the model output (recommended in real systems)
  const outEval = fsm.evaluate({ message: output, tokens: usage?.tokens });

  res.json({
    user,
    model: output,
    state_after_model: outEval.state,
    score_after_model: outEval.score
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Echo Mode demo (with mock LLM): http://localhost:${port}`));
