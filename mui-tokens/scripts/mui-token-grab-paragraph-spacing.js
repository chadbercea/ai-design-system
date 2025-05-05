const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Attempt to extract paragraphSpacing from typography variants
const paragraphSpacingTokens = {};

for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].paragraphSpacing !== undefined
  ) {
    paragraphSpacingTokens[key] = theme.typography[key].paragraphSpacing;
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-grab-paragraph-spacing.json');
fs.writeFileSync(outPath, JSON.stringify(paragraphSpacingTokens, null, 2));
console.log(`MUI paragraph spacing tokens written to ${outPath}`);
