const fs = require('fs');

// Read the MUI theme JSON
const theme = JSON.parse(fs.readFileSync('mui-default-theme.json', 'utf-8'));

// Helper: Recursively flatten and filter only primitives, building nested structure
function extractPrimitives(obj) {
  if (typeof obj !== 'object' || obj === null) return undefined;
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      result[key] = { value };
    } else if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        if (
          typeof item === 'string' ||
          typeof item === 'number' ||
          typeof item === 'boolean'
        ) {
          result[`${key}-${idx}`] = { value: item };
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      const nested = extractPrimitives(value);
      if (nested && Object.keys(nested).length > 0) {
        result[key] = nested;
      }
    }
  }
  return result;
}

const tokens = {
  color: extractPrimitives(theme.palette) || {},
  font: {
    size: extractPrimitives(
      Object.fromEntries(
        Object.entries(theme.typography || {}).filter(
          ([, v]) => v && typeof v === 'object' && v.fontSize
        ).map(([k, v]) => [k, v.fontSize])
      )
    ) || {},
  },
  size: {
    radius: extractPrimitives(theme.shape) || {},
  },
};

// Write the output
fs.writeFileSync('mui-to-tokens.json', JSON.stringify(tokens, null, 2));
console.log('Tokens Studio JSON written to mui-to-tokens.json');