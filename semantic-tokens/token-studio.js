const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../build/mui-set.json');
const outputPath = path.join(__dirname, 'tokens-studio.json');

// Read the MUI set
const muiSet = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
const tokens = muiSet.MUI;

const result = {};

for (const [key, value] of Object.entries(tokens)) {
  if (value && typeof value === 'object' && value.$type) {
    const newKey = `${value.$type}.${key}`;
    result[newKey] = value;
  }
}

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(`Semantic tokens written to ${outputPath}`);
