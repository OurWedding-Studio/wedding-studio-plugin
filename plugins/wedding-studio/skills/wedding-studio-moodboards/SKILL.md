---
name: wedding-studio-moodboards
description: Read authorized Wedding Studio moodboards, assess style consequences, and prepare vendor briefings or guest-page drafts without silently changing a wedding.
---

# Moodboards and guest page

Start with `get_connection_capabilities` when the active `moodboard.read` grant
is unclear. Moodboard reads require the explicit active per-connection grant.

- Use `list_moodboards`, `get_moodboard` and `get_moodboard_palette` only for
  the selected project.
- Read `get_final_decisions` and `summarize_open_decisions` before explaining
  the current visual direction.
- Call `get_moodboard_style_change_impact` before preparing a change. It is a
  read-only review of accepted decisions and pending proposals, not a change.
- `create_vendor_briefing_preview` prepares a briefing only. It neither contacts
  a vendor nor claims that material was sent.
- For `guest_site_draft`, read the `guest_site` context pack first, then use
  `preview_write`, explicit candidate selection and `commit_write`. The couple
  visibly accepts the draft in Wedding Studio; publishing remains a separate
  action there.

Never expose asset bytes, rights metadata, comments, share links, private notes
or ungranted board content. If a grant is missing, name the exact grant instead
of inferring it from another permission.
