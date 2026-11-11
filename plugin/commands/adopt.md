---
description: Review the proposed components — drafts made for designs not yet approved — and adopt them into the design system, merge them into an existing component, or remove unused ones. Shows what each draft is used by first.
argument-hint: "[component name — optional]"
---

Review proposed components. Optional component: `$ARGUMENTS`.

## Steps

1. Read the **Proposed components** table in `uxos/patterns.md` and the design records in
   `uxos/design-records/`. If there are no drafts, say so and stop.

2. List the drafts (or just `$ARGUMENTS`): level, Used by, status, age, and whether any
   design using it is approved. Point out drafts used by two or more designs, drafts whose
   designs are all approved, and drafts nothing uses any more.

3. Run the `proposed-components` skill for the ones the designer picks — **adopt**
   (checked against the current system first, then moved into it and everything using it
   updated), **merge** into an existing component, or **remove** (only if nothing else
   uses it). Show each change before making it; act only on a yes.

4. Run the `next-steps` skill and present its block.
