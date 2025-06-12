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
    const tokens = dictionary.allTokens.reduce((acc, token) => {
      const path = token.path.join('.');
      if (token.type === 'color') {
        acc.palette = acc.palette || {};
        acc.palette[path] = token.value;
      } else if (token.type === 'typography') {
        acc.typography = acc.typography || {};
        acc.typography[path] = token.value;
      } else if (token.type === 'spacing') {
        acc.spacing = acc.spacing || {};
        acc.spacing[path] = token.value;
      }
      return acc;
    }, {});
    return `export const theme = ${JSON.stringify(tokens, null, 2)};`;
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