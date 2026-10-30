---
name: design-direction
description: Elicit the visual design direction before any greenfield screen work -- design philosophy, colour, typography, spacing/density, accessibility baseline, iconography, platform convention stance -- question-based, grounded in domain and persona context, confirmed stage by stage. Feeds pattern-study's canonical patterns directly. Greenfield only; brownfield already has an as-is to extract from instead.
---

# design-direction

Goal: a greenfield product has no existing UI to reverse-engineer patterns from. Rather than
deciding visual direction ad hoc as screens get built, decide it deliberately, once, up
front — grounded in who the product is for and what domain it sits in, not in a vacuum.

## Prerequisite
`domain.md` and confirmed `user-groups.md`/`personas/*.md` should exist — design philosophy
and density decisions are grounded in them, not invented independently.

## Stage-gated — one decision at a time, like `new-feature-mapping`
At each stage, present numbered options with one **recommended**, tied to domain/persona
context, and stop for the designer's confirmation or a different pick before continuing.
Don't run straight through.

### Stage 0 — Already fixed
Ask first: does the client already have a logo, mandated brand colours, an existing company
design system elsewhere to align with, or a mandated accessibility level? Capture these as
fixed — don't re-decide what's already decided.

### Stage 1 — Design philosophy
Propose 3-4 candidates (e.g. Enterprise & trustworthy / Warm & approachable / Bold &
energetic / Minimal & functional), each with a one-line reason tied to the domain and
personas (a field-ops tool and a consumer lifestyle app shouldn't look the same). Mark a
recommendation. Confirm.

### Stage 2 — Colour
Given the philosophy, propose a primary colour direction, a semantic set (success/warning/
danger/info), a neutral ramp, and ask whether dark mode is required. Confirm.

### Stage 3 — Typography
Propose system font stack vs a distinctive webfont — tie the recommendation to platform
(iOS leans toward an SF-Pro-like stack, Android toward Material/Roboto-like, web is open)
— and a type-scale philosophy (compact/data-dense vs generous/reading-focused). Confirm.

### Stage 4 — Spacing & density
Propose compact/dense vs spacious/breathable, grounded in persona context: device, physical
environment (e.g. outdoor field use needs larger touch targets than a desk-bound tool),
tech comfort. Confirm.

### Stage 5 — Accessibility baseline
Propose a WCAG target (AA is a reasonable default) — ask explicitly rather than assuming it
doesn't matter. Confirm.

### Stage 6 — Iconography & imagery
Propose line vs filled icon style, and whether illustration or photography fits the
philosophy. Confirm.

### Stage 7 — Platform convention stance
Per platform: follow native conventions (HIG / Material) vs a custom-branded override.
Confirm.

### Stage 8 — Implementation stack
Ask first whether screens will be built as a **code prototype** at all — if the work is
Figma- or prompt-only, record "not needed" and skip the rest. Otherwise propose the
framework/language, the styling mechanism, the token format (CSS variables, a theme file),
and whether to document components (Storybook or none), with a recommendation tied to the
platform and the team's existing skills. This is the designer's decision — never assume a
stack. It is what `code-library` builds on. Confirm.

## Output
`uxos/design-direction.md` from `{{TEMPLATES}}/design-direction.md`, only after stage 8 is
confirmed. This is what `pattern-study` consumes directly for a greenfield project. Then run
`next-steps` — it should point at `pattern-study`.
