// SPDX-License-Identifier: Apache-2.0
export interface LLMAdapter {
  generate(input: string): Promise<{ output: string; usage?: { tokens?: number } }>;
}
