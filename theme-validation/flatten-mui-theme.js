// Script to flatten MUI's default theme into dot-notated keys
import { createTheme } from '@mui/material/styles/createTheme.js';
import fs from 'fs';

function flatten(obj, prefix = '', result = {}) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flatten(value, path, result);
    } else {
      result[path] = value;
    }
  }
  return result;
}

const theme = createTheme();
const flat = flatten(theme);
const keys = Object.keys(flat).sort();

fs.writeFileSync('theme-validation/mui-theme-keys.txt', keys.join('\n'), 'utf-8');
console.log(`Flattened ${keys.length} keys to theme-validation/mui-theme-keys.txt`); 