const fs = require('fs');
const path = require('path');

// List of required variables and their order, as per shadcn-var-list.md
const VARS = [
  '--radius',
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--destructive',
  '--border',
  '--input',
  '--ring',
  '--chart-1',
  '--chart-2',
  '--chart-3',
  '--chart-4',
  '--chart-5',
  '--sidebar',
  '--sidebar-foreground',
  '--sidebar-primary',
  '--sidebar-primary-foreground',
  '--sidebar-accent',
  '--sidebar-accent-foreground',
  '--sidebar-border',
  '--sidebar-ring',
];

// Fallback values from shadcn docs (oklch only, as per your requirements)
const FALLBACKS = {
  '--radius': '0.625rem',
  '--background': 'oklch(1 0 0)',
  '--foreground': 'oklch(0.145 0 0)',
  '--card': 'oklch(1 0 0)',
  '--card-foreground': 'oklch(0.145 0 0)',
  '--popover': 'oklch(1 0 0)',
  '--popover-foreground': 'oklch(0.145 0 0)',
  '--primary': 'oklch(0.205 0 0)',
  '--primary-foreground': 'oklch(0.985 0 0)',
  '--secondary': 'oklch(0.97 0 0)',
  '--secondary-foreground': 'oklch(0.205 0 0)',
  '--muted': 'oklch(0.97 0 0)',
  '--muted-foreground': 'oklch(0.556 0 0)',
  '--accent': 'oklch(0.97 0 0)',
  '--accent-foreground': 'oklch(0.205 0 0)',
  '--destructive': 'oklch(0.577 0.245 27.325)',
  '--border': 'oklch(0.922 0 0)',
  '--input': 'oklch(0.922 0 0)',
  '--ring': 'oklch(0.708 0 0)',
  '--chart-1': 'oklch(0.646 0.222 41.116)',
  '--chart-2': 'oklch(0.6 0.118 184.704)',
  '--chart-3': 'oklch(0.398 0.07 227.392)',
  '--chart-4': 'oklch(0.828 0.189 84.429)',
  '--chart-5': 'oklch(0.769 0.188 70.08)',
  '--sidebar': 'oklch(0.985 0 0)',
  '--sidebar-foreground': 'oklch(0.145 0 0)',
  '--sidebar-primary': 'oklch(0.205 0 0)',
  '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
  '--sidebar-accent': 'oklch(0.97 0 0)',
  '--sidebar-accent-foreground': 'oklch(0.205 0 0)',
  '--sidebar-border': 'oklch(0.922 0 0)',
  '--sidebar-ring': 'oklch(0.708 0 0)',
};

// TODO: Implement a real hex/rgba to OKLCH converter if DDS tokens are not already in OKLCH
function toOKLCH(val) {
  if (typeof val !== 'string') return val;
  if (val.startsWith('oklch(')) return val;
  // If not OKLCH, fallback (for now)
  return null;
}

function getDDSValue(tokens, varName, mode = 'light') {
  // Map shadcn variable names to DDS token keys (customize as needed)
  // This is a minimal mapping; expand as needed for your DDS structure
  const map = {
    '--radius': 'rounded',
    '--background': mode === 'dark' ? 'Grey.900' : 'White.100%',
    '--foreground': mode === 'dark' ? 'Grey.50' : 'Black.100%',
    '--card': mode === 'dark' ? 'Grey.800' : 'White.100%',
    '--card-foreground': mode === 'dark' ? 'Grey.50' : 'Black.100%',
    '--popover': mode === 'dark' ? 'Grey.800' : 'White.100%',
    '--popover-foreground': mode === 'dark' ? 'Grey.50' : 'Black.100%',
    '--primary': 'Blue.500',
    '--primary-foreground': mode === 'dark' ? 'Grey.50' : 'White.100%',
    '--secondary': 'Violet.500',
    '--secondary-foreground': mode === 'dark' ? 'Grey.50' : 'Black.100%',
    '--muted': 'Grey.100',
    '--muted-foreground': 'Grey.400',
    '--accent': 'Grey.100',
    '--accent-foreground': 'Grey.700',
    '--destructive': 'Red.500',
    '--border': 'Grey.200',
    '--input': 'Grey.200',
    '--ring': 'Blue.300',
    '--chart-1': 'Blue.400',
    '--chart-2': 'Teal.500',
    '--chart-3': 'Violet.500',
    '--chart-4': 'Grey.300',
    '--chart-5': 'Grey.500',
    '--sidebar': mode === 'dark' ? 'Grey.800' : 'White.100%',
    '--sidebar-foreground': mode === 'dark' ? 'Grey.50' : 'Black.100%',
    '--sidebar-primary': 'Blue.500',
    '--sidebar-primary-foreground': mode === 'dark' ? 'Grey.50' : 'White.100%',
    '--sidebar-accent': 'Grey.100',
    '--sidebar-accent-foreground': 'Grey.700',
    '--sidebar-border': 'Grey.200',
    '--sidebar-ring': 'Blue.300',
  };
  const key = map[varName];
  if (!key) return null;
  const token = tokens[key];
  if (!token) return null;
  // For border radius, convert px to rem
  if (varName === '--radius') {
    const px = parseFloat(token.$value);
    return px ? (px / 16) + 'rem' : null;
  }
  // For colors, convert to OKLCH if possible
  const oklch = toOKLCH(token.$value);
  return oklch;
}

function generateBlock(tokens, mode = 'light') {
  return VARS.map(v => {
    const dds = getDDSValue(tokens, v, mode);
    const val = dds || FALLBACKS[v];
    return `  ${v}: ${val};`;
  }).join('\n');
}

function main() {
  const tokensPath = path.join(__dirname, '../build/json/tokens.json');
  const outPath = path.join(__dirname, '../build/v0/globals.css');
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

  const rootBlock = generateBlock(tokens, 'light');
  const darkBlock = generateBlock(tokens, 'dark');

  const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${rootBlock}
  }

  .dark {
${darkBlock}
  }
}
`;
  fs.writeFileSync(outPath, css);
  console.log('Generated build/v0/globals.css');
}

if (require.main === module) main(); 