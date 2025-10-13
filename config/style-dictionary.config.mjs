import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Token Studio transforms
register(StyleDictionary);

// Register custom MUI theme formatter
StyleDictionary.registerFormat({
  name: 'mui/theme',
  format: function({ dictionary }) {
    const tokens = dictionary.allTokens;
    
    // Helper to find token by path (still needed for non-color tokens until later sprints)
    const findToken = (path) => tokens.find(t => t.path.join('.') === path)?.value;
    
    // Get ALL color tokens and build color families dynamically
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
    
    // Get ALL opacity tokens (needed for palette.action)
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
          const css = `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
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
        fontSize: fontSizes['48'] + 'px' || '48px',
        fontWeight: fontWeights.bold || 700,
        lineHeight: 1.2
      },
      h2: {
        fontSize: fontSizes['40'] + 'px' || '40px',
        fontWeight: fontWeights.bold || 700,
        lineHeight: 1.2
      },
      h3: {
        fontSize: fontSizes['32'] + 'px' || '32px',
        fontWeight: fontWeights.semibold || 600,
        lineHeight: 1.3
      },
      h4: {
        fontSize: fontSizes['24'] + 'px' || '24px',
        fontWeight: fontWeights.semibold || 600,
        lineHeight: 1.4
      },
      h5: {
        fontSize: fontSizes['21'] + 'px' || '21px',
        fontWeight: fontWeights.semibold || 600,
        lineHeight: 1.4
      },
      h6: {
        fontSize: fontSizes['18'] + 'px' || '18px',
        fontWeight: fontWeights.semibold || 600,
        lineHeight: 1.4
      },
      body1: {
        fontSize: fontSizes['16'] + 'px' || '16px',
        fontWeight: fontWeights.regular || 400,
        lineHeight: 1.5
      },
      body2: {
        fontSize: fontSizes['14'] + 'px' || '14px',
        fontWeight: fontWeights.regular || 400,
        lineHeight: 1.43
      },
      button: {
        fontSize: fontSizes['14'] + 'px' || '14px',
        fontWeight: fontWeights.semibold || 500,
        lineHeight: 1.75,
        textTransform: 'none'
      },
      caption: {
        fontSize: fontSizes['12'] + 'px' || '12px',
        fontWeight: fontWeights.regular || 400,
        lineHeight: 1.66
      },
      overline: {
        fontSize: fontSizes['10'] + 'px' || '10px',
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
    
    const theme = {
      palette,
      typography,
      shadows,
      spacing: 8,
      shape: {
        borderRadius: borderRadii.rounded || '4px',
        pill: borderRadii.pill || '200px'
      }
    };
    
    return `// MUI theme configuration object
// Import and use with: import { createTheme } from '@mui/material/styles'; createTheme(themeConfig);

export const theme = ${JSON.stringify(theme, null, 2)};

export default theme;
`;
  }
});

// Register custom Tailwind v3 theme formatter (JavaScript object)
StyleDictionary.registerFormat({
  name: 'tailwind/theme',
  format: function({ dictionary }) {
    const tokens = dictionary.allTokens;
    
    // Build colors - organize by color families with shades
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
    
    // Build fontWeight
    const fontWeight = {
      light: parseInt(findToken('light')) || 300,
      normal: parseInt(findToken('regular')) || 400,
      medium: parseInt(findToken('semibold')) || 500,
      semibold: parseInt(findToken('semibold')) || 600,
      bold: parseInt(findToken('bold')) || 700,
      extrabold: parseInt(findToken('extrabold')) || 900
    };
    
    // Build spacing (Tailwind uses numeric keys)
    const spacing = {
      0: '0px',
      1: '0.25rem',   // 4px
      2: '0.5rem',    // 8px
      3: '0.75rem',   // 12px
      4: '1rem',      // 16px
      5: '1.25rem',   // 20px
      6: '1.5rem',    // 24px
      8: '2rem',      // 32px
      10: '2.5rem',   // 40px
      12: '3rem',     // 48px
      16: '4rem',     // 64px
      20: '5rem',     // 80px
      24: '6rem'      // 96px
    };
    
    // Get ALL box shadow tokens
    const shadowTokens = tokens.filter(t => t.$type === 'boxShadow');
    const boxShadow = {};
    shadowTokens.forEach(token => {
      const name = token.path.join('.');
      const shadow = token.$value;
      // Convert {color, x, y, blur, spread} to CSS shadow string
      const css = `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
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
    
    // Helper to find color by path
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
    
    // Shadcn uses HSL format - convert hex to HSL
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
      const css = `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
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

  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: ${hexToHSL(primary)};

  --radius: 0.5rem;

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

export default {
  source: ['token-studio-sync-provider/DDS Foundations.json'],
  platforms: {
    // CSS Custom Properties
    css: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    
    // JavaScript/ES6 Module
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.mjs',
          format: 'javascript/module-flat',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    
    // JSON (for debugging/inspection)
    json: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    
    // MUI Theme (JavaScript module)
    mui: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/mui/',
      files: [
        {
          destination: 'theme.js',
          format: 'mui/theme'
        }
      ]
    },
    
    // Tailwind v3 Theme (JavaScript object)
    tailwind: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/tailwind/',
      files: [
        {
          destination: 'theme.js',
          format: 'tailwind/theme'
        }
      ]
    },
    
    // Shadcn CSS Variables
    shadcn: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/shadcn/',
      files: [
        {
          destination: 'variables.css',
          format: 'shadcn/css'
        },
        {
          destination: 'tailwind.config.js',
          format: 'shadcn/tailwind'
        }
      ]
    }
  }
};

