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
    const findToken = (path) => tokens.find(t => t.path.join('.') === path)?.$value;
    
    // Helper to find token by name
    const findByName = (name) => tokens.find(t => t.path[0] === name)?.$value;
    
    // Build palette
    const palette = {
      mode: 'light',
      primary: {
        main: findToken('Blue.500'),
        light: findToken('Blue.300'),
        dark: findToken('Blue.700'),
        contrastText: findToken('White.100%')
      },
      secondary: {
        main: findToken('Grey.500'),
        light: findToken('Grey.300'),
        dark: findToken('Grey.700'),
        contrastText: findToken('White.100%')
      },
      error: {
        main: findToken('Red.500'),
        light: findToken('Red.300'),
        dark: findToken('Red.700'),
        contrastText: findToken('White.100%')
      },
      warning: {
        main: findToken('Orange.500'),
        light: findToken('Orange.300'),
        dark: findToken('Orange.700'),
        contrastText: findToken('White.100%')
      },
      info: {
        main: findToken('Blue.500'),
        light: findToken('Blue.300'),
        dark: findToken('Blue.700'),
        contrastText: findToken('White.100%')
      },
      success: {
        main: findToken('Green.500'),
        light: findToken('Green.300'),
        dark: findToken('Green.700'),
        contrastText: findToken('White.100%')
      },
      grey: {
        50: findToken('Grey.50'),
        100: findToken('Grey.100'),
        200: findToken('Grey.200'),
        300: findToken('Grey.300'),
        400: findToken('Grey.400'),
        500: findToken('Grey.500'),
        600: findToken('Grey.600'),
        700: findToken('Grey.700'),
        800: findToken('Grey.800'),
        900: findToken('Grey.900')
      },
      text: {
        primary: findToken('Black.100%'),
        secondary: findToken('Black.64%'),
        disabled: findToken('Black.40%')
      },
      divider: findToken('Black.12%'),
      background: {
        default: findToken('White.100%'),
        paper: findToken('White.100%')
      },
      common: {
        black: findToken('Black.100%'),
        white: findToken('White.100%')
      }
    };
    
    // Get font family from 'product' token
    const productFont = findByName('product') || 'Inter';
    
    // Build typography
    const typography = {
      fontFamily: `"${productFont}", "Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: parseInt(findByName('14')),
      fontWeightLight: parseInt(findByName('light')),
      fontWeightRegular: parseInt(findByName('regular')),
      fontWeightMedium: parseInt(findByName('semibold')),
      fontWeightBold: parseInt(findByName('bold')),
      h1: {
        fontSize: findByName('48') + 'px',
        fontWeight: parseInt(findByName('bold')),
        lineHeight: 1.2,
        letterSpacing: findByName('0') || '0%'
      },
      h2: {
        fontSize: findByName('40') + 'px',
        fontWeight: parseInt(findByName('bold')),
        lineHeight: 1.2,
        letterSpacing: findByName('0') || '0%'
      },
      h3: {
        fontSize: findByName('32') + 'px',
        fontWeight: parseInt(findByName('semibold')),
        lineHeight: 1.3,
        letterSpacing: findByName('0') || '0%'
      },
      h4: {
        fontSize: findByName('24') + 'px',
        fontWeight: parseInt(findByName('semibold')),
        lineHeight: 1.4,
        letterSpacing: findByName('0') || '0%'
      },
      h5: {
        fontSize: findByName('21') + 'px',
        fontWeight: parseInt(findByName('semibold')),
        lineHeight: 1.4,
        letterSpacing: findByName('0') || '0%'
      },
      h6: {
        fontSize: findByName('18') + 'px',
        fontWeight: parseInt(findByName('semibold')),
        lineHeight: 1.4,
        letterSpacing: findByName('0') || '0%'
      },
      body1: {
        fontSize: findByName('16') + 'px',
        fontWeight: parseInt(findByName('regular')),
        lineHeight: 1.5,
        letterSpacing: findByName('0') || '0%'
      },
      body2: {
        fontSize: findByName('14') + 'px',
        fontWeight: parseInt(findByName('regular')),
        lineHeight: 1.43,
        letterSpacing: findByName('0') || '0%'
      },
      button: {
        fontSize: findByName('14') + 'px',
        fontWeight: parseInt(findByName('semibold')),
        lineHeight: 1.75,
        letterSpacing: findByName('0') || '0%',
        textTransform: 'none'
      },
      caption: {
        fontSize: findByName('12') + 'px',
        fontWeight: parseInt(findByName('regular')),
        lineHeight: 1.66,
        letterSpacing: findByName('0') || '0%'
      },
      overline: {
        fontSize: findByName('10') + 'px',
        fontWeight: parseInt(findByName('bold')),
        lineHeight: 2.66,
        letterSpacing: findByName('0') || '0%',
        textTransform: 'uppercase'
      }
    };
    
    // Build shadows from elevation tokens
    const elevation1 = tokens.find(t => t.path[0] === 'elevation-1')?.$value;
    const elevation2 = tokens.find(t => t.path[0] === 'elevation-2')?.$value;
    const elevation3 = tokens.find(t => t.path[0] === 'elevation-3')?.$value;
    const elevation4 = tokens.find(t => t.path[0] === 'elevation-4')?.$value;
    
    const convertShadow = (shadow) => {
      if (!shadow) return 'none';
      return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
    };
    
    const shadows = [
      'none',
      convertShadow(elevation1),
      convertShadow(elevation2),
      convertShadow(elevation3),
      convertShadow(elevation4),
      convertShadow(elevation4), // MUI expects 25 elevations, repeat highest
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4),
      convertShadow(elevation4)
    ];
    
    const theme = {
      palette,
      typography,
      spacing: parseInt(findByName('xs')?.replace('px', '')) || 4, // Use xs spacing as base
      shape: {
        borderRadius: parseFloat(findByName('rounded')?.replace('px', '')) || 8
      },
      shadows
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
    
    // Helper to find token by name
    const findByName = (name) => tokens.find(t => t.path[0] === name)?.$value;
    
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
    
    colors.primary = findColor('Blue', '500');
    colors.secondary = findColor('Grey', '500');
    colors.white = findColor('White', '100%');
    colors.black = findColor('Black', '100%');
    
    // Build fontFamily from tokens
    const fontFamily = {
      sans: [findByName('product') || 'Inter', 'sans-serif'],
      display: [findByName('marketing') || 'Poppins', 'sans-serif'],
      mono: [findByName('code') || 'Roboto Mono', 'monospace']
    };
    
    // Build fontSize
    const fontSize = {
      xs: findByName('10') + 'px',
      sm: findByName('12') + 'px',
      base: findByName('14') + 'px',
      md: findByName('16') + 'px',
      lg: findByName('18') + 'px',
      xl: findByName('21') + 'px',
      '2xl': findByName('24') + 'px',
      '3xl': findByName('32') + 'px',
      '4xl': findByName('40') + 'px',
      '5xl': findByName('48') + 'px'
    };
    
    // Build fontWeight
    const fontWeight = {
      light: parseInt(findByName('light')),
      normal: parseInt(findByName('regular')),
      medium: parseInt(findByName('semibold')),
      semibold: parseInt(findByName('semibold')),
      bold: parseInt(findByName('bold')),
      extrabold: parseInt(findByName('extrabold'))
    };
    
    // Build lineHeight
    const lineHeight = {
      auto: findByName('auto') || 'auto'
    };
    
    // Build letterSpacing
    const letterSpacing = {
      normal: findByName('0') || '0%'
    };
    
    // Build borderRadius
    const borderRadius = {
      DEFAULT: findByName('rounded'),
      full: findByName('pill')
    };
    
    // Build borderWidth
    const borderWidth = {
      sm: findByName('sm'),
      DEFAULT: findByName('md'),
      lg: findByName('lg'),
      xl: findByName('xl'),
      '2xl': findByName('xxl')
    };
    
    // Build boxShadow from elevation tokens
    const elevation1 = tokens.find(t => t.path[0] === 'elevation-1')?.$value;
    const elevation2 = tokens.find(t => t.path[0] === 'elevation-2')?.$value;
    const elevation3 = tokens.find(t => t.path[0] === 'elevation-3')?.$value;
    const elevation4 = tokens.find(t => t.path[0] === 'elevation-4')?.$value;
    
    const convertShadow = (shadow) => {
      if (!shadow) return 'none';
      return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
    };
    
    const boxShadow = {
      sm: convertShadow(elevation1),
      DEFAULT: convertShadow(elevation2),
      md: convertShadow(elevation3),
      lg: convertShadow(elevation4)
    };
    
    // Build spacing from xs token + scale
    const xsSpacing = parseInt(findByName('xs')?.replace('px', '') || '4');
    const spacing = {
      0: '0px',
      1: `${xsSpacing}px`,           // 4px
      2: `${xsSpacing * 2}px`,       // 8px
      3: `${xsSpacing * 3}px`,       // 12px
      4: `${xsSpacing * 4}px`,       // 16px
      5: `${xsSpacing * 5}px`,       // 20px
      6: `${xsSpacing * 6}px`,       // 24px
      8: `${xsSpacing * 8}px`,       // 32px
      10: `${xsSpacing * 10}px`,     // 40px
      12: `${xsSpacing * 12}px`,     // 48px
      16: `${xsSpacing * 16}px`,     // 64px
      20: `${xsSpacing * 20}px`,     // 80px
      24: `${xsSpacing * 24}px`      // 96px
    };
    
    // Build opacity
    const opacity = {
      hover: findByName('hover'),
      selected: findByName('selected'),
      focus: findByName('focus'),
      focusVisible: findByName('focusVisible'),
      active: findByName('active'),
      disabled: findByName('disabled')
    };
    
    const theme = {
      colors,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      borderRadius,
      borderWidth,
      boxShadow,
      spacing,
      opacity
    };
    
    return `export const theme = ${JSON.stringify(theme, null, 2)};

export default theme;
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
    }
  }
};

