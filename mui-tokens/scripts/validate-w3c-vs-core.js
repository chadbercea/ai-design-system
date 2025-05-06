const fs = require('fs');
const path = require('path');
const deepEqual = require('fast-deep-equal'); // npm install fast-deep-equal

const w3cPath = path.join(__dirname, '../w3c-tokens.json');
const corePath = path.join(__dirname, '../../token-studio-sync-provider/core.json');

const w3c = JSON.parse(fs.readFileSync(w3cPath, 'utf-8'));
const core = JSON.parse(fs.readFileSync(corePath, 'utf-8'));

// Recursively compare keys and structure
function compareKeys(a, b, prefix = '') {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  let ok = true;

  for (const key of aKeys) {
    if (!(key in b)) {
      console.error(`Key "${prefix}${key}" missing in core.json`);
      ok = false;
    } else if (typeof a[key] === 'object' && typeof b[key] === 'object') {
      ok = compareKeys(a[key], b[key], `${prefix}${key}.`) && ok;
    }
  }
  for (const key of bKeys) {
    if (!(key in a)) {
      console.error(`Key "${prefix}${key}" missing in w3c-tokens.json`);
      ok = false;
    }
  }
  return ok;
}

const structureMatch = compareKeys(w3c, core) && compareKeys(core, w3c);

if (!structureMatch) {
  console.error('❌ Structure or keys do not match between w3c-tokens.json and core.json.');
  process.exit(1);
}

if (!deepEqual(w3c, core)) {
  console.warn('⚠️  Structures match, but values differ. Review before overwriting.');
} else {
  console.log('✅ w3c-tokens.json and core.json are a 1:1 match.');
}
