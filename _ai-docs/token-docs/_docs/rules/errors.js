module.exports = {
  // Error types
  types: {
    VALIDATION: 'VALIDATION_ERROR',
    REFERENCE: 'REFERENCE_ERROR',
    TRANSFORMATION: 'TRANSFORMATION_ERROR',
    UNIT: 'UNIT_ERROR',
    STRUCTURE: 'STRUCTURE_ERROR'
  },

  // Error messages
  messages: {
    // Validation errors
    INVALID_TOKEN: 'Invalid token structure: missing required fields',
    INVALID_TYPE: 'Invalid token type: {type} is not allowed',
    INVALID_VALUE: 'Invalid token value: {value} is not valid for type {type}',
    
    // Reference errors
    CIRCULAR_REFERENCE: 'Circular reference detected in token: {token}',
    MISSING_REFERENCE: 'Referenced token not found: {reference}',
    INVALID_REFERENCE: 'Invalid reference format: {reference}',
    
    // Transformation errors
    UNSUPPORTED_FORMAT: 'Unsupported target format: {format}',
    TRANSFORMATION_FAILED: 'Token transformation failed: {reason}',
    
    // Unit errors
    INVALID_UNIT: 'Invalid unit: {unit} is not allowed for type {type}',
    UNIT_CONVERSION_FAILED: 'Unit conversion failed: {from} to {to}',
    
    // Structure errors
    INVALID_STRUCTURE: 'Invalid token structure: {reason}',
    DUPLICATE_TOKEN: 'Duplicate token name: {name}'
  },

  // Create error object
  createError: function(type, message, details = {}) {
    return {
      type,
      message: this.formatMessage(message, details),
      details,
      timestamp: new Date().toISOString()
    };
  },

  // Format error message with details
  formatMessage: function(message, details) {
    return message.replace(/{(\w+)}/g, (_, key) => details[key] || '');
  },

  // Recovery strategies
  recovery: {
    // Try to fix invalid token structure
    fixTokenStructure: function(token) {
      const fixed = { ...token };
      
      // Add missing required fields
      if (!fixed.$type) fixed.$type = 'other';
      if (!fixed.$value) fixed.$value = '';
      if (!fixed.$description) fixed.$description = 'No description provided';
      
      return fixed;
    },

    // Try to fix invalid reference
    fixReference: function(reference, tokens) {
      // Remove invalid characters
      const cleaned = reference.replace(/[^a-zA-Z0-9.-]/g, '');
      
      // Check if cleaned reference exists
      if (tokens[cleaned]) {
        return cleaned;
      }
      
      // Try to find closest match
      const matches = Object.keys(tokens).filter(key => 
        key.includes(cleaned) || cleaned.includes(key)
      );
      
      return matches[0] || null;
    },

    // Try to fix invalid unit
    fixUnit: function(value, type) {
      const unitMap = {
        spacing: 'px',
        fontSize: 'px',
        lineHeight: '',
        borderRadius: 'px',
        borderWidth: 'px',
        opacity: '%',
        duration: 'ms'
      };

      // Extract number and unit
      const match = value.match(/^(\d+)(\w*)$/);
      if (!match) return value;

      const [_, num, unit] = match;
      const defaultUnit = unitMap[type] || '';

      // If no unit or invalid unit, use default
      if (!unit || !this.isValidUnit(unit, type)) {
        return `${num}${defaultUnit}`;
      }

      return value;
    }
  },

  // Validation helpers
  isValidUnit: function(unit, type) {
    const validUnits = {
      spacing: ['px', 'rem', 'em'],
      fontSize: ['px', 'rem', 'em'],
      lineHeight: [''],
      borderRadius: ['px', 'rem', 'em'],
      borderWidth: ['px'],
      opacity: ['%'],
      duration: ['ms']
    };

    return validUnits[type]?.includes(unit) || false;
  },

  // Error handling middleware
  handleError: function(error, context = {}) {
    // Log error
    console.error(`[${error.type}] ${error.message}`, {
      ...error.details,
      ...context
    });

    // Attempt recovery based on error type
    switch (error.type) {
      case this.types.VALIDATION:
        return this.recovery.fixTokenStructure(error.details.token);
      case this.types.REFERENCE:
        return this.recovery.fixReference(error.details.reference, error.details.tokens);
      case this.types.UNIT:
        return this.recovery.fixUnit(error.details.value, error.details.type);
      default:
        return null;
    }
  }
}; 