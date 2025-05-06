import * as sdTransforms from '@tokens-studio/sd-transforms';

export default {
  source: ['mui-tokens/w3c-tokens.json'],
  platforms: {
    json: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/',
      files: [{
        destination: 'tokens-studio.json',
        format: 'json/nested'
      }]
    }
  }
};