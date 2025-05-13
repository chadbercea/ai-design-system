const fs = require('fs');
const path = require('path');

const themePath = path.join(__dirname, '../token-studio-sync-provider/theme.json');
const corePath = path.join(__dirname, '../token-studio-sync-provider/core.json');

const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));
const core = JSON.parse(fs.readFileSync(corePath, 'utf8'));

// Build a set of all valid token keys in core.json
const validKeys = new Set(Object.keys(core));

// Recursively find all {token.references} in an object
function findReferences(obj, refs = []) {
  if (typeof obj === 'string') {
    const matches = obj.match(/\{([^}]+)\}/g);
    if (matches) {
      matches.forEach(m => refs.push(m.slice(1, -1)));
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(item => findReferences(item, refs));
  } else if (typeof obj === 'object' && obj !== null) {
    Object.values(obj).forEach(v => findReferences(v, refs));
  }
  return refs;
}

const allRefs = findReferences(theme);
const uniqueRefs = Array.from(new Set(allRefs));

const broken = uniqueRefs.filter(ref => !validKeys.has(ref));

if (broken.length) {
  console.log('Broken references:');
  broken.forEach(ref => console.log('  -', ref));
} else {
  console.log('All references are valid!');
}
console.log(`\nChecked ${uniqueRefs.length} unique references. Broken: ${broken.length}`); 