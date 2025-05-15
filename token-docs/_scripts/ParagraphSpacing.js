const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/paragraph-spacing.generated.json');

const paragraphSpacing = {
  "0": {
    "$type": "paragraphSpacing",
    "$value": "0",
    "$description": "Paragraph spacing 0"
  }
};

const output = { paragraphSpacing };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Paragraph spacing tokens written to ${outputPath}`); 