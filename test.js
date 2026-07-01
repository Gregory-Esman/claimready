// Zero-dependency smoke test for ClaimReady.
// Verifies the checklist data is structurally sound: 4 coverage types, each with
// a label + emoji + >=3 items, and every item is a [label, why-it-matters] pair
// with non-trivial text. Run: node test.js
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

// Extract the inline DATA object literal (between `const DATA = ` and `const order`).
const startTok = "const DATA = ";
const start = html.indexOf(startTok);
const end = html.indexOf("\nconst order");
if (start === -1 || end === -1) fail("could not locate DATA object in index.html");
const src = html.slice(start + startTok.length, end).trim().replace(/;$/, "");
let DATA;
try {
  DATA = new Function("return " + src)();
} catch (e) {
  fail("DATA object did not parse: " + e.message);
}

const order = ["valuables", "renters", "auto", "travel"];
let items = 0;

for (const key of order) {
  const d = DATA[key];
  if (!d) fail(`missing coverage type: ${key}`);
  if (!d.label || d.label.length < 3) fail(`missing/short label: ${key}`);
  if (!d.emoji) fail(`missing emoji: ${key}`);
  if (!Array.isArray(d.items) || d.items.length < 3) fail(`too few items in ${key}`);
  for (const it of d.items) {
    if (!Array.isArray(it) || it.length !== 2) fail(`bad item shape in ${key}`);
    if (!it[0] || it[0].length < 8) fail(`empty/short item label in ${key}: ${JSON.stringify(it[0])}`);
    if (!it[1] || it[1].length < 20) fail(`empty/short "why" in ${key}: ${JSON.stringify(it[0])}`);
    items++;
  }
}

// Sanity: core UI wiring present.
for (const needed of ["localStorage", "Why it matters", "window.print", "progfill",
                      "emailMe", "WAITLIST_ENDPOINT", "privacy.html", "terms.html"]) {
  if (!html.includes(needed)) fail(`expected UI wiring not found: ${needed}`);
}

// Legal pages exist and are non-trivial.
for (const page of ["privacy.html", "terms.html"]) {
  const p = path.join(__dirname, page);
  if (!fs.existsSync(p)) fail(`missing page: ${page}`);
  if (fs.readFileSync(p, "utf8").length < 800) fail(`page too small: ${page}`);
}
// No placeholder junk shipped.
for (const bad of ["lorem", "TODO", "FIXME", "undefined<"]) {
  if (html.toLowerCase().includes(bad.toLowerCase())) fail(`placeholder/junk found: ${bad}`);
}

console.log(`PASS: ${order.length} coverage types, ${items} checklist items, all with label + why; UI wiring present.`);
process.exit(0);

function fail(msg) {
  console.error("FAIL: " + msg);
  process.exit(1);
}
