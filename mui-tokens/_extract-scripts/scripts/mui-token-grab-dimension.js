const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

const dimensionTokens = {};

// Add base spacing
// MUI's spacing(1) is usually 8px
// Output as string for consistency with TS
const baseSpacing = theme.spacing(1);
dimensionTokens['spacing'] = {
  $type: 'dimension',
  $value: typeof baseSpacing === 'number' ? baseSpacing.toString() : baseSpacing
};

// Add breakpoints (sm, md, lg, xl, etc.)
for (const [key, value] of Object.entries(theme.breakpoints.values)) {
  dimensionTokens[`breakpoint${key.charAt(0).toUpperCase() + key.slice(1)}`] = {
    $type: 'dimension',
    $value: value.toString()
  };
}

const outPath = path.join(__dirname, 'mui-token-dimension.json');
fs.writeFileSync(outPath, JSON.stringify(dimensionTokens, null, 2));
console.log(`MUI dimension tokens written to ${outPath}`);
