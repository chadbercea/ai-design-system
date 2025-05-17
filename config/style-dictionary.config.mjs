export default {
  source: ['tokens/**/*.json'],
  platforms: {
    js: {
      transformGroup: 'js', // Use 'tokens-studio' if available
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
}; 