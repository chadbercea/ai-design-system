const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/text-case.generated.json');

const textCase = {
  "capitalize": {
    "$type": "textCase",
    "$value": "capitalize",
    "$description": "Text case capitalize"
  },
  "none": {
    "$type": "textCase",
    "$value": "none",
    "$description": "Text case none"
  },
  "uppercase": {
    "$type": "textCase",
    "$value": "uppercase",
    "$description": "Text case uppercase"
  }
};

const output = { textCase };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Text case tokens written to ${outputPath}`); 