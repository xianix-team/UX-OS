---
name: study-product
description: Understand the specific product from the context-extractor's report — what it is, its scope and boundaries, its rules and constraints, and the list of its journeys BY NAME (no flow steps yet). Brownfield only -- greenfield has no product to study; init skips straight to capture-users. Writes uxos/product-context.md and returns a named journey list.
---

# study-product

**Brownfield only.** There's nothing to study on a greenfield project yet — `/uxos:init`
skips this entirely and writes a minimal `product-context.md` from the designer's own
description instead.

Goal: turn the raw extract into an understanding of **this product** — enough to decide what
the key journeys are. Flow steps come later (`map-journey-steps`); the feature map comes
later (`build-blueprint`).

Works from whatever the `context-extractor` produced — a web crawl, a native-app code read,
a simulator/emulator walk, or a screenshot inventory. Record the **platform** and which
sources backed the understanding in the `product-context.md` frontmatter (`source:`).

## Method
1. **What it is** — 2–4 sentences: the product's job, operator, channel, tech partner.
2. **Scope** — what this product covers, and explicitly what lives in *other* systems or
   channels (a hand-off to another domain, an offline counter step, a separate app). Seams
   in the experience matter.
3. **Object / mode types** — if the product has parallel modes (e.g. passenger types, plan
   tiers) or object variants, table them: `type | basis | commit/lifecycle semantics`.
4. **Rules & constraints** — write product rules to `business-rules.md` (one `BR-<n>` per
   rule, grouped by object, with evidence and `state: existing`); keep only top-level
   constraints in product-context. Hard facts: limits, mandatory fields, cut-offs, refund/penalty
   slabs, auth requirements. Take these from policy text and code, not guesses. When a repo
   was read, this should include **business rules with no UI trace** — service-layer
   eligibility checks, status-transition rules, pricing/fee calculations, scheduled jobs
   enforcing a cutoff — not just form validation. Cite each rule's source (policy text vs.
   `[from <file>]`); a rule found only in code and never surfaced in the product is itself
   worth a line in `open-questions.md` — the designer may want it surfaced to the user.
5. **Structural facts** — framework, form structure, list sizes, parallel field sets — from
   the extract.
6. **Journeys, by name only** — enumerate every journey the product supports (id + name +
   whether auth is required + one-line intent). Include offline/hybrid journeys
   (cancellation at a counter, physical confirmation). Do NOT write flow steps.

## Output
- `uxos/product-context.md` from the template.
- `uxos/business-rules.md` in the exact shape of `templates/business-rules.md` (sections
  per object, all six columns) — if the project already
  has one, add to it; never renumber existing `BR` ids.
- Return the named journey list to the caller (used by `/uxos:journeys`).
- Append every unresolved question to `uxos/open-questions.md`.

## Honesty
If key journeys sit behind an auth wall, say so — the model will lean on assumptions for
those until test access is available.
