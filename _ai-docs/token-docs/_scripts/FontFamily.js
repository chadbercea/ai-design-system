// Canonical FontFamily primitives will be documented or exported here. 

const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/font-families.generated.json');

const fontFamilies = {
  "poppins": {
    "$type": "Font Family",
    "$value": "Poppins",
    "$description": "Primary display font for marketing and headings"
  },
  "inter": {
    "$type": "Font Family",
    "$value": "Inter",
    "$description": "Primary UI font for body text and interface elements"
  },
  "roboto": {
    "$type": "Font Family",
    "$value": "Roboto",
    "$description": "Primary system font for fallback and legacy support"
  },
  "robotoMono": {
    "$type": "Font Family",
    "$value": "Roboto Mono",
    "$description": "Monospace font for code and technical content"
  }
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(fontFamilies, null, 2));
console.log(`Font family tokens written to ${outputPath}`); 