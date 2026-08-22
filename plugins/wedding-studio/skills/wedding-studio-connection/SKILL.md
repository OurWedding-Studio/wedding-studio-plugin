---
name: wedding-studio-connection
description: Recover and verify Wedding Studio OAuth/MCP connections when connecting, reconnecting, refreshing, or handling 401, 429, stale-token, or expired-interaction errors.
---

# Connection and consent

Keep connection work serialized. A pending OAuth interaction must be resolved
or abandoned before another one starts.

1. If authorization is required, start exactly one fresh OAuth 2.1/PKCE flow.
2. Let the user select exactly one Wedding Studio project and confirm once.
3. After success, call `get_connection_capabilities` before content tools.
4. Retry the original read once, sequentially.

For `429`, honor `Retry-After` when available and retry once after a bounded
wait. For `OAUTH_INTERACTION_EXPIRED`, close stale consent windows and start
one new flow. For `GRANT_REQUIRED`, `DOCUMENT_NOT_GRANTED` or stale scopes,
explain the exact missing permission rather than repeatedly reconnecting.

Never request or expose bearer tokens, OAuth tickets, callback URLs or shared
MCP keys. If the same serialized recovery fails once, return the request ID and
the next concrete user action; do not loop.
