# Testing the `uxos` plugin

The plugin runs in **Claude Code CLI** or the **VS Code / JetBrains Claude Code extension**.
It does **not** run in the Claude desktop app's "Code tab" (no plugin support there).

---

## 0. One-time: install the Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
claude --version        # should print a version
```

If `claude: command not found` after install, your npm global bin isn't on PATH:

```bash
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
claude --version
```

---

## 1. Make a throwaway project folder

The plugin writes a `uxos/` model into the current directory, so run it somewhere empty.

```bash
mkdir -p ~/uxos-test/run1
cd ~/uxos-test/run1
```

---

## 2. Start Claude Code

```bash
claude
```

Wait for the prompt (a bordered `>` input box). **Everything below is typed inside that
prompt, not in the shell.**

On first run it may ask to trust the `uxos-marketplace` — say yes. (It's already registered
in `~/.claude/settings.json`, pointing at the local repo at
`/Users/rasikam/Documents/Projects 2026/ux-os`.)

---

## 3. Confirm the plugin loaded

Inside the Claude Code prompt:

```
/help
```

You should see `/uxos:init`, `/uxos:journeys`, `/uxos:matrix`, `/uxos:patterns`,
`/uxos:problems`, `/uxos:to-be-solved`, `/uxos:status` in the command list.

**If they're missing**, install explicitly:

```
/plugin marketplace add /Users/rasikam/Documents/Projects 2026/ux-os
/plugin install uxos@uxos-marketplace
```

then re-check `/help`.

---

## 4. Run the workflow

```
/uxos:init https://app.example.com
```

It asks: project name · model location · platform (web) · inputs you have · domain
familiarity · test credentials. Answer them, then it crawls, drafts the model, and stops at
**gate G1** with a review block.

Review / fix, type `continue`, then walk the chain:

```
/uxos:journeys
/uxos:matrix J1
/uxos:patterns
/uxos:problems
/uxos:to-be-solved
/uxos:status
```

Each command ends with a ranked "Next" suggestion block. Output lands in
`~/uxos-test/run1/uxos/`.

---

## 5. Reset between runs

```bash
rm -rf ~/uxos-test/run1/uxos
```

Remove the plugin entirely (inside Claude Code):

```
/plugin uninstall uxos@uxos-marketplace
/plugin marketplace remove uxos-marketplace
```

---

## Someone else, on another machine

They need the CLI (step 0) and access to the repo. Either:

- **Public repo:** `gh repo edit xianix-team/ux-os --visibility public`, then they run
  `/plugin marketplace add xianix-team/ux-os` and `/plugin install uxos@uxos-marketplace`.
- **Private repo:** add them as a collaborator first (`gh repo add-collaborator
  xianix-team/ux-os <user>`); same two commands.
- **Team auto-enable:** commit `.claude/settings.json` (see [`team-settings.example.json`](team-settings.example.json))
  into a repo they open — the plugin is then offered automatically, no `/plugin` step.
