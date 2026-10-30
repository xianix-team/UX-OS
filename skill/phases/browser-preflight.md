---
name: browser-preflight
description: Before any step that needs a live browser (crawling a URL, extracting computed styles, walking a flow), check that a browser-capable tool actually exists in this session. If not, never fail silently or pretend — say what's missing, offer to guide setup with the designer's consent, or proceed in a clearly-labelled reduced mode. Shared by init, patterns, matrix, and journeys.
---

# browser-preflight

Goal: a live-URL run that silently can't browse is worse than one that stops and says so.
Check first, tell the designer plainly, and let them choose — never discover it halfway
through an extraction.

## When this runs
Before any step that needs a live page: `init` with a live URL (or competitor URLs on
greenfield), `patterns` on a live URL, `matrix`, `journeys` walking a live flow, `competitor-analysis`
deep dives. Skip it
entirely when the inputs are a repo, screenshots, Figma, or docs only.

## Check — what do you actually have?
In Claude Code, browser tools are often **deferred**: only their names are listed until
they are loaded with ToolSearch. A tool missing from the active list is **not** missing
from the session. Never report "no browser" from the active list alone — run these in
order and stop at the first that works:

1. **Claude in Chrome.** If any `mcp__claude-in-chrome__*` name is listed (loaded or
   deferred), load the core set in **one** ToolSearch call:
   `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__get_page_text`
   then call `tabs_context_mcp` to confirm the extension answers.
2. **Built-in browser pane.** Otherwise, if any `mcp__Claude_Browser__*` name is listed,
   load it the same way and confirm it can open a page.
3. **Keyword search.** If neither family is listed, run one ToolSearch for
   `browser navigate screenshot` — a browser server may still be connecting.

Only if all three fail is there no browser. When reporting that, say which steps you ran.

A **browser-capable** tool can navigate,
read the rendered page, screenshot, and run in-page script:
- the Claude desktop app's built-in browser pane
- **Claude in Chrome** (tools named `claude-in-chrome`) — drives the designer's own Chrome
- another browser tool the designer has already connected

A plain URL fetch (`WebFetch`) is **not** a browser. It returns static HTML only: no
rendered DOM for JavaScript apps, no computed styles, no screenshots, no clicking through
flows. Don't count it.

## If a browser tool exists
Say which one and proceed. On Claude in Chrome, tell the designer it will open tabs in
their own Chrome (sharing their logins) and will pause for them at any login page or
CAPTCHA — they drive those, the extraction stays read-only.

## If none exists — stop before extracting, and say so
Tell the designer plainly: *"I can't browse live pages in this session, so a URL input
would only get a static fetch — no computed styles, no screenshots, no flow walking."* Then
offer, in this order, and let them pick:

### 1. Set up Claude in Chrome (recommended)
What it needs — and check these *before* sending them down this path, since any one can
rule it out:
- Chrome, Edge, or another Chromium browser (Brave, Arc, Vivaldi, Opera). Safari and
  Firefox are not supported.
- The **Claude in Chrome** extension, version 1.0.36 or later, from the Chrome Web Store:
  <https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn>
- A direct Anthropic plan (Pro, Max, Team, or Enterprise), signed in with `/login`.
  Sessions authenticated by an API key or `claude setup-token` can't use it, and neither
  can access through Amazon Bedrock, Google Cloud, or Microsoft Foundry.
- Not supported inside WSL.

Steps for the designer:
1. Install the extension from the link above and make sure it's enabled.
2. Start the session with `claude --chrome`, or run `/chrome` inside a running session.
3. Confirm `/chrome` shows **Status: Enabled** and **Extension: Installed**.
4. The first time, Chrome may need a restart to pick up the connection. If it still isn't
   detected: `/chrome` → **Reconnect extension**.

Claude Code may also show its own prompt — *"Claude wants to use your browser"* — with an
**Install extension** option that opens the install page and walks through setup. If the
designer chose "Don't ask again" earlier, `/chrome` is the way back in.

**With the designer's explicit OK**, offer to open the install page for them (`open <url>` on
macOS, `xdg-open <url>` on Linux) — show the exact command first and wait for a yes.
Installing the extension itself is always theirs to do; never install anything, change
browser or Claude settings, or run any other command on their behalf.

Mention one trade-off if relevant: turning on **Enabled by default** in `/chrome` loads the
browser tools into every session and increases context use — `--chrome` per session avoids
that.

After setup, **re-check** — the tools may not appear until the session is restarted.

### 2. Proceed without a browser — reduced mode (only if they agree)
Use plain fetch and tag everything `[static-fetch]`. State up front what is lost:
JavaScript-rendered content, computed styles and design tokens (pattern-study foundations
will be approximate or empty), screenshots, flow walking (every journey step becomes
`*(inferred)*`), and anything behind a login. Record each lost area in `open-questions.md`.
Never present a static-fetch finding with the confidence of an observed one.

### 3. Switch the input
A code repo (the best structural signal anyway), screenshots or a screen recording, or a
Figma link — none of which need a browser.

## Per surface
- **Claude Code in a terminal or VS Code's integrated terminal** — needs option 1 (or a
  browser tool the designer already connected).
- **Claude desktop app, Code tab** — a built-in browser pane exists; nothing to install.
- **claude.ai chat (the skill)** — uses whatever web browsing/search that chat has. If it
  has none, ask the designer to enable it in settings or to paste/upload screenshots.

## Never
Retry in a loop; hide that you're in reduced mode; or report a browser-derived fact that
came from a static fetch.
