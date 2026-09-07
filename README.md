# Wedding Studio Plugin

Wedding Studio gives ChatGPT a secure, project-scoped connection to a Wedding
Studio wedding plan. It supports German and English conversations.

## Install in Codex

```bash
codex plugin marketplace add OurWedding-Studio/wedding-studio-plugin
codex plugin add wedding-studio@wedding-studio-public
```

This installs the public Codex plugin bundle. It is separate from the global
ChatGPT app catalog: a local/personal Codex plugin cannot make itself appear
as an officially listed ChatGPT app. Official catalog visibility requires the
platform's separate review and submission process, including approved public
privacy and terms pages.

## ChatGPT Web and Work

For a personal ChatGPT connection, add this server URL from a supported web or
desktop setup flow exactly once, complete OAuth, and select one Wedding Studio
project:

```text
https://mcp.ourwedding.studio/mcp
```

For ChatGPT Work, an authorized workspace admin/owner must create the custom MCP
app in Workspace settings → Apps → Create, enter the endpoint, scan the tools,
complete OAuth, create the draft, then publish it from Drafts. The workspace
must also make the plugin available and grant the relevant role access. A
personal Codex marketplace entry or a GitHub repository does not publish a
ChatGPT directory listing by itself.

OpenAI currently documents full custom MCP apps, including write actions, as
web-only. The native ChatGPT smartphone app therefore must not be described as
supporting this full MCP connection. Use ChatGPT Web for the complete
Wedding-Studio capability set until OpenAI exposes custom MCP apps on mobile.
The plugin may still be visible in a directory on a supported surface, but
visibility and usable app capabilities depend on plan, workspace, role and
surface.

If OAuth returns `401`, `429`, or `OAUTH_INTERACTION_EXPIRED`, stop and start
exactly one fresh connection. Do not open parallel consent windows and never
paste OAuth tickets, access tokens, callback URLs or secrets into chat.

## What it can do

- Read a bounded planning overview, open tasks, timeline, budget and decisions.
- Review saved vendors, offers and evidence across nine wedding disciplines.
- Compare confirmed offers without exposing document contents or guest identity.
- Read document metadata and content only after the relevant connection grant.
- Work with RSVP aggregates and pseudonymized seating constraints.
- Prepare vendor, planning, email-draft and seating proposals for review.
- Show pending proposals and audited project changes.

## Safety model

Wedding Studio is not a silent write connector. Every mutation uses a signed,
short-lived preview and requires explicit candidate selection before commit.
The shared Wedding Studio state is still accepted visibly in the Studio UI.

Guest names, contacts and all-document access are separate, revocable grants.
Private notes and mailbox contents are never returned. Missing grants are
reported instead of being worked around with guesses or local test data.

## Development

The plugin package is intentionally separate from the private Wedding Studio
application and MCP backend. Do not put secrets, production tokens, customer
data or private backend source into this repository.

Validate the package before publishing:

```bash
python3 ~/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/wedding-studio
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py plugins/wedding-studio/skills/wedding-studio
node plugins/wedding-studio/scripts/verify-server-contract.mjs --server-file /absolute/path/to/wedding-studio/services/wedding-mcp/src/index.ts
```

The MCP tool snapshot is in
`plugins/wedding-studio/references/mcp-tool-contract.json`. The private MCP
repository owns the executable server contract. A snapshot marked
`source_pending_server_release` describes one named server revision and must
not be presented as live capability. It becomes `live_verified` only after the
release is deployed and `scripts/live-canary.mjs` confirms the public OAuth
scope contract. This keeps source and production evidence separate.

## Publication gate

The public package must link to a complete, operator-approved privacy policy
and terms page before it is promoted as an official catalog listing. This
repository deliberately does not invent legal wording.
