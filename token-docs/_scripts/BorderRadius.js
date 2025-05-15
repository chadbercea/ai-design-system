// Canonical BorderRadius primitives will be documented or exported here. 

const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../_json/_tocheck.json');
const outDir = path.resolve(__dirname, '../_json');
const outFile = path.join(outDir, 'border-radius.generated.json');

function remToPx(rem) {
  // 1rem = 16px
  return parseFloat(rem) * 16;
}

function extractBorderRadius(json) {
  const out = {};
  for (const key in json) {
    const value = json[key].value;
    if (typeof value === 'string' && value.endsWith('rem')) {
      const px = remToPx(value.replace('rem', ''));
      const atomicKey = px === 0 ? 'none' : String(px).replace(/\.0$/, '');
      out[atomicKey] = {
        $type: 'borderRadius',
        $value: `${px === 0 ? 0 : px}px`
      };
    }
  }
  return out;
}

function main() {
  const borderRadius = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const primitives = extractBorderRadius(borderRadius);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify({ borderRadius: primitives }, null, 2));
  console.log(`Canonical border radius exported to ${outFile}`);
}

main(); 