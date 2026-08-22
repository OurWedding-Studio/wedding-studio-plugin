# Connection error recovery

Treat a connection attempt and a tool batch as serialized operations. Do not
start a second OAuth window while one interaction is still pending, and do not
fire parallel MCP calls during token refresh.

| Error | Recovery |
| --- | --- |
| `401` / authorization required | Stop tool calls, start one fresh OAuth connection, then retry the original request once. |
| `429 Too Many Requests` | Respect `Retry-After` when present, wait, and retry once. Do not open multiple consent windows. |
| `OAUTH_INTERACTION_EXPIRED` | Close stale consent pages and start exactly one new connection flow. Confirm only once. |
| `GRANT_REQUIRED` / `DOCUMENT_NOT_GRANTED` | Explain the named grant; do not request tokens or bypass it. |
| `SCOPE_STALE_TOKEN` | Reconnect once so the client receives the current scope set. |

Never ask the user to paste an OAuth ticket, access token, secret or callback
URL. If a serialized retry still fails, return the request ID and stop rather
than looping.
