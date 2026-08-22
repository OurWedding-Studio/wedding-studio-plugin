# OpenAI submission pack

This document is the operator-owned handoff for the official OpenAI plugin/app
submission. It is deliberately separate from the Codex marketplace manifest:
installing the Codex package does not publish a ChatGPT directory listing.

The submission portal and current requirements are documented by OpenAI at
<https://developers.openai.com/plugins/deploy/submission>.

## Listing and service

| Field | Value |
| --- | --- |
| Display name | Wedding Studio |
| Developer | OurWedding Studio |
| Category | Productivity |
| MCP endpoint | `https://mcp.ourwedding.studio/mcp` |
| Website | `https://www.locationsap.com/` |
| Listing logo | `assets/wedding-studio-logo.svg` (upload to the portal) |
| Languages | German and English |
| Capability | Project-scoped wedding planning with read and explicit proposal writes |

The final submission must use operator-approved, public URLs for support,
privacy and terms. This repository does not invent legal text or publish real
customer credentials. The reviewer account must use a dedicated demo project
with synthetic wedding data and no private customer documents.

## Reviewer prerequisites

Before submitting, the operator supplies the portal with:

1. Verified developer/business identity.
2. The exact OpenAI domain-challenge token in the VPS environment variable
   `OPENAI_APPS_CHALLENGE_TOKEN` (never in Git, screenshots or chat).
3. A dedicated reviewer login and one synthetic Wedding Studio project.
4. Operator-approved support, privacy and terms URLs.
5. Release notes and the current tool metadata, including read-only and
   destructive annotations.

The challenge route is intentionally `404` until the portal issues a token.
After the value is installed, it must return only that exact token as plain
text at `/.well-known/openai-apps-challenge`.

## Positive reviewer tests

Run these sequentially after one fresh OAuth connection. Select exactly one
demo project and do not open parallel consent windows.

### Positive test 1: connect and capability projection

1. Add `https://mcp.ourwedding.studio/mcp`.
2. Complete OAuth once and select the demo project.
3. Call `get_connection_capabilities`.

Expected: the response identifies the active, single-project connection and
reports capabilities from the current OAuth token, saved consent and active
connection grants. It contains no guest identities, contacts, private notes or
secrets.

### Positive test 2: bounded planning cockpit

1. Call `get_wedding_summary`.
2. Call `get_wedding_context` for `timeline` and `finance`.
3. Call `get_planning_health`.

Expected: the response contains only the selected demo project's bounded
planning facts, risk flags and next actions. It does not claim that templates
or estimates are existing project facts.

### Positive test 3: vendor evidence and comparison

1. Call `search_saved_vendors` before proposing a new vendor.
2. Call `get_vendor_record` for a fixture vendor.
3. Call `get_offer_comparison` for a fixture discipline with a confirmed
   offer analysis.

Expected: existing records and server-normalized confirmed comparisons are
   returned with evidence; unknown prices, availability and human verification
   are not invented.

### Positive test 4: explicitly granted document evidence

1. Call `list_granted_documents`.
2. Select only the fixture document explicitly released for the reviewer.
3. Call `get_document_content` in bounded `structured` or `page_range` mode.

Expected: the document row states its grant source and the returned evidence is
   bounded. Unreleased documents, mailbox contents, contacts and private notes
   remain unavailable.

### Positive test 5: visible proposal write

1. Call `preview_write` with one harmless synthetic task candidate.
2. Show the normalized candidate, validation result and impact.
3. After the reviewer explicitly selects it, call `commit_write` once with a
   fresh idempotency UUID.
4. Inspect the result in `list_pending_proposals`.

Expected: the commit creates an audited, reviewable Wedding Studio proposal;
it does not silently change the shared plan and it is not described as an
   email being sent or as human verification.

## Negative reviewer tests

Each test must leave the demo project unchanged.

### Negative test 1: unauthenticated MCP request

Send an MCP request to `/mcp` without an access token.

Expected: HTTP `401` with OAuth resource metadata; no tool result and no
project data.

### Negative test 2: project boundary and missing grant

1. With the valid demo connection, request a different `wedding_project_id`.
2. Request identified guests or all documents without enabling the matching
   per-connection grant.

Expected: the first request returns structured `PROJECT_MISMATCH`; the second
returns `GRANT_REQUIRED` or the precise scope/grant error. The server does not
fall back to another project or guess a grant.

### Negative test 3: write without a valid visible preview

Call `commit_write` with a fabricated, expired or already-consumed preview, or
without an explicitly selected candidate.

Expected: a structured validation/preview error, no mutation, no proposal and
no background side effect.

## Publish and regression checklist

- [ ] The Work admin/owner created the custom MCP app and saved the draft.
- [ ] The portal scan shows the complete current tool list and annotations.
- [ ] The exact challenge token is installed only in the VPS environment.
- [ ] Support, privacy and terms URLs are public, complete and operator-approved.
- [ ] The eight reviewer tests above were run against synthetic data.
- [ ] OAuth recovery remains serialized: `401`, `429` and
      `OAUTH_INTERACTION_EXPIRED` never trigger parallel retries.
- [ ] The public listing is submitted for review before anyone claims it is
      discoverable in the global directory.
- [ ] Native mobile ChatGPT is not advertised as supporting full custom MCP
      writes while OpenAI documents that surface as web-only.
