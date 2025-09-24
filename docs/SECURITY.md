# Security Policy

We take security seriously and appreciate responsible disclosure.

## Supported Versions

We generally support the latest **minor** release line of OSS packages. Security fixes will target:
- Current `main`
- Most recent `X.Y` if feasible

## Reporting a Vulnerability

- Email: **team@echomode.io** (PGP preferred)
- Subject: `Vulnerability Report – echo-mode`
- Include:
  - Affected package and version(s)
  - Reproduction steps or proof-of-concept
  - Impact assessment (what an attacker gains)
  - Any relevant environment details

## Coordinated Disclosure

- We will acknowledge receipt within **3 business days**.
- We will provide a status update within **10 business days**.
- We aim to release a fix within **30 days** for high-severity issues when reasonably possible.
- You agree not to publicly disclose details until a fix is available and users have had a reasonable update window.

## Out of Scope (for OSS)

- Commercial modules (calibration weights, SaaS dashboards, connectors) are handled in the private repository and separate process.
- Social engineering, physical attacks, or issues requiring compromised developer machines.
- Vulnerabilities that require non-default, insecure configurations.

## Development & Supply Chain Practices

- Dependency updates via Dependabot.
- Reproducible builds with lockfiles.
- npm provenance for published packages.
- Optional SBOM (CycloneDX) in `sbom/`.

## Reporting License/Boundary Concerns

If you find code or artifacts in this repo that appear to violate the OSS/Commercial boundary, open a confidential issue via email at **oss-boundary@echomode.io** with file paths and commit hashes.

Thank you for helping keep Echo Mode and its users safe.
