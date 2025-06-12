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
    }
  }
}; 