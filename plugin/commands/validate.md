---
description: Optional user validation before design — check the riskiest assumptions behind the to-be-solved list, and the personas if you choose, with real users. Plan mode writes the bets, what would prove each wrong, a screener and discussion guides; findings mode turns your session notes into evidence and proposes model updates. Never simulates users.
argument-hint: "[plan | findings] [study folder — for findings]"
---

Run user validation. Arguments: `$ARGUMENTS`.

## Steps

1. Read `uxos/to-be-solved.md`, `uxos/personas/`, `uxos/user-groups.md`, and on add-feature
   `uxos/feature-mapping/`. If `to-be-solved.md` doesn't exist, say this checks a scoped
   list and suggest `/uxos:to-be-solved` first.

2. **Pick the mode.** `plan` or `findings` if given. Otherwise: a study folder in
   `uxos/research/` with `plan.md` and no `findings.md` → ask "Have the sessions run? Bring
   in findings, or start a new plan?"; else `plan`.

3. Run the `user-validation` skill in that mode.
   - **plan:** frame (scope, items, groups, constraints) — **stop for confirmation** →
     bets ranked by risk, with a proposed shortlist — **stop for confirmation** → what would
     prove each wrong, and method → screener and guides by user group → present the whole
     plan → write `uxos/research/<date>-<slug>/plan.md`.
   - **findings:** take the designer's notes or transcripts, replace identifying details with
     participant codes first, code against the bets, rule on each, present the findings,
     write `findings.md`, then offer the model updates in order — personas, user groups,
     to-be-solved, elsewhere — applying only the ones accepted.

4. Before presenting a plan, check it — these are the failures to look for:
   - **Bets name a solution** ("want a split-pay feature", "calendar sync is worth
     building"). Restate each as the problem or behaviour.
   - **Guide questions that are hypothetical or pitch.** Any question with *would, could, if
     there was, imagine, how likely,* or *something that*, or one that describes a possible
     feature, is rewritten as a question about a real past event. No exceptions for the
     `would-change` bet: ask what they've already tried, paid for, or switched to.
   - **Yes/no or leading questions** ("Did you ever worry…") become "Tell me about…".
   - **Missing default bets:** each problem item needs `problem-real`, `frequency-severity`,
     and `workaround`. Add any that are missing.
   - **Criteria** say what people did, not what they say would help.

5. Never write or imply participant answers that didn't come from real sessions.

6. Run the `next-steps` skill and present its block.

Templates: `${CLAUDE_PLUGIN_ROOT}/templates/validation-plan.md`,
`${CLAUDE_PLUGIN_ROOT}/templates/validation-findings.md`.
