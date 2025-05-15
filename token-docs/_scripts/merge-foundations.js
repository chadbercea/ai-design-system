const fs = require('fs');
const path = require('path');

const jsonDir = path.resolve(__dirname, '../_json');
const outFile = path.join(jsonDir, 'DDS Foundations.json');

// Explicit mapping for top-level keys and $type plural values
const files = [
  { file: 'border-radius.generated.json', key: 'borderRadius', outKey: 'borderRadius', typePlural: 'borderRadii' },
  { file: 'breakpoints.generated.json', key: 'breakpoints', outKey: 'breakpoint', typePlural: 'breakpoints', isBreakpoint: true },
  { file: 'colors.nested.generated.json', key: 'color', outKey: 'color', typePlural: 'colors', isColor: true },
  { file: 'font-families.generated.json', key: 'fontFamilies', outKey: 'fontFamily', typePlural: 'fontFamilies' },
  { file: 'font-sizes.generated.json', key: 'fontSizes', outKey: 'fontSize', typePlural: 'fontSizes' },
  { file: 'font-weights.generated.json', key: 'fontWeights', outKey: 'fontWeight', typePlural: 'fontWeights' },
  { file: 'spacings.generated.json', key: 'spacings', outKey: 'spacing', typePlural: 'spacings' },
  { file: 'line-heights.generated.json', key: 'lineHeights', outKey: 'lineHeight', typePlural: 'lineHeights' },
  { file: 'paragraph-spacing.generated.json', key: 'paragraphSpacing', outKey: 'paragraphSpacing', typePlural: 'paragraphSpacings', isParagraphSpacing: true },
  { file: 'letter-spacing.generated.json', key: 'letterSpacing', outKey: 'letterSpacing', typePlural: 'letterSpacings', isLetterSpacing: true },
  { file: 'text-case.generated.json', key: 'textCase', outKey: 'textCase', typePlural: 'textCases' },
  { file: 'text-decoration.generated.json', key: 'textDecoration', outKey: 'textDecoration', typePlural: 'textDecorations' },
];

// Atomic key mapping for letterSpacing and paragraphSpacing
const letterSpacingKeyMap = {
  '0': 'default',
  '1.5': 'tight',
  '2': 'wide'
};
const paragraphSpacingKeyMap = {
  '0': 'none'
};

const result = {};

files.forEach(({ file, key, outKey, typePlural, isColor, isLetterSpacing, isParagraphSpacing, isBreakpoint }) => {
  const filePath = path.join(jsonDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${file}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let primitives = data[key] || data;
  if (isColor) {
    result[outKey] = primitives;
    return;
  }
  const fixed = {};
  Object.keys(primitives).forEach(k => {
    let newKey = k;
    let primitive = { ...primitives[k], $type: typePlural };
    if (isLetterSpacing) newKey = letterSpacingKeyMap[k] || k;
    if (isParagraphSpacing) newKey = paragraphSpacingKeyMap[k] || k;
    if (isBreakpoint) {
      // Remove 'value', add $value as string with px
      if (primitive.value !== undefined) {
        primitive.$value = `${primitive.value}px`;
        delete primitive.value;
      }
    }
    fixed[newKey] = primitive;
  });
  result[outKey] = fixed;
});

fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log('DDS Foundations.json created with canonical singular keys, DTCG/TS plural $type, atomic keys for letterSpacing/paragraphSpacing, and px string $value for breakpoints.'); 