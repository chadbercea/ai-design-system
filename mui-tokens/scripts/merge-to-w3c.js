const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(TOKENS_DIR, 'w3c-tokens.json');

// Map file name patterns to W3C categories/types
const CATEGORY_MAP = {
  'colors': { w3c: 'color', type: 'color' },
  'border-radius': { w3c: 'radius', type: 'dimension' },
  'dimension': { w3c: 'dimension', type: 'dimension' },
  'font-family': { w3c: 'fontFamily', type: 'fontFamily' },
  'font-weight': { w3c: 'fontWeight', type: 'fontWeight' },
  'font-size': { w3c: 'fontSize', type: 'dimension' },
  'letter-spacing': { w3c: 'letterSpacing', type: 'dimension' },
  'line-height': { w3c: 'lineHeight', type: 'dimension' },
  'opacity': { w3c: 'opacity', type: 'opacity' },
  'paragraph-spacing': { w3c: 'paragraphSpacing', type: 'dimension' },
  'spacing': { w3c: 'spacing', type: 'dimension' }
};

const files = fs.readdirSync(TOKENS_DIR).filter(
  f => f.startsWith('mui-token-') && f.endsWith('.json')
);

const w3cTokens = {};

for (const file of files) {
  const match = file.match(/^mui-token-(.+)\.json$/);
  if (!match) continue;
  const catKey = match[1];
  const map = CATEGORY_MAP[catKey];
  if (!map) continue;

  const data = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, file), 'utf-8'));
  if (!w3cTokens[map.w3c]) w3cTokens[map.w3c] = {};

  for (const [token, value] of Object.entries(data)) {
    // If value is an object (e.g., color shades), flatten one level
    if (typeof value === 'object' && !Array.isArray(value)) {
      w3cTokens[map.w3c][token] = {};
      for (const [subToken, subValue] of Object.entries(value)) {
        w3cTokens[map.w3c][token][subToken] = { $value: subValue, $type: map.type };
      }
    } else {
      w3cTokens[map.w3c][token] = { $value: value, $type: map.type };
    }
  }
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(w3cTokens, null, 2));
console.log(`W3C tokens written to ${OUTPUT_FILE}`);
