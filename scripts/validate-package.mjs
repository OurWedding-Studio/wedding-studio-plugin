import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(process.cwd(), "plugins", "wedding-studio");
const manifest = JSON.parse(await readFile(join(root, ".codex-plugin", "plugin.json"), "utf8"));
if (manifest.name !== "wedding-studio") throw new Error("manifest name mismatch");
if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version)) throw new Error("invalid plugin version");
if (!manifest.interface?.displayName || !manifest.interface?.shortDescription || !manifest.interface?.longDescription) throw new Error("incomplete interface metadata");
if (manifest.mcpServers !== "./.mcp.json") throw new Error("unexpected MCP manifest path");
const mcp = JSON.parse(await readFile(join(root, ".mcp.json"), "utf8"));
if (Object.keys(mcp.mcpServers ?? {}).join(",") !== "wedding-studio") throw new Error("unexpected MCP server set");
if (mcp.mcpServers["wedding-studio"].url !== "https://mcp.ourwedding.studio/mcp") throw new Error("unexpected MCP URL");

const skillRoot = join(root, "skills");
for (const entry of await readdir(skillRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const path = join(skillRoot, entry.name, "SKILL.md");
  const source = await readFile(path, "utf8");
  if (!source.startsWith("---\n") || !source.includes("\nname:") || !source.includes("\ndescription:")) throw new Error(`invalid skill frontmatter: ${entry.name}`);
  if (source.includes("[TODO:") || source.includes("<TODO>")) throw new Error(`unfinished skill: ${entry.name}`);
}

const marketplace = JSON.parse(await readFile(join(process.cwd(), ".agents", "plugins", "marketplace.json"), "utf8"));
const entry = marketplace.plugins?.find((plugin) => plugin.name === "wedding-studio");
if (!entry || entry.source?.path !== "./plugins/wedding-studio" || entry.policy?.installation !== "AVAILABLE" || entry.policy?.authentication !== "ON_INSTALL" || entry.category !== "Productivity") {
  throw new Error("invalid marketplace entry");
}

console.log(`Package valid: ${manifest.name} ${manifest.version}`);
