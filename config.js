module.exports = {
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