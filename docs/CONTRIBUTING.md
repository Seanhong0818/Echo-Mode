# Contributing to Echo Mode (OSS)

Thanks for helping improve Echo Mode! This document explains how to propose changes safely and efficiently.

## Ground Rules

- Follow the **Apache-2.0** license and the **BOUNDARY.md** (no commercial code/weights in OSS).
- Be professional and respectful. See `CODE_OF_CONDUCT.md`.
- Prefer small, focused pull requests with tests.

## Development Setup

1. Node 18+ and pnpm installed.
2. Clone and install:
   ```bash
   git clone https://github.com/ORG/echo-mode.git
   cd echo-mode
   pnpm install
   ```
3. Build & test:
   ```bash
   pnpm -r --filter ./open/packages/* build
   pnpm -r --filter ./open/packages/* test
   pnpm -r --filter ./open/packages/* lint
   ```

## Repository Layout

- **Open-core only** under `open/packages/*`:
  - `fsm`, `heuristics`, `hud`, `middleware`, `exporters`
- Documentation in `docs/*`

Do **not** introduce any closed algorithms, learned weights, SaaS code, or provider credentials.

## Issue Workflow

1. Search existing issues.
2. Open a new issue with a clear title and minimal reproduction.
3. Mark type: `bug`, `enhancement`, `docs`, or `question`.

## Pull Request Workflow

1. Fork the repo and create a branch: `feature/brief-name` or `fix/brief-name`.
2. Ensure:
   - Lint passes: `pnpm -r lint`
   - Tests pass: `pnpm -r test`
   - Types pass: `pnpm -r build`
3. Update or add tests for new behavior.
4. Update docs if needed.
5. Open a PR and fill the PR template.

### Commit Conventions

- Conventional Commits recommended:
  - `feat(fsm): add transition hook`
  - `fix(heuristics): guard NaN`
  - `docs: update README`

## Code Style

- TypeScript strict mode.
- ESLint + Prettier.
- SPDX header in new source files:
  ```
  // SPDX-License-Identifier: Apache-2.0
  ```

## Testing

- Use Vitest for unit tests.
- Keep tests deterministic; avoid network or vendor APIs.
- Provide fixtures under `__tests__/fixtures`.

## Security & Secrets

- Never commit secrets.
- No production keys or proprietary payloads.
- See `SECURITY.md` for reporting vulnerabilities.

## CLA / DCO

- We accept contributions under Developer Certificate of Origin (DCO) by default.
- Sign your commits with `Signed-off-by:` or use GitHub’s UI confirmation.

## Release Process (Maintainers)

- Merge via squash/merge after CI green and at least one approval.
- Tag `vX.Y.Z` on main to trigger publish.
- Update `docs/CHANGELOG.md`.

## Contact

- Questions: open a GitHub Discussion or issue.
- Security: see `SECURITY.md`.

Thanks for building a stable protocol layer with us!
