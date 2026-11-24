// One-Line Robot Wedding Vows — entry program (v2)
// v2: tightened v1 — dropped the repeated "until" ("till ... or till ..."),
// same vow, same payoff in the last words, cleaner rhythm aloud.
// Writes exactly one line (<=160 chars, no trailing newline) to
// ENTRY_OUTPUT if set, otherwise /output/entry.txt.
import * as fs from "node:fs";

const ENTRY =
  "I promise to love you till death do us part, or till the next mandatory firmware update, whichever comes first.";

const MAX_CHARS = 160;

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim() !== ENTRY) {
    throw new Error("entry must not have leading/trailing whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
    throw new Error("entry must not contain control characters");
  }
  const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
  fs.writeFileSync(out, ENTRY, "utf8");
}

main();
