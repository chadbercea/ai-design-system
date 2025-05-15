// Canonical Color primitives will be documented or exported here. 

const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../../token-studio-sync-provider/json-from-figma.json');
const outDir = path.resolve(__dirname, '../_json');
const corePath = path.join(outDir, 'core.json');
const themePath = path.join(outDir, 'theme.json');
const trashPath = path.join(outDir, 'trash.json');
const warningsPath = path.join(outDir, 'warnings.md');

const COLOR_HEX_REGEX = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGBA_REGEX = /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (0|1|0?\.\d+)\)$/;
const REFERENCE_REGEX = /^\{([\w.\-]+)\}$/;
const INVALID_SUFFIX_REGEX = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2,})$/;
const INVALID_KEY_PARTS = ['_states', '_components', '_native'];

function flatten(obj, prefix = '', out = {}) {
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    const v = obj[k];
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    } else {
      out[prefix] = obj;
      break;
    }
  }
  return out;
}

function normalizeKey(key) {
  return key.replace(/\.+/g, '.').replace(/\s+/g, '').replace(/\.$/, '');
}

function isPrimitive(token) {
  return (
    token.$type === 'color' &&
    typeof token.$value === 'string' &&
    (COLOR_HEX_REGEX.test(token.$value) || RGBA_REGEX.test(token.$value)) &&
    !REFERENCE_REGEX.test(token.$value)
  );
}

function isSemantic(token) {
  return (
    token.$type === 'color' &&
    typeof token.$value === 'string' &&
    REFERENCE_REGEX.test(token.$value)
  );
}

function hasInvalidKey(key) {
  return INVALID_KEY_PARTS.some(part => key.includes(part));
}

function validateAndCategorize(flatTokens) {
  const core = {};
  const theme = {};
  const trash = {};
  const warnings = [];

  for (const rawKey in flatTokens) {
    const key = normalizeKey(rawKey);
    const t = flatTokens[rawKey];
    if (hasInvalidKey(key)) {
      trash[key] = t;
      warnings.push(`Trash: ${key} uses forbidden key part (_states, _components, _native)`);
      continue;
    }
    if (!t.type || t.type !== 'color') {
      trash[key] = t;
      warnings.push(`Trash: ${key} missing or invalid $type`);
      continue;
    }
    const token = {
      $type: t.type,
      $value: t.value,
      $description: t.description || key
    };
    if (isPrimitive(token)) {
      core[key] = token;
    } else if (isSemantic(token)) {
      theme[key] = token;
    } else {
      trash[key] = token;
      if (!token.$value) warnings.push(`Trash: ${key} missing $value`);
      else if (!COLOR_HEX_REGEX.test(token.$value) && !RGBA_REGEX.test(token.$value) && !REFERENCE_REGEX.test(token.$value))
        warnings.push(`Trash: ${key} has invalid $value: ${token.$value}`);
      else warnings.push(`Trash: ${key} is not primitive or semantic`);
    }
    if (INVALID_SUFFIX_REGEX.test(token.$value)) {
      warnings.push(`Warning: ${key} has hex with nonstandard suffix: ${token.$value}`);
    }
  }
  return { core, theme, trash, warnings };
}

function main() {
  const raw = fs.readFileSync(inputPath, 'utf8');
  const json = JSON.parse(raw);
  const flat = flatten(json);
  const { core, theme, trash, warnings } = validateAndCategorize(flat);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(corePath, JSON.stringify(core, null, 2));
  fs.writeFileSync(themePath, JSON.stringify(theme, null, 2));
  fs.writeFileSync(trashPath, JSON.stringify(trash, null, 2));
  fs.writeFileSync(warningsPath, warnings.map(w => `- ${w}`).join('\n'));
}

main(); 