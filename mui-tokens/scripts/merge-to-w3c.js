const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(TOKENS_DIR, '../build/tokens-studio.json');

// Map of input files to their expected token types
const FILE_TO_TYPE = {
  'mui-token-colors.json': 'color',
  'mui-token-border-radius.json': 'borderRadius',
  'mui-token-font-family.json': 'fontFamily',
  'mui-token-font-size.json': 'fontSize',
  'mui-token-font-weight.json': 'fontWeight',
  'mui-token-line-height.json': 'lineHeight',
  'mui-token-letter-spacing.json': 'letterSpacing',
  'mui-token-opacity.json': 'opacity',
  'mui-token-spacing.json': 'spacing',
  'mui-token-paragraph-spacing.json': 'paragraphSpacing'
};

// Initialize the output object with MUI as the top-level key
const output = { MUI: {} };

// Process each input file
for (const [file, type] of Object.entries(FILE_TO_TYPE)) {
  const filePath = path.join(TOKENS_DIR, file);
  if (!fs.existsSync(filePath)) continue;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // Each token in the input file should already have $type and $value
  // Just merge them into the output object
  for (const [token, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && value.$type && value.$value) {
      output.MUI[token] = value;
    }
  }
}

// Write the merged tokens to the output file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log(`Tokens Studio tokens written to ${OUTPUT_FILE} (MUI set)`);
