const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../_json/_tocheck.json');
const outDir = path.resolve(__dirname, '../_json');
const outFile = path.join(outDir, 'breakpoints.generated.json');

function remToPx(rem) {
  // 1rem = 16px
  return parseFloat(rem) * 16;
}

function extractBreakpoints(json) {
  const out = {};
  for (const key in json) {
    const value = json[key].value;
    if (typeof value === 'string' && value.endsWith('rem')) {
      out[key] = {
        $type: 'breakpoints',
        value: remToPx(value.replace('rem', ''))
      };
    }
  }
  return out;
}

function main() {
  const breakpoints = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const primitives = extractBreakpoints(breakpoints);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify({ breakpoints: primitives }, null, 2));
  console.log(`Canonical breakpoints exported to ${outFile}`);
}

main(); 