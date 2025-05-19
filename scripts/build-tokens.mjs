import StyleDictionary from 'style-dictionary';
import config from '../config/style-dictionary.config.mjs';

console.log('Building tokens...');
console.log('Source files:', config.source);

// ESM-compatible formatter
StyleDictionary.registerFormat({
  name: 'javascript/es6',
  format: function(dictionary) {
    console.log('Token count:', dictionary.allTokens.length);
    
    // Create flat object of token values
    const tokens = {};
    dictionary.allTokens.forEach(token => {
      tokens[token.name] = token.$value;
    });
    
    console.log('Sample output:', Object.entries(tokens).slice(0, 3));
    return `export default ${JSON.stringify(tokens, null, 2)};`;
  }
});

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log('Build complete!'); 