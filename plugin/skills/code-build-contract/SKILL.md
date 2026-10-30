---
name: code-build-contract
description: The rules for building screens or a design system as real code -- tokens only, styling lives in the component layer, screens only compose, atomic structure, accessibility at the atom -- plus the per-screen audit that enforces them. Framework-agnostic principles; the repo's own convention decides the mechanism. Read by code-library and by design-handoff's code path.
---

# code-build-contract

Rules that aren't checked get broken under deadline. This is the contract, and the audit
that makes it hold.

## The rules — principles, not one stack's syntax

1. **Every value resolves to a token.** No raw colours, font sizes, spacing, radii, shadows,
   or z-indexes outside the token definitions. Tokens come from `patterns.md` §6.1-6.3
   (greenfield: from `design-direction`).
2. **Styling lives in the component layer.** Screens/pages contain composition and content
   only — they arrange components and pass props. A screen never makes a styling decision.
3. **No static inline styling.** Not `style=`/`style={{}}`, not literal values in inline
   modifiers (SwiftUI `.padding(13)`, Compose `Modifier.padding(13.dp)`), not utility
   classes with arbitrary values (`bg-[#123456]`, `w-[13px]`).
   *The one exception:* a genuinely **dynamic** value (a progress bar's width, a computed
   position) is passed through a CSS custom property or prop — never hard-coded inline.
4. **Atomic structure, bottom-up.** Tokens → atoms → molecules → organisms → templates,
   each built only from the level beneath it, in the places the repo already keeps each
   level. A missing piece is added **at its own level** (an atom before the molecule that
   needs it), never inside a screen file.
   **Every component's level is visible.** If the repo has no per-level structure (one flat
   components file or folder): on greenfield, create one — a folder per level (`atoms/`,
   `molecules/`, `organisms/`, `templates/`) or the stack's equivalent; on brownfield, don't
   restructure — tag each new or changed component with its level in its doc comment
   (`@level atom`) and list it by level in `handoff/code-library.md`. A component whose
   level nobody can name is not finished.
5. **No component defined inside a screen file.** If it's reusable or styled, it belongs in
   the library.
6. **Accessibility lives at the atom.** Semantic elements (a `button`, not a clickable
   `div`), label associations, visible focus states (never `outline: none` without a
   replacement), alt text, sufficient contrast per the `design-direction` baseline. Fixed
   once at the atom, inherited everywhere.
7. **Reuse before create.** Check the library for an existing component first; a new one
   must be distinct from everything already there, not a near-duplicate.

**The repo's convention decides the mechanism.** CSS modules, Tailwind, styled-components,
SwiftUI modifiers, Compose themes, Flutter `ThemeData` — follow what's already there
(it's ground truth). Tailwind is fine *as the component layer's mechanism* with the theme as
the token source; it just isn't a license for screens to style things. On brownfield, apply
the contract to **new and changed** code — don't refactor screens that weren't part of this
journey.

8. **Prototype-only tooling** (the state switcher, dev panels) lives in its own clearly
   named prototype folder, uses tokens like everything else, and is never imported by a
   library component or shipped as product UI. It is not part of the design system.

## Prototype isolation (default; the designer may opt out)
- Work on a **new branch**, from a clean tree (ask before touching a dirty one).
- Put the prototype behind its own **route or flag**, clearly named and easy to remove, so it
  can't leak into the real product.
- Use **mock fixtures** — no backend calls, no data wiring. State plainly what's left for a
  developer to connect.

## The per-screen audit — run after every screen, before asking to confirm it
Scan only the files changed for this screen. Findings, with file and line:

| Check | What to look for |
|---|---|
| Static inline styling | `style=`, `style={{`, inline modifiers with literals |
| Raw colour literals | `#rgb[a]`, `rgb(`/`rgba(`/`hsl(`, `Color(red:`, `Color(0xFF…)` outside token files |
| Magic values | px/rem/em/dp/pt numbers outside token definitions (judge: `0`, `100%`, and 1px hairlines are usually fine) |
| Arbitrary utilities | `[#…]`, `[13px]`-style values in utility classes |
| Styling in screens | styling decisions (classes, modifiers) in page/screen files beyond composition |
| Component in a screen | a component declared in a screen file rather than the library |
| Bypassed library | importing a raw UI-kit element directly where the repo has a wrapper |
| Near-duplicate | a new component overlapping an existing one in name or shape |
| Level unknown | a new or changed component with no atomic level (no level folder, no `@level` tag), or one composed from a level above it (an atom using a molecule) |
| Dev tooling leak | prototype-only code (state switcher, fixtures) imported by a library component or a non-prototype route |
| Atom-level a11y | non-semantic clickable elements, `outline: none` with no replacement, unlabeled inputs, missing alt |

**Blocking by default.** Report the findings and fix them *before* asking the designer to
confirm the screen. If the designer wants to override a finding, record it — finding, file,
their reason — under **Overrides** in the handoff record. Never override on your own, and
never report a screen as clean without having actually run the scan.

**Be honest about what this can't do.** It catches mechanical violations. It cannot judge
visual fidelity, whether a token choice is *appropriate*, or interaction quality. Pair it
with actually looking at the screen.

## Skills worth using alongside
- **`figma-design-to-code`** — mandatory whenever a Figma file exists for the journey: build
  from the Figma frames, not from memory.
- **Figma Code Connect** (`figma-code-connect`) — optional; maps the Figma library's
  components to their code counterparts so the two stay in step. Needs the Figma connector.
- **`run`** — launch the prototype and look at it; the audit doesn't replace this.
- **`code-review` / `simplify`** — a final pass over the changed code for reuse and
  duplication.
