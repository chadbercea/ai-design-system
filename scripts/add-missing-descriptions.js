const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../token-studio-sync-provider/core.json');

let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function addDescriptions(obj, keyPath = []) {
  if (typeof obj !== 'object' || obj === null) return;
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null && ('$value' in value || '$type' in value)) {
      if (!('$description' in value)) {
        value['$description'] = `Auto-generated description for ${[...keyPath, key].join('.')}`;
      }
    }
    if (typeof value === 'object') {
      addDescriptions(value, [...keyPath, key]);
    }
  }
}

addDescriptions(data);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('✅ All missing $description fields added to core.json'); 