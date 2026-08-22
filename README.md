# Wedding Studio Plugin

Wedding Studio gives ChatGPT a secure, project-scoped connection to a Wedding
Studio wedding plan. It supports German and English conversations.

## Install from the public marketplace

```bash
codex plugin marketplace add OurWedding-Studio/wedding-studio-plugin
codex plugin add wedding-studio@wedding-studio-public
```

The same account connection can be used from supported desktop and mobile
ChatGPT clients. OAuth selects exactly one Wedding Studio project. Never share
OAuth tickets, access tokens or connection URLs in chat.

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
```

The MCP tool snapshot is in
`plugins/wedding-studio/references/mcp-tool-contract.json`. The private MCP
repository owns the executable server contract and must update this snapshot
only when the live `/mcp` tool list has been verified.

## Publication gate

The public package must link to a complete, operator-approved privacy policy
and terms page before it is promoted as an official catalog listing. This
repository deliberately does not invent legal wording.
