const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/font-weights.generated.json');

const fontWeights = {
  "400": {
    "$type": "fontWeights",
    "$value": "400",
    "$description": "Font weight 400 (Regular)"
  },
  "500": {
    "$type": "fontWeights",
    "$value": "500",
    "$description": "Font weight 500 (Semibold)"
  },
  "700": {
    "$type": "fontWeights",
    "$value": "700",
    "$description": "Font weight 700 (Bold)"
  },
  "900": {
    "$type": "fontWeights",
    "$value": "900",
    "$description": "Font weight 900 (Black)"
  }
};

const output = { fontWeights };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Font weight tokens written to ${outputPath}`); 