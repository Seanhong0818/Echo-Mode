# Versioning Policy

Echo Mode OSS follows **Semantic Versioning (SemVer)**.

Given a version number `MAJOR.MINOR.PATCH`:

- **MAJOR**: incompatible API or protocol changes  
- **MINOR**: backward-compatible feature additions  
- **PATCH**: backward-compatible bug fixes only

## Release Process

- Maintainers update version in `package.json` files for OSS packages under `open/packages/*`.
- Changelog (`CHANGELOG.md`) is updated with release notes.
- A Git tag `vX.Y.Z` is created on the `main` branch.
- GitHub Actions `release.yml` workflow builds and publishes to npm.

## Example

- `1.3.0` — current OSS release, stable FSM/heuristics/HUD/middleware/exporters.
- `1.4.0` — planned release with new adapters and exporters.
- `2.0.0` — future release introducing protocol extensions.

## Commercial Releases

Commercial SaaS follows **Calendar Versioning (CalVer)** (e.g., `2025.09`) internally.  
OSS (Apache-2.0) and commercial (BSL/EULA) release cadences are independent but related by protocol version.

