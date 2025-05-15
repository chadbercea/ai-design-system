const fs = require('fs');
const path = require('path');

// Load rules
const structureRules = require('../_docs/structure-rules.js');
const typeRules = require('../_docs/type-rules.js');

const inputPath = path.join(__dirname, 'json-from-figma.json');
const corePath = path.join(__dirname, 'core.json');
const themePath = path.join(__dirname, 'theme.json');
const trashPath = path.join(__dirname, 'trash.json');
const warningsPath = path.join(__dirname, 'warnings.md');

function isReference(val) {
  return typeof val === 'string' && /^{[^{}]+}$/.test(val);
}

function isValidHex(val) {
  return typeof val === 'string' && (/^#[0-9a-fA-F]{6}$/.test(val) || /^#[0-9a-fA-F]{8}$/.test(val));
}

function isValidRgba(val) {
  return typeof val === 'string' && /^rgba\(\d+,\d+,\d+,\d+(\.\d+)?\)$/.test(val);
}

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
function validatePrimitive(key, obj, warnings) {
  // $type
  if (!typeRules.validTypes.includes(obj.$type)) {
    warnings.push(`Token ${key} has invalid $type: ${obj.$type}`);
    return false;
  }
  // $value
  if (typeof obj.$value === 'object') {
    warnings.push(`Token ${key} has object $value (semantic leak)`);
    return false;
  }
  // $description
  if (!obj.$description || typeof obj.$description !== 'string' || obj.$description.match(/no description provided/i)) {
    warnings.push(`Token ${key} missing or placeholder $description`);
    return false;
  }
  // Unit validation
  const rule = typeRules.unitRules[obj.$type];
  if (rule) {
    if (rule.type && typeof obj.$value !== rule.type) {
      warnings.push(`Token ${key} $value type mismatch: expected ${rule.type}`);
      return false;
    }
    if (rule.pattern && !(new RegExp(rule.pattern).test(obj.$value))) {
      warnings.push(`Token ${key} $value does not match pattern: ${rule.pattern}`);
      return false;
    }
  }
  // Color format
  if (obj.$type === 'color' && !(isValidHex(obj.$value) || isValidRgba(obj.$value))) {
    warnings.push(`Token ${key} has invalid color $value: ${obj.$value}`);
    return false;
  }
  // No references in primitives
  if (isReference(obj.$value)) {
    warnings.push(`Token ${key} has reference in $value: ${obj.$value}`);
    return false;
  }
  // No arrays
  if (Array.isArray(obj)) {
    warnings.push(`Token ${key} is an array`);
    return false;
  }
  // No plural keys except allowed $type
  if (key.match(/s$/) && !['fontSizes','fontWeights','fontFamilies','lineHeights'].includes(obj.$type)) {
    warnings.push(`Token ${key} is a plural key not allowed`);
    return false;
  }
  // No double nesting
  if (key.toLowerCase() === obj.$type.toLowerCase()) {
    warnings.push(`Token ${key} is double nested with $type`);
    return false;
  }
  // No missing fields
  for (const field of typeRules.requiredFields) {
    if (!(field in obj)) {
      warnings.push(`Token ${key} missing required field: ${field}`);
      return false;
    }
  }
  return true;
}

// Recursively flatten and convert primitives, using only the leaf key, and track the full path
function flatten(obj, result = {}, theme = {}, trash = {}, warnings = [], pathArr = []) {
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
      if (isReference(primitive.$value)) {
        // Semantic token
        theme[fullPath] = primitive;
      } else if (validatePrimitive(fullPath, primitive, warnings)) {
        result[fullPath] = primitive;
      } else {
        trash[fullPath] = primitive;
      }
    } else if (Array.isArray(value)) {
      trash[fullPath] = value;
      warnings.push(`Token ${fullPath} is an array, not allowed in primitives.`);
    } else if (typeof value === 'object' && value !== null) {
      flatten(value, result, theme, trash, warnings, [...pathArr, key]);
    }
  }
  return { result, theme, trash, warnings };
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
  const { result, theme, trash, warnings } = flatten(data);
  fs.writeFileSync(corePath, JSON.stringify(result, null, 2));
  fs.writeFileSync(themePath, JSON.stringify(theme, null, 2));
  fs.writeFileSync(trashPath, JSON.stringify(trash, null, 2));
  fs.writeFileSync(warningsPath, warnings.map(w => `- ${w}`).join('\n'));
  console.log(`core.json: ${Object.keys(result).length} tokens`);
  console.log(`theme.json: ${Object.keys(theme).length} tokens`);
  console.log(`trash.json: ${Object.keys(trash).length} tokens`);
  console.log(`warnings.md: ${warnings.length} issues`);
}

main(); 