const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract lineHeight tokens from typography
const lineHeightTokens = {};

// Add line height values for each typography style that has it
for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].lineHeight
  ) {
    lineHeightTokens[key] = {
      $type: 'lineHeight',
      $value: theme.typography[key].lineHeight.toString()
    };
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-line-height.json');
fs.writeFileSync(outPath, JSON.stringify(lineHeightTokens, null, 2));
console.log(`MUI line height tokens written to ${outPath}`);
