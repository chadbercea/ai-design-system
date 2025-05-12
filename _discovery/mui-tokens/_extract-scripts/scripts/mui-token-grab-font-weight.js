const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract fontWeights tokens from typography
const fontWeightsTokens = {
  'light': {
    $type: 'fontWeights',
    $value: theme.typography.fontWeightsLight.toString()
  },
  'regular': {
    $type: 'fontWeights',
    $value: theme.typography.fontWeightsRegular.toString()
  },
  'medium': {
    $type: 'fontWeights',
    $value: theme.typography.fontWeightsMedium.toString()
  },
  'bold': {
    $type: 'fontWeights',
    $value: theme.typography.fontWeightsBold.toString()
  }
};

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-font-weight.json');
fs.writeFileSync(outPath, JSON.stringify(fontWeightsTokens, null, 2));
console.log(`MUI font weight tokens written to ${outPath}`);
