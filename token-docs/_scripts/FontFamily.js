// Canonical FontFamily primitives will be documented or exported here. 

const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/font-families.generated.json');

const fontFamilies = {
  "poppins": {
    "$type": "fontFamilies",
    "$value": "Poppins",
    "$description": "Poppins font family"
  },
  "inter": {
    "$type": "fontFamilies",
    "$value": "Inter",
    "$description": "Inter font family"
  },
  "roboto-mono": {
    "$type": "fontFamilies",
    "$value": "Roboto Mono",
    "$description": "Roboto Mono font family"
  }
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(fontFamilies, null, 2));
console.log(`Font family tokens written to ${outputPath}`); 