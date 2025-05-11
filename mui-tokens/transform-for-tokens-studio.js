const fs = require('fs');
const path = require('path');

// Utility: PascalCase
function toPascalCase(str) {
  return str
    .replace(/[-_. ]+(.)/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (_, c) => c ? c.toUpperCase() : '');
}

// Utility: Find relationship info for a token
function findRelationship(token, relationships) {
  return relationships.find(rel => rel.token === token);
}

// Utility: Find W3C info for a token
function findW3CTypeAndValue(token, w3c) {
  // Try to find the token in the w3c structure
  for (const category in w3c) {
    if (w3c[category][token]) {
      return {
        type: w3c[category][token]['$type'],
        value: w3c[category][token]['$value']
      };
    }
  }
  return null;
}

// Recursively build primitives by category
function buildPrimitives(raw, relationships, w3c) {
  const primitives = {};
  // Only process base tokens
  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    for (const tokenKey in baseObj) {
      // Skip semantic tokens (palette., common., etc.)
      if (tokenKey.startsWith('palette.') || tokenKey.startsWith('common.')) continue;
      // Determine category
      let category = baseKey;
      let name = tokenKey;
      // For color, use e.g. blue.500 -> blue.500
      if (category === 'color') {
        const match = tokenKey.match(/^([a-zA-Z]+)[.\-]?([\w]+)$/);
        if (match) {
          category = null; // Remove category for colors
          name = `${match[1].toLowerCase()}.${match[2]}`;
        } else {
          name = tokenKey.toLowerCase();
        }
      } else {
        name = toPascalCase(tokenKey);
        category = toPascalCase(category);
      }
      // Find type and value
      let type = 'other';
      let value = baseObj[tokenKey];
      let description = `${category} ${name}`;
      // Try to get type from w3c
      const w3cInfo = findW3CTypeAndValue(tokenKey.replace('.', '-'), w3c);
      if (w3cInfo) {
        type = w3cInfo.type;
        value = w3cInfo.value;
      }
      // Try to get type from relationships
      const rel = findRelationship(tokenKey, relationships);
      if (rel && rel.type && rel.type !== 'object' && rel.type !== 'other') {
        type = rel.type === 'string' ? 'fontFamilies' : rel.type;
      }
      // Add to primitives
      if (category) {
        if (!primitives[category]) primitives[category] = {};
        primitives[category][name] = {
          $value: value,
          $type: type,
          $description: description
        };
      } else {
        // For colors, add directly to primitives
        primitives[name] = {
          $value: value,
          $type: type,
          $description: description
        };
      }
    }
  }
  return primitives;
}

// Recursively build semantic tokens (MUI)
function buildMUI(raw, relationships, w3c, primitives) {
  const mui = {};
  // Only process semantic tokens (palette., common., etc.)
  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    for (const tokenKey in baseObj) {
      if (!(tokenKey.startsWith('palette.') || tokenKey.startsWith('common.'))) continue;
      // Determine category and name
      let category = 'Color';
      let name = tokenKey;
      // Palette tokens: palette.primary.main -> Color -> PrimaryMain
      if (tokenKey.startsWith('palette.')) {
        const parts = tokenKey.split('.');
        category = 'Color';
        name = parts.slice(1).map(toPascalCase).join('');
      } else if (tokenKey.startsWith('common.')) {
        category = 'Color';
        name = toPascalCase(tokenKey.replace('common.', ''));
      }
      // Find the primitive this should reference
      let refCategory = category;
      let refName = name;
      // Try to find a matching primitive
      let ref = null;
      if (primitives[refCategory] && primitives[refCategory][refName]) {
        ref = `{Primitives.${refCategory}.${refName}}`;
      } else {
        // Try to find a color value match
        for (const cat in primitives) {
          for (const n in primitives[cat]) {
            if (primitives[cat][n].$value === baseObj[tokenKey]) {
              ref = `{Primitives.${cat}.${n}}`;
              refCategory = cat;
              refName = n;
              break;
            }
          }
        }
      }
      // Fallback to raw value if no primitive found
      let value = ref || baseObj[tokenKey];
      // Find type
      let type = 'color';
      const w3cInfo = findW3CTypeAndValue(tokenKey.replace('.', '-'), w3c);
      if (w3cInfo) type = w3cInfo.type;
      const rel = findRelationship(tokenKey, relationships);
      if (rel && rel.type && rel.type !== 'object' && rel.type !== 'other') {
        type = rel.type === 'string' ? 'fontFamilies' : rel.type;
      }
      // Description
      let description = `MUI ${tokenKey}`;
      // Add to MUI
      if (!mui[category]) mui[category] = {};
      mui[category][name] = {
        $value: value,
        $type: type,
        $description: description
      };
    }
  }
  return mui;
}

function main() {
  const raw = JSON.parse(fs.readFileSync('./mui-tokens-raw.json', 'utf8'));
  const relationships = JSON.parse(fs.readFileSync('./mui-tokens-relationships.json', 'utf8'));
  const w3c = JSON.parse(fs.readFileSync('./mui-tokens-w3c.json', 'utf8'));

  const Primitives = buildPrimitives(raw, relationships, w3c);
  const MUI = buildMUI(raw, relationships, w3c, Primitives);

  const output = {
    "$schema": "https://design-tokens.github.io/design-tokens/schema.json",
    Primitives,
    MUI,
    "$metadata": {
      "tokenSetOrder": ["Primitives", "MUI"]
    }
  };

  fs.writeFileSync(
    path.join(__dirname, 'tokens-studio-format.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated tokens-studio-format.json with all tokens, categorized and W3C-compliant.');
}

main();
