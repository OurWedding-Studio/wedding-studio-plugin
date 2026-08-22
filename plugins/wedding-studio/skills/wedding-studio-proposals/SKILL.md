---
name: wedding-studio-proposals
description: Review, approve, audit, or safely revert Wedding Studio MCP proposals and planning changes.
---

# Proposals and changes

Use `list_pending_proposals` for review state and `get_project_changes` for the
append-only audit feed. `revert_change` prepares a candidate; it does not write
anything by itself.

For every new mutation:

1. Read current context.
2. Call `preview_write` or the vendor preview tool.
3. Show normalized candidates, impact, evidence and validation warnings.
4. Wait for explicit selection.
5. Commit only selected candidates with a fresh UUID idempotency key.

After a successful commit, describe the resulting reviewable proposal and
state that the shared plan still requires visible acceptance in Wedding
Studio. Never imply that an email was sent or a proposal was silently applied.
