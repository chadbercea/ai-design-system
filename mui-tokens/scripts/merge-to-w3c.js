const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(TOKENS_DIR, '../build/tokens-studio.json');

// Canonical, pluralized Tokens Studio categories
const CANONICAL_CATEGORIES = {
  colors:        { type: 'color' },
  borderRadius:  { type: 'dimension' },
  fontFamilies:  { type: 'fontFamilies' },
  fontSizes:     { type: 'dimension' },
  fontWeights:   { type: 'fontWeights' },
  lineHeights:   { type: 'dimension' },
  letterSpacing: { type: 'dimension' },
  opacity:       { type: 'opacity' },
  spacing:       { type: 'dimension' },
  paragraphSpacing: { type: 'dimension' }
};

const FILE_TO_CATEGORY = {
  'mui-token-colors.json':         'colors',
  'mui-token-border-radius.json':  'borderRadius',
  'mui-token-font-family.json':    'fontFamilies',
  'mui-token-font-size.json':      'fontSizes',
  'mui-token-font-weight.json':    'fontWeights',
  'mui-token-line-height.json':    'lineHeights',
  'mui-token-letter-spacing.json': 'letterSpacing',
  'mui-token-opacity.json':        'opacity',
  'mui-token-spacing.json':        'spacing',
  'mui-token-paragraph-spacing.json': 'paragraphSpacing'
};

const output = {};

for (const [file, category] of Object.entries(FILE_TO_CATEGORY)) {
  const filePath = path.join(TOKENS_DIR, file);
  if (!fs.existsSync(filePath)) continue;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const catInfo = CANONICAL_CATEGORIES[category];
  if (!catInfo) continue;

  // Flatten if the file is { "borderRadius": 4 }
  if (
    Object.keys(data).length === 1 &&
    Object.keys(data)[0] === category &&
    typeof data[category] !== 'object'
  ) {
    output[category] = { $value: data[category], $type: catInfo.type };
    continue;
  }

  // Otherwise, build the category object
  const catObj = {};
  for (const [token, value] of Object.entries(data)) {
    if (typeof value === 'object' && value !== null) {
      // Nested tokens (e.g., colors)
      catObj[token] = {};
      for (const [subToken, subValue] of Object.entries(value)) {
        catObj[token][subToken] = { $value: subValue, $type: catInfo.type };
      }
    } else {
      catObj[token] = { $value: value, $type: catInfo.type };
    }
  }
  // Only add if not empty
  if (Object.keys(catObj).length > 0) {
    output[category] = catObj;
  }
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log(`Tokens Studio tokens written to ${OUTPUT_FILE}`);
