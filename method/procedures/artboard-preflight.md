---
name: artboard-preflight
description: Before any code-path screen build or parity check, confirm the artboard is actually rendered and readable in this session. If it is not, say so and either stop or proceed in a clearly-labelled reduced mode. Shared by design-handoff, promote-to-code and design-parity.
---

# artboard-preflight

Building a screen from a *memory* of its design is the default failure, and it is silent:
the result looks deliberate and reads as finished. This makes it something that has to be
declared. Same role as `browser-preflight`: a step that needs something doesn't proceed
silently without it.

## Check
1. Does the journey's handoff record a `claude_design_url` (or a Figma file)?
2. Can this session actually open it — Artifact `read` for a canvas, the Figma connector
   for Figma? A deferred tool counts only once loaded (ToolSearch).
3. Can it be **rendered**, not just read as markup? For a Claude Design canvas, write the
   artboard to a local file and serve it, so it can be measured beside the prototype.

## Outcomes
- **All three** → say which artboard, at which revision, and continue.
- **Readable but not renderable** → continue, and say plainly that differences in geometry
  cannot be measured this pass, only differences in markup.
- **Not reachable** → **stop and tell the designer.** If they ask you to go on anyway,
  continue in reduced mode and label the result: *built without seeing the design.* That
  label goes in the handoff record (Design parity → Preflight), not only in the reply.

Record the outcome in the handoff's **Design parity** section either way.

## Never
Infer an artboard's contents from the model, from a previous session, or from a
screenshot taken earlier in this one, and present the result as a build from the design.
