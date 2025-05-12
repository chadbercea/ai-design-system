const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract fontSizes tokens from typography
const fontSizesTokens = {};

// MUI's typography object has a global fontSizes and per-style fontSizes overrides
fontSizesTokens['global'] = {
  $type: 'fontSizes',
  $value: theme.typography.fontSizes.toString()
};

// Add per-style fontSizes overrides if they exist
for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].fontSizes
  ) {
    fontSizesTokens[key] = {
      $type: 'fontSizes',
      $value: theme.typography[key].fontSizes.toString()
    };
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-font-size.json');
fs.writeFileSync(outPath, JSON.stringify(fontSizesTokens, null, 2));
console.log(`MUI font size tokens written to ${outPath}`);
