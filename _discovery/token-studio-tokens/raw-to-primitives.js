const fs = require('fs');
const path = require('path');

// Canonical categories and their $type mapping from The-Design-Token-Codex.txt
const canonicalCategoryTypeMap = {
  Color: 'color',
  Sizing: 'sizing',
  Spacing: 'spacing',
  BorderRadius: 'borderRadius',
  BorderWidth: 'borderWidth',
  Border: 'border',
  Opacity: 'opacity',
  BoxShadow: 'boxShadow',
  Typography: 'typography',
  fontFamilies: 'fontFamilies',
  fontWeights: 'fontWeights',
  LineHeight: 'lineHeight',
  fontSizes: 'fontSizes',
  LetterSpacing: 'letterSpacing',
  ParagraphSpacing: 'paragraphSpacing',
  TextCase: 'textCase',
  TextDecoration: 'textDecoration',
  Composition: 'composition',
  Assets: 'assets',
  Dimension: 'dimension',
  Breakpoints: 'breakpoints',
  Boolean: 'boolean',
  Text: 'text',
  Number: 'number',
  ZIndex: 'zIndex',
  Duration: 'duration',
  Easing: 'easing',
  Direction: 'direction',
  MediaQuery: 'mediaQuery',
  Mixin: 'mixin'
};
const canonicalCategories = Object.keys(canonicalCategoryTypeMap);

// Known semantic/alias patterns to exclude
const semanticPatterns = [
  /^palette\./i,
  /^typography\./i,
  /^breakpoints\./i,
  /^shadows?\./i,
  /^zIndex\./i,
  /^shape\./i,
  /^direction$/i,
  /^mixins?\./i,
  /^transitions?\./i,
  /^action\./i,
  /^common\./i,
  /^background\./i,
  /^divider\./i,
  /^text\./i,
  /^primary\./i,
  /^secondary\./i,
  /^error\./i,
  /^warning\./i,
  /^info\./i,
  /^success\./i,
  /Typography[A-Z]/, // TypographyH1fontFamilies, etc.
  /UnstableSxConfig/, // MUI unstable keys
  /ThemeKey$/
];

function toPascalCase(str) {
  return str
    .replace(/[-_. ]+(.)/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (_, c) => c ? c.toUpperCase() : '');
}

function isReference(val) {
  return typeof val === 'string' && val.startsWith('{') && val.endsWith('}');
}

function isSemanticKey(key) {
  return semanticPatterns.some((pat) => pat.test(key));
}

function isInvalidKey(key) {
  // Exclude ThemeKey, themeKey, unstable_sxConfig (case-insensitive)
  return (
    key === 'ThemeKey' ||
    /themeKey/i.test(key) ||
    /unstable_sxConfig/i.test(key)
  );
}

function getCategoryAndType(key) {
  // Split on dot, dash, underscore, or space
  const segments = key.split(/[.\-_ ]/);
  for (const segment of segments) {
    const category = canonicalCategories.find(
      cat => cat.toLowerCase() === segment.toLowerCase()
    );
    if (category) {
      return {
        category,
        type: canonicalCategoryTypeMap[category],
        tokenName: canonicalCategoryTypeMap[category] === 'color' ? key : toPascalCase(segments[segments.length - 1])
      };
    }
  }
  return null;
}

function areCategoryAndTypeEquivalent(category, $type) {
  // Use codex mapping for equivalence
  return canonicalCategoryTypeMap[category] && canonicalCategoryTypeMap[category].toLowerCase() === $type.toLowerCase();
}

function addPrimitive(primitives, { category, tokenName, value, $type }) {
  primitives[tokenName] = {
    $value: value,
    $type,
    $description: `${category} ${tokenName}`
  };
}

function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-raw.json'), 'utf8'));
  const primitives = {};

  // 1. Colors
  const colorObj = raw.base && raw.base.color ? raw.base.color : {};
  for (const [k, v] of Object.entries(colorObj)) {
    if (/^(palette\.|common\.|action\.)/i.test(k)) continue;
    addPrimitive(primitives, {
      category: 'Color',
      tokenName: k.toLowerCase().replace(/\.a/gi, '.a'),
      value: v,
      $type: 'color'
    });
  }

  // 2. Typography
  const typography = raw.base && raw.base.typography ? raw.base.typography : {};
  if (typography.fontFamilies) {
    addPrimitive(primitives, { category: 'fontFamilies', tokenName: 'Primary', value: typography.fontFamilies, $type: 'fontFamilies' });
  }
  if (typography.fontWeightsLight !== undefined) {
    addPrimitive(primitives, { category: 'fontWeights', tokenName: 'Light', value: typography.fontWeightsLight, $type: 'fontWeights' });
  }
  if (typography.fontWeightsRegular !== undefined) {
    addPrimitive(primitives, { category: 'fontWeights', tokenName: 'Regular', value: typography.fontWeightsRegular, $type: 'fontWeights' });
  }
  if (typography.fontWeightsMedium !== undefined) {
    addPrimitive(primitives, { category: 'fontWeights', tokenName: 'Medium', value: typography.fontWeightsMedium, $type: 'fontWeights' });
  }
  if (typography.fontWeightsBold !== undefined) {
    addPrimitive(primitives, { category: 'fontWeights', tokenName: 'Bold', value: typography.fontWeightsBold, $type: 'fontWeights' });
  }
  // fontSizes, LineHeight, LetterSpacing from h1-h6, subtitle1/2, body1/2, button, caption, overline
  const typestyles = [
    'h1','h2','h3','h4','h5','h6','subtitle1','subtitle2','body1','body2','button','caption','overline'
  ];
  typestyles.forEach(style => {
    const t = typography[style];
    if (!t) return;
    if (t.fontSizes) addPrimitive(primitives, { category: 'fontSizes', tokenName: toPascalCase(style), value: t.fontSizes, $type: 'fontSizes' });
    if (t.lineHeight) addPrimitive(primitives, { category: 'LineHeight', tokenName: toPascalCase(style), value: t.lineHeight, $type: 'lineHeight' });
    if (t.letterSpacing) addPrimitive(primitives, { category: 'LetterSpacing', tokenName: toPascalCase(style), value: t.letterSpacing, $type: 'letterSpacing' });
  });

  // 3. ZIndex
  const other = raw.base && raw.base.other ? raw.base.other : {};
  const zIndexKeys = Object.keys(other).filter(k => k.startsWith('zIndex.'));
  zIndexKeys.forEach(k => {
    const name = k.replace('zIndex.', '');
    addPrimitive(primitives, { category: 'ZIndex', tokenName: toPascalCase(name), value: other[k], $type: 'zIndex' });
  });

  // 4. BorderRadius
  if (other['shape.borderRadius'] !== undefined) {
    addPrimitive(primitives, { category: 'BorderRadius', tokenName: 'Base', value: other['shape.borderRadius'], $type: 'borderRadius' });
  }

  // 5. Durations
  Object.keys(other).filter(k => k.startsWith('transitions.duration.')).forEach(k => {
    const name = k.replace('transitions.duration.', '');
    addPrimitive(primitives, { category: 'Duration', tokenName: toPascalCase(name), value: other[k], $type: 'duration' });
  });

  // 6. Easing
  Object.keys(other).filter(k => k.startsWith('transitions.easing.')).forEach(k => {
    const name = k.replace('transitions.easing.', '');
    addPrimitive(primitives, { category: 'Easing', tokenName: toPascalCase(name), value: other[k], $type: 'easing' });
  });

  // 7. BoxShadows
  if (other.shadows && Array.isArray(other.shadows)) {
    other.shadows.forEach((v, i) => {
      addPrimitive(primitives, { category: 'BoxShadow', tokenName: `Level${i}`, value: v, $type: 'boxShadow' });
    });
  }

  // 8. Breakpoints
  const breakpoints = ['xs','sm','md','lg','xl'];
  breakpoints.forEach(bp => {
    const val = other[`breakpoints.values.${bp}`];
    if (val !== undefined) {
      addPrimitive(primitives, { category: 'Breakpoints', tokenName: toPascalCase(bp), value: val, $type: 'breakpoints' });
    }
  });

  // 9. Opacity
  Object.keys(other).filter(k => k.endsWith('Opacity')).forEach(k => {
    addPrimitive(primitives, { category: 'Opacity', tokenName: toPascalCase(k.replace(/.*\./,'')), value: other[k], $type: 'opacity' });
  });

  // 10. Spacing (if present)
  // Add more extraction logic here if spacing primitives are present in your raw file

  const output = {
    $schema: "https://design-tokens.github.io/design-tokens/schema.json",
    Primitives: primitives
  };
  fs.writeFileSync(
    path.join(__dirname, 'primitives.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Codex-compliant primitives.json generated.');
}

main();
