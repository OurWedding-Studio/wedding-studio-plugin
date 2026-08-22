# Privacy and consent contract

Use the narrowest capability that answers the request. The MCP connection is
bound to one selected Wedding Studio project and every capability is evaluated
against both OAuth scopes and the current per-connection grant.

## Default access

- Project overview, bounded context packs, planning health and vendor data are
  available only for the selected project and granted scopes.
- Guest counts, RSVP aggregates and seating constraints use stable,
  connection-specific pseudonyms by default.
- Document metadata is not document content.

## Sensitive access

- `guests.read.identified` is required for names and named household reads.
- `guests.read.contacts` is a separate grant for contact fields.
- `documents.read.all` is a separate grant for all project documents.
- A document can also be individually released; always report its grant source.
- Private notes and mailbox contents remain excluded.

Never infer a missing grant from a broad OAuth scope. Explain the exact missing
grant and continue with an aggregate or pseudonymized result when possible.
