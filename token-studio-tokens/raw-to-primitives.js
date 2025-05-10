const fs = require('fs');
const path = require('path');

// Canonical categories from the overview (PascalCase)
const canonicalCategories = [
  'Color', 'Sizing', 'Spacing', 'BorderRadius', 'BorderWidth', 'Border', 'Opacity', 'BoxShadow', 'Typography',
  'FontFamily', 'FontWeight', 'LineHeight', 'FontSize', 'LetterSpacing', 'ParagraphSpacing', 'TextCase',
  'TextDecoration', 'Composition', 'Assets', 'Dimension', 'Breakpoints', 'Boolean', 'Text', 'Number', 'ZIndex'
];

// Canonical type mapping for Tokens Studio
const canonicalTypeMap = {
  FontSize: 'fontSizes',
  FontWeight: 'fontWeights',
  FontFamily: 'fontFamilies',
  LineHeight: 'lineHeights',
  LetterSpacing: 'letterSpacing',
  Color: 'color',
  BorderRadius: 'borderRadius',
  BorderWidth: 'borderWidth',
  Spacing: 'spacing',
  Sizing: 'sizing',
  Opacity: 'opacity',
  Typography: 'typography',
  BoxShadow: 'boxShadow',
  ZIndex: 'zIndex',
  Breakpoints: 'breakpoints',
  Boolean: 'boolean',
  Text: 'text',
  Number: 'number',
  ParagraphSpacing: 'paragraphSpacing',
  TextCase: 'textCase',
  TextDecoration: 'textDecoration',
  Composition: 'composition',
  Assets: 'assets',
  Dimension: 'dimension',
  Border: 'border',
};

// Utility: PascalCase
function toPascalCase(str) {
  return str
    .replace(/[-_. ]+(.)/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (_, c) => c ? c.toUpperCase() : '');
}

// Utility: Lowercase dot notation for color keys
function toColorDotCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1.$2').replace(/[-_ ]+/g, '.').toLowerCase();
}

const semanticPrefixes = [
  'palette.', 'common.', 'action.', 'background.', 'divider.', 'text.', 'primary.', 'secondary.', 'error.', 'warning.', 'info.', 'success.'
];

function findCanonicalCategory(segments) {
  for (const seg of segments) {
    for (const cat of canonicalCategories) {
      if (seg.toLowerCase() === cat.toLowerCase()) {
        return cat;
      }
    }
  }
  return null;
}

function getTypeForCategory(category) {
  return canonicalTypeMap[category] || category.toLowerCase();
}

function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-raw.json'), 'utf8'));
  const primitives = {};
  const skipped = [];

  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    for (const tokenKey in baseObj) {
      if (semanticPrefixes.some(prefix => tokenKey.startsWith(prefix))) continue;
      const value = baseObj[tokenKey];
      if (typeof value !== 'string' && typeof value !== 'number') continue;
      // Color tokens: use flat key logic, dot.case, no wrapping
      if (baseKey.toLowerCase() === 'color') {
        // Only allow dot.case color keys
        let name = tokenKey;
        // Convert camelCase or PascalCase to dot.case
        if (!name.includes('.')) {
          name = name.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
        }
        name = name.replace(/_/g, '.');
        primitives[name] = {
          $value: value,
          $type: 'color',
          $description: `color ${name}`
        };
        continue;
      }
      // Dynamic category detection for all other tokens
      const segments = tokenKey.split(/[.\-_ ]/);
      const canonicalCategory = findCanonicalCategory(segments);
      if (!canonicalCategory) {
        // Fallback: if value is number or string, use Number/Text category
        if (typeof value === 'number') {
          if (!primitives['Number']) primitives['Number'] = {};
          const tokenName = toPascalCase(segments[segments.length - 1]);
          primitives['Number'][tokenName] = {
            $value: value,
            $type: 'number',
            $description: `Number ${tokenName}`
          };
        } else if (typeof value === 'string') {
          if (!primitives['Text']) primitives['Text'] = {};
          const tokenName = toPascalCase(segments[segments.length - 1]);
          primitives['Text'][tokenName] = {
            $value: value,
            $type: 'text',
            $description: `Text ${tokenName}`
          };
        } else {
          skipped.push({ baseKey, tokenKey, value });
        }
        continue;
      }
      const tokenName = toPascalCase(segments[segments.length - 1]);
      const type = getTypeForCategory(canonicalCategory);
      const description = `${canonicalCategory} ${tokenName}`;
      // Category wrapping rule
      if (canonicalCategory.toLowerCase() === type.toLowerCase()) {
        // Flat key
        primitives[tokenName] = {
          $value: value,
          $type: type,
          $description: description
        };
      } else {
        // Grouped under category
        if (!primitives[canonicalCategory]) primitives[canonicalCategory] = {};
        primitives[canonicalCategory][tokenName] = {
          $value: value,
          $type: type,
          $description: description
        };
      }
    }
  }

  if (skipped.length > 0) {
    console.warn('Skipped tokens due to unmapped category:', skipped);
  }

  const output = { Primitives: primitives };
  fs.writeFileSync(
    path.join(__dirname, 'primitives.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated primitives.json with strict Tokens Studio/W3C compliance. Skipped tokens are logged.');
}

main();
