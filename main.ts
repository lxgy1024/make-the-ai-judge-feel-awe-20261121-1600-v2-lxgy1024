import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "All afternoon the rain has been falling on a tin roof in a town no map has ever named. " +
  "Under the eaves the light is the colour of tea gone cold and late. " +
  "Above the roof, the stars began their journey before anyone living was born, and they are still on their way here.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const outFile = join(outDir, "entry.txt");

const chars = [...TEXT].length;
if (chars < 1 || chars > 280) {
  throw new Error(`entry must be 1-280 characters, got ${chars}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, TEXT, "utf8");
console.log(`wrote ${outFile}: ${chars} characters`);

// Read the file back and make sure it holds exactly the passage above.
const back = readFileSync(outFile, "utf8");
if (back !== TEXT) {
  throw new Error("read-back mismatch: entry.txt does not match the passage");
}
console.log("read-back verified: entry.txt matches exactly");
