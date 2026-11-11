---
name: proposed-components
description: The proposed layer of the design system. A component or token a design needs but the system doesn't have is built properly — same rules, its atomic level named — as a shared proposed draft, used by every design that needs it, and adopted into the system only when a design using it is approved or the designer adopts it directly. Keeps unapproved work out of the system without letting drafts drift. Used by design-handoff, the library procedures, and /uxos:adopt.
---

# proposed-components

Goal: the design system holds only what has been approved — a rejected design must not
leave dead components behind — while designs still get built from real, reusable pieces.
Nothing is drawn as a one-off, and nothing unapproved lands in the system.

## The rule
A design needs something the system doesn't have. Check, in order:
1. **The system** — an existing component, variant, or token that does the job. Reuse it.
2. **The proposed layer** — a draft another design already created. Reuse it.
3. Only then **create a draft**, in the proposed layer.

Never create a second draft of something that already exists as a draft. If a design needs
a draft slightly differently, **change the one draft** (add a variant or state) rather than
copying it.

## A draft is built properly
Same rules as any system component: tokens only, its atomic level named, built from the
levels beneath it, accessible at the atom, no inline styling (`code-build-contract`). A
draft may be composed of system components and other drafts — never the other way round:
**a system component never depends on a draft.**

**New tokens** may be drafts too. **Changing an existing token** is not a draft: it changes
everything already approved, so it goes through `change-impact` — and lands only when the
design that needs it is approved.

## Where drafts live
| Tool | System | Proposed layer |
|---|---|---|
| Code | the library's level folders | a `proposed/` area with the same level folders, or a `@status proposed` tag where the repo can't take folders |
| Figma | the library pages | a **Proposed** page in the same file, by level |
| Claude Design | the design system | drawn on the journey canvas, labelled `proposed`. With `design_master: code` the system only changes from code, so drafts are code drafts mirrored later |
| Model | `patterns.md` §6 | `patterns.md` **Proposed components** table |

Every draft has an entry in the **Proposed components** table: name, level, what it's
composed of, the design that created it, **Used by** (every design using it), status, date.

## Changing a draft
A change to a draft changes every design using it. Before changing one, list its Used by;
after, flag each of those designs to re-check, the same way `change-impact` would.

## Adopting — moving a draft into the system
A draft is adopted when:
- **a design using it is approved** (its design record is set to `status: approved`) — list
  the drafts it uses and offer to adopt each; or
- **the designer adopts it directly** (`/uxos:adopt`) — useful once a draft is used by two
  or more designs, so they stop waiting on each other's approval.

For each draft, show the designer and adopt only on a yes:
1. **Check it against the system as it is now** — the system may have changed since the
   draft was made. A near-duplicate is merged into the existing component instead.
2. **Move it** into the system at its level (code: from `proposed/` into the level folder,
   `@status` removed; Figma: from the Proposed page to the library; model: from the
   Proposed table into §6).
3. **Update everything using it** to point at the system version — designs, screens, the
   Units' Build notes.
4. On `design_master: code`, say Claude Design is now behind and suggest `design-mirror`
   push.

The designer may approve a design but decline one of its drafts ("use the existing card
instead"). Then the design is changed to use the system component before it counts as
approved.

## When a design is rejected
Remove the drafts that **only** it used, or keep them marked `not adopted` if the designer
wants a record. Drafts still used by another design stay.

## Developers
The Units' Build notes name drafts as `proposed`, so nobody builds production work on a
draft by mistake.

## Never
Put an unapproved component or token into the system; draw a one-off instead of a draft;
create a second draft of something already drafted; make a system component depend on a
draft; or delete a draft another design still uses.
