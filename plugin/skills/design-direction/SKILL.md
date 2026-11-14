---
name: design-direction
description: Elicit the visual design direction before any screen work on a greenfield product or a brownfield revamp -- design philosophy, colour, typography, spacing/density, accessibility baseline, iconography, platform convention stance, implementation stack. Works for designers and non-designers alike -- a mood board of the client's own references, style tiles that show each direction on the product's own components, plain-language choices, and a record of who decided what. Stage-gated, confirmed at each step.
---

# design-direction

Goal: a greenfield product has no existing UI to reverse-engineer patterns from, and a
revamp is deliberately leaving the one it has. Rather than deciding visual direction ad hoc
as screens get built, decide it deliberately, once, up front — grounded in who the product
is for and what domain it sits in, not in a vacuum.

**When it runs:** greenfield, and brownfield **revamp**. Brownfield improve and add-feature
keep the product's existing design language — `pattern-study` captures it, and this step
doesn't run.

## Prerequisite
`domain.md` and confirmed `user-groups.md`/`personas/*.md` should exist — design philosophy
and density decisions are grounded in them, not invented independently. **On greenfield,
the key journeys should have screen specs** (after the feature map and journeys): the look
and feel is chosen for screens that are known, and the style tiles use one of them. If
they don't exist yet, say so and suggest `/uxos:blueprint` → `/uxos:journey-design` →
`/uxos:screen-spec` first; proceed only if the designer insists. On a revamp, `patterns.md`
with its as-is extraction should exist too: it is the "before" picture.

## Stage-gated — one decision at a time, like `new-feature-mapping`
At each stage, present the options with one **recommended**, tied to domain/persona context,
and stop for confirmation or a different pick before continuing. Never more than three
options. Don't run straight through.

## Before stage 0 — who is answering?
Ask: **a designer**, **someone else** (a client, product owner, founder), or **a workshop**
(a designer running the session with a client). Record it as `answered_by`. If
`product-context.md` has a `user_role`, start from it ("You set this up as product owner —
is it you answering, or a workshop?") rather than asking from scratch.

For anyone who isn't a designer, **plain-language mode** applies to every stage:
- Ask about what they know — their product, their customers, what they like — never for
  design vocabulary. "Which feels more like your product?" not "Which design philosophy?".
- **Show, don't name.** Every visual choice is made on the style tiles, not on labels.
- **They decide what's theirs:** the feel, the brand, references, must-haves. The technical
  details — type scale, spacing, icon style, accessibility level — are **derived** from the
  personas and offered as recommendations with a one-line reason in their terms ("larger
  tap targets, because your users are on phones, often outdoors"). They can still
  disagree.
- Plain words, never condescending. No "this may be complicated for you".

Every decision records who made it: `client`, `designer`, or `derived — <reason>`. If no
designer was involved, set `needs_designer_review: true`: a designer who joins later can
then see what the client chose and what was inferred, and change the inferred parts without
reopening the client's choices.

## Revamp only — keep, change, drop
Before the stages, walk the as-is foundations and key components from `patterns.md` with
whoever is answering, and mark each **keep**, **change**, or **drop**, with the reason. Show
them as they are today (screenshots from the extraction, or the live product). Keeps are
fixed for the rest of this step, like stage 0; changes and drops are what the stages decide.

## Mood board — optional, offered to everyone
Ask whether they have references in mind: screenshots, images, or links to apps and sites
whose look they like (or dislike) — **including their own sketches or mockups of this idea,
however rough or AI-made**. People often don't think of those as "references", so ask about
them by name. Competitors from `competitors.md`, if it exists, can be
offered as a starting point.

1. **Read each one.** Images with the Read tool. Links in a browser after
   `browser-preflight`, or fetched as a page when no browser is available — say which, and
   that a fetched page shows content, not the visual design, so a screenshot is better.
2. **Ask what they like about each** — the colour, the calm, the photography, the type, how
   roomy it feels. Often it's one detail, not the whole look.
3. **Extract the visual qualities**, tagged `[from reference: <file or url>]`: colour
   (temperature, contrast, accent use), type (serif or sans, scale, weight), density, shape
   (corner radius, borders), imagery (photography, illustration, icons).
4. **Find the agreement and the conflicts** across references, and ask about the conflicts
   ("four use a lot of white space, but two are dark and three light — which way?").
5. These qualities feed every stage below and the style tiles.

**References are inspiration, not a spec.** Never copy a referenced brand's logo, artwork,
illustrations, or exact palette. If someone wants "exactly like <brand>", say plainly why
not and propose what to borrow instead — the spacing, the photography approach, the type
contrast.

**Storage.** Ask before copying reference images into `uxos/sources/moodboard/`: `uxos/` is
committed, and screenshots of other companies' products don't belong in a shared or public
repo. Either way, list every reference in `uxos/sources/INDEX.md` with its date, and in
the direction's Mood board section.

## Style tiles — how choices are shown
A style tile is the same small, real piece of this product — taken from a key screen in
`screen-specs/` (or, on a revamp, the to-be-solved scope) (a product card with its heading, image, key detail and main button) — drawn
in one direction's colour, type, spacing, shape and imagery. Show 2–3 tiles side by side.
- Write them as one HTML page, `uxos/design-direction/style-tiles.html`, every value a CSS
  custom property so the tiles double as draft tokens. Open it in the browser for the
  person answering; on a Claude Design project, a canvas may be used instead.
- **Every tile is a real candidate** you'd be glad to see chosen. Never draw a tile to show
  why something was rejected, and never draw one in a named brand's look — not even as a
  counter-example. "Exactly like <brand>" is answered in words, not with a look-alike tile.
- Never use a referenced brand's assets, palette, or type in a tile. Placeholder imagery is
  neutral.
- **Tile copy comes from the model** — screen and step names from the journeys, the
  to-be-solved scope — or is plainly neutral ("Item name", "Continue"). Never invent product
  claims or features in a tile.
- Ask this-or-that ("A or B — which feels more like your product?") and what they like and
  dislike about each; turn the answers into the decision and re-render the chosen tile.
- Publishing the page to share with colleagues is the designer's or client's call.

### Stage 0 — Already fixed
Ask first: does the client already have a logo, mandated brand colours, an existing company
design system elsewhere to align with, or a mandated accessibility level? Capture these as
fixed — don't re-decide what's already decided. On a revamp, the **keeps** are fixed too.

### Stage 1 — Design philosophy
Propose 2-3 directions, each with a one-line reason tied to the domain, personas, and mood
board (a field-ops tool and a consumer lifestyle app shouldn't look the same). Mark a
recommendation. **Plain-language mode:** ask for three words customers should feel using
it and three it must never feel like, then show the directions as style tiles and name the
philosophy only afterwards. Confirm.

### Stage 2 — Colour
Given the philosophy, propose a primary colour direction, a semantic set (success/warning/
danger/info), a neutral ramp, and ask whether dark mode is required. Plain-language mode:
choose on the tiles; ask about dark mode as "do your customers use it at night or in dark
places?". Confirm.

### Stage 3 — Typography
Propose system font stack vs a distinctive webfont — tie the recommendation to platform
(iOS leans toward an SF-Pro-like stack, Android toward Material/Roboto-like, web is open)
— and a type-scale philosophy (compact/data-dense vs generous/reading-focused).
Plain-language mode: choose the feel on the tiles; the scale is derived. Confirm.

### Stage 4 — Spacing & density
Propose compact/dense vs spacious/breathable, grounded in persona context: device, physical
environment (e.g. outdoor field use needs larger touch targets than a desk-bound tool),
tech comfort. Plain-language mode: derived, shown on the tiles. Confirm.

### Stage 5 — Accessibility baseline
Propose a WCAG target (AA is a reasonable default) — ask explicitly rather than assuming it
doesn't matter. Then ask for the **region boundary minimum**: how strongly a card, frame, or
band must stand out from its ground, decided by looking at rendered samples. Controls and
inputs stay at 3:1 whatever this says. Plain-language mode: AA by default, explained by its
effect ("older customers and screens in sunlight need stronger contrast"); ask only whether
there's a legal or contractual requirement; the region minimum is chosen by looking at the
tiles. Confirm.

### Stage 6 — Iconography & imagery
Propose line vs filled icon style, and whether illustration or photography fits the
philosophy. Plain-language mode: chosen on the tiles and the mood board. Confirm.

### Stage 7 — Platform convention stance
Per platform: follow native conventions (HIG / Material) vs a custom-branded override.
Plain-language mode: "should it feel like other apps on their phone, or distinctly yours?".
Confirm.

### Stage 8 — Implementation stack
Ask first whether screens will be built as a **code prototype** at all — if the work is
Figma- or prompt-only, record "not needed" and skip the rest. Otherwise propose the
framework/language, the styling mechanism, the token format (CSS variables, a theme file),
and whether to document components (Storybook or none), with a recommendation tied to the
platform and the team's existing skills. This is the designer's decision — never assume a
stack. **If no designer or developer is answering, don't ask a client to choose a
framework:** record it as `needs decision — ask the development team`. It is what
`code-library` builds on. Confirm.

## Output
`uxos/design-direction.md` from `${CLAUDE_PLUGIN_ROOT}/templates/design-direction.md`, only after stage 8 is
confirmed, with `uxos/design-direction/style-tiles.html` showing the chosen direction. Its
**In plain words** section is a one-page summary the designer can share after a workshop:
what was chosen and why, in the client's terms. This is what `pattern-study` consumes for
greenfield and revamp. Then run `next-steps` — it should point at `pattern-study`.

## Never
Ask a non-designer to choose between design terms they haven't been shown; offer more than
three directions; copy a referenced brand's logo, artwork, or exact palette; present a
derived decision as the client's choice; or ask a client to pick an implementation stack.
