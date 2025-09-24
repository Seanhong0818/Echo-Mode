# Echo Mode Governance

This document defines how decisions are made in the **Echo Mode OSS** project.

## Roles

- **Maintainers** — Core contributors with commit and release rights.  
- **Contributors** — Anyone submitting issues, PRs, or docs.  
- **Users** — People adopting Echo Mode in their projects.

## Decision Making

- Day-to-day: Maintainers use **lazy consensus** (changes happen if no objections).  
- Major changes: Require an RFC issue + discussion.  
- Security issues: Handled privately (see `SECURITY.md`).

## Releases

- Follows **Semantic Versioning**.  
- Release tags (`vX.Y.Z`) on `main` trigger npm publish for open-core packages.

## Adding Maintainers

- New maintainers nominated by existing maintainers.  
- Requires majority approval of current maintainers.  

## Conflict Resolution

If consensus cannot be reached, maintainers vote. Majority decision is final.

## Commercial Governance

Commercial modules (dashboards, calibration, connectors, ops) are governed in the private repository and follow a separate process.
