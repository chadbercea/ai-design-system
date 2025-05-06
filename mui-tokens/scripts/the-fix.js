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

// Helper: Recursively search for a value in the MUI tokens by path
function findMuiValue(pathArr, muiNode) {
  let node = muiNode;
  for (const key of pathArr) {
    if (node && typeof node === 'object' && key in node) {
      node = node[key];
    } else {
      return undefined;
    }
  }
  // If we find a $value, return it
  if (node && typeof node === 'object' && '$value' in node) {
    return node['$value'];
  }
  return undefined;
}

// Recursively walk the core structure and replace $value with MUI value if found
function mergeTokens(coreNode, muiNode, pathArr = []) {
  if (coreNode && typeof coreNode === 'object' && '$value' in coreNode) {
    // Try to find a matching value in muiNode by path
    const muiValue = findMuiValue(pathArr, mui);
    return {
      ...coreNode,
      $value: muiValue !== undefined ? muiValue : coreNode.$value
    };
  }
  // Recurse for objects
  if (coreNode && typeof coreNode === 'object') {
    const result = Array.isArray(coreNode) ? [] : {};
    for (const key in coreNode) {
      result[key] = mergeTokens(coreNode[key], muiNode ? muiNode[key] : undefined, [...pathArr, key]);
    }
    return result;
  }
  // Primitive value, just return
  return coreNode;
}

// Merge and write output
const output = mergeTokens(core, mui);
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`✅ tokens-studio.json written to ${outputPath}`);

// Helper to capitalize type if not in mapping
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}