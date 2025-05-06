const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract fontWeight tokens from typography
const fontWeightTokens = {
  'light': {
    $type: 'fontWeight',
    $value: theme.typography.fontWeightLight.toString()
  },
  'regular': {
    $type: 'fontWeight',
    $value: theme.typography.fontWeightRegular.toString()
  },
  'medium': {
    $type: 'fontWeight',
    $value: theme.typography.fontWeightMedium.toString()
  },
  'bold': {
    $type: 'fontWeight',
    $value: theme.typography.fontWeightBold.toString()
  }
};

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-font-weight.json');
fs.writeFileSync(outPath, JSON.stringify(fontWeightTokens, null, 2));
console.log(`MUI font weight tokens written to ${outPath}`);
