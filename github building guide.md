echo-mode/
├─ LICENSE
├─ README.md
├─ CHANGELOG.md
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md
├─ SECURITY.md
├─ .gitignore
├─ .gitattributes
├─ .editorconfig
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.base.json
├─ .github/
│  ├─ ISSUE_TEMPLATE/bug_report.md
│  ├─ ISSUE_TEMPLATE/feature_request.md
│  └─ workflows/ci.yml
├─ docs/
│  ├─ quickstart.md
│  ├─ protocol-overview.md
│  ├─ api-reference.md
│  ├─ middleware.md
│  ├─ eval-results.md
│  ├─ rfcs/
│  │  ├─ 0000-template.md
│  │  └─ 0001-echo-protocol-spec.md
│  └─ images/   # 圖片：FSM 圖、EWMA 曲線、HUD 截圖
├─ packages/
│  ├─ core/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  ├─ src/
│  │  │  ├─ index.ts          # 出口：EchoFSM, types
│  │  │  ├─ fsm.ts            # 狀態機、轉移表
│  │  │  ├─ score.ts          # SYNC_SCORE（可先簡版）+ EWMA
│  │  │  ├─ footnote.ts       # 機器 footnote（STATE, SYNC_SCORE, PROTOCOL_VERSION）
│  │  │  └─ repair.ts         # repair loop 策略
│  │  └─ tests/
│  │     └─ core.spec.ts
│  ├─ express/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  └─ src/middleware.ts    # `echoMiddleware()`：包裝 chat-completions
│  └─ hud/                     # （可選）瀏覽器 HUD 元件
│     ├─ package.json
│     ├─ tsconfig.json
│     └─ src/index.ts         # 顯示 STATE/SYNC_SCORE 的小元件
├─ examples/
│  ├─ minimal-node/
│  │  ├─ package.json
│  │  └─ server.ts            # 20 行 server，回傳 footnote
│  ├─ browser-chatbox/
│  │  └─ index.html           # 純原生頁，顯示 STATE + SCORE
│  └─ react-app/              # （可選）React + Tailwind Demo
│     └─ src/App.tsx
└─ scripts/
   ├─ release.mjs             # 發版小腳本（可後補）
   └─ lint.mjs                # 共同 lint 腳本（可後補）
