---
name: design-parity
description: Compare a built screen against the approved artboard it was built from, mechanically and in four dimensions (inventory, geometry, semantics, content), and classify every difference — translation error, rule-driven, capability, or taste — so the right ones reach the designer. Called by promote-to-code, design-handoff (code path) and design-mirror.
---

# design-parity

Goal: the code does not silently differ from an approved design, and the differences it
does carry were each decided by someone rather than by nobody.

## Prerequisite — render both, remember neither
Run `artboard-preflight` first; do not start from a remembered design.

Serve the artboard as a file and open it beside the running prototype, both at the same
widths: the design width, and the narrow artboard's width if one exists. For a Claude
Design canvas, Artifact `read` with a `path` saves the artboard locally; serve that folder
and open it in the browser next to the prototype. A check performed against a memory of
the design is not a check, and a screenshot of a section just edited is not evidence about
the page.

## Method

1. **Shell before sections.** On both: the content column's x and width, the header and any
   sticky element's height, the page width against the viewport. A section check on an
   unverified shell is wasted. **Measure a section heading, never the header.**

2. **Every artboard of the journey, not one.** Artboards drawn at different times disagree.
   That disagreement is a finding to report, not a tie to break silently.

3. **Four dimensions, each mechanical.** A dimension not reported was not checked, and "no
   differences" is valid only when all four are reported.

   | Dimension | Compared |
   |---|---|
   | **Inventory** | headings (level, order, text), links, controls, states, nav items |
   | **Geometry** | content x and width per section; column structure; node positions |
   | **Semantics** | element kinds — is a gate a distinct shape, is a navigating control an anchor |
   | **Content** | text verbatim wherever the design quotes something (the Composition block's Verbatim list) |

   Measure in the browser (element bounding boxes, computed styles, the accessibility
   tree), not by eye from screenshots.

4. **Classify every difference; the class decides who decides.**

   | Class | What it is | Who decides |
   |---|---|---|
   | **translation error** | the code failed to reproduce what the artboard specifies | fix it — nobody is asked |
   | **rule-driven** | a uxos rule or a `BR-<n>` forbids what the artboard does | deviate, record with the rule id |
   | **capability** | the artboard cannot express it — reflow, focus, scroll, no-JS | deviate, record what it costs |
   | **taste** | the code is better and no rule says so | **revert, or ask. Never ship unasked** |

   Apply `code-build-contract`'s deviation budget: inventory, arrangement and element kind
   are zero-tolerance whatever the class.

5. **Output a table into the journey's handoff** — the **Design parity** section of
   `uxos/handoff/<journey-id>.md` (`${CLAUDE_PLUGIN_ROOT}/templates/handoff.md`): each difference, its
   dimension, its class, its resolution, plus the shell numbers and the preflight outcome.
   The table is the artefact; a sentence saying parity passed is not.

6. **Fix in the component or template layer**, never on the screen — `code-build-contract`
   rules 2 and 5 hold inside a parity fix. After fixing, re-measure the whole page, not
   only the section changed: a shell fix moves everything.

Then run `next-steps`.

## Never
Report parity from a heading diff alone; check only the sections you edited; measure one
artboard and conclude about the others; ship a taste deviation without asking; or write a
claim about an artboard you did not read in this pass.
