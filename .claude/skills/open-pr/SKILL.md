---
name: open-pr
description: Open a GitHub PR for the current branch following Yoleo's PR conventions (template, title format, assignee, labels). Use whenever changes are ready to be submitted for review.
---

# Open PR

Open a pull request for the current branch following the project's conventions.

## Steps

1. Make sure all intended changes are committed and the branch is pushed to `origin`.
2. Verify the work before opening the PR: run the build and (once available) tests and linter. Mention the verification performed in the PR body.
3. Open the PR with `gh pr create` against `main` (the default branch — not `master`).
4. Assign the PR to `AlbertoHdezCerezo` for review (`--assignee AlbertoHdezCerezo`).

## PR title

Use Conventional Commits format, matching the style of the issues:

- `chore: …` for project setup, tooling, dependencies
- `feat: …` for new functionality
- `fix: …` for bug fixes
- `docs: …`, `refactor: …`, `test: …` as appropriate

Keep it short and imperative, e.g. `chore: setup TailwindCSS`.

## PR body

Always fill in the repository template (`.github/PULL_REQUEST_TEMPLATE.md`):

```markdown
## What
<What is the change the PR introduces about>

## Why
<Why do we need to introduce this change>

## How
<Summarized insight on changes introduced to achieve goal>
```

Guidelines per section:

- **What** — one or two sentences stating the change at a glance.
- **Why** — the motivation: the issue being addressed, the problem solved, or the foundation being laid. Reference the issue here (`Part of #N` when the PR covers a slice of an issue, `Closes #N` when it completes it).
- **How** — a summarized insight into the approach: key files added or changed, notable decisions and trade-offs. A short bullet list is fine; do not paste diffs.

Add anything the reviewer must decide or be warned about (deviations from the issue, follow-ups, open questions) at the end of the body under a `## Notes` heading.

## Labels

- Add `project-setup` for setup/tooling PRs (matches the issue label).
- Do **not** add the `run-ci` label when creating the PR — CI runs are triggered manually by the reviewer by adding that label.

## Scope

Keep PRs small and single-topic: one concern per PR, split large issues into a sequence of PRs. Open PRs one at a time and wait for review before starting the next, unless told otherwise.
