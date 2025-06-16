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