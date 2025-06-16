// Validation utility for DDS <-> MUI theme mapping
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MUI theme structure that we expect to be filled
const requiredMuiTheme = {
  palette: {
    primary: { main: '', light: '', dark: '', contrastText: '' },
    secondary: { main: '', light: '', dark: '', contrastText: '' },
    error: { main: '', light: '', dark: '', contrastText: '' },
    warning: { main: '', light: '', dark: '', contrastText: '' },
    info: { main: '', light: '', dark: '', contrastText: '' },
    success: { main: '', light: '', dark: '', contrastText: '' },
    grey: {},
    text: { primary: '', secondary: '', disabled: '' },
    background: { default: '', paper: '' }
  },
  typography: {
    fontFamily: '',
    fontSize: '',
    fontWeightLight: '',
    fontWeightRegular: '',
    fontWeightMedium: '',
    fontWeightBold: '',
    h1: { fontFamily: '', fontWeight: '', fontSize: '', lineHeight: '', letterSpacing: '' },
    h2: { fontFamily: '', fontWeight: '', fontSize: '', lineHeight: '', letterSpacing: '' },
    h3: { fontFamily: '', fontWeight: '', fontSize: '', lineHeight: '', letterSpacing: '' },
    h4: { fontFamily: '', fontWeight: '', fontSize: '', lineHeight: '', letterSpacing: '' },
    h5: { fontFamily: '', fontWeight: '', fontSize: '', lineHeight: '', letterSpacing: '' },
    h6: { fontFamily: '', fontWeight: '', fontSize: '', lineHeight: '', letterSpacing: '' }
  },
  spacing: '',
  shape: { borderRadius: '' }
};

// --- 1. Load built tokens ---
const tokensPath = path.join(__dirname, '..', 'json', 'tokens.json');
let tokens;
try {
  tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
} catch (e) {
  console.error('Failed to load build/json/tokens.json:', e);
  process.exit(1);
}

// --- 2. Load generated MUI theme ---
const muiThemePath = path.join(__dirname, 'mui-theme.js');
let muiTheme;
try {
  const muiThemeContent = fs.readFileSync(muiThemePath, 'utf8');
  // Extract the theme object from the file
  const themeMatch = muiThemeContent.match(/createTheme\((.*)\)/s);
  if (!themeMatch) {
    throw new Error('Could not find theme object in mui-theme.js');
  }
  muiTheme = JSON.parse(themeMatch[1]);
} catch (e) {
  console.error('Failed to load build/mui/mui-theme.js:', e);
  process.exit(1);
}

// --- 3. Validate theme structure ---
console.log('MUI Theme Validation Report\n');

let missing = [];
let empty = [];

function validateObject(obj, required, path = '') {
  for (const [key, value] of Object.entries(required)) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (!(key in obj)) {
      missing.push(currentPath);
      console.log(`❌ MISSING: ${currentPath}`);
    } else if (typeof value === 'object' && value !== null) {
      validateObject(obj[key], value, currentPath);
    } else if (obj[key] === '' || obj[key] === undefined) {
      empty.push(currentPath);
      console.log(`⚠️ EMPTY: ${currentPath}`);
    }
  }
}

validateObject(muiTheme, requiredMuiTheme);

if (missing.length === 0 && empty.length === 0) {
  console.log('\n✅ All required MUI theme properties are present and filled!');
  process.exit(0);
} else {
  console.log(`\n❌ Found ${missing.length} missing and ${empty.length} empty properties.`);
  process.exit(1);
} 