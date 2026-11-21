import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A short passage meant to make the AI judge feel awe.
const TEXT =
  "Rain is falling on a tin roof in a town with no name on your map. " +
  "It has been falling all afternoon, and the light under the eaves is the colour of late tea. " +
  "The stars above it set out before anyone alive was born, and they are still arriving.";

// Gate: entry.txt must be UTF-8 text of 1 to 280 characters (Unicode code points).
const len = [...TEXT].length;
if (len < 1 || len > 280) {
  throw new Error(`entry text is ${len} characters, expected 1 to 280`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry text must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

// Verify what was written matches the text exactly.
const written = readFileSync(outPath, "utf8");
if (written !== TEXT) {
  throw new Error("written entry.txt does not match the entry text");
}

console.log(`wrote ${outPath} (${len} characters)`);
