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
  '--destructive-foreground',
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

// Fallback values from shadcn docs (using HSL format for compatibility)
const FALLBACKS = {
  '--radius': '0.625rem',
  '--background': 'hsl(0 0% 100%)',
  '--foreground': 'hsl(222.2 84% 4.9%)',
  '--card': 'hsl(0 0% 100%)',
  '--card-foreground': 'hsl(222.2 84% 4.9%)',
  '--popover': 'hsl(0 0% 100%)',
  '--popover-foreground': 'hsl(222.2 84% 4.9%)',
  '--primary': 'hsl(221.2 83.2% 53.3%)',
  '--primary-foreground': 'hsl(210 40% 98%)',
  '--secondary': 'hsl(210 40% 96.1%)',
  '--secondary-foreground': 'hsl(222.2 47.4% 11.2%)',
  '--muted': 'hsl(210 40% 96.1%)',
  '--muted-foreground': 'hsl(215.4 16.3% 46.9%)',
  '--accent': 'hsl(210 40% 96.1%)',
  '--accent-foreground': 'hsl(222.2 47.4% 11.2%)',
  '--destructive': 'hsl(0 84.2% 60.2%)',
  '--destructive-foreground': 'hsl(210 40% 98%)',
  '--border': 'hsl(214.3 31.8% 91.4%)',
  '--input': 'hsl(214.3 31.8% 91.4%)',
  '--ring': 'hsl(221.2 83.2% 53.3%)',
  '--chart-1': 'hsl(12 76% 61%)',
  '--chart-2': 'hsl(173 58% 39%)',
  '--chart-3': 'hsl(197 37% 24%)',
  '--chart-4': 'hsl(43 74% 66%)',
  '--chart-5': 'hsl(27 87% 67%)',
  '--sidebar': 'hsl(210 40% 98%)',
  '--sidebar-foreground': 'hsl(222.2 84% 4.9%)',
  '--sidebar-primary': 'hsl(221.2 83.2% 53.3%)',
  '--sidebar-primary-foreground': 'hsl(210 40% 98%)',
  '--sidebar-accent': 'hsl(210 40% 96.1%)',
  '--sidebar-accent-foreground': 'hsl(222.2 47.4% 11.2%)',
  '--sidebar-border': 'hsl(214.3 31.8% 91.4%)',
  '--sidebar-ring': 'hsl(221.2 83.2% 53.3%)',
};

// Convert hex/rgba to HSL format
function toHSL(val) {
  if (typeof val !== 'string') return val;
  if (val.startsWith('hsl(')) return val;
  
  // Handle hex colors
  if (val.startsWith('#')) {
    // Convert hex to HSL
    const hex = val.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    
    if (max === min) {
      // Grayscale
      return `hsl(0 0% ${Math.round(l * 100)}%)`;
    }
    
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    let h;
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
    
    const hue = Math.round(h * 360 * 10) / 10;
    const saturation = Math.round(s * 1000) / 10;
    const lightness = Math.round(l * 1000) / 10;
    
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  }
  
  // Handle rgba colors
  if (val.startsWith('rgba(')) {
    // Extract rgba values and convert to HSL
    const rgba = val.match(/rgba?\(([^)]+)\)/);
    if (rgba) {
      const [r, g, b, a] = rgba[1].split(',').map(x => parseFloat(x.trim()));
      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;
      
      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      const l = (max + min) / 2;
      
      if (max === min) {
        return `hsl(0 0% ${Math.round(l * 100)}%)`;
      }
      
      const d = max - min;
      const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      let h;
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
      
      const hue = Math.round(h * 360 * 10) / 10;
      const saturation = Math.round(s * 1000) / 10;
      const lightness = Math.round(l * 1000) / 10;
      
      return `hsl(${hue} ${saturation}% ${lightness}%)`;
    }
  }
  
  // If we can't convert, return the original value
  return val;
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
    '--destructive-foreground': mode === 'dark' ? 'Grey.50' : 'White.100%',
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
  // For colors, convert to HSL if possible
  const hsl = toHSL(token.$value);
  return hsl;
}

function generateBlock(tokens, mode = 'light') {
  return VARS.map(v => {
    const dds = getDDSValue(tokens, v, mode);
    const val = dds || FALLBACKS[v];
    return `  ${v}: ${val};`;
  }).join('\n');
}

function generateFontVariables(tokens) {
  const marketing = tokens['marketing']?.$value || 'Poppins';
  const product = tokens['product']?.$value || 'Inter';
  const code = tokens['code']?.$value || 'Roboto Mono';
  
  return `    --font-family-sans: ${product}, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-family-heading: ${marketing}, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-family-mono: ${code}, ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;`;
}

function generateBorderVariables(tokens) {
  const borderWidth = tokens['sm']?.$value || '0.125rem';
  const borderRadius = tokens['rounded']?.$value || '0.5rem';
  
  return `    --border-width: ${borderWidth};
    --border-radius: ${borderRadius};`;
}

function generateFontSizeVariables(tokens) {
  const sizes = ['10', '12', '14', '16', '18', '21', '24', '32', '40', '48'];
  return sizes.map(size => {
    const value = tokens[size]?.$value || size;
    return `    --font-${size}: ${value};`;
  }).join('\n');
}

function generateFontWeightVariables(tokens) {
  const weights = {
    'extrabold': tokens['extrabold']?.$value || '900',
    'bold': tokens['bold']?.$value || '700',
    'semibold': tokens['semibold']?.$value || '500',
    'regular': tokens['regular']?.$value || '400',
    'light': tokens['light']?.$value || '300'
  };
  
  return Object.entries(weights).map(([name, value]) => {
    return `    --font-${name}: ${value};`;
  }).join('\n');
}

function generateOtherVariables(tokens) {
  const otherTokens = [
    'xs', 'lg', 'xl', 'xxl', 'Icon.xxs', 'Icon.xs', 'Icon.sm', 'Icon.md', 'Icon.lg',
    'hover', 'selected', 'focus', 'focusVisible', 'outlinedBorder', 'active', 'disabled'
  ];
  
  return otherTokens.map(tokenKey => {
    const token = tokens[tokenKey];
    if (!token) return null;
    const varName = tokenKey.replace('.', '-').toLowerCase();
    return `    --${varName}: ${token.$value};`;
  }).filter(Boolean).join('\n');
}

function main() {
  const tokensPath = path.join(__dirname, '../build/json/tokens.json');
  const outPath = path.join(__dirname, '../build/v0/globals.css');
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

  const rootBlock = generateBlock(tokens, 'light');
  const darkBlock = generateBlock(tokens, 'dark');
  const fontVariables = generateFontVariables(tokens);
  const borderVariables = generateBorderVariables(tokens);
  const fontSizeVariables = generateFontSizeVariables(tokens);
  const fontWeightVariables = generateFontWeightVariables(tokens);
  const otherVariables = generateOtherVariables(tokens);

  const css = `/* Load Inter font */
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter_18pt-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter_18pt-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter_18pt-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Load Poppins font */
@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-SemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  :root {
${rootBlock}
${fontVariables}
${borderVariables}
${fontSizeVariables}
${fontWeightVariables}
${otherVariables}
  }

  .dark {
${darkBlock}
${fontVariables}
${borderVariables}
${fontSizeVariables}
${fontWeightVariables}
${otherVariables}
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-family-sans);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out forwards;
}

@layer components {
  button,
  .button,
  [role="button"] {
    border-radius: var(--border-radius) !important;
  }
}
`;
  fs.writeFileSync(outPath, css);
  console.log('Generated build/v0/globals.css');
}

if (require.main === module) main(); 