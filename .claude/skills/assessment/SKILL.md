---
name: project-assessment
description: "Use when go through a project assessment"
---

# Project Assessment

Update kick-off assessment tasks via API using data from a CSV file

## When This Activates

When go through a project assessment

## What to do

1. Copy the template file `./supplementary/working_version.csv` to the `./output/<project>` folder. `<project>` is a dynamyc value that should be equal to the `./input/<project>` name.
2. Go through the file `./output/<project>` line by line and check whether each item is implemented in the `./input/<project>`.
For example, "FE-team specific communication" — if you cannot find any evidence of this in the project, put "n/a" in the "is implemented" column.
Another example: for a line with the task description "Pre-commit hooks enabled (lint, format, test)", check the project:
put "yes" in the "is implemented" column if it is implemented,
"no" if it is not implemented,
or "partial" if it is not implemented 100%.
2.1. If the value is "partial", add an explanation in the "notes" column describing why it is not fully implemented.
3. At the end, create file with a short summary of the project and include several overall scores, put it in the `./output/<project>` folder.