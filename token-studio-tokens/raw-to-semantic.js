const fs = require('fs');
const path = require('path');

// Utility: PascalCase
function toPascalCase(str) {
  return str
    .replace(/[-_. ]+(.)/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (_, c) => c ? c.toUpperCase() : '');
}

// Utility: Find matching primitive reference
function findPrimitiveRef(value, primitives) {
  for (const category in primitives) {
    for (const name in primitives[category]) {
      if (primitives[category][name].$value === value) {
        return `{Primitives.${category}.${name}}`;
      }
    }
  }
  return null;
}

// Utility: Get W3C type
function getW3CType(tokenKey, w3c, category) {
  let w3cKey = tokenKey.replace(/\./g, '-');
  if (w3c[category] && w3c[category][w3cKey]) {
    return w3c[category][w3cKey]['$type'];
  }
  return null;
}

// Utility: Get relationship type
function getRelationshipType(tokenKey, relationships) {
  const rel = relationships.find(r => r.token === tokenKey);
  if (rel && rel.type && rel.type !== 'object' && rel.type !== 'other') {
    return rel.type === 'string' ? 'fontFamilies' : rel.type;
  }
  return null;
}

function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-raw.json'), 'utf8'));
  const relationships = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-relationships.json'), 'utf8'));
  const w3c = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-w3c.json'), 'utf8'));
  const primitives = JSON.parse(fs.readFileSync(path.join(__dirname, 'primitives.json'), 'utf8')).Primitives;

  const mui = {};

  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    for (const tokenKey in baseObj) {
      // Only include semantic tokens: palette., common., etc.
      if (!(tokenKey.startsWith('palette.') || tokenKey.startsWith('common.'))) continue;
      // Category and name
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
      // Value: reference to primitive if possible
      const value = baseObj[tokenKey];
      let ref = findPrimitiveRef(value, primitives);
      // Type
      let type = getW3CType(tokenKey, w3c, baseKey) || getRelationshipType(tokenKey, relationships) || 'other';
      // Description
      let description = `MUI ${tokenKey}`;
      // Add to MUI
      if (!mui[category]) mui[category] = {};
      mui[category][name] = {
        $value: ref || value,
        $type: type,
        $description: description
      };
    }
  }

  // Output only the MUI object, no $schema
  fs.writeFileSync(
    path.join(__dirname, 'mui-semantic.json'),
    JSON.stringify(mui, null, 2)
  );
  console.log('Generated mui-semantic.json with all semantic tokens (no $schema).');
}

main();
