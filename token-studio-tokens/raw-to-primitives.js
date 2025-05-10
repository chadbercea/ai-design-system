const fs = require('fs');
const path = require('path');

// Utility: PascalCase
function toPascalCase(str) {
  return str
    .replace(/[-_. ]+(.)/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (_, c) => c ? c.toUpperCase() : '');
}

// Utility: Get W3C type
function getW3CType(tokenKey, w3c, category) {
  // Try to find the token in the w3c structure
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

  const primitives = {};

  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    for (const tokenKey in baseObj) {
      // Only include true primitives: skip palette., common., etc.
      if (tokenKey.startsWith('palette.') || tokenKey.startsWith('common.')) continue;
      // Token name
      let name = tokenKey;
      let match = null;
      // For color, use lowercase and dot notation (e.g., blue.500)
      if (toPascalCase(baseKey) === 'Color') {
        match = tokenKey.match(/^([a-zA-Z]+)[.\-]?([\w]+)$/);
        if (match) {
          name = `${match[1].toLowerCase()}.${match[2]}`;
        } else {
          name = tokenKey.toLowerCase();
        }
      } else {
        name = toPascalCase(tokenKey);
      }
      // Value
      const value = baseObj[tokenKey];
      // Type
      let type = getW3CType(tokenKey, w3c, baseKey) || getRelationshipType(tokenKey, relationships) || 'other';
      // Description
      let description = '';
      if (toPascalCase(baseKey) === 'Color') {
        description = `${match ? match[1] : tokenKey} ${match ? match[2] : ''}`.trim();
      } else {
        description = `${toPascalCase(baseKey)} ${name}`;
      }
      // Add to primitives (no category wrapper!)
      primitives[name] = {
        $value: value,
        $type: type,
        $description: description
      };
    }
  }

  const output = {
    "$schema": "https://design-tokens.github.io/design-tokens/schema.json",
    Primitives: primitives
  };

  fs.writeFileSync(
    path.join(__dirname, 'primitives.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated primitives.json with all primitive tokens (no category wrappers).');
}

main();
