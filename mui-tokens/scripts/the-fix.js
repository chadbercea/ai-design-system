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
const muiPath = path.join(__dirname, '../w3c-tokens.json');
const outputPath = path.join(__dirname, '../../build/tokens-studio.json');

// Read MUI tokens
const mui = JSON.parse(fs.readFileSync(muiPath, 'utf-8'));

// Helper: Recursively flatten tokens to dot.notation keys
function flattenTokens(obj, parentKeys = []) {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && ('$value' in value || '$type' in value)) {
      // This is a token object
      const tokenName = [...parentKeys, key].join('.');
      const tokenObj = {};
      if ('$type' in value) tokenObj['$type'] = value['$type'];
      if ('$value' in value) tokenObj['$value'] = value['$value'];
      if ('$description' in value) tokenObj['$description'] = value['$description'];
      result[tokenName] = tokenObj;
    } else if (value && typeof value === 'object') {
      // Recurse
      Object.assign(result, flattenTokens(value, [...parentKeys, key]));
    }
  }
  return result;
}

// Flatten all tokens under MUI
const flatTokens = flattenTokens(mui);

// Build the output: all tokens are direct children of "MUI"
const output = { MUI: flatTokens };

// Write output
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`✅ tokens-studio.json written to ${outputPath}`);

// Helper to capitalize type if not in mapping
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}