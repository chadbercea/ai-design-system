module.exports = {
  // Allowed root-level groups
  allowedGroups: [
    'colors', 'fontSizes', 'fontWeights', 'fontFamilies', 'lineHeights',
    'letterSpacing', 'borderRadius', 'borderWidths', 'spacing', 'sizing',
    'opacity', 'boxShadow', 'typography', 'paragraphSpacing', 'textCase',
    'textDecoration', 'composition', 'dimension', 'breakpoints', 'border',
    'zIndex', 'duration', 'assets', 'boolean', 'text', 'number', 'other'
  ],
  
  // Wrapping rules
  wrappingRules: {
    // Types that can be wrapped in their own category
    allowedWrapping: ['fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights'],
    
    // Maximum nesting depth
    maxDepth: 2,
    
    // Color token specific rules
    colorRules: {
      useDotNotation: true,
      lowercaseOnly: true,
      noCategoryWrapping: true
    }
  }
};
 