# Project Assessment Template

An AI-assisted toolkit for systematically evaluating front-end projects against an 86-item best-practices checklist. An agent reads a project placed in `input/`, fills in the checklist, and writes the results to `output/`.

## Repository Layout

```
project-assessment-template/
├── input/                    ← place the project under assessment here
├── output/                   ← assessment results are written here
├── supplementary/
│   └── working_version.csv   ← master checklist template (86 items)
├── CLAUDE.md                 ← agent instructions
└── .claude/                  ← agent configuration (symlinked as .cursor/)
    ├── commands/
    │   └── assessment.md     ← registers the /assessment slash command
    └── skills/
        ├── assessment/               ← main assessment workflow
        └── update-assessment-dashboard/   ← syncs results to a remote API
```

### `input/`

Drop the source code of the project you want to assess into this folder, typically as a sub-folder named after the project (e.g. `input/my-app/`). The template ships with this folder empty — its contents are dynamic and provided per engagement.

### `output/`

The agent writes the filled-in checklist and the summary report here, in a sub-folder matching the project name (e.g. `output/my-app/`). The template ships with this folder empty — it is populated by each assessment run.

## How to Run an Assessment

1. Copy the project source into `input/<project-name>/`.
2. Run the `/assessment` slash command (or invoke the `assessment` skill directly).
3. The agent will:
   - Copy `supplementary/working_version.csv` → `output/<project-name>/`
   - Review the project line by line
   - Fill in `is implemented` (`yes` / `no` / `partial` / `n/a`) and add `notes` where needed
   - Write a summary report to `output/<project-name>/`
4. The project assessment dashboard is https://assessments.geniusee.com/assessments. Open that page to copy the Bearer token and the assessment id.

## Checklist Structure

`supplementary/working_version.csv` contains 86 items across 14 areas: Communication, Jira set-up, Repository structure, CI/CD, Quality & tooling, IDE Setup, Code design, UI kit, Technology stack, Security, State Management, Maintenance & Debugging, Tech debt, and Documentation.

| Column             | Description                                        |
| ------------------ | -------------------------------------------------- |
| `template_title`   | Always "Front-end"                                 |
| `area_title`       | Category of the check                              |
| `task_description` | Detailed explanation of what to evaluate           |
| `task_body`        | Short identifier / name of the check               |
| `is implemented`   | Filled by the agent: `yes`, `no`, `partial`, `n/a` |
| `notes`            | Required for `partial`; explains what is missing   |

## Dashboard Sync (optional)

After the CSV is filled, the `update-assessment-dashboard` skill generates a standalone TypeScript script (`update-notes.ts`, run via `npx tsx`) that pushes results to a remote API:

1. GETs the current state from the API
2. Matches each API task to the CSV via `templateTask.body` ↔ `task_body`
3. Maps `yes` → `"Done"`, `no` → `"Open"`, anything else → keeps the existing API value
4. Skips `note` and `implementationStatus` updates when the existing task is already `"Done"`
5. PATCHes the API with updated `note` and `implementationStatus` for the remaining tasks

When the skill asks, provide the assessment id and Bearer token. Ignore the sample assessment id and bearer token in the skill's curl examples.

## Notes

- `input/` and `output/` are intentionally empty in the template.
- `.cursor/` is a symlink to `.claude/` so Cursor and Claude Code share the same skills and commands.
- No build system or package manager is required; the generated `update-notes.ts` uses Node built-ins only.
