import readline from "node:readline";
import { createEchoFSM, State } from "@echo/fsm";
import { basicHeuristics } from "@echo/heuristics";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const fsm = createEchoFSM({ initial: State.Sync, heuristics: basicHeuristics() });

console.log("Echo Mode CLI Playground (type 'exit' to quit)");
rl.setPrompt("> ");
rl.prompt();

rl.on("line", (line) => {
  if (line.trim().toLowerCase() === "exit") {
    rl.close();
    return;
  }
  const out = fsm.evaluate({ message: line });
  console.log("→", JSON.stringify(out, null, 2));
  rl.prompt();
});

rl.on("close", () => process.exit(0));
