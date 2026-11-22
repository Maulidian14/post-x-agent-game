import * as fs from "node:fs";
import * as path from "node:path";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const here = path.dirname(new URL(import.meta.url).pathname);
const sourcePath = path.join(here, "POST.json");

let raw: string;
try {
  raw = fs.readFileSync(sourcePath, "utf8");
} catch {
  fail(`cannot read POST.json at ${sourcePath}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch {
  fail("POST.json is not valid JSON");
}

if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  fail('POST.json must contain a JSON object with a "url" field');
}

const url = (parsed as Record<string, unknown>).url;
if (typeof url !== "string" || !url.startsWith("https://") || /\s/.test(url)) {
  fail('POST.json "url" must be a string starting with "https://" and contain no whitespace');
}

// This entry is an X post, so the URL must actually point at X: a
// well-formed https URL on another domain would otherwise pass the
// checks above and only fail at grading, with no useful error here.
let hostname: string;
try {
  hostname = new URL(url).hostname.toLowerCase();
} catch {
  fail(`POST.json "url" is not a parseable URL: ${url}`);
}
if (hostname !== "x.com" && hostname !== "twitter.com" && !hostname.endsWith(".x.com") && !hostname.endsWith(".twitter.com")) {
  fail(`POST.json "url" must point at x.com, got host "${hostname}"`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() ? process.env.MAKEFUN_OUTPUT_DIR : "out";
fs.mkdirSync(outputDir, { recursive: true });

const destination = path.join(outputDir, "POST.json");
fs.copyFileSync(sourcePath, destination);
console.log(`copied POST.json -> ${destination}`);
