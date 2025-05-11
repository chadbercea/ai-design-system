const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../build/mui-set.json');
const outputPath = path.join(__dirname, 'tokens-studio.json');

// Read the entire MUI set object
const muiSet = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Write the entire object, preserving the MUI wrapper
fs.writeFileSync(outputPath, JSON.stringify(muiSet, null, 2));
console.log(`Tokens written to ${outputPath}`);
