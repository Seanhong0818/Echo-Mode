# Echo Mode RFC Process

RFCs (Request for Comments) are used to propose, discuss, and finalize changes to the Echo Protocol specification and implementation.

## Goals
- Documentation-driven change process: everything is reviewable and traceable.
- Decouple specification from implementation: RFCs define protocol behavior, implementation may evolve separately.
- Provide versioned history for FSM, SYNC_SCORE, footnote contract, etc.

## States
- **Draft**: Initial proposal, open for feedback.
- **Review**: Under active review, reviewers assigned.
- **Accepted**: Approved in principle, ready for implementation.
- **Final**: Merged and announced; breaking changes require a new RFC.
- **Rejected**: Not adopted, but retained for record.

## File Naming
- Location: `docs/rfcs/`
- Format: `NNNN-title-kebab-case.md` (4-digit number, starting from `0001`)
- Each RFC must include a front-matter block (author, status, created date).

## Review Rules
- Submit RFCs via Pull Request with `rfc` and `spec` labels.
- Requires at least 1 maintainer + 1 community reviewer approval.
- Major behavior changes must also bump `PROTOCOL_VERSION`.

## Backward Compatibility
- RFCs must describe compatibility strategy (forward/backward/breaking).
- Breaking changes require migration steps and a deprecation window.

## Decision Record
- Once merged, each RFC should include a `Decision:` block summarizing the final outcome and trade-offs.
