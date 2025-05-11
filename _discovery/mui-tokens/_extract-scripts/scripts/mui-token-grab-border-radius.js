const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Extract the shape (border radius) object
const borderRadiusTokens = {};

// If theme.shape has multiple keys, use them; otherwise, use 'default'
const shapeKeys = Object.keys(theme.shape);
if (shapeKeys.length === 1 && shapeKeys[0] === 'borderRadius') {
  borderRadiusTokens['default'] = {
    $type: 'borderRadius',
    $value: theme.shape.borderRadius
  };
} else {
  for (const key of shapeKeys) {
    borderRadiusTokens[key] = {
      $type: 'borderRadius',
      $value: theme.shape[key]
    };
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-border-radius.json');
fs.writeFileSync(outPath, JSON.stringify(borderRadiusTokens, null, 2));
console.log(`MUI border radius tokens written to ${outPath}`);
