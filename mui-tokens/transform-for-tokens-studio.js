const fs = require('fs');
const path = require('path');

// Helper: PascalCase
function toPascalCase(str) {
  return str.replace(/(^|[._-])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '').replace(/\W/g, '');
}

// Helper: flatten primitives by property
function flattenPrimitives(raw) {
  const primitives = {};
  for (const [flatKey, value] of Object.entries(raw.base.color)) {
    const [color, shade] = flatKey.split('.');
    const category = 'Color';
    const tokenName = toPascalCase(color + (shade ? shade : ''));
    primitives[`${category}.${tokenName}`] = {
      $value: value,
      $type: 'color',
      $description: `${color} ${shade}`
    };
  }
  // TODO: Add other primitives (fontSize, fontWeight, etc.)
  return primitives;
}

// Minimal MUI semantic example
function buildMinimalMUI() {
  return {
    "Color.Primary": {
      "$type": "color",
      "$value": "{Primitives.Color.Blue500}",
      "$description": "Primary brand color"
    }
  };
}

function main() {
  const raw = JSON.parse(fs.readFileSync('./mui-tokens-raw.json', 'utf8'));
  // const relationships = JSON.parse(fs.readFileSync('./mui-tokens-relationships.json', 'utf8'));
  // const w3c = JSON.parse(fs.readFileSync('./mui-tokens-w3c.json', 'utf8'));
  // const guide = fs.readFileSync('./_ref/design-token-overview.txt', 'utf8');

  const Primitives = flattenPrimitives(raw);
  const MUI = buildMinimalMUI();

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
  console.log('Generated tokens-studio-format.json');
}

main();
