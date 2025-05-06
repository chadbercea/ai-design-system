const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract fontFamily tokens from typography
const fontFamilyTokens = {};

// MUI's typography object has a global fontFamily and per-style fontFamily overrides
fontFamilyTokens['global'] = {
  $type: 'fontFamily',
  $value: theme.typography.fontFamily
};

// Add per-style fontFamily overrides if they exist
for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].fontFamily
  ) {
    fontFamilyTokens[key] = {
      $type: 'fontFamily',
      $value: theme.typography[key].fontFamily
    };
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-font-family.json');
fs.writeFileSync(outPath, JSON.stringify(fontFamilyTokens, null, 2));
console.log(`MUI font family tokens written to ${outPath}`);
