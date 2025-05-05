const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract fontSize tokens from typography
const fontSizeTokens = {};

// MUI's typography object has a global fontSize and per-style fontSize overrides
fontSizeTokens.global = theme.typography.fontSize;

for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].fontSize
  ) {
    fontSizeTokens[key] = theme.typography[key].fontSize;
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-font-size.json');
fs.writeFileSync(outPath, JSON.stringify(fontSizeTokens, null, 2));
console.log(`MUI font size tokens written to ${outPath}`);
