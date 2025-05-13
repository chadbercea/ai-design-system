const fs = require('fs');
const path = require('path');

const themePath = path.join(__dirname, '../token-studio-sync-provider/theme.json');
const corePath = path.join(__dirname, '../token-studio-sync-provider/core.json');
const outputPath = path.join(__dirname, '../token-studio-sync-provider/theme.fixed.json');

const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));
const core = JSON.parse(fs.readFileSync(corePath, 'utf8'));
const validKeys = new Set(Object.keys(core));

// Recursively find and fix references in an object
function fixReferences(obj, fixCount = { count: 0 }) {
  if (typeof obj === 'string') {
    return obj.replace(/\{([^}]+)\}/g, (match, ref) => {
      if (validKeys.has(ref)) return `{${ref}}`;
      // Try to use the last two segments as a flat key (e.g., green.400)
      const parts = ref.split('.');
      if (parts.length >= 2) {
        const flatKey = parts.slice(-2).join('.');
        if (validKeys.has(flatKey)) {
          fixCount.count++;
          return `{${flatKey}}`;
        }
      }
      return match;
    });
  } else if (Array.isArray(obj)) {
    return obj.map(item => fixReferences(item, fixCount));
  } else if (typeof obj === 'object' && obj !== null) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = fixReferences(v, fixCount);
    }
    return out;
  }
  return obj;
}

const fixedTheme = fixReferences(theme);
fs.writeFileSync(outputPath, JSON.stringify(fixedTheme, null, 2));
console.log('theme.fixed.json written.'); 