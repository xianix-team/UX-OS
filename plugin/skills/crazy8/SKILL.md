---
name: crazy8
description: When a screen isn't working, generate eight genuinely different directions for it — the design-sprint Crazy 8s. The designer chooses each time between a workshop (people sketch, uxos captures and organises) and AI (uxos draws eight screens, each varying a different dimension). All eight are rough grey-box wireframes on one page; the designer picks one or combines parts, and only after that choice is confirmed does anything reach the model — never the design system directly.
---

# crazy8

Goal: get past the first obvious idea for a screen that isn't working. Eight directions
that differ in kind, not in polish, judged side by side, with one chosen on purpose — and
nothing written to the model, let alone the design system, until it is.

**Optional.** Run it when the designer isn't happy with a screen — after a canvas review,
a parity or validation finding, or just a feeling. It never blocks anything.

**Template is the contract.** Read `${CLAUDE_PLUGIN_ROOT}/templates/crazy8.md` before writing, and keep its
frontmatter keys and headings exactly. If the template can't be read, stop and say so.

## 1. Frame — confirm before any sketching
From the model, write a one-screen brief:
- **What the screen is for** — its primary action, from `screen-specs/<journey>.md`.
- **Who it's for** — the persona and the to-be-solved item it serves.
- **What must hold** — the `BR-<n>` rules and the states the screen must show.
- **What isn't working** — from the design record's comments, revision log, parity
  findings, validation findings, or the designer's own words. If nothing is recorded, ask.
- **The question** — one "How might we…?" the eight directions answer.

Show the brief and stop for confirmation. A sharp question is most of the value.

## 2. Choose the mode — every time
Ask: **workshop** or **AI**?

### Workshop — people sketch, uxos captures
1. Give the brief, the question, and the rules of the exercise: eight panels, one idea
   each, about a minute per panel, rough on purpose, no polishing.
2. **Stay out of it while they sketch.** Don't show uxos's own ideas first — whoever sees
   them anchors on them.
3. When they're done, the designer uploads photos of the sketches or describes them. Ask
   before copying photos into `uxos/`: sketches can carry names or notes. Read each one with
   the Read tool and turn it into a card — the idea in one line, the key move, what it would
   change. Never invent a sketch nobody drew; if a photo is unreadable, ask.
4. Group near-duplicates and say so ("three of you went for a comparison strip").
5. Offer uxos's own eight **only now**, as an option, labelled AI-generated.

### AI — uxos draws eight screens
Eight directions, **each varying a different dimension**, so they differ in kind:

| # | Varies | The question it asks |
|---|---|---|
| 1 | Layout | list, grid, map, table, split? |
| 2 | Interaction model | one screen, a wizard, conversational, direct manipulation? |
| 3 | Priority | content first or action first? |
| 4 | Disclosure | everything at once, or revealed step by step? |
| 5 | Entry point | what if the user arrived from somewhere else? |
| 6 | Metaphor | what is this screen *like* — a checklist, a cart, a conversation? |
| 7 | Density | compact or spacious? |
| 8 | A rule broken on purpose | what if one constraint didn't exist? — labelled as such |

Eight variations of one layout don't count. Each direction gets a name, a one-line idea,
and what it trades away. Label the set **AI-generated**: it's a provocation for the
designer, not a design decision.

## 3. Show them — rough on purpose
All directions — the workshop cards and/or the AI eight — go on **one page**,
`uxos/crazy8/<date>-<journey>-<screen>/sketches.html`: one panel each, numbered, with the
direction's name and one line. The brief and directions are recorded beside it in
`session.md`, from the template.
- **Grey boxes only.** Greys, plain lines, plain system type, placeholder text. No colours,
  tokens, components, or styles from the design system, so people judge the idea, not the
  polish. This is what keeps the exercise from touching the design system.
- Copy comes from the model (screen and step names, the BR values) or is plainly neutral.
- Open the page in the browser for the designer. On a Claude Design project a canvas may be
  used instead, as long as it stays grey-box.

## 4. Choose — the designer decides
No voting. The designer picks **one direction**, or **combines parts** of several ("#3's
comparison strip with #6's confirm step"). Restate the choice in one paragraph — what the
screen now does and how it's arranged — and draw it as a ninth grey-box panel. **Stop for
explicit confirmation.** Until then nothing is written except the session folder.

## 5. After the choice is confirmed — and only then
Show each change before writing it:
1. **Screen spec** — rewrite the screen's **Composition** block (shell, sections and their
   arrangement, element kinds) to the chosen direction, and any entry points, controls, or
   states the choice changed.
2. **Journey** — only if the flow changed (a step added, removed, or reordered).
3. **Design record** — a row in its Crazy 8 sessions table, linking the session. The session
   file (`session.md` from the template, beside `sketches.html`) keeps the brief, every
   direction, the choice and why — the ones not chosen stay there, so the reasoning isn't
   lost.
4. Then the screen goes through `design-handoff` as usual. Only there, building the chosen
   screen, are components and tokens added to the design system — under its normal rules.

## Never
Write anything to the design system, `patterns.md`, a screen spec, a journey, or code before
the choice is confirmed; draw the directions in design-system style; show uxos's ideas
before a workshop has sketched; invent a sketch nobody made; or present eight variations of
one idea as eight directions.
