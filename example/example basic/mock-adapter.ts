// SPDX-License-Identifier: Apache-2.0
import type { LLMAdapter } from "./llm-adapter";

export const mockAdapter: LLMAdapter = {
  async generate(input: string) {
    // Simulate an LLM answer deterministically
    const output = input.includes("?")
      ? "Let me explore that—here are a few angles to consider..."
      : "Acknowledged. Here's a concise response.";
    const tokens = Math.ceil(output.length / 4);
    return { output, usage: { tokens } };
  }
};
