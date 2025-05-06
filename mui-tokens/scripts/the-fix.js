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

// Read input
const inputPath = path.join(__dirname, '../w3c-tokens.json');
const outputPath = path.join(__dirname, '../../build/tokens-studio.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const output = {};

// Map and copy tokens to canonical categories
for (const [key, value] of Object.entries(input)) {
  const canonicalKey = CANONICAL_MAP[key] || key;

  // Recursively map $type fields and capitalize them
  function mapTypes(obj, typeHint) {
    if (typeof obj !== 'object' || obj === null) return obj;
    if ('$value' in obj && '$type' in obj) {
      // Capitalize the type
      const canonicalType = CANONICAL_TYPES[obj['$type']] || CANONICAL_TYPES[typeHint] || capitalize(obj['$type']);
      return { $value: obj['$value'], $type: canonicalType };
    }
    const result = Array.isArray(obj) ? [] : {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = mapTypes(v, canonicalKey);
    }
    return result;
  }

  // Only output canonical categories
  if (CANONICAL_CATEGORIES.includes(canonicalKey)) {
    output[canonicalKey] = mapTypes(value, canonicalKey);
  }
}

// Optionally, fill in any missing canonical categories as empty objects
for (const cat of CANONICAL_CATEGORIES) {
  if (!output[cat]) output[cat] = {};
}

// Write output with "MUI" as the set
fs.writeFileSync(outputPath, JSON.stringify({ MUI: output }, null, 2));
console.log(`✅ Canonical tokens written to ${outputPath}`);

// Helper to capitalize type if not in mapping
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}