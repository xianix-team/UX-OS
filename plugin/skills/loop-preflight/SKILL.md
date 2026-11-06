---
name: loop-preflight
description: Before a round of visual feedback on a running build, and whenever the designer says they can't see a change, check that they are actually looking at the current build — server process, page freshness, same origin. A dead feedback loop looks exactly like a change that was never made. Shared by design-handoff and design-parity.
---

# loop-preflight

Goal: the designer and the agent are looking at the same build. `browser-preflight` asks
whether there is a browser; `artboard-preflight` asks whether the design can be rendered;
this asks whether the change reached the designer's screen.

The symptom is silence. From the designer's side a dead loop looks like a change that was
never made; from the agent's side it looks like a designer who hasn't reloaded.

## When this runs
Before any round of visual feedback on a running build, and again whenever the designer
reports not seeing a change. Not otherwise.

## Check
1. **Is the server the current process?** Compare the running server's start time with the
   last change. A server started before the change, with no working hot reload, cannot be
   serving it.
2. **Is the designer's page newer than the change?** The agent cannot see the designer's
   tab, and its own browser proves nothing about theirs — so ask. The designer reads the
   **build stamp** from the prototype's state switcher (`design-handoff`, code path), and
   both compare it with the last change. Without a stamp, ask them to reload and say what
   they see.
3. **Is it the same origin?** Ask for the URL in their address bar and compare it with the
   server's actual port. A configured port taken at startup moves the server silently and
   leaves an old tab pointed at nothing.

## Outcomes
- **All three hold** → the designer is seeing the current build. If they still say the
  change isn't there, take that as a finding about the change: it may be present but not
  perceivable.
- **Any one fails** → say which, fix the loop (restart the server, give the correct URL,
  ask for a reload), and only then ask for feedback.

## Never
Answer "I can't see it" with "it is in the DOM" — that answers a question they did not ask.
Present and perceivable are different claims, and so are present and delivered. Check the
loop before defending the change.
