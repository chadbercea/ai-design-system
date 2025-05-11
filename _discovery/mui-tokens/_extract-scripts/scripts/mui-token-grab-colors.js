const fs = require('fs');
const path = require('path');
const colors = require('@mui/material/colors');

// List of color names available in the package
const colorNames = [
  'blue', 'red', 'green', 'purple', 'orange', 'yellow', 'pink', 'indigo', 'teal', 'cyan',
  'amber', 'deepOrange', 'deepPurple', 'lightBlue', 'lightGreen', 'lime', 'brown', 'grey', 'blueGrey'
];

const output = {};
for (const colorName of colorNames) {
  if (colors[colorName]) {
    for (const shade in colors[colorName]) {
      output[`${colorName}.${shade}`] = {
        $type: 'color',
        $value: colors[colorName][shade]
      };
    }
  }
}

const outPath = path.join(__dirname, 'mui-token-colors.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`MUI color tokens written to ${outPath}`);
