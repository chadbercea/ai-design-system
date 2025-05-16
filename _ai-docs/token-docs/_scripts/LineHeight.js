const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/line-heights.generated.json');

const lineHeights = {
  "100": {
    "$type": "lineHeights",
    "$value": "100%",
    "$description": "Line height 100%"
  }
};

const output = { lineHeights };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Line height tokens written to ${outputPath}`); 