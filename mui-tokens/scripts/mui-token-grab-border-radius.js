const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract the shape (border radius) object
const borderRadiusTokens = { ...theme.shape };

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-border-radius.json');
fs.writeFileSync(outPath, JSON.stringify(borderRadiusTokens, null, 2));
console.log(`MUI border radius tokens written to ${outPath}`);
