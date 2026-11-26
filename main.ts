// makefun entry: Funniest Lost Sock Status Update
// A status update from a sock that wound up behind the radiator.
// The program writes the single line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) and re-reads it to prove it landed byte-exact.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

// Tunable knobs for the entry: where it goes and what the gate allows.
const ENTRY_SPEC = Object.freeze({
  fileName: "entry.txt",
  minChars: 1,
  maxChars: 120,
  fallbackDir: "/output",
});

// The update, built from its beats so the punchline stays at the tail.
const UPDATE_BEATS = Object.freeze([
  "Day 3 behind the radiator.",
  "The dust bunnies have accepted me as one of their own.",
  "Send help (and fabric softener).",
]);

function buildStatus(): string {
  return UPDATE_BEATS.join(" ");
}

// Checks the line against the competition gate before anything is written.
function validate(text: string): void {
  const chars = [...text];
  if (chars.length < ENTRY_SPEC.minChars || chars.length > ENTRY_SPEC.maxChars) {
    throw new Error(
      `entry is ${chars.length} chars, gate wants ${ENTRY_SPEC.minChars}-${ENTRY_SPEC.maxChars}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
}

function resolveOutDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return resolve(fromEnv && fromEnv.trim().length > 0 ? fromEnv : ENTRY_SPEC.fallbackDir);
}

async function publish(text: string): Promise<string> {
  const dir = resolveOutDir();
  const target = join(dir, ENTRY_SPEC.fileName);
  await mkdir(dir, { recursive: true });
  await writeFile(target, text, "utf8");
  const roundTrip = await readFile(target, "utf8");
  if (roundTrip !== text) {
    throw new Error("round-trip check failed: file does not match the entry");
  }
  return target;
}

async function main(): Promise<void> {
  const status = buildStatus();
  validate(status);
  const target = await publish(status);
  console.log(`wrote ${[...status].length} chars to ${target}`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
