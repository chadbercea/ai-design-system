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
    const description = json[key].description || '';
    if (typeof value === 'string' && value.endsWith('rem')) {
      const px = remToPx(value.replace('rem', ''));
      out[key] = {
        $type: 'breakpoints',
        $value: `${px}px`,
        $description: description || `${px}px breakpoint`
      };
    } else if (!isNaN(value)) {
      out[key] = {
        $type: 'breakpoints',
        $value: `${value}px`,
        $description: description || `${value}px breakpoint`
      };
    }
  }
  return out;
}

function main() {
  const breakpoints = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const extracted = extractBreakpoints(breakpoints);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify({ breakpoints: extracted }, null, 2));
  console.log('breakpoints.generated.json updated with $value as string with px units.');
}

main(); 