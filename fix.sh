# == Echo Mode 一鍵修復 ==
set -euo pipefail

# 0) 檢查位置
if [ ! -d .git ]; then
  echo "請在 repo 根目錄執行（這裡要有 .git/）"
  exit 1
fi

echo "→ 0) 建立根 tsconfig.json"
cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
JSON

echo "→ 1) 建立 pnpm-workspace.yaml"
cat > pnpm-workspace.yaml <<'YAML'
packages:
  - open/packages/*
  - examples/*
YAML

echo "→ 2) 正規化資料夾大小寫與拼字"
git config core.ignorecase false

# Packages -> packages
if [ -d open/Packages ]; then
  git mv open/Packages open/_Packages_tmp || true
  git mv open/_Packages_tmp open/packages || true
fi

# FSM -> fsm
if [ -d open/packages/FSM ]; then
  git mv open/packages/FSM open/packages/_fsm_tmp || true
  git mv open/packages/_fsm_tmp open/packages/fsm || true
fi

# Hud -> hud
if [ -d open/packages/Hud ]; then
  git mv open/packages/Hud open/packages/_hud_tmp || true
  git mv open/packages/_hud_tmp open/packages/hud || true
fi

# Heursitics(錯字) -> heuristics
if [ -d open/packages/Heursitics ]; then
  git mv open/packages/Heursitics open/packages/heuristics || true
fi

# exporter -> exporters
if [ -d open/packages/exporter ]; then
  git mv open/packages/exporter open/packages/exporters || true
fi

echo "→ 3) 確保各套件 src/ 與必要檔存在"
mkdir -p open/packages/fsm/src open/packages/heuristics/src open/packages/hud/src open/packages/middleware/src open/packages/exporters/src

# HUD 檔案（若不存在就補）
if [ ! -f open/packages/hud/src/EchoHud.tsx ]; then
  cat > open/packages/hud/src/EchoHud.tsx <<'TSX'
// SPDX-License-Identifier: Apache-2.0
import React from "react";

type Score = { sync: number; res?: number; insight?: number; calm?: number };
type Props = { state: string; score: Score };

export const EchoHud: React.FC<Props> = ({ state, score }) => {
  const colorMap: Record<string, string> = {
    Sync: "#3b82f6",
    Resonance: "#10b981",
    Insight: "#f59e0b",
    Calm: "#64748b"
  };
  const color = colorMap[state] ?? "#6b7280";

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: `${color}20`,
        border: `2px solid ${color}`,
        width: "250px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <h3 style={{ color }}>{state}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {Object.entries(score).map(([k, v]) => (
          <li key={k}>
            {k}: {(v * 100).toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
};
TSX
fi

if [ ! -f open/packages/hud/src/index.ts ]; then
  echo 'export { EchoHud } from "./EchoHud";' > open/packages/hud/src/index.ts
fi

echo "→ 4) 統一各套件 tsconfig.build.json"
for pkg in fsm heuristics hud middleware exporters; do
  cat > open/packages/$pkg/tsconfig.build.json <<'JSON'
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"]
}
JSON
done

echo "→ 5) 移除 macOS .DS_Store 並忽略"
echo ".DS_Store" >> .gitignore
git rm --cached .DS_Store 2>/dev/null || true

echo "→ 6) 提交修正（若有變更）"
git add -A
git commit -m "chore(repo): normalize paths, add tsconfig & workspace, ensure src, unify tsconfig.build" || true

echo "→ 7) 啟用 Corepack / pnpm"
node -v
corepack enable
corepack prepare pnpm@9 --activate

echo "→ 8) 安裝 workspace 依賴（TS/React 型別）"
pnpm add -w -D typescript @types/react @types/react-dom
pnpm add -w react react-dom

echo "→ 9) 安裝全部依賴"
pnpm install

echo "→ 10) 建置所有 open-core 套件"
pnpm -r --filter "./open/packages/*" build

echo "✅ 全部完成！你可以執行 examples："
echo "   pnpm --dir examples/express-basic install && pnpm --dir examples/express-basic dev"
echo "   curl -X POST http://localhost:3000/chat -H 'Content-Type: application/json' -d '{\"message\":\"hello echo?\"}'"