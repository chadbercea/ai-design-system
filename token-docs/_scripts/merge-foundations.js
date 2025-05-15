const fs = require('fs');
const path = require('path');

const jsonDir = path.resolve(__dirname, '../_json');
const outFile = path.join(jsonDir, 'DDS Foundations.json');

// Mapping for $type display names for Tokens Studio
const typeDisplayMap = {
  borderRadius: 'Border Radius',
  breakpoint: 'Breakpoint',
  color: 'Color',
  fontFamily: 'Font Family',
  fontSize: 'Font Size',
  fontWeight: 'Font Weight',
  spacing: 'Spacing',
  lineHeight: 'Line Height',
  paragraphSpacing: 'Paragraph Spacing',
  letterSpacing: 'Letter Spacing',
  textCase: 'Text Case',
  textDecoration: 'Text Decoration'
};

const files = [
  { file: 'border-radius.generated.json', key: 'borderRadius', outKey: 'borderRadius' },
  { file: 'breakpoints.generated.json', key: 'breakpoints', outKey: 'breakpoint' },
  { file: 'colors.nested.generated.json', key: 'color', outKey: 'color', isColor: true },
  { file: 'font-families.generated.json', key: 'fontFamilies', outKey: 'fontFamily' },
  { file: 'font-sizes.generated.json', key: 'fontSizes', outKey: 'fontSize' },
  { file: 'font-weights.generated.json', key: 'fontWeights', outKey: 'fontWeight' },
  { file: 'spacings.generated.json', key: 'spacings', outKey: 'spacing' },
  { file: 'line-heights.generated.json', key: 'lineHeights', outKey: 'lineHeight' },
  { file: 'paragraph-spacing.generated.json', key: 'paragraphSpacing', outKey: 'paragraphSpacing', isParagraphSpacing: true },
  { file: 'letter-spacing.generated.json', key: 'letterSpacing', outKey: 'letterSpacing', isLetterSpacing: true },
  { file: 'text-case.generated.json', key: 'textCase', outKey: 'textCase' },
  { file: 'text-decoration.generated.json', key: 'textDecoration', outKey: 'textDecoration' },
];

const letterSpacingKeyMap = {
  '0': 'default',
  '1.5': 'tight',
  '2': 'wide'
};
const paragraphSpacingKeyMap = {
  '0': 'none'
};

const result = {};

files.forEach(({ file, key, outKey, isColor, isLetterSpacing, isParagraphSpacing }) => {
  const filePath = path.join(jsonDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${file}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let primitives = data[key] || data;
  if (isColor) {
    // Flatten color tokens: color.family.scale -> color-family-scale
    Object.keys(primitives).forEach(family => {
      Object.keys(primitives[family]).forEach(scale => {
        const flatKey = `${family}-${scale}`;
        result[flatKey] = {
          ...primitives[family][scale],
          $type: typeDisplayMap['color']
        };
      });
    });
    return;
  }
  Object.keys(primitives).forEach(k => {
    let newKey = k;
    if (isLetterSpacing) newKey = letterSpacingKeyMap[k] || k;
    if (isParagraphSpacing) newKey = paragraphSpacingKeyMap[k] || k;
    result[newKey] = {
      ...primitives[k],
      $type: typeDisplayMap[outKey]
    };
  });
});

fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log('DDS Foundations.json created as a flat object with Tokens Studio display $type and atomic keys.'); 