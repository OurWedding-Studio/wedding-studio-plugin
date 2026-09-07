---
name: wedding-studio-first-steps
description: Guide a newly connected couple through offer review, next actions, guest seating, or a guest-page draft with real Wedding Studio data and explicit consent.
---

# First planning step

Use this skill when a couple asks where to begin, or asks to check an offer,
find the next action, organise guests and seating, or design the guest page.
Start with `get_connection_capabilities` once. State the exact missing scope or
grant only if the selected path needs it. Do not reconnect, publish, send a
message or create a record merely to complete this guide.

## Offer review

1. Call `search_saved_vendors` for the named trade when it is known; otherwise
   ask the couple which trade is on the offer before reading content.
2. Call `get_offer_comparison` only for confirmed offer analyses.
3. If the couple wants evidence from a document, call
   `list_granted_documents`, then `get_document_content` only for a listed
   `document_id`. Explain a missing individual document grant or the explicit
   `documents.read.all` grant in plain language.
4. Separate confirmed totals, open cost items, source facts and questions.
   An offer review does not select, book or contact a vendor.

## Next actions

1. Call `get_wedding_summary` and `get_planning_health`.
2. Present at most the server-returned three prioritized actions with their
   reason, owner, blocker and due date when present.
3. Use `get_budget_payment_schedule` only for a payment question and
   `get_budget_reduction_scenarios` only after the couple states a target.

## Guests and seating

1. Call `get_rsvp_follow_up` without names and `get_seating_constraints`
   without names.
2. Explain RSVP gaps, capacity and hard constraints from those reads.
3. Names need the active `guests.read.identified` grant; contacts need the
   separate `guests.read.contacts` grant. Never infer either from pseudonyms.
4. A seating or RSVP change remains `preview_write` → explicit candidate
   selection → `commit_write` → visible Studio acceptance.

## Guest page

1. Call `get_wedding_context` with `context_pack: "guest_site"` before
   composing anything. Use only the returned template, colour, accent, header
   and block identifiers.
2. Prepare a `guest_site_draft` through `preview_write`; show the normalized
   draft and wait for explicit selection before `commit_write`.
3. Tell the couple that the accepted result changes only the Studio draft.
   Publishing is a separate visible Studio action and never occurs here.

If the connection is unavailable, report that fact and stop. Never use local
fixtures, guessed catalogue IDs, ungranted document text, contacts, mailbox
contents or private notes as a substitute for the selected project.
