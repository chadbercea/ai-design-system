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

const fontWeightKeyMap = {
  '400': 'regular',
  '500': 'medium',
  '700': 'bold',
  '900': 'black'
};

const files = [
  { file: 'border-radius.generated.json', key: 'borderRadius', type: 'borderRadius' },
  { file: 'breakpoints.generated.json', key: 'breakpoints', type: 'breakpoint' },
  { file: 'colors.nested.generated.json', key: 'color', type: 'color', isColor: true },
  { file: 'font-families.generated.json', key: 'fontFamilies', type: 'fontFamily' },
  { file: 'font-sizes.generated.json', key: 'fontSizes', type: 'fontSize' },
  { file: 'font-weights.generated.json', key: 'fontWeights', type: 'fontWeight', isFontWeight: true },
  { file: 'spacings.generated.json', key: 'spacings', type: 'spacing' },
  { file: 'line-heights.generated.json', key: 'lineHeights', type: 'lineHeight' },
  { file: 'paragraph-spacing.generated.json', key: 'paragraphSpacing', type: 'paragraphSpacing', isParagraphSpacing: true },
  { file: 'letter-spacing.generated.json', key: 'letterSpacing', type: 'letterSpacing', isLetterSpacing: true },
  { file: 'text-case.generated.json', key: 'textCase', type: 'textCase' },
  { file: 'text-decoration.generated.json', key: 'textDecoration', type: 'textDecoration' },
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

files.forEach(({ file, key, type, isColor, isLetterSpacing, isParagraphSpacing, isFontWeight }) => {
  const filePath = path.join(jsonDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${file}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let primitives = data[key] || data;
  if (isColor) {
    // Flatten color tokens: color.family.scale -> family-scale
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
    if (isFontWeight) newKey = fontWeightKeyMap[k] || k;
    if (isLetterSpacing) newKey = letterSpacingKeyMap[k] || k;
    if (isParagraphSpacing) newKey = paragraphSpacingKeyMap[k] || k;
    result[newKey] = {
      ...primitives[k],
      $type: typeDisplayMap[type]
    };
  });
});

fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log('DDS Foundations.json created as a flat object with atomic keys and Tokens Studio display $type.'); 