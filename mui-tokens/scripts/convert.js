const fs = require('fs');
const path = require('path');

// Paths
const MUI_THEME_PATH = path.join(__dirname, 'mui-default-theme.json');
const SYNC_PROVIDER_DIR = path.join(__dirname, '../token-studio-sync-provider');
const FILES_TO_UPDATE = ['core.json', 'light.json', 'dark.json', 'theme.json'];

// Load MUI theme
const muiTheme = JSON.parse(fs.readFileSync(MUI_THEME_PATH, 'utf-8'));

// Helper: Recursively get value from MUI theme by path array
function getMuiValue(pathArr, obj = muiTheme) {
  return pathArr.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

// Helper: Recursively update tokens in sync provider file
function updateTokens(obj, pathArr = []) {
  if (typeof obj !== 'object' || obj === null) return obj;

  const updated = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    // If this is a leaf token (has a "value" property), try to update it
    if (obj[key] && typeof obj[key] === 'object' && 'value' in obj[key]) {
      // Try both the current path and a "palette" prefix for color tokens
      let muiValue = getMuiValue([...pathArr, key]);
      if (muiValue === undefined && pathArr[0] === 'color') {
        muiValue = getMuiValue(['palette', ...pathArr.slice(1), key]);
      }
      if (
        typeof muiValue === 'string' ||
        typeof muiValue === 'number' ||
        typeof muiValue === 'boolean'
      ) {
        // Infer type
        let type = typeof muiValue === 'string' && muiValue.startsWith('#') ? 'color'
          : typeof muiValue === 'number' ? 'dimension'
          : typeof muiValue === 'string' && muiValue.match(/px|rem|em|%|vh|vw|pt|cm|mm|in|ex|ch|vmin|vmax|pc/) ? 'dimension'
          : 'other';
        updated[key] = { value: muiValue, type };
      } else {
        // Leave as is if no value
        updated[key] = obj[key];
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      updated[key] = updateTokens(obj[key], [...pathArr, key]);
    } else {
      updated[key] = obj[key];
    }
  }
  return updated;
}

// Main process
FILES_TO_UPDATE.forEach((file) => {
  const filePath = path.join(SYNC_PROVIDER_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} (does not exist)`);
    return;
  }
  const original = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const updated = updateTokens(original);
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  console.log(`Updated ${file}`);
});

console.log('All eligible token files updated from MUI theme.');