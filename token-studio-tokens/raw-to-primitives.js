const fs = require('fs');
const path = require('path');

// Canonical categories from the overview
const canonicalCategories = [
  'Color', 'Sizing', 'Spacing', 'BorderRadius', 'BorderWidth', 'Border', 'Opacity', 'BoxShadow', 'Typography',
  'FontFamily', 'FontWeight', 'LineHeight', 'FontSize', 'LetterSpacing', 'ParagraphSpacing', 'TextCase',
  'TextDecoration', 'Composition', 'Assets', 'Dimension', 'Breakpoints', 'Boolean', 'Text', 'Number', 'ZIndex'
];

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
      // Color tokens: use baseKey and flat key logic
      if (baseKey.toLowerCase() === 'color') {
        const match = tokenKey.match(/^([a-zA-Z]+)[.\-]?([\w]+)$/);
        let name = match ? `${match[1].toLowerCase()}.${match[2]}` : tokenKey.toLowerCase();
        primitives[name] = {
          $value: value,
          $type: 'color',
          $description: `color ${name}`,
          $primitive: name
        };
        continue;
      }
      // Dynamic category detection for all other tokens
      const segments = tokenKey.split(/[.\-_ ]/);
      const canonicalCategory = findCanonicalCategory(segments);
      if (!canonicalCategory) {
        skipped.push({ baseKey, tokenKey, value });
        continue;
      }
      const tokenName = toPascalCase(segments[segments.length - 1]);
      const type = canonicalCategory.charAt(0).toLowerCase() + canonicalCategory.slice(1);
      const description = `${canonicalCategory} ${tokenName}`;
      if (!primitives[canonicalCategory]) primitives[canonicalCategory] = {};
      primitives[canonicalCategory][tokenName] = {
        $value: value,
        $type: type,
        $description: description,
        $primitive: tokenName
      };
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
  console.log('Generated primitives.json with dynamic category detection, robust mapping, and all required fields. Skipped tokens are logged.');

  /*
  Skipped tokens due to unmapped category (for review):
  - direction
  - mixins.toolbar.minHeight
  - mixins.toolbar.@media (min-width:0px).@media (orientation: landscape).minHeight
  - mixins.toolbar.@media (min-width:600px).minHeight
  - transitions.easing.easeInOut
  - transitions.easing.easeOut
  - transitions.easing.easeIn
  - transitions.easing.sharp
  - transitions.duration.shortest
  - transitions.duration.shorter
  - transitions.duration.short
  - transitions.duration.standard
  - transitions.duration.complex
  - transitions.duration.enteringScreen
  - transitions.duration.leavingScreen
  */
}

main();
