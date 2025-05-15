const fs = require('fs');
const path = require('path');

// Load rules
const structureRules = require('../_docs/structure-rules.js');
const typeRules = require('../_docs/type-rules.js');

const inputPath = path.join(__dirname, 'json-from-figma.json');
const outputPath = path.join(__dirname, 'flat-primitives.json');

// Helper: Check if an object is a primitive (has type, value, description or not)
function isPrimitive(obj) {
  if (!obj || typeof obj !== 'object') return false;
  const keys = Object.keys(obj);
  return (
    keys.includes('type') &&
    keys.includes('value') &&
    typeof obj['type'] === 'string' &&
    (typeof obj['value'] === 'string' || typeof obj['value'] === 'number')
  );
}

// Infer MUI intent-based description from key
function inferDescription(key, type) {
  // Common MUI patterns
  if (key.includes('appBar') && key.toLowerCase().includes('fill')) {
    return "The background color used for the default state of the application's top app bar.";
  }
  if (key.includes('breadcrumbs') && key.toLowerCase().includes('collapse')) {
    return "Color for collapsed breadcrumb element in a breadcrumb navigation component.";
  }
  if (key.includes('primary.main')) return "Main color for primary actions.";
  if (key.includes('primary.dark')) return "Dark variant of the primary color.";
  if (key.includes('primary.light')) return "Light variant of the primary color.";
  if (key.includes('secondary.main')) return "Main color for secondary actions.";
  if (key.includes('error.main')) return "Main color for error states.";
  if (key.includes('warning.main')) return "Main color for warning states.";
  if (key.includes('info.main')) return "Main color for informational states.";
  if (key.includes('success.main')) return "Main color for success states.";
  if (key.includes('divider')) return "Divider color.";
  if (key.includes('background.default')) return "Default background color.";
  if (key.includes('contrastText')) return "Text color that ensures sufficient contrast.";
  // Fallback
  return 'No description provided.';
}

// Helper: Validate a primitive against type rules
function validatePrimitive(key, obj) {
  if (!typeRules.validTypes.includes(obj.$type)) {
    throw new Error(`Token ${key} has invalid $type: ${obj.$type}`);
  }
  if (typeof obj.$value === 'object') {
    throw new Error(`Token ${key} has object $value (semantic leak)`);
  }
}

// Recursively flatten and convert primitives, using only the leaf key, and track the full path
function flatten(obj, result = {}, pathArr = []) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = obj[key];
    const fullPath = [...pathArr, key].join('.');
    if (isPrimitive(value)) {
      let description = value['description'];
      if (!description || typeof description !== 'string') {
        description = inferDescription(fullPath, value['type']);
      }
      const primitive = {
        $type: value['type'],
        $value: value['value'],
        $description: description
      };
      validatePrimitive(fullPath, primitive);
      if (result[key]) {
        if (!Array.isArray(result[key])) result[key] = [result[key]];
        const exists = result[key].some(
          t => t.$type === primitive.$type && t.$value === primitive.$value
        );
        if (!exists) result[key].push(primitive);
      } else {
        result[key] = primitive;
      }
    } else if (typeof value === 'object' && value !== null) {
      flatten(value, result, [...pathArr, key]);
    }
  }
  return result;
}

function main() {
  let raw;
  try {
    raw = fs.readFileSync(inputPath, 'utf-8');
  } catch (e) {
    console.error('Could not read input file.');
    process.exit(1);
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error('Invalid JSON in input file.');
    process.exit(1);
  }
  const flat = flatten(data);
  fs.writeFileSync(outputPath, JSON.stringify(flat, null, 2));
  const count = Object.values(flat).reduce((acc, v) => acc + (Array.isArray(v) ? v.length : 1), 0);
  console.log(`Flattened ${count} primitives to ${outputPath}`);
}

main(); 