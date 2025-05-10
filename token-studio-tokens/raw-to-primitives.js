const fs = require('fs');
const path = require('path');

// Utility: Convert to dot.case (e.g., lineHeight.xl)
function toDotCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1.$2')
    .replace(/[-_ ]+/g, '.')
    .toLowerCase();
}

// Utility: Derive $type from category or token name
function deriveType(tokenKey, baseKey) {
  // Use baseKey if possible, fallback to first part of tokenKey
  if (baseKey) return baseKey.toLowerCase();
  const first = tokenKey.split(/[.\-_ ]/)[0];
  return first.toLowerCase();
}

function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-raw.json'), 'utf8'));
  const primitives = {};

  for (const baseKey in raw.base) {
    const baseObj = raw.base[baseKey];
    for (const tokenKey in baseObj) {
      const value = baseObj[tokenKey];
      // Only include tokens with $value as string or number
      if (typeof value !== 'string' && typeof value !== 'number') continue;
      // Token name: dot.case
      const name = toDotCase(tokenKey);
      // $type: PascalCase (but lower for W3C)
      const type = deriveType(tokenKey, baseKey);
      // $description: generate if not present
      const description = `${type} ${name}`;
      primitives[name] = {
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
  console.log('Generated primitives.json as a flat object under Primitives, dot.case names, PascalCase types, only string/number values.');
}

main();
