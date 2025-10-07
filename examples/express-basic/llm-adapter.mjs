// Minimal LLM adapter interface (example only)
export class LLMAdapter {
  async generate(_prompt) {
    throw new Error("not implemented");
  }
}
