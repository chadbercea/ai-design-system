import StyleDictionary from 'style-dictionary';
console.log(StyleDictionary);
import * as sdTransforms from '@tokens-studio/sd-transforms';
import fs from 'fs';

// Register the sd-transforms with Style Dictionary
sdTransforms.register(StyleDictionary);

// Register a custom format that preserves $value/$type
StyleDictionary.registerFormat({
  name: 'json/w3c',
  format: function({ dictionary }) {
    // Output the original token structure
    return JSON.stringify(dictionary.tokens, null, 2);
  }
});

console.log(StyleDictionary.format);

const config = {
  source: ['mui-tokens/w3c-tokens.json'],
  platforms: {
    json: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/',
      files: [{
        destination: 'tokens-studio.json',
        format: 'json/w3c'
      }]
    }
  }
};

const sd = new StyleDictionary(config);
sd.buildAllPlatforms();

// Read the tokens
const tokens = JSON.parse(
  fs.readFileSync('mui-tokens/w3c-tokens.json', 'utf8')
);

// Clean the tokens (strip extra fields)
function cleanTokens(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if ('$value' in obj && '$type' in obj) {
    const cleaned = { $value: obj.$value, $type: obj.$type };
    if ('$description' in obj) cleaned.$description = obj.$description;
    if ('$extensions' in obj) cleaned.$extensions = obj.$extensions;
    return cleaned;
  }
  const result = {};
  for (const key in obj) {
    result[key] = cleanTokens(obj[key]);
  }
  return result;
}

const cleaned = cleanTokens(tokens);

// Write the cleaned tokens
fs.writeFileSync('build/tokens-studio.json', JSON.stringify(cleaned, null, 2));
console.log('Cleaned tokens written to build/tokens-studio.json');