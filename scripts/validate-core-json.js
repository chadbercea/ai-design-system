const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../token-studio-sync-provider/core.json');

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

checkToken(data);
pass(); 