---
artifact: design-direction
project: <slug>
project_type: <greenfield | revamp>
answered_by: <designer | non-designer | workshop>
needs_designer_review: <true if no designer was involved — otherwise false>
style_tiles: uxos/design-direction/style-tiles.html
status: draft
---

# Design Direction — <product name>

Decided before any screen work begins. Feeds `patterns.md` §6 (canonical patterns) directly
— greenfield has no existing product to reverse-engineer patterns from, and a revamp is
leaving the one it has. Each decision says who made it: `client`, `designer`, or
`derived — <reason>`.

## In plain words
<the one-page summary to share after a workshop: how the product should look and feel, the
main choices, and why — in the client's terms, no design jargon>

## Mood board
<!-- Only if references were shared; otherwise `none`. -->
| Reference | Source | What they like about it | Qualities taken | Not taken |
|---|---|---|---|---|
| <name> | <file in uxos/sources/moodboard/ or url, with date> | <their words> | `[from reference: …]` <colour / type / density / shape / imagery> | <what's deliberately left out — e.g. their logo, exact palette> |

**Agreements:** <qualities most references share>
**Conflicts resolved:** <where they disagreed, and what was chosen>

## Keep, change, drop (revamp only)
<!-- Omit on greenfield. -->
| As-is (from patterns.md) | Keep / change / drop | Why |
|---|---|---|

## 0. Already fixed
<logo, mandated brand colours, an existing company design system elsewhere to align with, a
mandated accessibility level — whatever the client already brought. Not open to re-decide.>

## 1. Design philosophy
**Chosen:** <e.g. Enterprise & trustworthy> · **Decided by:** <client / designer / derived — reason>
**In their words:** <three words it should feel like; three it must never feel like>
**Why:** <tied to domain + persona context>
**Considered:** <other options weighed, and why they lost>

## 2. Colour
- Primary: <hex / name>
- Semantic (success / warning / danger / info): <...>
- Neutral ramp: <...>
- Dark mode: <required / optional / not needed>
- **Decided by:** <client / designer / derived — reason>

## 3. Typography
- Stack: <system font stack / a named webfont> — <reasoning, tied to platform>
- Type-scale philosophy: <e.g. compact & data-dense / generous & reading-focused>
- **Decided by:** <client / designer / derived — reason>

## 4. Spacing & density
<compact/dense vs spacious/breathable — tied to persona context: device, environment, tech
comfort>
**Decided by:** <client / designer / derived — reason>

## 5. Accessibility baseline
**Target:** <WCAG level>
**Decided by:** <client / designer / derived — reason; any legal or contractual requirement>
**Region boundary minimum:** <contrast ratio for cards, frames, bands, panels against their ground — decided by looking; controls and inputs stay at 3:1>

## 6. Iconography & imagery
<line vs filled icons; illustration style; photography use>
**Decided by:** <client / designer / derived — reason>

## 7. Platform convention stance
<per platform: follow native conventions (HIG / Material) vs a custom-branded override>
**Decided by:** <client / designer / derived — reason>

## 8. Implementation stack
<only if screens will be built as code — otherwise mark "not needed (Figma/prompt only)".
If no designer or developer answered: `needs decision — ask the development team`.>
- Framework / language: <...>
- Styling mechanism: <CSS modules / Tailwind / styled-components / SwiftUI / Compose / ...>
- Token format: <CSS variables / theme file / ...>
- Component documentation: <Storybook / none / ...>
- Why: <tied to platform, the team's existing skills, and the design philosophy>

## Downstream
Feeds `patterns.md` §6.1-6.3 (the foundations: colour, then typography, then spacing/radius/
elevation) directly; the atoms, molecules, organisms, and templates above them are then
proposed from this direction. `figma-library` builds the design system from that, bottom-up.
`design-handoff`'s code/prompt paths follow it for any new screen.
