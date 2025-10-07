import { createEchoFSM, State } from "../../open/packages/fsm/dist/index.js";
import { basicHeuristics } from "../../open/packages/heuristics/dist/index.js";

const fsm = createEchoFSM({ initial: State.Sync, heuristics: basicHeuristics() });
const out = fsm.evaluate({ message: "Hello Echo Mode!" });
console.log(JSON.stringify(out, null, 2));
