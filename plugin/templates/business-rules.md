---
artifact: business-rules
project: <slug>
status: draft
confidence: <observed | mixed | from-code | assumption>
---

# Business Rules — <product name>

The single source of truth for the product's rules: limits, validation, eligibility, status
transitions, calculations, cut-offs, permissions. Journeys and units reference rules by id
(`BR-<n>`) instead of restating them, so a rule changes in one place. Built from policy
text, the live product, and the code; kept current by `code-sync`.

`state`: `existing` (the product does this today) or `proposed` (decided in design work, not
built yet). Evidence: `[from code, <file>:<line>]`, `[observed-web]`, `[from docs, <file>]`,
`[designer]`. Never record a rule without evidence; unconfirmed ones go to
`open-questions.md` instead.

## <Object, e.g. Booking>

| ID | Rule | State | Evidence | Confidence | Used by |
|---|---|---|---|---|---|
| BR-1 | <the rule, with exact values — e.g. "Max 8 guests per booking"> | existing | `[from code, booking.ts:1]` | confirmed | J1 step 1 · U-J1-1 |
| BR-2 | <…> | proposed | `[designer]` | decided | J3 step 2 |

## <Object, e.g. Payment / Refund>

| ID | Rule | State | Evidence | Confidence | Used by |
|---|---|---|---|---|---|

## Permissions & roles

| ID | Rule | State | Evidence | Confidence | Used by |
|---|---|---|---|---|---|

## Rules with no UI trace
<rules found only in code or policy that users never see stated — each also raised in
`open-questions.md`, since the designer may want them surfaced in the product>

## Change log
| Date | Rule | Change | Source |
|---|---|---|---|
| <YYYY-MM-DD> | BR-<n> | <old value → new value, added, or retired> | <sync-log entry / commit / designer> |
