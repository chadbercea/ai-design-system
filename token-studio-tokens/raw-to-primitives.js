const fs = require('fs');
const path = require('path');

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

// Known semantic prefixes
const semanticPrefixes = [
  'palette.', 'common.', 'action.', 'background.', 'divider.', 'text.', 'primary.', 'secondary.', 'error.', 'warning.', 'info.', 'success.'
];

// Known color categories
const colorCategories = ['Color', 'color'];

function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-raw.json'), 'utf8'));
  const primitives = {};

  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    for (const tokenKey in baseObj) {
      // Exclude semantic tokens
      if (semanticPrefixes.some(prefix => tokenKey.startsWith(prefix))) continue;
      const value = baseObj[tokenKey];
      if (typeof value !== 'string' && typeof value !== 'number') continue;
      // Handle color primitives as flat keys
      if (colorCategories.includes(baseKey)) {
        const match = tokenKey.match(/^([a-zA-Z]+)[.\-]?([\w]+)$/);
        let name = match ? `${match[1].toLowerCase()}.${match[2]}` : tokenKey.toLowerCase();
        primitives[name] = {
          $value: value,
          $type: 'color',
          $description: `color ${name}`
        };
        continue;
      }
      // Non-color: group by PascalCase category, PascalCase token name
      const category = toPascalCase(baseKey);
      // Use last segment of tokenKey as intent/alias
      const parts = tokenKey.split(/[.\-_ ]/);
      const tokenName = toPascalCase(parts[parts.length - 1]);
      // $type is the category in lowerCamelCase (e.g., 'breakpoint')
      const type = category.charAt(0).toLowerCase() + category.slice(1);
      // $description: e.g., 'Breakpoint Lg'
      const description = `${category} ${tokenName}`;
      if (!primitives[category]) primitives[category] = {};
      primitives[category][tokenName] = {
        $value: value,
        $type: type,
        $description: description
      };
    }
  }

  // Output as a root object with 'Primitives' key
  const output = { Primitives: primitives };
  fs.writeFileSync(
    path.join(__dirname, 'primitives.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated primitives.json with grouped non-color primitives, PascalCase names, correct $type, and flat color keys.');
}

main();
