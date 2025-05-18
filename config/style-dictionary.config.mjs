export default {
  source: ['token-studio-sync-provider/DDS Foundations.json'],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/mui'
      }]
    }
  },
  transform: {
    'attribute/cti': {
      'type': 'attribute'
    }
  }
}; 