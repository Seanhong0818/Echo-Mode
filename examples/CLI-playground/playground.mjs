import readline from "node:readline";
import { createEchoFSM, State } from "../../open/packages/fsm/dist/index.js";
import { basicHeuristics } from "../../open/packages/heuristics/dist/index.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "echo> " });
const fsm = createEchoFSM({ initial: State.Sync, heuristics: basicHeuristics() });

console.log("Echo CLI: type a message (Ctrl+C to exit)");
rl.prompt();

rl.on("line", (line) => {
  const out = fsm.evaluate({ message: line.trim() });
  console.log(JSON.stringify(out, null, 2));
  rl.prompt();
});
