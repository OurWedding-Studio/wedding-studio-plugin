import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const file = resolve(process.argv[2] ?? new URL("../references/mcp-tool-contract.json", import.meta.url).pathname);
const contract = JSON.parse(await readFile(file, "utf8"));

if (contract.server !== "wedding-studio") throw new Error("Unexpected MCP server name");
if (!/^https:\/\/mcp\.ourwedding\.studio\/mcp$/.test(contract.endpoint)) throw new Error("Unexpected MCP endpoint");
if (!/^20\d\d-\d\d-\d\d$/.test(contract.contractVersion)) throw new Error("Invalid contract version");
if (!Array.isArray(contract.tools) || contract.tools.length < 20) throw new Error("MCP contract is unexpectedly small");
if (new Set(contract.tools).size !== contract.tools.length) throw new Error("MCP contract contains duplicate tool names");
if (contract.tools.some((tool) => !/^[a-z][a-z0-9_]+$/.test(tool))) throw new Error("MCP contract contains an invalid tool name");

console.log(`MCP contract valid: ${contract.tools.length} tools (${contract.contractVersion})`);
