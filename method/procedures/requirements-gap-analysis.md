---
name: requirements-gap-analysis
description: Cross-check a client-supplied requirements document (functional + non-functional) against the evidence-based to-be-solved.md, both directions, plus an explicit NFR sweep. Catches what the client's own view of the product missed -- the designer's upper hand. Project-level, not journey-scoped. Optional, suggested after to-be-solved is drafted, never forced -- only relevant when a client document actually exists.
---

# requirements-gap-analysis

Goal: the client doesn't always see the full picture. This checks their stated requirements
against what domain and persona research actually found, in both directions, so gaps get
surfaced and decided deliberately rather than silently inherited either way.

## Prerequisite
`uxos/to-be-solved.md` must exist. This only applies when the designer actually has a
client-supplied requirements artifact to check against (a PRD, BRD, a stakeholder's
functional/non-functional requirements list, meeting notes with explicit asks) — if there
is none, say so and skip; this isn't a step every project needs.

## Extract from the client's document
Pull out discrete requirement statements. Classify each as:
- **Functional** — a capability the system must provide
- **Non-functional** — performance, security, accessibility, scalability, privacy/
  compliance, localization, reliability/offline, data retention, maintainability

Don't only take what's explicitly labelled — a client document that says "handle 10,000
users" or "must work in rural areas with poor signal" is stating NFRs even if it never uses
the term.

## Direction 1 — client requirement → to-be-solved
For each extracted client requirement, check whether an equivalent item already exists in
`to-be-solved.md` (any grouping). If none, or only a partial match, flag it — the designer
decides: add it (with a response type), note it's already covered some other way, or
dismiss it (state why — e.g. it isn't actually grounded in a real user or business need,
worth raising back to the client rather than building blind).

## Direction 2 — to-be-solved → client requirement
For each **evidence-grounded** to-be-solved item (tied to a real persona need, a domain
finding, or a `PRB-` id — not a `stakeholder-unvalidated` one), check whether the client's
document covers it at all. If not, this is a genuine catch: something the research found
that the client's own view missed. Flag it for the designer to decide whether to raise it
with the client (record in `open-questions.md`, non-blocking) or defer.

## Direction 3 — NFR sweep
Walk the fixed checklist — performance/load, security, accessibility, scalability, privacy/
compliance, localization, reliability/offline, data retention, maintainability — regardless
of whether the client's document mentions any of them. Mark each: addressed by the client,
addressed by to-be-solved, or a genuine gap in both. Gaps here are usually the most valuable
catches — NFRs are what clients forget most often.

## Decisions
Present the whole gap report at once (assembly from two already-confirmed sources, not a
sequence of fresh decisions). For each flagged row, the designer decides: add to
`to-be-solved.md` (set a response type), raise with the client via `open-questions.md`, or
dismiss with a stated reason. Apply accepted additions back into `to-be-solved.md` directly.

## Output
`uxos/requirements-gap.md` from `{{TEMPLATES}}/requirements-gap.md`. Then run `next-steps`.
