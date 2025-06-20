const fs = require('fs');
const path = require('path');

// Read DDS tokens
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, '../build/json/tokens.json'), 'utf8'));

// Helper: Convert hex to HSL
function hexToHSL(hex) {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return null;
  let r = 0, g = 0, b = 0;
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    return null;
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  h = Math.round(h * 360 * 10) / 10;
  s = Math.round(s * 1000) / 10;
  l = Math.round(l * 1000) / 10;
  return `${h} ${s}% ${l}%`;
}

// Variable mapping (from v0/globals-config.md)
const VARS = [
  // UI & surface
  '--background', '--foreground', '--card', '--card-foreground', '--popover', '--popover-foreground', '--muted', '--muted-foreground',
  // Interactive
  '--primary', '--primary-foreground', '--secondary', '--secondary-foreground', '--accent', '--accent-foreground',
  // Feedback
  '--destructive', '--destructive-foreground',
  // Border & hierarchy
  '--border', '--input', '--ring',
  // Chart
  '--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5',
  // Border radius
  '--radius',
  // Sidebar (if present in docs)
  '--sidebar', '--sidebar-foreground', '--sidebar-primary', '--sidebar-primary-foreground', '--sidebar-accent', '--sidebar-accent-foreground', '--sidebar-border', '--sidebar-ring',
];

// Mapping from shadcn/v0 variable to DDS token key
const DDS_MAP = {
  '--background': { light: 'White.100%', dark: 'Grey.900' },
  '--foreground': { light: 'Black.100%', dark: 'Grey.50' },
  '--card': { light: 'White.100%', dark: 'Grey.800' },
  '--card-foreground': { light: 'Black.100%', dark: 'Grey.50' },
  '--popover': { light: 'White.100%', dark: 'Grey.800' },
  '--popover-foreground': { light: 'Black.100%', dark: 'Grey.50' },
  '--muted': { light: 'Grey.100', dark: 'Grey.900' },
  '--muted-foreground': { light: 'Grey.500', dark: 'Grey.400' },
  '--primary': { light: 'Blue.500', dark: 'Blue.500' },
  '--primary-foreground': { light: 'White.100%', dark: 'Grey.50' },
  '--secondary': { light: 'Grey.100', dark: 'Grey.900' },
  '--secondary-foreground': { light: 'Black.100%', dark: 'Grey.50' },
  '--accent': { light: 'Grey.100', dark: 'Grey.900' },
  '--accent-foreground': { light: 'Black.100%', dark: 'Grey.50' },
  '--destructive': { light: 'Red.500', dark: 'Red.700' },
  '--destructive-foreground': { light: 'White.100%', dark: 'Grey.50' },
  '--border': { light: 'Grey.200', dark: 'Grey.800' },
  '--input': { light: 'Grey.200', dark: 'Grey.800' },
  '--ring': { light: 'Blue.500', dark: 'Blue.500' },
  '--chart-1': { light: 'Orange.400', dark: 'Blue.400' },
  '--chart-2': { light: 'Teal.500', dark: 'Teal.500' },
  '--chart-3': { light: 'Violet.500', dark: 'Violet.500' },
  '--chart-4': { light: 'Grey.300', dark: 'Grey.300' },
  '--chart-5': { light: 'Grey.500', dark: 'Grey.500' },
  '--radius': { light: 'rounded', dark: 'rounded' },
  // Sidebar (add mappings as needed)
};

function getDDSValue(varName, mode = 'light') {
  const map = DDS_MAP[varName];
  if (!map) return null;
  const key = map[mode];
  if (!key) return null;
  const token = tokens[key];
  if (!token) return null;
  if (varName === '--radius') {
    const px = parseFloat(token.$value);
    return px ? (px / 16) + 'rem' : null;
  }
  if (token.$type === 'color') {
    return hexToHSL(token.$value);
  }
  return token.$value;
}

function emitVars(mode = 'light') {
  return VARS.map(varName => {
    const value = getDDSValue(varName, mode);
    if (value) return `    ${varName}: ${value};`;
    return `    ${varName}: hsl(0 100% 50%); /* MISSING DDS TOKEN */`;
  }).join('\n');
}

// Helper to sanitize CSS variable names
function sanitizeVarName(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, '-');
}

// Font tokens
const fontVars = Object.entries(tokens)
  .filter(([k, v]) => v.$type && v.$type.startsWith('font'))
  .map(([k, v]) => `    --font-${sanitizeVarName(k)}: ${v.$value};`).join('\n');

// Other tokens
const otherVars = Object.entries(tokens)
  .filter(([k, v]) => !v.$type?.startsWith('font') && v.$type !== 'color' && k !== 'rounded')
  .map(([k, v]) => `    --${sanitizeVarName(k)}: ${v.$value};`).join('\n');

const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

/*
===========================================
SHADCN/UI GLOBAL STYLES & DESIGN TOKENS
===========================================
*/
@layer base {
  :root {
${emitVars('light')}
    /* === Fonts === */
${fontVars}
    /* === Other DDS Tokens === */
${otherVars}
  }
  .dark {
${emitVars('dark')}
    /* === Fonts === */
${fontVars}
    /* === Other DDS Tokens === */
${otherVars}
  }
}`;

// Tailwind config (reference CSS vars)
const tailwindConfig = `import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        DEFAULT: "var(--border-width)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        heading: ["var(--font-family-heading)"],
        mono: ["var(--font-family-mono)"],
      },
      fontSize: {
        "10": "calc(var(--font-10) * 1px)",
        "12": "calc(var(--font-12) * 1px)",
        "14": "calc(var(--font-14) * 1px)",
        "16": "calc(var(--font-16) * 1px)",
        "18": "calc(var(--font-18) * 1px)",
        "21": "calc(var(--font-21) * 1px)",
        "24": "calc(var(--font-24) * 1px)",
        "32": "calc(var(--font-32) * 1px)",
        "40": "calc(var(--font-40) * 1px)",
        "48": "calc(var(--font-48) * 1px)",
      },
      fontWeight: {
        light: "var(--font-light)",
        regular: "var(--font-regular)",
        semibold: "var(--font-semibold)",
        bold: "var(--font-bold)",
        extrabold: "var(--font-extrabold)",
      },
      spacing: {
        xs: "var(--xs)",
        "lg-border": "var(--lg)",
        "xl-border": "var(--xl)",
        "xxl-border": "var(--xxl)",
      },
      width: {
        "icon-xxs": "calc(var(--icon-xxs) * 1px)",
        "icon-xs": "calc(var(--icon-xs) * 1px)",
        "icon-sm": "calc(var(--icon-sm) * 1px)",
        "icon-md": "calc(var(--icon-md) * 1px)",
        "icon-lg": "calc(var(--icon-lg) * 1px)",
      },
      height: {
        "icon-xxs": "calc(var(--icon-xxs) * 1px)",
        "icon-xs": "calc(var(--icon-xs) * 1px)",
        "icon-sm": "calc(var(--icon-sm) * 1px)",
        "icon-md": "calc(var(--icon-md) * 1px)",
        "icon-lg": "calc(var(--icon-lg) * 1px)",
      },
      opacity: {
        hover: "var(--hover)",
        selected: "var(--selected)",
        focus: "var(--focus)",
        "focus-visible": "var(--focusvisible)",
        "outlined-border": "var(--outlinedborder)",
        active: "var(--active)",
        disabled: "var(--disabled)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config`;

fs.writeFileSync(path.join(__dirname, '../build/v0/globals.css'), globalsCss);
fs.writeFileSync(path.join(__dirname, '../build/v0/tailwind.config.ts'), tailwindConfig);

console.log('✅ globals.css and tailwind.config.ts generated successfully!'); 