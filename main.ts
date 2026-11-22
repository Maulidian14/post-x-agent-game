// SPDX-License-Identifier: MIT
// Entry program for post-x-the-agent-builds-a-game-from-20261122-1709
// ("The agent builds a game from one prompt").
// Copies POST.json from the repository into the output directory.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const src = join(botDir, "POST.json");
// Fail loudly on a malformed entry file instead of copying garbage.
const entry = JSON.parse(readFileSync(src, "utf8"));
if (typeof entry.url !== "string" || !entry.url.startsWith("https://")) {
  throw new Error("POST.json must hold an https url");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "POST.json"));
console.log("POST.json copied to", outDir);
