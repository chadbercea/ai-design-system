module.exports = {
  // Where references are allowed
  allowedInFiles: ['theme.json', 'dark.json', 'light.json'],
  
  // Reference format
  format: {
    pattern: '^{[a-zA-Z0-9.]+}$',
    useDotNotation: true
  },
  
  // Reference validation
  validation: {
    noCircularRefs: true,
    mustExist: true,
    flattenRequired: true
  }
}; 