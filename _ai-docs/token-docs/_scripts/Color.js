// Canonical Color primitives will be documented or exported here. 

const fs = require('fs');
const path = require('path');

const flatColorsPath = path.resolve(__dirname, '../_json/colors.generated.json');
const outDir = path.resolve(__dirname, '../_json');
const outPalette = path.join(outDir, 'colors.nested.generated.json');

function toNested(flatColors) {
  const nested = {};
  for (const dashedKey in flatColors) {
    // Split dashed key into family and scale (e.g., 'grey-50' => 'grey', '50')
    const match = dashedKey.match(/^([a-zA-Z]+)-([\da-zA-Z]+)$/);
    if (!match) continue;
    const [, family, scale] = match;
    if (!nested[family]) nested[family] = {};
    const { $type, value, $description } = flatColors[dashedKey];
    nested[family][scale] = {
      $type,
      $value: value,
      $description
    };
  }
  return nested;
}

function main() {
  const flat = JSON.parse(fs.readFileSync(flatColorsPath, 'utf8'));
  const flatColors = flat.colors;
  const nestedColors = toNested(flatColors);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPalette, JSON.stringify({ color: nestedColors }, null, 2));
  console.log(`Nested color tokens written to ${outPalette}`);
}

main(); 