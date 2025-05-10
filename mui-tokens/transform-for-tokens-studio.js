const fs = require('fs');
const path = require('path');

function toPascalCase(str) {
  return str.replace(/(^|[._-])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '').replace(/\W/g, '');
}

function buildColorPrimitives(raw) {
  const primitives = {};
  for (const [flatKey, value] of Object.entries(raw.base.color)) {
    const [color, shade] = flatKey.split('.');
    primitives[flatKey] = {
      $value: value,
      $type: 'color',
      $description: `${color} ${shade}`
    };
  }
  return primitives;
}

function main() {
  const raw = JSON.parse(fs.readFileSync('./mui-tokens-raw.json', 'utf8'));
  const Primitives = buildColorPrimitives(raw);
  const output = {
    "$schema": "https://design-tokens.github.io/design-tokens/schema.json",
    Primitives,
    MUI: {},
    "$metadata": {
      "tokenSetOrder": ["Primitives", "MUI"]
    }
  };
  fs.writeFileSync(
    path.join(__dirname, 'tokens-studio-format.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated tokens-studio-format.json with flat primitives and descriptive $description.');
}

main();
