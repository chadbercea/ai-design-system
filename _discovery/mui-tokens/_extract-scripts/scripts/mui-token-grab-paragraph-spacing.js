const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract paragraphSpacing tokens from typography variants
const paragraphSpacingTokens = {};

// Add paragraph spacing values for each typography style that has it
for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].paragraphSpacing !== undefined
  ) {
    paragraphSpacingTokens[key] = {
      $type: 'paragraphSpacing',
      $value: theme.typography[key].paragraphSpacing.toString()
    };
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-paragraph-spacing.json');
fs.writeFileSync(outPath, JSON.stringify(paragraphSpacingTokens, null, 2));
console.log(`MUI paragraph spacing tokens written to ${outPath}`);
