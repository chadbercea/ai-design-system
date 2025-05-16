const fs = require('fs');
const path = require('path');

const foundationsPath = path.resolve(__dirname, '../_json/DDS Foundations.json');
const foundations = JSON.parse(fs.readFileSync(foundationsPath, 'utf8'));

// Fix breakpoints format
if (foundations.breakpoints) {
  Object.keys(foundations.breakpoints).forEach(key => {
    const bp = foundations.breakpoints[key];
    if (bp.value !== undefined) {
      bp.$value = `${bp.value}px`;
      delete bp.value;
    }
  });
}

fs.writeFileSync(foundationsPath, JSON.stringify(foundations, null, 2));
console.log('DDS Foundations.json updated with canonical breakpoint format.'); 