const fs = require('fs');
const path = require('path');

const ALLOWED_TYPES = [
  "color", "fontSizes", "fontWeights", "fontFamilies", "lineHeights", "letterSpacing", "borderRadius", "borderWidths", "spacing", "sizing", "opacity", "boxShadow", "typography", "paragraphSpacing", "textCase", "textDecoration", "composition", "dimension", "breakpoints", "border", "zIndex", "duration", "assets", "boolean", "text", "number", "other"
];
const ALLOWED_FIELDS = ["$type", "$value", "$description"];

const inputPath = path.join(__dirname, '../token-studio-sync-provider/core.json');
const outputPath = path.join(__dirname, '../token-studio-sync-provider/core.compliant.json');

function isReference(val) {
  return typeof val === 'string' && /\{.*\}/.test(val);
}

function flattenTokens(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && !Array.isArray(value) && value.$type === undefined) {
      flattenTokens(value, prefix ? `${prefix}.${key}` : key, result);
    } else if (typeof value === 'object' && value.$type) {
      const flatKey = prefix ? `${prefix}.${key}` : key;
      result[flatKey] = { ...value };
    }
  }
  return result;
}

function fixToken(token, key) {
  let changed = false;
  // Remove references in $value
  if (isReference(token.$value)) {
    token.$value = "REPLACE_ME";
    changed = true;
  }
  // Add $description if missing
  if (!token.$description) {
    token.$description = `TODO: Add description for ${key}`;
    changed = true;
  }
  // Remove unknown fields
  for (const k of Object.keys(token)) {
    if (!ALLOWED_FIELDS.includes(k)) {
      delete token[k];
      changed = true;
    }
  }
  // Check $type
  if (!ALLOWED_TYPES.includes(token.$type)) {
    token.$description += ' [INVALID $type]';
    changed = true;
  }
  return changed;
}

function main() {
  const raw = fs.readFileSync(inputPath, 'utf8');
  const json = JSON.parse(raw);
  const flat = flattenTokens(json);
  let changedCount = 0;
  for (const key in flat) {
    if (fixToken(flat[key], key)) changedCount++;
  }
  fs.writeFileSync(outputPath, JSON.stringify(flat, null, 2));
  console.log(`Wrote compliant file to ${outputPath}`);
  console.log(`Tokens changed or flagged: ${changedCount}`);
  console.log('If you see REPLACE_ME, fill in the correct static value.');
}

main(); 