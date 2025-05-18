const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../_json/font-sizes.generated.json');

// Mapping from Figma image: font size px -> Material.io counterpart
const materialMap = {
  "48": "Headline 1",
  "40": "Headline 2",
  "32": "Headline 5",
  "24": "Headline 6",
  "21": "Headline 3",
  "18": "Headline 4",
  "16": "Subtitle 1",
  "14": "Body 1",
  "12": "Body 2",
  "10": "Caption"
};

const fontSizes = {};
["48", "40", "32", "24", "21", "18", "16", "14", "12", "10"].forEach(size => {
  fontSizes[size] = {
    "$type": "fontSizes",
    "$value": `${size}px`,
    "$description": `Font size ${size}px (Material.io: ${materialMap[size]})`
  };
});

const output = { fontSizes };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Font size tokens written to ${outputPath}`); 