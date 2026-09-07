import { readFile } from "node:fs/promises";

const baseUrl = (process.env.WEDDING_MCP_BASE_URL ?? "https://mcp.ourwedding.studio").replace(/\/$/, "");

async function check(path, validate) {
  const response = await fetch(`${baseUrl}${path}`, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  const body = await response.json();
  validate(body);
  console.log(`OK ${path}`);
  return body;
}

await check("/health/live", (body) => {
  if (body?.ok !== true) throw new Error("health endpoint did not report ok=true");
});

const discovery = await check("/.well-known/oauth-protected-resource", (body) => {
  if (body?.resource !== `${baseUrl}/mcp`) throw new Error("protected resource points to a different MCP endpoint");
  if (!Array.isArray(body?.authorization_servers) || body.authorization_servers.length === 0) throw new Error("OAuth discovery has no authorization server");
});

const contract = JSON.parse(await readFile(new URL("../references/mcp-tool-contract.json", import.meta.url), "utf8"));
const expectedScopes = [...contract.scopes].sort();
const liveScopes = Array.isArray(discovery.scopes_supported) ? [...discovery.scopes_supported].sort() : [];
if (JSON.stringify(liveScopes) !== JSON.stringify(expectedScopes)) {
  const missingLiveScopes = expectedScopes.filter((scope) => !liveScopes.includes(scope));
  const unexpectedLiveScopes = liveScopes.filter((scope) => !expectedScopes.includes(scope));
  throw new Error(`live OAuth scope contract drift: missing=${missingLiveScopes.join(",") || "-"}; unexpected=${unexpectedLiveScopes.join(",") || "-"}`);
}

console.log(`OK OAuth scope contract (${liveScopes.length} scopes)`);
