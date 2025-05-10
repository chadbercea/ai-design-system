const fs = require('fs');
const path = require('path');

// Tokens Studio $type to group mapping (PascalCase)
const tsTypeToGroup = {
  color: null, // special: flat keys
  fontSizes: 'FontSize',
  fontWeights: 'FontWeight',
  fontFamilies: 'FontFamily',
  lineHeights: 'LineHeight',
  letterSpacing: 'LetterSpacing',
  spacing: 'Spacing',
  sizing: 'Sizing',
  borderRadius: 'BorderRadius',
  borderWidth: 'BorderWidth',
  opacity: 'Opacity',
  boxShadow: 'BoxShadow',
  typography: 'Typography',
  zIndex: 'ZIndex',
  breakpoints: 'Breakpoints',
  boolean: 'Boolean',
  text: 'Text',
  number: 'Number',
  paragraphSpacing: 'ParagraphSpacing',
  textCase: 'TextCase',
  textDecoration: 'TextDecoration',
  composition: 'Composition',
  assets: 'Assets',
  dimension: 'Dimension',
  border: 'Border',
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

function processToken({ baseKey, tokenKey, value }, primitives, skipped) {
  // Guess $type from baseKey or tokenKey
  let $type = null;
  if (baseKey.toLowerCase() === 'color') {
    $type = 'color';
  } else {
    // Try to infer from baseKey or tokenKey
    const lowerBase = baseKey.toLowerCase();
    for (const t of Object.keys(tsTypeToGroup)) {
      if (lowerBase === t.toLowerCase()) {
        $type = t;
        break;
      }
    }
    if (!$type) {
      // Try from tokenKey
      for (const t of Object.keys(tsTypeToGroup)) {
        if (tokenKey.toLowerCase().includes(t.toLowerCase())) {
          $type = t;
          break;
        }
      }
    }
  }
  if (!$type || !(($type === 'color') || tsTypeToGroup[$type])) {
    skipped.push({ baseKey, tokenKey, value });
    return;
  }

  // $description
  let $description = '';
  if ($type === 'color') {
    $description = `color ${tokenKey}`;
  } else {
    $description = `${tsTypeToGroup[$type] || $type} ${toPascalCase(tokenKey)}`;
  }

  // Color: flat key in dot.case
  if ($type === 'color') {
    let name = tokenKey;
    if (!name.includes('.')) {
      name = name.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
    }
    name = name.replace(/_/g, '.');
    primitives[name] = {
      $value: value,
      $type: 'color',
      $description
    };
    return;
  }

  // All other types: group by TS group name
  const group = tsTypeToGroup[$type];
  if (!primitives[group]) primitives[group] = {};
  const tokenName = toPascalCase(tokenKey);
  primitives[group][tokenName] = {
    $value: value,
    $type,
    $description
  };
}

function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-raw.json'), 'utf8'));
  const primitives = {};
  const skipped = [];

  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    // Special handling for 'other' baseKey: scan all nested keys
    if (baseKey === 'other') {
      for (const nestedKey in baseObj) {
        const value = baseObj[nestedKey];
        // If value is an object or array, skip (not a primitive)
        if (typeof value === 'object' && value !== null) continue;
        processToken({ baseKey, tokenKey: nestedKey, value }, primitives, skipped);
      }
      continue;
    }
    for (const tokenKey in baseObj) {
      const value = baseObj[tokenKey];
      if (typeof value !== 'string' && typeof value !== 'number') continue;
      if (semanticPrefixes.some(prefix => tokenKey.startsWith(prefix))) continue;
      processToken({ baseKey, tokenKey, value }, primitives, skipped);
    }
  }

  if (skipped.length > 0) {
    console.warn('Skipped tokens due to unrecognized $type:', skipped);
  }

  const output = {
    $schema: "https://design-tokens.github.io/design-tokens/schema.json",
    Primitives: primitives
  };
  fs.writeFileSync(
    path.join(__dirname, 'primitives.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated primitives.json with dynamic TS group compliance and full \'other\' parsing. Skipped tokens are logged.');
}

main();
