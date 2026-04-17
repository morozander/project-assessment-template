# Project Assessment Template

An AI-assisted toolkit for systematically evaluating front-end projects against an 86-item best-practices checklist. The agent reads a project placed in `input/`, fills in the checklist, and writes results to `output/`.

## Repository Layout

```
project-assessment-template/
├── input/                    ← place the project under assessment here (one sub-folder per project)
├── output/                   ← assessment results are written here (one sub-folder per project)
├── supplementary/
│   └── working_version.csv   ← master checklist template (86 items, do not edit directly)
└── .claude/                  ← AI agent configuration (symlinked as .cursor/)
    ├── commands/
    │   └── assessment.md     ← registers the /assessment slash command
    └── skills/
        ├── assessment/
        │   └── SKILL.md      ← main assessment workflow
        └── update-assessment-dashboard/
            └── SKILL.md      ← syncs filled checklist to a remote API
```

## How to Run an Assessment

1. Copy the project source code into `input/<project-name>/`.
2. Run the `/assessment` command (or invoke the `assessment` skill directly).
3. The agent will:
  - Copy `supplementary/working_version.csv` → `output/<project-name>/`
  - Review the project in `input/<project-name>/` line by line
  - Fill in `is implemented` (`yes` / `no` / `partial` / `n/a`) and add `notes` for any `partial` item
  - Write a summary report to `output/<project-name>/`

## Checklist Structure (`working_version.csv`)


| Column             | Description                                        |
| ------------------ | -------------------------------------------------- |
| `template_title`   | Always "Front-end"                                 |
| `area_title`       | Category of the check                              |
| `task_description` | Detailed explanation of what to evaluate           |
| `task_body`        | Short identifier / name of the check               |
| `is implemented`   | Filled by the agent: `yes`, `no`, `partial`, `n/a` |
| `notes`            | Required for `partial`; explains what is missing   |


86 items across 14 areas: Communication, Jira set-up, Repository structure, CI/CD, Quality & tooling, IDE Setup, Code design, UI kit, Technology stack, Security, State Management, Maintenance & Debugging, Tech debt, Documentation.

## Dashboard Sync (optional)

After the assessment CSV is filled, the `update-assessment-dashboard` skill generates a standalone TypeScript script (`update-notes.ts`, run via `npx tsx`) that:

1. GETs the current state from a remote API
2. Matches each API task to the CSV via `templateTask.body` ↔ `task_body`
3. Maps `yes` → `"Done"`, `no` → `"Open"`, anything else → keeps the existing API value
4. PATCHes the API with updated `note` and `implementationStatus`

To use this skill, paste the project-specific GET and PATCH curl commands into the prompts when the skill asks for them.

## Important Notes

- `input/` and `output/` are intentionally empty in the template — they are populated per engagement.
- `.cursor/` is a symlink to `.claude/` so both Cursor and Claude Code share the same skills and commands.
- No build system or package manager is required; the only generated script (`update-notes.ts`) uses Node built-ins only.

