---
artifact: design-direction
project: <slug>
status: draft
---

# Design Direction — <product name>

Decided before any screen work begins. Feeds `patterns.md` §6 (canonical patterns) directly
— greenfield has no existing product to reverse-engineer patterns from.

## 0. Already fixed
<logo, mandated brand colours, an existing company design system elsewhere to align with, a
mandated accessibility level — whatever the client already brought. Not open to re-decide.>

## 1. Design philosophy
**Chosen:** <e.g. Enterprise & trustworthy>
**Why:** <tied to domain + persona context>
**Considered:** <other options weighed, and why they lost>

## 2. Colour
- Primary: <hex / name>
- Semantic (success / warning / danger / info): <...>
- Neutral ramp: <...>
- Dark mode: <required / optional / not needed>

## 3. Typography
- Stack: <system font stack / a named webfont> — <reasoning, tied to platform>
- Type-scale philosophy: <e.g. compact & data-dense / generous & reading-focused>

## 4. Spacing & density
<compact/dense vs spacious/breathable — tied to persona context: device, environment, tech
comfort>

## 5. Accessibility baseline
**Target:** <WCAG level>

## 6. Iconography & imagery
<line vs filled icons; illustration style; photography use>

## 7. Platform convention stance
<per platform: follow native conventions (HIG / Material) vs a custom-branded override>

## 8. Implementation stack
<only if screens will be built as code — otherwise mark "not needed (Figma/prompt only)".>
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
