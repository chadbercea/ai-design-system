const fs = require('fs');
const path = require('path');

// Helper: PascalCase
function toPascalCase(str) {
  return str.replace(/(^|[._-])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '').replace(/\W/g, '');
}

// Helper: group primitives by property
function groupPrimitives(raw, relationships) {
  const primitives = {};
  for (const [flatKey, value] of Object.entries(raw.base.color)) {
    const [color, shade] = flatKey.split('.');
    const category = 'Color';
    const tokenName = toPascalCase(color + (shade ? shade : ''));
    if (!primitives[category]) primitives[category] = {};
    primitives[category][tokenName] = {
      $value: value,
      $type: 'color',
      $description: `${color} ${shade}`
    };
  }
  // TODO: Add other primitives (fontSize, fontWeight, etc.)
  // Use relationships to find and group them
  return primitives;
}

// Helper: build MUI semantic tokens referencing primitives
function buildMUISemantics(relationships, primitives) {
  const MUI = {};
  // TODO: Use relationships to build semantic tokens referencing primitives
  // Example: MUI.Color.Primary = { $type: 'color', $value: '{Primitives.Color.Blue500}', $description: 'Primary brand color' }
  return MUI;
}

function main() {
  const raw = JSON.parse(fs.readFileSync('./mui-tokens-raw.json', 'utf8'));
  const relationships = JSON.parse(fs.readFileSync('./mui-tokens-relationships.json', 'utf8'));
  const w3c = JSON.parse(fs.readFileSync('./mui-tokens-w3c.json', 'utf8'));
  const guide = fs.readFileSync('./_ref/design-token-overview.txt', 'utf8');

  const Primitives = groupPrimitives(raw, relationships);
  const MUI = buildMUISemantics(relationships, Primitives);

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
