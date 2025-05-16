import StyleDictionary from 'style-dictionary';

// Register custom transforms if needed
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: (prop) => prop.attributes.category === 'size',
  transformer: (prop) => `${prop.value}px`
});

// Register custom transform groups
StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'size/px',
    'color/hex'
  ]
});

// The configuration
export default {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
          filter: {
            attributes: {
              category: 'color'
            }
          }
        },
        {
          destination: '_typography.scss',
          format: 'scss/variables',
          filter: {
            attributes: {
              category: 'typography'
            }
          }
        },
        {
          destination: '_spacing.scss',
          format: 'scss/variables',
          filter: {
            attributes: {
              category: 'spacing'
            }
          }
        }
      ]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables'
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/module'
        }
      ]
    }
  }
}; 