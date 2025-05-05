const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract spacing base and breakpoints
const dimensionTokens = {
  spacing: theme.spacing(1), // MUI's base spacing unit (usually 8)
  breakpoints: { ...theme.breakpoints.values }
};

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-dimension.json');
fs.writeFileSync(outPath, JSON.stringify(dimensionTokens, null, 2));
console.log(`MUI dimension tokens written to ${outPath}`);
