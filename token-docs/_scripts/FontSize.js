const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../../token-studio-sync-provider/json-from-figma.json');
const outputPath = path.resolve(__dirname, '../_json/FontSize.json');

function isPrimitiveFontSizeToken(key, value) {
  // Only allow direct font size values (not references, not semantic, not aliases)
  return (
    typeof value === 'object' &&
    value.type === 'fontSize' &&
    typeof value.value === 'string' &&
    !value.value.startsWith('{') &&
    !key.startsWith('_')
  );
}

function flatten(obj, prefix = '', result = {}) {
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    const v = obj[k];
    const dotKey = prefix ? `${prefix}.${k}` : k;
    if (isPrimitiveFontSizeToken(dotKey, v)) {
      result[dotKey] = {
        $type: 'fontSize',
        $value: v.value,
        $description: v.description || dotKey
      };
    } else if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      flatten(v, dotKey, result);
    }
  }
  return result;
}

function main() {
  const raw = fs.readFileSync(inputPath, 'utf8');
  const json = JSON.parse(raw);
  const flat = flatten(json);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(flat, null, 2));
}

main(); 