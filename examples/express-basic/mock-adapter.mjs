import { LLMAdapter } from "./llm-adapter.mjs";

export class MockLLM extends LLMAdapter {
  async generate(prompt) {
    // simple echo with embellishment to simulate a model
    return `Echoed(${prompt}) — mock reply.`;
  }
}
