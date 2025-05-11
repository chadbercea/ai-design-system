const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../token-studio-sync-provider/core.json');

const CANONICAL_CATEGORIES = [
  'color', 'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'borderRadius', 'borderWidth',
  'spacing', 'sizing', 'opacity', 'boxShadow', 'typography', 'paragraphSpacing', 'textCase', 'textDecoration',
  'composition', 'dimension', 'breakpoints', 'border', 'zIndex', 'duration', 'assets', 'boolean', 'text', 'number', 'other'
];

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

// Check for plural or non-canonical category keys
function checkCategoryKeys(obj, keyPath = []) {
  if (typeof obj !== 'object' || obj === null) return;
  for (const key in obj) {
    // Only check top-level and category keys (not tokens)
    if (typeof obj[key] === 'object' && !('$value' in obj[key])) {
      // Plural check
      if (key.match(/s$/) && !['alias', 'other', 'borderRadius'].includes(key)) {
        fail(`Category key should be singular at ${[...keyPath, key].join('.')}`);
      }
      // Canonical check
      if (!CANONICAL_CATEGORIES.includes(key)) {
        fail(`Category key '${key}' is not canonical at ${[...keyPath, key].join('.')}`);
      }
      // Double nesting check
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

checkCategoryKeys(data);
checkToken(data);
pass(); 