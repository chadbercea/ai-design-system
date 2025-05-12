module.exports = {
  // Required fields for every token
  requiredFields: ['$type', '$value', '$description'],
  
  // Valid token types (singular form only)
  validTypes: [
    'color', 'fontSizes', 'fontWeights', 'fontFamilies', 'lineHeight',
    'letterSpacing', 'borderRadius', 'borderWidth', 'spacing', 'sizing',
    'opacity', 'boxShadow', 'typography', 'paragraphSpacing', 'textCase',
    'textDecoration', 'composition', 'dimension', 'breakpoints', 'border',
    'zIndex', 'duration', 'assets', 'boolean', 'text', 'number', 'other'
  ],
  
  // Unit validation rules per type
  unitRules: {
    opacity: { type: 'string', pattern: '^\\d+%$' },
    spacing: { type: 'number' },
    duration: { type: 'string', pattern: '^\\d+ms$' },
    fontSize: { type: 'string', pattern: '^\\d+px$|^\\d+rem$' },
    lineHeight: { type: 'number' },
    borderRadius: { type: 'string', pattern: '^\\d+px$|^\\d+rem$' },
    borderWidth: { type: 'string', pattern: '^\\d+px$' },
    boxShadow: { type: 'string' },
    zIndex: { type: 'integer' },
    color: { type: 'string', pattern: '^#[0-9a-f]{6}$|^rgba\\(\\d+,\\d+,\\d+,\\d+\\)$' }
  }
}; 