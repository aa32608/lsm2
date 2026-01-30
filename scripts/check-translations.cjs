const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "../src/translations.js"), "utf8");
const keyRe = /^\s{4}([a-zA-Z_][a-zA-Z0-9_]*|"[^"]+")\s*:/gm;
function getKeys(block) {
  const keys = new Set();
  let m;
  keyRe.lastIndex = 0;
  while ((m = keyRe.exec(block)) !== null) {
    const k = m[1].replace(/^"/, "").replace(/"$/, "");
    keys.add(k);
  }
  return keys;
}
const enStart = src.indexOf("  en: {");
const sqStart = src.indexOf("  sq: {");
const mkStart = src.indexOf("  mk: {");
const enBlock = src.slice(enStart, sqStart);
const sqBlock = src.slice(sqStart, mkStart);
const mkBlock = src.slice(mkStart, src.indexOf("};", mkStart));
const enKeys = getKeys(enBlock);
const sqKeys = getKeys(sqBlock);
const mkKeys = getKeys(mkBlock);
const all = new Set([...enKeys, ...sqKeys, ...mkKeys]);
const missingSq = [...all].filter((k) => !sqKeys.has(k));
const missingMk = [...all].filter((k) => !mkKeys.has(k));
const missingEn = [...all].filter((k) => !enKeys.has(k));
console.log("Total keys (union):", all.size);
console.log("Missing in sq:", missingSq.length);
console.log("Missing in mk:", missingMk.length);
console.log("Missing in en:", missingEn.length);
if (missingSq.length) console.log("First 30 missing sq:", missingSq.slice(0, 30).join(", "));
if (missingMk.length) console.log("First 30 missing mk:", missingMk.slice(0, 30).join(", "));
if (missingEn.length) console.log("First 30 missing en:", missingEn.slice(0, 30).join(", "));
