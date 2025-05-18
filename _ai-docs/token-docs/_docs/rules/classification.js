module.exports = {
  // Patterns for identifying primitive tokens
  primitivePatterns: {
    color: /^#[0-9a-f]{6}$|^rgba\(\d+,\d+,\d+,\d+\)$/,
    spacing: /^\d+(px|rem|em)$/,
    fontSize: /^\d+(px|rem|em)$/,
    fontWeight: /^\d{3}$|^(normal|bold)$/,
    lineHeight: /^\d+(\.\d+)?$/,
    borderRadius: /^\d+(px|rem|em)$/,
    borderWidth: /^\d+px$/,
    opacity: /^\d+%$/,
    duration: /^\d+ms$/
  },

  // Patterns for identifying semantic tokens
  semanticPatterns: {
    // Semantic tokens typically reference primitives
    hasReference: /{.*}/,
    // Semantic tokens often have descriptive names
    descriptiveName: /^(primary|secondary|tertiary|success|error|warning|info|disabled|hover|active|focus)/i
  },

  // Rules for classifying tokens
  classifyToken: function(token) {
    // Check if token has a reference (semantic)
    if (this.semanticPatterns.hasReference.test(token.$value)) {
      return 'semantic';
    }

    // Check if token matches primitive patterns
    const type = token.$type;
    if (this.primitivePatterns[type] && this.primitivePatterns[type].test(token.$value)) {
      return 'primitive';
    }

    // Check if token has a descriptive name (likely semantic)
    if (this.semanticPatterns.descriptiveName.test(token.name)) {
      return 'semantic';
    }

    // Default to primitive if no other rules match
    return 'primitive';
  },

  // Validation rules for each classification
  validationRules: {
    primitive: {
      required: ['$type', '$value', '$description'],
      noReferences: true,
      noMath: true
    },
    semantic: {
      required: ['$type', '$value', '$description'],
      allowReferences: true,
      allowMath: true
    }
  }
}; 