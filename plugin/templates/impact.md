---
artifact: impact
project: <slug>
date: <YYYY-MM-DD>
requested_by: <client / designer / stakeholder>
target_kind: <primitive-token | semantic-token | component-property | hardcoded | component>
target: <token name, component, or value>
decision: <pending | global | new-token | variant | override | dropped>
sources_read: <patterns | code | figma | claude-design — list what was actually read>
confidence: <full | partial — <which source was missing>>
---

# Change Impact — <one-line change, e.g. "Primary button colour darker">

## 1. Restate the change
- **As asked:** "<the client's words>"
- **Seen on:** <screen / journey step / link>
- **Requested value:** <new value, or `not given`>

## 2. Resolve the target
- **Kind:** <primitive token / semantic token / component property / hardcoded value / component>
- **Alias chain:** `<semantic>` → `<primitive>` → `<value>`
- **Source agreement:**
| Source | Name | Value | Notes |
|---|---|---|---|
| patterns.md | | | |
| code | | | `<file:line>` |
| Figma | | | |
| Claude Design | | | |
<source mismatches, or `none`>

## 3. Trace every use
| Level | Uses | Source | Examples |
|---|---|---|---|
| Tokens aliasing it | | | |
| Atoms | | | |
| Molecules | | | |
| Organisms | | | |
| Templates / screens | | | |
| Journeys (steps) | | | |
| Units | | | <unit ids; mark built ones> |
<`unknown — <source> not available` where a source wasn't read>

### Uses by role
| Role | Uses | Examples |
|---|---|---|
| <primary action> | | |
| <link> | | |

### Look-alikes — same value, no token (won't follow a token change)
| Where | Value | Evidence |
|---|---|---|
| | | `<file:line>` / <Figma node> |

## 4. Scope options
| Option | What changes | Blast radius | Fits when |
|---|---|---|---|
| **global** — change the token | | | |
| **new-token** — new semantic token | | | |
| **variant** — component variant | | | |
| **override** — one-off | | | breaks code-build-contract rule 1; becomes a PAT entry |

**Recommended:** <global | new-token | variant | override> — <one-line reason>

## 5. Safety checks
### Contrast
| Foreground | Background | Current ratio | New ratio | AA (text 4.5 / large & UI 3.0) |
|---|---|---|---|---|
### States & themes
- <hover / pressed / focus / disabled / selected — still distinct?>
- <dark mode or other themes, or `none`>
### Inconsistency register
- <PAT entries fixed / worsened / created, or `none`>
### Built units to re-test
- <unit id — screen — built sha, or `none`>

## 6. Decision & follow-up
- **Chosen:** <global | new-token | variant | override, or `pending`> — <one line: what moved, what stayed>
- **Applied through:** <code-library / figma-library / claude-design-library / patterns.md only>
- **Look-alikes re-bound:** <list, or `not in scope`>
- **Open questions raised:** <list, or `none`>
