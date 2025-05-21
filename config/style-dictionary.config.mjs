import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register the sd-transforms with Style Dictionary
// This adds all the necessary transforms for Tokens Studio compatibility
register(StyleDictionary);

export default {
  // Source files to process
  // In this case, we're using the DDS Foundations tokens
  source: ['token-studio-sync-provider/DDS Foundations.json'],

  // Platform-specific configurations
  platforms: {
    // JavaScript platform configuration
    js: {
      // Use the tokens-studio transform group
      // This includes all necessary transforms for Tokens Studio compatibility:
      // - Flattens nested structures
      // - Converts names to camelCase
      // - Handles proper type conversions
      // - Resolves references
      transformGroup: 'tokens-studio',

      // Where to output the built files
      buildPath: 'build/',

      // File configuration
      files: [{
        // Output file name
        destination: 'tokens.mjs',

        // Use the ES6 module format
        // This will:
        // - Create a flat object of token values
        // - Export as an ES6 module
        // - Include comments from the source
        format: 'javascript/es6',

        // Additional options
        options: {
          // Include a file header comment
          showFileHeader: true
        }
      }]
    }
  }
}; 