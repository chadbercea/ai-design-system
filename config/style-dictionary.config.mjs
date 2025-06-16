import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

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
    let tokens = dictionary.allTokens.reduce((acc, token) => {
      const path = token.path.join('.');
      
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
          grey: {
            50: '#fafafa', 100: '#f5f5f5', 200: '#eeeeee', 300: '#e0e0e0',
            400: '#bdbdbd', 500: '#9e9e9e', 600: '#757575', 700: '#616161',
            800: '#424242', 900: '#212121'
          },
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
        if (path.includes('primary')) {
          if (path.includes('main')) acc.palette.primary.main = token.value;
          if (path.includes('light')) acc.palette.primary.light = token.value;
          if (path.includes('dark')) acc.palette.primary.dark = token.value;
        } else if (path.includes('secondary')) {
          if (path.includes('main')) acc.palette.secondary.main = token.value;
          if (path.includes('light')) acc.palette.secondary.light = token.value;
          if (path.includes('dark')) acc.palette.secondary.dark = token.value;
        } else if (path.includes('error')) {
          if (path.includes('main')) acc.palette.error.main = token.value;
          if (path.includes('light')) acc.palette.error.light = token.value;
          if (path.includes('dark')) acc.palette.error.dark = token.value;
        } else if (path.includes('warning')) {
          if (path.includes('main')) acc.palette.warning.main = token.value;
          if (path.includes('light')) acc.palette.warning.light = token.value;
          if (path.includes('dark')) acc.palette.warning.dark = token.value;
        } else if (path.includes('info')) {
          if (path.includes('main')) acc.palette.info.main = token.value;
          if (path.includes('light')) acc.palette.info.light = token.value;
          if (path.includes('dark')) acc.palette.info.dark = token.value;
        } else if (path.includes('success')) {
          if (path.includes('main')) acc.palette.success.main = token.value;
          if (path.includes('light')) acc.palette.success.light = token.value;
          if (path.includes('dark')) acc.palette.success.dark = token.value;
        } else if (path.includes('grey')) {
          const shade = path.split('.').pop();
          if (shade && acc.palette.grey[shade]) {
            acc.palette.grey[shade] = token.value;
          }
        } else if (path.includes('White')) {
          const shade = path.split('.').pop();
          if (shade === '100%') acc.palette.common.white = token.value;
        } else if (path.includes('Black')) {
          const shade = path.split('.').pop();
          if (shade === '100%') acc.palette.common.black = token.value;
        }
      }
      
      // Handle typography tokens
      if (token.type === 'typography' || token.type === 'fontSizes') {
        acc.typography = acc.typography || {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
          h6: { fontFamily: '', fontWeight: 500, fontSize: '', lineHeight: 1.6, letterSpacing: '0.0075em' },
          subtitle1: { fontFamily: '', fontWeight: 400, fontSize: '', lineHeight: 1.75, letterSpacing: '0.00938em' },
          subtitle2: { fontFamily: '', fontWeight: 500, fontSize: '', lineHeight: 1.57, letterSpacing: '0.00714em' },
          body1: { fontFamily: '', fontWeight: 400, fontSize: '', lineHeight: 1.5, letterSpacing: '0.00938em' },
          body2: { fontFamily: '', fontWeight: 400, fontSize: '', lineHeight: 1.43, letterSpacing: '0.01071em' },
          button: { fontFamily: '', fontWeight: 500, fontSize: '', lineHeight: 1.75, letterSpacing: '0.02857em', textTransform: 'uppercase' },
          caption: { fontFamily: '', fontWeight: 400, fontSize: '', lineHeight: 1.66, letterSpacing: '0.03333em' },
          overline: { fontFamily: '', fontWeight: 400, fontSize: '', lineHeight: 2.66, letterSpacing: '0.08333em', textTransform: 'uppercase' }
        };
        
        // Map typography tokens to typography structure
        if (path.includes('h1')) {
          if (path.includes('fontSize')) acc.typography.h1.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.h1.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.h1.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.h1.letterSpacing = token.value;
        } else if (path.includes('h2')) {
          if (path.includes('fontSize')) acc.typography.h2.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.h2.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.h2.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.h2.letterSpacing = token.value;
        } else if (path.includes('h3')) {
          if (path.includes('fontSize')) acc.typography.h3.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.h3.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.h3.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.h3.letterSpacing = token.value;
        } else if (path.includes('h4')) {
          if (path.includes('fontSize')) acc.typography.h4.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.h4.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.h4.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.h4.letterSpacing = token.value;
        } else if (path.includes('h5')) {
          if (path.includes('fontSize')) acc.typography.h5.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.h5.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.h5.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.h5.letterSpacing = token.value;
        } else if (path.includes('h6')) {
          if (path.includes('fontSize')) acc.typography.h6.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.h6.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.h6.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.h6.letterSpacing = token.value;
        } else if (path.includes('subtitle1')) {
          if (path.includes('fontSize')) acc.typography.subtitle1.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.subtitle1.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.subtitle1.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.subtitle1.letterSpacing = token.value;
        } else if (path.includes('subtitle2')) {
          if (path.includes('fontSize')) acc.typography.subtitle2.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.subtitle2.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.subtitle2.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.subtitle2.letterSpacing = token.value;
        } else if (path.includes('body1')) {
          if (path.includes('fontSize')) acc.typography.body1.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.body1.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.body1.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.body1.letterSpacing = token.value;
        } else if (path.includes('body2')) {
          if (path.includes('fontSize')) acc.typography.body2.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.body2.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.body2.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.body2.letterSpacing = token.value;
        } else if (path.includes('button')) {
          if (path.includes('fontSize')) acc.typography.button.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.button.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.button.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.button.letterSpacing = token.value;
        } else if (path.includes('caption')) {
          if (path.includes('fontSize')) acc.typography.caption.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.caption.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.caption.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.caption.letterSpacing = token.value;
        } else if (path.includes('overline')) {
          if (path.includes('fontSize')) acc.typography.overline.fontSize = parseInt(token.value);
          if (path.includes('fontWeight')) acc.typography.overline.fontWeight = parseInt(token.value);
          if (path.includes('lineHeight')) acc.typography.overline.lineHeight = parseFloat(token.value);
          if (path.includes('letterSpacing')) acc.typography.overline.letterSpacing = token.value;
        }
      }
      
      // Handle spacing tokens
      if (token.type === 'spacing') {
        acc.spacing = parseInt(token.value);
      }
      
      // Handle breakpoints
      if (token.type === 'breakpoint') {
        acc.breakpoints = acc.breakpoints || {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
          }
        };
        if (path.includes('xs')) acc.breakpoints.values.xs = parseInt(token.value);
        if (path.includes('sm')) acc.breakpoints.values.sm = parseInt(token.value);
        if (path.includes('md')) acc.breakpoints.values.md = parseInt(token.value);
        if (path.includes('lg')) acc.breakpoints.values.lg = parseInt(token.value);
        if (path.includes('xl')) acc.breakpoints.values.xl = parseInt(token.value);
      }
      
      // Handle shape tokens
      if (token.type === 'borderRadius') {
        acc.shape = acc.shape || { borderRadius: 4 };
        acc.shape.borderRadius = parseInt(token.value);
      }
      
      // Handle transitions
      if (token.type === 'transition') {
        acc.transitions = acc.transitions || {
          duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195
          },
          easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
          }
        };
      }
      
      // Handle z-index tokens
      if (token.type === 'zIndex') {
        acc.zIndex = acc.zIndex || {
          mobileStepper: 1000,
          speedDial: 1050,
          appBar: 1100,
          drawer: 1200,
          modal: 1300,
          snackbar: 1400,
          tooltip: 1500
        };
        if (path.includes('mobileStepper')) acc.zIndex.mobileStepper = parseInt(token.value);
        if (path.includes('speedDial')) acc.zIndex.speedDial = parseInt(token.value);
        if (path.includes('appBar')) acc.zIndex.appBar = parseInt(token.value);
        if (path.includes('drawer')) acc.zIndex.drawer = parseInt(token.value);
        if (path.includes('modal')) acc.zIndex.modal = parseInt(token.value);
        if (path.includes('snackbar')) acc.zIndex.snackbar = parseInt(token.value);
        if (path.includes('tooltip')) acc.zIndex.tooltip = parseInt(token.value);
      }
      
      return acc;
    }, {});
    
    // Ensure all required sections are present with default values
    if (!tokens.typography) {
      tokens.typography = {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
      };
    }
    
    if (!tokens.breakpoints) {
      tokens.breakpoints = {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536
        }
      };
    }
    
    if (!tokens.transitions) {
      tokens.transitions = {
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          standard: 300,
          complex: 375,
          enteringScreen: 225,
          leavingScreen: 195
        },
        easing: {
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
          easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
        }
      };
    }
    
    if (!tokens.zIndex) {
      tokens.zIndex = {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500
      };
    }
    
    return `import { createTheme } from '@mui/material/styles';\n\nexport const theme = createTheme(${JSON.stringify(tokens, null, 2)});`;
  }
});

StyleDictionary.registerFormat({
  name: 'tailwind/theme',
  format: function(dictionary) {
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
    return `module.exports = ${JSON.stringify(tokens, null, 2)};`;
  }
});

StyleDictionary.registerFormat({
  name: 'shadcn/theme',
  format: function(dictionary) {
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
    return `export const theme = ${JSON.stringify(tokens, null, 2)};`;
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
    }
  }
}; 