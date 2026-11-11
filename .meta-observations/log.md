# Skill Observation Log

Observations captured during task-oriented work. Each entry identifies a
potential skill improvement or new skill opportunity.

**Status key:** OPEN = not yet actioned | ACTIONED = skill updated/created |
DECLINED = user decided not to pursue

---

### Observation 1: Assessment skill does not define the score or the evidence bar

**Date:** 2026-10-12
**Session context:** Front-end checklist assessment of input/justgig-assesment
**Skill:** project-assessment
**Status:** OPEN

**Issue:** SKILL.md says to copy the CSV, mark each row yes/no/partial/n/a, require notes on partial, and write a short summary with overall scores. It does not say how to score areas, when a missing process artifact is n/a versus no, or what the summary must contain. The consistent formula and summary shape only exist in output/f4e-monorepo-pre-prod/summary.md and output/quantgenie-web-ui-dev/summary.md, so a new run has to reverse-engineer them.

**Suggested improvement:** In "What to do", add the scoring formula (yes + 0.5 × partial) / (yes + no + partial), excluding n/a; state that process items with no in-repo evidence (communication, Jira, tech-debt workflow, stakeholder register, Cursor usage dashboard) are n/a; and point at the summary sections used by previous assessments (overview, area table, strengths, critical gaps, prioritized recommendations).

**Principle:** A repeatable review skill should carry its rubric in the skill, not only in past output files.

### Observation 2: Template gitignore hides the project under assessment from workspace search

**Date:** 2026-10-13
**Session context:** Front-end checklist assessment of input/oti
**Skill:** project-assessment
**Status:** OPEN

**Issue:** The template `.gitignore` ignores `input/*`. Workspace Glob and Grep therefore return no files for the project being assessed. The agent had to `cd` into `input/oti` and search with that repo's own git rules. A search from the template root also risks matching the template instead of the project, or skipping generated and env files the inner repo ignores.

**Suggested improvement:** In "What to do", step 2, say to inspect `input/<project>` as its own git repo: run searches from that directory (or with the inner ignore rules), and do not rely on workspace Glob/Grep from the template root.

**Principle:** When the workspace gitignore excludes the subject of the task, the skill should name the directory the tools must search.

