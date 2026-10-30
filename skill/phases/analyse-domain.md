---
name: analyse-domain
description: Produce a research-backed analysis of the domain a product sits in (or will sit in, for greenfield) — overview, processes, org structure, roles, terminology, current challenges, regulatory context, baseline metrics. Depth scales with how much the designer already knows. The primary evidence source for greenfield, where there's no product to observe instead. Writes uxos/domain.md.
---

# analyse-domain

Goal: give the co-pilot and the designer a shared, evidence-backed understanding of the
**domain**, so later analysis is not naive. This is domain-general — the specific product
teardown happens in `study-product` (brownfield) or `problem-validation` (greenfield).

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

## Cover, per `templates/domain.md`
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

## Output
`uxos/domain.md` from `templates/domain.md`. Set `depth` in frontmatter. Every "needs
verification" line is also appended to `uxos/open-questions.md`.
