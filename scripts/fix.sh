#!/usr/bin/env bash
set -e

echo "🧹 Cleaning up build artifacts..."
find open/packages -type d -name "dist" -exec rm -rf {} +
rm -f pnpm-lock.yaml
pnpm store prune

echo "✅ Cleanup done. You can now rebuild fresh."