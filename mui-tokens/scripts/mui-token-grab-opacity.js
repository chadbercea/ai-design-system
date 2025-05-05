const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// MUI does not have a dedicated "opacity" section in the theme.
// However, some opacity values are used in the palette's "action" section.
const opacityTokens = {};

if (theme.palette && theme.palette.action) {
  for (const key in theme.palette.action) {
    if (
      typeof theme.palette.action[key] === 'number' ||
      (typeof theme.palette.action[key] === 'string' && theme.palette.action[key].match(/^\d*\.?\d+$/))
    ) {
      opacityTokens[key] = theme.palette.action[key];
    }
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'mui-token-grab-opacity.json');
fs.writeFileSync(outPath, JSON.stringify(opacityTokens, null, 2));
console.log(`MUI opacity tokens written to ${outPath}`);
