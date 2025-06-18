import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import fs from 'fs';
import path from 'path';

register(StyleDictionary);

StyleDictionary.registerFormat({
  name: 'dtcg/json',
  format: function(dictionary) {
    return JSON.stringify(dictionary.allTokens.reduce((acc, token) => {
      const path = token.path.join('.');
      acc[path] = {
        $value: token.value,
        $type: token.type,
        $description: token.description
      };
      return acc;
    }, {}), null, 2);
  }
});

StyleDictionary.registerFormat({
  name: 'mui/theme',
  format: function(dictionary) {
    const tokens = dictionary.allTokens.reduce((acc, token) => {
      const path = token.path.join('.');
      
      // Initialize typography structure first
      if (!acc.typography) {
        acc.typography = {
          fontFamily: '',
          fontSize: 14,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 700,
          h1: { fontFamily: '', fontWeight: 300, fontSize: '', lineHeight: 1.167, letterSpacing: '-0.01562em' },
          h2: { fontFamily: '', fontWeight: 300, fontSize: '', lineHeight: 1.2, letterSpacing: '-0.00833em' },
          h3: { fontFamily: '', fontWeight: 400, fontSize: '', lineHeight: 1.167, letterSpacing: '0em' },
          h4: { fontFamily: '', fontWeight: 400, fontSize: '', lineHeight: 1.235, letterSpacing: '0.00735em' },
          h5: { fontFamily: '', fontWeight: 400, fontSize: '', lineHeight: 1.334, letterSpacing: '0em' },
          h6: { fontFamily: '', fontWeight: 500, fontSize: '', lineHeight: 1.6, letterSpacing: '0.0075em' }
        };
      }
      
      // Handle palette tokens
      if (token.type === 'color') {
        acc.palette = acc.palette || {
          mode: 'light',
          primary: { main: '', light: '', dark: '', contrastText: '#fff' },
          secondary: { main: '', light: '', dark: '', contrastText: '#fff' },
          error: { main: '', light: '', dark: '', contrastText: '#fff' },
          warning: { main: '', light: '', dark: '', contrastText: '#fff' },
          info: { main: '', light: '', dark: '', contrastText: '#fff' },
          success: { main: '', light: '', dark: '', contrastText: '#fff' },
          grey: {},
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)'
          },
          divider: 'rgba(0, 0, 0, 0.12)',
          background: {
            default: '#fff',
            paper: '#fff'
          },
          common: {
            black: '#000',
            white: '#fff'
          }
        };

        // Map color tokens to palette structure
        if (path.startsWith('Blue')) {
          if (path.endsWith('500')) acc.palette.primary.main = token.value;
          if (path.endsWith('300')) acc.palette.primary.light = token.value;
          if (path.endsWith('700')) acc.palette.primary.dark = token.value;
        } else if (path.startsWith('Violet')) {
          if (path.endsWith('500')) acc.palette.secondary.main = token.value;
          if (path.endsWith('300')) acc.palette.secondary.light = token.value;
          if (path.endsWith('700')) acc.palette.secondary.dark = token.value;
        } else if (path.startsWith('Red')) {
          if (path.endsWith('500')) acc.palette.error.main = token.value;
          if (path.endsWith('300')) acc.palette.error.light = token.value;
          if (path.endsWith('700')) acc.palette.error.dark = token.value;
        } else if (path.startsWith('Yellow')) {
          if (path.endsWith('500')) acc.palette.warning.main = token.value;
          if (path.endsWith('300')) acc.palette.warning.light = token.value;
          if (path.endsWith('700')) acc.palette.warning.dark = token.value;
        } else if (path.startsWith('Teal')) {
          if (path.endsWith('500')) acc.palette.info.main = token.value;
          if (path.endsWith('300')) acc.palette.info.light = token.value;
          if (path.endsWith('700')) acc.palette.info.dark = token.value;
        } else if (path.startsWith('Green')) {
          if (path.endsWith('500')) acc.palette.success.main = token.value;
          if (path.endsWith('300')) acc.palette.success.light = token.value;
          if (path.endsWith('700')) acc.palette.success.dark = token.value;
        } else if (path.startsWith('Grey')) {
          const shade = path.split('.').pop();
          acc.palette.grey[shade] = token.value;
        } else if (path.startsWith('White')) {
          if (path.endsWith('100%')) acc.palette.common.white = token.value;
        } else if (path.startsWith('Black')) {
          if (path.endsWith('100%')) acc.palette.common.black = token.value;
        }
      }
      
      // Handle typography tokens
      if (token.type === 'fontFamilies') {
        if (path === 'product') {
          acc.typography.fontFamily = token.value;
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(h => {
            acc.typography[h].fontFamily = token.value;
          });
        }
      }
      
      if (token.type === 'fontSizes') {
        if (path === '14') acc.typography.fontSize = parseInt(token.value);
        if (path === '40') acc.typography.h1.fontSize = parseInt(token.value);
        if (path === '32') acc.typography.h2.fontSize = parseInt(token.value);
        if (path === '24') acc.typography.h3.fontSize = parseInt(token.value);
        if (path === '21') acc.typography.h4.fontSize = parseInt(token.value);
        if (path === '18') acc.typography.h5.fontSize = parseInt(token.value);
        if (path === '16') acc.typography.h6.fontSize = parseInt(token.value);
      }
      
      if (token.type === 'fontWeights') {
        if (path === 'light') acc.typography.fontWeightLight = parseInt(token.value);
        if (path === 'regular') acc.typography.fontWeightRegular = parseInt(token.value);
        if (path === 'semibold') acc.typography.fontWeightMedium = parseInt(token.value);
        if (path === 'bold') acc.typography.fontWeightBold = parseInt(token.value);
      }
      
      // Handle spacing tokens
      if (token.type === 'spacing') {
        acc.spacing = parseInt(token.value);
      }
      
      // Handle shape tokens
      if (token.type === 'borderRadius') {
        acc.shape = acc.shape || { borderRadius: 4 };
        if (path === 'rounded') acc.shape.borderRadius = parseInt(token.value);
      }
      
      return acc;
    }, {});
    
    return `import { createTheme } from '@mui/material/styles';\n\nexport const theme = createTheme(${JSON.stringify(tokens, null, 2)});`;
  }
});

StyleDictionary.registerFormat({
  name: 'tailwind/theme',
  format: function(dictionary) {
    // Read the template from config directory
    const template = fs.readFileSync(path.join(process.cwd(), 'config', 'tailwind.config.js'), 'utf8');
    
    const tokens = dictionary.allTokens.reduce((acc, token) => {
      const path = token.path.join('.');
      if (token.type === 'color') {
        acc.colors = acc.colors || {};
        acc.colors[path] = token.value;
      } else if (token.type === 'fontSizes') {
        acc.fontSize = acc.fontSize || {};
        acc.fontSize[path] = token.value;
      } else if (token.type === 'spacing') {
        acc.spacing = acc.spacing || {};
        acc.spacing[path] = token.value;
      }
      return acc;
    }, {});

    // Replace the theme section in the template with our tokens
    return template.replace(
      /theme: {[\s\S]*?}/,
      `theme: ${JSON.stringify(tokens, null, 2)}`
    );
  }
});

StyleDictionary.registerFormat({
  name: 'shadcn/theme',
  format: function(dictionary) {
    const tokens = dictionary.allTokens.reduce((acc, token) => {
      const path = token.path.join('.');
      
      // Handle colors with proper scale mapping
      if (token.type === 'color') {
        acc.colors = acc.colors || {};
        // Map semantic colors to shadcn's expected format
        if (path.startsWith('Blue')) {
          if (path.endsWith('500')) acc.colors.primary = token.value;
          if (path.endsWith('300')) acc.colors.primaryLight = token.value;
          if (path.endsWith('700')) acc.colors.primaryDark = token.value;
        } else if (path.startsWith('Violet')) {
          if (path.endsWith('500')) acc.colors.secondary = token.value;
          if (path.endsWith('300')) acc.colors.secondaryLight = token.value;
          if (path.endsWith('700')) acc.colors.secondaryDark = token.value;
        } else if (path.startsWith('Red')) {
          if (path.endsWith('500')) acc.colors.destructive = token.value;
          if (path.endsWith('300')) acc.colors.destructiveLight = token.value;
          if (path.endsWith('700')) acc.colors.destructiveDark = token.value;
        } else if (path.startsWith('Green')) {
          if (path.endsWith('500')) acc.colors.success = token.value;
          if (path.endsWith('300')) acc.colors.successLight = token.value;
          if (path.endsWith('700')) acc.colors.successDark = token.value;
        } else if (path.startsWith('Grey')) {
          const shade = path.split('.').pop();
          acc.colors.gray = acc.colors.gray || {};
          acc.colors.gray[shade] = token.value;
        }
      }
      
      // Handle typography
      if (token.type === 'fontFamilies') {
        acc.fontFamily = acc.fontFamily || {};
        if (path === 'product') {
          acc.fontFamily.sans = token.value;
          acc.fontFamily.heading = token.value;
        }
      }
      
      if (token.type === 'fontSizes') {
        acc.fontSize = acc.fontSize || {};
        acc.fontSize[path] = token.value;
      }
      
      if (token.type === 'fontWeights') {
        acc.fontWeight = acc.fontWeight || {};
        if (path === 'light') acc.fontWeight.light = parseInt(token.value);
        if (path === 'regular') acc.fontWeight.normal = parseInt(token.value);
        if (path === 'semibold') acc.fontWeight.medium = parseInt(token.value);
        if (path === 'bold') acc.fontWeight.bold = parseInt(token.value);
      }
      
      // Handle spacing
      if (token.type === 'spacing') {
        acc.spacing = acc.spacing || {};
        acc.spacing[path] = token.value;
      }
      
      // Handle border radius
      if (token.type === 'borderRadius') {
        acc.borderRadius = acc.borderRadius || {};
        if (path === 'rounded') acc.borderRadius.default = token.value;
        if (path === 'sm') acc.borderRadius.sm = token.value;
        if (path === 'lg') acc.borderRadius.lg = token.value;
      }
      
      return acc;
    }, {
      // Default values for required shadcn tokens
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        muted: '#f1f5f9',
        mutedForeground: '#64748b',
        accent: '#f8fafc',
        accentForeground: '#0f172a',
        popover: '#ffffff',
        popoverForeground: '#0f172a',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#94a3b8'
      }
    });

    return `import { type Config } from 'tailwindcss';\n\nexport const theme = ${JSON.stringify(tokens, null, 2)} as Config['theme'];`;
  }
});

StyleDictionary.registerFormat({
  name: 'v0/tailwind',
  format: function(dictionary) {
    const tokens = dictionary.allTokens.reduce((acc, token) => {
      const path = token.path.join('.');
      
      // Handle colors
      if (token.type === 'color') {
        acc.colors = acc.colors || {};
        if (path.startsWith('Blue')) {
          if (path.endsWith('500')) acc.colors.primary = token.value;
          if (path.endsWith('300')) acc.colors.primaryLight = token.value;
          if (path.endsWith('700')) acc.colors.primaryDark = token.value;
        } else if (path.startsWith('Violet')) {
          if (path.endsWith('500')) acc.colors.secondary = token.value;
          if (path.endsWith('300')) acc.colors.secondaryLight = token.value;
          if (path.endsWith('700')) acc.colors.secondaryDark = token.value;
        } else if (path.startsWith('Red')) {
          if (path.endsWith('500')) acc.colors.destructive = token.value;
          if (path.endsWith('300')) acc.colors.destructiveLight = token.value;
          if (path.endsWith('700')) acc.colors.destructiveDark = token.value;
        } else if (path.startsWith('Green')) {
          if (path.endsWith('500')) acc.colors.success = token.value;
          if (path.endsWith('300')) acc.colors.successLight = token.value;
          if (path.endsWith('700')) acc.colors.successDark = token.value;
        } else if (path.startsWith('Grey')) {
          const shade = path.split('.').pop();
          acc.colors.gray = acc.colors.gray || {};
          acc.colors.gray[shade] = token.value;
        }
      }
      
      // Handle typography
      if (token.type === 'fontFamilies') {
        acc.fontFamily = acc.fontFamily || {};
        if (path === 'product') {
          acc.fontFamily.sans = token.value;
          acc.fontFamily.heading = token.value;
        }
      }
      
      if (token.type === 'fontSizes') {
        acc.fontSize = acc.fontSize || {};
        acc.fontSize[path] = token.value;
      }
      
      if (token.type === 'fontWeights') {
        acc.fontWeight = acc.fontWeight || {};
        if (path === 'light') acc.fontWeight.light = parseInt(token.value);
        if (path === 'regular') acc.fontWeight.normal = parseInt(token.value);
        if (path === 'semibold') acc.fontWeight.medium = parseInt(token.value);
        if (path === 'bold') acc.fontWeight.bold = parseInt(token.value);
      }
      
      // Handle spacing
      if (token.type === 'spacing') {
        acc.spacing = acc.spacing || {};
        acc.spacing[path] = token.value;
      }
      
      // Handle border radius
      if (token.type === 'borderRadius') {
        acc.borderRadius = acc.borderRadius || {};
        if (path === 'rounded') acc.borderRadius.default = token.value;
        if (path === 'sm') acc.borderRadius.sm = token.value;
        if (path === 'lg') acc.borderRadius.lg = token.value;
      }
      
      return acc;
    }, {
      // Default values for required v0 tokens
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        muted: '#f1f5f9',
        mutedForeground: '#64748b',
        accent: '#f8fafc',
        accentForeground: '#0f172a',
        popover: '#ffffff',
        popoverForeground: '#0f172a',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#94a3b8'
      }
    });

    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: ${JSON.stringify(tokens, null, 2)},
  plugins: [require("tailwindcss-animate")],
}`;
  }
});

StyleDictionary.registerFormat({
  name: 'v0/globals',
  format: function(dictionary) {
    // Helper function to convert hex to OKLCH
    const hexToOKLCH = (hex) => {
      // For now, using placeholder OKLCH values that match shadcn's format
      // TODO: Implement proper hex to OKLCH conversion
      const oklchMap = {
        '#ffffff': 'oklch(1 0 0)',
        '#000000': 'oklch(0.145 0 0)',
        '#2560ff': 'oklch(0.205 0 0)',
        '#7d2eff': 'oklch(0.97 0 0)',
        '#ff5757': 'oklch(0.577 0.245 27.325)',
        '#e2e8f0': 'oklch(0.922 0 0)',
        '#94a3b8': 'oklch(0.708 0 0)',
        '#f1f5f9': 'oklch(0.97 0 0)',
        '#64748b': 'oklch(0.556 0 0)',
        '#f8fafc': 'oklch(0.97 0 0)',
        '#0f172a': 'oklch(0.205 0 0)',
        // Dark mode colors
        '#1e2129': 'oklch(0.145 0 0)',
        '#f9fafb': 'oklch(0.985 0 0)',
        '#2c333f': 'oklch(0.205 0 0)',
        '#003db5': 'oklch(0.922 0 0)',
        '#5700bb': 'oklch(0.269 0 0)',
        '#8b99b2': 'oklch(0.708 0 0)',
        '#434c5f': 'oklch(0.556 0 0)',
        '#e40c2c': 'oklch(0.704 0.191 22.216)'
      };
      return oklchMap[hex] || hex;
    };

    // Collect all font tokens
    const fontTokens = {};
    const fontSizeTokens = {};
    const fontWeightTokens = {};
    const letterSpacingTokens = {};
    const lineHeightTokens = {};
    const colorTokens = {};

    dictionary.allTokens.forEach(token => {
      const path = token.path.join('.');
      if (token.type === 'fontFamilies') fontTokens[path] = token.value;
      if (token.type === 'fontSizes') fontSizeTokens[path] = token.value;
      if (token.type === 'fontWeights') fontWeightTokens[path] = token.value;
      if (token.type === 'letterSpacing') letterSpacingTokens[path] = token.value;
      if (token.type === 'lineHeights') lineHeightTokens[path] = token.value;
      if (token.type === 'color') colorTokens[path] = hexToOKLCH(token.value);
    });

    // Compose CSS variables for fonts
    let fontVars = '';
    Object.entries(fontTokens).forEach(([k, v]) => {
      fontVars += `  --font-${k}: ${v};\n`;
    });
    Object.entries(fontSizeTokens).forEach(([k, v]) => {
      fontVars += `  --font-size-${k}: ${v};\n`;
    });
    Object.entries(fontWeightTokens).forEach(([k, v]) => {
      fontVars += `  --font-weight-${k}: ${v};\n`;
    });
    Object.entries(letterSpacingTokens).forEach(([k, v]) => {
      fontVars += `  --letter-spacing-${k}: ${v};\n`;
    });
    Object.entries(lineHeightTokens).forEach(([k, v]) => {
      fontVars += `  --line-height-${k}: ${v};\n`;
    });

    // Compose CSS variables for color scale (e.g., --blue-50, --blue-100, ...)
    let colorScaleVars = '';
    Object.entries(colorTokens).forEach(([k, v]) => {
      colorScaleVars += `  --${k.replace(/\./g, '-')}: ${v};\n`;
    });

    // Compose the final CSS
    return `@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
${fontVars}${colorScaleVars}    --radius: 0.625rem;
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.985 0 0);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
  }
 
  .dark {
${fontVars}${colorScaleVars}    --radius: 0.625rem;
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.205 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.205 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --destructive-foreground: oklch(0.985 0 0);
    --border: oklch(0.205 0 0);
    --input: oklch(0.205 0 0);
    --ring: oklch(0.556 0 0);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.922 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.205 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(0.205 0 0);
    --sidebar-ring: oklch(0.556 0 0);
  }
}
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
  }
});

export default {
  source: ['token-studio-sync-provider/DDS Foundations.json'],
  platforms: {
    json: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'dtcg/json',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    },
    mui: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/mui/',
      files: [
        {
          destination: 'mui-theme.js',
          format: 'mui/theme',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    },
    tailwind: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/tailwind/',
      files: [
        {
          destination: 'tailwind-theme.js',
          format: 'tailwind/theme',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    },
    shadcn: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/shadcn/',
      files: [
        {
          destination: 'shadcn-theme.js',
          format: 'shadcn/theme',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    },
    v0: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/v0/',
      files: [
        {
          destination: 'tailwind.config.js',
          format: 'v0/tailwind',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        },
        {
          destination: 'globals.css',
          format: 'v0/globals',
          options: {
            showFileHeader: true,
            outputReferences: true
          }
        }
      ]
    }
  }
}; 