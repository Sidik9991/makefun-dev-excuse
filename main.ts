// Make the AI Judge Laugh: Developer Excuses
// Holds candidate one-line developer excuses, scores each against the
// judge's five criteria (weights 5/4/3/2/1), writes the winner to
// /output/entry.txt and validates the gate (UTF-8, 1-200 chars, one line).

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

// Criteria, in the judge's order:
// 1 funny on-subject excuse (x5)
// 2 twist a developer recognises, reveals what really happened (x4)
// 3 sounds like a developer would actually say it, jargon right (x3)
// 4 lands fast, every word earns its place (x2)
// 5 fresh, or a worn excuse turned in a new way (x1)
// Each scored 0-2; weighted max = 2*(5+4+3+2+1) = 30.
const WEIGHTS = [5, 4, 3, 2, 1];

const candidates = [
  {
    line: "The cache wasn't stale. The cache was the only copy. We called it cache so nobody would back it up.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    line: "It's not DNS. There's no way it's DNS. It was DNS, and I'm the one who changed the record.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    line: "The rollback worked perfectly. Unfortunately we rolled back the database, not the code.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    line: "I didn't push on a Friday. I pushed on a Thursday and the bug respected the weekend.",
    scores: [2, 1, 2, 2, 2],
  },
  {
    line: "The feature flag did exactly what it was told. I told it the wrong thing, in writing, with a comment explaining why.",
    scores: [2, 2, 2, 1, 1],
  },
  {
    line: "Prod didn't crash. It read the code, understood it, and declined.",
    scores: [1, 1, 2, 2, 1],
  },
  {
    line: "It's not a memory leak. The server is retaining everything in case legal asks.",
    scores: [1, 1, 2, 2, 1],
  },
];

function weighted(c) {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(list) {
  let best = null;
  for (const c of list) {
    const total = weighted(c);
    const bytes = Buffer.byteLength(c.line, "utf8");
    if (
      best === null ||
      total > best.total ||
      (total === best.total && bytes < best.bytes)
    ) {
      best = { ...c, total, bytes };
    }
  }
  return best;
}

const winner = pickWinner(candidates);

for (const c of candidates) {
  console.log(`${weighted(c)}/30  ${c.line}`);
}
console.log(`\nWinner (${winner.total}/30, ${winner.bytes} bytes): ${winner.line}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line + "\n", "utf8");

// Gate validation: re-read and check UTF-8, 1-200 chars, non-blank, one line.
const text = readFileSync("/output/entry.txt", "utf8");
const body = text.endsWith("\n") ? text.slice(0, -1) : text;
const chars = [...body].length;
if (body.includes("\n") || body.includes("\r")) {
  throw new Error("GATE FAIL: entry is not exactly one line");
}
if (chars < 1 || chars > 200) {
  throw new Error(`GATE FAIL: ${chars} chars, outside 1-200`);
}
if (body.trim().length === 0) {
  throw new Error("GATE FAIL: entry is blank");
}
console.log(`GATE PASS: 1 line, ${chars} chars, ${winner.bytes} bytes -> /output/entry.txt`);
