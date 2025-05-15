const fs = require('fs');
const path = require('path');

const jsonDir = path.resolve(__dirname, '../_json');
const outFile = path.join(jsonDir, 'DDS Foundations.json');

const files = [
  { file: 'border-radius.generated.json', key: 'borderRadius' },
  { file: 'breakpoints.generated.json', key: 'breakpoints' },
  { file: 'colors.nested.generated.json', key: 'color' },
  { file: 'font-families.generated.json', key: 'fontFamilies' },
  { file: 'font-sizes.generated.json', key: 'fontSizes' },
  { file: 'font-weights.generated.json', key: 'fontWeights' },
  { file: 'spacings.generated.json', key: 'spacings' },
  { file: 'line-heights.generated.json', key: 'lineHeights' },
  { file: 'paragraph-spacing.generated.json', key: 'paragraphSpacing' },
  { file: 'letter-spacing.generated.json', key: 'letterSpacing' },
  { file: 'text-case.generated.json', key: 'textCase' },
  { file: 'text-decoration.generated.json', key: 'textDecoration' },
];

const result = {};

files.forEach(({ file, key }) => {
  const filePath = path.join(jsonDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${file}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  // If the file's top-level key matches the canonical key, extract its value
  if (data[key]) {
    result[key] = data[key];
  } else if (key === 'color' && data['color']) {
    result[key] = data['color'];
  } else {
    // Otherwise, use the whole object (for flat files like fontFamilies)
    result[key] = data;
  }
});

fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log('DDS Foundations.json created successfully!'); 