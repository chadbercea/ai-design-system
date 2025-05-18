const fs = require('fs');
const path = require('path');

const jsonDir = path.resolve(__dirname, '../_json');
const outFile = path.join(jsonDir, 'DDS Foundations.json');

const files = [
  { file: 'border-radius.generated.json', wrapper: 'borderRadius' },
  { file: 'breakpoints.generated.json', wrapper: 'breakpoints' },
  { file: 'colors.nested.generated.json', wrapper: 'color', isColor: true },
  { file: 'font-families.generated.json', wrapper: 'fontFamilies' },
  { file: 'font-sizes.generated.json', wrapper: 'fontSizes' },
  { file: 'font-weights.generated.json', wrapper: 'fontWeights' },
  { file: 'spacings.generated.json', wrapper: 'spacings' },
  { file: 'line-heights.generated.json', wrapper: 'lineHeights' },
  { file: 'paragraph-spacing.generated.json', wrapper: 'paragraphSpacing' },
  { file: 'letter-spacing.generated.json', wrapper: 'letterSpacing' },
  { file: 'text-case.generated.json', wrapper: 'textCase' },
  { file: 'text-decoration.generated.json', wrapper: 'textDecoration' },
];

const result = {};

files.forEach(({ file, wrapper, isColor }) => {
  const filePath = path.join(jsonDir, file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${file}`);
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const tokens = data[wrapper] || data;
  if (isColor) {
    result.color = tokens.color || tokens;
    return;
  }
  result[wrapper] = tokens;
});

fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log('DDS Foundations.json created with canonical wrappers and atomic keys, no semantic or invented keys.'); 