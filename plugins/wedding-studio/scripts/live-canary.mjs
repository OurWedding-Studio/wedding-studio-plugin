const baseUrl = (process.env.WEDDING_MCP_BASE_URL ?? "https://mcp.ourwedding.studio").replace(/\/$/, "");

async function check(path, validate) {
  const response = await fetch(`${baseUrl}${path}`, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  const body = await response.json();
  validate(body);
  console.log(`OK ${path}`);
}

await check("/health/live", (body) => {
  if (body?.ok !== true) throw new Error("health endpoint did not report ok=true");
});

await check("/.well-known/oauth-protected-resource", (body) => {
  if (body?.resource !== `${baseUrl}/mcp`) throw new Error("protected resource points to a different MCP endpoint");
  if (!Array.isArray(body?.authorization_servers) || body.authorization_servers.length === 0) throw new Error("OAuth discovery has no authorization server");
});
