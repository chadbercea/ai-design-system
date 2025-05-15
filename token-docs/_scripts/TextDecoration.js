const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/text-decoration.generated.json');

const textDecoration = {
  "none": {
    "$type": "textDecoration",
    "$value": "none",
    "$description": "Text decoration none"
  },
  "underline": {
    "$type": "textDecoration",
    "$value": "underline",
    "$description": "Text decoration underline"
  }
};

const output = { textDecoration };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Text decoration tokens written to ${outputPath}`); 