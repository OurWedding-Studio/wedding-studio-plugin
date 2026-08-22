---
name: wedding-studio-vendors
description: Research, inspect, compare, import, or update Wedding Studio vendors and offers with evidence, due diligence, and explicit proposal approval.
---

# Vendors and offers

Search the project's saved vendors before suggesting new records.

- Use `search_saved_vendors` and `get_vendor_record` for existing records.
- Use `get_offer_comparison` only for confirmed, server-normalized analyses.
- Use `get_vendor_intake_contract` before preparing a new vendor candidate.
- Use `preview_vendor_import` or `preview_vendor_update` before any vendor
  write. Show sources, evidence, confidence, open questions and warnings.
- Commit only explicitly selected candidates with `commit_vendor_import` or
  `commit_vendor_update` and a fresh UUID idempotency key.

Do not invent prices, availability, contacts, ratings or verification status.
An AI proposal is not a human-reviewed vendor. Existing non-empty values must
not be silently overwritten; conflicts become visible open questions.
