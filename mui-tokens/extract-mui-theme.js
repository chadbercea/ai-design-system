const fs = require('fs');
const { createTheme } = require('@mui/material/styles');

// Create the default MUI theme
const theme = createTheme();

// Serialize the theme to JSON
const themeJson = JSON.stringify(theme, null, 2);

// Write the JSON to the current directory
fs.writeFileSync('./mui-default-theme.json', themeJson);

console.log('MUI default theme exported to ./mui-tokens/mui-default-theme.json');
