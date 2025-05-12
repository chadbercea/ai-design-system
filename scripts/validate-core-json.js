const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../token-studio-sync-provider/core.json');
const canonPath = path.join(__dirname, '../_docs/DTC.md');

// Parse canonical categories from DTC.md
const dtcText = fs.readFileSync(canonPath, 'utf8');
const canonMatch = dtcText.match(/1\. Every token belongs to one of the canonical categories:[\s\S]*?\n(\s+- .+\n)+/);
let CANONICAL_CATEGORIES = [];
if (canonMatch) {
  CANONICAL_CATEGORIES = canonMatch[0]
    .split('\n')
    .filter(line => line.trim().startsWith('- '))
    .map(line => line.replace('- ', '').trim().toLowerCase());
}

function fail(msg) {
  console.error('❌ Token validation failed:', msg);
  process.exit(1);
}

function pass() {
  console.log('✅ core.json passed validation.');
  process.exit(0);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (e) {
  fail('core.json is not valid JSON.');
}

// Check for presence of all canonical categories
function checkCanonicalPresence(obj) {
  const keys = Object.keys(obj).map(k => k.toLowerCase());
  for (const cat of CANONICAL_CATEGORIES) {
    if (cat === 'color') {
      // For color, check at least one color token exists
      const hasColor = keys.some(k => obj[k] && obj[k].$type === 'color');
      if (!hasColor) fail('No color tokens found at root. Canonical category "color" is missing.');
    } else if (!keys.includes(cat)) {
      // For other categories, check at least one token exists
      const hasCat = keys.includes(cat);
      if (!hasCat) fail(`Canonical category "${cat}" is missing from root.`);
    }
  }
}

// Accept PascalCase or canonical category names
function isCanonicalCategory(key) {
  const lower = key.charAt(0).toLowerCase() + key.slice(1);
  return CANONICAL_CATEGORIES.includes(lower) || CANONICAL_CATEGORIES.includes(key);
}

function checkCategoryKeys(obj, keyPath = []) {
  if (typeof obj !== 'object' || obj === null) return;
  for (const key in obj) {
    if (typeof obj[key] === 'object' && !('$value' in obj[key])) {
      // Improved plural check: only flag as plural if not in canonical list (case-insensitive)
      const lowerKey = key.toLowerCase();
      const canonicalLower = CANONICAL_CATEGORIES.map(c => c.toLowerCase());
      if (key.match(/s$/) && !canonicalLower.includes(lowerKey)) {
        fail(`Category key should be singular at ${[...keyPath, key].join('.')}`);
      }
      // Canonical or PascalCase check
      if (!isCanonicalCategory(key)) {
        fail(`Category key '${key}' is not canonical or PascalCase at ${[...keyPath, key].join('.')}`);
      }
      for (const subkey in obj[key]) {
        if (typeof obj[key][subkey] === 'object' && !('$value' in obj[key][subkey]) && !Array.isArray(obj[key][subkey])) {
          fail(`Double nesting detected at ${[...keyPath, key, subkey].join('.')}`);
        }
      }
      checkCategoryKeys(obj[key], [...keyPath, key]);
    }
  }
}

// Basic T-D-W-P checks
function checkToken(token, keyPath = []) {
  if (typeof token !== 'object' || token === null) return;
  for (const key in token) {
    const value = token[key];
    if (typeof value === 'object' && value !== null && ('$value' in value || '$type' in value)) {
      // Check required properties
      if (!('$value' in value)) fail(`Missing $value at ${[...keyPath, key].join('.')}`);
      if (!('$type' in value)) fail(`Missing $type at ${[...keyPath, key].join('.')}`);
      if (!('$description' in value)) fail(`Missing $description at ${[...keyPath, key].join('.')}`);
      // Check $type is singular
      if (value.$type && value.$type.match(/s$/) && !['alias', 'other', 'borderRadius'].includes(value.$type)) {
        fail(`$type should be singular at ${[...keyPath, key].join('.')}`);
      }
    } else if (typeof value === 'object') {
      checkToken(value, [...keyPath, key]);
    }
  }
}

checkCanonicalPresence(data);
checkCategoryKeys(data);
checkToken(data);
pass(); 