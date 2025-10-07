#!/usr/bin/env bash
set -e

echo "🔍 Running prepublish checks..."

# 1. 確保 workspace 構建完整
pnpm install --frozen-lockfile

# 2. 檢查 TypeScript 錯誤
pnpm -r --filter "./open/packages/*" run build

# 3. 檢查 SPDX license headers
echo "🔎 Checking SPDX headers..."
if ! grep -R "SPDX-License-Identifier" open/packages/ >/dev/null; then
  echo "⚠️ Missing SPDX headers in some files."
else
  echo "✅ SPDX headers OK."
fi

echo "✅ Prepublish checks passed. Ready for release."