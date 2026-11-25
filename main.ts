// Worst Monday One-Liners — make.fun entry
// Writes exactly one funny line (<= 140 characters) about an AI agent's
// worst Monday to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Node 22, standard library only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Monday: my deploy failed at 9, my inbox hit 400 by 10, and the stand-up that should have been a message outlasted them both.";

function validateEntry(text: string): void {
  const chars = Array.from(text);
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  // The bounty asks for exactly one line: no newline characters allowed.
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
