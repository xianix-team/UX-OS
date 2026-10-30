---
artifact: handoff
project: <slug>
journey: J<n> — <journey name>
target: <figma | code | claude-design>
status: draft
figma_file: <link — figma target only>
branch: <branch name — code target only>
claude_design_url: <canvas or design-system link — claude-design target only>
# design-system.md only:
design_master: <claude-design | code — copied from product-context.md>
mirrored_commit: <code commit Claude Design last mirrored — design_master code only>
mirrored_at: <YYYY-MM-DD>
---

# Handoff Record — J<n> <journey name>

## Figma file / repo
<Figma file link, or repo path + branch name>

## Screens / files

| Step | Screen or file | Status | Link |
|---|---|---|---|
| 1. <step> | <existing screen/file reused, or new one built> | referenced / built | <frame link, or file path> |
| 2. <step> | <...> | built | <...> |

## Library levels (design-system record only — omit for a journey handoff)
| Level | Built | Pending | Notes |
|---|---|---|---|
| 1a · Colour | | | |
| 1b · Typography | | | |
| 1c · Spacing / radius / elevation | | | |
| 2 · Atoms | | | |
| 3 · Molecules | | | |
| 4 · Organisms | | | |
| 5 · Templates | | | |

## Patterns used
<which `patterns.md` components/tokens were applied; any new pattern introduced and why>

## Prototype (code target only)
- **Run:** <command> → <route / URL>
- **State switcher:** <how to open it; states available per screen>
- **Fixtures:** <path> — shaped by units' Data tables
- **Rules:** <constants file> — `BR-<n>` ids it implements
- **Unit / AC markers:** `data-unit`, `data-ac` on <n> screens
- **Left for developers:** <APIs, auth, storage>

## Audit & overrides (code target only)
**Last audit:** <clean / N findings fixed>
| Finding | File | Designer's reason for overriding |
|---|---|---|

## Mirror & promotion log (design-system.md only)
| Date | Event | Detail |
|---|---|---|
| <YYYY-MM-DD> | promoted to code / /design-sync push verified / pull-back | <commit, mismatches, items routed> |

## Revision log (claude-design target)
| Date | Change | From (comment / designer) |
|---|---|---|

## Open items
<anything not yet built; for code, what's left for a developer to wire up (data, backend logic)>
