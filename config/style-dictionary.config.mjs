import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register the sd-transforms with Style Dictionary
// This adds all the necessary transforms for Tokens Studio compatibility
register(StyleDictionary);

// Only transform actual color tokens to HSL
StyleDictionary.registerTransform({
  name: 'custom/color/hexToHSL',
  type: 'value',
  matcher: token => token.$type === 'color',
  transform: token => {
    const value = token.$value;
    if (!value.startsWith('#')) return value;
    
    // Remove leading # if present
    const hex = value.replace(/^#/, '');
    // Parse r, g, b
    let r, g, b;
    if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else {
      return value;
    }
    
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
  }
});

// Transform dimension tokens to rem
StyleDictionary.registerTransform({
  name: 'custom/size/pxToRem',
  type: 'value',
  matcher: token => token.$type === 'dimension',
  transform: token => {
    const value = token.$value;
    if (typeof value === 'string' && value.endsWith('px')) {
      const px = parseFloat(value);
      return `${px / 16}rem`;
    }
    return value;
  }
});

// Keep original value for non-dimension, non-color tokens
StyleDictionary.registerTransform({
  name: 'custom/value/keepOriginal',
  type: 'value',
  matcher: token => !['color', 'dimension'].includes(token.$type),
  transform: token => token.$value
});

// Register a custom transform for font weights
StyleDictionary.registerTransform({
  name: 'custom/fontWeight/value',
  type: 'value',
  matcher: token => token.$type === 'fontWeights',
  transform: token => token.$value
});

// Register a custom transform group for shadcn that includes the hexToHSL and pxToRem transforms
// This is a TEMPORARY workaround to ensure the shadcn platform uses the custom transforms.
// Remove this when upstream or token source supports the required output formats natively.
StyleDictionary.registerTransformGroup({
  name: 'shadcn-custom',
  transforms: [
    'ts/descriptionToComment',
    'ts/resolveMath',
    // Apply color transforms first to prevent them from catching non-color values
    'custom/color/hexToHSL',
    'ts/color/modifiers',
    'ts/color/css/hexrgba',
    // Then apply dimension and other transforms
    'custom/size/pxToRem',
    'custom/value/keepOriginal',
    'custom/fontWeight/value',
    'ts/opacity',
    'ts/size/lineheight',
    'ts/typography/fontWeight',
    'ts/size/css/letterspacing',
    'ts/shadow/innerShadow',
    'name/camel'
  ]
});

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
    },
    // Add a CSS variables platform for global tokens
    css: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            showFileHeader: true
          }
        }
      ]
    },
    shadcn: {
      transformGroup: 'shadcn-custom', // Use the custom transform group for shadcn
      buildPath: 'build/css/',
      files: [
        {
          destination: 'shadcn-variables.css',
          format: 'css/variables',
          options: {
            showFileHeader: true,
            selector: ':root',
            outputReferences: true,
            outputFormat: 'css',
            prefix: '--'
          }
        }
      ]
    }
  }
}; 