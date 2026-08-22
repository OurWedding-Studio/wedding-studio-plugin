# Write and proposal contract

All writes are two-phase and user-visible:

1. Read the relevant current context.
2. Call the appropriate preview tool.
3. Present normalized candidates, evidence, warnings and affected fields.
4. Wait for explicit candidate selection.
5. Commit only selected candidates with a fresh UUID idempotency key.
6. Explain that the result is a reviewable Wedding Studio proposal until it is
   visibly accepted in the Studio UI.

`preview_vendor_import` and `preview_vendor_update` precede vendor commits.
`preview_write` precedes planning, status, draft, RSVP and seating commits.
`revert_change` is preview-only and must follow the same visible review path.

Never claim that a proposal changed the shared plan, that an email was sent,
or that a vendor was verified by a human unless the returned evidence says so.
