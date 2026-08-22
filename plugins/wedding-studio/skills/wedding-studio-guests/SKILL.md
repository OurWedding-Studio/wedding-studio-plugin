---
name: wedding-studio-guests
description: Handle RSVP progress, guest planning, households, and seating constraints while preserving Wedding Studio's pseudonym and grant boundaries.
---

# Guests and seating

Start with aggregate or pseudonymized data.

- Use `get_rsvp_follow_up` without names for progress and never-sent reminder
  recommendations.
- Use `get_seating_constraints` for tables, capacities, shapes and constraints.
- Use `get_guest_list` or `get_guest_household` only when the explicit
  per-connection names grant is active.
- Contacts require the separate contacts grant; names do not imply contacts.

Never reverse-engineer `guest_ref` or household pseudonyms, create a
cross-client mapping, expose private notes, or read mailbox contents. For
seating or RSVP changes use `preview_write`, show the neutral diff and warnings,
then commit only selected candidates. The Studio UI remains the visible
acceptance point.
