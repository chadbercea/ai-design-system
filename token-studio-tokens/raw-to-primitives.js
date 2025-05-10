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
  FontFamily: 'fontFamilies',
  FontWeight: 'fontWeights',
  LineHeight: 'lineHeights',
  FontSize: 'fontSizes',
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
};
const canonicalCategories = Object.keys(canonicalCategoryTypeMap);

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

function getCanonicalCategoryAndTokenName(key) {
  // Split on dot, dash, underscore, or space
  const segments = key.split(/[.\-_ ]/);
  // Try to find the first segment that matches a canonical category
  for (let i = 0; i < segments.length; i++) {
    for (const cat of canonicalCategories) {
      if (segments[i].toLowerCase() === cat.toLowerCase()) {
        // Use the rest as the token name
        const tokenName = segments.slice(i + 1).join(' ');
        return { category: cat, tokenName: tokenName ? toPascalCase(tokenName) : cat };
      }
    }
  }
  // Fallback: try to match by $type
  return null;
}

function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-raw.json'), 'utf8'));
  const primitives = {};
  const skipped = [];

  // Helper to add a primitive
  function addPrimitive({ category, tokenName, value, $type }) {
    // Color: flat dot.case key
    if ($type === 'color') {
      primitives[category] = {
        $value: value,
        $type: 'color',
        $description: `color ${category}`
      };
      return;
    }
    // If $type matches category, flat key
    if (category.toLowerCase() === $type.toLowerCase()) {
      primitives[category] = {
        $value: value,
        $type,
        $description: `${category}`
      };
      return;
    }
    // Otherwise, group by category
    if (!primitives[category]) primitives[category] = {};
    primitives[category][tokenName] = {
      $value: value,
      $type,
      $description: `${category} ${tokenName}`
    };
  }

  // Process all base keys
  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    for (const tokenKey in baseObj) {
      if (semanticPrefixes.some(prefix => tokenKey.startsWith(prefix))) continue;
      const value = baseObj[tokenKey];
      if (typeof value !== 'string' && typeof value !== 'number') continue;

      // Special: color tokens
      if (baseKey.toLowerCase() === 'color') {
        // Only allow dot.case color keys
        let name = tokenKey;
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

      // For all other tokens, parse category and token name
      const parsed = getCanonicalCategoryAndTokenName(tokenKey);
      if (!parsed) {
        skipped.push({ baseKey, tokenKey, value });
        continue;
      }
      const { category, tokenName } = parsed;
      const $type = canonicalCategoryTypeMap[category];
      if (!$type) {
        skipped.push({ baseKey, tokenKey, value });
        continue;
      }
      // Only allow true primitives
      if (typeof value !== 'string' && typeof value !== 'number') {
        skipped.push({ baseKey, tokenKey, value });
        continue;
      }
      addPrimitive({ category, tokenName, value, $type });
    }
  }

  // Special handling for 'other' baseKey: scan all nested keys
  if (raw.base.other) {
    for (const nestedKey in raw.base.other) {
      const value = raw.base.other[nestedKey];
      if (typeof value !== 'string' && typeof value !== 'number') continue;
      const parsed = getCanonicalCategoryAndTokenName(nestedKey);
      if (!parsed) {
        skipped.push({ baseKey: 'other', tokenKey: nestedKey, value });
        continue;
      }
      const { category, tokenName } = parsed;
      const $type = canonicalCategoryTypeMap[category];
      if (!$type) {
        skipped.push({ baseKey: 'other', tokenKey: nestedKey, value });
        continue;
      }
      addPrimitive({ category, tokenName, value, $type });
    }
  }

  if (skipped.length > 0) {
    console.warn('Skipped tokens due to unmapped category or non-primitive value:', skipped);
  }

  const output = {
    $schema: "https://design-tokens.github.io/design-tokens/schema.json",
    Primitives: primitives
  };
  fs.writeFileSync(
    path.join(__dirname, 'primitives.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated primitives.json strictly following The-Design-Token-Codex.txt. Skipped tokens are logged.');
}

main();
