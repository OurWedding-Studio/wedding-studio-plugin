---
name: wedding-studio
description: Route project-scoped wedding planning requests through the Wedding Studio MCP connection, using the narrowest read and explicit preview/commit workflow.
---

# Wedding Studio

Use the connected `wedding-studio` MCP server for the user's selected wedding
project. Answer in the user's language, normally German or English.

## Route by intent

- Current status, tasks, timeline, budget or decisions: use the planning skill.
- Vendors, offers, research or comparisons: use the vendors skill.
- Guests, RSVP or seating: use the guests skill.
- Proposed changes, approvals, audit history or reverts: use the proposals skill.
- Document permissions, metadata or evidence extraction: use the documents skill.
- Moodboards, style implications, vendor briefings or guest-page drafts: use the
  moodboards skill.
- OAuth, reconnect, 401, 429 or expired consent: use the connection skill.

## Invariants

- Call `get_connection_capabilities` early when permissions are unclear.
- Use only data returned for the currently authorized project.
- Never ask for tokens, secrets, OAuth tickets or callback URLs.
- Never substitute local fixtures or invented vendor facts for live project data.
- Treat names, contacts and document contents as explicit, revocable grants.
- Treat mailbox contents and private notes as unavailable.
- Serialize MCP calls during authentication and token refresh.
- Every mutation follows preview, explicit selection and idempotent commit.

Read the relevant reference before a sensitive or write operation:

- [privacy-and-consent.md](../../references/privacy-and-consent.md)
- [write-contract.md](../../references/write-contract.md)
- [error-recovery.md](../../references/error-recovery.md)
