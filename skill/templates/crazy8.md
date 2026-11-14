---
artifact: crazy8
project: <slug>
journey: J<n> — <journey name>
screen: <screen name>
mode: <workshop | ai | workshop + ai>
sketches: uxos/crazy8/<date>-<journey>-<screen>/sketches.html
status: <exploring | chosen | applied>
---

# Crazy 8 — J<n> <screen>

## 1. Brief
- **What the screen is for:** <primary action, from the screen spec>
- **Who it's for:** <persona> — <to-be-solved item>
- **What must hold:** <`BR-<n>` rules; states the screen must show>
- **What isn't working:** <from comments, parity, validation, or the designer — with source>

**How might we** <question>?

## 2. Directions
| # | Name | Source | The idea | What it trades away |
|---|---|---|---|---|
| 1 | <name> | <workshop: P1's sketch / ai: layout> | <one line> | <cost> |

**Grouped:** <near-duplicates from a workshop, or none>

## 3. Choice
**Chosen:** <direction #, or a combination: "#3's … with #6's …">
**Why:** <the designer's reason>
**Confirmed:** <date — nothing below is applied before this>

## 4. Applied
| Where | Change |
|---|---|
| `screen-specs/<journey>.md` | <Composition and anything else changed> |
| `journeys/<journey>.md` | <only if the flow changed — otherwise none> |
| `design-records/<journey>.md` | session linked |

Next: `design-handoff` builds the chosen screen; new components join the design system there,
under its normal rules.
