const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract fontFamilies tokens from typography
const fontFamiliesTokens = {};

// MUI's typography object has a global fontFamilies and per-style fontFamilies overrides
fontFamiliesTokens['global'] = {
  $type: 'fontFamilies',
  $value: theme.typography.fontFamilies
};

// Add per-style fontFamilies overrides if they exist
for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].fontFamilies
  ) {
    fontFamiliesTokens[key] = {
      $type: 'fontFamilies',
      $value: theme.typography[key].fontFamilies
    };
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-font-family.json');
fs.writeFileSync(outPath, JSON.stringify(fontFamiliesTokens, null, 2));
console.log(`MUI font family tokens written to ${outPath}`);
