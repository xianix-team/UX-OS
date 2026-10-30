---
name: to-be-solved
description: Assemble scope candidates and run gate G2 -- the designer decides yes/no/defer/needs-verification per candidate, and sets a response type for each item to solve. Groups by user group (from a problems register, improve/revamp) or by theme (from problem-validation, greenfield). Writes uxos/to-be-solved.md, the contract for Part B.
---

# to-be-solved

Goal: convert either a problems register (improve/revamp) or a theme-consolidated
problem-validation (greenfield) into an explicit scope decision, with a response type per
item so Part B knows which playbook to run.

## Determine grouping from the source
- Candidates came from `problems.md` (a UX Matrix pass) → `grouping: user-group`.
- Candidates came from `problem-validation` (greenfield, consolidated by theme) →
  `grouping: theme`, carrying severity/impact/dependencies/phase/success-metric per theme.

## Assemble candidates
- `PROCESS` and compliance-bound problems, or domain-research-derived business
  goals/compliance obligations → **Business Goals** / **Compliances** blocks. In scope by
  default, but still listed so nothing is hidden.
- Everything else → the pain-points section, in whichever grouping applies.
- `Assumption`-tier problems (improve/revamp) → pre-mark **needs-verification**; no decision.
- If `competitors.md` exists: accepted `CMP-` implications of kind table-stakes gap or
  whitespace → candidates labelled `[competitive]`, never pre-marked `yes`; `supports`
  implications → cited as extra evidence on the candidate they support.

## Gate G2 (the designer decides)
For each candidate row, ask: `yes` / `no` / `defer` / `needs-verification`.
For each `yes`, set the **response type**:
`content-fix` · `pattern-adjustment` · `journey-improvement` · `journey-redesign` ·
`new-feature` · `escalate`.
Offer a suggestion — from the register's candidate-routing table (improve/revamp), or
inferred from the theme (greenfield, usually `new-feature` or `journey-redesign` since
there's no existing journey to merely adjust) — the designer chooses.

Non-blocking: if the designer wants to solve something with no validated problem behind it,
allow it — record `driver: stakeholder-unvalidated` on the item.

## Output
`uxos/to-be-solved.md` from the template, `grouping` set:
- Business Goals + Compliances blocks.
- Pain-points section in the matching grouping block (user-group or theme).
- Deferred list (with reasons).
- Needs-verification list — mirror into `open-questions.md`.
Update `uxos/README.md`. If the designer has a client-supplied requirements document (a
PRD/BRD, functional + non-functional requirements), suggest `requirements-gap-analysis`
next — not required, but this is the point where it's most useful, before work fans out
into journeys. Then run `next-steps`.
