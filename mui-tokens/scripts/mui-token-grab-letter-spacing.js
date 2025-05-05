// mui-tokens/mui-token-grab-letter-spacing.js

const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract letterSpacing tokens from typography
const letterSpacingTokens = {};

for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].letterSpacing
  ) {
    letterSpacingTokens[key] = theme.typography[key].letterSpacing;
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-letter-spacing.json');
fs.writeFileSync(outPath, JSON.stringify(letterSpacingTokens, null, 2));
console.log(`MUI letter spacing tokens written to ${outPath}`);