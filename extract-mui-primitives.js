const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '_discovery/mui-tokens/mui-tokens-raw.json');
const OUTPUT = path.join(__dirname, '_discovery/mui-tokens/primitives.json');

// Allowed types from DTC
const allowedTypes = [
  "color", "fontSizes", "fontWeights", "fontFamilies", "lineHeights", "letterSpacing", "borderRadius", "borderWidths", "spacing", "sizing", "opacity", "boxShadow", "typography", "paragraphSpacing", "textCase", "textDecoration", "composition", "dimension", "breakpoints", "border", "zIndex", "duration", "assets", "boolean", "text", "number", "other"
];

// Helper: infer $type from key path
function inferType(key) {
  const k = key.toLowerCase();
  if (k.includes('color')) return 'color';
  if (k.includes('fontsize') || k.includes('fontsizes')) return 'fontSizes';
  if (k.includes('fontweight') || k.includes('fontweights')) return 'fontWeights';
  if (k.includes('fontfamily') || k.includes('fontfamilies')) return 'fontFamilies';
  if (k.includes('lineheight')) return 'lineHeights';
  if (k.includes('letterspacing')) return 'letterSpacing';
  if (k.includes('borderradius')) return 'borderRadius';
  if (k.includes('borderwidth')) return 'borderWidths';
  if (k.includes('spacing')) return 'spacing';
  if (k.includes('sizing')) return 'sizing';
  if (k.includes('opacity')) return 'opacity';
  if (k.includes('boxshadow')) return 'boxShadow';
  if (k.includes('typography')) return 'typography';
  if (k.includes('paragraphspacing')) return 'paragraphSpacing';
  if (k.includes('textcase')) return 'textCase';
  if (k.includes('textdecoration')) return 'textDecoration';
  if (k.includes('composition')) return 'composition';
  if (k.includes('dimension')) return 'dimension';
  if (k.includes('breakpoint')) return 'breakpoints';
  if (k.includes('border')) return 'border';
  if (k.includes('zindex')) return 'zIndex';
  if (k.includes('duration')) return 'duration';
  if (k.includes('asset')) return 'assets';
  if (k.includes('boolean')) return 'boolean';
  if (k.includes('text')) return 'text';
  if (k.includes('number')) return 'number';
  return 'other';
}

// Helper: check if value is a true primitive
function isPrimitiveValue(val) {
  if (typeof val === 'number') return true;
  if (typeof val !== 'string') return false;
  if (/^#([0-9a-f]{3,8})$/i.test(val)) return true; // hex color
  if (/^rgba?\([\d\s.,]+\)$/i.test(val)) return true; // rgba color
  if (/^\d+(px|rem|em|%)$/.test(val)) return true; // px, rem, em, %
  if (/^\d+(\.\d+)?(ms|s)?$/.test(val)) return true; // durations
  if (/^[0-9.]+$/.test(val)) return true; // plain numbers as string
  return false;
}

// Helper: flatten key to canonical form
function canonicalKey(key) {
  // For color scales, keep e.g. blue.500, red.100
  const colorMatch = key.match(/([a-zA-Z]+\.[0-9A-Za-z]+)/);
  if (colorMatch) return colorMatch[1];
  // Otherwise, use last segment
  const segments = key.split('.');
  return segments[segments.length - 1];
}

// Helper: generate human-readable description
function makeDescription(key, type) {
  // For color scales: blue.500 => Blue 500
  if (type === 'color' && key.match(/^[a-zA-Z]+\.[0-9A-Za-z]+$/)) {
    const [color, shade] = key.split('.');
    return `${capitalize(color)} ${shade}`;
  }
  // Otherwise, split camelCase or PascalCase
  return capitalize(key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\./g, ' '));
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Recursively flatten and extract DTC-compliant primitives
function extractPrimitives(obj, prefix = '', out = {}) {
  for (const key in obj) {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if ((typeof value === 'string' || typeof value === 'number') && isPrimitiveValue(value)) {
      const type = inferType(fullKey);
      if (!allowedTypes.includes(type)) continue;
      const canonKey = canonicalKey(fullKey);
      // No double nesting, no plural, no wrappers
      if (canonKey in out) continue; // skip duplicates
      out[canonKey] = {
        "$type": type,
        "$value": typeof value === 'string' && /^[0-9.]+$/.test(value) ? Number(value) : value,
        "$description": makeDescription(canonKey, type)
      };
    } else if (Array.isArray(value)) {
      continue;
    } else if (value && typeof value === 'object' && Object.keys(value).length > 0) {
      extractPrimitives(value, fullKey, out);
    }
  }
  return out;
}

// Main
const raw = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const primitives = extractPrimitives(raw);
fs.writeFileSync(OUTPUT, JSON.stringify(primitives, null, 2));
console.log(`Extracted ${Object.keys(primitives).length} strict DTC-compliant primitives to primitives.json`); 