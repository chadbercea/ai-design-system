import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Token Studio transforms
register(StyleDictionary);

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
          format: 'javascript/module-flat',
          options: {
            outputReferences: true
          }
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
          format: 'javascript/module-flat',
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
};

