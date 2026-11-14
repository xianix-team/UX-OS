---
name: analyse-domain
description: Produce a research-backed analysis of the domain a product sits in (or will sit in, for greenfield) — overview, processes, org structure, roles, terminology, current challenges, regulatory context, baseline metrics. Depth scales with how much the designer already knows. The primary evidence source for greenfield, where there's no product to observe instead. Writes uxos/domain.md.
---

# analyse-domain

Goal: give the co-pilot and the designer a shared, evidence-backed understanding of the
**domain**, so later analysis is not naive. This is domain-general — the specific product
teardown happens in `study-product` (brownfield) or `problem-validation` (greenfield).

## Which domain — confirm before researching
The domain comes from the designer's description of the product (`product-context.md` →
**What it is**, confirmed at intake) or from the product itself on brownfield — **never from
the project name**. Before researching, state the domain in one line ("holiday cabin rentals
in Norway, for owners and guests") and confirm it. If there's no description to go on,
stop and ask for one; don't research a domain the name merely suggests.

## Research may be handed off; the file is not
The research can run in a helper (a subagent or fork) to save time, but the helper only
researches and reports back — it never writes `domain.md` or any other file under `uxos/`.
The main conversation drafts `domain.md` from its findings, shows it, and saves it on the
designer's yes.

## Depth dial
Ask, or infer from the designer's `familiarity` answer:
- `very` → skip this skill entirely.
- `somewhat` → a compact pass covering all 8 sections, lightly.
- `not very` → go deep — this is doing real work. For greenfield especially, this *is* the
  primary evidence source (no product exists to observe instead), so don't shortcut it.

## Research, don't assume
Use web search and web fetch — aim for research-backed findings, not invented ones. Cite
sources inline (`[from <source>]`). Where research doesn't turn up something (e.g. baseline
metrics), leave that section thin or omit it rather than filling it with a guess.

## Cover, per `${CLAUDE_PLUGIN_ROOT}/templates/domain.md`
1. **Domain overview** — what this domain/business is; scope; primary stakeholders.
2. **Core processes** — the general lifecycle/workflow stages, inputs/outputs, decision
   points. Product-agnostic.
3. **Organizational structure** — org types, reporting lines, how size/resourcing vary.
   Omit for simple consumer domains where it doesn't apply.
4. **Roles & responsibilities** — job titles/positions, what each does, who they coordinate
   with. This is the raw material `capture-users` proposes candidate user groups from —
   be concrete and complete here even if some roles end up out of scope later.
5. **Terminology** — domain-specific terms, acronyms, jargon; note regional/product variants.
6. **Current challenges** — operational problems, data/visibility gaps, resource
   constraints, systemic issues. This is the raw material `problem-validation` consolidates
   on greenfield projects.
7. **Regulatory / compliance context** — oversight bodies, standards, requirements. Omit if
   genuinely not applicable rather than padding it.
8. **Baseline metrics** — current-state performance data, only if research actually
   surfaces it.

## Stay domain-general — no product teardowns
This describes the domain, not any one product in it. When research turns up specific
products or services (a competitor, a government app), **list them by name only**, with a
one-line note of what kind of thing each is, under Domain overview — and suggest
`/uxos:competitors` for a proper look. Don't write their features, partners, launch dates,
usage figures, or claims into `domain.md`; that's competitor analysis, with its own evidence
rules. Mechanics that belong to the domain itself — how information typically reaches these
users, the terms they use, the limits they work within — do belong here, sourced.

## Review with the designer — before saving
A long domain study approved with one "yes" is a rubber stamp. Instead:
1. Confirm the domain in one line (see above).
2. Go **section by section**: for each, give the key findings, each marked researched (with
   its source) or `Inferred —`, and ask "Anything wrong or missing here?". The designer may
   skip a section; record that it was skipped.
3. Finally ask "What do you know about this domain that I haven't found?" — local practice,
   regulations, how people really work. Their answers go in, tagged `[designer]`.
4. Save `domain.md` only after the walk-through and an explicit yes. Set `reviewed: <date>`
   and `reviewed_sections` in the frontmatter.

## Output
`uxos/domain.md` from `${CLAUDE_PLUGIN_ROOT}/templates/domain.md`, only after the review above. Set `depth` in frontmatter. Every "needs
verification" line is also appended to `uxos/open-questions.md`.
