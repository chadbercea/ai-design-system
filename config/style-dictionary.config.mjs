import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Token Studio transforms
register(StyleDictionary);

// Register custom MUI theme formatter
StyleDictionary.registerFormat({
  name: 'mui/theme',
  format: function({ dictionary }) {
    const tokens = dictionary.allTokens;
    
    // Helper to find token by path
    const findToken = (path) => tokens.find(t => t.path.join('.') === path)?.value;
    
    // Build palette
    const palette = {
      mode: 'light',
      primary: {
        main: findToken('Blue.500') || '#2560ff',
        light: findToken('Blue.300') || '#7ba4f4',
        dark: findToken('Blue.700') || '#0843be',
        contrastText: findToken('White.100%') || '#ffffff'
      },
      secondary: {
        main: findToken('Grey.500') || '#6c7e9d',
        light: findToken('Grey.300') || '#a9b4c6',
        dark: findToken('Grey.700') || '#3c4a5d',
        contrastText: findToken('White.100%') || '#ffffff'
      },
      error: {
        main: findToken('Red.500') || '#d32f2f',
        light: findToken('Red.300') || '#e57373',
        dark: findToken('Red.700') || '#c62828',
        contrastText: findToken('White.100%') || '#ffffff'
      },
      warning: {
        main: findToken('Orange.500') || '#ed6c02',
        light: findToken('Orange.300') || '#ff9800',
        dark: findToken('Orange.700') || '#e65100',
        contrastText: findToken('White.100%') || '#ffffff'
      },
      info: {
        main: findToken('Blue.500') || '#0288d1',
        light: findToken('Blue.300') || '#03a9f4',
        dark: findToken('Blue.700') || '#01579b',
        contrastText: findToken('White.100%') || '#ffffff'
      },
      success: {
        main: findToken('Green.500') || '#2e7d32',
        light: findToken('Green.300') || '#66bb6a',
        dark: findToken('Green.700') || '#1b5e20',
        contrastText: findToken('White.100%') || '#ffffff'
      },
      grey: {
        50: findToken('Grey.50') || '#f9fafb',
        100: findToken('Grey.100') || '#e7eaef',
        200: findToken('Grey.200') || '#c8cfda',
        300: findToken('Grey.300') || '#a9b4c6',
        400: findToken('Grey.400') || '#8b99b2',
        500: findToken('Grey.500') || '#6c7e9d',
        600: findToken('Grey.600') || '#566581',
        700: findToken('Grey.700') || '#3c4a5d',
        800: findToken('Grey.800') || '#2c3747',
        900: findToken('Grey.900') || '#1c2532'
      },
      text: {
        primary: findToken('Black.100%') || 'rgba(0, 0, 0, 0.87)',
        secondary: findToken('Black.64%') || 'rgba(0, 0, 0, 0.6)',
        disabled: findToken('Black.40%') || 'rgba(0, 0, 0, 0.38)'
      },
      divider: findToken('Black.12%') || 'rgba(0, 0, 0, 0.12)',
      background: {
        default: findToken('White.100%') || '#ffffff',
        paper: findToken('White.100%') || '#ffffff'
      },
      common: {
        black: findToken('Black.100%') || '#000000',
        white: findToken('White.100%') || '#ffffff'
      }
    };
    
    // Build typography
    const typography = {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: parseInt(findToken('14')) || 14,
      fontWeightLight: parseInt(findToken('light')) || 300,
      fontWeightRegular: parseInt(findToken('regular')) || 400,
      fontWeightMedium: parseInt(findToken('semibold')) || 500,
      fontWeightBold: parseInt(findToken('bold')) || 700,
      h1: {
        fontSize: findToken('48') || '48px',
        fontWeight: parseInt(findToken('bold')) || 700,
        lineHeight: 1.2
      },
      h2: {
        fontSize: findToken('40') || '40px',
        fontWeight: parseInt(findToken('bold')) || 700,
        lineHeight: 1.2
      },
      h3: {
        fontSize: findToken('32') || '32px',
        fontWeight: parseInt(findToken('semibold')) || 600,
        lineHeight: 1.3
      },
      h4: {
        fontSize: findToken('24') || '24px',
        fontWeight: parseInt(findToken('semibold')) || 600,
        lineHeight: 1.4
      },
      h5: {
        fontSize: findToken('21') || '21px',
        fontWeight: parseInt(findToken('semibold')) || 600,
        lineHeight: 1.4
      },
      h6: {
        fontSize: findToken('18') || '18px',
        fontWeight: parseInt(findToken('semibold')) || 600,
        lineHeight: 1.4
      },
      body1: {
        fontSize: findToken('16') || '16px',
        fontWeight: parseInt(findToken('regular')) || 400,
        lineHeight: 1.5
      },
      body2: {
        fontSize: findToken('14') || '14px',
        fontWeight: parseInt(findToken('regular')) || 400,
        lineHeight: 1.43
      },
      button: {
        fontSize: findToken('14') || '14px',
        fontWeight: parseInt(findToken('semibold')) || 500,
        lineHeight: 1.75,
        textTransform: 'none'
      },
      caption: {
        fontSize: findToken('12') || '12px',
        fontWeight: parseInt(findToken('regular')) || 400,
        lineHeight: 1.66
      },
      overline: {
        fontSize: findToken('10') || '10px',
        fontWeight: parseInt(findToken('bold')) || 700,
        lineHeight: 2.66,
        textTransform: 'uppercase'
      }
    };
    
    const theme = {
      palette,
      typography,
      spacing: 8,
      shape: {
        borderRadius: 4
      }
    };
    
    return `import { createTheme } from '@mui/material/styles';

export const theme = createTheme(${JSON.stringify(theme, null, 2)});

export default theme;
`;
  }
});

// Register custom Tailwind theme formatter
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
    
    const theme = {
      colors,
      fontSize,
      fontWeight,
      spacing
    };
    
    return `module.exports = ${JSON.stringify(theme, null, 2)};
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
    
    return `:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;

  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;

  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;

  --primary: ${hexToHSL(primary)};
  --primary-foreground: 0 0% 98%;

  --secondary: ${hexToHSL(secondary)};
  --secondary-foreground: 0 0% 9%;

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
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;

  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;

  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;

  --primary: ${hexToHSL(primary)};
  --primary-foreground: 0 0% 9%;

  --secondary: ${hexToHSL(secondary)};
  --secondary-foreground: 0 0% 98%;

  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;

  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;

  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: ${hexToHSL(primary)};
}
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
    
    // Tailwind Theme
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

