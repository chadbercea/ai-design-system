const fs = require('fs');
const path = require('path');

const foundationsPath = path.resolve(__dirname, '../_json/DDS Foundations.json');
const foundations = JSON.parse(fs.readFileSync(foundationsPath, 'utf8'));

// Map old numeric keys to new atomic string keys
const keyMap = {
  '0': 'default',
  '1.5': 'tight',
  '2': 'wide'
};

if (foundations.letterSpacing) {
  const fixed = {};
  Object.keys(foundations.letterSpacing).forEach(key => {
    const newKey = keyMap[key] || key;
    fixed[newKey] = foundations.letterSpacing[key];
  });
  foundations.letterSpacing = fixed;
}

fs.writeFileSync(foundationsPath, JSON.stringify(foundations, null, 2));
console.log('DDS Foundations.json updated with atomic string keys for letterSpacing.'); 