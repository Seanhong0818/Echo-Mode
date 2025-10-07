#!/usr/bin/env bash
set -e

echo "🧩 Running local Echo Mode test..."

pnpm -r --filter "./open/packages/*" run build
node examples/demo/test-fsm.mjs

echo "✅ Local test finished successfully."