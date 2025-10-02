# CLI Playground — Echo Mode

This is a minimal **command-line playground** for Echo Mode, running entirely on open-core packages.

## Why
- No LLM keys required.
- Type text, press enter → see Echo Mode state and scores.
- Good for testing heuristics and FSM state transitions.

## Run
```bash
# Build dependencies from repo root
pnpm -r --filter ./open/packages/* build

# Install deps for CLI demo
pnpm --dir examples/cli-playground install

# Run the playground
pnpm --dir examples/cli-playground start
```
