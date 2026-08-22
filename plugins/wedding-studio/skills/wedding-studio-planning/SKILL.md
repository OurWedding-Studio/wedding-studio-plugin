---
name: wedding-studio-planning
description: Read and explain the current Wedding Studio planning state, health, timeline, budget, decisions, tasks, proposals, and next best actions.
---

# Planning cockpit

Ground every answer in the selected project's live data.

- Start with `get_connection_capabilities` when access is unclear.
- Use `get_wedding_summary` for a compact overview.
- Use the matching `get_wedding_context` pack for detail: `overview`,
  `location`, `locations`, `catering`, `music`, `seating`, `documents`,
  `finance`, `timeline` or `decisions`.
- Use `get_planning_health` for risk flags and `get_standard_timeline_template`
  for non-mutating milestone candidates.
- Use `list_pending_proposals` and `get_project_changes` when the user asks
  what is awaiting approval or what changed.

Present facts, source evidence, confidence, blockers and next actions
separately. Preserve cursors for paginated locations or records. Never turn a
template, estimate or risk flag into an existing project fact.

If the live connection is unavailable, say so and stop; do not use local test
data as the user's planning status.
