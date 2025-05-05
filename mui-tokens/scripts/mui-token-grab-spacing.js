const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// MUI's spacing is a function, but the default increment is 8
// We'll output the base value and a sample scale (0-10)
const spacingTokens = {
  base: 8, // MUI's default base spacing unit
  scale: {}
};

for (let i = 0; i <= 10; i++) {
  spacingTokens.scale[i] = theme.spacing(i);
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-grab-spacing.json');
fs.writeFileSync(outPath, JSON.stringify(spacingTokens, null, 2));
console.log(`MUI spacing tokens written to ${outPath}`);
