import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const argumentIndex = process.argv.indexOf("--server-file");
if (argumentIndex === -1 || !process.argv[argumentIndex + 1]) {
  throw new Error("Usage: node verify-server-contract.mjs --server-file /absolute/path/to/index.ts");
}

const contractFile = new URL("../references/mcp-tool-contract.json", import.meta.url);
const contract = JSON.parse(await readFile(contractFile, "utf8"));
const serverFile = resolve(process.argv[argumentIndex + 1]);
const source = await readFile(serverFile, "utf8");
const serverRoot = execFileSync("git", ["-C", dirname(serverFile), "rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
const serverRevision = execFileSync("git", ["-C", serverRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (serverRevision !== contract.sourceServerRevision) {
  throw new Error(`Server source revision mismatch: expected ${contract.sourceServerRevision}, got ${serverRevision}`);
}

const toolNames = [...source.matchAll(/server\.registerTool\("([a-z][a-z0-9_]+)"/g)].map((match) => match[1]).sort();
const scopesDeclaration = source.match(/const MCP_SCOPES = \[([\s\S]*?)\] as const;/);
if (!scopesDeclaration) throw new Error("Could not find MCP_SCOPES in server source");
const serverScopes = [...scopesDeclaration[1].matchAll(/"([a-z]+(?:[.:][a-z_]+)+)"/g)].map((match) => match[1]).sort();

function difference(left, right) {
  const rightSet = new Set(right);
  return left.filter((value) => !rightSet.has(value));
}

const contractTools = [...contract.tools].sort();
const contractScopes = [...contract.scopes].sort();
const serverOnlyTools = difference(toolNames, contractTools);
const pluginOnlyTools = difference(contractTools, toolNames);
const serverOnlyScopes = difference(serverScopes, contractScopes);
const pluginOnlyScopes = difference(contractScopes, serverScopes);

if (serverOnlyTools.length || pluginOnlyTools.length || serverOnlyScopes.length || pluginOnlyScopes.length) {
  throw new Error(JSON.stringify({ serverOnlyTools, pluginOnlyTools, serverOnlyScopes, pluginOnlyScopes }, null, 2));
}

console.log(`Server contract matches: ${toolNames.length} tools, ${serverScopes.length} scopes`);
