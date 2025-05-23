import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register the sd-transforms with Style Dictionary
// This adds all the necessary transforms for Tokens Studio compatibility
register(StyleDictionary);

// ===================== TEMPORARY CUSTOM TRANSFORM =====================
// This is a TEMPORARY workaround to convert hex color values to HSL for the shadcn platform.
// Remove this when upstream or token source supports HSL output natively.
function hexToHSL(hex) {
  // Remove leading # if present
  hex = hex.replace(/^#/, '');
  // Parse r, g, b
  let bigint = parseInt(hex, 16);
  let r, g, b;
  if (hex.length === 6) {
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else if (hex.length === 3) {
    r = ((bigint >> 8) & 15) * 17;
    g = ((bigint >> 4) & 15) * 17;
    b = (bigint & 15) * 17;
  } else {
    return hex; // Not a valid hex
  }
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `hsl(${h} ${s}% ${l}%)`;
}

// Register the custom transform with Style Dictionary
StyleDictionary.registerTransform({
  name: 'custom/hexToHSL',
  type: 'value',
  matcher: token => (token.$type === 'color' || token.type === 'color') && typeof (token.$value ?? token.value) === 'string' && (token.$value ?? token.value).startsWith('#'),
  transform: token => hexToHSL(token.$value ?? token.value)
});

// Custom transform to convert px values to rem
// This is a TEMPORARY workaround to convert px values to rem for the shadcn platform.
// Remove this when upstream or token source supports rem output natively.
StyleDictionary.registerTransform({
  name: 'custom/pxToRem',
  type: 'value',
  matcher: token => {
    const type = token.$type ?? token.type;
    return (typeof type === 'string' &&
      ['fontSize', 'dimension', 'typography', 'border', 'shadow'].includes(type));
  },
  transform: token => {
    const value = token.$value ?? token.value;
    if (typeof value === 'string' && value.endsWith('px')) {
      const pxValue = parseFloat(value);
      return `${pxValue / 16}rem`;
    }
    return value;
  }
});

// Register a custom transform group for shadcn that includes the hexToHSL and pxToRem transforms
// This is a TEMPORARY workaround to ensure the shadcn platform uses the custom transforms.
// Remove this when upstream or token source supports the required output formats natively.
StyleDictionary.registerTransformGroup({
  name: 'shadcn-custom',
  transforms: [
    'ts/descriptionToComment',
    'ts/resolveMath',
    'custom/pxToRem',
    'ts/opacity',
    'ts/size/lineheight',
    'ts/typography/fontWeight',
    'ts/color/modifiers',
    'ts/color/css/hexrgba',
    'ts/size/css/letterspacing',
    'ts/shadow/innerShadow',
    'name/camel',
    'custom/hexToHSL'
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