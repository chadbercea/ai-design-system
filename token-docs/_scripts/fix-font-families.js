const fs = require('fs');
const path = require('path');

const foundationsPath = path.resolve(__dirname, '../_json/DDS Foundations.json');
const foundations = JSON.parse(fs.readFileSync(foundationsPath, 'utf8'));

// Fix font families format
if (foundations.fontFamilies) {
  const fixed = {};
  Object.keys(foundations.fontFamilies).forEach(key => {
    const newKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    fixed[newKey] = foundations.fontFamilies[key];
  });
  foundations.fontFamilies = fixed;
}

fs.writeFileSync(foundationsPath, JSON.stringify(foundations, null, 2));
console.log('DDS Foundations.json updated with canonical font family format.'); 