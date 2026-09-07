import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const file = resolve(process.argv[2] ?? new URL("../references/mcp-tool-contract.json", import.meta.url).pathname);
const contract = JSON.parse(await readFile(file, "utf8"));

if (contract.server !== "wedding-studio") throw new Error("Unexpected MCP server name");
if (!/^https:\/\/mcp\.ourwedding\.studio\/mcp$/.test(contract.endpoint)) throw new Error("Unexpected MCP endpoint");
if (!/^20\d\d-\d\d-\d\d$/.test(contract.contractVersion)) throw new Error("Invalid contract version");
if (!["source_pending_server_release", "live_verified"].includes(contract.snapshotState)) throw new Error("Invalid MCP snapshot state");
if (!/^[0-9a-f]{40}$/.test(contract.sourceServerRevision ?? "")) throw new Error("Invalid source server revision");
if (!Array.isArray(contract.tools) || contract.tools.length < 20) throw new Error("MCP contract is unexpectedly small");
if (new Set(contract.tools).size !== contract.tools.length) throw new Error("MCP contract contains duplicate tool names");
if (contract.tools.some((tool) => !/^[a-z][a-z0-9_]+$/.test(tool))) throw new Error("MCP contract contains an invalid tool name");
if (!Array.isArray(contract.scopes) || contract.scopes.length < 10) throw new Error("MCP contract has an invalid scope snapshot");
if (new Set(contract.scopes).size !== contract.scopes.length) throw new Error("MCP contract contains duplicate scopes");
if (contract.scopes.some((scope) => !/^[a-z]+(?:[.:][a-z_]+)+$/.test(scope))) throw new Error("MCP contract contains an invalid scope name");
if (!contract.toolScopes || typeof contract.toolScopes !== "object" || Array.isArray(contract.toolScopes)) throw new Error("MCP contract has no tool-to-scope mapping");

for (const tool of contract.tools) {
  const requiredScopes = contract.toolScopes[tool];
  const isValid = requiredScopes === "proposal-specific" || (Array.isArray(requiredScopes) && requiredScopes.every((scope) => contract.scopes.includes(scope)));
  if (!isValid) throw new Error(`MCP contract has an invalid scope mapping for ${tool}`);
}

for (const tool of Object.keys(contract.toolScopes)) {
  if (!contract.tools.includes(tool)) throw new Error(`MCP contract maps an unknown tool: ${tool}`);
}

console.log(`MCP contract valid: ${contract.tools.length} tools, ${contract.scopes.length} scopes (${contract.contractVersion})`);
