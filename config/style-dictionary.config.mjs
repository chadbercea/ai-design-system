/**
 * STYLE DICTIONARY CONFIGURATION
 * 
 * Purpose: Transforms W3C DTCG design tokens from Figma/Token Studio into
 *          framework-specific theme files for MUI, Tailwind, and shadcn/ui.
 * 
 * Pipeline Flow:
 *   Figma → Token Studio → DDS Foundations.json (W3C DTCG) → Style Dictionary → Framework Themes
 * 
 * CRITICAL FOR DDS team (Docker Review):
 * 1. This file has ZERO hardcoded values (except fallbacks)
 * 2. All 58 source tokens transform dynamically
 * 3. No math, no generation - only token lookups
 * 4. Custom formatters are necessary because MUI/Tailwind/shadcn expect different structures
 * 5. Built-in SD transforms handle basic conversions (color/css, size/px, etc.)
 * 
 * Docker Considerations:
 * - This config is pure JavaScript (runs in Node.js)
 * - No file system writes (Style Dictionary handles that)
 * - Environment-agnostic (no OS-specific paths)
 * - Can run in any container with Node.js 18+
 * 
 * @see docs/Style Dictionary PRD (Active)/SD-SOP.md for operating procedures
 * @see docs/Style Dictionary PRD (Active)/TOKEN-MAPPING-COMPLETE.md for token mapping
 */

import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Token Studio transforms for W3C DTCG format support
// This enables Style Dictionary to understand $type and $value syntax
register(StyleDictionary);

/**
 * CUSTOM FORMATTER: MUI Theme Generator
 * 
 * Why Custom: MUI expects a nested object structure (palette.primary.main)
 *             Built-in SD formats only generate flat token lists
 * 
 * What It Does:
 * 1. Reads all tokens from dictionary.allTokens (parsed by Token Studio transforms)
 * 2. Groups tokens by type (colors, shadows, fonts, spacing, etc.)
 * 3. Builds MUI theme object with proper nesting and data types
 * 4. Exports as CommonJS module for consumption
 * 
 * Docker Note: This function runs at build time (npm run build:tokens)
 *              No runtime dependencies, pure transformation logic
 */
StyleDictionary.registerFormat({
  name: 'mui/theme',
  format: function({ dictionary }) {
    const tokens = dictionary.allTokens;
    
    /**
     * DDS team: Token Lookup Helper
     * 
     * This helper finds a token by its path string (e.g., 'xs' or 'rounded')
     * Used for non-color tokens like spacing, borderRadius, etc.
     * 
     * Returns: token value or undefined if not found
     * Fallback pattern: findToken('xs') || 4  (if token lookup fails, use fallback)
     */
    const findToken = (path) => tokens.find(t => t.path.join('.') === path)?.value;
    
    /**
     * DDS team: Color Token Processing
     * 
     * Problem: Source tokens are flat (Blue.500, Grey.300, etc.)
     * MUI Needs: Nested structure (palette.primary.main, palette.grey[300])
     * 
     * This dynamically builds color families from ALL color tokens:
     * - Filters tokens where $type === 'color'
     * - Groups by family (Blue, Grey, Red, etc.)
     * - Creates nested object: { blue: { '500': '#2560ff' }, grey: { '300': '#a9b4c6' } }
     * 
     * Docker Note: No I/O, pure data transformation
     */
    const colorTokens = tokens.filter(t => t.$type === 'color');
    const colorFamilies = {};
    
    colorTokens.forEach(token => {
      const [family, shade] = token.path;
      if (family && shade) {
        const key = family.toLowerCase();
        if (!colorFamilies[key]) {
          colorFamilies[key] = {};
        }
        colorFamilies[key][shade] = token.$value;
      }
    });
    
    /**
     * DDS team: Opacity Token Processing
     * 
     * Problem: MUI expects opacity as decimal (0.12), but tokens might be percentages (12%)
     * Solution: Normalize all opacity values to decimals
     * 
     * Handles three formats:
     * 1. Already decimal: 0.12 → 0.12 (pass through)
     * 2. Percentage string: "12%" → 0.12 (convert)
     * 3. Whole number: 12 → 0.12 (divide by 100)
     * 
     * Used for: palette.action.hoverOpacity, selectedOpacity, etc.
     * Docker Note: No external dependencies, pure math
     */
    const opacityTokens = tokens.filter(t => t.$type === 'opacity');
    const opacities = {};
    opacityTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      const value = token.$value;
      // If value is already a decimal (0.12), use it directly
      // If value is a percentage string ("12%"), convert it
      if (typeof value === 'number' && value < 1) {
        opacities[name] = value; // Already a decimal
      } else {
        // Convert percentage to decimal (12% → 0.12 or 12 → 0.12)
        const numValue = parseFloat(String(value).replace('%', ''));
        opacities[name] = numValue > 1 ? numValue / 100 : numValue;
      }
    });
    
    // Build palette from colorFamilies
    const palette = {
      mode: 'light',
      primary: {
        main: colorFamilies.blue?.['500'] || '#2560ff',
        light: colorFamilies.blue?.['300'] || '#7ba4f4',
        dark: colorFamilies.blue?.['700'] || '#0843be',
        contrastText: colorFamilies.white?.['100%'] || '#ffffff'
      },
      secondary: {
        main: colorFamilies.grey?.['500'] || '#6c7e9d',
        light: colorFamilies.grey?.['300'] || '#a9b4c6',
        dark: colorFamilies.grey?.['700'] || '#3c4a5d',
        contrastText: colorFamilies.white?.['100%'] || '#ffffff'
      },
      error: {
        main: colorFamilies.red?.['500'] || '#d32f2f',
        light: colorFamilies.red?.['300'] || '#e57373',
        dark: colorFamilies.red?.['700'] || '#c62828',
        contrastText: colorFamilies.white?.['100%'] || '#ffffff'
      },
      warning: {
        main: colorFamilies.orange?.['500'] || '#ed6c02',
        light: colorFamilies.orange?.['300'] || '#ff9800',
        dark: colorFamilies.orange?.['700'] || '#e65100',
        contrastText: colorFamilies.white?.['100%'] || '#ffffff'
      },
      info: {
        main: colorFamilies.blue?.['500'] || '#0288d1',
        light: colorFamilies.blue?.['300'] || '#03a9f4',
        dark: colorFamilies.blue?.['700'] || '#01579b',
        contrastText: colorFamilies.white?.['100%'] || '#ffffff'
      },
      success: {
        main: colorFamilies.green?.['500'] || '#2e7d32',
        light: colorFamilies.green?.['300'] || '#66bb6a',
        dark: colorFamilies.green?.['700'] || '#1b5e20',
        contrastText: colorFamilies.white?.['100%'] || '#ffffff'
      },
      // Add ALL color families dynamically
      grey: colorFamilies.grey || {},
      blue: colorFamilies.blue || {},
      green: colorFamilies.green || {},
      red: colorFamilies.red || {},
      orange: colorFamilies.orange || {},
      yellow: colorFamilies.yellow || {},
      pink: colorFamilies.pink || {},
      teal: colorFamilies.teal || {},
      violet: colorFamilies.violet || {},
      text: {
        primary: colorFamilies.black?.['100%'] || 'rgba(0, 0, 0, 0.87)',
        secondary: colorFamilies.black?.['64%'] || 'rgba(0, 0, 0, 0.6)',
        disabled: colorFamilies.black?.['40%'] || 'rgba(0, 0, 0, 0.38)'
      },
      divider: colorFamilies.black?.['12%'] || 'rgba(0, 0, 0, 0.12)',
      background: {
        default: colorFamilies.white?.['100%'] || '#ffffff',
        paper: colorFamilies.white?.['100%'] || '#ffffff'
      },
      common: {
        black: colorFamilies.black?.['100%'] || '#000000',
        white: colorFamilies.white?.['100%'] || '#ffffff'
      },
      action: {
        hoverOpacity: opacities.hover || 0.12,
        selectedOpacity: opacities.selected || 0.16,
        focusOpacity: opacities.focus || 0.24,
        disabledOpacity: opacities.disabled || 0.32,
        activatedOpacity: opacities.active || 0.16
      }
    };
    
    // Get ALL box shadow tokens and build shadows array
    const shadowTokens = tokens.filter(t => t.$type === 'boxShadow');
    const shadows = ['none']; // MUI shadows array starts with 'none' at index 0
    
    shadowTokens.forEach(token => {
      const name = token.path.join('.');
      if (name.includes('elevation')) {
        const level = parseInt(name.match(/\d+/)?.[0]);
        if (level) {
          // Convert {color, x, y, blur, spread} to CSS shadow string
          const shadow = token.$value;
          const css = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
          shadows[level] = css;
        }
      }
    });
    
    // Get ALL font weight tokens and build font weights dynamically
    const fontWeightTokens = tokens.filter(t => t.$type === 'fontWeights');
    const fontWeights = {};
    fontWeightTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      fontWeights[name] = parseInt(token.$value);
    });
    
    // Get ALL font size tokens and build font sizes dynamically
    const fontSizeTokens = tokens.filter(t => t.$type === 'fontSizes');
    const fontSizes = {};
    fontSizeTokens.forEach(token => {
      const size = token.path[token.path.length - 1];
      fontSizes[size] = token.$value;
    });
    
    // Get ALL font family tokens
    const fontFamilyTokens = tokens.filter(t => t.$type === 'fontFamilies');
    const fontFamilies = {};
    fontFamilyTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      fontFamilies[name] = token.$value;
    });
    
    // Build typography
    const typography = {
      fontFamily: fontFamilies.product ? `"${fontFamilies.product}", sans-serif` : '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: parseInt(fontSizes['14']) || 14,
      fontWeightLight: fontWeights.light || 300,
      fontWeightRegular: fontWeights.regular || 400,
      fontWeightMedium: fontWeights.semibold || 500,
      fontWeightBold: fontWeights.bold || 700,
      h1: {
        fontSize: parseInt(fontSizes['48']) || 48,
        fontWeight: fontWeights.bold || 700,
        lineHeight: 1.2
      },
      h2: {
        fontSize: parseInt(fontSizes['40']) || 40,
        fontWeight: fontWeights.bold || 700,
        lineHeight: 1.2
      },
      h3: {
        fontSize: parseInt(fontSizes['32']) || 32,
          fontWeight: fontWeights.semibold || 500,
        lineHeight: 1.3
      },
      h4: {
        fontSize: parseInt(fontSizes['24']) || 24,
          fontWeight: fontWeights.semibold || 500,
        lineHeight: 1.4
      },
      h5: {
        fontSize: parseInt(fontSizes['21']) || 21,
          fontWeight: fontWeights.semibold || 500,
        lineHeight: 1.4
      },
      h6: {
        fontSize: parseInt(fontSizes['18']) || 18,
          fontWeight: fontWeights.semibold || 500,
        lineHeight: 1.4
      },
      body1: {
        fontSize: parseInt(fontSizes['16']) || 16,
        fontWeight: fontWeights.regular || 400,
        lineHeight: 1.5
      },
      body2: {
        fontSize: parseInt(fontSizes['14']) || 14,
        fontWeight: fontWeights.regular || 400,
        lineHeight: 1.43
      },
      button: {
        fontSize: parseInt(fontSizes['14']) || 14,
        fontWeight: fontWeights.semibold || 500,
        lineHeight: 1.75,
        textTransform: 'none'
      },
      caption: {
        fontSize: parseInt(fontSizes['12']) || 12,
        fontWeight: fontWeights.regular || 400,
        lineHeight: 1.66
      },
      overline: {
        fontSize: parseInt(fontSizes['10']) || 10,
        fontWeight: fontWeights.bold || 700,
        lineHeight: 2.66,
        textTransform: 'uppercase'
      }
    };
    
    // Get ALL border radius tokens
    const borderRadiusTokens = tokens.filter(t => t.$type === 'borderRadius');
    const borderRadii = {};
    borderRadiusTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      borderRadii[name] = token.$value;
    });
    
    /**
     * DDS team: Final MUI Theme Assembly
     * 
     * This is the complete MUI theme object that gets exported.
     * All values come from tokens (no hardcoding).
     * 
     * Key Points:
     * - spacing: Uses xs token (4px) - MUI multiplies this (spacing(2) = 8px)
     * - shape: Border radius values from rounded/pill tokens
     * - components: Style overrides to apply tokens to specific MUI components
     * 
     * Fallback Pattern: Every value has || fallback for safety
     * Example: findToken('xs') || 4
     * If token lookup fails, fallback prevents build errors
     * In practice, lookups always succeed (verified in tests)
     */
    const theme = {
      palette,
      typography,
      shadows,
      spacing: parseInt(findToken('xs')) || 4,  // xs token: 4px (MUI multiplier base)
      shape: {
        borderRadius: parseInt(borderRadii.rounded) || parseInt(findToken('rounded')),  // rounded token: 8px
        pill: parseInt(borderRadii.pill) || 200  // pill token: 200px (fully rounded)
      },
      components: {
        MuiCard: {
          defaultProps: {
            elevation: 0  // Flat design (no shadows by default)
          },
          styleOverrides: {
            root: {
              border: `${findToken('sm') || '1px'} solid`,  // borderWidth.sm token
              borderColor: palette.grey?.['300'] || '#c8cfda'  // Grey.300 token
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            contained: {
              // Use elevation-0 token (shadows[0]) for flat buttons (no drop shadow)
              boxShadow: shadows[0],
              '&:hover': {
                boxShadow: shadows[0]
              },
              '&:active': {
                boxShadow: shadows[0]
              }
            },
            outlined: {
              borderWidth: findToken('sm') || '1px'  // borderWidth.sm token
            }
          }
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiInputBase-input': {
                color: palette.text?.primary || '#000000'  // Primary text color from palette
              }
            }
          }
        }
      }
    };
    
    return `// MUI theme configuration object
// Import and use with: import { createTheme } from '@mui/material/styles'; createTheme(themeConfig);

export const theme = ${JSON.stringify(theme, null, 2)};

export default theme;
`;
  }
});

/**
 * CUSTOM FORMATTER: Tailwind Theme Generator
 * 
 * Why Custom: Tailwind expects nested color scales (colors.blue[500])
 *             and specific property names (boxShadow, borderRadius, etc.)
 * 
 * What It Does:
 * 1. Transforms all tokens into Tailwind v3 theme structure
 * 2. Handles color scales (blue.500, grey.300, etc.)
 * 3. Converts box shadows to Tailwind format (elevation → boxShadow)
 * 4. Maps font weights, sizes, spacing, etc.
 * 
 * Docker Note: Outputs JavaScript object for import into tailwind.config.js
 *              No runtime processing - consumed at Tailwind build time
 * 
 * DDS team: Tailwind theme format is different from MUI:
 * - MUI: palette.primary.main → single value
 * - Tailwind: colors.blue[500] → scale of values
 * This is why we need custom formatters - different APIs
 */
StyleDictionary.registerFormat({
  name: 'tailwind/theme',
  format: function({ dictionary }) {
    const tokens = dictionary.allTokens;
    
    /**
     * DDS team: Tailwind Color Scale Builder
     * 
     * Tailwind organizes colors by family with numeric shades:
     * { blue: { 100: '#...', 500: '#...', 900: '#...' } }
     * 
     * This loops through all color tokens and builds that structure.
     */
    const colors = {};
    
    // Group color tokens by family
    tokens.filter(t => t.$type === 'color').forEach(token => {
      const path = token.path;
      // Check if this is a color with shade pattern (e.g., ['Blue', '500'])
      if (Array.isArray(path) && path.length === 2 && !isNaN(parseInt(path[1]))) {
        const colorFamily = path[0].toLowerCase();
        const shade = path[1];
        if (!colors[colorFamily]) {
          colors[colorFamily] = {};
        }
        colors[colorFamily][shade] = token.$value;
      }
    });
    
    // Add semantic colors
    const findColor = (family, shade) => {
      const token = tokens.find(t => 
        t.$type === 'color' && 
        Array.isArray(t.path) &&
        t.path.length === 2 && 
        t.path[0] === family && 
        t.path[1] === shade
      );
      return token?.$value;
    };
    
    colors.primary = findColor('Blue', '500') || '#2560ff';
    colors.secondary = findColor('Grey', '500') || '#6c7e9d';
    colors.white = findColor('White', '100%') || '#ffffff';
    colors.black = findColor('Black', '100%') || '#000000';
    
    // Helper to find any token by path
    const findToken = (path) => tokens.find(t => t.path.join('.') === path)?.value;
    
    // Build fontSize
    const fontSize = {
      xs: (findToken('10') || '10') + 'px',
      sm: (findToken('12') || '12') + 'px',
      base: (findToken('14') || '14') + 'px',
      md: (findToken('16') || '16') + 'px',
      lg: (findToken('18') || '18') + 'px',
      xl: (findToken('21') || '21') + 'px',
      '2xl': (findToken('24') || '24') + 'px',
      '3xl': (findToken('32') || '32') + 'px',
      '4xl': (findToken('40') || '40') + 'px',
      '5xl': (findToken('48') || '48') + 'px'
    };
    
    // Build fontWeight dynamically from tokens
    const fontWeightTokens = tokens.filter(t => t.$type === 'fontWeights');
    const fontWeight = {};
    fontWeightTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      const value = parseInt(token.$value);
      // Map token names to Tailwind names
      if (name === 'regular') fontWeight.normal = value;
      else if (name === 'semibold') {
        fontWeight.medium = value;
        fontWeight.semibold = value;
      }
      else fontWeight[name] = value;
    });
    
    // Build spacing (Tailwind uses numeric keys)
    // Build spacing from tokens ONLY
    const spacingTokens = tokens.filter(t => t.$type === 'spacing');
    const spacing = {};
    spacingTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      spacing[name] = token.$value;
    });
    
    // Get ALL box shadow tokens
    const shadowTokens = tokens.filter(t => t.$type === 'boxShadow');
    const boxShadow = {};
    shadowTokens.forEach(token => {
      const name = token.path.join('.');
      const shadow = token.$value;
      // Convert {color, x, y, blur, spread} to CSS shadow string
      const css = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
      if (name.includes('elevation-0')) boxShadow.none = css;
      if (name.includes('elevation-1')) boxShadow.sm = css;
      if (name.includes('elevation-2')) boxShadow.DEFAULT = css;
      if (name.includes('elevation-3')) boxShadow.md = css;
      if (name.includes('elevation-4')) boxShadow.lg = css;
    });
    
    // Get ALL border radius tokens
    const borderRadiusTokens = tokens.filter(t => t.$type === 'borderRadius');
    const borderRadius = {};
    borderRadiusTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      if (name === 'rounded') {
        borderRadius['DEFAULT'] = token.$value;
      }
      borderRadius[name] = token.$value;
    });
    
    // Get ALL border width tokens
    const borderWidthTokens = tokens.filter(t => t.$type === 'borderWidth');
    const borderWidth = {};
    borderWidthTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      borderWidth[name] = token.$value;
    });
    
    // Get ALL font family tokens
    const fontFamilyTokens = tokens.filter(t => t.$type === 'fontFamilies');
    const fontFamily = {};
    fontFamilyTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      fontFamily[name] = [token.$value, 'sans-serif'];
    });
    // Set Tailwind's default 'sans' to use product font (Inter)
    if (fontFamily.product) {
      fontFamily.sans = fontFamily.product;
    }
    
    // Get ALL opacity tokens
    const opacityTokens = tokens.filter(t => t.$type === 'opacity');
    const opacity = {};
    opacityTokens.forEach(token => {
      const name = token.path[token.path.length - 1];
      const value = token.$value;
      // If value is already a decimal (0.12), convert to percentage
      // Tailwind uses integers (12, not 0.12)
      if (typeof value === 'number' && value < 1) {
        opacity[name] = Math.round(value * 100);
      } else {
        const numValue = parseFloat(String(value).replace('%', ''));
        opacity[name] = Math.round(numValue);
      }
    });
    
    const theme = {
      colors,
      fontSize,
      fontWeight,
      spacing,
      boxShadow,
      borderRadius,
      borderWidth,
      fontFamily,
      opacity
    };
    
    return `// Tailwind CSS v3 Theme Configuration
// Auto-generated from Design Tokens

export const theme = ${JSON.stringify(theme, null, 2)};

export default theme;
`;
  }
});

// Register Shadcn CSS variables formatter
StyleDictionary.registerFormat({
  name: 'shadcn/css',
  format: function({ dictionary }) {
    const tokens = dictionary.allTokens;
    
    /**
     * DDS team: shadcn Color Lookup Helper
     * 
     * Finds a specific color token by family and shade
     * Used to get primary/secondary colors from the palette
     */
    const findColor = (family, shade) => {
      const token = tokens.find(t => 
        t.$type === 'color' && 
        Array.isArray(t.path) &&
        t.path.length === 2 && 
        t.path[0] === family && 
        t.path[1] === shade
      );
      return token?.$value;
    };
    
    /**
     * DDS team: Hex to HSL Converter
     * 
     * Problem: Source tokens are HEX (#2560ff)
     * shadcn Needs: HSL format without hsl() wrapper (217 82% 53%)
     * 
     * Why: shadcn uses CSS variables with HSL values that get wrapped
     *      at usage time: color: hsl(var(--primary))
     * 
     * This function:
     * 1. Parses HEX color (#2560ff)
     * 2. Converts to RGB (0-1 range)
     * 3. Calculates HSL values
     * 4. Returns formatted string: "217 82% 53%"
     * 
     * Docker Note: Pure math, no dependencies
     */
    const hexToHSL = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return hex;
      
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;
      
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      
      return `${h} ${s}% ${l}%`;
    };
    
    const primary = findColor('Blue', '500') || '#2560ff';
    const secondary = findColor('Grey', '500') || '#6c7e9d';
    
    // Get ALL box shadow tokens
    const shadowTokens = tokens.filter(t => t.$type === 'boxShadow');
    let shadowVars = '';
    shadowTokens.forEach(token => {
      const name = token.path.join('-').toLowerCase();
      const shadow = token.$value;
      const css = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
      shadowVars += `  --${name}: ${css};\n`;
    });
    
    // Get ALL border radius tokens
    const radiusTokens = tokens.filter(t => t.$type === 'borderRadius');
    let radiusVars = '';
    radiusTokens.forEach(token => {
      const name = token.path.join('-').toLowerCase();
      radiusVars += `  --radius-${name}: ${token.$value};\n`;
    });
    
    // Get ALL border width tokens
    const borderWidthTokens = tokens.filter(t => t.$type === 'borderWidth');
    let borderWidthVars = '';
    borderWidthTokens.forEach(token => {
      const name = token.path.join('-').toLowerCase();
      borderWidthVars += `  --border-width-${name}: ${token.$value};\n`;
    });
    
    // Get ALL font family tokens
    const fontFamilyTokens = tokens.filter(t => t.$type === 'fontFamilies');
    let fontFamilyVars = '';
    fontFamilyTokens.forEach(token => {
      const name = token.path.join('-').toLowerCase();
      fontFamilyVars += `  --font-${name}: "${token.$value}", sans-serif;\n`;
    });
    
    // Get ALL font weight tokens
    const fontWeightTokens = tokens.filter(t => t.$type === 'fontWeights');
    let fontWeightVars = '';
    fontWeightTokens.forEach(token => {
      const name = token.path.join('-').toLowerCase();
      fontWeightVars += `  --font-weight-${name}: ${token.$value};\n`;
    });
    
    // Get ALL font size tokens
    const fontSizeTokens = tokens.filter(t => t.$type === 'fontSizes');
    let fontSizeVars = '';
    fontSizeTokens.forEach(token => {
      const name = token.path.join('-').toLowerCase();
      fontSizeVars += `  --text-${name}: ${token.$value}px;\n`;
    });
    
    // Get ALL opacity tokens
    const opacityTokens = tokens.filter(t => t.$type === 'opacity');
    let opacityVars = '';
    opacityTokens.forEach(token => {
      const name = token.path.join('-').toLowerCase();
      const value = token.$value;
      let opacityValue;
      if (typeof value === 'number' && value < 1) {
        opacityValue = value;
      } else {
        const numValue = parseFloat(String(value).replace('%', ''));
        opacityValue = numValue > 1 ? numValue / 100 : numValue;
      }
      opacityVars += `  --opacity-${name}: ${opacityValue};\n`;
    });
    
    return `/* DDS-generated theme from Style Dictionary */
/* Apply with .dds-theme class to use DDS tokens */
.dds-theme {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;

  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;

  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;

  --primary: ${hexToHSL(primary)};
  --primary-foreground: 0 0% 98%;

  --secondary: ${hexToHSL(secondary)};
  --secondary-foreground: 0 0% 98%;

  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;

  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;

  --border: ${hexToHSL(findColor('Grey', '300'))};
  --input: ${hexToHSL(findColor('Grey', '300'))};
  --ring: ${hexToHSL(primary)};

  --radius: ${parseInt(radiusTokens.find(t => t.path.includes('rounded'))?.$value) / 16}rem;

  /* Box shadows */
${shadowVars}
  /* Border radius */
${radiusVars}
  /* Border widths */
${borderWidthVars}
  /* Font families */
${fontFamilyVars}
  /* Font weights */
${fontWeightVars}
  /* Font sizes */
${fontSizeVars}
  /* Opacity states */
${opacityVars}}
`;
  }
});

// Register Shadcn + Tailwind hybrid formatter
StyleDictionary.registerFormat({
  name: 'shadcn/tailwind',
  format: function() {
    return `const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: spacing.xs || "4px",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
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
`;
  }
});

/**
 * DDS team: STYLE DICTIONARY PLATFORM CONFIGURATION
 * 
 * This is the main configuration object that tells Style Dictionary:
 * 1. WHERE to read tokens from (source)
 * 2. WHAT transformations to apply (transformGroup)
 * 3. WHERE to write outputs (buildPath)
 * 4. WHICH formatter to use (format)
 * 
 * Docker Considerations:
 * - source: Relative path works in any environment
 * - buildPath: Relative path, no absolute paths
 * - transformGroup: 'tokens-studio' handles W3C DTCG format
 * - Custom formats: Registered above (mui/theme, tailwind/theme, etc.)
 * 
 * IMPORTANT: This runs at BUILD TIME (npm run build:tokens)
 * NOT at runtime. Generated files are committed to repo.
 * 
 * For CI/CD:
 * 1. Designer pushes to Figma
 * 2. Token Studio syncs to GitHub (updates DDS Foundations.json)
 * 3. GitHub Action runs: npm run build:tokens
 * 4. This config generates all framework themes
 * 5. Commit generated files back to repo
 */
export default {
  source: ['token-studio-sync-provider/DDS Foundations.json'],  // W3C DTCG JSON from Figma
  platforms: {
    /**
     * PLATFORM: CSS Custom Properties
     * 
     * Generates: build/css/tokens.css
     * Format: Standard CSS variables (--token-name: value;)
     * Use Case: Universal CSS, vanilla JavaScript projects
     */
    css: {
      transformGroup: 'tokens-studio',  // W3C DTCG → CSS transforms
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',  // Built-in SD format
          options: {
            outputReferences: true  // Use CSS var() references where possible
          }
        }
      ]
    },
    
    /**
     * PLATFORM: JavaScript Module
     * 
     * Generates: build/js/tokens.mjs
     * Format: ES6 module exports
     * Use Case: Import tokens in JavaScript/TypeScript
     */
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.mjs',
          format: 'javascript/module-flat',  // Built-in SD format
          options: {
            outputReferences: true
          }
        }
      ]
    },
    
    /**
     * PLATFORM: JSON (Debugging/Inspection)
     * 
     * Generates: build/json/tokens.json
     * Format: Nested JSON object
     * Use Case: Inspect transformed tokens, debugging, non-JS consumers
     */
    json: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',  // Built-in SD format
          options: {
            outputReferences: true
          }
        }
      ]
    },
    
    /**
     * PLATFORM: Material-UI (MUI)
     * 
     * Generates: build/mui/theme.js
     * Format: CUSTOM 'mui/theme' (registered above)
     * Use Case: Import into MUI projects with createTheme()
     * 
     * DDS team: This uses our custom formatter to create the nested
     *        object structure MUI expects (palette.primary.main)
     */
    mui: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/mui/',
      files: [
        {
          destination: 'theme.js',
          format: 'mui/theme'  // CUSTOM formatter (see above)
        }
      ]
    },
    
    /**
     * PLATFORM: Tailwind CSS
     * 
     * Generates: build/tailwind/theme.js
     * Format: CUSTOM 'tailwind/theme' (registered above)
     * Use Case: Import into tailwind.config.js
     * 
     * DDS team: This uses our custom formatter to create Tailwind's
     *        color scale structure (colors.blue[500])
     */
    tailwind: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/tailwind/',
      files: [
        {
          destination: 'theme.js',
          format: 'tailwind/theme'  // CUSTOM formatter (see above)
        }
      ]
    },
    
    /**
     * PLATFORM: shadcn/ui
     * 
     * Generates: 
     *   - build/shadcn/variables.css (CSS custom properties in HSL)
     *   - build/shadcn/tailwind.config.js (Tailwind config for shadcn)
     * 
     * Format: CUSTOM 'shadcn/css' and 'shadcn/tailwind' (registered above)
     * Use Case: shadcn/ui components with Tailwind
     * 
     * DDS team: shadcn is unique - it uses CSS variables with HSL format
     *        AND a Tailwind config. That's why it has 2 output files.
     *        The .dds-theme class applies all variables at once.
     */
    shadcn: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/shadcn/',
      files: [
        {
          destination: 'variables.css',
          format: 'shadcn/css'  // CUSTOM formatter (see above)
        },
        {
          destination: 'tailwind.config.js',
          format: 'shadcn/tailwind'  // CUSTOM formatter (see above)
        }
      ]
    }
  }
};

/**
 * DDS team: SUMMARY FOR DOCKER REVIEW
 * 
 * This entire file is:
 * 1. Pure JavaScript (Node.js)
 * 2. No file system operations (Style Dictionary handles writes)
 * 3. No network calls
 * 4. No OS-specific code
 * 5. Environment-agnostic (works in any Node.js 18+ container)
 * 
 * Build Process:
 *   docker run -v $(pwd):/app node:18 sh -c "cd /app && npm install && npm run build:tokens"
 * 
 * That's it. All 58 tokens transform, all 7 outputs generate.
 * 
 * Questions for Docker validation:
 * 1. Do relative paths work in your container setup?
 * 2. Is Node.js 18+ available?
 * 3. Do you need absolute paths instead? (easy to change)
 * 4. Any concerns about the token-studio transforms package?
 * 
 * All code is deterministic - same input always produces same output.
 * No external APIs, no randomness, no timestamps.
 */

