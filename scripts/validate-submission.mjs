import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const document = await readFile(resolve("docs/openai-submission.md"), "utf8");
await access(resolve("assets/wedding-studio-logo.svg"));
const logo = await readFile(resolve("assets/wedding-studio-logo.svg"), "utf8");
assert.match(logo, /^<svg\b[^>]*viewBox=/, "listing logo must be a viewBox SVG");
const positives = [...document.matchAll(/^### Positive test \d+:/gm)];
const negatives = [...document.matchAll(/^### Negative test \d+:/gm)];

assert.equal(positives.length, 5, "OpenAI submission must define five positive reviewer tests");
assert.equal(negatives.length, 3, "OpenAI submission must define three negative reviewer tests");
for (const required of [
  "https://mcp.ourwedding.studio/mcp",
  "OPENAI_APPS_CHALLENGE_TOKEN",
  "support, privacy and terms",
  "get_connection_capabilities",
  "preview_write",
  "commit_write",
  "PROJECT_MISMATCH",
  "GRANT_REQUIRED",
  "OAUTH_INTERACTION_EXPIRED",
]) {
  assert.ok(document.includes(required), `submission pack is missing ${required}`);
}

console.log(`Submission pack valid: ${positives.length} positive, ${negatives.length} negative tests`);
