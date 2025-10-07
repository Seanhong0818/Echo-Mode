#!/usr/bin/env bash
set -e

echo "🚀 Building all Echo Mode open-core packages..."
pnpm -r --filter "./open/packages/*" run build

echo "✅ Build completed successfully."