const fs = require('fs');
const path = require('path');

// Canonical category and type mapping
const CANONICAL_MAP = {
  color: 'colors',
  fontFamily: 'fontFamilies',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  radius: 'borderRadius',
  opacity: 'opacity',
  spacing: 'spacing',
  paragraphSpacing: 'paragraphSpacing',
  borderRadius: 'borderRadius',
  dimension: 'dimension', // for completeness, but not canonical in TS
  letterSpacing: 'letterSpacing'
};

const CANONICAL_TYPES = {
  color: 'color',
  fontFamily: 'fontFamilies',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  radius: 'borderRadius',
  borderRadius: 'borderRadius',
  opacity: 'opacity',
  spacing: 'spacing',
  paragraphSpacing: 'paragraphSpacing',
  letterSpacing: 'letterSpacing'
};

// All canonical categories expected by Tokens Studio
const CANONICAL_CATEGORIES = [
  'colors',
  'fontFamilies',
  'fontSizes',
  'fontWeights',
  'lineHeights',
  'borderRadius',
  'opacity',
  'spacing',
  'paragraphSpacing',
  'letterSpacing'
];

// Read input
const inputPath = path.join(__dirname, '../w3c-tokens.json');
const outputPath = path.join(__dirname, '../tokens-studio.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const output = {};

// Map and copy tokens to canonical categories
for (const [key, value] of Object.entries(input)) {
  const canonicalKey = CANONICAL_MAP[key] || key;
  if (!output[canonicalKey]) output[canonicalKey] = {};

  // Recursively map $type fields
  function mapTypes(obj, typeHint) {
    if (typeof obj !== 'object' || obj === null) return obj;
    if ('$value' in obj && '$type' in obj) {
      const canonicalType = CANONICAL_TYPES[obj['$type']] || obj['$type'] || typeHint;
      return { $value: obj['$value'], $type: canonicalType };
    }
    const result = Array.isArray(obj) ? [] : {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = mapTypes(v, CANONICAL_TYPES[canonicalKey]);
    }
    return result;
  }

  output[canonicalKey] = mapTypes(value, CANONICAL_TYPES[canonicalKey]);
}

// Fill in any missing canonical categories as empty objects
for (const cat of CANONICAL_CATEGORIES) {
  if (!output[cat]) output[cat] = {};
}

// Write output
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`✅ Canonical tokens written to ${outputPath}`);
