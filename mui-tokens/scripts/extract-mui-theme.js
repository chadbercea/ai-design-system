const fs = require('fs');
const { default: defaultTheme } = require('@mui/material/styles/defaultTheme');

fs.writeFileSync('mui-default-theme.json', JSON.stringify(defaultTheme, null, 2));
console.log('Extracted full MUI default theme from the package.');
