const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/letter-spacing.generated.json');

const letterSpacing = {
  "0": {
    "$type": "letterSpacing",
    "$value": "0%",
    "$description": "Letter spacing 0%"
  },
  "2": {
    "$type": "letterSpacing",
    "$value": "2%",
    "$description": "Letter spacing 2%"
  },
  "1.5": {
    "$type": "letterSpacing",
    "$value": "1.5%",
    "$description": "Letter spacing 1.5%"
  }
};

const output = { letterSpacing };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Letter spacing tokens written to ${outputPath}`); 