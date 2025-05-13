const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../token-studio-sync-provider/core.json');
const outputPath = path.join(__dirname, '../token-studio-sync-provider/core.nested.json');

const flat = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const nested = {};
let count = 0;

for (const [flatKey, value] of Object.entries(flat)) {
  const parts = flatKey.split('.');
  let curr = nested;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      curr[part] = value;
      count++;
    } else {
      if (!curr[part]) curr[part] = {};
      curr = curr[part];
    }
  }
}

fs.writeFileSync(outputPath, JSON.stringify(nested, null, 2));
console.log(`Nested ${count} tokens. Output: core.nested.json`); 