const fs = require('fs');
const path = require('path');

// Canonical category and type mapping (singular, case-sensitive)
const CANONICAL_MAP = {
  color: 'color',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  lineHeight: 'lineHeight',
  radius: 'borderRadius',
  opacity: 'opacity',
  spacing: 'spacing',
  paragraphSpacing: 'paragraphSpacing',
  borderRadius: 'borderRadius',
  letterSpacing: 'letterSpacing'
};

// Capitalized type mapping for W3C/TS
const CANONICAL_TYPES = {
  color: 'Color',
  fontFamily: 'FontFamily',
  fontSize: 'FontSize',
  fontWeight: 'FontWeight',
  lineHeight: 'LineHeight',
  radius: 'BorderRadius',
  borderRadius: 'BorderRadius',
  opacity: 'Opacity',
  spacing: 'Spacing',
  paragraphSpacing: 'ParagraphSpacing',
  letterSpacing: 'LetterSpacing',
  dimension: 'Dimension'
};

// All canonical categories expected by Tokens Studio (singular, case-sensitive)
const CANONICAL_CATEGORIES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'borderRadius',
  'opacity',
  'spacing',
  'paragraphSpacing',
  'letterSpacing'
];

// File paths
const corePath = path.join(__dirname, '../../TS-TOKEN-EXAMPLE-DO-NOT-USE/core.json');
const muiPath = path.join(__dirname, '../w3c-tokens.json');
const outputPath = path.join(__dirname, '../../build/tokens-studio.json');

// Read files
const core = JSON.parse(fs.readFileSync(corePath, 'utf-8'));
const mui = JSON.parse(fs.readFileSync(muiPath, 'utf-8'));

// Helper: Recursively flatten MUI tokens to category → tokenName → tokenObject
function flattenTokens(obj, parentKeys = []) {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && ('$value' in value || '$type' in value)) {
      // This is a token object
      const [category, ...tokenPath] = parentKeys.concat(key);
      if (!result[category]) result[category] = {};
      // Build token name from tokenPath (joined by dots if nested)
      const tokenName = tokenPath.join('.') || key;
      // Only include $type, $value, $description if present
      const tokenObj = {};
      if ('$type' in value) tokenObj['$type'] = value['$type'];
      if ('$value' in value) tokenObj['$value'] = value['$value'];
      if ('$description' in value) tokenObj['$description'] = value['$description'];
      result[category][tokenName] = tokenObj;
    } else if (value && typeof value === 'object') {
      // Recurse
      const nested = flattenTokens(value, parentKeys.concat(key));
      for (const [cat, tokens] of Object.entries(nested)) {
        if (!result[cat]) result[cat] = {};
        Object.assign(result[cat], tokens);
      }
    }
  }
  return result;
}

// Flatten and build the output structure
const flat = flattenTokens(mui);

// Remove empty categories
for (const cat of Object.keys(flat)) {
  if (Object.keys(flat[cat]).length === 0) {
    delete flat[cat];
  }
}

// Un-flatten: category → tokenName → tokenObject (no dot notation in token names if not needed)
function unflattenCategory(tokens) {
  const result = {};
  for (const [tokenName, tokenObj] of Object.entries(tokens)) {
    // If tokenName contains dots, nest accordingly
    const parts = tokenName.split('.');
    let node = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!node[parts[i]]) node[parts[i]] = {};
      node = node[parts[i]];
    }
    node[parts[parts.length - 1]] = tokenObj;
  }
  return result;
}

const output = {};
for (const [cat, tokens] of Object.entries(flat)) {
  output[cat] = unflattenCategory(tokens);
}

// Write output with "MUI" as the set
fs.writeFileSync(outputPath, JSON.stringify({ MUI: output }, null, 2));
console.log(`✅ tokens-studio.json written to ${outputPath}`);

// Helper to capitalize type if not in mapping
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}